# Studex Group Complete Setup — Checklist

## 🌐 DOMAIN & CLOUDFLARE

- [ ] www.studex-group.com domain owner/registrar?
- [ ] Cloudflare account set up for this domain?
- [ ] Nameservers pointing to Cloudflare?
- [ ] Cloudflare Tunnel created? (tunnel-id?)

## 📧 EMAIL

- [ ] Google Workspace account? (company email domain?)
- [ ] Gmail API enabled?
- [ ] SMTP credentials for sending?
- [ ] Which email addresses for agents?
  - [ ] hermes@studex-group.com
  - [ ] naledi@studex-group.com
  - [ ] operations@studex-group.com
  - [ ] support@studex-group.com

## ☁️ GOOGLE CLOUD

- [ ] GCP Project ID?
- [ ] Service account JSON key?
- [ ] APIs enabled?
  - [ ] Cloud Run
  - [ ] Cloud Functions
  - [ ] Cloud Storage
  - [ ] BigQuery
  - [ ] Pub/Sub

## 🔐 TAILSCALE

- [ ] Tailscale org name?
- [ ] Auth token/API key?
- [ ] Your machine IP: macbook-pro-5.tailf7273b.ts.net?
- [ ] Local ports to expose:
  - [ ] Herdr relay: 5555
  - [ ] Ollama: 11434
  - [ ] LiteLLM: 4000

## 🗄️ DATABASE

- [ ] Supabase project URL?
- [ ] Supabase API key (anon)?
- [ ] Supabase service role key (secret)?

## ✅ AGENT ENDPOINTS

- [ ] Hermes endpoint? (localhost:xxxx?)
- [ ] OpenClaw endpoint?
- [ ] Buzz WebSocket: wss://studex-agents.communities.buzz.xyz ✓

---

Once you provide these, I'll build:
1. Cloudflare Pages + Workers setup (www.studex-group.com)
2. Cloudflare Tunnel → Local agents bridge
3. Email routing (Gmail ↔ agents)
4. Google Cloud microservices
5. Tailscale VPN config
6. Supabase schemas for all operations
7. Push everything to Our-OS master repo

