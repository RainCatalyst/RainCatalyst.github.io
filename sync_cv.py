#!/usr/bin/env python3
"""
Sync title/description, jobs, and education from public/index.html to cv_draft.md.

Usage:
    python sync_cv.py
    python sync_cv.py --html public/index.html --md cv_draft.md
"""

import re
import json
import argparse
from pathlib import Path


# ── Parsing ───────────────────────────────────────────────────────────────────

def extract_js_array(html: str, varname: str) -> str:
    """Extract the full [...] content of a JS array variable from HTML."""
    m = re.search(rf'const\s+{varname}\s*=\s*(\[)', html)
    if not m:
        raise ValueError(f"Could not find 'const {varname}' in HTML")

    start = m.start(1)
    depth = 0
    for i in range(start, len(html)):
        if html[i] == '[':
            depth += 1
        elif html[i] == ']':
            depth -= 1
            if depth == 0:
                return html[start : i + 1]
    raise ValueError(f"Unmatched bracket for '{varname}'")


def parse_js_array(js_str: str) -> list:
    """Parse a JS array literal as JSON (quotes bare keys, strips trailing commas)."""
    # Quote unquoted object keys: word: → "word":
    s = re.sub(r'(?m)^\s*(\w+):', lambda m: m.group(0).replace(m.group(1), f'"{m.group(1)}"', 1), js_str)
    # Strip trailing commas before } or ]
    s = re.sub(r',(\s*[}\]])', r'\1', s)
    return json.loads(s)


def extract_summary(html: str) -> str:
    """Extract the profile summary paragraph from the HTML template string."""
    m = re.search(
        r'<p class="mb-4 text-gray-800 leading-relaxed">\s*(.*?)\s*</p>',
        html, re.DOTALL
    )
    if not m:
        return None
    text = m.group(1)
    text = re.sub(r'<br\s*/?>', '\n', text)
    text = re.sub(r'<[^>]+>', '', text)
    lines = [l.strip() for l in text.splitlines()]
    return '\n'.join(l for l in lines if l)


def extract_preserved_block(md: str, marker: str) -> str:
    """Return the text starting from `marker` to the next --- or end of section."""
    idx = md.find(marker)
    if idx == -1:
        return ''
    end = md.find('\n---', idx)
    block = md[idx : end].rstrip() if end != -1 else md[idx:].rstrip()
    return '\n\n' + block


# ── Formatting ────────────────────────────────────────────────────────────────

def format_job(job: dict) -> str:
    """Format a job dict as a cv_draft.md entry."""
    name = job['name']
    extra = job.get('extra', '').strip('()')   # "(2022 – 2024)" → "2022 – 2024"
    description = job.get('description', '').strip()

    header = f"**{name}** *{extra}*"

    # Split description into bullet points on sentence boundaries
    sentences = re.split(r'(?<=[^A-Z]\.)\s+(?=[A-Z])', description)
    bullets = '\n'.join(f'- {s.rstrip(".")}' for s in sentences if s.strip())

    return f"{header}\n{bullets}"


def format_education(edu: dict) -> str:
    """Format an education dict as a cv_draft.md entry."""
    return (
        f"**{edu['degree']}** — {edu['institution']} *({edu['period']})*"
    )


# ── Section replacement ───────────────────────────────────────────────────────

def replace_section(md: str, heading: str, new_body: str) -> str:
    """Replace the body of a ## heading (up to the next --- or end of file)."""
    pattern = re.compile(
        rf'(## {re.escape(heading)}\n)(.*?)(\n---|\Z)',
        re.DOTALL
    )
    m = pattern.search(md)
    if not m:
        raise ValueError(f"Section '## {heading}' not found in markdown")
    return md[: m.start(2)] + '\n' + new_body + '\n' + md[m.start(3):]


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description='Sync index.html → cv_draft.md')
    parser.add_argument('--html', default='public/index.html')
    parser.add_argument('--md',   default='cv_draft.md')
    args = parser.parse_args()

    html_path = Path(args.html)
    md_path   = Path(args.md)

    html = html_path.read_text(encoding='utf-8')
    md   = md_path.read_text(encoding='utf-8')

    # ── Extract from HTML ─────────────────────────────────────────────────────
    jobs      = parse_js_array(extract_js_array(html, 'jobs'))
    education = parse_js_array(extract_js_array(html, 'education'))
    summary   = extract_summary(html)

    # ── Preserve manually-written blocks that live inside synced sections ─────
    personal_projects = extract_preserved_block(md, '**Personal Projects**')

    # ── Build new section bodies ──────────────────────────────────────────────
    jobs_body = '\n\n'.join(format_job(j) for j in jobs) + personal_projects
    edu_body  = '\n\n'.join(format_education(e) for e in education)

    # ── Write back ────────────────────────────────────────────────────────────
    if summary:
        md = replace_section(md, 'Summary', summary)
    md = replace_section(md, 'Work Experience', jobs_body)
    md = replace_section(md, 'Education', edu_body)

    md_path.write_text(md, encoding='utf-8')
    print(f"Done: {md_path} updated from {html_path}")


if __name__ == '__main__':
    main()
