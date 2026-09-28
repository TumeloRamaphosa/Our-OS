# Our OS — Studex Master Operating System v2.1

**Master control center for 9-agent constellation + Bitfury launch**

---

## 🏗️ Architecture

```
🐝 Buzz Communities (wss://studex-agents.communities.buzz.xyz)
           ↑ Real-time Agent Hub
    ┌──────┴──────────────────────┐
    │                             │
[Relay Dashboard]         [Master OS Animation]      [OpenMuse Web]
(agent health)           (constellation viz)         (personal agent)
    │                             │                        │
    └──────────────────┬──────────┴────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
    9 Agents        War Room       Store API
    (Live)        (Operations)    (Shopify)
```

---

## 📊 What's Inside (NEW: Sep 26)

### **Relay Dashboard** (`dashboards-relay/`)
Real-time agent health monitoring + message inbox

- **Stack:** React + Next.js 14 + Tailwind CSS + TypeScript
- **Features:** 9 agents roster, message queue, uptime tracking
- **Deploy:** Vercel → `relay.studex-group.com`
- **Status:** ✅ Built, ready to deploy Sep 27

### **Master OS v2.1 Animation** (`master-os-animation.html`)
Animated constellation + code flow visualization

- **Stack:** HTML5 + GSAP + SVG + Web Audio API
- **Features:** Floating agent pods, region cards, partner scroll, 55Hz ambient tone
- **Deploy:** Vercel → `os.studex-group.com`
- **Status:** ✅ Built, ready to deploy Sep 27

---

## 🚀 Quick Start

### Local Development

```bash
# Relay Dashboard
cd dashboards-relay
npm install
npm run dev
# Open http://localhost:3000

# Master OS Animation
open master-os-animation.html
```

### This MacBook first

Primary desk is this MacBook. Read [machines/macbook.md](machines/macbook.md), then the agent map in [agents/registry.md](agents/registry.md). Auto-Meat and the Orgo computers are tied there.

### Mac Mini later

Second desk is `projects-mac-mini` (`100.112.109.40`). Pull this repo there when this MacBook desk is accepted, then follow [machines/mac-mini.md](machines/mac-mini.md).

Paste [prompts/grokbot-join-our-os.md](prompts/grokbot-join-our-os.md) to the Grokbot agents so they work on this OS with the MacBook.

---

## 📡 Deployment

### Deploy to Vercel (Sep 27)

```bash
# Relay Dashboard
cd dashboards-relay
vercel --prod --name studex-relay-dashboard

# Master OS
vercel --prod --name studex-master-os
```

Set environment variables in Vercel:
```
NEXT_PUBLIC_RELAY_URL=https://relay.bitfury.studex.dev
```

### Cloudflare DNS Routing

```
relay    CNAME   studex-relay-dashboard.vercel.app
os       CNAME   studex-master-os.vercel.app
```

---

## 🔗 Integration

### Buzz Communities WebSocket

Both dashboards subscribe to Buzz for real-time agent updates:

```typescript
// Connect to Buzz agent hub
const ws = new WebSocket('wss://studex-agents.communities.buzz.xyz');
ws.send(JSON.stringify({ type: 'subscribe', channel: 'agents:status' }));
```

---

## 👥 Agent Roster (All 9 Live)

| Agent | Role | Status | Surface |
|-------|------|--------|---------|
| **Naledi** | CMO | ✅ Live | OpenMuse, Relay, Master OS |
| **OpenClaw** | Strategy | ✅ Live | OpenMuse, War Room |
| **CashClaw** | CFO | ✅ Live | War Room, OpenMuse |
| **Adam** | CTO | ✅ Live | OpenMausBot, War Room |
| **Charlie** | Voice | ✅ Live | OpenMuse, Relay |
| **EDDIE** | Ads | ✅ Live | OpenMuse, War Room |
| **RALF** | Loop | ✅ Live | Relay, Master OS |
| **Hermes** | Router | ✅ Live | All surfaces |
| **Katia** | CAO | ✅ Live | War Room, OpenMuse |

---

## ✨ Features

### Relay Dashboard
- ✅ Real-time agent status (online/offline/active)
- ✅ Message inbox with filtering
- ✅ 7-day uptime percentage
- ✅ Active task tracking per agent
- ✅ Gold pulse animation

### Master OS v2.1
- ✅ Agent constellation (GSAP floating animation)
- ✅ Hover physics + scale effects
- ✅ Code flow visualization (SVG animated lines)
- ✅ Region cards (Rwanda, Cape Town, Nigeria, Singapore)
- ✅ Partner horizontal scroll (10 cloud partners)
- ✅ Ambient 55Hz soundscape
- ✅ Real-time agent status updates

---

## 📅 Timeline

| Phase | Date | Deliverable |
|-------|------|-------------|
| **1** | Sep 27 | Deploy Relay + Master OS to Vercel |
| **2** | Sep 28 | Wire Buzz WebSocket integration |
| **3** | Oct 1-10 | Bitfury team staging + testing |
| **4** | Oct 31 | Production launch (Cape Town 18:00 + Rwanda 14:00) |

---

## 🎨 Design System

**Colors:**
- Obsidian: `#0A0A0A`
- Gold: `#C9A84C`
- Cyan: `#00FFFF`

**Typography:**
- Bebas Neue (display)
- Cormorant Garamond (body)
- Space Mono (mono)

---

## 📦 Additional Components

- **War Room** (Orgo VM) — Full operations dashboard
- **OpenMausBot** (Mac/Desktop) — Agent desktop app
- **OpenMuse** (Web) — Personal agent + browser + terminal
- **Store API** (Shopify) — Fulfillment automation

---

## 🔧 Configuration

```bash
# .env for Relay Dashboard
NEXT_PUBLIC_RELAY_URL=https://relay.bitfury.studex.dev
```

---

## 📞 Support

1. Relay server health: `curl http://localhost:5555/health`
2. Buzz Communities reachable
3. Environment variables set
4. Check browser console for WebSocket errors

---

## 📄 License

MIT — Built for Studex Group

---

**Built by:** Tumi + Claude Code  
**Coordinated by:** Buzz Communities  
**Launched:** Oct 31, 2026
