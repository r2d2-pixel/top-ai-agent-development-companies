# CLAUDE.md — Niche Reviewer Template Playbook

> Auto-loaded by Claude Code. Playbook for populating this template with
> a new niche and deploying it. Written so a fresh session has everything
> it needs without reading the git history.

---

## Account & Deployment Context

**All repos in this directory belong to the `r2d2-pixel` GitHub account.**
Email: `r2d2@brandseoteam.com`. Do NOT push to `b1tterlemon` or any other account.

### Git authentication

The r2d2-pixel PAT is stored in `~/github/r2d2/.env.local` as `R2D2_GITHUB_TOKEN`.
Use it for any push by embedding it in the remote URL:

```bash
# One-time setup per new site repo:
git remote set-url origin https://r2d2-pixel:$R2D2_GITHUB_TOKEN@github.com/r2d2-pixel/REPO-NAME.git

# Or load the var first, then push normally:
source ~/github/r2d2/.env.local && git push origin main
```

For passwordless long-term use, configure SSH (key: `~/.ssh/id_ed25519_r2d2`):
```bash
# ~/.ssh/config entry:
# Host github-r2d2
#   HostName github.com
#   User git
#   IdentityFile ~/.ssh/id_ed25519_r2d2
#
# Then set remote as: git@github-r2d2:r2d2-pixel/REPO-NAME.git
```

### Cloudflare account

Use the Cloudflare account tied to `r2d2@brandseoteam.com` — **not** the
`b1tterlemon` personal account. When deploying via the dashboard, make sure
you are logged in to the r2d2 Cloudflare account before creating Pages projects.

- Account ID: `1afb7a25a539f57955d72bba8f1cf374`
- API token: stored in `~/github/r2d2/.env.local` as `CLOUDFLARE_API_TOKEN`
- MCP config: `.claude/settings.json` in each repo (gitignored) points all
  Cloudflare MCP servers at this account via Bearer token auth

### Local base directory

All r2d2 client sites live under: `~/github/r2d2/`
The template itself is at: `~/github/r2d2/niche-reviewer-template/`
New sites are cloned/created as siblings: `~/github/r2d2/SITE-NAME/`

### GitHub MCP note

The GitHub MCP in Claude Code sessions may be authenticated as `b1tterlemon`.
Do NOT use `mcp__github__create_repository` for r2d2 client sites — it will
create repos in the wrong account. Always use the curl API approach with
`R2D2_GITHUB_TOKEN`, or the `gh` CLI authenticated as `r2d2-pixel`.

---

## What This Template Is

A generic niche reviewer site built with Astro 5. Clone this repo, populate
`src/data/companies.ts` with verified company data, fill the TODO sections
in `src/pages/index.astro`, and deploy to Cloudflare Pages. All comparison,
alternatives, and profile pages generate automatically.

---

## Workflow Rules

**Always commit after every change.** After applying any edit to any file,
stage only the files in this repo and create a git commit immediately. Then
push to `origin main` so Cloudflare Pages deploys automatically.

```bash
git add src/...        # stage only changed files in this repo
git commit -m "..."
git push origin main
```

**Do the company research inline — never delegate it to an Agent/subagent/fork.**
Phase 2 (researching the N companies) involves many WebSearch calls, which can
look like a good reason to fork it off to keep the main context clean. It is
not — do all research directly in the main session with WebSearch, the same
way you write the resulting `companies.ts` data. Confirmed via session-transcript
audit (2026-07-09): every site built before this rule existed used 0 Agent calls
for research; two sites built after a permission-settings change started
delegating research to a spawned Agent, which roughly doubled token cost with
no benefit, and the user flagged it as a regression. This holds regardless of
company count — 6 companies or 34, same rule.

