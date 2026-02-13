import type { Profile, FetchProfileResult } from "./types";

const GITHUB_RAW_BASE = "https://raw.githubusercontent.com";

export function getProfileJsonUrl(username: string): string {
  return `${GITHUB_RAW_BASE}/${username}/it-iz-me/main/main.json`;
}

export async function fetchProfile(username: string): Promise<FetchProfileResult> {
  const url = getProfileJsonUrl(username);
  const res = await fetch(url, {
    next: { revalidate: 60 },
    headers: { Accept: "application/json" },
  });
  if (!res.ok) return { status: "not_found" };
  try {
    const data = await res.json();
    return { status: "ok", profile: data as Profile };
  } catch {
    return { status: "invalid_config" };
  }
}
