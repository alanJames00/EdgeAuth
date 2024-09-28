import { Hono } from 'hono';
import { createMiddleware } from 'hono/factory';
import { getCookie, getSignedCookie, setCookie, setSignedCookie, deleteCookie } from 'hono/cookie';
import renderHomepage from './views/home';
import renderLoginPage from './views/login';

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

export default app;
