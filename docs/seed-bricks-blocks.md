# Seeding Bricks and Blocks

This document explains how to add a new brick or block to Sting Runner and seed it into both dev and production Convex databases.

---

## How the Data Pipeline Works

```
app/(protected)/bricks/data.ts   ← Static source of truth (TypeScript)
        ↓
convex/seedAction.ts             ← internalActions that read data.ts and call mutations
        ↓
convex/seed.ts                   ← internalMutations that write to Convex tables
        ↓
Convex database (bricks, scaffolds, rivets, blocks, blockPrerequisites)
```

The `data.ts` files are the canonical source. Convex records are created by running seed actions — they are **never** edited directly in the dashboard.

---

## TypeScript Types

### Brick (`app/(protected)/bricks/data.ts`)

```typescript
type BrickType =
  | "ai" | "dev-tool" | "language" | "framework"
  | "tool" | "certification" | "course" | "project";

type Rivet = {
  id: string;          // e.g. "r-ai-basics-0-0"
  title: string;
  description: string;
  cdnVideoUrl?: string; // Cloudinary or CDN URL for the video
};

type Scaffold = {
  id: string;          // e.g. "s-ai-basics-0"
  title: string;
  description: string;
  rivets: Rivet[];
};

type Brick = {
  id: string;          // e.g. "b-083"  ← increment from last used
  models: string[];    // AI model IDs used in sessions (e.g. ["claude-sonnet-4-6"])
  slug: string;        // URL slug, kebab-case, e.g. "ai-basics"
  name: string;        // Display name
  initials: string;    // 2-3 char abbreviation shown on card
  color: string;       // Hex colour for the card
  image?: string;      // Path under /public or Convex storage ID
  medals: number;      // Difficulty/prestige: 1=bronze, 2=silver, 3=gold
  priority?: number;   // Display order — lower = first. Omit for default DB order.
  type: BrickType;
  category: string;    // Freeform category string
  description: string;
  history?: { creator: string; year: number; origin: string };
  points: string[];    // 3-5 bullet points of what the learner gains
  scaffolds: Scaffold[];
};
```

### Block (`app/(protected)/blocks/data.ts`)

```typescript
type Block = {
  id: string;          // e.g. "bl-001"
  models: string[];
  medals: number;
  priority?: number;
  slug: string;
  category: string;
  salary: string;      // e.g. "$120k – $160k"
  title: string;
  description: string;
  impact: string;      // One-liner on the job's impact
  dayInLife: string;   // Narrative of a typical day
  responsibilities: string[];
  tools: string[];     // Tool names used in this role
  mode: string;        // e.g. "Remote" / "Hybrid"
  provider: string;    // Company / org that offers this role
  providerImage?: string;
  prerequisiteBricks?: string[]; // Legacy brick IDs (e.g. ["b-001", "b-082"])
  scaffolds: Scaffold[];
};
```

---

## Step-by-Step: Adding a New Brick

### 1. Choose an ID and slug

- IDs are sequential: check the last `b-XXX` in `data.ts` and increment.
- Slug is kebab-case of the name: `"AI Basics"` → `"ai-basics"`.

### 2. Add the brick to `data.ts`

Add a new entry to the `bricks` array in `app/(protected)/bricks/data.ts`.

```typescript
{
  id: "b-083",
  models: ["claude-sonnet-4-6"],
  slug: "prompt-engineering",
  name: "Prompt Engineering",
  initials: "PE",
  color: "#6366f1",
  medals: 2,
  priority: 1,   // Set only if this brick should appear at a specific rank
  type: "course",
  category: "AI Fundamentals",
  description: "Master the art of writing effective prompts...",
  points: [
    "Write prompts that produce consistent, high-quality output",
    "Use chain-of-thought and few-shot techniques",
    "Evaluate and iterate on prompts systematically",
  ],
  scaffolds: [
    {
      id: "s-prompt-engineering-0",
      title: "Foundations of Prompting",
      description: "...",
      rivets: [
        {
          id: "r-prompt-engineering-0-0",
          title: "What Makes a Great Prompt",
          description: "...",
          cdnVideoUrl: "https://res.cloudinary.com/your-cloud/video/upload/v.../filename.mp4",
        },
        // more rivets...
      ],
    },
    // more scaffolds...
  ],
}
```

**ID conventions:**
- Scaffold IDs: `s-{slug}-{scaffoldIndex}` — e.g. `s-prompt-engineering-0`
- Rivet IDs: `r-{slug}-{scaffoldIndex}-{rivetIndex}` — e.g. `r-prompt-engineering-0-0`

