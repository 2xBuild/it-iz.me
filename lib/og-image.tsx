import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { BiCode } from "react-icons/bi";
import { resolveProfileImgUrl } from "./profile";
import { getIcon } from "./icons";
import type { Profile, ProfileTech } from "./types";

const OG_SIZE = { width: 1200, height: 630 };
const FONT_NAME = "Geist Pixel Square";

/** Dark between 18:00–05:59 UTC, light 06:00–17:59 UTC */
function isDarkByUtc(): boolean {
  const hour = new Date().getUTCHours();
  return hour >= 18 || hour < 6;
}

function getTechItem(item: string | ProfileTech): ProfileTech {
  return typeof item === "string" ? { iconName: item, visibleName: item } : item;
}

/** Fetch image URL to base64 data URL so Satori can render it reliably. */
async function fetchImageAsDataUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    const base64 = Buffer.from(buf).toString("base64");
    const contentType = res.headers.get("content-type") || "image/png";
    return `data:${contentType};base64,${base64}`;
  } catch {
    return null;
  }
}

/** Tech icon from react-icons, or BiCode fallback. */
function TechIcon({
  iconName,
  color,
}: {
  iconName: string;
  color: string;
}) {
  const Icon = getIcon(iconName) ?? BiCode;
  return (
    <Icon
      style={{ width: 16, height: 16, color }}
      color={color}
    />
  );
}

/** Dummy user avatar when image URL is invalid. */
function DummyAvatar({ color }: { color: string }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  );
}

export async function buildOgImage(
  profile: Profile,
  username: string
): Promise<Response> {
  const dark = isDarkByUtc();
  const bg = dark ? "#0a0a0a" : "#fafafa";
  const textBold = dark ? "#fafafa" : "#262626";
  const textLight = dark ? "#a3a3a3" : "#737373";
  const textMuted = dark ? "#d4d4d4" : "#525252";
  const borderColor = dark ? "#525252" : "#d4d4d4";
  const pillBg = dark ? "#262626" : "#f5f5f5";
  const pillText = dark ? "#fafafa" : "#171717";
  const iconColor = dark ? "#a3a3a3" : "#737373";

  const imgUrl = resolveProfileImgUrl(username, profile.img);
  const avatarSrc = await fetchImageAsDataUrl(imgUrl);

  let fontData: ArrayBuffer | null = null;
  let fontName = "system-ui";
  try {
    const ttfPath = join(process.cwd(), "assets/fonts/GeistPixel-Square.ttf");
    fontData = (await readFile(ttfPath)).buffer;
    fontName = FONT_NAME;
  } catch {
    // fallback to system-ui
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: bg,
          padding: 64,
          fontFamily: fontName,
        }}
      >
        {/* Avatar */}
        <div style={{ display: "flex", marginBottom: 32 }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 9999,
              border: `2px solid ${borderColor}`,
              background: pillBg,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt=""
                width={80}
                height={80}
                style={{ objectFit: "cover", width: 80, height: 80 }}
              />
            ) : (
              <div
                style={{
                  width: 80,
                  height: 80,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: dark ? "#404040" : "#e5e5e5",
                }}
              >
                <DummyAvatar color={dark ? "#737373" : "#a3a3a3"} />
              </div>
            )}
          </div>
        </div>

        {/* Heading */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            gap: 8,
            marginBottom: 16,
            fontSize: 48,
            fontWeight: 700,
            color: textBold,
            letterSpacing: "-0.025em",
          }}
        >
          <span>{profile.heading_bold}</span>
          <span style={{ fontWeight: 400, color: textLight }}>
            {profile.heading_light}
          </span>
        </div>

        {/* First description + tech stack */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            maxWidth: 900,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 22,
              lineHeight: 1.5,
              color: textMuted,
            }}
          >
            {profile.desc_1}
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 10,
            }}
          >
            {profile.tech_stack.map((item) => {
              const tech = getTechItem(item);
              return (
                <span
                  key={tech.visibleName}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 6,
                    paddingBottom: 6,
                    fontSize: 14,
                    fontWeight: 500,
                    color: pillText,
                    background: pillBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: 6,
                  }}
                >
                  <TechIcon iconName={tech.iconName} color={iconColor} />
                  {tech.visibleName}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: fontData
        ? [
            {
              name: fontName,
              data: fontData,
              style: "normal" as const,
              weight: 500,
            },
          ]
        : undefined,
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    }
  );
}

export function buildOgImageNotFound(): Response {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#fff",
          fontFamily: "system-ui",
          fontSize: 32,
        }}
      >
        Not found
      </div>
    ),
    { ...OG_SIZE }
  );
}
