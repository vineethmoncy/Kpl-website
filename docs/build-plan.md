# KPL Power Systems Website: Build Plan

Status: plan approved for execution. Orchestrator: Fable. Builders: Haiku and Sonnet subagents.
Every task below is written so a smaller model can do it without seeing this conversation.

---

## 1. Decisions locked

| Topic | Decision |
|---|---|
| Purpose | Credibility for utility tenders and lead generation from private industry, equal weight |
| Audience | Utility engineers and procurement staff (HVPNL, UPPTCL, SLDC), plant electrical heads. Mostly 30+, must also feel current to younger engineers |
| Languages | English (default, `/`) and Hindi (`/hi/`), toggle in header |
| Theme | Light only. No dark mode |
| Colour | Built from the logo red, used as an accent, never as a flood |
| Photos, certificates | None for now. Design must look complete without them and accept them later |
| People | No founder or team photos or names |
| Maintainer | The developer (you), editing files directly. No CMS |
| Domain | To be bought |

## 2. Risks to manage (read before building)

1. **Proof gap.** No photos, certificates, named projects or people means the site rests on text claims. Mitigation: lead with the interactive substation diagram, hard numbers, protocol and OEM lists, GSTIN, and client names. Ask the client for 8 to 12 one-line project entries (voltage, location, scope, year). This costs them an hour and is the single biggest credibility gain.
2. **Inflated wording.** Do not use "leading", "industry-leading" or "100% client satisfaction". Replace with specifics: "15+ years", "200+ PLCC systems commissioned", "66kV to 400kV".
3. **Hindi quality.** Machine Hindi in front of government staff is a risk. Technical terms stay in English (SCADA, PLCC, RTU, relay, IEC 61850). A Hindi-fluent person must review `hi.json` before launch.
4. **Gmail address.** Move to an address on the new domain before launch.
5. **Red means fault** to electrical engineers. In the diagram, red marks only the selected KPL service. Normal lines and data flow use slate.

## 3. Tech stack

- **Astro** (latest stable, static output), TypeScript.
- **Tailwind CSS** (latest stable) with CSS custom properties for tokens.
- **Animation:** CSS plus IntersectionObserver and inline SVG. No GSAP, no animation framework.
- **Fonts:** self-hosted via `@fontsource`. Headings: Barlow Semi Condensed (600, 700). Body: Hind (400, 500, 600), which covers Latin and Devanagari. Hindi headings: Mukta (600, 700).
- **i18n:** Astro built-in i18n routing. UI strings in `src/i18n/en.json` and `hi.json`. Content data files carry both languages.
- **Contact form:** Web3Forms (static-friendly). Key in `PUBLIC_WEB3FORMS_KEY`.
- **Hosting:** Cloudflare Pages from a GitHub repo.
- **No:** CMS, database, analytics scripts beyond Cloudflare Web Analytics, cookie banners, chat widgets, autoplay video.

## 4. Repository structure

```
/
├─ public/            logo.png, favicon, company-profile.pdf, og-image.png, robots.txt
├─ src/
│  ├─ styles/global.css          tokens, base, reveal utilities
│  ├─ i18n/en.json, hi.json      UI strings
│  ├─ i18n/utils.ts              t(), getLang(), localizedPath()
│  ├─ data/services.ts           7 services, both languages
│  ├─ data/clients.ts            utilities, industry
│  ├─ data/stats.ts              key numbers
│  ├─ data/oems.ts, protocols.ts
│  ├─ data/projects.ts           empty array for now
│  ├─ data/site.ts               phone, email, address, GSTIN
│  ├─ components/                Header, Footer, LangToggle, Button, Section,
│  │                             StatCounter, ServiceCard, SubstationDiagram,
│  │                             ContactBar, ContactForm, ClientList, Reveal
│  ├─ layouts/Base.astro
│  └─ pages/
│     ├─ index.astro, services/index.astro, services/[slug].astro,
│     │  experience.astro, about.astro, contact.astro, 404.astro
│     └─ hi/ (same set, thin wrappers that pass lang="hi")
└─ README.md           includes "How to edit content"
```

Rule: page files contain no hard-coded copy. All text comes from `i18n/*.json` or `data/*.ts`.

## 5. Design system

### Colour tokens (in `:root`)

