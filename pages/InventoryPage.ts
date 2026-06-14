import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly productItems: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.productItems = page.locator('.inventory_item');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link');
  }

  async expectLoaded() {
    await expect(this.pageTitle).toHaveText('Products');
    await expect(this.productItems).toHaveCount(6);
  }

  async addProductToCart(productName: string) {
    const product = this.page.locator('.inventory_item').filter({ hasText: productName });
    await product.locator('button').click();
  }

  async removeProductFromCart(productName: string) {
    const product = this.page.locator('.inventory_item').filter({ hasText: productName });
    await product.locator('button').click();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async getProductNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const priceTexts = await this.page.locator('.inventory_item_price').allTextContents();
    return priceTexts.map(p => parseFloat(p.replace('$', '')));
  }

  async goToCart() {
    await this.cartIcon.click();
  }
}
