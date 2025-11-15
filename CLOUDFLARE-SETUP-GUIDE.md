# Cloudflare Pages Setup - 2 Minute Guide

Your code is ready on GitHub: **https://github.com/1JR4/arcalab-xyz**

Now let's deploy it to arcalab.xyz in 6 simple clicks:

---

## Step 1: Open Cloudflare Dashboard
🔗 **https://dash.cloudflare.com**

---

## Step 2: Click "Workers & Pages"
Look in the left sidebar → Click **Workers & Pages**

---

## Step 3: Click "Create application"
Big blue button at the top right

---

## Step 4: Click "Pages" tab
Then click **"Connect to Git"**

---

## Step 5: Connect GitHub
- Click **"Connect GitHub"**
- If asked, authorize Cloudflare
- Select your **1JR4** account
- Find and select **arcalab-xyz** repository
- Click **"Begin setup"**

---

## Step 6: Configure Build (Copy & Paste These)

```
Project name: arcalab-xyz
Production branch: main
Framework preset: Next.js (select from dropdown)
Build command: npm run build
Build output directory: .next
Root directory: / (leave default)
```

Click **"Save and Deploy"**

⏳ Wait 2-3 minutes for build to complete

---

## Step 7: Add Custom Domain

Once build succeeds:
1. Click **"Custom domains"** tab
2. Click **"Set up a custom domain"**
3. Type: `arcalab.xyz`
4. Click **"Continue"**
5. Cloudflare auto-configures DNS ✅

---

## ✅ Done!

Your site will be live at:
- **https://arcalab.xyz**
- **https://arcalab-xyz.pages.dev**

---

## Troubleshooting

### Build Fails?
- Check build logs in the dashboard
- Common fix: Ensure Framework preset is set to "Next.js"
- Verify build output is `.next` (with the dot)

### Domain Not Working?
- Wait 5-10 minutes for DNS propagation
- Check Custom domains tab shows "Active"
- Verify SSL certificate is issued (usually instant)

### Still Having Issues?
The build logs will show exactly what went wrong. Most common issues:
1. Wrong output directory (should be `.next`)
2. Wrong framework preset (should be Next.js)
3. Node version too old (should auto-detect to 18.x)

---

## What Gets Deployed

✅ Your interactive MGC homepage (experiment6)
✅ About page with mission & philosophy
✅ Blog page with all 6 articles
✅ All images and assets
✅ Dark/light theme support

Everything is production-ready!
