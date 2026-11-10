/** Public desktop release and architecture-specific installers. */
const version = '1.3.9';
const source = 'https://github.com/diyalamp/diyalamp';
const assets = `${source}/releases/download/v${version}`;

const downloads = [
  { label: 'Apple silicon', architecture: 'arm64', bytes: 42_256_091, previousBytes: 48_239_105 },
  { label: 'Intel', architecture: 'x86_64', bytes: 43_782_726, previousBytes: 49_634_711 },
].map((download) => {
  const url = `${assets}/diyalamp-${version}-macos-${download.architecture}.dmg`;
  return { ...download, url, checksum: `${url}.sha256` };
});

export const desktopRelease = {
  version,
  source,
  url: `${source}/releases/tag/v${version}`,
  previousUrl: `${source}/releases/tag/v1.3.4`,
  installation: `${source}/blob/v${version}/docs/install.md`,
  downloads,
};
