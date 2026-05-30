'use client';

import { useState } from 'react';
import { useLang } from '@/context/LangContext';
import siteData from '@/content/site.json';
import styles from './FAQ.module.css';

export default function FAQ() {
  const { lang } = useLang();
  const [openIndex, setOpenIndex] = useState(null);
  const t = siteData.faq;

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className={`${styles.faq} section`}>
      <h2 className="section-title">{t.title[lang]}</h2>
      <div className={styles.accordion}>
        {t.items.map((item, i) => (
          <div key={i} className={`${styles.item} reveal`}>
            <button className={styles.question} onClick={() => toggle(i)}>
              <span>{item.question[lang]}</span>
              <span className={`${styles.icon} ${openIndex === i ? styles.iconOpen : ''}`}>+</span>
            </button>
            <div className={`${styles.answer} ${openIndex === i ? styles.answerOpen : ''}`}>
              <p className={styles.answerText}>{item.answer[lang]}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}