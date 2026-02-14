import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portfolio Setup Guide",
  description:
    "Complete guide to set up your portfolio on wanna-hire.me — fields, optional values, and examples.",
};

const VOID_EXAMPLE = {
  img: "https://raw.githubusercontent.com/void/it-iz-me/main/avatar.png",
  img_alt: "Void's profile photo",
  heading_bold: "hi there, i'm void",
  heading_light: ": a developer who builds in the dark.",
  desc_1: "i build stuff with",
  tech_stack: [
    { iconName: "SI Typescript", visibleName: "TypeScript" },
    { iconName: "SI React", visibleName: "React" },
    { iconName: "SI Nextdotjs", visibleName: "Next.js" },
    { iconName: "SI Rust", visibleName: "Rust" },
  ],
  desc_2:
    "I craft clean interfaces and reliable systems. When I'm not coding, I'm probably exploring new tools or contributing to open source.",
  desc_3:
    "Looking for a developer who ships? Let's talk — I'm open to interesting projects and collaborations.",
  cta_buttons: [
    {
      type: "primary",
      label: "View Portfolio",
      href: "https://void.dev",
      icon: "SI FileText",
    },
    {
      type: "secondary",
      label: "Get in touch",
      href: "mailto:void@example.com",
      icon: "BI Send",
    },
  ],
  social_links: [
    { type: "SI Github", label: "GitHub", href: "https://github.com/void" },
    { type: "SI x", label: "X", href: "https://x.com/void" },
    {
      type: "SI Linkedin",
      label: "LinkedIn",
      href: "https://linkedin.com/in/void",
    },
  ],
};

const FIELDS = [
  {
    field: "img",
    required: true,
    description:
      "URL of your profile image. Use a raw GitHub URL if hosting in your repo.",
    example: '"https://raw.githubusercontent.com/void/it-iz-me/main/avatar.png"',
  },
  {
    field: "img_alt",
    required: true,
    description: "Accessible description of the image (for screen readers).",
    example: '"Profile photo"',
  },
  {
    field: "heading_bold",
    required: true,
    description: "Main heading — typically your name or intro.",
    example: '"hi there, i\'m void"',
  },
  {
    field: "heading_light",
    required: true,
    description: "Subheading — role, tagline, or continuation of the intro.",
    example: '": a full stack developer."',
  },
  {
    field: "desc_1",
    required: true,
    description: "Intro line shown before the tech badges.",
    example: '"i build stuff with"',
  },
  {
    field: "tech_stack",
    required: true,
    description:
      "Array of skills. Each entry: string (icon = label) or { iconName, visibleName }.",
    example: '[{ "iconName": "SI Typescript", "visibleName": "TypeScript" }]',
  },
  {
    field: "desc_2",
    required: true,
    description: "Body text — short bio or skills summary.",
    example: '"Your short bio or skills summary."',
  },
  {
    field: "desc_3",
    required: true,
    description: "Closing line above the CTA buttons.",
    example: '"Why someone should hire you — and what to do next."',
  },
  {
    field: "cta_buttons",
    required: true,
    description:
      "Array of buttons. Each: { type, label, href, icon? }. icon is optional.",
    example:
      '[{ "type": "primary", "label": "Know More", "href": "https://...", "icon": "SI FileText" }]',
  },
  {
    field: "social_links",
    required: true,
    description: "Array of social links. Each: { type, label, href }.",
    example: '[{ "type": "SI Github", "label": "GitHub", "href": "https://github.com/void" }]',
  },
];

