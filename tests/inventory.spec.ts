import { expect } from '@playwright/test';
import { test } from '../fixtures/auth.fixture';
import { InventoryPage } from '../pages/InventoryPage';
import { PRODUCTS } from '../utils/test-data';

test.describe('Inventory', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ authenticatedPage }) => {
    inventoryPage = new InventoryPage(authenticatedPage);
  });

  test('displays 6 products', async () => {
    await inventoryPage.expectLoaded();
  });

  test('sort products A to Z', async () => {
    await inventoryPage.sortBy('az');
    const names = await inventoryPage.getProductNames();
    expect(names).toEqual([...names].sort());
  });

  test('sort products Z to A', async () => {
    await inventoryPage.sortBy('za');
    const names = await inventoryPage.getProductNames();
    expect(names).toEqual([...names].sort().reverse());
  });

  test('sort products by price low to high', async () => {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getProductPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('sort products by price high to low', async () => {
    await inventoryPage.sortBy('hilo');
    const prices = await inventoryPage.getProductPrices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('add product to cart updates badge', async ({ authenticatedPage }) => {
    const badge = authenticatedPage.locator('.shopping_cart_badge');
    await expect(badge).not.toBeVisible();
    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await expect(badge).toHaveText('1');
  });

  test('remove product from cart updates badge', async ({ authenticatedPage }) => {
    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.addProductToCart(PRODUCTS.bikeLight);
    const badge = authenticatedPage.locator('.shopping_cart_badge');
    await expect(badge).toHaveText('2');
    await inventoryPage.removeProductFromCart(PRODUCTS.backpack);
    await expect(badge).toHaveText('1');
  });
});
