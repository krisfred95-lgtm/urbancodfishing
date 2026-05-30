'use client';

import { useLang } from '@/context/LangContext';
import siteData from '@/content/site.json';
import styles from './Included.module.css';

export default function Included() {
  const { lang } = useLang();
  const t = siteData.included;

  return (
    <section id="included" className={`${styles.included} section`}>
      <h2 className="section-title">{t.title[lang]}</h2>
      <div className={styles.grid}>
        {t.items.map((item, i) => (
          <div key={i} className={`${styles.item} reveal`}>
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label[lang]}</span>
          </div>
        ))}
      </div>
    </section>
  );
}