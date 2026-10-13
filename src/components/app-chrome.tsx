import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FaIcon } from "@/components/fa-icon";
import { askFahmiAi } from "@/lib/server/ai";
import { lookupIp } from "@/lib/server/fetchers";
import { detectDevice, loadMode, type DisplayMode } from "@/lib/session";
import { ACCESS } from "@/lib/catalog";

export function BackgroundGlow() {
  const [mode, setMode] = useState<DisplayMode>("full");
  useEffect(() => {
    const sync = () => {
      const next = loadMode();
      setMode(next);
      document.documentElement.dataset.nxMode = next;
    };
    sync();
    window.addEventListener("fahmi-mode", sync);
    return () => window.removeEventListener("fahmi-mode", sync);
  }, []);
  return (
    <div className={`bg-glow is-${mode}`} aria-hidden="true">
      <span className="nx-membrane nx-membrane-a" />
      <span className="nx-membrane nx-membrane-b" />
      <span className="nx-membrane nx-membrane-c" />
      <span className="nx-atmosphere" />
      {mode !== "standard" ? <span className="nx-scanlines" /> : null}
    </div>
  );
}

export function ModeBar({ mode, onChange }: { mode: DisplayMode; onChange: (mode: DisplayMode) => void }) {
  const items: { id: DisplayMode; label: string }[] = [
    { id: "standard", label: "Standard" },
    { id: "pulse", label: "Pulse" },
    { id: "full", label: "Full" },
  ];
  return (
    <div className="nx-mode" role="group" aria-label="Display mode">
      <span>DISPLAY MODE</span>
      {items.map((item) => (
        <button key={item.id} type="button" className={mode === item.id ? "is-on" : ""} onClick={() => onChange(item.id)}>
          {item.label}
        </button>
      ))}
      <em>{ACCESS.label}</em>
    </div>
  );
}

export function TopNav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <section className="nx-top-nav-block" aria-label="Navigasi tambahan">
      <div className="nx-top-nav-inner">
        <div className="nx-top-nav-copy">
          <span className="nx-top-nav-mark">
            <FaIcon name="fa-compass" />
          </span>
          <span className="nx-top-nav-text">
            <b>Menu Informasi</b>
            <span>Full Mode · About Dev · Report Bug</span>
          </span>
        </div>
        <div style={{ position: "relative" }}>
          <button className="nx-menu-btn" type="button" aria-label="Buka menu FAHMI" onClick={() => setOpen((v) => !v)}>
            <span />
          </button>
          {open ? (
            <nav className="nx-menu-panel" aria-label="Menu FAHMI">
              <div className="nx-menu-title">
                <div>
                  <b>FAHMI MENU</b>
                  <small>Gratis, efek, dan masukan</small>
                </div>
                <span className="nx-online">
                  <i /> ONLINE
                </span>
              </div>
              {[
                { to: "/vvip", rgb: "125,211,252", icon: "fa-bolt", title: "Full Mode · Gratis", sub: ACCESS.note },
                { to: "/about", rgb: "56,189,248", icon: "fa-user-astronaut", title: "About Dev", sub: "Profil developer, toolkit, playlist, dan project." },
                { to: "/feedback", rgb: "103,232,249", icon: "fa-lightbulb", title: "Report Bug, Saran & Ide", sub: "Laporkan bug, kirim saran, dan ide fitur." },
              ].map((item) => (
                <button
                  key={item.to}
                  className="nx-menu-item"
                  style={{ ["--nx-menu-rgb" as string]: item.rgb }}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    void navigate({ to: item.to });
                  }}
                >
                  <span className="nx-menu-item-icon">
                    <FaIcon name={item.icon} />
                  </span>
                  <span>
                    <b>{item.title}</b>
                    <span>{item.sub}</span>
                  </span>
                  <FaIcon name="fa-arrow-right" />
                </button>
              ))}
            </nav>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function Hero() {
  const [ok, setOk] = useState(true);
  return (
    <div className="video-banner" data-nx-hero>
      {ok ? (
        <video
          aria-hidden="true"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          src="https://files.catbox.moe/4ijdle.mp4"
          onError={() => setOk(false)}
        />
      ) : (
        <div className="nx-hero-fallback" />
      )}
      <div className="video-overlay">
        <div className="nx-hero-meta" aria-hidden="true">
          <span>
            <i className="nx-online" style={{ width: 6, height: 6, display: "inline-block", borderRadius: 99, background: "#6ee7b7" }} /> LIVE REACTOR
          </span>
          <span>FAHMI SYSTEM · 06</span>
        </div>
        <h1>
          <img src="/favicon.svg" alt="Logo FAHMI" width={54} height={54} />
          <b>All Tools FAHMI</b>
          <span className="nx-owner">FAHMI</span>
        </h1>
      </div>
    </div>
  );
}

