"use client";

import { createElement, useEffect, useRef, useState, type ReactNode } from "react";
import { FileText, Plus, Columns2, Maximize2, Minimize2, PenLine, BookOpen, Download, RotateCcw, ChevronDown, FolderOpen, CheckSquare, Square, Circle } from "lucide-react";
import LampMark from "@/components/lamp-mark";
import { Button } from "@/components/ui/button";
import "./workspace-demo.css";

type Note = { id: string; name: string; body: string };
const storageKey = "diyalamp-writing-preview-v1";
const noteLimit = 30;
const characterLimit = 60000;
const serializedLimit = 12000000;
const examples: Note[] = [
  { id: "welcome", name: "welcome.md", body: "# A little room to think\n\nSome ideas need a quieter place to begin. A page, a question, and enough room to follow it.\n\n> Write to understand. Keep what you discover.\n\n## Make yourself at home\n\n- Open a note from the sidebar.\n- Try **Split view** to keep two ideas in sight.\n- Choose **Edit Markdown** and make this page yours.\n\n## The small things matter\n\n- [x] Plain Markdown files\n- [x] A space without an account\n- [ ] One thought worth returning to\n\nYour edits in this website preview stay in this browser. Export a note to keep a `.md` copy.\n\n---\n\nA tool for the mind. A little light for the path ahead." },
  { id: "thinking", name: "thinking.md", body: "# Notes beside thoughts\n\nReading and writing rarely happen in a straight line. Keep a source on one side and your own reasoning on the other.\n\n## A useful question\n\nWhat can I explain after I close the book?\n\n1. Start with one clear claim.\n2. Find the assumptions behind it.\n3. Try a case where it might fail.\n\n> Understanding becomes useful when you can work with it.\n\n## Next time\n\n- [ ] Return to the difficult paragraph\n- [ ] Write a smaller example\n- [ ] Connect it to another note" },
  { id: "reading", name: "reading-list.md", body: "# The reading shelf\n\nNot everything needs to be finished today. Some questions are better kept open.\n\n## In progress\n\n- Distributed systems and the cost of coordination\n- The history of tools for thinking\n- How a good explanation changes what we notice\n\n## A note to myself\n\n**Collect questions, not just quotations.**\n\nA reading list is useful when it helps you return to an idea, not when it becomes another inbox.\n\n---\n\nThis is a sample note. Edit it, replace it, or add a page of your own." },
  { id: "ideas", name: "small-ideas.md", body: "# Small ideas\n\nA place for the sentence that has not found its essay yet.\n\n## Things to make\n\n- A tiny experiment that explains one difficult idea\n- An essay about the tools we choose\n- A better question than the one I started with\n\n## A working rule\n\nKeep the format simple enough that the idea remains the interesting part.\n\n`Markdown` is a useful common language: readable as text, portable as a file.\n\n> Leave a little space for what you have not noticed yet." },
];
const freshExamples = () => examples.map(note => ({ ...note }));

function validNotes(value: unknown): value is Note[] {
  return Array.isArray(value) && value.length > 0 && value.length <= noteLimit &&
    value.every(note => note && typeof note.id === "string" && /^[\w-]{1,80}$/.test(note.id) &&
      typeof note.name === "string" && note.name.length <= 100 && note.name.endsWith(".md") &&
      typeof note.body === "string" && note.body.length <= characterLimit) &&
    new Set(value.map(note => note.id)).size === value.length;
}

// React text nodes escape source markup. Links are restricted to ordinary web/mail protocols.
function inline(source: string): ReactNode[] {
  const pattern = /(`[^`\n]+`|\*\*[^*\n]+\*\*|\*[^*\n]+\*|\[[^\]\n]+\]\([^\s)]+\))/g;
  const output: ReactNode[] = [];
  let offset = 0;
  for (const match of source.matchAll(pattern)) {
    output.push(source.slice(offset, match.index));
    const token = match[0];
    const key = `${match.index}-${output.length}`;
    if (token.startsWith("`")) output.push(<code key={key}>{token.slice(1, -1)}</code>);
    else if (token.startsWith("**")) output.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    else if (token.startsWith("*")) output.push(<em key={key}>{token.slice(1, -1)}</em>);
    else {
      const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
      let url: URL | undefined;
      try { if (link) url = new URL(link[2], "https://diyalamp.com/"); } catch { /* Render literally. */ }
      output.push(url && ["https:", "http:", "mailto:"].includes(url.protocol)
        ? <a key={key} href={url.href} target="_blank" rel="noopener noreferrer">{link?.[1]}</a> : token);
    }
    offset = match.index + token.length;
  }
  output.push(source.slice(offset));
  return output;
}

