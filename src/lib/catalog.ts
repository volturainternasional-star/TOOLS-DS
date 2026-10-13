export type TabId = "all" | "downloader" | "maker" | "tools" | "visuals" | "vault" | "external";

export type ToolCategory = Exclude<TabId, "all" | "visuals">;

export type ToolDef = {
  id: string;
  name: string;
  description: string;
  badge: string;
  icon: string;
  category: ToolCategory;
  format: string;
  rgb: string;
};

export const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: "all", label: "All", icon: "fa-th-large" },
  { id: "downloader", label: "Downloader", icon: "fa-download" },
  { id: "maker", label: "Maker", icon: "fa-wand-magic-sparkles" },
  { id: "tools", label: "Tools", icon: "fa-screwdriver-wrench" },
  { id: "visuals", label: "Visual", icon: "fa-sparkles" },
  { id: "vault", label: "Vault", icon: "fa-archive" },
  { id: "external", label: "External", icon: "fa-link" },
];

export const TOOLS: ToolDef[] = [
  { id: "comicreader", name: "Baca Komik Full", description: "Manga, manhwa, manhua + reader", badge: "FULL", icon: "fa-book-open-reader", category: "tools", format: "UTILITY", rgb: "248,113,113" },
  { id: "avatarstudio", name: "FAHMI Avatar Studio", description: "Buat avatar SVG unik dengan puluhan style dan editor visual.", badge: "SVG", icon: "fa-user-astronaut", category: "maker", format: "CREATE", rgb: "59,130,246" },
  { id: "htmlvideo", name: "HTML / WebGL to MP4", description: "Ubah animasi HTML, CSS, JS, dan WebGL menjadi rekaman 8 detik.", badge: "LOCAL MP4", icon: "fa-film", category: "maker", format: "CREATE", rgb: "56,189,248" },
  { id: "instagram", name: "Instagram", description: "Download video & foto", badge: "HD", icon: "fa-brands fa-instagram", category: "downloader", format: "MEDIA", rgb: "244,114,182" },
  { id: "tiktok", name: "TikTok", description: "Video, foto & audio", badge: "MP4/MP3/JPG", icon: "fa-brands fa-tiktok", category: "downloader", format: "MEDIA", rgb: "125,211,252" },
  { id: "youtube", name: "YouTube Downloader", description: "Resolusi video dan audio dari provider", badge: "MP4/MP3", icon: "fa-brands fa-youtube", category: "downloader", format: "MEDIA", rgb: "248,113,113" },
  { id: "spotify", name: "Spotify Downloader", description: "Audio provider dengan fallback resmi", badge: "MP3", icon: "fa-brands fa-spotify", category: "downloader", format: "MEDIA", rgb: "52,211,153" },
  { id: "fakelobby", name: "Fake Lobby", description: "FF & ML lobby palsu untuk screenshot meme", badge: "GAME", icon: "fa-gamepad", category: "maker", format: "CREATE", rgb: "251,146,60" },
  { id: "aiimage", name: "FAHMI AI Image", description: "Buat gambar AI dari prompt", badge: "IMAGINE", icon: "fa-paintbrush", category: "tools", format: "AI", rgb: "56,189,248" },
  { id: "sertifikat", name: "Sertifikat Meme", description: "Sertifikat meme kustom — watermark simulasi, bukan dokumen resmi", badge: "ORIGINAL", icon: "fa-certificate", category: "maker", format: "CREATE", rgb: "251,191,36" },
  { id: "ektp", name: "E-KTP Generator", description: "Kartu demo full form — watermark permanen, bukan dokumen resmi", badge: "DEMO", icon: "fa-id-card", category: "maker", format: "CREATE", rgb: "148,163,184" },
  { id: "winquotes", name: "Windows Quotes", description: "Quote ala Windows — 2 style", badge: "2 STYLE", icon: "fa-brands fa-windows", category: "maker", format: "CREATE", rgb: "96,165,250" },
  { id: "aivideo", name: "FAHMI AI Video Generator", description: "Storyboard video dari prompt (klip singkat)", badge: "AI VIDEO", icon: "fa-clapperboard", category: "tools", format: "AI", rgb: "251,113,133" },
  { id: "genmail", name: "GenMail", description: "Buat email sementara, periksa inbox, dan baca pesan", badge: "TEMP MAIL", icon: "fa-envelope-open-text", category: "tools", format: "UTILITY", rgb: "52,211,153" },
  { id: "danbooru", name: "Danbooru Search", description: "Cari ilustrasi berdasarkan tag (rating aman default)", badge: "SAFE DEFAULT", icon: "fa-photo-film", category: "tools", format: "UTILITY", rgb: "251,146,60" },
  { id: "animegallery", name: "FAHMI Anime Discover", description: "Visual discovery SFW dari Waifu.im", badge: "NEW · SFW", icon: "fa-images", category: "tools", format: "UTILITY", rgb: "125,211,252" },
  { id: "animetoreal", name: "Anime to Real", description: "Ubah ilustrasi menjadi gaya realistis dengan AI", badge: "AI TRANSFORM", icon: "fa-person-rays", category: "tools", format: "AI", rgb: "59,130,246" },
  { id: "aisong", name: "FAHMI AI Song Generator", description: "Ubah ide menjadi lirik, struktur, dan mood lagu", badge: "AI MUSIC", icon: "fa-music", category: "tools", format: "AI", rgb: "56,189,248" },
  { id: "elevenlabs", name: "FAHMI Voice Studio", description: "Text to Speech dengan suara ekspresif", badge: "AUDIO AI", icon: "fa-wave-square", category: "tools", format: "AI", rgb: "125,211,252" },
  { id: "promptgenerate", name: "FAHMI Prompt Generator", description: "Analisis gambar menjadi prompt produksi profesional", badge: "VISION AI", icon: "fa-pen-ruler", category: "tools", format: "AI", rgb: "125,211,252" },
  { id: "novelcover", name: "FAHMI Novel Cover Generator", description: "AI Cover Director untuk artwork dan tipografi novel", badge: "COVER", icon: "fa-book-atlas", category: "tools", format: "AI", rgb: "251,191,36" },
  { id: "fakeovo", name: "Fake OVO", description: "Simulasi saldo OVO dengan watermark permanen", badge: "SIMULASI", icon: "fa-wallet", category: "maker", format: "CREATE", rgb: "59,130,246" },
  { id: "quotegenerator", name: "Quote Generator", description: "Buat gambar quote monokrom", badge: "JPG", icon: "fa-quote-left", category: "tools", format: "CREATE", rgb: "226,232,240" },
  { id: "carifakta", name: "CariFakta", description: "Analisis klaim dan berita menggunakan AI", badge: "AI", icon: "fa-magnifying-glass-chart", category: "tools", format: "AI", rgb: "56,189,248" },
  { id: "virusscan", name: "Virus Scan", description: "Scan URL, hash, domain & IP (heuristik + header)", badge: "SECURITY", icon: "fa-shield-virus", category: "tools", format: "UTILITY", rgb: "248,113,113" },
  { id: "cryptomarket", name: "TradingView Market", description: "Chart TradingView untuk kripto — ketik simbol, tanpa CoinGecko.", badge: "TV", icon: "fa-chart-line", category: "tools", format: "MARKET", rgb: "52,211,153" },
  { id: "cryptoanalisa", name: "Crypto Analisa", description: "Scan koin 1 tahun: return, high/low, volume, teks live, dan ulasan edukatif.", badge: "1Y SCAN", icon: "fa-chart-area", category: "tools", format: "AI", rgb: "56,189,248" },
  { id: "marketpulse", name: "Market Pulse", description: "IHSG, blue chip BEI, S&P, emas, minyak, kurs di chart TradingView.", badge: "LIVE", icon: "fa-heartbeat", category: "tools", format: "MARKET", rgb: "56,189,248" },
  { id: "sahamdesk", name: "Saham Desk", description: "Cari ticker BEI/AS, chart TradingView, lalu scan 1 tahun dengan teks live di bawah.", badge: "IDX", icon: "fa-building-columns", category: "tools", format: "MARKET", rgb: "96,165,250" },
  { id: "capitalagent", name: "Capital Agent", description: "Materi saham 1 tahun: supply, keuangan, market cap, scan live, dan ulasan rinci. Bukan nasihat beli.", badge: "1Y", icon: "fa-magnifying-glass-chart", category: "tools", format: "AI", rgb: "59,130,246" },
  { id: "datahub", name: "Data Hub", description: "Konversi kurs dan chart forex TradingView dalam satu meja.", badge: "FX", icon: "fa-table", category: "tools", format: "UTILITY", rgb: "125,211,252" },
  { id: "freemusic", name: "Free Music + Lirik", description: "Ketik judul, cari musik gratis, putar, unduh audio, dan lirik penuh.", badge: "FREE", icon: "fa-music", category: "downloader", format: "MEDIA", rgb: "52,211,153" },
  { id: "webintel", name: "FAHMI Web Intelligence", description: "Audit SEO dasar, header security, dan teknologi website", badge: "INTEL", icon: "fa-satellite-dish", category: "tools", format: "UTILITY", rgb: "125,211,252" },
  { id: "ipintel", name: "IP & ASN Intelligence", description: "Lookup IPv4/IPv6, organisasi, negara dan ISP", badge: "IPINFO", icon: "fa-network-wired", category: "tools", format: "UTILITY", rgb: "96,165,250" },
  { id: "bmkg", name: "BMKG Indonesia", description: "Gempa terkini, dirasakan, M5+, dan prakiraan cuaca 3 hari resmi BMKG.", badge: "BMKG", icon: "fa-cloud-sun-rain", category: "tools", format: "UTILITY", rgb: "56,189,248" },
  { id: "spaceexplorer", name: "Space Explorer", description: "APOD NASA, asteroid dekat Bumi", badge: "NASA", icon: "fa-user-astronaut", category: "tools", format: "UTILITY", rgb: "129,140,248" },
  { id: "ocrintel", name: "FAHMI OCR Intelligence", description: "Ekstrak teks dari gambar dengan vision AI", badge: "OCR", icon: "fa-file-lines", category: "tools", format: "AI", rgb: "125,211,252" },
  { id: "documentai", name: "FAHMI Document AI", description: "Ringkas, analisis, dan tanya isi dokumen", badge: "AI", icon: "fa-file-circle-question", category: "tools", format: "AI", rgb: "59,130,246" },
  { id: "autopdf", name: "FAHMI Auto PDF", description: "Ubah teks panjang menjadi halaman A5 siap cetak", badge: "PDF", icon: "fa-file-pdf", category: "tools", format: "UTILITY", rgb: "248,113,113" },
  { id: "pdflab", name: "PDF Lab Local", description: "Merge daftar halaman, watermark, dan metadata di browser", badge: "100% LOCAL", icon: "fa-layer-group", category: "tools", format: "UTILITY", rgb: "251,146,60" },
  { id: "svgalight", name: "SVG → Alight XML", description: "Konversi SVG ke XML Alight Motion", badge: "ENGINE", icon: "fa-bezier-curve", category: "tools", format: "CREATE", rgb: "56,189,248" },
  { id: "alightpremium", name: "Alight Motion XML Pack", description: "Preset XML 1 tahun-style: teks, logo, transisi", badge: "PRESET", icon: "fa-clapperboard", category: "tools", format: "CREATE", rgb: "244,114,182" },
  { id: "imagevectorizer", name: "AUTO TRACE", description: "Trace gambar menjadi SVG vector (mode poster)", badge: "DUAL SVG", icon: "fa-vector-square", category: "tools", format: "CREATE", rgb: "125,211,252" },
  { id: "fotolink", name: "Foto To Link", description: "Ubah gambar menjadi data URL / unduhan lokal", badge: "NO API KEY", icon: "fa-link", category: "tools", format: "UTILITY", rgb: "52,211,153" },
  { id: "smartcutout", name: "FAHMI Smart Cutout", description: "Tap background, refine mask, ekspor PNG transparan", badge: "LOCAL AI", icon: "fa-scissors", category: "tools", format: "CREATE", rgb: "59,130,246" },
  { id: "placeholderstudio", name: "FAHMI Placeholder Studio", description: "Buat placeholder Classic berbasis ukuran dan warna", badge: "NO API KEY", icon: "fa-image", category: "tools", format: "CREATE", rgb: "148,163,184" },
  { id: "text2d", name: "2D Text Animate / Text FX", description: "Buat XML animasi teks 2D dengan preset", badge: "XML", icon: "fa-font", category: "tools", format: "CREATE", rgb: "125,211,252" },
  { id: "text3d", name: "3D Text Animate", description: "XML teks 3D, extrude, offset, dan long shadow", badge: "7 PRESET", icon: "fa-cubes", category: "tools", format: "CREATE", rgb: "56,189,248" },
  { id: "textfxanimation", name: "Text FX Animation", description: "Preset efek teks native untuk Alight Motion", badge: "5 PRESET", icon: "fa-text-height", category: "tools", format: "CREATE", rgb: "244,114,182" },
  { id: "textvector", name: "Text to Vector", description: "Ubah teks menjadi path SVG vector", badge: "OPENTYPE", icon: "fa-draw-polygon", category: "tools", format: "CREATE", rgb: "125,211,252" },
  { id: "trimpath", name: "Trimpath Generator", description: "Generator trimpath huruf dengan timing", badge: "LOCAL XML", icon: "fa-route", category: "tools", format: "CREATE", rgb: "56,189,248" },
  { id: "logoanimate", name: "Logo Animate", description: "Template animasi logo dan text block", badge: "8.33S", icon: "fa-shapes", category: "tools", format: "CREATE", rgb: "251,191,36" },
  { id: "calc", name: "Calculator", description: "Hitung cepat", badge: "MATH", icon: "fa-calculator", category: "tools", format: "UTILITY", rgb: "226,232,240" },
  { id: "pwgen", name: "Password Gen", description: "Password aman", badge: "SECURE", icon: "fa-key", category: "tools", format: "UTILITY", rgb: "52,211,153" },
  { id: "morse", name: "Morse Code", description: "Konversi morse + audio", badge: "AUDIO", icon: "fa-tower-broadcast", category: "tools", format: "UTILITY", rgb: "125,211,252" },
  { id: "removebg", name: "Remove BG", description: "Hapus background dengan flood-fill lokal", badge: "LOCAL", icon: "fa-eraser", category: "tools", format: "CREATE", rgb: "244,114,182" },
  { id: "enhancer", name: "Upscale Image / HD Enhancer", description: "Perbesar gambar 2× dengan interpolasi tajam", badge: "UPSCALE", icon: "fa-sliders", category: "tools", format: "CREATE", rgb: "59,130,246" },
  { id: "worldclassics", name: "World Classics Reader", description: "Sastra klasik dengan terjemahan ringkas Indonesia", badge: "NEW", icon: "fa-book-open", category: "tools", format: "UTILITY", rgb: "251,191,36" },

  { id: "ttquote", name: "Quote TikTok FAHMI", description: "Buat fake TikTok chat versi FAHMI", badge: "FAHMI", icon: "fa-comment-dots", category: "vault", format: "CREATE", rgb: "56,189,248" },
  { id: "qrgen", name: "QR Generator", description: "Buat QR langsung di sini", badge: "QR", icon: "fa-qrcode", category: "vault", format: "UTILITY", rgb: "226,232,240" },

  { id: "tiktokhd", name: "Upload TikTok HD", description: "Encoder lokal: siapkan video vertikal 1080p", badge: "HD", icon: "fa-upload", category: "external", format: "MEDIA", rgb: "125,211,252" },
  { id: "getcode", name: "Get Code HTML", description: "Extract, preview, copy & download source", badge: "PRO", icon: "fa-code", category: "external", format: "UTILITY", rgb: "56,189,248" },
  { id: "vdeploy", name: "Deploy Checklist", description: "Checklist rilis web: domain, OG, PWA, performa", badge: "UPDATE", icon: "fa-rocket", category: "external", format: "UTILITY", rgb: "251,146,60" },
  { id: "zxvai", name: "ZxVAI", description: "Workspace AI internal FAHMI", badge: "AI", icon: "fa-robot", category: "external", format: "AI", rgb: "59,130,246" },
  { id: "webencryption", name: "Web Encryption", description: "Encrypt & protect HTML", badge: "SECURE", icon: "fa-lock", category: "external", format: "UTILITY", rgb: "52,211,153" },
  { id: "unbanwa", name: "Unban WhatsApp", description: "Panduan banding resmi WhatsApp — bukan jasa unban", badge: "WA", icon: "fa-brands fa-whatsapp", category: "external", format: "UTILITY", rgb: "52,211,153" },
];

export const PAGE_SIZE = 12;

export function toolsByTab(tab: TabId) {
  if (tab === "all" || tab === "visuals") return TOOLS;
  return TOOLS.filter((t) => t.category === tab);
}

export function getTool(id: string) {
  return TOOLS.find((t) => t.id === id);
}

export const ACCESS = {
  label: "FULL FREE",
  note: "Semua tool terbuka. Tanpa login, tanpa bayar.",
};
