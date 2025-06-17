import { test, expect } from "@playwright/test";
import { LitchiHubPage } from "../pages/litchiHub.page";

test("Perform search", async ({ page }) => {
  const hub = new LitchiHubPage(page);

  await hub.goto();

  await hub.performSearch("Austin, TX");

  await hub.takeScreenshot();
});
