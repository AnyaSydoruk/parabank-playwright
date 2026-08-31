import { BASE_URL } from "../config/constants";

export class RegisterPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(`${BASE_URL}/register.htm`);
  }

  async register(customer) {
    await this.page
      .locator('[id="customer.firstName"]')
      .fill(customer.firstName);
    await this.page.locator('[id="customer.lastName"]').fill(customer.lastName);
    await this.page
      .locator('[id="customer.address.street"]')
      .fill(customer.street);
    await this.page.locator('[id="customer.address.city"]').fill(customer.city);
    await this.page
      .locator('[id="customer.address.state"]')
      .fill(customer.state);
    await this.page
      .locator('[id="customer.address.zipCode"]')
      .fill(customer.zipCode);
    await this.page.locator('[id="customer.phoneNumber"]').fill(customer.phone);
    await this.page.locator('[id="customer.ssn"]').fill(customer.ssn);
    await this.page.locator('[id="customer.username"]').fill(customer.username);
    await this.page.locator('[id="customer.password"]').fill(customer.password);
    await this.page.locator("#repeatedPassword").fill(customer.password);
    await this.page.getByRole("button", { name: "Register" }).click();
  }

  successMessage() {
    return this.page.getByText("Your account was created successfully");
  }
}
