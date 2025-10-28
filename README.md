# MSJ.DEV - Professional Cybersecurity Portfolio

A modern, feature-rich portfolio for **Manav Singh Jamwal** - Cybersecurity Engineer, built with Next.js 15, TypeScript, and cutting-edge web technologies.

## ✨ Features

### 🎨 Design & UX
- **Modern Dark Theme**: Cyberpunk-inspired design with cyan/blue accents
- **Light/Dark Mode**: Smooth theme switching with `next-themes`
- **Glassmorphism UI**: Frosted glass effects and modern card designs
- **Responsive Design**: Mobile-first, works perfectly on all devices
- **Smooth Animations**: Powered by Framer Motion for fluid interactions
- **3D Visuals**: Interactive Three.js cyberpunk scene

### 🤖 AI & Interactive Features
- **AI Resume Assistant**: Intelligent chatbot that answers questions about skills, projects, and experience
- **Interactive Terminal**: Cyberpunk-themed command interface
- **Dynamic Resume Viewer**: In-browser PDF viewer with zoom controls
- **Boot Sequence**: Futuristic loading animation on first visit

### 📝 Content Management
- **MDX Blog System**: Write blog posts with full Markdown support
- **Advanced Search**: Real-time search across blog titles, content, and tags
- **Tag Filtering**: Filter blog posts by multiple tags
- **Reading Time**: Automatic reading time calculation
- **SEO Optimized**: Complete metadata, OpenGraph tags, and structured data

### 📬 Contact & Engagement
- **Functional Contact Form**: 
  - Full validation with Zod
  - Email delivery via Nodemailer
  - Success/error notifications
  - SMTP configuration support
- **Social Links**: GitHub, LinkedIn, email integration
- **Download Resume**: One-click resume download

### 📊 Analytics & Performance
- **Vercel Analytics**: Track page views and user engagement
- **Image Optimization**: Next.js Image component with AVIF/WebP support
- **Code Splitting**: Lazy loading for 3D components
- **Font Optimization**: Variable fonts with `font-display: swap`
- **SEO Files**: Sitemap and robots.txt generation

### 🔒 Security Features
- **Resume Integrity**: SHA-256 hash display
- **CSRF Protection**: Secure API routes
- **Input Validation**: Zod schema validation
- **Type Safety**: Full TypeScript coverage

## 🏗️ Tech Stack

### Core
- **Next.js 15.4.5** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first styling

### UI & Animations
- **Framer Motion** - Animation library
- **Lucide React** - Icon system
- **Radix UI** - Accessible component primitives
- **Three.js** - 3D graphics
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for Three.js

### Content & Data
- **MDX** - Markdown with JSX
- **gray-matter** - Frontmatter parsing
- **next-mdx-remote** - Remote MDX processing

### Backend & Services
- **Nodemailer** - Email sending
- **Zod** - Schema validation
- **@vercel/analytics** - Analytics tracking
- **next-themes** - Theme management

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm or yarn package manager

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/jamwal69/manav-portfolio.git
cd manav-portfolio-main
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**

Copy `.env.example` to `.env.local` and configure:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your SMTP credentials:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@yourdomain.com
CONTACT_EMAIL=jamwalmanav69@gmail.com
```

**For Gmail:**
- Enable 2FA on your Google account
- Generate an App Password at https://myaccount.google.com/apppasswords
- Use the App Password as `SMTP_PASS`

4. **Run the development server:**
```bash
npm run dev
```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
manav-portfolio-main/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── contact/route.ts      # Contact form API
│   │   │   └── figma-colors/route.ts # Figma integration
│   │   ├── blog/
│   │   │   ├── [slug]/page.tsx       # Individual blog post
│   │   │   ├── BlogFilterClient.tsx  # Blog search & filter
│   │   │   └── page.tsx              # Blog listing
│   │   ├── globals.css               # Global styles & themes
│   │   ├── layout.tsx                # Root layout (SEO, ThemeProvider)
│   │   ├── page.tsx                  # Homepage
│   │   ├── robots.ts                 # Robots.txt generation
│   │   └── sitemap.ts                # Sitemap generation
│   ├── components/
│   │   ├── AIResumeAssistant.tsx     # AI chatbot component
│   │   ├── BootSequence.tsx          # Loading animation
│   │   ├── ContactForm.tsx           # Contact form with validation
│   │   ├── CyberpunkScene3D.tsx      # Three.js 3D scene
│   │   ├── FuturisticPortfolio.tsx   # Main portfolio component
│   │   ├── InteractiveCyberTerminal.tsx # Terminal interface
│   │   ├── LoadingScreen.tsx         # Loading states
│   │   ├── ResumeViewer.tsx          # PDF resume viewer
│   │   ├── ThemeToggle.tsx           # Theme switcher
│   │   └── ui/                       # Radix UI components
│   └── lib/
│       ├── posts.ts                  # Blog post utilities
│       └── utils.ts                  # Helper functions
├── content/
│   └── blog/                         # MDX blog posts
│       ├── 2025-08-12-android-encrypted-config.mdx
│       └── 2025-08-15-smart-contract-invariant-testing.mdx
├── public/
│   ├── resume.pdf                    # Resume file
│   └── ...                           # Static assets
├── .env.example                      # Environment template
├── next.config.ts                    # Next.js configuration
├── tailwind.config.ts                # Tailwind configuration
└── package.json                      # Dependencies
```

