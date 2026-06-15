# Implementation Plan

## Objective

Prepare a senior-quality, screenshot-led implementation plan for the Kindario static front page. This plan is for the future build only. Do not edit the front page yet.

The future implementation must create a static HTML/CSS/JS front page in `template/`, using the current project context and the visual direction extracted from `screenshots-references/`.

## Project Context

- Brand: Kindario
- Repository: https://github.com/eduardosrios/kindario-template
- Niche: charity, NGO, donation, nonprofit, volunteering, poverty, hunger, children, Africa, humanitarian relief, fundraising, donor trust, social impact, philanthropy
- Stack: static HTML, CSS, and JavaScript
- Primary visual source: `screenshots-references/`
- Available local media folder: `imagens/`
- Avoidance folder: `dont-create-like-this/`, if present
- Used-reference folder: `used/`

## Planning Principles

1. Build from visual evidence, not from a generic landing-page skeleton.
2. Let selected screenshot references drive the design system.
3. Keep the page static unless explicitly requested otherwise.
4. Use real assets and truthful alt text.
5. Treat visual quality as a completion criterion, not optional polish.
6. Preserve English-only project files and visible copy.
7. Avoid fake processing, fake claims, and unverifiable trust signals.

## Phase 1: Reference And Constraint Audit

Before writing production HTML/CSS/JS, the future implementation agent must:

- Confirm `screenshots-references/` exists.
- Visually inspect enough screenshots to understand available quality and patterns.
- Confirm `dont-create-like-this/` exists or is absent.
- Inspect `imagens/` or equivalent local asset folders.
- Confirm Bootstrap and Font Awesome availability or choose reliable fallbacks.
- Confirm whether Playwright/browser verification can run.
- Report blockers before implementation if references cannot be inspected or if assets are unsuitable.

Verification:

- Count available screenshot references.
- Identify whether local photos are usable, watermarked, or mismatched.
- Confirm no implementation begins before reference selection.

## Phase 2: Reference Selection

Select at most 30 references from `screenshots-references/`.

Selection criteria:

- Strong visual hierarchy.
- Premium typography.
- Distinctive section rhythm.
- Strong hero or first-screen composition.
- Mature CTA treatment.
- Professional card or content systems.
- High-quality footer patterns.
- Relevant interaction or responsive behavior clues.
- Suitability for the Kindario niche.

Avoid:

- Generic page structures.
- Weak card grids.
- Bland stock layouts.
- Repetitive references.
- Low-resolution or visibly broken screenshots.
- Any pattern that conflicts with the requested static front page scope.

Output:

- Copy all selected references into `used/`.
- Create or update `used/manifest.md`.
- Document why each reference was selected and which part will influence the final design.
- Explain how the future page will differ enough to avoid copying.

## Phase 3: Visual Direction Extraction

Before implementation, extract a concrete design direction from the selected references.

Required extraction:

- Typography scale and font pairing.
- Layout density.
- Section rhythm.
- Header and navigation pattern.
- Hero structure.
- CTA style.
- Card composition.
- Image cropping and treatment.
- Icon style.
- Palette and contrast strategy.
- Spacing system.
- Motion and interaction behavior.
- Footer architecture.
- Responsive behavior.

Output:

- Update `design.md` or a build note with the selected direction.
- The implementation must follow this extracted direction unless a blocker is reported.

## Phase 4: Content Architecture

The future front page must include:

- Header/navigation.
- Hero section.
- Exactly 7 main sections after the hero.
- Footer.

Suggested Kindario section candidates:

1. Trust/proof framing.
2. Mission or impact model.
3. Campaigns or impact areas.
4. Giving/contribution path.
5. Field story or report.
6. Volunteer or partner pathway.
7. Final story-led CTA.

The exact structure may change if the selected screenshot references support a stronger composition, but the count must remain exactly 7 post-hero main sections.

## Phase 5: Static Implementation

Future implementation scope:

- Build inside `template/`.
- Use HTML, CSS, and JavaScript.
- Use Bootstrap where useful.
- Use Font Awesome where useful.
- Use GSAP or Three.js only if they materially improve the page and can be verified.
- No React, Next.js, Vue, Angular, Vite, backend, database, admin panel, CMS code, or fake processing.
- Do not mention "template" in visible site copy.

Implementation standards:

- Semantic HTML.
- Accessible controls.
- Responsive layout using stable dimensions and constraints.
- Local assets when practical.
- No broken references.
- No generic placeholder copy.
- Clear comments only where helpful.

## Phase 6: SEO And Structured Data

Future implementation must include:

- One H1.
- Descriptive title.
- Meta description.
- Canonical placeholder.
- Open Graph metadata.
- Twitter card metadata.
- JSON-LD where appropriate.
- Truthful alt text.
- Semantic heading order.
- No keyword stuffing.

## Phase 7: Responsive And Interaction QA

Verify at minimum:

- 375px mobile.
- 430px mobile.
- 768px tablet.
- 1024px tablet.
- 1366px desktop.
- 1440px desktop.

Checks:

- No horizontal overflow.
- No overlapping text.
- No clipped buttons.
- No broken images.
- Header and mobile navigation work.
- Interactive controls work.
- Keyboard focus is visible.
- Heavy motion respects reduced-motion preferences.
- No console errors.

## Phase 8: Visual Comparison

Before calling the future implementation complete:

- Compare rendered screenshots against the selected references in `used/`.
- Confirm the page visibly follows the extracted direction.
- Confirm it is original and not a direct copy.
- Fix generic sections, weak spacing, poor typography, bad image crops, and weak footer design before final handoff.

## Definition Of Done

The future build is done only when:

- `template/` contains a complete static front page.
- `used/` contains every selected reference.
- `used/manifest.md` explains selected references and influence.
- The page has header, hero, exactly 7 post-hero sections, and footer.
- The page does not use a generic landing-page skeleton.
- The design visibly follows the selected screenshot direction.
- SEO and accessibility basics are present.
- Responsive QA passes at the required viewport sizes.
- Browser/Playwright verification passes or an explicit verification limitation is reported.
- No front page claim is unverifiable or misleading.
- No source reference has been copied 1:1.

## GitHub Note

The target repository is `https://github.com/eduardosrios/kindario-template`. If the future implementation is performed in a real Git repository, commit and release work can be done after verification. If the workspace is not a Git repository, report that as a publishing blocker instead of pretending a commit or release happened.
