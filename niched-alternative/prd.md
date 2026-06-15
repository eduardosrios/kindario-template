# Product Requirements Document

## Product

Static front page for Kindario.

## Primary Requirement

The future page must be built from selected screenshot references, not from a generic template system.

## Users

- Donors.
- Volunteers.
- Community partners.
- Humanitarian supporters.
- Organization evaluators.

## Functional Requirements

- Static HTML/CSS/JS only.
- Implement inside `template/`.
- Include header/navigation.
- Include hero.
- Include exactly seven main sections after hero.
- Include footer.
- Include truthful static interactions only.
- Do not imply real payment, booking, login, account, application, or backend processing.

## Design Requirements

- Inspect `screenshots-references/` visually.
- Select 40 usable screenshot references when available.
- Copy selected references into `used/`.
- Create `used/manifest.md`.
- Map every major section to screenshot references.
- Do not reuse the previous page's top bar, hero split, CTA placement, card grid rhythm, section order, or visual pacing.
- Use Product Design plugin only.
- Do not use non-Product Design skills.

## Content Requirements

- Treat visible page copy as a real site, not as a template demo.
- Do not use the word `template` in visible page copy.
- Do not invent donations, awards, partners, certifications, real outcomes, or operational claims.
- Use English only.
- Use clear semantic headings.
- Use one H1 only.

## Metadata Requirements

- Descriptive title.
- Meta description.
- Canonical placeholder.
- Open Graph tags.
- Twitter card tags.
- JSON-LD only when truthful.
- Descriptive alt text.
- No keyword stuffing.

## QA Requirements

Future implementation must verify:

- 375px.
- 430px.
- 768px.
- 1024px.
- 1366px.
- 1440px.

Checks:

- no horizontal overflow;
- no broken local assets;
- no missing images;
- no overlapping text;
- no clipped CTAs;
- working header/navigation;
- working mobile navigation;
- working interactions;
- visible focus;
- reduced-motion support for heavy animation;
- no console errors;
- final visual comparison against `used/`.

## Acceptance Criteria

The build is accepted only if current evidence proves:

- screenshot references were selected and documented;
- screenshot extraction guided implementation;
- every major section traces to references;
- visual result is not generic;
- technical QA passes;
- final screenshots visibly match the selected reference direction.
