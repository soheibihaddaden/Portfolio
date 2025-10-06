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

## Déploiement sur GitHub Pages

### 1. Préparer la build

```bash
npm run build
```

Le dossier `dist/` sera généré avec les assets optimisés.

### 2. Déployer avec GitHub Actions (recommandé)

1. Créez un dépôt GitHub et poussez le code (`main` ou `master`).
2. Activez GitHub Pages dans les settings (Section *Pages* → Source `GitHub Actions`).
3. Ajoutez un workflow comme `./.github/workflows/deploy.yml` contenant :

   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 18
         - run: npm ci
         - run: npm run build
         - name: Deploy
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: dist
   ```

4. Commitez le fichier, poussez et laissez l’action générer le site. Le lien public sera `https://<votre-utilisateur>.github.io/<nom-du-depot>/`.

### 3. Déploiement manuel

Si vous préférez une approche manuelle :

```bash
npm run build
cd dist
git init
git remote add origin https://github.com/<utilisateur>/<repo>.git
git checkout -b main
git add .
git commit -m "Deploy"
git push -f origin main
```

Ensuite, activez GitHub Pages pour la branche `main` du dossier `dist`.

## Licence

Projet personnel – merci de citer la source si vous le reprenez intégralement.
