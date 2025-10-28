# Deployment Guide - Manav Singh Jamwal Portfolio

## 🚀 Quick Deployment to Vercel

### Prerequisites
- GitHub account
- Vercel account (free tier works perfectly)
- Your portfolio code pushed to GitHub

### Step-by-Step Deployment

#### 1. Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Portfolio with all 2025 enhancements"

# Add your GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git push -u origin main
```

#### 2. Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign in
2. Click **"Add New Project"**
3. **Import** your GitHub repository
4. Vercel will auto-detect Next.js settings ✅
5. Click **"Deploy"**

Your site will be live at: `https://your-project.vercel.app`

#### 3. Configure Environment Variables

After deployment, add your SMTP credentials:

1. Go to your project in Vercel dashboard
2. Navigate to **Settings → Environment Variables**
3. Add the following:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@yourdomain.com
CONTACT_EMAIL=jamwalmanav69@gmail.com
```

4. **Redeploy** from the Deployments tab

#### 4. Add Custom Domain (Optional)

1. Go to **Settings → Domains**
2. Add your custom domain (e.g., `manavjamwal.dev`)
3. Update DNS records as instructed by Vercel:
   - Add A record pointing to Vercel's IP
   - Or add CNAME record pointing to `cname.vercel-dns.com`

## 📧 Email Setup Guide

### Option 1: Gmail (Recommended for Testing)

1. **Enable 2-Factor Authentication** on your Google account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a new app password for "Mail"
4. Use this 16-character password as `SMTP_PASS`

**Environment Variables:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=youremail@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx
SMTP_FROM=noreply@yourdomain.com
CONTACT_EMAIL=jamwalmanav69@gmail.com
```

### Option 2: SendGrid (Recommended for Production)

1. Sign up at [sendgrid.com](https://sendgrid.com) (free tier: 100 emails/day)
2. Create an API key in Settings → API Keys
3. Verify your sender email/domain

**Environment Variables:**
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.your_api_key_here
SMTP_FROM=noreply@yourdomain.com
CONTACT_EMAIL=jamwalmanav69@gmail.com
```

### Option 3: Custom SMTP Server

If you have your own email server:

```env
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_USER=username@yourdomain.com
SMTP_PASS=your-password
SMTP_FROM=noreply@yourdomain.com
CONTACT_EMAIL=jamwalmanav69@gmail.com
```

## 🔧 Post-Deployment Checklist

### Immediate Tasks
- [ ] Verify site is accessible at deployed URL
- [ ] Test theme toggle (dark/light mode)
- [ ] Test contact form submission
- [ ] Verify email delivery works
- [ ] Test AI chatbot responses
- [ ] Test resume viewer and download
- [ ] Check blog search and filtering
- [ ] Verify all links work (GitHub, LinkedIn, etc.)
- [ ] Test on mobile devices

### SEO Tasks
- [ ] Submit sitemap to Google Search Console
  - URL: `https://your-domain.com/sitemap.xml`
- [ ] Submit to Bing Webmaster Tools
- [ ] Verify OpenGraph tags with [OpenGraph Debugger](https://www.opengraph.xyz/)
- [ ] Test Twitter Card with [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Set up Google Analytics (optional)

### Performance Optimization
- [ ] Check Lighthouse scores (aim for 90+ in all categories)
- [ ] Test Core Web Vitals
- [ ] Verify image optimization is working
- [ ] Check bundle size in Vercel Analytics

### Security
- [ ] Add `.env.local` to `.gitignore` ✅ (already done)
- [ ] Never commit SMTP credentials
- [ ] Enable Vercel security headers (optional)
- [ ] Set up rate limiting for contact form (production)

## 📊 Monitoring & Analytics

### Vercel Analytics
- Automatically enabled on Vercel
- View at: `https://vercel.com/YOUR_USERNAME/YOUR_PROJECT/analytics`
- Tracks:
  - Page views
  - Unique visitors
  - Top pages
  - Referrers
  - Devices & browsers

### Contact Form Monitoring
- Check email inbox for submissions
- Review form error logs in Vercel functions logs
- Monitor API route usage

## 🔄 Continuous Deployment

Every push to your `main` branch will:
1. **Trigger automatic build** on Vercel
2. **Run tests** and linting
3. **Deploy** if successful
4. **Generate preview URL** for inspection

### Preview Deployments
- Every PR gets a unique preview URL
- Test changes before merging
- Share with team/clients for feedback

## 🐛 Troubleshooting

### Contact Form Not Sending Emails

**Check:**
1. Environment variables are set correctly in Vercel
2. SMTP credentials are valid
3. App password (not regular password) for Gmail
4. Check Vercel function logs for errors
5. Verify email isn't in spam folder

**Test SMTP locally:**
```bash
# Set env vars in .env.local
npm run dev
# Submit contact form at localhost:3000
# Check terminal for console logs
```

### Build Failures

**Common issues:**
- TypeScript errors → Check `get_errors` output
- Missing dependencies → Run `npm install`
- Environment variable issues → Check Vercel settings
- Out of memory → Increase Node.js memory limit

**Debug build locally:**
```bash
npm run build
# Fix any errors before pushing
```

### Theme Not Persisting

- Clear browser cache
- Check localStorage is enabled
- Verify ThemeProvider is wrapping app

### Analytics Not Showing

- Wait 24-48 hours for data
- Ensure `@vercel/analytics` is installed
- Check Analytics is enabled in Vercel dashboard

## 📈 Performance Tips

### Optimize Images
- Use Next.js Image component (already implemented ✅)
- Compress images before uploading
- Use WebP/AVIF formats
- Add `priority` prop to hero images

### Reduce Bundle Size
- Lazy load heavy components (3D scene already lazy loaded ✅)
- Use dynamic imports for modals
- Tree-shake unused code

### Improve Loading Speed
- Enable Vercel Edge Functions (automatic)
- Use Vercel Image Optimization (enabled ✅)
- Minimize JavaScript execution time

## 🔐 Security Best Practices

### API Routes
- ✅ Input validation with Zod (implemented)
- ✅ Rate limiting ready for production
- ✅ Environment variable protection
- Consider adding CAPTCHA for contact form

### Content Security
- Add CSP headers in `next.config.ts`
- Enable XSS protection headers
- Set secure cookie flags

### Monitoring
- Set up Sentry for error tracking (optional)
- Monitor failed contact form submissions
- Review Vercel logs regularly

## 🎯 Next Steps

### Short Term (Week 1)
1. Deploy to Vercel
2. Configure custom domain
3. Set up email delivery
4. Test all features
5. Submit to search engines

### Medium Term (Month 1)
1. Add more blog posts
2. Gather user feedback
3. Monitor analytics
4. Optimize based on metrics
5. Add testimonials/recommendations

### Long Term (Quarter 1)
1. Implement newsletter system
2. Add project case studies
3. Create video content
4. Build personal brand
5. Network and share content

## 🆘 Support

Need help? Resources:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Nodemailer Guide](https://nodemailer.com/about/)
- [GitHub Issues](https://github.com/YOUR_USERNAME/YOUR_REPO/issues)

---

**Good luck with your deployment! 🚀**

Built by Manav Singh Jamwal with modern web technologies.
