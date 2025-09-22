import { dict } from "../i18n";
import photo from "../photo.png"; 

export default function SectionHero({ lang = "fr" }) {
  return (
    <section id="home" className="hero-section">
      <div className="hero-grid">
        <div className="hero-left">
          <div className="hero-intro">
            <p className="hero-intro__hello">
              {(dict[lang]?.hero || dict.fr.hero).hello}
              <span aria-hidden="true">&nbsp;</span>
              {(dict[lang]?.hero || dict.fr.hero).iam}
            </p>
            <h1 className="hero-intro__name">{(dict[lang]?.hero || dict.fr.hero).name}</h1>
          </div>
          <p className="hero-bio">{(dict[lang]?.hero || dict.fr.hero).bio}</p>
          <div className="hero-ctas">
                  <a className="hero-btn hero-btn--primary dl-btn" href="/cv.pdf" download>
                    <span className="dl-btn__text">
                      {(dict[lang]?.hero || dict.fr.hero).ctas.download}
                    </span>
                    <span className="dl-btn__icon" aria-hidden="true">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" className="dl-btn__svg">
                        <path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"/>
                        <path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"/>
                        <path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,1,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"/>
                      </svg>
                    </span>
                  </a>
            <a className="hero-btn hero-btn--ghost" href="https://github.com/soheibihaddaden" target="_blank" rel="noreferrer noopener">
              {(dict[lang]?.hero || dict.fr.hero).ctas.github}
            </a>
            <a className="hero-btn hero-btn--ghost" href="https://www.linkedin.com/in/soheib-ihaddaden/" target="_blank" rel="noreferrer noopener">
              {(dict[lang]?.hero || dict.fr.hero).ctas.linkedin}
            </a>
          </div>
        </div>
        <div className="hero-photo">
          <img src={photo} alt="portrait" />
        </div>
      </div>
    </section>
  );
}
