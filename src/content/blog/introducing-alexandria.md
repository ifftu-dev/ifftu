---
title: "INTRODUCING ALEXANDRIA"
date: "2026-04-08"
excerpt: "A desktop and mobile application that turns every device into a full node in a decentralized education network with verifiable, learner-owned credentials. Open-sourced today."
tags: ["ANNOUNCEMENT", "ALEXANDRIA", "DECENTRALIZED", "OPEN SOURCE"]
readTime: "18 MIN"
draft: false
---

An honest attempt to make knowledge — and its recognition — truly free. For everyone. Forever.

Today I'm open-sourcing Alexandria: a desktop and mobile application that turns every device into a full node in a decentralized education network with verifiable, learner-owned credentials.

---

## Why Build This

The world is splitting apart. Not along the old lines — though those never really healed — but along new ones that are harder to see and harder to fight. Wealth concentrates. Power consolidates. The people responsible for stewardship — of institutions, of economies, of the systems that shape billions of lives — abuse that responsibility with a regularity that has stopped surprising anyone. There is a vulgarity to it. Not just the accumulation itself, but the scale, the shamelessness, the quiet agreement that this is simply how things are.

And the dominant mode of interaction between nations, between corporations, between people with power and people without it, has shifted from collaboration to domination. Extract more. Hoard more. Control more. The logic of scarcity applied to a world that has more than enough.

I keep coming back to one thought: education might be the only way out.

Not education as it exists — expensive, gatekept, designed to sort people into hierarchies. But education as it could be: free, universal, verifiable, and owned by the people who earn it. If you could learn anything, prove what you know, and have that proof recognised anywhere in the world — without needing permission from an institution, without paying someone for a stamp on a piece of paper — the walls start to come down. The walls of money, scarcity, status, geography. The walls that keep billions of people locked out of opportunity not because they lack ability, but because they lack access.

A teenager in Lagos can watch the same MIT lectures as a student in Cambridge. She can do the same problem sets, read the same papers, build the same understanding. But the MIT student walks away with a credential that opens doors worldwide, and she does not. The knowledge is identical. The recognition is not. And it's the recognition — not the knowledge — that determines who gets the job, the visa, the life.

If we actually solve this — if we make human knowledge and its recognition truly portable, truly free — we might set ourselves on a more sustainable path. We might stop wasting the potential of most of our species. And maybe, if we're ambitious enough to think on longer timescales, we might need all of that knowledge to be portable for another reason: we won't be on this little rock forever.

That's where Alexandria comes from.

---

## The Problem, Specifically

The internet solved the distribution of knowledge. Khan Academy, Coursera, YouTube, and countless others have proven that high-quality learning materials can reach anyone. But the internet has not solved the *recognition* of knowledge — and that gap determines who gets opportunity and who doesn't.

How do you prove what you know in a way that's verifiable, portable, and not controlled by any single institution? How do you make recognition as free as knowledge already is?

Most attempts to solve this still depend on servers. Someone has to run the infrastructure, someone has to pay for hosting, and someone has to be trusted not to shut it down. That creates exactly the kind of wall I'm trying to remove — a gatekeeper with an off switch.

Alexandria minimises that dependency to the absolute floor. Every user runs a full node — a native application that contains the entire platform: database, content store, P2P networking, wallet, and UI. There is no central API and no hosted database. Lightweight relay servers help peers find each other and traverse NAT, but they have no authority — they can't read traffic, forge identities, or control access. They're dumb pipes. Anyone can run one, and if all of them disappeared, peers that already know each other continue to function. If Alexandria the organisation disappeared tomorrow, every learner's credentials would remain verifiable, every piece of content would remain accessible, and every reputation record would remain intact.

---

## What Alexandria Actually Is

At its core, Alexandria is a **Tauri v2 application** — a single binary that bundles a Rust backend with a Vue 3 frontend. It runs on macOS, Linux, Windows, iOS, and Android. It does four things:

**A learning platform** — rich courses with HTML, video, and interactive quizzes, plus standalone short-form video *tutorials* and *Field Commentary* (credentialed video takes from practitioners who hold the relevant skill at apply-or-above proficiency). Everything is stored in an iroh content-addressed blob store (BLAKE3 hashes), published under public URLs, and propagated across the peer-to-peer network via GossipSub. Fresh installs bootstrap a bundled public catalog before network discovery catches up. An opt-in *PinBoard* topic lets peers advertise what content they've committed to pin.

