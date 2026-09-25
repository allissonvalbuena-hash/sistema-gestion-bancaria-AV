import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'FINANZA — Tu aliado financiero | Sistema de Información Bancaria',
  description:
    'Conoce nuestros productos financieros y encuentra soluciones que se adaptan a tus necesidades. Simula tu crédito o CDT en tiempo real.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
