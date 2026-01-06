export type Lang = "FR" | "EN";

export const profile = {
  brand: "QUENTIN",
  fullName: "Joseph Quentin Tchuileng Tchudjo",
  headline: {
    EN: { pre: "HEY, I’M", name: "JOSEPH QUENTIN", tail: "TCHUDJO" },
    FR: { pre: "SALUT, JE SUIS", name: "JOSEPH QUENTIN", tail: "TCHUDJO" },
  },
  location: "Canada",
  callMe: {
    EN: { pre: "BUT YOU CAN CALL ME", nick: "QUENTIN" },
    FR: { pre: "MAIS TU PEUX M’APPELER", nick: "QUENTIN" },
  },
  subtitle: {
    EN: "DevSecOps Engineer • Backend • AI/ML Systems",
    FR: "Ingénieur DevSecOps • Backend • Systèmes IA/ML",
  },
  subline: {
    EN: "& I build secure, testable projects recruiters can try.",
    FR: "& je construis des projets sécurisés que les recruteurs peuvent tester.",
  },
  ctas: {
    EN: { projects: "see my projects", about: "more about me" },
    FR: { projects: "voir mes projets", about: "en savoir plus" },
  },
  links: {
  resume: "./resume.pdf", // or a direct PDF link
  github: "https://github.com/jtq-dev",
  linkedin: "https://www.linkedin.com/in/joseph-tchuileng/",
  email: "mailto:tchudjoquentin@gmail.com",
}


};
