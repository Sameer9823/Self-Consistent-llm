# Self-Consistency AI

Ask one question. Get answers from **OpenAI**, **Gemini**, and **Llama** (via OpenRouter) in parallel, then let an OpenAI **evaluator** compare, strip out hallucinations, and merge the strongest ideas into a single synthesized answer — a practical implementation of the **Self-Consistency** prompting technique with multi-LLM orchestration instead of multi-sample voting from one model.

## Project overview

Most AI apps ask a single model and hope it's right. Self-Consistency AI instead:

1. Sends the exact same prompt to three independently-trained models at the same time.
2. Waits for all three (tolerating individual failures).
3. Hands all three responses to an OpenAI evaluator with explicit instructions to compare, deduplicate, remove factual errors, and merge the strongest parts.
4. Returns four results: the three raw model answers, and one final synthesized answer.

## Architecture

```
User (Dashboard) → POST /api/generate → services/orchestrator.ts
                                              │
                     ┌────────────┬───────────┼───────────┐
                     ▼            ▼           ▼
              services/openai  services/gemini  services/openrouter
              (generator)      (Gemini)         (Llama)
                     │            │              │
                     └────────────┴──────┬───────┘
                                          ▼
                            services/openai.evaluateResponses()
                                          │
                                          ▼
                               FinalResponse → Dashboard UI
```

- **Route handler** (`app/api/generate/route.ts`): validates the request, requires a signed-in Clerk user, and calls the orchestrator.
- **Orchestrator** (`services/orchestrator.ts`): runs the three generator calls with `Promise.allSettled`, so one provider failing never blocks the others, then calls the evaluator with whatever succeeded.
- **Services**: one file per provider, each returning a normalized `ModelResponse` (or `EvaluationResult` for the evaluator) with timing, word count, and token estimate metadata.

## Tech stack

- Next.js 15 (App Router, TypeScript)
- Tailwind CSS + hand-built shadcn/ui-style primitives (Card, Button, Badge, Tabs, Accordion, Tooltip, Skeleton, Dropdown, Dialog, Toast)
- Framer Motion for animation
- React Hook Form + Zod for the prompt form
- Clerk for authentication
- OpenAI SDK, Google Generative AI SDK, OpenRouter REST API
- `react-markdown` + `react-syntax-highlighter` for response rendering

## Folder structure

```
app/
  api/generate/route.ts     API route: POST { prompt } → FinalResponse
  dashboard/page.tsx        Protected generator UI
  history/page.tsx          Local-storage answer history
  sign-in/, sign-up/        Clerk auth pages
  layout.tsx, page.tsx      Root layout + public landing page
components/
  ui/                       Design-system primitives
  home/                     Landing page sections
  layout/                   Navbar, Footer
  dashboard/                Prompt form, loading, response cards
  shared/                   Theme provider/toggle, copy button, markdown renderer
services/
  openai.ts                 generateOpenAIResponse(), evaluateResponses()
  gemini.ts                 generateGeminiResponse()
  openrouter.ts              generateLlamaResponse()
  orchestrator.ts            runSelfConsistency() — parallel calls + evaluation
types/index.ts               ModelResponse, EvaluationResult, FinalResponse
lib/utils.ts                  cn(), word count, token estimate, ms formatting
hooks/use-toast.ts            Toast state manager
middleware.ts                 Clerk route protection
```

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in:

```
OPENAI_API_KEY=
GOOGLE_API_KEY=
OPENROUTER_API_KEY=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

Model names default to `gpt-4o` (OpenAI), `gemini-1.5-pro` (Gemini), and `meta-llama/llama-3.1-70b-instruct` (OpenRouter) — override with the `*_MODEL` variables if you want different ones.

## Installation & running locally

```bash
npm install
cp .env.local.example .env.local   # then fill in your keys
npm run dev
```

Visit `http://localhost:3000`. The landing page is public; `/dashboard` and `/history` require signing in via Clerk.

## Self-Consistency workflow

1. **Generate** — `generateOpenAIResponse`, `generateGeminiResponse`, and `generateLlamaResponse` run concurrently via `Promise.allSettled` inside `runSelfConsistency()`.
2. **Tolerate failure** — if a provider throws or times out, its `ModelResponse.success` is `false` and its error is shown in that card; the other providers and the evaluator still run.
3. **Evaluate** — `evaluateResponses()` builds a comparison prompt with all three raw answers and asks OpenAI to merge them into one response, instructed explicitly not to just copy one model.
4. **Return** — the API responds with all four pieces so the UI can show each model's answer alongside the synthesized one.

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import it in Vercel.
3. Add all variables from `.env.local.example` under Project Settings → Environment Variables (Production and Preview).
4. In Clerk's dashboard, add your Vercel domain to the allowed origins and update the publishable/secret keys for production.
5. Deploy.

## Future improvements

- Persist history server-side (per-user) instead of `localStorage`.
- Add PDF export alongside the existing Markdown export.
- Support additional providers (Anthropic, Mistral) as extra generator columns.
- Stream each model's tokens live instead of waiting for full completions.
- Add per-provider retry/backoff and configurable timeouts.

## Screenshots

_Add screenshots of the landing page, dashboard, and results view here._
