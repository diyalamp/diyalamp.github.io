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
  title: 'diyalamp — Open-source Markdown writing for macOS',
  applicationName: 'diyalamp',
  robots: { index: true, follow: true },
  description: 'An open-source Markdown editor for macOS. Write in rendered pages, organize local notes, and keep two notes side by side. No account or subscription.',
  alternates: { canonical: '/' },
  icons: { icon: '/lamp.svg' },
  openGraph: {
    type: 'website', siteName: 'diyalamp', url: '/',
    title: 'diyalamp — Open-source Markdown writing for macOS',
    description: 'An open-source Markdown editor for macOS. Local files, rendered editing, and side-by-side notes. No sign-up or subscription.',
    images: [{ url: '/social-card.png', width: 1200, height: 630, alt: 'diyalamp — A tool for the mind' }],
  },
  twitter: { card: 'summary_large_image', title: 'diyalamp — Open-source Markdown writing for macOS', images: ['/social-card.png'] },
};
export const viewport: Viewport = { themeColor: '#000000' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const data = {"@context":"https://schema.org","@graph":[
    {"@type":"Organization","@id":"https://diyalamp.com/#project","name":"diyalamp","url":"https://diyalamp.com/","logo":"https://diyalamp.com/lamp.svg","sameAs":["https://github.com/diyalamp","https://bsky.app/profile/diyalamp.com","https://www.reddit.com/r/DiyaLamp/"]},
    {"@type":"WebSite","@id":"https://diyalamp.com/#website","name":"diyalamp","url":"https://diyalamp.com/","publisher":{"@id":"https://diyalamp.com/#project"},"description":"An open-source Markdown writing project for macOS, with a free working browser notebook."},
    {"@type":"WebApplication","@id":"https://diyalamp.com/#notebook","name":"diyalamp browser notebook","url":"https://diyalamp.com/#workspace","applicationCategory":"ProductivityApplication","operatingSystem":"Web browser","isAccessibleForFree":true,"description":"A working rendered Markdown notebook with slash commands, multiple note tabs, local browser saving and Markdown export. No account required."},
    {"@type":"SoftwareApplication","@id":"https://diyalamp.com/#desktop","name":"diyalamp","url":"https://diyalamp.com/","applicationCategory":"ProductivityApplication","operatingSystem":"macOS","softwareVersion":"1.0.2","isAccessibleForFree":true,"license":"https://www.apache.org/licenses/LICENSE-2.0","downloadUrl":"https://github.com/diyalamp/diyalamp/releases/tag/v1.0.2","releaseNotes":"https://github.com/diyalamp/diyalamp/releases/tag/v1.0.2","description":"Open-source Markdown editor for macOS with rendered formatting, local files, multiple note tabs and split view. No account required. Unsigned community release.","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}},
    {"@type":"SoftwareSourceCode","name":"diyalamp desktop source","codeRepository":"https://github.com/diyalamp/diyalamp","programmingLanguage":"Java","license":"https://www.apache.org/licenses/LICENSE-2.0","description":"Open-source source code for the macOS Markdown writing app."}
  ]};
  return <html lang="en" className={`dark ${inter.variable}`}><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,"\\u003c")}} />{children}</body></html>;
}
