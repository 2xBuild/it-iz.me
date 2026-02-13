"use client";

import { motion } from "framer-motion";
import { FileText, Send, Code } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import type { ComponentType } from "react";
import { getIcon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import type { Profile, ProfileTech } from "@/lib/types";

const SKILL_ICON_CLASS = "h-4 w-4 shrink-0";

interface ProfileIntroProps {
  profile: Profile;
}

export function ProfileIntro({ profile }: ProfileIntroProps) {
  const { requestThemeSwitch } = useTheme();

  const imgAlt = profile.img_alt;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative flex w-full max-w-2xl flex-col bg-background py-20 font-sans text-left"
    >
      <div className="w-full px-4">
        {/* Top row: avatar (click to toggle theme) */}
        <div className="mb-8 flex w-full items-start">
          <button
            type="button"
            onClick={requestThemeSwitch}
            className="relative shrink-0 rounded-full outline-none ring-offset-2 ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Toggle dark or light mode"
          >
            <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-neutral-200 bg-neutral-100 dark:border-neutral-600 dark:bg-neutral-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.img}
                alt={imgAlt}
                width={80}
                height={80}
                className="h-full w-full object-cover"
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  t.style.display = "none";
                  const parent = t.parentElement;
                  if (parent && !parent.querySelector(".avatar-fallback")) {
                    const fallback = document.createElement("div");
                    fallback.className =
                      "avatar-fallback h-full w-full bg-neutral-300 dark:bg-neutral-600";
                    fallback.setAttribute("aria-hidden", "true");
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>
            <span
              className="absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-white bg-neutral-400 dark:border-neutral-800 dark:bg-neutral-500"
              aria-hidden
            />
          </button>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100 sm:text-4xl">
          {profile.heading_bold}{" "}
          <span className="font-normal text-neutral-500 dark:text-neutral-400">
            {profile.heading_light}
          </span>
        </h1>

        {/* Description with skill badges */}
        <div className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
          <p className="mb-2"> {profile.desc_1} </p>
          <span className="inline-flex flex-wrap items-center gap-2">
            {profile.tech_stack.map((item) => {
              const tech: ProfileTech =
                typeof item === "string"
                  ? { iconName: item, visibleName: item }
                  : item;
              const Icon = getIcon(tech.iconName) ?? Code;
              return (
                <span
                  key={tech.visibleName}
                  className="inline-flex items-center gap-2 rounded-md border border-neutral-300 bg-neutral-50 px-2.5 py-1 text-[14px] font-medium text-neutral-900 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100"
                >
                  <Icon className={SKILL_ICON_CLASS} />
                  {tech.visibleName}
                </span>
              );
            })}
          </span>
          <p className="mt-2 text-neutral-600 dark:text-neutral-300">
            {profile.desc_2}
          </p>
        </div>

        <div className="mt-5 border-t border-neutral-200 dark:border-neutral-600 ">
          <p className="mt-4 text-neutral-600 dark:text-neutral-300">
            {profile.desc_3}
          </p>

          {/* Buttons */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {profile.cta_buttons.map((cta, i) => {
              const Icon: ComponentType<{ className?: string }> =
                (cta.icon?.trim() ? getIcon(cta.icon) : undefined) ??
                (cta.type === "primary" ? FileText : Send);
              const isPrimary = cta.type === "primary";
              return (
                <Button
                  key={`${cta.href}-${i}`}
                  size="lg"
                  variant={isPrimary ? "default" : "outline"}
                  className={
                    isPrimary
                      ? "bg-neutral-900 font-medium text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
                      : "border-neutral-300 bg-white font-medium text-neutral-900 hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700"
                  }
                  asChild
                >
                  <a href={cta.href}>
                    <Icon className="size-4" />
                    {cta.label}
                  </a>
                </Button>
              );
            })}
          </div>
        </div>
        {/* Social icons */}
        <div className="mt-10 m-1.5 flex items-center gap-6 text-neutral-900 dark:text-neutral-100">
          {profile.social_links.map(({ type, label, href }) => {
            const Icon = getIcon(type) ?? Code;
            return (
              <a
                key={`${type}-${href}`}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  href.startsWith("mailto:") ? undefined : "noopener noreferrer"
                }
                className="transition-opacity hover:opacity-70"
                aria-label={label}
              >
                <Icon className="size-5" aria-hidden />
              </a>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
