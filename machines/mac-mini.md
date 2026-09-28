# Mac Mini — second desk

Open this file after you clone Our-OS on the Mac Mini. This machine joins the OS. It does not become a new operating system.

Checked from the MacBook on 28 September 2026. Tailscale on that network could not reach the coordination server (the health check named Fortinet). Treat the addresses below as the last tailnet record, then confirm them on the Mini.

| | |
|---|---|
| Tailscale name | `projects-mac-mini` |
| Tailscale IPv4 | `100.112.109.40` |
| Last seen from the MacBook | about 1 day before this note |
| Repo | https://github.com/TumeloRamaphosa/Our-OS.git |
| Clone path | `~/Our-OS` |
| Primary desk | `macbook-pro-5` at `100.95.66.29` |
| Separate Linux node | `studex-grokbot-os` at `100.76.121.16` — that is not this Mini |

## What this machine is

- A second desk for Our-OS and for Grokbot.
- It reads and edits this repo.
- It can run the relay dashboard locally.
- It talks to the MacBook over Tailscale when the tailnet is up.

## What stays on the MacBook

- ClawX / OpenClaw gateway: `127.0.0.1:18789` inside ClawX on the MacBook. Do not move that gateway onto the Mini.
- Hermes desktop app: `~/.hermes/hermes-agent` on the MacBook.
- OrbStack machine `studx-dev` on the MacBook. Do not create another VM.
- Grokbot floor on the MacBook: `~/grokbot-os`, local URL `http://127.0.0.1:8789`.
- The MacBook disk is nearly full. Do not copy Ollama weights, Docker images, or a full Google Drive mirror onto it. Finished files go to Drive. Scratch stays on the machine that has room.

## Set up

```bash
# 1. Identity
hostname
tailscale ip -4
tailscale status

# 2. This repo
git clone https://github.com/TumeloRamaphosa/Our-OS.git ~/Our-OS
cd ~/Our-OS
git pull

# 3. Relay dashboard (optional, local only)
cd ~/Our-OS/dashboards-relay
npm install
npm run dev
# http://127.0.0.1:3000

# 4. Grokbot floor, only if this Mini is meant to run it
# If ~/grokbot-os already exists, use that checkout. Do not start a second copy.
cd ~/grokbot-os
npm install
npx wrangler dev --port 8789
# http://127.0.0.1:8789
```

If `tailscale` is missing: install the Tailscale app and log in as `tumelor001@`. Homebrew's tailscale service is not the login on the MacBook. The menu-bar app owns the tailnet.

If Tailscale says it cannot reach the coordination server, change network. A Fortinet path was blocking it from the MacBook on 28 September 2026.

## Join the OS

1. Read `README.md`, this file, and `prompts/grokbot-join-our-os.md`.
2. Paste that prompt to the Grokbot agents on this machine.
3. Send their reply back to the MacBook session. That reply is how this desk gets registered.
4. Do not commit tokens, `.env`, service-account JSON, or Tailscale auth keys.
5. Do not publish, deploy, or send messages from this checkout until the MacBook session says the reply was accepted.

## Services this desk may call

These are already on the MacBook or on Cloudflare. The Mini calls them. It does not reinstall them.

| Service | Where |
|---|---|
| Our-OS repo | this checkout |
| Grokbot floor | `~/grokbot-os` on the machine that already has it, or `http://127.0.0.1:8789` |
| Public factory | https://studex-factory.tumelor001.workers.dev |
| Buzz | `wss://studex-agents.communities.buzz.xyz` |
| OpenClaw | ClawX on the MacBook, `127.0.0.1:18789` |
| Ollama | MacBook `127.0.0.1:11434` when that Mac is awake |
| Obsidian (human vault) | `~/Documents/Obsidian Vault/2nd Brain` on the machine that has the vault |
| Drive archive | Death Star folder `1Ap0rPgpnUli89561ZKgHxY59AIXQ5zgx` — Operating System room `1uoW44A4nl0Zj_xJpGcnWQJyFXF6NiYpE` |

Company leads stay as they are in `~/grokbot-os/COMPANY.md`: Robusca-Prime (Group / OS), Naledi (Meat), Market Lead (Global Markets), CashClaw (treasury, coffee, wheat). One company, one lead. This Mini does not get its own CEO.
