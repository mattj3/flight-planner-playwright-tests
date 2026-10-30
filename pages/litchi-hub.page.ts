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

  /**
   * Types a place into the map search box, submits it, and waits until the
   * map has finished moving: first for the Google Places/geocoder response,
   * then for map-tile requests to go quiet. Both are polled conditions, not
   * fixed sleeps. ("networkidle" cannot be used: the page never reaches it.)
   */
  async performSearch(text: string): Promise<void> {
    await expect(this.searchInput).toBeVisible();
    await this.searchInput.fill(text);
    await expect(this.searchInput).toHaveValue(text);

    const seen: string[] = [];
    let lastMapRequest = Date.now();
    const onRequest = (url: string) => {
      if (MAP_HOST.test(url)) {
        seen.push(url);
        lastMapRequest = Date.now();
      }
    };
    const listener = (req: { url(): string }) => onRequest(req.url());
    this.page.on("request", listener);
    try {
      await this.searchInput.press("Enter");
      try {
        await expect
          .poll(() => seen.some((u) => SEARCH_REQUEST.test(u)), { timeout: 15_000 })
          .toBe(true);
      } catch {
        const sample = seen.slice(-25).map((u) => u.split("?")[0]);
        throw new Error(
          `No Places/geocoder request seen after searching "${text}". ` +
            `Map requests observed:\n${sample.join("\n") || "(none)"}`,
        );
      }
      // The map pans after the response; wait for tile loading to settle.
      await expect
        .poll(() => Date.now() - lastMapRequest, { timeout: 15_000, intervals: [250] })
        .toBeGreaterThan(MAP_QUIET_MS);
    } finally {
      this.page.off("request", listener);
    }
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

/** Requests to Google Maps hosts (API, tiles, imagery). */
const MAP_HOST = /^https:\/\/([a-z0-9-]+\.)*(googleapis\.com|gstatic\.com|google\.com)\//i;
/** A Places search / autocomplete / geocode call made when a search is submitted. */
const SEARCH_REQUEST = /(place|geocod|autocomplet|findplace|searchbox|textsearch)/i;
/** How long map-tile requests must be quiet before the map counts as settled. */
const MAP_QUIET_MS = 750;

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
