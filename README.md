# 🎮 Game Explorer

![GitHub last commit](https://img.shields.io/github/last-commit/adrienmerignac/game-explorer)
![GitHub issues](https://img.shields.io/github/issues/adrienmerignac/game-explorer)
![GitHub pull requests](https://img.shields.io/github/issues-pr/adrienmerignac/game-explorer)

## 📖 Description

Game Explorer is a web application built with **React**, **TypeScript**, and **Vite** that allows users to **browse, discover, and explore a vast collection of video games**. The app integrates with the **[RAWG.io](https://rawg.io/) API** to fetch game details, ratings, platforms, and more.

## 🌍 Live Demo

Check out the live version of the app here: **[Game Explorer Demo](https://game-explorer.vercel.app/)**

## ✨ Features

- 🔍 **Game Search & Filtering**
- 📖 **Game Details Page**
- ⭐ **Wishlist System**
- 🎮 **Trending & Upcoming Games**
- 👤 **User Authentication via Firebase**
- 🌍 **RAWG.io API Integration**
- 💬 **User Reviews & Community Features (Planned)**

---

## 📂 Project Structure

```
📂 src
 ├── 📁 assets          # Static assets (images, icons)
 ├── 📁 components      # Reusable UI components
 ├── 📁 context         # Global state management (Auth, Theme, Wishlist)
 ├── 📁 hooks           # Custom hooks for API calls and utilities
 ├── 📁 pages           # Main application pages
 ├── 📁 routes          # Centralized route definitions
 ├── 📁 services        # API and Firebase interactions
 ├── 📁 styles          # Global styles and CSS modules
 ├── 📄 App.tsx         # Root component
 ├── 📄 main.tsx        # Application entry point
```

---

## 🚀 Documentation

Game Explorer includes a set of documentation files in the `docs/` folder:

- 📘 **[API Documentation](docs/API_DOCUMENTATION.md)**
- 🏗 **[Architecture Guide](docs/ARCHITECTURE.md)**
- 🤝 **[Contribution Guide](docs/CONTRIBUTING.md)**
- 🧪 **[Testing Guide](docs/TESTING_GUIDE.md)**
- 🔍 **[FAQ & Troubleshooting](docs/FAQ_TROUBLESHOOTING.md)**
- ⚡ **[Performance Optimization](docs/PERFORMANCE_GUIDE.md)**
- 🎨 **[UI/UX Guidelines](docs/UI_UX_GUIDE.md)**
- 🔒 **[Security Guide](docs/SECURITY_GUIDE.md)**
- 🔄 **[Versioning & Git Workflow](docs/VERSIONING_GUIDE.md)**
- 🚀 **[Deployment Guide](docs/DEPLOYMENT_GUIDE.md)**
- 🛣 **[Project Roadmap](docs/ROADMAP.md)**
- 🔗 **[Integration Guide](docs/INTEGRATION_GUIDE.md)**

---

## 🏗 Installation & Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/adrienmerignac/game-explorer.git
   cd game-explorer
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   ```env
   VITE_RAWG_API_KEY=your_rawg_api_key_here
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   ```
4. **Run the development server:**
   ```sh
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

---

## 🏗 Deployment

Game Explorer can be deployed on **Vercel, Netlify, or Firebase Hosting**.

1. **Build the project:**
   ```sh
   npm run build
   ```
2. **Deploy using Vercel:**
   ```sh
   vercel
   ```

For more details, check the **[Deployment Guide](docs/DEPLOYMENT_GUIDE.md)**.

---

## 📜 License

This project is **MIT licensed**. See the [LICENSE](LICENSE) file for details.

---

## 🙌 Acknowledgments

- **[RAWG.io](https://rawg.io/)** for providing a powerful gaming API.
- **Firebase** for authentication and database services.
- The **open-source community** for amazing tools and libraries that made this project possible.

---

This README serves as an entry point to all documentation and project information. 🚀
