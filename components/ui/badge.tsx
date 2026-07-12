import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "border-ink-line bg-white/5 text-ink-muted",
        openai: "border-openai/40 bg-openai/10 text-openai",
        gemini: "border-gemini/40 bg-gemini/10 text-gemini",
        llama: "border-llama/40 bg-llama/10 text-llama",
        synth: "border-synth/40 bg-synth/10 text-synth",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
