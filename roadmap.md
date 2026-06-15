# Roadmap

## Milestone 0: Planning Files

Status: ready for update in this pass.

Deliverables:

- `project_brand.md`
- `PLAN.md`
- `GOAL.md`
- `design.md`
- `prd.md`
- `roadmap.md`
- `AGENTS.md`
- `generic-goal-prompt.txt`
- `niched-goal-prompt.txt`

Exit criteria:

- Files are English-only.
- Files preserve Kindario context.
- Files enforce screenshot-led implementation.
- Files do not start front page implementation.

## Milestone 1: Reference Audit

Future build task.

Actions:

- Inspect `screenshots-references/`.
- Inspect `dont-create-like-this/`.
- Inspect local media folders such as `imagens/`.
- Identify visual blockers.

Exit criteria:

- References can be visually inspected.
- Unsuitable asset or verification blockers are reported before coding.

## Milestone 2: Reference Selection

Future build task.

Actions:

- Select up to 30 strongest references.
- Copy selected files to `used/`.
- Create/update `used/manifest.md`.

Exit criteria:

- Each selected reference has a documented reason.
- Similar references are deduplicated.
- Weak/generic references are excluded.

## Milestone 3: Design Direction Extraction

Future build task.

Actions:

- Extract typography, spacing, layout rhythm, cards, CTAs, image treatment, footer, palette, and responsive patterns.
- Define a Kindario-specific design direction from selected references.

Exit criteria:

- The build has a concrete design system before HTML/CSS/JS production begins.

## Milestone 4: Static Front Page Build

Future build task.

Actions:

- Build inside `template/`.
- Use static HTML/CSS/JS.
- Include header, hero, exactly 7 post-hero sections, and footer.
- Add interactions without fake backend behavior.
- Use high-quality truthful images.

Exit criteria:

- Local files are organized.
- Page renders without missing assets.
- Structure matches the planned section count.

## Milestone 5: SEO And Accessibility QA

Future build task.

Actions:

- Verify one H1.
- Verify metadata.
- Verify JSON-LD where appropriate.
- Verify alt text.
- Verify keyboard access and focus states.

Exit criteria:

- SEO basics pass.
- Accessibility basics pass.

## Milestone 6: Responsive QA

Future build task.

Actions:

- Capture or inspect at 375px, 430px, 768px, 1024px, 1366px, and 1440px.
- Fix overflow, clipping, overlap, unstable components, and unreadable text.

Exit criteria:

- No horizontal overflow.
- No clipped CTAs.
- No overlapping content.
- Layout remains professional across all required viewports.

## Milestone 7: Visual Comparison

Future build task.

Actions:

- Compare the rendered page against selected references in `used/`.
- Fix generic, weak, or mismatched sections.
- Confirm originality.

Exit criteria:

- The final page visibly follows the selected reference direction.
- The result does not copy any reference exactly.
- Visual quality meets the premium/senior bar.

## Milestone 8: Repository Publishing

Future build task only if the workspace is a Git repository.

Actions:

- Commit verified changes.
- Push to the configured GitHub repository.
- Create releases when meaningful milestones justify them.

Exit criteria:

- Git history reflects completed work, or a clear blocker is reported if the workspace is not a Git repository.
