import type { HTMLAttributes } from "react";

export function Badge({
  variant: _variant,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: string }) {
  return <span {...props} />;
}
