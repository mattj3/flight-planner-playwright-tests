// tests/latitude.spec.ts
import { test, expect } from '@playwright/test';
import { LitchiHubPage } from '../pages/litchiHub.page';

test('should set and validate latitude input', async ({ page }) => {
  const hub = new LitchiHubPage(page);

  await hub.goto();

  const testLat = '37.7749';
  await hub.fillLatitude(testLat);
  await hub.expectLatitudeToBe(testLat);

  // Optional: validate using expect directly
  const actualLat = await hub.getLatitude();
  expect(actualLat).toBe(testLat);
});
