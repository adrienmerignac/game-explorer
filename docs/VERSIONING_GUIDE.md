# 🔄 Game Explorer - Versioning & Git Workflow Guide

## 📖 Why Versioning Matters

Versioning ensures **consistency, stability, and traceability** in the project's evolution. It helps manage updates effectively and facilitates team collaboration.

## 🏷️ Versioning Strategy

### 1️⃣ Semantic Versioning (SemVer)

Game Explorer follows **Semantic Versioning** (`MAJOR.MINOR.PATCH`):

- **MAJOR** → Breaking changes (`v2.0.0`)
- **MINOR** → New features, backward-compatible (`v1.1.0`)
- **PATCH** → Bug fixes or small improvements (`v1.0.1`)

Example:

```sh
git tag -a v1.1.0 -m "Release version 1.1.0"
git push origin v1.1.0
```

## 🌿 Git Workflow

### 2️⃣ Branching Strategy

Game Explorer uses **GitHub Flow**:

- `main` → Stable production-ready branch
- `develop` → Active development branch (optional)
- `feature/branch-name` → New features
- `bugfix/branch-name` → Bug fixes

### 3️⃣ Creating a New Feature Branch

```sh
git checkout -b feature/new-feature
```

After changes:

```sh
git add .
git commit -m "feat: added new feature"
git push origin feature/new-feature
```

## 🔄 Pull Request (PR) Workflow

### 4️⃣ Submitting a PR

1. Push changes to a feature branch.
2. Open a **Pull Request** on GitHub.
3. Request code review and make adjustments if needed.
4. Once approved, merge into `main` or `develop`.

## 🏷️ Tagging & Releases

### 5️⃣ Creating a Git Tag for a Release

```sh
git tag -a v1.2.0 -m "New feature release"
git push origin v1.2.0
```

Use **GitHub Releases** to publish versions.

## ⚙️ CI/CD & Automation

### 6️⃣ Automating Tests & Linting

- Run tests before merging:

```sh
npm run test
npm run lint
```

- Set up GitHub Actions for **continuous integration (CI/CD)**.

## ✅ Pre-Release Checklist

Before tagging a new version:

- [ ] Run all tests
- [ ] Ensure **documentation is updated**
- [ ] Check **dependencies** (`npm outdated`)
- [ ] Verify **changelog**

---

This guide ensures **efficient versioning and workflow management** for Game Explorer. 🚀
