---
title: "INTRODUCING ALEXANDRIA"
date: "2026-04-08"
excerpt: "A desktop and mobile application that turns every device into a full node in a decentralized education network with verifiable, learner-owned credentials. Free and open source."
tags: ["ANNOUNCEMENT", "ALEXANDRIA", "DECENTRALIZED", "OPEN SOURCE"]
readTime: "10 MIN"
author: "Pratyush Pundir"
draft: false
---

An honest attempt to make knowledge — and its recognition — truly free. For everyone. Forever.

I'm publicly announcing and open-sourcing Alexandria: a desktop and mobile application that turns every device into a full node in a decentralized education network with verifiable, learner-owned credentials.

---

## Why Build This

The world is splitting apart. Not along the old lines — though those never really healed — but along new ones that are harder to see and harder to fight. Wealth concentrates. Power consolidates. The people responsible for stewardship — of institutions, of economies, of the systems that shape billions of lives — abuse that responsibility with a regularity that has stopped surprising anyone. There is a vulgarity to it. Not just the accumulation itself, but the scale, the shamelessness, the quiet agreement that this is simply how things are.

And the dominant mode of interaction between nations, between corporations, between people with power and people without it, has shifted from collaboration to domination. Extract more. Hoard more. Control more. The logic of scarcity applied to a world that has more than enough.

I keep coming back to one thought: education might be the only way out.

Not education as it exists — expensive, gatekept, designed to sort people into hierarchies. But education as it could be: free, universal, verifiable, and owned by the people who earn it. If you could learn anything, prove what you know, and have that proof recognised anywhere in the world — without needing permission from an institution, without paying someone for a stamp on a piece of paper — the walls start to come down. The walls of money, scarcity, status, geography. The walls that keep billions of people locked out of opportunity not because they lack ability, but because they lack access.

A teenager in a 3rd-world country can watch the same MIT lectures as a student in Cambridge. She can do the same problem sets, read the same papers, build the same understanding. But the MIT student walks away with a credential that opens doors worldwide, and she does not. The knowledge is identical (a bit of a reach, I know, but you get the point). The recognition is not. And it's the recognition — not the knowledge — that determines who gets the job, the visa, the life.

If we actually solve this — if we make human knowledge and its recognition truly portable, truly free — we might set ourselves on a more sustainable path. We might stop wasting the potential of most of our species. And maybe, if we're ambitious enough to think on longer timescales, we might need all of that knowledge to be portable for another reason: we won't be on this little rock forever.

That's where Alexandria comes from.

---

## The Problem, Specifically

The internet solved the distribution of knowledge. Khan Academy, Coursera, YouTube, and countless others have proven that high-quality learning materials can reach anyone. But the internet has not solved the *recognition* of knowledge — and that gap determines who gets opportunity and who doesn't.

How do you prove what you know in a way that's verifiable, portable, and not controlled by any single institution? How do you make recognition as free as knowledge already is?

Most attempts to solve this still depend on a company's servers. Someone has to run the infrastructure, pay for the hosting, and be trusted not to shut it down. That's exactly the wall I'm trying to remove — a gatekeeper with an off switch.

Alexandria runs on the devices of the people using it. No central servers hold the platform together; small relay servers help users find each other but have no authority over what passes through them. If Alexandria the organisation disappeared tomorrow, every learner's credentials would still verify, every course would still be reachable, and every reputation record would still stand.

---

## How This Compares to What Exists

Free online learning already exists. So why build something new? Because every existing approach leaves a different part of the problem unsolved.

| | What it gets right | What it leaves broken |
|---|---|---|
| **MOOCs** (Coursera, edX, Udemy) | Structured courses, reputable brands, credible instructors | Certificates cost real money, are issued *by the platform*, and carry limited weight with employers outside that platform's own ecosystem |
| **Free content** (Khan Academy, YouTube) | Truly free, globally reachable, no paywalls | No verifiable credential at all — the knowledge doesn't convert into recognition |
| **University credentials** | Widely recognised, taken seriously by employers and governments | Expensive, geographically gated, slow, and controlled by institutions that can deny, revoke, lose records, or disappear |
| **LinkedIn Learning, digital badges** | Convenient, employer-facing, easy to share | Centralised and proprietary — credentials live inside one company's walled garden and vanish if the account or the platform does |

Put together, the picture is clear. We have plenty of free *content*. We do not have free *recognition*. The credential — the thing that actually opens doors — still belongs to whoever charges for it, gatekeeps it, or hosts it.

Alexandria's bet is that in addition to hosting a vast public library, this last piece can be rebuilt as a public good too: credentials you earn, hold, and can prove to anyone, anywhere, without needing a platform's permission.

---

## What Alexandria Actually Is

Alexandria is like any other app that runs on your Mac, Windows PC, Linux machine, iPhone, or Android phone. The difference is that installing it turns your device into a full participant in the network — not a client connecting to a server, but the whole system, bundled and running locally. It does six things.

**A learning platform.** Courses, short-form video tutorials, and *Opinions* — credentialed takes from practitioners who already hold the skill they're commenting on. Lessons are stored and shared peer-to-peer between users' devices (think of it as BitTorrent for coursework). Every new install ships with a starter catalogue, so there's something to learn on day one.

**A living map of what there is to learn.** Every lesson, credential, and opinion is anchored to a public *skill graph* — a three-tier taxonomy (broad fields like *Computer Science* → subjects like *Distributed Systems* → individual skills) with explicit prerequisite edges (*calculus requires algebra*) and a mastery level attached to each skill, drawn from Bloom's taxonomy: can you *remember* it, *apply* it, *create* with it? This is what lets a credential earned in one part of the world mean something precise to someone on the other side of it. The graph isn't curated by a central team — proposed changes (adding a skill, reshaping prerequisites, deprecating something outdated) are ratified by a domain committee, versioned, signed, and gossiped to every node so every participant agrees on what a given skill *means*.

