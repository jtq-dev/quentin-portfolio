import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { stackItems, type StackItem } from "../lib/stack";
import type { Lang } from "../lib/profile";
import type { ThemeMode } from "../theme";

type ShellCtx = { lang: Lang; theme: ThemeMode };
const ease = [0.22, 1, 0.36, 1] as const;

function cx(...s: Array<string | false | undefined | null>) {
  return s.filter(Boolean).join(" ");
}

function accentRing(accent?: StackItem["accent"]) {
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

function levelDots(level: StackItem["level"]) {
  const n = level === "Advanced" ? 3 : level === "Intermediate" ? 2 : 1;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 3 }).map((_, i) => (
        <span
          key={i}
          className={cx(
            "h-1.5 w-1.5 rounded-full",
            i < n ? "bg-[color:var(--text)]/70" : "bg-[color:var(--border)]"
          )}
        />
      ))}
    </div>
  );
}

function Logo({ item }: { item: StackItem }) {
  // fallback “initials chip” if logo missing
  if (!item.logo) {
    const initials = item.name
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("");
    return (
      <div className="h-12 w-12 rounded-2xl border border-[color:var(--border)] bg-white/5 grid place-items-center">
        <span className="text-xs font-black text-[color:var(--text)]">{initials}</span>
      </div>
    );
  }

  return (
    <div className="h-12 w-12 rounded-2xl border border-[color:var(--border)] bg-white/5 grid place-items-center overflow-hidden">
      <img
        src={item.logo}
        alt={`${item.name} logo`}
        className="h-7 w-7 object-contain opacity-90"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
    </div>
  );
}

export default function Stack() {
  const ctx = useOutletContext<ShellCtx | null>();
  const lang = ctx?.lang ?? "EN";

  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<StackItem | null>(null);
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    const all = stackItems;
    if (!s) return all;
    return all.filter((x) => {
      return (
        x.name.toLowerCase().includes(s) ||
        x.category.toLowerCase().includes(s) ||
        x.tags.some((t) => t.toLowerCase().includes(s))
      );
    });
  }, [q]);

  const a = list[Math.min(active, Math.max(0, list.length - 1))];

  const copy = useMemo(() => {
    const isFR = lang === "FR";
    return {
      title: isFR ? "STACK" : "STACK",
      countLabel: isFR ? "outils" : "tools",
      search: isFR ? "Rechercher (ex: Docker, K8s, CI…)" : "Search (e.g. Docker, K8s, CI…)",
      hint: isFR ? "Survole pour prévisualiser • clique pour détails" : "Hover to preview • click for details",
      close: isFR ? "Fermer" : "Close",
    };
  }, [lang]);

  return (
    <main className="min-h-screen">
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
                accentRing(a?.accent)
              )}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={a?.slug ?? "empty"}
                  className="h-full w-full relative"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.22, ease }}
                >
                  {/* glossy gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/25" />
                  <div className="absolute inset-0 backdrop-blur-[1px]" />

                  {/* center logo + meta */}
                  {a ? (
                    <div className="absolute inset-0 grid place-items-center p-10">
                      <div className="w-full max-w-md">
                        <div className="flex items-center gap-4">
                          <div className="scale-[1.05]">
                            <Logo item={a} />
                          </div>
                          <div>
                            <div className="text-[color:var(--text)] text-3xl font-black tracking-tight">
                              {a.name}
                            </div>
                            <div className="mt-1 text-[color:var(--muted)] text-sm">
                              {a.category} • {a.level}
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 text-[color:var(--muted)] leading-relaxed">
                          {a.summary[lang]}
                        </div>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {a.tags.slice(0, 6).map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-[color:var(--border)] bg-white/5 px-3 py-1 text-xs text-[color:var(--muted)]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/* bottom “STACK” label */}
                  <div className="absolute left-7 bottom-6 text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
                    {copy.title}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT LIST */}
          <div>
            <div className="flex items-end justify-between">
              <div className="text-5xl font-black tracking-tight text-[color:var(--text)]">
                {copy.title}
              </div>
              <div className="text-lg text-[color:var(--muted)]">
                {list.length} {copy.countLabel}
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--panel)] px-4 py-3">
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setActive(0);
                }}
                placeholder={copy.search}
                className="w-full bg-transparent outline-none text-[color:var(--text)] placeholder:text-[color:var(--muted)]"
              />
            </div>

            <div className="mt-6 border-t border-[color:var(--border)]">
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
                    <Logo item={p} />
                    <div>
                      <div className="text-xl font-black tracking-tight text-[color:var(--text)]">
                        {p.name}
                      </div>
                      <div className="mt-1 text-xs text-[color:var(--muted)]">
                        {p.category}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-[color:var(--muted)] whitespace-nowrap">
                    {levelDots(p.level)}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 text-[color:var(--muted)] text-sm">{copy.hint}</div>
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
              className="absolute left-1/2 top-1/2 w-[min(920px,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-[34px]
                         border border-[color:var(--border)] bg-[color:var(--panel)] shadow-2xl overflow-hidden"
              initial={{ y: 14, opacity: 0, scale: 0.99 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 10, opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.22, ease }}
            >
              <div className="p-7">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <Logo item={open} />
                    <div>
                      <div className="text-3xl font-black text-[color:var(--text)]">
                        {open.name}
                      </div>
                      <div className="mt-1 text-sm text-[color:var(--muted)]">
                        {open.category} • {open.level}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setOpen(null)}
                    className="rounded-2xl border border-[color:var(--border)] bg-white/5 px-4 py-2 text-sm font-semibold text-[color:var(--text)] hover:opacity-90"
                  >
                    {copy.close}
                  </button>
                </div>

                <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
                  {open.summary[lang]}
                </p>

                <div className="mt-6 grid md:grid-cols-2 gap-4">
                  <div className="rounded-[24px] border border-[color:var(--border)] bg-white/5 p-5">
                    <div className="text-[color:var(--text)] font-black">Highlights</div>
                    <ul className="mt-3 space-y-2 text-sm text-[color:var(--muted)]">
                      {open.bullets[lang].map((x) => (
                        <li key={x} className="flex items-start gap-3">
                          <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[color:var(--muted)]/80" />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-[24px] border border-[color:var(--border)] bg-white/5 p-5">
                    <div className="text-[color:var(--text)] font-black">Tags</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {open.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-[color:var(--border)] bg-white/5 px-3 py-1 text-xs text-[color:var(--muted)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-7 text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
                  {open.category}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
