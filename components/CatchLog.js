import catchData from '@/content/catches.json';
import styles from './CatchLog.module.css';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function monthLabel(key) {
  const [y, m] = key.split('-');
  return `${MONTH_NAMES[parseInt(m, 10) - 1]} ${y}`;
}

function summarise(list) {
  const fish = list.filter((c) => c.hasFish);
  const bySpecies = {};
  let weight = 0;
  let biggest = null;
  for (const c of fish) {
    bySpecies[c.species] = (bySpecies[c.species] || 0) + 1;
    weight += c.estWeightKg || 0;
    if (!biggest || (c.estLengthCm || 0) > (biggest.estLengthCm || 0)) biggest = c;
  }
  return {
    photos: list.length,
    fish: fish.length,
    good: fish.filter((c) => c.goodCatch).length,
    weight: Math.round(weight * 10) / 10,
    bySpecies,
    biggest,
  };
}

function speciesText(bySpecies) {
  const entries = Object.entries(bySpecies);
  if (!entries.length) return '—';
  return entries.sort((a, b) => b[1] - a[1]).map(([sp, n]) => `${n}× ${sp}`).join(', ');
}

export default function CatchLog() {
  const all = catchData.catches;

  // group by YYYY-MM, newest first
  const months = {};
  for (const c of all) {
    const k = (c.dateTaken || '').slice(0, 7);
    if (!k) continue;
    (months[k] = months[k] || []).push(c);
  }
  const keys = Object.keys(months).sort().reverse();
  const allTime = summarise(all);

  return (
    <section id="catchlog" className={`${styles.wrap} section`}>
      <h2 className="section-title">Monthly Catch Log</h2>

      {/* At-a-glance totals across everything tracked so far */}
      <div className={styles.totals}>
        <div className={styles.total}>
          <span className={styles.totalN}>{allTime.fish}</span>
          <span className={styles.totalLabel}>fish caught</span>
        </div>
        <div className={styles.total}>
          <span className={styles.totalN}>{allTime.good}</span>
          <span className={styles.totalLabel}>good catches</span>
        </div>
        <div className={styles.total}>
          <span className={styles.totalN}>~{allTime.weight} kg</span>
          <span className={styles.totalLabel}>est. total weight</span>
        </div>
        <div className={styles.total}>
          <span className={styles.totalN}>{keys.length}</span>
          <span className={styles.totalLabel}>months tracked</span>
        </div>
      </div>

      {/* One clean row per month */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Month</th>
              <th>Fish</th>
              <th>Good</th>
              <th>Est. weight</th>
              <th>Species</th>
              <th>Biggest</th>
            </tr>
          </thead>
          <tbody>
            {keys.map((k) => {
              const s = summarise(months[k]);
              return (
                <tr key={k} className="reveal">
                  <td className={styles.month}>{monthLabel(k)}</td>
                  <td className={styles.num}>{s.fish}</td>
                  <td className={styles.num}>
                    {s.good > 0 ? <span className={styles.goodPill}>{s.good}</span> : '0'}
                  </td>
                  <td className={styles.num}>~{s.weight} kg</td>
                  <td className={styles.species}>{speciesText(s.bySpecies)}</td>
                  <td className={styles.biggest}>
                    {s.biggest ? `${s.biggest.species} · ~${s.biggest.estLengthCm} cm` : '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className={styles.foot}>
        Updated {catchData.updated}. Size &amp; weight are AI estimates from the photos.
      </p>
    </section>
  );
}
