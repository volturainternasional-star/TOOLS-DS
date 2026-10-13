import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { L as FaIcon, f as ACCESS, l as ModeBar, m as TOOLS, o as BackgroundGlow, x as saveMode, y as loadMode } from "./router-SOGDFaiQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vvip-lcaEQk_l.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FullFreePage() {
	const [mode, setMode] = (0, import_react.useState)("full");
	(0, import_react.useEffect)(() => {
		setMode(loadMode());
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackgroundGlow, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-vvip",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "nx-back",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIcon, { name: "fa-arrow-left" }), " Kembali"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "nx-kicker",
				children: "TANPA LOGIN · TANPA BAYAR"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: ["FULL ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "FREE" })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "nx-lead",
				children: [ACCESS.note, " Katalog, visual, downloader, dan desk pasar bisa dibaca langsung."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeBar, {
				mode,
				onChange: (next) => {
					setMode(next);
					saveMode(next);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "tools-grid",
				style: { marginTop: 18 },
				children: [
					["Tidak ada akun", "Tidak ada tombol masuk, daftar, atau sesi berbayar. Buka tool dan pakai."],
					["Full mode", "Semua kartu katalog tampil sekaligus, deskripsi lebih panjang, efek visual hidup."],
					["Pulse", "Garis scan dan glow kartu, seperti mode efek di situs aslinya."],
					["Standard", "Katalog dipotong per halaman kalau ingin lebih ringan."]
				].map(([t, d]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "nx-panel",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: t }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							color: "#9fb6cc",
							marginTop: 6,
							fontSize: 13
						},
						children: d
					})]
				}, t))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				style: {
					fontFamily: "Orbitron,sans-serif",
					margin: "28px 0 12px"
				},
				children: ["Semua tool terbuka · ", TOOLS.length]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "tools-grid",
				children: TOOLS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/tool/$id",
					params: { id: t.id },
					className: "tools-card is-full",
					style: {
						["--nx-card-rgb"]: t.rgb,
						minHeight: 150
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "nx-card-top",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIcon, { name: t.icon })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "badge",
							children: "FREE"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "nx-card-copy",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: t.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t.description })]
					})]
				}, t.id))
			})
		]
	})] });
}
//#endregion
export { FullFreePage as component };
