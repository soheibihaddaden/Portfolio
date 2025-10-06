import { useEffect, useState } from "react";
import { dict } from "../i18n";
import photo from "../photo.png";
import resumePdf from "../CV_IHADDADEN.pdf";


function CountUp({ to, duration = 1200, delay = 0, suffix = "" }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let raf;
    let start;
    const d = Math.max(200, duration);

    const step = (ts) => {
      if (!start) start = ts;
      const t = Math.min(1, (ts - start) / d);

      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(step);
    };

    const id = setTimeout(() => (raf = requestAnimationFrame(step)), delay);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(id);
    };
  }, [to, duration, delay]);

  return <>{val.toLocaleString("fr-FR")}{suffix}</>;
}

export default function SectionHero({ lang = "fr" }) {
  const tHero = dict[lang]?.hero || dict.fr.hero;

  const statsConfig = tHero.stats || {
    yearsL1: "Années",
    yearsL2: "d'expérience",
    yearsValue: 5,
    projectsL1: "Projets",
    projectsL2: "complétés",
    projectsValue: 5,
    techsL1: "Technologies",
    techsL2: "maîtrisées",
    techsValue: 5,
    challengesL1: "Challenges",
    challengesL2: "réalisés",
    challengesValue: 84,
    challengesSuffix: "+",
  };

  const heroStats = [
    {
      key: "years",
      value: statsConfig.yearsValue ?? 5,
      label1: statsConfig.yearsL1,
      label2: statsConfig.yearsL2,
      suffix: statsConfig.yearsSuffix || "",
    },
    {
      key: "projects",
      value: statsConfig.projectsValue ?? 5,
      label1: statsConfig.projectsL1,
      label2: statsConfig.projectsL2,
      suffix: statsConfig.projectsSuffix || "",
    },
    {
      key: "techs",
      value: statsConfig.techsValue ?? 5,
      label1: statsConfig.techsL1,
      label2: statsConfig.techsL2,
      suffix: statsConfig.techsSuffix || "",
    },
    {
      key: "challenges",
      value: statsConfig.challengesValue ?? 84,
      label1: statsConfig.challengesL1,
      label2: statsConfig.challengesL2,
      suffix: statsConfig.challengesSuffix || "",
    },
  ];

  return (
    <section id="home" className="hero-section">
      <div className="hero-grid">
        <div className="hero-left">
          <div className="hero-intro">
            <p className="hero-intro__hello">
              {tHero.hello}
              <span aria-hidden="true">&nbsp;</span>
              {tHero.iam}
            </p>
            <h1 className="hero-intro__name">{tHero.name}</h1>
          </div>

          <p className="hero-bio">{tHero.bio}</p>

          <div className="hero-ctas">
            {}
            <a
              className="hero-btn hero-btn--primary dl-btn"
              href={resumePdf}
              download
            >
              <span className="dl-btn__text">{tHero.ctas.download}</span>
              <span className="dl-btn__icon" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" className="dl-btn__svg">
                  <path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"/>
                  <path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"/>
                  <path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,1,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"/>
                </svg>
              </span>
            </a>

            <a className="hero-btn hero-btn--ghost" href="https://github.com/soheibihaddaden" target="_blank" rel="noreferrer noopener">
              {tHero.ctas.github}
            </a>
            <a className="hero-btn hero-btn--ghost" href="https://www.linkedin.com/in/soheib-ihaddaden/" target="_blank" rel="noreferrer noopener">
              {tHero.ctas.linkedin}
            </a>
          </div>
        </div>

        <div className="hero-photo">
          <img src={photo} alt="portrait" />
        </div>
      </div>

      {}
      <div className="hero-stats">
        {heroStats.map((stat, index) => (
          <div key={stat.key} className="hero-stats__item">
            <span className="hero-stats__num">
              <CountUp
                to={stat.value}
                duration={1200 + index * 120}
                delay={index * 80}
                suffix={stat.suffix}
              />
            </span>
            <span className="hero-stats__label">
              {stat.label1}
              <br />
              {stat.label2}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
