export interface ProfileSocialLink {
  type: string;
  label: string;
  href: string;
}

export interface ProfileCta {
  /** "primary" = filled, "secondary" = outline */
  type: "primary" | "secondary";
  label: string;
  href: string;
  /** Optional icon: "SI IconName" or "BI IconName" (e.g. "SI FileText", "BI Send") */
  icon?: string;
}

/** Tech with icon (SI/BI spec) and display name. Legacy: plain string = same value for both. */
export interface ProfileTech {
  /** Icon spec: "SI IconName" or "BiIconName" (e.g. "SI Typescript", "BiReact") */
  iconName: string;
  /** Label shown in the UI */
  visibleName: string;
}

export interface Profile {
  img: string;
  img_alt: string;
  heading_bold: string;
  heading_light: string;
  desc_1: string;
  tech_stack: (string | ProfileTech)[];
  desc_2: string;
  desc_3: string;
  cta_buttons: ProfileCta[];
  social_links: ProfileSocialLink[];
}

export type FetchProfileResult =
  | { status: "ok"; profile: Profile }
  | { status: "not_found" }
  | { status: "invalid_config" };

