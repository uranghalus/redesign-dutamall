import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "solid" | "outline" | "accent" | "ghost";
type Size = "sm" | "md" | "lg";

/**
 * LWT button language — 1px black frame, white ground, bold uppercase SUIT.
 * Hover is fill inversion (black fill / white text), never a shadow.
 * `accent` is the red plate with black text (LWT's red-on-fill contrast rule
 * at label sizes); `solid` is black fill / white text.
 */
const base =
  "inline-flex select-none items-center justify-center gap-2.5 border border-ink font-sans font-bold uppercase tracking-wide transition-colors duration-200";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-paper hover:bg-dim",
  outline: "bg-paper text-ink hover:bg-ink hover:text-paper",
  accent: "border-accent bg-accent text-ink hover:bg-ink hover:border-ink hover:text-paper",
  ghost: "border-transparent bg-transparent text-current hover:bg-silver",
};

/* h-10/h-12/h-14 = LWT's 40/48/56px touch heights (rem = 16px) */
const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-xs",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

export function LwtButton({
  variant = "outline",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function LwtButtonLink({
  variant = "outline",
  size = "md",
  className = "",
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; size?: Size; href: string }) {
  return (
    <a
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}

/** Square icon button — hairline frame, fill inversion on hover. */
export function LwtIconButton({
  className = "",
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex size-11 shrink-0 items-center justify-center border border-ink bg-paper transition-colors duration-200 hover:bg-ink hover:text-paper ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

/** Backward-compatible aliases (legacy imports). */
export const BrutalButton = LwtButton;
export const BrutalButtonLink = LwtButtonLink;
export const BrutalIconButton = LwtIconButton;
