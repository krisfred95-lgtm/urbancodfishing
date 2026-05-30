import './globals.css';
import { LangProvider } from '@/context/LangContext';
import ScrollReveal from '@/components/ScrollReveal';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Hannes Fishing — Fiskeguide i Tromsø',
  description: 'Profesjonell fiskeguide i Tromsø, Norge. Opplev den arktiske sjøen med lokalkunnskap.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="no">
      <body>
        <LangProvider>
          <ScrollReveal>
            <Nav />
            <main>{children}</main>
            <Footer />
          </ScrollReveal>
        </LangProvider>
      </body>
    </html>
  );
}