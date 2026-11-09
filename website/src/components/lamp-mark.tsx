/** The same rounded tile shown in the macOS Dock. */
export default function LampMark({ className = '' }: { className?: string }) {
  return (
    <span className={`lamp-mark ${className}`} aria-hidden="true">
      <img src="/lamp-mark.webp?v=dock" width={72} height={72} alt="" draggable={false} />
    </span>
  );
}