| Token | Value | Use |
|---|---|---|
| `--red` | sample exact value from `Logo.png` (about `#DC2C1F`) | buttons, key numbers, selected state |
| `--red-ink` | darken `--red` until 4.5:1 on white (about `#C0261A`) | red text, links |
| `--red-tint` | `#FDEDEB` | soft highlight backgrounds |
| `--ink` | `#1A1F26` | headings, body |
| `--muted` | `#566170` | secondary text |
| `--slate` | `#2E4756` | secondary colour, diagram lines, footer |
| `--line` | `#E2E6EA` | borders, dividers |
| `--paper` | `#FAFAF8` | page background |
| `--surface` | `#FFFFFF` | cards |

### Type scale
Body 17px/1.6. H1 clamp(36px, 5vw, 60px). H2 clamp(28px, 3.5vw, 40px). H3 22px. Small 14px. Max text width 65ch.

### Layout
Max width 1200px, 24px gutters (16px on phones), 96px section spacing (56px on phones), 8px radius, one soft shadow for raised cards only.

### Motion rules
- Scroll reveal: 16px rise plus fade, 400ms, once. Content is visible by default; JS adds the animation, so nothing is hidden if JS fails.
- Number counters run once when visible.
- Diagram: dashed data-flow lines move slowly; nodes highlight on hover, focus and tap.
- Everything stops under `prefers-reduced-motion`.
- No parallax, scroll hijacking, cursor effects, page loaders or carousels.

### Usability rules for this audience
- Desktop navigation always visible with plain labels: Home, Services, Experience, About, Contact.
- Phone number visible in the header on desktop.
- Floating bar on phones: Call, WhatsApp.
- Touch targets at least 44px. Text contrast at least 4.5:1.
- Works at 360px wide. Total homepage weight under 500KB.

## 6. Pages

### Home
1. **Hero:** headline "Substation automation, SCADA, PLCC and protection systems. 66kV to 400kV." Sub-line with 15+ years and multi-OEM. Buttons: "Discuss your project", "Our services". Right side: the diagram on desktop.
2. **Stat strip:** 15+ years, 200+ PLCC systems, 400kV maximum voltage, 8+ OEM makes handled.
3. **Substation diagram** (section 7) full width if not in hero.
4. **Services grid:** 7 cards with line icons, linking to detail pages.
5. **Why KPL:** multi-OEM, rapid breakdown response, end-to-end delivery, 400kV experience.
6. **OEMs and protocols:** text chips (Siemens, ABB, GE, ZIV, Alstom, CG, Sifang, ERL; IEC 60870-5-101/104, IEC 61850, Modbus, DNP3). Text only, no OEM logos.
7. **Clients:** two columns, State utilities and Industry, names as text.
8. **Breakdown support band:** "Communication link or relay down? Call +91 90157 73449".
9. **Contact section** and footer with address and GSTIN.

### Services index and detail (`/services/[slug]`)
One template driven by `services.ts`. Each service: title, one-line summary, scope list, OEMs or protocols where relevant, related services, contact button.
Slugs: `substation-automation-scada`, `plcc-systems`, `protection-control`, `supply-integration`, `testing-commissioning`, `network-design-security`, `operation-maintenance`.

### Experience
Voltage levels (66, 132, 220, 400kV) shown as a scale. Project types: bay automation, SCADA integration, restoration, greenfield and brownfield. Client list. A project-card grid that renders only when `projects.ts` has entries.

### About
Company summary, vision, mission (5 points), SANDS Chennai GPS distributor note, registration details (GSTIN), company profile PDF download. Placeholder slots for certificates that render only when files exist.

### Contact
Phone, WhatsApp, email, address, map link (plain link, no embed), form with name, organisation, phone, email, requirement type (select), message. Success and error states in both languages.

## 7. Signature feature: interactive substation diagram

Component: `SubstationDiagram.astro`, inline SVG, viewBox `0 0 1200 520`.

Layout, left to right and top to bottom:
- **Top level:** SLDC / control centre.
- **Station level:** gateway, station SCADA/HMI, Ethernet switch, GPS clock.
- **Bay level:** C&R panel with BCU/IED and protection relays.
- **Process level:** busbar, circuit breaker, CT/PT, outgoing line.
- **Line:** wave trap and coupling capacitor, PLCC panel, dashed link to a remote substation.

Seven hotspots, each mapped to a service slug:

| Hotspot | Service |
|---|---|
| Gateway, SCADA/HMI, SLDC link | substation-automation-scada |
| Wave trap, PLCC panel, line | plcc-systems |
| Relays, C&R panel | protection-control |
| GPS clock, switch, RTU/BCU hardware | supply-integration |
| Bay equipment (CB, CT/PT) | testing-commissioning |
| Network links between levels | network-design-security |
| Whole-station outline badge "24/7" | operation-maintenance |

