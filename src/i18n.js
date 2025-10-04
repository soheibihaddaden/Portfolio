export const dict = {
  fr: {
    hero: {
      hello: 'Bonjour,',
      iam: 'je suis',
      name: 'Ihaddaden Soheib',
      bio: "je suis étudiant à l'université de Paris Cité avec un fort intérêt pour les réseaux et la cybersécurité, avec de bonnes bases aussi en développement.",
      ctas: { download: 'Télécharger CV', github: 'GitHub', linkedin: 'LinkedIn' },
    },
    nav: {
      home: 'Accueil',
      cv: 'CV',
      work: 'Travail',
      contact: 'Contact',
      hire: 'Embauchez-moi',
    },
    cv: {
      downloadLabel: 'Télécharger mon CV (PDF)',
      tabs: {
        experience: 'Mon Expérience',
        education: 'Mon Éducation',
        skills: 'Mes Compétences',
        about: 'À propos de moi',
      },
      sections: {
        experience: {
          title: 'Mon Expérience',
          intro: 'Un aperçu de mon expérience professionnelle et de mes stages.',
          items: [
            {
              title: 'Stagiaire Ingénieur Logiciels',
              place: 'CGI, France',
              period: 'Mars 2025 – Août 2025',
              description: 'Participation à la modernisation d’outils internes, à l’automatisation des pipelines CI/CD et aux revues de code.',
            },
            {
              title: 'Stagiaire en Développement Web',
              place: 'Direction Régionale de la Santé Publique de Gafsa',
              period: 'Janvier 2022 – Avril 2022',
              description: 'Conception d’un portail intranet et intégration d’un tableau de bord analytique pour le suivi des stocks médicaux.',
            },
          ],
        },
        education: {
          title: 'Mon Éducation',
          intro: 'Mes diplômes et formations universitaires.',
          items: [
            {
              title: 'Master Réseaux et Systèmes Autonomes',
              place: 'Université de Paris Cité',
              period: '2024 – 2026',
            },
            {
              title: 'Licence Informatique',
              place: 'Université de Haute Alsace',
              period: '2023 – 2024',
            },
            {
              title: 'Master Réseaux et Systèmes Distribués',
              place: 'USTHB – Université Houari Boumediene',
              period: '2022 – 2023',
            },
          ],
        },
        skills: {
          title: 'Mes Compétences',
          intro: 'Langages, frameworks et technologies que j’utilise au quotidien.',
          groups: [
            { heading: 'Langages', items: ['Java', 'C', 'Python', 'JavaScript'] },
            { heading: 'Frameworks', items: ['React', 'Node.js', 'Laravel', 'Docker'] },
            { heading: 'Outils', items: ['Git', 'Kubernetes', 'Linux', 'Splunk'] },
          ],
        },
        about: {
          title: 'À propos de moi',
          intro: 'Quelques mots sur mon travail et mes coordonnées directes.',
          paragraphs: [
            'Je suis étudiant en Master 2 Réseaux et Systèmes autonomes à l’Université de Paris Cité, avec des compétences en programmation, réseaux, systèmes et conteneurisation.',
            'Je participe activement aux challenges Root Me en cybersécurité et j’aime partager mes découvertes en équipe.',
          ],
          contacts: [
            { iconClass: 'fa-solid fa-user', label: 'Nom', value: 'IHADDADEN Soheib' },
            { iconClass: 'fa-solid fa-envelope', label: 'Email', value: 'ihaddadensoheib@gmail.com' },
            { iconClass: 'fa-solid fa-flag', label: 'Nationalité', value: 'Algérien' },
            { iconClass: 'fa-solid fa-location-dot', label: 'Ville', value: 'Paris, France' },
            { iconClass: 'fa-solid fa-phone', label: 'Téléphone', value: '+33 7 74 90 95 03' },
          ],
        },
      },
    },
    contact: {
      title: 'Travaillons ensemble',
      lead: 'Veuillez remplir le formulaire ci-dessous pour me contacter.',
      placeholders: {
        firstName: 'Prénom',
        lastName: 'Nom de famille',
        email: 'Adresse mail',
        phone: 'Numéro de téléphone',
        message: 'Tapez votre message',
      },
      selectLabel: 'Type de collaboration',
      options: { cdi: 'CDI', stage: 'Stage', cdd: 'CDD' },
      submit: 'Envoyer',
      sending: 'Envoi en cours...',
      success: 'Merci ! Votre message a bien été envoyé.',
      errorRequired: 'Merci de renseigner au minimum votre email et un message.',
      errorGeneric: "Une erreur est survenue lors de l'envoi. Merci de réessayer ou de me contacter directement.",
    },
  },
  en: {
    hero: {
      hello: 'Hello,',
      iam: 'I am',
      name: 'Ihaddaden Soheib',
      bio: 'I am a student at Université Paris Cité, highly interested in networking and cybersecurity, with solid fundamentals in software development.',
      ctas: { download: 'Download CV', github: 'GitHub', linkedin: 'LinkedIn' },
    },
    nav: {
      home: 'Home',
      cv: 'Resume',
      work: 'Work',
      contact: 'Contact',
      hire: 'Hire me',
    },
    cv: {
      downloadLabel: 'Download my resume (PDF)',
      tabs: {
        experience: 'Experience',
        education: 'Education',
        skills: 'Skills',
        about: 'About me',
      },
      sections: {
        experience: {
          title: 'Experience',
          intro: 'A glimpse into my professional experience and internships.',
          items: [
            {
              title: 'Software Engineering Intern',
              place: 'CGI, France',
              period: 'March 2025 – August 2025',
              description: 'Worked on internal tool modernization, automated CI/CD pipelines and contributed to code reviews.',
            },
            {
              title: 'Web Development Intern',
              place: 'Regional Health Directorate of Gafsa',
              period: 'January 2022 – April 2022',
              description: 'Designed an intranet portal and integrated an analytics dashboard to monitor medical stock levels.',
            },
          ],
        },
        education: {
          title: 'Education',
          intro: 'My academic degrees and training.',
          items: [
            {
              title: 'MSc Networks & Autonomous Systems',
              place: 'Université de Paris Cité',
              period: '2024 – 2026',
            },
            {
              title: 'BSc Computer Science',
              place: 'Université de Haute Alsace',
              period: '2023 – 2024',
            },
            {
              title: 'MSc Networks & Distributed Systems',
              place: 'USTHB – Houari Boumediene University',
              period: '2022 – 2023',
            },
          ],
        },
        skills: {
          title: 'Skills',
          intro: 'Languages, frameworks and technologies I rely on daily.',
          groups: [
            { heading: 'Languages', items: ['Java', 'C', 'Python', 'JavaScript'] },
            { heading: 'Frameworks', items: ['React', 'Node.js', 'Laravel', 'Docker'] },
            { heading: 'Tools', items: ['Git', 'Kubernetes', 'Linux', 'Splunk'] },
          ],
        },
        about: {
          title: 'About me',
          intro: 'A few words about my mindset and how to reach me directly.',
          paragraphs: [
            'I am a Networks & Autonomous Systems MSc student at Université de Paris Cité, with skills across programming, networking, systems and containerisation.',
            'I take part in Root Me cybersecurity challenges and enjoy sharing takeaways with the team.',
          ],
          contacts: [
            { iconClass: 'fa-solid fa-user', label: 'Name', value: 'IHADDADEN Soheib' },
            { iconClass: 'fa-solid fa-envelope', label: 'Email', value: 'ihaddadensoheib@gmail.com' },
            { iconClass: 'fa-solid fa-flag', label: 'Nationality', value: 'Algerian' },
            { iconClass: 'fa-solid fa-location-dot', label: 'City', value: 'Paris, France' },
            { iconClass: 'fa-solid fa-phone', label: 'Phone', value: '+33 7 74 90 95 03' },
          ],
        },
      },
    },
    contact: {
      title: "Let's work together",
      lead: 'Please fill the form below to get in touch.',
      placeholders: {
        firstName: 'First name',
        lastName: 'Last name',
        email: 'Email address',
        phone: 'Phone number',
        message: 'Type your message',
      },
      selectLabel: 'Collaboration type',
      options: { cdi: 'Permanent', stage: 'Internship', cdd: 'Fixed-term' },
      submit: 'Send',
      sending: 'Sending...',
      success: 'Thanks! Your message has been sent.',
      errorRequired: 'Please provide at least your email and a message.',
      errorGeneric: 'Something went wrong. Please try again or contact me directly.',
    },
  },
};
