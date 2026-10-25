/** Fixed Apple-style lamp artwork; never rendered through a platform emoji font. */
export default function LampMark({ className = '' }: { className?: string }) {
  return <img
    src="/lamp.svg"
    width={106}
    height={88}
    alt=""
    aria-hidden="true"
    draggable={false}
    className={`inline-block h-[1em] w-auto shrink-0 align-[-0.12em] ${className}`}
  />;
}
