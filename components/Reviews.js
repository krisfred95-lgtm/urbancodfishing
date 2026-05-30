'use client';

import { useLang } from '@/context/LangContext';
import siteData from '@/content/site.json';
import styles from './Reviews.module.css';

export default function Reviews() {
  const { lang } = useLang();
  const t = siteData.reviews;

  return (
    <section id="reviews" className={`${styles.reviews} section`}>
      <h2 className="section-title">{t.title[lang]}</h2>
      <div className={styles.grid}>
        {t.items.map((review, i) => (
          <div key={i} className={`${styles.card} reveal`}>
            <h4 className={styles.name}>{review.name[lang]}</h4>
            <p className={styles.text}>"{review.text[lang]}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}