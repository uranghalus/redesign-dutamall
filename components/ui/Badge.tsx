import * as React from "react";

type Variant = "primary" | "monochrome" | "muted";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
}

/**
 * Badge — design.md
 * - pill (radius.pill 9999px)
 * - primary #f00808 hanya jika perlu ditonjolkan, default monokrom
 * - tanpa shadow
 * - SUIT 14px 700 -0.28px line 1
 * - spacing scale, motion fast + easing
 */
export function Badge({ className = "", variant = "monochrome", children, ...props }: BadgeProps) {
  const base =
    "inline-flex items-center justify-center font-[SUIT] text-[14px] font-bold leading-none tracking-[-0.28px] rounded-[9999px] border " +
    "px-[11px] py-[3px] transition-colors duration-[200ms] ease-[cubic-bezier(0.19,1,0.22,1)] shadow-none";

  const variants: Record<Variant, string> = {
    primary: "bg-primary text-on-primary border-primary",
    monochrome: "bg-surface text-text border-text/15",
    muted: "bg-surface text-text-muted border-text/10",
  };

  return (
    <span className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}
