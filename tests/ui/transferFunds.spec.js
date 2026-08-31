import { test } from "@playwright/test";
import { RegisterPage } from "../../pages/RegisterPage";
import { AccountsOverviewPage } from "../../pages/AccountsOverviewPage";
import { OpenNewAccountPage } from "../../pages/OpenNewAccountPage";
import { TransferFundsPage } from "../../pages/TransferFundsPage";
import { generateTestCustomer } from "../../utils/testData";
import { ACCOUNT_TYPE, TRANSFER_AMOUNT } from "../../config/constants";

test.describe("Transfer Funds", () => {
  let fromAccountId, toAccountId;

  test.beforeEach(async ({ page }) => {
    const customer = generateTestCustomer();

    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register(customer);
    await registerPage.expectRegistrationSuccess();

    const accountsOverviewPage = new AccountsOverviewPage(page);
    await accountsOverviewPage.open();
    fromAccountId = await accountsOverviewPage.getFirstAccountId();

    const openNewAccountPage = new OpenNewAccountPage(page);
    await openNewAccountPage.open();
    await openNewAccountPage.openAccount(ACCOUNT_TYPE.SAVINGS);
    await openNewAccountPage.expectAccountOpened();
    toAccountId = await openNewAccountPage.getNewAccountId();
  });

  test("Transfer funds between own accounts", async ({ page }) => {
    const transferFundsPage = new TransferFundsPage(page);
    await transferFundsPage.open();
    await transferFundsPage.transfer({
      amount: TRANSFER_AMOUNT,
      fromAccountId,
      toAccountId,
    });
    await transferFundsPage.expectTransferComplete();
  });
});
