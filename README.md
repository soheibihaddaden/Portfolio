# Mon Portfolio – envoi du formulaire « Embauchez-moi »

Le formulaire utilise [FormSubmit](https://formsubmit.co/) pour envoyer un email directement à `ihaddadensoheib@gmail.com`. Aucun serveur n'est nécessaire.

## Étapes de configuration

1. Rendez-vous sur [formsubmit.co](https://formsubmit.co/) et envoyez une première soumission depuis le formulaire en mode développement. Vous recevrez un mail de confirmation : cliquez sur « Confirm » pour autoriser FormSubmit à vous transférer les messages.
2. (Facultatif) Si vous souhaitez employer une autre adresse ou personnaliser le destinataire, définissez la variable d’environnement suivante dans un fichier `.env` à la racine du projet :

   ```bash
   VITE_FORM_ENDPOINT=https://formsubmit.co/ajax/votre.adresse@email.com
   ```

3. Redémarrez `npm run dev` si le serveur était déjà lancé.

Le code envoie automatiquement les champs `first_name`, `last_name`, `email`, `phone`, `contract_type`, `message` et ajoute un sujet personnalisé.

Les instructions d'origine de Vite sont conservées ci-dessous pour référence.

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