**A credential system** — when you demonstrate a skill (through assessments, projects, or peer-attested evidence), you earn a credential: a W3C-style Verifiable Credential signed under your own DID (`did:key` / Ed25519), scoped to a specific skill at a specific Bloom's taxonomy level, backed by weighted evidence with confidence scores. Six distinct credential types — Formal, Assessment, Attestation, Role, Derived, and Self-Asserted — carry different trust weights. JSON payloads are JCS-canonicalised, signed with JWS detached signatures, tracked via RevocationList2020, and hash-anchored to Cardano in metadata-only transactions (Conway era, preprod testnet). Selective-disclosure presentations let learners share only the level (not the full evidence chain), and self-contained offline bundles let employers verify a credential with no network access at all. The legacy CIP-25/CIP-68 NFT mint path is still supported as an optional rail but is no longer the primary anchor.

**A reputation system** — instructor impact derived from learner outcomes, scoped to `(subject, role, skill, proficiency_level)`. Exposed as a distribution with confidence bounds — no global scores, no star ratings, no follower counts. Reputation snapshots can be anchored on-chain as CIP-68 soulbound tokens.

**An assessment integrity system** — Sentinel, a client-side anti-cheat that monitors assessment integrity through multi-signal behavioral fingerprinting (keystroke dynamics, mouse movement patterns, camera presence, tab focus, paste detection, devtools detection). All processing happens on-device — raw behavioral data never leaves the client. Only derived scores cross the network.

These layers reinforce each other. Verifiable credentials make the reputation system trustworthy. Sentinel makes the evidence pipeline tamper-resistant. The reputation system makes governance meritocratic. And governance keeps the platform aligned with its users rather than its operators.

---

## What I'm Releasing Today

Everything is open-source under active development:

