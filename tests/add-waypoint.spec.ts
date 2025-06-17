import { test, expect } from '@playwright/test';
import { LitchiHubPage } from '../pages/litchiHub.page';

test('should set waypoint and validate latitude input', async ({ page }) => {
  const hub = new LitchiHubPage(page);

  await hub.goto();

  // perform search for city

  // click on map (required to add first waypoint - can click middle of screen)

  // confirm lat measurement is set 

  // print out lat measurement 

  // take screenshot (optional)

});
