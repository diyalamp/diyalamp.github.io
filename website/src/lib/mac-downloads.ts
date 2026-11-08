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
  setup: 'No account for local notes. Optional Sync requires sign-in.',
  setupSource: 'https://obsidian.md/security',
};

const notion = {
  name: 'Notion',
  version: '7.42.3',
  bytes: 136229832,
  build: 'Apple silicon DMG',
  downloadSource: 'https://desktop-release.notion-static.com/Notion-7.42.3-arm64.dmg',
  setup: 'Sign in to a workspace. Download pages to edit them offline.',
  setupSource: 'https://www.notion.com/help/use-pages-offline',
};

const typora = {
  name: 'Typora',
  version: '1.14.15',
  bytes: 15163025,
  build: 'macOS DMG with Apple silicon support',
  downloadSource: 'https://downloads.typora.io/mac/Typora-1.14.15.dmg',
  setup: 'Local files. Paid activation after a 15-day trial.',
  setupSource: 'https://support.typora.io/purchase/',
};

export const macDownloads = [obsidian, notion, typora];
