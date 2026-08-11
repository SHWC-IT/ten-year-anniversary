#!/usr/bin/env python3
"""Build the send-ready contact workbook for the 10 Year Anniversary email campaign.

Reads the hand-cleaned membership list and writes a new workbook whose single
sheet is registered as a real Excel Table named "Contacts". Power Automate's
"List rows present in a table" action can only read formatted Tables, so that
registration is the whole point of this step.

The source workbook is never modified.

Re-running mid-campaign is safe: if the output already exists, each contact's
ContactID, Status, SentAt and LastError are carried forward by matching on
email plus first name, so rows already marked Sent stay Sent and nobody gets a
second invitation.

Usage:
    python3 email/tools/build-list.py [--src PATH] [--out PATH]
"""

import argparse
import re
import sys
from pathlib import Path

try:
    from openpyxl import Workbook, load_workbook
    from openpyxl.styles import Alignment, Font, PatternFill
    from openpyxl.utils import get_column_letter
    from openpyxl.worksheet.table import Table, TableStyleInfo
except ImportError:
    sys.exit("openpyxl is required:  pip3 install openpyxl")

SHWC = Path("/Users/brianakumah/Documents/development/SHWC")
DEFAULT_SRC = SHWC / "EMAIL - 10 Year Anniversary Membership List.xlsx"
DEFAULT_OUT = SHWC / "SEND - 10 Year Anniversary.xlsx"

TABLE_NAME = "Contacts"
COLUMNS = ["ContactID", "FirstName", "LastName", "EmailAddress",
           "Gender", "Status", "SentAt", "LastError"]

# Known typo fixes, applied before validation. Keys are lowercased.
# dkando2liberty.edu belongs to Dorene Kyando, so dkando2@liberty.edu is the
# intended address. Verified not already present elsewhere in the list.
CORRECTIONS = {
    "dkando2liberty.edu": "dkando2@liberty.edu",
}

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[A-Za-z]{2,}$")

# Source headers vary between exports, so match on substrings rather than
# exact strings.
HEADER_ALIASES = {
    "FirstName": ("first name", "firstname", "first"),
    "LastName": ("last name", "lastname", "surname", "last"),
    "EmailAddress": ("email address", "email", "e-mail"),
    "Gender": ("gender", "male/female", "sex"),
}


def norm(value):
    return "" if value is None else str(value).strip()


def find_columns(header_row):
    """Map our field names onto the source sheet's column indexes."""
    found = {}
    for idx, cell in enumerate(header_row):
        label = norm(cell).lower()
        if not label:
            continue
        for field, aliases in HEADER_ALIASES.items():
            if field in found:
                continue
            if any(alias in label for alias in aliases):
                found[field] = idx
                break
    missing = [f for f in ("FirstName", "EmailAddress") if f not in found]
    if missing:
        sys.exit(f"Could not find required column(s) {missing} in header: {header_row}")
    return found


def read_source(path):
    wb = load_workbook(path, data_only=True, read_only=True)
    ws = wb[wb.sheetnames[0]]
    rows = [[norm(c) for c in row] for row in ws.iter_rows(values_only=True)]
    wb.close()
    if not rows:
        sys.exit(f"{path} has no rows")
    cols = find_columns(rows[0])
    records = []
    for row in rows[1:]:
        if not any(row):
            continue

        def get(field):
            i = cols.get(field)
            return row[i] if i is not None and i < len(row) else ""

        records.append({
            "FirstName": get("FirstName"),
            "LastName": get("LastName"),
            "EmailAddress": get("EmailAddress"),
            "Gender": get("Gender"),
        })
    return records


def load_previous(path):
    """Carry ContactID and send state forward from an earlier build."""
    if not path.exists():
        return {}, 0
    wb = load_workbook(path, data_only=True)
    if TABLE_NAME not in wb.sheetnames:
        wb.close()
        return {}, 0
    ws = wb[TABLE_NAME]
    rows = [[norm(c) for c in row] for row in ws.iter_rows(values_only=True)]
    wb.close()
    if not rows:
        return {}, 0
    header = rows[0]
    try:
        index = {name: header.index(name) for name in COLUMNS}
    except ValueError:
        return {}, 0
    prior, highest = {}, 0
    for row in rows[1:]:
        if not any(row):
            continue

        def cell(name):
            i = index[name]
            return row[i] if i < len(row) else ""

        key = (cell("EmailAddress").lower(), cell("FirstName").lower())
        prior[key] = {
            "ContactID": cell("ContactID"),
            "Status": cell("Status") or "Ready",
            "SentAt": cell("SentAt"),
            "LastError": cell("LastError"),
        }
        match = re.search(r"(\d+)$", cell("ContactID"))
        if match:
            highest = max(highest, int(match.group(1)))
    return prior, highest


