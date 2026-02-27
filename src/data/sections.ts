import { SectionData, Role } from '../types'

const R_ALL: Role[] = ['operator', 'founder', 'ceo']
const R_OP: Role[] = ['operator']
const R_FO: Role[] = ['founder']
const R_CEO: Role[] = ['ceo']
const R_OP_CEO: Role[] = ['operator', 'ceo']
const R_OP_FO: Role[] = ['operator', 'founder']

export const sections: SectionData[] = [
  // ─── STEP 0 ────────────────────────────────────────────
  {
    id: 'overview',
    step: 0,
    title: 'Overview: What Success Looks Like',
    subtitle: 'Understand the system before you touch anything',
    timeEstimate: '2 minutes',
    roles: R_ALL,
    objective: 'Understand the full WonderCow TikTok Shop scaling system and what $200K–$500K/month looks like operationally.',
    whyItMatters: 'Without a clear picture of the destination, every daily task feels random. This overview connects every lever to the revenue target.',
    checklist: [
      { id: 'o-1', text: 'Read the objective and north star metrics' },
      { id: 'o-2', text: 'Review the success targets table' },
      { id: 'o-3', text: 'Understand the weekly cadence summary' },
      { id: 'o-4', text: 'Note the CEO early warning and acceleration signals' },
    ],
    content: `## Objective
Scale WonderCow TikTok Shop gummies to **$200K–$500K/month** using TikTok-native creator commerce plus Shopify/FBA sample fulfillment. Every system, metric, and lever in this document produces one outcome: **consistent, compounding video volume from a diversified creator portfolio**.

## North Star Metrics
- **Videos/week** (primary growth driver)
- **Post rate** (sampling efficiency)
- **Active performers** (revenue concentration)
- **Winners developed** (scaling backbone)
- **LIVE cadence** (founder-driven conversion)

## Success Targets

| Metric | $200K/mo | $500K/mo |
|---|---|---|
| Videos/week | 80–120 | 120–200 |
| Samples/month | 600–900 | 900–1,500 |
| Post rate | 30–35% | 30–35% |
| Contributors ($200+) | 20–40 | 40–80 |
| Performers ($1K+) | 5–10 | 10–20 |
| Winners ($5K+) | 2–4 | 4–8 |

## Weekly Cadence Summary
- **Daily**: 30-minute operator routine (approve, ship, follow up, scan, log)
- **Weekly**: 60–90 minute operator routine (update Command Center, review portfolio, plan LIVEs)
- **Founder**: ~2 hours/week (3–5 posts + 2–3 LIVEs once ramped)

## CEO Early Warning Signals
Investigate immediately if any are true:
- Videos/week drops below 80 for two consecutive weeks
- Samples/month drops below 600
- $200+ creator tier is not increasing month-over-month

## CEO Acceleration Signals
Double down on what's working:
- Videos/week exceeds 120 consistently
- 5+ performers ($1K+) active simultaneously
- Week-over-week GMV growth exceeds 15% for 3+ weeks`,
  },

  // ─── STEP 1 ────────────────────────────────────────────
  {
    id: 'tools-access',
    step: 1,
    title: 'Confirm Tools & Access',
    subtitle: 'Verify every platform and tool is ready',
    timeEstimate: '15 minutes',
    roles: R_OP,
    objective: 'Ensure all required platforms are set up and accessible before launching.',
    whyItMatters: 'Missing access to a single tool can block the entire launch. Get this done once so you never hit a wall mid-operation.',
    checklist: [
      { id: 't-1', text: 'TikTok Shop Seller Center access confirmed' },
      { id: 't-2', text: 'TikTok Creator Marketplace access confirmed' },
      { id: 't-3', text: 'Shopify admin access (for draft orders / sample shipping)' },
      { id: 't-4', text: 'Amazon FBA connection verified (fulfills TTS-SAMPLE orders)' },
      { id: 't-5', text: 'Google Drive: WonderCow TikTok OS folder accessible (Doc + Sheet)' },
      { id: 't-6', text: 'Airtable workspace set up (optional but recommended CRM)' },
      { id: 't-7', text: 'Euka account access (intelligence/sourcing only)' },
    ],
    content: `## Required Platforms

### Must-Have
- **TikTok Shop Seller Center** — product listings, order management, affiliate program
- **TikTok Creator Marketplace** — primary creator discovery and invite tool
- **Shopify** — create $0 draft orders tagged \`TTS-SAMPLE\` for sample fulfillment
- **Amazon FBA** — connected to Shopify; handles physical sample shipping

### Core Operations Tools
- **Google Doc** — "WonderCow TikTok OS — Operating System" (full SOP reference, already created)
- **Google Sheet** — "WonderCow TikTok Command Center" (7-tab dashboard, already created)

### Optional but Recommended
- **Airtable** — lightweight CRM for tracking creator pipeline, status, and notes. Recommended for one-operator setups because it's simpler than a full CRM. Use it to track: creator name, status (Pipeline/Activated/Contributor/Performer/Winner), sample date, post date, notes.

### Intelligence Only
- **Euka** — use for creator intelligence and lead lists ONLY. All outreach happens through TikTok's native tools. Do NOT use Euka for direct messaging.

### Software Philosophy
Keep the stack minimal. Avoid Typeform, Zapier, or complex automation unless absolutely required. One operator + Google Sheets + TikTok native tools + optional Airtable is sufficient to reach $200K/month.`,
  },

  // ─── STEP 2 ────────────────────────────────────────────
  {
    id: 'monetization-config',
    step: 2,
    title: 'Configure TikTok Monetization Levers',
    subtitle: 'Set up affiliate commissions, tiering, and GMV Max',
    timeEstimate: '20 minutes',
    roles: R_OP,
    objective: 'Configure TikTok Shop affiliate commissions with automated tiering and initialize GMV Max.',
    whyItMatters: 'Commission structure directly impacts creator motivation and your margins. Getting tiering right from day one means creators self-select into higher performance.',
    checklist: [
      { id: 'm-1', text: 'Set base affiliate commission rate (20–25%)' },
      { id: 'm-2', text: 'Configure performance-based commission tiers in TikTok Shop' },
      { id: 'm-3', text: 'Enable automated tiering (auto-upgrade based on GMV thresholds)' },
      { id: 'm-4', text: 'Set up GMV Max campaign with starter budget' },
      { id: 'm-5', text: 'Review product listings for optimization (images, title, reviews)' },
    ],
    content: `## Affiliate Commission Tiers

### Automated Tiering Structure
| Tier | Commission | Trigger |
|---|---|---|
| Base | 20–25% | Default for all new creators |
| Silver | 30% | $500+ GMV in rolling 30 days |
| Gold | 40% | $2,000+ GMV in rolling 30 days |
| Platinum | 50% | $5,000+ GMV in rolling 30 days |

TikTok Shop supports automated tiering — set the thresholds so creators auto-upgrade as they sell more. This removes manual commission negotiation.

### First Purchase vs Repeat Economics
- First purchase commission: ~50% (includes platform fees + creator commission)
- Repeat purchase commission: ~25% (lower creator share on returning customers)
- This is why LTV matters more than first-sale margin

## GMV Max Configuration

GMV Max is TikTok's default scaling tool for Shop sellers. It automatically distributes budget across the best-performing content.

### When to Activate
- Minimum 60 videos/week from 15+ active creators
- At least 2–3 videos with organic traction (5K+ views)
- Product listing fully optimized
- Sufficient inventory

### Starter Budget
- Month 1: $0 (organic only) → $500–$1K GMV Max test in weeks 3–4
- Month 2: $1K–$5K total
- Month 3: $5K–$15K total

### Why GMV Max Before Spark Ads
GMV Max uses TikTok's algorithm to find buyers across ALL creator content. Spark Ads amplify individual videos. Start with GMV Max because it requires less creative selection skill and works with volume.`,
  },

  // ─── STEP 3 ────────────────────────────────────────────
  {
    id: 'acquisition-engine',
    step: 3,
    title: 'Launch the Acquisition Engine',
    subtitle: 'Sourcing, invites, approvals, and sample shipping',
    timeEstimate: '30 minutes to set up, then 15 min/day',
    roles: R_OP,
    objective: 'Build a repeatable daily process for finding, inviting, approving, and sampling creators.',
    whyItMatters: 'The entire system runs on creator volume. If the acquisition engine stalls, everything downstream dies. This is the most important daily habit.',
    checklist: [
      { id: 'a-1', text: 'Set up Creator Marketplace search filters' },
      { id: 'a-2', text: 'Prepare invite message (see Template Library)' },
      { id: 'a-3', text: 'Define approval criteria and disqualifiers' },
      { id: 'a-4', text: 'Set up Shopify draft order workflow for TTS-SAMPLE' },
      { id: 'a-5', text: 'Confirm Amazon FBA inventory for sample SKUs' },
      { id: 'a-6', text: 'Send first batch of 20–30 invites' },
    ],
    content: `## Sourcing Channels

### Primary: TikTok Creator Marketplace
Daily filters:
- Category: Health & Wellness, Beauty, Lifestyle
- Followers: 5K–500K (sweet spot for engagement and cost)
- Location: United States
- Engagement rate: >3%
- Content style: face-forward, product-review oriented

### Secondary: Euka Exports
Use for intelligence and lead identification only. Export creator lists, then invite through TikTok Marketplace. Never use Euka for direct outreach.

### Tertiary: Hashtag Research
Search #colostrum #gummies #wellness #immunesupport on TikTok. Find creators already talking about the category. These have highest conversion potential.

## Daily Invite Cadence
| Phase | Invites/Day |
|---|---|
| Month 1 (ramp) | 20–40 |
| Month 2 (acceleration) | 15–25 |
| Month 3+ (steady state) | 10–20 |

## Approval Filters (Must Meet ALL)
- US-based creator
- Active on TikTok within last 7 days
- Face-forward content style (shows face, talks to camera)
- TikTok Shop active proof: product showcase, product tags, affiliate badge, or bio links

## Disqualifiers (Reject if ANY)
- Meme/trend repost page with no original content
- Dropship-heavy catalog page
- No linking behavior (never links products)
- Engagement rate below 3%

## Sample Shipping via Shopify + FBA
1. Approve creator in TikTok Shop Seller Center
2. Create Shopify draft order ($0) for the sample SKU
3. Tag the order \`TTS-SAMPLE\`
4. Amazon FBA fulfills and ships (3–5 day delivery)

## Sample Policy

| Product | When to Send | Notes |
|---|---|---|
| 15-serving gummies | Default for all new creators | Standard first sample |
| Dual-flavor gummy bundle | After first post OR >25K followers OR demonstrated sales | Upgrade only — earned |
| Stick packs | Retention/upsell/LIVE add-on | Never send as default sample |

## Approval Modes

| Mode | When | Effect |
|---|---|---|
| Aggressive | Post rate >35% AND videos/week on target | Approve more liberally, higher sample volume |
| Normal | Post rate 30–35%, metrics on track | Standard filters, steady pace |
| Tight | Post rate <25% OR sample spend too high | Stricter filters, reduce daily approvals 30–50% |`,
  },

  // ─── STEP 4 ────────────────────────────────────────────
  {
    id: 'activation-engine',
    step: 4,
    title: 'Activate + Production Engine',
    subtitle: 'Turn sampled creators into active video producers',
    timeEstimate: '15 min/day ongoing',
    roles: R_OP,
    objective: 'Maximize the percentage of sampled creators who actually post content, and drive multi-video behavior.',
    whyItMatters: 'Sampling without activation is pure cost. The follow-up system is what converts a $13 sample into thousands in GMV.',
    checklist: [
      { id: 'act-1', text: 'Set "2–3 videos in 14 days" expectation in approval message' },
      { id: 'act-2', text: 'Prepare Day 3 and Day 7 follow-up messages' },
      { id: 'act-3', text: 'Set up daily breakout scan (last 48 hours)' },
      { id: 'act-4', text: 'Track post rate weekly in Command Center' },
      { id: 'act-5', text: 'Plan first Sprint Week (if needed)' },
    ],
    content: `## The "2–3 Videos in 14 Days" Expectation
Set this expectation in the approval message. Creators who know there's a posting expectation are 2–3x more likely to follow through. This isn't a hard rule — it's a nudge that frames the relationship as a partnership, not a free product grab.

## Follow-Up Cadence

### Day 3 Nudge
Send to creators who received samples 3 days ago but haven't posted. Light touch — check if they got the product, offer tips.

### Day 7 Nudge
Send to creators who still haven't posted after 7 days. More direct — reference what top creators are earning, ask if they need help getting started.

### Day 14+ Decision
If no post after 14 days, move on. Don't send more product. Some creators will never post — that's normal. A 30% post rate is healthy.

## Breakout Scan (Daily, 5 minutes)
Review the last 48 hours of creator content for breakout signals:
- Video with 5K+ views in first 24 hours
- Above-average engagement (comments, shares)
- Creator generated $200+ in a single day
- Creator posted multiple videos in a short window

### Actions for Breakout Creators
- Send congratulatory message
- Request 2–3 content variants of the winning video
- Send additional product (upgrade tier if applicable)
- Flag for potential Spark Ads testing

## Sprint Weeks
Run a Sprint Week every 2 weeks (or when growth stalls):
- Increase daily invites by 1.5–2x
- Activate bonus leaderboard for the week
- Coordinate 5–10 creators to post within the same 24-hour window
- Founder does an extra LIVE session
- Send Sprint Week announcement to all active creators

## Post Rate Monitoring
Track weekly. This is your efficiency metric:
- **35–45%**: Excellent — go Aggressive on approvals
- **30–35%**: Healthy — Normal mode
- **25–29%**: Watch — review targeting and follow-up quality
- **<25%**: Critical — switch to Tight mode immediately`,
  },

  // ─── STEP 5 ────────────────────────────────────────────
  {
    id: 'founder-engine',
    step: 5,
    title: 'Founder Engine',
    subtitle: 'Content plan, LIVE SOP, and clipping workflow',
    timeEstimate: '~2 hours/week ongoing',
    roles: R_FO,
    objective: 'Establish the founder as a consistent content creator and LIVE host, generating 3–5 posts/week and 2–3 LIVEs/week at scale.',
    whyItMatters: 'Founder content converts at 2–5x the rate of creator content because it carries authenticity and brand story. LIVE sessions drive the highest per-session GMV on TikTok Shop.',
    checklist: [
      { id: 'f-1', text: 'Block 60–90 min/week for batch filming' },
      { id: 'f-2', text: 'Film first batch: 2 education + 1 founder story + 1–2 routine videos' },
      { id: 'f-3', text: 'Schedule first LIVE session (Month 1: 1/week)' },
      { id: 'f-4', text: 'Set up LIVE product pin and offer' },
      { id: 'f-5', text: 'Set up clipping workflow (Opus Clip / CapCut / Descript)' },
      { id: 'f-6', text: 'Identify first creator for co-hosting' },
    ],
    content: `## Founder Weekly Outputs

| Output | Target | Notes |
|---|---|---|
| TikTok posts | 3–5/week | Batch-filmed during dedicated sessions |
| LIVE sessions (Month 1) | 1/week | Learning phase, shorter sessions OK |
| LIVE sessions (Month 2+) | 2/week | Standard cadence |
| LIVE sessions (Scale) | 2–3/week | Add co-hosted sessions with creators |

## Batch Filming Workflow
Dedicate one 60–90 minute session per week. Shoot in this order:
1. **2 education videos** — health benefits of colostrum, immune support, gut health
2. **1 founder story** — why you started WonderCow, farm visit, mission
3. **1–2 routine videos** — morning routine with gummies, taste test, gym bag essentials

Edit and schedule over the week. No need to film daily.

## LIVE Run of Show (0–45 Minutes)

| Time | Segment | What to Do |
|---|---|---|
| 0–3 min | Intro + Pin Product | Welcome viewers, introduce yourself, pin the gummy product link |
| 3–10 min | Story + Why Gummies | WonderCow origin story, why colostrum gummies matter |
| 10–20 min | Education + Q&A | Colostrum benefits, answer viewer questions in real time |
| 20–30 min | Routine Demo / Taste Test | Show daily use, live taste test, show packaging |
| 30–45 min | Offer Reminders + FAQ | Remind of bundle deal, answer remaining questions |

## LIVE Product Offer
- **Primary**: Gummies bundle (pin immediately, reference throughout)
- **Upsell mention**: Stick packs as an on-the-go add-on
- Do NOT lead with stick packs — gummies are the hero product in LIVE

## Post-LIVE Clipping Workflow
Every LIVE generates 10–20 short clips:
1. Export the full LIVE recording immediately after
2. Use Opus Clip, CapCut, or Descript to auto-generate clips
3. Select the 10–20 best moments (education, reactions, Q&A highlights)
4. Schedule clips across the week (2–3 per day)
5. Tag clips with product links

## LIVE Cadence Ramp
- Month 1: 1 LIVE/week (learn the format)
- Month 2: 2 LIVEs/week (establish audience expectation)
- Month 3+: 2–3 LIVEs/week (include co-hosted sessions)
- $500K scale: 7–10 sessions/week across founders + creators

## Creator Co-Hosting
Invite one creator per week to co-host. This serves as:
- A retention lever (creators feel valued)
- Social proof (their audience sees a real brand partnership)
- Content generation (co-hosted LIVEs produce unique clips)
- Relationship building for long-term winner development

## Founder Time Budget
Total: approximately 2 hours/week
- 60–90 min batch filming
- 30–45 min per LIVE (2–3 sessions, but net time with prep)
- Clips are edited by operator or automated tools`,
  },

  // ─── STEP 6 ────────────────────────────────────────────
  {
    id: 'breakouts-paid',
    step: 6,
    title: 'Breakouts + Paid Scale',
    subtitle: 'Detect winners, test Spark Ads, scale GMV Max',
    timeEstimate: '15 min/day + weekly review',
    roles: R_OP_CEO,
    objective: 'Identify breakout content, amplify it with paid tools, and maintain CPA discipline.',
    whyItMatters: 'Organic content is the foundation, but paid amplification of proven winners is what separates $50K/month from $200K+. The key is only paying for what already works.',
    checklist: [
      { id: 'b-1', text: 'Establish breakout detection criteria (5K+ views in 24h)' },
      { id: 'b-2', text: 'Set up Spark Ads account and creative selection process' },
      { id: 'b-3', text: 'Configure CPA guardrails' },
      { id: 'b-4', text: 'Define GMV Max scaling rules' },
    ],
    content: `## Breakout Detection Signals
- Video reached 5K+ organic views in 24 hours
- Above-average engagement rate for that creator
- Creator generated $200+ in a single day
- Content format matches proven winner patterns

## Spark Ads Framework
Spark Ads amplify existing organic creator content. Use selectively:
1. Only on content with proven organic traction
2. Start with $20–$50/day per creative
3. Monitor CPA daily
4. Kill underperformers within 48 hours

## CPA Guardrails

| CPA Range | Action |
|---|---|
| < $20 | Scale aggressively — increase daily budget 20–50% |
| $20–$35 | Increase gradually — raise budget 10–20% |
| $35–$59 | Maintain — do not increase budget, monitor closely |
| > $59 | Kill or reduce — pause ad or cut budget by 50%+ |

The max acceptable CPA equals your LTV profit (~$59). Anything above that means you're losing money per customer.

## GMV Max Scaling Rules
- GMV Max works best with high video volume and diverse content
- Minimum requirements: 60 videos/week from 15+ active creators
- Budget ramp: start $500–$1K, increase 20–30% weekly if ROAS is positive
- At $200K/mo: $300–$500/day GMV Max budget
- At $500K/mo: $1K–$3K/day GMV Max budget

## Paid Budget Ramp by Month
| Month | GMV Max | Spark Ads | Total |
|---|---|---|---|
| 1 | $0–$1K | $0 | $0–$1K |
| 2 | $1K–$3K | $0–$2K | $1K–$5K |
| 3 | $3K–$8K | $2K–$7K | $5K–$15K |`,
  },

  // ─── STEP 7 ────────────────────────────────────────────
  {
    id: 'command-center-ops',
    step: 7,
    title: 'Command Center Operations',
    subtitle: 'Daily 30-min routine, weekly 60–90 min routine, decision tree',
    timeEstimate: '30 min/day + 60–90 min/week',
    roles: R_OP,
    objective: 'Run the operating rhythm that keeps the entire system on track.',
    whyItMatters: 'Without a consistent operating rhythm, small problems compound into crises. The daily and weekly routines catch issues before they become failures.',
    checklist: [
      { id: 'cc-1', text: 'Complete first full daily operator routine' },
      { id: 'cc-2', text: 'Complete first full weekly operator routine' },
      { id: 'cc-3', text: 'Review decision tree and understand all thresholds' },
      { id: 'cc-4', text: 'Set up Command Center sheet with initial data' },
    ],
    content: `## Daily Operator Routine (30 minutes)

### Step 1: Approve Creators (5 min)
Review queue → apply approval filters → approve or reject

### Step 2: Ship Samples (5 min)
Create Shopify draft orders → tag TTS-SAMPLE → FBA fulfills

### Step 3: Follow-Ups (10 min)
Send Day 3 nudges → send Day 7 nudges → log responses

### Step 4: Breakout Scan (5 min)
Review last 48h → identify 5K+ view videos → message breakout creators → request variants

### Step 5: Log Numbers (5 min)
Enter into Command Center: samples shipped, invites, approvals, videos posted, active creators, new contributors, new performers, GMV

## Weekly Operator Routine (60–90 minutes)

1. **Update Command Center** — roll up daily inputs into Dashboard tab
2. **Set Approval Mode** — Aggressive/Normal/Tight based on post rate
3. **Production Check** — compare videos/week to target; identify bottlenecks
4. **Winner Development** — review $500+ creators; send product, request variants
5. **LIVE Schedule** — coordinate with founder for coming week
6. **Sprint Week Decision** — trigger if videos/week <80 for 2+ weeks
7. **Bonus Leaderboard** — update standings if program is active

## Decision Tree (see dedicated section for full interactive version)
The weekly decision tree answers: What should I do differently this week?
- Videos/week thresholds → adjust approvals
- Post rate thresholds → adjust approval mode
- Winner check → adjust paid strategy
- Sample spend → adjust volume
- CPA check → adjust/kill paid campaigns
- LIVE readiness → start/increase LIVE cadence`,
  },

  // ─── STEP 8 ────────────────────────────────────────────
  {
    id: 'portfolio-growth',
    step: 8,
    title: 'Portfolio Growth System',
    subtitle: 'Tier targets, movement rules, and concentration risk',
    timeEstimate: '15 min/week review',
    roles: R_OP_CEO,
    objective: 'Build and manage a diversified creator portfolio that reduces risk and maximizes revenue.',
    whyItMatters: 'Relying on a few creators is fragile. A structured portfolio with clear tier targets ensures sustainable growth and resilience.',
    checklist: [
      { id: 'p-1', text: 'Set up Portfolio Tracker tab in Command Center' },
      { id: 'p-2', text: 'Define tier thresholds and targets' },
      { id: 'p-3', text: 'Establish movement rules for tier upgrades' },
      { id: 'p-4', text: 'Monitor concentration risk weekly' },
    ],
    content: `## Creator Portfolio Tiers

| Tier | Definition | Target Count | GMV Contribution |
|---|---|---|---|
| Pipeline | Sampled, no post yet | 150–250 | $0 |
| Activated | Posted at least once | 80–150 | Minimal |
| Contributors | $200+/month GMV | 20–40 | 20–30% |
| Performers | $1K+/month GMV | 5–10 | 30–40% |
| Winners | $5K+/month GMV | 2–4 | 30–50% |

## Movement Rules
When a creator generates **$500+ in a 7-day window**:
- Send more product immediately (upgrade to dual-flavor bundle)
- Request 2–3 content variants of best-performing video
- Prioritize for Spark Ads testing
- Add to winner development watch list
- Consider for LIVE co-hosting

## Concentration Risk
Monitor GMV distribution across creators every week.

| Top 3 GMV Share | Status | Action |
|---|---|---|
| <30% | Well diversified | Maintain |
| 30–50% | Moderate | Monitor |
| 50–70% | Concentrated | Invest in mid-tier |
| >70% | Fragile | Urgent mid-tier development |

If top 3 creators >70% of GMV:
- Do NOT reduce support for top creators
- Increase investment in 10–15 Activated creators with potential
- Send upgraded product, request content variants
- Run Sprint Week focused on diversifying content sources

## Portfolio Targets by Month

| Month | Pipeline | Activated | Contributors | Performers | Winners |
|---|---|---|---|---|---|
| Month 1 | 100–150 | 30–50 | 5–10 | 0–2 | 0 |
| Month 2 | 150–250 | 60–100 | 15–25 | 3–5 | 0–1 |
| Month 3 | 200–300 | 80–150 | 20–40 | 5–10 | 2–4 |`,
  },

  // ─── STEP 9 ────────────────────────────────────────────
  {
    id: 'execution-plan',
    step: 9,
    title: '0–90 Day Execution Calendar',
    subtitle: 'Week-by-week targets and realistic ramp',
    timeEstimate: 'Reference document',
    roles: R_ALL,
    objective: 'Follow a concrete week-by-week plan with daily targets, expected outputs, and budget guidance.',
    whyItMatters: 'Ambiguity kills execution. This calendar removes guesswork so the operator knows exactly what "good" looks like every single week.',
    checklist: [
      { id: 'e-1', text: 'Review Month 1 targets' },
      { id: 'e-2', text: 'Review Month 2 targets' },
      { id: 'e-3', text: 'Review Month 3 targets' },
      { id: 'e-4', text: 'Set calendar reminders for weekly check-ins' },
    ],
    content: `## Month 1: Foundation (Weeks 1–4)

| Metric | Week 1–2 | Week 3–4 |
|---|---|---|
| Invites/day | 20–30 | 30–40 |
| Approvals/day | 8–12 | 12–18 |
| Samples/day | 20–25 | 25–30 |
| Videos/week | 20–40 | 40–70 |
| Founder posts/week | 3 | 3–5 |
| Founder LIVE/week | 1 | 1 |
| Paid budget | $0 (organic only) | $500–$1K GMV Max test |
| Expected GMV | $2–5K/week | $5–10K/week |

**Month 1 total expected GMV: $10K–$30K**

## Month 2: Acceleration (Weeks 5–8)

| Metric | Week 5–6 | Week 7–8 |
|---|---|---|
| Invites/day | 15–25 | 15–20 |
| Approvals/day | 10–15 | 10–15 |
| Samples/day | 25–30 | 25–30 |
| Videos/week | 70–90 | 80–110 |
| Founder posts/week | 3–5 | 3–5 |
| Founder LIVE/week | 2 | 2 |
| Paid budget | $1K–$3K GMV Max | $2K–$5K GMV Max + first Spark |
| Expected GMV | $8–15K/week | $10–20K/week |

**Month 2 total expected GMV: $30K–$80K**

## Month 3: Scale (Weeks 9–12)

| Metric | Week 9–10 | Week 11–12 |
|---|---|---|
| Invites/day | 10–20 | 10–15 (steady state) |
| Approvals/day | 10–15 | 10–12 |
| Samples/day | 25–30 | 25–30 |
| Videos/week | 100–130 | 110–150 |
| Founder posts/week | 3–5 | 3–5 |
| Founder LIVE/week | 2–3 | 2–3 |
| Paid budget | $5K–$10K total | $8K–$15K total |
| Expected GMV | $15–25K/week | $20–40K/week |

**Month 3 total expected GMV: $80K–$150K**

## Key Milestones
- **Day 7**: First 50 invites sent, first 15–20 samples shipped
- **Day 14**: First creator videos posted, first organic sales
- **Day 30**: 40–70 videos/week, first Contributors identified
- **Day 60**: 80–110 videos/week, Performers emerging, first LIVE revenue
- **Day 90**: 110–150 videos/week, Winners developing, $80K–$150K run rate`,
  },

  // ─── STEP 10 ────────────────────────────────────────────
  {
    id: 'acceleration-levers',
    step: 10,
    title: 'Acceleration Levers',
    subtitle: 'Sprint weeks, bonuses, farm experiences, and what to avoid',
    timeEstimate: 'Implement as needed',
    roles: R_OP_CEO,
    objective: 'Deploy targeted acceleration tactics when growth plateaus or opportunities emerge.',
    whyItMatters: 'Steady-state operations get you to $100K. Acceleration levers are what push through to $200K+ and beyond.',
    checklist: [
      { id: 'al-1', text: 'Plan first Content Density Sprint Week' },
      { id: 'al-2', text: 'Set up monthly cash bonus leaderboard' },
      { id: 'al-3', text: 'Plan quarterly farm experience (for Month 3+)' },
      { id: 'al-4', text: 'Document winner multiplication playbook' },
    ],
    content: `## Content Density Sprint Weeks
Run every 2 weeks (or when growth stalls):
- Increase daily invites by 1.5–2x
- Activate bonus leaderboard for the week
- Coordinate 5–10 creators to post within 24 hours
- Founder does extra LIVE session
- Announce to all active creators

## Winner Multiplication Play
When a Winner ($5K+/month) is identified:
- Send full product line (all SKUs)
- Offer exclusive commission rate (negotiate 5–10% higher)
- Request 5–10 content variants per month
- Feature in brand communications
- Invite to co-host LIVEs weekly
- Consider long-term partnership contract

## Founder LIVE Scaling
LIVE sessions compound in value — the algorithm rewards consistency:
- Month 1: 1 LIVE/week
- Month 2: 2 LIVEs/week
- Month 3+: 2–3 LIVEs/week
- Each LIVE generates 10–20 clips (3–5x content multiplier)

## Incentive Programs

### Monthly Cash Bonus Leaderboard — RECOMMENDED
Simple, effective, easy to administer:
- 1st place by GMV: **$1,000 cash**
- 2nd place: **$500 cash**
- 3rd place: **$250 cash**
- Total monthly cost: $1,750. High ROI for retention and motivation.

### Quarterly Farm Experience — RECOMMENDED
Invite top 3–5 creators to visit the WonderCow farm:
- Authentic content opportunities
- Deepens relationships
- Creates aspirational content for broader community
- Budget: ~$2–3K per event

### Vacation Giveaway — OPTIONAL (Later)
Quarterly vacation for top creator. Motivating but adds logistical complexity (booking, liability, taxes). Implement only after $200K+/month consistently. Warning: tax implications for prize winners.

### Dwarf Cow Giveaway — NOT RECOMMENDED
While on-brand and viral, a dwarf cow giveaway has significant logistical complexity: animal welfare regulations, shipping restrictions, ongoing care requirements, liability, insurance. Do not attempt until dedicated operations support and legal guidance. Revisit at $1M+/month.`,
  },

  // ─── STEP 11 ────────────────────────────────────────────
  {
    id: 'scaling-map',
    step: 11,
    title: '$200K → $500K Scaling Map',
    subtitle: 'What changes when you cross $200K/month',
    timeEstimate: 'Strategic reference',
    roles: R_CEO,
    objective: 'Understand the specific shifts in strategy, targets, and investment required to scale from $200K to $500K/month.',
    whyItMatters: 'The playbook that gets you to $200K is necessary but not sufficient for $500K. The shift is from acquisition to winner development, retention, and LIVE commerce.',
    checklist: [
      { id: 'sm-1', text: 'Review $500K targets vs current performance' },
      { id: 'sm-2', text: 'Identify which scaling shifts are relevant now' },
      { id: 'sm-3', text: 'Plan inventory and supply chain for growth' },
    ],
    content: `## The Strategic Shift
At $200K/month, the system is running. The shift to $500K requires:
- **From** acquisition-heavy **to** winner/retention/LIVE-heavy
- **From** broad creator base **to** deep investment in top performers
- **From** organic-first **to** balanced organic + paid

## $500K/month Targets

| Metric | $200K Level | $500K Target |
|---|---|---|
| Videos/week | 80–120 | 120–200 |
| Winners ($5K+) | 2–4 | 4–8 |
| Winners ($10K+) | 0–1 | 5–10 |
| Performers ($1K+) | 5–10 | 20–30 |
| LIVE sessions/week | 2–3 | 7–10 (founders + creators) |
| LIVE % of GMV | 5–10% | 15–30% |
| GMV Max budget | $300–$500/day | $1K–$3K/day |
| Spark Ads budget | $200–$500/day | $500–$2K/day |

## LIVE Scaling (Critical)
LIVE is the highest-leverage channel at scale:
- Goal: 15–30% of total GMV from LIVE sessions
- 7–10 sessions/week across founders + top creators
- Each session averages $500–$2K in GMV at scale
- Creator-hosted LIVEs (not just founder) are required

## Inventory as Constraint
Stockouts kill momentum. At $500K/month run rate:
- Plan 60–90 days of inventory ahead
- Monitor velocity weekly
- Have backup supplier relationships
- Never let a top-selling SKU go out of stock

## Content Volume Requirements
120–200 videos/week means:
- 30–50 active posting creators
- Average 3–5 videos per creator per week
- Plus founder content (3–5 posts + LIVE clips)
- Plus LIVE-generated clips (50–100/week at scale)`,
  },

  // ─── STEP 12 ────────────────────────────────────────────
  {
    id: 'failure-points',
    step: 12,
    title: 'Failure Points & Recovery Playbooks',
    subtitle: 'The 5 ways this system breaks and how to fix each one',
    timeEstimate: 'Reference — review monthly',
    roles: R_ALL,
    objective: 'Know exactly what failure looks like and have a pre-built recovery plan for each scenario.',
    whyItMatters: 'Every scaling system has failure modes. The difference between teams that stall and teams that scale is how fast they detect and correct failures.',
    checklist: [
      { id: 'fp-1', text: 'Review all 5 failure points' },
      { id: 'fp-2', text: 'Set up monitoring for each trigger' },
      { id: 'fp-3', text: 'Bookmark corrective action checklists' },
    ],
    content: `## Failure Point 1: Not Enough Videos/Week
**Trigger:** Videos/week below 60 for 2+ consecutive weeks
**Root Causes:** Not enough pipeline, low approval volume, creators not posting, insufficient follow-ups
**Corrective Actions:**
- Increase daily invites to 40+ for 2 weeks
- Trigger Sprint Week immediately
- Audit follow-up messages
- Review sample quality and shipping speed
- Consider posting bonus ($25–$50 per first video)

## Failure Point 2: Sample Burn / Low Post Rate
**Trigger:** Post rate below 25% for 2+ consecutive weeks
**Root Causes:** Approving low-quality creators, poor sample experience, ineffective messaging, creators don't understand the product
**Corrective Actions:**
- Switch to Tight approval mode immediately
- Audit last 50 approvals for quality issues
- Test new follow-up message variants
- Include "getting started" guide with samples
- Reduce daily approvals until post rate recovers above 30%

## Failure Point 3: No Winners Emerging
**Trigger:** 8+ weeks into program with zero Winners ($5K+/month)
**Root Causes:** Not enough Performers being developed, top creators under-supported, content formats not converting
**Corrective Actions:**
- Double down on top 5 Performers with extra product and Spark Ads
- Increase Spark Ads budget specifically for Performer content
- Ramp GMV Max by 20–30%
- Review and optimize product listing
- Offer exclusive commission rates to top 5 Performers

## Failure Point 4: Paid Scale Misfire
**Trigger:** CPA above $59 across all paid campaigns for 2+ weeks
**Root Causes:** Low-quality creative being amplified, insufficient organic traction before scaling, targeting issues, product listing not optimized
**Corrective Actions:**
- Pause all Spark Ads immediately
- Reduce GMV Max budget by 50%
- Refocus on organic growth for 2–4 weeks
- Only reactivate on content with 10K+ organic views
- Optimize product listing before resuming

## Failure Point 5: Concentration Risk
**Trigger:** Top 3 creators account for >70% of total GMV
**Root Causes:** Over-reliance on few performers, mid-tier under-supported, insufficient pipeline
**Corrective Actions:**
- Do NOT reduce support for top creators
- Increase investment in 10–15 mid-tier Activated creators
- Send upgraded product, request content variants
- Run Sprint Week focused on diversification
- Goal: reduce top-3 concentration below 50% within 4 weeks`,
  },

  // ─── STEP 13 ────────────────────────────────────────────
  {
    id: 'ceo-dashboard',
    step: 13,
    title: 'CEO Dashboard',
    subtitle: '8 numbers, early warnings, acceleration signals',
    timeEstimate: '2 minutes/week',
    roles: R_CEO,
    objective: 'Review 8 numbers weekly to know exactly whether the system is healthy, at risk, or ready to accelerate.',
    whyItMatters: 'The CEO should not need to dig into operations. These 8 numbers tell the full story in under 2 minutes.',
    checklist: [
      { id: 'ceo-1', text: 'Review the 8 numbers this week' },
      { id: 'ceo-2', text: 'Check for early warning signals' },
      { id: 'ceo-3', text: 'Check for acceleration signals' },
      { id: 'ceo-4', text: 'Take action if any signal triggers' },
    ],
    content: `## The 8 Numbers

| # | Metric | Healthy Range |
|---|---|---|
| 1 | Monthly GMV run rate | $50K+ by Month 2 |
| 2 | WoW growth % | 10–20% during ramp |
| 3 | Videos/week | 80–120+ |
| 4 | Active creators | 50+ by Month 2 |
| 5 | $200+ creators | 20+ by Month 3 |
| 6 | $1K+ creators | 5+ by Month 3 |
| 7 | Samples/month | 600–900 |
| 8 | CPA | < $35 |

## Early Warning Signals (Investigate Immediately)
- Videos/week <80 for 2 weeks → Check pipeline and post rate
- Samples/month <600 → Check approval volume and shipping
- $200+ tier not growing MoM → Check winner development
- CPA >$59 → Pause paid, review creative quality
- WoW growth negative 2+ weeks → Full SOP audit

## Acceleration Signals (Double Down)
- Videos/week >120 → Increase GMV Max budget, add Spark Ads
- 5+ Performers active → Invest in winner development, Sprint Week
- WoW growth >15% for 3+ weeks → Increase paid budget, scale LIVEs
- Post rate >35% → Switch to Aggressive approval mode
- Single creator hits $10K+ in a month → Full winner multiplication play

## When a Signal Triggers
**Early warning:** Schedule 15-minute call with operator within 24 hours. Use Decision Tree to identify root cause and corrective actions.
**Acceleration signal:** Acknowledge to operator, approve increased budget if needed, stay out of the way. The system is working.`,
  },
]
