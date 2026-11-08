import LampMark from '@/components/lamp-mark';
import SocialIcon from '@/components/social-icon';
import { desktopRelease } from '@/lib/desktop-release';

const socials = [
  { name: 'github', label: 'GitHub', url: desktopRelease.source },
  { name: 'bluesky', label: 'Bluesky', url: 'https://bsky.app/profile/diyalamp.com' },
  { name: 'reddit', label: 'Reddit', url: 'https://www.reddit.com/r/DiyaLamp/' },
] as const;

export default function SiteFooter() {
  return (
    <footer className="landing-footer">
      <a href="/" className="landing-brand"><LampMark className="brand-lamp" />diyalamp</a>
      <p className="production-credit">
        A <a href="https://jrxna.com"><img src="/jrxna-logo.webp" alt="JRXNA" width="256" height="60" loading="lazy" decoding="async" /></a> Production
      </p>
      <nav className="footer-socials" aria-label="diyalamp social accounts">
        {socials.map(({ name, label, url }) => (
          <a key={name} href={url} aria-label={label} title={label}><SocialIcon name={name} /></a>
        ))}
      </nav>
    </footer>
  );
}
