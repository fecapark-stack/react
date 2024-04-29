export function getRemSize() {
  const isRemComputeSupport =
    typeof window !== "undefined" &&
    typeof window.getComputedStyle !== "undefined";

  if (!isRemComputeSupport) {
    return 16;
  }

  return parseFloat(getComputedStyle(document.documentElement).fontSize);
}