**Credentials you actually own.** When you demonstrate a skill — through an assessment, a project, or a peer's attestation — you earn a W3C Verifiable Credential that you sign yourself, under a `did:key` only you control. No platform holds it. Complete a course's assessments and the loop runs on its own: a Cardano validator witnesses the completion, and a local observer auto-issues the credential to you. There are six credential types — a formal credential, an assessment credential, a peer attestation, and so on — so a self-signed practice run reads differently from a proctored exam. Every credential's hash is anchored to a public ledger, so anyone in the world can check it hasn't been tampered with, and they can do that verification offline, with nothing but the file you hand them, even if Alexandria itself disappears.

**Reputation without the star rating.** Educators are scored per skill and per level of mastery, based on their *impact on learners* — did students actually progress, build evidence, and earn credentials after going through their material? That signal is expressed as a distribution with confidence bounds — not a single global number. No follower counts, no five-star averages, no popularity contests. An instructor who's excellent at teaching beginner calculus might be middling at advanced, and the system shows that instead of flattening it into one score.

**Honest assessments.** A local integrity layer called Sentinel watches for cheating during assessments, the way your browser watches for suspicious logins. All the analysis happens on your device; only a final integrity score ever leaves it. Your keystrokes, camera feed, and behaviour never touch a server.

**Governance that follows expertise, not money.** Every branch of the skill graph has a corresponding DAO, and voting power in that DAO comes from *demonstrated proficiency in the skills it governs* — not stake, not seniority, not how long you've been around. If you've proven you can analyse a topic, you're qualified to vote on decisions about how it's taught and assessed in that domain. Proposals move through draft, committee review, and public vote, with supermajority thresholds and minimum proficiency bars set per proposal. Elections run on fixed cadences — annual for sub-DAOs, every four years for the top-level ones. These decisions are made off-chain — proposals and votes propagate as signed messages between peers, and every node tallies them independently — and each finalized outcome is anchored to Cardano so it's tamper-evident and auditable by anyone. Moving the full rule-set on-chain, so no one — including me — can override it, is the direction of travel. The point is simple: the people who understand a subject are the people who decide how it's governed.

These six layers reinforce each other. The skill graph gives every credential a shared, precise vocabulary. Credentials you own make the reputation system trustworthy. On-device integrity makes the credential pipeline tamper-resistant. Trustworthy reputation makes governance meritocratic. And governance keeps the skill graph — and the platform — aligned with its users rather than its operators.

For the full technical picture — wire formats, cryptographic scheme, validation rules, governance contracts — see the [Protocol Specification](https://github.com/ifftu-dev/alexandria/blob/main/docs/protocol-specification.md).

---

## What I'm Releasing

**[The codebase](https://github.com/ifftu-dev/alexandria)** — Pretty self-explanatory. Everything, _except enterprise features_, is open-sourced under the expat MIT license.

**[Vision Paper](https://github.com/ifftu-dev/alexandria/blob/main/docs/vision.md)** — A document explaining the motivation, the design, and why this matters for learners, educators, employers, and policymakers. Start here if you want to understand the *why*.

**[Protocol Specification](https://github.com/ifftu-dev/alexandria/blob/main/docs/protocol-specification.md)** — The normative technical spec: wire formats, validation pipeline, peer scoring, credential model, governance rules, and threat mitigations. Start here if you want to understand the *how* or build a conforming implementation.

**[Project Website](https://alexandria.ifftu.dev/)** — The official website for Alexandria, where you can download the current alpha and follow releases.


---

## What's Honest About the Current State

Everything is under active development. I want to be upfront about where it stands.

The core design holds up in the implementation. The reputation model, the credential pipeline, the peer-to-peer protocol, the on-device integrity layer, and the offline-first architecture are all solid enough to build on, with a large automated test suite behind them. A recent security audit surfaced 32 findings — 21 are fixed, 11 remain.

What still needs work: UI/UX sucks; my thoughts on the instructor economy feel incomplete; there's no content moderation yet (any peer can publish anything, and while the network penalises bad behaviour, there's no mechanism for reporting objectionable content); frontend test coverage is thin; and the long-term sustainability model — how the non-profit funds itself without compromising the platform — needs more depth. _And a lot more I can't even think of yet probably..._

I'm publishing at this stage deliberately. I'd rather build in the open and get the right people contributing early than polish in private and ship something that reflects only one perspective.

---

## How to Contribute

Alexandria needs help across every discipline, not just engineering.

**If you're an educator:** The platform's pedagogical model needs depth. How should adaptive learning paths work? How do we handle subjects where proficiency isn't easily quantified — art, philosophy, ethics?

**If you're a systems engineer:** The peer-to-peer protocol is implementation-complete but could use adversarial testing at scale.

**If you're a cryptographer or security researcher:** The on-device credential vault, the identity system, and the Sentinel integrity layer all need independent review.

**If you work in policy or workforce development:** How would governments actually recognise credentials like these? What regulatory frameworks apply to a decentralised education platform?

**If you're a designer:** The UI has a refined editorial design system, but real UX testing with non-technical users would be valuable — particularly onboarding and the skill graph.

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

I keep reminding myself:
> The only thing necessary for the triumph of evil is for good men to do nothing.

I'm tired of doing nothing.

If any of this resonates, come build with me so I don't have to keep saying "I" all the time :)

Pratyush Pundir

→ [pratyush@ifftu.dev](mailto:pratyush@ifftu.dev)

---

_Updated 2026-04-23 — rewritten for general readers; technical detail moved to the linked vision paper and protocol specification._
