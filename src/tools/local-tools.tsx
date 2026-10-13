import { useEffect, useMemo, useRef, useState } from "react";
import { Action, Field, Note, canvasPng, downloadUrl, fillCard, useBusy } from "@/tools/kit";
import { FaIcon } from "@/components/fa-icon";

export function CalcTool() {
  const [expr, setExpr] = useState("12 * (5 + 3)");
  const [out, setOut] = useState("");
  function run() {
    try {
      const safe = expr.replace(/[^0-9+\-*/().%\s]/g, "");
      // eslint-disable-next-line no-new-func
      const v = Function(`"use strict";return (${safe})`)();
      setOut(String(v));
    } catch {
      setOut("Ekspresi tidak valid");
    }
  }
  return (
    <div className="nx-panel">
      <Field label="Ekspresi">
        <input className="nx-input" value={expr} onChange={(e) => setExpr(e.target.value)} />
      </Field>
      <Action onClick={run}>Hitung</Action>
      {out ? <div className="nx-result">{out}</div> : null}
    </div>
  );
}

export function PwGenTool() {
  const [len, setLen] = useState(16);
  const [pw, setPw] = useState("");
  function gen() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*";
    const buf = new Uint32Array(len);
    crypto.getRandomValues(buf);
    setPw([...buf].map((n) => chars[n % chars.length]).join(""));
  }
  return (
    <div className="nx-panel">
      <Field label={`Panjang (${len})`}>
        <input className="nx-input" type="range" min={8} max={64} value={len} onChange={(e) => setLen(Number(e.target.value))} />
      </Field>
      <Action onClick={gen}>Generate</Action>
      {pw ? (
        <div className="nx-result" style={{ fontFamily: "ui-monospace,monospace" }}>
          {pw}
        </div>
      ) : null}
    </div>
  );
}

const MORSE: Record<string, string> = {
  a: ".-", b: "-...", c: "-.-.", d: "-..", e: ".", f: "..-.", g: "--.", h: "....", i: "..", j: ".---", k: "-.-", l: ".-..", m: "--",
  n: "-.", o: "---", p: ".--.", q: "--.-", r: ".-.", s: "...", t: "-", u: "..-", v: "...-", w: ".--", x: "-..-", y: "-.--", z: "--..",
  "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.", "0": "-----",
  " ": "/",
};
const REV = Object.fromEntries(Object.entries(MORSE).map(([k, v]) => [v, k]));

export function MorseTool() {
  const [text, setText] = useState("FAHMI");
  const code = text
    .toLowerCase()
    .split("")
    .map((c) => MORSE[c] ?? "")
    .join(" ");
  function play() {
    const ctx = new AudioContext();
    let t = ctx.currentTime;
    for (const ch of code) {
      if (ch === "." || ch === "-") {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.frequency.value = 600;
        o.connect(g);
        g.connect(ctx.destination);
        const dur = ch === "." ? 0.08 : 0.22;
        g.gain.setValueAtTime(0.08, t);
        o.start(t);
        o.stop(t + dur);
        t += dur + 0.06;
      } else t += 0.16;
    }
  }
  const back = code
    .split(" ")
    .map((c) => REV[c] ?? "")
    .join("");
  return (
    <div className="nx-panel">
      <Field label="Teks">
        <input className="nx-input" value={text} onChange={(e) => setText(e.target.value)} />
      </Field>
      <div className="nx-result">{code || "—"}</div>
      <Note>Decode: {back}</Note>
      <Action onClick={play}>Putar audio</Action>
    </div>
  );
}

