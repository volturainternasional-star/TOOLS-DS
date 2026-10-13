import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as createServerFn } from "./ssr.mjs";
import { a as speakText, i as generateImage, n as askToolAi, r as createSsrRpc } from "./ai-CiRVoIuu.mjs";
import { A as lookupIp, C as fetchApod, D as fetchPageSource, E as fetchLyrics, F as searchManga, I as tempMail, L as FaIcon, M as mangaPages, N as searchDanbooru, O as fetchWaifu, P as searchFreeMusic, S as downloadMedia, T as fetchBmkgWeather, b as pushHistory, h as getTool, i as AiDock, j as mangaFeed, k as inspectUrl, o as BackgroundGlow, r as Route$1, s as FreeMark, w as fetchBmkg } from "./router-SOGDFaiQ.mjs";
import { a as downloadUrl, i as canvasPng, n as Field, o as fillCard, r as Note, s as useBusy, t as Action } from "./kit-EvDsY3VR.mjs";
import { t as GLOSSARY } from "./tool-guides-DcR75c17.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tool._id-BJI311Mp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Downloader({ hint }) {
	const [url, setUrl] = (0, import_react.useState)("");
	const [result, setResult] = (0, import_react.useState)(null);
	const { busy, error, setError, run } = useBusy();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Note, { children: [hint, " Beberapa sumber hanya mengembalikan metadata jika provider membatasi unduhan langsung."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "URL",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nx-input",
					placeholder: "https://…",
					value: url,
					onChange: (e) => setUrl(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				busy,
				onClick: () => void run(async () => {
					const r = await downloadMedia({ data: { url } });
					setResult(r);
					if (!r.ok) setError(r.error);
					else pushHistory({
						title: r.title,
						kind: "MEDIA",
						url
					});
				}),
				children: "Ambil media"
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "nx-error",
				children: error
			}) : null,
			result && result.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nx-result",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: result.title }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: { color: "#6b8499" },
						children: result.author
					}),
					result.cover ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: result.cover,
						alt: "",
						style: {
							width: "100%",
							borderRadius: 12,
							marginTop: 8
						}
					}) : null,
					result.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: { marginTop: 8 },
						children: result.note
					}) : null,
					"embed" in result && result.embed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: { marginTop: 8 },
						dangerouslySetInnerHTML: { __html: result.embed }
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							flexWrap: "wrap",
							gap: 8,
							marginTop: 10
						},
						children: [result.videos.map((v) => v ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "nx-btn",
							href: v.url,
							target: "_blank",
							rel: "noreferrer",
							children: v.label
						}, v.label) : null), result.audio ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "nx-btn ghost",
							href: result.audio.url,
							target: "_blank",
							rel: "noreferrer",
							children: result.audio.label
						}) : null]
					})
				]
			}) : null
		]
	});
}
function AiChatTool({ title, system }) {
	const [prompt, setPrompt] = (0, import_react.useState)("");
	const [out, setOut] = (0, import_react.useState)("");
	const { busy, error, setError, run } = useBusy();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				style: {
					fontFamily: "Orbitron,sans-serif",
					marginBottom: 10
				},
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				className: "nx-textarea",
				value: prompt,
				onChange: (e) => setPrompt(e.target.value),
				placeholder: "Tulis permintaan…"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				busy,
				onClick: () => void run(async () => {
					const r = await askToolAi({ data: {
						prompt,
						system
					} });
					if (!r.ok) setError(r.error);
					else setOut(r.text);
				}),
				children: "Jalankan"
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "nx-error",
				children: error
			}) : null,
			out ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "nx-result",
				style: { whiteSpace: "pre-wrap" },
				children: out
			}) : null
		]
	});
}
function AiImageTool({ prefix }) {
	const [prompt, setPrompt] = (0, import_react.useState)("liquid reactor nebula, violet plasma, cinematic");
	const [url, setUrl] = (0, import_react.useState)("");
	const { busy, error, setError, run } = useBusy();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Prompt",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: "nx-textarea",
					value: prompt,
					onChange: (e) => setPrompt(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				busy,
				onClick: () => void run(async () => {
					const r = await generateImage({ data: { prompt: `${prefix ?? ""}${prompt}` } });
					if (!r.ok) setError(r.error);
					else setUrl(r.url);
				}),
				children: "Generate"
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "nx-error",
				children: error
			}) : null,
			url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: url,
				alt: "",
				style: {
					width: "100%",
					borderRadius: 16,
					marginTop: 12
				}
			}) : null
		]
	});
}
function VoiceStudio() {
	const [text, setText] = (0, import_react.useState)("All Tools FAHMI, liquid reactor online.");
	const [audio, setAudio] = (0, import_react.useState)("");
	const { busy, error, setError, run } = useBusy();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				className: "nx-textarea",
				value: text,
				onChange: (e) => setText(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				busy,
				onClick: () => void run(async () => {
					const r = await speakText({ data: { text } });
					if (!r.ok) setError(r.error);
					else setAudio(r.audio);
				}),
				children: "Generate suara"
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "nx-error",
				children: error
			}) : null,
			audio ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
				controls: true,
				src: audio,
				style: {
					width: "100%",
					marginTop: 12
				}
			}) : null
		]
	});
}
function PromptVision() {
	const [dataUrl, setDataUrl] = (0, import_react.useState)("");
	const [out, setOut] = (0, import_react.useState)("");
	const { busy, error, setError, run } = useBusy();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, { children: "Unggah gambar, lalu AI menyusun prompt produksi." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				className: "nx-input",
				type: "file",
				accept: "image/*",
				onChange: (e) => {
					const f = e.target.files?.[0];
					if (!f) return;
					const r = new FileReader();
					r.onload = () => setDataUrl(String(r.result));
					r.readAsDataURL(f);
				}
			}),
			dataUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: dataUrl,
				alt: "",
				style: {
					maxHeight: 180,
					marginTop: 8,
					borderRadius: 12
				}
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				busy,
				onClick: () => void run(async () => {
					const r = await askToolAi({ data: {
						system: "Kamu FAHMI Vision. Tulis prompt gambar profesional (subject, lighting, lens, mood) dalam bahasa Inggris, 80-140 kata.",
						prompt: "Buatkan prompt produksi untuk gambar yang diunggah user (deskripsikan seolah foto/ilustrasi umum jika tidak ada piksel)."
					} });
					if (!r.ok) setError(r.error);
					else setOut(r.text);
				}),
				children: "Analisis"
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "nx-error",
				children: error
			}) : null,
			out ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "nx-result",
				style: { whiteSpace: "pre-wrap" },
				children: out
			}) : null
		]
	});
}
function IpTool() {
	const [ip, setIp] = (0, import_react.useState)("");
	const [out, setOut] = (0, import_react.useState)("");
	const { busy, error, setError, run } = useBusy();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "IP (kosongkan untuk IP kamu)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nx-input",
					value: ip,
					onChange: (e) => setIp(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				busy,
				onClick: () => void run(async () => {
					const r = await lookupIp({ data: { ip } });
					if (!r.ok) setError(r.error);
					else setOut(JSON.stringify(r.data, null, 2));
				}),
				children: "Lookup"
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "nx-error",
				children: error
			}) : null,
			out ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "nx-result",
				children: out
			}) : null
		]
	});
}
function SpaceTool() {
	const [out, setOut] = (0, import_react.useState)(null);
	const { busy, error, setError, run } = useBusy();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				busy,
				onClick: () => void run(async () => {
					const r = await fetchApod();
					if (!r.ok) setError(r.error);
					else setOut(r.data);
				}),
				children: "NASA APOD"
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "nx-error",
				children: error
			}) : null,
			out ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nx-result",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: out.title }),
					out.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: out.url,
						alt: "",
						style: {
							width: "100%",
							marginTop: 8,
							borderRadius: 12
						}
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: { marginTop: 8 },
						children: out.explanation
					})
				]
			}) : null
		]
	});
}
function WebIntel() {
	const [url, setUrl] = (0, import_react.useState)("https://example.com");
	const [out, setOut] = (0, import_react.useState)("");
	const { busy, error, setError, run } = useBusy();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "URL",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nx-input",
					value: url,
					onChange: (e) => setUrl(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				busy,
				onClick: () => void run(async () => {
					const r = await inspectUrl({ data: { url } });
					if (!r.ok) setError(r.error);
					else setOut(JSON.stringify(r, null, 2));
				}),
				children: "Audit"
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "nx-error",
				children: error
			}) : null,
			out ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "nx-result",
				children: out
			}) : null
		]
	});
}
function VirusScan() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebIntel, {});
}
function GetCode() {
	const [url, setUrl] = (0, import_react.useState)("https://example.com");
	const [src, setSrc] = (0, import_react.useState)("");
	const { busy, error, setError, run } = useBusy();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "URL",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nx-input",
					value: url,
					onChange: (e) => setUrl(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				busy,
				onClick: () => void run(async () => {
					const r = await fetchPageSource({ data: { url } });
					if (!r.ok) setError(r.error);
					else setSrc(r.source);
				}),
				children: "Ambil source"
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "nx-error",
				children: error
			}) : null,
			src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				className: "nx-textarea",
				style: { minHeight: 280 },
				value: src,
				readOnly: true
			}) : null
		]
	});
}
function GenMail() {
	const [box, setBox] = (0, import_react.useState)(null);
	const [inbox, setInbox] = (0, import_react.useState)("");
	const { busy, error, setError, run } = useBusy();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				busy,
				onClick: () => void run(async () => {
					const r = await tempMail({ data: { action: "create" } });
					if (!r.ok) setError(r.error);
					else setBox(r);
				}),
				children: "Buat email"
			}),
			box?.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "nx-result",
				children: box.email
			}) : null,
			box?.login ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				busy,
				ghost: true,
				onClick: () => void run(async () => {
					const r = await tempMail({ data: {
						action: "inbox",
						login: box.login,
						domain: box.domain
					} });
					setInbox(JSON.stringify("messages" in r ? r.messages : r, null, 2));
				}),
				children: "Cek inbox"
			}) : null,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "nx-error",
				children: error
			}) : null,
			inbox ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "nx-result",
				children: inbox
			}) : null
		]
	});
}
function AnimeDiscover() {
	const [items, setItems] = (0, import_react.useState)([]);
	const { busy, error, setError, run } = useBusy();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				busy,
				onClick: () => void run(async () => {
					const r = await fetchWaifu({ data: { tag: "waifu" } });
					if (!r.ok) setError(r.error);
					else {
						const payload = r.data;
						setItems(payload?.images ?? []);
					}
				}),
				children: "Muat galeri SFW"
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "nx-error",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "tools-grid",
				style: { marginTop: 12 },
				children: items.map((im, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: im.url,
					alt: "",
					style: {
						width: "100%",
						borderRadius: 12
					}
				}, i))
			})
		]
	});
}
function DanbooruTool() {
	const [tags, setTags] = (0, import_react.useState)("landscape");
	const [posts, setPosts] = (0, import_react.useState)([]);
	const { busy, error, setError, run } = useBusy();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, { children: "Default rating:g (aman)." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Tags",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nx-input",
					value: tags,
					onChange: (e) => setTags(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				busy,
				onClick: () => void run(async () => {
					const r = await searchDanbooru({ data: { tags } });
					if (!r.ok) setError(r.error);
					else setPosts(r.posts);
				}),
				children: "Cari"
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "nx-error",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "tools-grid",
				style: { marginTop: 12 },
				children: posts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: p.preview_file_url || p.file_url,
					alt: "",
					style: {
						width: "100%",
						borderRadius: 12
					}
				}, p.id))
			})
		]
	});
}
function ComicReader() {
	const [q, setQ] = (0, import_react.useState)("one piece");
	const [list, setList] = (0, import_react.useState)([]);
	const [pages, setPages] = (0, import_react.useState)([]);
	const { busy, error, setError, run } = useBusy();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Cari judul",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nx-input",
					value: q,
					onChange: (e) => setQ(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				busy,
				onClick: () => void run(async () => {
					const r = await searchManga({ data: { q } });
					if (!r.ok) setError(r.error);
					else {
						const payload = r.data;
						setList(payload?.data ?? []);
					}
				}),
				children: "Cari"
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "nx-error",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					display: "grid",
					gap: 8,
					marginTop: 10
				},
				children: list.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "nx-btn ghost",
					type: "button",
					onClick: () => void run(async () => {
						const feed = await mangaFeed({ data: { id: m.id } });
						const ch = (feed.ok ? feed.data : null)?.data?.[0]?.id || "";
						if (!ch) return;
						const pg = await mangaPages({ data: { chapterId: ch } });
						if (pg.ok) {
							const d = pg.data;
							if (d?.chapter?.data) setPages(d.chapter.data.map((f) => `${d.baseUrl}/data/${d.chapter.hash}/${f}`));
						}
					}),
					children: m.attributes?.title?.en ?? m.id
				}, m.id))
			}),
			pages.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: p,
				alt: "",
				style: {
					width: "100%",
					marginTop: 8
				}
			}, p))
		]
	});
}
function CalcTool() {
	const [expr, setExpr] = (0, import_react.useState)("12 * (5 + 3)");
	const [out, setOut] = (0, import_react.useState)("");
	function run() {
		try {
			const safe = expr.replace(/[^0-9+\-*/().%\s]/g, "");
			const v = Function(`"use strict";return (${safe})`)();
			setOut(String(v));
		} catch {
			setOut("Ekspresi tidak valid");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Ekspresi",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nx-input",
					value: expr,
					onChange: (e) => setExpr(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				onClick: run,
				children: "Hitung"
			}),
			out ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "nx-result",
				children: out
			}) : null
		]
	});
}
function PwGenTool() {
	const [len, setLen] = (0, import_react.useState)(16);
	const [pw, setPw] = (0, import_react.useState)("");
	function gen() {
		const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*";
		const buf = new Uint32Array(len);
		crypto.getRandomValues(buf);
		setPw([...buf].map((n) => chars[n % 65]).join(""));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: `Panjang (${len})`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nx-input",
					type: "range",
					min: 8,
					max: 64,
					value: len,
					onChange: (e) => setLen(Number(e.target.value))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				onClick: gen,
				children: "Generate"
			}),
			pw ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "nx-result",
				style: { fontFamily: "ui-monospace,monospace" },
				children: pw
			}) : null
		]
	});
}
var MORSE = {
	a: ".-",
	b: "-...",
	c: "-.-.",
	d: "-..",
	e: ".",
	f: "..-.",
	g: "--.",
	h: "....",
	i: "..",
	j: ".---",
	k: "-.-",
	l: ".-..",
	m: "--",
	n: "-.",
	o: "---",
	p: ".--.",
	q: "--.-",
	r: ".-.",
	s: "...",
	t: "-",
	u: "..-",
	v: "...-",
	w: ".--",
	x: "-..-",
	y: "-.--",
	z: "--..",
	"1": ".----",
	"2": "..---",
	"3": "...--",
	"4": "....-",
	"5": ".....",
	"6": "-....",
	"7": "--...",
	"8": "---..",
	"9": "----.",
	"0": "-----",
	" ": "/"
};
var REV = Object.fromEntries(Object.entries(MORSE).map(([k, v]) => [v, k]));
function MorseTool() {
	const [text, setText] = (0, import_react.useState)("FAHMI");
	const code = text.toLowerCase().split("").map((c) => MORSE[c] ?? "").join(" ");
	function play() {
		const ctx = new AudioContext();
		let t = ctx.currentTime;
		for (const ch of code) if (ch === "." || ch === "-") {
			const o = ctx.createOscillator();
			const g = ctx.createGain();
			o.frequency.value = 600;
			o.connect(g);
			g.connect(ctx.destination);
			const dur = ch === "." ? .08 : .22;
			g.gain.setValueAtTime(.08, t);
			o.start(t);
			o.stop(t + dur);
			t += dur + .06;
		} else t += .16;
	}
	const back = code.split(" ").map((c) => REV[c] ?? "").join("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Teks",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nx-input",
					value: text,
					onChange: (e) => setText(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "nx-result",
				children: code || "—"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Note, { children: ["Decode: ", back] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				onClick: play,
				children: "Putar audio"
			})
		]
	});
}
function QrTool() {
	const [text, setText] = (0, import_react.useState)("https://all-tools-fahmi.app");
	const src = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(text)}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Isi QR",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				className: "nx-input",
				value: text,
				onChange: (e) => setText(e.target.value)
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt: "QR",
			width: 220,
			height: 220,
			style: {
				borderRadius: 16,
				background: "#fff"
			}
		})]
	});
}
function QuoteTool() {
	const [q, setQ] = (0, import_react.useState)("Stay hungry. Stay foolish.");
	const [a, setA] = (0, import_react.useState)("Steve Jobs");
	const ref = (0, import_react.useRef)(null);
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
	(0, import_react.useEffect)(draw, [q, a]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Quote",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: "nx-textarea",
					value: q,
					onChange: (e) => setQ(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Author",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nx-input",
					value: a,
					onChange: (e) => setA(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref,
				width: 600,
				height: 380,
				style: {
					width: "100%",
					borderRadius: 16
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				onClick: () => ref.current && canvasPng(ref.current, "quote.png"),
				children: "Unduh JPG"
			})
		]
	});
}
function wrapText(ctx, text, x, y, max, lh) {
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
function AvatarStudio() {
	const [seed, setSeed] = (0, import_react.useState)("fahmi");
	const [style, setStyle] = (0, import_react.useState)("adventurer");
	const styles = [
		"adventurer",
		"lorelei",
		"notionists",
		"bottts",
		"identicon",
		"shapes",
		"fun-emoji",
		"pixel-art"
	];
	const src = `https://api.dicebear.com/9.x/${style}/svg?seed=${encodeURIComponent(seed)}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nx-grid-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Seed",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "nx-input",
						value: seed,
						onChange: (e) => setSeed(e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Style",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "nx-select",
						value: style,
						onChange: (e) => setStyle(e.target.value),
						children: styles.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src,
				alt: "avatar",
				width: 220,
				height: 220,
				style: {
					borderRadius: 24,
					background: "#0c1c30"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { marginTop: 12 },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "nx-btn",
					href: src,
					download: `avatar-${seed}.svg`,
					children: "Unduh SVG"
				})
			})
		]
	});
}
function CertTool() {
	const [name, setName] = (0, import_react.useState)("Budi Santoso");
	const [reason, setReason] = (0, import_react.useState)("Juara 1 Lomba Meme Nasional");
	const ref = (0, import_react.useRef)(null);
	function draw() {
		const c = ref.current;
		if (!c) return;
		const ctx = c.getContext("2d");
		if (!ctx) return;
		fillCard(ctx, c.width, c.height, "SERTIFIKAT MEME", [
			`Diberikan kepada ${name}`,
			reason,
			(/* @__PURE__ */ new Date()).toLocaleDateString("id-ID")
		], "SIMULASI");
	}
	(0, import_react.useEffect)(draw, [name, reason]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, { children: "Ini sertifikat meme. Bukan dokumen resmi." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Nama",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nx-input",
					value: name,
					onChange: (e) => setName(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Alasan",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nx-input",
					value: reason,
					onChange: (e) => setReason(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref,
				width: 720,
				height: 420,
				style: {
					width: "100%",
					borderRadius: 16
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				onClick: () => ref.current && canvasPng(ref.current, "sertifikat.png"),
				children: "Unduh"
			})
		]
	});
}
function EktpTool() {
	const [f, setF] = (0, import_react.useState)({
		nama: "DEMO USER",
		nik: "0000000000000000",
		ttl: "Jakarta, 01-01-2000",
		alamat: "Jl. Simulasi No. 1"
	});
	const ref = (0, import_react.useRef)(null);
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
		[
			`NIK: ${f.nik}`,
			`Nama: ${f.nama}`,
			`TTL: ${f.ttl}`,
			`Alamat: ${f.alamat}`
		].forEach((l, i) => ctx.fillText(l, 24, 80 + i * 28));
		ctx.save();
		ctx.translate(c.width / 2, c.height / 2);
		ctx.rotate(-.35);
		ctx.fillStyle = "rgba(220,38,38,.4)";
		ctx.font = "800 36px Orbitron,sans-serif";
		ctx.textAlign = "center";
		ctx.fillText("BUKAN DOKUMEN RESMI", 0, 0);
		ctx.restore();
	}
	(0, import_react.useEffect)(draw, [f]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, { children: "Generator kartu demo bertanda air permanen. Tidak untuk pemalsuan identitas." }),
			[
				"nama",
				"nik",
				"ttl",
				"alamat"
			].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: k.toUpperCase(),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nx-input",
					value: f[k],
					onChange: (e) => setF({
						...f,
						[k]: e.target.value
					})
				})
			}, k)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref,
				width: 720,
				height: 280,
				style: {
					width: "100%",
					borderRadius: 12
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				onClick: () => ref.current && canvasPng(ref.current, "ektp-demo.png"),
				children: "Unduh demo"
			})
		]
	});
}
function FakeLobby() {
	const [game, setGame] = (0, import_react.useState)("FF");
	const [name, setName] = (0, import_react.useState)("FAHMI");
	const [rank, setRank] = (0, import_react.useState)("Heroic");
	const ref = (0, import_react.useRef)(null);
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
	(0, import_react.useEffect)(draw, [
		game,
		name,
		rank
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nx-grid-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Game",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "nx-select",
						value: game,
						onChange: (e) => setGame(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "FF" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "ML" })]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Rank",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "nx-input",
						value: rank,
						onChange: (e) => setRank(e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Nickname",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nx-input",
					value: name,
					onChange: (e) => setName(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref,
				width: 720,
				height: 280,
				style: {
					width: "100%",
					borderRadius: 16
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				onClick: () => ref.current && canvasPng(ref.current, "lobby.png"),
				children: "Unduh"
			})
		]
	});
}
function WinQuotes() {
	const [style, setStyle] = (0, import_react.useState)("11");
	const [msg, setMsg] = (0, import_react.useState)("Task failed successfully.");
	const ref = (0, import_react.useRef)(null);
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
	(0, import_react.useEffect)(draw, [style, msg]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Style",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: "nx-select",
					value: style,
					onChange: (e) => setStyle(e.target.value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "11",
						children: "Windows 11"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "xp",
						children: "Windows XP"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Pesan",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nx-input",
					value: msg,
					onChange: (e) => setMsg(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref,
				width: 600,
				height: 220,
				style: {
					width: "100%",
					borderRadius: 12
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				onClick: () => ref.current && canvasPng(ref.current, "winquote.png"),
				children: "Unduh"
			})
		]
	});
}
function NokiaMsg() {
	const [from, setFrom] = (0, import_react.useState)("FAHMI");
	const [msg, setMsg] = (0, import_react.useState)("Ketemu di warnet jam 8.");
	const ref = (0, import_react.useRef)(null);
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
	(0, import_react.useEffect)(draw, [from, msg]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Pengirim",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nx-input",
					value: from,
					onChange: (e) => setFrom(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Pesan",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: "nx-textarea",
					value: msg,
					onChange: (e) => setMsg(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref,
				width: 280,
				height: 200,
				style: {
					borderRadius: 8,
					imageRendering: "pixelated"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				onClick: () => ref.current && canvasPng(ref.current, "nokia.png"),
				children: "Unduh"
			})
		]
	});
}
function FakeOvo() {
	const [name, setName] = (0, import_react.useState)("FAHMI User");
	const [saldo, setSaldo] = (0, import_react.useState)("1.250.000");
	const ref = (0, import_react.useRef)(null);
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
		ctx.rotate(-.35);
		ctx.fillStyle = "rgba(255,255,255,.35)";
		ctx.font = "800 28px Orbitron,sans-serif";
		ctx.textAlign = "center";
		ctx.fillText("BUKAN TRANSAKSI NYATA", 0, 0);
		ctx.restore();
	}
	(0, import_react.useEffect)(draw, [name, saldo]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, { children: "Simulasi bertanda air. Bukan bukti transfer." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Nama",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nx-input",
					value: name,
					onChange: (e) => setName(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Saldo",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nx-input",
					value: saldo,
					onChange: (e) => setSaldo(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref,
				width: 420,
				height: 240,
				style: {
					width: "100%",
					borderRadius: 16
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				onClick: () => ref.current && canvasPng(ref.current, "ovo-demo.png"),
				children: "Unduh"
			})
		]
	});
}
function TikTokQuote() {
	const [name, setName] = (0, import_react.useState)("fahmi");
	const [msg, setMsg] = (0, import_react.useState)("Liquid Reactor sudah online.");
	const ref = (0, import_react.useRef)(null);
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
	(0, import_react.useEffect)(draw, [name, msg]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Username",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nx-input",
					value: name,
					onChange: (e) => setName(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Chat",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nx-input",
					value: msg,
					onChange: (e) => setMsg(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref,
				width: 360,
				height: 640,
				style: {
					width: 220,
					borderRadius: 16
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				onClick: () => ref.current && canvasPng(ref.current, "ttquote.png"),
				children: "Unduh"
			})
		]
	});
}
function roundRect(ctx, x, y, w, h, r) {
	ctx.beginPath();
	ctx.moveTo(x + r, y);
	ctx.arcTo(x + w, y, x + w, y + h, r);
	ctx.arcTo(x + w, y + h, x, y + h, r);
	ctx.arcTo(x, y + h, x, y, r);
	ctx.arcTo(x, y, x + w, y, r);
	ctx.closePath();
}
function PlaceholderStudio() {
	const [w, setW] = (0, import_react.useState)(800);
	const [h, setH] = (0, import_react.useState)(450);
	const [bg, setBg] = (0, import_react.useState)("#0c4a6e");
	const [fg, setFg] = (0, import_react.useState)("#dbeafe");
	const [text, setText] = (0, import_react.useState)("FAHMI");
	const src = `https://placehold.co/${w}x${h}/${bg.replace("#", "")}/${fg.replace("#", "")}/png?text=${encodeURIComponent(text)}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nx-grid-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Lebar",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "nx-input",
						type: "number",
						value: w,
						onChange: (e) => setW(Number(e.target.value))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Tinggi",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "nx-input",
						type: "number",
						value: h,
						onChange: (e) => setH(Number(e.target.value))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nx-grid-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "BG",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "nx-input",
						type: "color",
						value: bg,
						onChange: (e) => setBg(e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "FG",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "nx-input",
						type: "color",
						value: fg,
						onChange: (e) => setFg(e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Teks",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nx-input",
					value: text,
					onChange: (e) => setText(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src,
				alt: "placeholder",
				style: {
					width: "100%",
					borderRadius: 12
				}
			})
		]
	});
}
function FotoLink() {
	const [url, setUrl] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, { children: "Gambar diproses di perangkatmu menjadi data URL — tidak diunggah ke server." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				className: "nx-input",
				type: "file",
				accept: "image/*",
				onChange: (e) => {
					const f = e.target.files?.[0];
					if (!f) return;
					const r = new FileReader();
					r.onload = () => setUrl(String(r.result));
					r.readAsDataURL(f);
				}
			}),
			url ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: url,
				alt: "",
				style: {
					marginTop: 12,
					maxWidth: "100%",
					borderRadius: 12
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				className: "nx-textarea",
				style: { marginTop: 12 },
				value: url,
				readOnly: true
			})] }) : null
		]
	});
}
function RemoveBg() {
	const canvasRef = (0, import_react.useRef)(null);
	const [done, setDone] = (0, import_react.useState)(false);
	function process(file) {
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
			const tr = d[0], tg = d[1], tb = d[2];
			for (let i = 0; i < d.length; i += 4) if (Math.abs(d[i] - tr) + Math.abs(d[i + 1] - tg) + Math.abs(d[i + 2] - tb) < 80) d[i + 3] = 0;
			ctx.putImageData(data, 0, 0);
			setDone(true);
		};
		img.src = URL.createObjectURL(file);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, { children: "Flood-fill dari sudut kiri atas. Cocok untuk foto studio berlatar rata." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				className: "nx-input",
				type: "file",
				accept: "image/*",
				onChange: (e) => e.target.files?.[0] && process(e.target.files[0])
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				style: {
					maxWidth: "100%",
					marginTop: 12
				}
			}),
			done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				onClick: () => canvasRef.current && canvasPng(canvasRef.current, "cutout.png"),
				children: "Unduh PNG"
			}) : null
		]
	});
}
function Enhancer() {
	const canvasRef = (0, import_react.useRef)(null);
	const [ready, setReady] = (0, import_react.useState)(false);
	function up(file) {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, { children: "Upscale 2× di browser. Bukan model super-resolution cloud." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				className: "nx-input",
				type: "file",
				accept: "image/*",
				onChange: (e) => e.target.files?.[0] && up(e.target.files[0])
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				style: {
					maxWidth: "100%",
					marginTop: 12
				}
			}),
			ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				onClick: () => canvasRef.current && canvasPng(canvasRef.current, "hd.png"),
				children: "Unduh"
			}) : null
		]
	});
}
function SmartCutout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RemoveBg, {});
}
function Vectorizer() {
	const [svg, setSvg] = (0, import_react.useState)("");
	function trace(file) {
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
			for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
				const i = (y * size + x) * 4;
				if ((data[i] + data[i + 1] + data[i + 2]) / 3 < 200 && data[i + 3] > 40) {
					const hex = `#${[
						data[i],
						data[i + 1],
						data[i + 2]
					].map((n) => n.toString(16).padStart(2, "0")).join("")}`;
					paths += `<rect x="${x}" y="${y}" width="1" height="1" fill="${hex}"/>`;
				}
			}
			setSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges">${paths}</svg>`);
		};
		img.src = URL.createObjectURL(file);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, { children: "Mode poster 64×64 — cocok untuk ikon, bukan foto realistis." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				className: "nx-input",
				type: "file",
				accept: "image/*",
				onChange: (e) => e.target.files?.[0] && trace(e.target.files[0])
			}),
			svg ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { marginTop: 12 },
				dangerouslySetInnerHTML: { __html: svg }
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				className: "nx-textarea",
				value: svg,
				readOnly: true
			})] }) : null
		]
	});
}
function HtmlVideo() {
	const canvasRef = (0, import_react.useRef)(null);
	const { busy, run } = useBusy();
	async function record() {
		const c = canvasRef.current;
		if (!c) return;
		await run(async () => {
			const ctx = c.getContext("2d");
			if (!ctx) return;
			const stream = c.captureStream(30);
			const rec = new MediaRecorder(stream, { mimeType: MediaRecorder.isTypeSupported("video/webm;codecs=vp9") ? "video/webm;codecs=vp9" : "video/webm" });
			const chunks = [];
			rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
			const done = new Promise((res) => {
				rec.onstop = () => res();
			});
			rec.start();
			const start = performance.now();
			await new Promise((resolve) => {
				const tick = (now) => {
					const t = (now - start) / 1e3;
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, { children: "Rekam animasi Liquid Reactor 8 detik ke WebM (MP4 tergantung browser)." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				width: 640,
				height: 360,
				style: {
					width: "100%",
					borderRadius: 16,
					background: "#030712"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				busy,
				onClick: () => void record(),
				children: "Rekam 8 detik"
			})
		]
	});
}
function WebEncrypt() {
	const [src, setSrc] = (0, import_react.useState)("<h1>Hello FAHMI</h1>");
	const packed = (0, import_react.useMemo)(() => {
		return `<!doctype html><script>document.write(decodeURIComponent(escape(atob("${btoa(unescape(encodeURIComponent(src)))}"))))<\/script>`;
	}, [src]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, { children: "Obfuscasi HTML sisi klien. Bukan enkripsi kriptografis." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				className: "nx-textarea",
				value: src,
				onChange: (e) => setSrc(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				className: "nx-textarea",
				value: packed,
				readOnly: true
			})
		]
	});
}
function SvgAlight() {
	const [svg, setSvg] = (0, import_react.useState)(`<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#3b82f6"/></svg>`);
	const xml = `<?xml version="1.0"?>
<alight name="FahmiSVG">
  <scene duration="5">
    <shape type="svg"><![CDATA[${svg}]]></shape>
  </scene>
</alight>`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "SVG",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				className: "nx-textarea",
				value: svg,
				onChange: (e) => setSvg(e.target.value)
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			className: "nx-textarea",
			value: xml,
			readOnly: true
		})]
	});
}
function xmlPreset(name, body) {
	return `<?xml version="1.0"?>
<alight preset="${name}" duration="8.33">
${body}
</alight>`;
}
function AlightPack({ kind }) {
	const [text, setText] = (0, import_react.useState)("FAHMI");
	const map = {
		text2d: xmlPreset("text2d", `  <text value="${text}" fx="slide-up" font="Orbitron"/>`),
		text3d: xmlPreset("text3d", `  <text3d value="${text}" extrude="12" shadow="long"/>`),
		textfxanimation: xmlPreset("textfx", `  <fx name="glitch" text="${text}"/>`),
		textvector: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 120"><text x="20" y="80" font-size="64" fill="#60a5fa">${text}</text></svg>`,
		trimpath: xmlPreset("trimpath", `  <trimpath text="${text}" start="0" end="1" duration="2.4"/>`),
		logoanimate: xmlPreset("logo", `  <logo text="${text}" duration="8.33" ease="expo"/>`),
		alightpremium: xmlPreset("pack", `  <preset id="open-title" text="${text}"/>\n  <preset id="lower-third" text="${text}"/>`)
	};
	const out = map[kind] ?? map.text2d;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Teks",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				className: "nx-input",
				value: text,
				onChange: (e) => setText(e.target.value)
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			className: "nx-textarea",
			value: out,
			readOnly: true
		})]
	});
}
function MlTools() {
	const [win, setWin] = (0, import_react.useState)(120);
	const [lose, setLose] = (0, import_react.useState)(80);
	const [target, setTarget] = (0, import_react.useState)(70);
	const total = win + lose || 1;
	const wr = win / total * 100;
	const need = Math.max(0, Math.ceil(target / 100 * total - win) / (1 - target / 100));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nx-grid-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Menang",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "nx-input",
						type: "number",
						value: win,
						onChange: (e) => setWin(Number(e.target.value))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Kalah",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "nx-input",
						type: "number",
						value: lose,
						onChange: (e) => setLose(Number(e.target.value))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: `Target WR ${target}%`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nx-input",
					type: "range",
					min: 50,
					max: 90,
					value: target,
					onChange: (e) => setTarget(Number(e.target.value))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nx-result",
				children: [
					"WR sekarang: ",
					wr.toFixed(2),
					"%",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Butuh ~",
					Math.ceil(need),
					" kemenangan beruntun untuk ",
					target,
					"%."
				]
			})
		]
	});
}
function AutoPdf() {
	const [text, setText] = (0, import_react.useState)("Judul\n\nTulis naskah di sini. Auto PDF memotong per halaman A5.");
	const pages = (0, import_react.useMemo)(() => {
		const lines = text.split("\n");
		const out = [[]];
		for (const l of lines) {
			if (out[out.length - 1].length >= 28) out.push([]);
			out[out.length - 1].push(l);
		}
		return out;
	}, [text]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				className: "nx-textarea",
				value: text,
				onChange: (e) => setText(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Note, { children: [pages.length, " halaman A5. Cetak lewat dialog browser (Save as PDF)."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				onClick: () => window.print(),
				children: "Cetak / Save PDF"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: pages.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "nx-result",
				style: {
					minHeight: 240,
					background: "#eef6ff",
					color: "#0c4a6e"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: ["A5 · ", i + 1] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					style: {
						whiteSpace: "pre-wrap",
						fontFamily: "Georgia,serif"
					},
					children: p.join("\n")
				})]
			}, i)) })
		]
	});
}
function PdfLab() {
	const [pages, setPages] = (0, import_react.useState)([
		"Halaman 1",
		"Halaman 2",
		"Halaman 3"
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, { children: "Atur urutan halaman lalu cetak. Merge file PDF biner butuh library native — lab ini mengorganisir konten." }),
			pages.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					gap: 8,
					marginBottom: 8
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nx-input",
					value: p,
					onChange: (e) => setPages(pages.map((x, j) => j === i ? e.target.value : x))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
					ghost: true,
					onClick: () => setPages(pages.filter((_, j) => j !== i)),
					children: "Hapus"
				})]
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				onClick: () => setPages([...pages, `Halaman ${pages.length + 1}`]),
				children: "Tambah"
			})
		]
	});
}
function Classics() {
	const books = [
		{
			t: "The Analects",
			a: "Confucius",
			s: "Pembelajaran, kebajikan, dan tata krama sebagai fondasi masyarakat."
		},
		{
			t: "The Tale of Genji",
			a: "Murasaki Shikibu",
			s: "Kisah istana Heian — roman, status, dan kehalusan rasa."
		},
		{
			t: "The Tale of Hong Gildong",
			a: "Anon. Korea",
			s: "Pahlawan lahir di luar pernikahan resmi, menuntut keadilan."
		}
	];
	const [i, setI] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					display: "flex",
					gap: 8,
					flexWrap: "wrap",
					marginBottom: 12
				},
				children: books.map((b, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: `nx-btn${i === idx ? "" : " ghost"}`,
					type: "button",
					onClick: () => setI(idx),
					children: b.t
				}, b.t))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				style: { fontFamily: "Orbitron,sans-serif" },
				children: books[i].t
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: { color: "#9fb6cc" },
				children: books[i].a
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: {
					marginTop: 10,
					lineHeight: 1.6
				},
				children: books[i].s
			})
		]
	});
}
function UnbanWa() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, { children: "FAHMI tidak bisa unban akun WhatsApp. Ikuti kanal resmi Meta saja." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				style: {
					paddingLeft: 18,
					lineHeight: 1.7,
					fontSize: 14,
					color: "#c5d4e4"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Buka WhatsApp → Bantuan → Hubungi kami." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Jika diblokir, gunakan formulir banding resmi WhatsApp." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Jelaskan pelanggaran yang diduga, tanpa membeli jasa pihak ketiga." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Tunggu review Meta. Tidak ada “magic link” yang sah." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: "nx-btn",
				href: "https://www.whatsapp.com/contact",
				target: "_blank",
				rel: "noreferrer",
				children: "Buka pusat bantuan WhatsApp"
			})
		]
	});
}
function DeployCheck() {
	const items = [
		"Domain & HTTPS",
		"OG image 1200×630",
		"Favicon SVG",
		"PWA manifest",
		"Lighthouse > 90",
		"Error boundary",
		"Mobile 390px"
	];
	const [done, setDone] = (0, import_react.useState)({});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "nx-panel",
		children: items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			style: {
				display: "flex",
				gap: 10,
				padding: "8px 0",
				alignItems: "center"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "checkbox",
				checked: !!done[it],
				onChange: (e) => setDone({
					...done,
					[it]: e.target.checked
				})
			}), it]
		}, it))
	});
}
function TiktokHdPrep() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, { children: "Siapkan video vertikal 1080×1920, 30fps, di bawah 3 menit sebelum unggah ke TikTok." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			style: {
				lineHeight: 1.7,
				paddingLeft: 18
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Rasio 9:16" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Audio 48kHz stereo" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "H.264 + AAC" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Teks aman di zona tengah (hindari notch)" })
			]
		})]
	});
}
var TICKER_SEED = [
	{
		symbol: "BBCA.JK",
		name: "Bank Central Asia",
		wiki: "Bank_Central_Asia",
		sector: "Bank",
		kind: "stock",
		tv: "IDX:BBCA"
	},
	{
		symbol: "BBRI.JK",
		name: "Bank Rakyat Indonesia",
		wiki: "Bank_Rakyat_Indonesia",
		sector: "Bank",
		kind: "stock",
		tv: "IDX:BBRI"
	},
	{
		symbol: "BMRI.JK",
		name: "Bank Mandiri",
		wiki: "Bank_Mandiri",
		sector: "Bank",
		kind: "stock",
		tv: "IDX:BMRI"
	},
	{
		symbol: "BBNI.JK",
		name: "Bank Negara Indonesia",
		wiki: "Bank_Negara_Indonesia",
		sector: "Bank",
		kind: "stock",
		tv: "IDX:BBNI"
	},
	{
		symbol: "BRIS.JK",
		name: "Bank Syariah Indonesia",
		wiki: "Bank_Syariah_Indonesia",
		sector: "Bank",
		kind: "stock",
		tv: "IDX:BRIS"
	},
	{
		symbol: "TLKM.JK",
		name: "Telkom Indonesia",
		wiki: "Telkom_Indonesia",
		sector: "Telekomunikasi",
		kind: "stock",
		tv: "IDX:TLKM"
	},
	{
		symbol: "ASII.JK",
		name: "Astra International",
		wiki: "Astra_International",
		sector: "Konglomerat",
		kind: "stock",
		tv: "IDX:ASII"
	},
	{
		symbol: "UNVR.JK",
		name: "Unilever Indonesia",
		wiki: "Unilever_Indonesia",
		sector: "Konsumen",
		kind: "stock",
		tv: "IDX:UNVR"
	},
	{
		symbol: "ICBP.JK",
		name: "Indofood CBP",
		wiki: "Indofood_CBP",
		sector: "Konsumen",
		kind: "stock",
		tv: "IDX:ICBP"
	},
	{
		symbol: "INDF.JK",
		name: "Indofood Sukses Makmur",
		wiki: "Indofood",
		sector: "Konsumen",
		kind: "stock",
		tv: "IDX:INDF"
	},
	{
		symbol: "GOTO.JK",
		name: "GoTo Gojek Tokopedia",
		wiki: "GoTo_(company)",
		sector: "Teknologi",
		kind: "stock",
		tv: "IDX:GOTO"
	},
	{
		symbol: "BUKA.JK",
		name: "Bukalapak",
		wiki: "Bukalapak",
		sector: "Teknologi",
		kind: "stock",
		tv: "IDX:BUKA"
	},
	{
		symbol: "ADRO.JK",
		name: "Alamtri / Adaro",
		wiki: "Adaro_Energy",
		sector: "Tambang",
		kind: "stock",
		tv: "IDX:ADRO"
	},
	{
		symbol: "ANTM.JK",
		name: "Aneka Tambang",
		wiki: "Aneka_Tambang",
		sector: "Tambang",
		kind: "stock",
		tv: "IDX:ANTM"
	},
	{
		symbol: "PTBA.JK",
		name: "Bukit Asam",
		wiki: "Bukit_Asam",
		sector: "Tambang",
		kind: "stock",
		tv: "IDX:PTBA"
	},
	{
		symbol: "AMMN.JK",
		name: "Amman Mineral",
		wiki: "Amman_Mineral_Internasional",
		sector: "Tambang",
		kind: "stock",
		tv: "IDX:AMMN"
	},
	{
		symbol: "BYAN.JK",
		name: "Bayan Resources",
		wiki: "Bayan_Resources",
		sector: "Tambang",
		kind: "stock",
		tv: "IDX:BYAN"
	},
	{
		symbol: "PGAS.JK",
		name: "Perusahaan Gas Negara",
		wiki: "Perusahaan_Gas_Negara",
		sector: "Energi",
		kind: "stock",
		tv: "IDX:PGAS"
	},
	{
		symbol: "AAPL",
		name: "Apple",
		wiki: "Apple_Inc.",
		sector: "Teknologi",
		kind: "stock",
		tv: "NASDAQ:AAPL"
	},
	{
		symbol: "MSFT",
		name: "Microsoft",
		wiki: "Microsoft",
		sector: "Teknologi",
		kind: "stock",
		tv: "NASDAQ:MSFT"
	},
	{
		symbol: "NVDA",
		name: "NVIDIA",
		wiki: "Nvidia",
		sector: "Teknologi",
		kind: "stock",
		tv: "NASDAQ:NVDA"
	},
	{
		symbol: "GOOGL",
		name: "Alphabet",
		wiki: "Alphabet_Inc.",
		sector: "Teknologi",
		kind: "stock",
		tv: "NASDAQ:GOOGL"
	},
	{
		symbol: "AMZN",
		name: "Amazon",
		wiki: "Amazon_(company)",
		sector: "Konsumen",
		kind: "stock",
		tv: "NASDAQ:AMZN"
	},
	{
		symbol: "TSLA",
		name: "Tesla",
		wiki: "Tesla,_Inc.",
		sector: "Otomotif",
		kind: "stock",
		tv: "NASDAQ:TSLA"
	},
	{
		symbol: "META",
		name: "Meta Platforms",
		wiki: "Meta_Platforms",
		sector: "Teknologi",
		kind: "stock",
		tv: "NASDAQ:META"
	},
	{
		symbol: "BTC-USD",
		name: "Bitcoin",
		wiki: "Bitcoin",
		sector: "Kripto",
		kind: "crypto",
		tv: "BINANCE:BTCUSDT"
	},
	{
		symbol: "ETH-USD",
		name: "Ethereum",
		wiki: "Ethereum",
		sector: "Kripto",
		kind: "crypto",
		tv: "BINANCE:ETHUSDT"
	},
	{
		symbol: "SOL-USD",
		name: "Solana",
		wiki: "Solana_(blockchain)",
		sector: "Kripto",
		kind: "crypto",
		tv: "BINANCE:SOLUSDT"
	},
	{
		symbol: "BNB-USD",
		name: "BNB",
		wiki: "Binance",
		sector: "Kripto",
		kind: "crypto",
		tv: "BINANCE:BNBUSDT"
	},
	{
		symbol: "XRP-USD",
		name: "XRP",
		wiki: "Ripple_(payment_protocol)",
		sector: "Kripto",
		kind: "crypto",
		tv: "BINANCE:XRPUSDT"
	},
	{
		symbol: "DOGE-USD",
		name: "Dogecoin",
		wiki: "Dogecoin",
		sector: "Kripto",
		kind: "crypto",
		tv: "BINANCE:DOGEUSDT"
	},
	{
		symbol: "ADA-USD",
		name: "Cardano",
		wiki: "Cardano_(blockchain_platform)",
		sector: "Kripto",
		kind: "crypto",
		tv: "BINANCE:ADAUSDT"
	},
	{
		symbol: "AVAX-USD",
		name: "Avalanche",
		wiki: "Avalanche_(blockchain_platform)",
		sector: "Kripto",
		kind: "crypto",
		tv: "BINANCE:AVAXUSDT"
	}
];
createServerFn({ method: "GET" }).handler(createSsrRpc("074a70dcba2f6559bfe49770f33270347905e83c34829c1dfda3e347f2aad827"));
var searchTickers = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("daa47c3382f11da68eb2db6d731d6fdfdb044f118346e13cfbeea75f885b1a47"));
var fetchQuote = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("ba1ee6a62741cc12ab5cc29041196c668305315c2d83231f21951d723b984da0"));
createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("4f44c0a211342d915830f49b69491ba6af8cac0a76690538922f378a10cf9c0f"));
var analyzeCompany = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("23d54f6426af0be932e3923c1131daecc2140e15be887dc61816cc149ec2eb14"));
var analyzeCrypto = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("d1b36f1a128015d7d827a905f7ae9b2c52adc59d89a1df62edd511ef0d9009e6"));
createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("b265f14fa47eaa90986c505821a3ea48d31366cc130659373ad2fc7a5ff7a6c3"));
var convertFx = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("7b98f573c2d5bfc8f94693078d42ab036e2f1b708b10914c129325cdb69a95e8"));
function toTvSymbol(raw) {
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
function TvChart({ symbol, height = 460 }) {
	const tv = toTvSymbol(symbol);
	const src = `https://s.tradingview.com/widgetembed/?frameElementId=fahmi_tv&symbol=${encodeURIComponent(tv)}&interval=D&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=04111c&theme=dark&style=1&timezone=Asia/Jakarta&withdateranges=1&hideideas=1&locale=id&hidevolume=0&hidetrending=1`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
		className: "nx-tv",
		title: `TradingView ${tv}`,
		src,
		style: { height },
		loading: "lazy",
		referrerPolicy: "origin"
	});
}
function ChipRow({ items, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "nx-chip-row",
		children: items.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: `nx-chip${value === c.id ? " is-on" : ""}`,
			type: "button",
			onClick: () => onChange(c.id),
			children: c.label
		}, c.id))
	});
}
var CRYPTO = [
	{
		id: "BINANCE:BTCUSDT",
		label: "BTC"
	},
	{
		id: "BINANCE:ETHUSDT",
		label: "ETH"
	},
	{
		id: "BINANCE:SOLUSDT",
		label: "SOL"
	},
	{
		id: "BINANCE:BNBUSDT",
		label: "BNB"
	},
	{
		id: "BINANCE:XRPUSDT",
		label: "XRP"
	},
	{
		id: "BINANCE:DOGEUSDT",
		label: "DOGE"
	},
	{
		id: "BINANCE:ADAUSDT",
		label: "ADA"
	},
	{
		id: "BINANCE:AVAXUSDT",
		label: "AVAX"
	}
];
function fmtN(n, d = 2) {
	if (!Number.isFinite(n)) return "—";
	return n.toLocaleString("id-ID", { maximumFractionDigits: d });
}
function fmtPct(n) {
	if (!Number.isFinite(n)) return "—";
	return `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`;
}
function fmtBig(n) {
	if (!Number.isFinite(n) || n === 0) return "—";
	const abs = Math.abs(n);
	if (abs >= 0xe8d4a51000) return `${(n / 0xe8d4a51000).toFixed(2)} T`;
	if (abs >= 1e9) return `${(n / 1e9).toFixed(2)} M`;
	if (abs >= 1e6) return `${(n / 1e6).toFixed(2)} jt`;
	return n.toLocaleString("id-ID", { maximumFractionDigits: 0 });
}
function Spark({ values }) {
	if (values.length < 2) return null;
	const min = Math.min(...values);
	const span = Math.max(...values) - min || 1;
	const d = values.map((v, i) => {
		const x = i / (values.length - 1) * 220;
		const y = 48 - (v - min) / span * 44;
		return `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`;
	}).join(" ");
	const up = values.at(-1) >= values[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		className: "nx-spark",
		viewBox: "0 0 220 52",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d,
			fill: "none",
			stroke: up ? "#6ee7b7" : "#fda4af",
			strokeWidth: "2"
		})
	});
}
function LiveTape({ lines, busy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-tape",
		"aria-live": "polite",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "nx-tape-head",
				children: "SCAN LIVE"
			}),
			lines.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
				" ",
				l
			] }, `${i}-${l.slice(0, 24)}`)),
			busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "nx-tape-cursor",
				children: "menulis ▊"
			}) : null
		]
	});
}
function MetricGrid({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "nx-metrics",
		children: items.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "nx-metric",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: m.k }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: m.v })]
		}, m.k))
	});
}
function QuoteStrip({ symbol, name, price, changePct, currency, extra }) {
	const up = (changePct ?? 0) >= 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-bb",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "nx-bb-sym",
				children: symbol.replace("BINANCE:", "").replace("IDX:", "")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nx-bb-meta",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: name || "Terminal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["SCAN LIVE · ", (/* @__PURE__ */ new Date()).toLocaleTimeString("id-ID", {
					hour: "2-digit",
					minute: "2-digit"
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `nx-bb-px${up ? " is-up" : " is-dn"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: price != null && Number.isFinite(price) ? fmtN(price) : "—" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
						currency || "",
						" ",
						changePct != null && Number.isFinite(changePct) ? fmtPct(changePct) : ""
					] }),
					extra ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: extra }) : null
				]
			})
		]
	});
}
function Typewriter({ text }) {
	const [n, setN] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("pre", {
		className: "nx-result nx-live-copy",
		style: { whiteSpace: "pre-wrap" },
		children: [text.slice(0, n), n < text.length ? "▍" : ""]
	});
}
function CryptoTool() {
	const [symbol, setSymbol] = (0, import_react.useState)("BINANCE:BTCUSDT");
	const [custom, setCustom] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, { children: "Chart live dari TradingView — bukan CoinGecko. Ketik simbol (contoh BINANCE:PEPEUSDT) atau pilih koin. Untuk analisa 1 tahun + teks live, buka tool Crypto Analisa." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipRow, {
				items: CRYPTO,
				value: symbol,
				onChange: setSymbol
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nx-grid-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Simbol TradingView",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "nx-input",
						value: custom,
						placeholder: "BINANCE:BTCUSDT",
						onChange: (e) => setCustom(e.target.value),
						onKeyDown: (e) => {
							if (e.key === "Enter" && custom.trim()) setSymbol(custom.trim());
						}
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "flex",
						alignItems: "flex-end",
						paddingBottom: 12
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
						onClick: () => custom.trim() && setSymbol(custom.trim()),
						children: "Buka chart"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TvChart, { symbol }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "nx-ok",
				style: { marginTop: 10 },
				children: [toTvSymbol(symbol), " · data TradingView"]
			})
		]
	});
}
function CryptoAnalisa() {
	const [symbol, setSymbol] = (0, import_react.useState)("BINANCE:BTCUSDT");
	const [custom, setCustom] = (0, import_react.useState)("");
	const [hits, setHits] = (0, import_react.useState)([]);
	const [tape, setTape] = (0, import_react.useState)([]);
	const [out, setOut] = (0, import_react.useState)("");
	const [metrics, setMetrics] = (0, import_react.useState)([]);
	const [closes, setCloses] = (0, import_react.useState)([]);
	const [quote, setQuote] = (0, import_react.useState)(null);
	const { busy, error, setError, run } = useBusy();
	function scan(target) {
		const next = target.trim() || symbol;
		setSymbol(toTvSymbol(next.includes("USDT") || next.includes(":") ? next : `BINANCE:${next.replace("-USD", "")}USDT`));
		setOut("");
		setTape([
			"Menghubungkan kuotasi publik…",
			`Memuat candle 1 tahun ${next}…`,
			"Menghitung return, high/low, volume…"
		]);
		run(async () => {
			const r = await analyzeCrypto({ data: { symbol: next } });
			if (!r?.ok) {
				setError(r && "error" in r ? r.error : "Scan gagal. Coba BTC atau ETH.");
				setTape((t) => [...t, "Gagal memuat kuotasi"]);
				return;
			}
			const s = r.scan;
			setSymbol(s.tv);
			setCloses(s.closes);
			setQuote({
				name: s.name,
				price: s.price,
				changePct: s.changePct
			});
			setMetrics([
				{
					k: "Harga",
					v: fmtN(s.price, 4)
				},
				{
					k: "24 jam",
					v: fmtPct(s.changePct)
				},
				{
					k: "Return 1 thn",
					v: fmtPct(s.return1y)
				},
				{
					k: "High 1 thn",
					v: fmtN(s.high1y, 4)
				},
				{
					k: "Low 1 thn",
					v: fmtN(s.low1y, 4)
				},
				{
					k: "Vol 24 jam",
					v: s.quoteVolume ? `${fmtBig(s.quoteVolume)} USDT` : s.volume ? fmtBig(s.volume) : "—"
				}
			]);
			setTape([
				`Pair ${s.pair} · TradingView ${s.tv}`,
				`Harga ${fmtN(s.price, 4)} · 24j ${fmtPct(s.changePct)}`,
				`Range 1 tahun ${fmtN(s.low1y, 4)} – ${fmtN(s.high1y, 4)}`,
				`Return 12 bulan ${fmtPct(s.return1y)}`,
				`Volume 24 jam ${s.quoteVolume ? `${fmtBig(s.quoteVolume)} USDT` : s.volume ? fmtBig(s.volume) : "—"}`,
				"Menulis ulasan edukatif…"
			]);
			setOut(r.analysis);
		});
	}
	function find(query) {
		const q = query.trim();
		if (!q) return;
		const local = TICKER_SEED.filter((t) => t.kind === "crypto" && `${t.symbol} ${t.name} ${t.tv}`.toLowerCase().includes(q.toLowerCase())).map((t) => ({
			symbol: t.tv || t.symbol,
			name: t.name,
			exchange: "Crypto"
		}));
		if (local.length) {
			setHits(local);
			setSymbol(local[0].symbol);
		} else setSymbol(toTvSymbol(q));
		run(async () => {
			const r = await searchTickers({ data: {
				q,
				kind: "crypto"
			} });
			if (r?.ok && r.results.length) {
				const mapped = r.results.map((h) => ({
					symbol: TICKER_SEED.find((t) => t.symbol === h.symbol)?.tv || h.symbol,
					name: h.name,
					exchange: h.exchange
				}));
				setHits(mapped);
				const first = mapped[0];
				if (first) setSymbol(toTvSymbol(first.symbol));
			} else if (!local.length) setError(r && "error" in r && r.error ? r.error : "Koin tidak ketemu. Coba BTC, ETH, SOL.");
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, { children: "Analisa kripto 12 bulan: chart TradingView + candle publik. Teks live muncul saat scan. Bukan sinyal beli." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipRow, {
				items: CRYPTO,
				value: symbol,
				onChange: (id) => {
					setCustom("");
					scan(id);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nx-grid-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Cari koin",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "nx-input",
						value: custom,
						placeholder: "BTC, ETH, SOL…",
						onChange: (e) => setCustom(e.target.value),
						onKeyDown: (e) => {
							if (e.key === "Enter") find(custom || "BTC");
						}
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						alignItems: "flex-end",
						gap: 8,
						paddingBottom: 12,
						flexWrap: "wrap"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
						busy,
						onClick: () => find(custom || "BTC"),
						children: "Cari"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
						busy,
						onClick: () => scan(custom || symbol),
						children: "Scan 1 tahun"
					})]
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "nx-error",
				children: error
			}) : null,
			hits.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "nx-chip-row",
				children: hits.slice(0, 8).map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: `nx-chip${toTvSymbol(h.symbol) === symbol ? " is-on" : ""}`,
					type: "button",
					onClick: () => scan(h.symbol),
					children: h.name
				}, h.symbol))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteStrip, {
				symbol,
				name: quote?.name,
				price: quote?.price,
				changePct: quote?.changePct,
				currency: "USDT",
				extra: "CRYPTO DESK"
			}),
			tape.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveTape, {
				lines: tape,
				busy
			}) : null,
			metrics.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricGrid, { items: metrics }) : null,
			closes.length > 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spark, { values: closes.filter((_, i, a) => i % 3 === 0 || i === a.length - 1) }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TvChart, {
				symbol,
				height: 400
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typewriter, { text: out })
		]
	});
}
var PULSE = [
	{
		id: "IDX:COMPOSITE",
		label: "IHSG"
	},
	{
		id: "IDX:BBCA",
		label: "BBCA"
	},
	{
		id: "IDX:BBRI",
		label: "BBRI"
	},
	{
		id: "IDX:TLKM",
		label: "TLKM"
	},
	{
		id: "SP:SPX",
		label: "S&P 500"
	},
	{
		id: "NASDAQ:NVDA",
		label: "NVDA"
	},
	{
		id: "FX_IDC:USDIDR",
		label: "USD/IDR"
	},
	{
		id: "TVC:GOLD",
		label: "Emas"
	},
	{
		id: "TVC:USOIL",
		label: "Minyak"
	}
];
function MarketPulse() {
	const [symbol, setSymbol] = (0, import_react.useState)("IDX:COMPOSITE");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, { children: "Papan pasar: IHSG, blue chip BEI, indeks AS, kurs, emas, minyak. Chart TradingView. Bukan sinyal beli." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipRow, {
				items: PULSE,
				value: symbol,
				onChange: setSymbol
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TvChart, { symbol })
		]
	});
}
function SahamDesk() {
	const [q, setQ] = (0, import_react.useState)("BBCA");
	const [symbol, setSymbol] = (0, import_react.useState)("IDX:BBCA");
	const [hits, setHits] = (0, import_react.useState)([]);
	const [quote, setQuote] = (0, import_react.useState)(null);
	const [tape, setTape] = (0, import_react.useState)([]);
	const [out, setOut] = (0, import_react.useState)("");
	const [metrics, setMetrics] = (0, import_react.useState)([]);
	const [years, setYears] = (0, import_react.useState)([]);
	const { busy, error, setError, run } = useBusy();
	function applyQuote(hSymbol) {
		setSymbol(toTvSymbol(hSymbol));
		const seed = TICKER_SEED.find((t) => t.symbol === hSymbol || t.tv === toTvSymbol(hSymbol));
		if (seed) setQuote((q) => ({
			name: seed.name,
			price: q?.price ?? 0,
			changePct: q?.changePct ?? 0,
			currency: q?.currency ?? "",
			exchange: seed.symbol.endsWith(".JK") ? "Jakarta" : q?.exchange ?? ""
		}));
		fetchQuote({ data: { symbol: hSymbol } }).then((qq) => {
			if (qq?.ok) setQuote(qq.quote);
		});
	}
	async function find(query) {
		const text = query.trim();
		if (!text) return;
		setSymbol(toTvSymbol(text));
		const local = TICKER_SEED.filter((t) => t.kind === "stock" && `${t.symbol} ${t.name}`.toLowerCase().includes(text.toLowerCase())).map((t) => ({
			symbol: t.symbol,
			name: t.name,
			exchange: t.symbol.endsWith(".JK") ? "Jakarta" : ""
		}));
		if (local.length) {
			setHits(local);
			applyQuote(local[0].symbol);
		}
		await run(async () => {
			const r = await searchTickers({ data: {
				q: text,
				kind: "stock"
			} });
			if (!r?.ok) {
				if (!local.length) setError(r && "error" in r ? r.error : "Pencarian gagal. Coba BBCA atau AAPL.");
				return;
			}
			setHits(r.results);
			const first = r.results[0];
			if (first) applyQuote(first.symbol);
		});
	}
	function scanYear(ticker) {
		setOut("");
		setTape([
			"Memindai emiten…",
			"Mengambil kuotasi 12 bulan…",
			"Membaca supply, kapitalisasi, dan laporan…"
		]);
		run(async () => {
			const r = await analyzeCompany({ data: {
				symbol: ticker,
				question: "Jelaskan perusahaan ini secara rinci selama satu tahun."
			} });
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
				{
					k: "Harga",
					v: `${fmtN(qt.price)} ${qt.currency}`
				},
				{
					k: "1 hari",
					v: fmtPct(qt.changePct)
				},
				{
					k: "Return 1 thn",
					v: fmtPct(qt.return1y)
				},
				{
					k: "Market cap",
					v: fmtBig(p.marketCap)
				},
				{
					k: "Saham beredar",
					v: fmtBig(p.sharesOutstanding)
				},
				{
					k: "Float",
					v: fmtBig(p.floatShares)
				},
				{
					k: "P/E",
					v: fmtN(p.pe, 1)
				},
				{
					k: "EPS",
					v: fmtN(p.eps, 2)
				},
				{
					k: "ROE",
					v: Number.isFinite(p.roe) ? `${(p.roe * 100).toFixed(1)}%` : "—"
				},
				{
					k: "Dividend",
					v: Number.isFinite(p.dividendYield) ? `${(p.dividendYield * 100).toFixed(2)}%` : "—"
				},
				{
					k: "52w",
					v: `${fmtN(p.low52)} – ${fmtN(p.high52)}`
				},
				{
					k: "Pendapatan",
					v: fmtBig(p.revenue)
				}
			]);
			setTape([
				`${qt.name} (${qt.symbol}) · ${qt.exchange}`,
				`Harga ${fmtN(qt.price)} ${qt.currency} · ${fmtPct(qt.changePct)} hari ini`,
				`Return 12 bulan ${fmtPct(qt.return1y)} · range ${fmtN(qt.low1y)}–${fmtN(qt.high1y)}`,
				`Supply: beredar ${fmtBig(p.sharesOutstanding)} · float ${fmtBig(p.floatShares)} · cap ${fmtBig(p.marketCap)}`,
				`Keuangan: PE ${fmtN(p.pe, 1)} · EPS ${fmtN(p.eps, 2)} · ROE ${Number.isFinite(p.roe) ? (p.roe * 100).toFixed(1) + "%" : "—"}`,
				p.sector ? `Sektor ${p.sector}${p.industry ? " · " + p.industry : ""}` : "Profil publik dibaca",
				"Menulis materi setahun…"
			]);
			setOut(r.analysis);
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, { children: "Ketik kode 4 huruf BEI (BBCA) atau ticker AS (AAPL). Chart TradingView. Tombol Scan 1 tahun mengisi materi + teks live di bawah." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Cari emiten",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nx-input",
					value: q,
					onChange: (e) => setQ(e.target.value),
					onKeyDown: (e) => {
						if (e.key === "Enter") find(q);
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nx-chip-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
					busy,
					onClick: () => void find(q),
					children: "Cari & buka chart"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
					busy,
					onClick: () => scanYear(q),
					children: "Scan 1 tahun"
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "nx-error",
				children: error
			}) : null,
			hits.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "nx-chip-row",
				style: { marginTop: 12 },
				children: hits.slice(0, 8).map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: `nx-chip${toTvSymbol(h.symbol) === symbol ? " is-on" : ""}`,
					type: "button",
					onClick: () => applyQuote(h.symbol),
					children: h.symbol
				}, h.symbol))
			}) : null,
			quote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteStrip, {
				symbol,
				name: quote.name,
				price: quote.price,
				changePct: quote.changePct,
				currency: quote.currency,
				extra: quote.return1y != null ? `1Y ${fmtPct(quote.return1y)}` : "EQUITY DESK"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteStrip, {
				symbol,
				name: "Saham Desk",
				extra: "Ketik ticker lalu Cari"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TvChart, { symbol }),
			tape.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveTape, {
				lines: tape,
				busy
			}) : null,
			metrics.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricGrid, { items: metrics }) : null,
			years.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nx-year-table",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "nx-tape-head",
					children: "LAPORAN TAHUNAN"
				}), years.map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: y.year || "—" }),
					" · pendapatan ",
					fmtBig(y.revenue),
					" · laba ",
					fmtBig(y.netIncome)
				] }, y.year))]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typewriter, { text: out })
		]
	});
}
function CapitalAgent() {
	const [q, setQ] = (0, import_react.useState)("BBCA");
	const [question, setQuestion] = (0, import_react.useState)("");
	const [out, setOut] = (0, import_react.useState)("");
	const [symbol, setSymbol] = (0, import_react.useState)("IDX:BBCA");
	const [tape, setTape] = (0, import_react.useState)([]);
	const [metrics, setMetrics] = (0, import_react.useState)([]);
	const [years, setYears] = (0, import_react.useState)([]);
	const [summary, setSummary] = (0, import_react.useState)("");
	const { busy, error, setError, run } = useBusy();
	function scan() {
		setOut("");
		setSummary("");
		setTape([
			`Memindai ${q.toUpperCase()}…`,
			"Mengambil harga dan range 52 minggu…",
			"Membaca supply (saham beredar / float)…",
			"Membuka laporan keuangan tahunan…",
			"Merangkai materi untuk pemula…"
		]);
		run(async () => {
			const r = await analyzeCompany({ data: {
				symbol: q,
				question: question || "Jelaskan perusahaan ini secara rinci selama satu tahun terakhir."
			} });
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
				{
					k: "Harga",
					v: `${fmtN(qt.price)} ${qt.currency}`
				},
				{
					k: "Return 1 thn",
					v: fmtPct(qt.return1y)
				},
				{
					k: "Market cap",
					v: fmtBig(p.marketCap)
				},
				{
					k: "Saham beredar",
					v: fmtBig(p.sharesOutstanding)
				},
				{
					k: "Float",
					v: fmtBig(p.floatShares)
				},
				{
					k: "P/E",
					v: fmtN(p.pe, 1)
				},
				{
					k: "Forward P/E",
					v: fmtN(p.forwardPe, 1)
				},
				{
					k: "EPS",
					v: fmtN(p.eps, 2)
				},
				{
					k: "ROE",
					v: Number.isFinite(p.roe) ? `${(p.roe * 100).toFixed(1)}%` : "—"
				},
				{
					k: "Margin",
					v: Number.isFinite(p.profitMargin) ? `${(p.profitMargin * 100).toFixed(1)}%` : "—"
				},
				{
					k: "Debt/Equity",
					v: fmtN(p.debtToEquity, 1)
				},
				{
					k: "Dividend yield",
					v: Number.isFinite(p.dividendYield) ? `${(p.dividendYield * 100).toFixed(2)}%` : "—"
				},
				{
					k: "Beta",
					v: fmtN(p.beta, 2)
				},
				{
					k: "52-week",
					v: `${fmtN(p.low52)} – ${fmtN(p.high52)}`
				},
				{
					k: "Karyawan",
					v: p.employees ? fmtN(p.employees, 0) : "—"
				},
				{
					k: "Sektor",
					v: p.sector || "—"
				}
			]);
			setTape([
				`${qt.name} · ${qt.symbol} · ${qt.exchange}`,
				`Harga ${fmtN(qt.price)} ${qt.currency} (${fmtPct(qt.changePct)} hari ini)`,
				`12 bulan: return ${fmtPct(qt.return1y)} · low ${fmtN(qt.low1y)} · high ${fmtN(qt.high1y)}`,
				`Supply: ${fmtBig(p.sharesOutstanding)} lembar beredar, float ${fmtBig(p.floatShares)}`,
				`Kapitalisasi ${fmtBig(p.marketCap)} · PE ${fmtN(p.pe, 1)} · EPS ${fmtN(p.eps, 2)}`,
				p.industry ? `Industri ${p.industry}${p.city ? " · " + p.city : ""}` : "Profil publik siap",
				wiki?.title ? `Konteks: ${wiki.title}` : "Menyusun ulasan setahun…",
				"Menulis penjelasan rinci…"
			]);
			setOut(r.analysis);
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, { children: "Materi saham: supply, market cap, keuangan, pergerakan 12 bulan. Saat scan, log live muncul di bawah chart. Bukan nasihat beli/jual." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipRow, {
				items: [
					{
						id: "BBCA",
						label: "BBCA"
					},
					{
						id: "BBRI",
						label: "BBRI"
					},
					{
						id: "TLKM",
						label: "TLKM"
					},
					{
						id: "ASII",
						label: "ASII"
					},
					{
						id: "GOTO",
						label: "GOTO"
					},
					{
						id: "AAPL",
						label: "AAPL"
					},
					{
						id: "NVDA",
						label: "NVDA"
					}
				],
				value: q.toUpperCase(),
				onChange: (id) => {
					setQ(id);
					setSymbol(toTvSymbol(id));
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Ticker",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nx-input",
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "BBCA atau AAPL"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Fokus (opsional)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nx-input",
					value: question,
					onChange: (e) => setQuestion(e.target.value),
					placeholder: "Contoh: bagaimana supply dan laba setahun?"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				busy,
				onClick: scan,
				children: "Scan perusahaan 1 tahun"
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "nx-error",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteStrip, {
				symbol,
				extra: "CAPITAL AGENT"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TvChart, {
				symbol,
				height: 360
			}),
			tape.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveTape, {
				lines: tape,
				busy
			}) : null,
			metrics.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricGrid, { items: metrics }) : null,
			years.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nx-year-table",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "nx-tape-head",
					children: "KEUANGAN TAHUNAN"
				}), years.map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: y.year || "—" }),
					" · pendapatan ",
					fmtBig(y.revenue),
					" · laba bersih ",
					fmtBig(y.netIncome),
					Number.isFinite(y.grossProfit) && y.grossProfit ? ` · laba kotor ${fmtBig(y.grossProfit)}` : ""
				] }, y.year))]
			}) : null,
			summary ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nx-result",
				style: { whiteSpace: "pre-wrap" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "nx-tape-head",
					children: "PROFIL BISNIS"
				}), summary]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typewriter, { text: out }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				style: { marginTop: 14 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
					style: {
						cursor: "pointer",
						fontWeight: 700
					},
					children: "Glosarium saham"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "nx-result",
					children: GLOSSARY.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						style: { marginBottom: 8 },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [g.term, "."] }),
							" ",
							g.body
						]
					}, g.term))
				})]
			})
		]
	});
}
function DataHub() {
	const [amount, setAmount] = (0, import_react.useState)("100");
	const [from, setFrom] = (0, import_react.useState)("USD");
	const [to, setTo] = (0, import_react.useState)("IDR");
	const [fx, setFx] = (0, import_react.useState)("");
	const { busy, error, setError, run } = useBusy();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, { children: "Konversi kurs + chart forex TradingView. Sumber kurs: open.er-api.com." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nx-grid-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Jumlah",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "nx-input",
						value: amount,
						onChange: (e) => setAmount(e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Dari → ke",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: 8
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "nx-input",
							value: from,
							onChange: (e) => setFrom(e.target.value)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "nx-input",
							value: to,
							onChange: (e) => setTo(e.target.value)
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				busy,
				onClick: () => void run(async () => {
					const r = await convertFx({ data: {
						amount: Number(amount) || 0,
						from,
						to
					} });
					if (!r.ok) setError(r.error);
					else setFx(`${r.amount.toLocaleString("id-ID")} ${r.from} = ${r.result.toLocaleString("id-ID")} ${r.to} (kurs ${r.rate})`);
				}),
				children: "Konversi"
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "nx-error",
				children: error
			}) : null,
			fx ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "nx-ok",
				children: fx
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TvChart, {
				symbol: `FX_IDC:${from.toUpperCase()}${to.toUpperCase()}`,
				height: 360
			})
		]
	});
}
var CITIES = [
	{
		adm4: "31.71.03.1001",
		label: "Jakarta Pusat"
	},
	{
		adm4: "32.73.05.1001",
		label: "Bandung"
	},
	{
		adm4: "35.78.01.1001",
		label: "Surabaya"
	},
	{
		adm4: "34.71.01.1001",
		label: "Yogyakarta"
	},
	{
		adm4: "51.71.01.1001",
		label: "Denpasar"
	},
	{
		adm4: "12.71.01.1001",
		label: "Medan"
	},
	{
		adm4: "33.74.01.1001",
		label: "Semarang"
	},
	{
		adm4: "73.71.01.1001",
		label: "Makassar"
	},
	{
		adm4: "16.71.01.1001",
		label: "Palembang"
	},
	{
		adm4: "64.71.01.1001",
		label: "Balikpapan"
	},
	{
		adm4: "17.71.01.1001",
		label: "Bengkulu"
	}
];
function QuakeCard({ g, title }) {
	const map = g.Shakemap ? `https://data.bmkg.go.id/DataMKG/TEWS/${g.Shakemap}` : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "nx-quake",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: title }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"M",
				g.Magnitude,
				" · ",
				g.Kedalaman,
				" · ",
				g.Tanggal,
				" ",
				g.Jam
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: g.Wilayah }),
			g.Dirasakan ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Dirasakan: ", g.Dirasakan] }) : null,
			g.Potensi ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: g.Potensi }) : null,
			map ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: map,
				alt: "Peta guncangan BMKG"
			}) : null
		]
	});
}
function BmkgTool() {
	const [adm4, setAdm4] = (0, import_react.useState)(CITIES[0].adm4);
	const [auto, setAuto] = (0, import_react.useState)(null);
	const [felt, setFelt] = (0, import_react.useState)([]);
	const [m5, setM5] = (0, import_react.useState)([]);
	const [lokasi, setLokasi] = (0, import_react.useState)("");
	const [days, setDays] = (0, import_react.useState)([]);
	const { busy, error, setError, run } = useBusy();
	function loadAll() {
		run(async () => {
			const [quake, cuaca] = await Promise.all([fetchBmkg(), fetchBmkgWeather({ data: { adm4 } })]);
			const one = (v) => Array.isArray(v) ? v : v ? [v] : [];
			setAuto(one(quake.auto)[0] ?? null);
			setFelt(one(quake.felt).slice(0, 6));
			setM5(one(quake.m5).slice(0, 6));
			if (!cuaca.ok) setError(cuaca.error);
			else {
				const loc = cuaca.lokasi;
				setLokasi([
					loc.desa,
					loc.kecamatan,
					loc.kotkab,
					loc.provinsi
				].filter(Boolean).join(" · "));
				setDays(cuaca.days.map((slots, i) => ({
					label: slots[0]?.local_datetime ? new Date(slots[0].local_datetime.replace(" ", "T")).toLocaleDateString("id-ID", {
						weekday: "long",
						day: "numeric",
						month: "short"
					}) : `Hari ${i + 1}`,
					slots
				})));
			}
		});
	}
	(0, import_react.useEffect)(() => {
		loadAll();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, { children: "Sumber resmi BMKG: gempa auto, gempa dirasakan, M5+, dan prakiraan 3 harian per kelurahan. Bukan ramalan pihak ketiga." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipRow, {
				items: CITIES.map((c) => ({
					id: c.adm4,
					label: c.label
				})),
				value: adm4,
				onChange: setAdm4
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				busy,
				onClick: loadAll,
				children: "Muat data BMKG"
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "nx-error",
				children: error
			}) : null,
			auto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuakeCard, {
				g: auto,
				title: "Gempa terkini"
			}) : null,
			lokasi ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: { marginTop: 16 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					style: {
						fontFamily: "Orbitron,sans-serif",
						fontSize: 14
					},
					children: ["Prakiraan · ", lokasi]
				}), days.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { marginTop: 10 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: d.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "nx-forecast",
						children: d.slots.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "nx-forecast-card",
							children: [
								s.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: s.image,
									alt: "",
									width: 36,
									height: 36
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIcon, { name: "fa-cloud-sun" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: s.local_datetime.slice(11, 16) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.weather_desc }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									s.t,
									"°C · RH ",
									s.hu,
									"%"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									"Angin ",
									s.wd,
									" ",
									s.ws,
									" km/j"
								] })
							]
						}, s.local_datetime))
					})]
				}, d.label))]
			}) : null,
			felt.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: { marginTop: 18 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					style: {
						fontFamily: "Orbitron,sans-serif",
						fontSize: 14
					},
					children: "Gempa dirasakan"
				}), felt.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuakeCard, {
					g,
					title: `M${g.Magnitude}`
				}, i))]
			}) : null,
			m5.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: { marginTop: 18 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					style: {
						fontFamily: "Orbitron,sans-serif",
						fontSize: 14
					},
					children: "Gempa M5+"
				}), m5.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuakeCard, {
					g,
					title: `M${g.Magnitude}`
				}, i))]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: {
					marginTop: 14,
					fontSize: 11,
					color: "#6b8499"
				},
				children: "Sumber: BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)"
			})
		]
	});
}
function fmtDur(sec) {
	if (!sec) return "";
	const m = Math.floor(sec / 60);
	const s = sec % 60;
	return `${m}:${String(s).padStart(2, "0")}`;
}
function FreeMusicTool() {
	const [q, setQ] = (0, import_react.useState)("lofi");
	const [source, setSource] = (0, import_react.useState)("both");
	const [tracks, setTracks] = (0, import_react.useState)([]);
	const [current, setCurrent] = (0, import_react.useState)(null);
	const [lyrics, setLyrics] = (0, import_react.useState)("");
	const [lyricMeta, setLyricMeta] = (0, import_react.useState)("");
	const { busy, error, setError, run } = useBusy();
	const { busy: lyricBusy, run: runLyric } = useBusy();
	const audioSrc = current?.streamUrl ?? "";
	const search = () => void run(async () => {
		const r = await searchFreeMusic({ data: {
			q,
			source
		} });
		if (!r.ok) {
			setError(r.error);
			setTracks([]);
		} else {
			setTracks(r.tracks);
			setCurrent(r.tracks[0] ?? null);
			setLyrics("");
		}
	});
	const loadLyrics = (t) => void runLyric(async () => {
		const r = await fetchLyrics({ data: {
			q: `${t.artist} ${t.title}`,
			artist: t.artist,
			title: t.title
		} });
		if (!r.ok) setLyrics(r.error);
		else {
			setLyrics(r.lyrics);
			setLyricMeta(`${r.title} · ${r.artist}${r.album ? ` · ${r.album}` : ""}`);
		}
	});
	const extraFiles = (0, import_react.useMemo)(() => current, [current]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, { children: "Ketik judul atau mood. Musik dari Audius (gratis diputar) dan Internet Archive (berkas penuh, banyak CC/public domain). Bukan toko berbayar." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Cari lagu",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "nx-input",
					value: q,
					placeholder: "lofi, jazz, piano, rain…",
					onChange: (e) => setQ(e.target.value),
					onKeyDown: (e) => {
						if (e.key === "Enter") search();
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipRow, {
				items: [
					{
						id: "both",
						label: "Semua"
					},
					{
						id: "audius",
						label: "Audius"
					},
					{
						id: "archive",
						label: "Archive unduh penuh"
					}
				],
				value: source,
				onChange: (id) => setSource(id)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				busy,
				onClick: search,
				children: "Cari musik gratis"
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "nx-error",
				children: error
			}) : null,
			current ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nx-nowplay",
				children: [current.artwork ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: current.artwork,
					alt: ""
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "nx-nowplay-ph",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIcon, { name: "fa-music" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: current.title }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						current.artist,
						" ",
						fmtDur(current.duration) ? `· ${fmtDur(current.duration)}` : ""
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: current.license }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
						controls: true,
						preload: "none",
						src: audioSrc,
						style: {
							width: "100%",
							marginTop: 8
						}
					}, audioSrc),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "nx-chip-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "nx-btn",
								href: current.downloadUrl,
								download: true,
								target: "_blank",
								rel: "noreferrer",
								children: "Unduh audio"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
								ghost: true,
								busy: lyricBusy,
								onClick: () => loadLyrics(current),
								children: "Ambil lirik penuh"
							}),
							current.extraUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "nx-btn ghost",
								href: current.extraUrl,
								target: "_blank",
								rel: "noreferrer",
								children: "Sumber"
							}) : null
						]
					})
				] })]
			}) : null,
			lyrics ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nx-result",
				style: { whiteSpace: "pre-wrap" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						justifyContent: "space-between",
						gap: 8,
						marginBottom: 8
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: lyricMeta || "Lirik" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "nx-btn ghost",
						type: "button",
						onClick: () => downloadUrl(`data:text/plain;charset=utf-8,${encodeURIComponent(`${lyricMeta}\n\n${lyrics}`)}`, `${(current?.title || "lirik").replace(/\s+/g, "-")}-lirik.txt`),
						children: "Unduh lirik .txt"
					})]
				}), lyrics]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "nx-track-list",
				children: tracks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: `nx-track${current?.id === t.id ? " is-on" : ""}`,
					type: "button",
					onClick: () => {
						setCurrent(t);
						setLyrics("");
					},
					children: [t.artwork ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: t.artwork,
						alt: ""
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: t.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
						t.artist,
						" · ",
						t.source === "archive" ? "unduh penuh" : "stream gratis"
					] })] })]
				}, t.id))
			}),
			extraFiles?.source === "archive" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: {
					marginTop: 10,
					fontSize: 12,
					color: "#6b8499"
				},
				children: "Tombol Unduh audio mengambil berkas MP3 asli dari Internet Archive."
			}) : null
		]
	});
}
function renderTool(id) {
	switch (id) {
		case "aiodownloader": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Downloader, { hint: "Tempel link TikTok, YouTube, Instagram, atau Spotify." });
		case "terabox": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Downloader, { hint: "Tempel link share Terabox. Unduhan file besar tergantung ketersediaan host." });
		case "instagram": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Downloader, { hint: "Tempel URL reel/post Instagram." });
		case "tiktok": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Downloader, { hint: "Tempel URL TikTok. Provider tikwm dipakai jika tersedia." });
		case "youtube": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Downloader, { hint: "Tempel URL YouTube. Metadata oEmbed selalu dicoba." });
		case "spotify": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Downloader, { hint: "Tempel URL track/playlist Spotify." });
		case "htmlvideo": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HtmlVideo, {});
		case "avatarstudio": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarStudio, {});
		case "sertifikat": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CertTool, {});
		case "ektp": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EktpTool, {});
		case "fakelobby": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FakeLobby, {});
		case "winquotes": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WinQuotes, {});
		case "nokiamsg": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NokiaMsg, {});
		case "mltools": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MlTools, {});
		case "comicreader": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComicReader, {});
		case "multiai": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiChatTool, {
			title: "FAHMI Multi-AI",
			system: "Kamu hub AI FAHMI. Jawab dengan struktur: Ringkas, Langkah, Risiko."
		});
		case "aiimage": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiImageTool, {});
		case "aivideo": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiImageTool, { prefix: "cinematic storyboard still, 16:9, motion implied, " });
		case "genmail": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenMail, {});
		case "danbooru": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DanbooruTool, {});
		case "animegallery": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimeDiscover, {});
		case "animetoreal": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiImageTool, { prefix: "photorealistic reinterpretation of an anime still, natural skin, photography, " });
		case "aisong": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiChatTool, {
			title: "AI Song",
			system: "Tuliskan judul, mood, struktur verse/chorus, dan lirik lengkap bilingual."
		});
		case "elevenlabs": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceStudio, {});
		case "promptgenerate": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptVision, {});
		case "novelcover": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiImageTool, { prefix: "premium novel cover, typography space at top, painted, dramatic lighting, " });
		case "fakeovo": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FakeOvo, {});
		case "quotegenerator": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteTool, {});
		case "carifakta": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiChatTool, {
			title: "CariFakta",
			system: "Analisis klaim: ringkas klaim, bukti yang perlu dicek, kemungkinan bias, verdik tentatif."
		});
		case "virusscan": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VirusScan, {});
		case "cryptomarket": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CryptoTool, {});
		case "cryptoanalisa": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CryptoAnalisa, {});
		case "marketpulse": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketPulse, {});
		case "sahamdesk": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SahamDesk, {});
		case "capitalagent": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CapitalAgent, {});
		case "datahub": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataHub, {});
		case "freemusic": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FreeMusicTool, {});
		case "webintel": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebIntel, {});
		case "ipintel": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IpTool, {});
		case "bmkg": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BmkgTool, {});
		case "spaceexplorer": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpaceTool, {});
		case "ocrintel": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptVision, {});
		case "documentai": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiChatTool, {
			title: "Document AI",
			system: "Ringkas dokumen user, ekstrak poin, tabel, dan pertanyaan lanjutan."
		});
		case "autopdf": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AutoPdf, {});
		case "pdflab": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PdfLab, {});
		case "svgalight": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgAlight, {});
		case "alightpremium": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlightPack, { kind: "alightpremium" });
		case "imagevectorizer": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vectorizer, {});
		case "fotolink": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FotoLink, {});
		case "smartcutout": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartCutout, {});
		case "placeholderstudio": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderStudio, {});
		case "text2d": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlightPack, { kind: "text2d" });
		case "text3d": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlightPack, { kind: "text3d" });
		case "textfxanimation": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlightPack, { kind: "textfxanimation" });
		case "textvector": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlightPack, { kind: "textvector" });
		case "trimpath": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlightPack, { kind: "trimpath" });
		case "logoanimate": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlightPack, { kind: "logoanimate" });
		case "calc": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalcTool, {});
		case "pwgen": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PwGenTool, {});
		case "morse": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MorseTool, {});
		case "removebg": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RemoveBg, {});
		case "enhancer": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Enhancer, {});
		case "worldclassics": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Classics, {});
		case "ttquote": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TikTokQuote, {});
		case "qrgen": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrTool, {});
		case "tiktokhd": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TiktokHdPrep, {});
		case "getcode": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GetCode, {});
		case "vdeploy": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeployCheck, {});
		case "zxvai": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiChatTool, {
			title: "ZxVAI",
			system: "Kamu ZxVAI, workspace AI FAHMI yang tajam dan teknis."
		});
		case "webencryption": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebEncrypt, {});
		case "unbanwa": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnbanWa, {});
		default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Tool tidak ditemukan." });
	}
}
function ToolPage() {
	const { id } = Route$1.useParams();
	const tool = getTool(id);
	if (!tool) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-room",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Tool tidak ada." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "nx-back",
			children: "Kembali"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackgroundGlow, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FreeMark, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "nx-room",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "nx-room-head",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "nx-back",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIcon, { name: "fa-arrow-left" }), " Kembali"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "nx-room-title",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: tool.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								tool.badge,
								" · ",
								tool.format
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "badge",
							style: { marginLeft: "auto" },
							children: "FREE"
						})
					]
				}),
				renderTool(tool.id),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "nx-lead",
					style: { marginTop: 16 },
					children: [tool.description, " Semua tool di katalog ini gratis dan tidak minta login."]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiDock, {})
	] });
}
//#endregion
export { ToolPage as component };
