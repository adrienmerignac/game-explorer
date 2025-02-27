# 🚀 Game Explorer - Deployment Guide

## 📖 Preparing for Deployment

Before deploying Game Explorer, ensure the following steps are completed:

- **Set environment variables** in `.env` file.
- **Run tests** to confirm stability:
  ```sh
  npm run test
  ```
- **Build the project** for production:
  ```sh
  npm run build
  ```

## 🌍 Deploying to Vercel (Recommended)

### 1️⃣ Setup Vercel

1. Go to **[Vercel Dashboard](https://vercel.com/)** and log in.
2. Click **New Project** → Import your GitHub repository.
3. Set **Build Command:** `npm run build`.
4. Set **Output Directory:** `dist`.
5. Configure **Environment Variables** in Vercel settings:
   - `VITE_RAWG_API_KEY`
   - `VITE_FIREBASE_API_KEY`
6. Click **Deploy** 🚀

### 2️⃣ Enable Automatic Deployments

Vercel will automatically deploy new commits to `main`. You can trigger manual redeployments if needed.

## 🌍 Deploying to Netlify (Alternative)

### 1️⃣ Setup Netlify

1. Go to **[Netlify](https://www.netlify.com/)** and sign in.
2. Click **New Site from Git** → Select your GitHub repository.
3. Set **Build Command:** `npm run build`.
4. Set **Publish Directory:** `dist`.
5. Configure **Environment Variables** in Netlify settings.
6. Click **Deploy Site**.

### 2️⃣ Configuring `netlify.toml`

For better control, create a `netlify.toml` file at the project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/api/*"
  to = "https://api.rawg.io/:splat"
  status = 200
```

## 🔥 Deploying to Firebase Hosting

### 1️⃣ Install Firebase CLI

```sh
npm install -g firebase-tools
```

### 2️⃣ Initialize Firebase

Run:

```sh
firebase login
firebase init
```

Select:

- **Hosting** → Use an existing Firebase project.
- Set **Public Directory** to `dist`.
- Configure as SPA? **Yes**

### 3️⃣ Deploy to Firebase

```sh
firebase deploy
```

Your app will be live at `https://your-app.firebaseapp.com`.

## ✅ Best Deployment Practices

- **Enable minification & compression** in Vite for better performance.
- **Monitor logs & errors** after deployment (`Vercel Logs` or `Netlify Logs`).
- **Secure environment variables** and never expose API keys in the frontend.

---

This guide ensures a smooth deployment for Game Explorer. 🚀
