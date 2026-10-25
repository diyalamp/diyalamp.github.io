"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { AuroraBackground } from "@/components/velora/aurora-background";

type Point = { x: number; y: number; glow?: number };
type Edge = { key: string; d: string; strength: number; cursor: boolean };

// Curved paths follow Velora AnimatedBeam's quadratic geometry; Motion animates
// the same traveling-gradient treatment used in the connected-thinking illustration.
export default function AmbientBackdrop() {
  const reduced = useReducedMotion();
  const id = useId().replace(/:/g, "");
  const pointer = useRef<Point | null>(null);
  const [scene, setScene] = useState<{ nodes: Point[]; edges: Edge[] }>({ nodes: [], edges: [] });
  useEffect(() => {
    let frame = 0, previous = 0;
    const start = performance.now();
    const seeds = Array.from({ length: window.innerWidth < 700 ? 22 : 46 }, (_, i) => ({
      x: ((i * 0.61803398875 + .07) % 1), y: ((i * .41421356237 + .11) % 1), phase: i * 2.39996,
    }));
    const curve = (a: Point, b: Point, bend: number) => {
      const dx = b.x - a.x, dy = b.y - a.y;
      return `M ${a.x} ${a.y} Q ${(a.x+b.x)/2-dy*bend} ${(a.y+b.y)/2+dx*bend} ${b.x} ${b.y}`;
    };
    function draw(now: number) {
      if (now - previous > 45 || reduced) {
        previous = now;
        const t = reduced ? 0 : (now - start) / 1000;
        const w = window.innerWidth, h = window.innerHeight;
        const nodes = seeds.map(s => ({ x: ((s.x*w + t*(9+((s.phase*7)%12))*(Math.floor(s.phase)%2?1:-1)+w+60)%(w+120))-60, glow: reduced ? 0 : (Math.sin(t*2.4+s.phase)+1)*.45, y: ((s.y*h + t*(5+((s.phase*3)%7))*(Math.floor(s.phase)%3?1:-1)+h+60)%(h+120))-60 + Math.sin(t*.6+s.phase)*16 }));
        const edges: Edge[] = [];
        for (let i=0;i<nodes.length;i++) {
          let connections=0;
          for (let j=i+1;j<nodes.length && connections<3;j++) {
            const distance=Math.hypot(nodes[i].x-nodes[j].x,nodes[i].y-nodes[j].y);
            if(distance<220){connections++;edges.push({key:`${i}-${j}`,d:curve(nodes[i],nodes[j],(i%2?1:-1)*.24),strength:(1-distance/220)*.55,cursor:false});}
          }
          const p=pointer.current;
          if(p && !reduced){const distance=Math.hypot(nodes[i].x-p.x,nodes[i].y-p.y);if(distance<280)edges.push({key:`p-${i}`,d:curve(nodes[i],p,(i%2?1:-1)*.32),strength:(1-distance/280)*.85,cursor:true});}
        }
        setScene({nodes,edges});
      }
      if(!reduced)frame=requestAnimationFrame(draw);
    }
    const move=(e:PointerEvent)=>{if(e.pointerType!=="touch")pointer.current={x:e.clientX,y:e.clientY};};
    const leave=()=>{pointer.current=null;};
    const visibility=()=>{cancelAnimationFrame(frame);if(!document.hidden)frame=requestAnimationFrame(draw);};
    window.addEventListener("pointermove",move,{passive:true});
    document.documentElement.addEventListener("pointerleave",leave);
    document.addEventListener("visibilitychange",visibility);
    frame=requestAnimationFrame(draw);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener("pointermove",move);document.documentElement.removeEventListener("pointerleave",leave);document.removeEventListener("visibilitychange",visibility);};
  },[reduced]);
  return <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
    <AuroraBackground intensity="subtle" />
    <svg className="absolute inset-0 h-full w-full" fill="none">
      <defs>{[0,1,2].map(i=><motion.linearGradient key={i} id={`${id}-${i}`} gradientUnits="objectBoundingBox" initial={{x1:"-100%",x2:"0%"}} animate={reduced?{x1:"0%",x2:"100%"}:{x1:["-100%","100%"],x2:["0%","200%"]}} transition={{duration:3+i*.7,repeat:Infinity,ease:"linear"}}><stop stopColor="#C2D4D4" stopOpacity="0"/><stop offset=".5" stopColor="#C2D4D4"/><stop offset="1" stopColor="#C2D4D4" stopOpacity="0"/></motion.linearGradient>)}</defs>
      {scene.edges.map((e,i)=><g key={e.key} opacity={e.strength}><path d={e.d} stroke="#697778" strokeWidth={e.cursor?1.4:1}/><path d={e.d} stroke={`url(#${id}-${i%3})`} strokeWidth={e.cursor?2.4:1.8}/>{!reduced && (e.cursor || i%3===0) && <motion.circle r={e.cursor?2.5:1.8} fill="#C2D4D4" style={{offsetPath:`path("${e.d}")`}} animate={{offsetDistance:["0%","100%"],opacity:[0,1,1,0]}} transition={{duration:e.cursor?1.4:2.4,repeat:Infinity,ease:"linear",delay:(i%5)*.15}}/>}</g>)}
      {scene.nodes.map((p,i)=><g key={i}>{(p.glow??0)>.65 && <circle cx={p.x} cy={p.y} r={7+(p.glow??0)*5} fill={i%4===0?"#F1B13F":"#C2D4D4"} opacity={((p.glow??0)-.65)*.48}/>}<circle cx={p.x} cy={p.y} r={(i%7===0?2.6:1.9)+(p.glow??0)} fill={i%13===0?"#C74634":i%4===0?"#F1B13F":"#C2D4D4"} opacity={.45+(p.glow??0)*.5}/></g>)}
    </svg>
  </div>;
}
