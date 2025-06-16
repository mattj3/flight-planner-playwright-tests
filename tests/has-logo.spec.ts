import { test, expect } from '@playwright/test';
import { LitchiHubPage } from '../pages/litchiHub.page';

test('Verify logo visibility', async ({ page }) => {
    const hub = new LitchiHubPage(page);

    await hub.goto();

    expect(await hub.isLogoVisible()).toBeTruthy();
});
