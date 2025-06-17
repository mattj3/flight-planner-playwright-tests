import { test, expect } from "@playwright/test";
import { LitchiHubPage } from "../pages/litchi-hub.page";

test("should verify logo is visible", async ({ page }) => {
  const hub = new LitchiHubPage(page);

  await hub.goto();

  expect(await hub.isLogoVisible()).toBeTruthy();
});
