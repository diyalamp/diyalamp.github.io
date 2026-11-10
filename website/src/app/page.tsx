import {
  ArrowUpRightIcon, ChevronDownIcon, DownloadIcon, FileCheckIcon,
  GitForkIcon, MoonIcon, SearchIcon, SplitSquareHorizontalIcon, StarIcon,
} from "lucide-react";
import AppScreenshot from "@/components/app-screenshot";
import LampMark from "@/components/lamp-mark";
import SiteFooter from "@/components/site-footer";
import { desktopRelease } from "@/lib/desktop-release";
import { decimalMegabytes } from "@/lib/mac-downloads";

const github = desktopRelease.source;

const comparisons = [
  {
    name: "Obsidian", id: "obsidian", title: "Open your vault folder.",
    text: "Both apps edit local Markdown without an account. diyalamp brings a per-note graph and a focus timer into the editor. Obsidian has plugins, Canvas, and a vault-wide graph.",
  },
  {
    name: "Notion", id: "notion", title: "Write in a folder on your Mac.",
    text: "Use slash commands and checklists while editing Markdown files directly. Notion offers shared pages, databases, and workspace permissions.",
  },
  {
    name: "Typora", id: "typora", title: "Add backlinks to your drafts.",
    text: "Both apps format Markdown as you write. diyalamp includes linked notes under a free, open-source license. Typora offers richer tables, equations, and diagrams.",
  },
];

const workflow = [
  {
    icon: SearchIcon, title: "Search the whole folder",
    text: "Find a filename or passage, including unsaved edits. Use regular expressions and path filters, then jump to the match.",
  },
  {
    icon: SplitSquareHorizontalIcon, title: "Write beside a reference",
    text: "Preview a PDF, image, or text file beside your note. Reopen the app to return to your last tabs and split layout.",
  },
  {
    icon: GitForkIcon, title: "Follow a note’s connections",
    text: "Type [[Note name]] to link to an existing note. See incoming and outgoing links in the Connections panel and navigate the local graph.",
  },
];

