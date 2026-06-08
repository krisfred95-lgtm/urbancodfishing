# Shown once a month by the "UCF Monthly Catch Update" scheduled task.
# Opens the recipe and reminds Kris to run the update with Claude on this PC.
Add-Type -AssemblyName System.Windows.Forms
$recipe = "C:\Users\krisf\Desktop\urbancodfishing\scripts\MONTHLY_CATCH_UPDATE.md"
try { Start-Process $recipe } catch {}
[System.Windows.Forms.MessageBox]::Show(
  "Time to update the Urban Cod Fishing catch log!`n`n" +
  "Open Claude in the urbancodfishing project and say:`n" +
  "    run the monthly catch update`n`n" +
  "The step-by-step recipe just opened for reference.",
  "UCF - Monthly Catch Update",
  [System.Windows.Forms.MessageBoxButtons]::OK,
  [System.Windows.Forms.MessageBoxIcon]::Information
) | Out-Null
