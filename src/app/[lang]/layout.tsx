import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Digital Marketplace',
  description: 'High quality digital products for your business',
};

export async function generateStaticParams () {
  return [{ lang: 'en-US' }, { lang: 'de' }];
}

export default function RootLayout ({
  children,
  params
}: {
  children: React.ReactNode
  params: {
    lang: string
  }
}) {
  return (
    <html lang={params.lang}>
      <body className={cn('h-full font-sans antialiased', inter.className)}>
        <main className='flex flex-col min-h-screen'>
          <div className='flex-grow flex-1'>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
