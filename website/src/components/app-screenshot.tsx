import { screenshotRevision } from "@/lib/desktop-release";

const captures = {
  workspace: {
    src: "/screenshots/workspace.webp",
    sizes: "(max-width: 514px) calc(100vw - 36px), (max-width: 1200px) 93vw, 1112px",
    alt: "The diyalamp editor shows Database Indexes with rendered Markdown, a local note graph, and incoming and outgoing links.",
  },
  search: {
    src: "/screenshots/search-and-split.webp",
    sizes: "(max-width: 514px) calc(100vw - 36px), (max-width: 920px) 93vw, 660px",
    alt: "Search results for index appear beside the Database Indexes and Query Plans notes in two editor panes.",
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
  const { src, sizes, alt } = captures[name];
  const width = 2882;
  const height = 1920;
  const versioned = (url: string) => `${url}?v=${screenshotRevision}`;
  const srcSet = [720, 1440].map((candidate) =>
    `${versioned(src.replace('.webp', `-${candidate}.webp`))} ${candidate}w`,
  );
  srcSet.push(`${versioned(src)} ${width}w`);
  return (
    <figure className="app-screen">
      <a className="app-window" href={versioned(src)} aria-label={`View full-size screenshot. ${alt}`}>
        <img
          src={versioned(src)}
          srcSet={srcSet.join(', ')}
          sizes={sizes}
          width={width}
          height={height}
          alt={alt}
          decoding="async"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
        />
      </a>
      <figcaption>{caption}<span aria-hidden="true">View full size ↗</span></figcaption>
    </figure>
  );
}
