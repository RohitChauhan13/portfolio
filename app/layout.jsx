import './globals.css';
import { getPersonalInfo, logVisit } from '@/lib/api';
import ThemeToggle from '@/components/ui/ThemeToggle';
import ChatWidget from '@/components/chatbot/ChatWidget';
import Navbar from '@/components/ui/Navbar';
import CookieBanner from '@/components/ui/CookieBanner';
import ConsoleSilencer from '@/components/ConsoleSilencer';
import Script from 'next/script';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const personal = await getPersonalInfo();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rohitchouhan.com';
  const name = 'Rohit Chouhan';
  const title = `${name} | Software Engineer & Full Stack Developer`;
  const description = personal?.short_bio || `${name} is a Software Engineer and Full Stack Developer specializing in React, Next.js, Node.js, and modern web architectures. Explore my portfolio and projects.`;
  const ogImage = personal?.profile_image_url || `${baseUrl}/og-image.jpg`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: `%s | ${name}`
    },
    description,
    authors: [{ name }],
    creator: name,
    publisher: name,
    alternates: {
      canonical: baseUrl,
    },
    openGraph: {
      title,
      description,
      url: baseUrl,
      siteName: name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${name} — Software Engineer`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    icons: {
      icon: '/favicon.svg',
    },
    robots: {
      index: true,
      follow: true,
    }
  };
}

export default async function RootLayout({ children }) {
  // Fire and forget visit logging server-side
  logVisit();
  
  const personal = await getPersonalInfo();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rohitchouhan.com';
  const name = 'Rohit Chouhan';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: name,
    url: baseUrl,
    image: personal?.profile_image_url || `${baseUrl}/og-image.jpg`,
    jobTitle: 'Software Engineer',
    description: personal?.short_bio || 'Software Engineer and Full Stack Developer',
    sameAs: [
      personal?.github_url,
      personal?.linkedin_url,
    ].filter(Boolean),
    knowsAbout: ['React', 'Next.js', 'Node.js', 'TypeScript', 'JavaScript', 'Full Stack Development']
  };

  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {process.env.NODE_ENV === 'production' && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-XXXXXXX', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body suppressHydrationWarning>
        <ConsoleSilencer />
        <ThemeToggle />
        <Navbar />
        {children}
        <ChatWidget />
        <CookieBanner />
      </body>
    </html>
  );
}
