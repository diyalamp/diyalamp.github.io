"use client";

import { useEffect, useId, useRef } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import { AuroraBackground } from "@/components/velora/aurora-background";

// Official MIT tsParticles slim + twinkle updater, loaded from local npm chunks rather than a CDN.
// https://particles.js.org/guide/getting-started · https://particles.js.org/guide/bundles-slim
async function initializeEngine() {
  const [{ tsParticles }, { loadSlim }, { loadTwinkleUpdater }] = await Promise.all([
    import("@tsparticles/engine"), import("@tsparticles/slim"), import("@tsparticles/updater-twinkle"),
  ]);
  await loadSlim(tsParticles);
  await loadTwinkleUpdater(tsParticles);
  return tsParticles;
}
let engineReady: ReturnType<typeof initializeEngine> | undefined;

/** Aurora with tsParticles proximity links, neural twinkles, and pointer grab/bubble interactions. */
export default function AmbientBackdrop() {
  const host = useRef<HTMLDivElement>(null);
  const id = `diya-particles-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const phone = window.matchMedia("(max-width: 700px)");
    let container: Container | undefined;
    let disposed = false;
    let revision = 0;
    let pending = Promise.resolve();

    function render() {
      const requested = ++revision;
      pending = pending.then(async () => {
        if (disposed || requested !== revision) return;
        const engine = await (engineReady ??= initializeEngine());
        if (disposed || requested !== revision) return;
        container?.destroy();
        container = undefined;
        const still = reduced.matches;
        const options: ISourceOptions = {
          autoPlay: !still,
          fullScreen: { enable: false },
          background: { color: { value: "transparent" } },
          fpsLimit: 45,
          detectRetina: true,
          pauseOnBlur: true,
          pauseOnOutsideViewport: !still,
          resize: { enable: true, delay: 0.2 },
          interactivity: {
            detectsOn: "window",
            events: {
              onHover: { enable: !still && finePointer.matches, mode: ["grab", "bubble"] },
              onClick: { enable: false, mode: [] },
            },
            modes: {
              grab: { distance: 180, links: { color: "#C2D4D4", opacity: 0.4 } },
              bubble: { distance: 170, duration: 0.7, color: "#F1B13F", opacity: 0.85, size: 2.8, mix: true },
            },
          },
          particles: {
            number: { value: phone.matches ? 24 : 65, density: { enable: false } },
            color: { value: ["#F1B13F", "#C2D4D4", "#697778", "#C74634"] },
            shape: { type: "circle" },
            twinkle: {
              links: { enable: !still, color: "#C2D4D4", frequency: 0.006, opacity: { min: 0.3, max: 0.52 } },
              particles: { enable: !still, fillColor: "#F1B13F", frequency: 0.008, opacity: { min: 0.65, max: 0.9 } },
            },
            opacity: { value: { min: 0.22, max: 0.62 }, animation: { enable: !still, speed: 1.2, sync: false, startValue: "random" } },
            size: { value: { min: 1, max: 2.2 } },
            links: { enable: true, distance: phone.matches ? 115 : 150, color: "#C2D4D4", opacity: 0.17, width: 0.75 },
            move: { enable: !still, speed: { min: 0.6, max: 1 }, direction: "none", random: false, straight: false, outModes: { default: "bounce" } },
          },
        };
        const loaded = await engine.load({ id, element: element!, options });
        if (disposed || requested !== revision) { loaded?.destroy(); return; }
        container = loaded;
        // Paused engine draws one frame; no custom rendering or background RAF loop.
        if (still) { container?.pause(); container?.draw(true); }
      }).catch(error => {
        // The original Aurora remains available if the optional decoration cannot initialize.
        console.warn("The decorative particle background could not initialize.", error);
      });
    }
    function visibility() {
      if (!reduced.matches || !container || document.hidden) return;
      // tsParticles manages visibility itself; retain a single static frame for reduced motion.
      queueMicrotask(() => { if (!disposed && reduced.matches) { container?.pause(); container?.draw(true); } });
    }
    render();
    reduced.addEventListener("change", render);
    finePointer.addEventListener("change", render);
    phone.addEventListener("change", render);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      disposed = true;
      revision++;
      reduced.removeEventListener("change", render);
      finePointer.removeEventListener("change", render);
      phone.removeEventListener("change", render);
      document.removeEventListener("visibilitychange", visibility);
      container?.destroy();
    };
  }, [id]);

  return <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background" style={{ isolation: "isolate" }}>
    <AuroraBackground intensity="subtle" />
    <div ref={host} id={id} aria-hidden="true" className="absolute inset-0" />
  </div>;
}
