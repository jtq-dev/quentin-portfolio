export type WorkProject = {
  slug: string;
  title: string;
  category: string;
  year: string;
  short: string;
  stack: string[];
  links: { demo?: string; repo?: string };
  // Put image files in /public/projects/*.png (or use remote URLs)
  cover: string;
  accent?: "mint" | "violet" | "amber" | "cyan";
};

export const workProjects: WorkProject[] = [
  {
  slug: "dreamshield-app",
  title: "DreamShield — App Concept (SEP 758 Final)",
  category: "Flutter / Mobile / Firebase",
  year: "2025",
  short: "Sleep tracking + coaching insights + soundscape mixer with breathing pacer. Firebase auth + user-scoped data + persistent preferences.",
  stack: ["Flutter", "Dart", "Firebase Auth", "Firestore", "SharedPreferences", "Maps", "Theming"],
  links: {
    repo: "https://github.com/jtq-dev/Dreamshield_flutterApp",
    demo: "https://drive.google.com/file/d/1zzeXfqH3a0tAYyH2bbZ68idntmexYk3L/view?usp=sharing" // or your web deployment URL
  },
  cover: "/projects/app.png",
  accent: "violet"
},

  {
    slug: "trustchain-playground",
    title: "TrustChain Playground",
    category: "DevSecOps / Software Supply Chain",
    year: "2026",
    short:
      "End-to-end pipeline: build → scan → sign (cosign) → attest (SLSA/in-toto) → verify at deploy with policy guardrails.",
    stack: ["GitHub Actions", "Docker", "Cosign", "Kyverno", "Helm", "Argo CD", "OpenTelemetry"],
    links: { repo: "https://github.com/jtq-dev/trustchain-playground" },
    cover: "/projects/trustchain.png",
    accent: "cyan",
  },

  {
    slug: "shipsafe-ai",
    title: "ShipSafe AI",
    category: "AI / ML Systems",
    year: "2026",
    short:
      "PyTorch model training + MLflow tracking + FastAPI model service + RAG (/qa) with sources + eval gate in CI.",
    stack: ["PyTorch", "MLflow", "FastAPI", "FAISS/pgvector", "Ragas", "Docker"],
    links: { repo: "https://github.com/jtq-dev/shipsafe-ai" },
    cover: "/projects/shipsafe.png",
    accent: "violet",
  },

  {
    slug: "kubebuddy",
    title: "kubeBuddy",
    category: "Go / Kubernetes",
    year: "2026",
    short:
      "Single-binary Go CLI that lists Pods per namespace using kubeconfig (client-go). Includes cobra commands + semantic versioning.",
    stack: ["Go", "client-go", "Cobra", "Kubernetes"],
    links: { repo: "https://github.com/jtq-dev/kubebuddy" },
    cover: "/projects/kubebuddy.png",
    accent: "mint",
  },

  {
    slug: "fortress-notes",
    title: "fortress-notes",
    category: "Policy-as-Code / Guardrails",
    year: "2026",
    short:
      "OPA/Rego guardrails (Conftest-style checks): deny :latest, require probes+limits, deny 0.0.0.0/0 in Terraform. Runs locally + in CI.",
    stack: ["OPA", "Rego", "Conftest", "Terraform", "GitHub Actions"],
    links: { repo: "https://github.com/jtq-dev/fortress-notes" },
    cover: "/projects/fortress.png",
    accent: "amber",
  },

  {
    slug: "guardrail-sre-lab",
    title: "guardrail-sre-lab",
    category: "SRE / Reliability Guardrails",
    year: "2026",
    short:
      "SRE lab repository (details in repo).",
    stack: ["SRE", "Policy-as-Code", "Observability"],
    links: { repo: "https://github.com/jtq-dev/guardrail-sre-lab" },
    cover: "/projects/guardrail.png",
    accent: "cyan",
  },

  {
    slug: "opslens",
    title: "opslens",
    category: "Ops / Tooling",
    year: "2026",
    short:
      "Ops tooling repository (details in repo).",
    stack: ["Python", "Automation", "DevOps"],
    links: { repo: "https://github.com/jtq-dev/opslens" },
    cover: "/projects/opslens.png",
    accent: "mint",
  },

  {
    slug: "Kid-sHouse",
    title: "Kid’s House — School Website (Douala)",
    category: "Web • UI/UX",
    year: "2026",
    short:
      "Modern, accessible primary + kindergarten school website for Douala, Cameroon. Premium UI/UX (animated hero, smooth sections, bilingual-ready layout) and admin-friendly structure.",
    stack: ["Vite", "React", "TypeScript", "Tailwind", "Framer Motion"],
    links: {
      repo: "https://github.com/jtq-dev/Kid-sHouse",
      demo: "https://kid-s-house.vercel.app/en",
    },
    cover: "/projects/kid'sHouse.png",
    accent: "amber",
  },

  {
    slug: "DreamShield-website",
    title: "DreamShield — Company Website",
    category: "Product / Startup",
    year: "2025",
    short:
      "Company Website.",
    stack: ["JavaScript", "Web"],
    links: { repo: "https://github.com/jtq-dev/DreamShield-website", demo: "https://dream-shield-website.vercel.app/" },
    cover: "/projects/dreamshield.png",
    accent: "violet",
  },

];
