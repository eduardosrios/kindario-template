# Product Requirements Document

## Product

Kindario static front page template.

## Purpose

Create a premium, screenshot-led front page for a humanitarian charity/NGO-style brand. The page should present Kindario as a credible organization with clear paths for support, volunteering, partnership, and impact exploration.

This document defines requirements for the future implementation. Do not edit the front page during the planning pass.

## Users

- Donors or supporters evaluating credibility.
- Volunteers looking for clear roles.
- Partners evaluating collaboration.
- Media or grant stakeholders looking for concise mission and impact context.
- Site owners who will later adapt the static template for a real organization.

## Primary User Goals

- Understand what Kindario does.
- Decide whether the organization feels credible.
- Find a clear action path.
- Explore impact areas or campaigns.
- Understand volunteer or partner options.
- Read a concise story or field-style update.

## Business Goals

- Present a high-quality, non-generic front page.
- Support conversion without fake processing.
- Make the template easy to adapt.
- Demonstrate strong visual direction from selected screenshot references.
- Maintain static deployability.

## Scope

In scope for the future build:

- Static front page inside `template/`.
- HTML, CSS, JavaScript.
- Local assets and vendor files where practical.
- Header/navigation.
- Hero.
- Exactly 7 main sections after the hero.
- Footer.
- Basic interactions.
- SEO metadata.
- Accessibility foundations.
- Responsive QA.
- Reference selection and `used/manifest.md`.

Out of scope unless explicitly requested later:

- React, Next.js, Vue, Angular, Vite, or build-system migration.
- Backend services.
- Database.
- Admin dashboard.
- Authentication.
- Real payment processing.
- Real form submission.
- WordPress PHP/CMS implementation.
- Multi-page site.

## Visual Requirements

The future build must use `screenshots-references/` as the primary visual source of truth.

Before implementation:

- Select no more than 30 screenshot references.
- Copy selected references into `used/`.
- Create/update `used/manifest.md`.
- Extract visual direction from selected references.

The extracted direction must define:

- Typography.
- Layout density.
- Section rhythm.
- Header treatment.
- Hero composition.
- CTA treatment.
- Card composition.
- Image treatment.
- Color and contrast.
- Icon style.
- Motion.
- Footer structure.
- Responsive patterns.

## Content Requirements

Visible copy must:

- Be English-only.
- Avoid the word "template".
- Treat Kindario as a real site while avoiding unverifiable claims.
- Avoid fake metrics unless clearly replaceable/demo in code comments or documentation.
- Avoid manipulative or exploitative humanitarian language.
- Use clear CTA copy.
- Be specific to charity, NGO, humanitarian relief, fundraising, volunteering, and social impact.

## Functional Requirements

The future front page must include:

- Working responsive navigation.
- Working interactive controls if included.
- Clear focus states.
- Reduced-motion support for heavy animation.
- No fake backend behavior.
- Static-safe form behavior if any forms are included.

## SEO Requirements

- Exactly one H1.
- Descriptive document title.
- Meta description.
- Canonical placeholder.
- Open Graph metadata.
- Twitter card metadata.
- JSON-LD where appropriate.
- Semantic headings.
- Descriptive image alt text.
- No keyword stuffing.

## Accessibility Requirements

- Keyboard-accessible navigation and controls.
- Visible focus states.
- Sufficient contrast.
- Semantic landmarks.
- Descriptive button and link labels.
- Avoid motion that cannot be reduced.
- Images must have truthful alt text.

## Responsive Requirements

Verify at:

- 375px mobile.
- 430px mobile.
- 768px tablet.
- 1024px tablet.
- 1366px desktop.
- 1440px desktop.

Required outcomes:

- No horizontal overflow.
- No overlapping UI.
- No clipped CTAs.
- No unreadable text.
- No layout jumps caused by unstable components.

## Asset Requirements

- Inspect `imagens/`.
- Use high-quality images only.
- Avoid watermarked images.
- Avoid mismatched imagery and copy.
- Use local Font Awesome if available.
- Use Bootstrap where useful.
- Use external libraries only when they solve a real interaction or design need.

## Quality Requirements

The future page must look senior-level and premium. Technical checks alone are not enough.

The work is unacceptable if it:

- Looks generic.
- Ignores selected references.
- Uses weak image treatment.
- Has bland typography.
- Uses a predictable stock layout.
- Treats the footer as an afterthought.
- Passes tests but fails visual comparison.

## Acceptance Criteria

The future implementation is accepted only when:

- It follows the selected screenshot-led direction.
- It includes header, hero, exactly 7 post-hero main sections, and footer.
- `used/manifest.md` documents selected references.
- Responsive verification passes.
- SEO/accessibility checks pass.
- All local assets load.
- The result is original and not a direct copy.