## 🎨 Key Features Breakdown

### 1. AI Resume Assistant
- **Interactive chatbot** with knowledge about skills, projects, and experience
- **Quick questions** for instant answers
- **Real-time responses** with typing indicators
- **Persistent chat history** during session
- **Minimizable interface** for non-intrusive experience

### 2. Contact Form
- **Full validation** (name, email, message)
- **Real-time error display**
- **Loading states** during submission
- **Success/error notifications**
- **Email delivery** via Nodemailer
- **HTML email templates** with professional styling

### 3. Blog System
- **MDX support** for rich content
- **Full-text search** across titles, content, and tags
- **Tag-based filtering** with post counts
- **Reading time estimation**
- **SEO-friendly URLs**
- **Syntax highlighting** (ready to integrate)

### 4. Resume Viewer
- **In-browser PDF viewing**
- **Zoom controls** (50% - 200%)
- **Download button**
- **Keyboard shortcuts** (ESC to close)
- **Responsive design**

### 5. Theme System
- **Dark/Light mode toggle**
- **Smooth transitions**
- **Persistent preference** (localStorage)
- **next-themes integration**
- **No flash of unstyled content**

## 🔒 Security Features

- **Input validation** with Zod schemas
- **CSRF protection** on API routes
- **Rate limiting ready** (configure in production)
- **Environment variable protection**
- **XSS prevention** with React's built-in escaping
- **Resume integrity verification** (SHA-256 hash display)

## 📊 SEO Optimization

✅ **Metadata**: Complete title, description, and keywords
✅ **OpenGraph**: Social media preview images
✅ **Twitter Cards**: Enhanced Twitter sharing
✅ **Sitemap**: Auto-generated from pages and blog posts
✅ **Robots.txt**: Search engine crawler configuration
✅ **Structured Data**: Ready for JSON-LD implementation
✅ **Canonical URLs**: Prevent duplicate content issues
✅ **Image Optimization**: Next.js Image with AVIF/WebP

## � Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
2. **Import project** to Vercel
3. **Add environment variables** in Vercel dashboard
4. **Deploy** - automatic builds on push

### Environment Variables on Vercel

Add these in **Project Settings → Environment Variables**:
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `CONTACT_EMAIL`

### Custom Domain

Configure in Vercel dashboard:
1. Go to **Settings → Domains**
2. Add your custom domain
3. Update DNS records as instructed

## 📈 Analytics

Vercel Analytics is automatically enabled when deployed to Vercel. View insights at:
- **Dashboard**: https://vercel.com/your-username/your-project/analytics

## 🎯 Future Enhancements

Potential additions for v2.0:
- [ ] Newsletter subscription system
- [ ] GitHub activity widget
- [ ] Live coding demos
- [ ] Project case studies with metrics
- [ ] Video testimonials
- [ ] Multi-language support (i18n)
- [ ] Advanced analytics dashboard
- [ ] Blog comment system
- [ ] RSS feed generation
- [ ] Progressive Web App (PWA)

## 📝 Content Management

### Adding Blog Posts

Create a new `.mdx` file in `content/blog/`:

```mdx
---
title: "Your Blog Post Title"
slug: your-post-slug
summary: Brief description for listings
date: "2025-10-28"
tags: [cybersecurity, tutorial, tools]
status: published
---

## Your Content

Write your blog post content here with full Markdown support.
```

### Updating Resume

Replace `public/resume.pdf` with your updated resume. The SHA-256 hash will auto-update on next page load.

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Manav Singh Jamwal**
- Website: [manav-portfolio-three.vercel.app](https://manav-portfolio-three.vercel.app)
- GitHub: [@jamwal69](https://github.com/jamwal69)
- LinkedIn: [manavsinghjamwal](https://www.linkedin.com/in/manavsinghjamwal/)
- Email: jamwalmanav69@gmail.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and analytics
- Framer Motion for smooth animations
- Three.js community for 3D graphics
- All open-source contributors

---

**Built with 💙 by Manav Singh Jamwal** • Secured, Optimized, Future-Ready
│   ├── AIChatbot.tsx     # Interactive AI assistant
│   ├── Background3D.tsx   # Three.js particle system
│   ├── FuturisticPortfolio.tsx  # Main portfolio component
│   ├── LoadingScreen.tsx  # Animated loading screen
│   └── ThemeToggle.tsx    # Theme switching component
└── .github/
    └── copilot-instructions.md  # GitHub Copilot guidelines
```

### Custom CSS Classes
- `.glass` - Glassmorphism effect
- `.neon-blue`, `.neon-purple`, `.neon-green` - Glow effects
- `.neon-text-*` - Text with neon styling
- `.cyber-grid` - Animated grid background
- `.animate-float` - Floating animation
- `.animate-pulse-neon` - Pulsing neon effect

## 🌐 Deployment

The website is optimized for deployment on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **GitHub Pages** (with static export)

### Environment Variables
No environment variables required for the current build.

## 📄 License

This project is created for Manav Singh Jamwal's personal portfolio and professional use.

## 🤝 Contributing

This is a personal portfolio project. For suggestions or feedback, please contact Manav directly.

---

**Built with ❤️ and cutting-edge technology**

*Securing the future with intelligent solutions*
