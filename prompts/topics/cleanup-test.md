---
# Machine-readable config (kept in sync with how base.md researches a topic).
id: cleanup-test              # short kebab-case id, unique across topic files
title: "Cleanup Verification" # shown as the section heading on the page
lookback_days: 3              # ignore items older than this many days
max_items: 8                  # cap on items shown for this topic per run
queries:                      # web searches to run for this topic
  - "test query one"
  - "test query two"
---

## What to track
Throwaway topic to verify the PR preview + cleanup cycle. Will be closed without merging.

## Summarization criteria
- Lead with the concrete action (who did what, when).
- Prefer official/primary sources over commentary.
- Keep each item to one sentence.

## Severity rubric
How to assign each item's severity. (Display-only today; used for notifications later.)
- **critical** — immediate, broad, binding impact.
- **high** — significant, likely-impactful development.
- **medium** — notable but limited / not-yet-binding.
- **low** — minor, routine, or commentary.
