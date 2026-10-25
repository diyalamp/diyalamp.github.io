"use client";

import { useEffect, useRef, useState, type DragEvent } from "react";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import { Extension } from "@tiptap/core";
import { Plugin } from "@tiptap/pm/state";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "@tiptap/markdown";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Placeholder from "@tiptap/extension-placeholder";
import { FileText, Plus, Columns2, PanelLeftOpen, PanelLeftClose, Ellipsis, ArrowUp, ArrowDown, Download, FolderOpen, Circle, X, Type, Heading1, Heading2, List, ListOrdered, Quote, CheckSquare, Code2, Minus, Bold, Italic, ChevronDown, Trash2, RotateCcw } from "lucide-react";
import { DropdownMenu } from "radix-ui";
import LampMark from "@/components/lamp-mark";
import { Button } from "@/components/ui/button";
import "./workspace-demo.css";

type Note = { id: string; name: string; body: string };
const noteDragType = "application/x-diyalamp-note";
const storageKey = "diyalamp-writing-preview-v1";
const noteLimit = 30;
const characterLimit = 60000;
const serializedLimit = 12000000;
const examples: Note[] = [
  { id: "welcome", name: "welcome.md", body: "# A little room to think\n\nSome ideas need a quieter place to begin. A page, a question, and enough room to follow it.\n\n> Write to understand. Keep what you discover.\n\n## Make yourself at home\n\n- Open a note from the sidebar.\n- Use the pane icon to keep two ideas in sight.\n- Click anywhere to write. Type **/** on a new line for blocks.\n\n## The small things matter\n\n- [x] Plain Markdown files\n- [x] A space without an account\n- [ ] One thought worth returning to\n\nYour edits in this website preview stay in this browser. Export a note to keep a `.md` copy.\n\n---\n\nA tool for the mind. A little light for the path ahead." },
  { id: "thinking", name: "thinking.md", body: "# Notes beside thoughts\n\nReading and writing rarely happen in a straight line. Keep a source on one side and your own reasoning on the other.\n\n## A useful question\n\nWhat can I explain after I close the book?\n\n1. Start with one clear claim.\n2. Find the assumptions behind it.\n3. Try a case where it might fail.\n\n> Understanding becomes useful when you can work with it.\n\n## Next time\n\n- [ ] Return to the difficult paragraph\n- [ ] Write a smaller example\n- [ ] Connect it to another note" },
  { id: "reading", name: "reading-list.md", body: "# The reading shelf\n\nNot everything needs to be finished today. Some questions are better kept open.\n\n## In progress\n\n- Distributed systems and the cost of coordination\n- The history of tools for thinking\n- How a good explanation changes what we notice\n\n## A note to myself\n\n**Collect questions, not just quotations.**\n\nA reading list is useful when it helps you return to an idea, not when it becomes another inbox.\n\n---\n\nThis is a sample note. Edit it, replace it, or add a page of your own." },
  { id: "ideas", name: "small-ideas.md", body: "# Small ideas\n\nA place for the sentence that has not found its essay yet.\n\n## Things to make\n\n- A tiny experiment that explains one difficult idea\n- An essay about the tools we choose\n- A better question than the one I started with\n\n## A working rule\n\nKeep the format simple enough that the idea remains the interesting part.\n\n`Markdown` is a useful common language: readable as text, portable as a file.\n\n> Leave a little space for what you have not noticed yet." },
];
const freshExamples = () => examples.map(note => ({ ...note }));

function validNotes(value: unknown): value is Note[] {
  return Array.isArray(value) && value.length <= noteLimit &&
    value.every(note => note && typeof note.id === "string" && /^[\w-]{1,80}$/.test(note.id) &&
      typeof note.name === "string" && note.name.length <= 100 && note.name.endsWith(".md") &&
      typeof note.body === "string" && note.body.length <= characterLimit) &&
    new Set(value.map(note => note.id)).size === value.length;
}

type SlashState = { from: number; to: number; query: string; left: number; top: number };
const blocks = [
  { id: "text", label: "Text", detail: "Just start writing", icon: Type },
  { id: "h1", label: "Heading 1", detail: "A new chapter", icon: Heading1 },
  { id: "h2", label: "Heading 2", detail: "A little structure", icon: Heading2 },
  { id: "bullet", label: "Bullet list", detail: "Ideas, one by one", icon: List },
  { id: "ordered", label: "Numbered list", detail: "Keep things in order", icon: ListOrdered },
  { id: "task", label: "To-do list", detail: "Something to come back to", icon: CheckSquare },
  { id: "quote", label: "Quote", detail: "A thought worth keeping", icon: Quote },
  { id: "code", label: "Code block", detail: "A small example", icon: Code2 },
  { id: "divider", label: "Divider", detail: "Room between ideas", icon: Minus },
];

