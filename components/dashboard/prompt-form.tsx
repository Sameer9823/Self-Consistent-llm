"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  prompt: z
    .string()
    .trim()
    .min(4, "Ask a bit more — at least 4 characters.")
    .max(6000, "Keep it under 4000 characters."),
});

type FormValues = z.infer<typeof schema>;

export function PromptForm({
  onSubmit,
  isLoading,
}: {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  function submit(values: FormValues) {
    onSubmit(values.prompt);
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-3">
      <Textarea
        {...register("prompt")}
        placeholder="Ask anything..."
        rows={5}
        className="text-lg"
        disabled={isLoading}
      />
      {errors.prompt && (
        <p className="text-xs text-red-400">{errors.prompt.message}</p>
      )}
      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={isLoading}>
          <Sparkles className="h-4 w-4" />
          {isLoading ? "Generating..." : "Generate Answer"}
        </Button>
      </div>
    </form>
  );
}
