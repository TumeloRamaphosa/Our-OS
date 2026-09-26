# Studex NEXUS Relay Dashboard

Operations command centre for Bitfury team to monitor NEXUS relay, agents, and message flows.

## Features

✅ **Relay Status** — Online/offline, active agents, uptime metrics  
✅ **Agent Roster** — All 9 agents with live status and message counts  
✅ **Message Inbox** — Real-time message queue with filtering (pending/processed/error)  
✅ **Live Updates** — Auto-refresh every 2-10 seconds  
✅ **Bitfury Branding** — Gold + obsidian theme, cinematic design  

## Setup (Local Development)

```bash
cd ~/studex-relay-dashboard
npm install
npm run dev
```

Open `http://localhost:3000`

**Environment variables** (`.env.local`):
```env
NEXT_PUBLIC_RELAY_URL=http://localhost:5555
```

For production:
```env
NEXT_PUBLIC_RELAY_URL=https://relay.studex.dev
```

## Relay Server Integration

Dashboard connects to `~/studex-relay/app.py`:
- `GET /health` — relay status
- `GET /status` — agent list + metrics
- `GET /inbox` — pending messages
- `GET /outbox` — processed messages

## Deployment to Vercel

```bash
# 1. Push to GitHub
git push origin main

# 2. Connect to Vercel (one-time)
vercel --prod --env NEXT_PUBLIC_RELAY_URL=<PRODUCTION_RELAY_URL>

# 3. Or use Vercel dashboard
# Project: studex-relay-dashboard
# GitHub repo: <your-org>/studex-relay-dashboard
```

**Environment Setup in Vercel:**
- Production: `NEXT_PUBLIC_RELAY_URL=https://relay.bitfury.studex.dev`
- Staging: `NEXT_PUBLIC_RELAY_URL=https://relay-staging.studex.dev`

## Bitfury Team Access

**Dashboard URL:** `https://relay.studex.dev` (after deployment)

**Credentials:**
- Username: `bitfury-ops`
- Access: Vadim (CEO), Data Ops, Compliance, Africa Hub, Tech Lead

**VPN:** Tailscale tunnel for Rwanda/Cape Town offices (offline mode)

## Architecture

```
Bitfury Ops Team (Vercel)
         ↓
     Dashboard (React/Next.js)
         ↓
    Relay Server (Flask, localhost:5555)
         ↓
    Agent Checker (Python, ~/.studex-agents/)
         ↓
   9 Agents (Naledi, OpenClaw, CashClaw, Adam, Charlie, EDDIE, RALF, Hermes, Katia)
```

## Next: Master OS Animation Layer (Phase 2)

Once dashboard ships (Oct 10), begins Master OS v2.1 animation:
- Agent constellation motion (Motion.js + GSAP)
- Code flow visualization
- Scroll-hijack horizontal partner showcase
- Ambient soundscape

## Launch Timeline

- **Oct 10:** Dashboard live at relay.studex.dev
- **Oct 25:** Master OS v2.1 with animation at studex.dev
- **Oct 31:** Full Bitfury integration + go-live (18:00 SAST Cape Town / 14:00 EAT Rwanda)
