# Mon Portfolio

Mon Portfolio est une application React/Vite qui présente mon profil, mon expérience et mes projets personnels. Le site prend en charge deux langues (fr/en) et propose un formulaire de contact fonctionnel.

## Fonctionnalités principales

- Section hero avec statistiques animées et téléchargement direct du CV (`src/CV_IHADDADEN.pdf`).
- Parcours CV avec onglets (expérience, formation, compétences, à propos).
- Page Travail regroupant les challenges Capture the Flag et mes projets académiques/personnels.
- Formulaire de contact connecté à FormSubmit, avec validation côté client et messages d'état.
- Interface responsive avec design accentué (mix CSS natif, variables personnalisées, effets).

## Stack et dépendances

- **React 18** + **Vite** pour le bundling et le Hot Module Replacement.
- **React i18next maison** via un simple dictionnaire (`src/i18n.js`).
- **CSS vanilla** (fichier unique `src/global.css`) + polices Google Fonts.
- **FormSubmit** pour la soumission du formulaire sans backend (`VITE_FORM_ENDPOINT`).

### Scripts NPM

```bash
npm install      # installe toutes les dépendances
npm run dev      # lance le serveur de dev sur http://localhost:5173
npm run build    # génère la version de production dans dist/
npm run preview  # prévisualise la build (utile avant déploiement)
```

## Structure du projet

```
mon-portfolio/
├── public/                # actifs statiques
├── src/
│   ├── components/        # SectionHero, SectionCV, SectionWork, etc.
│   ├── i18n.js            # dictionnaire FR/EN
│   ├── global.css         # styles globaux
│   └── main.jsx           # point d'entrée React
└── README.md
```

## Internationalisation

Le dictionnaire `src/i18n.js` contient toutes les chaînes FR/EN, y compris les listes de challenges CTF et les données du CV. Pour ajouter une langue :

1. Dupliquer les blocs `fr` ou `en`.
2. Adapter les clefs (hero, cv, work, contact, etc.).
3. Mettre à jour `lang` dans `App.jsx` ou ajouter un sélecteur de langue.

## Formulaire de contact

- Par défaut, les messages arrivent sur `ihaddadensoheib@gmail.com` via FormSubmit.
- Pour changer de destinataire : créez un `.env` avec `VITE_FORM_ENDPOINT=https://formsubmit.co/ajax/votre-email`.
- Les champs envoyés : `first_name`, `last_name`, `email`, `phone`, `contract_type`, `message`.

## Déploiement

1. `npm run build`
2. Déployer le contenu du dossier `dist/` (Netlify, Vercel, GitHub Pages, OVH, etc.).

## Licence

Projet personnel – vous pouvez vous en inspirer mais merci de citer la source si vous le reprenez intégralement.
