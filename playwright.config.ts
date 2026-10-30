import { defineConfig, devices } from "@playwright/test";

const isCI = !!process.env.CI;
const slowMo = process.env.SLOWMO ? Number(process.env.SLOWMO) : undefined;

/**
 * The suite runs against the live Litchi Hub (https://flylitchi.com/hub),
 * a third-party map app. It is headless by default; use `npm run test:headed`
 * to watch it, and `SLOWMO=500 npm run test:headed` to slow it down.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: 0,
  workers: isCI ? 2 : undefined,
  timeout: 60_000,
  expect: { timeout: 15_000 },
  reporter: isCI
    ? [["html", { open: "never" }], ["github"], ["list"]]
    : [["html", { open: "never" }], ["list"]],
  use: {
    baseURL: "https://flylitchi.com",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
    viewport: { width: 1280, height: 800 },
    launchOptions: slowMo ? { slowMo } : {},
  },
  projects: [
    {
      // Page-load checks: no retries, a failure here is a real failure.
      name: "chromium",
      grepInvert: /@external/,
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } },
    },
    {
      // Tests that depend on the live geocoder and map tiles. These are
      // retried in CI because a slow tile server is not a product bug.
      name: "chromium-external",
      grep: /@external/,
      retries: isCI ? 2 : 0,
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } },
    },
  ],
});
