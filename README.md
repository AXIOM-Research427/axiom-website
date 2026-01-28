# Axiom Website

The official website for **Axiom** — an international research collective founded in Kigali.

*First Principles. Final Proofs.*

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open http://localhost:5173 in your browser
```

---

## 📦 Build for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized static files ready for deployment.

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended - Easiest)

**One-click deploy:**

1. Go to [vercel.com](https://vercel.com) and sign up (free)
2. Click "New Project"
3. Import your GitHub repository (or drag & drop the folder)
4. Vercel auto-detects Vite — just click "Deploy"
5. Done! You get a URL like `axiom-website.vercel.app`

**Custom domain:** Add your domain in Project Settings → Domains

**CLI method:**
```bash
npm install -g vercel
vercel
```

---

### Option 2: Netlify (Also Very Easy)

1. Go to [netlify.com](https://netlify.com) and sign up (free)
2. Click "Add new site" → "Deploy manually"
3. Drag & drop your `dist/` folder (after running `npm run build`)
4. Done! You get a URL like `axiom-website.netlify.app`

**From Git:**
1. Connect your GitHub repo
2. Build command: `npm run build`
3. Publish directory: `dist`

**CLI method:**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

---

### Option 3: Cloudflare Pages (Fast Global CDN)

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect your GitHub repository
3. Configure:
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Deploy!

**Benefits:** Free SSL, global CDN, unlimited bandwidth

---

### Option 4: GitHub Pages (Free with GitHub)

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json` scripts:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. Add base URL to `vite.config.js`:
```js
export default defineConfig({
  base: '/your-repo-name/',
  plugins: [react()],
})
```

4. Deploy:
```bash
npm run deploy
```

5. Enable GitHub Pages in repo Settings → Pages → Source: `gh-pages` branch

---

### Option 5: Railway

1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Railway auto-detects and deploys
4. Add custom domain in settings

---

### Option 6: Self-Hosted (VPS/Server)

If you have a VPS (DigitalOcean, Linode, AWS EC2, etc.):

```bash
# On your server
# 1. Install Node.js and nginx

# 2. Clone your repo
git clone https://github.com/yourusername/axiom-website.git
cd axiom-website

# 3. Build
npm install
npm run build

# 4. Serve with nginx
sudo nano /etc/nginx/sites-available/axiom
```

Nginx config:
```nginx
server {
    listen 80;
    server_name axiom.research yourdomain.com;
    root /var/www/axiom-website/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
```

```bash
# 5. Enable site
sudo ln -s /etc/nginx/sites-available/axiom /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# 6. Add SSL with Certbot
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## 🔧 Customization

### Adding Real Members

Edit `src/AxiomWebsite.jsx` and update the `membersData` array:

```jsx
const membersData = [
  {
    id: 'your-name',
    name: 'Your Name',
    role: 'Your Role',
    division: 'Collegium Infinitatis', // or Machinatores, Navigatores
    tier: 'Core Contributor', // or Council, Associate
    image: '👤', // or URL to image
    location: 'City, Country',
    email: 'email@axiom.research',
    bio: 'Your biography...',
    research: ['Topic 1', 'Topic 2'],
    education: [
      { degree: 'PhD, Field', institution: 'University', year: '2020-2024' }
    ],
    publications: ['pub-1'], // IDs from publicationsData
    links: { github: 'https://github.com/...', scholar: '...' }
  },
  // ... more members
];
```

### Adding Publications

Update the `publicationsData` array similarly.

### Adding Images

For member photos, you can:
1. Use URLs: `image: 'https://example.com/photo.jpg'`
2. Add images to `public/images/` and use: `image: '/images/member.jpg'`

Then update the component to render images:
```jsx
{member.image.startsWith('http') || member.image.startsWith('/') ? (
  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
) : (
  <span className="text-3xl">{member.image}</span>
)}
```

---

## 📁 Project Structure

```
axiom-website/
├── public/
│   └── favicon.svg
├── src/
│   ├── AxiomWebsite.jsx    # Main website component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 🎨 Tech Stack

- **React 18** — UI framework
- **Vite** — Build tool
- **Tailwind CSS** — Styling
- **Google Fonts** — Cormorant Garamond, DM Sans, JetBrains Mono

---

## 📝 License

© 2025 Axiom • Ordo Infinitatis

---

## 🤝 Contact

For questions about joining Axiom, visit the Join page on the website or email: contact@axiom.research