export function QrTool() {
  const [text, setText] = useState("https://all-tools-fahmi.app");
  const src = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(text)}`;
  return (
    <div className="nx-panel">
      <Field label="Isi QR">
        <input className="nx-input" value={text} onChange={(e) => setText(e.target.value)} />
      </Field>
      <img src={src} alt="QR" width={220} height={220} style={{ borderRadius: 16, background: "#fff" }} />
    </div>
  );
}

export function QuoteTool() {
  const [q, setQ] = useState("Stay hungry. Stay foolish.");
  const [a, setA] = useState("Steve Jobs");
  const ref = useRef<HTMLCanvasElement>(null);
  function draw() {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#f5f5f4";
    ctx.font = "italic 28px Georgia,serif";
    wrapText(ctx, `“${q}”`, 40, 120, 520, 36);
    ctx.font = "14px Poppins,sans-serif";
    ctx.fillStyle = "#a8a29e";
    ctx.fillText(`— ${a}`, 40, 340);
  }
  useEffect(draw, [q, a]);
  return (
    <div className="nx-panel">
      <Field label="Quote">
        <textarea className="nx-textarea" value={q} onChange={(e) => setQ(e.target.value)} />
      </Field>
      <Field label="Author">
        <input className="nx-input" value={a} onChange={(e) => setA(e.target.value)} />
      </Field>
      <canvas ref={ref} width={600} height={380} style={{ width: "100%", borderRadius: 16 }} />
      <Action onClick={() => ref.current && canvasPng(ref.current, "quote.png")}>Unduh JPG</Action>
    </div>
  );
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, max: number, lh: number) {
  const words = text.split(" ");
  let line = "";
  let yy = y;
  for (const w of words) {
    const test = `${line}${w} `;
    if (ctx.measureText(test).width > max) {
      ctx.fillText(line, x, yy);
      line = `${w} `;
      yy += lh;
    } else line = test;
  }
  ctx.fillText(line, x, yy);
}

export function AvatarStudio() {
  const [seed, setSeed] = useState("fahmi");
  const [style, setStyle] = useState("adventurer");
  const styles = ["adventurer", "lorelei", "notionists", "bottts", "identicon", "shapes", "fun-emoji", "pixel-art"];
  const src = `https://api.dicebear.com/9.x/${style}/svg?seed=${encodeURIComponent(seed)}`;
  return (
    <div className="nx-panel">
      <div className="nx-grid-2">
        <Field label="Seed">
          <input className="nx-input" value={seed} onChange={(e) => setSeed(e.target.value)} />
        </Field>
        <Field label="Style">
          <select className="nx-select" value={style} onChange={(e) => setStyle(e.target.value)}>
            {styles.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
      </div>
      <img src={src} alt="avatar" width={220} height={220} style={{ borderRadius: 24, background: "#0c1c30" }} />
      <div style={{ marginTop: 12 }}>
        <a className="nx-btn" href={src} download={`avatar-${seed}.svg`}>
          Unduh SVG
        </a>
      </div>
    </div>
  );
}

export function CertTool() {
  const [name, setName] = useState("Budi Santoso");
  const [reason, setReason] = useState("Juara 1 Lomba Meme Nasional");
  const ref = useRef<HTMLCanvasElement>(null);
  function draw() {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    fillCard(ctx, c.width, c.height, "SERTIFIKAT MEME", [`Diberikan kepada ${name}`, reason, new Date().toLocaleDateString("id-ID")], "SIMULASI");
  }
  useEffect(draw, [name, reason]);
  return (
    <div className="nx-panel">
      <Note>Ini sertifikat meme. Bukan dokumen resmi.</Note>
      <Field label="Nama">
        <input className="nx-input" value={name} onChange={(e) => setName(e.target.value)} />
      </Field>
      <Field label="Alasan">
        <input className="nx-input" value={reason} onChange={(e) => setReason(e.target.value)} />
      </Field>
      <canvas ref={ref} width={720} height={420} style={{ width: "100%", borderRadius: 16 }} />
      <Action onClick={() => ref.current && canvasPng(ref.current, "sertifikat.png")}>Unduh</Action>
    </div>
  );
}

