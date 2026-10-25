"use client";

// Adapted from Velora UI's complete SaaS template, MIT licensed.
import { useRef } from "react";
import { ArrowUpRightIcon, BookOpenIcon, CheckIcon, CodeIcon, DatabaseIcon, DownloadIcon, FileTextIcon, GitBranchIcon, LockKeyholeIcon, PanelLeftIcon, PenLineIcon, SearchIcon, SparklesIcon, SplitIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AmbientBackdrop from "@/components/ambient-backdrop";
import { DotPattern } from "@/components/velora/grid-pattern";
import { BlurFade } from "@/components/velora/blur-fade";
import { BentoCard, BentoGrid } from "@/components/velora/bento-grid";
import { BorderBeam } from "@/components/velora/border-beam";
import { AnimatedList } from "@/components/velora/animated-list";
import { AnimatedBeam } from "@/components/velora/animated-beam";
import { ScrollProgress } from "@/components/velora/scroll-progress";
import { SpotlightCard } from "@/components/velora/spotlight-card";
import { AnimatedGradientText } from "@/components/velora/animated-gradient-text";
import DeferredWorkspace from "@/components/deferred-workspace";
import LampMark from "@/components/lamp-mark";
import SocialIcon from "@/components/social-icon";

const github = "https://github.com/diyalamp/diyalamp";
function openWorkspace() {
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  document.getElementById("workspace")?.scrollIntoView({ behavior, block: "start" });
}
const faqs = [
  {q:"Looking for an alternative to Obsidian, Typora, Bear, Notion, or Coda?",a:"diyalamp takes a focused direction: Markdown writing, side-by-side notes, and files you can export. Try the free browser workspace today. The open-source Java desktop app for macOS is in development; cloud storage, publication, and retrieval are on the roadmap."},
  { q: "What can I try today?", a: "The workspace on this page is a working browser preview. Create and edit Markdown notes, open two notes side by side, and export your writing. The Java desktop app for macOS is in development." },
  { q: "Do I need an account?", a: "No account is needed for this browser workspace. It keeps notes in this browser, without sending them to a diyalamp server. Export anything you want to keep: browser storage can be cleared." },
  { q: "Is diyalamp open source?", a: "Yes. The Java project is available under Apache 2.0. Read the source, follow development, or contribute. The repository also contains earlier work, rather than a finished desktop Markdown app." },
  { q: "Can it publish to Substack or store my notes in a database?", a: "Those are planned connections. The direction is optional publishing to Substack and storage in your own CockroachDB Cloud account. Neither is connected in this preview. A retrieval engine for your notes is a future direction." },
];

function FileCard({ name, children, className = "" }: { name: string; children: React.ReactNode; className?: string }) {
  return <div className={`note-visual ${className}`}><div className="note-visual-bar"><FileTextIcon size={15} /><span>{name}</span><span className="ml-auto size-1.5 rounded-full bg-primary" /></div><div className="note-visual-body">{children}</div></div>;
}

function ThoughtConnections() {
  const container = useRef<HTMLDivElement>(null);
  const center = useRef<HTMLDivElement>(null);
  const first = useRef<HTMLDivElement>(null);
  const second = useRef<HTMLDivElement>(null);
  const third = useRef<HTMLDivElement>(null);
  const fourth = useRef<HTMLDivElement>(null);
  return <div ref={container} className="connection-visual relative flex h-96 items-center justify-between gap-6 px-3 sm:px-9" aria-label="An illustration of different notes connected through a writing workspace">
    <div className="flex h-full flex-col justify-around"><div ref={first} className="connection-node"><span>Reading</span><BookOpenIcon /></div><div ref={second} className="connection-node"><span>Questions</span><PenLineIcon /></div></div>
    <div ref={center} className="connection-center"><LampMark className="connection-lamp" /><span>diyalamp</span></div>
    <div className="flex h-full flex-col justify-around"><div ref={third} className="connection-node"><span>Writing</span><FileTextIcon /></div><div ref={fourth} className="connection-node"><span>Ideas</span><GitBranchIcon /></div></div>
    <AnimatedBeam containerRef={container} fromRef={first} toRef={center} curvature={-55} />
    <AnimatedBeam containerRef={container} fromRef={second} toRef={center} curvature={55} delay={1} />
    <AnimatedBeam containerRef={container} fromRef={center} toRef={third} curvature={-55} delay={.5} />
    <AnimatedBeam containerRef={container} fromRef={center} toRef={fourth} curvature={55} delay={1.5} />
  </div>;
}

export default function Home() {
  return <main className="relative isolate">
    <AmbientBackdrop />
    <ScrollProgress />
    <header className="landing-header"><a href="#" className="landing-brand"><LampMark className="brand-lamp" />diyalamp</a><nav aria-label="Main navigation"><a href="#features">Features</a><a href="#workspace">Workspace</a><a href="#roadmap">What&apos;s next</a></nav><Button variant="secondary" size="lg" asChild><a href={github} aria-label="View diyalamp Java source on GitHub" target="_blank" rel="noreferrer">GitHub <ArrowUpRightIcon size={16} /></a></Button></header>

    {/* The complete template's animated hero and product stage. */}
    <section className="relative overflow-hidden pt-28 pb-12 lg:pt-32 lg:pb-12">
      <div className="relative mx-auto max-w-6xl px-6 text-center lg:px-6">
        <BlurFade delay={0} direction="down"><span className="label-tag">A tool for the mind <SparklesIcon className="size-4" /></span></BlurFade>
        <h1 className="hero-title mx-auto mt-6 max-w-5xl text-balance">An open-source writing app <AnimatedGradientText>for macOS.</AnimatedGradientText></h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-pretty">A little light for your next thought. A focused Markdown workspace, with a clean page, familiar files, and room to think side by side.</p>
        <BlurFade delay={.35}><div className="mt-9 flex flex-wrap items-center justify-center gap-3"><Button size="lg" onClick={openWorkspace}>Try the workspace <PenLineIcon className="size-4" /></Button><Button variant="secondary" size="lg" asChild><a href={github} target="_blank" rel="noreferrer">Explore the source <ArrowUpRightIcon className="size-4" /></a></Button></div></BlurFade>
        <p className="mt-6 text-xs text-muted-foreground">Java desktop app in development. Working browser preview below.</p>
        <BlurFade delay={.45}><ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">{["Markdown only", "No sign-up", "Open source"].map(fact => <li key={fact} className="flex items-center gap-3">{fact}<CheckIcon className="size-4 text-primary" /></li>)}</ul></BlurFade>
        <div id="workspace" className="workspace-section mt-9 scroll-mt-24 text-left lg:mt-9"><BlurFade delay={.5} offset={32}><DeferredWorkspace /></BlurFade><div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground"><span>A real workspace. Open a note, edit a line, try a split view.</span><span className="inline-flex items-center gap-3">No account needed<LockKeyholeIcon className="size-3.5" /></span></div></div>
      </div>
    </section>

    {/* A truthful product-principles strip replaces the template's company logos. */}
    <section className="border-y border-border/60 py-9"><div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 text-sm text-muted-foreground md:grid-cols-4 lg:px-6">{[[FileTextIcon,"Plain Markdown"],[SplitIcon,"Side-by-side thinking"],[PanelLeftIcon,"A little less clutter"],[CodeIcon,"Built in the open"]].map(([Icon,label]) => { const I = Icon as typeof FileTextIcon; return <div key={String(label)} className="flex items-center justify-center gap-3">{String(label)}<I className="size-5 text-primary" /></div>; })}</div></section>

    {/* Velora's bento composition, now filled with writing-specific product scenes. */}
    <section id="features" className="relative scroll-mt-16 py-9 lg:py-9"><div className="mx-auto max-w-6xl px-6 lg:px-6"><BlurFade><h2 className="mx-auto max-w-2xl text-center text-3xl text-balance lg:text-5xl">Everything a thought needs.<br /><span className="text-primary">Nothing to get in its way.</span></h2><p className="mx-auto mt-6 max-w-xl text-center text-muted-foreground">Catch a question. Stay with a sentence. Keep what you&apos;re reading beside what you&apos;re writing.</p></BlurFade><BlurFade delay={.15}><BentoGrid className="mt-9">
      <BentoCard name="A clean page" description="Markdown gives your words structure. Focus gives them somewhere to go." className="md:col-span-2" background={<div className="absolute inset-x-8 top-6"><FileCard name="a-little-clarity.md"><p className="text-2xl">Begin with one good question.</p><p className="mt-3 text-sm text-muted-foreground">What if making space is where the work begins?</p><div className="mt-6 h-2 w-3/4 rounded bg-muted" /><div className="mt-3 h-2 w-1/2 rounded bg-muted" /></FileCard><BorderBeam size={72} duration={7} /></div>} />
      <BentoCard name="Familiar files" description="Clear names. Visible .md extensions. A place for each train of thought." background={<div className="absolute inset-x-6 top-8 space-y-3">{["reading.md","questions.md","thinking.md"].map((file,i)=><div key={file} className={`familiar-note flex items-center gap-3 rounded-lg border p-3 text-sm ${i===1?'border-primary/30 bg-primary/10':'bg-card'}`}><FileTextIcon className="size-4 text-primary" />{file}</div>)}</div>} />
      <BentoCard name="Two notes. One train of thought." description="Keep a source close while you work through your own understanding." className="md:col-span-2" background={<div className="absolute inset-x-6 top-6 grid grid-cols-2 gap-3"><FileCard name="reading.md"><p className="text-xl">A useful idea.</p><p className="mt-3 text-xs text-muted-foreground">A small observation can open a much larger question.</p></FileCard><FileCard name="thinking.md"><p className="text-xl">My own words.</p><p className="mt-3 text-xs text-muted-foreground">Explain it simply. Find the part worth following.</p></FileCard></div>} />
      <BentoCard name="Writing that stays yours" description="Export your Markdown. Keep a copy. Take your ideas with you." background={<div className="absolute inset-0 flex items-center justify-center pb-20"><DotPattern className="[mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" /><div className="relative rounded-2xl border border-primary/30 bg-primary/10 p-6"><DownloadIcon className="size-14 text-primary" /></div></div>} />
    </BentoGrid></BlurFade></div></section>

    {/* The upstream integration-beam section becomes a visual model of connected thinking. */}
    <section className="relative py-9 lg:py-9"><div className="mx-auto grid max-w-6xl items-center gap-6 px-6 lg:grid-cols-2 lg:gap-9 lg:px-6"><BlurFade direction="right"><div><span className="text-sm text-primary">From reading to understanding</span><h2 className="mt-3 text-3xl text-balance lg:text-5xl">Your best ideas<br />rarely arrive alone.</h2><p className="mt-6 text-muted-foreground">A passage becomes a question. A question becomes a note. Put them beside each other, and something starts to click.</p><ul className="mt-6 space-y-3 text-sm">{["Keep the source in sight","Make room for your own words","Follow one thought into the next"].map(item=><li key={item} className="flex items-center gap-3">{item}<CheckIcon className="size-4 text-primary" /></li>)}</ul></div></BlurFade><BlurFade direction="left" delay={.15}><ThoughtConnections /></BlurFade></div></section>

    {/* The template's alternating activity scene, adapted to the writing process. */}
    <section className="relative overflow-hidden py-9 lg:py-9"><div className="relative mx-auto grid max-w-6xl items-center gap-6 px-6 lg:grid-cols-2 lg:gap-9 lg:px-6"><BlurFade direction="right" className="order-2 lg:order-1"><div className="activity-stage h-80 overflow-hidden rounded-2xl border bg-card/80 p-6 backdrop-blur"><AnimatedList delay={2200}>{[{name:"A question worth keeping",file:"questions.md",icon:PenLineIcon},{name:"A paragraph in your own words",file:"understanding.md",icon:FileTextIcon},{name:"An idea you want to revisit",file:"ideas.md",icon:BookOpenIcon},{name:"A thought, a little clearer",file:"a-little-clarity.md",icon:SparklesIcon}].map(item=><div key={item.file} className="activity-note flex items-center gap-3 rounded-xl border bg-card p-6"><span className="rounded-xl bg-primary/10 p-3"><item.icon className="size-5 text-primary" /></span><div><p className="text-sm">{item.name}</p><p className="mt-3 text-xs text-muted-foreground">{item.file}</p></div></div>)}</AnimatedList></div></BlurFade><BlurFade direction="left" delay={.15} className="order-1 lg:order-2"><div><span className="text-sm text-primary">A small daily practice</span><h2 className="mt-3 text-3xl lg:text-5xl">Less to manage.<br /><span className="text-primary">More to discover.</span></h2><p className="mt-6 text-muted-foreground">You don&apos;t need a dashboard for every part of your life. Sometimes you need a calm page and enough time to find the sentence.</p><p className="mt-6 text-muted-foreground">diyalamp is a tool for the mind. It lights the path forward.</p><a href="#workspace" className="mt-6 inline-flex items-center gap-3 text-sm text-primary">Make a little space <ArrowUpRightIcon className="size-4" /></a></div></BlurFade></div></section>

    {/* Spotlight section retains upstream interaction, with truthful roadmap copy. */}
    <section id="roadmap" className="relative scroll-mt-20 py-9 lg:py-9"><div className="mx-auto max-w-6xl px-6 lg:px-6"><BlurFade><div className="mb-9 max-w-2xl"><span className="text-sm text-primary">Where we&apos;re going</span><h2 className="mt-3 text-3xl lg:text-5xl">A small app.<br />A thoughtful direction.</h2><p className="mt-6 text-muted-foreground">Keep the writing simple. Make the next steps useful. These connections are planned, separate from today&apos;s browser preview.</p></div></BlurFade><div className="grid gap-6 md:grid-cols-3">{[{icon:PenLineIcon,status:"Planned",title:"From note to publication",body:"A direct path to Substack, so finishing a piece and sharing it can become part of the same flow."},{icon:DatabaseIcon,status:"Planned · optional",title:"Your writing. Your database.",body:"Storage in your own CockroachDB Cloud account, with access and control that stay with you."},{icon:SearchIcon,status:"Future direction",title:"Find the thought behind the words",body:"An open-source retrieval engine using embeddings to explore the connections across your study notes."}].map((card,i)=><BlurFade key={card.title} delay={i*.12}><SpotlightCard className="h-full p-6"><div className="mb-6 flex items-center justify-between gap-3"><span className="rounded-xl bg-primary/10 p-3 text-primary"><card.icon className="size-6" /></span><span className="text-xs text-muted-foreground">{card.status}</span></div><h3 className="text-xl">{card.title}</h3><p className="mt-3 text-sm text-muted-foreground">{card.body}</p></SpotlightCard></BlurFade>)}</div></div></section>

    <section className="border-y border-border/50 py-9 lg:py-9"><div className="mx-auto grid max-w-6xl gap-6 px-6 lg:grid-cols-2 lg:px-6"><BlurFade><span className="text-sm text-primary">Open source. Open possibilities.</span><h2 className="mt-3 text-3xl lg:text-5xl">A tool you can<br />make your own.</h2></BlurFade><BlurFade delay={.1}><p className="text-muted-foreground">The Java desktop direction is being built in the open. Read the decisions, explore the code, or help shape a quieter way to write.</p><div className="my-6 flex flex-wrap gap-3">{["Java","macOS direction","Apache 2.0","Markdown"].map(tag=><span key={tag} className="label-tag">{tag}</span>)}</div><Button asChild size="lg"><a href={github} target="_blank" rel="noreferrer">Explore on GitHub <ArrowUpRightIcon className="size-4" /></a></Button></BlurFade></div></section>

    <section id="questions" className="py-9 lg:py-9"><div className="mx-auto max-w-3xl px-6 lg:px-6"><BlurFade><h2 className="text-center text-3xl lg:text-5xl">A few useful details.</h2></BlurFade><Accordion type="single" collapsible className="mt-6">{faqs.map((faq,i)=><AccordionItem key={faq.q} value={`question-${i}`}><AccordionTrigger className="py-3 text-left text-base">{faq.q}</AccordionTrigger><AccordionContent className="text-sm leading-7 text-muted-foreground">{faq.a}</AccordionContent></AccordionItem>)}</Accordion></div></section>

    {/* Upstream closing CTA composition, without a signup or fabricated offer. */}
    <section className="closing-section relative py-9 lg:py-9"><div className="relative mx-auto max-w-3xl px-6 text-center"><BlurFade><LampMark className="closing-lamp" /><h2 className="mt-3 text-4xl lg:text-5xl">The next thought starts<br />with a little light.</h2><p className="mx-auto mt-3 max-w-lg text-muted-foreground">Open a note. Follow a question. See where it leads.</p><div className="mt-6 flex justify-center"><Button size="lg" onClick={openWorkspace}>Start writing <ArrowUpRightIcon className="size-4" /></Button></div></BlurFade></div></section>
    <div className="comparison-link"><a href="/alternatives/">Compare Markdown and note-taking tools <ArrowUpRightIcon aria-hidden className="size-4" /></a></div><footer className="landing-footer"><a href="#" className="landing-brand"><LampMark className="brand-lamp" />diyalamp</a><p>A tool for the mind.</p><nav className="footer-socials" aria-label="diyalamp social accounts"><a href="https://github.com/diyalamp" aria-label="diyalamp GitHub organization" target="_blank" rel="noopener noreferrer">GitHub <SocialIcon name="github" /></a><a href="https://bsky.app/profile/diyalamp.com" target="_blank" rel="noopener noreferrer">Bluesky <SocialIcon name="bluesky" /></a><a href="https://www.reddit.com/r/DiyaLamp/" target="_blank" rel="noopener noreferrer">Reddit <SocialIcon name="reddit" /></a></nav><span>Keep on keeping on.</span></footer>
  </main>;
}
