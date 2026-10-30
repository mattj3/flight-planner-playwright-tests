import { test, expect } from "@playwright/test";
import { mulberry32 } from "../pages/litchi-hub.page";

// Offline check that the random flight path really is reproducible from its seed.
test("the seeded generator is deterministic and stays in [0, 1) @offline", () => {
  const a = mulberry32(42);
  const b = mulberry32(42);
  const seqA = Array.from({ length: 50 }, () => a());
  const seqB = Array.from({ length: 50 }, () => b());
  expect(seqA).toEqual(seqB);
  for (const v of seqA) {
    expect(v).toBeGreaterThanOrEqual(0);
    expect(v).toBeLessThan(1);
  }
  expect(mulberry32(43)()).not.toBe(seqA[0]);
});
