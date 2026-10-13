import { useEffect, useMemo, useState } from "react";
import { Action, Field, Note, downloadUrl, useBusy } from "@/tools/kit";
import { FaIcon } from "@/components/fa-icon";
import { GLOSSARY } from "@/lib/tool-guides";
import { analyzeCompany, analyzeCrypto, convertFx, fetchQuote, searchTickers, TICKER_SEED } from "@/lib/server/market";
import { fetchBmkg, fetchBmkgWeather, fetchLyrics, searchFreeMusic, type FreeTrack } from "@/lib/server/fetchers";

export function toTvSymbol(raw: string) {
  const s = raw.trim().toUpperCase();
  if (!s) return "BINANCE:BTCUSDT";
  if (s.includes(":")) return s;
  if (s.endsWith(".JK")) return `IDX:${s.replace(".JK", "")}`;
  if (s === "^JKSE" || s === "IHSG" || s === "COMPOSITE") return "IDX:COMPOSITE";
  if (s === "^GSPC" || s === "SPX") return "SP:SPX";
  if (s === "^IXIC") return "NASDAQ:IXIC";
  if (s === "^DJI") return "DJ:DJI";
  if (s === "^N225") return "INDEX:NKY";
  if (s.includes("BTC")) return "BINANCE:BTCUSDT";
  if (s.includes("ETH")) return "BINANCE:ETHUSDT";
  if (s.includes("USDIDR") || s === "USDIDR=X") return "FX_IDC:USDIDR";
  if (s === "GC=F" || s === "GOLD") return "TVC:GOLD";
  if (s === "CL=F" || s === "OIL") return "TVC:USOIL";
  if (/^[A-Z]{4}$/.test(s)) return `IDX:${s}`;
  return s;
}

export function TvChart({ symbol, height = 460 }: { symbol: string; height?: number }) {
  const tv = toTvSymbol(symbol);
  const src = `https://s.tradingview.com/widgetembed/?frameElementId=fahmi_tv&symbol=${encodeURIComponent(tv)}&interval=D&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=04111c&theme=dark&style=1&timezone=Asia/Jakarta&withdateranges=1&hideideas=1&locale=id&hidevolume=0&hidetrending=1`;
  return (
    <iframe
      className="nx-tv"
      title={`TradingView ${tv}`}
      src={src}
      style={{ height }}
      loading="lazy"
      referrerPolicy="origin"
    />
  );
}

function ChipRow({
  items,
  value,
  onChange,
}: {
  items: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="nx-chip-row">
      {items.map((c) => (
        <button key={c.id} className={`nx-chip${value === c.id ? " is-on" : ""}`} type="button" onClick={() => onChange(c.id)}>
          {c.label}
        </button>
      ))}
    </div>
  );
}

const CRYPTO = [
  { id: "BINANCE:BTCUSDT", label: "BTC" },
  { id: "BINANCE:ETHUSDT", label: "ETH" },
  { id: "BINANCE:SOLUSDT", label: "SOL" },
  { id: "BINANCE:BNBUSDT", label: "BNB" },
  { id: "BINANCE:XRPUSDT", label: "XRP" },
  { id: "BINANCE:DOGEUSDT", label: "DOGE" },
  { id: "BINANCE:ADAUSDT", label: "ADA" },
  { id: "BINANCE:AVAXUSDT", label: "AVAX" },
];

function fmtN(n: number, d = 2) {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("id-ID", { maximumFractionDigits: d });
}
function fmtPct(n: number) {
  if (!Number.isFinite(n)) return "—";
  return `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`;
}
function fmtBig(n: number) {
  if (!Number.isFinite(n) || n === 0) return "—";
  const abs = Math.abs(n);
  if (abs >= 1e12) return `${(n / 1e12).toFixed(2)} T`;
  if (abs >= 1e9) return `${(n / 1e9).toFixed(2)} M`;
  if (abs >= 1e6) return `${(n / 1e6).toFixed(2)} jt`;
  return n.toLocaleString("id-ID", { maximumFractionDigits: 0 });
}

