const captures = {
  workspace: {
    full: "/screenshots/workspace.webp",
    detail: "/screenshots/workspace-detail.webp",
    detailWidth: 900,
    detailHeight: 760,
    alt: "DiyaLamp shows a rendered Markdown note, its tabs and files, and a Connections panel with backlinks.",
  },
  search: {
    full: "/screenshots/search-and-split.webp",
    detail: "/screenshots/search-detail.webp",
    detailWidth: 846,
    detailHeight: 672,
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
  const { full, detail, detailWidth, detailHeight, alt } = captures[name];
  return (
    <figure className="app-screen">
      <a className="app-window" href={full} aria-label={`View full-size screenshot. ${alt}`}>
        <picture>
          <source media="(max-width: 560px)" srcSet={detail} width={detailWidth} height={detailHeight} />
          <img src={full} width={1440} height={900} alt={alt} decoding="async" loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} />
        </picture>
      </a>
      <figcaption>{caption}<span>Click image for full size</span></figcaption>
    </figure>
  );
}
