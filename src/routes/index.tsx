import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AiDock, AppFooter, BackgroundGlow, FreeMark, Hero, ModeBar, SessionCard, TopNav } from "@/components/app-chrome";
import { FaIcon } from "@/components/fa-icon";
import { PAGE_SIZE, TABS, type TabId, toolsByTab } from "@/lib/catalog";
import { TOOL_GUIDES } from "@/lib/tool-guides";
import { VISUALS } from "@/lib/visuals";
import { clearHistory, loadHistory, loadMode, saveMode, type DisplayMode } from "@/lib/session";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [tab, setTab] = useState<TabId>("all");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [history, setHistory] = useState<{ title: string; kind: string; at: number }[]>([]);
  const [kind, setKind] = useState("semua");
  const [mode, setMode] = useState<DisplayMode>("full");

  useEffect(() => {
    setHistory(loadHistory());
    setMode(loadMode());
  }, [tab]);

  const list = useMemo(() => {
    const base = tab === "visuals" ? [] : toolsByTab(tab);
    const filtered = q.trim()
      ? base.filter((t) => `${t.name} ${t.description} ${t.badge}`.toLowerCase().includes(q.toLowerCase()))
      : base;
    return filtered;
  }, [tab, q]);

  const shown = mode === "full" ? list : list.slice(0, page * PAGE_SIZE);
  const historyShown = history.filter((h) => (kind === "semua" ? true : h.kind.toLowerCase().includes(kind)));
  const visuals = useMemo(() => {
    const f = q.trim() ? VISUALS.filter((v) => `${v.name} ${v.tag}`.toLowerCase().includes(q.toLowerCase())) : VISUALS;
    return f;
  }, [q]);

  return (
    <div>
      <a className="nx-skip" href="#main-content">
        Lewati ke konten utama
      </a>
      <BackgroundGlow />
      <FreeMark />
      <TopNav />
      <Hero />
      <main className="nx-container" id="main-content">
        <ModeBar
          mode={mode}
          onChange={(next) => {
            setMode(next);
            saveMode(next);
          }}
        />
        <SessionCard />
        <div className="nav-tabs" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`nav-tab${tab === t.id ? " active" : ""}`}
              type="button"
              onClick={() => {
                setTab(t.id);
                setPage(1);
              }}
            >
              <FaIcon name={t.icon} /> {t.label}
            </button>
          ))}
        </div>
        <label className="nx-search">
          <FaIcon name="fa-magnifying-glass" />
          <input
            placeholder={tab === "visuals" ? "Cari visual, animasi, atau efek…" : "Cari tools…"}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            suppressHydrationWarning
          />
        </label>

        {tab === "visuals" ? (
          <>
            <section className="nx-visual-intro">
              <div>
                <div style={{ fontSize: 10, letterSpacing: "0.16em", color: "#6b8499", fontWeight: 800 }}>INTERACTIVE WEB EXPERIMENTS</div>
                <h2>FAHMI Visual Website</h2>
                <p>
                  {mode === "full"
                    ? "Full mode: semua eksperimen kebaca sekaligus, efeknya hidup di kartu. Gratis, tanpa login."
                    : "Jelajahi animasi, interaksi, loader, dan eksperimen visual dari satu katalog ringan."}
                </p>
              </div>
              <div className="nx-visual-total">
                <strong>{VISUALS.length}</strong>
                <span>VISUAL</span>
              </div>
            </section>
            <div className="nx-visual-grid">
              {visuals.map((v) => (
                <Link key={v.id} to="/visual/$id" params={{ id: v.id }} className="nx-visual-card">
                  <div className="preview">
                    {mode === "standard" ? null : (
                      <iframe title="" srcDoc={v.html} sandbox="allow-scripts" tabIndex={-1} />
                    )}
                  </div>
                  <figcaption>
                    <b>{v.name}</b>
                    <small>{v.tag.toUpperCase()}</small>
                  </figcaption>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="section-title">
              <span className="icon-box">
                <FaIcon name={TABS.find((t) => t.id === tab)?.icon ?? "fa-th-large"} />
              </span>
              {tab === "all" ? "Semua Tools" : TABS.find((t) => t.id === tab)?.label}
              <span className="line" />
              <span className="nx-catalog-count">{list.length}</span>
            </div>
            <div className="tools-grid">
              {shown.map((t) => (
                <Link
                  key={t.id}
                  to="/tool/$id"
                  params={{ id: t.id }}
                  className={`tools-card${mode === "full" ? " is-full" : ""}`}
                  style={{ ["--nx-card-rgb" as string]: t.rgb }}
                >
                  <div className="nx-card-top">
                    <div className="icon">
                      <FaIcon name={t.icon} />
                    </div>
                    <span className="badge">{t.badge}</span>
                  </div>
                  <div className="nx-card-copy">
                    <h4>{t.name}</h4>
                    <p>{t.description}</p>
                    {mode === "full" && TOOL_GUIDES[t.id] ? <small className="nx-card-how">{TOOL_GUIDES[t.id].how}</small> : null}
                  </div>
                  <div className="nx-card-footer">
                    <span className="nx-card-readiness">Gratis</span>
                    <span className="nx-card-format">{t.format}</span>
                    <div className="arrow">
                      <FaIcon name="fa-arrow-right" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {mode !== "full" && shown.length < list.length ? (
              <button className="nx-more" type="button" onClick={() => setPage((p) => p + 1)}>
                Tampilkan tools lagi <small>{shown.length}/{list.length}</small>
              </button>
            ) : null}
            {tab === "downloader" ? (
              <div className="history-card">
                <div className="history-top">
                  <b>
                    <FaIcon name="fa-clock-rotate-left" /> History Download
                  </b>
                  <button
                    className="nx-btn ghost"
                    type="button"
                    onClick={() => {
                      clearHistory();
                      setHistory([]);
                    }}
                  >
                    Bersihkan
                  </button>
                </div>
                <div className="nx-kind-row">
                  {[
                    ["semua", "Semua"],
                    ["mp3", "MP3"],
                    ["mp4", "MP4"],
                    ["jpg", "JPG"],
                    ["file", "FILE"],
                  ].map(([id, label]) => (
                    <button key={id} type="button" className={`nx-chip${kind === id ? " is-on" : ""}`} onClick={() => setKind(id)}>
                      {label}
                    </button>
                  ))}
                </div>
                {historyShown.length === 0 ? (
                  <div className="history-empty">Belum ada riwayat. Download berhasil dari musik, Instagram, atau TikTok akan muncul di sini.</div>
                ) : (
                  historyShown.map((h, i) => (
                    <div key={i} className="history-item">
                      <span>{h.title}</span>
                      <span>{h.kind}</span>
                    </div>
                  ))
                )}
              </div>
            ) : null}
          </>
        )}
        <AppFooter />
      </main>
      <AiDock />
    </div>
  );
}
