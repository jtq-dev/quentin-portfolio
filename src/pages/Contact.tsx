import { motion } from "framer-motion";
import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { profile } from "../lib/profile";
import type { Lang } from "../lib/profile";
import type { ThemeMode } from "../theme";

type ShellCtx = { lang: Lang; theme: ThemeMode };

const ease = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  const { lang } = useOutletContext<ShellCtx>();

  const copy = useMemo(() => {
    const isFR = lang === "FR";
    return {
      title: isFR ? "CONTACT" : "CONTACT",
      mail: isFR ? "MAIL" : "MAIL",
      socials: isFR ? "RÉSEAUX SOCIAUX" : "SOCIAL MEDIAS",
    };
  }, [lang]);

  const email = profile.links.email.replace("mailto:", "");
  const socials =
  [
    profile.links?.github ? { label: "github", href: profile.links.github } : null,
    profile.links?.linkedin ? { label: "linkedin", href: profile.links.linkedin } : null,
  ].filter(Boolean) as Array<{ label: string; href: string }>;


  return (
    <section className="mx-auto max-w-6xl px-6 pt-28 pb-24">
      <motion.h2
        className="text-5xl md:text-6xl font-black tracking-tight text-[color:var(--text)]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease }}
      >
        {copy.title}
      </motion.h2>

      {/* divider line */}
      <motion.div
        className="mt-4 h-px w-full bg-[color:var(--border)]"
        initial={{ opacity: 0, scaleX: 0.7, transformOrigin: "left" }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.55, ease, delay: 0.06 }}
      />

      <div className="mt-7 grid md:grid-cols-2 gap-10 md:gap-16">
        {/* MAIL */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease, delay: 0.1 }}
          className="flex items-start gap-10"
        >
          <div className="w-24 text-sm font-black tracking-wide text-[color:var(--text)]/85">
            {copy.mail}
          </div>

          <a
            href={`mailto:${email}`}
            className="text-[color:var(--muted)] hover:opacity-80 inline-flex items-center gap-2"
          >
            <span className="text-sm">↗</span>
            <span className="text-sm md:text-base">{email}</span>
          </a>
        </motion.div>

        {/* SOCIALS */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease, delay: 0.14 }}
          className="flex items-start gap-10"
        >
          <div className="w-36 text-sm font-black tracking-wide text-[color:var(--text)]/85">
            {copy.socials}
          </div>

          <div className="flex flex-col gap-3">
            {(socials ?? []).map((s) => (
  <a
    key={s.label}
    href={s.href}
    target="_blank"
    rel="noreferrer"
    className="text-[color:var(--muted)] hover:opacity-80 inline-flex items-center gap-2"
  >
    <span className="text-sm">↗</span>
    <span className="text-sm md:text-base">{s.label}</span>
  </a>
))}

          </div>
        </motion.div>
      </div>

      {/* small dot like the reference */}
      <div className="hidden md:block relative mt-12">
        <div className="absolute right-[14%] top-0 opacity-70">
          <div className="h-5 w-5 rounded-full border border-[color:var(--border)] grid place-items-center">
            <div className="h-1 w-1 rounded-full bg-[color:var(--muted)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
