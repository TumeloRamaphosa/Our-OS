# MacBook — primary desk

Checked on this machine on 28 September 2026. This is the desk we configure first. The Mac Mini pulls this repo later.

| | |
|---|---|
| Computer name | MacBook Pro (5) |
| Hostname | `MacBook-Pro-8.local` |
| Tailscale name | `macbook-pro-5` |
| Tailscale IPv4 | `100.95.66.29` |
| Tailscale state | Address answers. Coordination from this network is blocked (Fortinet). Peers show offline. |
| User | `tumeloramaphosa` |
| Repo on this Mac | `~/Our-OS` |
| GitHub | https://github.com/TumeloRamaphosa/Our-OS.git |

## Space on this Mac

| | |
|---|---|
| Disk | 926 GB volume, about 850 GB used, **21 GB free**, 98% full |
| RAM | 32 GB installed. Free pages were about 54 MB when checked. RAM is tight. |
| Local VM | OrbStack `studx-dev`, Ubuntu Noble arm64, running, 1.3 GB, `192.168.139.172` |

Do not download models, Docker images, or a Drive mirror onto this disk. Do not start another VM. `studx-dev` is the local Linux machine. Johannesburg and Iowa Google VMs are separate. Orgo computers are the cloud desks.

## What runs here

| Piece | Path or address | Role |
|---|---|---|
| CashClaw | `/opt/homebrew/bin/cashclaw` v1.7.0, config `~/.cashclaw` | Agent **Mac1-StudEx**. Already initialized 11 Aug 2026. Currency ZAR. Dashboard http://localhost:3847 |
| Auto-Meat checkout | `~/studex-auto-meat` | Command centre and Shopify connector `store/shopify.mjs` |
| Shop | https://studexmeat.com | Customers pay here. CashClaw bills with a Shopify draft order. |
| Grokbot floor | `~/grokbot-os` | Factory floor. Local URL http://127.0.0.1:8789 when the worker is up. |
| Hermes app | `~/.hermes/hermes-agent` | Profiles: `creative-lead`, `data-scientist`, `devops`, `qa`, `qwen-scribe`, `support`, `swe` |
| OpenClaw | ClawX on this Mac, `127.0.0.1:18789` | Stays on this Mac. |
| Herdr | local shell, plus machine `studx-dev` | Terminal desk. |
| Google account | `tumelor001@gmail.com` | Active gcloud project `gen-lang-client-0728429584`. Same email is the Orgo login. |

## Google machines (running)

| VM | Zone | Type | External IP |
|---|---|---|---|
| studex-factory | Iowa `us-central1-a` | e2-standard-4 | 35.222.144.14 |
| studex-command | Iowa `us-central1-a` | e2-standard-2 | 35.202.50.253 |
| studex-agent | Iowa `us-central1-a` | e2-micro | 34.10.52.77 |
| arcade-agents | Johannesburg `africa-south1-a` | e2-medium | 34.35.142.102 |
| studex-nexus-hub | Johannesburg `africa-south1-a` | e2-medium | 34.35.82.49 |

`hidden-cat-493019-i3` has Compute Engine disabled. No VM list there.

## Tie to Auto-Meat and Orgo

Auto-Meat is both the local checkout and the Orgo computer named **Auto - Meat** (running, 2 CPU, 8 GB RAM, 30 GB disk, always on). Naledi's Orgo computer is **Neledi - CMO** (running, 1 CPU, 4 GB RAM, 20 GB disk). The full cloud list is [orgo.md](orgo.md). The seat map is [../agents/registry.md](../agents/registry.md).

Desktop URLs stay off this public repo. On this Mac, list them with `orgo computers list` while logged in as tumelor001@gmail.com. SSH is off on those computers.

## Commands on this desk

```bash
cashclaw status
cashclaw missions
orgo whoami
orgo computers list
```

`cashclaw init` already ran. Do not run it again.
