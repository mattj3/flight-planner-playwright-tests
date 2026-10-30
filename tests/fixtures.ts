/** Shared expectations for searches centred on Austin, TX. */
export const AUSTIN = {
  query: "Austin, TX",
  // Generous box around central Austin: a click anywhere on a 1280x800
  // map view centred on the city should land inside it.
  lat: { min: 29.9, max: 30.7 },
  lng: { min: -98.2, max: -97.3 },
} as const;

/** Distance label: a positive number followed by a unit, e.g. "1.2 km" or "850 ft". */
export const DISTANCE_PATTERN = /(\d+(?:[.,]\d+)?)\s*(m|km|ft|mi|nm)\b/i;
