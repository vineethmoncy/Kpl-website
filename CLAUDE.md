# KPL Power Systems website

Company website for KPL Power Systems (substation automation, SCADA, PLCC, protection and control). Astro 7 static site, Tailwind 4, English at `/` and Hindi at `/hi/`. Full plan: `docs/build-plan.md`.

## Commands

- `npm install`
- `npm run dev` (local preview at http://localhost:4321)
- `npm run build` (must pass before every commit)

## Where things live

- Text strings: `src/i18n/en.json`, `src/i18n/hi.json`. Pages contain no hard-coded copy.
- Content data: `src/data/*.ts` (site details, stats, services, clients, OEMs, protocols, projects, diagram labels). Bilingual fields are `{ en, hi }`.
- Colours, fonts, base styles: `src/styles/global.css` (tokens in `:root` and `@theme`).
- Shared components: `src/components/`. Homepage sections: `src/components/home/`. Page bodies: `src/components/pages/`. Files in `src/pages/` are thin wrappers.

## Rules

- Light theme only. Red (`--red`, `--red-ink`) is an accent, never a flood. In the diagram, red marks only the selected item.
- Do not invent facts, clients, numbers or certificates. Source is the company profile.
- Banned words: "leading", "industry-leading", "100%", "world-class", "cutting-edge", "best-in-class".
- Technical terms (SCADA, PLCC, RTU, IEC 61850, OEM names, kV values) stay in English in Hindi text.
- Touch targets at least 44px, text contrast at least 4.5:1, works at 360px with no horizontal scroll, respects reduced motion.
- Work on branch `site-build`. Commit after each task.

## Status

Done: T1 scaffold, T2 content, T3 design system and shared components, T4 homepage, T5 substation diagram, T6 inner pages (25 pages build, 0 broken links).

Next, in order:

1. **Design round.** The owner's design changes, plus three known fixes:
   - Diagram is too small: make the SVG span the full width of its card, with the info panel below or narrower.
   - Hero: remove the three fact chips under the buttons (they repeat the stat block).
   - Diagram: the PT hard-wired link crosses the outgoing power line; reroute it.
2. **T7 Hindi.** Fill `src/i18n/hi.json` (same keys as `en.json`) and every `hi` field in `src/data/*.ts`. Formal, natural Hindi. Add a script that fails if any key in `en.json` is missing from `hi.json`. A fluent reader must review before launch.
3. **T8 SEO.** Unique titles and descriptions, hreflang, sitemap, robots.txt, Open Graph image, LocalBusiness JSON-LD, favicon from the logo.
4. **T9 QA.** Check at 360px and 1280px, keyboard and touch on the diagram, reduced motion, contrast, page weight under 500KB, banned words, list of remaining placeholders.
5. **T10 README.** "How to edit content" and Cloudflare Pages deploy steps.

## Waiting on the owner

- Domain (then set `site` in `astro.config.mjs`, currently `https://example.com`).
- Email on the domain (replace `kplpowersystems@gmail.com` in `src/data/site.ts`).
- Web3Forms access key in `.env` as `PUBLIC_WEB3FORMS_KEY` (form shows a "please call" message until set).
- Company profile PDF at `public/company-profile.pdf`.
- 8 to 12 project one-liners for `src/data/projects.ts` (the Experience page shows them automatically).
- WhatsApp number confirmed as +91 90157 73449.
