# Refactor Case Gallery

[![Animated walkthrough of six before-and-after designs and their interactions](../../assets/case-studies/refactor-gallery/redesign-motion-preview.gif)](../../assets/case-studies/refactor-gallery/redesign-motion.mp4)

21-second real browser recording. Click the GIF for the full-resolution MP4 with playback controls; static screenshots are linked in the case study index.

[Watch the six-case browser recording](../../assets/case-studies/refactor-gallery/redesign-motion.mp4). It shows actual version changes and interactions, including product finish selection, issue inspection, focus writing, a mobile focus session, card disclosure, and channel selection.

This dependency-free browser example contains six comparisons: commerce, operations analytics, content editing, mobile daily planning, card components, and data charts. Use the controls or stable URLs such as `?case=cards&view=before` and `?case=charts&view=after`. All interface copy is English.

The first three task archetypes were researched from permissively licensed open-source projects:

- Commerce: [Spree Storefront](https://github.com/spree/storefront) (MIT, research snapshot `2ad6ad5bd1bc`)
- Analytics: [shadcn/ui `dashboard-01`](https://ui.shadcn.com/blocks) (MIT, research snapshot `3ba91b1cc83e`)
- Editor: [Puck](https://github.com/puckeditor/puck) (MIT, research snapshot `b0d5b49fa190`)
- Mobile planner: project-authored task flow originally planned using an Easy Wireframe template; no companion Skill is required to use this package
- Cards and charts: project-authored implementation comparisons with fixed fictional data

The upstream projects informed task structure only. Their applications, brands, media, and live data are not copied into this Skill. The HTML, CSS, JavaScript, fictional data, artwork, and screenshots in this directory are project-authored.

From the repository root, start a static server:

```sh
python -m http.server 18543 --bind 127.0.0.1 --directory skills/apple-design/examples/refactor-gallery
```

Then open <http://127.0.0.1:18543>. The gallery demonstrates variant selection, cart feedback, date ranges, issue inspection, autosave, preview and publish confirmation, a focus-restoring mobile task sheet, and a focus-session transition. State remains in the page and resets on reload; no purchase, publication, account, external service, or production data is involved.

Before is a competent local baseline, not a screenshot of an upstream product. After applies this Skill’s hierarchy, material, motion, state, keyboard, accessibility, and responsive rules. Screenshots prove only the visible browser state at the recorded viewport; they do not establish native-platform, screen-reader, or production validation.

Cards redesigns a cream catalog into a graphite workspace with featured cards, satin / matte surfaces, progress and contextual disclosure. Charts redesigns a report into an editorial canvas with a large total, green bars, keyboard selection and contextual insight. All six cases now change typography, material, layout and behavior while keeping core data. See the [redesign comparison contract](../../references/component-comparisons.md).
