import { useEffect, useMemo, useRef, useState } from "react";
import { dict } from "../i18n";
import reactCertificateImg from "../REACT_CERTIF.png";
import dockerCertificateImg from "../CertificatDaccomplissement_Lessentiel de Docker_page-0001.jpg";
import windowsServerCertificateImg from "../CertificatDaccomplissement_Windows Server 2022 Active Directory et les strategies de groupe_page-0001.jpg";

const certificationAssets = {
  reactCertificate: { href: reactCertificateImg, type: "image" },
  dockerCertificate: { href: dockerCertificateImg, type: "image" },
  windowsServerCertificate: { href: windowsServerCertificateImg, type: "image" },
};

export default function SectionWork({ lang = "fr" }) {
  const tWork = useMemo(() => dict[lang]?.work || dict.fr.work, [lang]);
  const navWorkLabel = useMemo(
    () => dict[lang]?.nav?.work || dict.fr.nav.work,
    [lang]
  );

  const ctfSections = useMemo(
    () => tWork.sections?.filter((section) => section.type === "ctf") || [],
    [tWork]
  );

  const certificationSections = useMemo(
    () => tWork.sections?.filter((section) => section.type === "certifications") || [],
    [tWork]
  );

  const certificationCTA = tWork.certificationCTA || {};

  const projectSections = useMemo(
    () => tWork.sections?.filter((section) => section.type === "projects") || [],
    [tWork]
  );

  const certificationTitles = useMemo(
    () => certificationSections.map((section) => section.title),
    [certificationSections]
  );

  const certificationClusterRef = useRef(null);

  const [openSections, setOpenSections] = useState([]);

  const areCertificationsOpen =
    certificationTitles.length > 0 &&
    certificationTitles.every((title) => openSections.includes(title));

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

  const handleCertificationCTA = () => {
    if (certificationTitles.length === 0) {
      return;
    }

    if (areCertificationsOpen) {
      setOpenSections((prev) =>
        prev.filter((title) => !certificationTitles.includes(title))
      );
      return;
    }

    setOpenSections((prev) =>
      Array.from(new Set([...prev, ...certificationTitles]))
    );

    const scrollTarget = certificationClusterRef.current;
    if (scrollTarget) {
      const scrollIntoView = () =>
        scrollTarget.scrollIntoView({ behavior: "smooth", block: "start" });

      if (typeof window !== "undefined" && typeof window.requestAnimationFrame === "function") {
        window.requestAnimationFrame(scrollIntoView);
      } else {
        scrollIntoView();
      }
    }
  };

  const renderGroups = (sections) => (
    <div className="work-content">
      {sections.map((section) => {
        const isCertificationSection = section.type === "certifications";

        return (
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
                {section.challenges.map((challengeItem) => {
                  const challenge =
                    typeof challengeItem === "string"
                      ? { label: challengeItem }
                      : challengeItem;

                  const asset =
                    challenge.assetKey && certificationAssets[challenge.assetKey]
                      ? certificationAssets[challenge.assetKey]
                      : null;

                  const listKey = `${section.title}-${challenge.label}`;

                  return (
                    <li
                      key={listKey}
                      className={`work-challenge ${
                        isCertificationSection ? "work-challenge--certificate" : ""
                      }`}
                    >
                      <span className="work-challenge__bullet" aria-hidden="true" />
                      <div className="work-challenge__content">
                        <span className="work-challenge__label">{challenge.label}</span>
                        {challenge.description ? (
                          <p className="work-challenge__description">
                            {challenge.description}
                          </p>
                        ) : null}

                        {asset ? (
                          <div className="work-certificate">
                            {asset.type === "image" ? (
                              <img
                                src={asset.href}
                                alt={challenge.previewAlt || challenge.label}
                                className="work-certificate__preview"
                                loading="lazy"
                              />
                            ) : null}

                            {asset.type === "pdf" ? (
                              <div className="work-certificate__placeholder" aria-hidden="true">
                                <span>PDF</span>
                              </div>
                            ) : null}

                            <div className="work-certificate__actions">
                              <a
                                className="work-certificate__link"
                                href={asset.href}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {challenge.actionLabel || certificationCTA.openLabel}
                              </a>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </article>
        );
      })}
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

          {certificationSections.length > 0 ? (
            <div className="work-cluster" ref={certificationClusterRef}>
              <div className="work-cluster__header">
                <h3 className="work-cluster__title">
                  {tWork.certificationTitle || navWorkLabel}
                </h3>
                {tWork.certificationIntro ? (
                  <p className="work-cluster__intro">{tWork.certificationIntro}</p>
                ) : null}
              </div>
              {renderGroups(certificationSections)}
              {certificationTitles.length > 0 ? (
                <div className="work-cluster__actions">
                  <button
                    type="button"
                    className="work-cluster__cta"
                    onClick={handleCertificationCTA}
                  >
                    {areCertificationsOpen
                      ? certificationCTA.closeLabel || tWork.certificationTitle
                      : certificationCTA.openLabel || tWork.certificationTitle}
                  </button>
                  {certificationCTA.note ? (
                    <p className="work-cluster__note">{certificationCTA.note}</p>
                  ) : null}
                </div>
              ) : null}
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
