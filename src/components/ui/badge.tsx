import type { HTMLAttributes } from "react";

export function Badge({
  variant: _variant,
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: string }) {
  const badgeClassName = [
    "inline-flex items-center rounded-full px-3.5 py-1.5",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <span {...props} className={badgeClassName} />;
}
