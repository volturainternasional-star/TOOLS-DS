import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { L as FaIcon, _ as clearHistory, a as AppFooter, c as Hero, d as TopNav, g as toolsByTab, i as AiDock, l as ModeBar, o as BackgroundGlow, p as TABS, s as FreeMark, u as SessionCard, v as loadHistory, x as saveMode, y as loadMode } from "./router-SOGDFaiQ.mjs";
import { n as TOOL_GUIDES } from "./tool-guides-DcR75c17.mjs";
import { t as VISUALS } from "./visuals-q4XUiG7c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-hXtmojRv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const [tab, setTab] = (0, import_react.useState)("all");
	const [q, setQ] = (0, import_react.useState)("");
	const [page, setPage] = (0, import_react.useState)(1);
	const [history, setHistory] = (0, import_react.useState)([]);
	const [kind, setKind] = (0, import_react.useState)("semua");
	const [mode, setMode] = (0, import_react.useState)("full");
	(0, import_react.useEffect)(() => {
		setHistory(loadHistory());
		setMode(loadMode());
	}, [tab]);
	const list = (0, import_react.useMemo)(() => {
		const base = tab === "visuals" ? [] : toolsByTab(tab);
		return q.trim() ? base.filter((t) => `${t.name} ${t.description} ${t.badge}`.toLowerCase().includes(q.toLowerCase())) : base;
	}, [tab, q]);
	const shown = mode === "full" ? list : list.slice(0, page * 12);
	const historyShown = history.filter((h) => kind === "semua" ? true : h.kind.toLowerCase().includes(kind));
	const visuals = (0, import_react.useMemo)(() => {
		return q.trim() ? VISUALS.filter((v) => `${v.name} ${v.tag}`.toLowerCase().includes(q.toLowerCase())) : VISUALS;
	}, [q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			className: "nx-skip",
			href: "#main-content",
			children: "Lewati ke konten utama"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackgroundGlow, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FreeMark, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopNav, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "nx-container",
			id: "main-content",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeBar, {
					mode,
					onChange: (next) => {
						setMode(next);
						saveMode(next);
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionCard, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "nav-tabs",
					role: "tablist",
					children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: `nav-tab${tab === t.id ? " active" : ""}`,
						type: "button",
						onClick: () => {
							setTab(t.id);
							setPage(1);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIcon, { name: t.icon }),
							" ",
							t.label
						]
					}, t.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "nx-search",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIcon, { name: "fa-magnifying-glass" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						placeholder: tab === "visuals" ? "Cari visual, animasi, atau efek…" : "Cari tools…",
						value: q,
						onChange: (e) => {
							setQ(e.target.value);
							setPage(1);
						},
						suppressHydrationWarning: true
					})]
				}),
				tab === "visuals" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "nx-visual-intro",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: 10,
								letterSpacing: "0.16em",
								color: "#6b8499",
								fontWeight: 800
							},
							children: "INTERACTIVE WEB EXPERIMENTS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "FAHMI Visual Website" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: mode === "full" ? "Full mode: semua eksperimen kebaca sekaligus, efeknya hidup di kartu. Gratis, tanpa login." : "Jelajahi animasi, interaksi, loader, dan eksperimen visual dari satu katalog ringan." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "nx-visual-total",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: VISUALS.length }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "VISUAL" })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "nx-visual-grid",
					children: visuals.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/visual/$id",
						params: { id: v.id },
						className: "nx-visual-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "preview",
							children: mode === "standard" ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
								title: "",
								srcDoc: v.html,
								sandbox: "allow-scripts",
								tabIndex: -1
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: v.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: v.tag.toUpperCase() })] })]
					}, v.id))
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "section-title",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "icon-box",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIcon, { name: TABS.find((t) => t.id === tab)?.icon ?? "fa-th-large" })
							}),
							tab === "all" ? "Semua Tools" : TABS.find((t) => t.id === tab)?.label,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "line" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "nx-catalog-count",
								children: list.length
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "tools-grid",
						children: shown.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/tool/$id",
							params: { id: t.id },
							className: `tools-card${mode === "full" ? " is-full" : ""}`,
							style: { ["--nx-card-rgb"]: t.rgb },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "nx-card-top",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "icon",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIcon, { name: t.icon })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "badge",
										children: t.badge
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "nx-card-copy",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: t.name }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t.description }),
										mode === "full" && TOOL_GUIDES[t.id] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
											className: "nx-card-how",
											children: TOOL_GUIDES[t.id].how
										}) : null
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "nx-card-footer",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "nx-card-readiness",
											children: "Gratis"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "nx-card-format",
											children: t.format
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "arrow",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIcon, { name: "fa-arrow-right" })
										})
									]
								})
							]
						}, t.id))
					}),
					mode !== "full" && shown.length < list.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "nx-more",
						type: "button",
						onClick: () => setPage((p) => p + 1),
						children: ["Tampilkan tools lagi ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
							shown.length,
							"/",
							list.length
						] })]
					}) : null,
					tab === "downloader" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "history-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "history-top",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaIcon, { name: "fa-clock-rotate-left" }), " History Download"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "nx-btn ghost",
									type: "button",
									onClick: () => {
										clearHistory();
										setHistory([]);
									},
									children: "Bersihkan"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "nx-kind-row",
								children: [
									["semua", "Semua"],
									["mp3", "MP3"],
									["mp4", "MP4"],
									["jpg", "JPG"],
									["file", "FILE"]
								].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: `nx-chip${kind === id ? " is-on" : ""}`,
									onClick: () => setKind(id),
									children: label
								}, id))
							}),
							historyShown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "history-empty",
								children: "Belum ada riwayat. Download berhasil dari musik, Instagram, atau TikTok akan muncul di sini."
							}) : historyShown.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "history-item",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: h.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: h.kind })]
							}, i))
						]
					}) : null
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppFooter, {})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiDock, {})
	] });
}
//#endregion
export { Home as component };
