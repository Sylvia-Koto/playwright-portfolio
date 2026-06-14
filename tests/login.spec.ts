import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { USERS } from '../utils/test-data';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('standard user can log in successfully', async ({ page }) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectLoaded();
    await expect(page).toHaveURL(/inventory/);
  });

  test('locked out user sees error message', async () => {
    await loginPage.login(USERS.lockedOut.username, USERS.lockedOut.password);
    await loginPage.expectError('Sorry, this user has been locked out');
  });

  test('wrong credentials show error', async () => {
    await loginPage.login('wrong_user', 'wrong_pass');
    await loginPage.expectError('Username and password do not match');
  });

  test('empty username shows error', async () => {
    await loginPage.login('', USERS.standard.password);
    await loginPage.expectError('Username is required');
  });

  test('empty password shows error', async () => {
    await loginPage.login(USERS.standard.username, '');
    await loginPage.expectError('Password is required');
  });
});
