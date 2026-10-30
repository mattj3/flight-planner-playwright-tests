import { expect, type Locator, type Page } from "@playwright/test";

/** Page object for the Litchi Hub mission planner (https://flylitchi.com/hub). */
export class LitchiHubPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly latInput: Locator;
  readonly longInput: Locator;
  readonly logo: Locator;
  readonly distance: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator("input#pac-input");
    this.latInput = page.locator("#et-lat");
    this.longInput = page.locator("#et-long");
    this.logo = page.locator(".btn.litchilogo");
    this.distance = page.locator("#label-distance");
  }

  async goto(): Promise<void> {
    await this.page.goto("/hub");
    await expect(this.searchInput).toBeVisible();
  }

  /** Types a place into the map search box and submits it. */
  async performSearch(text: string): Promise<void> {
    await expect(this.searchInput).toBeVisible();
    await this.searchInput.fill(text);
    await expect(this.searchInput).toHaveValue(text);
    await this.searchInput.press("Enter");
    // Let the geocoder respond and the map pan before the next interaction.
    await this.page.waitForLoadState("networkidle").catch(() => undefined);
    await this.page.waitForTimeout(1_500);
  }

  /**
   * Clicks the map at a point given as fractions of the viewport
   * (0..1 on each axis). Defaults to the centre.
   */
  async clickOnMap(xFrac = 0.5, yFrac = 0.5): Promise<void> {
    if (xFrac < 0 || xFrac > 1 || yFrac < 0 || yFrac > 1) {
      throw new RangeError(`clickOnMap expects fractions in [0, 1], got (${xFrac}, ${yFrac})`);
    }
    const { width, height } = this.viewport();
    await this.page.mouse.click(width * xFrac, height * yFrac);
  }

  /**
   * Clicks the map `count` times at pseudo-random points. A seeded generator
   * makes a failing run reproducible: the seed is printed with every run.
   */
  async randomClicksOnMap(count: number, seed: number): Promise<Array<[number, number]>> {
    const rand = mulberry32(seed);
    const points: Array<[number, number]> = [];
    for (let i = 0; i < count; i++) {
      // Stay in the central 20-80% of the viewport, clear of the toolbars.
      const x = 0.2 + rand() * 0.6;
      const y = 0.2 + rand() * 0.6;
      points.push([x, y]);
      await this.clickOnMap(x, y);
    }
    return points;
  }

  async getLatitude(): Promise<number> {
    await expect(this.latInput).toBeVisible();
    await expect(this.latInput).not.toHaveValue("");
    return Number(await this.latInput.inputValue());
  }

  async getLongitude(): Promise<number> {
    await expect(this.longInput).toBeVisible();
    await expect(this.longInput).not.toHaveValue("");
    return Number(await this.longInput.inputValue());
  }

  async getTotalDistanceText(): Promise<string> {
    await expect(this.distance).toBeVisible();
    return (await this.distance.innerText()).trim();
  }

  private viewport(): { width: number; height: number } {
    const size = this.page.viewportSize();
    if (!size) throw new Error("Viewport size is not set");
    return size;
  }
}

/** Small deterministic PRNG (mulberry32). */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
