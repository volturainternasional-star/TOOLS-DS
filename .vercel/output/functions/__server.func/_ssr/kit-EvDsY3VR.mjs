import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { L as FaIcon } from "./router-SOGDFaiQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kit-EvDsY3VR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		style: {
			display: "block",
			marginBottom: 12
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "nx-label",
			children: label
		}), children]
	});
}
function useBusy() {
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	async function run(fn) {
		setBusy(true);
		setError("");
		try {
			return await fn();
		} catch (e) {
			setError(e instanceof Error ? e.message : "Terjadi kesalahan");
			return null;
		} finally {
			setBusy(false);
		}
	}
	return {
		busy,
		error,
		setError,
		run
	};
}
function Action({ children, onClick, busy, ghost }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		className: `nx-btn${ghost ? " ghost" : ""}`,
		type: "button",
		disabled: busy,
		onClick,
		children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIcon, { name: "fa-spinner fa-spin" }) : null, children]
	});
}
function downloadUrl(url, name) {
	const a = document.createElement("a");
	a.href = url;
	a.download = name;
	a.rel = "noopener";
	a.target = "_blank";
	a.click();
}
function canvasPng(canvas, name) {
	canvas.toBlob((blob) => {
		if (!blob) return;
		downloadUrl(URL.createObjectURL(blob), name);
	}, "image/png");
}
function fillCard(ctx, w, h, title, lines, watermark) {
	const g = ctx.createLinearGradient(0, 0, w, h);
	g.addColorStop(0, "#1e1135");
	g.addColorStop(1, "#0b0814");
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = "rgba(56,189,248,.45)";
	ctx.lineWidth = 4;
	ctx.strokeRect(18, 18, w - 36, h - 36);
	ctx.fillStyle = "#dbeafe";
	ctx.font = "700 28px Poppins,sans-serif";
	ctx.fillText(title, 40, 70);
	ctx.fillStyle = "#c4b5fd";
	ctx.font = "16px Poppins,sans-serif";
	lines.forEach((l, i) => ctx.fillText(l, 40, 120 + i * 28));
	ctx.save();
	ctx.translate(w / 2, h / 2);
	ctx.rotate(-.4);
	ctx.fillStyle = "rgba(255,80,80,.28)";
	ctx.font = "800 42px Orbitron,sans-serif";
	ctx.textAlign = "center";
	ctx.fillText(watermark, 0, 0);
	ctx.restore();
}
function Note({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		style: {
			color: "#6b8499",
			fontSize: 12,
			lineHeight: 1.5,
			margin: "8px 0 14px"
		},
		children
	});
}
//#endregion
export { downloadUrl as a, canvasPng as i, Field as n, fillCard as o, Note as r, useBusy as s, Action as t };