export function EktpTool() {
  const [f, setF] = useState({ nama: "DEMO USER", nik: "0000000000000000", ttl: "Jakarta, 01-01-2000", alamat: "Jl. Simulasi No. 1" });
  const ref = useRef<HTMLCanvasElement>(null);
  function draw() {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#dbeafe";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#1e3a8a";
    ctx.font = "700 18px Poppins,sans-serif";
    ctx.fillText("KARTU TANDA PENDUDUK — DEMO", 24, 36);
    ctx.font = "14px Poppins,sans-serif";
    ctx.fillStyle = "#111827";
    [`NIK: ${f.nik}`, `Nama: ${f.nama}`, `TTL: ${f.ttl}`, `Alamat: ${f.alamat}`].forEach((l, i) => ctx.fillText(l, 24, 80 + i * 28));
    ctx.save();
    ctx.translate(c.width / 2, c.height / 2);
    ctx.rotate(-0.35);
    ctx.fillStyle = "rgba(220,38,38,.4)";
    ctx.font = "800 36px Orbitron,sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("BUKAN DOKUMEN RESMI", 0, 0);
    ctx.restore();
  }
  useEffect(draw, [f]);
  return (
    <div className="nx-panel">
      <Note>Generator kartu demo bertanda air permanen. Tidak untuk pemalsuan identitas.</Note>
      {(["nama", "nik", "ttl", "alamat"] as const).map((k) => (
        <Field key={k} label={k.toUpperCase()}>
          <input className="nx-input" value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} />
        </Field>
      ))}
      <canvas ref={ref} width={720} height={280} style={{ width: "100%", borderRadius: 12 }} />
      <Action onClick={() => ref.current && canvasPng(ref.current, "ektp-demo.png")}>Unduh demo</Action>
    </div>
  );
}

export function FakeLobby() {
  const [game, setGame] = useState<"FF" | "ML">("FF");
  const [name, setName] = useState("FAHMI");
  const [rank, setRank] = useState("Heroic");
  const ref = useRef<HTMLCanvasElement>(null);
  function draw() {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const g = ctx.createLinearGradient(0, 0, c.width, c.height);
    g.addColorStop(0, game === "FF" ? "#7c2d12" : "#1e3a8a");
    g.addColorStop(1, "#020617");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#fde68a";
    ctx.font = "800 32px Orbitron,sans-serif";
    ctx.fillText(`${game} LOBBY`, 28, 56);
    ctx.fillStyle = "#fff";
    ctx.font = "700 22px Poppins,sans-serif";
    ctx.fillText(name, 28, 110);
    ctx.fillStyle = "#67e8f9";
    ctx.fillText(rank, 28, 150);
    ctx.fillStyle = "rgba(255,255,255,.5)";
    ctx.font = "12px Poppins,sans-serif";
    ctx.fillText("FAKE LOBBY · MEME ONLY", 28, 250);
  }
  useEffect(draw, [game, name, rank]);
  return (
    <div className="nx-panel">
      <div className="nx-grid-2">
        <Field label="Game">
          <select className="nx-select" value={game} onChange={(e) => setGame(e.target.value as "FF" | "ML")}>
            <option>FF</option>
            <option>ML</option>
          </select>
        </Field>
        <Field label="Rank">
          <input className="nx-input" value={rank} onChange={(e) => setRank(e.target.value)} />
        </Field>
      </div>
      <Field label="Nickname">
        <input className="nx-input" value={name} onChange={(e) => setName(e.target.value)} />
      </Field>
      <canvas ref={ref} width={720} height={280} style={{ width: "100%", borderRadius: 16 }} />
      <Action onClick={() => ref.current && canvasPng(ref.current, "lobby.png")}>Unduh</Action>
    </div>
  );
}

export function WinQuotes() {
  const [style, setStyle] = useState<"xp" | "11">("11");
  const [msg, setMsg] = useState("Task failed successfully.");
  const ref = useRef<HTMLCanvasElement>(null);
  function draw() {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = style === "xp" ? "#245edc" : "#1a1a1a";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#fff";
    ctx.font = "700 20px Segoe UI,sans-serif";
    ctx.fillText(style === "xp" ? "Windows XP" : "Windows 11", 24, 40);
    ctx.font = "16px Segoe UI,sans-serif";
    wrapText(ctx, msg, 24, 90, 520, 24);
  }
  useEffect(draw, [style, msg]);
  return (
    <div className="nx-panel">
      <Field label="Style">
        <select className="nx-select" value={style} onChange={(e) => setStyle(e.target.value as "xp" | "11")}>
          <option value="11">Windows 11</option>
          <option value="xp">Windows XP</option>
        </select>
      </Field>
      <Field label="Pesan">
        <input className="nx-input" value={msg} onChange={(e) => setMsg(e.target.value)} />
      </Field>
      <canvas ref={ref} width={600} height={220} style={{ width: "100%", borderRadius: 12 }} />
      <Action onClick={() => ref.current && canvasPng(ref.current, "winquote.png")}>Unduh</Action>
    </div>
  );
}

