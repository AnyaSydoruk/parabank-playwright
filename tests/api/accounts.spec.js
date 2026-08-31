import { test, expect } from "@playwright/test";
import { API_BASE_URL, DEMO_USER } from "../../config/constants";

test.describe("ParaBank REST API", () => {
  test("Login returns customer id, and accounts list is retrievable", async ({
    request,
  }) => {
    const loginResponse = await request.get(
      `${API_BASE_URL}/login/${DEMO_USER.username}/${DEMO_USER.password}`,
      { headers: { Accept: "application/json" } },
    );
    expect(loginResponse.ok()).toBeTruthy();

    const customer = await loginResponse.json();
    expect(customer.id).toBeTruthy();

    const accountsResponse = await request.get(
      `${API_BASE_URL}/customers/${customer.id}/accounts`,
      { headers: { Accept: "application/json" } },
    );
    expect(accountsResponse.ok()).toBeTruthy();

    const accounts = await accountsResponse.json();
    expect(Array.isArray(accounts)).toBeTruthy();
    expect(accounts.length).toBeGreaterThan(0);
    expect(accounts[0]).toHaveProperty("id");
    expect(accounts[0]).toHaveProperty("type");
    expect(accounts[0]).toHaveProperty("balance");
  });
});
