import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import NavBar from '@/components/nav-bar';
import Footer from '@/components/footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

//TODO: fix this
export const metadata: Metadata = {
  title: 'Brian Ortega | Website & App Developer in Crete, Nebraska',
  description:
    'I build websites and mobile apps that are easy to use, fast, and helpful. Based in Crete, Nebraska, I help local businesses and clients worldwide bring their ideas to life.',
  keywords: [
    'Brian Ortega',
    'Crete Nebraska',
    'Nebraska Developer',
    'Local Website Developer',
    'App Developer',
    'Custom Websites',
    'Mobile Apps',
    'iPhone Apps',
    'Android Apps',
    'Digital Solutions',
    'Crete NE',
    'Nebraska Tech',
  ],

  creator: 'Brian Ortega',
  // openGraph: {
  //   type: "website",
  //   locale: "en_US",
  //   url: "ortbri.vercel.app",
  //   title: "Brian Ortega | Website & App Developer in Crete, Nebraska",
  //   description: "I build websites and mobile apps that are easy to use, fast, and helpful. Based in Crete, Nebraska.",
  //   siteName: "Brian Ortega's Portfolio",
  //   images: [{
  //     url: "/og-image.jpg",
  //     width: 1200,
  //     height: 630,
  //     alt: "Brian Ortega - Website and App Developer in Crete, Nebraska"
  //   }],
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Brian Ortega | Website & App Developer in Crete, Nebraska",
  //   description: "I build websites and mobile apps that are easy to use, fast, and helpful. Based in Crete, Nebraska.",
  //   images: ["/og-image.jpg"],
  // },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NavBar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
