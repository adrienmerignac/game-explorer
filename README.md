# 🎮 Game Library

![GitHub last commit](https://img.shields.io/github/last-commit/adrienmerignac/game-library)
![GitHub issues](https://img.shields.io/github/issues/adrienmerignac/game-library)
![GitHub pull requests](https://img.shields.io/github/issues-pr/adrienmerignac/game-library)

## 📖 Description

**Game Library** is a web application built with **React**, **TypeScript**, and **Vite** that allows users to **browse, manage, and explore a collection of video games**. The app integrates with the **[RAWG.io](https://rawg.io/) API** to fetch game details, ratings, platforms, and more.

## 🌍 Live Demo

Check out the live version of the app here: **[Game Library Demo](https://game-library-eight-puce.vercel.app/)**

## ✨ Features

- 🔍 **Game Search & Filtering** – Find games by name, genre, or platform.
- 📖 **Game Details** – View in-depth information about each game.
- ⭐ **Favorites List** – Save and manage your favorite games.
- 🌐 **RAWG.io API Integration** – Fetch real-time game data from RAWG.

---

## ⚙️ Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version **18+** recommended)
- [pnpm](https://pnpm.io/) (or another package manager)

---

## 🚀 Installation & Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/adrienmerignac/game-library.git
   cd game-library
   ```

2. **Install dependencies:**

   ```sh
   pnpm install
   ```

3. **Set up environment variables:**

   - The app requires an **API key from RAWG.io**.
   - Register at **[RAWG.io](https://rawg.io/apidocs)** and get your API key.
   - Create a `.env` file at the root of the project and add:

     ```env
     VITE_RAWG_API_KEY=your_rawg_api_key_here
     ```

---

## 💻 Running in Development

To start the development server:

```sh
pnpm run dev
```

Then, open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Building for Production

To generate an optimized production build:

```sh
pnpm run build
```

The static files will be available in the `dist/` folder.

---

## 🧪 Running Tests

To run unit tests:

```sh
pnpm run test
```

Ensure that all tests pass before pushing new changes.

---

## 🌟 Contribution

Contributions are welcome! To contribute:

1. **Fork** the repository.
2. **Create a new branch**:
   ```sh
   git checkout -b feature/your-feature-name
   ```
3. **Commit your changes**:
   ```sh
   git commit -m "Added new feature"
   ```
4. **Push the branch**:
   ```sh
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request** on GitHub.

Before submitting, ensure your code follows the project style and all tests pass.

---

## 📜 License

This project is **MIT licensed**. See the [LICENSE](https://github.com/adrienmerignac/game-library/blob/main/LICENSE) file for details.

---

## 🙌 Acknowledgments

- **[RAWG.io](https://rawg.io/)** for providing a powerful gaming API.
- The **open-source community** for amazing tools and libraries that made this project possible.
