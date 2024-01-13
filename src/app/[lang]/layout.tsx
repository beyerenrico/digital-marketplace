import type { Metadata } from 'next';
import { Inter, Kanit } from 'next/font/google';
import '../globals.css';
import { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';
import Navbar from '@/components/navbar';
import Providers from '@/components/providers';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });
const kanit = Kanit({
  subsets: ['latin'],
  variable: '--font-kanit',
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Digital Marketplace',
  description: 'High quality digital products for your business',
};

export async function generateStaticParams () {
  return [{ lang: 'en-US' }, { lang: 'de' }];
}

type RootLayoutProps = PropsWithChildren & {
  params: {
    lang: string
  }
};

const RootLayout: React.FC<RootLayoutProps> = ({
  children,
  params
}) => {
  return (
    <html lang={params.lang}>
      <body className={cn('h-full font-sans antialiased', inter.className, kanit.variable)}>
        <main className='flex flex-col min-h-screen'>
          <Providers>
            <Navbar />
            <div className='flex-grow flex-1'>
              {children}
            </div>
          </Providers>
        </main>

        <Toaster
          position='top-center'
          richColors
        />
      </body>
    </html>
  );
};

export default RootLayout;
