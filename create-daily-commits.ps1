# Script to create commits across multiple days
# This spreads commits over different dates for GitHub activity graph

param(
    [int]$DaysBack = 30,        # How many days back to start
    [int]$CommitsPerDay = 3,    # Commits per day
    [string]$StartDate = ""     # Optional: specific start date (YYYY-MM-DD)
)

function Make-DatedCommit {
    param(
        [string]$Message,
        [string]$Date
    )
    
    git add -A
    git commit --date="$Date" -m "$Message`n`nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
}

Write-Host "Creating commits across multiple days..." -ForegroundColor Green
Write-Host "Days back: $DaysBack | Commits per day: $CommitsPerDay`n" -ForegroundColor Yellow

# Calculate start date
if ($StartDate -eq "") {
    $currentDate = (Get-Date).AddDays(-$DaysBack)
} else {
    $currentDate = [DateTime]::Parse($StartDate)
}

$commitCount = 1
$totalCommits = $DaysBack * $CommitsPerDay

# Create commits for each day
for ($day = 0; $day -lt $DaysBack; $day++) {
    $dateString = $currentDate.AddDays($day).ToString("yyyy-MM-dd")
    
    Write-Host "[$dateString] Creating $CommitsPerDay commits..." -ForegroundColor Cyan
    
    for ($commit = 0; $commit -lt $CommitsPerDay; $commit++) {
        $hour = 9 + ($commit * 3)  # Space commits throughout the day
        $minute = Get-Random -Minimum 0 -Maximum 59
        $fullDate = "$dateString ${hour}:${minute}:00"
        
        # Create a meaningful change
        $feature = "feature-day-$day-commit-$commit"
        $filePath = "daily-progress\day-$day\commit-$commit.md"
        
        New-Item -ItemType Directory -Force -Path (Split-Path $filePath -Parent) | Out-Null
        
        @"
# Daily Progress - Day $day, Commit $commit

Date: $dateString
Feature: $feature

## Changes
- Incremental improvement $commitCount
- Code quality enhancement
- Documentation update
"@ | Out-File -FilePath $filePath -Encoding UTF8
        
        Make-DatedCommit "feat: daily progress update - day $day commit $commit" $fullDate
        
        Write-Host "  [$commitCount/$totalCommits] Commit at $fullDate" -ForegroundColor Gray
        $commitCount++
        
        Start-Sleep -Milliseconds 200  # Brief pause between commits
    }
}

Write-Host "`n✅ Created $totalCommits commits across $DaysBack days!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Review commits: git log --oneline -20" -ForegroundColor White
Write-Host "2. Push to GitHub: git push origin main" -ForegroundColor White
Write-Host "`nNote: Use 'git push --force' if you need to rewrite history (be careful!)" -ForegroundColor Red
