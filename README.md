# UI Automation

Playwright test automation for Conduit app using TypeScript and Page Object Model.

## Setup

1. Install dependencies:
   ```bash
   npm install
   npx playwright install
   ```

2. Create `.env` file in root:
   ```env
   BASE_URL='https://conduit.bondaracademy.com'
   USEREMAIL='your-email@example.com'
   PASSWORD='your-password'
   ```

## Commands

- Run all tests:
  ```bash
  npm test
  ```

- Run article spec:
  ```bash
  npm run test:article
  ```

- View HTML report:
  ```bash
  npx playwright show-report
  ```

- Build check:
  ```bash
  npm run build
  ```
