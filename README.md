# EdgeAuth - Self-Hostable Authenticator App

(for paranoid people like me)

**EdgeAuth** is a self-hostable, server-side TOTP (Time-based One-Time Password) generator and authenticator app, built using Cloudflare Workers. It allows users to generate and manage their own TOTP tokens for 2-factor authentication (2FA) without relying on third-party authenticator apps.

## Features:

- **Self-hosted**: You control your own data and tokens.
- **Made with Cloudflare Workers**: No need to set up a server, just deploy to Cloudflare Workers.
- **Free Hosting**: Since cloudflare workers offer free hosting, for bundle sizes under 1MB, you can host this app for free with 100,000 requests per day.
- **Secure**: All data is encrypted and stored in D1 database(SQLite) on Cloudflare Workers.
- **Cross-platform**: Works on any device with a browser (and a camera).
- **Globally Available**: App is available worldwide with low latency. Thanks to Cloudflare's global network.
- **Compatible with any TOTP-compatible service**: Use it with any service that supports TOTP 2FA.

## Screenshots

![Alt text](https://github.com/alanJames00/EdgeAuth/blob/master/screenshots/login.jpeg)

- Login Page

![Alt text](https://github.com/alanJames00/EdgeAuth/blob/master/screenshots/home_page.jpeg)

- Home Page

![Alt text](https://github.com/alanJames00/EdgeAuth/blob/master/screenshots/add_token.jpeg)

- Add New Token Page

![Alt text](https://github.com/alanJames00/EdgeAuth/blob/master/screenshots/manage_db.jpeg)

- Database Dump Page

## References:

1. Google Authenticator wiki: https://github.com/google/google-authenticator/wiki/Key-Uri-Format
2. RFC 6238: https://datatracker.ietf.org/doc/html/rfc6238
