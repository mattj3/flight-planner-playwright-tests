// pages/litchiHub.page.ts
import { Page, Locator, expect } from '@playwright/test';

export class LitchiHubPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly mapCanvas: Locator;
  readonly latInput: Locator;
  readonly logo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('input#pac-input');
    this.mapCanvas = page.locator('#map canvas'); // Adjust if map uses a different structure
    this.latInput = page.locator('#et-lat');
    this.logo = page.locator('.btn.litchilogo');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://flylitchi.com/hub');
    // await this.page.waitForLoadState('networkidle');
  }

  async isLogoVisible(): Promise<boolean> {
    return await this.logo.isVisible();
  }

  async performSearch(text): Promise<void> {
    await this.searchInput.isVisible();
    
    // Fill in the search text and validate
    await this.searchInput.fill(text);
  
    // Simulate hitting Enter to perform search
    await this.searchInput.press('Enter');
  }

  async clickOnMap(x: number, y: number): Promise<void> {
    const box = await this.mapCanvas.boundingBox();
    if (box) {
      await this.page.mouse.click(box.x + x, box.y + y);
    }
  }

  // Add waypoint function here

  // async fillLatitude(lat: string): Promise<void> {
  //   await this.latInput.fill(lat);
  // }

  // async getLatitude(): Promise<string> {
  //   return this.latInput.inputValue();
  // }

  // async expectLatitudeToBe(expected: string): Promise<void> {
  //   const actual = await this.getLatitude();
  //   if (actual !== expected) {
  //     throw new Error(`Expected latitude to be "${expected}", but got "${actual}"`);
  //   }
  // }

  async takeScreenshot(): Promise<void> {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    await this.page.screenshot({ path: `screenshots/screenshot-${timestamp}.png` });
  }
}
