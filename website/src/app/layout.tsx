import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { desktopRelease } from '@/lib/desktop-release';
import './globals.css';

const inter = localFont({
  src: '../inter-latin.woff2',
  variable: '--font-inter',
  display: 'swap',
  weight: '100 900',
});

const siteUrl = 'https://diyalamp.com';
const title = 'diyalamp | Free, Open-Source Markdown Editor for Mac';
const description =
  'A free, open-source Mac Markdown editor with no account or activation. Edit local files in place and compare download sizes with Obsidian, Notion, and Typora.';
const license = 'https://www.apache.org/licenses/LICENSE-2.0';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: '%s | diyalamp' },
  description,
  applicationName: 'diyalamp',
  robots: { index: true, follow: true, googleBot: { 'max-image-preview': 'large' } },
  alternates: {
    canonical: '/',
    types: { 'text/plain': [{ url: '/llms.txt', title: 'diyalamp product facts' }] },
  },
  icons: { icon: '/lamp.svg' },
  openGraph: {
    type: 'website',
    siteName: 'diyalamp',
    url: '/',
    title,
    description,
    images: [{ url: '/social-card.png', width: 1200, height: 630, alt: 'diyalamp Markdown editor for Mac' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/social-card.png'] },
};

export const viewport: Viewport = { colorScheme: 'dark', themeColor: '#000000' };

const project = { '@id': `${siteUrl}/#project` };

const productData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      ...project,
      name: 'diyalamp',
      url: `${siteUrl}/`,
      logo: `${siteUrl}/lamp.svg`,
      sameAs: ['https://github.com/diyalamp', 'https://bsky.app/profile/diyalamp.com', 'https://www.reddit.com/r/DiyaLamp/'],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: 'diyalamp',
      url: `${siteUrl}/`,
      publisher: project,
      description,
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${siteUrl}/#desktop`,
      name: 'diyalamp',
      url: `${siteUrl}/`,
      publisher: project,
      description,
      applicationCategory: 'ProductivityApplication',
      operatingSystem: 'macOS',
      softwareVersion: desktopRelease.version,
      isAccessibleForFree: true,
      license,
      downloadUrl: desktopRelease.url,
      installUrl: [desktopRelease.appleSilicon, desktopRelease.intel],
      releaseNotes: desktopRelease.url,
      featureList: [
        'Rendered Markdown editing and slash commands',
        'Edit UTF-8 .md and .markdown files in place',
        'Search filenames and raw Markdown with regex and path globs',
        'Tabs and side-by-side notes',
        'Wikilinks, a note graph, and incoming and outgoing links',
        'Current-line Focus mode and a Pomodoro timer',
      ],
      offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' },
    },
    {
      '@type': 'SoftwareSourceCode',
      '@id': `${desktopRelease.source}#source`,
      name: 'diyalamp desktop source',
      codeRepository: desktopRelease.source,
      programmingLanguage: 'Java',
      license,
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productData).replace(/</g, '\\u003c') }}
        />
        {children}
      </body>
    </html>
  );
}
