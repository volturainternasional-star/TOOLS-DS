import { createFileRoute, Link } from "@tanstack/react-router";
import { BackgroundGlow } from "@/components/app-chrome";
import { FaIcon } from "@/components/fa-icon";

export const Route = createFileRoute("/about")({ component: AboutPage });

const PROJECTS = [
  "All Tools FAHMI",
  "Liquid Reactor UI",
  "SVG2XML Engine",
  "FAHMI Avatar Studio",
  "Visual Website",
  "Personal AI Dock",
  "BMKG Open Data",
  "MangaDex Reader",
  "Saham Desk",
  "Crypto Analisa",
  "Capital Agent",
  "Free Music + Lirik",
  "Alight XML Pack",
  "Temp Mail Bridge",
  "Web Intelligence",
  "TradingView Charts",
];

const PLAYLIST = [
  ["01", "Lo-fi Reactor", "loop malam, tempo pelan"],
  ["02", "Synthwave Ocean", "pad biru, drum mesin"],
  ["03", "Ambient Dock", "teks dan chart, tanpa vokal"],
  ["04", "Pulse Grid", "untuk mode Pulse"],
];

export function AboutPage() {
  return (
    <div>
      <BackgroundGlow />
      <div className="nx-room">
        <header className="nx-room-head">
          <Link to="/" className="nx-back">
            <FaIcon name="fa-arrow-left" /> Kembali
          </Link>
          <div className="nx-room-title">
            <b>ABOUT DEV</b>
            <span>Profile · Toolkit · Playlist · {PROJECTS.length} Project</span>
          </div>
        </header>
        <div className="nx-panel" style={{ display: "grid", gap: 12 }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <img src="/favicon.svg" alt="" width={64} height={64} />
            <div>
              <h2 style={{ fontFamily: "Orbitron,sans-serif" }}>FAHMI</h2>
              <p style={{ color: "#6b8499" }}>Builder of liquid-reactor tools · Indonesia · akses full gratis</p>
            </div>
          </div>
          <p style={{ lineHeight: 1.65, color: "#c5d4e4" }}>
            All Tools FAHMI adalah katalog downloader, maker, AI, visual, dan desk pasar. Tidak ada login. Semua kartu bisa dibuka, dibaca, dan dipakai. Mode Full menampilkan seluruh katalog plus efek di kartu visual.
          </p>
        </div>
        <h3 style={{ margin: "22px 0 10px", fontFamily: "Orbitron,sans-serif" }}>Toolkit</h3>
        <div className="tools-grid">
          {["React / TanStack", "Canvas + SVG", "xAI Grok", "MangaDex", "BMKG", "TradingView"].map((t) => (
            <div key={t} className="nx-panel">
              {t}
            </div>
          ))}
        </div>
        <h3 style={{ margin: "22px 0 10px", fontFamily: "Orbitron,sans-serif" }}>Playlist</h3>
        <div className="nx-panel">
          {PLAYLIST.map((row) => (
            <p key={row[0]} style={{ display: "flex", gap: 12, marginBottom: 8 }}>
              <b style={{ color: "#7dd3fc", minWidth: 28 }}>{row[0]}</b>
              <span>
                {row[1]}
                <small style={{ display: "block", color: "#6b8499" }}>{row[2]}</small>
              </span>
            </p>
          ))}
        </div>
        <h3 style={{ margin: "22px 0 10px", fontFamily: "Orbitron,sans-serif" }}>Project · {PROJECTS.length}</h3>
        <div className="tools-grid">
          {PROJECTS.map((p, i) => (
            <div key={p} className="nx-panel" style={{ minHeight: 72 }}>
              <small style={{ color: "#6b8499", letterSpacing: "0.12em" }}>{String(i + 1).padStart(2, "0")}</small>
              <div>{p}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
