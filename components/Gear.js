'use client';
import { useLang } from '@/context/LangContext';
import styles from './Gear.module.css';

export default function Gear() {
  const { lang } = useLang();

  return (
    <section id="gear" className={`${styles.gear} section`}>
      <h2 className="section-title">{lang === 'en' ? 'Premium Gear' : 'Premium Ausruestung'}</h2>
      <p className={styles.intro}>
        {lang === 'en'
          ? 'No cheap tourist plastic. Real high-end tools in the 300 EUR class. Red rod, red reel - aesthetics matter.'
          : 'Kein billiges Tourist-Plastik. Echte Hochwertigkeits-Werkzeuge in der 300 EUR-Klasse. Rote Rute, rote Rolle - Aesthetik ist mir wichtig.'}
      </p>
      <div className={styles.grid}>
        <div className={`${styles.card} reveal`}>
          <h3>{lang === 'en' ? '"Easy Action"' : '"Easy Action"'}</h3>
          <p className={styles.sub}>{lang === 'en' ? 'For endurance' : 'Fuer Ausdauer'}</p>
          <p className={styles.desc}>
            {lang === 'en'
              ? 'Rod: Daiwa Laguna / Crossfire (2.40-2.70 m | 20-60 g) or guide pick 3.60-3.66 m (30-60 g) for maximum leverage. Reel: Daiwa Ninja 4000 - light, balanced, fatigue-free.'
              : 'Rute: Daiwa Laguna / Crossfire (2.40-2.70 m | 20-60 g) oder Guide-Pick 3.60-3.66 m (30-60 g). Rolle: Daiwa Ninja 4000.'}
          </p>
        </div>
        <div className={`${styles.card} reveal`}>
          <h3>{lang === 'en' ? '"Heavy Distance"' : '"Heavy Distance"'}</h3>
          <p className={styles.sub}>{lang === 'en' ? 'For headwinds and extreme currents' : 'Fuer Gegenwind und extreme Stroemungen'}</p>
          <p className={styles.desc}>
            {lang === 'en'
              ? 'Rod: Daiwa Ninja X / BG Beach-Spin (3.66 m | 80-120 g). Range: 100-120 m casts to 30 m depth. Reel: Penn Spinfisher 5000 - serious drag.'
              : 'Rute: Daiwa Ninja X / BG Beach-Spin (3.66 m | 80-120 g). Reichweite: 100-120 m. Rolle: Penn Spinfisher 5000.'}
          </p>
        </div>
        <div className={`${styles.card} reveal`}>
          <h3>{lang === 'en' ? 'Bring Your Own?' : 'Eigenes Geraet?'}</h3>
          <p className={styles.sub}>OK</p>
          <p className={styles.desc}>
            {lang === 'en'
              ? 'Mainline: Braided 0.16-0.28 mm, min. 12-15 kg. Leader: Fluorocarbon or Hard-Mono, 0.50-0.60 mm / 30-40 lbs, approx. 1 m.'
              : 'Hauptschnur: Geflochten 0.16-0.28 mm, min. 12-15 kg. Vorfach: Fluorocarbon oder Hard-Mono, 0.50-0.60 mm.'}
          </p>
        </div>
      </div>
      <div className={styles.note}>
        <strong>{lang === 'en' ? 'Maintenance and hooks' : 'Pflege und Haken'}</strong><br/>
        {lang === 'en'
          ? 'I take care of my gear but do not wrap it in cotton wool. After every fight, I check hook sharpness by sound when unhooking. If anything is not 100% - sharpened instantly.'
          : 'Ich pflege mein Geraet, aber ich wickle es nicht in Watte. Nach jedem Kampf pruefe ich die Haken-Schaerfe. Wenn etwas nicht 100% ist - sofort geschaerft.'}
      </div>
    </section>
  );
}
