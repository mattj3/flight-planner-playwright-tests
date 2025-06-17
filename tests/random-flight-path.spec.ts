import { test, expect } from "@playwright/test";
import { LitchiHubPage } from "../pages/litchiHub.page";

test("should create random flightplan", async ({ page }) => {
  const hub = new LitchiHubPage(page);

  // Navigate to the page
  await hub.goto();

  // Perform search
  await hub.performSearch("Austin, TX");

  // Randomly click on map the provided number of times
  await hub.randomClicksOnMap(5);

  // Get total flightplan distance
  const totalDistance = await hub.getTotalDistance();
  console.log(totalDistance);

  // Take screenshot of flightplan
  await hub.takeScreenshot();
});
