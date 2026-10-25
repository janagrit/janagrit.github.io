"""Email a summary of the last full hour of GoatCounter visits, if there were any.

The repo is public, so its Action logs are too: never print visitor details here.
"""
import json
import os
import smtplib
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone
from email.message import EmailMessage

SITE = "https://janagrit.goatcounter.com"
TOKEN = os.environ["GOATCOUNTER_TOKEN"]
GMAIL_USER = os.environ["GMAIL_USER"]
GMAIL_APP_PASSWORD = os.environ["GMAIL_APP_PASSWORD"]

REF_KIND = {"c": "campaign link", "g": "search", "h": "link", "o": "other"}


def api(path, **params):
    url = f"{SITE}/api/v0/{path}?{urllib.parse.urlencode(params)}"
    req = urllib.request.Request(url, headers={
        "Authorization": f"Bearer {TOKEN}",
        "Content-Type": "application/json",
    })
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.load(resp)


def main():
    end = datetime.now(timezone.utc).replace(minute=0, second=0, microsecond=0)
    start = end - timedelta(hours=1)
    window = {"start": start.isoformat(), "end": end.isoformat()}

    pages = [h for h in api("stats/hits", limit=100, **window)["hits"] if h["count"] > 0]
    if not pages:
        print("No visits in the last hour.")
        return

    lines = [f"Visits {start:%Y-%m-%d %H:%M}–{end:%H:%M} UTC", ""]
    for page in pages:
        lines.append(f"{page['path']}: {page['count']} visitor(s)")
        refs = api(f"stats/hits/{page['path_id']}", limit=20, **window).get("refs") or []
        for ref in refs:
            name = ref.get("name") or "(direct / unknown)"
            kind = REF_KIND.get(ref.get("ref_scheme") or "", "")
            lines.append(f"    from {name}" + (f" [{kind}]" if kind else "") + f": {ref['count']}")
    lines += ["", f"Dashboard: {SITE}"]

    total = sum(p["count"] for p in pages)
    msg = EmailMessage()
    msg["Subject"] = f"janagrit.github.io: {total} visitor(s) in the last hour"
    msg["From"] = GMAIL_USER
    msg["To"] = GMAIL_USER
    msg.set_content("\n".join(lines))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
        smtp.login(GMAIL_USER, GMAIL_APP_PASSWORD)
        smtp.send_message(msg)
    print("Visits found; alert email sent.")


if __name__ == "__main__":
    main()
