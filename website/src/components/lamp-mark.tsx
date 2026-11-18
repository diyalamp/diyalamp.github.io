/** The rounded lamp mark shared with the app icon. */
export default function LampMark({ className = '' }: { className?: string }) {
  return (
    <span className={`lamp-mark ${className}`} aria-hidden="true">
      <img src="/lamp-mark.webp?v=ivory" width={72} height={72} alt="" draggable={false} />
    </span>
  );
}