function Markdown({ source }: { source: string }) {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const key = i;
    if (!line.trim()) { i++; continue; }
    if (/^\s*```/.test(line)) {
      const content: string[] = []; i++;
      while (i < lines.length && !/^\s*```/.test(lines[i])) content.push(lines[i++]);
      if (i < lines.length) i++;
      blocks.push(<pre key={key}><code>{content.join("\n")}</code></pre>); continue;
    }
    const heading = /^(#{1,6})\s+(.+)$/.exec(line);
    if (heading) { blocks.push(createElement(`h${heading[1].length}`, { key }, inline(heading[2]))); i++; continue; }
    if (/^\s*(---+|\*\*\*+)\s*$/.test(line)) { blocks.push(<hr key={key} />); i++; continue; }
    const quote = /^>\s?(.*)$/.exec(line);
    if (quote) { blocks.push(<blockquote key={key}>{inline(quote[1])}</blockquote>); i++; continue; }
    const listMatch = /^\s*(?:[-*+]\s+|\d+\.\s+)(.*)$/.exec(line);
    if (listMatch) {
      const ordered = /^\s*\d+\./.test(line);
      const items: ReactNode[] = [];
      while (i < lines.length) {
        const match = /^\s*(?:[-*+]\s+|\d+\.\s+)(.*)$/.exec(lines[i]);
        if (!match || /^\s*\d+\./.test(lines[i]) !== ordered) break;
        const task = /^\[([ xX])\]\s+(.*)$/.exec(match[1]);
        items.push(task ? <li className="dl-task" key={i}><span role="img" aria-label={task[1].toLowerCase() === "x" ? "Complete" : "Incomplete"}>{task[1].toLowerCase() === "x" ? <CheckSquare /> : <Square />}</span>{inline(task[2])}</li> : <li key={i}>{inline(match[1])}</li>); i++;
      }
      blocks.push(ordered ? <ol key={key}>{items}</ol> : <ul key={key}>{items}</ul>); continue;
    }
    const paragraph = [line]; i++;
    while (i < lines.length && lines[i].trim() && !/^(#{1,6}\s|>|\s*```|\s*[-*+]\s|\s*\d+\.\s|\s*---)/.test(lines[i])) paragraph.push(lines[i++]);
    blocks.push(<p key={key}>{inline(paragraph.join(" "))}</p>);
  }
  return blocks.length ? blocks : <p className="dl-empty">A little space for your next thought.</p>;
}

export default function WorkspaceDemo({ className = "" }: { className?: string }) {
  const [notes, setNotes] = useState<Note[]>(freshExamples);
  const [primaryId, setPrimaryId] = useState("welcome");
  const [secondaryId, setSecondaryId] = useState("thinking");
  const [split, setSplit] = useState(false);
  const [focused, setFocused] = useState(false);
  const [editing, setEditing] = useState(false);
  const [ready, setReady] = useState(false);
  const [restoreFailed, setRestoreFailed] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [status, setStatus] = useState("A working notebook preview. No account, no upload.");
  const input = useRef<HTMLTextAreaElement>(null);
  const primary = notes.find(note => note.id === primaryId) || notes[0];
  const secondary = notes.find(note => note.id === secondaryId) || notes[0];

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        if (stored.length > serializedLimit) throw new Error("Preview limit");
        const value: unknown = JSON.parse(stored);
        if (!validNotes(value)) throw new Error("Invalid notebook");
        setNotes(value.map(({ id, name, body }) => ({ id, name, body })));
        setPrimaryId(value[0].id);
        setSecondaryId((value.find(note => note.id !== value[0].id) || value[0]).id);
      }
    } catch {
      setRestoreFailed(true); setStorageAvailable(false);
      setStatus("The previous saved notebook could not be loaded and was left untouched. Export new changes before resetting.");
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || restoreFailed) return;
    try { localStorage.setItem(storageKey, JSON.stringify(notes)); setStorageAvailable(true); }
    catch { setStorageAvailable(false); setStatus("These changes are not saved to browser storage. Export the note to keep them."); }
  }, [notes, ready, restoreFailed]);

  useEffect(() => { if (editing) input.current?.focus(); }, [editing, primaryId]);
  const words = primary.body.trim() ? primary.body.replace(/[#>*`\[\]-]/g, " ").trim().split(/\s+/).filter(Boolean).length : 0;
  const saveLabel = !ready ? "Browser preview" : restoreFailed ? "Previous save kept · export changes" : storageAvailable ? "Saved in this browser" : "Unsaved · export to keep";

  function toggleSplit() {
    if (!split && secondary.id === primary.id) {
      const other = notes.find(note => note.id !== primary.id);
      if (other) setSecondaryId(other.id);
    }
    setSplit(value => !value);
    setStatus(split ? "Back to one page." : "Two notes, side by side. Choose the second note from its menu.");
  }

  function addNote() {
    if (notes.length >= noteLimit) { setStatus("This preview holds up to 30 notes. Export a note to keep it."); return; }
    const id = `new-${Date.now().toString(36)}`;
    const count = notes.filter(note => note.id.startsWith("new-")).length + 1;
    setNotes(current => [...current, { id, name: `untitled-${count}.md`, body: "# A new thought\n\n" }]);
    setPrimaryId(id); setEditing(true); setStatus("New Markdown note created in this browser.");
  }
  function exportNote() {
    const url = URL.createObjectURL(new Blob([primary.body], { type: "text/markdown;charset=utf-8" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = primary.name;
    document.body.append(anchor); anchor.click(); anchor.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus(`${primary.name} exported as a Markdown file.`);
  }
  function reset() {
    if (!window.confirm("Reset this website preview? Browser-only edits will be replaced with sample notes. Export anything you want to keep first.")) return;
    setNotes(freshExamples()); setPrimaryId("welcome"); setSecondaryId("thinking"); setSplit(false); setFocused(false); setEditing(false); setRestoreFailed(false); setStatus("Sample notebook restored.");
  }

  return <section className={`dl-workspace ${split ? "dl-split" : ""} ${focused ? "dl-focused" : ""} ${className}`} aria-label="Interactive Markdown notebook" onKeyDown={event => {
    if ((event.metaKey || event.ctrlKey) && event.key === "\\") { event.preventDefault(); toggleSplit(); }
    if (event.key === "Escape" && focused) setFocused(false);
  }}>
    <div className="dl-windowbar"><span className="dl-windowdots" aria-hidden="true"><i /><i /><i /></span><span className="dl-window-title"><LampMark className="dl-lamp-mark" /> My notebook</span><span className="dl-preview-label">Interactive preview</span></div>
    <div className="dl-body">
      <aside className="dl-sidebar" aria-label="Markdown files"><div className="dl-workspace-name">My notebook <FolderOpen aria-hidden="true" /><ChevronDown aria-hidden="true" /></div><div className="dl-sidebar-heading"><span>Your notes</span><Button variant="secondary" size="lg" type="button" onClick={addNote} aria-label="Create a new Markdown note" title="New note">New <Plus /></Button></div><nav className="dl-files" aria-label="Choose a note">{notes.map(note => <Button variant="secondary" size="lg" className="dl-note-tab" key={note.id} type="button" aria-pressed={note.id === primary.id} onClick={() => { setPrimaryId(note.id); setStatus(`${note.name} opened.`); }}><span>{note.name}</span><FileText aria-hidden="true" /></Button>)}</nav><div className="dl-local-note"><Circle aria-hidden="true" /><span>Plain files.<br />A little space to think.</span></div></aside>
      <div className="dl-main"><div className="dl-toolbar"><span className="dl-breadcrumb">My notebook <span>/</span> <strong>{primary.name}</strong></span><div className="dl-tools"><Button variant="secondary" size="lg" type="button" aria-pressed={editing} onClick={() => { setEditing(value => !value); setStatus(editing ? "Read view. Your Markdown is rendered." : "Edit Markdown. This preview allows 60,000 characters per note."); }}><span>{editing ? "Read view" : "Edit Markdown"}</span>{editing ? <BookOpen /> : <PenLine />}</Button><Button variant="secondary" size="lg" type="button" aria-pressed={split} onClick={toggleSplit}><span>{split ? "Single view" : "Split view"}</span><Columns2 /></Button><Button variant="secondary" size="lg" type="button" aria-pressed={focused} onClick={() => { setFocused(value => !value); setStatus(focused ? "Your notebook is back in view." : "Focus mode. The sidebar is tucked away."); }}><span>{focused ? "Exit focus" : "Focus"}</span>{focused ? <Minimize2 /> : <Maximize2 />}</Button></div></div>
        <div className="dl-panels"><section className="dl-pane" aria-label="Primary note"><div className="dl-pane-header"><span>{primary.name}<FileText aria-hidden="true" /></span><Button size="lg" type="button" onClick={exportNote}>Export<span className="dl-sr-only"> {primary.name} as Markdown</span><Download /></Button></div>{editing ? <textarea ref={input} className="dl-source" aria-label="Edit note Markdown" maxLength={characterLimit} value={primary.body} spellCheck onChange={event => { const body = event.target.value.slice(0, characterLimit); setNotes(current => current.map(note => note.id === primary.id ? { ...note, body } : note)); if (body.length === characterLimit) setStatus("This note reached the 60,000-character preview limit. Start another note or export this one."); }} /> : <article key={primary.id} className="dl-document"><Markdown source={primary.body} /></article>}</section>
          {split && <section className="dl-pane dl-secondary" aria-label="Second note"><div className="dl-pane-header"><span><span className="dl-second-name">{secondary.name}</span><FileText aria-hidden="true" /></span><label className="dl-secondary-picker"><span className="dl-sr-only">Choose second note</span><select aria-label="Choose second note" value={secondary.id} onChange={event => { setSecondaryId(event.target.value); setStatus("Second note changed."); }}>{notes.map(note => <option key={note.id} value={note.id}>{note.name}</option>)}</select><ChevronDown aria-hidden="true" /></label></div><article key={secondary.id} className="dl-document"><Markdown source={secondary.body} /></article></section>}
        </div><div className="dl-statusbar"><span>{saveLabel}<Circle aria-hidden="true" /></span><span>{words} {words === 1 ? "word" : "words"}</span><span>Markdown</span></div>
      </div>
    </div><div className="dl-demo-foot"><p role="status" aria-live="polite" aria-atomic="true">{status}</p><Button variant="secondary" size="lg" type="button" onClick={reset}>Reset preview <RotateCcw /></Button></div>
  </section>;
}
