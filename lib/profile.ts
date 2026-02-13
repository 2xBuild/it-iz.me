import type { Profile, FetchProfileResult } from "./types";

const GITHUB_RAW_BASE = "https://raw.githubusercontent.com";

export function getProfileJsonUrl(username: string): string {
  return `${GITHUB_RAW_BASE}/${username}/it-iz-me/main/main.json`;
}

/** Resolve img to absolute URL. Relative paths (e.g. /void.png) → GitHub raw. */
export function resolveProfileImgUrl(username: string, img: string): string {
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  const base = `${GITHUB_RAW_BASE}/${username}/it-iz-me/main`;
  const path = img.startsWith("/") ? img.slice(1) : img;
  return `${base}/${path}`;
}

export async function fetchProfile(username: string): Promise<FetchProfileResult> {
  const url = getProfileJsonUrl(username);
  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return { status: "not_found" };
    const data = await res.json();
    return { status: "ok", profile: data as Profile };
  } catch {
    return { status: "invalid_config" };
  }
}
