import { fetchProfile } from "@/lib/profile";
import { buildOgImage, buildOgImageNotFound } from "@/lib/og-image";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;
    const result = await fetchProfile(username);

    if (result.status !== "ok") return buildOgImageNotFound();

    return await buildOgImage(result.profile, username);
  } catch {
    return buildOgImageNotFound();
  }
}
