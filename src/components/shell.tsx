import { useEffect, useMemo, useState, useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu, Sun, Moon } from "lucide-react";
import MetaballsBackground from "./MetaballsBackground";
import MenuOverlay, { type MenuHash } from "./MenuOverlay";
import { getInitialTheme, applyTheme } from "../theme";
import type { ThemeMode } from "../theme";
import type { Lang } from "../lib/profile";
import Cursor from "./Cursor";


export type ShellCtx = {
  lang: Lang;
  theme: ThemeMode;
  go: (hash: MenuHash) => void;
};

export default function Shell() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("EN");
  const [theme, setTheme] = useState<ThemeMode>(() => getInitialTheme());

  useEffect(() => applyTheme(theme), [theme]);
  useEffect(() => {
  document.body.classList.add("cursor-on");
  return () => document.body.classList.remove("cursor-on");
}, []);


  // IMPORTANT: go navigates to real pages (no scrolling needed)
  const go = useCallback(
    (hash: MenuHash) => {
      setMenuOpen(false);
      if (hash === "#home") return navigate("/");
      if (hash === "#work") return navigate("/work");
      if (hash === "#about") return navigate("/about");
      if (hash === "#contact") return navigate("/contact");
      if (hash === "#stack") {
  navigate("/stack");
  return;
}
    },
    [navigate]
  );

  const ctx = useMemo<ShellCtx>(() => ({ lang, theme, go }), [lang, theme, go]);

  return (
    <div className="grain min-h-screen">
      <MetaballsBackground mode={theme} />
      <Cursor />

      {/* Top bar */}
      <header className="fixed inset-x-0 top-0 z-40">
        <div className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">
          <button onClick={() => go("#home")} className="flex items-center gap-3" aria-label="Go home">
            <div className="h-10 w-10 rounded-2xl border border-[color:var(--border)] bg-[color:var(--panel)] grid place-items-center">
              <span className="font-black text-[color:var(--text)]">Q</span>
            </div>
          </button>

          <div className="flex items-center gap-3">
            <button onClick={() => setLang(v => (v === "FR" ? "EN" : "FR"))}
              className="text-xs font-semibold text-[color:var(--muted)] hover:opacity-80">
              {lang}
            </button>

            <button
              onClick={() => setTheme(t => (t === "dark" ? "light" : "dark"))}
              className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--panel)] p-2 hover:opacity-90"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} className="text-[color:var(--muted)]" /> : <Moon size={18} className="text-[color:var(--muted)]" />}
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--panel)] p-2 hover:opacity-90"
              aria-label="Open menu"
            >
              <Menu size={18} className="text-[color:var(--muted)]" />
            </button>
          </div>
        </div>
      </header>

      <MenuOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        lang={lang}
        onToggleLang={() => setLang(v => (v === "FR" ? "EN" : "FR"))}
        theme={theme}
        onToggleTheme={() => setTheme(t => (t === "dark" ? "light" : "dark"))}
        onGo={go}
        username="quentin/joseph quentin"
        socials={{
          github: "https://github.com/<your-username>",
          linkedin: "https://linkedin.com/in/<your-handle>",
        }}
      />

      {/* Page content */}
      <Outlet context={ctx} />
    </div>
  );
}
