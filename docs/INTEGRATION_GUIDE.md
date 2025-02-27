# 🔗 Game Explorer - Integration Guide

## 📖 Overview

This guide explains how to integrate **external services** into Game Explorer, including APIs, databases, and third-party libraries.

## 🌍 Integrating RAWG.io API (Game Data)

### 1️⃣ API Setup

- Get an **API Key** from [RAWG.io](https://rawg.io/apidocs).
- Add the key to your `.env` file:

```env
VITE_RAWG_API_KEY=your_api_key_here
```

### 2️⃣ Fetching Game Data

```tsx
const fetchGames = async () => {
  const response = await fetch(
    `https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_API_KEY}`
  );
  return response.json();
};
```

## 🔥 Integrating Firebase (Authentication & Database)

### 3️⃣ Firebase Setup

1. Create a **Firebase project** in the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** (Email/Password, Google, etc.).
3. Configure Firestore for data storage.
4. Add Firebase keys to `.env`:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
```

### 4️⃣ Authentication Example

```tsx
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Login failed", error);
  }
};
```

## 📊 Integrating Google Analytics

### 5️⃣ Setup GA in Vite

1. Get a **Google Analytics Tracking ID** from [Google Analytics](https://analytics.google.com/).
2. Add the tracking script to `index.html`:

```html
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=YOUR_TRACKING_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "YOUR_TRACKING_ID");
</script>
```

## 💳 Integrating Stripe (Payments)

### 6️⃣ Stripe Setup

1. Create an account on [Stripe](https://stripe.com/).
2. Install Stripe SDK:

```sh
npm install @stripe/react-stripe-js @stripe/stripe-js
```

3. Add **API Keys** to `.env`:

```env
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

4. Example Payment Button:

```tsx
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}
```

## 📡 Webhooks & External Services

### 7️⃣ Setting up Webhooks

- Use **Zapier** or **Webhook.site** to test outgoing webhooks.
- Secure webhook endpoints with **authentication tokens**.

## 🚀 Best Practices for Integrations

✅ **Keep API keys secret** (use `.env` & GitHub Secrets).
✅ **Optimize API calls** with caching mechanisms.
✅ **Monitor third-party service limits** to avoid rate-limiting.

---

This guide explains how to integrate external services efficiently with Game Explorer. 🚀