// Transactions are rejected before an oversized document enters editor state or persistence.
const BoundedDocument = Extension.create({
  name: "boundedDocument",
  addProseMirrorPlugins() {
    return [new Plugin({ filterTransaction: transaction => !transaction.docChanged ||
      (transaction.doc.content.size <= characterLimit && (this.editor.markdown?.serialize(transaction.doc.toJSON()).length ?? transaction.doc.textContent.length) <= characterLimit) })];
  },
});

function RichNote({ note, readOnly = false, autoFocus = false, onChange }: { note: Note; readOnly?: boolean; autoFocus?: boolean; onChange?: (body: string) => void }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const onChangeRef = useRef(onChange); onChangeRef.current = onChange;
  const [slash, setSlash] = useState<SlashState | null>(null);
  const [selected, setSelected] = useState(0);
  const slashRef = useRef<SlashState | null>(null);
  const selectedRef = useRef(0);
  const dismissedAt = useRef<number | null>(null);
  const menuId = `dl-block-menu-${note.id}-${readOnly ? "secondary" : "primary"}`;

  function inspect(editor: Editor) {
    if (readOnly || !editor.isFocused || !editor.state.selection.empty) { slashRef.current = null; setSlash(null); return; }
    const { $from, from } = editor.state.selection;
    const prefix = $from.parent.textBetween(0, $from.parentOffset, "\0", "\0");
    const match = /^\/([a-z0-9 -]*)$/i.exec(prefix);
    if (!match || dismissedAt.current === from || !$from.parent.isTextblock || $from.parent.type.name === "codeBlock") { slashRef.current = null; setSlash(null); return; }
    const rect = wrapper.current?.getBoundingClientRect();
    const position = editor.view.coordsAtPos(from);
    const next = { from: from - prefix.length, to: from, query: match[1].toLowerCase(), left: Math.max(8, Math.min(position.left - (rect?.left || 0), (rect?.width || 600) - 285)), top: Math.max(15, Math.min(position.bottom - (rect?.top || 0) + 8, (rect?.height || 500) - 300)) };
    slashRef.current = next; setSlash(next); selectedRef.current = 0; setSelected(0);
  }
  function run(editor: Editor, id: string, range: SlashState) {
    const chain = editor.chain().focus().deleteRange({ from: range.from, to: range.to });
    if (id === "h1") chain.setHeading({ level: 1 }).run();
    else if (id === "h2") chain.setHeading({ level: 2 }).run();
    else if (id === "bullet") chain.toggleBulletList().run();
    else if (id === "ordered") chain.toggleOrderedList().run();
    else if (id === "task") chain.toggleTaskList().run();
    else if (id === "quote") chain.setBlockquote().run();
    else if (id === "code") chain.setCodeBlock().run();
    else if (id === "divider") chain.setHorizontalRule().run();
    else chain.setParagraph().run();
    slashRef.current = null; setSlash(null);
  }
  const editor = useEditor({
    immediatelyRender: false,
    editable: !readOnly,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] }, link: { openOnClick: false, autolink: false, isAllowedUri: url => /^(https?:|mailto:)/i.test(url) || /^(\/|#)/.test(url) } }),
      TaskList, TaskItem.configure({ nested: true }),
      Markdown.configure({ markedOptions: { gfm: true } }),
      Placeholder.configure({ placeholder: "Write something, or type / for blocks…" }),
      BoundedDocument,
    ],
    content: note.body,
    contentType: "markdown",
    editorProps: {
      attributes: { class: "dl-rich-document", role: "textbox", "aria-label": readOnly ? `Reading ${note.name}` : `Write in ${note.name}`, "aria-multiline": "true", spellcheck: "true" },
      handleKeyDown(view, event) {
        const current = slashRef.current;
        if (!current) return false;
        const options = blocks.filter(block => `${block.label} ${block.detail}`.toLowerCase().includes(current.query));
        if (event.key === "Escape") { dismissedAt.current = view.state.selection.from; slashRef.current = null; setSlash(null); return true; }
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          const next = options.length ? (selectedRef.current + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length : 0;
          selectedRef.current = next; setSelected(next); return true;
        }
        if (event.key === "Enter" && options.length) { if (editor) run(editor, options[selectedRef.current].id, current); return true; }
        return false;
      },
      // Paste is parsed by the editor's explicit schema; no scripts, frames, images or event attributes are supported.
    },
    onUpdate({ editor }) { dismissedAt.current = null; onChangeRef.current?.(editor.getMarkdown()); inspect(editor); },
    onSelectionUpdate({ editor }) { inspect(editor); },
    onBlur() { slashRef.current = null; setSlash(null); },
  });

  useEffect(() => {
    if (!editor || !readOnly || editor.getMarkdown() === note.body) return;
    editor.commands.setContent(note.body, { contentType: "markdown", emitUpdate: false });
  }, [editor, note.body, readOnly]);
  useEffect(() => { if (editor && autoFocus) editor.commands.focus("end"); }, [editor, autoFocus]);
  const matches = slash ? blocks.filter(block => `${block.label} ${block.detail}`.toLowerCase().includes(slash.query)) : [];
  return <div ref={wrapper} className={`dl-rich-wrap ${readOnly ? "dl-readonly" : ""}`}>
    {!readOnly && <div className="dl-formatbar" aria-label="Text formatting"><span>Make room for a thought.</span><div><button type="button" title="Bold · ⌘B" aria-label="Bold" onMouseDown={event => event.preventDefault()} onClick={() => editor?.chain().focus().toggleBold().run()}><Bold /></button><button type="button" title="Italic · ⌘I" aria-label="Italic" onMouseDown={event => event.preventDefault()} onClick={() => editor?.chain().focus().toggleItalic().run()}><Italic /></button><button type="button" title="Turn into heading" aria-label="Turn into heading" onMouseDown={event => event.preventDefault()} onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 /></button><button type="button" title="Bullet list" aria-label="Bullet list" onMouseDown={event => event.preventDefault()} onClick={() => editor?.chain().focus().toggleBulletList().run()}><List /></button></div></div>}
    <div className="dl-rich-scroll" onScroll={() => { slashRef.current = null; setSlash(null); }}><EditorContent editor={editor} />{!editor && <div className="dl-editor-loading">Opening your page…</div>}</div>
    {slash && <div id={menuId} className="dl-slash-menu" role="listbox" aria-label="Choose a block" style={{ left: slash.left, top: slash.top }}><div className="dl-menu-heading">Add a block</div>{matches.length ? matches.map((block, index) => <button key={block.id} id={`${menuId}-${index}`} type="button" role="option" aria-selected={index === selected} className={index === selected ? "is-selected" : ""} onMouseDown={event => event.preventDefault()} onMouseEnter={() => { selectedRef.current = index; setSelected(index); }} onClick={() => editor && run(editor, block.id, slash)}><span><strong>{block.label}</strong><span>{block.detail}</span></span><block.icon /></button>) : <p>No matching blocks.</p>}</div>}
  </div>;
}

