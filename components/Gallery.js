'use client';

import { useState } from 'react';
import styles from './Gallery.module.css';

const allImages = [
  '/images/IMG_5202.PNG',
  '/images/IMG_4826.PNG',
  '/images/53E72EFD-EBC0-48A3-A766-225A14C59D5B.PNG',
  '/images/14854E01-1ED0-44E5-8934-1EA16F345075.PNG',
  '/images/46046287-A4CF-498D-902F-DE488CF7C92A.PNG',
  '/images/78B67867-F3D8-41B6-A0A8-8F279585EF15.PNG',
  '/images/2F88F52B-E93E-4DF9-B3B9-9FC7760121B3.PNG',
  '/images/CC10E8CA-458F-4556-8FFB-71035F6E9498.PNG',
  '/images/42CB1AC9-BBE4-4862-BA93-2631CA349E0E.PNG',
  '/images/AEE8F1D3-8E2E-495A-A107-F0BC3D924489.PNG',
];

const gridImages = [
  { src: allImages[0], wide: true },
  { src: allImages[1], wide: false },
  { src: allImages[2], wide: false },
  { src: allImages[3], wide: false },
  { src: allImages[4], wide: true },
  { src: allImages[5], wide: false },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="gallery" className={`${styles.gallery} section`}>
      <h2 className="section-title">Galleri</h2>
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
        View All Photos
      </button>

      {lightbox !== null && (
        <div className={styles.lightbox} onClick={() => setLightbox(null)}>
          <button className={styles.close} onClick={() => setLightbox(null)}>×</button>
          <button
            className={`${styles.nav} ${styles.prev}`}
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + allImages.length) % allImages.length); }}
          >
            ‹
          </button>
          <img
            src={allImages[lightbox]}
            alt={`Gallery ${lightbox + 1}`}
            className={styles.lightboxImg}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className={`${styles.nav} ${styles.next}`}
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % allImages.length); }}
          >
            ›
          </button>
          <div className={styles.counter}>{lightbox + 1} / {allImages.length}</div>
        </div>
      )}
    </section>
  );
}