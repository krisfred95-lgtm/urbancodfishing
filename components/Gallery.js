'use client';

import styles from './Gallery.module.css';

export default function Gallery() {
  const boxes = [
    { id: 1, wide: true, label: 'Image 1' },
    { id: 2, wide: false, label: 'Image 2' },
    { id: 3, wide: false, label: 'Image 3' },
    { id: 4, wide: false, label: 'Image 4' },
    { id: 5, wide: true, label: 'Image 5' },
    { id: 6, wide: false, label: 'Image 6' },
  ];

  return (
    <section id="gallery" className={`${styles.gallery} section`}>
      <h2 className="section-title">Galleri</h2>
      <div className={styles.grid}>
        {boxes.map((box) => (
          <div
            key={box.id}
            className={`${styles.box} ${box.wide ? styles.boxWide : ''} reveal`}
          >
            {box.label}
          </div>
        ))}
      </div>
    </section>
  );
}