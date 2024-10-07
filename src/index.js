import { Hono } from 'hono';
import { createMiddleware } from 'hono/factory';
import { getCookie, getSignedCookie, setCookie, setSignedCookie, deleteCookie } from 'hono/cookie';
import renderHomepage from './views/home';
import renderLoginPage from './views/login';
import renderScannerPage from './views/scanner';
import generateTotp from './utils/generateTotp';
import { encrypt, decrypt } from './utils/storeKey';

const app = new Hono();

// session authentication middleware

const authWare = createMiddleware(async (c, next) => {
	console.log(`[${c.req.method}] ${c.req.url}`);
	console.log('checking for session');

	const session = await getCookie(c, 'session');
	console.log('session', session);

	if (!session) {
		return c.redirect('/login');
	}
	const { results: serverSession } = await c.env.DB.prepare(`SELECT * FROM Sessions WHERE SessionId = ? AND UserEmail = ?`)
		.bind(session, c.env.USER_EMAIL)
		.all();
	console.log('serverSession', serverSession);
	if (serverSession.length === 0) {
		// session not found in session store
		return c.redirect('/login');
	}
	if (serverSession[0].SessionId !== session) {
		// session not found in session store
		return c.redirect('/login');
	}

	await next();
});

app.use('/', authWare);

app.get('/', (c) => {
	return c.render(renderHomepage());
});

app.get('/login', (c) => {
	return c.render(renderLoginPage({ wrongCred: false }));
});

app.post('/login', async (c) => {
	const { email, password } = await c.req.parseBody();
	console.log('email', email);
	console.log('password', password);
	// authenticate user
	const isMatched = email === c.env.USER_EMAIL && password === c.env.USER_PASSWORD;
	// if successful, create a session
	console.log('isMatched', isMatched);

	if (isMatched) {
		const session = await crypto.randomUUID();

		// insert to sessions table
		const { result } = await c.env.DB.prepare(`UPDATE Sessions SET SessionId = ? WHERE UserEmail = ?`).bind(session, email).all();
		console.log('result of query', result);

		await setCookie(c, 'session', session, { httpOnly: true, maxAge: 60 * 10 });
		return c.redirect('/');
	} else {
		return c.render(renderLoginPage({ wrongCred: true }));
	}
});

app.get('/scan', async (c) => {
	return c.render(renderScannerPage());
});

// generate a totp token before storing it
app.post('/api/token/new', async (c) => {
	const { algorithm, digits, issuer, label, secret, period } = await c.req.json();

	const otp = await generateTotp({
		algorithm,
		digits,
		period,
		secret,
	});

	// calculate the code and show the code in the user
	return c.json({
		code: otp,
	});
});

// save the token to the database
app.post('/api/token/save', async (c) => {
	const { algorithm, digits, issuer, label, secret, period } = await c.req.json();

	// encrypt the secret
	const encryptedSecret = await encrypt({
		data: secret,
		keyB64: c.env.ENCRYPTION_KEY,
	});

	// check if the issuer already exist in the database, then update the token
	const { results: issuerExists } = await c.env.DB.prepare(`SELECT * FROM Tokens WHERE Issuer = ?`).bind(issuer).all();
	if (issuerExists.length > 0) {
		const { result } = await c.env.DB.prepare(
			`UPDATE Tokens SET TimeStep = ?, EncryptedSecret = ?, Algorithm = ?, Digits = ? WHERE Issuer = ?`,
		)
			.bind(period, encryptedSecret, algorithm, digits, issuer)
			.all();
		return c.json({
			info: 'Issuer already exists, updated the token.',
		});
	}

	// insert the token to the database
	const { result } = await c.env.DB.prepare(
		`INSERT INTO Tokens (Issuer, TimeStep, EncryptedSecret, Algorithm, Digits) VALUES (?, ?, ?, ?, ?)`,
	)
		.bind(issuer, period, encryptedSecret, algorithm, digits)
		.all();
	return c.json({
		info: 'Token saved successfully.',
	});
});
export default app;
