/**
 * Returns the appropriate icon class based on the current theme
 * @param isDark - Boolean indicating if the current theme is dark
 * @returns A string representing the CSS class for the icon
 */
export function getIconClassAndAction(isDark: boolean): string {
  return isDark ? "darkIcon" : "lightIcon";
}
