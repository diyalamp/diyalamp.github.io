"use client";
import { useEffect, useId, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

async function initialize(){const [{tsParticles},{loadSlim}]=await Promise.all([import("@tsparticles/engine"),import("@tsparticles/slim")]);await loadSlim(tsParticles);return tsParticles;}
let engineReady:ReturnType<typeof initialize>|undefined;

/** Official tsParticles attraction and proximity links, over pointer-reactive gray light. */
export default function AmbientBackdrop(){
 const reduced=useReducedMotion();const host=useRef<HTMLDivElement>(null);const id=`diya-${useId().replace(/:/g,"")}`;
 const cursorX=useMotionValue(-100),cursorY=useMotionValue(-100),visible=useMotionValue(0);
 const lightX=useSpring(0,{stiffness:35,damping:28}),lightY=useSpring(0,{stiffness:35,damping:28});
 useEffect(()=>{const move=(e:PointerEvent)=>{if(e.pointerType==="touch")return;cursorX.set(e.clientX);cursorY.set(e.clientY);visible.set(1);if(!reduced){lightX.set((e.clientX-innerWidth/2)*.16);lightY.set((e.clientY-innerHeight/2)*.16);}};const leave=()=>visible.set(0);window.addEventListener("pointermove",move,{passive:true});document.documentElement.addEventListener("pointerleave",leave);window.addEventListener("blur",leave);return()=>{window.removeEventListener("pointermove",move);document.documentElement.removeEventListener("pointerleave",leave);window.removeEventListener("blur",leave);};},[reduced,cursorX,cursorY,visible,lightX,lightY]);
 useEffect(()=>{let disposed=false;let container:Container|undefined;const element=host.current;if(!element)return;
  (async()=>{const engine=await(engineReady??=initialize());if(disposed)return;const still=!!reduced;const fine=matchMedia("(hover:hover) and (pointer:fine)").matches;
   const options:ISourceOptions={autoPlay:!still,fullScreen:{enable:false},background:{color:{value:"transparent"}},fpsLimit:45,detectRetina:true,pauseOnBlur:true,pauseOnOutsideViewport:!still,resize:{enable:true,delay:.2},interactivity:{detectsOn:"window",events:{onHover:{enable:!still&&fine,mode:["attract","grab"]},onClick:{enable:false,mode:[]}},modes:{attract:{distance:270,duration:.4,factor:1,speed:.7,maxSpeed:3,restore:{enable:true,delay:.2,speed:.08,follow:false}},grab:{distance:220,links:{color:"#C2D4D4",opacity:.55}}}},particles:{number:{value:innerWidth<700?28:76,density:{enable:false}},color:{value:["#C2D4D4","#C2D4D4","#697778","#F1B13F","#C74634"]},shape:{type:"circle"},opacity:{value:{min:.35,max:.72},animation:{enable:!still,speed:.8,sync:false}},size:{value:{min:1.3,max:2.6}},links:{enable:true,distance:150,color:"#C2D4D4",opacity:.24,width:.8},move:{enable:!still,speed:{min:.65,max:1.35},direction:"none",random:false,straight:false,outModes:{default:"out"}}}};
   const loaded=await engine.load({id,element,options});if(disposed){loaded?.destroy();return;}container=loaded;if(still){container?.pause();container?.draw(true);}
  })().catch(error=>console.warn("The decorative particle layer could not initialize.",error));return()=>{disposed=true;container?.destroy();};
 },[id,reduced]);
 return <><div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"><motion.div className="absolute -inset-1/2" style={{x:lightX,y:lightY,background:"radial-gradient(ellipse at 25% 35%,#f1b13f30,transparent 48%),radial-gradient(ellipse at 75% 65%,#69777855,transparent 46%),linear-gradient(135deg,#303838,#3c4545 55%,#303838)"}}/><div id={id} ref={host} className="absolute inset-0"/></div><motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-50 h-2 w-2 rounded-full bg-[#F1B13F]" style={{x:cursorX,y:cursorY,opacity:visible,marginLeft:-4,marginTop:-4,backgroundColor:"#F1B13F",boxShadow:"0 0 0 7px #f1b13f20,0 0 18px #f1b13f55"}}/></>;
}
