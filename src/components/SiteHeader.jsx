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

  const headerStyle = {
    position: "sticky",
    top: 0,
    zIndex: 10,
    background: glass ? "rgba(0,0,0,0.3)" : "transparent",
    backdropFilter: glass ? "blur(6px)" : "none",
    WebkitBackdropFilter: glass ? "blur(6px)" : "none",
    borderBottom: "none", 
    paddingTop: 12,
    paddingBottom: 12,
  };

  const containerStyle = {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "16px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 32,
    color: "#fff",
    textShadow: "0 1px 2px rgba(0,0,0,.35)", 
  };

  const brandStyle = {
    fontWeight: 700,
    fontSize: "1.5rem",
    letterSpacing: ".4px",
    textDecoration: "none",
    color: "inherit",
  };

  const navStyle = {
    display: "flex",
    gap: 16,
    alignItems: "center",
  };

  // Menu mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 900;

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
    <header style={headerStyle}>
      <div
        style={{
          ...containerStyle,
          justifyContent: isMobile ? "space-between" : containerStyle.justifyContent,
          gap: isMobile ? 12 : containerStyle.gap,
        }}
      >
        <a
          href="#home"
          style={{
            ...brandStyle,
            marginRight: isMobile ? "auto" : 0,
          }}
          onClick={(event) => {
            if (!onNavigate) return;
            event.preventDefault();
            onNavigate("home");
            setOpen(false);
          }}
        >
          {title}
        </a>

        {/* Desktop nav */}
        <nav style={{ ...navStyle, display: isMobile ? "none" : "flex" }}>
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

        {/* Burger mobile */}
        <button
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
          style={{
            display: isMobile ? "inline-flex" : "none",
            border: "1px solid rgba(255,255,255,.25)",
            background: "rgba(0,0,0,.25)",
            color: "#fff",
            padding: "6px 10px",
            borderRadius: 10,
          }}
        >
          ☰
        </button>
      </div>

      {/* Drawer mobile */}
      {open && (
        <div
          style={{
            display: isMobile ? "block" : "none",
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
        >
          <nav
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              padding: "8px 16px 16px",
              display: "grid",
              gap: 8,
            }}
          >
            {links.map((l) => {
              const sectionId = getSectionId(l.href);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={`${buildLinkClass(sectionId)} header-link--mobile`}
                  onClick={(event) => handleLinkClick(event, l.href, true)}
                  aria-current={sectionId === activeSection ? "page" : undefined}
                  style={{ display: "block" }}
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
