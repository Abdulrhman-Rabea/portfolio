import { cn } from "@/lib/utils";

export function Tag({ className, ...props }: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cn(
        "border-border text-muted text-label rounded-full border px-3 py-1 font-mono uppercase",
        className,
      )}
      {...props}
    />
  );
}
