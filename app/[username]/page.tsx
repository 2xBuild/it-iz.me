import { fetchProfile } from "@/lib/profile";
import { Hero } from "@/components/sections/profile";
import { InvalidConfig, NotFound } from "@/components/errors";

interface PageProps {
  params: Promise<{ username: string }>;
}

export default async function UserPage({ params }: PageProps) {
  const { username } = await params;
  const result = await fetchProfile(username);

  if (result.status === "not_found") return <NotFound />;
  if (result.status === "invalid_config") return <InvalidConfig />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Hero profile={result.profile} />
    </div>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { username } = await params;
  const result = await fetchProfile(username);
  if (result.status !== "ok") return { title: "Not found" };
  const { profile } = result;
  const title = profile.heading_bold.replace(/^hi there,\s*i'm\s+/i, "") || username;
  return {
    title: `Wanna hire ${title}?`,
    description: profile.desc_2 || profile.desc_3,
  };
}
