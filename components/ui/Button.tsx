import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "solid" | "primary" | "outline" | "outlinePaper" | "accent" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex select-none items-center justify-center gap-2.5 border-2 font-sans font-bold uppercase tracking-wider transition-[transform,background-color,color,border-color,box-shadow] duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";

const variants: Record<Variant, string> = {
  solid: "border-ink bg-ink text-paper shadow-brutal-sm hover:bg-smoke hover:shadow-brutal",
  primary: "border-ink bg-accent text-ink shadow-brutal-sm hover:shadow-brutal",
  outline: "border-ink bg-paper text-ink shadow-brutal-sm hover:bg-ink hover:text-paper hover:shadow-brutal",
  outlinePaper: "border-paper bg-transparent text-paper hover:bg-paper hover:text-ink",
  accent: "border-ink bg-accent text-ink shadow-brutal-sm hover:shadow-brutal",
  ghost: "border-transparent bg-transparent text-current hover:bg-black/5",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-xs",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

export function BrutalButton({
  variant = "solid",
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

export function BrutalButtonLink({
  variant = "solid",
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

/** Square brutalist icon button — carousel controls, toggles. */
export function BrutalIconButton({
  className = "",
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex size-11 shrink-0 items-center justify-center border-2 border-ink bg-paper transition-colors duration-150 hover:bg-ink hover:text-paper ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

/** Backward-compatible soft aliases (legacy imports). */
export const SoftButton = BrutalButton;
export const SoftButtonLink = BrutalButtonLink;
export const SoftIconButton = BrutalIconButton;
