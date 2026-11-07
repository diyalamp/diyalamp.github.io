import type { Metadata } from 'next';
import { ArrowDownRight, ArrowRight, Download, Star } from 'lucide-react';
import AppScreenshot from '@/components/app-screenshot';
import LampMark from '@/components/lamp-mark';
import { desktopRelease } from '@/lib/desktop-release';
import { comparisonDate, decimalMegabytes, downloadReduction, macDownloads, nativePrototype } from '@/lib/mac-downloads';
import './alternatives.css';

const title = 'Obsidian, Notion, and Typora Alternatives for Mac';
const description =
  'Compare Mac download sizes and sign-in requirements for diyalamp, Obsidian, Notion, and Typora. Move your Markdown files and start writing locally.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/alternatives/' },
  openGraph: {
    type: 'website',
    siteName: 'diyalamp',
    url: '/alternatives/',
    title,
    description,
    images: [{ url: '/social-card.png', width: 1200, height: 630, alt: 'diyalamp Markdown editor for Mac' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/social-card.png'] },
};

const comparisons = [
  {
    id: 'obsidian',
    name: 'Obsidian',
    gain: 'Keep your vault as a folder. Put a draft and its references side by side and start a writing timer from the toolbar.',
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
    gain: 'Keep formatted writing and slash commands. Save new notes straight to Markdown files on your Mac without an account or export step.',
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
    gain: 'Keep live Markdown formatting and the same files. Get tabs, split view, linked-note navigation, and a Pomodoro timer for free.',
    keep: 'Rich rendering for tables, equations, and diagrams, or Typora’s document export workflow.',
    shared: 'Both format Markdown inside the editor. Typora uses a one-time paid license after its trial. diyalamp is free forever and open source.',
    steps: [
      'Open the folder that already holds your .md files.',
      'Open a draft and a second note side by side. Both files stay in the folder you started with.',
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
      <header className="landing-header">
        <a className="landing-brand" href="/"><LampMark className="brand-lamp" />diyalamp</a>
        <a className="comparison-header-link" href="/#workspace">App screenshots<ArrowRight size={16} aria-hidden="true" /></a>
      </header>
      <main className="comparison-main" aria-labelledby="comparison-heading">
        <div className="comparison-content">
          <header className="comparison-hero">
            <p className="comparison-kicker">Markdown editors for Mac</p>
            <h1 id="comparison-heading">Obsidian, Notion, and Typora alternatives for Mac.</h1>
            <p className="comparison-lead">
              diyalamp is a free, open-source alternative to Obsidian, Notion, and Typora for personal
              writing on macOS. Open a folder and edit its UTF-8 <code>.md</code> and <code>.markdown</code> files
              in place. You get rendered formatting, side-by-side notes, and a writing timer with no sign-up.
            </p>
            <a className="site-button site-button-primary" href="/#download"><Download size={17} aria-hidden="true" />Download for Mac</a>
          </header>

          <section id="mac-downloads" className="comparison-section" aria-labelledby="download-size-heading">
            <h2 id="download-size-heading">Less to download. No account to set up.</h2>
            <p className="comparison-subtitle">
              The diyalamp Apple silicon DMG is <strong>{downloadReduction.obsidian}% smaller than Obsidian’s universal download</strong>
              {' '}and <strong>{downloadReduction.notion}% smaller than Notion’s Apple silicon download</strong>.
              Typora has the smallest public installer in this comparison.
            </p>
            <table className="mac-download-table">
              <caption className="sr-only">Public macOS installers and what each app requires to edit</caption>
              <thead>
                <tr><th scope="col">App</th><th scope="col">Download</th><th scope="col">To start writing</th></tr>
              </thead>
              <tbody>
                {macDownloads.map((app) => (
                  <tr key={app.name}>
                    <th scope="row">{app.name}<span>{app.version}</span></th>
                    <td>
                      <strong>{decimalMegabytes(app.bytes)} MB</strong><span>{app.build}</span>
                      <a href={app.downloadSource} aria-label={`${app.name} installer source`}>Installer source</a>
                    </td>
                    <td>{app.setup}<span><a href={app.setupSource} aria-label={`${app.name} setup requirements`}>Setup source</a></span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="measurement-note">
              Checked <time dateTime={comparisonDate}>November 7, 2026</time>. Sizes use decimal MB and measure installer transfers.
              The comparison uses each vendor’s Apple silicon installer where offered, or its macOS installer that supports Apple silicon.
              Launch and editing speeds require separate measurements.
            </p>
          </section>

          <section id="native-prototype" className="comparison-section" aria-labelledby="native-heading">
            <p className="comparison-kicker">In development · Local prototype</p>
            <h2 id="native-heading">A native prototype with a DMG under 2 MB.</h2>
            <dl className="native-measurements">
              <div><dt>Prototype DMG</dt><dd>{decimalMegabytes(nativePrototype.dmgBytes, 2)} MB</dd></div>
              <div><dt>App on disk</dt><dd>{decimalMegabytes(nativePrototype.appBytesOnDisk, 2)} MB</dd></div>
              <div><dt>Test edit and redraw</dt><dd>{nativePrototype.medianEditMs.toFixed(1)} ms</dd></div>
            </dl>
            <p className="comparison-subtitle">
              The single-note prototype opens, edits, and saves Markdown. On Apple silicon, an in-memory edit and
              AppKit display call took a median of {nativePrototype.medianEditMs.toFixed(1)} ms over {nativePrototype.samples} samples
              on a {nativePrototype.fixtureBytes.toLocaleString('en-US')}-byte test note. The public download is diyalamp {desktopRelease.version}.
            </p>
          </section>

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
                diyalamp is free forever under Apache 2.0. Version {desktopRelease.version} downloads
                are {(desktopRelease.appleSiliconBytes / 1e6).toFixed(1)} MB for Apple silicon and{' '}
                {(desktopRelease.intelBytes / 1e6).toFixed(1)} MB for Intel, including the runtime.
              </p>
              <div className="comparison-closing-actions">
                <a className="site-button site-button-primary" href="/#download"><Download size={17} aria-hidden="true" />Download for Mac</a>
                <a className="site-button site-button-outline" href={desktopRelease.source}><Star size={17} aria-hidden="true" />Star on GitHub</a>
              </div>
              <p className="comparison-sources">
                <a href={desktopRelease.url}>Release files and checksums</a>
                <a href={desktopRelease.installation}>Installation guide</a>
              </p>
            </div>
            <AppScreenshot name="search" caption="Search across a folder and open a result at the match." />
          </section>
        </div>
      </main>
      <footer className="landing-footer">
        <a href="/" className="landing-brand"><LampMark className="brand-lamp" />diyalamp</a>
        <a href="/llms.txt">Product facts</a>
      </footer>
    </div>
  );
}
