import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { L as FaIcon, o as BackgroundGlow } from "./router-SOGDFaiQ.mjs";
import { n as Field, t as Action } from "./kit-EvDsY3VR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/feedback-S0h-ZmUw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FeedbackPage() {
	const [sent, setSent] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		type: "bug",
		title: "",
		body: ""
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackgroundGlow, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nx-room",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "nx-room-head",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "nx-back",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIcon, { name: "fa-arrow-left" }), " Kembali"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nx-room-title",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "REPORT BUG, SARAN & IDE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "All Tools FAHMI · Dev Feedback Center" })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "nx-panel",
			children: sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "nx-ok",
				children: "Tersimpan di perangkat ini. Terima kasih — masukanmu masuk antrian lokal FAHMI."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Jenis",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "nx-select",
						value: form.type,
						onChange: (e) => setForm({
							...form,
							type: e.target.value
						}),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "bug",
								children: "Bug"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "saran",
								children: "Saran"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "ide",
								children: "Ide fitur"
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Judul",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "nx-input",
						value: form.title,
						onChange: (e) => setForm({
							...form,
							title: e.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Detail",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "nx-textarea",
						value: form.body,
						onChange: (e) => setForm({
							...form,
							body: e.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
					onClick: () => {
						const prev = JSON.parse(localStorage.getItem("fahmi.feedback") || "[]");
						localStorage.setItem("fahmi.feedback", JSON.stringify([{
							...form,
							at: Date.now()
						}, ...prev]));
						setSent(true);
					},
					children: "Kirim"
				})
			] })
		})]
	})] });
}
//#endregion
export { FeedbackPage as component };
