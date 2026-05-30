'use client';

import { useLang } from '@/context/LangContext';
import siteData from '@/content/site.json';
import styles from './Why.module.css';

export default function Why() {
  const { lang } = useLang();
  const t = siteData.why;

  return (
    <section id="why" className={`${styles.why} section`}>
      <h2 className="section-title">{t.title[lang]}</h2>
      <div className={styles.list}>
        {t.points.map((point, i) => (
          <div key={i} className={`${styles.item} reveal`}>
            <p className={styles.text}>{point.text[lang]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}