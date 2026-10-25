# Sting Runner — B2B AI Agent Agency Roadmap

> Convert incoming web traffic into qualified discovery calls using an embedded Sting Runner Intake Agent that captures workflows and books directly into a calendar.

---

## Phase 1 — Landing Page (Conversion Funnel)

### Hero
- [x] Headline: "Build and deploy sovereign AI agents instantly."
- [x] Subheadline: "Sting Runner allows anyone who can talk, write, or think to command a digital workforce."
- [ ] Primary CTA button: "Talk to Sting Runner Agent" — opens intake chat widget
- [ ] Secondary CTA button: "Book discovery call" — scrolls to or opens booking widget

### Funnel Sections
- [x] Word reveal — 57% AI traffic stat + "Sting Runner builds that."
- [x] The Sting Runner Method — 4-step process (Interview, Architect, Deploy, Govern)
- [ ] Industry value matrix — Medical / Legal / B2B use cases with concrete ROI copy
- [ ] Live agent section — prominent in-page chat container (not a corner widget)

### Meta & SEO
- [x] Page title, description, keywords updated to B2B agency copy
- [x] OG image and Twitter card updated
- [x] JSON-LD updated to BusinessApplication
- [x] Auth modal tagline updated

---

## Phase 2 — Sting Runner Intake Agent (Chat Widget)

- [ ] Build `AgentWidget` component — inline chat UI with streaming text support
- [ ] System prompt: strict 4-step intake logic
  - Step 1: Greeting — "What manual process are you looking to automate?"
  - Step 2: Extract industry, target channel (WhatsApp / Web / CRM), main pain point
  - Step 3: Generate 3-bullet custom proposal based on inputs
  - Step 4: Hand off — "Book a 15-minute demo with Craig" + load booking widget inline
- [ ] Backend route `/api/intake-agent` — connects widget to LLM (Convex `fetchAction`)
- [ ] Streaming response support in the chat UI
- [ ] Save every conversation to database (lead captured even if user drops off)

---

## Phase 3 — Booking Integration (Calendly)

- [ ] Embed Calendly widget inside the agent chat at Step 4 handoff
- [ ] Pass pre-filled URL params from conversation: Name, Email, Industry, Workflow Summary
- [ ] Webhook (n8n or API route) — send automated confirmation on booking
- [ ] Fallback: Google Workspace Appointment Schedules if zero-subscription required

---

## Phase 4 — Lead Capture & Analytics

- [ ] Store all chat sessions: inputs, workflow details, timestamp, booking status
- [ ] Database: PostgreSQL / Supabase (or Convex tables)
- [ ] Dashboard or export view for Craig to review incoming leads
- [ ] Booking confirmation triggers — SMS / email reminders to reduce no-shows

---

## Phase 5 — End-to-End QA

- [ ] Cold email link → landing page → agent interaction → discovery call booked
- [ ] Test on mobile (WhatsApp-referred traffic)
- [ ] Test Calendly pre-fill params are passing correctly
- [ ] Test lead saved to DB when user drops off before booking
- [ ] Test agent follows 4-step logic strictly, no hallucinated proposals

---

## Scheduling Stack Decision

| Option | Pros | Cons |
|---|---|---|
| **Calendly** (recommended) | Webhooks, pre-fill params, SMS reminders, native routing | Paid subscription |
| Google Workspace Appointments | Free, Google-native | No webhooks, no pre-fill, basic reminders |

---

## Target Industries

| Industry | Pain Point | Agent Use Case |
|---|---|---|
| Medical & Aesthetic Clinics | Missed after-hours inquiries | Patient intake, eligibility screening, consultation booking |
| Legal & Professional Services | Slow client intake | Case screening, consultation scheduling, document intake |
| High-Ticket B2B | Slow lead qualification | 24/7 FAQ, lead scoring, direct calendar routing |
