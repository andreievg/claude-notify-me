// Live "hours till next run" indicator. The page is static, so we compute this in the
// browser whenever it's viewed (it stays accurate regardless of when the page loads).
//
// Scheduled run hours in UTC — KEEP IN SYNC with the cron in
// .github/workflows/news-tracker.yml ("0 19,1,7 * * *").
const RUN_HOURS_UTC = [1, 7, 19];

function nextRun(now) {
  for (let d = 0; d < 3; d++) {
    for (const h of RUN_HOURS_UTC) {
      const t = new Date(Date.UTC(
        now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + d, h, 0, 0
      ));
      if (t > now) return t;
    }
  }
}

function fmtNZ(d) {
  return d.toLocaleString('en-NZ', {
    timeZone: 'Pacific/Auckland',
    weekday: 'short', day: 'numeric', month: 'short',
    hour: '2-digit', minute: '2-digit',
  });
}

function render() {
  const el = document.getElementById('next-run');
  if (!el) return;
  const now = new Date();
  const nr = nextRun(now);
  const mins = Math.max(0, Math.round((nr - now) / 60000));
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  el.textContent = `⏱ Next update in ${h}h ${m}m · ${fmtNZ(nr)} NZ`;
  el.title = `Updates 3×/day. Next: ${fmtNZ(nr)} New Zealand time`;
}

render();
setInterval(render, 60000);
