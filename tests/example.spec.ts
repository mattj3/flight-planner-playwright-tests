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
  // Commented out because 'toBeVisible' is considered a custom  assertion, which does not use Playwright's auto wait
  //await expect(inputField).toBeVisible();

  // Fill in the search text
  await inputField.fill('Austin, TX');

  // Simulate hitting Enter to perform search
  await inputField.press('Enter');

  // Add in assertion here
  //await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
