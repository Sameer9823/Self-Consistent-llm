import Link from "next/link";
import { Radio } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-grid-fade px-4 text-center">
      <Radio className="h-8 w-8 text-synth" />
      <h1 className="font-display text-4xl font-semibold">404</h1>
      <p className="max-w-sm text-ink-muted">
        This page didn&apos;t converge into an answer. Let&apos;s get you back on track.
      </p>
      <Button asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
}
