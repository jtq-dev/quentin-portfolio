import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { profile } from "../lib/profile";
import type { ShellCtx } from "../components/shell";
import { ChevronDown } from "lucide-react";


const ease = [0.22, 1, 0.36, 1] as const;

type ExpItem = {
  role: { EN: string; FR: string };
  org: { EN: string; FR: string };
  period: { EN: string; FR: string };
  location?: { EN: string; FR: string };
  website?: string;
  bullets: { EN: string[]; FR: string[] };
  tags: string[];
  // optional: logo/monogram
  logoText?: string; // e.g. "DS", "腾讯", "HW"
};

function cx(...s: Array<string | false | undefined | null>) {
  return s.filter(Boolean).join(" ");
}

function ExpertiseSection({ lang }: { lang: "EN" | "FR" }) {
  const [open, setOpen] = useState<number>(0);

  const data: ExpItem[] = useMemo(
    () => [
      {
        role: { EN: "Startup Survivor (McMaster), Participant", FR: "Startup Survivor (McMaster), Participant" },
        org: { EN: "DreamShield", FR: "DreamShield" },
        period: { EN: "2025 – Present", FR: "2025 – Présent" },
        location: { EN: "Hamilton, ON", FR: "Hamilton, ON" },
        bullets: {
          EN: [
            "Built DreamShield prototype roadmap (ANC wearables, iOS/Android + web).",
            "Delivered customer interview insights + Phase-2 hardware sourcing plan.",
            "Iterated pitch: TAM/SAM/SOM, competitor map, demo-first storytelling.",
          ],
          FR: [
            "Construit la roadmap prototype DreamShield (ANC wearables, iOS/Android + web).",
            "Livré les insights d’entrevues + plan de sourcing matériel (Phase 2).",
            "Itéré le pitch: TAM/SAM/SOM, concurrence, storytelling orienté démo.",
          ],
        },
        tags: ["Hardware", "Product", "Roadmap", "Pitch", "R&D"],
        logoText: "DS",
      },
      {
        role: { EN: "Software Developer Intern", FR: "Stagiaire Développeur Logiciel" },
        org: { EN: "DLD Group", FR: "DLD Group" },
        period: { EN: "Jan 2025 – Sep 2025", FR: "Jan 2025 – Sep 2025" },
        location: { EN: "Canada", FR: "Canada" },
        bullets: {
          EN: [
            "Shipped features in a CI/CD workflow with code reviews.",
            "Wrote unit tests and internal documentation to improve reliability.",
            "Improved delivery speed through structured bug triage.",
          ],
          FR: [
            "Livraison de fonctionnalités via CI/CD et code reviews.",
            "Écriture de tests unitaires + documentation interne pour la fiabilité.",
            "Amélioration du delivery via triage structuré des bugs.",
          ],
        },
        tags: ["CI/CD", "Testing", "Docs", "Delivery"],
        logoText: "DLD",
      },
      {
        role: { EN: "DevOps Intern", FR: "Stagiaire DevOps" },
        org: { EN: "Tencent", FR: "Tencent" },
        period: { EN: "Jan 2022 – Nov 2022", FR: "Jan 2022 – Nov 2022" },
        location: { EN: "Remote / International", FR: "Remote / International" },
        bullets: {
          EN: [
            "Containerized services on Kubernetes and enforced CI/CD quality gates.",
            "Used Terraform for environment consistency and repeatable provisioning.",
            "Improved monitoring using Prometheus metrics and dashboards.",
          ],
          FR: [
            "Containerisation sur Kubernetes + quality gates CI/CD.",
            "Terraform pour cohérence d’environnements et provisioning reproductible.",
            "Monitoring amélioré via Prometheus + dashboards.",
          ],
        },
        tags: ["Kubernetes", "Terraform", "Prometheus", "DevOps"],
        logoText: "腾讯",
      },
      {
        role: { EN: "Software Developer Intern", FR: "Stagiaire Développeur Logiciel" },
        org: { EN: "Huawei", FR: "Huawei" },
        period: { EN: "Jan 2023 – Aug 2023", FR: "Jan 2023 – Août 2023" },
        location: { EN: "International", FR: "International" },
        bullets: {
          EN: [
            "Built and tested Java/Spring Boot REST APIs.",
            "Applied JUnit + TDD practices to improve correctness.",
            "Delivered in Agile/Scrum sprints with clear acceptance criteria.",
          ],
          FR: [
            "Développement et tests d’APIs REST Java/Spring Boot.",
            "JUnit + TDD pour améliorer la qualité et la robustesse.",
            "Livraison en sprints Agile/Scrum avec critères clairs.",
          ],
        },
        tags: ["Spring Boot", "REST", "JUnit", "Agile"],
        logoText: "HW",
      },
    ],
    []
  );

  const title = lang === "FR" ? "EXPERTISE PROFESSIONNELLE" : "PROFESSIONAL EXPERTISE";
  const hint = lang === "FR" ? "Cliquez pour dérouler" : "Click to expand";

  return (
    <section id="expertise" className="mx-auto max-w-6xl px-6 pb-24 pt-14">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5, ease }}
        className="text-center"
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[color:var(--text)]">
          {title}
        </h2>
        <div className="mt-3 text-sm text-[color:var(--muted)]">{hint}</div>
      </motion.div>

      <div className="mt-10 space-y-4">
        {data.map((item, idx) => {
          const isOpen = open === idx;

          return (
            <div
              key={`${item.org.EN}-${idx}`}
              className="rounded-[22px] overflow-hidden border border-[color:var(--border)] bg-[color:var(--panel)]
                         shadow-[0_30px_80px_rgba(0,0,0,0.22)]"
            >
              {/* Header */}
              <button
                type="button"
                onClick={() => setOpen((v) => (v === idx ? -1 : idx))}
                className={cx(
                  "w-full px-6 py-5 flex items-center justify-between gap-6 text-left",
                  "bg-gradient-to-r from-white/10 via-white/5 to-transparent"
                )}
              >
                <div className="min-w-0">
                  <div className="text-base sm:text-lg md:text-xl font-black text-[color:var(--text)] truncate">
                    {item.role[lang]}{" "}
                    <span className="text-[color:var(--muted)] font-semibold">
                      @ {item.org[lang]}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-[color:var(--muted)]">
                    <span>{item.period[lang]}</span>
                    {item.location ? <span>• {item.location[lang]}</span> : null}
                    {item.website ? (
                      <a
                        href={item.website}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 hover:opacity-80"
                      >
                        <span>↗</span>
                        <span className="truncate">{item.website.replace("https://", "")}</span>
                      </a>
                    ) : null}
                  </div>
                </div>

                {/* right: logo + +/- */}
                <div className="shrink-0 flex items-center gap-4">
                  <div className="hidden sm:grid place-items-center h-10 w-14 rounded-2xl border border-[color:var(--border)] bg-white/5">
                    <span className="text-xs font-black tracking-wide text-[color:var(--text)]/85">
                      {item.logoText ?? item.org.EN.slice(0, 3).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-[color:var(--muted)] text-2xl font-semibold">
                    {isOpen ? "–" : "+"}
                  </div>
                </div>
              </button>

              {/* Body */}
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease }}
                    className="px-6 pb-6"
                  >
                    <div className="pt-4 border-t border-[color:var(--border)]">
                      <ul className="mt-3 space-y-2 text-sm text-[color:var(--muted)] leading-relaxed">
                        {item.bullets[lang].map((b) => (
                          <li key={b} className="flex items-start gap-3">
                            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[color:var(--muted)]/80" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-[color:var(--border)] bg-white/5 px-3 py-1 text-xs text-[color:var(--muted)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function Home() {
  const { lang, go } = useOutletContext<ShellCtx>();

  const copy = useMemo(() => {
    const h = profile.headline[lang];
    const c = profile.callMe[lang];
    const t = profile.ctas[lang];
    return { h, c, t };
  }, [lang]);

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="min-h-screen grid place-items-center px-6">
        <motion.div
          className="max-w-5xl text-center"
          initial={{ opacity: 0, y: 8, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="mt-16 text-4xl sm:text-5xl md:text-7xl font-black leading-[0.92]">
            <span className="outline-text block">
              {copy.h.pre}{" "}
              <span className="name-fill">{copy.h.name}</span>{" "}
              <span className="name-fill">{copy.h.tail}</span>
            </span>
            <span className="outline-text block mt-1">
              {copy.c.pre} <span className="name-fill">{copy.c.nick}</span>
            </span>
          </h1>

          <p className="mt-6 text-[color:var(--muted)] text-sm md:text-base whitespace-pre-line">
            {profile.subtitle[lang]}
            {"\n"}
            {profile.subline[lang]}
          </p>

          <div className="mt-8 flex items-center justify-center gap-8 text-sm md:text-base text-[color:var(--muted)]">
            <button onClick={() => go("#work")} className="hover:opacity-80">
              → {copy.t.projects}
            </button>
            <button onClick={() => go("#about")} className="hover:opacity-80">
              → {copy.t.about}
            </button>
          </div>
        </motion.div>
        {/* SCROLL HINT (pill) */}
<motion.button
  type="button"
  onClick={() => document.getElementById("expertise")?.scrollIntoView({ behavior: "smooth" })}
  className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
  aria-label="Scroll to expertise"
>
  <motion.div
    className="h-14 w-11 rounded-full border border-[color:var(--border)] bg-white/5 backdrop-blur
               grid place-items-center relative overflow-hidden"
    animate={{
      boxShadow: [
        "0 0 0 rgba(170,195,255,0.0)",
        "0 0 26px rgba(170,195,255,0.18)",
        "0 0 0 rgba(170,195,255,0.0)",
      ],
    }}
    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
  >
    {/* subtle inner sheen */}
    <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-70" />

    {/* bouncing arrow */}
    <motion.div
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      className="relative"
    >
      <ChevronDown size={18} className="text-violet-300" />
    </motion.div>

    {/* tiny dot near bottom like reference */}
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-violet-300/80" />
  </motion.div>
</motion.button>

      </section>

      {/* PROFESSIONAL EXPERTISE */}
      <ExpertiseSection lang={lang} />
    </main>
  );
}
