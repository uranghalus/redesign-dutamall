import { IconClock, IconPhone, IconPin } from "@/components/ui/Icons";

const ticker = [
  "OPEN DAILY 10:00–22:00 WITA",
  "FUGO HOTEL & SUITES — BOOK DIRECT",
  "CINEMA XXI · THE PREMIERE · D-BOX",
  "PARKIR 2.500+ MOBIL & MOTOR",
  "GAWI SABUMI KAWA MANUNTUNG",
  "JL. AHMAD YANI KM 2, BANJARMASIN",
];

export default function TopBar() {
  return (
    <div className="border-b-2 border-ink bg-ink text-paper">
      {/* status row */}
      <div className="flex items-center justify-between gap-4 px-4 py-1.5 md:px-10">
        <p className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider">
          <IconClock size={13} />
          <span className="hidden sm:inline">Open Daily</span> 10:00–22:00 WITA
        </p>
        <div className="flex items-center gap-4 font-mono text-[11px] font-bold uppercase tracking-wider">
          <a href="tel:+625113278888" className="flex items-center gap-2 px-1 py-0.5 underline-offset-4 hover:text-accent hover:underline">
            <IconPhone size={13} />
            (0511) 327-8888
          </a>
          <a
            href="#location"
            className="hidden items-center gap-2 px-1 py-0.5 underline-offset-4 hover:text-accent hover:underline md:flex"
          >
            <IconPin size={13} />
            Jl. Ahmad Yani KM 2
          </a>
        </div>
      </div>

      {/* scrolling information band */}
      <div className="marquee border-t border-paper/20 bg-accent py-1 text-ink">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
              {ticker.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="flex items-center gap-3 whitespace-nowrap px-6 font-mono text-xs font-bold uppercase tracking-widest"
                >
                  {item}
                  <span aria-hidden="true" className="inline-block size-2 bg-ink" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
