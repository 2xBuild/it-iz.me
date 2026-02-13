# wanna-hire.me

Your page is live at **`https://wanna-hire.me/YourGitHubUsername`** when you add a repo named `it-iz-me` with a `main.json` profile. This guide shows how to set that up.

---

## 1. Create your `it-iz-me` repo

1. On GitHub, create a **new repository**.
2. Name it **exactly** `it-iz-me` (lowercase, with the hyphen).
3. Make it **public**.
4. Use the **default branch** `main` (or your profile will not load).

---

## 2. Add `main.json`

In the **root** of your `it-iz-me` repo, add a file named **`main.json`**.

Your page is loaded from:

```text
https://raw.githubusercontent.com/YourGitHubUsername/it-iz-me/main/main.json
```

So the file must be at the repo root and on the `main` branch.

### Example `main.json`

```json
{
  "img": "https://raw.githubusercontent.com/YourGitHubUsername/it-iz-me/main/avatar.png",
  "img_alt": "Profile photo",
  "heading_bold": "hi there, i'm YourName",
  "heading_light": ": a full stack developer.",
  "desc_1": "i build stuff with",
  "tech_stack": [
    { "iconName": "SI Typescript", "visibleName": "TypeScript" },
    { "iconName": "SI React", "visibleName": "React" },
    { "iconName": "SI Nextdotjs", "visibleName": "Next.js" },
    { "iconName": "SI Python", "visibleName": "Python" }
  ],
  "desc_2": "Your short bio or skills summary.",
  "desc_3": "Why someone should hire you — and what to do next.",
  "cta_buttons": [
    { "type": "primary", "label": "Know More", "href": "https://your-site.com", "icon": "SI FileText" },
    { "type": "secondary", "label": "Get in touch", "href": "mailto:you@example.com", "icon": "BI Send" }
  ],
  "social_links": [
    { "type": "SI Github", "label": "GitHub", "href": "https://github.com/you" },
    { "type": "SI x", "label": "X", "href": "https://x.com/you" }
  ]
}
```

| Field | Description |
|-------|-------------|
| `img` | URL of your profile image (see [Profile image](#profile-image) below). |
| `img_alt` | Accessible description of the image. |
| `heading_bold` | Main heading (e.g. your name). |
| `heading_light` | Subheading (e.g. role or tagline). |
| `desc_1` | Intro line before the tech badges. |
| `tech_stack` | Array of skills. Each entry is either a **string** (icon spec, same as label) or `{ "iconName", "visibleName" }` (see [Icons](#icons-tech-stack-social-ctas)). |
| `desc_2` | Body text. |
| `desc_3` | Closing line above the buttons. |
| `cta_buttons` | Array of `{ "type": "primary" \| "secondary", "label", "href", "icon"? }`. Optional **icon** spec per button (see [Icons](#icons-tech-stack-social-ctas)). |
| `social_links` | Array of `{ "type", "label", "href" }`; **type** = icon spec (see [Icons](#icons-tech-stack-social-ctas)). |

---

## 3. Profile image

You can host your photo in the **same repo** and link it in `main.json`.

1. Upload the image (e.g. `avatar.png` or `photo.jpg`) to the **root** of your `it-iz-me` repo (or a folder like `images/`).
2. Use the **raw GitHub URL** in the `img` field.

**Format:**

```text
https://raw.githubusercontent.com/YourGitHubUsername/it-iz-me/main/your-image.png
```

If you put it in a subfolder:

```text
https://raw.githubusercontent.com/YourGitHubUsername/it-iz-me/main/images/avatar.png
```

- Use your **real GitHub username** and the **exact file path**.
- No trailing slashes. Use `main` if your default branch is `main`.

---

## 4. Icons (tech stack, social, CTAs)

Icons are **not limited to one set**. You choose **SI** (Simple Icons) or **BI** (Bootstrap Icons) with a short spec.

**Format:** `SI IconName` or `BI IconName` (space optional: `SIIconName` / `BIIconName`).  
If you omit the prefix, **SI** is assumed (e.g. `Github` → Simple Icons).

- **SI** = [react-icons/si](https://react-icons.github.io/react-icons/icons/si/) (Simple Icons)  
- **BI** = [react-icons/bi](https://react-icons.github.io/react-icons/icons/bi/) (Bootstrap Icons)

**Where it’s used:**

| Field | Usage |
|-------|--------|
| `tech_stack[]` | Each entry is a string (icon spec = badge label) or `{ "iconName", "visibleName" }` (icon spec + custom label). |
| `social_links[].type` | Icon spec for the social link. **`label`** = accessibility text (`aria-label`). |
| `cta_buttons[].icon` | Optional icon for each button (no icon = default document/send icon by type). |

**Examples:**

- `"SI Github"`, `"SI Typescript"`, `"BI Star"`, `"BI Heart"`
- `"SIGithub"`, `"BIStar"` (no space)
- `"Typescript"` (no prefix → SI)
- Dots in SI names → **`dot`**: e.g. `"SI Nextdotjs"`, `"SI Nodedotjs"`

**Caution:** Use the **exact icon name** from the [SI](https://react-icons.github.io/react-icons/icons/si/) or [BI](https://react-icons.github.io/react-icons/icons/bi/) list (e.g. **`SI x`** for X/Twitter, **`SI Linkedin`**). If the icon isn’t found, a generic icon is used but the label/link still works.

---

## 5. Checklist

- [ ] Repo is named **`it-iz-me`** and is **public**.
- [ ] Default branch is **`main`**.
- [ ] **`main.json`** is in the **root** of the repo.
- [ ] **`img`** is a full URL (e.g. raw GitHub link) if the image is in your repo.
- [ ] **`tech_stack`** entries are strings or `{ "iconName", "visibleName" }`; **`cta_buttons`** is an array of `{ "type", "label", "href", "icon"? }`.
- [ ] Icons use **`SI IconName`** or **`BI IconName`** (or name-only for SI) from [si](https://react-icons.github.io/react-icons/icons/si/) / [bi](https://react-icons.github.io/react-icons/icons/bi/); dots as `dot` (e.g. `SI Nextdotjs`).
- [ ] **`social_links[].label`** is a short, readable name for accessibility.

Your page: **https://wanna-hire.me/YourGitHubUsername**
