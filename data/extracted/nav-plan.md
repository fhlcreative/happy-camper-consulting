# Happy Camper Consulting — Navigation Plan

**Date:** 2026-02-17

---

## Current Navigation (Audit)
The existing site has virtually NO navigation:
- Logo (links to home)
- "Start a Conversation" button
- No menu, no hamburger, no page links
- Subpages (Christian Camps, VDMS) are only reachable via inline text links
- Footer navigation: none

**Problems:**
- Users can't discover pages — they don't know Christian Camps or VDMS pages exist
- No way to navigate between pages once on a subpage
- No back-to-home or breadcrumb navigation
- Complete navigation failure

---

## Recommended Navigation Structure

**Pattern: Compact (5 items + CTA)**

This is a solo consultant with focused services — keep nav simple and clear.

```
[Logo]    Home  |  How We Help  |  About Jeff  |  Resources  |  Contact    [Schedule a Conversation →]
```

### Breakdown:

| Nav Item | Destination | Notes |
|---|---|---|
| **Home** | `/` | Homepage |
| **How We Help** | `/services/` | Overview of HCOM™ framework + links to sub-services. Dropdown could include: "Christian Camps", "VDMS Framework" |
| **About Jeff** | `/about/` | Bio, experience, philosophy, credentials |
| **Resources** | `/resources/` | VDMS detail page, any downloadable guides, blog (future) |
| **Contact** | `/contact/` | Contact form + Calendly embed + phone/email |
| **[Schedule a Conversation →]** | `/contact/#schedule` | CTA button style, visually distinct |

### Mobile Navigation
- Hamburger menu with all items listed flat (no sub-nav)
- Sticky bottom bar with phone icon + "Schedule" button

### Footer Navigation
- All main pages
- Christian Camps (direct link)
- VDMS Framework (direct link)
- Privacy Policy
- Calendly link
- "Website by Townsite" credit

### Secondary Pages (not in main nav, accessible via internal links + footer)
- `/christian-camps/` — Linked from How We Help and footer
- `/vdms/` — Linked from How We Help and Resources
- `/faq/` — If built, linked from footer

---

## Rationale
- **5 items is right** for a solo consultant — not too sparse, not overwhelming
- **"How We Help"** is warmer than "Services" for consulting context
- **"About Jeff"** personalizes it — this is a trust-based personal service
- **CTA button** in nav ensures conversion path is always visible
- **Resources** gives room to grow (blog, guides, downloads) without cluttering nav now
