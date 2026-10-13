import { createServerFn } from "@tanstack/react-start";

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const ALLOW = [
  "tikwm.com",
  "www.tikwm.com",
  "api.coingecko.com",
  "api.nasa.gov",
  "data.bmkg.go.id",
  "api.bmkg.go.id",
  "api.audius.co",
  "archive.org",
  "lrclib.net",
  "ipwho.is",
  "ipapi.co",
  "api.country.is",
  "api.mangadex.org",
  "uploads.mangadex.org",
  "api.waifu.im",
  "danbooru.donmai.us",
  "www.tiktok.com",
  "vm.tiktok.com",
  "vt.tiktok.com",
  "www.instagram.com",
  "www.youtube.com",
  "youtu.be",
  "open.spotify.com",
  "www.googleapis.com",
  "openlibrary.org",
  "gutendex.com",
  "api.1secmail.com",
  "www.1secmail.com",
  "nekos.best",
  "api.qrserver.com",
  "api.allorigins.win",
  "r.jina.ai",
];

function hostOk(url: string) {
  try {
    const u = new URL(url);
    if (u.protocol !== "http:" && u.protocol !== "https:") return false;
    return ALLOW.some((h) => u.hostname === h || u.hostname.endsWith(`.${h}`));
  } catch {
    return false;
  }
}

async function getJson(url: string, timeout = 12000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeout);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { accept: "application/json,text/plain,*/*", "user-agent": "Mozilla/5.0 (compatible; FahmiTools/1.2)" },
    });
    const text = await res.text();
    try {
      return { ok: res.ok, status: res.status, json: JSON.parse(text) as Json, text };
    } catch {
      return { ok: res.ok, status: res.status, json: null, text };
    }
  } finally {
    clearTimeout(t);
  }
}

export const lookupIp = createServerFn({ method: "POST" })
  .validator((input: { ip?: string }) => input)
  .handler(async ({ data }) => {
    const q = (data.ip || "").trim();
    const url = q ? `https://ipwho.is/${encodeURIComponent(q)}` : "https://ipwho.is/";
    const r = await getJson(url);
    if (!r.json) return { ok: false as const, error: "Lookup gagal" };
    return { ok: true as const, data: r.json };
  });

export const fetchApod = createServerFn({ method: "GET" }).handler(async () => {
  const r = await getJson("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY");
  if (!r.ok || !r.json) return { ok: false as const, error: "NASA APOD gagal (kuota DEMO_KEY mungkin habis)." };
  return { ok: true as const, data: r.json };
});

export const fetchBmkg = createServerFn({ method: "GET" }).handler(async () => {
  const [auto, felt, m5] = await Promise.all([
    getJson("https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json"),
    getJson("https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json"),
    getJson("https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json"),
  ]);
  const pick = (j: Json | null) => {
    const g = (j as { Infogempa?: { gempa?: unknown } } | null)?.Infogempa?.gempa;
    return g ?? null;
  };
  return {
    ok: true as const,
    auto: pick(auto.json),
    felt: pick(felt.json),
    m5: pick(m5.json),
    gempa: pick(auto.json),
    raw: auto.text.slice(0, 4000),
    source: "BMKG",
  };
});

export type BmkgSlot = {
  local_datetime: string;
  weather_desc: string;
  t: number;
  hu: number;
  ws: number;
  wd: string;
  image: string;
};

export const fetchBmkgWeather = createServerFn({ method: "POST" })
  .validator((input: { adm4: string }) => input)
  .handler(async ({ data }) => {
    const adm4 = data.adm4.trim();
    if (!/^\d{2}\.\d{2}\.\d{2}\.\d{4}$/.test(adm4)) return { ok: false as const, error: "Kode wilayah adm4 tidak valid." };
    const r = await getJson(`https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${encodeURIComponent(adm4)}`, 15000);
    if (!r.json) return { ok: false as const, error: "Prakiraan cuaca BMKG tidak merespons." };
    const body = r.json as {
      lokasi?: { desa?: string; kecamatan?: string; kotkab?: string; provinsi?: string; timezone?: string };
      data?: { cuaca?: BmkgSlot[][] }[];
    };
    const days = body.data?.[0]?.cuaca ?? [];
    return {
      ok: true as const,
      lokasi: body.lokasi ?? {},
      days,
      source: "BMKG",
    };
  });

export type FreeTrack = {
  id: string;
  source: "audius" | "archive";
  title: string;
  artist: string;
  duration: number;
  artwork: string;
  streamUrl: string;
  downloadUrl: string;
  extraUrl?: string;
  license: string;
};

