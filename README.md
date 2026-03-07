# apee — Personal Website

A personal website built with [Next.js](https://nextjs.org) and ready to deploy on [Vercel](https://vercel.com).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Deploy on Vercel

1. **Push to GitHub**  
   Create a repo and push this project:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/apee.git
   git add . && git commit -m "Initial commit" && git push -u origin main
   ```

2. **Import on Vercel**  
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub.  
   - Click **Add New** → **Project**.  
   - Select the `apee` repository and click **Import**.

3. **Deploy**  
   Vercel will detect Next.js and use default build settings. Click **Deploy**. Your site will be live in about a minute.

4. **Optional: custom domain**  
   In the project dashboard go to **Settings** → **Domains** and add your domain. Update your DNS with the records Vercel provides.

## Project structure

- `src/app/page.tsx` — Home page  
- `src/app/about/page.tsx` — About page  
- `src/app/layout.tsx` — Root layout and metadata  
- `src/app/globals.css` — Global styles and CSS variables  

Edit these files to add your name, links, and content.

## Scripts

| Command      | Description              |
|-------------|--------------------------|
| `npm run dev`   | Start dev server (localhost:3000) |
| `npm run build` | Production build          |
| `npm run start` | Run production build locally |
| `npm run lint`  | Run ESLint               |
