# 🧪 Game Explorer - Testing Guide

## 📖 Why Testing Matters

Testing ensures that Game Explorer remains stable and functional as new features and changes are introduced. Automated tests help catch bugs early, improve maintainability, and ensure a better developer experience.

## 🛠 Types of Tests

We use different types of tests to cover various aspects of the application:

### ✅ Unit Tests

- Test individual **React components** in isolation.
- Ensure functions return expected outputs.
- Uses **Jest** and **React Testing Library**.

### 🔄 Integration Tests

- Test how multiple components interact.
- Ensure API calls return the expected data.
- Uses **Jest** and **MSW (Mock Service Worker)** for API mocks.

### 🌐 End-to-End (E2E) Tests

- Simulate user interactions and test the full user experience.
- Ensure features work across different devices and browsers.
- Uses **Cypress** or **Playwright**.

## 🏗 Setting Up Tests

Before running tests, ensure dependencies are installed:

```sh
npm install --save-dev jest @testing-library/react @testing-library/jest-dom msw cypress
```

## ✍️ Writing Unit Tests with Jest & React Testing Library

Create a test file for a component: `src/components/Header/Header.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import Header from "./Header";

test("renders the header title", () => {
  render(<Header />);
  expect(screen.getByText(/Game Explorer/i)).toBeInTheDocument();
});
```

## 🔄 Running Tests

To run all unit and integration tests:

```sh
npm run test
```

To run tests in **watch mode**:

```sh
npm run test:watch
```

## 🌐 Running End-to-End (E2E) Tests with Cypress

1. Start the development server:
   ```sh
   npm run dev
   ```
2. Open Cypress:
   ```sh
   npx cypress open
   ```
3. Run tests interactively or in headless mode:
   ```sh
   npm run test:e2e
   ```

## 🎯 Best Practices for Writing Tests

- **Keep tests independent** – avoid shared state across tests.
- **Use mock data** – prevent API overuse in tests.
- **Test both success and failure cases**.
- **Aim for high coverage but focus on critical features.**

## 🚀 Future Improvements

- Add **visual regression tests** with Storybook.
- Implement **performance testing**.
- Automate **CI/CD pipelines** to run tests on pull requests.

This guide provides a structured approach to testing in Game Explorer. Happy testing! 🧪
