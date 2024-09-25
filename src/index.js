import { Hono } from 'hono';
import { getCookie, getSignedCookie, setCookie, setSignedCookie, deleteCookie } from 'hono/cookie';
import renderHomepage from './views/home';
import renderLoginPage from './views/login';

const app = new Hono();

// session authentication middleware
const authWare = (c, next) => {
	const session = getSignedCookie(c, 'session');
	if (!session) {
		return c.redirect('/login');
	}
	// validate the session
};

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
		const session = Math.random().toString(36).slice(2);
		setSignedCookie(c, 'session', session);
		return c.redirect('/');
	} else {
		return c.render(renderLoginPage({ wrongCred: true }));
	}
});

export default app;
