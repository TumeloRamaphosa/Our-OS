# Our OS — Studex Master Operating System v2.1

**Central command center for 9-agent autonomous network**  
Relay dashboard + Master OS animation + Buzz Communities coordination

---

## What's Inside

### **Relay Dashboard** (`dashboards-relay/`)
Real-time agent health monitoring + message inbox

- **Stack:** React + Next.js 14 + Tailwind CSS + TypeScript
- **Features:** 9 agents roster, message queue, uptime tracking
- **Deploy:** Vercel → `relay.studex-group.com`
- **Setup:** `npm install && npm run dev`

### **Master OS v2.1 Animation** (`master-os-animation.html`)
Animated constellation + code flow visualization

- **Stack:** HTML5 + GSAP + SVG + Web Audio API
- **Features:** Floating agent pods, region cards, partner scroll, 55Hz ambient tone
- **Deploy:** Vercel → `os.studex-group.com`
- **Setup:** Open in browser (standalone file)

---

## Quick Start

### Local Development

```bash
# Relay Dashboard
cd dashboards-relay
npm install
npm run dev
# Open http://localhost:3000
```

### View Master OS Animation

```bash
open master-os-animation.html
# Or open in any browser
```

---

## Deployment

### Vercel (Recommended)

**Relay Dashboard:**
```bash
cd dashboards-relay
vercel --prod --name studex-relay-dashboard
```

Set environment variable in Vercel:
```
NEXT_PUBLIC_RELAY_URL=https://relay.bitfury.studex.dev
```

**Master OS:**
```bash
vercel --prod --name studex-master-os
```

### Cloudflare DNS

Add CNAME records:
```
relay    CNAME   studex-relay-dashboard.vercel.app
os       CNAME   studex-master-os.vercel.app
```

---

## Architecture

```
🐝 Buzz Communities (wss://studex-agents.communities.buzz.xyz)
           ↓ Real-time agent status
    ┌──────┴──────┐
    │             │
Relay Dashboard  Master OS
    │             │
    └──────┬──────┘
         9 Agents
    (Naledi, OpenClaw, CashClaw, Adam, Charlie, EDDIE, RALF, Hermes, Katia)
```

---

## Integration

### Buzz Communities WebSocket

Both dashboards subscribe to Buzz for real-time updates:

```typescript
// Relay Dashboard
const ws = new WebSocket('wss://studex-agents.communities.buzz.xyz');
ws.send(JSON.stringify({ type: 'subscribe', channel: 'agents:status' }));

// Master OS Animation
socket.send(JSON.stringify({ type: 'subscribe', channel: 'agents:status' }));
```

---

## Agent Roster

| Agent | Role | Status |
|-------|------|--------|
| Naledi | CMO | ✅ Live |
| OpenClaw | Strategy | ✅ Live |
| CashClaw | CFO | ✅ Live |
| Adam | CTO | ✅ Live |
| Charlie | Voice | ✅ Live |
| EDDIE | Ads | ✅ Live |
| RALF | Loop | ✅ Live |
| Hermes | Router | ✅ Live |
| Katia | CAO | ✅ Live |

---

## Configuration

### Relay Dashboard (`.env`)

```bash
NEXT_PUBLIC_RELAY_URL=http://localhost:5555  # Local
# or
NEXT_PUBLIC_RELAY_URL=https://relay.bitfury.studex.dev  # Production
```

### Master OS

No configuration needed — standalone HTML file.

---

## Features

### Relay Dashboard
- ✅ Real-time agent status (online/offline/degraded)
- ✅ Active task count per agent
- ✅ Message inbox (pending/processed/error filtering)
- ✅ 7-day uptime percentage
- ✅ Live pulse animation (gold accent)
- ✅ 10-second polling refresh

### Master OS v2.1
- ✅ Agent constellation animation (GSAP floating motion)
- ✅ 3D perspective pod rendering
- ✅ Hover physics (scale + shadow effects)
- ✅ Code flow visualization (SVG animated lines)
- ✅ Region cards with scroll-reveal (Rwanda, Cape Town, Nigeria, Singapore)
- ✅ Partner horizontal scroll (10 cloud partners)
- ✅ Agent execution grid at bottom
- ✅ Ambient soundscape (55Hz sine wave, every 10 seconds)
- ✅ Menu interactions + responsive design

---

## Deployment Timeline

| Date | Deliverable |
|------|-------------|
| Sep 27 | Deploy Relay Dashboard + Master OS to Vercel |
| Sep 28 | Wire to Buzz Communities WebSocket |
| Oct 1-10 | Bitfury team onboarding + staging |
| Oct 31 | Production launch (Cape Town 18:00 SAST + Rwanda 14:00 EAT) |

---

## Support

**Issues?** Check:
1. Relay server running (`curl http://localhost:5555/health`)
2. Buzz Communities endpoint reachable
3. Environment variables set (.env files)
4. Browser console for WebSocket errors

---

## Design System

**Color Palette:**
- Obsidian: `#0A0A0A`
- Gold: `#C9A84C`
- Cyan: `#00FFFF`

**Typography:**
- Display: Bebas Neue
- Body: Cormorant Garamond
- Mono: Space Mono

**Animation:**
- GSAP library for constellation motion
- CSS animations for pulse + fade effects
- Scroll-driven reveals (Intersection Observer)

---

## License

MIT — Built for Studex Group

---

**Built by:** Tumi + Claude Code  
**Coordinated by:** Buzz Communities  
**For:** Bitfury Series A Launch (Oct 31, 2026)