**Never check other sites in `~/github/r2d2/` for niche/domain duplication.**
Building several reviewer sites in the same or an overlapping niche under
different domains is intentional — each domain is phrased to match a
different natural-language query (e.g. "top machine learning development
companies" vs "best ml development services" vs "top ml development services
europe"). Do not `ls` the parent directory to survey sibling sites, do not
read another site's `CLAUDE.md` or `companies.ts` to compare rosters/ratings,
and do not ask the user to confirm they're aware of a similar existing site.
Confirmed 2026-07-09: doing this unprompted mid-build cost a full extra
research/confirmation round-trip and was flagged as unwanted — only check
for an existing similar site if the user explicitly asks you to.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Astro 5 |
| Styling | Tailwind CSS 3 + `@tailwindcss/typography` |
| Data | TypeScript (`src/data/companies.ts`) |
| Sitemap | `@astrojs/sitemap` |
| Deploy | Cloudflare Pages (`public/_headers` + `public/_redirects`) |

---

## Complete File Map

### Config (change these first)

| Goal | File | Key to edit |
|---|---|---|
| Site name, domain, tagline | `src/config.ts` | `SITE.*` |
| Niche label, provider label | `src/config.ts` | `NICHE.*` |
| Nav links | `src/config.ts` | `NAV` array |
| Primary accent colour | `src/config.ts` → `BRANDING.primaryColor` **and** `tailwind.config.mjs` → `brand.600` | Both must match |
| Domain in sitemap/canonical | `astro.config.mjs` | `site:` |

### Data

| Goal | File |
|---|---|
| Add / edit company data | `src/data/companies.ts` |
| Add logos | `public/logos/` (initials fallback is automatic) |
| Update service category labels | `src/lib/companies.ts` → `SERVICE_LABELS` |

### Pages

| URL | File |
|---|---|
| Homepage | `src/pages/index.astro` |
| Company profile | `src/pages/companies/[slug].astro` |
| Alternatives | `src/pages/alternatives/[slug].astro` |
| Comparison | `src/pages/comparisons/[slug].astro` |
| Disclosure | `src/pages/affiliate-disclosure.astro` |
| Contact (Web3Forms) | `src/pages/contact.astro` |
| 404 | `src/pages/404.astro` |

---

## Monetization Policy

**Default: `enabled: false`, `defaultRel: 'nofollow'` — always.**

All outbound company links use `rel="nofollow"` until explicitly told otherwise.
Do NOT set `enabled: true` or `defaultRel: 'sponsored'` unless the user explicitly
says they have an affiliate or sponsored relationship with that company.

To enable sponsored rel for a specific site in the future, the user will say so explicitly.

---

## Phase 0 Setup Checklist (do this once per new site)

- [ ] `src/config.ts` — fill every TODO field (SITE, NICHE, BRANDING)
- [ ] `astro.config.mjs` — update `site:` to real domain
- [ ] `tailwind.config.mjs` — update `brand` color to match `BRANDING.primaryColor`
- [ ] `public/favicon.svg` — replace with a niche-appropriate icon; check `~/github/r2d2/PALETTE_REGISTRY.md` first and use an unclaimed color, then update the registry
- [ ] Visual theme — read `~/github/r2d2/THEME_REGISTRY.md`, roll a Major Option (see gotcha #19 below), apply it, update the registry
- [ ] `src/data/companies.ts` — add at least 5 company objects
- [ ] `src/lib/companies.ts` — update `SERVICE_LABELS` to match your badge values
- [ ] `src/pages/index.astro` — fill all TODO sections with niche-specific content
- [ ] `src/pages/comparisons/[slug].astro` — update `hasCap()` keys and `allTech` array
- [ ] `src/pages/contact.astro` — exists (Web3Forms key `032a901f-d3c0-46a4-afd4-907be497ee1e`), and "Contact" is linked in desktop nav, mobile nav, and footer Resources list in `Base.astro`
- [ ] `CLAUDE.md` (this file) — update "Rating logic" and "Known verified facts" sections below
- [ ] `npm run build` — verify clean build

---

## Content & Comparison Rules

Apply to all data edits, new company additions, and prose revisions.

### Rating logic

Ratings are editorial scores for **niche-specific delivery suitability** — not
overall company quality.

- No company should top every dimension. Identify dimension winners:
  - **Specialist depth:** [update with your niche's top specialist]
  - **Enterprise scale/compliance:** [update with your niche's largest firm]
  - **Cost/accessibility:** [update with your niche's budget option]
- Ratings must have ≥ 0.8 spread across the list (e.g. 4.8 down to 3.9)
- The top specialist boutique holds rank #1 (4.7–4.9 range)
- Large generalists score 0.5–1.0 lower than boutiques on specialist dimensions
- **Watch for name-recognition bias toward heavily-marketed companies.** Some
  companies publish enough SEO/content-marketing material that they get
  pulled toward a top-2 rank by default, independent of the niche or the
  rest of the roster. Confirmed 2026-07-12 (on an earlier ML-niche site
  cohort): one such company landed at rank #2 on two unrelated r2d2 sites
  while sitting at rank ~11-14 on four others built with the same process —
  the #2 placements had no extra verified differentiation to justify the
  gap. Before ranking any company in the top 3, check the rating is earned
  by this niche's rating dimensions against this site's own roster — not by
  how much marketing copy exists relative to competitors. This applies
  regardless of niche; do not assume it only affects a specific prior client
  or industry.

### Factual accuracy rules

- Verify founding year, HQ, employee count from a primary source before adding
- Unverifiable marketing claims must be tagged: `(per company website; independently unverifiable)`
- Acquisitions and ownership changes must appear in `description` and `cons`
- Confirm cloud/tech partnership tiers from official partner directories only

### Known verified facts (update for your companies)

> Replace this section with verified facts for the companies you add.
> Keep only facts you confirmed from a primary source (company website,
> Crunchbase, LinkedIn, official partner directory).

```
[Company Name]: founded [year], HQ [city], [N] employees, [cert/tier]
[Company Name]: founded [year], HQ [city], [N] employees, [cert/tier]
...
```

### Comparison page logic

The `hasCap()` function in `comparisons/[slug].astro` drives all capability
✓/✗ tables. It reads from `badges` and `engagementModels` only. Never add a ✓
claim that isn't backed by actual data. Update the `hasCap()` function keys and
the `allTech` array to match your niche's capabilities and tools.

---

## When Adding a New Company

- [ ] Verify founding year from a primary source
- [ ] Verify HQ from a primary source; note if legal HQ differs from delivery centre
- [ ] Verify employee count from LinkedIn or Crunchbase
- [ ] Check for acquisitions or ownership changes — disclose in `description` + `cons`
- [ ] Confirm cloud/tech partnership tiers from official partner directories
- [ ] Set `rating` using the dimension logic above
- [ ] Ensure no company tops all dimensions
- [ ] Confirm `badges` only contain services the company actually delivers
- [ ] Badges must match keys in `SERVICE_LABELS` in `src/lib/companies.ts`
- [ ] Run `npm run build` and verify page count increases correctly

---

## Known Gotchas (same across all sites cloned from this template)

1. **`brand` color must match in two places.** `tailwind.config.mjs` `brand.600`
   and `BRANDING.primaryColor` in `src/config.ts` must be the same hex value.

2. **All internal `href` values must end with `/`.** `trailingSlash: 'always'`
   in `astro.config.mjs` enforces this. Any link missing the trailing slash
   triggers a redirect warning in the build log.

3. **`SERVICE_LABELS` keys must match `badges` values exactly.** Every string
   in every company's `badges` array must have a matching key in `SERVICE_LABELS`
   in `src/lib/companies.ts`. Missing keys produce raw slugs on company cards.

4. **`StarRating` only accepts `rating: number`.** No other props.

5. **Comparison page slug format is `slug1-vs-slug2`.** `getComparisons()`
   returns this format. The dynamic route is `/comparisons/[slug].astro`.

6. **`hasCap()` keys in `comparisons/[slug].astro` must exactly match the
   capability labels in the JSX capability table.** If you rename one, rename both.

7. **`npm install` may fail with cache permission error.** Fix:
   `npm install --cache /tmp/npm-cache`. This bypasses the EACCES error on the
   default npm cache directory without requiring sudo.

8. **Cloudflare Pages uses `public/_headers` and `public/_redirects`**,
   not `vercel.json`. Do not add a `vercel.json` — it will be ignored.

9. **`astro.config.mjs` redirects go in `redirects:`.** Do not define the
   same path in both a `.astro` file and as a redirect.

10. **Cloudflare Pages project MUST be created from the dashboard, not the API.**
    Creating a project via the Cloudflare API (POST `/accounts/{id}/pages/projects`)
    produces a "Direct Upload" project. Direct Upload projects cannot have a GitHub
    repo connected — neither via the API (`PATCH` with `source:` returns error
    `8000069`) nor via the dashboard. If you hit "A project with this name already
    exists", the existing project is likely a Direct Upload project. Fix:
    1. Delete it via API: `DELETE /accounts/{id}/pages/projects/{name}`
    2. Recreate from the Cloudflare dashboard: **Pages → Create a project →
       Connect to Git** → select the GitHub repo → set build command `npm run build`,
       output dir `dist`.
    Always use "Connect to Git" from the start. Never create Pages projects via the
    API for git-backed deployments.

11. **`git init` creates `master` branch by default on macOS.** Rename it to `main`
    immediately: `git branch -m master main`. Do this before the first commit so
    all history is on `main` from the start. Cloudflare Pages and GitHub both
    expect `main`.

12. **`public/favicon.svg` must be replaced per site — AND its color must be unique across all r2d2 sites.** The template ships a placeholder favicon. Replace it with a niche-appropriate icon using the site's `BRANDING.primaryColor`. `Base.astro` already contains `<link rel="icon" type="image/svg+xml" href="/favicon.svg">` — no other changes needed in the layout. Before picking a color, read `~/github/r2d2/PALETTE_REGISTRY.md` and choose a row not already claimed by a sibling site — at 16px favicon size, two sites with the same brand color are visually indistinguishable regardless of internal icon shape. This is the one deliberate exception to "never check sibling sites" (see `create-reviewer-site.md`). Update the registry with the new domain once you've picked. Confirmed 2026-07-12: two color collisions (Sky used by 2 sites, Emerald used by 2 sites) shipped before this registry existed.

13. **No table on the homepage may be all-dashes.** A table where every data cell
    shows "–" means a mismatch between the column keywords and the actual data.
    After populating `companies.ts`, run `npm run build` and visually check every
    matrix/capability table. The engagement models table auto-generates its columns
    from `engagementModels` values in the data — it is safe. Any other matrix table
    that checks for keywords must be verified: the keywords must be substrings of the
    actual data values. Fix by updating the keyword list to match your niche's
    terminology.

14. **`navCompanies` in `Base.astro` must pin ALL featured companies, not just
    the first.** The "Companies" nav dropdown is built from a `navCompanies`
    array that used to do `companies.find(c => c.featured)` (grabs only the
    first featured company) then `.filter(c => !c.featured)` for the rest
    (excludes every featured company, not just the one pinned). Since the
    data spec marks the top 3-4 companies `featured: true`, this silently
    dropped companies ranked #2-4 from the dropdown — while those same
    companies still appeared correctly in comparisons, the ranked table, and
    the footer, making the bug easy to miss on a casual scan. Fixed
    (2026-07-12) to `companies.filter(c => c.featured).sort((a,b) =>
    b.rating - a.rating)` for the pinned block. If you ever hand-edit
    `Base.astro`, keep this pattern — do not reintroduce a `.find()` for the
    pinned company. Verify with the dropdown-completeness check in
    `create-reviewer-site.md` Phase 5.

15. **Every site needs a `src/pages/contact.astro` (Web3Forms) — this template
    was missing the step until 2026-07-12.** A separate fork of this skill
    (`~/PycharmProjects/AI_Agents_Development_reviewer/site-cloner/`) already
    had a Phase 4j for this and was used to build bestwebsearchapis.com and
    best-ai-agent-developers.com, but the fix was never merged into the
    version actually wired up for r2d2 sites, so all 10 live r2d2 sites
    launched without a contact page. Fixed by porting that phase into
    `create-reviewer-site.md` (now Phase 4j) and adding the page + nav/footer
    links to all 10 sites and this template. The Web3Forms access key
    (`032a901f-d3c0-46a4-afd4-907be497ee1e`) is shared/reusable across every
    site — it is not a per-site secret. When forking or borrowing steps from
    a sibling copy of this skill in the future, diff it against this file
    instead of assuming this file is already current.

16. **Every page `<title>` must be strictly under 70 characters.** `Base.astro`
    computes `title | SITE.name` and drops the ` | SITE.name` suffix instead
    of overflowing if the combined string would hit 70+ characters
    (`titleWithSite.length >= 70 ? title : titleWithSite`). Company profile
    titles (`src/pages/companies/[slug].astro`) are `${company.name} review
    ${year}` — do not append a niche-label clause like `: ${NICHE.label}` to
    it; before this was fixed (2026-07-12) that alone produced a 100+
    character title for a large-name company on an earlier ML-niche site
    (company name + ": Machine Learning Development | Best Machine Learning
    Development Services Companies"). Verify with
    `grep -roE "<title>.{70,}</title>" dist/` after every build — must return
    zero results. Known gap: comparison-page titles
    (`${c1.name} vs ${c2.name} (${year}): ${NICHE.label} comparison`) can
    exceed 70 characters on their own with two long company names, with
    nothing left for the Base.astro safety net to drop — this is unresolved
    and should be flagged to the user rather than silently reworded.

17. **Homepage `<title>` and `<h1>` must be Title Case, not sentence case.**
    `NICHE.providersLabel` in `src/config.ts` is stored lowercase (e.g.
    `'agencies'`, `'companies'`) on purpose — it reads correctly mid-sentence
    elsewhere on the homepage ("36 agencies reviewed", "Compare all
    agencies"). But `src/pages/index.astro`'s `<title>` and `<h1>` used it
    verbatim too, which shipped e.g. "Best Machine Learning agencies in
    2026" (lowercase "agencies") instead of "...Agencies..." on 8 of the 10
    live r2d2 sites before this was fixed (2026-07-12). Fixed with a
    `titleCase()` helper in `index.astro`'s frontmatter, applied only at the
    `<title>`/`<h1>` call sites (`providersLabelTC`) — never capitalize
    `NICHE.providersLabel` itself in config, that would break every
    lowercase mid-sentence usage. If you hardcode the homepage headline
    instead of using `{NICHE.providersLabel}` (e.g.
    `best-ml-development-companies-europe` and
    `top-ml-development-services-europe` both hardcode "Companies"), just
    write it already capitalized — there's nothing to title-case
    programmatically in that path.

18. **Never bake `${SITE.lastReviewed}` (or any month/year) into a
    `description` prop.** `SITE.lastReviewed` is for visible on-page trust
    signals only — the "Last reviewed: [Month Year]" footer on company,
    comparison, and alternatives pages, and the "Updated [Month Year]" hero
    badge on the homepage. Before 2026-07-12, the homepage, company,
    alternatives, and comparison pages all appended "Updated [Month Year]."
    to their `<meta name="description">`, so every one of the 10 live r2d2
    sites had a search-result snippet that read as stale in any month other
    than the one baked in — these sites are not updated monthly. Same rule
    applies to `SITE.description` in `src/config.ts`: it's the default
    `description` fallback in `Base.astro` and is echoed verbatim in
    `llms.txt.ts`'s blockquote, so a date there goes stale in the same way.
    Verify with:
    `grep -rlE '<meta name="description" content="[^"]*(January|February|March|April|May|June|July|August|September|October|November|December) [0-9]{4}' dist/`
    — must return zero paths.

19. **Every new site needs a visual theme pick, not just a brand color.** A
    color-only pass (just `tailwind.config.mjs` `brand.*`) leaves every site
    with the same Inter font, same `slate` neutral, same `bg-white`, same
    radius/shadow — confirmed 2026-07-12 that this reads as one templated
    group regardless of accent hue, and even a font/radius/neutral-only pass
    on top of that was judged too subtle. Read
    `~/github/r2d2/THEME_REGISTRY.md` in Phase 1 (Step 7) and roll one of
    its 3 Major Options (plain light / light + bold hero / full dark) plus,
    if dark, its two sub-axes (Depth: Deep or Soft; Base hue: Neutral gray
    or Tinted with the site's own brand color). Apply mechanically per the
    registry's "How to apply a row" — it is not a fresh design exploration
    per site. Update the registry's "Used by" column in Phase 4c-2, same as
    the palette registry.

---

## Build Commands

```bash
npm install                    # first time / after adding dependencies
npm run dev                    # local dev server → http://localhost:4321
npm run build                  # production build → dist/
npm run preview                # preview dist/ locally
npm install --cache /tmp/npm-cache   # workaround if npm cache has permission errors
```

---

## Current Status

**Template — initial state.** No companies added. All niche-specific TODO
sections in `src/pages/index.astro` are placeholders awaiting real content.

Data layer: TypeScript (`src/data/companies.ts`). Companies: none — add yours.
