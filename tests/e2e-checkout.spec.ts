import { expect } from '@playwright/test';
import { test } from '../fixtures/auth.fixture';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PRODUCTS, SHIPPING } from '../utils/test-data';

test.describe('E2E Checkout Flow', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ authenticatedPage }) => {
    inventoryPage = new InventoryPage(authenticatedPage);
    cartPage = new CartPage(authenticatedPage);
    checkoutPage = new CheckoutPage(authenticatedPage);
  });

  test('complete purchase from login to confirmation', async ({ authenticatedPage }) => {
    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.addProductToCart(PRODUCTS.fleeceJacket);

    await inventoryPage.goToCart();
    await cartPage.expectItemCount(2);
    await cartPage.checkout();

    await expect(authenticatedPage).toHaveURL(/checkout-step-one/);
    await checkoutPage.fillShippingInfo(
      SHIPPING.valid.firstName,
      SHIPPING.valid.lastName,
      SHIPPING.valid.postalCode
    );

    await expect(authenticatedPage).toHaveURL(/checkout-step-two/);
    await checkoutPage.expectOrderSummaryVisible();
    await checkoutPage.finish();

    await checkoutPage.expectOrderConfirmed();
    await expect(authenticatedPage).toHaveURL(/checkout-complete/);
  });

  test('checkout fails without shipping info', async ({ authenticatedPage }) => {
    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.goToCart();
    await cartPage.checkout();
    await checkoutPage.fillShippingInfo('', '', '');
    await checkoutPage.expectError('First Name is required');
  });

  test('checkout fails without last name', async ({ authenticatedPage }) => {
    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.goToCart();
    await cartPage.checkout();
    await checkoutPage.fillShippingInfo(SHIPPING.valid.firstName, '', '');
    await checkoutPage.expectError('Last Name is required');
  });

  test('checkout fails without postal code', async ({ authenticatedPage }) => {
    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.goToCart();
    await cartPage.checkout();
    await checkoutPage.fillShippingInfo(
      SHIPPING.valid.firstName,
      SHIPPING.valid.lastName,
      ''
    );
    await checkoutPage.expectError('Postal Code is required');
  });
});
