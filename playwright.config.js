// @ts-check
import { defineConfig, devices } from "@playwright/test";

const isCI = !!process.env.CI;

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: isCI,
  /* Retry on CI only */
  retries: isCI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: isCI ? 1 : undefined,
  /* Reporters: console output, HTML report, and JUnit XML for Jenkins. */
  reporter: [
    ["list"],
    ["html", { open: "never" }],
    ["junit", { outputFile: "results/junit.xml" }],
  ],
  /* Shared settings for all the projects below. */
  use: {
    /* Collect trace when retrying the failed test. */
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  /*
   * API tests live in their own project so they run once (not once per browser)
   * and can be launched separately in a dedicated Jenkins job.
   */
  projects: [
    {
      name: "api",
      testDir: "./tests/api",
    },
    {
      name: "chromium",
      testDir: "./tests/ui",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      testDir: "./tests/ui",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      testDir: "./tests/ui",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