export function NokiaMsg() {
  const [from, setFrom] = useState("FAHMI");
  const [msg, setMsg] = useState("Ketemu di warnet jam 8.");
  const ref = useRef<HTMLCanvasElement>(null);
  function draw() {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#9bbc0f";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#0f380f";
    ctx.font = "700 14px Courier New,monospace";
    ctx.fillText("NOKIA 3310", 20, 28);
    ctx.fillText(`From: ${from}`, 20, 56);
    wrapText(ctx, msg, 20, 90, 240, 18);
  }
  useEffect(draw, [from, msg]);
  return (
    <div className="nx-panel">
      <Field label="Pengirim">
        <input className="nx-input" value={from} onChange={(e) => setFrom(e.target.value)} />
      </Field>
      <Field label="Pesan">
        <textarea className="nx-textarea" value={msg} onChange={(e) => setMsg(e.target.value)} />
      </Field>
      <canvas ref={ref} width={280} height={200} style={{ borderRadius: 8, imageRendering: "pixelated" }} />
      <Action onClick={() => ref.current && canvasPng(ref.current, "nokia.png")}>Unduh</Action>
    </div>
  );
}

export function FakeOvo() {
  const [name, setName] = useState("FAHMI User");
  const [saldo, setSaldo] = useState("1.250.000");
  const ref = useRef<HTMLCanvasElement>(null);
  function draw() {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#4c1d95";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#fff";
    ctx.font = "700 14px Poppins,sans-serif";
    ctx.fillText("OVO · SIMULASI", 24, 36);
    ctx.font = "16px Poppins,sans-serif";
    ctx.fillText(name, 24, 70);
    ctx.font = "800 32px Poppins,sans-serif";
    ctx.fillText(`Rp ${saldo}`, 24, 130);
    ctx.save();
    ctx.translate(c.width / 2, c.height / 2 + 20);
    ctx.rotate(-0.35);
    ctx.fillStyle = "rgba(255,255,255,.35)";
    ctx.font = "800 28px Orbitron,sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("BUKAN TRANSAKSI NYATA", 0, 0);
    ctx.restore();
  }
  useEffect(draw, [name, saldo]);
  return (
    <div className="nx-panel">
      <Note>Simulasi bertanda air. Bukan bukti transfer.</Note>
      <Field label="Nama">
        <input className="nx-input" value={name} onChange={(e) => setName(e.target.value)} />
      </Field>
      <Field label="Saldo">
        <input className="nx-input" value={saldo} onChange={(e) => setSaldo(e.target.value)} />
      </Field>
      <canvas ref={ref} width={420} height={240} style={{ width: "100%", borderRadius: 16 }} />
      <Action onClick={() => ref.current && canvasPng(ref.current, "ovo-demo.png")}>Unduh</Action>
    </div>
  );
}

