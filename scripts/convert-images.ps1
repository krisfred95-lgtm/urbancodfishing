# Converts Google Drive image downloads into web-ready JPGs for the UCF fish gallery.
#
# WHY: The Google Drive MCP `download_file_content` tool returns each image as a big
# base64 JSON blob saved to a file (because it is too large to read inline). This script
# decodes those blobs, fixes phone rotation (EXIF orientation), shrinks them to max 1200px,
# and saves them as small JPGs into public/images/fish/. No extra software needed — it uses
# the Windows built-in HEIF codec + WIC (works for HEIC, PNG and JPG).
#
# USAGE:
#   ./convert-images.ps1 -DumpDir "<folder with the download_file_content .txt dumps>"
#                        -OutDir  "C:\Users\krisf\Desktop\urbancodfishing\public\images\fish"
#
# Each dump file is JSON: { content: <base64>, id, mimeType, title }. Output is named after
# the original title (e.g. IMG_4665.HEIC -> IMG_4665.jpg).

param(
  [string]$DumpDir,                 # convert every *download_file_content*.txt in this folder
  [string]$DumpFile,                # OR convert just this single dump file (race-free for parallel agents)
  [string]$OutDir = "C:\Users\krisf\Desktop\urbancodfishing\public\images\fish",
  [int]$MaxDim = 1200,
  [int]$Quality = 82
)

New-Item -ItemType Directory -Force $OutDir | Out-Null
Add-Type -AssemblyName PresentationCore

function Convert-One($jsonPath, $OutDir, $MaxDim, $Quality) {
  $json = Get-Content $jsonPath -Raw | ConvertFrom-Json
  if (-not $json.content) { return }
  $bytes = [Convert]::FromBase64String($json.content)
  $base = [System.IO.Path]::GetFileNameWithoutExtension($json.title)
  $ms = New-Object System.IO.MemoryStream(, $bytes)
  $dec = [System.Windows.Media.Imaging.BitmapDecoder]::Create(
    $ms,
    [System.Windows.Media.Imaging.BitmapCreateOptions]::PreservePixelFormat,
    [System.Windows.Media.Imaging.BitmapCacheOption]::OnLoad)
  $frame = $dec.Frames[0]
  $ori = 1
  try { $o = $frame.Metadata.GetQuery("System.Photo.Orientation"); if ($o) { $ori = [int]$o } } catch {}
  $angle = 0; if ($ori -eq 6) { $angle = 90 } elseif ($ori -eq 3) { $angle = 180 } elseif ($ori -eq 8) { $angle = 270 }
  $scale = [Math]::Min(1.0, $MaxDim / [Math]::Max($frame.PixelWidth, $frame.PixelHeight))
  $img = New-Object System.Windows.Media.Imaging.TransformedBitmap($frame, (New-Object System.Windows.Media.ScaleTransform($scale, $scale)))
  if ($angle -ne 0) {
    $img = New-Object System.Windows.Media.Imaging.TransformedBitmap($img, (New-Object System.Windows.Media.RotateTransform($angle)))
  }
  $enc = New-Object System.Windows.Media.Imaging.JpegBitmapEncoder; $enc.QualityLevel = $Quality
  $enc.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($img))
  $out = Join-Path $OutDir "$base.jpg"
  $fs = [System.IO.File]::Create($out); $enc.Save($fs); $fs.Close()
  Write-Output ("{0,-44} -> {1}x{2}, {3} KB" -f "$base.jpg", $img.PixelWidth, $img.PixelHeight, [Math]::Round((Get-Item $out).Length / 1KB, 0))
}

if ($DumpFile) {
  try { Convert-One $DumpFile $OutDir $MaxDim $Quality } catch { Write-Output "FAIL $DumpFile : $_" }
}
elseif ($DumpDir) {
  Get-ChildItem $DumpDir -Filter "*download_file_content*.txt" | ForEach-Object {
    try { Convert-One $_.FullName $OutDir $MaxDim $Quality } catch { Write-Output "FAIL $($_.Name): $_" }
  }
}
else { Write-Output "Provide -DumpFile <path> or -DumpDir <folder>" }