Behaviour:
- Each hotspot is a real `<a>` or `<button>` (keyboard reachable, visible focus ring).
- Hover, focus or tap highlights the hotspot in `--red` and fills an info panel beside the diagram: service title, one line, "View service" link.
- Auto-cycles through hotspots every 4 seconds until the user interacts. No auto-cycle under reduced motion.
- Data links animate with moving dashes in `--slate`.
- Below 768px: the SVG is replaced by a vertical list of the same seven items with small icons. No horizontal scrolling.
- Labels come from i18n, so the diagram works in Hindi.

## 8. Content rules

- Source: the company profile PDF in the project. Do not invent facts, clients, numbers or certificates.
- Missing facts use visible placeholders in square brackets, for example `[PROJECT LIST]`.
- Contact details: +91 90157 73449; kplpowersystems@gmail.com (to be replaced); 5/13, F-II, New Rajendra Nagar, Aligarh 202001 (U.P.); GSTIN 09BKZPG9277P1ZO.
- Hindi: natural, formal Hindi. Keep technical terms, OEM names, protocol names and voltage levels in English.

## 9. Task list with model assignment

Each task is one subagent run. Run in order unless marked parallel.

| # | Task | Model | Depends on | Done when |
|---|---|---|---|---|
| T1 | Scaffold Astro, Tailwind, fonts, i18n config, folder structure, empty Base layout | Haiku | repo | `npm run build` passes, `/` and `/hi/` render |
| T2 | Content data: `site.ts`, `stats.ts`, `services.ts`, `clients.ts`, `oems.ts`, `protocols.ts`, `en.json` from the PDF, following section 8 | Haiku | T1 | Types compile; no banned words; all 7 services present |
| T3 | Design tokens, `global.css`, Header, Footer, LangToggle, Button, Section, Reveal, ContactBar | Sonnet | T1 | Header and footer work at 360px and 1280px; lang toggle keeps the current page |
| T4 | Homepage sections except the diagram | Sonnet | T2, T3 | All sections in section 6 render from data |
| T5 | SubstationDiagram per section 7 | Sonnet | T2, T3 (parallel with T4) | 7 hotspots work by mouse, keyboard and touch; mobile fallback present |
| T6 | Services index and detail, Experience, About, Contact with form, 404 | Haiku | T3, T2 | All routes build in both languages |
| T7 | Hindi: `hi.json` and Hindi fields in data files | Sonnet | T4, T5, T6 | No missing keys; key-parity script passes |
| T8 | SEO and polish: titles, descriptions, hreflang, sitemap, robots, Open Graph image, LocalBusiness JSON-LD, favicon from logo | Haiku | T6 | Build passes; every page has unique title and description |
| T9 | QA by a fresh agent: build, internal link check, 360px and 1280px review, reduced motion, contrast, page weight, banned words, placeholder list | Sonnet | all | Written defect list; orchestrator dispatches fixes |
| T10 | README "How to edit content" and deploy steps | Haiku | T9 | A new developer can change a phone number or add a project from the README |

## 10. Orchestration protocol (to keep token use low)

1. The orchestrator never writes page code. It dispatches, checks, and decides.
2. Each subagent gets: the task row, the relevant sections of this plan (not the whole plan), exact file paths it may touch, and the acceptance check.
3. Each subagent ends with a report of at most 10 lines: files changed, build result, open questions.
4. The orchestrator verifies by running `npm run build` and targeted `grep`, not by reading whole files.
5. One fix round per task. A second failure escalates that task from Haiku to Sonnet.
6. No screenshot loops. Visual review happens once, in T9.
7. Commit after every task so work survives session loss.

## 11. What the client or you must supply

| Item | Needed by | Blocks launch |
|---|---|---|
| GitHub repo (empty) | before T1 | yes |
| Domain name | before deploy | yes |
| Email on the domain | before launch | strongly advised |
| Web3Forms access key | T6 | form only |
| WhatsApp number confirmation | T3 | no |
| 8 to 12 project one-liners | any time | no, but highest value |
| Hindi review by a fluent reader | after T7 | yes |
| Photos, certificates, OEM letters | later | no |

## 12. Launch checklist

- Domain connected to Cloudflare Pages, HTTPS on.
- Form delivers to the real inbox, tested in both languages.
- Google Business Profile created with the Aligarh address.
- Search Console: sitemap submitted.
- No square-bracket placeholders left on public pages.
- Company profile PDF downloadable.

## 13. After launch (phase 2)

Project cards with photos, certificates page, downloads page, case studies for PLCC and SCADA work, Google reviews link.
