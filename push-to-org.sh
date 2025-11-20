#!/bin/bash
# Script to push code to GitHub organization repository
# Usage: ./push-to-org.sh YOUR_ORG_NAME REPO_NAME

if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Usage: ./push-to-org.sh YOUR_ORG_NAME REPO_NAME"
    echo "Example: ./push-to-org.sh my-org service-booking-platform"
    exit 1
fi

ORG_NAME=$1
REPO_NAME=$2

echo "Setting up remote for organization: $ORG_NAME"
echo "Repository: $REPO_NAME"

# Remove existing remote
git remote remove origin 2>/dev/null || true

# Add new remote
git remote add origin "https://github.com/$ORG_NAME/$REPO_NAME.git"

# Push to main branch
echo "Pushing to main branch..."
git branch -M main
git push -u origin main

echo "Done! Your code is now in: https://github.com/$ORG_NAME/$REPO_NAME"