export const searchFreeMusic = createServerFn({ method: "POST" })
  .validator((input: { q: string; source?: "audius" | "archive" | "both" }) => input)
  .handler(async ({ data }) => {
    const q = data.q.trim();
    if (q.length < 2) return { ok: false as const, error: "Ketik judul, artis, atau mood (min. 2 huruf)." };
    const source = data.source || "both";
    const tracks: FreeTrack[] = [];

    if (source === "audius" || source === "both") {
      const r = await getJson(
        `https://api.audius.co/v1/tracks/search?query=${encodeURIComponent(q)}&app_name=fahmitools`,
        14000,
      );
      const list = ((r.json as { data?: Record<string, unknown>[] } | null)?.data ?? []).slice(0, 10);
      for (const t of list) {
        const id = String(t.id || "");
        if (!id) continue;
        const user = (t.user && typeof t.user === "object" ? t.user : {}) as { name?: string };
        const art = (t.artwork && typeof t.artwork === "object" ? t.artwork : {}) as Record<string, string>;
        const stream = `https://api.audius.co/v1/tracks/${encodeURIComponent(id)}/stream?app_name=fahmitools`;
        tracks.push({
          id: `audius:${id}`,
          source: "audius",
          title: String(t.title || "Untitled"),
          artist: String(user.name || "Audius"),
          duration: Number(t.duration) || 0,
          artwork: art["480x480"] || art["150x150"] || "",
          streamUrl: stream,
          downloadUrl: stream,
          extraUrl: t.permalink ? `https://audius.co${String(t.permalink)}` : "",
          license: t.is_downloadable ? "Gratis unduh (Audius)" : "Gratis diputar · stream Audius",
        });
      }
    }

    if (source === "archive" || source === "both") {
      const r = await getJson(
        `https://archive.org/advancedsearch.php?q=${encodeURIComponent(`mediatype:audio AND (${q})`)}&fl[]=identifier&fl[]=title&fl[]=creator&output=json&rows=8`,
        14000,
      );
      const docs = ((r.json as { response?: { docs?: Record<string, unknown>[] } } | null)?.response?.docs ?? []).slice(0, 8);
      for (const d of docs) {
        const identifier = String(d.identifier || "");
        if (!identifier) continue;
        const meta = await getJson(`https://archive.org/metadata/${encodeURIComponent(identifier)}`, 12000);
        const files = ((meta.json as { files?: { name?: string; format?: string; size?: string }[] } | null)?.files ?? []).filter((f) => {
          const fmt = String(f.format || "").toLowerCase();
          return fmt.includes("mp3") || fmt.includes("ogg") || fmt === "flac";
        });
        const prefer = files.find((f) => /vbr mp3|128kbps|mp3/i.test(String(f.format))) || files[0];
        if (!prefer?.name) continue;
        const fileUrl = `https://archive.org/download/${encodeURIComponent(identifier)}/${encodeURIComponent(prefer.name)}`;
        tracks.push({
          id: `archive:${identifier}`,
          source: "archive",
          title: String(d.title || identifier),
          artist: String(d.creator || "Internet Archive"),
          duration: 0,
          artwork: `https://archive.org/services/img/${encodeURIComponent(identifier)}`,
          streamUrl: fileUrl,
          downloadUrl: fileUrl,
          extraUrl: `https://archive.org/details/${encodeURIComponent(identifier)}`,
          license: "Internet Archive · cek lisensi item (banyak CC/public domain)",
        });
      }
    }

    if (!tracks.length) return { ok: false as const, error: "Tidak ketemu. Coba kata lain — lofi, jazz, piano, rain." };
    return { ok: true as const, tracks };
  });

export const fetchLyrics = createServerFn({ method: "POST" })
  .validator((input: { q: string; artist?: string; title?: string }) => input)
  .handler(async ({ data }) => {
    const q = (data.q || `${data.artist ?? ""} ${data.title ?? ""}`).trim();
    if (q.length < 2) return { ok: false as const, error: "Judul lagu kosong." };
    const r = await getJson(`https://lrclib.net/api/search?q=${encodeURIComponent(q)}`, 12000);
    const hits = (Array.isArray(r.json) ? r.json : []) as {
      trackName?: string;
      artistName?: string;
      albumName?: string;
      plainLyrics?: string | null;
      syncedLyrics?: string | null;
      instrumental?: boolean;
    }[];
    const hit = hits.find((h) => (h.plainLyrics && h.plainLyrics.length > 20) || h.instrumental) ?? hits[0];
    if (!hit) return { ok: false as const, error: "Lirik tidak ditemukan untuk judul ini." };
    const lyrics = hit.plainLyrics || (hit.instrumental ? "(Instrumental — tidak ada lirik.)" : "");
    if (!lyrics) return { ok: false as const, error: "Lirik kosong di sumber." };
    return {
      ok: true as const,
      title: String(hit.trackName || data.title || q),
      artist: String(hit.artistName || data.artist || ""),
      album: String(hit.albumName || ""),
      lyrics,
    };
  });

