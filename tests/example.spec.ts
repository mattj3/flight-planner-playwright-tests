import { test, expect } from '@playwright/test';

test('has logo', async ({ page }) => {
  await page.goto('https://flylitchi.com/hub');

  // Expect a logo
  const locator = page.locator('.btn.litchilogo');

  await expect(locator).toBeVisible();
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
