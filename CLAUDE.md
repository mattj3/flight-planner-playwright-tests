# flight-planner-playwright-tests

What this repo demonstrates: Playwright + TypeScript end-to-end tests with a page object, auto-retrying assertions and CI traces, against a live third-party web app (Litchi Hub).

Install: `npm ci && npx playwright install chromium`. Test: `npm test`. Lint: `npm run lint && npm run format:check && npm run typecheck`.
CI: `.github/workflows/playwright.yml`, runs on push to main, PRs, weekly schedule and manual dispatch.

Do not:

- Use `toBeTruthy()` on strings or numbers; assert the value (range, pattern, equality).
- Add `waitForTimeout` in tests; put waits in the page object behind a named method.
- Invent selectors. Every locator in `pages/` must be verified against the live site.
- Hard-code `headless: false` or `slowMo` in the config (use `npm run test:headed`, `SLOWMO=500`).

Conventions: locators live only in `pages/`; tests that need the live geocoder or map tiles are tagged `@external` (retried twice in CI); random paths use a printed seed (`FLIGHT_SEED`) so failures reproduce. ESLint/Prettier config is authoritative; keep `@playwright/test` pinned and let Dependabot bump it.