**[Vision Paper](https://github.com/ifftu-dev/alexandria/blob/main/docs/vision.md)** — A document explaining the motivation, the design, and why this matters for learners, educators, employers, and policymakers. Start here if you want to understand the *why*.

**[Protocol Specification](https://github.com/ifftu-dev/alexandria/blob/main/docs/protocol-specification.md)** — The normative technical spec: P2P wire formats, 11 gossip topics (including `vc-did/1.0`, `vc-status/1.0`, `vc-presentation/1.0`, `pinboard/1.0`, `opinions/1.0` and the `vc-fetch/1.0` request-response protocol), validation pipeline, peer scoring, evidence model, governance rules, and threat mitigations. Start here if you want to understand the *how* or build a conforming implementation.

→ [github.com/ifftu-dev/alexandria](https://github.com/ifftu-dev/alexandria)
→ [alexandria.ifftu.dev](https://alexandria.ifftu.dev/)

---

## Architecture at a Glance

```
alexandria/
├── src-tauri/        # Rust backend (Tauri v2)
│   └── src/
│       ├── cardano/  # Blockfrost client, Conway tx building, metadata anchors
│       ├── commands/ # 227 IPC command handlers across 31 modules (frontend ↔ backend)
│       ├── credentials/ # W3C Verifiable Credentials — issue, sign (JCS+JWS), revoke, present
│       ├── crypto/   # BIP-39 wallet, vault (Stronghold / portable), Ed25519, did:key
│       ├── db/       # SQLite (66 tables, 30 migrations, seed data)
│       ├── domain/   # Business logic (courses, tutorials, opinions, evidence, governance)
│       ├── evidence/ # Aggregation engine with anti-gaming penalties, attestation, challenges
│       ├── iroh/     # iroh content-addressed blob store, BLAKE3 hashes
│       ├── p2p/      # libp2p swarm — DHT, relay, gossip, peer exchange, vc-fetch
│       ├── classroom/ # Encrypted group messaging, member management
│       └── tutoring/  # Live tutoring sessions over QUIC (iroh-live)
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

The reputation model — scoping reputation to `(subject, role, skill, proficiency_level)` and exposing it as a distribution rather than a scalar. Aggregation runs through a deterministic engine with anti-gaming penalties for collusion patterns. This is the core design insight and it holds up in the implementation.

The P2P protocol — a fully specified, implementation-complete protocol with 11 gossip topics plus the `vc-fetch/1.0` request-response, a 5-step validation pipeline (signature + identity binding, freshness, dedup, schema, authority), per-topic peer scoring, and Ed25519 message signing linked to Cardano stake addresses.

The Verifiable Credentials pipeline — W3C VCs signed under `did:key` / Ed25519, JCS-canonicalised and JWS-detached, tracked via RevocationList2020, hash-anchored through a durable anchor queue to Cardano (metadata-only, not an NFT mint). Six credential types carry distinct trust weights. Selective-disclosure presentations and offline-survivable bundles (`verify_bundle_offline`) let learners share and employers verify without any platform involvement. No server holds or controls credential data.

The offline-first architecture — every operation works without network access. Sync is opportunistic, not required.

The Sentinel anti-cheat — client-side behavioral fingerprinting across six signals (keystroke dynamics, mouse movement, camera presence, tab focus, paste detection, devtools detection). All processing on-device. Raw data never leaves the client.

The test suite — 440+ Rust tests across crypto, database, P2P, evidence, cardano, credentials, and domain modules, plus stress tests covering high-volume gossip, concurrent validation, and adversarial inputs. A first wave of frontend tests (Vitest) has also landed.

The governance smart contracts — all 7 Aiken validators (election, proposal, DAO minting/registry, vote minting, reputation minting, soulbound) are implemented and ready for preprod deployment.

**What needs significant improvement:**

Frontend test coverage is still thin. The first Vitest suite landed recently, but most Vue components and composables don't have tests yet.

Content moderation doesn't exist. Any peer can publish any course, tutorial, or opinion to the relevant topic. The peer scoring system penalizes invalid messages, but there's no mechanism for reporting or removing objectionable content.

The sustainability model needs more depth. The non-profit structure and revenue sources (recruitment services, institutional LMS) are described but there's no financial modelling or competitive analysis.

I'm publishing it at this stage deliberately. I'd rather build in the open and get the right people contributing early than polish in private and ship something that reflects only one perspective.

---

## How to Contribute

Alexandria needs help across every discipline, not just engineering.

**If you're an educator:** The platform's pedagogical model needs depth. How should adaptive learning paths work? What makes a good assessment at each Bloom's taxonomy level? How do we handle subjects where proficiency isn't easily quantified (art, philosophy, ethics)?

**If you're a protocol/systems engineer:** The P2P protocol is implementation-complete but could benefit from formal verification. The peer scoring parameters need tuning with real network data. The cross-device sync protocol needs adversarial testing.

**If you're a cryptographer or security researcher:** The encrypted vault implementations (Stronghold on desktop, AES-256-GCM + Argon2id on mobile), the Ed25519 identity derivation from Cardano payment keys, and the Sentinel behavioral fingerprinting system all need adversarial review. A security audit has identified 32 findings — 21 have been fixed, 11 remain.

**If you know Cardano/Aiken:** The 7 governance validators are implemented but need adversarial testing, formal verification, and mainnet deployment planning.

**If you work in policy or workforce development:** How would governments actually recognise blockchain-anchored skill credentials? What regulatory frameworks apply to decentralized education platforms?

**If you're a designer:** The UI has a refined editorial design system, but UX testing with non-crypto-native users would be valuable — particularly the onboarding flow, the skill graph visualization, and the Sentinel training wizard.

**If you're a learner:** Use it. Break it. Tell me what doesn't make sense.

---

## How to Get Started

Everything you need — prerequisites, build instructions, onboarding, and documentation — is in the repository.

→ [github.com/ifftu-dev/alexandria](https://github.com/ifftu-dev/alexandria)

---

## The Bet

The world doesn't have to work this way. The concentration of power, the hoarding of opportunity, the quiet acceptance that most people will never get a fair shot — none of that is inevitable. It's a choice, maintained by systems that benefit from keeping things the way they are.

Alexandria is a bet that one of those systems — the recognition of human capability — can be rebuilt as a public good. Free, open, verifiable, owned by no one. Not just the content (that's been solved), but the credential: the thing that determines who is seen as capable and who remains invisible.

By putting a full node on every device — with relay servers that have no authority and that anyone can run — there is no meaningful single point of failure. No company to shut down, no database to seize, no API keys to revoke.

It might not work. The cold-start problem is real. Getting employers to trust a new credential system is hard. Building a peer-to-peer network that scales is hard. All of this is hard.

But I keep thinking about that teenager in Lagos. And the millions like her. And the world we're building by wasting that much human potential. The alternative — accepting it, doing nothing, letting access to opportunity depend on accidents of birth — is not something I can live with.

If any of this resonates, come build with me so I don't have to keep saying "I" all the time :)

Pratyush Pundir

→ [pratyush@ifftu.dev](mailto:pratyush@ifftu.dev)

---

_Updated 2026-04-12 — updated to reflect the W3C Verifiable Credentials layer (replacing the NFT-first model described in the April 8 post), the Field Commentary / tutorials content shapes, the PinBoard topic, and the expanded gossip topic set._
