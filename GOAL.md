# Goal Prompt For Kindario Front Page Implementation

Use this Goal when it is time to build the Kindario front page. Do not use this Goal for the current planning-only pass.

```text
/goal Build the Kindario static front page inside `template/` using the current project context, `project_brand.md`, `design.md`, `prd.md`, `PLAN.md`, and `roadmap.md`.

Project context:
- Brand: Kindario
- Repository: https://github.com/eduardosrios/kindario-template
- Niche: charity, NGO, donation, nonprofit, volunteering, poverty, hunger, children, Africa, humanitarian relief, fundraising, donor trust, social impact, and philanthropy
- Stack: static HTML, CSS, and JavaScript only
- Do not use React, Next.js, Vue, Angular, Vite, backend code, database code, admin panels, CMS/PHP code, or fake transaction processing.
- Do not mention the word "template" in visible site copy. Treat Kindario as a real site.

Primary visual authority:
- `screenshots-references/` is the primary visual source of truth.
- Do not treat screenshots as loose inspiration.
- Do not build from a generic landing-page skeleton.
- Build from the selected screenshot reference direction, adapted to Kindario and the humanitarian nonprofit niche.

Before implementation:
1. Use Product Design and relevant installed UI/UX, frontend, responsive, and SEO skills.
2. Visually inspect `screenshots-references/`.
3. Inspect `dont-create-like-this/` if it exists and avoid those patterns.
4. Inspect `imagens/` or similar local image folders.
5. Select a maximum of 30 screenshot references.
6. Copy every selected reference into `used/`.
7. Create or update `used/manifest.md` with:
   - selected reference filenames
   - why each was selected
   - which section or visual behavior it influences
   - how the final design avoids direct copying
8. Extract a concrete design direction before writing production HTML/CSS/JS.

The extracted design direction must cover:
- typography scale and font pairing
- section rhythm
- layout density
- header/navigation treatment
- hero composition
- CTA treatment
- card composition
- image cropping and image treatment
- icon style
- color palette
- contrast strategy
- spacing system
- animation and interaction style
- footer structure
- responsive behavior patterns

Front page requirements:
- Header/navigation
- Hero section
- Exactly 7 main sections after the hero
- Footer
- Subsections or columns do not count as additional main sections
- Use real, high-quality images
- Avoid watermarked, low-quality, misleading, or visually mismatched assets
- Use truthful alt text
- Use Bootstrap where useful
- Use Font Awesome where useful
- Use GSAP or Three.js only if they materially improve the result and can be verified
- Keep all files and copy in English

Suggested Kindario content direction:
- High-trust humanitarian storytelling
- Clear giving or support pathway without fake payment processing
- Volunteer recruitment and partner pathways
- Transparent impact explanation without invented proof
- Field-report or editorial story rhythm
- Respectful imagery and copy that avoids exploitation, guilt manipulation, or unverifiable claims

SEO requirements:
- One H1 only
- Descriptive title tag
- Meta description
- Canonical placeholder
- Open Graph metadata
- Twitter card metadata
- JSON-LD where appropriate
- Semantic headings
- Descriptive alt text
- No keyword stuffing

Responsive and QA requirements:
- Verify with browser screenshots or Playwright at 375px, 430px, 768px, 1024px, 1366px, and 1440px.
- Confirm no horizontal overflow.
- Confirm no broken local assets.
- Confirm no missing images.
- Confirm no overlapping text.
- Confirm no clipped CTAs.
- Confirm header and mobile navigation work.
- Confirm interactive controls work.
- Confirm keyboard focus is visible.
- Confirm reduced-motion handling for heavy animation.
- Confirm no console errors.
- Compare rendered output against the selected references in `used/`.

If blocked:
- Stop before implementation if `screenshots-references/` is missing or cannot be visually inspected.
- Stop if required visual assets are unusable and no acceptable alternative can be generated or sourced.
- Stop if browser verification cannot run and visual QA cannot be reasonably completed.
- Explain the blocker, affected requirement, and needed user decision.

Definition of Done:
- The build exists in `template/`.
- `used/` contains all selected screenshot references.
- `used/manifest.md` explains reference selection and influence.
- The page has header, hero, exactly 7 post-hero main sections, and footer.
- The result visibly follows the selected screenshot-led design direction.
- The design looks premium, senior-level, and non-generic.
- The result is original and not a direct copy of any reference.
- SEO, accessibility, responsive, and asset checks pass.
- Final response lists files changed, selected references summary, verification performed, and any GitHub publishing limitation.
```
