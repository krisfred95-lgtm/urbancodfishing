'use client';

import { useState } from 'react';
import { useLang } from '@/context/LangContext';
import toursData from '@/content/tours.json';
import siteData from '@/content/site.json';
import styles from './Tours.module.css';

export default function Tours() {
  const { lang } = useLang();
  const [selected, setSelected] = useState(null);
  const included = (siteData.included && siteData.included.items) || [];

  const priceText = (tour) =>
    tour.price === '0' ? (lang === 'en' ? 'On request' : 'Auf Anfrage') : tour.price;

  return (
    <section id="tours" className={`${styles.tours} section`}>
      <h2 className="section-title">{lang === 'en' ? 'Choose Your Experience' : 'Wähle dein Erlebnis'}</h2>
      <div className={styles.grid}>
        {toursData.tours.map((tour) => (
          <div
            key={tour.id}
            className={`${styles.card} ${tour.popular ? styles.cardPopular : ''} reveal`}
            onClick={() => setSelected(tour)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') setSelected(tour); }}
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
                  {priceText(tour)}
                  <span className={styles.currency}>{tour.currency}</span>
                </span>
                <span className={styles.priceLabel}>{tour.priceLabel[lang]}</span>
              </div>
              <span className={styles.details}>
                {lang === 'en' ? 'View details →' : 'Mehr ansehen →'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className={styles.modal} onClick={() => setSelected(null)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setSelected(null)} aria-label="Close">×</button>
            {selected.image && (
              <div className={styles.modalImage} style={{ backgroundImage: `url(${selected.image})` }}>
                {selected.popular && <span className={styles.badge}>Popular</span>}
              </div>
            )}
            <div className={styles.modalBody}>
              <h3 className={styles.modalName}>{selected.name[lang]}</h3>
              <span className={styles.cardDuration}>{selected.duration[lang]}</span>
              <p className={styles.modalDesc}>{selected.description[lang]}</p>

              {included.length > 0 && (
                <div className={styles.included}>
                  <h4 className={styles.includedTitle}>
                    {lang === 'en' ? "What's included" : 'Inklusive'}
                  </h4>
                  <ul className={styles.includedList}>
                    {included.map((it, i) => (
                      <li key={i}><span>{it.icon}</span>{it.label[lang]}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className={styles.modalFooter}>
                <div>
                  <span className={styles.price}>
                    {priceText(selected)}
                    <span className={styles.currency}>{selected.currency}</span>
                  </span>
                  <span className={styles.priceLabel}>{selected.priceLabel[lang]}</span>
                </div>
                <a href="#contact" className="ctaPrimary" onClick={() => setSelected(null)}>
                  {lang === 'en' ? 'Book this trip' : 'Diese Tour buchen'}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
