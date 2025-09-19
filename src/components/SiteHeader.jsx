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

  const headerClassName = glass ? "site-header site-header--glass" : "site-header";

  const getSectionId = (href) => (href?.startsWith("#") ? href.slice(1) : href);

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
            className="header-link lang-toggle"
            aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
            onClick={onToggleLang}
          >
            <span className={`fi ${lang === 'fr' ? 'fi-gb' : 'fi-fr'}`} aria-hidden="true" />
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

      {open && (
        <div className="site-header__drawer">
          <nav className="site-header__drawer-nav" id="mobile-nav">
            {links.map((l) => {
              const sectionId = getSectionId(l.href);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={`${buildLinkClass(sectionId)} header-link--mobile ${l.cta ? 'header-link--cta bubbles' : ''}`}
                  onClick={(event) => handleLinkClick(event, l.href, true)}
                  aria-current={sectionId === activeSection ? "page" : undefined}
                >
                  {l.cta ? <span className="text">{l.label}</span> : l.label}
                </a>
              );
            })}
            <button
              type="button"
              className="header-link header-link--mobile lang-toggle"
              aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
              onClick={() => { onToggleLang && onToggleLang(); setOpen(false); }}
            >
              <span className={`fi ${lang === 'fr' ? 'fi-gb' : 'fi-fr'}`} aria-hidden="true" />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
