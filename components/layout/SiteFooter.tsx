import { interpolate } from "@/app/i18n/format";
import type { Dictionary } from "@/app/i18n/dictionaries";

/**
 * Footer — minimal colophon: contact + social (left), corporate governance
 * (right), one quiet legal line. Stripped per client markup (2026-09-21):
 * the monolith identity block, the explore link row, and the Dispatch
 * newsletter were all marked for removal; governance moved into the
 * dispatch cell's place.
 */
export default function SiteFooter({ dict }: { dict: Dictionary }) {
  const f = dict.footer;
  const socialHrefs = ["#top", "#top", "#top"] as const;

  return (
    <footer className="bg-ink text-paper">
      <div className="px-4 pb-10 pt-12 md:px-10 md:pb-12 md:pt-16">
        {/* contact + governance row */}
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <a
              href="tel:+625113278888"
              className="font-sans text-lg font-semibold tracking-wide text-paper/85 transition-colors hover:text-brass-soft"
            >
              {f.phone}
            </a>
            <p className="mt-1.5 font-sans text-[13px] text-paper/55">{f.hours}</p>
            <ul className="mt-5 flex gap-5">
              {f.social.map((label, i) => (
                <li key={label}>
                  <a
                    href={socialHrefs[i]}
                    className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-paper/60 transition-colors hover:text-brass-soft"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pb-1 lg:text-right">
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-paper/45">
              {f.governance}
            </p>
            <p className="mt-2 font-sans text-xl font-semibold uppercase tracking-wide text-paper/85">
              {f.member}
            </p>
          </div>
        </div>

        {/* legal — a single quiet line */}
        <div className="mt-12 border-t border-paper/15 pt-5">
          <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-paper/40">
            {interpolate(f.legal, { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