const OPTIONAL_SUBFIELDS = [
  {
    field: "cta_buttons[].icon",
    description:
      "Icon for each button. Omit for default (document icon for primary, send for secondary). Format: SI IconName or BI IconName.",
  },
  {
    field: "tech_stack[]",
    description:
      "Can be empty array [] if you don't want tech badges. Each entry can be a plain string instead of { iconName, visibleName }.",
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-neutral-500 underline-offset-2 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
        >
          ← Back to home
        </Link>

        <h1 className="font-serif text-4xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
          Portfolio Setup Guide
        </h1>
        <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-400">
          Everything you need to set up your page on{" "}
          <strong>wanna-hire.me</strong> and <strong>it-iz.me</strong>.
        </p>

        {/* Step 1 */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
            1. Create your <code className="rounded bg-neutral-200 px-1.5 py-0.5 dark:bg-neutral-700">it-iz-me</code> repo
          </h2>
          <ul className="mt-3 list-inside list-disc space-y-1 text-neutral-600 dark:text-neutral-400">
            <li>Create a new repository on GitHub</li>
            <li>Name it <strong>exactly</strong> <code>it-iz-me</code> (lowercase, hyphen)</li>
            <li>Make it <strong>public</strong></li>
            <li>Use the default branch <code>main</code></li>
          </ul>
        </section>

        {/* Step 2 */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
            2. Add <code className="rounded bg-neutral-200 px-1.5 py-0.5 dark:bg-neutral-700">main.json</code>
          </h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Add a file named <code>main.json</code> in the <strong>root</strong> of your repo.
            Your page loads from:
          </p>
          <pre className="mt-2 overflow-x-auto rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-700 dark:bg-neutral-900">
            https://raw.githubusercontent.com/YOUR_USERNAME/it-iz-me/main/main.json
          </pre>
        </section>

        {/* Field reference */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
            3. Field reference
          </h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            All top-level fields are required. Arrays can be empty <code>[]</code> if you prefer.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-700">
                  <th className="py-3 text-left font-medium text-neutral-800 dark:text-neutral-100">
                    Field
                  </th>
                  <th className="py-3 text-left font-medium text-neutral-800 dark:text-neutral-100">
                    Required
                  </th>
                  <th className="py-3 text-left font-medium text-neutral-800 dark:text-neutral-100">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {FIELDS.map((f) => (
                  <tr
                    key={f.field}
                    className="border-b border-neutral-100 dark:border-neutral-800"
                  >
                    <td className="py-3 font-mono text-neutral-700 dark:text-neutral-300">
                      {f.field}
                    </td>
                    <td className="py-3">
                      <span
                        className={
                          f.required
                            ? "text-amber-600 dark:text-amber-500"
                            : "text-emerald-600 dark:text-emerald-500"
                        }
                      >
                        {f.required ? "Yes" : "Optional"}
                      </span>
                    </td>
                    <td className="py-3 text-neutral-600 dark:text-neutral-400">
                      {f.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mt-6 text-base font-semibold text-neutral-800 dark:text-neutral-100">
            Optional subfields
          </h3>
          <ul className="mt-2 space-y-2 text-neutral-600 dark:text-neutral-400">
            {OPTIONAL_SUBFIELDS.map((o) => (
              <li key={o.field}>
                <code className="rounded bg-neutral-200 px-1.5 py-0.5 dark:bg-neutral-700">
                  {o.field}
                </code>
                — {o.description}
              </li>
            ))}
          </ul>
        </section>

        {/* Icons */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
            4. Icons
          </h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Use <code>SI IconName</code> (Simple Icons) or <code>BI IconName</code> (Bootstrap Icons).
            Omit prefix → SI assumed. Dots in names use <code>dot</code> (e.g.{" "}
            <code>SI Nextdotjs</code>).
          </p>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-500">
            Browse:{" "}
            <a
              href="https://react-icons.github.io/react-icons/icons/si/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-neutral-700 dark:hover:text-neutral-300"
            >
              Simple Icons
            </a>
            {" · "}
            <a
              href="https://react-icons.github.io/react-icons/icons/bi/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-neutral-700 dark:hover:text-neutral-300"
            >
              Bootstrap Icons
            </a>
          </p>
        </section>

        {/* Profile image */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
            5. Profile image
          </h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Upload your image to the repo root (or a subfolder) and use the raw URL:
          </p>
          <pre className="mt-2 overflow-x-auto rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-700 dark:bg-neutral-900">
            https://raw.githubusercontent.com/YOUR_USERNAME/it-iz-me/main/avatar.png
          </pre>
        </section>

        {/* Example */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
            6. Complete example (void)
          </h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            A full <code>main.json</code> with dummy data for user &quot;void&quot;:
          </p>
          <pre className="mt-4 overflow-x-auto rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-700 dark:bg-neutral-900">
            {JSON.stringify(VOID_EXAMPLE, null, 2)}
          </pre>
        </section>

        {/* Checklist */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
            7. Checklist
          </h2>
          <ul className="mt-3 space-y-2 text-neutral-600 dark:text-neutral-400">
            <li className="flex items-center gap-2">
              <span className="text-neutral-400">☐</span> Repo named <code>it-iz-me</code>, public
            </li>
            <li className="flex items-center gap-2">
              <span className="text-neutral-400">☐</span> Default branch is <code>main</code>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-neutral-400">☐</span> <code>main.json</code> in repo root
            </li>
            <li className="flex items-center gap-2">
              <span className="text-neutral-400">☐</span> <code>img</code> is a full URL (raw GitHub if in repo)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-neutral-400">☐</span> Icons use <code>SI</code> / <code>BI</code> format
            </li>
          </ul>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            Your page:{" "}
            <strong className="text-neutral-800 dark:text-neutral-100">
              https://wanna-hire.me/YourGitHubUsername
            </strong>
          </p>
        </section>

        <div className="mt-16 border-t border-neutral-200 pt-8 dark:border-neutral-700">
          <Link
            href="/"
            className="text-sm text-neutral-500 underline-offset-2 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
