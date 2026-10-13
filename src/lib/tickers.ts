export type TickerKind = "stock" | "crypto";

export type TickerSeed = {
  symbol: string;
  name: string;
  wiki: string;
  sector: string;
  kind: TickerKind;
  tv?: string;
};

export const TICKER_SEED: TickerSeed[] = [
  { symbol: "BBCA.JK", name: "Bank Central Asia", wiki: "Bank_Central_Asia", sector: "Bank", kind: "stock", tv: "IDX:BBCA" },
  { symbol: "BBRI.JK", name: "Bank Rakyat Indonesia", wiki: "Bank_Rakyat_Indonesia", sector: "Bank", kind: "stock", tv: "IDX:BBRI" },
  { symbol: "BMRI.JK", name: "Bank Mandiri", wiki: "Bank_Mandiri", sector: "Bank", kind: "stock", tv: "IDX:BMRI" },
  { symbol: "BBNI.JK", name: "Bank Negara Indonesia", wiki: "Bank_Negara_Indonesia", sector: "Bank", kind: "stock", tv: "IDX:BBNI" },
  { symbol: "BRIS.JK", name: "Bank Syariah Indonesia", wiki: "Bank_Syariah_Indonesia", sector: "Bank", kind: "stock", tv: "IDX:BRIS" },
  { symbol: "TLKM.JK", name: "Telkom Indonesia", wiki: "Telkom_Indonesia", sector: "Telekomunikasi", kind: "stock", tv: "IDX:TLKM" },
  { symbol: "EXCL.JK", name: "XL Axiata", wiki: "XL_Axiata", sector: "Telekomunikasi", kind: "stock", tv: "IDX:EXCL" },
  { symbol: "ISAT.JK", name: "Indosat Ooredoo", wiki: "Indosat", sector: "Telekomunikasi", kind: "stock", tv: "IDX:ISAT" },
  { symbol: "ASII.JK", name: "Astra International", wiki: "Astra_International", sector: "Konglomerat", kind: "stock", tv: "IDX:ASII" },
  { symbol: "UNTR.JK", name: "United Tractors", wiki: "United_Tractors", sector: "Alat berat", kind: "stock", tv: "IDX:UNTR" },
  { symbol: "UNVR.JK", name: "Unilever Indonesia", wiki: "Unilever_Indonesia", sector: "Konsumen", kind: "stock", tv: "IDX:UNVR" },
  { symbol: "ICBP.JK", name: "Indofood CBP", wiki: "Indofood_CBP", sector: "Konsumen", kind: "stock", tv: "IDX:ICBP" },
  { symbol: "INDF.JK", name: "Indofood Sukses Makmur", wiki: "Indofood", sector: "Konsumen", kind: "stock", tv: "IDX:INDF" },
  { symbol: "KLBF.JK", name: "Kalbe Farma", wiki: "Kalbe_Farma", sector: "Farmasi", kind: "stock", tv: "IDX:KLBF" },
  { symbol: "HMSP.JK", name: "HM Sampoerna", wiki: "HM_Sampoerna", sector: "Konsumen", kind: "stock", tv: "IDX:HMSP" },
  { symbol: "GGRM.JK", name: "Gudang Garam", wiki: "Gudang_Garam", sector: "Konsumen", kind: "stock", tv: "IDX:GGRM" },
  { symbol: "GOTO.JK", name: "GoTo Gojek Tokopedia", wiki: "GoTo_(company)", sector: "Teknologi", kind: "stock", tv: "IDX:GOTO" },
  { symbol: "BUKA.JK", name: "Bukalapak", wiki: "Bukalapak", sector: "Teknologi", kind: "stock", tv: "IDX:BUKA" },
  { symbol: "EMTK.JK", name: "Elang Mahkota", wiki: "Elang_Mahkota_Teknologi", sector: "Teknologi", kind: "stock", tv: "IDX:EMTK" },
  { symbol: "ADRO.JK", name: "Alamtri / Adaro", wiki: "Adaro_Energy", sector: "Tambang", kind: "stock", tv: "IDX:ADRO" },
  { symbol: "ANTM.JK", name: "Aneka Tambang", wiki: "Aneka_Tambang", sector: "Tambang", kind: "stock", tv: "IDX:ANTM" },
  { symbol: "PTBA.JK", name: "Bukit Asam", wiki: "Bukit_Asam", sector: "Tambang", kind: "stock", tv: "IDX:PTBA" },
  { symbol: "AMMN.JK", name: "Amman Mineral", wiki: "Amman_Mineral_Internasional", sector: "Tambang", kind: "stock", tv: "IDX:AMMN" },
  { symbol: "BYAN.JK", name: "Bayan Resources", wiki: "Bayan_Resources", sector: "Tambang", kind: "stock", tv: "IDX:BYAN" },
  { symbol: "MDKA.JK", name: "Merdeka Copper Gold", wiki: "Merdeka_Copper_Gold", sector: "Tambang", kind: "stock", tv: "IDX:MDKA" },
  { symbol: "ITMG.JK", name: "Indo Tambangraya", wiki: "Indo_Tambangraya_Megah", sector: "Tambang", kind: "stock", tv: "IDX:ITMG" },
  { symbol: "PGAS.JK", name: "Perusahaan Gas Negara", wiki: "Perusahaan_Gas_Negara", sector: "Energi", kind: "stock", tv: "IDX:PGAS" },
  { symbol: "SMGR.JK", name: "Semen Indonesia", wiki: "Semen_Indonesia", sector: "Semen", kind: "stock", tv: "IDX:SMGR" },
  { symbol: "CPIN.JK", name: "Charoen Pokphand Indonesia", wiki: "Charoen_Pokphand_Indonesia", sector: "Agribisnis", kind: "stock", tv: "IDX:CPIN" },
  { symbol: "TOWR.JK", name: "Sarana Menara Nusantara", wiki: "Sarana_Menara_Nusantara", sector: "Infrastruktur", kind: "stock", tv: "IDX:TOWR" },
  { symbol: "AAPL", name: "Apple", wiki: "Apple_Inc.", sector: "Teknologi", kind: "stock", tv: "NASDAQ:AAPL" },
  { symbol: "MSFT", name: "Microsoft", wiki: "Microsoft", sector: "Teknologi", kind: "stock", tv: "NASDAQ:MSFT" },
  { symbol: "NVDA", name: "NVIDIA", wiki: "Nvidia", sector: "Teknologi", kind: "stock", tv: "NASDAQ:NVDA" },
  { symbol: "GOOGL", name: "Alphabet", wiki: "Alphabet_Inc.", sector: "Teknologi", kind: "stock", tv: "NASDAQ:GOOGL" },
  { symbol: "AMZN", name: "Amazon", wiki: "Amazon_(company)", sector: "Konsumen", kind: "stock", tv: "NASDAQ:AMZN" },
  { symbol: "TSLA", name: "Tesla", wiki: "Tesla,_Inc.", sector: "Otomotif", kind: "stock", tv: "NASDAQ:TSLA" },
  { symbol: "META", name: "Meta Platforms", wiki: "Meta_Platforms", sector: "Teknologi", kind: "stock", tv: "NASDAQ:META" },
  { symbol: "NFLX", name: "Netflix", wiki: "Netflix", sector: "Teknologi", kind: "stock", tv: "NASDAQ:NFLX" },
  { symbol: "JPM", name: "JPMorgan Chase", wiki: "JPMorgan_Chase", sector: "Bank", kind: "stock", tv: "NYSE:JPM" },
  { symbol: "BTC-USD", name: "Bitcoin", wiki: "Bitcoin", sector: "Kripto", kind: "crypto", tv: "BINANCE:BTCUSDT" },
  { symbol: "ETH-USD", name: "Ethereum", wiki: "Ethereum", sector: "Kripto", kind: "crypto", tv: "BINANCE:ETHUSDT" },
  { symbol: "SOL-USD", name: "Solana", wiki: "Solana_(blockchain)", sector: "Kripto", kind: "crypto", tv: "BINANCE:SOLUSDT" },
  { symbol: "BNB-USD", name: "BNB", wiki: "Binance", sector: "Kripto", kind: "crypto", tv: "BINANCE:BNBUSDT" },
  { symbol: "XRP-USD", name: "XRP", wiki: "Ripple_(payment_protocol)", sector: "Kripto", kind: "crypto", tv: "BINANCE:XRPUSDT" },
  { symbol: "DOGE-USD", name: "Dogecoin", wiki: "Dogecoin", sector: "Kripto", kind: "crypto", tv: "BINANCE:DOGEUSDT" },
  { symbol: "ADA-USD", name: "Cardano", wiki: "Cardano_(blockchain_platform)", sector: "Kripto", kind: "crypto", tv: "BINANCE:ADAUSDT" },
  { symbol: "AVAX-USD", name: "Avalanche", wiki: "Avalanche_(blockchain_platform)", sector: "Kripto", kind: "crypto", tv: "BINANCE:AVAXUSDT" },
  { symbol: "LINK-USD", name: "Chainlink", wiki: "Chainlink_(blockchain)", sector: "Kripto", kind: "crypto", tv: "BINANCE:LINKUSDT" },
  { symbol: "DOT-USD", name: "Polkadot", wiki: "Polkadot_(cryptocurrency)", sector: "Kripto", kind: "crypto", tv: "BINANCE:DOTUSDT" },
  { symbol: "LTC-USD", name: "Litecoin", wiki: "Litecoin", sector: "Kripto", kind: "crypto", tv: "BINANCE:LTCUSDT" },
  { symbol: "SHIB-USD", name: "Shiba Inu", wiki: "Shiba_Inu_(cryptocurrency)", sector: "Kripto", kind: "crypto", tv: "BINANCE:SHIBUSDT" },
  { symbol: "PEPE-USD", name: "Pepe", wiki: "Pepe_(cryptocurrency)", sector: "Kripto", kind: "crypto", tv: "BINANCE:PEPEUSDT" },
  { symbol: "TON-USD", name: "Toncoin", wiki: "Toncoin", sector: "Kripto", kind: "crypto", tv: "BINANCE:TONUSDT" },
  { symbol: "TRX-USD", name: "TRON", wiki: "TRON_(cryptocurrency)", sector: "Kripto", kind: "crypto", tv: "BINANCE:TRXUSDT" },
  { symbol: "SUI-USD", name: "Sui", wiki: "Sui_(blockchain)", sector: "Kripto", kind: "crypto", tv: "BINANCE:SUIUSDT" },
  { symbol: "NEAR-USD", name: "NEAR Protocol", wiki: "NEAR_Protocol", sector: "Kripto", kind: "crypto", tv: "BINANCE:NEARUSDT" },
  { symbol: "APT-USD", name: "Aptos", wiki: "Aptos_(blockchain)", sector: "Kripto", kind: "crypto", tv: "BINANCE:APTUSDT" },
  { symbol: "UNI-USD", name: "Uniswap", wiki: "Uniswap", sector: "Kripto", kind: "crypto", tv: "BINANCE:UNIUSDT" },
];

