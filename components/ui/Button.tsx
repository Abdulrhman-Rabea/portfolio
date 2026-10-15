import Link from "next/link";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-medium " +
  "transition-colors duration-200 motion-reduce:transition-none";

const variants = {
  // Dark text on orange: white on orange has weak contrast
  primary: "bg-accent text-background hover:bg-foreground",
  ghost: "border-border text-foreground hover:border-accent hover:text-accent border",
} as const;

type LinkProps = React.ComponentProps<typeof Link>;

type ButtonProps = { variant?: keyof typeof variants } & (
  | ({ href: LinkProps["href"] } & Omit<LinkProps, "href">)
  | ({ href?: undefined } & React.ComponentPropsWithoutRef<"button">)
);

export function Button({ variant = "primary", className, ...rest }: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (rest.href !== undefined) {
    return <Link className={classes} {...(rest as LinkProps)} />;
  }

  return (
    <button
      type="button"
      className={classes}
      {...(rest as React.ComponentPropsWithoutRef<"button">)}
    />
  );
}
