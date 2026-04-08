---
title: "INTRODUCING ALEXANDRIA"
date: "2026-04-08"
excerpt: "A desktop and mobile application that turns every device into a full node in a decentralized education network with verifiable, learner-owned credentials. Open-sourced today."
tags: ["ANNOUNCEMENT", "ALEXANDRIA", "DECENTRALIZED", "OPEN SOURCE"]
readTime: "18 MIN"
draft: false
---

The internet solved the distribution of knowledge. It has not solved the recognition of knowledge — and that gap determines who gets opportunity and who doesn't.

Today I'm open-sourcing Alexandria: a desktop and mobile application that turns every device into a full node in a decentralized education network with verifiable, learner-owned credentials.

---

## Why Build This

I started Alexandria because of a contradiction that kept bothering me: the internet made knowledge essentially free to distribute, but the systems that recognise knowledge — degrees, certifications, resumes — are still expensive, centralised, and gatekept.

A teenager in Lagos can watch the same MIT lectures as a student in Cambridge. But the MIT student walks away with a credential that opens doors worldwide, and the teenager in Lagos does not. The knowledge is identical. The recognition is not.

This isn't a content problem. Khan Academy, Coursera, YouTube, and countless others have shown that high-quality learning materials can reach anyone. The unsolved problem is the layer beneath: how do you prove what you know in a way that's verifiable, portable, and not controlled by any single institution?

Most attempts to solve this still depend on servers. Someone has to run the infrastructure, someone has to pay for hosting, and someone has to be trusted not to shut it down. That dependency creates a single point of failure and an implicit trust assumption that contradicts the mission.

Alexandria eliminates servers entirely. Every user runs a full node — a native application that contains the entire platform: database, content store, P2P networking, wallet, and UI. There is no central API, no hosted database, and no cloud infrastructure. If Alexandria the organisation disappeared tomorrow, every learner's credentials would remain verifiable, every piece of content would remain accessible, and every reputation record would remain intact.

---

## What Alexandria Actually Is

At its core, Alexandria is a **Tauri v2 application** — a single binary that bundles a Rust backend with a Vue 3 frontend. It runs on macOS, Linux, Windows, iOS, and Android. It does four things:

**A learning platform** — rich courses with HTML, video, and interactive quizzes, stored in an iroh content-addressed blob store (BLAKE3 hashes). Published courses resolve from public URLs and propagate across the peer-to-peer network via GossipSub. Fresh installs bootstrap a bundled public catalog before network discovery catches up.

**A credential system** — when you demonstrate a skill (through assessments, projects, or peer-attested evidence), you earn a SkillProof: a cryptographic credential scoped to a specific skill at a specific Bloom's taxonomy level, backed by weighted evidence with confidence scores. Proofs can be minted as NFTs on Cardano (Conway era) with CIP-25 metadata — independently verifiable on-chain without the platform.

**A reputation system** — instructor impact derived from learner outcomes, scoped to `(subject, role, skill, proficiency_level)`. Exposed as a distribution with confidence bounds — no global scores, no star ratings, no follower counts. Reputation snapshots can be anchored on-chain as CIP-68 soulbound tokens.

**An assessment integrity system** — Sentinel, a client-side anti-cheat that monitors assessment integrity through multi-signal behavioral fingerprinting (keystroke autoencoder, mouse trajectory CNN, face embedber via LBP histograms). All processing happens on-device — raw behavioral data never leaves the client. Only derived scores cross the network.

These layers reinforce each other. Verifiable credentials make the reputation system trustworthy. Sentinel makes the evidence pipeline tamper-resistant. The reputation system makes governance meritocratic. And governance keeps the platform aligned with its users rather than its operators.

---

## What I'm Releasing Today

Everything is open-source under active development:

**Vision Paper** — A document explaining the motivation, the design, and why this matters for learners, educators, employers, and policymakers. Start here if you want to understand the *why*.

**Protocol Specification** — The normative technical spec: P2P wire formats, 6 gossip topics, validation pipeline, peer scoring, evidence model, governance rules, and threat mitigations. Start here if you want to understand the *how* or build a conforming implementation.

**Reference Implementation** — A working Tauri v2 application (Rust backend, Vue 3 frontend, SQLite, iroh, libp2p, Cardano via pallas) with native builds for desktop and mobile.

→ GitHub: github.com/ifftu-dev/alexandria

---

## Architecture at a Glance

```
alexandria/
├── src-tauri/        # Rust backend (Tauri v2)
│   └── src/
│       ├── cardano/  # Blockfrost client, Conway tx building, NFT policies
│       ├── commands/ # ~160 IPC command handlers (frontend ↔ backend)
│       ├── crypto/   # BIP-39 wallet, vault (Stronghold / portable), Ed25519
│       ├── db/       # SQLite (53 tables, 19 migrations, seed data)
│       ├── domain/   # Business logic (courses, evidence, governance, ...)
│       ├── evidence/ # Aggregation, attestation, challenges, reputation
│       ├── ipfs/     # iroh node, IPFS gateway fallback, CID resolution
│       └── p2p/      # libp2p swarm — DHT, relay, gossip, peer exchange
├── src/              # Vue 3 + TypeScript frontend
│   ├── pages/        # 25 pages
│   ├── components/   # UI components
│   └── composables/  # State management and platform APIs
├── cli/              # Developer CLI (alex) — Rust + clap
└── docs/             # Architecture, schema, protocol, structure docs
```

