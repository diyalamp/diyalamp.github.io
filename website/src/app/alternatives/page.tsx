import type { Metadata } from 'next';
import LampMark from '@/components/lamp-mark';
import { desktopRelease } from '@/lib/desktop-release';

const title = 'Obsidian, Notion, and Typora Alternatives for Mac';
const description =
  'Compare diyalamp with Obsidian, Notion, and Typora. See which app fits your writing workflow and how to open your Markdown notes on a Mac.';

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

export default function Alternatives() {
  return (
    <div className="relative isolate alternatives-page">
      <header className="landing-header">
        <a className="landing-brand" href="/"><LampMark className="brand-lamp" />diyalamp</a>
        <a href="/#workspace">App screenshots</a>
      </header>
      <main className="comparison-main" aria-labelledby="comparison-heading">
        <div className="comparison-content">
          <h1 id="comparison-heading">Obsidian, Notion, and Typora alternatives for Mac</h1>
          <p>
            diyalamp is a lightweight Markdown editor for personal writing on macOS. Choose a folder
            and edit its UTF-8 <code>.md</code> or <code>.markdown</code> files in place. The desktop
            app is open source under Apache 2.0 and free forever, with no sign-up.
          </p>
          <nav className="comparison-actions" aria-label="Compare by app">
            <a href="#obsidian">Obsidian</a>
            <a href="#notion">Notion</a>
            <a href="#typora">Typora</a>
            <a href="#other-tools">Bear and Coda</a>
          </nav>

          <h2>Which app fits your writing?</h2>
          <div className="comparison-tools">
            <article id="obsidian" aria-labelledby="obsidian-heading">
              <h3 id="obsidian-heading">Obsidian</h3>
              <p>
                Both apps support local Markdown files and links between notes without sign-up. Obsidian offers
                community plugins and optional Sync and Publish services. diyalamp focuses on rendered writing
                with side-by-side notes, a per-note graph, and incoming and outgoing link lists.
              </p>
              <p>
                <strong>Bring your notes.</strong> Open a copy of your vault folder from File → Open folder in
                diyalamp. Try a few linked notes first, especially if they use syntax added by a plugin.
              </p>
              <p>
                <a href="https://obsidian.md/help/Files+and+folders/Manage+vaults">Obsidian vault guide</a>
                {' · '}
                <a href="https://obsidian.md/pricing">Obsidian plans</a>
                {' · '}
                <a href="https://community.obsidian.md/plugins">Obsidian plugins</a>
              </p>
            </article>
            <article id="notion" aria-labelledby="notion-heading">
              <h3 id="notion-heading">Notion</h3>
              <p>
                Notion uses an account to create or join a workspace for shared pages and databases.
                In diyalamp, open a folder on your Mac and use the formatted editor or slash commands
                to write straight to Markdown files.
              </p>
              <p>
                <strong>Bring your notes.</strong> In Notion, choose Export → Markdown &amp; CSV. Unzip the
                export and open the folder in diyalamp to edit the Markdown pages. Databases export as CSV,
                and callout blocks export as HTML. Keep the original export with your attachments.
              </p>
              <p>
                <a href="https://www.notion.com/help/create-delete-and-switch-workspaces">Notion workspace guide</a>
                {' · '}
                <a href="https://www.notion.com/help/export-your-content">Notion export guide</a>
              </p>
            </article>
            <article id="typora" aria-labelledby="typora-heading">
              <h3 id="typora-heading">Typora</h3>
              <p>
                Both editors render Markdown in the writing area. Typora uses a one-time paid license
                after its trial and renders tables, equations, and diagrams. diyalamp is free and includes
                tabs, split view, a local note graph, and a Pomodoro timer.
              </p>
              <p>
                <strong>Bring your notes.</strong> Open the folder containing your <code>.md</code> files.
                Documents that use extended Markdown syntax can look different across editors.
              </p>
              <p>
                <a href="https://typora.io/">Typora features</a>
                {' · '}
                <a href="https://support.typora.io/purchase/">Typora license</a>
              </p>
            </article>
          </div>

          <h2 id="other-tools">Bear and Coda</h2>
          <div className="comparison-tools">
            <article aria-labelledby="bear-heading">
              <h3 id="bear-heading">Bear</h3>
              <p>
                Bear organizes notes with tags across Mac, iPhone, and iPad. For a folder-based Mac workflow,
                export notes as Markdown from Bear and open that folder in diyalamp.
              </p>
              <p><a href="https://bear.app/faq/export-your-notes/">Bear export guide</a></p>
            </article>
            <article aria-labelledby="coda-heading">
              <h3 id="coda-heading">Coda</h3>
              <p>
                Coda combines collaborative documents and structured tables. diyalamp fits prose that
                belongs in Markdown files. Copy the text you want to bring and keep table data in Coda
                or export it separately as CSV.
              </p>
              <p><a href="https://help.coda.io/hc/en-us/articles/39555767136013-Overview-Export-data-from-Coda">Coda export guide</a></p>
            </article>
          </div>

          <h2>Get diyalamp for Mac</h2>
          <p>
            Version {desktopRelease.version} is available for Apple silicon and Intel Macs. The
            downloads are {(desktopRelease.appleSiliconBytes / 1e6).toFixed(1)} MB for Apple silicon and{' '}
            {(desktopRelease.intelBytes / 1e6).toFixed(1)} MB for Intel, including the runtime.
            macOS may ask you to approve the app on first launch.
          </p>
          <div className="comparison-actions">
            <a href="/#workspace">App screenshots</a>
            <a href={desktopRelease.url}>macOS downloads and checksums</a>
            <a href={desktopRelease.installation}>Installation guide</a>
            <a href={desktopRelease.source}>Star diyalamp on GitHub</a>
          </div>
        </div>
      </main>
      <footer className="landing-footer">
        <a href="/" className="landing-brand"><LampMark className="brand-lamp" />diyalamp</a>
        <p>A tool for the mind.</p>
        <a href="/llms.txt">Product facts</a>
      </footer>
    </div>
  );
}
