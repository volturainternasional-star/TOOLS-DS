import { createServerFn } from "@tanstack/react-start";

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

async function xaiChat(messages: ChatMessage[], opts?: { max_tokens?: number; model?: string }) {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) return { ok: false as const, error: "AI belum tersedia di lingkungan ini." };
  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: opts?.model ?? "grok-4.5",
      messages,
      max_tokens: opts?.max_tokens ?? 700,
    }),
  });
  if (!res.ok) {
    const t = await res.text().catch(() => "");
    return { ok: false as const, error: `xAI error ${res.status}${t ? `: ${t.slice(0, 180)}` : ""}` };
  }
  const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  return { ok: true as const, text: body.choices?.[0]?.message?.content ?? "" };
}

export const askFahmiAi = createServerFn({ method: "POST" })
  .validator((input: { messages: ChatMessage[]; persona?: string }) => input)
  .handler(async ({ data }) => {
    const system =
      data.persona ??
      "Kamu adalah FAHMI AI, asisten personal Liquid Reactor untuk All Tools FAHMI. Jawab ringkas, jelas, bilingual ID/EN sesuai bahasa user. Bantu downloader, maker, AI, dan utilitas. Jangan klaim bisa unban akun atau membuat dokumen resmi.";
    const messages: ChatMessage[] = [
      { role: "system", content: system },
      ...data.messages.slice(-12),
    ];
    return xaiChat(messages, { max_tokens: 800 });
  });

export const askToolAi = createServerFn({ method: "POST" })
  .validator((input: { prompt: string; system?: string; max?: number }) => input)
  .handler(async ({ data }) => {
    return xaiChat(
      [
        {
          role: "system",
          content:
            data.system ??
            "Kamu asisten FAHMI. Jawaban padat, terstruktur, tanpa basa-basi.",
        },
        { role: "user", content: data.prompt.slice(0, 8000) },
      ],
      { max_tokens: data.max ?? 700 },
    );
  });

export const generateImage = createServerFn({ method: "POST" })
  .validator((input: { prompt: string }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false as const, error: "AI gambar belum tersedia." };
    const res = await fetch("https://api.x.ai/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-imagine-image",
        prompt: data.prompt.slice(0, 1200),
        n: 1,
        resolution: "1k",
      }),
    });
    if (!res.ok) {
      const t = await res.text().catch(() => "");
      return { ok: false as const, error: `Image error ${res.status}${t ? `: ${t.slice(0, 180)}` : ""}` };
    }
    const body = (await res.json()) as { data?: { url?: string; b64_json?: string }[] };
    const first = body.data?.[0];
    const url = first?.url ?? (first?.b64_json ? `data:image/png;base64,${first.b64_json}` : "");
    if (!url) return { ok: false as const, error: "Tidak ada gambar dari model." };
    return { ok: true as const, url };
  });

export const speakText = createServerFn({ method: "POST" })
  .validator((input: { text: string; voice?: string }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false as const, error: "Voice belum tersedia." };
    const res = await fetch("https://api.x.ai/v1/tts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        text: data.text.slice(0, 800),
        voice_id: data.voice || "eve",
      }),
    });
    if (!res.ok) {
      const t = await res.text().catch(() => "");
      return { ok: false as const, error: `TTS error ${res.status}${t ? `: ${t.slice(0, 180)}` : ""}` };
    }
    const buf = Buffer.from(await res.arrayBuffer());
    return { ok: true as const, audio: `data:audio/mpeg;base64,${buf.toString("base64")}` };
  });
