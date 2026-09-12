"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { promos } from "@/app/data/home";

const AUTOPLAY_MS = 5000;

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [held, setHeld] = useState(false);
  const count = promos.length;
  const suspended = paused || held || count < 2;
  const go = useCallback((dir: 1 | -1) => setActive((a) => (a + dir + count) % count), [count]);
  const touchStart = useRef<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (suspended) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % count), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [active, suspended, count]);

  // mouse parallax — subtle crimson/gold orbit
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty("--mx", String(x));
      el.style.setProperty("--my", String(y));
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  const promo = promos[active];
  const hold = {
    onMouseEnter: () => setHeld(true),
    onMouseLeave: () => setHeld(false),
    onFocusCapture: () => setHeld(true),
    onBlurCapture: () => setHeld(false),
  };

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-crimson/10 bg-spatial">
      {/* PRD depth — crimson + gold + warm */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-1/4 top-[-18%] h-[72%] w-[78%] rounded-full bg-crimson/[0.10] blur-[120px]" />
        <div className="absolute -right-1/4 bottom-[-12%] h-[62%] w-[68%] rounded-full bg-gold/[0.07] blur-[140px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-spatial" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_28%,rgba(216,43,30,0.08),transparent_55%)]" />
        {/* banjar pattern — ultra subtle */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `repeating-linear-gradient(45deg, #d82b1e 0 1px, transparent 1px 28px)` }} />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-14 md:pb-20 md:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8">
        {/* left */}
        <div>
          <p className="inline-flex items-center gap-2.5 rounded-full bg-crimson px-3.5 py-1.5 text-[10px] font-bold tracking-[0.16em] text-white">
            <span className="h-1.5 w-1.5 animate-[pulse-live_2s_ease-in-out_infinite] rounded-full bg-white" />
            DUTA MALL BANJARMASIN · EST. KALIMANTAN SELATAN
          </p>
          <h1 id="hero-title" className="mt-6 text-balance text-5xl font-extrabold leading-[0.95] tracking-tight text-white md:text-[56px]">
            Gawi Sabumi
            <br />
            <span className="font-light tracking-tight text-white">Kawa Manuntung</span>
            <span className="ml-2 inline-block h-2 w-2 translate-y-[-0.35em] rounded-full bg-crimson md:h-2.5 md:w-2.5" aria-hidden />
          </h1>
          <p className="mt-5 max-w-xl text-sm font-normal leading-relaxed text-white/60 md:text-[15px]">
            Belanja, nonton Cinema XXI, dan menginap di FUGO Hotel — dalam satu destinasi kebanggaan Kalimantan Selatan.
            <span className="text-white/85"> Promo & sorotan terbaru</span> di ujung jari Anda.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#lokasi" className="inline-flex items-center gap-2 rounded-full bg-crimson px-6 py-3 text-xs font-bold tracking-wide text-white hover:bg-crimson-dark crimson-glow transition-colors">
              Plan Visit
              <span aria-hidden>→</span>
            </a>
            <a href="#fugo" className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold-soft px-6 py-3 text-xs font-semibold tracking-wide text-white backdrop-blur hover:bg-gold hover:text-white hover:border-gold transition-colors">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Pesan Kamar
            </a>
          </div>

          {/* promo controls — interactive */}
          <div className="mt-8 flex flex-wrap items-center gap-3" {...hold}>
            <div className="flex items-center gap-1.5">
              <button type="button" onClick={() => go(-1)} aria-label="Sebelumnya" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white backdrop-blur hover:bg-white hover:text-spatial transition-colors">
                ‹
              </button>
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-pressed={paused}
                aria-label={paused ? "Putar otomatis" : "Jeda otomatis"}
                className={`rounded-full border px-3 py-1.5 text-[10px] font-bold tracking-wide transition-colors ${paused ? "bg-gold border-gold text-white" : "border-white/10 bg-white/[0.06] text-white hover:bg-white hover:text-spatial"}`}
              >
                {paused ? "Putar" : "Jeda"}
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Berikutnya" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white backdrop-blur hover:bg-white hover:text-spatial transition-colors">
                ›
              </button>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur" role="group" aria-label="Pilih promo">
              {promos.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Promo ${i + 1}: ${promos[i].title}`}
                  aria-current={active === i}
                  className={`h-1.5 rounded-full transition-all ${active === i ? "w-7 bg-crimson" : "w-3.5 bg-white/20 hover:bg-white/40"}`}
                />
              ))}
            </div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-white/30" aria-hidden>
              {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </p>
          </div>
          <div className="mt-4 h-1 w-full max-w-sm overflow-hidden rounded-full bg-white/10" aria-hidden>
            <div
              key={`${active}-${suspended}`}
              className="h-full bg-crimson"
              style={{ width: suspended ? "100%" : undefined, animation: suspended ? undefined : `hero-prog ${AUTOPLAY_MS}ms linear forwards` }}
            />
          </div>
          <style>{`@keyframes hero-prog{from{width:0}to{width:100%}}`}</style>
        </div>

        {/* right: interactive glass — draggable + keyboard */}
        <div
          ref={cardRef}
          role="group"
          aria-label="Pratinjau visual — geser untuk ganti sorotan"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") go(-1);
            if (e.key === "ArrowRight") go(1);
          }}
          onTouchStart={(e) => (touchStart.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchStart.current === null) return;
            const dx = e.changedTouches[0].clientX - touchStart.current;
            if (dx < -40) go(1);
            if (dx > 40) go(-1);
            touchStart.current = null;
          }}
          className="group/card relative mx-auto w-full max-w-[520px] select-none lg:ml-auto"
          style={{ transform: `perspective(900px) rotateY(calc(var(--mx,0)*4deg)) rotateX(calc(var(--my,0)*-4deg))` }}
          {...hold}
        >
          <div aria-hidden className="absolute -inset-5 -z-10 rounded-[36px] bg-gradient-to-br from-crimson/[0.10] via-transparent to-gold/[0.08] blur-[22px] transition-opacity group-focus-within/card:opacity-80" />

          <div className="iridescent relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.02] to-transparent p-5 backdrop-blur-[20px] shadow-[0_16px_48px_rgba(0,0,0,0.45)] md:p-6">
            {/* window chrome — PRD */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-crimson" />
                <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-crimson px-2.5 py-1 text-[10px] font-bold tracking-[0.16em] text-white">
                <span className="h-1.5 w-1.5 animate-[pulse-live_1.4s_ease-in-out_infinite] rounded-full bg-white" />
                LIVE
              </span>
            </div>

            {/* main viewport — swipeable */}
            <div className="relative mt-5 overflow-hidden rounded-[20px] border border-crimson/10 bg-gradient-to-br from-white/[0.06] via-transparent to-gold/[0.04] p-5">
              <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-crimson/[0.10] blur-[28px]" />
              <p className="text-[10px] font-bold tracking-[0.22em] text-gold">NO. {String(active + 1).padStart(2, "0")} · SOROTAN</p>
              <h3 className="mt-2 text-balance text-2xl font-bold tracking-tight text-white md:text-[26px]">{promo.title}</h3>
              <p className="mt-1.5 text-sm font-normal leading-relaxed text-white/60">{promo.desc}</p>

              <div className="mt-5 space-y-2">
                {[
                  ["Cinema XXI", "Dolby Atmos · D-BOX", "bg-crimson"],
                  ["FUGO Hotel", "180 kamar · Ballroom 300 pax", "bg-gold"],
                  ["200+ Tenant", "Fashion · F&B · Wellness", "bg-white/15"],
                ].map(([k, v, dot]) => (
                  <div key={k} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur transition-transform hover:translate-x-0.5">
                    <span className="flex items-center gap-2 text-xs font-semibold text-white">
                      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                      {k}
                    </span>
                    <span className="text-[11px] font-medium text-white/45">{v}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2 text-[10px] font-medium tracking-wide text-white/30">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-px w-6 bg-white/15" />
                  Geser atau pakai ← →
                </span>
                <span className="ml-auto hidden items-center gap-1 text-gold md:inline-flex">
                  <span className="h-1 w-1 rounded-full bg-gold" />
                  Promo {active + 1} dari {count}
                </span>
              </div>
            </div>

            {/* floating badges — gold + crimson */}
            <div className="absolute -right-2 top-10 hidden -rotate-1 md:block">
              <div className="rounded-2xl border border-gold/20 bg-[#1a1a20] px-3 py-2 text-[11px] font-bold tracking-wide text-white shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
                <span className="text-gold">★ 4.9</span> <span className="font-normal text-white/50">· 2.5k ulasan</span>
              </div>
            </div>
            <div className="absolute -left-2 bottom-10 hidden rotate-1 md:block">
              <div className="rounded-full border border-crimson/20 bg-crimson px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-white shadow-[0_8px_24px_rgba(216,43,30,0.25)]">OPEN DAILY 10–22 WITA</div>
            </div>
          </div>

          <p className="mt-3 text-center text-[10px] font-medium tracking-[0.16em] text-white/25">← Geser kartu · Klik dot untuk loncat →</p>
        </div>
      </div>
    </section>
  );
}
