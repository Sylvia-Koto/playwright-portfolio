# Playwright Portfolio — Sylvia N'Guessan

> Automated test suite for [SauceDemo](https://www.saucedemo.com) built with **Playwright + TypeScript**, showcasing real-world QA engineering practices and **Claude MCP integration**.

[![Playwright Tests](https://github.com/Sylvia-Koto/playwright-portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/Sylvia-Koto/playwright-portfolio/actions)

---

## What this project demonstrates

| Skill | Implementation |
|---|---|
| Page Object Model | `pages/` — one class per page, typed locators |
| Custom Fixtures | `fixtures/auth.fixture.ts` — shared authenticated session |
| Test data separation | `utils/test-data.ts` — no hardcoded values in specs |
| Multi-browser testing | Chromium, Firefox, Mobile Chrome |
| CI/CD | GitHub Actions — runs on every push/PR |
| Reporting | HTML report + JUnit XML uploaded as artifacts |
| Retry & trace | Auto-retry on CI with Playwright traces on failure |
| MCP Integration | Claude Code drives the browser via `@playwright/mcp` |

---

## Project structure

```
playwright-portfolio/
├── .github/workflows/playwright.yml   # CI/CD pipeline
├── .claude/mcp.json                   # Claude MCP configuration
├── pages/                             # Page Object Model
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/
│   ├── login.spec.ts                  # Authentication scenarios
│   ├── inventory.spec.ts              # Product listing & sorting
│   ├── cart.spec.ts                   # Cart management
│   └── e2e-checkout.spec.ts           # Full purchase flow
├── fixtures/
│   └── auth.fixture.ts                # Reusable authenticated page
├── utils/
│   └── test-data.ts                   # Centralised test data
└── playwright.config.ts
```

---

## Getting started

```bash
# Install dependencies
npm install

# Install browsers
npx playwright install

# Run all tests
npm test

# Run with UI mode
npm run test:ui

# Open last HTML report
npm run report
```

---

## Claude MCP Integration

This project uses [`@playwright/mcp`](https://github.com/microsoft/playwright-mcp) which exposes Playwright browser control as MCP tools.

With Claude Code connected, Claude can:
- Navigate to pages and inspect the DOM
- Fill forms and click elements
- Take screenshots to verify UI state
- Generate or debug tests by actually interacting with the live app

To activate it in Claude Code:
```bash
claude mcp add playwright -- npx @playwright/mcp@latest
```

Then Claude can browse saucedemo.com directly while helping you write or debug tests.

---

## Test coverage

| Suite | Scenarios |
|---|---|
| Login | Valid login, locked user, wrong credentials, empty fields |
| Inventory | Product count, sorting (A-Z, Z-A, price), cart badge |
| Cart | Empty cart, add items, remove items, continue shopping |
| E2E Checkout | Full flow, missing first/last name, missing postal code |
