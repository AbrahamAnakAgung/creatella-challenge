/**
 * Check whether or not this Element is in viewport
 * @param {Element} element 
 * @return {boolean} True if element is in viewport, False otherwise 
 */
export function isInViewport(element) {
  if (!element) return;

  const el = element.getBoundingClientRect();
  return !(
    el.top > window.innerHeight ||
    el.bottom < 0 ||
    el.left > window.innerWidth ||
    el.right < 0
  );
}
