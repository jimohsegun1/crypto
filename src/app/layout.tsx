import type {Metadata} from 'next';
import './globals.css';
import { Outfit } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'Crypto Checkout',
  description: 'Jeremiah',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased`} suppressHydrationWarning={true}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
