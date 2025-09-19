import { useEffect, useMemo, useState } from "react";
import StarsBG from "./style";
import SiteHeader from "./components/SiteHeader";
import SectionHero from "./components/SectionHero";
import SectionCV from "./components/SectionCV";
import SectionWork from "./components/SectionWork";
import SectionContact from "./components/SectionContact";
import SectionHireMe from "./components/SectionHireMe";
import Page from "./components/Page";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const initialHash = window.location.hash?.slice(1);
    if (initialHash && ["home", "cv", "work", "contact", "hire-me"].includes(initialHash)) {
      setActiveSection(initialHash);
    }
  }, []);

  const navLinks = useMemo(
    () => [
      { label: "Accueil", href: "#home" },
      { label: "CV", href: "#cv" },
      { label: "Travail", href: "#work" },
      { label: "Contact", href: "#contact" },
      { label: "Embauchez-moi", href: "#hire-me" },
    ],
    []
  );

  const renderSection = () => {
    switch (activeSection) {
      case "cv":
        return <SectionCV />;
      case "work":
        return <SectionWork />;
      case "contact":
        return <SectionContact />;
      case "hire-me":
        return <SectionHireMe />;
      case "home":
      default:
        return <SectionHero />;
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
          onNavigate={setActiveSection}
    
        />
        {renderSection()}
      </Page>
    </>
  );
}
