# 🔍 Game Explorer - FAQ & Troubleshooting Guide

## ❓ Frequently Asked Questions (FAQ)

### 1️⃣ The project won't start, what should I do?

- Ensure **Node.js (v18+)** is installed.
- Run `npm install` to install dependencies.
- Check if `.env` is properly configured.
- Run the app with:
  ```sh
  npm run dev
  ```

### 2️⃣ I'm getting `404 Not Found` errors from RAWG.io API

- Verify your **API Key** in `.env`:
  ```env
  VITE_RAWG_API_KEY=your_api_key_here
  ```
- Ensure your **account is active** on RAWG.io.
- Check API rate limits and try again later.

### 3️⃣ Firebase authentication is not working

- Make sure Firebase keys are correctly set in `.env`:
  ```env
  VITE_FIREBASE_API_KEY=your_firebase_api_key
  VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
  VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
  ```
- Check Firebase **Authentication settings** and enable email/password login.
- Open **Browser DevTools Console** for errors (`F12 > Console`).

## 🛠 Common Issues & Fixes

### ⚡ Vite Compilation Errors

**Error:** `ReferenceError: React is not defined`

- Ensure React is imported in your files:
  ```tsx
  import React from "react";
  ```
- Restart the server: `npm run dev`

### ❌ React Components Not Updating

- Check if you're modifying **state correctly**.
- Use `useEffect` if you expect side effects.
- Run `npm run lint` to detect issues.

### 🌐 API Issues

**Error:** `401 Unauthorized`

- Your API key might be incorrect or expired.
- Regenerate a new key from **RAWG.io Developer Portal**.

**Error:** `429 Too Many Requests`

- RAWG.io has **rate limits**. Reduce frequent API calls.
- Implement **caching** to store responses.

### 🧪 Test Failures

**Error:** `Cannot find module '@testing-library/react'`

- Install missing dependencies:
  ```sh
  npm install --save-dev @testing-library/react
  ```
- Make sure tests are executed properly:
  ```sh
  npm run test
  ```

### 🚀 Quick Debugging Checklist

✅ Check `.env` variables
✅ Restart the dev server (`Ctrl + C`, then `npm run dev`)
✅ Inspect **Browser DevTools Console** for logs/errors
✅ Run `npm run lint` to detect syntax issues
✅ If all else fails, **delete `node_modules/` and reinstall**:

```sh
rm -rf node_modules package-lock.json
npm install
```

---

This guide helps troubleshoot common issues in Game Explorer. If you still need help, feel free to open an issue on GitHub! 🚀