function Spark({ values }: { values: number[] }) {
  if (values.length < 2) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const d = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * 220;
      const y = 48 - ((v - min) / span) * 44;
      return `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const up = values.at(-1)! >= values[0]!;
  return (
    <svg className="nx-spark" viewBox="0 0 220 52" aria-hidden="true">
      <path d={d} fill="none" stroke={up ? "#6ee7b7" : "#fda4af"} strokeWidth="2" />
    </svg>
  );
}

function LiveTape({ lines, busy }: { lines: string[]; busy?: boolean }) {
  return (
    <div className="nx-tape" aria-live="polite">
      <div className="nx-tape-head">SCAN LIVE</div>
      {lines.map((l, i) => (
        <p key={`${i}-${l.slice(0, 24)}`}>
          <i /> {l}
        </p>
      ))}
      {busy ? <p className="nx-tape-cursor">menulis ▊</p> : null}
    </div>
  );
}

function MetricGrid({ items }: { items: { k: string; v: string }[] }) {
  return (
    <div className="nx-metrics">
      {items.map((m) => (
        <div key={m.k} className="nx-metric">
          <span>{m.k}</span>
          <b>{m.v}</b>
        </div>
      ))}
    </div>
  );
}

function QuoteStrip({
  symbol,
  name,
  price,
  changePct,
  currency,
  extra,
}: {
  symbol: string;
  name?: string;
  price?: number;
  changePct?: number;
  currency?: string;
  extra?: string;
}) {
  const up = (changePct ?? 0) >= 0;
  return (
    <div className="nx-bb">
      <div className="nx-bb-sym">{symbol.replace("BINANCE:", "").replace("IDX:", "")}</div>
      <div className="nx-bb-meta">
        <b>{name || "Terminal"}</b>
        <span>SCAN LIVE · {new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}</span>
      </div>
      <div className={`nx-bb-px${up ? " is-up" : " is-dn"}`}>
        <strong>{price != null && Number.isFinite(price) ? fmtN(price) : "—"}</strong>
        <small>
          {currency || ""} {changePct != null && Number.isFinite(changePct) ? fmtPct(changePct) : ""}
        </small>
        {extra ? <em>{extra}</em> : null}
      </div>
    </div>
  );
}

function Typewriter({ text }: { text: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    if (!text) return;
    const step = Math.max(8, Math.ceil(text.length / 80));
    const t = setInterval(() => {
      setN((v) => {
        const next = v + step;
        if (next >= text.length) {
          clearInterval(t);
          return text.length;
        }
        return next;
      });
    }, 28);
    return () => clearInterval(t);
  }, [text]);
  if (!text) return null;
  return (
    <pre className="nx-result nx-live-copy" style={{ whiteSpace: "pre-wrap" }}>
      {text.slice(0, n)}
      {n < text.length ? "▍" : ""}
    </pre>
  );
}

export function CryptoTool() {
  const [symbol, setSymbol] = useState("BINANCE:BTCUSDT");
  const [custom, setCustom] = useState("");
  return (
    <div className="nx-panel">
      <Note>
        Chart live dari TradingView — bukan CoinGecko. Ketik simbol (contoh BINANCE:PEPEUSDT) atau pilih koin. Untuk analisa 1 tahun + teks live, buka tool Crypto Analisa.
      </Note>
      <ChipRow items={CRYPTO} value={symbol} onChange={setSymbol} />
      <div className="nx-grid-2">
        <Field label="Simbol TradingView">
          <input
            className="nx-input"
            value={custom}
            placeholder="BINANCE:BTCUSDT"
            onChange={(e) => setCustom(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && custom.trim()) setSymbol(custom.trim());
            }}
          />
        </Field>
        <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: 12 }}>
          <Action onClick={() => custom.trim() && setSymbol(custom.trim())}>Buka chart</Action>
        </div>
      </div>
      <TvChart symbol={symbol} />
      <p className="nx-ok" style={{ marginTop: 10 }}>
        {toTvSymbol(symbol)} · data TradingView
      </p>
    </div>
  );
}

export function CryptoAnalisa() {
  const [symbol, setSymbol] = useState("BINANCE:BTCUSDT");
  const [custom, setCustom] = useState("");
  const [hits, setHits] = useState<{ symbol: string; name: string; exchange: string }[]>([]);
  const [tape, setTape] = useState<string[]>([]);
  const [out, setOut] = useState("");
  const [metrics, setMetrics] = useState<{ k: string; v: string }[]>([]);
  const [closes, setCloses] = useState<number[]>([]);
  const [quote, setQuote] = useState<{ name: string; price: number; changePct: number } | null>(null);
  const { busy, error, setError, run } = useBusy();

  function scan(target: string) {
    const next = target.trim() || symbol;
    setSymbol(toTvSymbol(next.includes("USDT") || next.includes(":") ? next : `BINANCE:${next.replace("-USD", "")}USDT`));
    setOut("");
    setTape(["Menghubungkan kuotasi publik…", `Memuat candle 1 tahun ${next}…`, "Menghitung return, high/low, volume…"]);
    void run(async () => {
      const r = await analyzeCrypto({ data: { symbol: next } });
      if (!r?.ok) {
        setError(r && "error" in r ? r.error : "Scan gagal. Coba BTC atau ETH.");
        setTape((t) => [...t, "Gagal memuat kuotasi"]);
        return;
      }
      const s = r.scan;
      setSymbol(s.tv);
      setCloses(s.closes);
      setQuote({ name: s.name, price: s.price, changePct: s.changePct });
      setMetrics([
        { k: "Harga", v: fmtN(s.price, 4) },
        { k: "24 jam", v: fmtPct(s.changePct) },
        { k: "Return 1 thn", v: fmtPct(s.return1y) },
        { k: "High 1 thn", v: fmtN(s.high1y, 4) },
        { k: "Low 1 thn", v: fmtN(s.low1y, 4) },
        { k: "Vol 24 jam", v: s.quoteVolume ? `${fmtBig(s.quoteVolume)} USDT` : s.volume ? fmtBig(s.volume) : "—" },
      ]);
      setTape([
        `Pair ${s.pair} · TradingView ${s.tv}`,
        `Harga ${fmtN(s.price, 4)} · 24j ${fmtPct(s.changePct)}`,
        `Range 1 tahun ${fmtN(s.low1y, 4)} – ${fmtN(s.high1y, 4)}`,
        `Return 12 bulan ${fmtPct(s.return1y)}`,
        `Volume 24 jam ${s.quoteVolume ? `${fmtBig(s.quoteVolume)} USDT` : s.volume ? fmtBig(s.volume) : "—"}`,
        "Menulis ulasan edukatif…",
      ]);
      setOut(r.analysis);
    });
  }

  function find(query: string) {
    const q = query.trim();
    if (!q) return;
    const local = TICKER_SEED.filter((t) => t.kind === "crypto" && `${t.symbol} ${t.name} ${t.tv}`.toLowerCase().includes(q.toLowerCase())).map((t) => ({
      symbol: t.tv || t.symbol,
      name: t.name,
      exchange: "Crypto",
    }));
    if (local.length) {
      setHits(local);
      setSymbol(local[0]!.symbol);
    } else {
      setSymbol(toTvSymbol(q));
    }
    void run(async () => {
      const r = await searchTickers({ data: { q, kind: "crypto" } });
      if (r?.ok && r.results.length) {
        const mapped = r.results.map((h) => ({
          symbol: TICKER_SEED.find((t) => t.symbol === h.symbol)?.tv || h.symbol,
          name: h.name,
          exchange: h.exchange,
        }));
        setHits(mapped);
        const first = mapped[0];
        if (first) setSymbol(toTvSymbol(first.symbol));
      } else if (!local.length) {
        setError(r && "error" in r && r.error ? r.error : "Koin tidak ketemu. Coba BTC, ETH, SOL.");
      }
    });
  }

  return (
    <div className="nx-panel">
      <Note>
        Analisa kripto 12 bulan: chart TradingView + candle publik. Teks live muncul saat scan. Bukan sinyal beli.
      </Note>
      <ChipRow
        items={CRYPTO}
        value={symbol}
        onChange={(id) => {
          setCustom("");
          scan(id);
        }}
      />
      <div className="nx-grid-2">
        <Field label="Cari koin">
          <input
            className="nx-input"
            value={custom}
            placeholder="BTC, ETH, SOL…"
            onChange={(e) => setCustom(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") find(custom || "BTC");
            }}
          />
        </Field>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, paddingBottom: 12, flexWrap: "wrap" }}>
          <Action busy={busy} onClick={() => find(custom || "BTC")}>
            Cari
          </Action>
          <Action busy={busy} onClick={() => scan(custom || symbol)}>
            Scan 1 tahun
          </Action>
        </div>
      </div>
      {error ? <p className="nx-error">{error}</p> : null}
      {hits.length ? (
        <div className="nx-chip-row">
          {hits.slice(0, 8).map((h) => (
            <button key={h.symbol} className={`nx-chip${toTvSymbol(h.symbol) === symbol ? " is-on" : ""}`} type="button" onClick={() => scan(h.symbol)}>
              {h.name}
            </button>
          ))}
        </div>
      ) : null}
      <QuoteStrip symbol={symbol} name={quote?.name} price={quote?.price} changePct={quote?.changePct} currency="USDT" extra="CRYPTO DESK" />
      {tape.length ? <LiveTape lines={tape} busy={busy} /> : null}
      {metrics.length ? <MetricGrid items={metrics} /> : null}
      {closes.length > 2 ? <Spark values={closes.filter((_, i, a) => i % 3 === 0 || i === a.length - 1)} /> : null}
      <TvChart symbol={symbol} height={400} />
      <Typewriter text={out} />
    </div>
  );
}

const PULSE = [
  { id: "IDX:COMPOSITE", label: "IHSG" },
  { id: "IDX:BBCA", label: "BBCA" },
  { id: "IDX:BBRI", label: "BBRI" },
  { id: "IDX:TLKM", label: "TLKM" },
  { id: "SP:SPX", label: "S&P 500" },
  { id: "NASDAQ:NVDA", label: "NVDA" },
  { id: "FX_IDC:USDIDR", label: "USD/IDR" },
  { id: "TVC:GOLD", label: "Emas" },
  { id: "TVC:USOIL", label: "Minyak" },
];

export function MarketPulse() {
  const [symbol, setSymbol] = useState("IDX:COMPOSITE");
  return (
    <div className="nx-panel">
      <Note>Papan pasar: IHSG, blue chip BEI, indeks AS, kurs, emas, minyak. Chart TradingView. Bukan sinyal beli.</Note>
      <ChipRow items={PULSE} value={symbol} onChange={setSymbol} />
      <TvChart symbol={symbol} />
    </div>
  );
}

export function SahamDesk() {
  const [q, setQ] = useState("BBCA");
  const [symbol, setSymbol] = useState("IDX:BBCA");
  const [hits, setHits] = useState<{ symbol: string; name: string; exchange: string }[]>([]);
  const [quote, setQuote] = useState<{
    name: string;
    price: number;
    changePct: number;
    currency: string;
    exchange: string;
    high1y?: number;
    low1y?: number;
    return1y?: number;
  } | null>(null);
  const [tape, setTape] = useState<string[]>([]);
  const [out, setOut] = useState("");
  const [metrics, setMetrics] = useState<{ k: string; v: string }[]>([]);
  const [years, setYears] = useState<{ year: string; revenue: number; netIncome: number }[]>([]);
  const { busy, error, setError, run } = useBusy();

  function applyQuote(hSymbol: string) {
    setSymbol(toTvSymbol(hSymbol));
    const seed = TICKER_SEED.find((t) => t.symbol === hSymbol || t.tv === toTvSymbol(hSymbol));
    if (seed) setQuote((q) => ({ name: seed.name, price: q?.price ?? 0, changePct: q?.changePct ?? 0, currency: q?.currency ?? "", exchange: seed.symbol.endsWith(".JK") ? "Jakarta" : q?.exchange ?? "" }));
    void fetchQuote({ data: { symbol: hSymbol } }).then((qq) => {
      if (qq?.ok) setQuote(qq.quote);
    });
  }

  async function find(query: string) {
    const text = query.trim();
    if (!text) return;
    setSymbol(toTvSymbol(text));
    const local = TICKER_SEED.filter((t) => t.kind === "stock" && `${t.symbol} ${t.name}`.toLowerCase().includes(text.toLowerCase())).map((t) => ({
      symbol: t.symbol,
      name: t.name,
      exchange: t.symbol.endsWith(".JK") ? "Jakarta" : "",
    }));
    if (local.length) {
      setHits(local);
      applyQuote(local[0]!.symbol);
    }
    await run(async () => {
      const r = await searchTickers({ data: { q: text, kind: "stock" } });
      if (!r?.ok) {
        if (!local.length) setError(r && "error" in r ? r.error : "Pencarian gagal. Coba BBCA atau AAPL.");
        return;
      }
      setHits(r.results);
      const first = r.results[0];
      if (first) applyQuote(first.symbol);
    });
  }

  function scanYear(ticker: string) {
    setOut("");
    setTape(["Memindai emiten…", "Mengambil kuotasi 12 bulan…", "Membaca supply, kapitalisasi, dan laporan…"]);
    void run(async () => {
      const r = await analyzeCompany({ data: { symbol: ticker, question: "Jelaskan perusahaan ini secara rinci selama satu tahun." } });
      if (!r?.ok) {
        setError(r && "error" in r ? r.error : "Scan gagal. Coba BBCA atau AAPL.");
        setTape((t) => [...t, "Gagal memuat data emiten"]);
        return;
      }
      const { quote: qt, profile: p, years: ys } = r.dossier;
      setSymbol(toTvSymbol(qt.symbol));
      setQuote(qt);
      setYears(ys);
      setMetrics([
        { k: "Harga", v: `${fmtN(qt.price)} ${qt.currency}` },
        { k: "1 hari", v: fmtPct(qt.changePct) },
        { k: "Return 1 thn", v: fmtPct(qt.return1y) },
        { k: "Market cap", v: fmtBig(p.marketCap) },
        { k: "Saham beredar", v: fmtBig(p.sharesOutstanding) },
        { k: "Float", v: fmtBig(p.floatShares) },
        { k: "P/E", v: fmtN(p.pe, 1) },
        { k: "EPS", v: fmtN(p.eps, 2) },
        { k: "ROE", v: Number.isFinite(p.roe) ? `${(p.roe * 100).toFixed(1)}%` : "—" },
        { k: "Dividend", v: Number.isFinite(p.dividendYield) ? `${(p.dividendYield * 100).toFixed(2)}%` : "—" },
        { k: "52w", v: `${fmtN(p.low52)} – ${fmtN(p.high52)}` },
        { k: "Pendapatan", v: fmtBig(p.revenue) },
      ]);
      setTape([
        `${qt.name} (${qt.symbol}) · ${qt.exchange}`,
        `Harga ${fmtN(qt.price)} ${qt.currency} · ${fmtPct(qt.changePct)} hari ini`,
        `Return 12 bulan ${fmtPct(qt.return1y)} · range ${fmtN(qt.low1y)}–${fmtN(qt.high1y)}`,
        `Supply: beredar ${fmtBig(p.sharesOutstanding)} · float ${fmtBig(p.floatShares)} · cap ${fmtBig(p.marketCap)}`,
        `Keuangan: PE ${fmtN(p.pe, 1)} · EPS ${fmtN(p.eps, 2)} · ROE ${Number.isFinite(p.roe) ? (p.roe * 100).toFixed(1) + "%" : "—"}`,
        p.sector ? `Sektor ${p.sector}${p.industry ? " · " + p.industry : ""}` : "Profil publik dibaca",
        "Menulis materi setahun…",
      ]);
      setOut(r.analysis);
    });
  }

  return (
    <div className="nx-panel">
      <Note>Ketik kode 4 huruf BEI (BBCA) atau ticker AS (AAPL). Chart TradingView. Tombol Scan 1 tahun mengisi materi + teks live di bawah.</Note>
      <Field label="Cari emiten">
        <input
          className="nx-input"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") void find(q);
          }}
        />
      </Field>
      <div className="nx-chip-row">
        <Action busy={busy} onClick={() => void find(q)}>
          Cari & buka chart
        </Action>
        <Action busy={busy} onClick={() => scanYear(q)}>
          Scan 1 tahun
        </Action>
      </div>
      {error ? <p className="nx-error">{error}</p> : null}
      {hits.length ? (
        <div className="nx-chip-row" style={{ marginTop: 12 }}>
          {hits.slice(0, 8).map((h) => (
            <button
              key={h.symbol}
              className={`nx-chip${toTvSymbol(h.symbol) === symbol ? " is-on" : ""}`}
              type="button"
              onClick={() => applyQuote(h.symbol)}
            >
              {h.symbol}
            </button>
          ))}
        </div>
      ) : null}
      {quote ? (
        <QuoteStrip
          symbol={symbol}
          name={quote.name}
          price={quote.price}
          changePct={quote.changePct}
          currency={quote.currency}
          extra={quote.return1y != null ? `1Y ${fmtPct(quote.return1y)}` : "EQUITY DESK"}
        />
      ) : (
        <QuoteStrip symbol={symbol} name="Saham Desk" extra="Ketik ticker lalu Cari" />
      )}
      <TvChart symbol={symbol} />
      {tape.length ? <LiveTape lines={tape} busy={busy} /> : null}
      {metrics.length ? <MetricGrid items={metrics} /> : null}
      {years.length ? (
        <div className="nx-year-table">
          <div className="nx-tape-head">LAPORAN TAHUNAN</div>
          {years.map((y) => (
            <p key={y.year}>
              <b>{y.year || "—"}</b> · pendapatan {fmtBig(y.revenue)} · laba {fmtBig(y.netIncome)}
            </p>
          ))}
        </div>
      ) : null}
      <Typewriter text={out} />
    </div>
  );
}

export function CapitalAgent() {
  const [q, setQ] = useState("BBCA");
  const [question, setQuestion] = useState("");
  const [out, setOut] = useState("");
  const [symbol, setSymbol] = useState("IDX:BBCA");
  const [tape, setTape] = useState<string[]>([]);
  const [metrics, setMetrics] = useState<{ k: string; v: string }[]>([]);
  const [years, setYears] = useState<{ year: string; revenue: number; netIncome: number; grossProfit: number }[]>([]);
  const [summary, setSummary] = useState("");
  const { busy, error, setError, run } = useBusy();

  function scan() {
    setOut("");
    setSummary("");
    setTape([
      `Memindai ${q.toUpperCase()}…`,
      "Mengambil harga dan range 52 minggu…",
      "Membaca supply (saham beredar / float)…",
      "Membuka laporan keuangan tahunan…",
      "Merangkai materi untuk pemula…",
    ]);
    void run(async () => {
      const r = await analyzeCompany({
        data: { symbol: q, question: question || "Jelaskan perusahaan ini secara rinci selama satu tahun terakhir." },
      });
      if (!r?.ok) {
        setError(r && "error" in r ? r.error : "Scan gagal. Coba BBCA atau AAPL.");
        setTape((t) => [...t, "Gagal memuat dossier perusahaan"]);
        return;
      }
      const { quote: qt, profile: p, years: ys, wiki } = r.dossier;
      setSymbol(toTvSymbol(qt.symbol));
      setYears(ys);
      setSummary(p.summary || wiki?.extract || "");
      setMetrics([
        { k: "Harga", v: `${fmtN(qt.price)} ${qt.currency}` },
        { k: "Return 1 thn", v: fmtPct(qt.return1y) },
        { k: "Market cap", v: fmtBig(p.marketCap) },
        { k: "Saham beredar", v: fmtBig(p.sharesOutstanding) },
        { k: "Float", v: fmtBig(p.floatShares) },
        { k: "P/E", v: fmtN(p.pe, 1) },
        { k: "Forward P/E", v: fmtN(p.forwardPe, 1) },
        { k: "EPS", v: fmtN(p.eps, 2) },
        { k: "ROE", v: Number.isFinite(p.roe) ? `${(p.roe * 100).toFixed(1)}%` : "—" },
        { k: "Margin", v: Number.isFinite(p.profitMargin) ? `${(p.profitMargin * 100).toFixed(1)}%` : "—" },
        { k: "Debt/Equity", v: fmtN(p.debtToEquity, 1) },
        { k: "Dividend yield", v: Number.isFinite(p.dividendYield) ? `${(p.dividendYield * 100).toFixed(2)}%` : "—" },
        { k: "Beta", v: fmtN(p.beta, 2) },
        { k: "52-week", v: `${fmtN(p.low52)} – ${fmtN(p.high52)}` },
        { k: "Karyawan", v: p.employees ? fmtN(p.employees, 0) : "—" },
        { k: "Sektor", v: p.sector || "—" },
      ]);
      setTape([
        `${qt.name} · ${qt.symbol} · ${qt.exchange}`,
        `Harga ${fmtN(qt.price)} ${qt.currency} (${fmtPct(qt.changePct)} hari ini)`,
        `12 bulan: return ${fmtPct(qt.return1y)} · low ${fmtN(qt.low1y)} · high ${fmtN(qt.high1y)}`,
        `Supply: ${fmtBig(p.sharesOutstanding)} lembar beredar, float ${fmtBig(p.floatShares)}`,
        `Kapitalisasi ${fmtBig(p.marketCap)} · PE ${fmtN(p.pe, 1)} · EPS ${fmtN(p.eps, 2)}`,
        p.industry ? `Industri ${p.industry}${p.city ? " · " + p.city : ""}` : "Profil publik siap",
        wiki?.title ? `Konteks: ${wiki.title}` : "Menyusun ulasan setahun…",
        "Menulis penjelasan rinci…",
      ]);
      setOut(r.analysis);
    });
  }

  return (
    <div className="nx-panel">
      <Note>
        Materi saham: supply, market cap, keuangan, pergerakan 12 bulan. Saat scan, log live muncul di bawah chart. Bukan nasihat beli/jual.
      </Note>
      <ChipRow
        items={[
          { id: "BBCA", label: "BBCA" },
          { id: "BBRI", label: "BBRI" },
          { id: "TLKM", label: "TLKM" },
          { id: "ASII", label: "ASII" },
          { id: "GOTO", label: "GOTO" },
          { id: "AAPL", label: "AAPL" },
          { id: "NVDA", label: "NVDA" },
        ]}
        value={q.toUpperCase()}
        onChange={(id) => {
          setQ(id);
          setSymbol(toTvSymbol(id));
        }}
      />
      <Field label="Ticker">
        <input className="nx-input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="BBCA atau AAPL" />
      </Field>
      <Field label="Fokus (opsional)">
        <input className="nx-input" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Contoh: bagaimana supply dan laba setahun?" />
      </Field>
      <Action busy={busy} onClick={scan}>
        Scan perusahaan 1 tahun
      </Action>
      {error ? <p className="nx-error">{error}</p> : null}
      <QuoteStrip symbol={symbol} extra="CAPITAL AGENT" />
      <TvChart symbol={symbol} height={360} />
      {tape.length ? <LiveTape lines={tape} busy={busy} /> : null}
      {metrics.length ? <MetricGrid items={metrics} /> : null}
      {years.length ? (
        <div className="nx-year-table">
          <div className="nx-tape-head">KEUANGAN TAHUNAN</div>
          {years.map((y) => (
            <p key={y.year}>
              <b>{y.year || "—"}</b> · pendapatan {fmtBig(y.revenue)} · laba bersih {fmtBig(y.netIncome)}
              {Number.isFinite(y.grossProfit) && y.grossProfit ? ` · laba kotor ${fmtBig(y.grossProfit)}` : ""}
            </p>
          ))}
        </div>
      ) : null}
      {summary ? (
        <div className="nx-result" style={{ whiteSpace: "pre-wrap" }}>
          <div className="nx-tape-head">PROFIL BISNIS</div>
          {summary}
        </div>
      ) : null}
      <Typewriter text={out} />
      <details style={{ marginTop: 14 }}>
        <summary style={{ cursor: "pointer", fontWeight: 700 }}>Glosarium saham</summary>
        <div className="nx-result">
          {GLOSSARY.map((g) => (
            <p key={g.term} style={{ marginBottom: 8 }}>
              <b>{g.term}.</b> {g.body}
            </p>
          ))}
        </div>
      </details>
    </div>
  );
}

export function DataHub() {
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("IDR");
  const [fx, setFx] = useState("");
  const { busy, error, setError, run } = useBusy();
  return (
    <div className="nx-panel">
      <Note>Konversi kurs + chart forex TradingView. Sumber kurs: open.er-api.com.</Note>
      <div className="nx-grid-2">
        <Field label="Jumlah">
          <input className="nx-input" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </Field>
        <Field label="Dari → ke">
          <div style={{ display: "flex", gap: 8 }}>
            <input className="nx-input" value={from} onChange={(e) => setFrom(e.target.value)} />
            <input className="nx-input" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
        </Field>
      </div>
      <Action
        busy={busy}
        onClick={() =>
          void run(async () => {
            const r = await convertFx({ data: { amount: Number(amount) || 0, from, to } });
            if (!r.ok) setError(r.error);
            else setFx(`${r.amount.toLocaleString("id-ID")} ${r.from} = ${r.result.toLocaleString("id-ID")} ${r.to} (kurs ${r.rate})`);
          })
        }
      >
        Konversi
      </Action>
      {error ? <p className="nx-error">{error}</p> : null}
      {fx ? <p className="nx-ok">{fx}</p> : null}
      <TvChart symbol={`FX_IDC:${from.toUpperCase()}${to.toUpperCase()}`} height={360} />
    </div>
  );
}

const CITIES = [
  { adm4: "31.71.03.1001", label: "Jakarta Pusat" },
  { adm4: "32.73.05.1001", label: "Bandung" },
  { adm4: "35.78.01.1001", label: "Surabaya" },
  { adm4: "34.71.01.1001", label: "Yogyakarta" },
  { adm4: "51.71.01.1001", label: "Denpasar" },
  { adm4: "12.71.01.1001", label: "Medan" },
  { adm4: "33.74.01.1001", label: "Semarang" },
  { adm4: "73.71.01.1001", label: "Makassar" },
  { adm4: "16.71.01.1001", label: "Palembang" },
  { adm4: "64.71.01.1001", label: "Balikpapan" },
  { adm4: "17.71.01.1001", label: "Bengkulu" },
];

type Quake = {
  Tanggal?: string;
  Jam?: string;
  Magnitude?: string;
  Kedalaman?: string;
  Wilayah?: string;
  Potensi?: string;
  Dirasakan?: string;
  Coordinates?: string;
  Lintang?: string;
  Bujur?: string;
  Shakemap?: string;
};

function QuakeCard({ g, title }: { g: Quake; title: string }) {
  const map = g.Shakemap ? `https://data.bmkg.go.id/DataMKG/TEWS/${g.Shakemap}` : "";
  return (
    <article className="nx-quake">
      <b>{title}</b>
      <p>
        M{g.Magnitude} · {g.Kedalaman} · {g.Tanggal} {g.Jam}
      </p>
      <p>{g.Wilayah}</p>
      {g.Dirasakan ? <p>Dirasakan: {g.Dirasakan}</p> : null}
      {g.Potensi ? <p>{g.Potensi}</p> : null}
      {map ? <img src={map} alt="Peta guncangan BMKG" /> : null}
    </article>
  );
}

