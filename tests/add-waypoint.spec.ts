import { test, expect } from "@playwright/test";
import { LitchiHubPage } from "../pages/litchi-hub.page";
import { AUSTIN } from "./fixtures";

test("adding a waypoint fills in finite coordinates inside Austin @external", async ({ page }) => {
  const hub = new LitchiHubPage(page);
  await hub.goto();
  await hub.performSearch(AUSTIN.query);
  await hub.clickOnMap();

  const lat = await hub.getLatitude();
  const lng = await hub.getLongitude();

  expect(Number.isFinite(lat)).toBe(true);
  expect(Number.isFinite(lng)).toBe(true);
  expect(lat).toBeGreaterThanOrEqual(AUSTIN.lat.min);
  expect(lat).toBeLessThanOrEqual(AUSTIN.lat.max);
  expect(lng).toBeGreaterThanOrEqual(AUSTIN.lng.min);
  expect(lng).toBeLessThanOrEqual(AUSTIN.lng.max);
});
