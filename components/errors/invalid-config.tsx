import Link from "next/link";

export function InvalidConfig() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4">
      <h1 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">
        Incorrect config
      </h1>
      <p className="text-center text-neutral-600 dark:text-neutral-400">
        Your <code className="rounded bg-neutral-200 px-1 dark:bg-neutral-700">main.json</code> is
        invalid or broken. Follow the{" "}
        <Link href="/docs" className="text-blue-500 hover:text-blue-600">
          guide
        </Link>{" "}
        to fix it.
      </p>
    </div>
  );
}
