'use client';
import { useLang } from '@/context/LangContext';
import styles from './Philosophy.module.css';

export default function Philosophy() {
  const { lang } = useLang();

  return (
    <section className={`${styles.philosophy} section`}>
      <h2 className="section-title">{lang === 'en' ? 'What We Offer' : 'Was wir bieten'}</h2>
      <div className={styles.grid}>
        <div className={`${styles.card} reveal`}>
          <span className={styles.icon}>🎣</span>
          <h3>{lang === 'en' ? 'The Ultimate Adrenaline Rush' : 'Den ultimativen Adrenalin-Kick'}</h3>
          <p>{lang === 'en'
            ? 'Head-to-head on light gear against a 20 kg cod in heavy fjord currents. Reel screaming. Holding the fish of your life in your hands - right in the middle of the harbor.'
            : 'Leichtes Geraet gegen einen 20-kg-Dorsch in schwerer Fjordstroemung. Rolle schreit. Den Fisch deines Lebens in den Haenden halten - mitten im Hafen.'}</p>
        </div>
        <div className={`${styles.card} reveal`}>
          <span className={styles.icon}>🍺</span>
          <h3>{lang === 'en' ? 'The Perfect Escape' : 'Den perfekten Ausgleich'}</h3>
          <p>{lang === 'en'
            ? 'A relaxed night out with the guys. Cold beer, good conversations, midnight sun on the horizon. We meet you exactly where you are at.'
            : 'Entspannte Nacht mit Freunden. Kaltes Bier, gute Gespraeche, Mitternachtssonne am Horizont. Wir treffen dich genau dort, wo du stehst.'}</p>
        </div>
        <div className={`${styles.card} reveal`}>
          <span className={styles.icon}>📚</span>
          <h3>{lang === 'en' ? 'Knowledge for Life' : 'Wissen fuers Leben'}</h3>
          <p>{lang === 'en'
            ? 'You buy more than a fish - you buy a skillset for life. I show you how to read Google Maps, nautical charts, and currents. After 4 hours, you will catch your own dinner on your camping trip.'
            : 'Du kaufst nicht nur einen Fisch - du kaufst ein Skillset fuers Leben. Ich zeige dir, wie du Karten und Stroemungen liest. Nach 4 Stunden kannst du eigenstaendig Fuers Abendessen fangen.'}</p>
        </div>
      </div>
    </section>
  );
}
