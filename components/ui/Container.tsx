import { cn } from "@/lib/utils";

export function Container({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("max-w-page px-gutter mx-auto w-full", className)} {...props} />;
}
