export class OpenNewAccountPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.getByRole("link", { name: "Open New Account" }).click();
  }

  async waitForFundingAccountsLoaded() {
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

  successMessage() {
    return this.page.getByText("Account Opened!");
  }

  async getNewAccountId() {
    return this.page.locator("#newAccountId").innerText();
  }
}
