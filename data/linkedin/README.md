# LinkedIn certificates

1. LinkedIn → Settings → Data privacy → **Get a copy of your data** → tick **Certifications** → Request archive.
2. Unzip the email download and copy **only** `Certifications.csv` into this folder.
3. Commit and push. The "Certificates from LinkedIn" GitHub Action rebuilds `data/certificates.json`, and the homepage lists them.

Only `Certifications.csv` and this README can be committed here (see `.gitignore`), so nothing else from the export ends up in the public repo.
