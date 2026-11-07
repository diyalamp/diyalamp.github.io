const captures = {
  workspace: {
    src: "/screenshots/workspace.webp",
    alt: "DiyaLamp shows a rendered Markdown note, its tabs and files, and a Connections panel with backlinks.",
  },
  search: {
    src: "/screenshots/search-and-split.webp",
    alt: "DiyaLamp finds matching text in the left sidebar and shows a draft and reference in two editor panes.",
  },
};

export default function AppScreenshot({
  name,
  caption,
  priority = false,
}: {
  name: keyof typeof captures;
  caption: string;
  priority?: boolean;
}) {
  const { src, alt } = captures[name];
  return (
    <figure className="app-screen">
      <a className="app-window" href={src} aria-label={`View full-size screenshot. ${alt}`}>
        <img src={src} width={1440} height={900} alt={alt} decoding="async" loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} />
      </a>
      <figcaption>{caption}<span>Click image for full size</span></figcaption>
    </figure>
  );
}
