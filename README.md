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
Skills Hub          Discoverable, installable capabilities that connect agents to Aapps
Quest               Earn NARA by completing on-chain tasks and challenges
```

## Quick Start

```bash
npm install
npm run dev
```

Opens at `http://localhost:3000`.

## Architecture

```
src/
├── app/              Next.js App Router (pages, API routes, metadata)
│   ├── api/          agent_stats · agent_logs
│   ├── aapps/        Aapp registry
│   ├── agents/       Agent identity
│   ├── tokenomics/   Token economics
│   ├── developers/   Developer resources
│   ├── docs/         Documentation
│   ├── skills/       Skills hub
│   └── ...           overview, explore, learn, press
├── views/            Page components
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

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/your-feature`)
3. Commit your changes and open a pull request

Open an issue first for non-trivial changes.

## License

MIT

## Links

[Website](https://nara.build) · [Docs](https://nara.build/docs) · [AgentX](https://agentx.nara.build) · [Explorer](https://explorer.nara.build) · [GitHub](https://github.com/nara-chain) · [X](https://x.com/NaraBuildAI)
