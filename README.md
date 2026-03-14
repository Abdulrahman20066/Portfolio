# 🚀 Developer Portfolio — Full-Stack 3D Portfolio Website

A modern, production-ready developer portfolio with 3D animations, file storage, and an admin panel.

**Tech Stack:** Next.js 14 · React Three Fiber · Framer Motion · TailwindCSS · Supabase

---

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── layout.tsx          # Admin page layout
│   │   │   └── page.tsx            # Admin upload panel (/admin)
│   │   ├── api/
│   │   │   ├── contact/route.ts    # Contact form handler
│   │   │   ├── upload/route.ts     # File upload + list
│   │   │   └── files/route.ts      # File deletion
│   │   ├── globals.css             # Global styles, CSS vars, utilities
│   │   ├── layout.tsx              # Root HTML layout + metadata
│   │   └── page.tsx                # Home page (assembles all sections)
│   ├── components/
│   │   ├── 3d/
│   │   │   └── HeroCanvas.tsx      # React Three Fiber 3D scene
│   │   ├── Navigation.tsx          # Sticky nav with scroll-aware active state
│   │   ├── Hero.tsx                # Hero section with 3D background
│   │   ├── About.tsx               # About section with stats
│   │   ├── Skills.tsx              # Animated skill bars
│   │   ├── Projects.tsx            # Project grid with filter
│   │   ├── Resume.tsx              # Timeline experience + education
│   │   ├── Resources.tsx           # File listing from Supabase
│   │   ├── Contact.tsx             # Contact form
│   │   └── Footer.tsx              # Footer
│   ├── hooks/
│   │   └── useScrollAnimation.ts   # IntersectionObserver hooks
│   └── lib/
│       ├── data.ts                 # ← ALL your content lives here
│       └── supabase.ts             # Supabase client + helpers
├── public/
│   ├── resume.pdf                  # Your resume (replace this!)
│   └── projects/                   # Project screenshots (optional)
├── .env.example                    # Environment variables template
├── .env.local                      # Your actual secrets (git-ignored)
├── supabase-setup.sql              # Run in Supabase SQL editor
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## ⚡ Quick Start (5 minutes)

### 1. Install dependencies

```bash
npm install
# or
yarn install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in at minimum:
```env
ADMIN_PASSWORD=choose-a-secure-password
```

### 3. Customize your content

Open `src/lib/data.ts` and update:
- `personalInfo` — your name, bio, email, GitHub, LinkedIn
- `skills` — your actual skills and proficiency levels
- `experiences` — your work history
- `education` — your education
- `projects` — your projects with links

### 4. Add your resume

Replace `public/resume.pdf` with your actual resume PDF.

### 5. Run development server

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## 📦 Supabase Setup (for file storage)

> **Optional** — the portfolio works without Supabase, just without file uploads.

### Step 1 — Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project

### Step 2 — Create a storage bucket

1. In your Supabase dashboard, go to **Storage**
2. Click **New bucket**
3. Name: `portfolio-files`
4. Toggle **Public bucket** to ON
5. Click **Save**

### Step 3 — Set up permissions

Go to **SQL Editor** and run the contents of `supabase-setup.sql`.

### Step 4 — Add credentials to .env.local

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

Get these from: **Settings → API** in your Supabase dashboard.

---

## 📬 Contact Form Setup

By default, the contact form **logs submissions to the console**.

### Option A: Resend (recommended, free tier available)

1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Add to `.env.local`:
   ```env
   RESEND_API_KEY=re_xxxx
   CONTACT_EMAIL=you@yourdomain.com
   ```
4. Uncomment the Resend block in `src/app/api/contact/route.ts`

### Option B: Store in Supabase

Uncomment the Supabase block in `src/app/api/contact/route.ts`.
Run the contact_messages table SQL from `supabase-setup.sql`.

---

## 🔐 Admin Panel

Access at: `http://localhost:3000/admin`

- Enter your `ADMIN_PASSWORD` from `.env.local`
- Drag and drop files to upload
- Files appear in the **Resources** section on the main portfolio
- The admin page is excluded from search engine indexing

---

## 🚀 Deployment to Vercel

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main
```

### Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **New Project** → Import your GitHub repo
3. Framework preset: **Next.js** (auto-detected)
4. Add environment variables (same as `.env.local`)
5. Click **Deploy**

### Step 3 — Custom domain

1. In Vercel dashboard → **Domains**
2. Add your `.com` domain
3. Follow DNS instructions from your domain registrar

### Step 4 — (Optional) Google Analytics

Add to `src/app/layout.tsx`:
```tsx
import { GoogleAnalytics } from '@next/third-parties/google';
// ...
<GoogleAnalytics gaId="G-XXXXXXXXXX" />
```

---

## 🎨 Customization Guide

### Change colors

Edit CSS variables in `src/app/globals.css`:
```css
:root {
  --accent-cyan:  #00D4FF;  /* Primary accent */
  --accent-pink:  #FF3366;  /* Secondary accent */
  --accent-green: #00FF94;  /* Availability/success color */
}
```

### Change fonts

In `src/app/layout.tsx`, swap `Syne` and `DM_Sans` for any Google Fonts.

### Change 3D scene

Edit `src/components/3d/HeroCanvas.tsx` to:
- Add/remove floating shapes
- Change colors of 3D elements
- Adjust rotation speed and float intensity

---

## 📊 Performance Tips

- 3D canvas DPR is capped at 1.5 for performance
- Three.js canvas is lazy-loaded (no SSR)
- `triggerOnce: true` on all IntersectionObserver calls
- Images use Next.js `<Image>` for automatic optimization

---

## 🛠 Common Issues

**3D scene not showing?**
→ Make sure `@react-three/fiber`, `@react-three/drei`, and `three` are installed.
→ Check browser console for WebGL errors.

**File uploads failing?**
→ Check your Supabase URL and service role key in `.env.local`.
→ Make sure the `portfolio-files` bucket is set to **public**.
→ Make sure you ran `supabase-setup.sql`.

**Contact form not sending emails?**
→ The default only logs to console. Follow the Resend setup above.

**Build failing?**
→ Run `npm run lint` to check for type errors.
→ Make sure all env variables are set in your Vercel project settings.

---

## 📄 License

MIT — use this freely for your own portfolio.
