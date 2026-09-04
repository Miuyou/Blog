export function absoluteUrl(pathname: string, site: URL) {
  const base = site.href.endsWith('/') ? site : new URL(`${site.href}/`);
  return new URL(pathname.replace(/^\\//, ''), base);
}
