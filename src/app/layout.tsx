import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';

import '../components/globals.css';
import SideNav from '@/components/sidenav';


const nunito = Nunito({ 
  subsets: ['latin'],
  weight: ['400', '700']
 })

export const metadata: Metadata = {
  title: 'Poli Virtual',
  description: 'De estudiantes para estudiantes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/short-logo.png" />
      </head>
      <body className={nunito.className}>
        <div className="flex h-screen flex-col md:overflow-hidden">
          <div className="bg-[--white] w-full">
            <SideNav />
          </div>
            <div className="flex-grow p-6 md:overflow-x-auto md:p-12">
              <main>{children}</main>
              </div>
        </div>
      </body>
    </html>
  )
}