export function TikTokQuote() {
  const [name, setName] = useState("fahmi");
  const [msg, setMsg] = useState("Liquid Reactor sudah online.");
  const ref = useRef<HTMLCanvasElement>(null);
  function draw() {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#111";
    roundRect(ctx, 40, 180, 300, 70, 18);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "700 14px Poppins,sans-serif";
    ctx.fillText(name, 58, 206);
    ctx.font = "13px Poppins,sans-serif";
    ctx.fillStyle = "#ddd";
    ctx.fillText(msg, 58, 228);
  }
  useEffect(draw, [name, msg]);
  return (
    <div className="nx-panel">
      <Field label="Username">
        <input className="nx-input" value={name} onChange={(e) => setName(e.target.value)} />
      </Field>
      <Field label="Chat">
        <input className="nx-input" value={msg} onChange={(e) => setMsg(e.target.value)} />
      </Field>
      <canvas ref={ref} width={360} height={640} style={{ width: 220, borderRadius: 16 }} />
      <Action onClick={() => ref.current && canvasPng(ref.current, "ttquote.png")}>Unduh</Action>
    </div>
  );
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export function PlaceholderStudio() {
  const [w, setW] = useState(800);
  const [h, setH] = useState(450);
  const [bg, setBg] = useState("#0c4a6e");
  const [fg, setFg] = useState("#dbeafe");
  const [text, setText] = useState("FAHMI");
  const src = `https://placehold.co/${w}x${h}/${bg.replace("#", "")}/${fg.replace("#", "")}/png?text=${encodeURIComponent(text)}`;
  return (
    <div className="nx-panel">
      <div className="nx-grid-2">
        <Field label="Lebar">
          <input className="nx-input" type="number" value={w} onChange={(e) => setW(Number(e.target.value))} />
        </Field>
        <Field label="Tinggi">
          <input className="nx-input" type="number" value={h} onChange={(e) => setH(Number(e.target.value))} />
        </Field>
      </div>
      <div className="nx-grid-2">
        <Field label="BG">
          <input className="nx-input" type="color" value={bg} onChange={(e) => setBg(e.target.value)} />
        </Field>
        <Field label="FG">
          <input className="nx-input" type="color" value={fg} onChange={(e) => setFg(e.target.value)} />
        </Field>
      </div>
      <Field label="Teks">
        <input className="nx-input" value={text} onChange={(e) => setText(e.target.value)} />
      </Field>
      <img src={src} alt="placeholder" style={{ width: "100%", borderRadius: 12 }} />
    </div>
  );
}

export function FotoLink() {
  const [url, setUrl] = useState("");
  return (
    <div className="nx-panel">
      <Note>Gambar diproses di perangkatmu menjadi data URL — tidak diunggah ke server.</Note>
      <input
        className="nx-input"
        type="file"
        accept="image/*"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          const r = new FileReader();
          r.onload = () => setUrl(String(r.result));
          r.readAsDataURL(f);
        }}
      />
      {url ? (
        <>
          <img src={url} alt="" style={{ marginTop: 12, maxWidth: "100%", borderRadius: 12 }} />
          <textarea className="nx-textarea" style={{ marginTop: 12 }} value={url} readOnly />
        </>
      ) : null}
    </div>
  );
}

export function RemoveBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [done, setDone] = useState(false);
  function process(file: File) {
    const img = new Image();
    img.onload = () => {
      const c = canvasRef.current;
      if (!c) return;
      c.width = img.width;
      c.height = img.height;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, c.width, c.height);
      const d = data.data;
      const tr = d[0],
        tg = d[1],
        tb = d[2];
      for (let i = 0; i < d.length; i += 4) {
        const dist = Math.abs(d[i] - tr) + Math.abs(d[i + 1] - tg) + Math.abs(d[i + 2] - tb);
        if (dist < 80) d[i + 3] = 0;
      }
      ctx.putImageData(data, 0, 0);
      setDone(true);
    };
    img.src = URL.createObjectURL(file);
  }
  return (
    <div className="nx-panel">
      <Note>Flood-fill dari sudut kiri atas. Cocok untuk foto studio berlatar rata.</Note>
      <input className="nx-input" type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && process(e.target.files[0])} />
      <canvas ref={canvasRef} style={{ maxWidth: "100%", marginTop: 12 }} />
      {done ? <Action onClick={() => canvasRef.current && canvasPng(canvasRef.current, "cutout.png")}>Unduh PNG</Action> : null}
    </div>
  );
}

export function Enhancer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  function up(file: File) {
    const img = new Image();
    img.onload = () => {
      const c = canvasRef.current;
      if (!c) return;
      c.width = img.width * 2;
      c.height = img.height * 2;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, c.width, c.height);
      setReady(true);
    };
    img.src = URL.createObjectURL(file);
  }
  return (
    <div className="nx-panel">
      <Note>Upscale 2× di browser. Bukan model super-resolution cloud.</Note>
      <input className="nx-input" type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && up(e.target.files[0])} />
      <canvas ref={canvasRef} style={{ maxWidth: "100%", marginTop: 12 }} />
      {ready ? <Action onClick={() => canvasRef.current && canvasPng(canvasRef.current, "hd.png")}>Unduh</Action> : null}
    </div>
  );
}

