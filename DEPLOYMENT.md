# Deploying arcalab.xyz to Cloudflare Pages

## Option 1: GitHub Integration (Recommended)

1. **Push to GitHub**:
   ```bash
   cd /Users/wjr/Documents/arcalab-xyz
   git init
   git add .
   git commit -m "Initial commit: arcalab.xyz"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages**:
   - Go to https://dash.cloudflare.com
   - Navigate to Workers & Pages
   - Click "Create application" > "Pages" > "Connect to Git"
   - Select your GitHub repository
   - Configure build settings:
     - **Framework preset**: Next.js
     - **Build command**: `npm run build`
     - **Build output directory**: `.next`
     - **Root directory**: `/` (leave default)

3. **Configure Domain**:
   - After deployment, go to "Custom domains"
   - Add `arcalab.xyz`
   - Cloudflare will automatically configure DNS

## Option 2: Direct Deploy via Wrangler

1. **Login to Wrangler**:
   ```bash
   npx wrangler login
   ```

2. **Deploy**:
   ```bash
   npm run build
   npx wrangler pages deploy .next --project-name=arcalab-xyz
   ```

## Option 3: Manual Upload

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Upload via Dashboard**:
   - Go to https://dash.cloudflare.com
   - Workers & Pages > Create application > Pages > Upload assets
   - Upload the `.next` directory
   - Set project name to `arcalab-xyz`

## Environment Variables

No environment variables are currently required for this project.

## Build Settings

- **Framework**: Next.js 16.0.3
- **Node version**: 18.x or higher
- **Build command**: `npm run build`
- **Output directory**: `.next`

## Domain Configuration

Once deployed, configure your custom domain:
1. Go to your Cloudflare Pages project
2. Navigate to "Custom domains"
3. Click "Set up a custom domain"
4. Enter `arcalab.xyz`
5. Cloudflare will automatically configure DNS records

## Troubleshooting

### Build Fails
- Ensure Node.js 18+ is used
- Check that all dependencies are installed
- Verify build works locally: `npm run build`

### 404 Errors
- Ensure `.next` directory is being deployed
- Check that Next.js static export is configured correctly

### Custom Domain Not Working
- Verify DNS records in Cloudflare DNS settings
- Wait up to 24 hours for DNS propagation
- Check SSL/TLS settings (should be "Full" or "Full (strict)")
