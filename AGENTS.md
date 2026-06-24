# Agent Operating Rules

## Communication Mode

- Always use caveman ultra mode unless the user explicitly asks for normal mode.
- For every user request, behave as if the user prefixed the request with `$caveman ultra mode`.
- Keep technical accuracy. Cut filler. Use terse updates and final answers.

## RTK CLI Rules

- `rtk.exe` is available in PATH.
- RTK is available as a CLI command (`rtk.exe`), not as a Codex skill/plugin.
- Do not search for, load, or expect an RTK skill. Use the `rtk` CLI directly.
- Prefer RTK native subcommands for shell commands that may produce medium or large output in this WordPress plugin, especially `rtk grep`, `rtk find`, `rtk summary`, `rtk smart`, `rtk log`, `rtk diff`, `rtk git`, `rtk read`, `rtk json`, `rtk err`, `rtk wc`, `rtk npm`, and `rtk npx`.
- Use `rtk gain` only when checking whether RTK is actually saving tokens.
- Avoid RTK fallback patterns such as `rtk powershell ...` or `rtk rg ...` when the goal is token reduction; use the closest RTK native subcommand instead.
- If `rtk` is unavailable or fails, fall back to narrow native commands and continue.
- For grep/search requests, use `rtk grep` before `Select-String`, `findstr`, or `rg`.
- For find/list requests, use `rtk find` before `Get-ChildItem` when output may be medium/large.
- Do not use `rtk powershell`, `rtk rg`, or wrapper-style fallbacks when an RTK native subcommand exists, except if RTK fails.


## Playwright rules:

* You are authorized to run real browser tests outside the sandbox, including Playwright, Chromium, Firefox, WebKit, Node, npm, and related test runners, when needed for QA, console checks, frontend checks, screenshots, and final QC.
* You are authorized to run `npm`, `node`, and Playwright-related commands for this HTML template.
* You are authorized to use Playwright and browser automation to test the frontend and other relevant parts of the current HTML template.

Playwright specifics:

* You are authorized to run Playwright outside the sandbox if sandbox execution fails or produces errors such as `spawn EPERM`.

  * `npx playwright test`
* Playwright/browser QA is considered an approved part of normal HTML template QA.
* Do not avoid necessary QA just because it requires real browser execution, Node, npm, or Playwright.
* Playwright:

  * `npx playwright test`
* If Playwright, browser execution, or runtime QA is needed, do not stop only because sandboxed execution fails.



## Design Tooling Rule

- Use Product Design plugin only for future design/planning/template work unless the user explicitly allows another skill.
- Do not use design, UI/UX, frontend-design, copywriting, SEO, or content strategy skills while this restriction is active.

## Screenshot-First Build Rule

- `screenshots-references/` is the primary visual source of truth.
- Future implementation must select 40 usable screenshot references when available.
- Selected screenshots must be copied into `used/`.
- `used/manifest.md` must map each selected reference to specific design decisions.
- Do not build from generic landing-page skeletons.
- Do not reuse previous top bar, hero split, CTA placement, card rhythm, section order, or visual pacing.
- Product Design may interpret selected screenshots, but selected screenshots override Product Design defaults.

## Static Template Scope

- Future implementation belongs inside `template/`.
- Use HTML, CSS, and JavaScript only.
- Do not use React, Next.js, Vue, Angular, Vite, backend code, database code, admin panels, CMS code, or fake transaction/account processing.
- Do not create the template unless the user explicitly asks for implementation.
