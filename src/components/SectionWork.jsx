import { useEffect, useMemo, useState } from "react";
import { dict } from "../i18n";

export default function SectionWork({ lang = "fr" }) {
  const tWork = useMemo(() => dict[lang]?.work || dict.fr.work, [lang]);
  const navWorkLabel = useMemo(
    () => dict[lang]?.nav?.work || dict.fr.nav.work,
    [lang]
  );

  const ctfSections = useMemo(
    () => tWork.sections?.filter((section) => section.type !== "projects") || [],
    [tWork]
  );

  const projectSections = useMemo(
    () => tWork.sections?.filter((section) => section.type === "projects") || [],
    [tWork]
  );

  const [openSections, setOpenSections] = useState([]);

  useEffect(() => {
    setOpenSections([]);
  }, [tWork]);

  const toggleSection = (title) => {
    setOpenSections((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const renderGroups = (sections) => (
    <div className="work-content">
      {sections.map((section) => (
        <article key={section.title} className="work-group">
          <button
            type="button"
            className="work-group__toggle"
            onClick={() => toggleSection(section.title)}
            aria-expanded={openSections.includes(section.title)}
          >
            <span className="work-group__title">{section.title}</span>
            <span
              className={`work-group__chevron ${
                openSections.includes(section.title) ? "is-open" : ""
              }`}
              aria-hidden="true"
            >
              <svg viewBox="0 0 10 18" xmlns="http://www.w3.org/2000/svg" fill="none">
                <path
                  d="M1 1l8 8-8 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>

          <div
            className={`work-group__panel ${
              openSections.includes(section.title) ? "is-open" : ""
            }`}
          >
            <ul className="work-challenge-list">
              {section.challenges.map((challenge) => (
                <li key={challenge} className="work-challenge">
                  <span className="work-challenge__bullet" aria-hidden="true" />
                  <span className="work-challenge__label">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );

  return (
    <section id="work" className="work-section">
      <div className="work-shell">
        <header className="work-header">
          <h2 className="work-title">{navWorkLabel}</h2>
          {tWork.overview ? <p className="work-intro">{tWork.overview}</p> : null}
        </header>

        <div className="work-clusters">
          {ctfSections.length > 0 ? (
            <div className="work-cluster">
              <div className="work-cluster__header">
                <h3 className="work-cluster__title">{tWork.title}</h3>
                {tWork.intro ? <p className="work-cluster__intro">{tWork.intro}</p> : null}
              </div>
              {renderGroups(ctfSections)}
            </div>
          ) : null}

          {projectSections.length > 0 ? (
            <div className="work-cluster">
              <div className="work-cluster__header">
                <h3 className="work-cluster__title">
                  {tWork.projectTitle || navWorkLabel}
                </h3>
                {tWork.projectIntro ? (
                  <p className="work-cluster__intro">{tWork.projectIntro}</p>
                ) : null}
              </div>
              {renderGroups(projectSections)}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
