export type SkillLevel = "Advanced" | "Intermediate" | "Familiar";
export type SkillCategory =
  | "DevSecOps"
  | "Backend"
  | "Cloud & IaC"
  | "Kubernetes"
  | "Observability"
  | "Security"
  | "Data"
  | "ML & AI"
  | "Frontend"
  | "Tooling"
  | "Mobile";

export type StackItem = {
  slug: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;

  // Vite-friendly: store a relative path OR import via a small map later
  logo?: string; // e.g. "/stack/git.svg" if in public, OR "src/assets/stack/git.svg" if imported elsewhere
  accent?: "cyan" | "violet" | "mint" | "amber";

  summary: { EN: string; FR: string };
  bullets: { EN: string[]; FR: string[] };
  tags: string[];
};

export const stackItems: StackItem[] = [
  {
    slug: "git",
    name: "Git",
    category: "DevSecOps",
    level: "Advanced",
    accent: "mint",
    logo: "/stack/git.png",
    summary: {
      EN: "Branching strategy, clean history, PR discipline.",
      FR: "Stratégie de branches, historique propre, PRs solides.",
    },
    bullets: {
      EN: ["rebase -i, rerere", "PR reviews + conventions", "release tags"],
      FR: ["rebase -i, rerere", "reviews + conventions", "tags de release"],
    },
    tags: ["rebase", "branches", "PRs"],
  },
  {
    slug: "github-actions",
    name: "GitHub Actions",
    category: "DevSecOps",
    level: "Intermediate",
    accent: "cyan",
    logo: "/stack/github-actions.png",
    summary: {
      EN: "CI pipelines for tests, builds, scans, artifacts.",
      FR: "CI pour tests, builds, scans, artefacts.",
    },
    bullets: {
      EN: ["cache deps", "matrix builds", "artifact uploads"],
      FR: ["cache deps", "matrix builds", "upload artefacts"],
    },
    tags: ["ci", "yaml", "artifacts"],
  },
  {
    slug: "docker",
    name: "Docker",
    category: "DevSecOps",
    level: "Intermediate",
    accent: "violet",
    logo: "/stack/docker.png",
    summary: {
      EN: "Multi-stage builds + reproducible images.",
      FR: "Builds multi-stage + images reproductibles.",
    },
    bullets: {
      EN: ["multi-stage < 150MB goal", "healthchecks", "local dev compose"],
      FR: ["multi-stage < 150MB", "healthchecks", "compose dev local"],
    },
    tags: ["images", "multi-stage", "compose"],
  },

  // Backend
  {
    slug: "dotnet",
    name: "C# / .NET (ASP.NET Core)",
    category: "Backend",
    level: "Intermediate",
    accent: "cyan",
    logo: "/stack/dotnet.png",
    summary: {
      EN: "Secure APIs with auth, tests, and clean architecture.",
      FR: "APIs sécurisées avec auth, tests, architecture propre.",
    },
    bullets: {
      EN: ["JWT Bearer", "secure headers", "unit + integration tests"],
      FR: ["JWT Bearer", "secure headers", "tests unit + intégration"],
    },
    tags: ["api", "jwt", "tests"],
  },
  {
    slug: "fastapi",
    name: "FastAPI",
    category: "Backend",
    level: "Intermediate",
    accent: "mint",
    logo: "/stack/fastapi.png",
    summary: {
      EN: "Typed model services with validation + Swagger.",
      FR: "Services ML typés avec validation + Swagger.",
    },
    bullets: {
      EN: ["pydantic validation", "/healthz", "OpenAPI docs"],
      FR: ["validation pydantic", "/healthz", "docs OpenAPI"],
    },
    tags: ["python", "api", "swagger"],
  },

  // Data
  {
    slug: "python",
    name: "Python",
    category: "Data",
    level: "Advanced",
    accent: "amber",
    logo: "/stack/Python.png",
    summary: {
      EN: "ETL scripts, data tooling, automation.",
      FR: "Scripts ETL, tooling data, automation.",
    },
    bullets: {
      EN: ["argparse + pydantic", "pytest", "clean CLI tools"],
      FR: ["argparse + pydantic", "pytest", "CLI propre"],
    },
    tags: ["etl", "cli", "pytest"],
  },
  {
    slug: "sql",
    name: "SQL (SQLite/Postgres)",
    category: "Data",
    level: "Intermediate",
    accent: "cyan",
    logo: "/stack/postgres.png",
    summary: {
      EN: "Schema design + window functions + explain.",
      FR: "Schéma + window functions + explain.",
    },
    bullets: {
      EN: ["rolling metrics", "cohort retention", "query performance"],
      FR: ["métriques rolling", "rétention cohort", "perf requêtes"],
    },
    tags: ["window", "schema", "explain"],
  },

  // Cloud/IaC
  {
    slug: "terraform",
    name: "Terraform",
    category: "Cloud & IaC",
    level: "Intermediate",
    accent: "violet",
    logo: "/stack/terraform.png",
    summary: { EN: "Reusable modules + remote state.", FR: "Modules réutilisables + remote state." },
    bullets: {
      EN: ["modules", "workspaces dev/prod", "state best practices"],
      FR: ["modules", "workspaces dev/prod", "bonnes pratiques state"],
    },
    tags: ["iac", "state", "modules"],
  },

  // Kubernetes
  {
    slug: "kubernetes",
    name: "Kubernetes",
    category: "Kubernetes",
    level: "Intermediate",
    accent: "cyan",
    logo: "/stack/kurbenetes.png",
    summary: { EN: "Deployments, probes, resources.", FR: "Deployments, probes, ressources." },
    bullets: {
      EN: ["liveness/readiness", "limits/requests", "secrets/configmaps"],
      FR: ["liveness/readiness", "limits/requests", "secrets/configmaps"],
    },
    tags: ["k8s", "probes", "resources"],
  },
  {
    slug: "helm",
    name: "Helm",
    category: "Kubernetes",
    level: "Intermediate",
    accent: "mint",
    logo: "/stack/helm.png",
    summary: { EN: "Charts + values-driven deploys.", FR: "Charts + déploiements via values." },
    bullets: {
      EN: ["values.yaml", "probes/resources templates", "chart docs"],
      FR: ["values.yaml", "templates probes/ressources", "docs chart"],
    },
    tags: ["charts", "values", "deploy"],
  },

  // Security
  {
    slug: "opa",
    name: "OPA / Rego",
    category: "Security",
    level: "Intermediate",
    accent: "amber",
    logo: "/stack/opa.png",
    summary: { EN: "Policy-as-code guardrails.", FR: "Garde-fous policy-as-code." },
    bullets: {
      EN: ["deny :latest images", "require probes/limits", "CI enforcement"],
      FR: ["refuse :latest", "imposer probes/limits", "enforcement CI"],
    },
    tags: ["policy", "rego", "guardrails"],
  },

  // Observability
  {
    slug: "prometheus",
    name: "Prometheus / PromQL",
    category: "Observability",
    level: "Intermediate",
    accent: "amber",
    logo: "/stack/prometheus.png",
    summary: { EN: "Metrics + SLO-style queries.", FR: "Métriques + requêtes type SLO." },
    bullets: {
      EN: ["error-rate", "p95 latency", "alerts"],
      FR: ["taux d’erreur", "latence p95", "alertes"],
    },
    tags: ["metrics", "promql", "alerts"],
  },
  {
    slug: "grafana",
    name: "Grafana",
    category: "Observability",
    level: "Intermediate",
    accent: "violet",
    logo: "/stack/grafana.png",
    summary: { EN: "Dashboards for logs/metrics/traces.", FR: "Dashboards logs/métriques/traces." },
    bullets: {
      EN: ["panels", "alert rules", "explore workflows"],
      FR: ["panels", "règles d’alerte", "exploration"],
    },
    tags: ["dashboards", "alerts", "explore"],
  },
    // Logs
  {
    slug: "loki",
    name: "Grafana Loki / LogQL",
    category: "Observability",
    level: "Intermediate",
    accent: "cyan",
    logo: "/stack/loki.png",
    summary: {
      EN: "Centralized logs + LogQL queries for incident workflows.",
      FR: "Logs centralisés + requêtes LogQL pour l’incident response.",
    },
    bullets: {
      EN: ["rate of ERROR logs", "noisy services", "logs → metrics workflow"],
      FR: ["taux d’erreurs", "services bruyants", "workflow logs → métriques"],
    },
    tags: ["logs", "logql", "loki", "incident"],
  },

  // Telemetry
  {
    slug: "opentelemetry",
    name: "OpenTelemetry",
    category: "Observability",
    level: "Intermediate",
    accent: "mint",
    logo: "/stack/opentelemetry.png",
    summary: {
      EN: "Traces/metrics/logs instrumentation with meaningful signals.",
      FR: "Instrumentation traces/métriques/logs avec signaux utiles.",
    },
    bullets: {
      EN: ["OTel Collector pipelines", "trace-based debugging", "service telemetry"],
      FR: ["pipelines OTel Collector", "debug via traces", "télémétrie service"],
    },
    tags: ["otel", "traces", "collector", "metrics"],
  },

  // ML / AI
  {
    slug: "pytorch",
    name: "PyTorch",
    category: "ML & AI",
    level: "Intermediate",
    accent: "amber",
    logo: "/stack/pytorch.png",
    summary: {
      EN: "Train small models and export for inference (TorchScript).",
      FR: "Entraîner des modèles et exporter pour l’inférence (TorchScript).",
    },
    bullets: {
      EN: ["training loop basics", "TorchScript export", "inference-ready artifacts"],
      FR: ["boucle d’entraînement", "export TorchScript", "artefacts pour inférence"],
    },
    tags: ["ml", "training", "torchscript", "inference"],
  },
  {
    slug: "mlflow",
    name: "MLflow",
    category: "ML & AI",
    level: "Intermediate",
    accent: "violet",
    logo: "/stack/miflow.svg",
    summary: {
      EN: "Track experiments, metrics, and model artifacts.",
      FR: "Suivi d’expériences, métriques et artefacts modèles.",
    },
    bullets: {
      EN: ["log metrics", "model registry basics", "artifact storage"],
      FR: ["log métriques", "bases registry", "stockage artefacts"],
    },
    tags: ["experiments", "metrics", "artifacts", "mlops"],
  },

  // Frontend
  {
    slug: "react",
    name: "React",
    category: "Frontend",
    level: "Intermediate",
    accent: "cyan",
    logo: "/stack/react.svg",
    summary: {
      EN: "Component-based UI with modern patterns.",
      FR: "UI moderne basée composants.",
    },
    bullets: {
      EN: ["routing + layouts", "state patterns", "animations"],
      FR: ["routing + layouts", "state patterns", "animations"],
    },
    tags: ["ui", "components", "routing"],
  },
  {
    slug: "typescript",
    name: "TypeScript",
    category: "Frontend",
    level: "Intermediate",
    accent: "mint",
    logo: "/stack/typescript.svg",
    summary: {
      EN: "Typed UI code that scales and stays maintainable.",
      FR: "Code UI typé, scalable et maintenable.",
    },
    bullets: {
      EN: ["type-safe props/models", "better refactors", "fewer runtime errors"],
      FR: ["props/models typés", "refactors plus sûrs", "moins d’erreurs runtime"],
    },
    tags: ["types", "safety", "scaling"],
  },
  {
    slug: "tailwind",
    name: "Tailwind CSS",
    category: "Frontend",
    level: "Intermediate",
    accent: "cyan",
    logo: "/stack/tailwind.svg",
    summary: {
      EN: "Fast iteration with consistent design tokens.",
      FR: "Itération rapide avec design tokens cohérents.",
    },
    bullets: {
      EN: ["responsive UI", "design consistency", "utility-first workflow"],
      FR: ["UI responsive", "cohérence design", "workflow utility-first"],
    },
    tags: ["css", "design", "utility"],
  },
  {
    slug: "framer-motion",
    name: "Framer Motion",
    category: "Frontend",
    level: "Intermediate",
    accent: "violet",
    logo: "/stack/framer-motion.webp",
    summary: {
      EN: "Micro-interactions + page transitions that feel premium.",
      FR: "Micro-interactions + transitions premium.",
    },
    bullets: {
      EN: ["AnimatePresence modals", "scroll reveal", "hover motion"],
      FR: ["modals AnimatePresence", "scroll reveal", "animations hover"],
    },
    tags: ["motion", "ux", "micro-interactions"],
  },

  // Go / CLI
  {
    slug: "go",
    name: "Go (Golang)",
    category: "Tooling",
    level: "Familiar",
    accent: "cyan",
    logo: "/stack/go.png",
    summary: {
      EN: "Building fast CLIs and tooling (single-binary mindset).",
      FR: "CLIs rapides et tooling (single-binary).",
    },
    bullets: {
      EN: ["cobra CLI", "semantic versioning", "client tooling"],
      FR: ["cobra CLI", "versioning sémantique", "tooling client"],
    },
    tags: ["cli", "cobra", "tooling"],
  },

  // Linux
  {
    slug: "linux",
    name: "Linux / Bash",
    category: "Tooling",
    level: "Intermediate",
    accent: "amber",
    logo: "/stack/linux.svg",
    summary: {
      EN: "CLI automation, diagnostics scripts, reliable tooling.",
      FR: "Automation CLI, scripts de diagnostic, tooling fiable.",
    },
    bullets: {
      EN: ["set -euo pipefail", "safe scripts + traps", "systemd + logs"],
      FR: ["set -euo pipefail", "scripts sûrs + traps", "systemd + logs"],
    },
    tags: ["bash", "cli", "automation", "ops"],
  },
  {
  slug: "flutter",
  name: "Flutter",
  category: "Mobile",
  level: "Intermediate",
  accent: "cyan",
  logo: "/stack/flutter.svg",
  summary: {
    EN: "Cross-platform UI with smooth navigation, dialogs, theming, and responsive layouts.",
    FR: "UI cross-platform avec navigation fluide, dialogs, thèmes, et layouts responsives.",
  },
  bullets: {
    EN: ["multi-screen navigation", "UI composition", "theming (dark/light)"],
    FR: ["navigation multi-écrans", "composition UI", "thèmes (dark/light)"],
  },
  tags: ["mobile", "ui", "navigation", "theming"],
},
{
  slug: "dart",
  name: "Dart",
  category: "Mobile",
  level: "Intermediate",
  accent: "mint",
  logo: "/stack/dart.png",
  summary: {
    EN: "Typed language for Flutter apps with clean models and maintainable code.",
    FR: "Langage typé pour apps Flutter avec modèles propres et code maintenable.",
  },
  bullets: {
    EN: ["typed models", "async/await", "clean project structure"],
    FR: ["modèles typés", "async/await", "structure de projet propre"],
  },
  tags: ["dart", "types", "async"],
},
{
  slug: "firebase-auth",
  name: "Firebase Auth",
  category: "Mobile",
  level: "Intermediate",
  accent: "amber",
  logo: "/stack/firebase.jpg",
  summary: {
    EN: "Email/password auth with user-scoped sessions and secure flows.",
    FR: "Auth email/mot de passe avec sessions et flux sécurisés.",
  },
  bullets: {
    EN: ["email/password sign-in", "auth state handling", "scoped user data"],
    FR: ["connexion email/mdp", "gestion état auth", "données par utilisateur"],
  },
  tags: ["auth", "firebase", "users"],
},
{
  slug: "firestore",
  name: "Cloud Firestore",
  category: "Mobile",
  level: "Intermediate",
  accent: "violet",
  logo: "/stack/firestore.jpg",
  summary: {
    EN: "NoSQL persistence for sleep sessions & user profiles (users/{uid} scope).",
    FR: "Persistance NoSQL pour sessions et profils (scope users/{uid}).",
  },
  bullets: {
    EN: ["CRUD for sessions", "user-scoped collections", "structured documents"],
    FR: ["CRUD sessions", "collections par utilisateur", "documents structurés"],
  },
  tags: ["database", "nosql", "firebase"],
},
{
  slug: "shared-preferences",
  name: "SharedPreferences",
  category: "Mobile",
  level: "Intermediate",
  accent: "mint",
  logo: "/stack/sharedprefs.png",
  summary: {
    EN: "Local persistence for goals, theme preferences, and small settings.",
    FR: "Persistance locale pour objectifs, thème et réglages.",
  },
  bullets: {
    EN: ["store theme preference", "goal settings", "lightweight local state"],
    FR: ["préférence thème", "objectifs", "petit état local"],
  },
  tags: ["local-storage", "prefs", "settings"],
}

];
