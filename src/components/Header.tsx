import { useEffect, useRef, useState } from 'react'
import { content } from '../content.ts'
import { currentRoutePath, sitePath } from '../sitePaths.ts'

export function Header() {
  const { navigation, cta } = content.header
  const pathname = currentRoutePath()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!menuOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      menuButtonRef.current?.focus()
    }
    const desktopQuery = window.matchMedia('(min-width: 768px)')
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false)
    }

    document.addEventListener('keydown', closeOnEscape)
    desktopQuery.addEventListener('change', closeOnDesktop)
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      desktopQuery.removeEventListener('change', closeOnDesktop)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`site-header${menuOpen ? ' site-header--menu-open' : ''}`}>
      <nav className="site-header__nav" aria-label="Primary">
        <a className="site-header__logo" href={sitePath('/')} aria-label="ZuzuTek — home" onClick={closeMenu}>
          <img src={sitePath('/assets/h01/zuzutek-logo.png')} width={2172} height={724} alt="ZuzuTek" />
        </a>
        <button
          ref={menuButtonRef}
          className="site-header__menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
        <ul id="primary-navigation" className="site-header__links" data-open={menuOpen}>
          {navigation.map((item) => (
            <li key={item.href}>
              <a
                href={sitePath(item.href)}
                aria-current={pathname === item.href ? 'page' : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="site-header__mobile-cta">
            <a
              className="btn btn--primary"
              href={sitePath(cta.href)}
              aria-current={pathname === cta.href ? 'page' : undefined}
              onClick={closeMenu}
            >
              {cta.label}
            </a>
          </li>
        </ul>
        <a
          className="site-header__cta btn btn--primary btn--small"
          href={sitePath(cta.href)}
          aria-current={pathname === cta.href ? 'page' : undefined}
        >
          {cta.label}
        </a>
      </nav>
    </header>
  )
}
