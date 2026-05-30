'use client';

import { useLang } from '@/context/LangContext';
import siteData from '@/content/site.json';
import styles from './Footer.module.css';

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>{siteData.footer.copyright[lang]}</p>
    </footer>
  );
}