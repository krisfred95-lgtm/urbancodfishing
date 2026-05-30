'use client';

import { useLang } from '@/context/LangContext';
import siteData from '@/content/site.json';
import styles from './Contact.module.css';

export default function Contact() {
  const { lang } = useLang();
  const t = siteData.contact;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    const subject = encodeURIComponent(lang === 'no' ? 'Hannes Fishing henvendelse' : 'Hannes Fishing inquiry');
    const body = encodeURIComponent(`Navn: ${name}\nE-post: ${email}\n\nMelding:\n${message}`);
    window.location.href = `mailto:${t.info.emailValue}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className={`${styles.contact} section`}>
      <h2 className="section-title">{t.title[lang]}</h2>
      <div className={styles.grid}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            className={styles.input}
            placeholder={t.formLabels.name[lang]}
            required
          />
          <input
            type="email"
            name="email"
            className={styles.input}
            placeholder={t.formLabels.email[lang]}
            required
          />
          <textarea
            name="message"
            className={styles.textarea}
            placeholder={t.formLabels.message[lang]}
            required
          />
          <button type="submit" className={styles.submit}>
            {t.formLabels.submit[lang]}
          </button>
        </form>
        <div className={styles.info}>
          <h3 className={styles.infoTitle}>{t.info.title[lang]}</h3>
          <div className={styles.infoItem}>
            <p className={styles.infoLabel}>{t.info.email[lang]}</p>
            <p className={styles.infoValue}>
              <a href={`mailto:${t.info.emailValue}`}>{t.info.emailValue}</a>
            </p>
          </div>
          <div className={styles.infoItem}>
            <p className={styles.infoLabel}>{t.info.location[lang]}</p>
            <p className={styles.infoValue}>{t.info.locationValue[lang]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}