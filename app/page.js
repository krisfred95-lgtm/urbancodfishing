import Hero from '@/components/Hero';
import Tours from '@/components/Tours';
import Included from '@/components/Included';
import Why from '@/components/Why';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Species from '@/components/Species';
import Territory from '@/components/Territory';
import Gear from '@/components/Gear';
import Philosophy from '@/components/Philosophy';

export default function Home() {
  return (
    <>
      <Hero />
      <Tours />
      <Philosophy />
      <Species />
      <Territory />
      <Gear />
      <Included />
      <Why />
      <Gallery />
      <Contact />
    </>
  );
}
