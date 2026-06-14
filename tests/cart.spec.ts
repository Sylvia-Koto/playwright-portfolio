import { expect } from '@playwright/test';
import { test } from '../fixtures/auth.fixture';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { PRODUCTS } from '../utils/test-data';

test.describe('Cart', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ authenticatedPage }) => {
    inventoryPage = new InventoryPage(authenticatedPage);
    cartPage = new CartPage(authenticatedPage);
  });

  test('cart is empty on first login', async () => {
    await inventoryPage.goToCart();
    await cartPage.expectLoaded();
    await cartPage.expectItemCount(0);
  });

  test('added items appear in cart', async () => {
    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.addProductToCart(PRODUCTS.bikeLight);
    await inventoryPage.goToCart();
    await cartPage.expectLoaded();
    await cartPage.expectItemCount(2);
    await cartPage.expectItemPresent(PRODUCTS.backpack);
    await cartPage.expectItemPresent(PRODUCTS.bikeLight);
  });

  test('item can be removed from cart', async () => {
    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.addProductToCart(PRODUCTS.bikeLight);
    await inventoryPage.goToCart();
    await cartPage.removeItem(PRODUCTS.backpack);
    await cartPage.expectItemCount(1);
    await cartPage.expectItemPresent(PRODUCTS.bikeLight);
  });

  test('continue shopping returns to inventory', async ({ authenticatedPage }) => {
    await inventoryPage.goToCart();
    await cartPage.continueShoppingButton.click();
    await expect(authenticatedPage).toHaveURL(/inventory\.html/);
  });
});
