"use client";

import { useEffect } from "react";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <TriangleAlert className="h-8 w-8 text-red-400" />
      <h1 className="font-display text-2xl font-semibold">Something broke</h1>
      <p className="max-w-sm text-sm text-ink-muted">
        {error.message || "An unexpected error occurred. Try again."}
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
