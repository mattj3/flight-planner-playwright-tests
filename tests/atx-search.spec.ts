import { test, expect } from "@playwright/test";
import { LitchiHubPage } from "../pages/litchi-hub.page";
import { AUSTIN } from "./fixtures";

test("search for Austin, TX moves the map to Austin @external", async ({ page }) => {
  const hub = new LitchiHubPage(page);
  await hub.goto();
  await hub.performSearch(AUSTIN.query);

  await expect(hub.searchInput).toHaveValue(AUSTIN.query);

  // Dropping a waypoint at the centre proves where the map now is.
  await hub.clickOnMap();
  const lat = await hub.getLatitude();
  const lng = await hub.getLongitude();
  expect(lat).toBeGreaterThanOrEqual(AUSTIN.lat.min);
  expect(lat).toBeLessThanOrEqual(AUSTIN.lat.max);
  expect(lng).toBeGreaterThanOrEqual(AUSTIN.lng.min);
  expect(lng).toBeLessThanOrEqual(AUSTIN.lng.max);
});
