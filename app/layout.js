import './globals.css';
import { LangProvider } from '@/context/LangContext';
import ScrollReveal from '@/components/ScrollReveal';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Urban Cod Fishing — Fishing Guide in Tromsø',
  description: 'Profesjonell fiskeguide i Tromsø, Norge. Opplev den arktiske sjøen med lokalkunnskap.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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