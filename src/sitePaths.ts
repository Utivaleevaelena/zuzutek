const basePath = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/+$/, '')

/** Prefix root-relative application links and public assets for project-hosted builds. */
export function sitePath(value: string): string {
  if (!value.startsWith('/') || value.startsWith('//') || !basePath) return value
  return value === '/' ? `${basePath}/` : `${basePath}${value}`
}

/** Return the route path independently of the deployment base (for example /zuzutek/). */
export function currentRoutePath(): string {
  let pathname = window.location.pathname.replace(/\/+$/, '')

  if (basePath && pathname === basePath) return ''
  if (basePath && pathname.startsWith(`${basePath}/`)) pathname = pathname.slice(basePath.length)

  return pathname.replace(/\/+$/, '')
}
