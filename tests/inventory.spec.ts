import { expect } from '@playwright/test';
import { test } from '../fixtures/auth.fixture';
import { InventoryPage } from '../pages/InventoryPage';
import { PRODUCTS } from '../utils/test-data';

const SORTED_AZ = [
  PRODUCTS.backpack,
  PRODUCTS.bikeLight,
  PRODUCTS.boltTShirt,
  PRODUCTS.fleeceJacket,
  PRODUCTS.onesie,
  PRODUCTS.redTShirt,
];

const SORTED_ZA = [...SORTED_AZ].reverse();

const PRICES_LOW_TO_HIGH = [7.99, 9.99, 15.99, 15.99, 29.99, 49.99];
const PRICES_HIGH_TO_LOW = [...PRICES_LOW_TO_HIGH].reverse();

test.describe('Inventory', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ authenticatedPage }) => {
    inventoryPage = new InventoryPage(authenticatedPage);
  });

  test('displays 6 products', async () => {
    await inventoryPage.expectLoaded();
  });

  test.describe('Sorting', () => {
    test('default sort is A to Z', async () => {
      const names = await inventoryPage.getProductNames();
      expect(names).toEqual(SORTED_AZ);
    });

    test('sort A to Z', async () => {
      await inventoryPage.sortBy('az');
      const names = await inventoryPage.getProductNames();
      expect(names).toEqual(SORTED_AZ);
      expect(names[0]).toBe(PRODUCTS.backpack);
      expect(names[names.length - 1]).toBe(PRODUCTS.redTShirt);
    });

    test('sort Z to A', async () => {
      await inventoryPage.sortBy('za');
      const names = await inventoryPage.getProductNames();
      expect(names).toEqual(SORTED_ZA);
      expect(names[0]).toBe(PRODUCTS.redTShirt);
      expect(names[names.length - 1]).toBe(PRODUCTS.backpack);
    });

    test('sort by price low to high', async () => {
      await inventoryPage.sortBy('lohi');
      const prices = await inventoryPage.getProductPrices();
      expect(prices).toEqual(PRICES_LOW_TO_HIGH);
      expect(prices[0]).toBe(7.99); // Onesie
      expect(prices[prices.length - 1]).toBe(49.99); // Fleece Jacket
    });

    test('sort by price high to low', async () => {
      await inventoryPage.sortBy('hilo');
      const prices = await inventoryPage.getProductPrices();
      expect(prices).toEqual(PRICES_HIGH_TO_LOW);
      expect(prices[0]).toBe(49.99); // Fleece Jacket
      expect(prices[prices.length - 1]).toBe(7.99); // Onesie
    });

    test('all 6 products remain visible after each sort', async () => {
      for (const option of ['az', 'za', 'lohi', 'hilo'] as const) {
        await inventoryPage.sortBy(option);
        await inventoryPage.expectLoaded();
      }
    });
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
