---
# Machine-readable config (kept in sync with how base.md researches a topic).
id: my-topic                 # short kebab-case id, unique across topic files
title: "My Topic Title"      # shown as the section heading on the page
lookback_days: 3             # ignore items older than this many days
max_items: 8                 # cap on items shown for this topic per run
queries:                     # web searches to run for this topic
  - "search phrase one"
  - "search phrase two"
sources_prefer:              # optional: domains/sources to favor
  - reuters.com
  - apnews.com
---

## What to track
Describe, in plain language, exactly what counts as relevant news for this topic and what
does not. The more specific, the better the results.

## Summarization criteria
Any extra rules on top of base.md's defaults. For example:
- Lead with the concrete action (who did what, when).
- Prefer official/primary sources over commentary.
- Keep each item to one sentence.

## Severity rubric
How to assign each item's severity. (Display-only today; used for notifications later.)
- **critical** — <define: immediate, broad, binding impact>.
- **high** — <define: significant, likely-impactful development>.
- **medium** — <define: notable but limited / not-yet-binding>.
- **low** — <define: minor, routine, or commentary>.

<!--
HOW TO ADD A TOPIC:
1. Copy this file to prompts/topics/<your-topic>.md (any name except _TEMPLATE.md).
2. Fill in the front-matter and the three sections above.
3. Commit & push. The next scheduled run (or a manual "Run workflow") will pick it up —
   no workflow changes needed.
-->
