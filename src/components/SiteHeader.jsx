import { useState, useEffect } from "react";
import logo from "../logo.svg";

export default function SiteHeader({
  title = "Mon Portfolio",
  links = [
    { label: "Accueil", href: "#home" },
    { label: "CV", href: "#cv" },
    { label: "Travail", href: "#work" },
    { label: "Contact", href: "#contact" },
    { label: "Embauchez-moi", href: "#hire-me" },
  ],
  glass = false,
  activeSection = "home",
  onNavigate,
  lang = 'fr',
  onToggleLang,
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 900) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    if (typeof document === "undefined") return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const headerClassName = glass ? "site-header site-header--glass" : "site-header";

  const getSectionId = (href) => (href?.startsWith("#") ? href.slice(1) : href);

  const triggerBubble = (event) => {
    const el = event.currentTarget;
    el.classList.add("is-bubbling");
    window.setTimeout(() => {
      el.classList.remove("is-bubbling");
    }, 620);
  };

  const buildLinkClass = (sectionId) => {
    const base = "header-link";
    if (!sectionId) return base;
    return sectionId === activeSection ? `${base} is-active` : base;
  };

  const handleLinkClick = (event, href, shouldClose = false) => {
    event.preventDefault();
    const dest = getSectionId(href);
    // Si on est déjà sur la même section, ne pas déclencher l'animation
    if (dest === activeSection) {
      if (shouldClose) setOpen(false);
      return;
    }
    if (onNavigate) onNavigate(dest);
    if (shouldClose) setOpen(false);
  };

  const closeDrawer = () => setOpen(false);

  return (
    <header className={headerClassName}>
      <div className="site-header__bar">
        <a
          href="#home"
          className="site-header__brand"
          onClick={(event) => {
            event.preventDefault();
            if (activeSection === "home") return;
            if (onNavigate) onNavigate("home");
            setOpen(false);
          }}
        >
          <img src={logo} alt={title} className="brand-logo" />
        </a>

        <nav className="site-header__nav">
          {links.map((l) => {
            const sectionId = getSectionId(l.href);
            return (
              <a
                key={l.href}
                href={l.href}
                className={`${buildLinkClass(sectionId)} ${l.cta ? 'header-link--cta bubbles' : ''}`}
                onTouchStart={l.cta ? triggerBubble : undefined}
                onClick={(event) => handleLinkClick(event, l.href)}
                aria-current={sectionId === activeSection ? "page" : undefined}
              >
                {l.cta ? <span className="text">{l.label}</span> : l.label}
              </a>
            );
          })}
          {/* Language toggle: shows the opposite flag (target language) */}
          <button
            type="button"
            className="header-link lang-toggle bubbles"
            aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
            onTouchStart={triggerBubble}
            onClick={onToggleLang}
          >
            <span className="text">
              <span className={`fi ${lang === 'fr' ? 'fi-gb' : 'fi-fr'}`} aria-hidden="true" />
            </span>
          </button>
        </nav>

        <button
          aria-label="Menu"
          className="site-header__menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#34e4ea"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 5h18" />
            <path d="M3 12h18" />
            <path d="M3 19h18" />
          </svg>
          <span className="visually-hidden">Ouvrir le menu</span>
        </button>
      </div>

      <div
        className={`site-header__drawer ${open ? "is-open" : ""}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          className="site-header__drawer-backdrop"
          onClick={closeDrawer}
          tabIndex={-1}
          aria-hidden="true"
        />
        <nav
          className="site-header__drawer-panel"
          id="mobile-nav"
          aria-hidden={!open}
          tabIndex={open ? undefined : -1}
        >
          <div className="site-header__drawer-head">
            <a
              href="#home"
              className="site-header__drawer-brand"
              onClick={(event) => handleLinkClick(event, "#home", true)}
            >
              <img src={logo} alt={title} />
            </a>
            <button
              type="button"
              className="site-header__drawer-close"
              onClick={closeDrawer}
              aria-label={lang === 'fr' ? 'Fermer le menu' : 'Close menu'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <div className="site-header__drawer-nav">
            {links.map((l) => {
              const sectionId = getSectionId(l.href);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={`${buildLinkClass(sectionId)} header-link--mobile ${l.cta ? 'header-link--cta bubbles' : ''}`}
                  onTouchStart={l.cta ? triggerBubble : undefined}
                  onClick={(event) => handleLinkClick(event, l.href, true)}
                  aria-current={sectionId === activeSection ? "page" : undefined}
                >
                  {l.cta ? <span className="text">{l.label}</span> : l.label}
                </a>
              );
            })}
            <button
              type="button"
              className="header-link header-link--mobile lang-toggle bubbles"
              aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
              onTouchStart={triggerBubble}
              onClick={() => {
                onToggleLang && onToggleLang();
                closeDrawer();
              }}
            >
              <span className="text">
                <span className={`fi ${lang === 'fr' ? 'fi-gb' : 'fi-fr'}`} aria-hidden="true" />
              </span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
