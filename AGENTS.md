# AGENTS.md

## Project Rules

All project-facing output must be in English. This includes Markdown files, site copy, code comments, commit messages, release notes, and assistant summaries.

Project context:

- Brand: Kindario
- Repository: https://github.com/eduardosrios/kindario-template
- Niche: charity, NGO, donation, nonprofit, volunteering, poverty, hunger, children, Africa, humanitarian relief, fundraising, donor trust, social impact, and philanthropy
- Stack for the future front page: static HTML, CSS, and JavaScript
- Build output folder: `template/`
- Primary visual source folder: `screenshots-references/`
- Selected reference archive folder: `used/`

## Scope Guardrails

Unless the user explicitly asks otherwise:

- Do not use React.
- Do not use Next.js.
- Do not use Vue.
- Do not use Angular.
- Do not use Vite or any build step.
- Do not add backend code.
- Do not add database code.
- Do not add admin panels.
- Do not add WordPress PHP or CMS implementation.
- Do not create real payment, account, authentication, booking, or transaction flows.
- Do not pretend static controls perform real backend actions.

Use Bootstrap where useful. Use local/vendor assets where practical. Use Font Awesome where useful, preferably from local project assets when available.

## Product Design And Skills

Use Product Design when the work involves design direction, visual references, prototype planning, UI implementation, redesign, or design QA.

Use relevant installed skills for:

- Senior Web UI/UX Web Design.
- Senior Website Developer.
- Responsive Design.
- Senior SEO.

For build work, do not start coding before the visual source is clear. If a source exists, match and adapt it. If no source exists, ask or generate/select a direction first.

## Screenshot-Led Design Rule

`screenshots-references/` is the primary visual source of truth for the future front page.

Before implementation:

1. Visually inspect `screenshots-references/`.
2. Select a maximum of 30 references.
3. Copy selected references into `used/`.
4. Create or update `used/manifest.md`.
5. Extract a concrete design direction.
6. Only then write production HTML/CSS/JS.

Required extraction:

- Typography scale and font pairing.
- Section rhythm.
- Layout density.
- Header and navigation treatment.
- Hero composition.
- CTA treatment.
- Card composition.
- Image cropping and treatment.
- Icon style.
- Color palette.
- Contrast strategy.
- Spacing system.
- Animation and interaction style.
- Footer structure.
- Responsive behavior.

Do not build from a generic landing-page skeleton. Build from the selected screenshot reference direction, adapted to the current brand and niche.

## Reference Integrity

Never copy a screenshot exactly.

Use selected references to extract design principles and section-level patterns. The final page must be original, coherent, and adapted to Kindario.

If many references are similar, choose the strongest one. Exclude weak, generic, repetitive, outdated, or unsuitable screenshots.

If `dont-create-like-this/` exists, inspect it before build work and avoid those patterns.

## Visual Quality Bar

The future page must look senior-level and premium. Passing technical checks is not enough.

Reject or revise work that:

- Looks generic.
- Uses weak typography.
- Uses mismatched or watermarked images.
- Has poor spacing.
- Has bland cards.
- Has a weak footer.
- Ignores selected screenshot references.
- Uses decorative elements without functional hierarchy.

## Accessibility And SEO

Future front page work must include:

- One H1.
- Semantic headings.
- Descriptive title and meta description.
- Canonical placeholder.
- Open Graph metadata.
- Twitter card metadata.
- JSON-LD where appropriate.
- Truthful alt text.
- Keyboard-accessible controls.
- Visible focus states.
- Reduced-motion support for heavy animation.
- No keyword stuffing.

## Responsive Verification

Verify at minimum:

- 375px mobile.
- 430px mobile.
- 768px tablet.
- 1024px tablet.
- 1366px desktop.
- 1440px desktop.

Check for:

- Horizontal overflow.
- Clipped CTAs.
- Overlapping text.
- Broken images.
- Missing assets.
- Console errors.
- Mobile navigation behavior.

## RTK And Caveman Ultra

Use RTK and caveman ultra internally whenever practical to reduce token usage.

Rules:

- Use compressed internal reasoning for exploration, repetitive checks, and intermediate notes.
- Do not let compressed wording reduce the quality of final documents, code, visible copy, or user-facing summaries.
- Do not write project documentation in caveman style.
- Keep final Markdown professional, precise, and complete.

## Adapted Karpathy-Style Engineering Rules

These rules are adapted from the Karpathy-style guideline source at:

https://github.com/multica-ai/andrej-karpathy-skills/blob/main/CLAUDE.md

### Think Before Editing

State assumptions when they matter. If a requirement is ambiguous and the wrong assumption would materially affect the result, ask before implementing.

### Simplicity First

Use the minimum implementation that satisfies the requested scope. Do not add speculative features, unnecessary abstractions, or hidden complexity.

### Surgical Changes

Touch only files relevant to the task. Do not refactor unrelated code or rewrite unrelated documents unless explicitly requested.

### Goal-Driven Execution

Define success criteria before implementation. For future front page work, success includes visual reference matching, responsive QA, SEO QA, and accessibility checks.

### Verification Loop

After implementation, verify with concrete checks. If a check fails, fix and verify again before final handoff.

### Design-Specific Adaptation

Do not let caution reduce the design ambition. Simplicity means clear, purposeful implementation, not bland visual output. The screenshot-led design direction has priority over generic convenience.

## GitHub Workflow

When the workspace is a real Git repository and the user asks for implementation completion:

- Review changed files.
- Commit intentionally.
- Push to the configured repository.
- Create releases when meaningful milestones justify them.

If the workspace is not a Git repository, report that clearly instead of pretending GitHub publishing happened.
