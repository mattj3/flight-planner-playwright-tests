import { test, expect } from "@playwright/test";
import { LitchiHubPage } from "../pages/litchi-hub.page";

test("should search, and bring into view, Austin, TX", async ({ page }) => {
  const hub = new LitchiHubPage(page);

  await hub.goto();

  await hub.performSearch("Austin, TX");

  await hub.takeScreenshot();
});