export const fetchWaifu = createServerFn({ method: "POST" })
  .validator((input: { tag?: string }) => input)
  .handler(async ({ data }) => {
    const tag = data.tag || "waifu";
    const r = await getJson(`https://api.waifu.im/search?included_tags=${encodeURIComponent(tag)}&is_nsfw=false&limit=12`);
    if (!r.ok) return { ok: false as const, error: "Waifu.im gagal" };
    return { ok: true as const, data: r.json };
  });

export const searchDanbooru = createServerFn({ method: "POST" })
  .validator((input: { tags: string }) => input)
  .handler(async ({ data }) => {
    const tags = `rating:g ${data.tags}`.trim();
    const r = await getJson(
      `https://danbooru.donmai.us/posts.json?limit=20&tags=${encodeURIComponent(tags)}`,
    );
    if (!r.ok || !Array.isArray(r.json)) return { ok: false as const, error: "Danbooru gagal" };
    return { ok: true as const, posts: r.json };
  });

export const searchManga = createServerFn({ method: "POST" })
  .validator((input: { q: string }) => input)
  .handler(async ({ data }) => {
    const r = await getJson(
      `https://api.mangadex.org/manga?limit=12&title=${encodeURIComponent(data.q)}&includes[]=cover_art&contentRating[]=safe&contentRating[]=suggestive`,
    );
    if (!r.ok) return { ok: false as const, error: "MangaDex gagal" };
    return { ok: true as const, data: r.json };
  });

export const mangaFeed = createServerFn({ method: "POST" })
  .validator((input: { id: string }) => input)
  .handler(async ({ data }) => {
    const r = await getJson(
      `https://api.mangadex.org/manga/${encodeURIComponent(data.id)}/feed?translatedLanguage[]=en&translatedLanguage[]=id&order[chapter]=desc&limit=20`,
    );
    if (!r.ok) return { ok: false as const, error: "Feed gagal" };
    return { ok: true as const, data: r.json };
  });

export const mangaPages = createServerFn({ method: "POST" })
  .validator((input: { chapterId: string }) => input)
  .handler(async ({ data }) => {
    const r = await getJson(`https://api.mangadex.org/at-home/server/${encodeURIComponent(data.chapterId)}`);
    if (!r.ok) return { ok: false as const, error: "Halaman gagal" };
    return { ok: true as const, data: r.json };
  });

