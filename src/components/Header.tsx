import { content } from '../content.ts'

export function Header() {
  const { navigation, cta } = content.header
  const pathname = window.location.pathname.replace(/\/+$/, '')
  return (
    <header className="site-header">
      <nav className="site-header__nav" aria-label="Primary">
        <a className="site-header__logo" href="/" aria-label="ZuzuTek — home">
          <img src="/assets/h01/zuzutek-logo.png" width={2172} height={724} alt="ZuzuTek" />
        </a>
        <ul className="site-header__links">
          {navigation.map((item) => (
            <li key={item.href}>
              <a href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          className="btn btn--primary btn--small"
          href={cta.href}
          aria-current={pathname === cta.href ? 'page' : undefined}
        >
          {cta.label}
        </a>
      </nav>
    </header>
  )
}
