import { Toaster } from "@/components/ui/sonner";

export function Toast() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "font-body text-sm bg-card text-card-foreground border border-border shadow-elevated",
          success: "border-accent/30",
          error: "border-destructive/30",
        },
      }}
      closeButton
    />
  );
}
