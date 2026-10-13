//#region node_modules/.nitro/vite/services/ssr/assets/tool-guides-DcR75c17.js
var GLOSSARY = [
	{
		term: "IHSG",
		body: "Indeks Harga Saham Gabungan — ringkasan pergerakan hampir semua saham di Bursa Efek Indonesia."
	},
	{
		term: "Ticker / Kode emiten",
		body: "Kode 4 huruf di BEI, misalnya BBCA. Di Yahoo biasanya ditulis BBCA.JK."
	},
	{
		term: "Lot",
		body: "Satuan transaksi BEI. 1 lot = 100 lembar saham."
	},
	{
		term: "Bid / Offer",
		body: "Bid = harga pembeli tertinggi. Offer/ask = harga penjual terendah."
	},
	{
		term: "Market cap",
		body: "Nilai pasar perusahaan: harga saham × jumlah saham beredar."
	},
	{
		term: "P/E (PER)",
		body: "Price to Earnings. Harga dibagi laba per saham. Tinggi bisa berarti mahal atau pertumbuhan tinggi."
	},
	{
		term: "EPS",
		body: "Earning per share — laba bersih dibagi jumlah saham."
	},
	{
		term: "Dividend yield",
		body: "Dividen tahunan dibagi harga saham, dalam persen."
	},
	{
		term: "Beta",
		body: "Seberapa bergoyang saham dibanding pasar. Beta > 1 biasanya lebih volatile."
	},
	{
		term: "ROE",
		body: "Return on equity — laba dibanding modal pemegang saham."
	},
	{
		term: "IDX / BEI",
		body: "Indonesia Stock Exchange / Bursa Efek Indonesia, pasar saham resmi di Jakarta."
	},
	{
		term: "Blue chip",
		body: "Saham besar, likuid, biasanya jadi acuan indeks (BBCA, BBRI, TLKM, dll)."
	},
	{
		term: "Bull / Bear",
		body: "Bull = pasar naik. Bear = pasar turun. Bukan ramalan, hanya sebutan arah."
	},
	{
		term: "Spread",
		body: "Selisih bid dan offer. Spread lebar = lebih mahal untuk bolak-balik."
	},
	{
		term: "Supply / saham beredar",
		body: "Jumlah lembar saham yang sudah diterbitkan. Market cap = harga × saham beredar."
	},
	{
		term: "Float",
		body: "Saham yang benar-benar bisa diperdagangkan di pasar, setelah dikurangi porsi pendiri/insider yang terkunci."
	},
	{
		term: "52-week high/low",
		body: "Harga tertinggi dan terendah dalam 52 minggu. Menunjukkan rentang setahun, bukan target harga."
	},
	{
		term: "Return 1 tahun",
		body: "Perubahan harga dari sekitar 12 bulan lalu sampai sekarang, dalam persen."
	},
	{
		term: "Volume",
		body: "Jumlah yang ditransaksikan. Volume besar = lebih mudah masuk-keluar tanpa menggeser harga."
	}
];
var TOOL_GUIDES = {
	marketpulse: {
		how: "Papan ini menarik IHSG, indeks AS, blue chip BEI, emas, minyak, dan kurs. Angka live dari bursa — bukan sinyal beli.",
		related: [
			"sahamdesk",
			"capitalagent",
			"datahub",
			"cryptomarket"
		]
	},
	sahamdesk: {
		how: "Ketik ticker (BBCA) atau nama emiten. Buka chart, lalu Scan 1 tahun untuk materi + teks live di bawah.",
		related: [
			"capitalagent",
			"marketpulse",
			"datahub"
		]
	},
	capitalagent: {
		how: "Masukkan ticker, tekan Scan perusahaan 1 tahun. Log live, supply, keuangan tahunan, lalu ulasan rinci muncul di bawah chart.",
		related: [
			"sahamdesk",
			"marketpulse",
			"cryptoanalisa"
		]
	},
	datahub: {
		how: "Satu meja data: konversi kurs, komoditas, dan tempel JSON/CSV untuk dibaca sebagai tabel lalu diunduh ulang.",
		related: [
			"marketpulse",
			"cryptomarket",
			"calc"
		]
	},
	tooladvisor: {
		how: "Tulis apa yang mau kamu kerjakan. Matcher lokal + AI (opsional) menunjuk tool yang paling pas.",
		related: [
			"marketpulse",
			"documentai",
			"webintel"
		]
	},
	cryptomarket: {
		how: "Pilih koin atau ketik simbol TradingView (BINANCE:BTCUSDT). Chart live, bukan daftar CoinGecko.",
		related: [
			"cryptoanalisa",
			"marketpulse",
			"datahub"
		]
	},
	cryptoanalisa: {
		how: "Pilih koin, tekan Scan 1 tahun. Log live, angka, sparkline, chart TradingView, lalu ulasan muncul di bawah.",
		related: [
			"cryptomarket",
			"capitalagent",
			"marketpulse"
		]
	},
	freemusic: {
		how: "Ketik judul/mood, cari. Putar, unduh audio, ambil lirik penuh, unduh .txt. Archive = berkas penuh gratis.",
		related: [
			"aisong",
			"elevenlabs",
			"spotify"
		]
	},
	bmkg: {
		how: "Pilih kota, muat data. Gempa auto + dirasakan + M5+ dan prakiraan 3 jam-an resmi BMKG.",
		related: ["ipintel", "webintel"]
	},
	instagram: {
		how: "Tempel URL post/reel. Sistem coba metadata + tautan file jika provider mengizinkan.",
		related: ["tiktok", "youtube"]
	},
	tiktok: {
		how: "Tempel tautan TikTok. Jika provider HD hidup, unduh tanpa watermark muncul sebagai tombol.",
		related: ["instagram", "tiktokhd"]
	},
	youtube: {
		how: "Tempel tautan YouTube. Metadata oEmbed selalu dicoba; unduhan file tergantung ketersediaan host.",
		related: ["tiktok", "spotify"]
	},
	calc: {
		how: "Ketik ekspresi, Enter untuk hitung. Riwayat tersimpan di perangkat ini.",
		related: ["datahub", "pwgen"]
	},
	pwgen: {
		how: "Geser panjang, generate, salin. Kekuatan dihitung lokal — sandi tidak diunggah.",
		related: ["webencryption", "calc"]
	},
	documentai: {
		how: "Tempel isi dokumen, minta ringkas/poin/tabel. Jangan kirim data rahasia.",
		related: ["ocrintel", "autopdf"]
	},
	ocrintel: {
		how: "Unggah gambar. Vision AI mengekstrak teks yang terlihat.",
		related: ["documentai", "promptgenerate"]
	},
	promptgenerate: {
		how: "Unggah referensi visual. Model menulis prompt produksi (subject, light, lens).",
		related: ["aiimage", "ocrintel"]
	}
};
//#endregion
export { TOOL_GUIDES as n, GLOSSARY as t };
