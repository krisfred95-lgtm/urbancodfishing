'use client';
import { useState } from 'react';
import styles from './Gallery.module.css';

const allImages = [
  '/images/fishing-1.png',
  '/images/fishing-2.png',
  '/images/fishing-3.png',
  '/images/fishing-4.png',
  '/images/fishing-5.png',
  '/images/fishing-6.png',
  '/images/fishing-7.png',
  '/images/harbor-4panel.png',
  '/images/guide-ucf-jacket.png',
  '/images/guide-hoodie.png',
  '/images/promo-collage.jpg',
  '/images/hero.jpg',
];

const gridImages = [
  { src: allImages[0], wide: true },
  { src: allImages[7], wide: false },
  { src: allImages[8], wide: false },
  { src: allImages[9], wide: false },
  { src: allImages[4], wide: true },
  { src: allImages[11], wide: false },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="gallery" className={`${styles.gallery} section`}>
      <h2 className="section-title">{lang === 'en' ? 'Gallery' : 'Galerie'}</h2>
      <div className={styles.grid}>
        {gridImages.map((img, i) => (
          <div
            key={i}
            className={`${styles.box} ${img.wide ? styles.boxWide : ''} reveal`}
            onClick={() => setLightbox(i)}
          >
            <img src={img.src} alt={`Gallery ${i + 1}`} className={styles.img} />
          </div>
        ))}
      </div>
      <button className={styles.viewAll} onClick={() => setLightbox(0)}>
        {lang === 'en' ? 'View All Photos' : 'Alle Fotos ansehen'}
      </button>
      {lightbox !== null && (
        <div className={styles.lightbox} onClick={() => setLightbox(null)}>
          <button className={styles.close} onClick={() => setLightbox(null)}>x</button>
          <button
            className={`${styles.nav} ${styles.prev}`}
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + allImages.length) % allImages.length); }}
          >-</button>
          <img src={allImages[lightbox]} alt="" className={styles.lightboxImg} />
          <button
            className={`${styles.nav} ${styles.next}`}
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % allImages.length); }}
          >+</button>
        </div>
      )}
    </section>
  );
}
