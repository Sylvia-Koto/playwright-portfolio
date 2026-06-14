import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async expectLoaded() {
    await expect(this.pageTitle).toHaveText('Your Cart');
  }

  async expectItemCount(count: number) {
    await expect(this.cartItems).toHaveCount(count);
  }

  async expectItemPresent(productName: string) {
    await expect(
      this.page.locator('.cart_item').filter({ hasText: productName })
    ).toBeVisible();
  }

  async removeItem(productName: string) {
    const item = this.page.locator('.cart_item').filter({ hasText: productName });
    await item.locator('button').click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