export const downloadMedia = createServerFn({ method: "POST" })
  .validator((input: { url: string; provider?: string }) => input)
  .handler(async ({ data }) => {
    const url = data.url.trim();
    if (!url.startsWith("http")) return { ok: false as const, error: "Masukkan URL valid." };
    const host = (() => {
      try {
        return new URL(url).hostname;
      } catch {
        return "";
      }
    })();

    if (host.includes("tiktok")) {
      const r = await getJson(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
      const j = r.json as { code?: number; data?: Record<string, Json>; msg?: string } | null;
      if (j && typeof j === "object" && j && "data" in j && j.data && typeof j.data === "object") {
        const d = j.data as Record<string, Json>;
        const author = d.author && typeof d.author === "object" ? (d.author as { unique_id?: string }).unique_id ?? "" : "";
        return {
          ok: true as const,
          title: String(d.title ?? "TikTok"),
          author: String(author),
          cover: String(d.cover ?? d.origin_cover ?? ""),
          videos: [
            d.play ? { label: "No watermark", url: String(d.play) } : null,
            d.hdplay ? { label: "HD", url: String(d.hdplay) } : null,
            d.wmplay ? { label: "With watermark", url: String(d.wmplay) } : null,
          ].filter((v): v is { label: string; url: string } => Boolean(v)),
          audio: d.music ? { label: "MP3", url: String(d.music) } : null,
          embed: "",
          note: "",
        };
      }
    }

    const oembedCandidates = [
      host.includes("youtube") || host.includes("youtu.be")
        ? `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`
        : null,
      host.includes("tiktok") ? `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}` : null,
      host.includes("spotify") ? `https://open.spotify.com/oembed?url=${encodeURIComponent(url)}` : null,
    ].filter(Boolean) as string[];

    for (const o of oembedCandidates) {
      const r = await getJson(o);
      const j = r.json as { title?: string; author_name?: string; thumbnail_url?: string; html?: string } | null;
      if (j?.title) {
        return {
          ok: true as const,
          title: j.title,
          author: j.author_name ?? "",
          cover: j.thumbnail_url ?? "",
          videos: [] as { label: string; url: string }[],
          audio: null as { label: string; url: string } | null,
          embed: j.html ?? "",
          note: "Metadata berhasil. Unduhan langsung tergantung ketersediaan provider.",
        };
      }
    }

    const jina = await getJson(`https://r.jina.ai/${url}`);
    if (jina.text && jina.text.length > 40) {
      return {
        ok: true as const,
        title: "Halaman terdeteksi",
        author: host,
        cover: "",
        videos: [] as { label: string; url: string }[],
        audio: null as { label: string; url: string } | null,
        embed: "",
        note: jina.text.slice(0, 800),
      };
    }
    return { ok: false as const, error: "Provider tidak bisa mengambil media dari URL ini." };
  });

export const fetchPageSource = createServerFn({ method: "POST" })
  .validator((input: { url: string }) => input)
  .handler(async ({ data }) => {
    const url = data.url.trim();
    if (!url.startsWith("http")) return { ok: false as const, error: "URL tidak valid" };
    try {
      const u = new URL(url);
      if (!["http:", "https:"].includes(u.protocol)) return { ok: false as const, error: "Protokol ditolak" };
    } catch {
      return { ok: false as const, error: "URL tidak valid" };
    }
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 12000);
    try {
      const res = await fetch(`https://r.jina.ai/${url}`, { signal: ctrl.signal });
      const text = await res.text();
      return { ok: true as const, source: text.slice(0, 120000), status: res.status };
    } catch {
      return { ok: false as const, error: "Gagal mengambil source" };
    } finally {
      clearTimeout(t);
    }
  });

export const inspectUrl = createServerFn({ method: "POST" })
  .validator((input: { url: string }) => input)
  .handler(async ({ data }) => {
    const url = data.url.trim();
    if (!url.startsWith("http")) return { ok: false as const, error: "URL tidak valid" };
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 8000);
    try {
      const res = await fetch(url, { method: "GET", redirect: "follow", signal: ctrl.signal });
      const headers: Record<string, string> = {};
      res.headers.forEach((v, k) => {
        if (["content-type", "server", "x-frame-options", "content-security-policy", "strict-transport-security", "x-content-type-options", "location"].includes(k)) {
          headers[k] = v.slice(0, 300);
        }
      });
      const html = (await res.text()).slice(0, 80000);
      const title = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() ?? "";
      const desc = html.match(/name=["']description["'][^>]*content=["']([^"']+)/i)?.[1] ?? "";
      const og = html.match(/property=["']og:title["'][^>]*content=["']([^"']+)/i)?.[1] ?? "";
      return {
        ok: true as const,
        status: res.status,
        finalUrl: res.url,
        headers,
        title: title || og,
        description: desc,
        length: html.length,
      };
    } catch (e) {
      return { ok: false as const, error: e instanceof Error ? e.message : "Gagal fetch" };
    } finally {
      clearTimeout(t);
    }
  });

export const tempMail = createServerFn({ method: "POST" })
  .validator((input: { action: "create" | "inbox"; login?: string; domain?: string }) => input)
  .handler(async ({ data }) => {
    if (data.action === "create") {
      const r = await getJson("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1");
      const list = r.json as string[] | null;
      const email = list?.[0];
      if (!email) return { ok: false as const, error: "Gagal membuat mailbox" };
      const [login, domain] = email.split("@");
      return { ok: true as const, email, login, domain, messages: [] as Json };
    }
    const login = data.login ?? "";
    const domain = data.domain ?? "";
    const r = await getJson(
      `https://www.1secmail.com/api/v1/?action=getMessages&login=${encodeURIComponent(login)}&domain=${encodeURIComponent(domain)}`,
    );
    return { ok: true as const, email: "", login, domain, messages: r.json ?? [] };
  });

void hostOk;