export function SmartCutout() {
  return <RemoveBg />;
}

export function Vectorizer() {
  const [svg, setSvg] = useState("");
  function trace(file: File) {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      const size = 64;
      c.width = size;
      c.height = size;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, size, size);
      const data = ctx.getImageData(0, 0, size, size).data;
      let paths = "";
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const i = (y * size + x) * 4;
          const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;
          if (lum < 200 && data[i + 3] > 40) {
            const hex = `#${[data[i], data[i + 1], data[i + 2]].map((n) => n.toString(16).padStart(2, "0")).join("")}`;
            paths += `<rect x="${x}" y="${y}" width="1" height="1" fill="${hex}"/>`;
          }
        }
      }
      setSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges">${paths}</svg>`);
    };
    img.src = URL.createObjectURL(file);
  }
  return (
    <div className="nx-panel">
      <Note>Mode poster 64×64 — cocok untuk ikon, bukan foto realistis.</Note>
      <input className="nx-input" type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && trace(e.target.files[0])} />
      {svg ? (
        <>
          <div style={{ marginTop: 12 }} dangerouslySetInnerHTML={{ __html: svg }} />
          <textarea className="nx-textarea" value={svg} readOnly />
        </>
      ) : null}
    </div>
  );
}

export function HtmlVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { busy, run } = useBusy();
  async function record() {
    const c = canvasRef.current;
    if (!c) return;
    await run(async () => {
      const ctx = c.getContext("2d");
      if (!ctx) return;
      const stream = c.captureStream(30);
      const rec = new MediaRecorder(stream, { mimeType: MediaRecorder.isTypeSupported("video/webm;codecs=vp9") ? "video/webm;codecs=vp9" : "video/webm" });
      const chunks: Blob[] = [];
      rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
      const done = new Promise<void>((res) => {
        rec.onstop = () => res();
      });
      rec.start();
      const start = performance.now();
      await new Promise<void>((resolve) => {
        const tick = (now: number) => {
          const t = (now - start) / 1000;
          ctx.fillStyle = "#030712";
          ctx.fillRect(0, 0, c.width, c.height);
          for (let i = 0; i < 18; i++) {
            ctx.beginPath();
            ctx.arc(320 + Math.cos(t + i) * (80 + i * 8), 180 + Math.sin(t * 1.3 + i) * (50 + i * 4), 8, 0, 7);
            ctx.fillStyle = i % 2 ? "#3b82f6" : "#67e8f9";
            ctx.fill();
          }
          ctx.fillStyle = "#fff";
          ctx.font = "700 28px Orbitron,sans-serif";
          ctx.fillText("FAHMI", 240, 190);
          if (t < 8) requestAnimationFrame(tick);
          else resolve();
        };
        requestAnimationFrame(tick);
      });
      rec.stop();
      await done;
      const blob = new Blob(chunks, { type: "video/webm" });
      downloadUrl(URL.createObjectURL(blob), "fahmi-8s.webm");
    });
  }
  return (
    <div className="nx-panel">
      <Note>Rekam animasi Liquid Reactor 8 detik ke WebM (MP4 tergantung browser).</Note>
      <canvas ref={canvasRef} width={640} height={360} style={{ width: "100%", borderRadius: 16, background: "#030712" }} />
      <Action busy={busy} onClick={() => void record()}>
        Rekam 8 detik
      </Action>
    </div>
  );
}

export function WebEncrypt() {
  const [src, setSrc] = useState("<h1>Hello FAHMI</h1>");
  const packed = useMemo(() => {
    const b64 = btoa(unescape(encodeURIComponent(src)));
    return `<!doctype html><script>document.write(decodeURIComponent(escape(atob("${b64}"))))<\/script>`;
  }, [src]);
  return (
    <div className="nx-panel">
      <Note>Obfuscasi HTML sisi klien. Bukan enkripsi kriptografis.</Note>
      <textarea className="nx-textarea" value={src} onChange={(e) => setSrc(e.target.value)} />
      <textarea className="nx-textarea" value={packed} readOnly />
    </div>
  );
}

