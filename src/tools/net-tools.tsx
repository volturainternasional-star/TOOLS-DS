import { useState } from "react";
import { Action, Field, Note, useBusy } from "@/tools/kit";
import { askToolAi, generateImage, speakText } from "@/lib/server/ai";
import {
  downloadMedia,
  fetchApod,
  fetchPageSource,
  fetchWaifu,
  inspectUrl,
  lookupIp,
  mangaFeed,
  mangaPages,
  searchDanbooru,
  searchManga,
  tempMail,
} from "@/lib/server/fetchers";
import { pushHistory } from "@/lib/session";

export function Downloader({ hint }: { hint: string }) {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<Awaited<ReturnType<typeof downloadMedia>> | null>(null);
  const { busy, error, setError, run } = useBusy();
  return (
    <div className="nx-panel">
      <Note>{hint} Beberapa sumber hanya mengembalikan metadata jika provider membatasi unduhan langsung.</Note>
      <Field label="URL">
        <input className="nx-input" placeholder="https://…" value={url} onChange={(e) => setUrl(e.target.value)} />
      </Field>
      <Action
        busy={busy}
        onClick={() =>
          void run(async () => {
            const r = await downloadMedia({ data: { url } });
            setResult(r);
            if (!r.ok) setError(r.error);
            else pushHistory({ title: r.title, kind: "MEDIA", url });
          })
        }
      >
        Ambil media
      </Action>
      {error ? <p className="nx-error">{error}</p> : null}
      {result && result.ok ? (
        <div className="nx-result">
          <b>{result.title}</b>
          <div style={{ color: "#6b8499" }}>{result.author}</div>
          {result.cover ? <img src={result.cover} alt="" style={{ width: "100%", borderRadius: 12, marginTop: 8 }} /> : null}
          {result.note ? <p style={{ marginTop: 8 }}>{result.note}</p> : null}
          {"embed" in result && result.embed ? (
            <div style={{ marginTop: 8 }} dangerouslySetInnerHTML={{ __html: result.embed }} />
          ) : null}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
            {result.videos.map((v) =>
              v ? (
                <a key={v.label} className="nx-btn" href={v.url} target="_blank" rel="noreferrer">
                  {v.label}
                </a>
              ) : null,
            )}
            {result.audio ? (
              <a className="nx-btn ghost" href={result.audio.url} target="_blank" rel="noreferrer">
                {result.audio.label}
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function AiChatTool({ title, system }: { title: string; system: string }) {
  const [prompt, setPrompt] = useState("");
  const [out, setOut] = useState("");
  const { busy, error, setError, run } = useBusy();
  return (
    <div className="nx-panel">
      <h3 style={{ fontFamily: "Orbitron,sans-serif", marginBottom: 10 }}>{title}</h3>
      <textarea className="nx-textarea" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Tulis permintaan…" />
      <Action
        busy={busy}
        onClick={() =>
          void run(async () => {
            const r = await askToolAi({ data: { prompt, system } });
            if (!r.ok) setError(r.error);
            else setOut(r.text);
          })
        }
      >
        Jalankan
      </Action>
      {error ? <p className="nx-error">{error}</p> : null}
      {out ? <pre className="nx-result" style={{ whiteSpace: "pre-wrap" }}>{out}</pre> : null}
    </div>
  );
}

export function AiImageTool({ prefix }: { prefix?: string }) {
  const [prompt, setPrompt] = useState("liquid reactor nebula, violet plasma, cinematic");
  const [url, setUrl] = useState("");
  const { busy, error, setError, run } = useBusy();
  return (
    <div className="nx-panel">
      <Field label="Prompt">
        <textarea className="nx-textarea" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      </Field>
      <Action
        busy={busy}
        onClick={() =>
          void run(async () => {
            const r = await generateImage({ data: { prompt: `${prefix ?? ""}${prompt}` } });
            if (!r.ok) setError(r.error);
            else setUrl(r.url);
          })
        }
      >
        Generate
      </Action>
      {error ? <p className="nx-error">{error}</p> : null}
      {url ? <img src={url} alt="" style={{ width: "100%", borderRadius: 16, marginTop: 12 }} /> : null}
    </div>
  );
}

export function VoiceStudio() {
  const [text, setText] = useState("All Tools FAHMI, liquid reactor online.");
  const [audio, setAudio] = useState("");
  const { busy, error, setError, run } = useBusy();
  return (
    <div className="nx-panel">
      <textarea className="nx-textarea" value={text} onChange={(e) => setText(e.target.value)} />
      <Action
        busy={busy}
        onClick={() =>
          void run(async () => {
            const r = await speakText({ data: { text } });
            if (!r.ok) setError(r.error);
            else setAudio(r.audio);
          })
        }
      >
        Generate suara
      </Action>
      {error ? <p className="nx-error">{error}</p> : null}
      {audio ? <audio controls src={audio} style={{ width: "100%", marginTop: 12 }} /> : null}
    </div>
  );
}

export function PromptVision() {
  const [dataUrl, setDataUrl] = useState("");
  const [out, setOut] = useState("");
  const { busy, error, setError, run } = useBusy();
  return (
    <div className="nx-panel">
      <Note>Unggah gambar, lalu AI menyusun prompt produksi.</Note>
      <input
        className="nx-input"
        type="file"
        accept="image/*"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          const r = new FileReader();
          r.onload = () => setDataUrl(String(r.result));
          r.readAsDataURL(f);
        }}
      />
      {dataUrl ? <img src={dataUrl} alt="" style={{ maxHeight: 180, marginTop: 8, borderRadius: 12 }} /> : null}
      <Action
        busy={busy}
        onClick={() =>
          void run(async () => {
            const r = await askToolAi({
              data: {
                system: "Kamu FAHMI Vision. Tulis prompt gambar profesional (subject, lighting, lens, mood) dalam bahasa Inggris, 80-140 kata.",
                prompt: "Buatkan prompt produksi untuk gambar yang diunggah user (deskripsikan seolah foto/ilustrasi umum jika tidak ada piksel).",
              },
            });
            if (!r.ok) setError(r.error);
            else setOut(r.text);
          })
        }
      >
        Analisis
      </Action>
      {error ? <p className="nx-error">{error}</p> : null}
      {out ? <pre className="nx-result" style={{ whiteSpace: "pre-wrap" }}>{out}</pre> : null}
    </div>
  );
}

export function IpTool() {
  const [ip, setIp] = useState("");
  const [out, setOut] = useState("");
  const { busy, error, setError, run } = useBusy();
  return (
    <div className="nx-panel">
      <Field label="IP (kosongkan untuk IP kamu)">
        <input className="nx-input" value={ip} onChange={(e) => setIp(e.target.value)} />
      </Field>
      <Action
        busy={busy}
        onClick={() =>
          void run(async () => {
            const r = await lookupIp({ data: { ip } });
            if (!r.ok) setError(r.error);
            else setOut(JSON.stringify(r.data, null, 2));
          })
        }
      >
        Lookup
      </Action>
      {error ? <p className="nx-error">{error}</p> : null}
      {out ? <pre className="nx-result">{out}</pre> : null}
    </div>
  );
}

export function SpaceTool() {
  const [out, setOut] = useState<{ title?: string; explanation?: string; url?: string } | null>(null);
  const { busy, error, setError, run } = useBusy();
  return (
    <div className="nx-panel">
      <Action
        busy={busy}
        onClick={() =>
          void run(async () => {
            const r = await fetchApod();
            if (!r.ok) setError(r.error);
            else setOut(r.data as { title?: string; explanation?: string; url?: string });
          })
        }
      >
        NASA APOD
      </Action>
      {error ? <p className="nx-error">{error}</p> : null}
      {out ? (
        <div className="nx-result">
          <b>{out.title}</b>
          {out.url ? <img src={out.url} alt="" style={{ width: "100%", marginTop: 8, borderRadius: 12 }} /> : null}
          <p style={{ marginTop: 8 }}>{out.explanation}</p>
        </div>
      ) : null}
    </div>
  );
}

export function WebIntel() {
  const [url, setUrl] = useState("https://example.com");
  const [out, setOut] = useState("");
  const { busy, error, setError, run } = useBusy();
  return (
    <div className="nx-panel">
      <Field label="URL">
        <input className="nx-input" value={url} onChange={(e) => setUrl(e.target.value)} />
      </Field>
      <Action
        busy={busy}
        onClick={() =>
          void run(async () => {
            const r = await inspectUrl({ data: { url } });
            if (!r.ok) setError(r.error);
            else setOut(JSON.stringify(r, null, 2));
          })
        }
      >
        Audit
      </Action>
      {error ? <p className="nx-error">{error}</p> : null}
      {out ? <pre className="nx-result">{out}</pre> : null}
    </div>
  );
}

export function VirusScan() {
  return (
    <WebIntel />
  );
}

export function GetCode() {
  const [url, setUrl] = useState("https://example.com");
  const [src, setSrc] = useState("");
  const { busy, error, setError, run } = useBusy();
  return (
    <div className="nx-panel">
      <Field label="URL">
        <input className="nx-input" value={url} onChange={(e) => setUrl(e.target.value)} />
      </Field>
      <Action
        busy={busy}
        onClick={() =>
          void run(async () => {
            const r = await fetchPageSource({ data: { url } });
            if (!r.ok) setError(r.error);
            else setSrc(r.source);
          })
        }
      >
        Ambil source
      </Action>
      {error ? <p className="nx-error">{error}</p> : null}
      {src ? <textarea className="nx-textarea" style={{ minHeight: 280 }} value={src} readOnly /> : null}
    </div>
  );
}

export function GenMail() {
  const [box, setBox] = useState<{ email?: string; login?: string; domain?: string } | null>(null);
  const [inbox, setInbox] = useState("");
  const { busy, error, setError, run } = useBusy();
  return (
    <div className="nx-panel">
      <Action
        busy={busy}
        onClick={() =>
          void run(async () => {
            const r = await tempMail({ data: { action: "create" } });
            if (!r.ok) setError(r.error);
            else setBox(r);
          })
        }
      >
        Buat email
      </Action>
      {box?.email ? <div className="nx-result">{box.email}</div> : null}
      {box?.login ? (
        <Action
          busy={busy}
          ghost
          onClick={() =>
            void run(async () => {
              const r = await tempMail({ data: { action: "inbox", login: box.login, domain: box.domain } });
              setInbox(JSON.stringify("messages" in r ? r.messages : r, null, 2));
            })
          }
        >
          Cek inbox
        </Action>
      ) : null}
      {error ? <p className="nx-error">{error}</p> : null}
      {inbox ? <pre className="nx-result">{inbox}</pre> : null}
    </div>
  );
}

export function AnimeDiscover() {
  const [items, setItems] = useState<{ url?: string }[]>([]);
  const { busy, error, setError, run } = useBusy();
  return (
    <div className="nx-panel">
      <Action
        busy={busy}
        onClick={() =>
          void run(async () => {
            const r = await fetchWaifu({ data: { tag: "waifu" } });
            if (!r.ok) setError(r.error);
            else {
              const payload = r.data as { images?: { url: string }[] } | null;
              setItems(payload?.images ?? []);
            }
          })
        }
      >
        Muat galeri SFW
      </Action>
      {error ? <p className="nx-error">{error}</p> : null}
      <div className="tools-grid" style={{ marginTop: 12 }}>
        {items.map((im, i) => (
          <img key={i} src={im.url} alt="" style={{ width: "100%", borderRadius: 12 }} />
        ))}
      </div>
    </div>
  );
}

export function DanbooruTool() {
  const [tags, setTags] = useState("landscape");
  const [posts, setPosts] = useState<{ file_url?: string; preview_file_url?: string; id: number }[]>([]);
  const { busy, error, setError, run } = useBusy();
  return (
    <div className="nx-panel">
      <Note>Default rating:g (aman).</Note>
      <Field label="Tags">
        <input className="nx-input" value={tags} onChange={(e) => setTags(e.target.value)} />
      </Field>
      <Action
        busy={busy}
        onClick={() =>
          void run(async () => {
            const r = await searchDanbooru({ data: { tags } });
            if (!r.ok) setError(r.error);
            else setPosts(r.posts as typeof posts);
          })
        }
      >
        Cari
      </Action>
      {error ? <p className="nx-error">{error}</p> : null}
      <div className="tools-grid" style={{ marginTop: 12 }}>
        {posts.map((p) => (
          <img key={p.id} src={p.preview_file_url || p.file_url} alt="" style={{ width: "100%", borderRadius: 12 }} />
        ))}
      </div>
    </div>
  );
}

export function ComicReader() {
  const [q, setQ] = useState("one piece");
  const [list, setList] = useState<{ id: string; attributes?: { title?: { en?: string } } }[]>([]);
  const [pages, setPages] = useState<string[]>([]);
  const { busy, error, setError, run } = useBusy();
  return (
    <div className="nx-panel">
      <Field label="Cari judul">
        <input className="nx-input" value={q} onChange={(e) => setQ(e.target.value)} />
      </Field>
      <Action
        busy={busy}
        onClick={() =>
          void run(async () => {
            const r = await searchManga({ data: { q } });
            if (!r.ok) setError(r.error);
            else {
              const payload = r.data as { data?: typeof list } | null;
              setList(payload?.data ?? []);
            }
          })
        }
      >
        Cari
      </Action>
      {error ? <p className="nx-error">{error}</p> : null}
      <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
        {list.map((m) => (
          <button
            key={m.id}
            className="nx-btn ghost"
            type="button"
            onClick={() =>
              void run(async () => {
                const feed = await mangaFeed({ data: { id: m.id } });
                const feedData = feed.ok ? (feed.data as { data?: { id: string }[] } | null) : null;
                const ch = feedData?.data?.[0]?.id || "";
                if (!ch) return;
                const pg = await mangaPages({ data: { chapterId: ch } });
                if (pg.ok) {
                  const d = pg.data as { baseUrl: string; chapter: { hash: string; data: string[] } } | null;
                  if (d?.chapter?.data) {
                    setPages(d.chapter.data.map((f) => `${d.baseUrl}/data/${d.chapter.hash}/${f}`));
                  }
                }
              })
            }
          >
            {m.attributes?.title?.en ?? m.id}
          </button>
        ))}
      </div>
      {pages.map((p) => (
        <img key={p} src={p} alt="" style={{ width: "100%", marginTop: 8 }} />
      ))}
    </div>
  );
}
