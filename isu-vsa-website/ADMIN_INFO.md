# ISU VSA Website - Admin Information

## Website URLs
- **Production**: https://isuvsa.org
- **Development**: http://localhost:3000

## Admin Panel Access
- **URL**: `/admin`
- **Password**: `vsaadmin2025`
- **Features**:
  - Event Management
  - Member Management
  - Instagram Content Management
  - Site Settings

## Key Contact Information
- **Primary Email**: isuvsa@gmail.com
- **Faculty Advisor**: Amanda Chung (achung@iastate.edu)
- **Instagram**: @isuvsa
- **Location**: Memorial Union, 2229 Lincoln Way, Ames, IA 50011

## Instagram Integration
The website uses Instagram **embed codes** (no API required):

### How to Add Instagram Posts:
1. Go to `/admin/content` (must be logged in)
2. Click "Add Post"
3. On Instagram:
   - Find the post you want to embed
   - Click the three dots (···) menu
   - Select "Embed"
   - Copy the embed code
4. Paste the embed code in the admin panel
5. Add an optional caption for accessibility
6. Click "Add Post"

**Note**: The website displays up to 6 recent posts on the homepage.

## SEO Features Implemented
- ✅ JSON-LD Structured Data (Organization, Website schemas)
- ✅ Complete sitemap.xml with all pages
- ✅ Robots.txt with proper crawl directives
- ✅ Meta tags optimized for each page
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card metadata
- ✅ Proper heading hierarchy
- ✅ Alt text for images
- ✅ Mobile-responsive design

## Website Sections
1. **Home** - Hero, features, events, Instagram feed
2. **About** - Mission, board members, history, constitution
3. **Events** - Upcoming, past, Tet, cultural shows
4. **Get Involved** - Membership, committees, volunteer, newsletter
5. **Resources** - Cultural library, language, recipes, study materials
6. **Gallery** - Photo collections from events
7. **VSA Royale** - Interactive card game
8. **Contact** - Contact form, location, FAQ

## Key Features
- **VSA Royale Game**: Full-featured card game at `/vsa-royale`
- **Event Management**: Dynamic event creation and display
- **Member Registration**: Online membership signup
- **Newsletter Signup**: Email collection for updates
- **Instagram Feed**: Embedded posts managed through admin
- **Mobile Responsive**: Fully optimized for all devices

## Technology Stack
- **Framework**: Next.js 15.5.3 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React

## Environment Variables (Optional)
Create `.env.local` for production:
```env
# Contact Email (defaults to isuvsa@gmail.com if not set)
NEXT_PUBLIC_CONTACT_EMAIL=isuvsa@gmail.com

# Discord URL (when available)
NEXT_PUBLIC_DISCORD_URL=https://discord.gg/your-invite

# Site URL
NEXT_PUBLIC_SITE_URL=https://isuvsa.org
```

## Deployment
The site is ready for deployment on:
- Vercel (recommended)
- Netlify
- Any Node.js hosting platform

## Maintenance Notes
1. **Regular Updates**:
   - Update board member information each year
   - Add new Instagram posts regularly
   - Update event information
   - Archive old events

2. **Annual Tasks**:
   - Update executive board after elections
   - Archive previous year's events
   - Update constitution if amended
   - Refresh photo galleries

3. **Content Management**:
   - All text content is embedded in components
   - Images are stored in `/public/images/`
   - Event data managed through admin panel
   - Instagram posts managed through admin panel

## Support
For technical issues or questions about the website:
- Check the documentation in `/docs/`
- Review the README.md file
- Contact the webmaster or current PR Chair

---
*Last Updated: January 2025*