### 3. Create a targeted seed action

Add an `internalAction` in `convex/seedAction.ts` that targets only your new brick. This bypasses the "already seeded" guard in `seed.ts` which blocks the full `seedAll` when data exists.

```typescript
export const seedPromptEngineering = internalAction({
  args: {},
  handler: async (ctx) => {
    const { bricks } = await import("../app/(protected)/bricks/data");
    const brick = bricks.find((b) => b.id === "b-083");
    if (!brick) throw new Error("Brick b-083 not found in data.ts");

    const brickId: Id<"bricks"> = await ctx.runMutation(
      internal.seed.insertBrick,
      {
        legacyId: brick.id,
        models: brick.models,
        slug: brick.slug,
        name: brick.name,
        initials: brick.initials,
        color: brick.color,
        imageUrl: brick.image,
        medals: brick.medals,
        type: brick.type,
        category: brick.category,
        description: brick.description,
        historyCreator: brick.history?.creator,
        historyYear: brick.history?.year,
        historyOrigin: brick.history?.origin,
        points: brick.points,
        priority: brick.priority,
      }
    );

    const scaffoldsPayload = brick.scaffolds.map((s, si) => ({
      legacyId: s.id,
      title: s.title,
      description: s.description,
      order: si,
      rivets: s.rivets.map((r, ri) => ({
        legacyId: r.id,
        title: r.title,
        description: r.description,
        order: ri,
        cdnVideoUrl: r.cdnVideoUrl,
      })),
    }));

    await ctx.runMutation(internal.seed.insertScaffoldsAndRivetsForBrick, {
      brickId,
      scaffolds: scaffoldsPayload,
    });

    return { status: "done", brickId };
  },
});
```

### 4. Deploy and seed

```bash
# Deploy the updated functions
npx convex deploy --yes

# Seed into dev
npx convex run seedAction:seedPromptEngineering

# Seed into production
npx convex run seedAction:seedPromptEngineering --prod
```

---

## Step-by-Step: Adding a New Block

### 1. Add the block to `data.ts`

Add to `app/(protected)/blocks/data.ts`:

```typescript
{
  id: "bl-002",
  models: ["claude-sonnet-4-6"],
  medals: 2,
  priority: 1,
  slug: "ai-product-manager",
  category: "Product",
  salary: "$130k – $180k",
  title: "AI Product Manager",
  description: "Lead AI product development...",
  impact: "Ships AI features that reach millions of users",
  dayInLife: "Morning standup reviewing model metrics, afternoon writing PRDs...",
  responsibilities: [
    "Define AI product roadmap",
    "Work with ML engineers on model evaluation",
  ],
  tools: ["Linear", "Notion", "Claude"],
  mode: "Remote",
  provider: "Various",
  prerequisiteBricks: ["b-001", "b-082"], // legacy brick IDs
  scaffolds: [
    {
      id: "s-ai-pm-0",
      title: "AI PM Fundamentals",
      description: "...",
      rivets: [
        {
          id: "r-ai-pm-0-0",
          title: "Understanding Model Metrics",
          description: "...",
          // cdnVideoUrl is optional for blocks
        },
      ],
    },
  ],
}
```

### 2. Create a targeted seed action

```typescript
export const seedAiProductManager = internalAction({
  args: {},
  handler: async (ctx) => {
    const { blocks } = await import("../app/(protected)/blocks/data");
    const { bricks } = await import("../app/(protected)/bricks/data");
    const block = blocks.find((b) => b.id === "bl-002");
    if (!block) throw new Error("Block bl-002 not found in data.ts");

    // Build legacy-to-convex ID map for prereq bricks
    const legacyIdToConvexId: Record<string, Id<"bricks">> = {};
    for (const legacyBrickId of block.prerequisiteBricks ?? []) {
      const brickDoc = await ctx.runQuery(/* use a query that looks up by legacyId */);
      // OR: iterate ctx.db.query("bricks").withIndex("by_legacy_id") in a mutation
    }

    const blockId: Id<"blocks"> = await ctx.runMutation(
      internal.seed.insertBlock,
      {
        legacyId: block.id,
        models: block.models,
        medals: block.medals,
        slug: block.slug,
        category: block.category,
        salary: block.salary,
        title: block.title,
        description: block.description,
        impact: block.impact,
        dayInLife: block.dayInLife,
        responsibilities: block.responsibilities,
        tools: block.tools,
        mode: block.mode,
        provider: block.provider,
        providerImageUrl: block.providerImage,
        priority: block.priority,
      }
    );

    const scaffoldsPayload = block.scaffolds.map((s, si) => ({
      legacyId: s.id,
      title: s.title,
      description: s.description,
      order: si,
      rivets: s.rivets.map((r, ri) => ({
        legacyId: r.id,
        title: r.title,
        description: r.description,
        order: ri,
      })),
    }));

    await ctx.runMutation(internal.seed.insertScaffoldsAndRivetsForBlock, {
      blockId,
      scaffolds: scaffoldsPayload,
    });

    return { status: "done", blockId };
  },
});
```

