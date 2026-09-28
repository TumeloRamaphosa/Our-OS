# Agent registry — this MacBook

Configured 28 September 2026. Seats below are the ones that exist. The Mac Mini is not in this map yet.

A talking seat drafts. A service seat does the hands. Publish, payment, theme push, and fulfilment wait for Tumelo or Katlego.

| Seat | Kind | Lives on | Tied to |
|---|---|---|---|
| Mac1-StudEx | service | This Mac, CashClaw `~/.cashclaw` | StudEx Meat missions. Draft-order billing. Shop https://studexmeat.com |
| Auto-Meat | service | Orgo computer **Auto - Meat**, code `~/studex-auto-meat` | Command centre, Shopify read connector `store/shopify.mjs`, Buzz `@Auto-Meat` |
| Naledi | voice | Orgo computer **Neledi - CMO** | StudEx Meat. Drafts only. |
| CashClaw (company lead) | voice | Grokbot floor `~/grokbot-os` | Treasury. Reports beside Auto-Meat. Does not replace Mac1-StudEx. |
| Hermes profiles | local apps | This Mac, `~/.hermes/profiles` | `creative-lead`, `data-scientist`, `devops`, `qa`, `qwen-scribe`, `support`, `swe` |
| OpenClaw | execution | ClawX on this Mac, `127.0.0.1:18789` | Stays on this Mac. |
| Global Markets | desk | Orgo computer **Global Markets** | Markets floor. Separate from the meat shop. |
| Super Agents Command | desk | Orgo computer **Project - 2571: Super Agents Command** | Group command. |
| studx-dev containers | local runtime | OrbStack on this Mac | Hermes, Ollama, n8n, Arcade. 1.3 GB. |

## Rules for this desk

- CashClaw is already initialized. Use `cashclaw status` and `cashclaw missions`.
- Orgo login on this Mac is `tumelor001@gmail.com`. Use `orgo computers list`.
- Desktop URLs stay out of git.
- This Mac has 21 GB disk free and almost no free RAM. New agent processes go on an Orgo computer that is already running, or on `studx-dev` if a container is already there.
- Google VMs stay the five that are already running. See [../machines/macbook.md](../machines/macbook.md).

## Meat loop

1. Customer buys on https://studexmeat.com.
2. Auto-Meat reads products and orders from `~/studex-auto-meat/store/shopify.mjs`.
3. Naledi drafts the message on **Neledi - CMO**.
4. Mac1-StudEx drafts the Shopify invoice with `cashclaw` on this Mac.
5. A person approves before a post, a charge, or a fulfilment.
