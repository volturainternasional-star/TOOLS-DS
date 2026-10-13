import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { n as askToolAi } from "./ai-CiRVoIuu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/market-CqqFhEwq.js
var UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
async function pull(url, timeout = 14e3) {
	const ctrl = new AbortController();
	const t = setTimeout(() => ctrl.abort(), timeout);
	try {
		const res = await fetch(url, {
			signal: ctrl.signal,
			redirect: "follow",
			headers: {
				accept: "application/json,text/plain,*/*",
				"accept-language": "en-US,en;q=0.9,id;q=0.8",
				"user-agent": UA
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
var IDX_MAP = Object.fromEntries(TICKER_SEED.map((t) => [t.symbol, {
	name: t.name,
	wiki: t.wiki
}]));
function num(v, fallback = 0) {
	const n = typeof v === "number" ? v : Number(v);
	return Number.isFinite(n) ? n : fallback;
}
function raw(v) {
	if (v && typeof v === "object" && "raw" in v) return num(v.raw, NaN);
	return num(v, NaN);
}
function parseSpark(json) {
	const spark = json;
	const out = [];
	for (const item of spark.spark?.result ?? []) {
		const res = item.response?.[0];
		const meta = res?.meta ?? {};
		const closes = (res?.indicators?.quote?.[0]?.close ?? []).filter((x) => typeof x === "number");
		const price = num(meta.regularMarketPrice, closes.at(-1) ?? 0);
		const prev = num(meta.chartPreviousClose ?? meta.previousClose, closes.at(-2) ?? price);
		const change = price - prev;
		const changePct = num(meta.regularMarketChangePercent, prev ? change / prev * 100 : 0);
		const symbol = String(item.symbol || meta.symbol || "");
		const mapped = IDX_MAP[symbol];
		const first = closes[0] ?? prev;
		const high52 = num(meta.fiftyTwoWeekHigh, closes.length ? Math.max(...closes) : price);
		const low52 = num(meta.fiftyTwoWeekLow, closes.length ? Math.min(...closes) : price);
		out.push({
			symbol,
			name: mapped?.name || String(meta.longName || meta.shortName || symbol),
			price,
			change,
			changePct,
			currency: String(meta.currency || ""),
			exchange: String(meta.fullExchangeName || meta.exchangeName || ""),
			previousClose: prev,
			closes: closes.slice(-260),
			high1y: high52 || (closes.length ? Math.max(...closes) : price),
			low1y: low52 || (closes.length ? Math.min(...closes) : price),
			return1y: first ? (price - first) / first * 100 : 0
		});
	}
	return out;
}
async function sparkQuotes(symbols, range = "1y") {
	const uniq = [...new Set(symbols.map((s) => s.trim()).filter(Boolean))].slice(0, 24);
	if (!uniq.length) return [];
	const r = await pull(`https://query1.finance.yahoo.com/v7/finance/spark?symbols=${encodeURIComponent(uniq.join(","))}&range=${range}&interval=1d`);
	if (r.json) {
		const rows = parseSpark(r.json);
		if (rows.length) return rows;
	}
	const rows = [];
	for (const symbol of uniq.slice(0, 8)) {
		const chart = (await pull(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=${range}`)).json;
		if (!chart?.chart?.result?.[0]) continue;
		const fake = { spark: { result: [{
			symbol,
			response: [chart.chart.result[0]]
		}] } };
		rows.push(...parseSpark(fake));
	}
	return rows;
}
function normalizeSymbol(rawSym) {
	const q = rawSym.trim().toUpperCase();
	if (!q) return "";
	if (q.startsWith("^") || q.includes("=") || q.includes(".")) return q;
	if (/^[A-Z]{4}$/.test(q)) return `${q}.JK`;
	return q;
}
var fetchMarketPulse_createServerFn_handler = createServerRpc({
	id: "074a70dcba2f6559bfe49770f33270347905e83c34829c1dfda3e347f2aad827",
	name: "fetchMarketPulse",
	filename: "src/lib/server/market.ts"
}, (opts) => fetchMarketPulse.__executeServer(opts));
var fetchMarketPulse = createServerFn({ method: "GET" }).handler(fetchMarketPulse_createServerFn_handler, async () => {
	const quotes = await sparkQuotes([
		"^JKSE",
		"^GSPC",
		"^IXIC",
		"^DJI",
		"^N225",
		"USDIDR=X",
		"EURUSD=X",
		"BBCA.JK",
		"BBRI.JK",
		"BMRI.JK",
		"TLKM.JK",
		"ASII.JK",
		"GOTO.JK",
		"AAPL",
		"MSFT",
		"NVDA",
		"GC=F",
		"CL=F"
	], "3mo");
	const rates = (await pull("https://open.er-api.com/v6/latest/USD")).json?.rates ?? {};
	return {
		ok: true,
		at: Date.now(),
		quotes,
		fx: {
			USDIDR: num(rates.IDR),
			USDEUR: num(rates.EUR),
			USDJPY: num(rates.JPY),
			USDSGD: num(rates.SGD),
			USDAUD: num(rates.AUD)
		}
	};
});
var searchTickers_createServerFn_handler = createServerRpc({
	id: "daa47c3382f11da68eb2db6d731d6fdfdb044f118346e13cfbeea75f885b1a47",
	name: "searchTickers",
	filename: "src/lib/server/market.ts"
}, (opts) => searchTickers.__executeServer(opts));
var searchTickers = createServerFn({ method: "POST" }).validator((input) => input).handler(searchTickers_createServerFn_handler, async ({ data }) => {
	const q = data.q.trim();
	if (q.length < 1) return {
		ok: false,
		error: "Ketik ticker, nama emiten, atau koin."
	};
	const kind = data.kind === "crypto" ? "crypto" : "stock";
	const guessed = kind === "crypto" ? binancePair(q).replace(/USDT$/, "-USD") : normalizeSymbol(q);
	const needle = q.toLowerCase();
	const local = TICKER_SEED.filter((t) => {
		if (kind === "crypto" ? t.kind !== "crypto" : t.kind === "crypto") return false;
		return t.symbol.toLowerCase().includes(needle) || t.name.toLowerCase().includes(needle) || t.symbol.replace(".JK", "").toLowerCase() === needle || t.tv?.toLowerCase().includes(needle);
	}).map((t) => ({
		symbol: t.symbol,
		name: t.name,
		type: t.kind === "crypto" ? "CRYPTOCURRENCY" : "EQUITY",
		exchange: t.kind === "crypto" ? "Crypto" : t.symbol.endsWith(".JK") ? "Jakarta" : ""
	}));
	const remote = ((await pull(`https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(q)}&quotesCount=16&newsCount=0`)).json?.quotes ?? []).filter((x) => typeof x.symbol === "string").map((x) => ({
		symbol: String(x.symbol),
		name: String(x.longname || x.shortname || x.symbol),
		type: String(x.quoteType || x.typeDisp || ""),
		exchange: String(x.exchDisp || x.exchange || "")
	}));
	const merged = [...local];
	for (const row of remote) if (!merged.some((x) => x.symbol === row.symbol)) merged.push(row);
	if (guessed && !merged.some((x) => x.symbol === guessed)) {
		const seed = TICKER_SEED.find((t) => t.symbol === guessed);
		merged.unshift({
			symbol: guessed,
			name: seed?.name || IDX_MAP[guessed]?.name || guessed,
			type: kind === "crypto" ? "CRYPTOCURRENCY" : "EQUITY",
			exchange: guessed.endsWith(".JK") ? "Jakarta" : kind === "crypto" ? "Crypto" : ""
		});
	}
	merged.sort((a, b) => {
		const score = (x) => {
			let s = 0;
			if (x.symbol === guessed) s += 200;
			if (x.symbol.replace(".JK", "") === q.toUpperCase()) s += 120;
			if (kind === "crypto") {
				if (x.type.toUpperCase().includes("CRYPTO")) s += 80;
				if (x.symbol.endsWith("-USD")) s += 40;
				if (x.type.toUpperCase().includes("ETF")) s -= 50;
			} else {
				if (x.symbol.endsWith(".JK")) s += 80;
				if (x.type.toUpperCase() === "EQUITY") s += 40;
				if (x.type.toUpperCase().includes("ETF")) s -= 30;
				if (x.type.toUpperCase().includes("OPTION")) s -= 80;
			}
			if (x.name.toLowerCase().startsWith(needle)) s += 15;
			return s;
		};
		return score(b) - score(a);
	});
	if (!merged.length) return {
		ok: false,
		error: `Tidak ketemu "${q}". Coba BBCA, AAPL, atau BTC.`
	};
	return {
		ok: true,
		guessed,
		results: merged.slice(0, 12)
	};
});
var fetchQuote_createServerFn_handler = createServerRpc({
	id: "ba1ee6a62741cc12ab5cc29041196c668305315c2d83231f21951d723b984da0",
	name: "fetchQuote",
	filename: "src/lib/server/market.ts"
}, (opts) => fetchQuote.__executeServer(opts));
var fetchQuote = createServerFn({ method: "POST" }).validator((input) => input).handler(fetchQuote_createServerFn_handler, async ({ data }) => {
	const symbol = normalizeSymbol(data.symbol);
	if (!symbol) return {
		ok: false,
		error: "Ticker kosong."
	};
	const quote = (await sparkQuotes([symbol]))[0];
	if (!quote) return {
		ok: false,
		error: `Tidak ada data untuk ${symbol}.`
	};
	return {
		ok: true,
		quote
	};
});
var fetchCompanyDossier_createServerFn_handler = createServerRpc({
	id: "4f44c0a211342d915830f49b69491ba6af8cac0a76690538922f378a10cf9c0f",
	name: "fetchCompanyDossier",
	filename: "src/lib/server/market.ts"
}, (opts) => fetchCompanyDossier.__executeServer(opts));
var fetchCompanyDossier = createServerFn({ method: "POST" }).validator((input) => input).handler(fetchCompanyDossier_createServerFn_handler, async ({ data }) => loadDossier(data.symbol));
function yearFromUnix(sec) {
	if (!Number.isFinite(sec) || !sec) return "";
	return (/* @__PURE__ */ new Date(sec * 1e3)).getFullYear().toString();
}
async function loadDossier(rawSymbol) {
	const symbol = normalizeSymbol(rawSymbol);
	if (!symbol) return {
		ok: false,
		error: "Ticker kosong."
	};
	const seed = TICKER_SEED.find((t) => t.symbol === symbol || t.symbol === `${symbol}.JK` || t.tv === `IDX:${symbol}`);
	const modules = [
		"price",
		"summaryDetail",
		"defaultKeyStatistics",
		"assetProfile",
		"financialData",
		"incomeStatementHistory",
		"earnings",
		"calendarEvents"
	].join(",");
	const [quotes, summary] = await Promise.all([sparkQuotes([symbol], "1y"), pull(`https://query2.finance.yahoo.com/v10/finance/quoteSummary/${encodeURIComponent(symbol)}?modules=${modules}`)]);
	const quote = quotes[0];
	if (!quote) return {
		ok: false,
		error: `Tidak ada kuotasi untuk ${symbol}. Coba BBCA, TLKM, atau AAPL.`
	};
	const result = summary.json?.quoteSummary?.result?.[0] ?? {};
	const profile = result.assetProfile ?? {};
	const price = result.price ?? {};
	const stats = result.defaultKeyStatistics ?? {};
	const detail = result.summaryDetail ?? {};
	const fin = result.financialData ?? {};
	const years = (result.incomeStatementHistory?.incomeStatementHistory ?? []).slice(0, 4).map((row) => ({
		year: yearFromUnix(raw(row.endDate)),
		revenue: raw(row.totalRevenue),
		netIncome: raw(row.netIncome),
		grossProfit: raw(row.grossProfit)
	}));
	const longName = String(price.longName || price.shortName || seed?.name || quote.name);
	const wikiKey = seed?.wiki || IDX_MAP[symbol]?.wiki || longName.replace(/\s+/g, "_");
	const [wikiEn, wikiId] = await Promise.all([pull(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiKey)}`), pull(`https://id.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiKey)}`)]);
	const wikiJson = (w) => w;
	const wiki = [wikiId.json, wikiEn.json].map(wikiJson).find((w) => w && w.type !== "disambiguation" && w.extract);
	return {
		ok: true,
		quote: {
			...quote,
			name: longName || quote.name
		},
		profile: {
			sector: String(profile.sector || seed?.sector || ""),
			industry: String(profile.industry || seed?.sector || ""),
			website: String(profile.website || ""),
			city: String(profile.city || ""),
			country: String(profile.country || (symbol.endsWith(".JK") ? "Indonesia" : "")),
			employees: num(profile.fullTimeEmployees, 0),
			summary: String(profile.longBusinessSummary || wiki?.extract || "").slice(0, 2400),
			marketCap: raw(price.marketCap),
			pe: raw(stats.trailingPE) || raw(detail.trailingPE),
			forwardPe: raw(stats.forwardPE),
			eps: raw(stats.trailingEps),
			beta: raw(stats.beta),
			dividendYield: raw(detail.dividendYield),
			profitMargin: raw(fin.profitMargins),
			roe: raw(fin.returnOnEquity),
			debtToEquity: raw(fin.debtToEquity),
			revenue: raw(fin.totalRevenue),
			sharesOutstanding: raw(stats.sharesOutstanding),
			floatShares: raw(stats.floatShares),
			bookValue: raw(stats.bookValue),
			enterpriseValue: raw(stats.enterpriseValue),
			high52: raw(detail.fiftyTwoWeekHigh) || quote.high1y,
			low52: raw(detail.fiftyTwoWeekLow) || quote.low1y,
			avgVolume: raw(detail.averageVolume),
			payout: raw(stats.payoutRatio),
			targetMean: raw(fin.targetMeanPrice),
			recommendation: String(fin.recommendationKey || "")
		},
		years,
		wiki: wiki ? {
			title: String(wiki.title || longName),
			extract: String(wiki.extract || ""),
			url: String(wiki.content_urls?.desktop?.page || "")
		} : null
	};
}
function fmtOrDash(n, digits = 2) {
	if (!Number.isFinite(n) || n === 0) return "tidak tersedia";
	return n.toLocaleString("id-ID", { maximumFractionDigits: digits });
}
function localCompanyReview(d) {
	const { quote: q, profile: p, years, wiki } = d;
	const yLines = years.filter((y) => y.year).map((y) => `- ${y.year}: pendapatan ${fmtOrDash(y.revenue, 0)}, laba bersih ${fmtOrDash(y.netIncome, 0)}`).join("\n");
	return [
		`1) Siapa perusahaan ini`,
		`${q.name} (${q.symbol}) tercatat di ${q.exchange || "bursa"}. ${p.sector ? `Sektor ${p.sector}${p.industry ? ", industri " + p.industry : ""}.` : ""} ${p.city ? `Lokasi ${p.city}${p.country ? ", " + p.country : ""}.` : ""}`,
		wiki?.extract || p.summary.slice(0, 900) || "Ringkasan bisnis publik terbatas.",
		``,
		`2) Supply & kapitalisasi`,
		`Saham beredar ${fmtOrDash(p.sharesOutstanding, 0)} lembar. Float ${fmtOrDash(p.floatShares, 0)}. Market cap ${fmtOrDash(p.marketCap, 0)}. Artinya nilai pasar = harga × saham beredar.`,
		``,
		`3) Keuangan`,
		`P/E ${fmtOrDash(p.pe, 1)}, EPS ${fmtOrDash(p.eps, 2)}, ROE ${Number.isFinite(p.roe) ? (p.roe * 100).toFixed(1) + "%" : "tidak tersedia"}, margin ${Number.isFinite(p.profitMargin) ? (p.profitMargin * 100).toFixed(1) + "%" : "tidak tersedia"}, debt/equity ${fmtOrDash(p.debtToEquity, 1)}, dividend yield ${Number.isFinite(p.dividendYield) ? (p.dividendYield * 100).toFixed(2) + "%" : "tidak tersedia"}.`,
		yLines ? `Laporan tahunan:\n${yLines}` : "Laporan tahunan rinci tidak tersedia di feed ini.",
		``,
		`4) Pergerakan 12 bulan`,
		`Harga sekarang ${fmtOrDash(q.price)} ${q.currency} (${q.changePct >= 0 ? "+" : ""}${q.changePct.toFixed(2)}% hari ini). Return 12 bulan ${q.return1y.toFixed(2)}%. Rentang ${fmtOrDash(q.low1y)} – ${fmtOrDash(q.high1y)} (52-week ${fmtOrDash(p.low52)} – ${fmtOrDash(p.high52)}).`,
		``,
		`5) Risiko & cara baca`,
		`Beta ${fmtOrDash(p.beta, 2)}. Angka di atas adalah foto publik, bukan prediksi. Bandingkan P/E dengan pesaing sektor, cek apakah laba naik di tabel tahunan, dan lihat apakah harga dekat low atau high 52 minggu.`,
		``,
		`Ini edukasi, bukan nasihat investasi.`
	].join("\n");
}
var analyzeCompany_createServerFn_handler = createServerRpc({
	id: "23d54f6426af0be932e3923c1131daecc2140e15be887dc61816cc149ec2eb14",
	name: "analyzeCompany",
	filename: "src/lib/server/market.ts"
}, (opts) => analyzeCompany.__executeServer(opts));
var analyzeCompany = createServerFn({ method: "POST" }).validator((input) => input).handler(analyzeCompany_createServerFn_handler, async ({ data }) => {
	const dossier = await loadDossier(data.symbol);
	if (!dossier.ok) return dossier;
	const fallback = localCompanyReview(dossier);
	const facts = JSON.stringify({
		quote: {
			...dossier.quote,
			closes: dossier.quote.closes.filter((_, i, a) => i % 8 === 0 || i === a.length - 1)
		},
		profile: dossier.profile,
		years: dossier.years,
		wiki: dossier.wiki,
		question: data.question || "Jelaskan perusahaan ini secara rinci selama 12 bulan terakhir."
	}, null, 2).slice(0, 9e3);
	const ai = await askToolAi({ data: {
		max: 1400,
		system: "Kamu Capital Agent FAHMI, analis perusahaan edukatif. Bahasa Indonesia, rinci, heading singkat. WAJIB struktur:\n1) Siapa perusahaan ini & model bisnis\n2) Supply: saham beredar, float, market cap — jelaskan artinya\n3) Keuangan 1 tahun: pendapatan, laba, margin, PE, EPS, ROE, utang (sebut jika data tidak ada)\n4) Pergerakan harga 12 bulan: return, high/low, apa artinya bagi pemula\n5) Konteks bisnis / sektor / risiko\n6) Cara baca laporan ini untuk orang awam\nJANGAN beri saran beli/jual. JANGAN janji cuan. Tutup dengan: 'Ini edukasi, bukan nasihat investasi.' Panjang 500-900 kata jika data cukup.",
		prompt: `Tulis ulasan setahun emiten berikut berdasarkan data live. Jika angka NaN atau 0 mencurigakan, katakan data tidak tersedia.\n${facts}`
	} });
	return {
		ok: true,
		dossier,
		analysis: ai.ok ? ai.text : fallback
	};
});
function binancePair(rawSym) {
	let s = rawSym.trim().toUpperCase().replace(/^BINANCE:/, "").replace("/", "");
	if (s.includes(":")) s = s.split(":")[1] ?? s;
	if (s.endsWith(".P")) s = s.slice(0, -2);
	if (/^[A-Z0-9]{2,12}$/.test(s) && !/(USDT|USDC|BUSD|USD)$/.test(s)) s = `${s}USDT`;
	return s;
}
function yahooCrypto(pair) {
	return `${pair.replace(/USDT$|USDC$|BUSD$/, "")}-USD`;
}
var analyzeCrypto_createServerFn_handler = createServerRpc({
	id: "d1b36f1a128015d7d827a905f7ae9b2c52adc59d89a1df62edd511ef0d9009e6",
	name: "analyzeCrypto",
	filename: "src/lib/server/market.ts"
}, (opts) => analyzeCrypto.__executeServer(opts));
var analyzeCrypto = createServerFn({ method: "POST" }).validator((input) => input).handler(analyzeCrypto_createServerFn_handler, async ({ data }) => {
	const pair = binancePair(data.symbol);
	if (!pair) return {
		ok: false,
		error: "Simbol kosong."
	};
	const ySym = yahooCrypto(pair);
	const [tickerUs, klinesUs, tickerCom, yahoo, cbTick, cbCandles] = await Promise.all([
		pull(`https://api.binance.us/api/v3/ticker/24hr?symbol=${encodeURIComponent(pair)}`),
		pull(`https://api.binance.us/api/v3/klines?symbol=${encodeURIComponent(pair)}&interval=1d&limit=365`),
		pull(`https://api.binance.com/api/v3/ticker/24hr?symbol=${encodeURIComponent(pair)}`, 6e3),
		sparkQuotes([ySym], "1y"),
		pull(`https://api.exchange.coinbase.com/products/${encodeURIComponent(ySym)}/ticker`),
		pull(`https://api.exchange.coinbase.com/products/${encodeURIComponent(ySym)}/candles?granularity=86400`)
	]);
	const t = (tickerUs.json && typeof tickerUs.json === "object" && "lastPrice" in tickerUs.json ? tickerUs.json : tickerCom.json) ?? null;
	const ksRaw = klinesUs.json;
	let closes = (Array.isArray(ksRaw) ? ksRaw : []).map((row) => num(Array.isArray(row) ? row[4] : 0, NaN)).filter((n) => Number.isFinite(n));
	if (closes.length < 8 && Array.isArray(cbCandles.json)) closes = [...cbCandles.json].reverse().map((row) => num(Array.isArray(row) ? row[4] : 0, NaN)).filter((n) => Number.isFinite(n));
	const y = yahoo[0];
	if (closes.length < 8 && y?.closes?.length) closes = y.closes;
	const cb = cbTick.json;
	const price = num(t?.lastPrice, num(cb?.price, closes.at(-1) ?? y?.price ?? 0));
	if (!price) return {
		ok: false,
		error: `Tidak ada data ${pair}. Coba BTC atau ETH.`
	};
	const first = closes[0] ?? y?.closes[0] ?? price;
	const scan = {
		pair,
		tv: `BINANCE:${pair}`,
		price,
		changePct: num(t?.priceChangePercent, y?.changePct ?? 0),
		high24: num(t?.highPrice, y?.high1y ? y.price : 0),
		low24: num(t?.lowPrice),
		volume: num(t?.volume, num(cb?.volume)),
		quoteVolume: num(t?.quoteVolume),
		high1y: closes.length ? Math.max(...closes) : y?.high1y ?? price,
		low1y: closes.length ? Math.min(...closes) : y?.low1y ?? price,
		return1y: first ? (price - first) / first * 100 : y?.return1y ?? 0,
		closes: closes.slice(-260),
		marketCap: NaN,
		name: pair.replace(/USDT$/, "")
	};
	const facts = JSON.stringify({
		pair: scan.pair,
		price: scan.price,
		changePct24h: scan.changePct,
		high24: scan.high24,
		low24: scan.low24,
		volumeBase: scan.volume,
		volumeQuote: scan.quoteVolume,
		high1y: scan.high1y,
		low1y: scan.low1y,
		return1y: scan.return1y,
		samples: scan.closes.filter((_, i, a) => i % 10 === 0 || i === a.length - 1)
	}, null, 2).slice(0, 6e3);
	const ai = await askToolAi({ data: {
		max: 1100,
		system: "Kamu analis kripto edukatif FAHMI. Bahasa Indonesia, rinci. WAJIB struktur:\n1) Apa aset ini secara singkat\n2) Pergerakan 24 jam\n3) Pergerakan 12 bulan: return, high/low, volatilitas kasar\n4) Volume & likuiditas — cara membacanya\n5) Cara baca chart candle untuk pemula\n6) Risiko (bukan sinyal)\nJANGAN saran beli/jual. Tutup: 'Ini edukasi, bukan nasihat investasi. Kripto sangat volatil.'",
		prompt: `Analisis koin dari data 1 tahun (TradingView chart + kuotasi publik, bukan CoinGecko):\n${facts}`
	} });
	if (!ai.ok) return {
		ok: true,
		scan,
		analysis: [
			`1) Aset ${scan.name}`,
			`Pair ${scan.pair} di TradingView sebagai ${scan.tv}. Harga acuan ${fmtOrDash(scan.price, 4)} USDT.`,
			``,
			`2) 24 jam`,
			`Perubahan ${fmtOrDash(scan.changePct, 2)}%. High ${fmtOrDash(scan.high24, 4)} · low ${fmtOrDash(scan.low24, 4)}. Volume quote ${fmtOrDash(scan.quoteVolume, 0)}.`,
			``,
			`3) 12 bulan`,
			`Return ${fmtOrDash(scan.return1y, 2)}%. Range ${fmtOrDash(scan.low1y, 4)} – ${fmtOrDash(scan.high1y, 4)}. Candle harian ${scan.closes.length} bar.`,
			``,
			`4) Cara baca`,
			`Volume besar = lebih mudah masuk-keluar. Harga dekat high 1 tahun = sudah naik jauh; dekat low = sudah turun dalam. Ini foto pasar, bukan sinyal.`,
			``,
			`Ini edukasi, bukan nasihat investasi. Kripto sangat volatil.`
		].join("\n")
	};
	return {
		ok: true,
		scan,
		analysis: ai.text
	};
});
var fetchFxTable_createServerFn_handler = createServerRpc({
	id: "b265f14fa47eaa90986c505821a3ea48d31366cc130659373ad2fc7a5ff7a6c3",
	name: "fetchFxTable",
	filename: "src/lib/server/market.ts"
}, (opts) => fetchFxTable.__executeServer(opts));
var fetchFxTable = createServerFn({ method: "POST" }).validator((input) => input).handler(fetchFxTable_createServerFn_handler, async ({ data }) => {
	const base = (data.base || "USD").toUpperCase();
	const body = (await pull(`https://open.er-api.com/v6/latest/${encodeURIComponent(base)}`)).json;
	if (!body?.rates) return {
		ok: false,
		error: "Kurs tidak tersedia."
	};
	return {
		ok: true,
		base,
		rates: Object.fromEntries([
			"IDR",
			"USD",
			"EUR",
			"JPY",
			"SGD",
			"AUD",
			"GBP",
			"CNY",
			"MYR",
			"KRW",
			"SAR",
			"THB"
		].filter((k) => body.rates && k in body.rates).map((k) => [k, body.rates[k]])),
		updated: body.time_last_update_utc ?? ""
	};
});
var convertFx_createServerFn_handler = createServerRpc({
	id: "7b98f573c2d5bfc8f94693078d42ab036e2f1b708b10914c129325cdb69a95e8",
	name: "convertFx",
	filename: "src/lib/server/market.ts"
}, (opts) => convertFx.__executeServer(opts));
var convertFx = createServerFn({ method: "POST" }).validator((input) => input).handler(convertFx_createServerFn_handler, async ({ data }) => {
	const from = data.from.toUpperCase();
	const to = data.to.toUpperCase();
	const amount = num(data.amount);
	const rates = (await pull(`https://open.er-api.com/v6/latest/${encodeURIComponent(from)}`)).json?.rates;
	if (!rates?.[to]) return {
		ok: false,
		error: "Pasangan kurs tidak ditemukan."
	};
	const rate = rates[to];
	return {
		ok: true,
		amount,
		from,
		to,
		rate,
		result: amount * rate
	};
});
//#endregion
export { analyzeCompany_createServerFn_handler, analyzeCrypto_createServerFn_handler, convertFx_createServerFn_handler, fetchCompanyDossier_createServerFn_handler, fetchFxTable_createServerFn_handler, fetchMarketPulse_createServerFn_handler, fetchQuote_createServerFn_handler, searchTickers_createServerFn_handler };
