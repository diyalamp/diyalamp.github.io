/** Public desktop release references; keep installer byte counts tied to measured assets. */
const version = '1.1.3';
const source = 'https://github.com/diyalamp/diyalamp';

export const desktopRelease = {
  version,
  source,
  url: `${source}/releases/tag/v${version}`,
  appleSilicon: `${source}/releases/download/v${version}/diyalamp-${version}-macos-arm64.dmg`,
  intel: `${source}/releases/download/v${version}/diyalamp-${version}-macos-x86_64.dmg`,
  installation: `${source}/blob/main/docs/install.md`,
};
