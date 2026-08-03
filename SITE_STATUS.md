---
title: "happy-camper-consulting — Site Status"
status: active
updated: 2026-08-03
---

# happy-camper-consulting — Site Status

Running record of what's changed on this site, why, and what's still
open. Newest entry first. Every shipped entry should cite its commit so
the log and the repo can't drift apart.

> Excluded from deploy via `.vercelignore`.
> This file must never be served publicly.

## Facts

| | |
|---|---|
| **Local** | `/Users/philgoodwin/Townsite-websites/happy-camper-consulting/` |
| **Repo** | `https://github.com/fhlcreative/happy-camper-consulting.git` (private) |
| **Deploy** | push to `main` → Vercel auto-deploys production |
| **Live (Vercel production alias)** | https://www.happycamperconsultant.com |
| **Canonical in markup** | https://happycamperconsultant.com/ |
| **Build step** | `node build.js` |
| **Markdown is a build input** | ⚠️ yes — insights/articles |
| **Pages** | 20 HTML files |
| **History** | 217 commits, 2026-02-17 → 2026-08-03 |
| **Latest** | `b3f45c4 — Stop deploying internal docs to the public site` |
| **Local review** | `npm run build` first, then `python3 -m http.server 8080` → http://localhost:8080 |

> ⚠️ **Do not add `*.md` to this repo's `.vercelignore`.** Markdown here
> is consumed as a build input; a wildcard would starve the build and
> silently empty the generated sections. Use root-anchored paths.

## Other docs in this repo

`README.md` — read these directly rather than trusting a summary here.

## 2026-08-03 — SITE_STATUS.md seeded

**Earlier today, commit `b3f45c4`:** `README.md` were being served publicly
at the live domain. Closed with a root-anchored `.vercelignore` rule
(deliberately not `*.md`). Verified 200 → 404 by curl; site unaffected.

**This file was created today** as part of a fleet-wide rollout, together
with a `.vercelignore` rule excluding it from the deploy. The Facts table
above is derived from git, the filesystem, and `vercel project ls`.

The history below was mined from Phil's working-memory files. It is a
**summary of summaries** — the per-site `MEMORY.md` indexes were read,
but not the ~90 individual topic files they link to. Treat it as a
pointer to the sources named, not as primary evidence. Credentials,
keys and passwords present in those sources were deliberately omitted.

---

## Prior history — from working memory, not from git

**Sources:** `hcc-maintenance.md`, `-Townsite-websites-happy-camper-consulting/memory/MEMORY.md`, `hapi-incident.md`
**Last substantive update in sources:** 2026-07-07

### Recent work
- Full multi-page site live at happycamperconsultant.com; all pages built, SEO-optimized and deployed. Lora + Source Sans 3, navy/gold/cream.
- **Sveltia CMS** at `/admin/` — *"drop-in replacement for Decap... Use Sveltia for all future projects instead of Decap."* Jeff is actively publishing articles and uploading images. Daily GitHub Actions cron redeploys for scheduled posts.
- Three product pages (Starter Kit, Safety Playbook, Staff Retention Toolkit) merged to main 2026-04-14 with Stripe links.
- Maintenance Request 1 (HCOM language, 13 edits) complete and deployed 2026-03-08.
- Email migrated to Google Workspace 2026-03-02 after a multi-day DNS/MX saga; MachForms SMTP switched to Gmail.

### Open / unresolved
- **Maintenance Request 2 is still on the `staging` branch awaiting Jeff's approval** (commit `421bc56`, submitted 2026-03-17) — 11 changes across investment/homepage/VDMS/christian-camps/services/about. Merge staging→main when approved. *Note: the per-site index says the Mar 17 staging merge happened; `hcc-maintenance.md` still lists it as pending. Sources conflict — verify branch state before assuming.*
- Domain transfer Chillidog → Namecheap, waiting on the 60-day lock; then cancel Chillidog.
- Google Search Console sitemap submission; Rich Results validation.

### Gotchas
- **⚠️ DNS incident 2026-07-07**: root A got clobbered to the forms IP. *"Vercel's recommended A record is now `216.150.1.1`"* — **not** the `216.198.79.1` used across the rest of the fleet. Raised with Phil 2026-08-03; his read: *"I think everything should be fine."* The divergence is intentional/accepted — **don't "correct" it to match the fleet.**
- **⚠️ Never move nameservers to Vercel** — *"it wipes out Chillidog's MX records and breaks email."* Keep NS at Chillidog, add A/CNAME there. Edits go through **cPanel → Zone Editor**.
- `build.js` reads `insights/articles/*.md` as **build input** — a blanket `*.md` `.vercelignore` rule starves the build (you found this independently).
- Centering gotcha: global `p, li, blockquote { max-width: 68ch }` left-aligns content inside centered wrappers.
- Public `/data/extracted/*.md` (competitor research, site audit) was closed in the June audit.
- **PUBLIC repo with no branch protection** — flagged in the June audit, and **deliberate**: Phil confirmed 2026-08-03 he made it public so Jeff could post through the CMS. See the note below — public may not actually be required.
- ~~**⚠️ `hapi-incident.md` is an UNRESOLVED security incident**~~ — **CLOSED by Phil, 2026-08-03.** Jeff's own AI agent had claimed exposed Google OAuth credentials in a repo Phil could never locate. Phil's call: *"we can mark that issue as closed."* No further action.
- **Public visibility may be unnecessary.** `jeffrorabaugh` is already a **collaborator** on this repo (`gh api repos/fhlcreative/happy-camper-consulting/collaborators`, checked 2026-08-03). Sveltia CMS authenticates as the logged-in GitHub user and works against private repos so long as that user has write access — so the repo could likely go private without affecting Jeff's publishing. Not changed; raised with Phil 2026-08-03, no decision yet.
- Listed as having no EmailJS contact form (MachForms instead).

---


## Recent commits

```
2026-08-03  b3f45c4  Stop deploying internal docs to the public site
2026-07-24  835eebf  Update Insights Articles “the-camp-culture-audit-5-signs-your-values-are-not-reaching-staff”
2026-07-19  d0616be  Update Insights Articles “the-camp-culture-audit-5-signs-your-values-are-not-reaching-staff” +1
2026-07-19  5d3cd0e  Create Insights Articles “the-camp-culture-audit-5-signs-your-values-are-not-reaching-staff”
2026-07-05  11ea5bc  Update Insights Articles “why-camps-drift-when-supervisors-avoid-hard-conversations” +1
2026-07-05  bec9a97  Update Insights Articles “why-camps-drift-when-supervisors-avoid-hard-conversations”
2026-07-05  39c3789  Create Insights Articles “why-camps-drift-when-supervisors-avoid-hard-conversations”
2026-06-23  c0055f7  Update Insights Articles “what-healthy-camp-leadership-teams-do-differently”
```

---

## History before 2026-08-03

Everything above is derived from git, the filesystem, and the live site.
Narrative history is only included where a written source exists and is
cited. Nothing about *why* earlier decisions were made has been inferred.
