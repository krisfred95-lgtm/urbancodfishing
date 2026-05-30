'use client';

import { useLang } from '@/context/LangContext';
import toursData from '@/content/tours.json';
import styles from './Tours.module.css';

export default function Tours() {
  const { lang } = useLang();

  return (
    <section id="tours" className={`${styles.tours} section`}>
      <h2 className="section-title">{lang === 'en' ? 'Choose Your Experience' : 'Wähle dein Erlebnis'}</h2>
      <div className={styles.grid}>
        {toursData.tours.map((tour) => (
          <div
            key={tour.id}
            className={`${styles.card} ${tour.popular ? styles.cardPopular : ''} reveal`}
          >
            {tour.image && (
              <div className={styles.cardImage} style={{ backgroundImage: `url(${tour.image})` }} />
            )}
            {tour.popular && <span className={styles.badge}>Popular</span>}
            <h3 className={styles.cardName}>{tour.name[lang]}</h3>
            <span className={styles.cardDuration}>{tour.duration[lang]}</span>
            <p className={styles.cardDescription}>{tour.description[lang]}</p>
            <div className={styles.cardFooter}>
              <div>
                <span className={styles.price}>
                  {tour.price === '0' ? (lang === 'en' ? 'On request' : 'Auf Anfrage') : tour.price}
                  <span className={styles.currency}>{tour.currency}</span>
                </span>
                <span className={styles.priceLabel}>{tour.priceLabel[lang]}</span>
              </div>
              <a href="#contact" className="ctaPrimary">
                {lang === 'en' ? 'Book' : 'Buchen'}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
