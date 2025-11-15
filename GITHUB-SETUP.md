# GitHub Repository Setup

## Git Repository Status ✅

Your local repository is ready:
- ✅ Git initialized
- ✅ All files committed
- ✅ Branch set to `main`
- ✅ Clean working tree

## Next: Create GitHub Repository

### Option 1: Using GitHub Web (Easiest)

1. **Go to GitHub**:
   - Visit https://github.com/new
   - Sign in to your account

2. **Create Repository**:
   - Repository name: **`arcalab-xyz`**
   - Description: **ARCALAB - Personal portfolio and project showcase**
   - Visibility: **Public**
   - ⚠️ **DO NOT** initialize with README, .gitignore, or license
   - Click "Create repository"

3. **Push Your Code**:
   ```bash
   cd /Users/wjr/Documents/arcalab-xyz
   git remote add origin https://github.com/YOUR_USERNAME/arcalab-xyz.git
   git push -u origin main
   ```

### Option 2: Using GitHub CLI

If authentication is set up:
```bash
cd /Users/wjr/Documents/arcalab-xyz
gh auth login  # Re-authenticate if needed
gh repo create arcalab-xyz --public --source=. --description="ARCALAB - Personal portfolio and project showcase" --remote=origin --push
```

## After Pushing to GitHub

Once your code is on GitHub, proceed to Cloudflare Pages:

1. **Go to Cloudflare Dashboard**:
   - https://dash.cloudflare.com
   - Navigate to "Workers & Pages"

2. **Create Pages Project**:
   - Click "Create application"
   - Select "Pages"
   - Click "Connect to Git"

3. **Connect Repository**:
   - Select your GitHub account
   - Choose the `arcalab-xyz` repository
   - Click "Begin setup"

4. **Configure Build**:
   - Project name: **arcalab-xyz**
   - Production branch: **main**
   - Framework preset: **Next.js**
   - Build command: **`npm run build`**
   - Build output directory: **`.next`**
   - Root directory: **`/`** (leave default)

5. **Deploy**:
   - Click "Save and Deploy"
   - Wait 2-3 minutes for build to complete

6. **Add Custom Domain**:
   - Go to project settings
   - Click "Custom domains"
   - Click "Set up a custom domain"
   - Enter: **`arcalab.xyz`**
   - Cloudflare will automatically configure DNS
   - Wait for SSL certificate (usually instant)

## Your Site Will Be Live At:

- **Production**: https://arcalab.xyz
- **Cloudflare subdomain**: https://arcalab-xyz.pages.dev

## Troubleshooting

### Push Failed
```bash
# Check remote
git remote -v

# If remote doesn't exist, add it
git remote add origin https://github.com/YOUR_USERNAME/arcalab-xyz.git

# If remote exists but is wrong, update it
git remote set-url origin https://github.com/YOUR_USERNAME/arcalab-xyz.git
```

### GitHub CLI Not Working
```bash
# Re-authenticate
gh auth login
# Follow prompts to authenticate via browser
```

### Build Fails on Cloudflare
- Ensure Node.js version is 18.x or higher in build settings
- Check build logs for specific errors
- Verify `.next` is the correct output directory
