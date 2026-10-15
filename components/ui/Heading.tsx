import { cn } from "@/lib/utils";

const sizes = {
  display: "font-display text-display",
  h1: "font-display text-h1",
  h2: "font-display text-h2",
  h3: "font-sans text-h3 font-medium",
} as const;

type Level = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps extends React.ComponentPropsWithoutRef<"h1"> {
  level?: Level; // which HTML tag (document structure)
  size?: keyof typeof sizes; // how it looks
}

export function Heading({ level = 2, size = "h2", className, ...props }: HeadingProps) {
  const Tag = `h${level}` as `h${Level}`;
  return <Tag className={cn(sizes[size], className)} {...props} />;
}