export function BmkgTool() {
  const [adm4, setAdm4] = useState(CITIES[0].adm4);
  const [auto, setAuto] = useState<Quake | null>(null);
  const [felt, setFelt] = useState<Quake[]>([]);
  const [m5, setM5] = useState<Quake[]>([]);
  const [lokasi, setLokasi] = useState("");
  const [days, setDays] = useState<{ label: string; slots: { t: number; hu: number; ws: number; wd: string; weather_desc: string; local_datetime: string; image: string }[] }[]>([]);
  const { busy, error, setError, run } = useBusy();

  function loadAll() {
    void run(async () => {
      const [quake, cuaca] = await Promise.all([fetchBmkg(), fetchBmkgWeather({ data: { adm4 } })]);
      const one = (v: unknown): Quake[] => (Array.isArray(v) ? (v as Quake[]) : v ? [v as Quake] : []);
      setAuto(one(quake.auto)[0] ?? null);
      setFelt(one(quake.felt).slice(0, 6));
      setM5(one(quake.m5).slice(0, 6));
      if (!cuaca.ok) setError(cuaca.error);
      else {
        const loc = cuaca.lokasi as { desa?: string; kecamatan?: string; kotkab?: string; provinsi?: string };
        setLokasi([loc.desa, loc.kecamatan, loc.kotkab, loc.provinsi].filter(Boolean).join(" · "));
        setDays(
          cuaca.days.map((slots, i) => ({
            label: slots[0]?.local_datetime ? new Date(slots[0].local_datetime.replace(" ", "T")).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "short" }) : `Hari ${i + 1}`,
            slots,
          })),
        );
      }
    });
  }

  useEffect(() => {
    loadAll();
    // first paint: Jakarta Pusat
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="nx-panel">
      <Note>
        Sumber resmi BMKG: gempa auto, gempa dirasakan, M5+, dan prakiraan 3 harian per kelurahan. Bukan ramalan pihak ketiga.
      </Note>
      <ChipRow items={CITIES.map((c) => ({ id: c.adm4, label: c.label }))} value={adm4} onChange={setAdm4} />
      <Action busy={busy} onClick={loadAll}>
        Muat data BMKG
      </Action>
      {error ? <p className="nx-error">{error}</p> : null}
      {auto ? <QuakeCard g={auto} title="Gempa terkini" /> : null}
      {lokasi ? (
        <div style={{ marginTop: 16 }}>
          <h3 style={{ fontFamily: "Orbitron,sans-serif", fontSize: 14 }}>Prakiraan · {lokasi}</h3>
          {days.map((d) => (
            <div key={d.label} style={{ marginTop: 10 }}>
              <b>{d.label}</b>
              <div className="nx-forecast">
                {d.slots.map((s) => (
                  <div key={s.local_datetime} className="nx-forecast-card">
                    {s.image ? <img src={s.image} alt="" width={36} height={36} /> : <FaIcon name="fa-cloud-sun" />}
                    <strong>{s.local_datetime.slice(11, 16)}</strong>
                    <span>{s.weather_desc}</span>
                    <span>
                      {s.t}°C · RH {s.hu}%
                    </span>
                    <small>
                      Angin {s.wd} {s.ws} km/j
                    </small>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {felt.length ? (
        <div style={{ marginTop: 18 }}>
          <h3 style={{ fontFamily: "Orbitron,sans-serif", fontSize: 14 }}>Gempa dirasakan</h3>
          {felt.map((g, i) => (
            <QuakeCard key={i} g={g} title={`M${g.Magnitude}`} />
          ))}
        </div>
      ) : null}
      {m5.length ? (
        <div style={{ marginTop: 18 }}>
          <h3 style={{ fontFamily: "Orbitron,sans-serif", fontSize: 14 }}>Gempa M5+</h3>
          {m5.map((g, i) => (
            <QuakeCard key={i} g={g} title={`M${g.Magnitude}`} />
          ))}
        </div>
      ) : null}
      <p style={{ marginTop: 14, fontSize: 11, color: "#6b8499" }}>Sumber: BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)</p>
    </div>
  );
}

function fmtDur(sec: number) {
  if (!sec) return "";
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function FreeMusicTool() {
  const [q, setQ] = useState("lofi");
  const [source, setSource] = useState<"both" | "audius" | "archive">("both");
  const [tracks, setTracks] = useState<FreeTrack[]>([]);
  const [current, setCurrent] = useState<FreeTrack | null>(null);
  const [lyrics, setLyrics] = useState("");
  const [lyricMeta, setLyricMeta] = useState("");
  const { busy, error, setError, run } = useBusy();
  const { busy: lyricBusy, run: runLyric } = useBusy();

  const audioSrc = current?.streamUrl ?? "";

  const search = () =>
    void run(async () => {
      const r = await searchFreeMusic({ data: { q, source } });
      if (!r.ok) {
        setError(r.error);
        setTracks([]);
      } else {
        setTracks(r.tracks);
        setCurrent(r.tracks[0] ?? null);
        setLyrics("");
      }
    });

  const loadLyrics = (t: FreeTrack) =>
    void runLyric(async () => {
      const r = await fetchLyrics({ data: { q: `${t.artist} ${t.title}`, artist: t.artist, title: t.title } });
      if (!r.ok) setLyrics(r.error);
      else {
        setLyrics(r.lyrics);
        setLyricMeta(`${r.title} · ${r.artist}${r.album ? ` · ${r.album}` : ""}`);
      }
    });

  const extraFiles = useMemo(() => current, [current]);

  return (
    <div className="nx-panel">
      <Note>
        Ketik judul atau mood. Musik dari Audius (gratis diputar) dan Internet Archive (berkas penuh, banyak CC/public domain). Bukan toko berbayar.
      </Note>
      <Field label="Cari lagu">
        <input
          className="nx-input"
          value={q}
          placeholder="lofi, jazz, piano, rain…"
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") search();
          }}
        />
      </Field>
      <ChipRow
        items={[
          { id: "both", label: "Semua" },
          { id: "audius", label: "Audius" },
          { id: "archive", label: "Archive unduh penuh" },
        ]}
        value={source}
        onChange={(id) => setSource(id as typeof source)}
      />
      <Action busy={busy} onClick={search}>
        Cari musik gratis
      </Action>
      {error ? <p className="nx-error">{error}</p> : null}

      {current ? (
        <div className="nx-nowplay">
          {current.artwork ? <img src={current.artwork} alt="" /> : <span className="nx-nowplay-ph"><FaIcon name="fa-music" /></span>}
          <div>
            <b>{current.title}</b>
            <p>
              {current.artist} {fmtDur(current.duration) ? `· ${fmtDur(current.duration)}` : ""}
            </p>
            <small>{current.license}</small>
            <audio key={audioSrc} controls preload="none" src={audioSrc} style={{ width: "100%", marginTop: 8 }} />
            <div className="nx-chip-row">
              <a className="nx-btn" href={current.downloadUrl} download target="_blank" rel="noreferrer">
                Unduh audio
              </a>
              <Action ghost busy={lyricBusy} onClick={() => loadLyrics(current)}>
                Ambil lirik penuh
              </Action>
              {current.extraUrl ? (
                <a className="nx-btn ghost" href={current.extraUrl} target="_blank" rel="noreferrer">
                  Sumber
                </a>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {lyrics ? (
        <div className="nx-result" style={{ whiteSpace: "pre-wrap" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
            <b>{lyricMeta || "Lirik"}</b>
            <button
              className="nx-btn ghost"
              type="button"
              onClick={() => downloadUrl(`data:text/plain;charset=utf-8,${encodeURIComponent(`${lyricMeta}\n\n${lyrics}`)}`, `${(current?.title || "lirik").replace(/\s+/g, "-")}-lirik.txt`)}
            >
              Unduh lirik .txt
            </button>
          </div>
          {lyrics}
        </div>
      ) : null}

      <div className="nx-track-list">
        {tracks.map((t) => (
          <button
            key={t.id}
            className={`nx-track${current?.id === t.id ? " is-on" : ""}`}
            type="button"
            onClick={() => {
              setCurrent(t);
              setLyrics("");
            }}
          >
            {t.artwork ? <img src={t.artwork} alt="" /> : <span />}
            <span>
              <b>{t.title}</b>
              <small>
                {t.artist} · {t.source === "archive" ? "unduh penuh" : "stream gratis"}
              </small>
            </span>
          </button>
        ))}
      </div>
      {extraFiles?.source === "archive" ? (
        <p style={{ marginTop: 10, fontSize: 12, color: "#6b8499" }}>Tombol Unduh audio mengambil berkas MP3 asli dari Internet Archive.</p>
      ) : null}
    </div>
  );
}
