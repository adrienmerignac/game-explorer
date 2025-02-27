# 📘 Game Explorer - API Documentation

## 📖 Overview

Game Explorer uses external APIs to fetch and manage game-related data. The two main APIs used are:

- **RAWG.io API**: Provides game details, ratings, genres, and trending games.
- **Firebase API**: Manages user authentication and (optionally) user-specific data such as wishlists.

## 🌐 RAWG.io API

The RAWG.io API is the primary source for game-related data. You must obtain an API key from [RAWG.io](https://rawg.io/apidocs) and store it in your `.env` file:

```env
VITE_RAWG_API_KEY=your_rawg_api_key_here
```

### 🔍 Fetching Games by Category

**Endpoint:**

```http
GET https://api.rawg.io/api/games?key={API_KEY}&genres={genre_slug}
```

**Example Request:**

```js
fetch(
  `https://api.rawg.io/api/games?key=${
    import.meta.env.VITE_RAWG_API_KEY
  }&genres=action`
)
  .then((response) => response.json())
  .then((data) => console.log(data));
```

**Response:**

```json
{
  "count": 10000,
  "results": [
    {
      "id": 3498,
      "name": "Grand Theft Auto V",
      "released": "2013-09-17",
      "background_image": "https://media.rawg.io/media/games/...
    }
  ]
}
```

### 🔎 Searching for a Game

**Endpoint:**

```http
GET https://api.rawg.io/api/games?key={API_KEY}&search={query}
```

**Example Request:**

```js
fetch(
  `https://api.rawg.io/api/games?key=${
    import.meta.env.VITE_RAWG_API_KEY
  }&search=zelda`
)
  .then((response) => response.json())
  .then((data) => console.log(data));
```

### 🎮 Fetching Game Details

**Endpoint:**

```http
GET https://api.rawg.io/api/games/{game_id}?key={API_KEY}
```

**Example Request:**

```js
fetch(
  `https://api.rawg.io/api/games/3498?key=${import.meta.env.VITE_RAWG_API_KEY}`
)
  .then((response) => response.json())
  .then((data) => console.log(data));
```

## 🔥 Firebase Authentication

Firebase is used for user authentication. You must configure Firebase in your `.env` file:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
```

### 👤 User Authentication

The authentication system is implemented using Firebase’s `AuthService.ts`.

- **Sign Up**
- **Login**
- **Logout**

Example usage in `AuthService.ts`:

```js
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();

export const loginUser = async (email, password) => {
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

## ⚙️ API Service Implementation in the Project

All API calls are managed inside the `services/` folder.

- `GameService.ts` handles communication with RAWG.io API.
- `AuthService.ts` manages authentication via Firebase.

### Example: Fetching Games in `GameService.ts`

```js
import axios from "axios";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api/games";

export const fetchGames = async (genre) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&genres=${genre}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching games:", error);
    return null;
  }
};
```

## 🚀 Future Improvements

- Implement **caching** with LocalStorage or IndexedDB for improved performance.
- Add **pagination** support for large game lists.
- Improve **error handling** and implement retries for failed requests.

This document provides an overview of how APIs are used in Game Explorer. 🚀
