import type { Metadata, Viewport } from 'next';
import { personalInfo } from '@/config/data';
// @ts-ignore
import './globals.css';

export const metadata: Metadata = {
  title: `${personalInfo.name} | ${personalInfo.role} · Zero-G Portfolio`,
  description: personalInfo.heroSubtitle,
  keywords: [
    'Computer Engineer',
    'Student',
    'Web Development',
    'DSA',
    'Python',
    'Portfolio',
    personalInfo.name
  ],
  authors: [{ name: personalInfo.name, url: personalInfo.github }],
  creator: personalInfo.name,
  openGraph: {
    title: `${personalInfo.name} | ${personalInfo.role} · Zero-G Portfolio`,
    description: personalInfo.heroSubtitle,
    url: personalInfo.github,
    siteName: `${personalInfo.name} Portfolio`,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${personalInfo.name} | ${personalInfo.role}`,
    description: personalInfo.heroSubtitle,
    creator: '@sahilchauhan', // Replace with real twitter handle if needed
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#02040a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
