/**
 * Generates a route with the specified locale.
 * @param pathname - The current pathname (e.g., '/en/about')
 * @param locale - The target locale (e.g., 'he', 'en')
 * @returns The new path with the updated locale
 */
export function getRoute(pathname: string, locale?: string): string {
  const pathnames = pathname.split('/');
  
  if (!pathnames || pathnames.length < 2) {
    return `/${locale || 'en'}`;
  }

  if (locale) {
    pathnames[1] = locale;
  } else if (pathnames[1] === 'he') {
    pathnames[1] = 'en';
  } else {
    pathnames[1] = 'he';
  }

  return pathnames.join('/');
}
