import { test, expect } from "@playwright/test";
import { LitchiHubPage } from "../pages/litchi-hub.page";
import { AUSTIN } from "./fixtures";

test("a second waypoint to the north-west has a higher latitude and lower longitude @external", async ({
  page,
}) => {
  const hub = new LitchiHubPage(page);
  await hub.goto();
  await hub.performSearch(AUSTIN.query);

  await hub.clickOnMap(0.5, 0.5);
  const first = { lat: await hub.getLatitude(), lng: await hub.getLongitude() };
  const firstLatRaw = await hub.latInput.inputValue();

  await hub.clickOnMap(0.35, 0.35);
  // The coordinate fields show the selected (latest) waypoint.
  await expect(hub.latInput).not.toHaveValue(firstLatRaw);
  const second = { lat: await hub.getLatitude(), lng: await hub.getLongitude() };

  expect(second.lat).toBeGreaterThan(first.lat);
  expect(second.lng).toBeLessThan(first.lng);
  for (const p of [first, second]) {
    expect(p.lat).toBeGreaterThanOrEqual(AUSTIN.lat.min);
    expect(p.lat).toBeLessThanOrEqual(AUSTIN.lat.max);
    expect(p.lng).toBeGreaterThanOrEqual(AUSTIN.lng.min);
    expect(p.lng).toBeLessThanOrEqual(AUSTIN.lng.max);
  }
});
