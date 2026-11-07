/** Public desktop release references tied to the measured universal Mac installer. */
const version = '0.1.0';
const source = 'https://github.com/diyalamp/diyalamp';
const asset = 'DiyaLamp-macOS.dmg';

export const desktopRelease = {
  version,
  downloadBytes: 1915883,
  installedBytes: 3686400,
  minimumMacOS: '15',
  source,
  url: `${source}/releases/tag/v${version}`,
  dmg: `${source}/releases/download/v${version}/${asset}`,
  checksum: `${source}/releases/download/v${version}/${asset}.sha256`,
};
