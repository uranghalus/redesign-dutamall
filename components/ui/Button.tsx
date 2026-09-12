import * as React from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

/**
 * Button — design.md
 * - shape: pill (radius.pill 9999px)
 * - accent: primary #f00808 hanya untuk aksen; solid boleh untuk CTA utama
 * - tanpa box-shadow
 * - transisi hover: motion.duration-fast 200ms + motion.easing cubic-bezier(0.19,1,0.22,1)
 * - font: SUIT 14px 700 letter -0.28px line 1 (typography.nav/body)
 * - spacing dari scale [1,2,3,5,8,9,11,12,14,15]
 * - states: hover / focus-visible / active / disabled
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", disabled, children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-[SUIT] text-[14px] font-bold leading-none tracking-[-0.28px] rounded-[9999px] border select-none " +
      "transition-colors duration-[200ms] ease-[cubic-bezier(0.19,1,0.22,1)] " +
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 " +
      "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none " +
      "active:brightness-95";

    // spacing: px-14px/8px adalah dari scale, py 8px/5px juga dari scale
    const sizeCls = size === "sm" ? "px-[14px] py-[5px] gap-[8px]" : "px-[15px] py-[8px] gap-[8px]";

    const variantCls: Record<Variant, string> = {
      // primary: bg primary text on-primary border primary — tanpa shadow
      primary: "bg-primary text-on-primary border-primary hover:brightness-[0.92] shadow-none",
      // secondary: monokrom — surface bg, text, border ink/muted — primary tidak dipakai kecuali focus
      secondary:
        "bg-surface text-text border-text/15 hover:border-text hover:bg-surface shadow-none",
      // ghost: transparan monokrom
      ghost:
        "bg-transparent text-text border-transparent hover:bg-text/5 hover:border-text/10 shadow-none",
    };

    return (
      <button ref={ref} disabled={disabled} className={`${base} ${sizeCls} ${variantCls[variant]} ${className}`} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
