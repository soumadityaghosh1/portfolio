# Soumaditya Ghosh — Portfolio

React + TypeScript + Tailwind CSS v4 + Framer Motion, built with Vite.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Content — one file

All content lives in `src/data/profile.ts`. Each entry is tagged with its source: `'profile'` (listed on
LinkedIn), `'activity'` (only mentioned in LinkedIn posts) or `'certificate'` (an uploaded certificate). The UI
shows the tag. Counts, filters, the "Core Technical Stack" row and the credential totals are all computed from
this file.

- Certificate images: `public/certificates/<slug>.webp` plus `<slug>-thumb.webp`, referenced through `doc()` in the data file.
- Internship certificates attach to their experience entry (`documents`). Course, training and participation certificates go in `certificates`.
- `verifyUrl` is set only for a link that has been checked on the issuer's site (currently Log2Base2 Python).

## Assets

| File | Status |
| --- | --- |
| `public/profile.jpg` / `.webp` | LinkedIn photo, cropped to reduce the #OpenToWork frame. Replace it with a frame-free photo (square, ≥ 800 px) for the best result. |
| `public/resume.pdf` | Not added yet. Once it exists, the Resume buttons link to it automatically; until then they open LinkedIn. |

## Optional

- **Contact form**: set `CONTACT_FORM_ENDPOINT` (for example a Formspree URL) to send messages directly. Until then, the form opens a pre-filled email.
