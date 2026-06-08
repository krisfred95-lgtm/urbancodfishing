# Monthly Catch Update — recipe

Run this once a month to add the latest fishing photos to the website's
**Catch Gallery** and **Monthly Catch Log** (`/catch`).

> **Why this is run on Kris's PC (not a cloud schedule):** the job needs three
> things that only live on this machine — access to the shared Google Drive,
> the Windows HEIF image codec (to read iPhone HEIC photos), and the website
> repo. A cloud scheduler can't reach any of those, so the monthly reminder
> fires automatically but the actual run happens here.

## What "good catch" means
- **Cod (torsk):** length ≥ 70 cm
- **Halibut (kveite):** always a good catch
- **Coalfish / saithe (sei):** length ≥ 50 cm

## Categories
`fish` · `urban-cod-fishing` · `camping` · `family-crab-fishing` ·
`polar-night-midnight-sun` · `other` (screenshots / no real catch)

## Steps (Claude does these)
1. **Find new photos.** Search the Drive "UCF" folder
   (`parentId = '1AHv-hKU88Ec8cQIBpgj5SRON5d7F5mHJ'`) for images with
   `createdTime` after the last run. Last run is the `updated` date in
   `content/catches.json`. (Also check the "Bilder von mir" subfolder
   `1uQDGp24GumF4wQgYCHATM8xsWXaeU6fh`.)
2. **Download** each new image with the Drive MCP `download_file_content`.
   Each one is saved as a big base64 `.txt` dump in the session's
   `tool-results` folder (the tool reports the path).
3. **Convert** all dumps to web-ready JPGs:
   ```powershell
   ./scripts/convert-images.ps1 -DumpDir "<the tool-results folder>"
   ```
   Output lands in `public/images/fish/` (auto-rotated, ≤1200px, ~50–200 KB).
4. **Analyse** each JPG with the Read tool. For each, decide: category,
   a short descriptive `title`, whether it has a fish, species guess +
   confidence, estimated length (cm) and weight (kg), and apply the good-catch
   rule above. Be honest — size/weight are estimates; use `other` and
   `hasFish: false` for non-catch photos.
5. **Append** one entry per photo to the `catches` array in
   `content/catches.json` (don't duplicate existing `id`s). Bump the top-level
   `updated` field to today's date.
6. **Verify**: `npm run dev`, open http://localhost:3000/catch, confirm the new
   photos and the refreshed monthly row look right.
7. **Commit** the changes. **Ask Kris before pushing** to GitHub/Vercel.

## Entry schema (one object in `catches[]`)
```json
{
  "id": "<drive-file-id>",
  "fileName": "IMG_4953",
  "image": "/images/fish/IMG_4953.jpg",
  "category": "urban-cod-fishing",
  "title": "Small cod held up against the apartment blocks",
  "hasFish": true,
  "species": "Atlantic cod (torsk)",
  "speciesConfidence": "low",
  "estLengthCm": 35,
  "estWeightKg": 0.4,
  "goodCatch": false,
  "goodReason": "",
  "dateTaken": "2026-05-30"
}
```
