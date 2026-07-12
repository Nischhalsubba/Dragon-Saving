# Dragon Savings Website Redesign

A modern, accessible static website for **Dragon Savings and Credit Cooperative Limited**, based on the organisation's public website content and official logo.

## Design goal

The site is designed for first-time visitors who may not be financially educated. Instead of beginning with product terminology, it starts with three simple needs:

1. I want to save.
2. I need a loan.
3. I want to send or receive money.

The interface then explains relevant services in plain language, includes Nepali support labels for key choices, and repeatedly directs visitors to confirm current rates, eligibility, documents and terms with the cooperative.

## Included

- Official Dragon Savings logo
- Responsive, mobile-first layout
- Plain-language service navigator
- Savings, loan, remittance and digital-service categories
- English content with selective Nepali support labels
- Cooperative history and registration information
- Chairman's message
- Contact details and social links
- Keyboard-accessible tabs and navigation
- Reduced-motion support and visible focus states
- Mobile quick-action bar for calling, services and directions

## Content source

Public organisation details, service names, contact information and the logo were adapted from:

https://dragonsaving.com.np/

The redesign does not publish interest rates or promise eligibility because those details may change. Visitors are advised to confirm current terms directly with the cooperative.

## Run locally

No build step is required.

```bash
python -m http.server 8000
```

Open:

```text
http://127.0.0.1:8000/
```

## Files

| File | Purpose |
|---|---|
| `index.html` | Page structure, content and accessible navigation |
| `style.css` | Brand system, layouts, components and responsive states |
| `app.js` | Service navigator, need selector, mobile menu and reveal states |
| `manifest.webmanifest` | Basic site metadata |
| `.nojekyll` | Static GitHub Pages configuration |
