import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fetchers-BN5fiaEA.js
async function getJson(url, timeout = 12e3) {
	const ctrl = new AbortController();
	const t = setTimeout(() => ctrl.abort(), timeout);
	try {
		const res = await fetch(url, {
			signal: ctrl.signal,
			headers: {
				accept: "application/json,text/plain,*/*",
				"user-agent": "Mozilla/5.0 (compatible; FahmiTools/1.2)"
			}
		});
		const text = await res.text();
		try {
			return {
				ok: res.ok,
				status: res.status,
				json: JSON.parse(text),
				text
			};
		} catch {
			return {
				ok: res.ok,
				status: res.status,
				json: null,
				text
			};
		}
	} finally {
		clearTimeout(t);
	}
}
var lookupIp_createServerFn_handler = createServerRpc({
	id: "e748f3fb3949a29b17d8afff6a4d674a13d23d4aa384cc2d20be77ce4958e929",
	name: "lookupIp",
	filename: "src/lib/server/fetchers.ts"
}, (opts) => lookupIp.__executeServer(opts));
var lookupIp = createServerFn({ method: "POST" }).validator((input) => input).handler(lookupIp_createServerFn_handler, async ({ data }) => {
	const q = (data.ip || "").trim();
	const r = await getJson(q ? `https://ipwho.is/${encodeURIComponent(q)}` : "https://ipwho.is/");
	if (!r.json) return {
		ok: false,
		error: "Lookup gagal"
	};
	return {
		ok: true,
		data: r.json
	};
});
var fetchApod_createServerFn_handler = createServerRpc({
	id: "1eeb6bbcac0279a1fd51654bc239d1293e99f9aefc7ab22af4a028b51db905ac",
	name: "fetchApod",
	filename: "src/lib/server/fetchers.ts"
}, (opts) => fetchApod.__executeServer(opts));
var fetchApod = createServerFn({ method: "GET" }).handler(fetchApod_createServerFn_handler, async () => {
	const r = await getJson("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY");
	if (!r.ok || !r.json) return {
		ok: false,
		error: "NASA APOD gagal (kuota DEMO_KEY mungkin habis)."
	};
	return {
		ok: true,
		data: r.json
	};
});
var fetchBmkg_createServerFn_handler = createServerRpc({
	id: "74f92232e697f7669da36b4bbdca779119b582535aed4423f065d51125c9cd89",
	name: "fetchBmkg",
	filename: "src/lib/server/fetchers.ts"
}, (opts) => fetchBmkg.__executeServer(opts));
var fetchBmkg = createServerFn({ method: "GET" }).handler(fetchBmkg_createServerFn_handler, async () => {
	const [auto, felt, m5] = await Promise.all([
		getJson("https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json"),
		getJson("https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json"),
		getJson("https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json")
	]);
	const pick = (j) => {
		return j?.Infogempa?.gempa ?? null;
	};
	return {
		ok: true,
		auto: pick(auto.json),
		felt: pick(felt.json),
		m5: pick(m5.json),
		gempa: pick(auto.json),
		raw: auto.text.slice(0, 4e3),
		source: "BMKG"
	};
});
var fetchBmkgWeather_createServerFn_handler = createServerRpc({
	id: "ebe1828616827f2f8ab2a5dac1ac03a515b27873d1e7e42d353f15dbe9582125",
	name: "fetchBmkgWeather",
	filename: "src/lib/server/fetchers.ts"
}, (opts) => fetchBmkgWeather.__executeServer(opts));
var fetchBmkgWeather = createServerFn({ method: "POST" }).validator((input) => input).handler(fetchBmkgWeather_createServerFn_handler, async ({ data }) => {
	const adm4 = data.adm4.trim();
	if (!/^\d{2}\.\d{2}\.\d{2}\.\d{4}$/.test(adm4)) return {
		ok: false,
		error: "Kode wilayah adm4 tidak valid."
	};
	const r = await getJson(`https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${encodeURIComponent(adm4)}`, 15e3);
	if (!r.json) return {
		ok: false,
		error: "Prakiraan cuaca BMKG tidak merespons."
	};
	const body = r.json;
	const days = body.data?.[0]?.cuaca ?? [];
	return {
		ok: true,
		lokasi: body.lokasi ?? {},
		days,
		source: "BMKG"
	};
});
var searchFreeMusic_createServerFn_handler = createServerRpc({
	id: "423b8009bf5339e5adc1469bc0f67b79f910138428db570c19e43635cde39c81",
	name: "searchFreeMusic",
	filename: "src/lib/server/fetchers.ts"
}, (opts) => searchFreeMusic.__executeServer(opts));
var searchFreeMusic = createServerFn({ method: "POST" }).validator((input) => input).handler(searchFreeMusic_createServerFn_handler, async ({ data }) => {
	const q = data.q.trim();
	if (q.length < 2) return {
		ok: false,
		error: "Ketik judul, artis, atau mood (min. 2 huruf)."
	};
	const source = data.source || "both";
	const tracks = [];
	if (source === "audius" || source === "both") {
		const list = ((await getJson(`https://api.audius.co/v1/tracks/search?query=${encodeURIComponent(q)}&app_name=fahmitools`, 14e3)).json?.data ?? []).slice(0, 10);
		for (const t of list) {
			const id = String(t.id || "");
			if (!id) continue;
			const user = t.user && typeof t.user === "object" ? t.user : {};
			const art = t.artwork && typeof t.artwork === "object" ? t.artwork : {};
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
				license: t.is_downloadable ? "Gratis unduh (Audius)" : "Gratis diputar · stream Audius"
			});
		}
	}
	if (source === "archive" || source === "both") {
		const docs = ((await getJson(`https://archive.org/advancedsearch.php?q=${encodeURIComponent(`mediatype:audio AND (${q})`)}&fl[]=identifier&fl[]=title&fl[]=creator&output=json&rows=8`, 14e3)).json?.response?.docs ?? []).slice(0, 8);
		for (const d of docs) {
			const identifier = String(d.identifier || "");
			if (!identifier) continue;
			const files = ((await getJson(`https://archive.org/metadata/${encodeURIComponent(identifier)}`, 12e3)).json?.files ?? []).filter((f) => {
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
				license: "Internet Archive · cek lisensi item (banyak CC/public domain)"
			});
		}
	}
	if (!tracks.length) return {
		ok: false,
		error: "Tidak ketemu. Coba kata lain — lofi, jazz, piano, rain."
	};
	return {
		ok: true,
		tracks
	};
});
var fetchLyrics_createServerFn_handler = createServerRpc({
	id: "96f825edcd1907ac22251b256312fc3fb6f46eb7244a8f61b450ee7b3dc60155",
	name: "fetchLyrics",
	filename: "src/lib/server/fetchers.ts"
}, (opts) => fetchLyrics.__executeServer(opts));
var fetchLyrics = createServerFn({ method: "POST" }).validator((input) => input).handler(fetchLyrics_createServerFn_handler, async ({ data }) => {
	const q = (data.q || `${data.artist ?? ""} ${data.title ?? ""}`).trim();
	if (q.length < 2) return {
		ok: false,
		error: "Judul lagu kosong."
	};
	const r = await getJson(`https://lrclib.net/api/search?q=${encodeURIComponent(q)}`, 12e3);
	const hits = Array.isArray(r.json) ? r.json : [];
	const hit = hits.find((h) => h.plainLyrics && h.plainLyrics.length > 20 || h.instrumental) ?? hits[0];
	if (!hit) return {
		ok: false,
		error: "Lirik tidak ditemukan untuk judul ini."
	};
	const lyrics = hit.plainLyrics || (hit.instrumental ? "(Instrumental — tidak ada lirik.)" : "");
	if (!lyrics) return {
		ok: false,
		error: "Lirik kosong di sumber."
	};
	return {
		ok: true,
		title: String(hit.trackName || data.title || q),
		artist: String(hit.artistName || data.artist || ""),
		album: String(hit.albumName || ""),
		lyrics
	};
});
var fetchWaifu_createServerFn_handler = createServerRpc({
	id: "66c411b63b1ad8b0dbd3ab147de49e48f78144aa2c57402f044b008bfa716490",
	name: "fetchWaifu",
	filename: "src/lib/server/fetchers.ts"
}, (opts) => fetchWaifu.__executeServer(opts));
var fetchWaifu = createServerFn({ method: "POST" }).validator((input) => input).handler(fetchWaifu_createServerFn_handler, async ({ data }) => {
	const tag = data.tag || "waifu";
	const r = await getJson(`https://api.waifu.im/search?included_tags=${encodeURIComponent(tag)}&is_nsfw=false&limit=12`);
	if (!r.ok) return {
		ok: false,
		error: "Waifu.im gagal"
	};
	return {
		ok: true,
		data: r.json
	};
});
var searchDanbooru_createServerFn_handler = createServerRpc({
	id: "0d8eca10a60a53f5eecc7164ebb09c90856260c9857b88ccc6e5324c96886dad",
	name: "searchDanbooru",
	filename: "src/lib/server/fetchers.ts"
}, (opts) => searchDanbooru.__executeServer(opts));
var searchDanbooru = createServerFn({ method: "POST" }).validator((input) => input).handler(searchDanbooru_createServerFn_handler, async ({ data }) => {
	const tags = `rating:g ${data.tags}`.trim();
	const r = await getJson(`https://danbooru.donmai.us/posts.json?limit=20&tags=${encodeURIComponent(tags)}`);
	if (!r.ok || !Array.isArray(r.json)) return {
		ok: false,
		error: "Danbooru gagal"
	};
	return {
		ok: true,
		posts: r.json
	};
});
var searchManga_createServerFn_handler = createServerRpc({
	id: "0f6540b393f8386018486e7141515438cb78147f8290f7d43e85564996eecd60",
	name: "searchManga",
	filename: "src/lib/server/fetchers.ts"
}, (opts) => searchManga.__executeServer(opts));
var searchManga = createServerFn({ method: "POST" }).validator((input) => input).handler(searchManga_createServerFn_handler, async ({ data }) => {
	const r = await getJson(`https://api.mangadex.org/manga?limit=12&title=${encodeURIComponent(data.q)}&includes[]=cover_art&contentRating[]=safe&contentRating[]=suggestive`);
	if (!r.ok) return {
		ok: false,
		error: "MangaDex gagal"
	};
	return {
		ok: true,
		data: r.json
	};
});
var mangaFeed_createServerFn_handler = createServerRpc({
	id: "ce8e4799a5987608e07019db50af270e17ea7289c24848740476bccb90a615b3",
	name: "mangaFeed",
	filename: "src/lib/server/fetchers.ts"
}, (opts) => mangaFeed.__executeServer(opts));
var mangaFeed = createServerFn({ method: "POST" }).validator((input) => input).handler(mangaFeed_createServerFn_handler, async ({ data }) => {
	const r = await getJson(`https://api.mangadex.org/manga/${encodeURIComponent(data.id)}/feed?translatedLanguage[]=en&translatedLanguage[]=id&order[chapter]=desc&limit=20`);
	if (!r.ok) return {
		ok: false,
		error: "Feed gagal"
	};
	return {
		ok: true,
		data: r.json
	};
});
var mangaPages_createServerFn_handler = createServerRpc({
	id: "b8d160183f1e46d9f298e036da617300f8f3747b6a60b975e2ccc96eceda4072",
	name: "mangaPages",
	filename: "src/lib/server/fetchers.ts"
}, (opts) => mangaPages.__executeServer(opts));
var mangaPages = createServerFn({ method: "POST" }).validator((input) => input).handler(mangaPages_createServerFn_handler, async ({ data }) => {
	const r = await getJson(`https://api.mangadex.org/at-home/server/${encodeURIComponent(data.chapterId)}`);
	if (!r.ok) return {
		ok: false,
		error: "Halaman gagal"
	};
	return {
		ok: true,
		data: r.json
	};
});
var downloadMedia_createServerFn_handler = createServerRpc({
	id: "c5a480fcd9094df0b9c4c9d1434e5e95948ba07cae5e017c3c111e0c46115e86",
	name: "downloadMedia",
	filename: "src/lib/server/fetchers.ts"
}, (opts) => downloadMedia.__executeServer(opts));
var downloadMedia = createServerFn({ method: "POST" }).validator((input) => input).handler(downloadMedia_createServerFn_handler, async ({ data }) => {
	const url = data.url.trim();
	if (!url.startsWith("http")) return {
		ok: false,
		error: "Masukkan URL valid."
	};
	const host = (() => {
		try {
			return new URL(url).hostname;
		} catch {
			return "";
		}
	})();
	if (host.includes("tiktok")) {
		const j = (await getJson(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`)).json;
		if (j && typeof j === "object" && j && "data" in j && j.data && typeof j.data === "object") {
			const d = j.data;
			const author = d.author && typeof d.author === "object" ? d.author.unique_id ?? "" : "";
			return {
				ok: true,
				title: String(d.title ?? "TikTok"),
				author: String(author),
				cover: String(d.cover ?? d.origin_cover ?? ""),
				videos: [
					d.play ? {
						label: "No watermark",
						url: String(d.play)
					} : null,
					d.hdplay ? {
						label: "HD",
						url: String(d.hdplay)
					} : null,
					d.wmplay ? {
						label: "With watermark",
						url: String(d.wmplay)
					} : null
				].filter((v) => Boolean(v)),
				audio: d.music ? {
					label: "MP3",
					url: String(d.music)
				} : null,
				embed: "",
				note: ""
			};
		}
	}
	const oembedCandidates = [
		host.includes("youtube") || host.includes("youtu.be") ? `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json` : null,
		host.includes("tiktok") ? `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}` : null,
		host.includes("spotify") ? `https://open.spotify.com/oembed?url=${encodeURIComponent(url)}` : null
	].filter(Boolean);
	for (const o of oembedCandidates) {
		const j = (await getJson(o)).json;
		if (j?.title) return {
			ok: true,
			title: j.title,
			author: j.author_name ?? "",
			cover: j.thumbnail_url ?? "",
			videos: [],
			audio: null,
			embed: j.html ?? "",
			note: "Metadata berhasil. Unduhan langsung tergantung ketersediaan provider."
		};
	}
	const jina = await getJson(`https://r.jina.ai/${url}`);
	if (jina.text && jina.text.length > 40) return {
		ok: true,
		title: "Halaman terdeteksi",
		author: host,
		cover: "",
		videos: [],
		audio: null,
		embed: "",
		note: jina.text.slice(0, 800)
	};
	return {
		ok: false,
		error: "Provider tidak bisa mengambil media dari URL ini."
	};
});
var fetchPageSource_createServerFn_handler = createServerRpc({
	id: "3fd9b7171a648eabcaf9db5bf03b57a3a225327bc1ecf0194ba67c274fff9a98",
	name: "fetchPageSource",
	filename: "src/lib/server/fetchers.ts"
}, (opts) => fetchPageSource.__executeServer(opts));
var fetchPageSource = createServerFn({ method: "POST" }).validator((input) => input).handler(fetchPageSource_createServerFn_handler, async ({ data }) => {
	const url = data.url.trim();
	if (!url.startsWith("http")) return {
		ok: false,
		error: "URL tidak valid"
	};
	try {
		const u = new URL(url);
		if (!["http:", "https:"].includes(u.protocol)) return {
			ok: false,
			error: "Protokol ditolak"
		};
	} catch {
		return {
			ok: false,
			error: "URL tidak valid"
		};
	}
	const ctrl = new AbortController();
	const t = setTimeout(() => ctrl.abort(), 12e3);
	try {
		const res = await fetch(`https://r.jina.ai/${url}`, { signal: ctrl.signal });
		return {
			ok: true,
			source: (await res.text()).slice(0, 12e4),
			status: res.status
		};
	} catch {
		return {
			ok: false,
			error: "Gagal mengambil source"
		};
	} finally {
		clearTimeout(t);
	}
});
var inspectUrl_createServerFn_handler = createServerRpc({
	id: "3b874c7c4308e2716005df046be0c289febe0df60a60aa03f2ffdb44b6ac97a2",
	name: "inspectUrl",
	filename: "src/lib/server/fetchers.ts"
}, (opts) => inspectUrl.__executeServer(opts));
var inspectUrl = createServerFn({ method: "POST" }).validator((input) => input).handler(inspectUrl_createServerFn_handler, async ({ data }) => {
	const url = data.url.trim();
	if (!url.startsWith("http")) return {
		ok: false,
		error: "URL tidak valid"
	};
	const ctrl = new AbortController();
	const t = setTimeout(() => ctrl.abort(), 8e3);
	try {
		const res = await fetch(url, {
			method: "GET",
			redirect: "follow",
			signal: ctrl.signal
		});
		const headers = {};
		res.headers.forEach((v, k) => {
			if ([
				"content-type",
				"server",
				"x-frame-options",
				"content-security-policy",
				"strict-transport-security",
				"x-content-type-options",
				"location"
			].includes(k)) headers[k] = v.slice(0, 300);
		});
		const html = (await res.text()).slice(0, 8e4);
		const title = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() ?? "";
		const desc = html.match(/name=["']description["'][^>]*content=["']([^"']+)/i)?.[1] ?? "";
		const og = html.match(/property=["']og:title["'][^>]*content=["']([^"']+)/i)?.[1] ?? "";
		return {
			ok: true,
			status: res.status,
			finalUrl: res.url,
			headers,
			title: title || og,
			description: desc,
			length: html.length
		};
	} catch (e) {
		return {
			ok: false,
			error: e instanceof Error ? e.message : "Gagal fetch"
		};
	} finally {
		clearTimeout(t);
	}
});
var tempMail_createServerFn_handler = createServerRpc({
	id: "da78cb4e46a95a4f87abbc1c9d9d96587e8cf697f883ddc7c06f04cb66fc6167",
	name: "tempMail",
	filename: "src/lib/server/fetchers.ts"
}, (opts) => tempMail.__executeServer(opts));
var tempMail = createServerFn({ method: "POST" }).validator((input) => input).handler(tempMail_createServerFn_handler, async ({ data }) => {
	if (data.action === "create") {
		const email = (await getJson("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")).json?.[0];
		if (!email) return {
			ok: false,
			error: "Gagal membuat mailbox"
		};
		const [login, domain] = email.split("@");
		return {
			ok: true,
			email,
			login,
			domain,
			messages: []
		};
	}
	const login = data.login ?? "";
	const domain = data.domain ?? "";
	return {
		ok: true,
		email: "",
		login,
		domain,
		messages: (await getJson(`https://www.1secmail.com/api/v1/?action=getMessages&login=${encodeURIComponent(login)}&domain=${encodeURIComponent(domain)}`)).json ?? []
	};
});
//#endregion
export { downloadMedia_createServerFn_handler, fetchApod_createServerFn_handler, fetchBmkgWeather_createServerFn_handler, fetchBmkg_createServerFn_handler, fetchLyrics_createServerFn_handler, fetchPageSource_createServerFn_handler, fetchWaifu_createServerFn_handler, inspectUrl_createServerFn_handler, lookupIp_createServerFn_handler, mangaFeed_createServerFn_handler, mangaPages_createServerFn_handler, searchDanbooru_createServerFn_handler, searchFreeMusic_createServerFn_handler, searchManga_createServerFn_handler, tempMail_createServerFn_handler };
