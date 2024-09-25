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
	return c.render(renderLoginPage());
});

app.post('/login', (c) => {
	const { email, password } = c.body;
	// authenticate user
	const isMatched = email === process.env.USER_EMAIL && password === process.env.USER_PASSWORD;
	// if successful, create a session
	console.log('isMatched', isMatched);
});

export default app;