export function SvgAlight() {
  const [svg, setSvg] = useState(`<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#3b82f6"/></svg>`);
  const xml = `<?xml version="1.0"?>
<alight name="FahmiSVG">
  <scene duration="5">
    <shape type="svg"><![CDATA[${svg}]]></shape>
  </scene>
</alight>`;
  return (
    <div className="nx-panel">
      <Field label="SVG">
        <textarea className="nx-textarea" value={svg} onChange={(e) => setSvg(e.target.value)} />
      </Field>
      <textarea className="nx-textarea" value={xml} readOnly />
    </div>
  );
}

function xmlPreset(name: string, body: string) {
  return `<?xml version="1.0"?>
<alight preset="${name}" duration="8.33">
${body}
</alight>`;
}

export function AlightPack({ kind }: { kind: string }) {
  const [text, setText] = useState("FAHMI");
  const map: Record<string, string> = {
    text2d: xmlPreset("text2d", `  <text value="${text}" fx="slide-up" font="Orbitron"/>`),
    text3d: xmlPreset("text3d", `  <text3d value="${text}" extrude="12" shadow="long"/>`),
    textfxanimation: xmlPreset("textfx", `  <fx name="glitch" text="${text}"/>`),
    textvector: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 120"><text x="20" y="80" font-size="64" fill="#60a5fa">${text}</text></svg>`,
    trimpath: xmlPreset("trimpath", `  <trimpath text="${text}" start="0" end="1" duration="2.4"/>`),
    logoanimate: xmlPreset("logo", `  <logo text="${text}" duration="8.33" ease="expo"/>`),
    alightpremium: xmlPreset("pack", `  <preset id="open-title" text="${text}"/>\n  <preset id="lower-third" text="${text}"/>`),
  };
  const out = map[kind] ?? map.text2d;
  return (
    <div className="nx-panel">
      <Field label="Teks">
        <input className="nx-input" value={text} onChange={(e) => setText(e.target.value)} />
      </Field>
      <textarea className="nx-textarea" value={out} readOnly />
    </div>
  );
}

export function MlTools() {
  const [win, setWin] = useState(120);
  const [lose, setLose] = useState(80);
  const [target, setTarget] = useState(70);
  const total = win + lose || 1;
  const wr = (win / total) * 100;
  const need = Math.max(0, Math.ceil((target / 100) * total - win) / (1 - target / 100));
  return (
    <div className="nx-panel">
      <div className="nx-grid-2">
        <Field label="Menang">
          <input className="nx-input" type="number" value={win} onChange={(e) => setWin(Number(e.target.value))} />
        </Field>
        <Field label="Kalah">
          <input className="nx-input" type="number" value={lose} onChange={(e) => setLose(Number(e.target.value))} />
        </Field>
      </div>
      <Field label={`Target WR ${target}%`}>
        <input className="nx-input" type="range" min={50} max={90} value={target} onChange={(e) => setTarget(Number(e.target.value))} />
      </Field>
      <div className="nx-result">
        WR sekarang: {wr.toFixed(2)}%
        <br />
        Butuh ~{Math.ceil(need)} kemenangan beruntun untuk {target}%.
      </div>
    </div>
  );
}

export function AutoPdf() {
  const [text, setText] = useState("Judul\n\nTulis naskah di sini. Auto PDF memotong per halaman A5.");
  const pages = useMemo(() => {
    const lines = text.split("\n");
    const out: string[][] = [[]];
    for (const l of lines) {
      if (out[out.length - 1].length >= 28) out.push([]);
      out[out.length - 1].push(l);
    }
    return out;
  }, [text]);
  return (
    <div className="nx-panel">
      <textarea className="nx-textarea" value={text} onChange={(e) => setText(e.target.value)} />
      <Note>{pages.length} halaman A5. Cetak lewat dialog browser (Save as PDF).</Note>
      <Action onClick={() => window.print()}>Cetak / Save PDF</Action>
      <div>
        {pages.map((p, i) => (
          <article key={i} className="nx-result" style={{ minHeight: 240, background: "#eef6ff", color: "#0c4a6e" }}>
            <small>A5 · {i + 1}</small>
            <pre style={{ whiteSpace: "pre-wrap", fontFamily: "Georgia,serif" }}>{p.join("\n")}</pre>
          </article>
        ))}
      </div>
    </div>
  );
}

