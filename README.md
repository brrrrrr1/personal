# University Student Enrollment Portal

A complete frontend Student Enrollment System built with HTML5, CSS3, JavaScript, and browser localStorage.

## Features

- Landing page
- Student registration and login
- Administrator login
- Student dashboard
- Subject search and enrollment
- Enrollment removal
- Profile editing
- Admin student management
- Admin subject management
- Admin enrollment records
- Responsive sidebar and mobile layout
- Toast notifications and validation
- Demo data automatically seeded into localStorage

## Demo Accounts

**Administrator**
- Username: `admin`
- Password: `admin123`

**Student**
- Student ID: `2026-0001`
- Password: `student123`

## Run Locally

No build step is required.

1. Extract the project.
2. Open `index.html` in a browser.

For the best local development experience, use VS Code with the Live Server extension, or any static web server.

## GitHub

```bash
git init
git add .
git commit -m "Create student enrollment portal"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## Vercel

This is a static site, so it can be deployed directly to Vercel.

1. Push the folder to GitHub.
2. Import the repository into Vercel.
3. Framework preset: Other / static.
4. Build command: leave empty.
5. Output directory: leave empty or use the project root.
6. Deploy.

You can also deploy with the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Important Security Note

This version intentionally uses `localStorage` because it is designed as a frontend demonstration/student project. It is **not production authentication**. Passwords stored in localStorage are not secure.

For a real university system, replace localStorage with a secure backend/API and database, use hashed passwords, server-side authorization, HTTPS, secure cookies/tokens, validation, audit logging, and proper access controls.
