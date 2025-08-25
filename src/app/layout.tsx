import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/ui/layout/header';
import { siteConfig } from '../config/config';
import { layoutConfig } from '@/config/layout-config';
import { Providers } from '@/providers/providers';
import { auth } from '@/auth/auth';
import { SessionProvider } from 'next-auth/react';
import AppLoader from '@/hoc/app-loader';
import Title from '@/components/ui/layout/title';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <SessionProvider session={session}>
            <AppLoader>
              <Header />
              <Title />
              <main
                className="flex flex-col  w-full items-center justify-start"
                style={{
                  minHeight: `calc(100dvh - ${layoutConfig.headerHeight} - ${layoutConfig.footerHeight} - ${layoutConfig.titleHeight})`,
                }}
              >
                {children}
              </main>
              <footer className="flex flex-col items-center justify-center w-full h-16 border-t border-gray-200">
                <p>{siteConfig.description}</p>
              </footer>
            </AppLoader>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
