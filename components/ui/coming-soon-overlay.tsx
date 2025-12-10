"use client";

import { Construction } from "lucide-react";

interface ComingSoonOverlayProps {
  title?: string;
  description?: string;
}

export function ComingSoonOverlay({
  title = "Coming Soon",
  description = "We're working hard to bring you this feature. Stay tuned!",
}: ComingSoonOverlayProps) {
  return (
    <div className="absolute inset-0 z-40 pointer-events-none">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px] flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Construction className="h-10 w-10 text-amber-600 dark:text-amber-400" />
          </div>
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg">{description}</p>
        </div>
      </div>
    </div>
  );
}
