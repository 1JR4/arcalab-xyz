# Cloudflare Pages Setup - arcalab.xyz

Following the same approach as bitnbolt.com deployment.

## 🚀 Status

- ✅ **GitHub**: https://github.com/1JR4/arcalab-xyz
- ✅ **Code Pushed**: All files committed and pushed
- ✅ **Build Tested**: Production build verified
- ⏳ **Cloudflare**: Awaiting connection

---

## 📋 Setup Instructions (5 minutes)

### Step 1: Go to Cloudflare Pages Dashboard

Visit: **https://dash.cloudflare.com**

Click on your account, then **Workers & Pages**

---

### Step 2: Create New Pages Project

1. Click **"Create application"** (blue button)
2. Click **"Pages"** tab
3. Click **"Connect to Git"**

---

### Step 3: Connect GitHub

1. Click **"Connect GitHub"**
2. If prompted, authorize Cloudflare
3. Select account: **1JR4**
4. Find and select: **arcalab-xyz**
5. Click **"Begin setup"**

---

### Step 4: Configure Build Settings

**IMPORTANT**: Copy these exact values:

```
Project name: arcalab-xyz
Production branch: main
Framework preset: Next.js (select from dropdown)
Build command: npm run build
Build output directory: .next
Root directory: / (leave default)
Node.js version: 18 (default)
```

Click **"Save and Deploy"**

---

### Step 5: Wait for Build (2-3 minutes)

You'll see build logs. The build process will:
- Install dependencies
- Run `npm run build`
- Generate optimized production files
- Deploy to Cloudflare's global network

---

### Step 6: Add Custom Domain

Once deployment succeeds:

1. Click **"Custom domains"** tab
2. Click **"Set up a custom domain"**
3. Enter: **arcalab.xyz**
4. Click **"Continue"**
5. Cloudflare will auto-configure DNS ✅

---

## 🎯 Expected Result

Your site will be live at:
- **Production**: https://arcalab.xyz
- **Cloudflare**: https://arcalab-xyz.pages.dev

Every push to `main` will auto-deploy.
Every PR will get a preview URL.

---

## 🔄 Future Workflow (After Setup)

### Making Changes

```bash
# 1. Make changes locally
cd /Users/wjr/Documents/arcalab-xyz

# 2. Test locally
npm run dev

# 3. Commit and push
git add .
git commit -m "feat: your changes"
git push

# 4. Automatic deployment
# Cloudflare automatically builds and deploys
# Live in 2-3 minutes
```

### Preview Deployments

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and push
git push -u origin feature/new-feature

# Create PR on GitHub
# Cloudflare creates preview at:
# https://<commit-hash>.arcalab-xyz.pages.dev
```

---

## 📦 What's Deployed

### Pages
- ✅ **Home** (`/`) - Interactive MGC slider
- ✅ **About** (`/about`) - Mission and philosophy
- ✅ **Blog** (`/blog`) - 6 articles with modal reader

### Features
- ✅ Dark/light theme toggle
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Framer Motion animations
- ✅ Next.js 16 App Router
- ✅ All blog posts from 1jae.com

---

## 🎨 Key Differences from BitnBolt

| Feature | BitnBolt | ArcaLab |
|---------|----------|---------|
| Next.js | Static Export | App Router (SSR) |
| Output | `out/` | `.next/` |
| Deployment | CLI deploy | GitHub integration |
| Runtime | Static files | Node.js runtime |

**Why GitHub Integration?**
- Next.js App Router requires Node.js runtime
- Cloudflare Pages handles this automatically via GitHub
- Cannot use direct `wrangler pages deploy` with SSR

---

## 🔧 Configuration Files

### wrangler.toml
```toml
name = "arcalab-xyz"
compatibility_date = "2025-11-15"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".next"
```

### Build Settings (in Cloudflare dashboard)
- **Framework**: Next.js (auto-detects from package.json)
- **Build**: `npm run build`
- **Output**: `.next`
- **Node**: 18.x (default)

---

## 💡 Troubleshooting

### Build Fails
**Check**: Build logs in Cloudflare dashboard
**Common fixes**:
- Verify Framework preset is "Next.js"
- Ensure Node.js version is 18+
- Check build output is `.next` (with dot)

### Domain Not Working
**Solution**: Wait 5-10 minutes for DNS propagation
**Check**: Custom domains tab shows "Active"

### Site Not Updating
**Solution**: Clear Cloudflare cache
**Check**: Verify push reached GitHub (`git log`)

---

## 📚 Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Next.js on Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
- [GitHub Integration](https://developers.cloudflare.com/pages/get-started/git-integration/)

---

## ✅ Success Checklist

- [x] GitHub repository created
- [x] Code pushed to main branch
- [x] Production build verified locally
- [x] wrangler.toml configured
- [ ] Cloudflare Pages project created
- [ ] GitHub integration connected
- [ ] First deployment successful
- [ ] Custom domain added
- [ ] DNS configured

---

**Last Updated**: 2025-11-15
**Repository**: https://github.com/1JR4/arcalab-xyz
**Ready to Deploy**: ✅ YES
