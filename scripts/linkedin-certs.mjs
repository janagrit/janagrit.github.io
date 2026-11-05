#!/usr/bin/env node
// Turns the LinkedIn data export (Certifications.csv) into data/certificates.json for the homepage.
// LinkedIn: Settings → Data privacy → Get a copy of your data → Certifications.
// Drop the file at data/linkedin/Certifications.csv and push; .github/workflows/certificates.yml runs this.
// Run by hand: node scripts/linkedin-certs.mjs [path/to/Certifications.csv]
// Columns used: Name, Url, Authority, Started On (e.g. "Oct 2026"). Other columns are ignored.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const input = process.argv[2] || 'data/linkedin/Certifications.csv';
const output = 'data/certificates.json';

if (!existsSync(input)) {
  console.log(`No ${input}; leaving ${output} as it is.`);
  process.exit(0);
}

// RFC 4180 CSV: quoted fields, "" escapes, commas and newlines inside quotes.
function parseCsv(text) {
  const rows = [];
  let row = [], field = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field); rows.push(row); row = []; field = '';
    } else field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows.filter(r => r.some(v => v.trim()));
}

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
// "Oct 2026" | "October 2026" | "2026-10" | "10/2026" | "2026" -> "2026-10" / "2026"; anything else -> null
function toMonth(value) {
  const v = (value || '').trim();
  let m;
  if ((m = v.match(/^([A-Za-z]{3})[a-z]*\.? (\d{4})$/))) {
    const i = MONTHS.indexOf(m[1].toLowerCase());
    return i === -1 ? null : `${m[2]}-${String(i + 1).padStart(2, '0')}`;
  }
  if ((m = v.match(/^(\d{4})-(\d{1,2})/))) return `${m[1]}-${m[2].padStart(2, '0')}`;
  if ((m = v.match(/^(\d{1,2})\/(\d{4})$/))) return `${m[2]}-${m[1].padStart(2, '0')}`;
  if ((m = v.match(/^(\d{4})$/))) return m[1];
  return null;
}

function toUrl(value) {
  try {
    const url = new URL((value || '').trim());
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : null;
  } catch {
    return null;
  }
}

const [header, ...rows] = parseCsv(readFileSync(input, 'utf8').replace(/^﻿/, ''));
const col = name => header.findIndex(h => h.trim().toLowerCase() === name);
const at = { name: col('name'), url: col('url'), issuer: col('authority'), date: col('started on') };
if (at.name === -1) {
  console.error(`${input}: no "Name" column. Header was: ${header.join(', ')}`);
  process.exit(1);
}
const get = (row, i) => (i === -1 ? '' : (row[i] || '').trim());

const certs = rows
  .map(r => ({
    name: get(r, at.name),
    issuer: get(r, at.issuer) || null,
    date: toMonth(get(r, at.date)),
    url: toUrl(get(r, at.url))
  }))
  .filter(c => c.name)
  // newest first; undated ones last
  .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

writeFileSync(output, JSON.stringify(certs, null, 2) + '\n');
console.log(`Wrote ${certs.length} certificate(s) to ${output}.`);
