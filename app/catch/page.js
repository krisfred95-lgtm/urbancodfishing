import FishGallery from '@/components/FishGallery';
import CatchLog from '@/components/CatchLog';

export const metadata = {
  title: 'Catches — Urban Cod Fishing',
  description: 'Analysed catch gallery and monthly catch log from Urban Cod Fishing, Tromsø.',
};

export default function CatchPage() {
  return (
    <>
      <FishGallery />
      <CatchLog />
    </>
  );
}
