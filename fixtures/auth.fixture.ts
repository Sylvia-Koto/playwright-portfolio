import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

type AuthFixtures = {
  authenticatedPage: Page;
  lockedOutPage: Page;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      process.env.STANDARD_USER!,
      process.env.STANDARD_PASSWORD!
    );
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectLoaded();
    await use(page);
  },

  lockedOutPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      process.env.LOCKED_USER!,
      process.env.LOCKED_PASSWORD!
    );
    await use(page);
  },
});

export { expect } from '@playwright/test';
