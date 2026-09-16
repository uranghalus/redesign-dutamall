import localFont from "next/font/local";

/** League Gothic — tall, compressed, uppercase display face (LWT signature). */
export const leagueGothic = localFont({
  src: "./fonts/LeagueGothic.woff2",
  variable: "--font-league",
  display: "swap",
});

/** SUIT — geometric sans for body, UI and navigation (the only LWT text face). */
export const suit = localFont({
  src: [
    { path: "./fonts/SUIT-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/SUIT-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/SUIT-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/SUIT-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-suit",
  display: "swap",
});