const featureCaptures = [
  {
    name: "connections-hover", title: "Connections graph", width: 824, height: 1616, crop: true,
    alt: "The Connections panel highlights the links and direction arrows for Composite Indexes.",
    instruction: "Open Connections for a note. Hover over a dot to see which notes link to it and where its links lead.",
  },
  {
    name: "pomodoro-controls", title: "Pomodoro timer", width: 660, height: 792,
    alt: "A running 25-minute focus timer with a five-minute break and Repeat selected.",
    instruction: "Open the timer in the toolbar. Set the focus and break lengths, then choose One cycle or Repeat.",
  },
  {
    name: "accent-palette", title: "Accent colors", width: 612, height: 372,
    alt: "The accent menu shows red, blue, yellow, green, white, and a custom color option.",
    instruction: "Open the color menu to pick a preset or set a custom accent for the dark workspace.",
  },
  {
    name: "workspace-search", title: "Advanced search", width: 768, height: 640,
    alt: "Note text search shows Case, Whole word, and Regex under Match, with File filters above the results.",
    instruction: "Choose Filenames or Note text, then refine matches by case, whole word, or regular expression. Use File filters to include or exclude paths.",
  },
  {
    name: "focus-active-line", title: "Focus mode", width: 1520, height: 620, wide: true,
    alt: "The current line remains bright while the surrounding heading and code are dimmed.",
    instruction: "Turn on Focus in the toolbar to keep the current line bright while the rest of the note fades.",
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
    question: "Which Mac installer should I choose?",
    answer: "Open About This Mac from the Apple menu. If you see Chip with an Apple chip name, choose Apple silicon. If you see an Intel processor, choose Intel. Both installers include the runtime.",
  },
  {
    question: "How do I install and update it?",
    answer: "Open the DMG and drag diyalamp into Applications. macOS may block first launch because the current installers are ad hoc signed. From the app, choose Help → Check for updates when you want to look for a newer release. The updater saves pending edits before installing.",
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

      <main id="main-content" tabIndex={-1}>
        <section className="simple-hero" aria-labelledby="hero-heading">
          <div className="site-frame hero-layout">
            <div className="hero-copy">
              <div>
                <p className="simple-kicker"><span className="status-dot" aria-hidden="true" />Local Markdown editor for macOS</p>
                <h1 id="hero-heading">Your commonplace book.</h1>
              </div>
              <div className="hero-summary">
                <p className="simple-intro">Collect what you read and learn in a folder of Markdown notes. Write with live formatting, search your notes, and follow connections between them.</p>
                <ul className="hero-promises" aria-label="Price, license, and account">
                  <li>Free</li><li>Open source</li><li>No sign-up</li>
                </ul>
                <div className="simple-actions">
                  <a className="site-button site-button-primary" href="#download"><DownloadIcon aria-hidden="true" />Download for Mac</a>
                  <a className="site-button site-button-outline" href={github}><StarIcon aria-hidden="true" />Star on GitHub</a>
                </div>
                <p className="hero-download-fact">
                  {desktopRelease.version} DMGs · {desktopRelease.downloads.map(({ label, bytes }) => `${label} ${decimalMegabytes(bytes)} MB`).join(' · ')}
                </p>
              </div>
            </div>
            <div className="hero-image" id="workspace">
              <AppScreenshot name="workspace" priority caption="Database Indexes with four incoming and five outgoing links" />
            </div>
          </div>
        </section>

        <section id="features" aria-labelledby="feature-heading">
          <div className="site-frame">
            <div className="section-heading">
              <div>
                <p className="simple-kicker">The writing workspace</p>
                <h2 id="feature-heading" className="marketing-heading">Keep your sources in view.</h2>
              </div>
              <a className="simple-text-link" href="/downloads/database-systems-demo.zip" download>
                <DownloadIcon aria-hidden="true" />Download the sample notes (ZIP)
              </a>
            </div>
            <div className="workflow-layout">
              <AppScreenshot name="search" caption="Find every match for index while keeping two notes open" />
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
              <article><MoonIcon aria-hidden="true" /><div><h3>Focus and Pomodoro</h3><p>Keep the active line bright and dim the workspace around it. Set a focus and break cycle or run the timer on repeat.</p></div></article>
              <article><FileCheckIcon aria-hidden="true" /><div><h3>File-safe editing</h3><p>Autosave checks for outside changes before writing. Rename notes in the sidebar and restore deleted notes from the app.</p></div></article>
            </div>
            <h3 className="feature-gallery-title">A closer look at the editor.</h3>
            <div className="feature-gallery">
              {featureCaptures.map(({ name, title, width, height, crop, wide, alt, instruction }) => {
                const src = `/screenshots/${name}.webp?v=${desktopRelease.version}`;
                return (
                  <figure key={name} className="feature-capture" data-wide={wide || undefined}>
                    <a className="feature-preview" data-crop={crop || undefined} href={src} aria-label={`View full-size screenshot. ${alt}`}>
                      <img src={src} width={width} height={height} alt={alt} loading="lazy" decoding="async" />
                    </a>
                    <figcaption><h4>{title}</h4><p>{instruction}</p></figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </section>

        <section id="compare" aria-labelledby="compare-heading">
          <div className="site-frame">
            <div className="section-heading">
              <div><p className="simple-kicker">Switching editors</p><h2 id="compare-heading" className="marketing-heading">Which editor fits your notes?</h2></div>
              <a className="simple-text-link" href="/alternatives/">Compare editors and import your notes<ArrowUpRightIcon aria-hidden="true" /></a>
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

        <section id="download" tabIndex={-1} aria-labelledby="download-heading">
          <div className="site-frame">
            <div className="simple-release-card">
              <div>
                <p className="simple-kicker"><span className="status-dot" aria-hidden="true" />Version {desktopRelease.version}</p>
                <h2 id="download-heading" className="marketing-heading">Download for Mac.</h2>
                <p>Open the DMG and drag diyalamp into Applications. Check About This Mac in the Apple menu to choose your installer. The runtime is included.</p>
              </div>
              <div className="simple-release-actions">
                {desktopRelease.downloads.map(({ architecture, label, url, bytes }) => (
                  <a key={architecture} className="site-button site-button-primary" href={url}>
                    <span><span className="sr-only">Download DMG for </span>{label} · {decimalMegabytes(bytes)} MB</span>
                    <DownloadIcon aria-hidden="true" />
                  </a>
                ))}
                <p>Ad hoc signed. macOS may block first launch.</p>
                <div className="release-links">
                  <a href={desktopRelease.url}>Release notes</a>
                  <a href={desktopRelease.installation}>Install guide</a>
                  {desktopRelease.downloads.map(({ architecture, label, checksum }) => (
                    <a key={architecture} href={checksum}>{label} SHA-256</a>
                  ))}
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
            <div><p className="simple-kicker">Open source · Apache 2.0</p><h2 id="support-heading" className="marketing-heading">Help more writers find diyalamp.</h2><p>Star the repository to bookmark the project. You can also try a keyboard or VoiceOver test and share what you find. <a href={`${github}/issues/1`}>Accessibility issue</a></p></div>
            <a className="site-button site-button-primary" href={github}><StarIcon aria-hidden="true" />Star on GitHub<ArrowUpRightIcon aria-hidden="true" /></a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
