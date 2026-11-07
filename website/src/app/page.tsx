import {
  ArrowUpRightIcon, ChevronDownIcon, DownloadIcon, FileCheckIcon,
  GitForkIcon, SearchIcon, StarIcon,
} from "lucide-react";
import AppScreenshot from "@/components/app-screenshot";
import LampMark from "@/components/lamp-mark";
import SocialIcon from "@/components/social-icon";
import { desktopRelease } from "@/lib/desktop-release";
import { decimalMegabytes, downloadReduction } from "@/lib/mac-downloads";

const github = desktopRelease.source;
const downloadSize = decimalMegabytes(desktopRelease.downloadBytes, 2);
const installedSize = decimalMegabytes(desktopRelease.installedBytes, 2);

const comparisons = [
  {
    name: "Obsidian", id: "obsidian", title: "Keep your vault. Download less.",
    text: `Both edit your Markdown files without an account. The diyalamp universal DMG is ${downloadReduction.obsidian}% smaller than Obsidian’s universal DMG. Choose Obsidian for plugins or a vault-wide graph.`,
  },
  {
    name: "Notion", id: "notion", title: "Open a file. Skip the login.",
    text: `Write without signing into a workspace. The diyalamp universal DMG is ${downloadReduction.notion}% smaller than Notion’s Apple silicon DMG. Choose Notion for shared databases and live collaboration.`,
  },
  {
    name: "Typora", id: "typora", title: "Start writing without activation.",
    text: `Both format the Markdown files on your Mac. The diyalamp universal DMG is ${downloadReduction.typora}% smaller than the compared Typora DMG. Typora offers richer rendering for math and diagrams.`,
  },
];

const workflow = [
  {
    icon: SearchIcon, title: "Find a passage across the folder.",
    text: "Search filenames or note text, including unsaved edits. Match with regex and file globs, then jump to the result.",
  },
  {
    icon: FileCheckIcon, title: "Keep your Markdown and edits.",
    text: "Write in the source or edit supported text in the rendered pane. If diyalamp closes unexpectedly, it can restore edits from its last checkpoint.",
  },
  {
    icon: GitForkIcon, title: "See which notes refer to yours.",
    text: "Click a wiki link to open a note, or use the Connections panel to follow links into and out of the active note.",
  },
];

const faqs = [
  {
    question: "How do I bring my notes?",
    answer: "Open the Markdown folder from Obsidian or Typora directly. For Notion, export Markdown & CSV and open the unzipped folder. The editor works with the Markdown pages. Database CSVs and attachments stay separate.",
  },
  {
    question: "Does writing require an account or internet connection?",
    answer: "No. After installation, you can edit offline. Notes are UTF-8 .md or .markdown files in the folder you select. The free desktop app is licensed under Apache 2.0.",
  },
  {
    question: "What size are the installers?",
    answer: `The universal Mac installer is ${desktopRelease.downloadBytes.toLocaleString("en-US")} bytes (${downloadSize} MB) and supports Apple silicon and Intel. The app bundle used ${installedSize} MB of space on the test Mac after installation.`,
  },
  {
    question: "How do I install it?",
    answer: `On macOS ${desktopRelease.minimumMacOS} or later, open the DMG and drag diyalamp into Applications. macOS may ask you to approve the first launch. Release notes describe the installation steps.`,
  },
];

