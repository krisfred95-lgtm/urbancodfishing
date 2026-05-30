'use client';

import { useLang } from '@/context/LangContext';
import siteData from '@/content/site.json';
import styles from './Nav.module.css';

export default function Nav() {
  const { lang, toggleLang } = useLang();
  const t = siteData.nav;

  return (
    <nav className={styles.nav}>
      <a href="#" className={styles.logo}>{t.logo}</a>
      <ul className={styles.links}>
        {t.links.map((link, i) => (
          <li key={i}>
            <a href={link.href}>{link.label[lang]}</a>
          </li>
        ))}
      </ul>
      <div className={styles.actions}>
        <button
          className={`${styles.langBtn} ${lang === 'en' ? styles.active : ''}`}
          onClick={() => toggleLang('en')}
        >
          EN
        </button>
        <button
          className={`${styles.langBtn} ${lang === 'de' ? styles.active : ''}`}
          onClick={() => toggleLang('de')}
        >
          DE
        </button>
      </div>
    </nav>
  );
}