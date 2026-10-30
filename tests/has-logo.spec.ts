import { test, expect } from "@playwright/test";
import { LitchiHubPage } from "../pages/litchi-hub.page";

test("shows the Litchi logo", async ({ page }) => {
  const hub = new LitchiHubPage(page);
  await hub.goto();
  await expect(hub.logo).toBeVisible();
});
