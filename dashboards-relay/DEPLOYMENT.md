# Vercel Deployment Guide

## Prerequisites

1. **GitHub Account** — dashboard must be in a public/private GitHub repo
2. **Vercel Account** — sign up at vercel.com with GitHub
3. **Relay Server** — must be reachable at production URL

## Step-by-Step Deployment

### 1. Push to GitHub

```bash
cd ~/studex-relay-dashboard
git init
git add .
git commit -m "Initial relay dashboard commit"
git remote add origin https://github.com/YOUR_ORG/studex-relay-dashboard.git
git push -u origin main
```

### 2. Connect to Vercel (One-time)

**Option A: Vercel CLI**
```bash
npm i -g vercel
vercel --prod
```
Follow prompts to link GitHub repo.

**Option B: Vercel Dashboard**
1. Go to https://vercel.com
2. Click "Import Project"
3. Select GitHub repo `studex-relay-dashboard`
4. Click "Import"

### 3. Set Environment Variables

In Vercel dashboard, go to **Settings → Environment Variables**:

**Production:**
- `NEXT_PUBLIC_RELAY_URL` = `https://relay.bitfury.studex.dev`

**Staging (optional):**
- `NEXT_PUBLIC_RELAY_URL` = `https://relay-staging.studex.dev`

### 4. Deploy

```bash
# Automatic (on git push)
git push origin main

# Or manual
vercel --prod
```

## Post-Deployment Checklist

- [ ] Dashboard accessible at `https://relay.studex.dev`
- [ ] Relay health check passes (shows ONLINE)
- [ ] All 9 agents visible
- [ ] Message inbox updates in real-time
- [ ] Bitfury team can log in via Tailscale VPN

## Rollback

If deployment breaks:

```bash
# Revert to last working version
vercel rollback
```

## Monitoring

**Vercel dashboard:** vercel.com → studex-relay-dashboard → Deployments

**Live logs:**
```bash
vercel logs studex-relay-dashboard --prod
```

## Next: Master OS Animation (Oct 15-25)

Once dashboard is stable on Oct 10, begin Phase 2 (Master OS v2.1 animation):
- Agents moving through 3D constellation
- Code flow visualization
- Scroll-hijack horizontal pan
- Ambient sound

See `../Desktop/studex-master-os-expanded.html` for current v2.0.
