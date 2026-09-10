# Ledger — a full-stack blog app

React + Tailwind frontend, Express + SQLite backend, with working
signup/login (JWT auth).

## Structure
```
my-blog-app/
  client/   → React + Tailwind (Vite) — 4 pages: Home, Login, Signup, Post
  server/   → Express API with SQLite database + JWT auth
```

## Pages
1. **Home (`/`)** — feed of all posts; logged-in users can publish a new post inline
2. **Login (`/login`)**
3. **Signup (`/signup`)**
4. **Post (`/post/:id`)** — single post view

## Run it locally

### 1. Backend
```bash
cd server
npm install
cp .env.example .env
npm run dev
```
Runs on http://localhost:5000. The SQLite database file (`blog.db`) is
created automatically on first run — no external database needed.

### 2. Frontend
```bash
cd client
npm install
npm run dev
```
Runs on http://localhost:5173

Open http://localhost:5173 — sign up for an account, log in, and publish
a post. It's saved to the database and shows up in the feed.

## How auth works
- Passwords are hashed with bcrypt before being stored — never saved in plain text.
- On signup/login, the server returns a JWT, which the frontend stores in
  `localStorage` and sends as a `Bearer` token on requests that need it
  (like publishing a post).
- Anyone can read posts; only logged-in users can create them.

## Push to GitHub
This folder is already a git repo with an initial commit. To push it:
```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git branch -M main
git push -u origin main
```
(Create the empty repo on GitHub first, without a README, then run the
commands above.)

## Deploying live (optional next step)
- **Frontend:** Vercel or Netlify (point it at the `client` folder)
- **Backend:** Render or Railway (point it at the `server` folder)
- Update `VITE_API_URL` in `client/.env` to the deployed backend URL once it's live.
