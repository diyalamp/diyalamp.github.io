"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
const Workspace = dynamic(() => import("@/components/workspace-demo"), { loading: () => <NotebookPlaceholder loading />, ssr: false });
function NotebookPlaceholder({onOpen,loading=false}:{onOpen?:()=>void;loading?:boolean}){return <div className="notebook-placeholder" aria-label="Markdown workspace"><span>A little room to think.</span>{loading?<p>Opening your notebook…</p>:<button type="button" className="notebook-open" onClick={onOpen}>Open the notebook →</button>}</div>;}
/** Load the editor when enough of its window is visible to use, or on request. */
export default function DeferredWorkspace(){const host=useRef<HTMLDivElement>(null);const[ready,setReady]=useState(false);useEffect(()=>{const element=host.current;if(!element)return;const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting&&e.intersectionRatio>=.5)){setReady(true);observer.disconnect();}},{threshold:.5});observer.observe(element);return()=>observer.disconnect();},[]);return <div ref={host}>{ready?<Workspace/>:<NotebookPlaceholder onOpen={()=>setReady(true)}/>}</div>;}