### 3. Deploy and seed

```bash
npx convex deploy --yes
npx convex run seedAction:seedAiProductManager          # dev
npx convex run seedAction:seedAiProductManager --prod   # production
```

---

## Priority Ordering

Both `bricks` and `blocks` support an optional `priority` field:

- Set `priority: 0` for the item that should appear first, `priority: 1` for second, etc.
- Items with no `priority` set fall to the end in their natural database insertion order.
- This is enforced in all query helpers (`getAll`, `search`, `filterByTypes`, `filterByCategories`) via:

```typescript
function sortByPriority<T extends { priority?: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const ap = a.priority ?? Infinity;
    const bp = b.priority ?? Infinity;
    return ap - bp;
  });
}
```

---

## Video URLs (`cdnVideoUrl`)

Rivets on bricks support an optional `cdnVideoUrl`. Use Cloudinary:

1. Upload the compressed video (see `docs/compress-videos.md` for compression steps).
2. Copy the delivery URL from Cloudinary — it looks like:
   `https://res.cloudinary.com/{cloud-name}/video/upload/v{version}/{filename}.mp4`
3. Paste it as `cdnVideoUrl` on the rivet in `data.ts`.
4. Re-run the seed action. The URL is stored in the `rivets` table and served directly by the `RivetVideoPlayer` component.

---

## Providers

Providers represent the companies or organisations behind a brick or block (e.g. "Google", "Anthropic", "Coursera"). One provider can own many bricks and blocks.

### Schema

```
providers table
  name      string (unique-by-convention)
  logoUrl   string? (CDN or public URL for the logo image)

bricks table  →  providerId: optional Id<"providers">
blocks table  →  providerId: optional Id<"providers">
```

### Available Convex functions (`convex/providers.ts`)

| Function | Type | Description |
|---|---|---|
| `providers:getAll` | query | All providers, ordered by creation time |
| `providers:getById` | query | Single provider by ID |
| `providers:create` | mutation | Create a provider (no-ops if name already exists, returns existing ID) |
| `providers:update` | mutation | Update name or logo |
| `providers:linkBrick` | mutation | Attach a brick to a provider |
| `providers:linkBlock` | mutation | Attach a block to a provider |
| `providers:getBricksForProvider` | query | All bricks for a provider |
| `providers:getBlocksForProvider` | query | All blocks for a provider |

### Linking a provider to a brick or block

After creating the provider and the brick/block, link them:

```bash
# Create the provider (returns its ID)
npx convex run providers:create --name "Anthropic" --logoUrl "https://..."

# Link using the returned provider ID
npx convex run providers:linkBrick --brickId "..." --providerId "..."
npx convex run providers:linkBlock --blockId "..." --providerId "..."
```

Or call `providers:create` + `providers:linkBrick` / `providers:linkBlock` from within a seed action to do it all in one step.

---

## Adding Transcripts for Rivets

Every rivet with a video can have a transcript. Transcripts power the teleprompter UI on the learn page — one line appears at a time, in sync with the video, and the student can click any line to seek.

### Format required: VTT

Use **WebVTT (`.vtt`)** files. SRT, TTML, and TXT are not used.

```
WEBVTT

1
00:00:03.250 --> 00:00:06.000
Before the digital age,
before cassette tapes,

2
00:00:06.125 --> 00:00:08.875
and even before the popularity
of vinyl records,
```

- Timestamps: `HH:MM:SS.mmm` or `MM:SS.mmm`
- Multi-line cues are joined into a single segment with a space
- Cue numbers (1, 2, 3…) are optional but recommended

### File naming convention

```
{courseIndex}_{rivetIndex}_{TitleNoSpaces}_en-US_vtt.vtt
```

Examples (AI Basics, Course 1):
```
1_00_AIhistory_en-US_vtt.vtt              → r-ai-basics-0-0
1_01_Whatisartificialintelligence_en-US_vtt.vtt → r-ai-basics-0-1
1_02_Knowledgevsintelligence_en-US_vtt.vtt      → r-ai-basics-0-2
```

