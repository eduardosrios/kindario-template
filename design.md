# Design Direction Process

## Principle

The future design must be screenshot-led.

The selected screenshots in `used/` are the design contract. Product Design may help interpret those references, but no skill or default layout may override them.

## Required Reference Count

Select 40 usable screenshot references from `screenshots-references/` when available.

If fewer than 40 usable references exist, select every usable reference and report the limitation.

## Reference Roles

Each selected screenshot must be assigned at least one role:

- Primary structural reference.
- Secondary detail reference.
- Header/navigation reference.
- Hero reference.
- Section rhythm reference.
- Typography reference.
- CTA reference.
- Card reference.
- Form/input reference.
- Image treatment reference.
- Footer reference.
- Interaction reference.

## Extraction Template

Before writing implementation code, create an extraction table with these columns:

| Decision | Screenshot File(s) | Extracted Pattern | How It Will Be Used |
| --- | --- | --- | --- |
| Header | filename | treatment, spacing, alignment | implementation rule |
| Hero | filename | composition, image scale, type scale | implementation rule |
| Section | filename | rhythm, density, contrast | implementation rule |
| Footer | filename | columns, CTA, legal/social rhythm | implementation rule |

Every major decision must cite screenshot files.

## Near-Screenshot Construction

The future page should be assembled from concrete screenshot parts:

- one screenshot for the header pattern;
- one or more screenshots for hero composition;
- seven screenshot-derived post-hero section patterns;
- at least one screenshot-derived footer pattern;
- secondary screenshots for details.

This is not freeform inspiration. It is section-level reconstruction with adapted content and assets.

## Anti-Generic Design Tests

Reject work if it looks like:

- a recolor of the previous page;
- a standard hero/image split;
- a default Bootstrap page;
- a generic nonprofit template;
- a generic Product Design output;
- a safe AI landing page.

## Negative References

If `dont-create-like-this/` exists, inspect it before future implementation. The future design must avoid similar page structure, header treatment, card rhythm, color balance, and generic section pacing.

## Visual QA

After implementation, compare rendered screenshots to the selected files in `used/`.

Completion is not allowed unless screenshot influence is obvious in:

- header;
- hero;
- section composition;
- typography;
- image treatment;
- footer.
