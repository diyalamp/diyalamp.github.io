/** Public desktop release and architecture-specific installers. */
const version = '1.3.5';
const source = 'https://github.com/diyalamp/diyalamp';
const assets = `${source}/releases/download/v${version}`;

const downloads = [
  { label: 'Apple silicon', architecture: 'arm64' },
  { label: 'Intel', architecture: 'x86_64' },
].map(({ label, architecture }) => {
  const url = `${assets}/diyalamp-${version}-macos-${architecture}.dmg`;
  return { label, architecture, url, checksum: `${url}.sha256` };
});

export const desktopRelease = {
  version,
  source,
  url: `${source}/releases/tag/v${version}`,
  installation: `${source}/blob/v${version}/docs/install.md`,
  downloads,
};
