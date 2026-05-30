'use client';
import { useLang } from '@/context/LangContext';
import styles from './Species.module.css';

export default function Species() {
  const { lang } = useLang();
  const species = [
    {
      name: 'Cod / Skrei',
      sub: lang === 'en' ? 'The king of our spots' : 'Der König unserer Plätze',
      notice: lang === 'en' ? 'Catch & Release' : 'Catch & Release',
      noticeType: 'release',
      text: lang === 'en'
        ? 'Harbor cod absorb heavy metals and contaminants from harbor sediment. We fish them purely for the fight.'
        : 'Hafenkoddern nehmen Schwermetalle und Schadstoffe aus dem Hafenbecken auf. Wir fischen sie nur wegen des Kampfs.'
    },
    {
      name: 'Kelp Cod',
      sub: lang === 'en' ? 'For the grill — coastal fish' : 'Für den Grill — Küstenfisch',
      notice: lang === 'en' ? 'For dinner' : 'Fürs Abendessen',
      noticeType: 'eat',
      text: lang === 'en'
        ? 'Outer reefs and kelp forests. Fresh shrimp diet, superior taste. Dark reddish color. This is your camping trip dinner.'
        : 'Aussenriffe und Kelp-Wälder. Frische Garnelen, überlegener Geschmack. Dunkel-rötliche Farbe. Das ist dein Campingtrip-Abendessen.'
    },
    {
      name: 'Coalfish (Saithe)',
      sub: lang === 'en' ? 'Hard-hitting mid-water predators' : 'Harte Mittelwasser-Räuber',
      notice: null
    },
    {
      name: 'Pollock',
      sub: lang === 'en' ? 'Hard-fighting predators at structures' : 'Kampfstarke Räuber an Strukturen',
      notice: null
    },
    {
      name: 'Mackerel',
      sub: lang === 'en' ? 'Seasonal — arrives in massive schools' : 'Saisonal — kommt in grossen Schwärmen',
      notice: null
    },
    {
      name: 'Halibut',
      sub: lang === 'en' ? 'The Final Boss' : 'Der Endboss',
      text: lang === 'en'
        ? 'Heavy current spots with heavy rigs (70–100 g). We fish where your chances are highest. No guarantees.'
        : 'Schwere Strömungsplätze mit schwerem Gerät (70–100 g). Wir fischen dort, wo deine Chancen am höchsten sind.',
      highlight: true
    },
  ];

  return (
    <section id="species" className={`${styles.species} section`}>
      <h2 className="section-title">{lang === 'en' ? 'What We Catch' : 'Was wir fangen'}</h2>
      <div className={styles.grid}>
        {species.map((s, i) => (
          <div key={i} className={`${styles.card} ${s.highlight ? styles.cardHighlight : ''} reveal`}>
            <h3 className={styles.name}>{s.name}</h3>
            <p className={styles.sub}>{s.sub}</p>
            {s.notice && (
              <span className={`${styles.notice} ${styles[s.noticeType]}`}>{s.notice}</span>
            )}
            {s.text && <p className={styles.text}>{s.text}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
