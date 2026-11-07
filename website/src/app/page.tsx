import {
  ArrowUpRightIcon, ChevronDownIcon, DownloadIcon, FileCheckIcon,
  GitForkIcon, MoonIcon, SearchIcon, SplitSquareHorizontalIcon, StarIcon,
} from "lucide-react";
import AppScreenshot from "@/components/app-screenshot";
import LampMark from "@/components/lamp-mark";
import SocialIcon from "@/components/social-icon";
import { desktopRelease } from "@/lib/desktop-release";
import { decimalMegabytes, downloadReduction } from "@/lib/mac-downloads";

const github = desktopRelease.source;
const appleSiliconSize = decimalMegabytes(desktopRelease.appleSiliconBytes);
const intelSize = decimalMegabytes(desktopRelease.intelBytes);

const comparisons = [
  {
    name: "Obsidian", id: "obsidian", title: "Keep your vault. Download less.",
    text: `Both edit your Markdown files without an account. The diyalamp Apple silicon DMG is ${downloadReduction.obsidian}% smaller than Obsidian’s universal DMG. Choose Obsidian for plugins or a vault-wide graph.`,
  },
  {
    name: "Notion", id: "notion", title: "Open a file. Skip the login.",
    text: `Write without signing into a workspace. The diyalamp Apple silicon DMG is ${downloadReduction.notion}% smaller than Notion’s Apple silicon DMG. Choose Notion for shared databases and live collaboration.`,
  },
  {
    name: "Typora", id: "typora", title: "Start writing without activation.",
    text: "Both format the Markdown files on your Mac. diyalamp stays free and activation-free after day one. Typora has a smaller installer and richer rendering for math, diagrams, and tables.",
  },
];

const workflow = [
  {
    icon: SearchIcon, title: "Find a passage across the folder.",
    text: "Search filenames or note text, including unsaved edits. Match with regex and file globs, then jump to the result.",
  },
  {
    icon: SplitSquareHorizontalIcon, title: "Keep your source in view.",
    text: "Drag a note into a second pane to write beside it. Reorder tabs or move a note to another folder.",
  },
  {
    icon: GitForkIcon, title: "See which notes refer to yours.",
    text: "Type [[Note name]]. The Connections panel shows links into and out of the active note, with a graph you can navigate.",
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
    answer: `Version ${desktopRelease.version} is ${desktopRelease.appleSiliconBytes.toLocaleString("en-US")} bytes (${appleSiliconSize} MB) for Apple silicon and ${desktopRelease.intelBytes.toLocaleString("en-US")} bytes (${intelSize} MB) for Intel. Both installers include the runtime. The app bundle takes more space after installation.`,
  },
  {
    question: "How do I install and update it?",
    answer: "Drag diyalamp from the DMG into Applications. The app is ad hoc signed without Apple notarization, so macOS may ask you to approve the first launch. Help → Check for updates lets you choose when to update. The app saves pending edits before installing.",
  },
];

export default function Home() {
  return (
    <div className="simple-site">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="landing-header">
        <a href="/" className="landing-brand"><LampMark className="brand-lamp" />diyalamp</a>
        <nav aria-label="Main navigation">
          <a href="#workspace">Screenshots</a>
          <a href="#features">Features</a>
          <a href="/alternatives/">Compare</a>
        </nav>
        <a className="site-button site-button-outline" href={github}><StarIcon aria-hidden="true" />Star on GitHub</a>
      </header>

      <main id="main-content">
        <section className="simple-hero" aria-labelledby="hero-heading">
          <div className="site-frame hero-layout">
            <div className="hero-copy">
              <p className="simple-kicker"><span className="status-dot" aria-hidden="true" />Markdown editor for macOS</p>
              <h1 id="hero-heading">Local Markdown.<br /> No account.</h1>
              <p className="simple-intro">Open a folder and start writing. diyalamp formats Markdown as you type, with split view and backlinks built in. Your notes stay in files you can open in any text editor.</p>
              <ul className="hero-promises" aria-label="Price, license, and account">
                <li>Free forever</li><li>Open source</li><li>No license activation</li>
              </ul>
              <div className="simple-actions">
                <a className="site-button site-button-primary" href="#download"><DownloadIcon aria-hidden="true" />Download for Mac</a>
                <a className="site-button site-button-outline" href={github}><StarIcon aria-hidden="true" />Star on GitHub</a>
              </div>
              <p className="hero-download-fact"><strong>{appleSiliconSize} MB</strong> Apple silicon download. <a href="/alternatives/#mac-downloads">Compare Mac installers</a></p>
            </div>
            <div className="hero-image" id="workspace">
              <AppScreenshot name="workspace" priority caption={`diyalamp ${desktopRelease.version} · Editor and Connections`} />
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
          </div>
        </section>

        <section id="features" aria-labelledby="feature-heading">
          <div className="site-frame">
            <p className="simple-kicker">Search · Split view · Backlinks</p>
            <h2 id="feature-heading" className="marketing-heading">Find sources while you write.</h2>
            <div className="workflow-layout">
              <AppScreenshot name="search" caption="Text search, a draft, and its reference open side by side" />
              <div className="workflow-details">
                {workflow.map(({ icon: Icon, title, text }) => (
                  <article key={title}>
                    <Icon aria-hidden="true" />
                    <div><h3>{title}</h3><p>{text}</p></div>
                  </article>
                ))}
              </div>
            </div>
            <div className="desktop-details">
              <article><MoonIcon aria-hidden="true" /><div><h3>Focus and Pomodoro</h3><p>Focus turns the workspace black and keeps the current line bright. Use the toolbar Pomodoro for one focus and break cycle or a repeating session.</p></div></article>
              <article><FileCheckIcon aria-hidden="true" /><div><h3>Protect edits from overwrites.</h3><p>Autosave checks for outside edits before writing. Rename notes in the sidebar and recover deleted notes from the app.</p></div></article>
            </div>
          </div>
        </section>

        <section id="download" aria-labelledby="download-heading">
          <div className="site-frame">
            <div className="simple-release-card">
              <div>
                <p className="simple-kicker"><span className="status-dot" aria-hidden="true" />Version {desktopRelease.version}</p>
                <h2 id="download-heading" className="marketing-heading">Open the folder you already use.</h2>
                <p>Choose your Mac’s installer, drag diyalamp into Applications, and open a folder of UTF-8 Markdown files. The runtime is included.</p>
              </div>
              <div className="simple-release-actions">
                <a className="site-button site-button-primary" href={desktopRelease.appleSilicon}><span>Apple silicon DMG · {appleSiliconSize} MB</span><DownloadIcon aria-hidden="true" /></a>
                <a className="site-button site-button-outline" href={desktopRelease.intel}><span>Intel Mac DMG · {intelSize} MB</span><DownloadIcon aria-hidden="true" /></a>
                <p>Ad hoc signed. macOS may require first-launch approval.</p>
                <div className="release-links">
                  <a href={desktopRelease.url}>Release notes and SHA-256</a>
                  <a href={desktopRelease.installation}>Install guide</a>
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
