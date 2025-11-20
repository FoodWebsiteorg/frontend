# GitHub Organization Setup Guide

## Step 1: Create GitHub Organization

1. Go to: https://github.com/organizations/new
2. Sign in to your GitHub account
3. Choose a plan (Free plan is sufficient)
4. Fill in the details:
   - **Organization name**: (e.g., `service-booking-platform` or your preferred name)
   - **Organization email**: Your email address
   - **Account type**: Personal or Business
5. Complete the setup process

## Step 2: Create Repository in Organization

After creating the organization:

1. Go to your organization page
2. Click "New repository" or go to: `https://github.com/organizations/YOUR_ORG_NAME/repositories/new`
3. Fill in:
   - **Repository name**: `service-booking-platform` (or your preferred name)
   - **Description**: "Full-stack Service Provider & Customer Booking Platform built with Next.js 14"
   - **Visibility**: Public or Private (your choice)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click "Create repository"

## Step 3: Push Code to Organization Repository

After creating the repository, run these commands:

```bash
# Remove existing remote (if any)
git remote remove origin

# Add your organization repository as remote
git remote add origin https://github.com/YOUR_ORG_NAME/service-booking-platform.git

# Push to main branch
git branch -M main
git push -u origin main
```

Or if you prefer SSH:

```bash
git remote add origin git@github.com:YOUR_ORG_NAME/service-booking-platform.git
git branch -M main
git push -u origin main
```

## Alternative: Quick Setup Script

Once you have your organization name and repository created, you can run:

```bash
# Replace YOUR_ORG_NAME and REPO_NAME with your actual values
git remote remove origin
git remote add origin https://github.com/YOUR_ORG_NAME/REPO_NAME.git
git push -u origin main
```

## Notes

- Make sure you're authenticated with GitHub (use `gh auth login` if using GitHub CLI)
- If you get authentication errors, you may need to set up a Personal Access Token
- The `.env` file is already in `.gitignore` so it won't be pushed (good for security)

