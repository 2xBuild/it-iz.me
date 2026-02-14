import Link from "next/link";

const GUIDE_URL = "https://github.com/2xbuild/it-iz.me";

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4">
      <h1 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">
        Page not found
      </h1>
      <p className="text-center text-neutral-600 dark:text-neutral-400">
        Wanna set up your page?{" "}
        <Link
          href={GUIDE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600"
        >
          Here is the guide
        </Link>
      </p>
    </div>
  );
}
