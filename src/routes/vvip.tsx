import { createFileRoute, Link } from "@tanstack/react-router";
import { BackgroundGlow, ModeBar } from "@/components/app-chrome";
import { FaIcon } from "@/components/fa-icon";
import { ACCESS, TOOLS } from "@/lib/catalog";
import { loadMode, saveMode, type DisplayMode } from "@/lib/session";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/vvip")({ component: FullFreePage });

function FullFreePage() {
  const [mode, setMode] = useState<DisplayMode>("full");
  useEffect(() => {
    setMode(loadMode());
  }, []);
  return (
    <div>
      <BackgroundGlow />
      <div className="nx-vvip">
        <Link to="/" className="nx-back">
          <FaIcon name="fa-arrow-left" /> Kembali
        </Link>
        <p className="nx-kicker">TANPA LOGIN · TANPA BAYAR</p>
        <h1>
          FULL <em>FREE</em>
        </h1>
        <p className="nx-lead">{ACCESS.note} Katalog, visual, downloader, dan desk pasar bisa dibaca langsung.</p>
        <ModeBar
          mode={mode}
          onChange={(next) => {
            setMode(next);
            saveMode(next);
          }}
        />
        <div className="tools-grid" style={{ marginTop: 18 }}>
          {[
            ["Tidak ada akun", "Tidak ada tombol masuk, daftar, atau sesi berbayar. Buka tool dan pakai."],
            ["Full mode", "Semua kartu katalog tampil sekaligus, deskripsi lebih panjang, efek visual hidup."],
            ["Pulse", "Garis scan dan glow kartu, seperti mode efek di situs aslinya."],
            ["Standard", "Katalog dipotong per halaman kalau ingin lebih ringan."],
          ].map(([t, d]) => (
            <article key={t} className="nx-panel">
              <b>{t}</b>
              <p style={{ color: "#9fb6cc", marginTop: 6, fontSize: 13 }}>{d}</p>
            </article>
          ))}
        </div>
        <h3 style={{ fontFamily: "Orbitron,sans-serif", margin: "28px 0 12px" }}>Semua tool terbuka · {TOOLS.length}</h3>
        <div className="tools-grid">
          {TOOLS.map((t) => (
            <Link key={t.id} to="/tool/$id" params={{ id: t.id }} className="tools-card is-full" style={{ ["--nx-card-rgb" as string]: t.rgb, minHeight: 150 }}>
              <div className="nx-card-top">
                <div className="icon">
                  <FaIcon name={t.icon} />
                </div>
                <span className="badge">FREE</span>
              </div>
              <div className="nx-card-copy">
                <h4>{t.name}</h4>
                <p>{t.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
