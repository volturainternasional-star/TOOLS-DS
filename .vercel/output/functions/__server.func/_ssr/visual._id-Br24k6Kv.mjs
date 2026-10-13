import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { L as FaIcon, n as Route, o as BackgroundGlow } from "./router-SOGDFaiQ.mjs";
import { t as VISUALS } from "./visuals-q4XUiG7c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/visual._id-Br24k6Kv.js
var import_jsx_runtime = require_jsx_runtime();
function VisualPage() {
	const { id } = Route.useParams();
	const item = VISUALS.find((v) => v.id === id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackgroundGlow, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-room",
		style: { maxWidth: 1100 },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "nx-room-head",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "nx-back",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIcon, { name: "fa-arrow-left" }), " Katalog"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nx-room-title",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item?.name ?? "Visual" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "FAHMI Visual Website" })]
			})]
		}), item ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
			title: item.name,
			srcDoc: item.html,
			style: {
				width: "100%",
				height: "70vh",
				border: 0,
				borderRadius: 20,
				background: "#030712"
			}
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Visual tidak ditemukan." })]
	})] });
}
//#endregion
export { VisualPage as component };
