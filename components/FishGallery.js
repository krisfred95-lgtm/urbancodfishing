'use client';

import { useState, useMemo } from 'react';
import catchData from '@/content/catches.json';
import styles from './FishGallery.module.css';

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'fish', label: 'Fish' },
  { key: 'urban-cod-fishing', label: 'Urban Cod Fishing' },
  { key: 'camping', label: 'Camping' },
  { key: 'family-crab-fishing', label: 'Family Crab Fishing' },
  { key: 'polar-night-midnight-sun', label: 'Polar Night / Midnight Sun' },
  { key: 'other', label: 'Other' },
];

function Lightbox({ items, index, setIndex }) {
  const c = items[index];
  const go = (d) => setIndex((index + d + items.length) % items.length);
  return (
    <div className={styles.lightbox} onClick={() => setIndex(null)}>
      <button className={styles.close} onClick={() => setIndex(null)}>×</button>
      <button className={`${styles.nav} ${styles.prev}`} onClick={(e) => { e.stopPropagation(); go(-1); }}>‹</button>
      <figure className={styles.figure} onClick={(e) => e.stopPropagation()}>
        <img src={c.image} alt={c.title} className={styles.lightboxImg} />
        <figcaption className={styles.figcap}>
          {c.goodCatch && <span className={styles.badge}>★ Good catch</span>}
          <strong>{c.title}</strong>
          {c.hasFish ? (
            <span>{c.species} (confidence: {c.speciesConfidence}) · ~{c.estLengthCm} cm · ~{c.estWeightKg} kg{c.goodReason ? ` — ${c.goodReason}` : ''}</span>
          ) : (
            <span>No fish in this photo</span>
          )}
        </figcaption>
      </figure>
      <button className={`${styles.nav} ${styles.next}`} onClick={(e) => { e.stopPropagation(); go(1); }}>›</button>
      <div className={styles.counter}>{index + 1} / {items.length}</div>
    </div>
  );
}

function GalleryCard({ c, onClick, large }) {
  return (
    <div
      className={`${styles.box} ${large ? styles.boxLarge : ''} reveal`}
      onClick={onClick}
    >
      <img src={c.image} alt={c.title} className={styles.img} />
      {c.goodCatch && <span className={styles.badge}>★ Good catch</span>}
      <div className={styles.caption}>
        <span className={styles.title}>{c.title}</span>
        {c.hasFish && (
          <span className={styles.meta}>
            {c.species} · ~{c.estLengthCm} cm · ~{c.estWeightKg} kg
          </span>
        )}
      </div>
    </div>
  );
}

export default function FishGallery() {
  const all = catchData.catches;
  const [filter, setFilter] = useState('all');
  const [lightboxItems, setLightboxItems] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const goodCatches = useMemo(() => all.filter((c) => c.goodCatch), [all]);

  const filteredItems = useMemo(
    () => (filter === 'all' ? all : all.filter((c) => c.category === filter)),
    [filter, all]
  );

  const available = CATEGORIES.filter(
    (c) => c.key === 'all' || all.some((x) => x.category === c.key)
  );

  const openLightbox = (items, index) => {
    setLightboxItems(items);
    setLightboxIndex(index);
  };

  return (
    <section id="catches" className={`${styles.wrap} section`}>
      <h2 className="section-title">Catch Gallery</h2>
      <p className={styles.note}>
        Species, size and weight are AI estimates from the photo — rough guides, not measurements.
      </p>

      {/* ── GOOD CATCHES SECTION ── */}
      {goodCatches.length > 0 && (
        <div className={styles.goodSection}>
          <div className={styles.goodHeader}>
            <span className={styles.goodStar}>★</span>
            <h3 className={styles.goodTitle}>Good Catches</h3>
            <span className={styles.goodCount}>{goodCatches.length}</span>
          </div>
          <div className={styles.goodGrid}>
            {goodCatches.map((c, i) => (
              <GalleryCard
                key={c.id}
                c={c}
                large
                onClick={() => openLightbox(goodCatches, i)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── FULL GALLERY ── */}
      <div className={styles.allHeader}>
        <h3 className={styles.allTitle}>All Photos</h3>
      </div>

      <div className={styles.tabs}>
        {available.map((c) => (
          <button
            key={c.key}
            className={`${styles.tab} ${filter === c.key ? styles.tabActive : ''}`}
            onClick={() => { setFilter(c.key); setLightboxItems(null); }}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filteredItems.map((c, i) => (
          <GalleryCard
            key={c.id}
            c={c}
            onClick={() => openLightbox(filteredItems, i)}
          />
        ))}
      </div>

      {lightboxItems && lightboxItems[lightboxIndex] && (
        <Lightbox
          items={lightboxItems}
          index={lightboxIndex}
          setIndex={(idx) => {
            if (idx === null) setLightboxItems(null);
            else setLightboxIndex(idx);
          }}
        />
      )}
    </section>
  );
}
