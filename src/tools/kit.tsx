import { type ReactNode, useState } from "react";
import { FaIcon } from "@/components/fa-icon";

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label style={{ display: "block", marginBottom: 12 }}>
      <span className="nx-label">{label}</span>
      {children}
    </label>
  );
}

export function useBusy() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function run<T>(fn: () => Promise<T>) {
    setBusy(true);
    setError("");
    try {
      return await fn();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan");
      return null;
    } finally {
      setBusy(false);
    }
  }
  return { busy, error, setError, run };
}

export function Action({
  children,
  onClick,
  busy,
  ghost,
}: {
  children: ReactNode;
  onClick?: () => void;
  busy?: boolean;
  ghost?: boolean;
}) {
  return (
    <button className={`nx-btn${ghost ? " ghost" : ""}`} type="button" disabled={busy} onClick={onClick}>
      {busy ? <FaIcon name="fa-spinner fa-spin" /> : null}
      {children}
    </button>
  );
}

export function downloadUrl(url: string, name: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.rel = "noopener";
  a.target = "_blank";
  a.click();
}

export function canvasPng(canvas: HTMLCanvasElement, name: string) {
  canvas.toBlob((blob) => {
    if (!blob) return;
    downloadUrl(URL.createObjectURL(blob), name);
  }, "image/png");
}

export function fillCard(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  title: string,
  lines: string[],
  watermark: string,
) {
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, "#1e1135");
  g.addColorStop(1, "#0b0814");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "rgba(56,189,248,.45)";
  ctx.lineWidth = 4;
  ctx.strokeRect(18, 18, w - 36, h - 36);
  ctx.fillStyle = "#dbeafe";
  ctx.font = "700 28px Poppins,sans-serif";
  ctx.fillText(title, 40, 70);
  ctx.fillStyle = "#c4b5fd";
  ctx.font = "16px Poppins,sans-serif";
  lines.forEach((l, i) => ctx.fillText(l, 40, 120 + i * 28));
  ctx.save();
  ctx.translate(w / 2, h / 2);
  ctx.rotate(-0.4);
  ctx.fillStyle = "rgba(255,80,80,.28)";
  ctx.font = "800 42px Orbitron,sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(watermark, 0, 0);
  ctx.restore();
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <p style={{ color: "#6b8499", fontSize: 12, lineHeight: 1.5, margin: "8px 0 14px" }}>{children}</p>
  );
}
