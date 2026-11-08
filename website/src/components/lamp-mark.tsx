/** The same rounded tile shown in the macOS Dock. */
export default function LampMark({ className = '' }: { className?: string }) {
  return <img
    src="/lamp-mark.webp?v=dock"
    width={72}
    height={72}
    alt=""
    aria-hidden="true"
    draggable={false}
    className={`inline-block h-[1em] w-auto shrink-0 ${className}`}
  />;
}
