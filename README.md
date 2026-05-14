# Social Dashboard

A React dashboard for viewing users, posts, and comments from the JSONPlaceholder API. The app uses GitHub OAuth for login and runs on Cloudflare Pages.


## Setup

Install dependencies:

```bash
npm install
```


## Environment Variables

For local Pages testing, copy the example file:

```bash
cp .env.example .dev.vars
```

Required variables:

```bash
GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET
SESSION_SECRET
OAUTH_REDIRECT_URI
```

For local development, the GitHub OAuth callback URL should be:

```txt
http://localhost:8788/api/auth/callback
```

## FOR PRODUCTION 
`OAUTH_REDIRECT_URI` should match the callback URL, for example:

```txt
https://your-site.pages.dev/api/auth/callback
```

Run the app with Cloudflare Pages Functions locally:

```bash
npm run pages:dev
```

## Tech Choices

- React
- Vite
- React Router
- Tailwind CSS
- Cloudflare Pages Functions
- Github OAuth


## Notes

The challenge says "Click post -> view comments." I kept a clear "View comments" action on each post instead of making the whole card clickable, because the post body is readable text and full-card clicks can be easy to trigger by accident.

## Challenges

The biggest challenge was the time constraint, this lead to less testing that I would have liked to do, so quality was impacted, also I was not able to learn as much as I would have liked about Cloudflare pages and Github Oauth.


