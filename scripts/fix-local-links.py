#!/usr/bin/env python3
"""Make generated HTML links usable over file:// as well as HTTP."""
from pathlib import Path
import os
import re
from urllib.parse import urlsplit, unquote

ROOT = Path(__file__).resolve().parents[1]
HOSTS = {'dominictristram.com', 'www.dominictristram.com', 'dominictristram.github.io'}

def local_url(value, page):
    if not value or value.startswith('#'):
        return value
    if value.startswith(('www.', 'bit.ly/', 'voteforpolicies.org.uk', 'whocanivotefor.co.uk')):
        return 'https://' + value
    url = urlsplit(value)
    if url.netloc and url.hostname not in HOSTS:
        return value
    if url.scheme and url.scheme not in {'http', 'https'}:
        return value
    if url.scheme and not url.netloc:
        return value
    if url.netloc or url.path.startswith('/'):
        target = ROOT / unquote(url.path.lstrip('/'))
    else:
        target = page.parent / unquote(url.path)
    target = Path(os.path.normpath(target))
    if not target.is_relative_to(ROOT):
        return value
    if target.is_dir() and (target / 'index.html').is_file():
        target /= 'index.html'
    elif not target.is_file() and target.with_suffix('.html').is_file():
        target = target.with_suffix('.html')
    if not target.is_file():
        # Older articles used /images before assets were moved.
        image = ROOT / 'assets/img' / target.name
        if '/images/' in str(target) and image.is_file():
            target = image
        else:
            return value
    relative = os.path.relpath(target, page.parent).replace(os.sep, '/')
    return relative + ('?' + url.query if url.query else '') + ('#' + url.fragment if url.fragment else '')

def update(page):
    # Preserve historical page encodings and whitespace exactly.
    original = page.read_bytes().decode('latin1')
    def attribute(m):
        # Canonical metadata deliberately identifies the public URL.
        if m[1].lower() == 'link' and re.search(r'\brel=["\x27]canonical["\x27]', m[2], re.I):
            return m[0]
        attrs = re.sub(r'(\b(?:href|src|poster|action|data-img-src-\d+)\s*=\s*)(["\x27])(.*?)\2',
                       lambda a: a[1] + a[2] + local_url(a[3], page) + a[2], m[2], flags=re.I)
        return '<' + m[1] + attrs + '>'
    result = re.sub(r'<([a-zA-Z][\w:-]*)(\s[^<>]*?)?>',
                    lambda m: attribute(m) if m[2] else m[0], original)
    result = re.sub(r'(<a\b[^>]*\bhref=)(["\x27])\2',
                    lambda m: m[1] + m[2] + local_url('/', page) + m[2], result, flags=re.I)
    result = re.sub(r'("url"\s*:\s*")([^"]+)(")',
                    lambda m: m[1] + local_url(m[2], page) + m[3], result)
    result = re.sub(r'url\((["\x27]?)([^)"\x27]+)\1\)',
                    lambda m: 'url(' + m[1] + local_url(m[2], page) + m[1] + ')', result)
    if result != original:
        page.write_bytes(result.encode('latin1'))
        return True
    return False

if __name__ == '__main__':
    print(f'Updated {sum(update(p) for p in ROOT.rglob("*.html"))} HTML files.')
