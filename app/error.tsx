"use client";

import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh gap-4 text-center px-6">
      <Bot size={48} className="text-muted-foreground/40" />
      <div className="flex flex-col gap-1.5 max-w-sm">
        <h1 className="text-sm font-medium">Something unexpected happened</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Try reloading the page. If the error persists, our team has been notified and is already looking into it — we&apos;ll have things back to normal shortly.
        </p>
      </div>
      <Button onClick={reset} className="rounded-full h-11 text-sm cursor-pointer px-8">
        Reload
      </Button>
    </div>
  );
}
