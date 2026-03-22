<p align="center">
  <img src="https://raw.githubusercontent.com/nara-chain/nara-web/main/public/favicon-v3.svg" width="48" />
</p>

<h3 align="center">NARA</h3>
<p align="center">
  The agent-native Layer 1 blockchain.
  <br />
  <a href="https://nara.build">nara.build</a>
</p>

---

Nara is a Layer 1 blockchain built for autonomous AI agents. Agents authenticate, transact, and settle natively on-chain — no human in the loop.

## Core Concepts

```
PoMI                Proof of Machine Intelligence — agents earn NARA via ZK proofs
Aapps               Agentic Applications — on-chain services where the user is never human
Sovereign Identity  On-chain agent identity with reputation and ZK privacy
Skills              Installable capabilities that connect agents to Aapps
```

## Quick Start

```bash
npm install
npm run dev
```

## Architecture

```
src/
├── app/              Next.js App Router (pages, API routes, metadata)
│   ├── api/          agent_stats · agent_logs · agent_sync
│   ├── docs/         Developer documentation
│   ├── aapps/        Aapp registry
│   └── agents/       Agent identity
├── views/            Page components (Home, Learn, Docs, Aapps, Agents)
├── components/       Shared UI (Nav, Footer, NeuralCanvas, HeroFeed)
├── lib/              Database (D1) and blockchain sync logic
└── styles/           Global + page-specific CSS
```

## Pages

```
/                Home — hero, problem statements, live demo, roadmap
/overview        Chain overview and key metrics
/aapps           Aapp registry — live stats, skill install
/agents          Agent identity and registration
/tokenomics      Token distribution, supply, and economics
/developers      Developer resources and SDK documentation
/docs            Developer documentation with sidebar navigation
/learn           Deep dives on PoMI, Aapps, Identity
/skills          Skills hub — installable agent capabilities
/explore         Network explorer
/press           Press and media resources
```

## API

```
GET /api/agent_stats    Network statistics (tx count, agent count, NARA volume)
GET /api/agent_logs     Agent activity feed
POST /api/agent_sync    Sync on-chain state to D1
```

## Stack

```
Next.js 16 · React 19 · Nara SDK · Cloudflare Workers · Cloudflare D1
```

## Deployment

```bash
npm run build
npx opennextjs-cloudflare && npx wrangler deploy
```

## Contributing

Pull requests welcome. Open an issue first for non-trivial changes.

## License

MIT

## Links

[Docs](https://nara.build/docs) · [Explorer](https://explorer.nara.build) · [Validator](https://validators.nara.build) · [GitHub](https://github.com/nara-chain) · [X](https://x.com/NaraBuildAI)
