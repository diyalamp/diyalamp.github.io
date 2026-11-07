import {
  ArrowUpRightIcon, ChevronDownIcon, DownloadIcon,
  FileTextIcon, GitForkIcon, MoonIcon, SearchIcon, SplitSquareHorizontalIcon,
  StarIcon, TimerIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import LampMark from "@/components/lamp-mark";
import SocialIcon from "@/components/social-icon";
import { desktopRelease } from "@/lib/desktop-release";

const github = desktopRelease.source;
const appleSiliconSize = (desktopRelease.appleSiliconBytes / 1e6).toFixed(1);
const intelSize = (desktopRelease.intelBytes / 1e6).toFixed(1);

const features = [
  {
    icon: FileTextIcon, title: "Rendered Markdown",
    description: "Write with rendered headings, checklists, quotes, and code. Type / to insert a block. Every note stays an ordinary Markdown file in your Mac folder.",
  },
  {
    icon: SearchIcon, title: "Filename and full-text search",
    description: "Search filenames or note text, including unsaved edits. Narrow the results with regex, whole words, case matching, or file filters.",
  },
  {
    icon: GitForkIcon, title: "Wikilinks and backlinks",
    description: "Link notes with [[wiki links]]. Follow incoming and outgoing links in the Connections sidebar and open related notes from the graph.",
  },
  {
    icon: SplitSquareHorizontalIcon, title: "Tabs, split view, and file actions",
    description: "Reorder tabs, drag a note into split view, or move it to another folder. Rename files inline and recover deleted notes from the app.",
  },
  {
    icon: MoonIcon, title: "Caret-line Focus",
    description: "Switch the workspace from charcoal to black. The line at your cursor stays bright while surrounding text and controls dim.",
  },
  {
    icon: TimerIcon, title: "Pomodoro timer",
    description: "Set your own focus and break lengths. The Pomodoro countdown stays in the toolbar, with controls for one cycle or continuous repeat.",
  },
];

const faqs = [
  {
    question: "Can I use diyalamp instead of Obsidian, Notion, or Typora?",
    answer: "Open the Markdown files in an Obsidian vault, extract Markdown exported from Notion, or reuse the same files you edit in Typora. See the comparison for differences in plugins, databases, and formatting.",
  },
  {
    question: "Is diyalamp free, and do I need an account?",
    answer: "The macOS app is free forever and open source under Apache 2.0. Open a folder and start writing. There’s no sign-up, subscription, or server required to edit your notes.",
  },
  {
    question: "How large is the download?",
    answer: `Version ${desktopRelease.version} is ${desktopRelease.appleSiliconBytes.toLocaleString("en-US")} bytes (${appleSiliconSize} MB) for Apple silicon and ${desktopRelease.intelBytes.toLocaleString("en-US")} bytes (${intelSize} MB) for Intel. Both downloads include the runtime. The app bundle occupies more space after installation.`,
  },
  {
    question: "How do I install and update it?",
    answer: "Choose the DMG for your Mac and drag diyalamp into Applications. The app is ad hoc signed without Apple notarization, so macOS may ask you to approve the first launch. For updates, choose Help → Check for updates. Pending edits are saved before an update can install.",
  },
  {
    question: "How can I support the project?",
    answer: "Star diyalamp on GitHub to save the project and help people discover it. Bug reports with fictional sample notes and feedback on accessibility are welcome.",
  },
];

export default function Home() {
  return (
    <div className="simple-site">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="landing-header">
        <a href="/" className="landing-brand"><LampMark className="brand-lamp" />diyalamp</a>
        <nav aria-label="Main navigation">
          <a href="#features">Features</a>
          <a href="#workspace">Screenshots</a>
          <a href="/alternatives/">Compare</a>
        </nav>
        <Button variant="outline" className="header-star" asChild>
          <a href={github}><StarIcon aria-hidden="true" />Star on GitHub</a>
        </Button>
      </header>

      <main id="main-content">
        <section className="simple-hero" aria-labelledby="hero-heading">
          <div className="site-frame hero-layout">
            <div>
              <p className="simple-kicker"><span className="status-dot" aria-hidden="true" />Free forever · Open source</p>
              <h1 id="hero-heading">Free Markdown<br className="hero-break" /> editor for Mac.</h1>
              <p className="simple-intro">Open a Markdown folder and edit the files in place. Get live formatting, regex search, and a per-note link graph without an account. An alternative to Obsidian, Notion, and Typora.</p>
              <div className="simple-actions">
                <Button asChild><a href="#download"><DownloadIcon aria-hidden="true" />Download for Mac</a></Button>
                <Button variant="outline" asChild><a href={github}><StarIcon aria-hidden="true" />Star on GitHub</a></Button>
              </div>
            </div>
            <dl className="hero-spec">
              <div><dt>UTF-8 Markdown</dt><dd><code>.md</code> and <code>.markdown</code></dd></div>
              <div><dt>Desktop builds</dt><dd>Apple silicon and Intel</dd></div>
              <div><dt>Apple silicon DMG</dt><dd>{appleSiliconSize} MB</dd></div>
              <div><dt>License</dt><dd><a href={`${github}/blob/main/LICENSE`}>Apache 2.0<ArrowUpRightIcon aria-hidden="true" /></a></dd></div>
            </dl>
          </div>
        </section>

        <section id="workspace" className="simple-workspace" aria-labelledby="workspace-heading">
          <div className="site-frame">
            <div className="demo-heading">
              <div><p className="simple-kicker">Version {desktopRelease.version}</p><h2 id="workspace-heading" className="marketing-heading">The macOS app.</h2></div>
              <p>Screenshots from diyalamp with sample notes.</p>
            </div>
            <div className="app-screens">
              <figure>
                <a href="/screenshots/workspace.webp" aria-label="View full-size workspace screenshot">
                  <img src="/screenshots/workspace.webp" width="1440" height="900" alt="DiyaLamp shows files and tabs around a rendered Markdown note, with a graph and incoming and outgoing links on the right." decoding="async" />
                </a>
                <figcaption>Rendered Markdown and a graph of links to and from the active note.</figcaption>
              </figure>
              <figure>
                <a href="/screenshots/search-and-split.webp" aria-label="View full-size search and split screenshot">
                  <img src="/screenshots/search-and-split.webp" width="1440" height="900" alt="DiyaLamp finds matching text in the left sidebar and shows a draft and reference in two editor panes." loading="lazy" decoding="async" />
                </a>
                <figcaption>Full-text search beside two editable notes in split view.</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section id="features" aria-labelledby="feature-heading">
          <div className="site-frame">
            <p className="simple-kicker">The Mac app</p>
            <h2 id="feature-heading" className="marketing-heading">Desktop features.</h2>
            <p className="section-intro">Open an existing folder and edit offline. The app reads and writes UTF-8 Markdown files directly.</p>
            <div className="simple-feature-grid">
              {features.map(({ icon: Icon, title, description }) => (
                <article className="simple-feature-card" key={title}>
                  <Icon aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
            <a className="simple-text-link" href="/alternatives/">Compare with Obsidian, Notion, and Typora<ArrowUpRightIcon aria-hidden="true" /></a>
          </div>
        </section>

        <section id="download" aria-labelledby="download-heading">
          <div className="site-frame">
            <div className="simple-release-card">
              <div>
                <p className="simple-kicker"><span className="status-dot" aria-hidden="true" />macOS · Version {desktopRelease.version}</p>
                <h2 id="download-heading" className="marketing-heading">Download for Mac.</h2>
                <p>Choose the installer for your Mac. Both include everything the app needs to run.</p>
              </div>
              <div className="simple-release-actions">
                <Button asChild><a href={desktopRelease.appleSilicon}><span>Apple silicon DMG · {appleSiliconSize} MB</span><DownloadIcon aria-hidden="true" /></a></Button>
                <Button variant="outline" asChild><a href={desktopRelease.intel}><span>Intel Mac DMG · {intelSize} MB</span><DownloadIcon aria-hidden="true" /></a></Button>
                <p>Ad hoc signed. macOS may require first-launch approval.</p>
                <div className="release-links">
                  <a href={desktopRelease.url}>Release notes and checksums</a>
                  <a href={desktopRelease.installation}>Install guide</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="questions" aria-labelledby="questions-heading">
          <div className="site-frame simple-questions">
            <div>
              <p className="simple-kicker">FAQ</p>
              <h2 id="questions-heading" className="marketing-heading">Before you install.</h2>
            </div>
            <div className="simple-faq">
              {faqs.map(({ question, answer }) => (
                <details key={question}>
                  <summary>{question}<ChevronDownIcon aria-hidden="true" /></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="simple-support" aria-labelledby="support-heading">
          <div className="site-frame support-layout">
            <div><p className="simple-kicker">Built in the open</p><h2 id="support-heading" className="marketing-heading">Star diyalamp on GitHub.</h2><p>Save it for later and help more Mac users find it.</p></div>
            <Button asChild><a href={github}><StarIcon aria-hidden="true" />Star on GitHub<ArrowUpRightIcon aria-hidden="true" /></a></Button>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <a href="/" className="landing-brand"><LampMark className="brand-lamp" />diyalamp</a>
        <nav className="footer-socials" aria-label="diyalamp social accounts">
          <a href={github}>GitHub<SocialIcon name="github" /></a>
          <a href="https://bsky.app/profile/diyalamp.com">Bluesky<SocialIcon name="bluesky" /></a>
          <a href="https://www.reddit.com/r/DiyaLamp/">Reddit<SocialIcon name="reddit" /></a>
        </nav>
        <span className="production-credit">A <a href="https://jrxna.com" aria-label="JRXNA"><img src="/jrxna-logo.png" alt="JRXNA" width="74" height="18" /></a> production.</span>
      </footer>
    </div>
  );
}
