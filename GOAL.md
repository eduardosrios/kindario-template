# Goal Prompt

@product-design

Read `project_brand.md`, `prompt5.txt`, `PLAN.md`, `design.md`, `prd.md`, `roadmap.md`, `AGENTS.md`, `generic-goal-prompt.txt`, and `niched-goal-prompt.txt`.

Build only when the user explicitly asks to create the front page. Until then, prepare and preserve the screenshot-led design contract.

## Mission

Create a static front page for Kindario using HTML, CSS, and JavaScript inside `template/`.

Do not build from a generic landing-page skeleton. Build from selected screenshot reference parts.

## Tooling

- Use Product Design plugin only.
- Do not use any other design, UI/UX, frontend, copywriting, SEO, content, or accessibility skill.
- Treat Product Design as a helper for interpreting screenshots, not as a replacement for the screenshots.
- If Product Design defaults conflict with selected screenshots, follow the screenshots.

## Mandatory Reference Workflow

1. Visually inspect `screenshots-references/`.
2. Inspect `dont-create-like-this/` if present.
3. Select 40 usable screenshot references when available.
4. Copy selected references into `used/`.
5. Create `used/manifest.md`.
6. Extract the visual system before writing code.
7. Cite screenshot filenames for every design decision.
8. Build each major section from at least two selected screenshots.
9. Compare final rendered screenshots against `used/`.

## Structure

The future page must include:

- Header/navigation.
- Hero section.
- Exactly seven main sections after hero.
- Footer.

Do not count nested cards, columns, overlays, or subsections as main sections.

## Anti-Generic Requirements

Do not reuse the previous design structure:

- no same top bar composition;
- no same hero split;
- no same CTA placement;
- no same card rhythm;
- no same section order;
- no same visual pacing.

If the result resembles the previous template, stop and revise before completion.

## Technical Scope

Allowed:

- HTML.
- CSS.
- JavaScript.
- local images.
- local fonts.
- local vendor assets only when needed.

Forbidden:

- React.
- Next.js.
- Vue.
- Angular.
- Vite.
- backend code.
- database code.
- admin panel.
- CMS implementation.
- fake payment, booking, login, account, or backend submission behavior.

## Definition Of Done

Completion requires evidence:

- `used/` contains 40 selected references when available.
- `used/manifest.md` maps every selected reference to specific design use.
- Written visual extraction exists before implementation.
- Each major section cites screenshot references.
- Front page has one H1.
- Front page has exactly seven main sections after hero.
- Browser screenshots exist for required widths.
- No broken local assets.
- No console errors.
- No horizontal overflow.
- No clipped CTAs.
- Header/navigation works.
- Interactions work.
- Focus states are visible.
- Reduced motion is supported for heavy animation.
- Final visual comparison proves screenshot influence.
- Final result does not resemble a generic fallback or previous template.
