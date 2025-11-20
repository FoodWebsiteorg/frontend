# PowerShell script to push code to GitHub organization repository
# Usage: .\push-to-org.ps1 YOUR_ORG_NAME REPO_NAME

param(
    [Parameter(Mandatory=$true)]
    [string]$OrgName,
    
    [Parameter(Mandatory=$true)]
    [string]$RepoName
)

Write-Host "Setting up remote for organization: $OrgName"
Write-Host "Repository: $RepoName"

# Remove existing remote
git remote remove origin 2>$null

# Add new remote
git remote add origin "https://github.com/$OrgName/$RepoName.git"

# Push to main branch
Write-Host "Pushing to main branch..."
git branch -M main
git push -u origin main

Write-Host "Done! Your code is now in: https://github.com/$OrgName/$RepoName"

