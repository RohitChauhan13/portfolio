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
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://rohit-chouhan-portfolio.vercel.app').replace(/\/+$/, '');
  const name = 'Rohit Chouhan';
  const alternateName = 'Rohit Chauhan';
  const title = `${name} | Software Engineer & React Native Developer`;
  const description = personal?.bio || `${name} (also searched as ${alternateName}) is a Software Engineer and React Native Developer at GTT Data Solutions in Sangli, Maharashtra, India, specializing in mobile architectures, Android, and full-stack development.`;
  const ogImage = `${baseUrl}/og-image.png`;
  
  const keywords = [
    'Rohit Chouhan',
    'Rohit Chauhan',
    'Rohit Chouhan Software Engineer',
    'Rohit Chauhan Software Engineer',
    'Rohit Chouhan React Native Developer',
    'Rohit Chauhan React Native',
    'Rohit React Native Developer',
    'Rohit Chouhan Sangli',
    'Rohit Chauhan Sangli',
    'Rohit Sangli',
    'Software Engineer',
    'React Native Developer',
    'Full Stack Developer',
    'Node.js Developer',
    'GTT Data Solutions',
    'Android Developer',
    'Software Engineer Sangli',
    'React Developer India',
    'Mobile Application Engineer',
    'Offline-First Mobile Architecture',
    'MERN Stack Developer'
  ];

  return {
    metadataBase: new URL(baseUrl),
    applicationName: 'Rohit Chouhan Portfolio',
    title: {
      default: title,
      template: `%s | ${name}`
    },
    description,
    keywords,
    authors: [{ name, url: baseUrl }],
    creator: name,
    publisher: name,
    manifest: '/manifest.webmanifest',
    alternates: {
      canonical: baseUrl,
    },
    openGraph: {
      title,
      description,
      url: baseUrl,
      siteName: 'Rohit Chouhan Portfolio',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${name} — Software Engineer & React Native Developer`,
          type: 'image/png'
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
      creator: '@RohitChauhan13',
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    }
  };
}

export default async function RootLayout({ children }) {
  // Fire and forget visit logging server-side
  logVisit();
  
  const personal = await getPersonalInfo();
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://rohit-chouhan-portfolio.vercel.app').replace(/\/+$/, '');
  const name = 'Rohit Chouhan';
  const alternateName = 'Rohit Chauhan';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        'url': baseUrl,
        'name': 'Rohit Chouhan Portfolio',
        'alternateName': [name, alternateName, 'Rohit Chauhan Portfolio', 'Rohit Chouhan Portfolio'],
        'description': 'Official professional portfolio of Rohit Chouhan (Rohit Chauhan), Software Engineer and React Native Developer.',
        'publisher': {
          '@id': `${baseUrl}/#person`
        },
        'inLanguage': 'en-US'
      },
      {
        '@type': 'Person',
        '@id': `${baseUrl}/#person`,
        'name': name,
        'alternateName': alternateName,
        'url': baseUrl,
        'image': personal?.profile_image_url || `${baseUrl}/og-image.png`,
        'jobTitle': 'Software Engineer',
        'description': personal?.bio || 'Software Engineer and React Native Developer specializing in mobile application engineering and full-stack development.',
        'worksFor': {
          '@type': 'Organization',
          'name': 'GTT Data Solutions',
          'address': {
            '@type': 'PostalAddress',
            'addressLocality': 'Sangli',
            'addressRegion': 'Maharashtra',
            'addressCountry': 'India'
          }
        },
        'alumniOf': {
          '@type': 'EducationalOrganization',
          'name': 'Institute of Management and Rural Development Administration (IMRDA), Sangli — Bharati Vidyapeeth University'
        },
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Sangli',
          'addressRegion': 'Maharashtra',
          'postalCode': '416410',
          'addressCountry': 'India'
        },
        'email': 'mailto:rohitchauhan6232@gmail.com',
        'sameAs': [
          'https://github.com/RohitChauhan13',
          'https://www.linkedin.com/in/rohitchauhan13',
          'https://www.instagram.com/rohit.chauhan.13',
          personal?.github_url,
          personal?.linkedin_url,
        ].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i),
        'knowsAbout': [
          'React Native',
          'Android Development',
          'Node.js',
          'Express.js',
          'TypeScript',
          'JavaScript',
          'Redux Toolkit',
          'SQLite',
          'MySQL',
          'PostgreSQL',
          'Firebase',
          'REST APIs',
          'Offline-First Mobile Architecture',
          'Full Stack Development'
        ]
      },
      {
        '@type': 'ProfilePage',
        '@id': `${baseUrl}/#profilepage`,
        'url': baseUrl,
        'name': `${name} Profile`,
        'isPartOf': {
          '@id': `${baseUrl}/#website`
        },
        'mainEntity': {
          '@id': `${baseUrl}/#person`
        }
      }
    ]
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
