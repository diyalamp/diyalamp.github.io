import { desktopRelease } from './desktop-release';

export const comparisonDate = '2026-11-07';

export function decimalMegabytes(bytes: number, digits = 1) {
  return (bytes / 1e6).toFixed(digits);
}

const obsidian = {
  name: 'Obsidian',
  version: '1.15.0',
  bytes: 233228137,
  build: 'Universal DMG',
  downloadSource: 'https://api.github.com/repos/obsidianmd/obsidian-releases/releases/assets/693337944',
  setup: 'No account for local notes. Optional Obsidian Sync requires sign-in.',
  setupSource: 'https://obsidian.md/security',
};

const notion = {
  name: 'Notion',
  version: '7.42.3',
  bytes: 136229832,
  build: 'Apple silicon DMG',
  downloadSource: 'https://desktop-release.notion-static.com/Notion-7.42.3-arm64.dmg',
  setup: 'Sign in to edit in a workspace. Offline editing is available for downloaded pages.',
  setupSource: 'https://www.notion.com/help/sharing-and-permissions#general-access',
};

const typora = {
  name: 'Typora',
  version: '1.14.15',
  bytes: 15163025,
  build: 'macOS DMG with Apple silicon support',
  downloadSource: 'https://downloads.typora.io/mac/Typora-1.14.15.dmg',
  setup: 'Local files. One-time paid license and activation after a 15-day trial.',
  setupSource: 'https://support.typora.io/activation/',
};

export const macDownloads = [
  {
    name: 'diyalamp',
    version: desktopRelease.version,
    bytes: desktopRelease.downloadBytes,
    build: 'Universal DMG',
    downloadSource: desktopRelease.dmg,
    setup: 'No account, subscription, or license activation. Edit local files offline.',
    setupSource: '/#questions',
  },
  obsidian,
  notion,
  typora,
];

const reduction = (otherBytes: number) => (100 * (1 - desktopRelease.downloadBytes / otherBytes)).toFixed(1);
export const downloadReduction = {
  obsidian: reduction(obsidian.bytes),
  notion: reduction(notion.bytes),
  typora: reduction(typora.bytes),
};
