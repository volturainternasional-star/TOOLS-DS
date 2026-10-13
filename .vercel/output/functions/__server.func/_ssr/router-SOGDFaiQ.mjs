import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react, _ as createFileRoute, b as useNavigate, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRoute, x as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as createServerFn } from "./ssr.mjs";
import { r as createSsrRpc, t as askFahmiAi } from "./ai-CiRVoIuu.mjs";
import { t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-SOGDFaiQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-w_32Swgb.css";
var APP_NAME = "All Tools FAHMI";
var Route$6 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#04111c"
			},
			{
				name: "description",
				content: "All Tools FAHMI — kumpulan downloader, maker, AI, dan utilitas web dalam satu tempat."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;800&family=Poppins:wght@400;500;600;700;800&display=swap"
			},
			{
				rel: "stylesheet",
				href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "id",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$4 = () => import("./routes-hXtmojRv.mjs");
var Route$5 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
function FaIcon({ name, className }) {
	const cls = name.includes("fa-brands") ? name : `fa-solid ${name}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
		className: `${cls} ${className ?? ""}`,
		"aria-hidden": "true"
	});
}
var lookupIp = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("e748f3fb3949a29b17d8afff6a4d674a13d23d4aa384cc2d20be77ce4958e929"));
var fetchApod = createServerFn({ method: "GET" }).handler(createSsrRpc("1eeb6bbcac0279a1fd51654bc239d1293e99f9aefc7ab22af4a028b51db905ac"));
var fetchBmkg = createServerFn({ method: "GET" }).handler(createSsrRpc("74f92232e697f7669da36b4bbdca779119b582535aed4423f065d51125c9cd89"));
var fetchBmkgWeather = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("ebe1828616827f2f8ab2a5dac1ac03a515b27873d1e7e42d353f15dbe9582125"));
var searchFreeMusic = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("423b8009bf5339e5adc1469bc0f67b79f910138428db570c19e43635cde39c81"));
var fetchLyrics = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("96f825edcd1907ac22251b256312fc3fb6f46eb7244a8f61b450ee7b3dc60155"));
var fetchWaifu = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("66c411b63b1ad8b0dbd3ab147de49e48f78144aa2c57402f044b008bfa716490"));
var searchDanbooru = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("0d8eca10a60a53f5eecc7164ebb09c90856260c9857b88ccc6e5324c96886dad"));
var searchManga = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("0f6540b393f8386018486e7141515438cb78147f8290f7d43e85564996eecd60"));
var mangaFeed = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("ce8e4799a5987608e07019db50af270e17ea7289c24848740476bccb90a615b3"));
var mangaPages = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("b8d160183f1e46d9f298e036da617300f8f3747b6a60b975e2ccc96eceda4072"));
var downloadMedia = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("c5a480fcd9094df0b9c4c9d1434e5e95948ba07cae5e017c3c111e0c46115e86"));
var fetchPageSource = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("3fd9b7171a648eabcaf9db5bf03b57a3a225327bc1ecf0194ba67c274fff9a98"));
var inspectUrl = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("3b874c7c4308e2716005df046be0c289febe0df60a60aa03f2ffdb44b6ac97a2"));
var tempMail = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("da78cb4e46a95a4f87abbc1c9d9d96587e8cf697f883ddc7c06f04cb66fc6167"));
function detectDevice() {
	if (typeof navigator === "undefined") return {
		device: "—",
		browser: "—"
	};
	const ua = navigator.userAgent;
	let device = "Desktop";
	if (/iPhone|iPad/.test(ua)) device = "iOS";
	else if (/Android/.test(ua)) device = "Android";
	else if (/Macintosh/.test(ua)) device = "macOS";
	else if (/Windows/.test(ua)) device = "Windows";
	else if (/Linux/.test(ua)) device = "Linux";
	let browser = "Browser";
	if (/Edg\//.test(ua)) browser = "Edge";
	else if (/Chrome\//.test(ua)) browser = "Chrome";
	else if (/Safari\//.test(ua) && !/Chrome/.test(ua)) browser = "Safari";
	else if (/Firefox\//.test(ua)) browser = "Firefox";
	return {
		device,
		browser
	};
}
var HKEY = "fahmi.dl.history";
function loadHistory() {
	try {
		return JSON.parse(localStorage.getItem(HKEY) || "[]");
	} catch {
		return [];
	}
}
function pushHistory(item) {
	const next = [{
		...item,
		id: crypto.randomUUID(),
		at: Date.now()
	}, ...loadHistory()].slice(0, 40);
	localStorage.setItem(HKEY, JSON.stringify(next));
	return next;
}
function clearHistory() {
	localStorage.removeItem(HKEY);
}
var MKEY = "fahmi.mode.v1";
function loadMode() {
	if (typeof window === "undefined") return "full";
	try {
		const v = localStorage.getItem(MKEY);
		if (v === "standard" || v === "pulse" || v === "full") return v;
	} catch {}
	return "full";
}
function saveMode(mode) {
	localStorage.setItem(MKEY, mode);
	document.documentElement.dataset.nxMode = mode;
	window.dispatchEvent(new Event("fahmi-mode"));
}
var TABS = [
	{
		id: "all",
		label: "All",
		icon: "fa-th-large"
	},
	{
		id: "downloader",
		label: "Downloader",
		icon: "fa-download"
	},
	{
		id: "maker",
		label: "Maker",
		icon: "fa-wand-magic-sparkles"
	},
	{
		id: "tools",
		label: "Tools",
		icon: "fa-screwdriver-wrench"
	},
	{
		id: "visuals",
		label: "Visual",
		icon: "fa-sparkles"
	},
	{
		id: "vault",
		label: "Vault",
		icon: "fa-archive"
	},
	{
		id: "external",
		label: "External",
		icon: "fa-link"
	}
];
var TOOLS = [
	{
		id: "comicreader",
		name: "Baca Komik Full",
		description: "Manga, manhwa, manhua + reader",
		badge: "FULL",
		icon: "fa-book-open-reader",
		category: "tools",
		format: "UTILITY",
		rgb: "248,113,113"
	},
	{
		id: "avatarstudio",
		name: "FAHMI Avatar Studio",
		description: "Buat avatar SVG unik dengan puluhan style dan editor visual.",
		badge: "SVG",
		icon: "fa-user-astronaut",
		category: "maker",
		format: "CREATE",
		rgb: "59,130,246"
	},
	{
		id: "htmlvideo",
		name: "HTML / WebGL to MP4",
		description: "Ubah animasi HTML, CSS, JS, dan WebGL menjadi rekaman 8 detik.",
		badge: "LOCAL MP4",
		icon: "fa-film",
		category: "maker",
		format: "CREATE",
		rgb: "56,189,248"
	},
	{
		id: "instagram",
		name: "Instagram",
		description: "Download video & foto",
		badge: "HD",
		icon: "fa-brands fa-instagram",
		category: "downloader",
		format: "MEDIA",
		rgb: "244,114,182"
	},
	{
		id: "tiktok",
		name: "TikTok",
		description: "Video, foto & audio",
		badge: "MP4/MP3/JPG",
		icon: "fa-brands fa-tiktok",
		category: "downloader",
		format: "MEDIA",
		rgb: "125,211,252"
	},
	{
		id: "youtube",
		name: "YouTube Downloader",
		description: "Resolusi video dan audio dari provider",
		badge: "MP4/MP3",
		icon: "fa-brands fa-youtube",
		category: "downloader",
		format: "MEDIA",
		rgb: "248,113,113"
	},
	{
		id: "spotify",
		name: "Spotify Downloader",
		description: "Audio provider dengan fallback resmi",
		badge: "MP3",
		icon: "fa-brands fa-spotify",
		category: "downloader",
		format: "MEDIA",
		rgb: "52,211,153"
	},
	{
		id: "fakelobby",
		name: "Fake Lobby",
		description: "FF & ML lobby palsu untuk screenshot meme",
		badge: "GAME",
		icon: "fa-gamepad",
		category: "maker",
		format: "CREATE",
		rgb: "251,146,60"
	},
	{
		id: "aiimage",
		name: "FAHMI AI Image",
		description: "Buat gambar AI dari prompt",
		badge: "IMAGINE",
		icon: "fa-paintbrush",
		category: "tools",
		format: "AI",
		rgb: "56,189,248"
	},
	{
		id: "sertifikat",
		name: "Sertifikat Meme",
		description: "Sertifikat meme kustom — watermark simulasi, bukan dokumen resmi",
		badge: "ORIGINAL",
		icon: "fa-certificate",
		category: "maker",
		format: "CREATE",
		rgb: "251,191,36"
	},
	{
		id: "ektp",
		name: "E-KTP Generator",
		description: "Kartu demo full form — watermark permanen, bukan dokumen resmi",
		badge: "DEMO",
		icon: "fa-id-card",
		category: "maker",
		format: "CREATE",
		rgb: "148,163,184"
	},
	{
		id: "winquotes",
		name: "Windows Quotes",
		description: "Quote ala Windows — 2 style",
		badge: "2 STYLE",
		icon: "fa-brands fa-windows",
		category: "maker",
		format: "CREATE",
		rgb: "96,165,250"
	},
	{
		id: "aivideo",
		name: "FAHMI AI Video Generator",
		description: "Storyboard video dari prompt (klip singkat)",
		badge: "AI VIDEO",
		icon: "fa-clapperboard",
		category: "tools",
		format: "AI",
		rgb: "251,113,133"
	},
	{
		id: "genmail",
		name: "GenMail",
		description: "Buat email sementara, periksa inbox, dan baca pesan",
		badge: "TEMP MAIL",
		icon: "fa-envelope-open-text",
		category: "tools",
		format: "UTILITY",
		rgb: "52,211,153"
	},
	{
		id: "danbooru",
		name: "Danbooru Search",
		description: "Cari ilustrasi berdasarkan tag (rating aman default)",
		badge: "SAFE DEFAULT",
		icon: "fa-photo-film",
		category: "tools",
		format: "UTILITY",
		rgb: "251,146,60"
	},
	{
		id: "animegallery",
		name: "FAHMI Anime Discover",
		description: "Visual discovery SFW dari Waifu.im",
		badge: "NEW · SFW",
		icon: "fa-images",
		category: "tools",
		format: "UTILITY",
		rgb: "125,211,252"
	},
	{
		id: "animetoreal",
		name: "Anime to Real",
		description: "Ubah ilustrasi menjadi gaya realistis dengan AI",
		badge: "AI TRANSFORM",
		icon: "fa-person-rays",
		category: "tools",
		format: "AI",
		rgb: "59,130,246"
	},
	{
		id: "aisong",
		name: "FAHMI AI Song Generator",
		description: "Ubah ide menjadi lirik, struktur, dan mood lagu",
		badge: "AI MUSIC",
		icon: "fa-music",
		category: "tools",
		format: "AI",
		rgb: "56,189,248"
	},
	{
		id: "elevenlabs",
		name: "FAHMI Voice Studio",
		description: "Text to Speech dengan suara ekspresif",
		badge: "AUDIO AI",
		icon: "fa-wave-square",
		category: "tools",
		format: "AI",
		rgb: "125,211,252"
	},
	{
		id: "promptgenerate",
		name: "FAHMI Prompt Generator",
		description: "Analisis gambar menjadi prompt produksi profesional",
		badge: "VISION AI",
		icon: "fa-pen-ruler",
		category: "tools",
		format: "AI",
		rgb: "125,211,252"
	},
	{
		id: "novelcover",
		name: "FAHMI Novel Cover Generator",
		description: "AI Cover Director untuk artwork dan tipografi novel",
		badge: "COVER",
		icon: "fa-book-atlas",
		category: "tools",
		format: "AI",
		rgb: "251,191,36"
	},
	{
		id: "fakeovo",
		name: "Fake OVO",
		description: "Simulasi saldo OVO dengan watermark permanen",
		badge: "SIMULASI",
		icon: "fa-wallet",
		category: "maker",
		format: "CREATE",
		rgb: "59,130,246"
	},
	{
		id: "quotegenerator",
		name: "Quote Generator",
		description: "Buat gambar quote monokrom",
		badge: "JPG",
		icon: "fa-quote-left",
		category: "tools",
		format: "CREATE",
		rgb: "226,232,240"
	},
	{
		id: "carifakta",
		name: "CariFakta",
		description: "Analisis klaim dan berita menggunakan AI",
		badge: "AI",
		icon: "fa-magnifying-glass-chart",
		category: "tools",
		format: "AI",
		rgb: "56,189,248"
	},
	{
		id: "virusscan",
		name: "Virus Scan",
		description: "Scan URL, hash, domain & IP (heuristik + header)",
		badge: "SECURITY",
		icon: "fa-shield-virus",
		category: "tools",
		format: "UTILITY",
		rgb: "248,113,113"
	},
	{
		id: "cryptomarket",
		name: "TradingView Market",
		description: "Chart TradingView untuk kripto — ketik simbol, tanpa CoinGecko.",
		badge: "TV",
		icon: "fa-chart-line",
		category: "tools",
		format: "MARKET",
		rgb: "52,211,153"
	},
	{
		id: "cryptoanalisa",
		name: "Crypto Analisa",
		description: "Scan koin 1 tahun: return, high/low, volume, teks live, dan ulasan edukatif.",
		badge: "1Y SCAN",
		icon: "fa-chart-area",
		category: "tools",
		format: "AI",
		rgb: "56,189,248"
	},
	{
		id: "marketpulse",
		name: "Market Pulse",
		description: "IHSG, blue chip BEI, S&P, emas, minyak, kurs di chart TradingView.",
		badge: "LIVE",
		icon: "fa-heartbeat",
		category: "tools",
		format: "MARKET",
		rgb: "56,189,248"
	},
	{
		id: "sahamdesk",
		name: "Saham Desk",
		description: "Cari ticker BEI/AS, chart TradingView, lalu scan 1 tahun dengan teks live di bawah.",
		badge: "IDX",
		icon: "fa-building-columns",
		category: "tools",
		format: "MARKET",
		rgb: "96,165,250"
	},
	{
		id: "capitalagent",
		name: "Capital Agent",
		description: "Materi saham 1 tahun: supply, keuangan, market cap, scan live, dan ulasan rinci. Bukan nasihat beli.",
		badge: "1Y",
		icon: "fa-magnifying-glass-chart",
		category: "tools",
		format: "AI",
		rgb: "59,130,246"
	},
	{
		id: "datahub",
		name: "Data Hub",
		description: "Konversi kurs dan chart forex TradingView dalam satu meja.",
		badge: "FX",
		icon: "fa-table",
		category: "tools",
		format: "UTILITY",
		rgb: "125,211,252"
	},
	{
		id: "freemusic",
		name: "Free Music + Lirik",
		description: "Ketik judul, cari musik gratis, putar, unduh audio, dan lirik penuh.",
		badge: "FREE",
		icon: "fa-music",
		category: "downloader",
		format: "MEDIA",
		rgb: "52,211,153"
	},
	{
		id: "webintel",
		name: "FAHMI Web Intelligence",
		description: "Audit SEO dasar, header security, dan teknologi website",
		badge: "INTEL",
		icon: "fa-satellite-dish",
		category: "tools",
		format: "UTILITY",
		rgb: "125,211,252"
	},
	{
		id: "ipintel",
		name: "IP & ASN Intelligence",
		description: "Lookup IPv4/IPv6, organisasi, negara dan ISP",
		badge: "IPINFO",
		icon: "fa-network-wired",
		category: "tools",
		format: "UTILITY",
		rgb: "96,165,250"
	},
	{
		id: "bmkg",
		name: "BMKG Indonesia",
		description: "Gempa terkini, dirasakan, M5+, dan prakiraan cuaca 3 hari resmi BMKG.",
		badge: "BMKG",
		icon: "fa-cloud-sun-rain",
		category: "tools",
		format: "UTILITY",
		rgb: "56,189,248"
	},
	{
		id: "spaceexplorer",
		name: "Space Explorer",
		description: "APOD NASA, asteroid dekat Bumi",
		badge: "NASA",
		icon: "fa-user-astronaut",
		category: "tools",
		format: "UTILITY",
		rgb: "129,140,248"
	},
	{
		id: "ocrintel",
		name: "FAHMI OCR Intelligence",
		description: "Ekstrak teks dari gambar dengan vision AI",
		badge: "OCR",
		icon: "fa-file-lines",
		category: "tools",
		format: "AI",
		rgb: "125,211,252"
	},
	{
		id: "documentai",
		name: "FAHMI Document AI",
		description: "Ringkas, analisis, dan tanya isi dokumen",
		badge: "AI",
		icon: "fa-file-circle-question",
		category: "tools",
		format: "AI",
		rgb: "59,130,246"
	},
	{
		id: "autopdf",
		name: "FAHMI Auto PDF",
		description: "Ubah teks panjang menjadi halaman A5 siap cetak",
		badge: "PDF",
		icon: "fa-file-pdf",
		category: "tools",
		format: "UTILITY",
		rgb: "248,113,113"
	},
	{
		id: "pdflab",
		name: "PDF Lab Local",
		description: "Merge daftar halaman, watermark, dan metadata di browser",
		badge: "100% LOCAL",
		icon: "fa-layer-group",
		category: "tools",
		format: "UTILITY",
		rgb: "251,146,60"
	},
	{
		id: "svgalight",
		name: "SVG → Alight XML",
		description: "Konversi SVG ke XML Alight Motion",
		badge: "ENGINE",
		icon: "fa-bezier-curve",
		category: "tools",
		format: "CREATE",
		rgb: "56,189,248"
	},
	{
		id: "alightpremium",
		name: "Alight Motion XML Pack",
		description: "Preset XML 1 tahun-style: teks, logo, transisi",
		badge: "PRESET",
		icon: "fa-clapperboard",
		category: "tools",
		format: "CREATE",
		rgb: "244,114,182"
	},
	{
		id: "imagevectorizer",
		name: "AUTO TRACE",
		description: "Trace gambar menjadi SVG vector (mode poster)",
		badge: "DUAL SVG",
		icon: "fa-vector-square",
		category: "tools",
		format: "CREATE",
		rgb: "125,211,252"
	},
	{
		id: "fotolink",
		name: "Foto To Link",
		description: "Ubah gambar menjadi data URL / unduhan lokal",
		badge: "NO API KEY",
		icon: "fa-link",
		category: "tools",
		format: "UTILITY",
		rgb: "52,211,153"
	},
	{
		id: "smartcutout",
		name: "FAHMI Smart Cutout",
		description: "Tap background, refine mask, ekspor PNG transparan",
		badge: "LOCAL AI",
		icon: "fa-scissors",
		category: "tools",
		format: "CREATE",
		rgb: "59,130,246"
	},
	{
		id: "placeholderstudio",
		name: "FAHMI Placeholder Studio",
		description: "Buat placeholder Classic berbasis ukuran dan warna",
		badge: "NO API KEY",
		icon: "fa-image",
		category: "tools",
		format: "CREATE",
		rgb: "148,163,184"
	},
	{
		id: "text2d",
		name: "2D Text Animate / Text FX",
		description: "Buat XML animasi teks 2D dengan preset",
		badge: "XML",
		icon: "fa-font",
		category: "tools",
		format: "CREATE",
		rgb: "125,211,252"
	},
	{
		id: "text3d",
		name: "3D Text Animate",
		description: "XML teks 3D, extrude, offset, dan long shadow",
		badge: "7 PRESET",
		icon: "fa-cubes",
		category: "tools",
		format: "CREATE",
		rgb: "56,189,248"
	},
	{
		id: "textfxanimation",
		name: "Text FX Animation",
		description: "Preset efek teks native untuk Alight Motion",
		badge: "5 PRESET",
		icon: "fa-text-height",
		category: "tools",
		format: "CREATE",
		rgb: "244,114,182"
	},
	{
		id: "textvector",
		name: "Text to Vector",
		description: "Ubah teks menjadi path SVG vector",
		badge: "OPENTYPE",
		icon: "fa-draw-polygon",
		category: "tools",
		format: "CREATE",
		rgb: "125,211,252"
	},
	{
		id: "trimpath",
		name: "Trimpath Generator",
		description: "Generator trimpath huruf dengan timing",
		badge: "LOCAL XML",
		icon: "fa-route",
		category: "tools",
		format: "CREATE",
		rgb: "56,189,248"
	},
	{
		id: "logoanimate",
		name: "Logo Animate",
		description: "Template animasi logo dan text block",
		badge: "8.33S",
		icon: "fa-shapes",
		category: "tools",
		format: "CREATE",
		rgb: "251,191,36"
	},
	{
		id: "calc",
		name: "Calculator",
		description: "Hitung cepat",
		badge: "MATH",
		icon: "fa-calculator",
		category: "tools",
		format: "UTILITY",
		rgb: "226,232,240"
	},
	{
		id: "pwgen",
		name: "Password Gen",
		description: "Password aman",
		badge: "SECURE",
		icon: "fa-key",
		category: "tools",
		format: "UTILITY",
		rgb: "52,211,153"
	},
	{
		id: "morse",
		name: "Morse Code",
		description: "Konversi morse + audio",
		badge: "AUDIO",
		icon: "fa-tower-broadcast",
		category: "tools",
		format: "UTILITY",
		rgb: "125,211,252"
	},
	{
		id: "removebg",
		name: "Remove BG",
		description: "Hapus background dengan flood-fill lokal",
		badge: "LOCAL",
		icon: "fa-eraser",
		category: "tools",
		format: "CREATE",
		rgb: "244,114,182"
	},
	{
		id: "enhancer",
		name: "Upscale Image / HD Enhancer",
		description: "Perbesar gambar 2× dengan interpolasi tajam",
		badge: "UPSCALE",
		icon: "fa-sliders",
		category: "tools",
		format: "CREATE",
		rgb: "59,130,246"
	},
	{
		id: "worldclassics",
		name: "World Classics Reader",
		description: "Sastra klasik dengan terjemahan ringkas Indonesia",
		badge: "NEW",
		icon: "fa-book-open",
		category: "tools",
		format: "UTILITY",
		rgb: "251,191,36"
	},
	{
		id: "ttquote",
		name: "Quote TikTok FAHMI",
		description: "Buat fake TikTok chat versi FAHMI",
		badge: "FAHMI",
		icon: "fa-comment-dots",
		category: "vault",
		format: "CREATE",
		rgb: "56,189,248"
	},
	{
		id: "qrgen",
		name: "QR Generator",
		description: "Buat QR langsung di sini",
		badge: "QR",
		icon: "fa-qrcode",
		category: "vault",
		format: "UTILITY",
		rgb: "226,232,240"
	},
	{
		id: "tiktokhd",
		name: "Upload TikTok HD",
		description: "Encoder lokal: siapkan video vertikal 1080p",
		badge: "HD",
		icon: "fa-upload",
		category: "external",
		format: "MEDIA",
		rgb: "125,211,252"
	},
	{
		id: "getcode",
		name: "Get Code HTML",
		description: "Extract, preview, copy & download source",
		badge: "PRO",
		icon: "fa-code",
		category: "external",
		format: "UTILITY",
		rgb: "56,189,248"
	},
	{
		id: "vdeploy",
		name: "Deploy Checklist",
		description: "Checklist rilis web: domain, OG, PWA, performa",
		badge: "UPDATE",
		icon: "fa-rocket",
		category: "external",
		format: "UTILITY",
		rgb: "251,146,60"
	},
	{
		id: "zxvai",
		name: "ZxVAI",
		description: "Workspace AI internal FAHMI",
		badge: "AI",
		icon: "fa-robot",
		category: "external",
		format: "AI",
		rgb: "59,130,246"
	},
	{
		id: "webencryption",
		name: "Web Encryption",
		description: "Encrypt & protect HTML",
		badge: "SECURE",
		icon: "fa-lock",
		category: "external",
		format: "UTILITY",
		rgb: "52,211,153"
	},
	{
		id: "unbanwa",
		name: "Unban WhatsApp",
		description: "Panduan banding resmi WhatsApp — bukan jasa unban",
		badge: "WA",
		icon: "fa-brands fa-whatsapp",
		category: "external",
		format: "UTILITY",
		rgb: "52,211,153"
	}
];
function toolsByTab(tab) {
	if (tab === "all" || tab === "visuals") return TOOLS;
	return TOOLS.filter((t) => t.category === tab);
}
function getTool(id) {
	return TOOLS.find((t) => t.id === id);
}
var ACCESS = {
	label: "FULL FREE",
	note: "Semua tool terbuka. Tanpa login, tanpa bayar."
};
function BackgroundGlow() {
	const [mode, setMode] = (0, import_react.useState)("full");
	(0, import_react.useEffect)(() => {
		const sync = () => {
			const next = loadMode();
			setMode(next);
			document.documentElement.dataset.nxMode = next;
		};
		sync();
		window.addEventListener("fahmi-mode", sync);
		return () => window.removeEventListener("fahmi-mode", sync);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `bg-glow is-${mode}`,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "nx-membrane nx-membrane-a" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "nx-membrane nx-membrane-b" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "nx-membrane nx-membrane-c" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "nx-atmosphere" }),
			mode !== "standard" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "nx-scanlines" }) : null
		]
	});
}
function ModeBar({ mode, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-mode",
		role: "group",
		"aria-label": "Display mode",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "DISPLAY MODE" }),
			[
				{
					id: "standard",
					label: "Standard"
				},
				{
					id: "pulse",
					label: "Pulse"
				},
				{
					id: "full",
					label: "Full"
				}
			].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: mode === item.id ? "is-on" : "",
				onClick: () => onChange(item.id),
				children: item.label
			}, item.id)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: ACCESS.label })
		]
	});
}
function TopNav() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "nx-top-nav-block",
		"aria-label": "Navigasi tambahan",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "nx-top-nav-inner",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nx-top-nav-copy",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "nx-top-nav-mark",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIcon, { name: "fa-compass" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "nx-top-nav-text",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Menu Informasi" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Full Mode · About Dev · Report Bug" })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: { position: "relative" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "nx-menu-btn",
					type: "button",
					"aria-label": "Buka menu FAHMI",
					onClick: () => setOpen((v) => !v),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
				}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "nx-menu-panel",
					"aria-label": "Menu FAHMI",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "nx-menu-title",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "FAHMI MENU" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Gratis, efek, dan masukan" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "nx-online",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), " ONLINE"]
						})]
					}), [
						{
							to: "/vvip",
							rgb: "125,211,252",
							icon: "fa-bolt",
							title: "Full Mode · Gratis",
							sub: ACCESS.note
						},
						{
							to: "/about",
							rgb: "56,189,248",
							icon: "fa-user-astronaut",
							title: "About Dev",
							sub: "Profil developer, toolkit, playlist, dan project."
						},
						{
							to: "/feedback",
							rgb: "103,232,249",
							icon: "fa-lightbulb",
							title: "Report Bug, Saran & Ide",
							sub: "Laporkan bug, kirim saran, dan ide fitur."
						}
					].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "nx-menu-item",
						style: { ["--nx-menu-rgb"]: item.rgb },
						type: "button",
						onClick: () => {
							setOpen(false);
							navigate({ to: item.to });
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "nx-menu-item-icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIcon, { name: item.icon })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.sub })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIcon, { name: "fa-arrow-right" })
						]
					}, item.to))]
				}) : null]
			})]
		})
	});
}
function Hero() {
	const [ok, setOk] = (0, import_react.useState)(true);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "video-banner",
		"data-nx-hero": true,
		children: [ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
			"aria-hidden": "true",
			autoPlay: true,
			muted: true,
			loop: true,
			playsInline: true,
			preload: "metadata",
			src: "https://files.catbox.moe/4ijdle.mp4",
			onError: () => setOk(false)
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "nx-hero-fallback" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "video-overlay",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nx-hero-meta",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
					className: "nx-online",
					style: {
						width: 6,
						height: 6,
						display: "inline-block",
						borderRadius: 99,
						background: "#6ee7b7"
					}
				}), " LIVE REACTOR"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "FAHMI SYSTEM · 06" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/favicon.svg",
					alt: "Logo FAHMI",
					width: 54,
					height: 54
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "All Tools FAHMI" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "nx-owner",
					children: "FAHMI"
				})
			] })]
		})]
	});
}
function SessionCard() {
	const [country, setCountry] = (0, import_react.useState)("—");
	const [battery, setBattery] = (0, import_react.useState)(null);
	const [device, setDevice] = (0, import_react.useState)("—");
	const [browser, setBrowser] = (0, import_react.useState)("—");
	(0, import_react.useEffect)(() => {
		const d = detectDevice();
		setDevice(d.device);
		setBrowser(d.browser);
		lookupIp({ data: {} }).then((r) => {
			if (r.ok) {
				const data = r.data;
				setCountry(data.country ? `${data.country} (${data.country_code ?? ""})` : "—");
			}
		});
		navigator.getBattery?.().then((b) => {
			const sync = () => setBattery(Math.round(b.level * 100));
			sync();
			b.addEventListener("levelchange", sync);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "user-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "nx-session-brand",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "user-avatar",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIcon, { name: "fa-fingerprint" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SESSION MATRIX" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "System Identity" })] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "user-info",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "item",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIcon, { name: "fa-globe" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "label",
							children: "Negara"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "value",
							children: country
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "item",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIcon, { name: "fa-mobile-screen" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "label",
							children: "Device"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "value",
							children: device
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "item",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIcon, { name: "fa-globe" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "label",
							children: "Browser"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "value",
							children: browser
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "item",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIcon, { name: "fa-signal" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "label",
							children: "Status"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "value online",
							children: "ONLINE"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "item",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "battery-bar",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIcon, { name: "fa-battery-three-quarters" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "level",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "fill",
									style: { width: `${battery ?? 0}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "perc",
								children: battery == null ? "—" : `${battery}%`
							})
						]
					})
				})
			]
		})]
	});
}
function FreeMark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-free-mark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIcon, { name: "fa-unlock" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "FULL · GRATIS" })]
	});
}
var SUGGESTIONS = [
	"Tool apa yang paling berguna hari ini?",
	"Buatkan prompt gambar cyberpunk",
	"Cara pakai SVG ke Alight Motion",
	"Ringkas berita teknologi"
];
function AiDock() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [input, setInput] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [messages, setMessages] = (0, import_react.useState)([{
		role: "assistant",
		content: "FAHMI AI online. Tanya tool, downloader, maker, atau ide visual."
	}]);
	async function send(text) {
		const prompt = text.trim();
		if (!prompt || busy) return;
		const next = [...messages, {
			role: "user",
			content: prompt
		}];
		setMessages(next);
		setInput("");
		setBusy(true);
		const res = await askFahmiAi({ data: { messages: next } });
		setMessages([...next, {
			role: "assistant",
			content: res.ok ? res.text : res.error
		}]);
		setBusy(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		className: "nx-ai-launcher",
		type: "button",
		onClick: () => setOpen(true),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "nx-ai-launcher-orb",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIcon, { name: "fa-wand-magic-sparkles" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "nx-ai-launcher-copy",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "FAHMI AI" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Personal AI" })]
		})]
	}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "nx-ai-panel",
		role: "dialog",
		"aria-label": "Personal AI FAHMI",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "nx-ai-head",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "nx-ai-avatar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIcon, { name: "fa-wand-magic-sparkles" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "nx-ai-identity",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "FAHMI AI" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Personal intelligence · Liquid Reactor" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "nx-online",
								style: { marginTop: 4 },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), " ONLINE"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "nx-icon-btn",
						type: "button",
						"aria-label": "Percakapan baru",
						onClick: () => setMessages([{
							role: "assistant",
							content: "Sesi baru. Ada yang bisa dibantu?"
						}]),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIcon, { name: "fa-rotate-right" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "nx-icon-btn",
						type: "button",
						"aria-label": "Tutup",
						onClick: () => setOpen(false),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIcon, { name: "fa-xmark" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nx-ai-messages",
				children: [messages.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `nx-ai-msg${m.role === "user" ? " is-user" : ""}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "nx-ai-bubble",
						style: { whiteSpace: "pre-wrap" },
						children: m.content
					})
				}, i)), busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "nx-ai-bubble",
					children: "Menulis…"
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "nx-ai-suggestions",
				children: SUGGESTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "nx-ai-suggestion",
					type: "button",
					onClick: () => void send(s),
					children: s
				}, s))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "nx-ai-compose",
				onSubmit: (e) => {
					e.preventDefault();
					send(input);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "nx-ai-input-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "nx-ai-input",
						rows: 1,
						maxLength: 4e3,
						placeholder: "Tulis pesan untuk Personal AI…",
						value: input,
						onChange: (e) => setInput(e.target.value)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "nx-ai-send",
						type: "submit",
						disabled: busy,
						"aria-label": "Kirim",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIcon, { name: "fa-arrow-up" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						marginTop: 6,
						color: "#4a6278",
						fontSize: 10
					},
					children: "FAHMI AI · respons dapat keliru"
				})]
			})
		]
	}) : null] });
}
function AppFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "nx-footer",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/favicon.svg",
			alt: "",
			width: 22,
			height: 22
		}), "All Tools FAHMI · gratis · tanpa login"]
	});
}
var Route$4 = createFileRoute("/about")({ component: AboutPage });
var PROJECTS = [
	"All Tools FAHMI",
	"Liquid Reactor UI",
	"SVG2XML Engine",
	"FAHMI Avatar Studio",
	"Visual Website",
	"Personal AI Dock",
	"BMKG Open Data",
	"MangaDex Reader",
	"Saham Desk",
	"Crypto Analisa",
	"Capital Agent",
	"Free Music + Lirik",
	"Alight XML Pack",
	"Temp Mail Bridge",
	"Web Intelligence",
	"TradingView Charts"
];
var PLAYLIST = [
	[
		"01",
		"Lo-fi Reactor",
		"loop malam, tempo pelan"
	],
	[
		"02",
		"Synthwave Ocean",
		"pad biru, drum mesin"
	],
	[
		"03",
		"Ambient Dock",
		"teks dan chart, tanpa vokal"
	],
	[
		"04",
		"Pulse Grid",
		"untuk mode Pulse"
	]
];
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackgroundGlow, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-room",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "nx-room-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "nx-back",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIcon, { name: "fa-arrow-left" }), " Kembali"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "nx-room-title",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "ABOUT DEV" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Profile · Toolkit · Playlist · ",
						PROJECTS.length,
						" Project"
					] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nx-panel",
				style: {
					display: "grid",
					gap: 12
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						gap: 14,
						alignItems: "center"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/favicon.svg",
						alt: "",
						width: 64,
						height: 64
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						style: { fontFamily: "Orbitron,sans-serif" },
						children: "FAHMI"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: { color: "#6b8499" },
						children: "Builder of liquid-reactor tools · Indonesia · akses full gratis"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: {
						lineHeight: 1.65,
						color: "#c5d4e4"
					},
					children: "All Tools FAHMI adalah katalog downloader, maker, AI, visual, dan desk pasar. Tidak ada login. Semua kartu bisa dibuka, dibaca, dan dipakai. Mode Full menampilkan seluruh katalog plus efek di kartu visual."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				style: {
					margin: "22px 0 10px",
					fontFamily: "Orbitron,sans-serif"
				},
				children: "Toolkit"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "tools-grid",
				children: [
					"React / TanStack",
					"Canvas + SVG",
					"xAI Grok",
					"MangaDex",
					"BMKG",
					"TradingView"
				].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "nx-panel",
					children: t
				}, t))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				style: {
					margin: "22px 0 10px",
					fontFamily: "Orbitron,sans-serif"
				},
				children: "Playlist"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "nx-panel",
				children: PLAYLIST.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					style: {
						display: "flex",
						gap: 12,
						marginBottom: 8
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
						style: {
							color: "#7dd3fc",
							minWidth: 28
						},
						children: row[0]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [row[1], /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
						style: {
							display: "block",
							color: "#6b8499"
						},
						children: row[2]
					})] })]
				}, row[0]))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				style: {
					margin: "22px 0 10px",
					fontFamily: "Orbitron,sans-serif"
				},
				children: ["Project · ", PROJECTS.length]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "tools-grid",
				children: PROJECTS.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "nx-panel",
					style: { minHeight: 72 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
						style: {
							color: "#6b8499",
							letterSpacing: "0.12em"
						},
						children: String(i + 1).padStart(2, "0")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: p })]
				}, p))
			})
		]
	})] });
}
var $$splitComponentImporter$3 = () => import("./feedback-S0h-ZmUw.mjs");
var Route$3 = createFileRoute("/feedback")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./vvip-lcaEQk_l.mjs");
var Route$2 = createFileRoute("/vvip")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./tool._id-BJI311Mp.mjs");
var Route$1 = createFileRoute("/tool/$id")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./visual._id-Br24k6Kv.mjs");
var Route = createFileRoute("/visual/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$5.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$6
	}),
	AboutRoute: Route$4.update({
		id: "/about",
		path: "/about",
		getParentRoute: () => Route$6
	}),
	FeedbackRoute: Route$3.update({
		id: "/feedback",
		path: "/feedback",
		getParentRoute: () => Route$6
	}),
	VvipRoute: Route$2.update({
		id: "/vvip",
		path: "/vvip",
		getParentRoute: () => Route$6
	}),
	ToolIdRoute: Route$1.update({
		id: "/tool/$id",
		path: "/tool/$id",
		getParentRoute: () => Route$6
	}),
	VisualIdRoute: Route.update({
		id: "/visual/$id",
		path: "/visual/$id",
		getParentRoute: () => Route$6
	})
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { lookupIp as A, fetchApod as C, fetchPageSource as D, fetchLyrics as E, searchManga as F, tempMail as I, FaIcon as L, mangaPages as M, searchDanbooru as N, fetchWaifu as O, searchFreeMusic as P, downloadMedia as S, fetchBmkgWeather as T, clearHistory as _, AppFooter as a, pushHistory as b, Hero as c, TopNav as d, ACCESS as f, toolsByTab as g, getTool as h, AiDock as i, mangaFeed as j, inspectUrl as k, ModeBar as l, TOOLS as m, Route as n, BackgroundGlow as o, TABS as p, Route$1 as r, FreeMark as s, router_exports as t, SessionCard as u, loadHistory as v, fetchBmkg as w, saveMode as x, loadMode as y };
