export class AccountsOverviewPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.getByRole("link", { name: "Accounts Overview" }).click();
  }

  async getFirstAccountId() {
    return this.page.locator("#accountTable tbody tr td a").first().innerText();
  }
}
