# 🤝 Game Explorer - Contribution Guide

## 📖 Introduction

Thank you for your interest in contributing to **Game Explorer**! 🚀
We welcome all contributions, whether it's bug fixes, new features, or documentation improvements.

## ⚙️ Setting Up the Project

### 1️⃣ Fork and Clone the Repository

1. **Fork** the repository on GitHub.
2. Clone it locally:
   ```sh
   git clone https://github.com/your-username/game-explorer.git
   cd game-explorer
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## 📝 Coding Guidelines

### 2️⃣ Code Formatting and Style

- Use **Prettier** for formatting:
  ```sh
  npm run format
  ```
- Lint your code using **ESLint**:
  ```sh
  npm run lint
  ```
- Follow the existing project structure and use **TypeScript**.

### 3️⃣ Branch Naming Convention

Use descriptive branch names based on the task:

- `feature/new-component`
- `bugfix/fix-login-error`
- `docs/update-readme`

## 🔄 Contribution Process

### 4️⃣ Creating a Pull Request (PR)

1. **Create a new branch:**
   ```sh
   git checkout -b feature/your-feature-name
   ```
2. Make your changes and commit:
   ```sh
   git commit -m "feat: added new feature description"
   ```
3. Push your branch:
   ```sh
   git push origin feature/your-feature-name
   ```
4. Open a **Pull Request** on GitHub, describing your changes.

## ✅ Checklist Before Submitting a PR

- [ ] Code follows project guidelines
- [ ] Tests pass (`npm run test`)
- [ ] No ESLint warnings/errors
- [ ] Changes documented in the PR description

## 🛠 Testing

Run tests to ensure everything works correctly:

```sh
npm run test
```

## 💡 Best Practices

- Keep PRs **small and focused**.
- Write **clear commit messages** using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
- Add comments where necessary.
- Update documentation if required.

## 📬 Need Help?

If you have any questions, feel free to create an **issue** or join our **Discord community**.

Happy coding! 🚀
