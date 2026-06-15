# Design Direction

## Design Objective

Kindario should feel like an editorial humanitarian platform with clear action pathways. The future front page must be visually led by selected references from `screenshots-references/`, not by a generic charity or landing-page pattern.

The page should communicate trust, clarity, urgency, and care through layout, typography, imagery, and interaction quality.

## Primary Visual Source

`screenshots-references/` is the primary visual authority for the future build.

The implementation agent must:

- Inspect the screenshot folder visually before coding.
- Select no more than 30 references.
- Copy selected references into `used/`.
- Document the references in `used/manifest.md`.
- Extract a design direction before writing production HTML/CSS/JS.
- Compare the rendered page against the selected references before completion.

## Reference Extraction Checklist

For each selected reference, extract only what is useful:

- Hero composition.
- Header/nav density.
- Type scale.
- Font personality.
- Section transitions.
- Grid rhythm.
- Card proportions.
- Image crop style.
- CTA visual treatment.
- Motion expectations.
- Footer layout.
- Mobile adaptations.

Do not copy a full screenshot 1:1. Combine the strongest design patterns into a coherent Kindario-specific page.

## Intended Art Direction

Direction: editorial field reports meet high-trust action platform.

The final design should feel:

- Premium and intentional.
- Human and photographic.
- Serious enough for donors and partners.
- Clear enough for volunteers and first-time visitors.
- Original enough to avoid stock-template sameness.

Avoid:

- Generic beige charity layouts unless a selected reference strongly justifies it.
- Predictable hero plus card-grid structures.
- Weak decorative shapes.
- Low-density content that feels empty.
- Overly sentimental copy or manipulative imagery.
- Fake proof, fake partner logos, fake donation processing, or unverifiable statistics.

## Typography

The final font pairing must be chosen after reviewing selected references.

Preferred direction:

- A strong editorial display face for large headings.
- A highly readable sans-serif for navigation, body copy, forms, and UI.
- No more than three font families.
- Strong hierarchy between hero, section titles, cards, metadata, and CTAs.
- No viewport-width font scaling.
- No negative letter spacing.

## Color And Contrast

The final palette must come from the selected screenshot direction and Kindario's humanitarian context.

Recommended principles:

- Use a mature, trustworthy base palette.
- Reserve high-energy accents for CTAs and progress/action states.
- Avoid a one-note palette dominated by a single hue family.
- Avoid decorative gradients unless they are clearly supported by selected references.
- Maintain accessible contrast for text and controls.

## Layout Rhythm

The future page must have a deliberate sequence:

- Strong first viewport.
- Clear proof or trust-building moment.
- Mission/positioning.
- Action or campaign architecture.
- Deeper story/report content.
- Participation paths.
- Final conversion section.
- Professional footer.

Spacing should feel designed, not generated. Section proportions, image sizes, and card density must be based on selected screenshots.

## Imagery

Use real, high-quality images from `imagens/` when suitable. Generate or source additional images only if local assets do not support the selected direction.

Image rules:

- No watermarks.
- No misleading alt text.
- No image that contradicts visible copy.
- No lazily cropped subjects.
- No low-resolution hero imagery.
- Subject placement must work on mobile and desktop.

For the Kindario niche, imagery should be respectful and grounded. Avoid exploitative poverty framing.

## Interaction Direction

Interactions should be useful and restrained:

- Mobile navigation.
- CTA states.
- Optional static contribution/support controls.
- Optional video/story modal.
- Optional reveal or scroll effects only if smooth and reduced-motion safe.

Do not add complex interaction just for novelty.

## Footer Quality

The footer must be treated as a designed section, not an afterthought.

It should include:

- Brand statement.
- Key navigation.
- Action links.
- Contact placeholders.
- Trust/legal placeholders.
- Clear responsive stacking.

The footer structure should be informed by selected references.

## Responsive Design

Responsive behavior must be planned from the selected references and verified at:

- 375px
- 430px
- 768px
- 1024px
- 1366px
- 1440px

The implementation must avoid horizontal overflow, clipped CTAs, unstable card heights, and text overlap.
