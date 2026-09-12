import * as React from "react";

export interface TileItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  active?: boolean;
}

export interface IconTileRowProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TileItem[];
  labelTile?: string; // first cell surface-inverse (black) per design.md infoCards
}

/**
 * IconTile — design.md infoCards
 * - flat monochrome icon tiles, tanpa shadow, tanpa radius (radius.none 0px)
 * - single-color line/glyph icons, layout horizontal row equal-width cells
 * - background: surface-inverse untuk label tile, surface untuk item tiles
 * - SUIT 14px 700 -0.28px untuk label
 * - spacing scale, motion fast + easing untuk hover/active
 */
export function IconTileRow({ items, labelTile, className = "", ...props }: IconTileRowProps) {
  return (
    <div className={`flex w-full overflow-hidden border border-text/10 rounded-none shadow-none ${className}`} {...props}>
      {labelTile && (
        <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-[5px] bg-surface-inverse px-[8px] py-[11px] text-text-inverse">
          <span className="font-[SUIT] text-[14px] font-bold leading-none tracking-[-0.28px] uppercase text-center">{labelTile}</span>
        </div>
      )}
      {items.map((it, i) => {
        const isLink = !!it.href;
        return isLink ? (
          <a
            key={i}
            href={it.href}
            className={
              "flex min-w-0 flex-1 flex-col items-center justify-center gap-[5px] px-[8px] py-[11px] border-l border-text/10 first:border-l-0 " +
              "bg-surface text-text rounded-none shadow-none " +
              "transition-colors duration-[200ms] ease-[cubic-bezier(0.19,1,0.22,1)] " +
              "hover:bg-text hover:text-text-inverse focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset " +
              (it.active ? "bg-text text-text-inverse " : "")
            }
          >
            <span aria-hidden className="flex h-[15px] w-[15px] items-center justify-center text-[14px] leading-none [&_svg]:h-[14px] [&_svg]:w-[14px] [&_svg]:stroke-current">
              {it.icon}
            </span>
            <span className="font-[SUIT] text-[14px] font-bold leading-none tracking-[-0.28px] text-center">{it.label}</span>
          </a>
        ) : (
          <div
            key={i}
            className={
              "flex min-w-0 flex-1 flex-col items-center justify-center gap-[5px] px-[8px] py-[11px] border-l border-text/10 first:border-l-0 " +
              "bg-surface text-text rounded-none shadow-none"
            }
          >
            <span aria-hidden className="flex h-[15px] w-[15px] items-center justify-center text-[14px] leading-none">
              {it.icon}
            </span>
            <span className="font-[SUIT] text-[14px] font-bold leading-none tracking-[-0.28px] text-center">{it.label}</span>
          </div>
        );
      })}
    </div>
  );
}

/** Single tile untuk penggunaan bebas */
export function IconTile({ icon, label, active, className = "", ...props }: TileItem & { className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={
        "flex flex-col items-center justify-center gap-[5px] rounded-none border border-text/10 bg-surface px-[8px] py-[11px] shadow-none " +
        "transition-colors duration-[200ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:bg-text hover:text-text-inverse " +
        (active ? "bg-text text-text-inverse " : "text-text ") +
        className
      }
      {...props}
    >
      <span aria-hidden className="flex h-[15px] w-[15px] items-center justify-center text-[14px] leading-none">
        {icon}
      </span>
      <span className="font-[SUIT] text-[14px] font-bold leading-none tracking-[-0.28px] text-center">{label}</span>
    </div>
  );
}
