# Greenland Construction and Trading Company – Website

Static site (HTML, CSS, vanilla JS). No build step, no framework, no external requests.

## Pages
`index`, `about`, `services`, `projects`, `experience`, `leadership`, `partners`, `contact`, `privacy`, `terms`.

## Run locally
Open `index.html` in a browser, or run `python3 -m http.server` in this folder and visit http://localhost:8000.

## Folder structure
```
css/style.css          all styling (uses logical properties, so Arabic RTL works)
js/main.js             navigation, language selector, filters, project modal, timeline, form
js/projects-data.js    the 74 project records, categories and client list
js/locales.js          all 20 locales bundled (generated from /locales/*.json)
locales/xx.json        editable translations, English (en.json) is the source
assets/logos/          company emblem (extracted from the Organization Profile PDF)
assets/projects/GCTC-###/   one empty folder per project, ready for photos
assets/leadership/  assets/partners/  assets/icons/
```

## Where the content comes from
Every project comes from pages 14–17 of the *Organization Profile 2026*. Nothing was invented. Contract values are deliberately not published. Bank account numbers from the profile are not published either.

**Excluded on purpose:** the older ZIP's Afgoi urban-planning entry and other invented items, and its `logo.jpg` (a 3D night-time housing render, not a logo). The PDF's stock photographs (excavators, cranes, helmets) are not used as project images.

## Edit content
- **Add a project:** add an object to `window.PROJECTS` in `js/projects-data.js` (copy an existing one; use the next `GCTC-###` id). Set `featured:true` to show it on the home page (6 recommended).
- **Add project photos:** put up to 3 images in `assets/projects/GCTC-###/` and list them in that record: `images:["assets/projects/GCTC-074/image-01.jpg"]`. Compress to ~1600px wide first. Cards show a neutral placeholder until you do.
- **Leadership:** `leadership.html` holds 10 role-based **placeholder** cards. Replace with real names/photos (`assets/leadership/`) and real links only.
- **Partners:** the list is generated from client names in the project records. Add logos to `assets/partners/` and swap the text tile for an `<img>` when you have permission to use them.

## Languages
20 languages with a searchable selector; Arabic switches the page to RTL and sets `lang`/`dir`. Only navigation, headings, form labels, service names and buttons are translated. Longer body text and project titles stay in English (the fallback) until translated.
1. Edit `locales/xx.json` (missing keys fall back to English).
2. Rebuild the bundle (needed so the site also works from `file://`):
   `node -e "const fs=require('fs');const o={};fs.readdirSync('locales').forEach(f=>o[f.slice(0,-5)]=JSON.parse(fs.readFileSync('locales/'+f)));fs.writeFileSync('js/locales.js','window.LOCALES='+JSON.stringify(o)+';')"`

**Please have a native speaker review the non-English files before launch**, especially technical terms. They were written by an AI assistant.
**SEO note:** translations switch in the browser, so all languages share one URL. For language-specific URLs and `hreflang` tags, generate one folder per language (`/so/`, `/ar/`, …) from the same templates.

## Contact form
No backend exists. Submitting opens the visitor's email app addressed to greenlandctcompany@gmail.com. To send directly, set the form's `action` to a service such as Formspree or Netlify Forms and remove the `submit` handler in `js/main.js`.

## Deploy
Upload the whole folder to any static host (Netlify, Cloudflare Pages, GitHub Pages, cPanel). Add a `sitemap.xml` with your domain after launch.

## Items to confirm
- **Start year:** the registration number says 2010, but the first project record is 2007. The site only says "project records 2007–2026".
- **"IMO"** (2014 record) is shown as **IOM**, and **"WVS"** as **World Vision**. Please confirm.
- **Mobile numbers** are shown as given; `tel:` links add +252.
- No WhatsApp, LinkedIn or other social accounts were supplied, so none are shown.
- Privacy Policy and Terms are short placeholders and need legal review.
- Project status is "Not stated in company records" except the 2,164 m² G+2 building (Ongoing).
- The emblem is 295 px wide; request a higher-resolution logo file.
