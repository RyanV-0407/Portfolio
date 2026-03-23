# Vikram Rathour Portfolio

Modern personal portfolio built with React, Vite, and Tailwind CSS.

## Overview

This project showcases:

- About, Skills, Education, Projects, Experience, and Certifications sections
- Custom visual effects, motion, and interactive UI components
- Contact form integration using EmailJS
- Responsive layout for desktop, tablet, and mobile

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS 4
- lucide-react
- @emailjs/browser

## Run Locally

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Start Dev Server

```bash
npm run dev
```

Default local URL:

```text
http://localhost:5173
```

### Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```


If these values are missing, the UI still works, but sending messages from the contact form will fail.

## Project Structure

```text
src/
  components/
  layout/
  pages/
  sections/
  App.jsx
  main.jsx
  index.css
public/
```

## Notes

- This is a Vite single-page app.
- Route fallback is handled in client code for `/` and NotFound rendering.

## Deployment

### Deploy to Vercel

This project is optimized for deployment on [Vercel](https://vercel.com/).

#### Prerequisites

- [Vercel](https://vercel.com) account (free or paid)
- GitHub, GitLab, or Bitbucket repository with your code

#### Quick Deploy

1. **Push your code to a Git repository**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Import to Vercel**

- Go to [vercel.com/new](https://vercel.com/new)
- Select your Git repository
- Vercel auto-detects Vite configuration
- Click "Deploy"

3. **Add Environment Variables**

- In Vercel dashboard, go to **Settings**    **Environment Variables**
- Add your EmailJS credentials:
  - `VITE_EMAILJS_SERVICE_ID`
  - `VITE_EMAILJS_TEMPLATE_ID`
  - `VITE_EMAILJS_PUBLIC_KEY`
- Redeploy to apply changes

#### Manual Deployment (Using Vercel CLI)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### Environment Variables in Vercel

For the contact form to work on production, set your environment variables:

1. Go to your Vercel project dashboard
2. Navigate to **Settings**    **Environment Variables**
3. Add these keys:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`

The Vercel configuration will automatically pick these up during build time.

## License

MIT
