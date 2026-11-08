import type { Metadata } from 'next';
import { ArrowDownRight, ArrowRight, Download, Star } from 'lucide-react';
import AppScreenshot from '@/components/app-screenshot';
import LampMark from '@/components/lamp-mark';
import SiteFooter from '@/components/site-footer';
import { desktopRelease } from '@/lib/desktop-release';
import { comparisonDate, decimalMegabytes, macDownloads } from '@/lib/mac-downloads';
import './alternatives.css';

const title = 'Obsidian, Notion, and Typora Alternatives for Mac';
const socialCard = `/social-card.png?v=${desktopRelease.version}-dock`;
const description =
  'Compare diyalamp with Obsidian, Notion, and Typora. See which editors use local Markdown, what setup they need, and how to bring your notes.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/alternatives/',
    types: { 'text/plain': [{ url: '/llms.txt', title: 'diyalamp product facts' }] },
  },
  openGraph: {
    type: 'website',
    siteName: 'diyalamp',
    url: '/alternatives/',
    title,
    description,
    images: [{ url: socialCard, width: 1200, height: 630, alt: 'diyalamp Markdown editor for Mac' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: [socialCard] },
};

const comparisons = [
  {
    id: 'obsidian',
    name: 'Obsidian',
    gain: 'Open your vault as a folder of local Markdown files. Search filenames and note text, and follow incoming and outgoing links.',
    keep: 'Canvas, a vault-wide graph, plugin workflows, or optional Sync and Publish.',
    shared: 'Obsidian also opens local Markdown without sign-up and includes Live Preview, backlinks, and slash commands.',
    steps: [
      'Make a copy of your vault folder in Finder.',
      'Choose File → Open folder in diyalamp and select the copy.',
      'Open a linked note and check its incoming and outgoing links. Keep Obsidian for notes that depend on a plugin or custom syntax.',
    ],
    sources: [
      { label: 'Obsidian vaults', href: 'https://obsidian.md/help/Files+and+folders/Manage+vaults' },
      { label: 'Editing modes', href: 'https://obsidian.md/help/edit-and-read' },
      { label: 'Core plugins', href: 'https://obsidian.md/help/plugins' },
      { label: 'Pricing and optional services', href: 'https://obsidian.md/pricing' },
    ],
  },
  {
    id: 'notion',
    name: 'Notion',
    gain: 'Use live formatting, checklists, and slash commands. Save to Markdown files on your Mac without an account.',
    keep: 'Shared databases, workspace permissions, and live collaboration.',
    shared: 'Both give you formatting as you write. Notion organizes pages in an account-based workspace. diyalamp opens files from a folder you choose.',
    steps: [
      'Open the Notion page and choose Export → Markdown & CSV. Include subpages if you need them.',
      'Unzip the export and open the resulting folder in diyalamp.',
      'Edit the Markdown pages. Keep the export archive for attachments, CSV databases, and HTML callouts.',
    ],
    sources: [
      { label: 'Notion workspaces', href: 'https://www.notion.com/help/intro-to-workspaces' },
      { label: 'Notion editor', href: 'https://www.notion.com/help/writing-and-editing-basics' },
      { label: 'Notion export guide', href: 'https://www.notion.com/help/export-your-content' },
    ],
  },
  {
    id: 'typora',
    name: 'Typora',
    gain: 'Keep the same Markdown files. Search across a folder and follow linked notes without paying for a license.',
    keep: 'Rich rendering for tables, equations, and diagrams, or Typora’s document export workflow.',
    shared: 'Both format Markdown inside the editor. Typora uses a one-time paid license after its trial. diyalamp is free forever and open source.',
    steps: [
      'Open the folder that already holds your .md files.',
      'Open a draft and check its formatting. The file stays in the folder you started with.',
      'Check files that rely on rich tables, equations, or diagrams. Use Typora when those documents need its rendering.',
    ],
    sources: [
      { label: 'Typora features', href: 'https://typora.io/' },
      { label: 'Typora license', href: 'https://support.typora.io/purchase/' },
    ],
  },
] as const;

export default function Alternatives() {
  return (
    <div className="alternatives-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="landing-header">
        <a className="landing-brand" href="/"><LampMark className="brand-lamp" />diyalamp</a>
        <a className="comparison-header-link" href="/#features">App features<ArrowRight size={16} aria-hidden="true" /></a>
      </header>
      <main id="main-content" className="comparison-main" tabIndex={-1} aria-labelledby="comparison-heading">
        <div className="comparison-content">
          <header className="comparison-hero">
            <p className="comparison-kicker">Markdown editors for Mac</p>
            <h1 id="comparison-heading">Obsidian, Notion, and Typora alternatives for Mac.</h1>
            <p className="comparison-lead">
              diyalamp is a free, open-source alternative to Obsidian, Notion, and Typora for personal
              writing on macOS. Open a folder and edit its UTF-8 <code>.md</code> and <code>.markdown</code> files
              in place. Search note text, follow backlinks, and start writing with no sign-up.
            </p>
            <a className="site-button site-button-primary" href="/#download"><Download size={17} aria-hidden="true" />Download for Mac</a>
          </header>

          <section className="comparison-section" aria-labelledby="decision-heading">
            <h2 id="decision-heading">What you gain by switching</h2>
            <ul className="comparison-matrix">
              {comparisons.map((app) => (
                <li key={app.id}>
                  <a className="comparison-matrix-title" href={`#${app.id}`}>
                    From {app.name}<ArrowDownRight size={17} aria-hidden="true" />
                  </a>
                  <p>{app.gain}</p>
                  <dl>
                    <dt>Keep {app.name} for</dt>
                    <dd>{app.keep}</dd>
                  </dl>
                </li>
              ))}
            </ul>
          </section>

          <section id="mac-downloads" className="comparison-section" aria-labelledby="download-size-heading">
            <h2 id="download-size-heading">Mac downloads and setup</h2>
            <table className="mac-download-table">
              <caption className="sr-only">Public macOS installers and what each app requires to edit</caption>
              <thead>
                <tr><th scope="col">App</th><th scope="col">Download</th><th scope="col">To start writing</th></tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">diyalamp<span>{desktopRelease.version}</span></th>
                  <td>
                    {desktopRelease.downloads.map(({ architecture, label, url, bytes }) => (
                      <span key={architecture}><a href={url}>{label} DMG</a> <strong>{decimalMegabytes(bytes)} MB</strong></span>
                    ))}
                  </td>
                  <td>Open a Markdown folder. No account or activation.</td>
                </tr>
                {macDownloads.map((app) => (
                  <tr key={app.name}>
                    <th scope="row">{app.name}<span>{app.version}</span></th>
                    <td>
                      <strong>{decimalMegabytes(app.bytes)} MB</strong><span>{app.build}</span>
                      <a href={app.downloadSource} aria-label={`${app.name} installer source`}>Source</a>
                    </td>
                    <td>{app.setup}<span><a href={app.setupSource} aria-label={`${app.name} setup requirements`}>Setup details</a></span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="measurement-note">
              Figures are compressed DMG download sizes in decimal MB. The other apps’ installers support Apple silicon and were checked on{' '}
              <time dateTime={comparisonDate}>November 7, 2026</time>. The diyalamp{' '}
              <a href={desktopRelease.previousUrl}>1.3.4 downloads</a> were{' '}
              {desktopRelease.downloads.map(({ label, previousBytes }) => `${decimalMegabytes(previousBytes)} MB for ${label}`).join(' and ')}.
            </p>
          </section>

          <section className="comparison-section" aria-labelledby="migration-heading">
            <h2 id="migration-heading">Bring a few notes over</h2>
            <p className="comparison-subtitle">Start with files you already use. Check the formatting and links in your own notes.</p>
            <div className="comparison-migrations">
              {comparisons.map((app) => (
                <article id={app.id} key={app.id} aria-labelledby={`${app.id}-heading`}>
                  <div>
                    <h3 id={`${app.id}-heading`}>{app.name}</h3>
                    <p>{app.shared}</p>
                  </div>
                  <div>
                    <ol>
                      {app.steps.map((step) => <li key={step}>{step}</li>)}
                    </ol>
                    <p className="comparison-sources">
                      {app.sources.map((source) => <a key={source.href} href={source.href}>{source.label}</a>)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="comparison-section" aria-labelledby="other-tools">
            <h2 id="other-tools">Coming from Bear or Coda?</h2>
            <div className="comparison-secondary">
              <article aria-labelledby="bear-heading">
                <h3 id="bear-heading">Bear</h3>
                <p>Export the notes you want as Markdown, then open that folder in diyalamp. Bear’s export can turn nested tags into folders.</p>
                <a href="https://bear.app/faq/export-your-tags/">Bear’s tag export guide</a>
              </article>
              <article aria-labelledby="coda-heading">
                <h3 id="coda-heading">Coda</h3>
                <p>Copy the prose you want to a Markdown note. Export structured tables separately as CSV.</p>
                <a href="https://help.coda.io/hc/en-us/articles/39555767136013-Overview-Export-data-from-Coda">Coda’s export guide</a>
              </article>
            </div>
          </section>

          <section className="comparison-section comparison-closer" aria-labelledby="start-heading">
            <div>
              <h2 id="start-heading">Try diyalamp with your own notes.</h2>
              <p>
                diyalamp is free under Apache 2.0. Choose an Apple silicon or Intel installer, then open a folder you already use.
              </p>
              <div className="comparison-closing-actions">
                <a className="site-button site-button-primary" href="/#download"><Download size={17} aria-hidden="true" />Download for Mac</a>
                <a className="site-button site-button-outline" href={desktopRelease.source}><Star size={17} aria-hidden="true" />Star on GitHub</a>
              </div>
              <p className="comparison-sources">
                <a href={desktopRelease.url}>Release notes and checksums</a>
                <a href={desktopRelease.installation}>Install guide</a>
                <a href="/llms.txt">Product facts</a>
              </p>
            </div>
            <AppScreenshot name="search" caption="Database Indexes and Query Plans, side by side" />
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
