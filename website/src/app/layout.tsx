import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { desktopRelease } from '@/lib/desktop-release';

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
  description: 'A free, open-source Markdown editor for macOS. Local files, rendered writing, wikilinks, incoming and outgoing note connections, Zen mode, and Pomodoro. No account.',
  alternates: { canonical: '/' },
  icons: { icon: '/lamp.svg' },
  openGraph: {
    type: 'website', siteName: 'diyalamp', url: '/',
    title: 'diyalamp — Open-source Markdown writing for macOS',
    description: 'An open-source Markdown editor for macOS. Light-mode writing with Inter, local files, wikilinks, a note graph, Zen mode, and Pomodoro. No sign-up or subscription.',
    images: [{ url: '/social-card.png', width: 1200, height: 630, alt: 'diyalamp — A tool for the mind' }],
  },
  twitter: { card: 'summary_large_image', title: 'diyalamp — Open-source Markdown writing for macOS', images: ['/social-card.png'] },
};
export const viewport: Viewport = { themeColor: '#000000' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const data = {"@context":"https://schema.org","@graph":[
    {"@type":"Organization","@id":"https://diyalamp.com/#project","name":"diyalamp","url":"https://diyalamp.com/","logo":"https://diyalamp.com/lamp.svg","sameAs":["https://github.com/diyalamp","https://bsky.app/profile/diyalamp.com","https://www.reddit.com/r/DiyaLamp/"]},
    {"@type":"WebSite","@id":"https://diyalamp.com/#website","name":"diyalamp","url":"https://diyalamp.com/","publisher":{"@id":"https://diyalamp.com/#project"},"description":"Open-source Markdown editor for macOS with a light desktop workspace and a separate free browser notebook demonstration."},
    {"@type":"WebApplication","@id":"https://diyalamp.com/#notebook","name":"diyalamp browser notebook","url":"https://diyalamp.com/#workspace","applicationCategory":"ProductivityApplication","operatingSystem":"Web browser","isAccessibleForFree":true,"description":"A separate dark browser demonstration of rendered Markdown, slash commands, note tabs, local browser saving, and Markdown export. It does not sync with the desktop app. No account required."},
    {"@type":"SoftwareApplication","@id":"https://diyalamp.com/#desktop","name":"diyalamp","url":"https://diyalamp.com/","applicationCategory":"ProductivityApplication","operatingSystem":"macOS","softwareVersion":desktopRelease.version,"isAccessibleForFree":true,"license":"https://www.apache.org/licenses/LICENSE-2.0","downloadUrl":desktopRelease.url,"releaseNotes":desktopRelease.url,"description":"Free, open-source Markdown editor for macOS. Light-only AtlantaFX CupertinoLight workspace with bundled static Inter 16 px and Menlo 16 px code, local folders, rendered editing, tabs, split view, wikilinks, directed SmartGraph incoming and outgoing note connections, Zen mode, a toolbar Pomodoro popover, and user-triggered updates. No account required. Unsigned community release.","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}},
    {"@type":"SoftwareSourceCode","name":"diyalamp desktop source","codeRepository":"https://github.com/diyalamp/diyalamp","programmingLanguage":"Java","license":"https://www.apache.org/licenses/LICENSE-2.0","description":"Open-source source code for the macOS Markdown writing app."}
  ]};
  return <html lang="en" className={`dark ${inter.variable}`}><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,"\\u003c")}} />{children}</body></html>;
}
