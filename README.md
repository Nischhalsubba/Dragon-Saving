# Dragon Savings

Static bilingual website for Dragon Savings and Credit Cooperative Limited. The site is designed around plain-language customer guidance: visitors can start from a goal, review savings/loan/remittance information, switch between English and Nepali, and contact the cooperative for current terms.

## Structure

- `index.html` — semantic single-page site and translation hooks.
- `style.css` — maintained production stylesheet for the current interface.
- `app.js` — language switching, responsive navigation, service accordion behavior, linked-detail opening, and footer year.
- `assets/sass/` — small retained Sass foundation with shared variables, mixins, typography, base rules, and alignment utilities.
- `favicon.svg`, `manifest.webmanifest`, `robots.txt` — public browser/discovery assets.
- `.github/workflows/quality.yml` — repository quality checks.

The Sass directory intentionally contains only partials that own real styles. Empty page/layout placeholders from an older boilerplate have been removed.

## Quality checks

Install development dependencies and run the repository checks:

```bash
npm install
npm run lint
```

The lint command checks formatting, HTML, the production stylesheet, and browser JavaScript.

## Runtime behavior

`app.js` is dependency-free and keeps the existing DOM/data-attribute contract intact. English is the default language, Nepali is selected automatically for Nepali browser locales unless the visitor has saved a valid preference, and language selection is stored in local storage when available.

The mobile menu synchronizes its visible state with `aria-expanded`; Escape closes it and returns focus to the trigger. Service `<details>` sections behave like a single-open accordion, and same-page service links open their target details block before navigation.

## Content responsibility

Financial rates, eligibility rules, documents, provider availability, and product terms can change. The site intentionally directs visitors to confirm current information with the cooperative rather than hard-coding claims that may become stale.

## Maintenance

Keep public routes and translation keys stable when possible. When adding translated UI text, add matching keys for both `en` and `ne` and connect the markup through the existing `data-i18n*` attributes.

Do not reintroduce automated README rewriting, generated repository reports, editor-specific workspace settings, or empty architectural placeholders.
