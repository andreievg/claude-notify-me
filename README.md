# News Tracker

An automated news tracker. A scheduled GitHub Action runs the
[Claude Code Action](https://github.com/anthropics/claude-code-action) **3× a day**, which
reads your prompt files, researches the web, summarizes what's new, and publishes a static
digest to **GitHub Pages** — a current page plus a browsable history of past runs.

You control *what's tracked* by editing markdown files. No code changes needed.

## How it works

```
prompts/base.md          ← how the tracker behaves (research rules, page format)
prompts/topics/*.md      ← WHAT to track: one file per topic (you edit these)
        │
        ▼  (3×/day, via .github/workflows/news-tracker.yml)
anthropics/claude-code-action  →  web research + summaries
        │
        ▼
docs/index.html          ← latest run (regenerated each run)
docs/<timestamp>.html    ← immutable snapshot of each past run
docs/history.html        ← links to every run
        │
        ▼
GitHub Pages              ← your public site
```

Each run: the current `index.html` is archived to a dated `docs/<timestamp>.html`, a fresh
`index.html` is written for the new run, and `history.html` is rebuilt to link them all.

## Add or change a tracked topic

1. Copy `prompts/topics/_TEMPLATE.md` to `prompts/topics/<your-topic>.md`.
2. Fill in the front-matter (`queries`, `lookback_days`, `max_items`, …), what to track,
   summarization criteria, and the severity rubric. See `prompts/topics/example-ai-regulation.md`.
3. Commit & push. The next run picks it up automatically.

Remove a topic by deleting its file. **Disable** one without deleting it by prefixing its
filename with `_` (underscore) — e.g. `_old-topic.md`. Any topic file starting with `_` is
ignored (that's also why `_TEMPLATE.md` is skipped).

## One-time setup

1. **Push to GitHub:** create a repo and push this directory.
2. **Add the auth secret:** Settings → Secrets and variables → Actions → New repository
   secret → `CLAUDE_CODE_OAUTH_TOKEN`. Generate the value locally with `claude setup-token`.
   *(To use a pay-as-you-go API key instead, set `ANTHROPIC_API_KEY` and switch the
   matching line in `.github/workflows/news-tracker.yml`.)*
3. **Enable Pages:** Settings → Pages → Source = **Deploy from a branch** → Branch =
   your default branch, Folder = **`/docs`**. (This is deliberately *not* the "GitHub
   Actions" source — see note below.)
4. **First run:** Actions → **news-tracker** → **Run workflow**. Then open your Pages URL.

## Schedule

Defined in `.github/workflows/news-tracker.yml`:

```
cron: "0 19,1,7 * * *"   # UTC — ~07:00 / 13:00 / 19:00 NZ
```

Cron is **UTC**; edit that line to change the times or cadence. `workflow_dispatch` lets
you run it manually any time.

## Notes

- **Pages source must be "Deploy from a branch".** The Action commits with the built-in
  `GITHUB_TOKEN`, and such commits can't trigger another workflow — so a "GitHub Actions"
  Pages source would never rebuild. Branch-folder Pages republishes on any `/docs` change.
- **Cost/safety** is bounded by `--max-turns`, the job `timeout-minutes`, a `concurrency`
  group (no overlapping runs), and per-topic `max_items` / `lookback_days` caps.
- **Roadmap:** severity is already assigned per item (display-only). A future version will
  add a `notify` job that fires alerts based on severity.

## Layout

| Path | Purpose |
|------|---------|
| `.github/workflows/news-tracker.yml` | Schedule + the Action invocation |
| `prompts/base.md` | Tracker behavior + page/rotation rules |
| `prompts/topics/` | One file per tracked topic (+ `_TEMPLATE.md`) |
| `docs/` | The published GitHub Pages site |
| `CLAUDE.md` | Conventions auto-loaded during a run |
