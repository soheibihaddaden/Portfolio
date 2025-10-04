import { useEffect, useMemo, useState } from "react";
import StarsBG from "./style";
import logoAnim from "./logo_anim.svg";
import SiteHeader from "./components/SiteHeader";
import SectionHero from "./components/SectionHero";
import SectionCV from "./components/SectionCV";
import SectionWork from "./components/SectionWork";
import SectionContact from "./components/SectionContact";
import Page from "./components/Page";
import { dict } from "./i18n";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [stage, setStage] = useState("idle"); // idle | in | mid | out
  const [lang, setLang] = useState("fr");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const initialHash = window.location.hash?.slice(1);
    const allowed = ["home", "cv", "work", "contact"];
    if (initialHash === "hire-me") {
      setActiveSection("contact");
      return;
    }
    if (initialHash && allowed.includes(initialHash)) {
      setActiveSection(initialHash);
    }
  }, []);

  const navLinks = useMemo(() => {
    const t = dict[lang]?.nav || dict.fr.nav;
    return [
      { label: t.home, href: "#home" },
      { label: t.cv, href: "#cv" },
      { label: t.work, href: "#work" },
      { label: t.contact, href: "#contact" },
      { label: t.hire, href: "#contact", cta: true },
    ];
  }, [lang]);

  const handleNavigate = (section) => {
    const next = section || "home";
    if (next === activeSection || stage !== "idle") return;
    // Blue IN
    setStage("in");
    const IN_TOTAL = 900; // 6 * 80ms delay + 550ms anim approx
    const OUT_TOTAL = 900;

    setTimeout(() => {
      // Keep blue in place and animate grey on top, then reveal page
      setActiveSection(next);
      setStage("mid");
      setTimeout(() => setStage("out"), 30);
      setTimeout(() => setStage("idle"), OUT_TOTAL + 30);
    }, IN_TOTAL);
  };

  const handleToggleLang = () => {
    if (stage !== "idle") return;
    const nextLang = lang === "fr" ? "en" : "fr";
    setStage("in");
    const IN_TOTAL = 900;
    const OUT_TOTAL = 900;
    setTimeout(() => {
      setLang(nextLang);
      setStage("mid");
      setTimeout(() => setStage("out"), 30);
      setTimeout(() => setStage("idle"), OUT_TOTAL + 30);
    }, IN_TOTAL);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "cv":
        return <SectionCV />;
      case "work":
        return <SectionWork />;
      case "contact":
        return <SectionContact />;
      case "home":
      default:
        return <SectionHero lang={lang} />;
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = `#${activeSection}`;
    if (window.location.hash !== hash) {
      window.history.replaceState(null, "", hash);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  return (
    <>
      {}
      <StarsBG density={0.0012} speed={0.45} twinkle />

      {}
      <Page>
        <SiteHeader
          title="Mon Portfolio"
          links={navLinks}
          glass={false} 
          activeSection={activeSection}
          onNavigate={handleNavigate}
          lang={lang}
          onToggleLang={handleToggleLang}

        />
        {activeSection === "contact" ? (
          <SectionContact lang={lang} />
        ) : (
          renderSection()
        )}
      </Page>
      {/* Chunked page transitions */}
      <div
        className={`page-chunks page-chunks--in ${
          stage === "in"
            ? "is-visible is-active"
            : stage === "mid" || stage === "out"
            ? "is-visible is-hold"
            : ""
        }`}
        aria-hidden="true"
      >
        <span className="piece" />
        <span className="piece" />
        <span className="piece" />
        <span className="piece" />
        <span className="piece" />
        <span className="piece" />
        {}
        <img src={logoAnim} className="logo-anim" alt="" aria-hidden="true" />
      </div>
      <div
        className={`page-chunks page-chunks--out ${
          stage === "mid"
            ? "is-visible is-active"
            : stage === "out"
            ? "is-visible is-active"
            : ""
        }`}
        aria-hidden="true"
      >
        <span className="piece" />
        <span className="piece" />
        <span className="piece" />
        <span className="piece" />
        <span className="piece" />
        <span className="piece" />
      </div>
    </>
  );
}
