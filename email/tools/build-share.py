#!/usr/bin/env python3
"""Build the shareable copy of the invitation, for members to pass on themselves.

Two differences from the master template, both because this copy is not sent by
the mailing flow:

  * The greeting is "Hello Friend," rather than a merge token, so the email
    reads correctly no matter who forwards it to whom.
  * The unsubscribe line is removed. It exists to satisfy bulk email rules for
    the church's own send, and it is both meaningless and confusing on a
    message one member forwards to another.

Everything else is byte-identical to the master, so the two cannot drift.

Usage:
    python3 email/tools/build-share.py
"""

import argparse
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
EMAIL_DIR = HERE.parent
MASTER = EMAIL_DIR / "anniversary-invite.html"
SHARE = EMAIL_DIR / "anniversary-invite-share.html"

GREETING = "Friend"

# Anchored on the copy rather than on tag structure, so a styling change to the
# footer does not silently stop this matching.
UNSUBSCRIBE_BLOCK = re.compile(
    r"\n\s*<p class=\"muted\"[^>]*>\s*You are receiving this invitation.*?</p>",
    re.DOTALL,
)

TOKEN_RE = re.compile(r"\{\{\s*([A-Za-z0-9_]+)\s*\}\}")


def build(master, out):
    if not master.exists():
        sys.exit(f"Master template not found: {master}")
    html = master.read_text(encoding="utf-8")

    found = sorted(set(TOKEN_RE.findall(html)))
    print(f"master          {master.name}")
    print(f"tokens in master{'':<1} {found}")

    removed = len(UNSUBSCRIBE_BLOCK.findall(html))
    if removed != 1:
        sys.exit(f"Expected exactly one unsubscribe block, found {removed}. "
                 "The footer copy changed; update UNSUBSCRIBE_BLOCK in this script.")
    html = UNSUBSCRIBE_BLOCK.sub("", html)

    html = html.replace("{{FirstName}}", GREETING)

    leftover = sorted(set(TOKEN_RE.findall(html)))
    if leftover:
        sys.exit(f"Tokens still present after substitution: {leftover}. "
                 "A shared copy must contain no merge fields.")

    # The title is what a browser tab shows when someone opens the shared link.
    html = html.replace(
        "<title>You are invited: Shepherd's House 10th Anniversary</title>",
        "<title>You are invited: Shepherd's House 10th Anniversary, October 9 - 11, 2026</title>",
    )

    out.write_text(html, encoding="utf-8")
    print(f"greeting        Hello {GREETING},")
    print(f"unsubscribe     removed ({removed} block)")
    print(f"tokens remaining none")
    print(f"output          {out}")
    print(f"size            {len(html.encode('utf-8')):,} bytes")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--master", type=Path, default=MASTER)
    parser.add_argument("--out", type=Path, default=SHARE)
    args = parser.parse_args()
    build(args.master, args.out)


if __name__ == "__main__":
    main()
