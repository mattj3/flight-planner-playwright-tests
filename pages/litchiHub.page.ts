import { Page, Locator } from "@playwright/test";

export class LitchiHubPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly latInput: Locator;
  readonly logo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator("input#pac-input");
    this.latInput = page.locator("#et-lat");
    this.logo = page.locator(".btn.litchilogo");
  }

  async goto(): Promise<void> {
    await this.page.goto("https://flylitchi.com/hub");
  }

  async isLogoVisible(): Promise<boolean> {
    return await this.logo.isVisible();
  }

  async performSearch(text: string): Promise<void> {
    await this.searchInput.isVisible();

    // Fill in the search text and validate
    await this.searchInput.fill(text);

    // Simulate hitting Enter to perform search
    await this.searchInput.press("Enter");
  }

  async clickOnMap(offset?: number): Promise<void> {
    const { width, height } = this.page.viewportSize()!;

    // Ensure offset has a valid value; default to center if it's not set properly
    const xOffset = offset ? width / offset : width / 2;
    const yOffset = offset ? height / offset : height / 2;
    await this.page.mouse.click(xOffset, yOffset);
  }

  async randomClicksOnMap(numOfClicks: number): Promise<void> {
    const { width, height } = this.page.viewportSize()!;
    function getRandomInt(min: number, max: number): number {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    for (let i = 0; i < numOfClicks; ) {
      let randomValue = getRandomInt(2, 10);
      let randomValue2 = getRandomInt(2, 10);
      let xOffset = randomValue ? width / randomValue : width / 2;
      let yOffset = randomValue2 ? height / randomValue2 : height / 2;

      await this.page.mouse.click(xOffset, yOffset);
      i++;
    }
  }

  async getLatitudeValue(): Promise<string> {
    const latInput = this.page.locator("#et-lat");
    await latInput.waitFor({ state: "visible" });
    const latInputValue = await latInput.inputValue();

    return latInputValue;
  }

  async getLongitudeValue(): Promise<string> {
    const longInput = this.page.locator("#et-long");
    await longInput.waitFor({ state: "visible" });
    const longInputValue = await longInput.inputValue();

    return longInputValue;
  }

  async getTotalDistance(): Promise<string> {
    const distanceValue = await this.page
      .locator("#label-distance")
      .innerText();

    return distanceValue;
  }

  async takeScreenshot(): Promise<void> {
    const timestamp = new Date().toISOString().replace(/:/g, "-");
    await this.page.screenshot({
      path: `screenshots/screenshot-${timestamp}.png`,
    });
  }
}
