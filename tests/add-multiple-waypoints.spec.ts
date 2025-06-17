import { test, expect } from "@playwright/test";
import { LitchiHubPage } from "../pages/litchi-hub.page";

test("should set multiple waypoints and validate latitude inputs", async ({
  page,
}) => {
  const hub = new LitchiHubPage(page);

  // Navigate to the page
  await hub.goto();

  // Perform search
  await hub.performSearch("Austin, TX");

  // Click on the map to add first waypoint (click middle of screen)
  await hub.clickOnMap();

  // Get latitude value
  const latitude = await hub.getLatitudeValue();

  // Print out latitude measurement value
  console.log(`Latitude value 1: ${latitude}`);

  // Validate latitude measurement
  expect(latitude).toBeTruthy();

  // Click on the map to add second waypoint
  await hub.clickOnMap(3);

  // Get latitude value
  const latitudeTwo = await hub.getLatitudeValue();

  // Print out latitude measurement value
  console.log(`Latitude value 2: ${latitudeTwo}`);

  // Validate latitude measurement
  expect(latitudeTwo).toBeTruthy();

  // Take screenshot
  // await hub.takeScreenshot();
});