export function toTvSymbol(raw: string) {
  const s = raw.trim().toUpperCase();
  if (!s) return "BINANCE:BTCUSDT";
  if (s.includes(":")) return s;
  const seed = TICKER_SEED.find(
    (t) => t.symbol === s || t.symbol === `${s}.JK` || t.symbol.replace("-USD", "") === s || t.tv === s,
  );
  if (seed?.tv) return seed.tv;
  if (s.endsWith(".JK")) return `IDX:${s.replace(".JK", "")}`;
  if (s.endsWith("-USD")) return `BINANCE:${s.replace("-USD", "")}USDT`;
  if (s === "^JKSE" || s === "IHSG" || s === "COMPOSITE") return "IDX:COMPOSITE";
  if (s === "^GSPC" || s === "SPX") return "SP:SPX";
  if (s === "^IXIC") return "NASDAQ:IXIC";
  if (s === "^DJI") return "DJ:DJI";
  if (s === "^N225") return "INDEX:NKY";
  if (s.includes("BTC")) return "BINANCE:BTCUSDT";
  if (s.includes("ETH") && !s.includes("METHOD")) return "BINANCE:ETHUSDT";
  if (s.includes("USDIDR") || s === "USDIDR=X") return "FX_IDC:USDIDR";
  if (s === "GC=F" || s === "GOLD") return "TVC:GOLD";
  if (s === "CL=F" || s === "OIL") return "TVC:USOIL";
  if (/^[A-Z]{4}$/.test(s)) return `IDX:${s}`;
  if (/^[A-Z0-9]{2,12}$/.test(s) && !s.includes("USD")) return `BINANCE:${s}USDT`;
  return s;
}

