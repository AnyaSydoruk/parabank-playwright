import { expect } from "@playwright/test";

export class OpenNewAccountPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.getByRole("link", { name: "Open New Account" }).click();
  }

  async waitForFundingAccountsLoaded() {
    // ParaBank's own AJAX call populates #fromAccountId asynchronously —
    // clicking too fast submits before accounts.selectedOption is set
    await this.page.waitForFunction(() => {
      const select = document.querySelector("#fromAccountId");
      return select && select.options.length > 0;
    });
  }

  async openAccount(accountType) {
    await this.waitForFundingAccountsLoaded();
    await this.page.locator("#type").selectOption(accountType);
    await this.page.getByRole("button", { name: "Open New Account" }).click();
  }

  async expectAccountOpened() {
    await expect(this.page.getByText("Account Opened!")).toBeVisible();
  }

  async getNewAccountId() {
    return this.page.locator("#newAccountId").innerText();
  }
}