export function SessionCard() {
  const [country, setCountry] = useState("—");
  const [battery, setBattery] = useState<number | null>(null);
  const [device, setDevice] = useState("—");
  const [browser, setBrowser] = useState("—");
  useEffect(() => {
    const d = detectDevice();
    setDevice(d.device);
    setBrowser(d.browser);
    void lookupIp({ data: {} }).then((r) => {
      if (r.ok) {
        const data = r.data as { country?: string; country_code?: string };
        setCountry(data.country ? `${data.country} (${data.country_code ?? ""})` : "—");
      }
    });
    const nav = navigator as Navigator & { getBattery?: () => Promise<{ level: number; addEventListener: (e: string, fn: () => void) => void }> };
    nav.getBattery?.().then((b) => {
      const sync = () => setBattery(Math.round(b.level * 100));
      sync();
      b.addEventListener("levelchange", sync);
    });
  }, []);
  return (
    <div className="user-card">
      <div className="nx-session-brand">
        <div className="user-avatar">
          <FaIcon name="fa-fingerprint" />
        </div>
        <div>
          <span>SESSION MATRIX</span>
          <b>System Identity</b>
        </div>
      </div>
      <div className="user-info">
        <div className="item">
          <FaIcon name="fa-globe" />
          <span className="label">Negara</span>
          <span className="value">{country}</span>
        </div>
        <div className="item">
          <FaIcon name="fa-mobile-screen" />
          <span className="label">Device</span>
          <span className="value">{device}</span>
        </div>
        <div className="item">
          <FaIcon name="fa-globe" />
          <span className="label">Browser</span>
          <span className="value">{browser}</span>
        </div>
        <div className="item">
          <FaIcon name="fa-signal" />
          <span className="label">Status</span>
          <span className="value online">ONLINE</span>
        </div>
        <div className="item">
          <div className="battery-bar">
            <FaIcon name="fa-battery-three-quarters" />
            <div className="level">
              <div className="fill" style={{ width: `${battery ?? 0}%` }} />
            </div>
            <span className="perc">{battery == null ? "—" : `${battery}%`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FreeMark() {
  return (
    <div className="nx-free-mark">
      <FaIcon name="fa-unlock" />
      <span>FULL · GRATIS</span>
    </div>
  );
}

const SUGGESTIONS = [
  "Tool apa yang paling berguna hari ini?",
  "Buatkan prompt gambar cyberpunk",
  "Cara pakai SVG ke Alight Motion",
  "Ringkas berita teknologi",
];

export function AiDock() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "assistant", content: "FAHMI AI online. Tanya tool, downloader, maker, atau ide visual." },
  ]);

  async function send(text: string) {
    const prompt = text.trim();
    if (!prompt || busy) return;
    const next = [...messages, { role: "user" as const, content: prompt }];
    setMessages(next);
    setInput("");
    setBusy(true);
    const res = await askFahmiAi({ data: { messages: next } });
    setMessages([...next, { role: "assistant", content: res.ok ? res.text : res.error }]);
    setBusy(false);
  }

  return (
    <>
      <button className="nx-ai-launcher" type="button" onClick={() => setOpen(true)}>
        <span className="nx-ai-launcher-orb">
          <FaIcon name="fa-wand-magic-sparkles" />
        </span>
        <span className="nx-ai-launcher-copy">
          <b>FAHMI AI</b>
          <small>Personal AI</small>
        </span>
      </button>
      {open ? (
        <section className="nx-ai-panel" role="dialog" aria-label="Personal AI FAHMI">
          <header className="nx-ai-head">
            <span className="nx-ai-avatar">
              <FaIcon name="fa-wand-magic-sparkles" />
            </span>
            <div className="nx-ai-identity">
              <b>FAHMI AI</b>
              <span>Personal intelligence · Liquid Reactor</span>
              <span className="nx-online" style={{ marginTop: 4 }}>
                <i /> ONLINE
              </span>
            </div>
            <button className="nx-icon-btn" type="button" aria-label="Percakapan baru" onClick={() => setMessages([{ role: "assistant", content: "Sesi baru. Ada yang bisa dibantu?" }])}>
              <FaIcon name="fa-rotate-right" />
            </button>
            <button className="nx-icon-btn" type="button" aria-label="Tutup" onClick={() => setOpen(false)}>
              <FaIcon name="fa-xmark" />
            </button>
          </header>
          <div className="nx-ai-messages">
            {messages.map((m, i) => (
              <div key={i} className={`nx-ai-msg${m.role === "user" ? " is-user" : ""}`}>
                <div className="nx-ai-bubble" style={{ whiteSpace: "pre-wrap" }}>
                  {m.content}
                </div>
              </div>
            ))}
            {busy ? <div className="nx-ai-bubble">Menulis…</div> : null}
          </div>
          <div className="nx-ai-suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s} className="nx-ai-suggestion" type="button" onClick={() => void send(s)}>
                {s}
              </button>
            ))}
          </div>
          <form
            className="nx-ai-compose"
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
          >
            <div className="nx-ai-input-wrap">
              <textarea
                className="nx-ai-input"
                rows={1}
                maxLength={4000}
                placeholder="Tulis pesan untuk Personal AI…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button className="nx-ai-send" type="submit" disabled={busy} aria-label="Kirim">
                <FaIcon name="fa-arrow-up" />
              </button>
            </div>
            <div style={{ marginTop: 6, color: "#4a6278", fontSize: 10 }}>FAHMI AI · respons dapat keliru</div>
          </form>
        </section>
      ) : null}
    </>
  );
}

export function AppFooter() {
  return (
    <footer className="nx-footer">
      <img src="/favicon.svg" alt="" width={22} height={22} />
      All Tools FAHMI · gratis · tanpa login
    </footer>
  );
}
