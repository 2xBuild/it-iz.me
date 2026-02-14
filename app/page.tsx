import { ProfileIntro } from "@/components/sections/profile";
import { fetchProfile } from "@/lib/profile";
import { NotFound } from "@/components/errors";
import { SiGithub } from "react-icons/si";

const GITHUB_REPO = "2xBuild/it-iz.me";

async function getGitHubStars(): Promise<number | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { stargazers_count?: number };
    return data.stargazers_count ?? null;
  } catch {
    return null;
  }
}

export default async function Home() {
  const result = await fetchProfile("2xBuild");
  if (result.status !== "ok") return <NotFound />;
  const stars = await getGitHubStars();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background py-8">
      <ProfileIntro profile={result.profile} />
      <p className="mt-12 text-center text-sm text-neutral-500 dark:text-neutral-400">
        Create your own page.{" "}
        <a
          href="/docs"
          className="underline decoration-neutral-400 underline-offset-2 hover:decoration-neutral-600 dark:decoration-neutral-500 dark:hover:decoration-neutral-300"
        >
          here
        </a>
        .
      </p>
      <a
        href={`https://github.com/${GITHUB_REPO}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-600 transition-colors hover:border-neutral-300 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:bg-neutral-700"
      >
        <SiGithub className="h-4 w-4" aria-hidden />
        <span>Open Source</span>
        {stars != null && (
          <span className="flex items-center gap-1 before:content-['·'] before:text-neutral-400">
            ★ {stars.toLocaleString()}
          </span>
        )}
      </a>
    </div>
  );
}
