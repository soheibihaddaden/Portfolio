import { useState, useEffect } from "react";

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
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(getSectionId(href));
    if (shouldClose) setOpen(false);
  };

  return (
    <header className={headerClassName}>
      <div className="site-header__bar">
        <a
          href="#home"
          className="site-header__brand"
          onClick={(event) => {
            if (!onNavigate) return;
            event.preventDefault();
            onNavigate("home");
            setOpen(false);
          }}
        >
          {title}
        </a>

        <nav className="site-header__nav">
          {links.map((l) => {
            const sectionId = getSectionId(l.href);
            return (
              <a
                key={l.href}
                href={l.href}
                className={buildLinkClass(sectionId)}
                onClick={(event) => handleLinkClick(event, l.href)}
                aria-current={sectionId === activeSection ? "page" : undefined}
              >
                {l.label}
              </a>
            );
          })}
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
            width="32"
            height="32"
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
                  className={`${buildLinkClass(sectionId)} header-link--mobile`}
                  onClick={(event) => handleLinkClick(event, l.href, true)}
                  aria-current={sectionId === activeSection ? "page" : undefined}
                >
                  {l.label}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
