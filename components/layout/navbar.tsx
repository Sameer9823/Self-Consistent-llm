"use client";

import Link from "next/link";
import { Github, Radio } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/history", label: "History" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="glass mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3">
        <Link href="/" className="flex items-center gap-2 font-display text-base font-semibold">
          <Radio className="h-4 w-4 text-synth" />
          Self-Consistency AI
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-ink-muted transition-colors hover:text-inherit"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://github.com/Sameer9823"
            target="_blank"
            rel="noreferrer"
            className="text-ink-muted transition-colors hover:text-inherit"
            aria-label="GitHub repository"
          >
            <Github className="h-4 w-4" />
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Button asChild size="sm" variant="outline">
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
