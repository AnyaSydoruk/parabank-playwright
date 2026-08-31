import { expect } from "@playwright/test";

export class TransferFundsPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.getByRole("link", { name: "Transfer Funds" }).click();
  }

  async transfer({ amount, fromAccountId, toAccountId }) {
    await this.page.locator("#amount").fill(amount);
    await this.page.locator("#fromAccountId").selectOption(fromAccountId);
    await this.page.locator("#toAccountId").selectOption(toAccountId);
    await this.page.getByRole("button", { name: "Transfer" }).click();
  }

  async expectTransferComplete() {
    await expect(this.page.getByText("Transfer Complete!")).toBeVisible();
  }
}
