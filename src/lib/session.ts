export type GuestProfile = {
  name: string;
  seed: string;
  created: number;
};

const KEY = "fahmi.guest.v1";

export function loadGuest(): GuestProfile {
  if (typeof window === "undefined") return { name: "Guest", seed: "fahmi", created: 0 };
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as GuestProfile;
  } catch {
    /* ignore */
  }
  const seed = Math.random().toString(36).slice(2, 8);
  const profile: GuestProfile = { name: `FM-${seed.toUpperCase()}`, seed, created: Date.now() };
  localStorage.setItem(KEY, JSON.stringify(profile));
  return profile;
}

export function saveGuest(p: GuestProfile) {
  localStorage.setItem(KEY, JSON.stringify(p));
}

export function detectDevice() {
  if (typeof navigator === "undefined") return { device: "—", browser: "—" };
  const ua = navigator.userAgent;
  let device = "Desktop";
  if (/iPhone|iPad/.test(ua)) device = "iOS";
  else if (/Android/.test(ua)) device = "Android";
  else if (/Macintosh/.test(ua)) device = "macOS";
  else if (/Windows/.test(ua)) device = "Windows";
  else if (/Linux/.test(ua)) device = "Linux";
  let browser = "Browser";
  if (/Edg\//.test(ua)) browser = "Edge";
  else if (/Chrome\//.test(ua)) browser = "Chrome";
  else if (/Safari\//.test(ua) && !/Chrome/.test(ua)) browser = "Safari";
  else if (/Firefox\//.test(ua)) browser = "Firefox";
  return { device, browser };
}

export type HistoryItem = {
  id: string;
  title: string;
  kind: string;
  url?: string;
  at: number;
};

const HKEY = "fahmi.dl.history";

export function loadHistory(): HistoryItem[] {
  try {
    return JSON.parse(localStorage.getItem(HKEY) || "[]") as HistoryItem[];
  } catch {
    return [];
  }
}

export function pushHistory(item: Omit<HistoryItem, "id" | "at">) {
  const next = [{ ...item, id: crypto.randomUUID(), at: Date.now() }, ...loadHistory()].slice(0, 40);
  localStorage.setItem(HKEY, JSON.stringify(next));
  return next;
}

export function clearHistory() {
  localStorage.removeItem(HKEY);
}

export type DisplayMode = "standard" | "pulse" | "full";

const MKEY = "fahmi.mode.v1";

export function loadMode(): DisplayMode {
  if (typeof window === "undefined") return "full";
  try {
    const v = localStorage.getItem(MKEY);
    if (v === "standard" || v === "pulse" || v === "full") return v;
  } catch {
    /* ignore */
  }
  return "full";
}

export function saveMode(mode: DisplayMode) {
  localStorage.setItem(MKEY, mode);
  document.documentElement.dataset.nxMode = mode;
  window.dispatchEvent(new Event("fahmi-mode"));
}

export type WatchItem = { symbol: string; name: string; added: number };

const WKEY = "fahmi.watch.v1";

export function loadWatch(): WatchItem[] {
  try {
    return JSON.parse(localStorage.getItem(WKEY) || "[]") as WatchItem[];
  } catch {
    return [];
  }
}

export function saveWatch(items: WatchItem[]) {
  localStorage.setItem(WKEY, JSON.stringify(items.slice(0, 24)));
}

export function toggleWatch(item: WatchItem) {
  const cur = loadWatch();
  const exists = cur.some((x) => x.symbol === item.symbol);
  const next = exists ? cur.filter((x) => x.symbol !== item.symbol) : [{ ...item, added: Date.now() }, ...cur];
  saveWatch(next);
  return next;
}
