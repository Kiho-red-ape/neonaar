# neonaar

NeoNaar Biotech website. A static, responsive multi-page site using the supplied green, gold and cream palette and original brand artwork.

## Run locally

Requires Node.js 18 or newer. No package installation is needed.

```sh
npm run build
npm start
```

Open http://127.0.0.1:4173. The site uses root-relative URLs, so serve it at a domain root rather than opening HTML directly.

## Pages

- `/` — centered video hero, materials, a brief Indian-origin story, and contact invitation.
- `/about/` — company story.
- `/products/` — material platforms.
- `/products/neocell/` and `/products/neonilam/` — categories.
- `/products/neocell/pure/`, `/products/neocell/grow/`, `/products/neonilam/base/`, `/products/neonilam/balance/` — individual products.
- `/contact/` — team contacts and enquiry email composer.

Edit page content in `scripts/build.mjs`; rerun `npm run build`. Styling and interactions are in `dist/styles.css` and `dist/app.js`.

## Team profiles

Kishore Kumar (CEO, Co-founder) and Gayathri Menon (CTO, Co-founder) appear above the contact form with their supplied portraits and LinkedIn profiles. Update `team.json` and rebuild to edit the profiles. The About page features the supplied laboratory team photograph.

## Enquiries

The form creates a draft addressed to hello@neonaar.com, from the supplied brochures. It does not send or store enquiries. Visitors review and send the draft from their email app. Technical contact: gm@neonaar.com.

## Brand and media

The horizontal brand lockup combines NeoNaar’s supplied fibre symbol and original logo-font wordmark. Gold #d9b441, green #2d4a2b, cream #f4edde.

The hero uses licensed real moving-leaves footage from Mixkit. A pause/play control and reduced-motion support are included. The farm photograph was taken in Chhattisgarh, India. Stock photos do not represent NeoNaar staff, facilities or confidential feedstock. See `dist/credits.html` for sources and licenses. Replace stock photos with approved company photos when supplied.

## Hosting

Publish the `dist` directory at a domain root with directory index support. This site's private Sites identity is recorded in `.openai/hosting.json`. Repository: https://github.com/Kiho-red-ape/neonaar.

