import Link from "next/link";
import { Github, Linkedin, Radio } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-ink-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 font-display text-sm font-semibold">
          <Radio className="h-4 w-4 text-synth" />
          Self-Consistency AI
        </div>
        <p className="max-w-md text-xs text-ink-muted">
          Three independent models answer the same question in parallel. An
          evaluator model compares, strips out mistakes, and merges the rest
          into a single synthesized answer.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com"
            target="_blank"
            className="text-ink-muted hover:text-inherit"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            className="text-ink-muted hover:text-inherit"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <div className="border-t border-ink-line py-4 text-center font-mono text-[0.7rem] text-ink-muted">
        © {new Date().getFullYear()} Self-Consistency AI. Built for demonstrating multi-LLM orchestration.
      </div>
    </footer>
  );
}
