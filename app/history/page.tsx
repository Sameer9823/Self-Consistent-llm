"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Clock3, Trash2 } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/shared/markdown";
import type { HistoryItem } from "@/types";

const HISTORY_KEY = "self-consistency-history";

export default function HistoryPage() {
  const [items, setItems] = React.useState<HistoryItem[]>([]);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      setItems(raw ? JSON.parse(raw) : []);
    } catch {
      setItems([]);
    }
  }, []);

  function clearHistory() {
    localStorage.removeItem(HISTORY_KEY);
    setItems([]);
  }

  return (
    <>
      <Navbar />
      <main className="container pb-28 pt-14">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold">History</h1>
            <p className="mt-1 text-sm text-ink-muted">
              Saved locally in your browser — nothing leaves your device.
            </p>
          </div>
          {items.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearHistory}>
              <Trash2 className="h-4 w-4" /> Clear
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ink-line p-16 text-center text-ink-muted">
            <Clock3 className="mx-auto mb-3 h-6 w-6" />
            <p>No answers yet. Generate one from the dashboard and it will show up here.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">{item.question}</CardTitle>
                    <p className="font-mono text-[0.7rem] text-ink-muted">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <Markdown content={item.finalAnswer} />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
