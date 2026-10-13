import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BackgroundGlow } from "@/components/app-chrome";
import { FaIcon } from "@/components/fa-icon";
import { Action, Field } from "@/tools/kit";

export const Route = createFileRoute("/feedback")({ component: FeedbackPage });

function FeedbackPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ type: "bug", title: "", body: "" });
  return (
    <div>
      <BackgroundGlow />
      <div className="nx-room">
        <header className="nx-room-head">
          <Link to="/" className="nx-back">
            <FaIcon name="fa-arrow-left" /> Kembali
          </Link>
          <div className="nx-room-title">
            <b>REPORT BUG, SARAN & IDE</b>
            <span>All Tools FAHMI · Dev Feedback Center</span>
          </div>
        </header>
        <div className="nx-panel">
          {sent ? (
            <p className="nx-ok">Tersimpan di perangkat ini. Terima kasih — masukanmu masuk antrian lokal FAHMI.</p>
          ) : (
            <>
              <Field label="Jenis">
                <select className="nx-select" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  <option value="bug">Bug</option>
                  <option value="saran">Saran</option>
                  <option value="ide">Ide fitur</option>
                </select>
              </Field>
              <Field label="Judul">
                <input className="nx-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </Field>
              <Field label="Detail">
                <textarea className="nx-textarea" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
              </Field>
              <Action
                onClick={() => {
                  const prev = JSON.parse(localStorage.getItem("fahmi.feedback") || "[]") as unknown[];
                  localStorage.setItem("fahmi.feedback", JSON.stringify([{ ...form, at: Date.now() }, ...prev]));
                  setSent(true);
                }}
              >
                Kirim
              </Action>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
