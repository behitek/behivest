const ABSOLUTE_URL_PATTERN = /^https?:\/\//i;

export interface NormalizePathWithBaseOptions {
  path: string;
  basePath: string;
}

/**
 * Prefix a site-relative path with Astro's base path exactly once.
 */
export function normalizePathWithBase({
  path,
  basePath,
}: NormalizePathWithBaseOptions): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (basePath === '/') {
    return normalizedPath;
  }

  const baseWithoutTrailingSlash = basePath.replace(/\/$/, '');

  return normalizedPath.startsWith(`${baseWithoutTrailingSlash}/`)
    ? normalizedPath
    : `${baseWithoutTrailingSlash}${normalizedPath}`;
}

export interface BuildAbsoluteUrlOptions {
  pathOrUrl: string;
  basePath: string;
  site: string | URL;
}

/**
 * Convert a site-relative path into an absolute URL, preserving absolute URLs.
 */
export function buildAbsoluteUrl({
  pathOrUrl,
  basePath,
  site,
}: BuildAbsoluteUrlOptions): string {
  if (ABSOLUTE_URL_PATTERN.test(pathOrUrl)) {
    return new URL(pathOrUrl).toString();
  }

  return new URL(
    normalizePathWithBase({ path: pathOrUrl, basePath }),
    site
  ).toString();
}
