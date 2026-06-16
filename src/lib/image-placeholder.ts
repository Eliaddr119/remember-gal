// Warm cream SVG used as blur placeholder while remote images load.
// encodeURIComponent works in both Node and browser so no Buffer needed.
export const WARM_BLUR_PLACEHOLDER =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8'><rect width='8' height='8' fill='#f5e6c0'/></svg>"
  );
