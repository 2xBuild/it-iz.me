import { ProfileIntro } from "@/components/sections/profile";
import { fetchProfile } from "@/lib/profile";
import { NotFound } from "@/components/errors";

export default async function Home() {
  const result = await fetchProfile("2xBuild");
  if (result.status !== "ok") return <NotFound />;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background py-8">
      <ProfileIntro profile={result.profile} />
      <p className="mt-12 text-center text-sm text-neutral-500 dark:text-neutral-400">
        Create your own page.{" "}
        <a
          href="https://github.com/2xbuild/it-iz-me"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-neutral-400 underline-offset-2 hover:decoration-neutral-600 dark:decoration-neutral-500 dark:hover:decoration-neutral-300"
        >
          here
        </a>
        .
      </p>
    </div>
  );
}