export function PdfLab() {
  const [pages, setPages] = useState(["Halaman 1", "Halaman 2", "Halaman 3"]);
  return (
    <div className="nx-panel">
      <Note>Atur urutan halaman lalu cetak. Merge file PDF biner butuh library native — lab ini mengorganisir konten.</Note>
      {pages.map((p, i) => (
        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input className="nx-input" value={p} onChange={(e) => setPages(pages.map((x, j) => (j === i ? e.target.value : x)))} />
          <Action ghost onClick={() => setPages(pages.filter((_, j) => j !== i))}>
            Hapus
          </Action>
        </div>
      ))}
      <Action onClick={() => setPages([...pages, `Halaman ${pages.length + 1}`])}>Tambah</Action>
    </div>
  );
}

export function Classics() {
  const books = [
    { t: "The Analects", a: "Confucius", s: "Pembelajaran, kebajikan, dan tata krama sebagai fondasi masyarakat." },
    { t: "The Tale of Genji", a: "Murasaki Shikibu", s: "Kisah istana Heian — roman, status, dan kehalusan rasa." },
    { t: "The Tale of Hong Gildong", a: "Anon. Korea", s: "Pahlawan lahir di luar pernikahan resmi, menuntut keadilan." },
  ];
  const [i, setI] = useState(0);
  return (
    <div className="nx-panel">
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        {books.map((b, idx) => (
          <button key={b.t} className={`nx-btn${i === idx ? "" : " ghost"}`} type="button" onClick={() => setI(idx)}>
            {b.t}
          </button>
        ))}
      </div>
      <h3 style={{ fontFamily: "Orbitron,sans-serif" }}>{books[i].t}</h3>
      <p style={{ color: "#9fb6cc" }}>{books[i].a}</p>
      <p style={{ marginTop: 10, lineHeight: 1.6 }}>{books[i].s}</p>
    </div>
  );
}

export function UnbanWa() {
  return (
    <div className="nx-panel">
      <Note>FAHMI tidak bisa unban akun WhatsApp. Ikuti kanal resmi Meta saja.</Note>
      <ol style={{ paddingLeft: 18, lineHeight: 1.7, fontSize: 14, color: "#c5d4e4" }}>
        <li>Buka WhatsApp → Bantuan → Hubungi kami.</li>
        <li>Jika diblokir, gunakan formulir banding resmi WhatsApp.</li>
        <li>Jelaskan pelanggaran yang diduga, tanpa membeli jasa pihak ketiga.</li>
        <li>Tunggu review Meta. Tidak ada “magic link” yang sah.</li>
      </ol>
      <a className="nx-btn" href="https://www.whatsapp.com/contact" target="_blank" rel="noreferrer">
        Buka pusat bantuan WhatsApp
      </a>
    </div>
  );
}

export function DeployCheck() {
  const items = ["Domain & HTTPS", "OG image 1200×630", "Favicon SVG", "PWA manifest", "Lighthouse > 90", "Error boundary", "Mobile 390px"];
  const [done, setDone] = useState<Record<string, boolean>>({});
  return (
    <div className="nx-panel">
      {items.map((it) => (
        <label key={it} style={{ display: "flex", gap: 10, padding: "8px 0", alignItems: "center" }}>
          <input type="checkbox" checked={!!done[it]} onChange={(e) => setDone({ ...done, [it]: e.target.checked })} />
          {it}
        </label>
      ))}
    </div>
  );
}

export function TiktokHdPrep() {
  return (
    <div className="nx-panel">
      <Note>Siapkan video vertikal 1080×1920, 30fps, di bawah 3 menit sebelum unggah ke TikTok.</Note>
      <ul style={{ lineHeight: 1.7, paddingLeft: 18 }}>
        <li>Rasio 9:16</li>
        <li>Audio 48kHz stereo</li>
        <li>H.264 + AAC</li>
        <li>Teks aman di zona tengah (hindari notch)</li>
      </ul>
    </div>
  );
}

export function HtmlVideoNote() {
  return <HtmlVideo />;
}

void FaIcon;
void downloadUrl;
