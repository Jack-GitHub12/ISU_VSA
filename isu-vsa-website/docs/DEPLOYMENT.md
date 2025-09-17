# ISU VSA Website Deployment Guide

## Vercel Deployment

The website is configured for easy deployment on Vercel.

### Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. GitHub repository connected to your Vercel account

### Deployment Steps

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**

   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Select the `isu-vsa-website` directory as the root directory
   - Vercel will automatically detect Next.js configuration

3. **Environment Variables**
   Add these environment variables in Vercel dashboard (Settings > Environment Variables):

   - `NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN` (optional, for Instagram feed)
   - `NEXT_PUBLIC_INSTAGRAM_ACCOUNT_ID` (optional, for Instagram feed)
   - Any other API keys from `.env.example`

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your site
   - You'll receive a production URL (e.g., `your-project.vercel.app`)

### Custom Domain

To add a custom domain:

1. Go to Settings > Domains in your Vercel project
2. Add your domain (e.g., `isuvsa.org`)
3. Update DNS records with your domain provider

### Automatic Deployments

Every push to the `main` branch will trigger automatic deployment.

### Build Settings

The following settings are pre-configured in `vercel.json`:

- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### Troubleshooting

If the build fails:

1. Check the build logs in Vercel dashboard
2. Ensure all dependencies are listed in `package.json`
3. Test the build locally with `npm run build`
4. Check for TypeScript errors with `npx tsc --noEmit`

### Local Testing

Before deploying, always test locally:

```bash
npm run build
npm run start
```

Visit http://localhost:3000 to test the production build.

## Asset Management

### Board Member Images

Place board member photos in: `/public/images/board/`

- Recommended format: JPG or WebP
- Recommended size: 400x400px
- Naming convention: `firstname-lastname.jpg`

### Event Images

Place event photos in: `/public/images/events/`

### Gallery Images

Place gallery photos in: `/public/images/gallery/`

## Updating Content

### Board Members

Edit the file: `/app/about/board/page.tsx`
Update the `executiveBoard` and `committeeChairs` arrays with real member information.

### Events

Edit the file: `/data/events.ts`
Add new events to the events array.

### Navigation

Edit the file: `/data/navigation.ts`
Modify navigation links as needed.

## Performance Optimization

The site is optimized for performance with:

- Next.js Image optimization
- Static generation where possible
- Lazy loading for heavy components (like the game)
- Tailwind CSS for minimal CSS bundle

## Security

Security headers are configured in `vercel.json`:

- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection

## Support

For deployment issues:

1. Check Vercel documentation: https://vercel.com/docs
2. Check Next.js documentation: https://nextjs.org/docs
3. Review build logs in Vercel dashboard
