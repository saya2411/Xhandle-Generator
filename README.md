# Xhandle Generator

Xhandle Generator is a minimalist, aesthetic underground handle generator and availability verification engine designed for X (Twitter). It features subterranean subculture categories (Void & Noir, Dark & Edgy, Cyber Occult, and Leet Numeric Ciphers), offline-first caching, and real-time handle verification.

---

## 🚀 Quick Setup & Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 🐙 How to Push to GitHub

1. Open your terminal in this project directory.
2. Initialize git and commit your files:

```bash
git init
git add .
git commit -m "Initial commit: Xhandle Generator"
```

3. Create a new repository on [GitHub](https://github.com/new) (e.g. `xhandle-generator`).
4. Link and push your repository:

```bash
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>.git
git push -u origin main
```

---

## ⚡ How to Deploy to Vercel

### Method 1: Via Vercel Dashboard (Recommended & Easiest)

1. Go to [Vercel](https://vercel.com/) and log in with your GitHub account.
2. Click **"Add New..."** → **"Project"**.
3. Import your GitHub repository (`<YOUR_REPO_NAME>`).
4. In the configuration:
   - **Framework Preset**: Vite (detected automatically).
   - **Root Directory**: `./` (leave default).
   - **Environment Variables**: Add `GEMINI_API_KEY` (optional, for real-time background AI synthesis).
5. Click **"Deploy"**.

Your app is live with both static frontend and serverless API routes (`/api/*`) handled automatically via `vercel.json` and `api/index.ts`!

---

### Method 2: Via Vercel CLI

```bash
# 1. Install Vercel CLI globally
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy to production
vercel --prod
```

---

## ⚙️ Project Structure

- `src/` — React frontend, accessible components, and offline storage logic.
- `src/data/undergroundDictionary.ts` — Hand-curated underground vocabulary and combinatorial dynamic synthesizer.
- `server.ts` — Express API for existence checking (`/api/check-handle/:handle`) and AI synthesis (`/api/generate-handles`).
- `api/index.ts` — Vercel Serverless Function entry point.
- `vercel.json` — Vercel deployment routes and SPA rewrites.
