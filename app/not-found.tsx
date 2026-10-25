import Link from "next/link";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh gap-4 text-center px-6">
      <Bot size={48} className="text-muted-foreground/40" />
      <h1 className="text-sm font-medium">Not Found</h1>
      <p className="text-sm text-muted-foreground leading-relaxed">
        We could not find the page you were looking for.
      </p>
      <Button asChild className="rounded-full h-11 text-sm cursor-pointer px-8">
        <Link href="/">Home</Link>
      </Button>
    </div>
  );
}
