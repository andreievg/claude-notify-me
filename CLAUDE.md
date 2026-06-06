# CLAUDE.md — conventions for the scheduled news-tracker run

This repo publishes a static news digest to GitHub Pages on a schedule. When you run here
via the GitHub Action, follow these rules (the full behavioral spec is `prompts/base.md`).

## What you do each run
1. Read `prompts/base.md` and all `prompts/topics/*.md` except files starting with `_`
   (e.g. `_TEMPLATE.md` and any disabled topics).
2. Archive the current `docs/index.html` to `docs/<its run-ts>.html` (skip if `run-ts: SEED`).
3. Research each topic with `WebSearch` / `WebFetch`; summarize per its criteria + severity.
4. Write a fresh `docs/index.html` for the current `RUN_TS`.
5. Rewrite `docs/history.html` to link every run.

## Page contract
- Reuse the existing design — same structure and CSS classes in `docs/assets/styles.css`
  (`.site-header`, `.topic`, `.item`, `.pill.{low,medium,high,critical}`, `.history-list`,
  `.site-footer`). Fill in content; **don't redesign each run.**
- The current page must start with `<!-- run-ts: {{RUN_TS}} -->` and show a visible
  "Last updated {{RUN_TS}}". Every page links to `history.html`.

## Do / don't
- **Only** edit files under `docs/`. Never touch `.github/**` (protected) or `prompts/**`.
- Never invent news. If a topic has nothing, show its section with "No notable updates this run."
- Always emit valid, complete HTML even if some topics fail.

## Severity
`critical` / `high` / `medium` / `low`, assigned from each topic's rubric. Display-only for
now (a future version adds severity-based notifications).
