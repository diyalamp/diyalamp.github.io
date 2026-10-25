import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const inter = localFont({
  src: '../inter-latin.woff2',
  variable: '--font-inter',
  display: 'swap',
  weight: '100 900',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://diyalamp.com'),
  title: 'diyalamp — An open-source writing app for macOS',
  description: 'A tool for the mind. A focused, open-source Markdown writing app for macOS, in development. Try the working browser workspace: write, compare notes, and export your ideas.',
  alternates: { canonical: '/' },
  icons: { icon: '/lamp.svg' },
  openGraph: {
    type: 'website', siteName: 'diyalamp', url: '/',
    title: 'diyalamp — A tool for the mind',
    description: 'Try the free Markdown browser workspace. An open-source Java writing app for macOS is in development.',
    images: [{ url: '/social-card.png', width: 1200, height: 630, alt: 'diyalamp — A tool for the mind' }],
  },
  twitter: { card: 'summary_large_image', title: 'diyalamp — A tool for the mind', images: ['/social-card.png'] },
};
export const viewport: Viewport = { themeColor: '#3C4545' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const data = {"@context":"https://schema.org","@graph":[{"@type":"WebSite","@id":"https://diyalamp.com/#website","name":"diyalamp","url":"https://diyalamp.com/","description":"A focused open-source Markdown writing project for macOS, with a working browser workspace."},{"@type":"SoftwareSourceCode","name":"diyalamp","codeRepository":"https://github.com/diyalamp/diyalamp","programmingLanguage":"Java","runtimePlatform":"macOS (in development)","license":"https://www.apache.org/licenses/LICENSE-2.0","description":"Open-source writing app in development. The website offers a browser Markdown workspace today."}]};
  return <html lang="en" className={inter.variable}><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,"\\u003c")}} />{children}</body></html>;
}
