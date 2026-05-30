'use client';
import { useLang } from '@/context/LangContext';
import styles from './Territory.module.css';

export default function Territory() {
  const { lang } = useLang();
  const spots = [
    {
      name: 'Tromsoysundet and Bridges',
      location: 'Tromsobrua / Sandnessundbrua',
      text: lang === 'en'
        ? 'A gigantic natural funnel. Tide forces massive water volumes through, creating extreme eddies and current seams. Depths of 20 to over 35 meters within casting distance. Prime hotspot for big coalfish and halibut.'
        : 'Ein gigantischer natuerlicher Trichter. Die Tide zwingt gewaltige Wassermengen durch und erzeugt extreme Wirbel und Stromungskanten. Tiefen von 20 bis ueber 35 Metern in Wurfweite.',
      image: '/images/harbor-4panel.png'
    },
    {
      name: 'Prostneset / Tromso Havn',
      location: 'Harbor Basins and Sheet Piling',
      text: lang === 'en'
        ? 'Artificially dredged for cruise ships. Water drops 15 to 25 meters right at our feet. Perfect for vertical sight-fishing and precision jigging during the sinking phase.'
        : 'Kuenstlich ausgebaggert fuer Kreuzschiffe. Das Wasser faellt 15 bis 25 Meter direkt vor unseren Fuessen ab.',
      image: '/images/guide-ucf-jacket.png'
    },
    {
      name: 'Rystraumen (Hella)',
      location: 'Slightly outside the city',
      text: lang === 'en'
        ? 'A wild, oxygen-rich tidal current with brutal flows. This is where you catch immaculate kelp cod destined for the dinner table.'
        : 'Ein wilder, sauerstoffreicher Gezeitenstrom mit brutalen Stroemungen. Hier faengst du makellosen Kelp-Kabeljau fuer den Abendbrottisch.',
      image: '/images/fishing-5.png'
    },
  ];

  return (
    <section id="territory" className={`${styles.territory} section`}>
      <h2 className="section-title">{lang === 'en' ? 'Our Territory' : 'Unser Revier'}</h2>
      <div className={styles.grid}>
        {spots.map((spot, i) => (
          <div key={i} className={`${styles.card} reveal`}>
            <div className={styles.image} style={{ backgroundImage: `url(${spot.image})` }} />
            <div className={styles.content}>
              <h3 className={styles.name}>{spot.name}</h3>
              <p className={styles.location}>{spot.location}</p>
              <p className={styles.text}>{spot.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
