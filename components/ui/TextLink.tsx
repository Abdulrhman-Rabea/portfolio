import Link from "next/link";
import { cn } from "@/lib/utils";

// Underline "wipes" in from the left using only CSS
const style =
  "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat " +
  "transition-[background-size] duration-300 motion-reduce:transition-none " +
  "hover:bg-[length:100%_1px] focus-visible:bg-[length:100%_1px]";

interface TextLinkProps extends Omit<React.ComponentPropsWithoutRef<"a">, "href"> {
  href: string;
}

export function TextLink({ href, className, children, ...props }: TextLinkProps) {
  const isExternal = /^(https?:)?\/\//.test(href) || href.startsWith("mailto:");

  if (isExternal) {
    const opensNewTab = !href.startsWith("mailto:");
    return (
      <a
        href={href}
        className={cn(style, className)}
        {...(opensNewTab && { target: "_blank", rel: "noopener noreferrer" })}
        {...props}
      >
        {children}
        {opensNewTab && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(style, className)} {...props}>
      {children}
    </Link>
  );
}
