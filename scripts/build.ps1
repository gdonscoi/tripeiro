# Gera os arquivos publicados em docs/ a partir de skills/tripeiro:
#   docs/downloads/tripeiro-skill-<versão>.zip  (pasta tripeiro/ pronta para instalar)
#   docs/instrucoes.txt                          (alternativa copiável: SKILL.md + formato + exemplo)
#   docs/exemplo-roteiro.json
# Uso, na raiz do repositório:  powershell -ExecutionPolicy Bypass -File scripts\build.ps1
param([string]$OutputDirectory)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$skill = Join-Path $root 'skills\tripeiro'
$docs = if ($OutputDirectory) { [IO.Path]::GetFullPath($OutputDirectory) } else { Join-Path $root 'docs' }
$utf8 = New-Object System.Text.UTF8Encoding $false

$skillText = [IO.File]::ReadAllText((Join-Path $skill 'SKILL.md'), $utf8)
if ($skillText -notmatch 'version:\s*"([^"]+)"') { throw 'SKILL.md sem metadata.version' }
$version = $Matches[1]

# ZIP com a pasta tripeiro/ na raiz, como as ferramentas de Agent Skills esperam.
$downloads = Join-Path $docs 'downloads'
New-Item -ItemType Directory -Force $downloads | Out-Null
$zip = Join-Path $downloads "tripeiro-skill-$version.zip"
if (Test-Path $zip) { Remove-Item $zip }
# Entradas com "/" (o Windows PowerShell 5.1 gravaria "\", que quebra a extração em outros sistemas).
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [IO.Compression.ZipFile]::Open($zip, [IO.Compression.ZipArchiveMode]::Create)
try {
    Get-ChildItem -Recurse -File $skill | Sort-Object FullName | ForEach-Object {
        $name = 'tripeiro/' + $_.FullName.Substring($skill.Length + 1).Replace('\', '/')
        [IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive, $_.FullName, $name) | Out-Null
    }
} finally { $archive.Dispose() }

# Instruções copiáveis, geradas da mesma fonte para não divergirem da skill.
$body = ($skillText -replace '(?s)^---.*?---\s*', '').Trim()
$format = [IO.File]::ReadAllText((Join-Path $skill 'references\formato-do-roteiro.md'), $utf8).Trim()
$example = [IO.File]::ReadAllText((Join-Path $skill 'assets\exemplo-roteiro.json'), $utf8).Trim()
$fence = '```'
$text = @"
Instruções do Tripeiro (skill $version, formato tripeiro-plan 1). Cole este texto no início da conversa ou nas instruções do projeto da sua IA.
Os arquivos citados abaixo (references/formato-do-roteiro.md e assets/exemplo-roteiro.json) estão incluídos no fim deste texto.

$body

---

$format

---

# Exemplo fictício (assets/exemplo-roteiro.json)

${fence}json
$example
$fence
"@
[IO.File]::WriteAllText((Join-Path $docs 'instrucoes.txt'), ($text -replace "`r`n", "`n") + "`n", $utf8)
Copy-Item -Force (Join-Path $skill 'assets\exemplo-roteiro.json') (Join-Path $docs 'exemplo-roteiro.json')

# Tradução de uso separada da skill instalável; mantém os ZIPs existentes.
$englishSource = Join-Path $root 'translations\en'
$englishOutput = Join-Path $docs 'en'
New-Item -ItemType Directory -Force $englishOutput | Out-Null
$englishSkill = [IO.File]::ReadAllText((Join-Path $englishSource 'skill.md'), $utf8).Trim()
if (-not $englishSkill.Contains("skill $version,")) { throw 'Tradução inglesa não corresponde à versão da skill' }
$englishFormat = [IO.File]::ReadAllText((Join-Path $englishSource 'formato-do-roteiro.md'), $utf8).Trim()
$englishExample = [IO.File]::ReadAllText((Join-Path $englishSource 'exemplo-roteiro.json'), $utf8).Trim()
$englishText = @"
Tripeiro instructions (skill $version, tripeiro-plan format 1). Paste this text at the start of your AI conversation or in your project instructions.
The format reference and fictional example linked below are included at the end of this text.

$englishSkill

---

$englishFormat

---

# Fictional example (exemplo-roteiro.json)

${fence}json
$englishExample
$fence
"@
[IO.File]::WriteAllText((Join-Path $englishOutput 'instrucoes.txt'), ($englishText -replace "`r`n", "`n") + "`n", $utf8)
foreach ($name in @('skill.md', 'formato-do-roteiro.md', 'exemplo-roteiro.json')) {
    $translated = [IO.File]::ReadAllText((Join-Path $englishSource $name), $utf8)
    [IO.File]::WriteAllText((Join-Path $englishOutput $name), ($translated -replace "`r`n", "`n"), $utf8)
}
Write-Output "skill $version -> $zip"
