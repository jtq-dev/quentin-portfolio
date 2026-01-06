import { useMemo } from "react";
import { motion } from "framer-motion";
import { useOutletContext, useNavigate } from "react-router-dom";
import { profile } from "../lib/profile";
import type { Lang } from "../lib/profile";
import type { ThemeMode } from "../theme";

type ShellCtx = { lang: Lang; theme: ThemeMode };
const ease = [0.22, 1, 0.36, 1] as const;

function cx(...s: Array<string | false | undefined | null>) {
  return s.filter(Boolean).join(" ");
}

function SectionTitle({ children }: { children: string }) {
  return (
    <div className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
      {children}
    </div>
  );
}

export default function About() {
  const ctx = useOutletContext<ShellCtx | null>();
  const lang = ctx?.lang ?? "EN";
  const nav = useNavigate();

  const copy = useMemo(() => {
    const isFR = lang === "FR";
    return {
      title: isFR ? "À PROPOS" : "ABOUT",
      kicker: isFR ? "Profil" : "Profile",
      pitchTitle: isFR ? "Je construis des systèmes utiles, testables, sécurisés." : "I build systems that are useful, testable, and secure.",
      pitch:
        isFR
          ? `Je suis ${profile.fullName}. Mon focus: DevSecOps, backend et systèmes IA.
Je ne fais pas que des “démos” — je livre des projets que les recruteurs peuvent lancer, tester et comprendre.`
          : `I'm ${profile.fullName}. My focus is DevSecOps, backend, and AI systems.
I don’t just build “demos” — I ship projects recruiters can run, test, and understand.`,
      ctaResume: isFR ? "Ouvrir mon CV" : "Open my resume",
      ctaWork: isFR ? "Voir mes projets" : "See my work",
      valueTitle: isFR ? "Ce que vous obtenez" : "What you get",
      values: isFR
        ? [
            { h: "Sécurité dès le départ", p: "API sécurisées, secrets hygiene, policies (OPA/Conftest), CI robuste." },
            { h: "Ingénierie pragmatique", p: "Code clair, tests, Docker, observabilité — livré comme un produit." },
            { h: "IA utile", p: "RAG simple, évaluation, services FastAPI — avec source & metrics." },
          ]
        : [
            { h: "Security by design", p: "Secure APIs, secrets hygiene, policy-as-code (OPA/Conftest), solid CI." },
            { h: "Pragmatic engineering", p: "Clean code, tests, Docker, observability — shipped like a product." },
            { h: "Useful AI", p: "Practical RAG, evaluation, FastAPI services — with sources & metrics." },
          ],
      proofTitle: isFR ? "Preuves rapides" : "Quick proof",
      proof: isFR
        ? [
            "Je construis des projets end-to-end (code + infra + sécurité).",
            "Je documente: README, architecture, commandes, déploiement.",
            "Je rends testable: démo en ligne + repo propre + CI verte.",
          ]
        : [
            "I build end-to-end projects (code + infra + security).",
            "I document: README, architecture, commands, deployment.",
            "I make it testable: live demo + clean repo + green CI.",
          ],
      highlightTitle: isFR ? "Domaines" : "Focus Areas",
      highlights: isFR
        ? [
            { k: "DevSecOps", v: "CI/CD, policy-as-code, scanning, GitOps" },
            { k: "Backend", v: ".NET APIs, auth, tests, Docker, SQL" },
            { k: "AI Systems", v: "ML serving, RAG, eval, telemetry" },
          ]
        : [
            { k: "DevSecOps", v: "CI/CD, policy-as-code, scanning, GitOps" },
            { k: "Backend", v: ".NET APIs, auth, tests, Docker, SQL" },
            { k: "AI Systems", v: "ML serving, RAG, eval, telemetry" },
          ],
    };
  }, [lang]);

  // Use your profile links if you have them; safe defaults
  const resumeHref = profile.links?.resume || "https://drive.google.com/<your-resume-link>";
  const githubHref = profile.links?.github || "https://github.com/<your-username>";
  const linkedinHref = profile.links?.linkedin || "https://linkedin.com/in/<your-handle>";

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-20">
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <div className="flex items-end justify-between gap-6">
            <div className="text-5xl md:text-6xl font-black tracking-tight text-[color:var(--text)]">
              {copy.title}
            </div>
            <div className="text-[color:var(--muted)] text-sm md:text-base">
              {profile.location}
            </div>
          </div>

          <motion.div
            className="mt-5 h-px w-full bg-[color:var(--border)]"
            initial={{ opacity: 0, scaleX: 0.7, transformOrigin: "left" }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, ease, delay: 0.06 }}
          />
        </motion.div>

        {/* PITCH + CTA */}
        <div className="mt-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.06 }}
          >
            <SectionTitle>{copy.kicker}</SectionTitle>
            <h2 className="mt-3 text-2xl md:text-3xl font-black text-[color:var(--text)] tracking-tight">
              {copy.pitchTitle}
            </h2>

            <p className="mt-4 whitespace-pre-line text-[color:var(--muted)] leading-relaxed">
              {copy.pitch}
            </p>

            {/* Proof bullets */}
            <ul className="mt-6 space-y-2 text-[color:var(--muted)]">
              {copy.proof.map((x) => (
                <li key={x} className="flex items-start gap-3">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[color:var(--muted)]/80" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>

            {/* Resume CTA */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={resumeHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-white text-black px-5 py-3 text-sm font-semibold hover:opacity-90"
              >
                ↗ {copy.ctaResume}
              </a>

              <button
                onClick={() => nav("/work")}
                className="rounded-2xl border border-[color:var(--border)] bg-white/5 px-5 py-3 text-sm font-semibold text-[color:var(--text)] hover:opacity-90"
              >
                → {copy.ctaWork}
              </button>
            </div>

            {/* Quick links */}
            <div className="mt-6 flex flex-wrap gap-6 text-sm text-[color:var(--muted)]">
              <a className="hover:opacity-80 inline-flex items-center gap-2" href={githubHref} target="_blank" rel="noreferrer">
                <span>↗</span> github
              </a>
              <a className="hover:opacity-80 inline-flex items-center gap-2" href={linkedinHref} target="_blank" rel="noreferrer">
                <span>↗</span> linkedin
              </a>
            </div>
          </motion.div>

          {/* RIGHT: Focus cards */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.12 }}
            className="space-y-4"
          >
            {/* Portrait card */}
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.55, ease, delay: 0.10 }}
  whileHover={{ y: -4 }}
  className="rounded-[34px] border border-[color:var(--border)] bg-[color:var(--panel)] overflow-hidden"
>
  <div className="aspect-[4/5] w-full relative">
    <motion.img
      src="/me.jpg"
      alt={`${profile.fullName} portrait`}
      className="absolute inset-0 h-full w-full object-cover"
      loading="lazy"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    />

    {/* gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

    {/* bottom caption */}
    <div className="absolute bottom-0 left-0 right-0 p-5">
      <div className="text-[color:var(--text)] font-black text-lg">
        {profile.fullName}
      </div>
      <div className="mt-1 text-[color:var(--muted)] text-sm">
        {profile.location}
      </div>
    </div>
  </div>
</motion.div>

            <SectionTitle>{copy.highlightTitle}</SectionTitle>

            <div className="grid gap-4">
              {copy.highlights.map((h) => (
                <div
                  key={h.k}
                  className={cx(
                    "rounded-[28px] border border-[color:var(--border)] bg-[color:var(--panel)]",
                    "px-5 py-5 shadow-[0_30px_70px_rgba(0,0,0,0.25)]"
                  )}
                >
                  <div className="text-[color:var(--text)] font-black text-lg">{h.k}</div>
                  <div className="mt-2 text-[color:var(--muted)] text-sm leading-relaxed">
                    {h.v}
                  </div>
                </div>
              ))}
            </div>

            {/* A subtle “resume nudge” panel */}
            <div className="rounded-[28px] border border-[color:var(--border)] bg-white/5 px-5 py-5">
              <div className="text-[color:var(--text)] font-black">Recruiter shortcut</div>
              <div className="mt-2 text-[color:var(--muted)] text-sm">
                Open my resume first, then jump to a project — everything is documented and runnable.
              </div>
              <a
                href={resumeHref}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--text)] hover:opacity-90"
              >
                ↗ {copy.ctaResume}
              </a>
            </div>
          </motion.div>
        </div>

        {/* VALUE CARDS */}
        <motion.div
          className="mt-14"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease }}
        >
          <SectionTitle>{copy.valueTitle}</SectionTitle>

          <div className="mt-4 grid md:grid-cols-3 gap-4">
            {copy.values.map((v) => (
              <div
                key={v.h}
                className="rounded-[28px] border border-[color:var(--border)] bg-[color:var(--panel)] px-5 py-5"
              >
                <div className="text-[color:var(--text)] font-black">{v.h}</div>
                <div className="mt-2 text-[color:var(--muted)] text-sm leading-relaxed">
                  {v.p}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Footer nudge */}
        <motion.div
          className="mt-16 flex items-center justify-between gap-6 border-t border-[color:var(--border)] pt-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease }}
        >
          <div className="text-sm text-[color:var(--muted)]">
            {profile.headline?.[lang]?.pre ?? "HEY"} — {profile.brand ?? "QUENTIN"}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={resumeHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-white text-black px-4 py-2 text-sm font-semibold hover:opacity-90"
            >
              ↗ Resume
            </a>
            <button
              onClick={() => nav("/work")}
              className="rounded-2xl border border-[color:var(--border)] bg-white/5 px-4 py-2 text-sm font-semibold text-[color:var(--text)] hover:opacity-90"
            >
              → Work
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
