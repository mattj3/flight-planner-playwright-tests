import { test, expect } from '@playwright/test';
import { LitchiHubPage } from '../pages/litchiHub.page';

test('should set waypoint and validate latitude input', async ({ page }) => {
    const hub = new LitchiHubPage(page);

    // Navigate to the page
    await hub.goto();

    // Perform search
    await hub.performSearch('Austin, TX');

    // Click on the map to add a waypoint (click middle of screen)
    await hub.clickOnMap();

    // Get latitude value
    const latitude = await hub.getLatitudeValue();

    // Print out latitude measurement value
    console.log(`Latitude value: ${latitude}`);

    // Validate latitude measurement
    expect(latitude).toBeTruthy();

    // Take screenshot 
    // await hub.takeScreenshot();
});
