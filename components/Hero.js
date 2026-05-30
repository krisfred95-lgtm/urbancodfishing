'use client';

import { useLang } from '@/context/LangContext';
import siteData from '@/content/site.json';
import styles from './Hero.module.css';

export default function Hero() {
  const { lang } = useLang();
  const t = siteData.hero;

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.headline}>{t.headline[lang]}</h1>
        <p className={styles.subheadline}>{t.subheadline[lang]}</p>
        <div className={styles.ctas}>
          <a href="#contact" className={styles.ctaPrimary}>{t.cta.primary[lang]}</a>
          <a href="#tours" className={styles.ctaSecondary}>{t.cta.secondary[lang]}</a>
        </div>
        <div className={styles.stats}>
          {t.stats.map((stat, i) => (
            <div key={i} className={styles.stat}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label[lang]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}