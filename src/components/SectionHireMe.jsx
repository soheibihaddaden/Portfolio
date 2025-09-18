import { useEffect, useRef, useState } from "react";

const inputStyle = {
  width: "100%",
  padding: "14px 18px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(17,17,21,0.9)",
  color: "#fff",
  fontSize: "1rem",
  transition: "border 0.2s ease, box-shadow 0.2s ease",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  width: "100%",
  fontSize: "0.95rem",
};

const twoColumnRow = {
  display: "grid",
  gap: 16,
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
};

const contractOptions = [
  { value: "cdi", label: "CDI" },
  { value: "stage", label: "Stage" },
  { value: "cdd", label: "CDD" },
];

export default function SectionHireMe() {
  const [contractType, setContractType] = useState("");
  const [selectOpen, setSelectOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!selectRef.current) return;
      if (!selectRef.current.contains(event.target)) {
        setSelectOpen(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const selectedOption = contractOptions.find((opt) => opt.value === contractType);

  return (
    <section
      id="hire-me"
      style={{
        maxWidth: 700,
        margin: "0 auto",
        padding: "64px 24px 96px",
      }}
    >
      <form
        style={{
          display: "grid",
          gap: 20,
          padding: 24,
          borderRadius: 20,
          background: "rgba(28, 28, 34, 0.8)",
          border: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
        }}
      >
        <div style={{ display: "grid", gap: 8 }}>
          <p style={{ fontWeight: 700, color: "#34e4ea", fontSize: "1.8rem", margin: 0 }}>
            Travaillons ensemble
          </p>
          <p style={{ color: "#fff", opacity: 0.85, fontWeight: 400, margin: 0 }}>
            Veuillez remplir le formulaire ci-dessous pour me contacter.
          </p>
        </div>

        <div style={twoColumnRow}>
          <label style={labelStyle}>
            <input
              type="text"
              name="firstName"
              placeholder="Prénom"
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            <input
              type="text"
              name="lastName"
              placeholder="Nom de famille"
              style={inputStyle}
            />
          </label>
        </div>

        <div style={twoColumnRow}>
          <label style={labelStyle}>
            <input
              type="email"
              name="email"
              placeholder="Adresse mail"
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            <input
              type="tel"
              name="phone"
              placeholder="Numéro de téléphone"
              style={inputStyle}
            />
          </label>
        </div>

        <label style={labelStyle}>
          <span>Type de collaboration</span>
          <div
            className={`hire-select${selectOpen ? " is-open" : ""}`}
            ref={selectRef}
          >
            <button
              type="button"
              className="hire-select__trigger"
              onClick={() => setSelectOpen((open) => !open)}
              onKeyDown={(event) => {
                if (["ArrowDown", "ArrowUp", " ", "Enter"].includes(event.key)) {
                  event.preventDefault();
                  setSelectOpen(true);
                }
              }}
            >
              <span>
                {selectedOption ? selectedOption.label : "Choisissez une option"}
              </span>
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
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
                      className={`hire-select__option${contractType === option.value ? " is-active" : ""}`}
                      onClick={() => {
                        setContractType(option.value);
                        setSelectOpen(false);
                      }}
                      onKeyDown={(event) => {
                        if (["Enter", " "].includes(event.key)) {
                          event.preventDefault();
                          setContractType(option.value);
                          setSelectOpen(false);
                        }
                      }}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <input type="hidden" name="contractType" value={contractType} />
          </div>
        </label>

        <label style={labelStyle}>
          <textarea
            name="message"
            rows={5}
            placeholder="Tapez votre message"
            style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
          />
        </label>

        <button
          type="submit"
          style={{
            marginTop: 8,
            padding: "14px 22px",
            borderRadius: 999,
            background: "#34e4ea",
            color: "#1c1c22",
            fontWeight: 600,
            fontSize: "1.05rem",
            border: "none",
            cursor: "pointer",
            transition: "transform 0.2s ease",
            width: "100%",
          }}
        >
          Envoyer
        </button>
      </form>
    </section>
  );
}
