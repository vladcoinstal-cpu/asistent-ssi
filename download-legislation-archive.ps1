$ErrorActionPreference = 'Stop'

$workspaceRoot = 'C:\Users\lol\Documents\Codex\2026-04-27\vreau-un-program-care-sa-realizeze'
$legislationRoot = Join-Path $workspaceRoot 'legislation-original'
$manifestPath = Join-Path $legislationRoot 'manifest-acte.json'
$indexPath = Join-Path $legislationRoot 'index.json'
$archiveHtmlPath = Join-Path $legislationRoot 'archive-readonly-html'
$downloadLogPath = Join-Path $legislationRoot 'download-log.json'

function Read-JsonFile {
  param([string]$Path)
  return Get-Content -Raw -LiteralPath $Path | ConvertFrom-Json
}

function Write-JsonFile {
  param(
    [string]$Path,
    [Parameter(Mandatory = $true)]$Value
  )
  $Value | ConvertTo-Json -Depth 20 | Set-Content -LiteralPath $Path -Encoding UTF8
}

function Ensure-ObjectProperty {
  param(
    [Parameter(Mandatory = $true)]$Object,
    [Parameter(Mandatory = $true)][string]$Name,
    $Value = $null
  )

  if ($Object.PSObject.Properties.Name -contains $Name) {
    $Object.$Name = $Value
  } else {
    $Object | Add-Member -NotePropertyName $Name -NotePropertyValue $Value
  }
}

function Ensure-Directory {
  param([string]$Path)
  New-Item -ItemType Directory -Force -Path $Path | Out-Null
}

function Get-DownloadTargetName {
  param([string]$ActKey)
  return "$ActKey.html"
}

function Invoke-ActDownload {
  param(
    [string]$Url,
    [string]$DestinationPath
  )

  [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
  $headers = @{
    'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Codex-Legislation-Downloader/1.0'
    'Accept' = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    'Accept-Language' = 'ro-RO,ro;q=0.9,en-US;q=0.8,en;q=0.7'
    'Cache-Control' = 'no-cache'
    'Pragma' = 'no-cache'
  }

  $tempPath = "$DestinationPath.download"
  if (Test-Path -LiteralPath $tempPath) {
    Remove-Item -LiteralPath $tempPath -Force
  }

  Invoke-WebRequest -Uri $Url -Headers $headers -UseBasicParsing -OutFile $tempPath

  $size = (Get-Item -LiteralPath $tempPath).Length
  if ($size -lt 1024) {
    throw "Fișierul descărcat este prea mic ($size bytes) și pare incomplet."
  }

  Move-Item -LiteralPath $tempPath -Destination $DestinationPath -Force
  return $size
}

Ensure-Directory -Path $archiveHtmlPath

if (-not (Test-Path -LiteralPath $manifestPath)) {
  throw "Lipsește manifestul actelor: $manifestPath"
}

if (-not (Test-Path -LiteralPath $indexPath)) {
  throw "Lipsește indexul arhivei: $indexPath"
}

$manifest = Read-JsonFile -Path $manifestPath
$index = Read-JsonFile -Path $indexPath
$manifestActs = @($manifest)

$log = [ordered]@{
  generatedAt = (Get-Date).ToString('yyyy-MM-dd HH:mm:ss')
  archivePath = $archiveHtmlPath
  results = @()
}

foreach ($act in $manifestActs) {
  $actKey = [string]$act.key
  $title = [string]$act.title
  $url = [string]$act.url

  if (-not $actKey.Trim()) {
    continue
  }

  $targetFileName = Get-DownloadTargetName -ActKey $actKey
  $targetPath = Join-Path $archiveHtmlPath $targetFileName

  $result = [ordered]@{
    key = $actKey
    title = $title
    url = $url
    targetFile = $targetFileName
    success = $false
    bytes = 0
    message = ''
  }

  if (-not $url.Trim()) {
    $result.message = 'Act fără URL în manifest.'
    $log.results += [pscustomobject]$result
    continue
  }

  try {
    $bytes = Invoke-ActDownload -Url $url -DestinationPath $targetPath
    $result.success = $true
    $result.bytes = $bytes
    $result.message = 'Descărcat.'

    if ($null -eq $index.acts.$actKey) {
      $index.acts | Add-Member -NotePropertyName $actKey -NotePropertyValue ([pscustomobject]@{})
    }

    Ensure-ObjectProperty -Object $index.acts.$actKey -Name 'textFile' -Value $null
    Ensure-ObjectProperty -Object $index.acts.$actKey -Name 'htmlFile' -Value "archive-readonly-html/$targetFileName"
    if ($null -eq $index.acts.$actKey.sourceUrl -or -not [string]$index.acts.$actKey.sourceUrl) {
      Ensure-ObjectProperty -Object $index.acts.$actKey -Name 'sourceUrl' -Value $url
    }
  } catch {
    $result.message = $_.Exception.Message
  }

  $log.results += [pscustomobject]$result
}

Write-JsonFile -Path $indexPath -Value $index
Write-JsonFile -Path $downloadLogPath -Value $log

$successCount = @($log.results | Where-Object { $_.success }).Count
$failureCount = @($log.results | Where-Object { -not $_.success }).Count

Write-Host "Download terminat."
Write-Host "Reușite: $successCount"
Write-Host "Eșecuri: $failureCount"
Write-Host "Log: $downloadLogPath"
