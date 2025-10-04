import { useMemo, useState } from "react";
import { dict } from "../i18n";

const TAB_KEYS = ["experience", "education", "skills", "about"];

export default function SectionCV({ lang = "fr" }) {
  const tCV = useMemo(() => dict[lang]?.cv || dict.fr.cv, [lang]);
  const [activeTab, setActiveTab] = useState(TAB_KEYS[0]);

  const section = tCV.sections[activeTab];
  const navLabel = lang === "fr" ? "Sections du CV" : "Resume sections";

  return (
    <section id="cv" className="cv-section">
      <div className="cv-shell">
        <div className="cv-header">
          <h2 className="cv-title">{section.title}</h2>
          <a className="cv-download" href="/cv.pdf" download>
            <span>{tCV.downloadLabel}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="cv-download__icon"
            >
              <path d="M12 3v14" />
              <path d="m5 12 7 7 7-7" />
              <path d="M5 21h14" />
            </svg>
          </a>
        </div>

        <div className="cv-layout">
          <nav className="cv-tabs" aria-label={navLabel}>
            {TAB_KEYS.map((key) => (
              <button
                key={key}
                type="button"
                className={`cv-tab ${activeTab === key ? "is-active" : ""}`}
                onClick={() => setActiveTab(key)}
              >
                {tCV.tabs[key]}
              </button>
            ))}
          </nav>

          <div className="cv-content" role="region" aria-live="polite">
            {section.intro && <p className="cv-intro">{section.intro}</p>}

            {activeTab === "experience" || activeTab === "education" ? (
              <ul className="cv-timeline">
                {section.items.map((item) => (
                  <li key={`${item.title}-${item.period}`} className="cv-card">
                    <div className="cv-card__body">
                      <h3 className="cv-card__title">{item.title}</h3>
                      {item.place && <p className="cv-card__place">{item.place}</p>}
                      <p className="cv-card__period">{item.period}</p>
                      {item.description && (
                        <p className="cv-card__description">{item.description}</p>
                      )}
                    </div>
                    <span className="cv-card__bullet" aria-hidden="true" />
                  </li>
                ))}
              </ul>
            ) : null}

            {activeTab === "skills" ? (
              <div className="cv-skills">
                {section.groups.map((group) => (
                  <div key={group.heading} className="cv-skill-group">
                    <h3>{group.heading}</h3>
                    <ul>
                      {group.items.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : null}

            {activeTab === "about" ? (
              <div className="cv-about">
                <div className="cv-about__text">
                  {section.paragraphs.map((para, index) => (
                    <p key={index}>{para}</p>
                  ))}
                </div>
                {section.contacts && (
                  <ul className="cv-contacts">
                    {section.contacts.map((entry) => (
                      <li key={entry.value}>
                        <i className={`cv-contact__icon ${entry.iconClass}`} aria-hidden="true" />
                        <div className="cv-contact__body">
                          <span className="cv-contact__label">{entry.label}</span>
                          <span className="cv-contact__value">{entry.value}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
