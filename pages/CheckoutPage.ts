import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly confirmationTitle: Locator;
  readonly summaryTotal: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.confirmationTitle = page.locator('.complete-header');
    this.summaryTotal = page.locator('.summary_total_label');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async fillShippingInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async expectOrderSummaryVisible() {
    await expect(this.summaryTotal).toBeVisible();
  }

  async finish() {
    await this.finishButton.click();
  }

  async expectOrderConfirmed() {
    await expect(this.confirmationTitle).toHaveText('Thank you for your order!');
  }

  async expectError(message: string) {
    await expect(this.errorMessage).toContainText(message);
  }
}