| Layer | Technology |
|-------|------------|
| Shell | Tauri 2.10, WebKit / WebView2 / Android WebView |
| Backend | Rust (2021 edition), tokio async runtime |
| Frontend | Vue 3, TypeScript, Vite, Tailwind CSS v4 |
| Database | SQLite (rusqlite, bundled) |
| Content storage | iroh 0.96 (BLAKE3 content-addressed blobs) |
| P2P networking | libp2p 0.56 (TCP, QUIC, GossipSub, Kademlia, Relay, DCUtR) |
| Wallet (desktop) | BIP-39 + CIP-1852, IOTA Stronghold vault |
| Wallet (mobile) | BIP-39 + CIP-1852, AES-256-GCM + Argon2id vault |
| Cardano | pallas 0.35 (Conway tx builder), Blockfrost preprod |

---

## What's Honest About the Current State

This is under active development. I want to be upfront about what's solid and what needs work.

**What I think is solid:**

The reputation model — scoping reputation to `(subject, role, skill, proficiency_level)` and exposing it as a distribution rather than a scalar. This is the core design insight and it holds up in the implementation.

The P2P protocol — a fully specified, implementation-complete protocol with 6 gossip topics, a 6-step validation pipeline (signature, identity, freshness, dedup, schema, authority), per-topic peer scoring, and Ed25519 message signing linked to Cardano stake addresses.

The credential ownership model — credentials live in the learner's local SQLite and iroh store. Proofs can be minted on Cardano as NFTs (Conway era, CIP-25 metadata). No server holds or controls credential data.

The offline-first architecture — every operation works without network access. Sync is opportunistic, not required.

The Sentinel anti-cheat — client-side behavioral fingerprinting with three ML models (keystroke autoencoder, mouse trajectory CNN, face embedder), all trained on-device with zero external dependencies. Raw data never leaves the client.

The test suite — 407 backend tests across crypto, database, P2P, evidence, cardano, and domain modules, plus ~1500 lines of stress tests covering high-volume gossip, concurrent validation, and adversarial inputs.

**What needs significant improvement:**

Smart contracts are not implemented. Governance and credential operations currently use transaction metadata only — no on-chain validators. The full trust model would require 7 Aiken/Plutus v3 validators. Application-level and P2P validation provide meaningful protection, but on-chain enforcement is the complete solution.

There are no frontend tests. The backend has 407 tests, but the Vue frontend has zero test coverage.

Content moderation doesn't exist. Any peer can publish any course to the catalog topic. The peer scoring system penalizes invalid messages, but there's no mechanism for reporting or removing objectionable content.

The sustainability model needs more depth. The non-profit structure and revenue sources (recruitment services, institutional LMS) are described but there's no financial modelling or competitive analysis.

I'm publishing it at this stage deliberately. I'd rather build in the open and get the right people contributing early than polish in private and ship something that reflects only one perspective.

---

## How to Contribute

Alexandria needs help across every discipline, not just engineering.

**If you're an educator:** The platform's pedagogical model needs depth. How should adaptive learning paths work? What makes a good assessment at each Bloom's taxonomy level? How do we handle subjects where proficiency isn't easily quantified (art, philosophy, ethics)?

**If you're a protocol/systems engineer:** The P2P protocol is implementation-complete but could benefit from formal verification. The peer scoring parameters need tuning with real network data. The cross-device sync protocol needs adversarial testing.

**If you're a cryptographer or security researcher:** The encrypted vault implementations (Stronghold on desktop, AES-256-GCM + Argon2id on mobile), the Ed25519 identity derivation from Cardano payment keys, and the Sentinel behavioral fingerprinting system all need adversarial review. A security audit has identified 32 findings — 21 have been fixed, 11 remain.

**If you know Cardano/Aiken:** The 7 missing smart contract validators are the biggest gap between the current implementation and the full trust model.

**If you work in policy or workforce development:** How would governments actually recognise blockchain-anchored skill credentials? What regulatory frameworks apply to decentralized education platforms?

**If you're a designer:** The UI has a refined editorial design system, but UX testing with non-crypto-native users would be valuable — particularly the onboarding flow, the skill graph visualization, and the Sentinel training wizard.

**If you're a learner:** Use it. Break it. Tell me what doesn't make sense.

---

## How to Get Started

Everything you need — prerequisites, build instructions, onboarding, and documentation — is in the repository.

→ [github.com/ifftu-dev/alexandria](https://github.com/ifftu-dev/alexandria)

---

## The Bet

Alexandria is a bet that the infrastructure for recognising human capability should be a public good — free, open, verifiable, and owned by no one. Not just the content layer (that's been solved), but the *recognition* layer: the part that determines how learning is verified, how teaching quality is measured, and how credentials flow between people and institutions.

By putting a full node on every device — desktop and mobile — and eliminating servers entirely, there is genuinely no single point of failure. No company to shut down, no database to seize, no API keys to revoke.

It might not work. The cold-start problem is real. Getting employers to trust a new credential system is hard. Building a peer-to-peer network that scales is hard. All of this is hard.

But the alternative — continuing to let access to opportunity depend on which institution stamps your paper — is worse. And I'd rather build this in the open, with people who care about it, than not try at all.

If any of this resonates, come build with me so I don't have to keep saying "I" all the time :)

Pratyush Pundir

→ [pratyush@ifftu.dev](mailto:pratyush@ifftu.dev)
