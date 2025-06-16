import { test, expect } from '@playwright/test';

test('has logo', async ({ page }) => {
  await page.goto('https://flylitchi.com/hub');

  // Expect a logo
  const logo = page.locator('.btn.litchilogo');
  await expect(logo).toBeVisible();
});

test('search for Austin, TX', async ({ page }) => {
  await page.goto('https://flylitchi.com/hub');

  // Create locator for Search input
  const inputField = page.locator('input#pac-input');

  // Confirm it's visible
  await expect(inputField).toBeVisible();

  // Fill in the search text
  await inputField.fill('Austin, TX');

  // Simulate hitting Enter to perform search
  await inputField.press('Enter');
});

test('add way point', async ({ page }) => {
  await page.goto('https://flylitchi.com/hub');

  // Create locator for Search input
  const inputField = page.locator('input#pac-input');
  await expect(inputField).toBeVisible();

  // Fill in the search text
  await inputField.fill('Austin, TX');
  await expect(inputField).toHaveValue('Austin, TX');

  // Simulate hitting Enter to perform search
  await inputField.press('Enter');

  // Get viewport size
  const { width, height } = page.viewportSize()!;

  // Click the center of the viewport (center of map for flight tracker)
  await page.mouse.click(width / 2, height / 2);

  // Ensure the element exists and retrieve its value
  const latInput = page.locator('#et-lat');
  // Wait until the element is visible and stable before interacting
  await latInput.waitFor({ state: 'visible' });
  const latInputValue = await latInput.inputValue();
  console.log(`Latitude input value: ${latInputValue}`);
});
