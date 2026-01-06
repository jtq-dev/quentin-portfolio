import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Sun, Moon } from "lucide-react";
import type { ThemeMode } from "../theme";

export type MenuHash = "#home" | "#work" | "#about" | "#contact" | "#stack";

type Socials = Partial<{
  github: string;
  linkedin: string;
  instagram: string;
  behance: string;
}>;

type Props = {
  open: boolean;
  onClose: () => void;

  lang: "FR" | "EN";
  onToggleLang: () => void;

  theme: ThemeMode;
  onToggleTheme: () => void;

  onGo: (to: MenuHash) => void;

  username?: string;
  socials?: Socials;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function MenuOverlay({
  open,
  onClose,
  lang,
  onToggleLang,
  theme,
  onToggleTheme,
  onGo,
  username = "quentin/joseph quentin",
  socials = {},
}: Props) {
  // lock scroll when menu open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const Item = ({ n, label, to }: { n: string; label: string; to: MenuHash }) => (
    <motion.button
      type="button"
      onClick={() => onGo(to)}
      className="group w-full text-left flex items-end gap-4"
      whileHover={{ x: 2 }}
      transition={{ duration: 0.18, ease }}
    >
      <span className="text-xs text-[color:var(--muted)] w-10 translate-y-[-6px]">
        {n}
      </span>

      <span className="menu-big relative">
        {label}
        <span className="absolute left-0 -bottom-3 h-px w-0 bg-[color:var(--border)] group-hover:w-full transition-all duration-300" />
      </span>
    </motion.button>
  );

  const SocialLink = ({ label, href }: { label: string; href?: string }) => {
    if (!href) return null;
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-sm text-[color:var(--muted)] hover:opacity-80 inline-flex items-center gap-2"
      >
        <span>↗</span>
        <span>{label}</span>
      </a>
    );
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* backdrop */}
          <motion.button
            aria-label="Close menu"
            className="absolute inset-0 bg-black/45"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* panel */}
          <motion.div
            className="absolute inset-0"
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 8, opacity: 0 }}
            transition={{ duration: 0.28, ease }}
          >
            <div className="absolute inset-0 backdrop-blur-[10px]" />

            <div className="relative h-full mx-auto max-w-6xl px-6 py-6">
              {/* top bar inside overlay */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-2xl border border-[color:var(--border)] bg-[color:var(--panel)] grid place-items-center">
                    <span className="font-black text-[color:var(--text)]">Q</span>
                  </div>
                  <div className="text-sm text-[color:var(--muted)] tracking-wide">
                    {username}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={onToggleLang}
                    className="text-xs font-semibold text-[color:var(--muted)] hover:opacity-80"
                  >
                    {lang}
                  </button>

                  <button
                    onClick={onToggleTheme}
                    className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--panel)] p-2 hover:opacity-90"
                    aria-label="Toggle theme"
                  >
                    {theme === "dark" ? (
                      <Sun size={18} className="text-[color:var(--muted)]" />
                    ) : (
                      <Moon size={18} className="text-[color:var(--muted)]" />
                    )}
                  </button>

                  <button
                    onClick={onClose}
                    className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--panel)] p-2 hover:opacity-90"
                    aria-label="Close"
                  >
                    <X size={18} className="text-[color:var(--muted)]" />
                  </button>
                </div>
              </div>

              {/* main menu */}
              <div className="mt-16 grid lg:grid-cols-[520px_1fr] gap-10 items-start">
                <div className="relative">
                  <div className="absolute -left-6 top-0 h-[520px] w-[520px] rounded-[52px] bg-white/5 blur-2xl opacity-30" />
                </div>

                <div className="max-w-xl">
                  <div className="flex flex-col gap-6">
                    <Item n="01" label="HOME" to="#home" />
                    <Item n="02" label="WORK" to="#work" />
                    <Item n="03" label="ABOUT" to="#about" />
                    <Item n="04" label="CONTACT" to="#contact" />
                    <Item n="05" label="TECH I USE" to="#stack" />
                  </div>

                  <div className="mt-10 flex items-center gap-6">
                    <SocialLink label="github" href={socials.github} />
                    <SocialLink label="linkedin" href={socials.linkedin} />
                    <SocialLink label="instagram" href={socials.instagram} />
                    <SocialLink label="behance" href={socials.behance} />
                  </div>
                </div>
              </div>

              {/* cursor dot like ref */}
              <div className="absolute right-10 bottom-14 hidden md:block opacity-80">
                <div className="h-5 w-5 rounded-full border border-[color:var(--border)] grid place-items-center">
                  <div className="h-1 w-1 rounded-full bg-[color:var(--muted)]" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
