import type { Metadata } from 'next';
import './globals.css';

// =============================================
// METADATA — Update with your real info
// =============================================
export const metadata: Metadata = {
  title: 'Abdulrahman | Full-Stack Developer',
  description:
    'Full-Stack Developer specializing in modern web applications, scalable backends, and exceptional user experiences. Available for hire.',
  keywords: [
    'Full-Stack Developer',
    'React',
    'Next.js',
    'Node.js',
    'TypeScript',
    'Web Developer',
    'Portfolio',
  ],
  authors: [{ name: 'Abdulrahman' }],
  openGraph: {
    title: 'Abdulrahman | Full-Stack Developer',
    description:
      'Full-Stack Developer specializing in modern web applications. View my portfolio.',
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourportfolio.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdulrahman | Full-Stack Developer',
    description: 'Full-Stack Developer. Check out my portfolio.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=DM+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="scan-lines noise-overlay">
        {children}
      </body>
    </html>
  );
}