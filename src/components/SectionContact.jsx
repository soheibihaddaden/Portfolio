import { useEffect, useRef, useState } from "react";
import { dict } from "../i18n";

const FORM_ENDPOINT =
  import.meta.env.VITE_FORM_ENDPOINT || "https://formsubmit.co/ajax/ihaddadensoheib@gmail.com";

const contractOptions = [
  { value: "cdi", label: "CDI" },
  { value: "stage", label: "Stage" },
  { value: "cdd", label: "CDD" },
];

export default function SectionContact({ lang = "fr" }) {
  const initialFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [contractType, setContractType] = useState("");
  const [selectOpen, setSelectOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!selectRef.current) return;
      if (!selectRef.current.contains(event.target)) {
        setSelectOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = contractOptions.find((opt) => opt.value === contractType);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "idle", message: "" });

    if (!formValues.email || !formValues.message) {
      setStatus({
        type: "error",
        message: dict[lang]?.contact?.errorRequired || dict.fr.contact.errorRequired,
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          first_name: formValues.firstName,
          last_name: formValues.lastName,
          email: formValues.email,
          phone: formValues.phone,
          contract_type: selectedOption ? selectedOption.label : "Non précisé",
          message: formValues.message,
          _subject: `Demande via le portfolio (${selectedOption ? selectedOption.label : "Non précisé"})`,
          _replyto: formValues.email,
          _captcha: "false",
        }),
      });

      if (!response.ok) {
        throw new Error(`FormSubmit error ${response.status}`);
      }

      const result = await response.json();
      const isSuccess = result?.success === "true" || result?.success === true;
      if (!isSuccess) {
        throw new Error(result?.message || "FormSubmit response unexpected");
      }

      setStatus({
        type: "success",
        message: dict[lang]?.contact?.success || dict.fr.contact.success,
      });
      setFormValues(initialFormValues);
      setContractType("");
      setSelectOpen(false);
    } catch (error) {
      console.error("Form submission error", error);
      const message =
        error instanceof Error && error.message
          ? error.message
          : dict[lang]?.contact?.errorGeneric || dict.fr.contact.errorGeneric;
      setStatus({
        type: "error",
        message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusClassName =
    status.type === "idle"
      ? "hire-form__status"
      : `hire-form__status ${status.type === "success" ? "is-success" : "is-error"}`;

  const phoneLabel = lang === 'en' ? 'Phone' : 'Téléphone';
  const emailLabel = 'Email';
  const addressLabel = lang === 'en' ? 'Address' : 'Adresse';
  const CONTACT_EMAIL = 'ihaddadensoheib@gmail.com';
  const CONTACT_PHONE = '(+33) 7 74 90 95 03';
  const CONTACT_ADDRESS = 'paris 7500, france';

  return (
    <section id="contact" className="hire-section">
      <div className="contact-layout">
      <form onSubmit={handleSubmit} className="hire-form">
        <div className="hire-section__intro">
          <span className="hire-section__title">{dict[lang]?.contact?.title || dict.fr.contact.title}</span>
          <span className="hire-section__lead">{dict[lang]?.contact?.lead || dict.fr.contact.lead}</span>
        </div>

        <div className="hire-form__grid">
          <label className="hire-form__label">
            <input
              type="text"
              name="firstName"
              placeholder={dict[lang]?.contact?.placeholders?.firstName || dict.fr.contact.placeholders.firstName}
              className="hire-input"
              value={formValues.firstName}
              onChange={handleChange}
            />
          </label>
          <label className="hire-form__label">
            <input
              type="text"
              name="lastName"
              placeholder={dict[lang]?.contact?.placeholders?.lastName || dict.fr.contact.placeholders.lastName}
              className="hire-input"
              value={formValues.lastName}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="hire-form__grid">
          <label className="hire-form__label">
            <input
              type="email"
              name="email"
              placeholder={dict[lang]?.contact?.placeholders?.email || dict.fr.contact.placeholders.email}
              className="hire-input"
              value={formValues.email}
              onChange={handleChange}
            />
          </label>
          <label className="hire-form__label">
            <input
              type="tel"
              name="phone"
              placeholder={dict[lang]?.contact?.placeholders?.phone || dict.fr.contact.placeholders.phone}
              className="hire-input"
              value={formValues.phone}
              onChange={handleChange}
            />
          </label>
        </div>

        <label className="hire-form__label">
          <span>{dict[lang]?.contact?.selectLabel || dict.fr.contact.selectLabel}</span>
          <div
            className={`hire-select${selectOpen ? " is-open" : ""}`}
            ref={selectRef}
          >
            <button
              type="button"
              className="hire-select__trigger hire-input"
              onClick={() => setSelectOpen((openState) => !openState)}
            >
              <span>
                {selectedOption
                  ? (dict[lang]?.contact?.options?.[selectedOption.value] || selectedOption.label)
                  : (lang === 'en' ? 'Choose an option' : 'Choisissez une option')}
              </span>
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3.5 6l4.5 4.5L12.5 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {selectOpen && (
              <ul className="hire-select__menu">
                {contractOptions.map((option) => (
                  <li key={option.value}>
                    <button
                      type="button"
                      className={`hire-select__option${
                        contractType === option.value ? " is-active" : ""
                      }`}
                      onClick={() => {
                        setContractType(option.value);
                        setSelectOpen(false);
                      }}
                    >
                      {dict[lang]?.contact?.options?.[option.value] || option.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </label>

        <label className="hire-form__label">
          <textarea
            name="message"
            rows={5}
            placeholder={dict[lang]?.contact?.placeholders?.message || dict.fr.contact.placeholders.message}
            className="hire-input hire-form__textarea"
            value={formValues.message}
            onChange={handleChange}
          />
        </label>

        {status.type !== "idle" && <div className={statusClassName}>{status.message}</div>}

        <button type="submit" className="hire-form__submit" disabled={isSubmitting}>
          {isSubmitting
            ? (dict[lang]?.contact?.sending || dict.fr.contact.sending)
            : (dict[lang]?.contact?.submit || dict.fr.contact.submit)}
        </button>
      </form>

      <aside className="contact-info" aria-label={lang === 'en' ? 'Contact details' : 'Coordonnées'}>
        <div className="contact-line">
          <span className="contact-line__icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone-icon lucide-phone">
              <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
            </svg>
          </span>
          <div className="contact-line__content">
            <span className="contact-line__label">{phoneLabel}</span>
            <span className="contact-line__value">{CONTACT_PHONE}</span>
          </div>
        </div>

        <div className="contact-line">
          <span className="contact-line__icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-icon lucide-mail">
              <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
              <rect x="2" y="4" width="20" height="16" rx="2" />
            </svg>
          </span>
          <div className="contact-line__content">
            <span className="contact-line__label">{emailLabel}</span>
            <span className="contact-line__value">{CONTACT_EMAIL}</span>
          </div>
        </div>

        <div className="contact-line">
          <span className="contact-line__icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin-house-icon lucide-map-pin-house">
              <path d="M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z" />
              <path d="M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2" />
              <path d="M18 22v-3" />
              <circle cx="10" cy="10" r="3" />
            </svg>
          </span>
          <div className="contact-line__content">
            <span className="contact-line__label">{addressLabel}</span>
            <span className="contact-line__value">{CONTACT_ADDRESS}</span>
          </div>
        </div>
      </aside>
      </div>
    </section>
  );
}