def build(src, out):
    records = read_source(src)
    prior, highest = load_previous(out)

    contacts, review = [], []
    corrected = 0

    for record in records:
        email = record["EmailAddress"].strip().lower()
        if email in CORRECTIONS:
            record["_original"] = email
            email = CORRECTIONS[email]
            corrected += 1
        record["EmailAddress"] = email

        if not EMAIL_RE.match(email):
            review.append(record)
            continue
        contacts.append(record)

    # Deliberately no deduplication. Shared household inboxes are mailed
    # individually, one personalized email per named person.
    next_id = highest
    for contact in contacts:
        key = (contact["EmailAddress"], contact["FirstName"].lower())
        carried = prior.get(key)
        if carried and carried["ContactID"]:
            contact.update(carried)
        else:
            next_id += 1
            contact.update({
                "ContactID": f"SHWC-{next_id:04d}",
                "Status": "Ready",
                "SentAt": "",
                "LastError": "",
            })

    write(out, contacts, review)
    report(src, out, records, contacts, review, corrected, prior)
    return contacts, review


def write(out, contacts, review):
    wb = Workbook()
    ws = wb.active
    ws.title = TABLE_NAME

    header_font = Font(bold=True, color="FF0D1322")
    header_fill = PatternFill("solid", fgColor="FFC9A356")

    ws.append(COLUMNS)
    for cell in ws[1]:
        cell.font = header_font
        cell.fill = header_fill
        cell.alignment = Alignment(horizontal="left")

    for contact in contacts:
        ws.append([contact.get(name, "") for name in COLUMNS])

    # Force text format so Excel never reinterprets a name or a timestamp.
    for row in ws.iter_rows(min_row=2, max_row=ws.max_row, max_col=len(COLUMNS)):
        for cell in row:
            cell.number_format = "@"

    widths = {"ContactID": 12, "FirstName": 18, "LastName": 20,
              "EmailAddress": 34, "Gender": 10, "Status": 12,
              "SentAt": 18, "LastError": 40}
    for idx, name in enumerate(COLUMNS, start=1):
        ws.column_dimensions[get_column_letter(idx)].width = widths[name]

    # The Table registration is what makes this file readable by Power Automate.
    ref = f"A1:{get_column_letter(len(COLUMNS))}{ws.max_row}"
    table = Table(displayName=TABLE_NAME, ref=ref)
    table.tableStyleInfo = TableStyleInfo(
        name="TableStyleMedium2", showRowStripes=True)
    ws.add_table(table)
    ws.freeze_panes = "A2"

    if review:
        rs = wb.create_sheet("Review")
        rs.append(["FirstName", "LastName", "EmailAsGiven", "Gender", "Problem"])
        for cell in rs[1]:
            cell.font = header_font
            cell.fill = header_fill
        for record in review:
            rs.append([record["FirstName"], record["LastName"],
                       record.get("_original") or record["EmailAddress"],
                       record["Gender"],
                       "Not a valid email address, excluded from the send"])
        for idx, width in enumerate([18, 20, 34, 10, 46], start=1):
            rs.column_dimensions[get_column_letter(idx)].width = width

    out.parent.mkdir(parents=True, exist_ok=True)
    wb.save(out)


def report(src, out, records, contacts, review, corrected, prior):
    addresses = [c["EmailAddress"] for c in contacts]
    unique = sorted(set(addresses))
    repeats = {a: addresses.count(a) for a in unique if addresses.count(a) > 1}
    by_status = {}
    for contact in contacts:
        by_status[contact["Status"]] = by_status.get(contact["Status"], 0) + 1

    print(f"source          {src.name}")
    print(f"output          {out}")
    print(f"rows read       {len(records)}")
    print(f"corrected       {corrected}")
    print(f"excluded        {len(review)}  (see the Review sheet)")
    print(f"rows written    {len(contacts)}")
    print(f"unique inboxes  {len(unique)}")
    print(f"status counts   {by_status}")
    if prior:
        print(f"carried forward {len(prior)} rows of prior send state")
    if repeats:
        print(f"shared inboxes  {len(repeats)}, mailed individually as requested:")
        for address, count in sorted(repeats.items()):
            names = sorted(c["FirstName"] for c in contacts
                           if c["EmailAddress"] == address)
            print(f"                  {address} x{count}  {', '.join(names)}")
    if len(records) != len(contacts) + len(review):
        sys.exit("Reconciliation failed: rows read does not equal written plus excluded")
    print("reconciled      OK")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--src", type=Path, default=DEFAULT_SRC)
    parser.add_argument("--out", type=Path, default=DEFAULT_OUT)
    args = parser.parse_args()
    if not args.src.exists():
        sys.exit(f"Source not found: {args.src}")
    build(args.src, args.out)


if __name__ == "__main__":
    main()
