"""Keep the small, single-page site's critical styles in its first response."""
from pathlib import Path
import re
root = Path(__file__).resolve().parents[1]
page = root / 'dist/index.html'
css = (root / 'dist/style.css').read_text()
assert '</style' not in css.lower()
html = page.read_text()
script_version = re.search(r'app\.js\?v=([^\"]+)', html).group(1)
style = '<style id="page-styles" data-release="' + script_version + '">\n' + css + '\n</style>'
pattern = r'<style id="page-styles".*?</style>|<link rel="stylesheet" href="style\.css[^\"]*">'
html, count = re.subn(pattern, lambda _: style, html, flags=re.S)
assert count == 1, 'Expected exactly one generated stylesheet location'
page.write_text(html)