export default function Home() {
  return (
    <div className="simple-site">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="landing-header">
        <a href="/" className="landing-brand"><LampMark className="brand-lamp" />diyalamp</a>
        <nav aria-label="Main navigation">
          <a href="#download">Download</a>
          <a href="#features">Features</a>
          <a href="/alternatives/">Compare</a>
        </nav>
        <a className="site-button site-button-outline" href={github}><StarIcon aria-hidden="true" />Star on GitHub</a>
      </header>

      <main id="main-content">
        <section className="simple-hero" aria-labelledby="hero-heading">
          <div className="site-frame hero-layout">
            <div className="hero-copy">
              <p className="simple-kicker"><span className="status-dot" aria-hidden="true" />Native Markdown editor for macOS</p>
              <h1 id="hero-heading">Local Markdown.<br /> {downloadSize} MB.</h1>
              <p className="simple-intro">Open a folder and start writing. Search your notes, follow backlinks, and keep your Markdown in files you can open in any text editor.</p>
              <ul className="hero-promises" aria-label="Price, license, and account">
                <li>Free forever</li><li>Open source</li><li>No account</li>
              </ul>
              <div className="simple-actions">
                <a className="site-button site-button-primary" href={desktopRelease.dmg}><DownloadIcon aria-hidden="true" />Download for Mac · {downloadSize} MB</a>
                <a className="site-button site-button-outline" href={github}><StarIcon aria-hidden="true" />Star on GitHub</a>
              </div>
              <p className="hero-download-fact"><strong>{installedSize} MB on disk</strong> · macOS {desktopRelease.minimumMacOS}+ · Apple silicon and Intel. <a href="/alternatives/#mac-downloads">Compare Mac installers</a></p>
            </div>
            <div className="hero-image" id="workspace">
              <AppScreenshot name="workspace" priority caption="Earlier diyalamp interface · Editor and Connections" />
            </div>
          </div>
        </section>

        <section id="compare" aria-labelledby="compare-heading">
          <div className="site-frame">
            <div className="section-heading">
              <div><p className="simple-kicker">Switching editors</p><h2 id="compare-heading" className="marketing-heading">How it compares on Mac.</h2></div>
              <a className="simple-text-link" href="/alternatives/">Compare download sizes and setup<ArrowUpRightIcon aria-hidden="true" /></a>
            </div>
            <div className="comparison-preview">
              {comparisons.map(({ name, id, title, text }) => (
                <article key={id}>
                  <a className="comparison-label" href={`/alternatives/#${id}`}>{name}<ArrowUpRightIcon aria-hidden="true" /></a>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
            <p className="hero-download-fact">
              <strong>{downloadSize} MB to download</strong> and <strong>{installedSize} MB on disk</strong>.{" "}
              <a href="/alternatives/#mac-downloads">See the measured sizes</a>
            </p>
          </div>
        </section>

        <section id="features" aria-labelledby="feature-heading">
          <div className="site-frame">
            <p className="simple-kicker">Search · Markdown editing · Backlinks</p>
            <h2 id="feature-heading" className="marketing-heading">Find sources while you write.</h2>
            <div className="workflow-layout">
              <AppScreenshot name="search" caption="Earlier diyalamp interface · Workspace search" />
              <div className="workflow-details">
                {workflow.map(({ icon: Icon, title, text }) => (
                  <article key={title}>
                    <Icon aria-hidden="true" />
                    <div><h3>{title}</h3><p>{text}</p></div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="download" aria-labelledby="download-heading">
          <div className="site-frame">
            <div className="simple-release-card">
              <div>
                <p className="simple-kicker"><span className="status-dot" aria-hidden="true" />Version {desktopRelease.version}</p>
                <h2 id="download-heading" className="marketing-heading">Download {downloadSize} MB. Start writing.</h2>
                <p>One installer for Apple silicon and Intel on macOS {desktopRelease.minimumMacOS} or later. Drag diyalamp into Applications, then open a folder of UTF-8 Markdown files.</p>
              </div>
              <div className="simple-release-actions">
                <a className="site-button site-button-primary" href={desktopRelease.dmg}><span>Universal Mac DMG · {downloadSize} MB</span><DownloadIcon aria-hidden="true" /></a>
                <p>{installedSize} MB on disk after installation. macOS may require first-launch approval.</p>
                <div className="release-links">
                  <a href={desktopRelease.url}>Release notes and install steps</a>
                  <a href={desktopRelease.checksum}>SHA-256 checksum</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="questions" aria-labelledby="questions-heading">
          <div className="site-frame simple-questions">
            <div><p className="simple-kicker">Files and installation</p><h2 id="questions-heading" className="marketing-heading">Before you switch.</h2></div>
            <div className="simple-faq">
              {faqs.map(({ question, answer }) => (
                <details key={question}><summary>{question}<ChevronDownIcon aria-hidden="true" /></summary><p>{answer}</p></details>
              ))}
            </div>
          </div>
        </section>

        <section className="simple-support" aria-labelledby="support-heading">
          <div className="site-frame support-layout">
            <div><p className="simple-kicker">Apache 2.0</p><h2 id="support-heading" className="marketing-heading">Help more Mac users find diyalamp.</h2><p>Star the repository to save it and support the open-source project.</p></div>
            <a className="site-button site-button-primary" href={github}><StarIcon aria-hidden="true" />Star on GitHub<ArrowUpRightIcon aria-hidden="true" /></a>
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
        <span className="production-credit">A <a href="https://jrxna.com" aria-label="JRXNA"><img src="/jrxna-logo.png" alt="JRXNA" width="74" height="18" loading="lazy" /></a> production.</span>
      </footer>
    </div>
  );
}