The numeric prefix (`1_00`, `1_01`…) maps to the rivet's position across all scaffolds in order.

### Step-by-step: adding transcripts for a new brick

#### 1. Prepare VTT files

One `.vtt` file per rivet, in order. Store them locally — they are parsed and embedded into the codebase, not uploaded to a CDN.

#### 2. Parse VTT files into `convex/transcriptData.ts`

Add your entries to `convex/transcriptData.ts`. The file exports `AI_BASICS_TRANSCRIPTS` (and future course maps) as a `Record<rivetLegacyId, TranscriptSegment[]>`.

Each segment shape:
```typescript
{ startTime: number; endTime: number; text: string }
// startTime and endTime are in seconds (e.g. 3.25, 6.0)
```

You can parse VTT files with this Node.js snippet and paste the output into `transcriptData.ts`:

```javascript
const fs = require('fs');

function parseVTT(content) {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const segments = [];
  let i = 0;
  while (i < lines.length && !lines[i].includes('-->')) i++;
  while (i < lines.length) {
    if (lines[i].includes('-->')) {
      const [start, end] = lines[i].split('-->').map(s => s.trim());
      const toSec = t => {
        const parts = t.split(':');
        return parts.length === 3
          ? +parts[0]*3600 + +parts[1]*60 + parseFloat(parts[2])
          : +parts[0]*60 + parseFloat(parts[1]);
      };
      i++;
      const textLines = [];
      while (i < lines.length && lines[i].trim() !== '') {
        textLines.push(lines[i].trim());
        i++;
      }
      if (textLines.length) segments.push({
        startTime: Math.round(toSec(start) * 1000) / 1000,
        endTime: Math.round(toSec(end) * 1000) / 1000,
        text: textLines.join(' '),
      });
    } else { i++; }
  }
  return segments;
}
```

#### 3. Add a seed function in `convex/seedTranscripts.ts`

```typescript
export const seedPromptEngineering = internalAction({
  args: {},
  handler: async (ctx): Promise<{ seeded: number }> => {
    const { PROMPT_ENGINEERING_TRANSCRIPTS } = await import("./transcriptData");
    let seeded = 0;
    for (const [legacyRivetId, segments] of Object.entries(PROMPT_ENGINEERING_TRANSCRIPTS)) {
      await ctx.runMutation(internal.transcripts.upsertByLegacyRivetId, {
        legacyRivetId,
        segments,
      });
      seeded++;
    }
    return { seeded };
  },
});
```

#### 4. Deploy and seed

```bash
npx convex dev --once                                    # push updated functions
npx convex run seedTranscripts:seedPromptEngineering     # seed dev
npx convex run seedTranscripts:seedPromptEngineering --prod  # seed production
```

### How the transcript is stored

```
convex/transcriptData.ts   ← parsed segments (source of truth)
        ↓
convex/seedTranscripts.ts  ← internalAction reads data, calls upsertByLegacyRivetId
        ↓
transcripts table          ← { rivetId, segments[] } indexed by rivetId
        ↓
RivetTranscript component  ← queried via api.transcripts.get, teleprompter UI
```

---

## Prompt for a Content Agent

Give this prompt to another agent to generate the `data.ts` entry for a new brick:

```
You are seeding a new brick for the Sting Runner learning platform.

I will give you the raw course material. Based on it, generate a valid TypeScript
object that conforms to the `Brick` type from `app/(protected)/bricks/data.ts`.

Required fields:
- id: Next sequential "b-XXX" ID (check current max in data.ts)
- models: ["claude-sonnet-4-6"] unless specified otherwise
- slug: kebab-case of the name
- name, initials (2-3 chars), color (hex)
- medals: 1 (intro), 2 (intermediate), 3 (advanced)
- priority: integer — 0 is highest priority. Omit if not a featured brick.
- type: one of "ai" | "dev-tool" | "language" | "framework" | "tool" | "certification" | "course" | "project"
- category: short freeform string
- description: 1-2 sentences
- points: 3-5 bullets of what the learner gains
- scaffolds: group the lessons into logical chapters. Each scaffold has:
    - id: "s-{slug}-{index}"
    - title, description
    - rivets: each lesson with:
        - id: "r-{slug}-{scaffoldIndex}-{rivetIndex}"
        - title, description
        - cdnVideoUrl: I will provide the Cloudinary URLs separately

Output ONLY the TypeScript object literal. No imports, no wrapping code.
```
