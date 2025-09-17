# 🚀 Vercel Deployment Instructions

Your ISU VSA website is now **ready for deployment**! Follow these steps to deploy to Vercel.

## ✅ What's Already Done

1. **Code is ready** - All TypeScript errors fixed, build successful
2. **Board members updated** - Real-looking data with placeholder images
3. **Git repository initialized** - Code committed and ready
4. **Vercel config added** - `vercel.json` configured with security headers
5. **Production tested** - Site running successfully on localhost:3000

## 📋 Quick Deployment Steps

### Option 1: Deploy with Vercel CLI (Fastest)

1. **Install Vercel CLI** (if not already installed):

   ```bash
   npm i -g vercel
   ```

2. **Deploy directly from this folder**:

   ```bash
   cd isu-vsa-website
   vercel
   ```

3. **Follow the prompts**:
   - Login/signup to Vercel
   - Select "Deploy"
   - Choose project name (e.g., "isu-vsa-website")
   - Your site will be live in ~2 minutes!

### Option 2: Deploy via GitHub + Vercel Dashboard

1. **Create GitHub repository**:

   ```bash
   cd isu-vsa-website
   gh repo create ISU-VSA-Website --public --source=. --remote=origin --push
   ```

   Or manually:

   - Go to https://github.com/new
   - Create repository named "ISU-VSA-Website"
   - Run:
     ```bash
     git remote add origin https://github.com/YOUR_USERNAME/ISU-VSA-Website.git
     git branch -M main
     git push -u origin main
     ```

2. **Connect to Vercel**:

   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your GitHub repository
   - Click "Deploy"

3. **Configure (optional)**:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: Leave as is
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

## 🔐 Environment Variables (Optional)

Add these in Vercel Dashboard > Settings > Environment Variables:

```env
# Instagram Feed (optional)
NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN=your_token_here
NEXT_PUBLIC_INSTAGRAM_ACCOUNT_ID=your_account_id_here

# Email Service (optional)
SENDGRID_API_KEY=your_sendgrid_key_here
EMAIL_FROM=isuvsa@iastate.edu
EMAIL_TO=isuvsa@iastate.edu
```

## 🌐 Custom Domain Setup

1. In Vercel Dashboard > Settings > Domains
2. Add your domain: `isuvsa.org` or `www.isuvsa.org`
3. Update DNS records at your domain provider:
   - Type: A
   - Name: @
   - Value: 76.76.21.21

## 📸 Adding Real Board Member Photos

1. Replace placeholder images in `/public/images/board/`
2. Name them: `president.jpg`, `vice-president.jpg`, etc.
3. Recommended: 400x400px, optimized JPG/WebP
4. Push changes: `git add . && git commit -m "Add board photos" && git push`
5. Vercel will auto-deploy the updates

## 🎯 Post-Deployment Checklist

- [ ] Visit your live URL: `your-project.vercel.app`
- [ ] Test all navigation links
- [ ] Check board member page loads correctly
- [ ] Test VSA Royale game page
- [ ] Verify mobile responsiveness
- [ ] Add custom domain (if available)
- [ ] Share with team for feedback

## 🛠 Troubleshooting

**Build fails?**

- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Try locally: `npm run build`

**Images not showing?**

- Use `/images/...` paths (not `./images/...`)
- Check file extensions match exactly

**Domain not working?**

- DNS changes take 24-48 hours to propagate
- Verify DNS records with: `nslookup your-domain.com`

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Your build log: Check Vercel Dashboard > Functions tab

---

**Your site is production-ready! 🎉** Deploy now and share your ISU VSA website with the world!
