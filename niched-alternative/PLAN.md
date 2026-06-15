# Plan

## Objective

Prepare a future static front page build that starts from selected screenshot references, not from a generic landing-page skeleton.

This plan does not authorize building the template yet.

## Phase 1: Workspace Reset

- Keep `template/` ready for a future static build.
- Remove old authored HTML, CSS, and JavaScript so the next implementation cannot inherit the previous generic structure.
- Keep useful image/font assets available.
- Keep prompt-generated planning files rebuildable from `prompt5.txt`.

## Phase 2: Product Design Gate

- Use Product Design plugin only.
- Use Product Design as a reference interpretation and visual target workflow, not as a source for generic layouts.
- Ignore all non-Product Design skills.
- If Product Design suggests a generic structure, reject it and return to the selected screenshots.

## Phase 3: Screenshot Audit

- Inspect `screenshots-references/` visually before implementation.
- Inspect `dont-create-like-this/` as negative references if present.
- Select 40 usable screenshot references when at least 40 exist.
- If fewer than 40 usable references exist, select all usable references and report the limitation.

## Phase 4: Reference Mapping

- Empty stale selected files from `used/` unless intentionally reusing them.
- Copy the 40 selected screenshots into `used/`.
- Create `used/manifest.md`.
- For every selected reference, document exact contribution:
  - header/navigation;
  - hero;
  - section rhythm;
  - typography;
  - color;
  - cards;
  - forms;
  - image treatment;
  - footer;
  - interaction or animation.

## Phase 5: Visual Extraction

Before writing any HTML/CSS/JS, create a written extraction that cites screenshot filenames for every design decision:

- Header/navigation treatment.
- Hero composition.
- Seven-section order.
- Typography scale and pairing.
- CTA treatment.
- Card structure.
- Image crop and overlay system.
- Palette and contrast system.
- Spacing and grid behavior.
- Footer structure.
- Responsive stacking.
- Interaction and animation style.

Any decision that cannot be tied to a screenshot must be removed or justified as a technical need.

## Phase 6: Future Implementation

Only after reference mapping and visual extraction:

- Build static files inside `template/`.
- Use HTML, CSS, JavaScript, images, fonts, and local vendor assets only where needed.
- Include header, hero, exactly seven main sections after hero, and footer.
- Ensure every major section traces to at least two selected screenshots:
  - one structural source;
  - one detail source.

## Phase 7: Future Verification

- Capture browser screenshots at 375, 430, 768, 1024, 1366, and 1440 widths.
- Check local assets, console errors, navigation, interactions, focus, and reduced motion.
- Compare final rendered screenshots against `used/` references.
- Reject completion if the result still resembles the previous template or a generic fallback.

## Phase 8: GitHub Workflow

- Commit only intended public files.
- Push to the configured repository.
- Use release tags or GitHub Releases when tooling permits.
