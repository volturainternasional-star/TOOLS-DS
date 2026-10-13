import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-BdLSdx2N.js
async function xaiChat(messages, opts) {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "AI belum tersedia di lingkungan ini."
	};
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: opts?.model ?? "grok-4.5",
			messages,
			max_tokens: opts?.max_tokens ?? 700
		})
	});
	if (!res.ok) {
		const t = await res.text().catch(() => "");
		return {
			ok: false,
			error: `xAI error ${res.status}${t ? `: ${t.slice(0, 180)}` : ""}`
		};
	}
	return {
		ok: true,
		text: (await res.json()).choices?.[0]?.message?.content ?? ""
	};
}
var askFahmiAi_createServerFn_handler = createServerRpc({
	id: "22179b928cc5e7f9904d26edd119c54ed031b177244389886ea390055c8fbe4a",
	name: "askFahmiAi",
	filename: "src/lib/server/ai.ts"
}, (opts) => askFahmiAi.__executeServer(opts));
var askFahmiAi = createServerFn({ method: "POST" }).validator((input) => input).handler(askFahmiAi_createServerFn_handler, async ({ data }) => {
	return xaiChat([{
		role: "system",
		content: data.persona ?? "Kamu adalah FAHMI AI, asisten personal Liquid Reactor untuk All Tools FAHMI. Jawab ringkas, jelas, bilingual ID/EN sesuai bahasa user. Bantu downloader, maker, AI, dan utilitas. Jangan klaim bisa unban akun atau membuat dokumen resmi."
	}, ...data.messages.slice(-12)], { max_tokens: 800 });
});
var askToolAi_createServerFn_handler = createServerRpc({
	id: "0acbfca3f21879f4221b7c2fa001df38fdc8f496b19ed6d3f84b9498c25813f4",
	name: "askToolAi",
	filename: "src/lib/server/ai.ts"
}, (opts) => askToolAi.__executeServer(opts));
var askToolAi = createServerFn({ method: "POST" }).validator((input) => input).handler(askToolAi_createServerFn_handler, async ({ data }) => {
	return xaiChat([{
		role: "system",
		content: data.system ?? "Kamu asisten FAHMI. Jawaban padat, terstruktur, tanpa basa-basi."
	}, {
		role: "user",
		content: data.prompt.slice(0, 8e3)
	}], { max_tokens: data.max ?? 700 });
});
var generateImage_createServerFn_handler = createServerRpc({
	id: "c91484e40e92a1508c4d3c847c766254cf3f0c5828d19151b3fe64db792f2f36",
	name: "generateImage",
	filename: "src/lib/server/ai.ts"
}, (opts) => generateImage.__executeServer(opts));
var generateImage = createServerFn({ method: "POST" }).validator((input) => input).handler(generateImage_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "AI gambar belum tersedia."
	};
	const res = await fetch("https://api.x.ai/v1/images/generations", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-imagine-image",
			prompt: data.prompt.slice(0, 1200),
			n: 1,
			resolution: "1k"
		})
	});
	if (!res.ok) {
		const t = await res.text().catch(() => "");
		return {
			ok: false,
			error: `Image error ${res.status}${t ? `: ${t.slice(0, 180)}` : ""}`
		};
	}
	const first = (await res.json()).data?.[0];
	const url = first?.url ?? (first?.b64_json ? `data:image/png;base64,${first.b64_json}` : "");
	if (!url) return {
		ok: false,
		error: "Tidak ada gambar dari model."
	};
	return {
		ok: true,
		url
	};
});
var speakText_createServerFn_handler = createServerRpc({
	id: "fb8d601fe255275bac671600aeaa808970d0306fdc1c4d227076341bcc8df5f0",
	name: "speakText",
	filename: "src/lib/server/ai.ts"
}, (opts) => speakText.__executeServer(opts));
var speakText = createServerFn({ method: "POST" }).validator((input) => input).handler(speakText_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "Voice belum tersedia."
	};
	const res = await fetch("https://api.x.ai/v1/tts", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			text: data.text.slice(0, 800),
			voice_id: data.voice || "eve"
		})
	});
	if (!res.ok) {
		const t = await res.text().catch(() => "");
		return {
			ok: false,
			error: `TTS error ${res.status}${t ? `: ${t.slice(0, 180)}` : ""}`
		};
	}
	return {
		ok: true,
		audio: `data:audio/mpeg;base64,${Buffer.from(await res.arrayBuffer()).toString("base64")}`
	};
});
//#endregion
export { askFahmiAi_createServerFn_handler, askToolAi_createServerFn_handler, generateImage_createServerFn_handler, speakText_createServerFn_handler };