export function searchLocalTickers(q: string, kind: TickerKind) {
  const needle = q.trim().toLowerCase();
  if (!needle) return [] as TickerSeed[];
  const compact = needle.replace(/[^a-z0-9]/g, "");
  const scored = TICKER_SEED.filter((t) => (kind === "crypto" ? t.kind === "crypto" : t.kind === "stock")).map((t) => {
    const symbol = t.symbol.toLowerCase();
    const code = t.symbol.replace(".JK", "").replace("-USD", "").toLowerCase();
    const name = t.name.toLowerCase();
    const tv = (t.tv ?? "").toLowerCase();
    let score = 0;
    if (code === needle || symbol === needle || tv === needle) score += 100;
    if (code.startsWith(needle) || name.startsWith(needle)) score += 40;
    if (symbol.includes(needle) || name.includes(needle) || tv.includes(needle) || code.includes(compact)) score += 20;
    return { t, score };
  });
  return scored
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.t);
}

export function resolveStockSymbol(raw: string) {
  const q = raw.trim();
  const local = searchLocalTickers(q, "stock")[0];
  if (local) return local.symbol;
  const s = q.toUpperCase();
  if (!s) return "";
  if (s.startsWith("^") || s.includes("=") || s.includes(".")) return s;
  if (/^[A-Z]{4}$/.test(s)) return `${s}.JK`;
  return s;
}

export function resolveCryptoSymbol(raw: string) {
  const q = raw.trim();
  const local = searchLocalTickers(q, "crypto")[0];
  if (local) return local.tv || local.symbol;
  return toTvSymbol(q);
}