function NoteName({ note, onRename }: { note: Note; onRename: (name: string) => void }) {
  const [name, setName] = useState(note.name);
  useEffect(() => setName(note.name), [note.name]);
  return <input className="dl-note-name" value={name} maxLength={96} aria-label="Note filename" onChange={event => setName(event.target.value)} onBlur={() => {
    const clean = name.trim().replace(/[\\/:*?"<>|]/g, "-").replace(/\.md$/i, "").slice(0, 90) || "Untitled";
    onRename(`${clean}.md`);
  }} onKeyDown={event => { if (event.key === "Enter") event.currentTarget.blur(); }} />;
}

export default function WorkspaceDemo({ className = "" }: { className?: string }) {
  const [notes, setNotes] = useState<Note[]>(freshExamples);
  const [primaryId, setPrimaryId] = useState("welcome");
  const [openIds, setOpenIds] = useState(["welcome", "thinking"]);
  const [secondaryId, setSecondaryId] = useState("thinking");
  const [split, setSplit] = useState(false);
  const [sidebarClosed, setSidebarClosed] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [reorderHint, setReorderHint] = useState<{ id: string; edge: "before" | "after" } | null>(null);
  const [paneDrop, setPaneDrop] = useState<"primary" | "secondary" | null>(null);
  const [ready, setReady] = useState(false);
  const [restoreFailed, setRestoreFailed] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [status, setStatus] = useState("");
  const [deleted, setDeleted] = useState<{ note: Note; index: number } | null>(null);
  const primary = notes.find(note => note.id === primaryId);
  const secondary = notes.find(note => note.id === secondaryId) || notes[0] || { id: "", name: "", body: "" };

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        if (stored.length > serializedLimit) throw new Error("Preview limit");
        const value: unknown = JSON.parse(stored);
        if (!validNotes(value)) throw new Error("Invalid notebook");
        setNotes(value.map(({ id, name, body }) => ({ id, name, body })));
        setPrimaryId(value[0]?.id || ""); setOpenIds(value.slice(0, 2).map(note => note.id));
        setSecondaryId((value.find(note => note.id !== value[0]?.id) || value[0])?.id || "");
      }
    } catch { setRestoreFailed(true); setStorageAvailable(false); setStatus("Your previous saved notebook was left untouched. New edits can still be exported."); }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready || restoreFailed) return;
    try { localStorage.setItem(storageKey, JSON.stringify(notes)); setStorageAvailable(true); }
    catch { setStorageAvailable(false); setStatus("Browser storage is full. Export your note to keep these changes."); }
  }, [notes, ready, restoreFailed]);

  function openNote(id: string) { setPrimaryId(id); setOpenIds(current => current.includes(id) ? current : [...current, id]); }
  function openReference(id: string) {
    if (!primary || primary.id === id) {
      const other = notes.find(note => note.id !== id);
      if (other) openNote(other.id);
      else openNote(id);
    }
    setSecondaryId(id); setSplit(true);
    setOpenIds(current => current.includes(id) ? current : [...current, id]);
    setStatus(`${notes.find(note => note.id === id)?.name || "Note"} opened in the reference pane.`);
  }
  function moveNote(id: string, offset: number) {
    const index = notes.findIndex(note => note.id === id);
    const destination = index + offset;
    if (index < 0 || destination < 0 || destination >= notes.length) return;
    setNotes(current => { const result = [...current]; const from = result.findIndex(note => note.id === id); const [note] = result.splice(from, 1); result.splice(from + offset, 0, note); return result; });
    setStatus(`${notes[index].name} moved ${offset < 0 ? "up" : "down"}.`);
  }
  function rowDropEdge(event: DragEvent<HTMLElement>): "before" | "after" {
    const bounds = event.currentTarget.getBoundingClientRect();
    return (window.innerWidth <= 700 ? event.clientX < bounds.left + bounds.width / 2 : event.clientY < bounds.top + bounds.height / 2) ? "before" : "after";
  }
  function isNoteDrag(event: DragEvent) { return !!draggedId || Array.from(event.dataTransfer.types).includes(noteDragType); }
  function clearDrag() { setDraggedId(null); setReorderHint(null); setPaneDrop(null); }
  function dropNote(event: DragEvent, targetId: string, edge: "before" | "after") {
    if (!isNoteDrag(event)) return;
    event.preventDefault(); event.stopPropagation();
    const id = event.dataTransfer.getData(noteDragType) || draggedId;
    if (id && id !== targetId && notes.some(note => note.id === id)) {
      setNotes(current => { const result = current.filter(note => note.id !== id); const note = current.find(note => note.id === id); const target = result.findIndex(note => note.id === targetId); if (!note || target < 0) return current; result.splice(target + (edge === "after" ? 1 : 0), 0, note); return result; });
      setStatus("Page order saved.");
    }
    clearDrag();
  }
  function trackPaneDrop(event: DragEvent<HTMLDivElement>) {
    if (!isNoteDrag(event)) return;
    event.preventDefault(); event.stopPropagation(); event.dataTransfer.dropEffect = "move";
    const bounds = event.currentTarget.getBoundingClientRect();
    setPaneDrop(event.clientX > bounds.left + bounds.width * 0.64 ? "secondary" : "primary");
    setReorderHint(null);
  }
  function dropInPane(event: DragEvent<HTMLDivElement>) {
    if (!isNoteDrag(event)) return;
    event.preventDefault(); event.stopPropagation();
    const id = event.dataTransfer.getData(noteDragType) || draggedId;
    if (id && notes.some(note => note.id === id)) {
      const bounds = event.currentTarget.getBoundingClientRect();
      if (event.clientX > bounds.left + bounds.width * 0.64) openReference(id);
      else { openNote(id); setStatus("Note opened in the writing pane."); }
    }
    clearDrag();
  }
  function closeTab(id: string) {
    const remaining = openIds.filter(open => open !== id); setOpenIds(remaining);
    if (primaryId === id) setPrimaryId(remaining[Math.max(0, openIds.indexOf(id) - 1)] || "");
  }
  function toggleSplit() {
    if (!split && secondary.id === primaryId) setSecondaryId((notes.find(note => note.id !== primaryId) || secondary).id);
    setSplit(value => !value);
  }
  function addNote() {
    if (notes.length >= noteLimit) { setStatus("This notebook holds up to 30 notes. Export the pages you want to keep."); return; }
    const id = `new-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
    const count = notes.filter(note => note.id.startsWith("new-")).length + 1;
    setNotes(current => [...current, { id, name: `Untitled ${count}.md`, body: "# Untitled\n\n" }]);
    openNote(id); setStatus("");
  }
  function deleteNote() {
    if (!primary) return;
    setDeleted({ note: { ...primary }, index: notes.findIndex(note => note.id === primary.id) });
    const remaining = notes.filter(note => note.id !== primary.id);
    const tabs = openIds.filter(id => id !== primary.id);
    const next = tabs[0] || remaining[0]?.id || "";
    setNotes(remaining); setPrimaryId(next); setOpenIds(tabs.length ? tabs : next ? [next] : []);
    if (secondaryId === primary.id) setSecondaryId(remaining[0]?.id || "");
    setStatus(`${primary.name} deleted. You can undo this.`);
  }
  function undoDelete() {
    if (!deleted) return;
    if (notes.length >= noteLimit) { setStatus("Delete another page before restoring this one; the notebook holds 30 notes."); return; }
    const restored = [...notes]; restored.splice(Math.min(deleted.index, restored.length), 0, deleted.note);
    setNotes(restored); openNote(deleted.note.id); setDeleted(null); setStatus("Note restored.");
  }
  function exportNote() {
    if (!primary) return;
    const url = URL.createObjectURL(new Blob([primary.body], { type: "text/markdown;charset=utf-8" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = primary.name; document.body.append(anchor); anchor.click(); anchor.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  const saveLabel = !ready ? "Opening notebook" : restoreFailed ? "Previous save kept" : storageAvailable ? "Saved locally" : "Export to keep";
  return <section className={`dl-workspace ${split ? "dl-split" : ""} ${sidebarClosed ? "dl-sidebar-collapsed" : ""} ${className}`} aria-label="Markdown notebook" onKeyDown={event => { if ((event.metaKey || event.ctrlKey) && event.key === "\\") { event.preventDefault(); toggleSplit(); } if (event.key === "Escape") { clearDrag(); } }}>
    <div className="dl-windowbar"><span className="dl-window-controls"><span className="dl-windowdots" aria-hidden="true"><i /><i /><i /></span><button type="button" className="dl-sidebar-toggle" aria-label={sidebarClosed ? "Show sidebar" : "Hide sidebar"} aria-expanded={!sidebarClosed} aria-controls="dl-notebook-sidebar" title={sidebarClosed ? "Show sidebar" : "Hide sidebar"} onClick={() => setSidebarClosed(value => !value)}>{sidebarClosed ? <PanelLeftOpen /> : <PanelLeftClose />}</button></span><span className="dl-window-title"><LampMark className="dl-lamp-mark" /> My notebook</span><span className="dl-save-indicator"><span>{saveLabel}</span><Circle aria-hidden="true" /></span></div>
    <div className="dl-body"><aside id="dl-notebook-sidebar" className="dl-sidebar" aria-label="Markdown files" inert={sidebarClosed} aria-hidden={sidebarClosed}><div className="dl-workspace-name">My notebook <FolderOpen aria-hidden="true" /></div><Button variant="secondary" size="lg" className="dl-new-note" onClick={addNote}>New note <Plus /></Button><div className="dl-sidebar-heading">Your pages</div><nav className="dl-files" aria-label="Choose and arrange notes">{notes.map((note, index) => <div key={note.id} draggable className={`dl-file-row ${primaryId === note.id ? "is-active" : ""} ${draggedId === note.id ? "is-dragging" : ""} ${reorderHint?.id === note.id ? `drop-${reorderHint.edge}` : ""}`} onDragStart={event => { event.dataTransfer.effectAllowed = "move"; event.dataTransfer.setData(noteDragType, note.id); setDraggedId(note.id); }} onDragEnd={clearDrag} onDragOver={event => { if (!isNoteDrag(event)) return; event.preventDefault(); event.stopPropagation(); event.dataTransfer.dropEffect = "move"; setReorderHint({ id: note.id, edge: rowDropEdge(event) }); setPaneDrop(null); }} onDrop={event => { dropNote(event, note.id, rowDropEdge(event)); }}><button className="dl-file-open" type="button" aria-current={primaryId === note.id ? "page" : undefined} onClick={() => openNote(note.id)} title="Open note · drag to arrange or open in a pane"><span>{note.name}</span><FileText aria-hidden="true" /></button><DropdownMenu.Root><DropdownMenu.Trigger asChild><button type="button" className="dl-note-menu-button" aria-label={`Actions for ${note.name}`}><Ellipsis /></button></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content className="dl-note-options" side="right" align="start" sideOffset={12}><DropdownMenu.Item disabled={index === 0} onSelect={() => moveNote(note.id, -1)}>Move up <ArrowUp /></DropdownMenu.Item><DropdownMenu.Item disabled={index === notes.length - 1} onSelect={() => moveNote(note.id, 1)}>Move down <ArrowDown /></DropdownMenu.Item><DropdownMenu.Separator /><DropdownMenu.Item onSelect={() => openNote(note.id)}>Open in writing pane <FileText /></DropdownMenu.Item><DropdownMenu.Item onSelect={() => openReference(note.id)}>Open beside writing <Columns2 /></DropdownMenu.Item></DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root></div>)}</nav><div className="dl-local-note">Drag pages to arrange.<br />Drop beside your writing.</div></aside>
      <div className="dl-main" onDragOverCapture={trackPaneDrop} onDropCapture={dropInPane} onDragLeave={event => { if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) setPaneDrop(null); }}><div className="dl-tabrow"><div className="dl-tabs" role="group" aria-label="Open notes">{openIds.map(id => { const note = notes.find(item => item.id === id); return note && <div key={id} className={`dl-tab ${primaryId === id ? "is-active" : ""}`}><button type="button" aria-pressed={primaryId === id} onClick={() => setPrimaryId(id)}><span>{note.name}</span><FileText /></button><button type="button" className="dl-close-tab" aria-label={`Close ${note.name}`} onClick={() => closeTab(id)}><X /></button></div>; })}</div><div className="dl-pane-tools"><button type="button" aria-pressed={split} aria-label={split ? "Close second pane" : "Open second pane"} title="Second pane · ⌘\\" onClick={toggleSplit}><Columns2 /></button></div></div>
        {status && <div className="dl-notice" role="status"><span>{status}</span>{deleted && <Button variant="secondary" size="lg" onClick={undoDelete}>Undo <RotateCcw /></Button>}</div>}
        {primary ? <div className="dl-panels"><section className="dl-pane" aria-label="Writing pane"><div className="dl-pane-header"><NoteName key={primary.id} note={primary} onRename={name => setNotes(current => current.map(note => note.id === primary.id ? { ...note, name } : note))} /><div className="dl-document-actions"><Button variant="secondary" size="lg" onClick={deleteNote}>Delete <Trash2 /></Button><Button size="lg" onClick={exportNote}>Export <Download /></Button></div></div>{ready && <RichNote key={primary.id} note={primary} autoFocus={primary.id.startsWith("new-")} onChange={body => setNotes(current => current.map(note => note.id === primary.id ? { ...note, body } : note))} />}</section>{split && <section className="dl-pane dl-secondary" aria-label="Reference pane"><div className="dl-pane-header"><label className="dl-secondary-picker"><span className="dl-sr-only">Choose reference note</span><select aria-label="Choose reference note" value={secondary.id} onChange={event => setSecondaryId(event.target.value)}>{notes.map(note => <option key={note.id} value={note.id}>{note.name}</option>)}</select><ChevronDown /></label></div><RichNote key={secondary.id} note={secondary} readOnly /></section>}</div> : <div className="dl-empty-state"><FileText /><h3>A clear page. A fresh thought.</h3><p>Open a note from the sidebar, or begin something new.</p><Button size="lg" onClick={addNote}>New note <Plus /></Button></div>}
        {draggedId && <div className={`dl-pane-drop-feedback ${paneDrop ? `is-over-${paneDrop}` : ""}`} aria-hidden="true"><div className="dl-drop-writing"><span>Open for writing <FileText /></span></div><div className="dl-drop-reference"><span>Open beside writing <Columns2 /></span></div></div>}
      </div></div>
  </section>;
}
