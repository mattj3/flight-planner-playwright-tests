import { test, expect } from "@playwright/test";
import { LitchiHubPage } from "../pages/litchi-hub.page";
import { AUSTIN, DISTANCE_PATTERN } from "./fixtures";

const SEED = Number(process.env.FLIGHT_SEED ?? 20261030);

test(`a random 5-waypoint mission has a positive total distance (seed ${SEED}) @external`, async ({
  page,
}, testInfo) => {
  testInfo.annotations.push({ type: "seed", description: String(SEED) });
  const hub = new LitchiHubPage(page);
  await hub.goto();
  await hub.performSearch(AUSTIN.query);

  await hub.randomClicksOnMap(5, SEED);

  await expect(hub.distance).toHaveText(DISTANCE_PATTERN);
  const text = await hub.getTotalDistanceText();
  const value = Number(text.match(DISTANCE_PATTERN)![1].replace(",", "."));
  expect(value).toBeGreaterThan(0);
});
