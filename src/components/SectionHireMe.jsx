import { useEffect, useRef, useState } from "react";

const FORM_ENDPOINT =
  import.meta.env.VITE_FORM_ENDPOINT || "https://formsubmit.co/ajax/ihaddadensoheib@gmail.com";

const contractOptions = [
  { value: "cdi", label: "CDI" },
  { value: "stage", label: "Stage" },
  { value: "cdd", label: "CDD" },
];

export default function SectionHireMe() {
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
        message: "Merci de renseigner au minimum votre email et un message.",
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
        message: "Merci ! Votre message a bien été envoyé.",
      });
      setFormValues(initialFormValues);
      setContractType("");
      setSelectOpen(false);
    } catch (error) {
      console.error("Form submission error", error);
      const message =
        error instanceof Error && error.message
          ? error.message
          : "Une erreur est survenue lors de l'envoi. Merci de réessayer ou de me contacter directement.";
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

  return (
    <section id="hire-me" className="hire-section">
      <form onSubmit={handleSubmit} className="hire-form">
        <div className="hire-section__intro">
          <span className="hire-section__title">Travaillons ensemble</span>
          <span className="hire-section__lead">
            Veuillez remplir le formulaire ci-dessous pour me contacter.
          </span>
        </div>

        <div className="hire-form__grid">
          <label className="hire-form__label">
            <input
              type="text"
              name="firstName"
              placeholder="Prénom"
              className="hire-input"
              value={formValues.firstName}
              onChange={handleChange}
            />
          </label>
          <label className="hire-form__label">
            <input
              type="text"
              name="lastName"
              placeholder="Nom de famille"
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
              placeholder="Adresse mail"
              className="hire-input"
              value={formValues.email}
              onChange={handleChange}
            />
          </label>
          <label className="hire-form__label">
            <input
              type="tel"
              name="phone"
              placeholder="Numéro de téléphone"
              className="hire-input"
              value={formValues.phone}
              onChange={handleChange}
            />
          </label>
        </div>

        <label className="hire-form__label">
          <span>Type de collaboration</span>
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
                {selectedOption ? selectedOption.label : "Choisissez une option"}
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
                      {option.label}
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
            placeholder="Tapez votre message"
            className="hire-input hire-form__textarea"
            value={formValues.message}
            onChange={handleChange}
          />
        </label>

        {status.type !== "idle" && <div className={statusClassName}>{status.message}</div>}

        <button type="submit" className="hire-form__submit" disabled={isSubmitting}>
          {isSubmitting ? "Envoi en cours..." : "Envoyer"}
        </button>
      </form>
    </section>
  );
}
