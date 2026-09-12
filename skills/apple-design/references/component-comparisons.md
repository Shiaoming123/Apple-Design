# Redesign comparison contract

These project-authored browser cases apply the Skill's [visual foundations](hig-foundations.md) and [component contracts](component-contracts.md). They are not Apple official designs or unmodified screenshots of upstream products.

## What the comparison must prove

A full redesign must show a coherent change in typography, material, composition, interaction, and visual identity. Changing a chart type or a grid into a list alone does not fulfill a redesign request. Keep core objects, values, and user goals comparable; never make the baseline unreadable or remove its useful functionality to manufacture a win.

Use the [runnable gallery](../examples/refactor-gallery/README.md). Every case uses English interface copy. Before is an authored baseline with its own visual system. After is a working redesign. The original gallery revision was archived locally before this iteration; those historical files are not required to run this package.

| Case | Before | After | Interaction difference |
| --- | --- | --- | --- |
| Commerce | Conventional store navigation, rectangular actions, flat product illustration | Large product typography, warm silver stage, dimensional finish, monochrome purchase action | Finish selection updates the product illustration; purchase feedback stays beside the action |
| Operations | Dark admin sidebar, separate metric boxes, neutral bars | Compact neutral navigation, a continuous metric surface, a dark green trend panel | Selecting an issue exposes contextual details in the same panel |
| Editor | Administrative fields and publishing form | Warm paper canvas, serif document typography, compact floating-style toolbar | Focus view removes supporting columns while preserving the draft and exit control |
| Mobile | Standard centered task form | Lavender daily context, graphite day summary, warm task sheet | Sheet transition leads to a real local countdown with pause, resume, and exit |
| Cards | Cream catalog, serif headings, equal-weight rectangular cards | Graphite workspace, restrained sans-serif type, satin surfaces, featured/supporting layout | Progress is visible; opening a disclosure closes its sibling; Satin / Matte changes the surface |
| Charts | Industrial report layout, tabular typography, bordered table and ring | Spacious editorial hierarchy, large total, green bars inside one elevated white surface | Click or keyboard-select a channel for contextual insight; changing measures preserves exact values |

## Data and scope

Cards contain the same three projects, team names, statuses, and completed task counts: 12/16, 8/20, and 3/12. The featured layout emphasizes the first project without changing those values. Card actions stay separate from the content container. Native disclosures remain keyboard-operable.

Both chart views use the same fictional acquisition dataset. Revenue (USD): Direct 48,000, Organic 32,000, Referral 20,000. Orders: 180, 240, 180. Shares use the selected measure's total. Bars start at zero and use a fixed 0–100% scale. The adjacent semantic table exposes exact values without hover or color recognition. Selecting a bar adds context without altering the dataset.

A ring remains useful for composition; bars improve comparison of nearby values. A featured card layout takes more space than a dense operational list. These trade-offs remain valid even when a redesign is visually stronger for the selected scenario.

## Material and motion

Opaque content surfaces preserve text contrast. Translucency is limited to functional chrome and sheets; the card study uses gradients and highlights without background blur. Shadows, highlights, type, and spacing must work together instead of relying on a large blur value.

Hover lift, disclosure feedback, chart reveal, product orientation, and mobile sheet transitions have specific triggers. Reduced motion suppresses them while retaining state feedback. Forced colors preserves controls and exact chart values. The native timer uses elapsed time rather than counting interval callbacks.

## Evidence

Capture each pair with identical browser, width, dataset, and initial state. Normalize the pair's minimum height, and hide the gallery's sticky navigation only during screenshot capture so it cannot cover the prototype. Save the capture dimensions and file hashes. The mobile pair shows task details open in both versions.

Run `npm run test:gallery` from the repository root. It verifies the six cases, local interaction changes, chart values, keyboard disclosures, editor draft preservation, mobile timer pause, responsive layout, and reduced motion. Set `RECORD_DEMO=1` to also record real browser transitions to `artifacts/redesign-motion.webm`; this optional recording uses the same installed browser and Playwright dependency.

Browser screenshots and recordings establish browser behavior only. They do not establish native-device, screen-reader, backend, real purchasing, or real publishing support. Other agent hosts can read this contract and run the same static examples without a Codex-specific tool.
