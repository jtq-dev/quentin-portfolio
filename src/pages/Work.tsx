import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { workProjects, type WorkProject } from "../lib/projects";

function cx(...s: Array<string | false | undefined | null>) {
  return s.filter(Boolean).join(" ");
}

function accentRing(accent?: WorkProject["accent"]) {
  switch (accent) {
    case "mint":
      return "ring-emerald-300/30";
    case "violet":
      return "ring-violet-300/30";
    case "amber":
      return "ring-amber-300/30";
    case "cyan":
    default:
      return "ring-cyan-300/30";
  }
}

export default function Work() {
  const list = useMemo(() => workProjects ?? [], []);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<WorkProject | null>(null);

  if (list.length === 0) {
    return (
      <div className="min-h-screen mx-auto max-w-6xl px-6 pt-28 pb-16">
        <div className="text-5xl font-black text-[color:var(--text)]">WORK</div>
        <p className="mt-4 text-[color:var(--muted)]">
          No projects yet. Add items to <code className="opacity-80">src/lib/projects.ts</code>.
        </p>
      </div>
    );
  }

  const a = list[Math.min(active, list.length - 1)];

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 items-start">
          {/* LEFT PREVIEW */}
          <div className="relative">
            <div
              className={cx(
                "aspect-[4/3] w-full rounded-[44px] overflow-hidden",
                "border border-[color:var(--border)] bg-[color:var(--panel)]",
                "shadow-[0_40px_90px_rgba(0,0,0,0.35)]",
                "ring-1",
                accentRing(a.accent)
              )}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={a.slug}
                  className="h-full w-full relative"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.22 }}
                >
                  <img
                    src={a.cover}
                    alt={a.title}
                    className="h-full w-full object-cover opacity-90"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20" />
                  <div className="absolute inset-0 backdrop-blur-[1px]" />

                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <div className="text-[color:var(--text)] text-3xl font-black tracking-tight">
                      {a.title}
                    </div>
                    <div className="mt-2 text-[color:var(--muted)] text-sm">
                      {a.category} • {a.year}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT LIST */}
          <div>
            <div className="flex items-end justify-between">
              <div className="text-5xl font-black tracking-tight text-[color:var(--text)]">
                WORK
              </div>
              <div className="text-lg text-[color:var(--muted)]">{list.length}</div>
            </div>

            <div className="mt-5 border-t border-[color:var(--border)]">
              {list.map((p, idx) => (
                <button
                  key={p.slug}
                  onMouseEnter={() => setActive(idx)}
                  onFocus={() => setActive(idx)}
                  onClick={() => setOpen(p)}
                  className={cx(
                    "w-full text-left",
                    "flex items-center justify-between gap-6 py-5",
                    "border-b border-[color:var(--border)]",
                    "transition-opacity",
                    idx === active ? "opacity-100" : "opacity-85 hover:opacity-100"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 text-xs text-[color:var(--muted)]">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <div className="text-2xl font-black tracking-tight text-[color:var(--text)]">
                      {p.title}
                    </div>
                  </div>

                  <div className="text-sm text-[color:var(--muted)] whitespace-nowrap">
                    {p.category}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8 text-[color:var(--muted)] text-sm">
              Tip: hover a row to preview • click to open details
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="absolute inset-0 bg-black/45 backdrop-blur"
              onClick={() => setOpen(null)}
              aria-label="Close"
            />

            <motion.div
              className={cx(
                "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                "w-[min(880px,calc(100%-2rem))]",
                "rounded-[34px] border border-[color:var(--border)] bg-[color:var(--panel)]",
                "shadow-2xl overflow-hidden"
              )}
              initial={{ y: 14, opacity: 0, scale: 0.99 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 10, opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="p-7">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="text-3xl font-black text-[color:var(--text)]">
                      {open.title}
                    </div>
                    <div className="mt-2 text-sm text-[color:var(--muted)]">
                      {open.category} • {open.year}
                    </div>
                  </div>

                  <button
                    onClick={() => setOpen(null)}
                    className="rounded-2xl border border-[color:var(--border)] bg-white/5 px-4 py-2 text-sm font-semibold text-[color:var(--text)] hover:opacity-90"
                  >
                    Close
                  </button>
                </div>

                <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
                  {open.short}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {open.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[color:var(--border)] bg-white/5 px-3 py-1 text-xs text-[color:var(--muted)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  {open.links.repo ? (
                    <a
                      className="rounded-2xl border border-[color:var(--border)] bg-white/5 px-4 py-2 text-sm font-semibold text-[color:var(--text)] hover:opacity-90"
                      href={open.links.repo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub Repo
                    </a>
                  ) : null}

                  {open.links.demo ? (
                    <a
                      className="rounded-2xl bg-white text-black px-4 py-2 text-sm font-semibold hover:opacity-90"
                      href={open.links.demo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live Demo
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
