import type { ReactNode, SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

function Svg({ size = 20, children, ...rest }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

/* ---- wayfinding & facilities ---- */

export const IconInfo = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4" y="4" width="16" height="16" />
    <path d="M12 10v8M12 6.5v1.5" />
  </Svg>
);

export const IconHotel = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 20V6l8-2v16M12 20h8V10l-8-2" />
    <path d="M7 10h2M7 14h2M16 12h1M16 16h1" />
  </Svg>
);

export const IconAtm = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="4" width="18" height="7" />
    <path d="M6 14v6M10 14h8v6H10z" />
  </Svg>
);

export const IconCar = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 15l2-6h12l2 6v4h-3v-2H7v2H4z" />
    <path d="M7 15h.5M16.5 15h.5" />
  </Svg>
);

export const IconAccess = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="5" r="1.5" />
    <path d="M12 8v6l4 6M12 11H7M12 14l-4 6" />
  </Svg>
);

export const IconClinic = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4" y="5" width="16" height="15" />
    <path d="M9 3h6v2H9zM12 10v6M9 13h6" />
  </Svg>
);

export const IconBaby = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="7" r="3" />
    <path d="M6 21c0-3.3 2.7-6 6-6s6 2.7 6 6" />
  </Svg>
);

export const IconMusholla = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 20v-8a8 8 0 0 1 16 0v8" />
    <path d="M4 20h16M10 20v-4a2 2 0 0 1 4 0v4" />
  </Svg>
);

export const IconToilet = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 3v8M5 11v3h4v-3" />
    <path d="M16 3a2 2 0 1 0 0.001 0M14 11h4l-1 9h-2z" />
  </Svg>
);

export const IconLounge = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 12V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
    <path d="M4 12a2 2 0 0 0-2 2v3h20v-3a2 2 0 0 0-2-2 2 2 0 0 0-2 2v1H6v-1a2 2 0 0 0-2-2zM6 17v3M18 17v3" />
  </Svg>
);

export const IconSmoking = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="14" width="14" height="4" />
    <path d="M20 14v4M17 10c0-2 2-2 2-4M13 10c0-2 2-2 2-4" />
  </Svg>
);

/* ---- commerce & action ---- */

export const IconTicket = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 8V5h18v3a2 2 0 0 0 0 8v3H3v-3a2 2 0 0 0 0-8z" />
    <path d="M14 5v14" strokeDasharray="2 3" />
  </Svg>
);

export const IconBed = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 18v-8h13a4 4 0 0 1 4 4v4M3 14h18M3 10V6M6 10a2 2 0 1 1 4 0" />
  </Svg>
);

export const IconPin = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z" />
    <rect x="9.5" y="7.5" width="5" height="5" />
  </Svg>
);

export const IconPhone = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </Svg>
);

export const IconClock = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4" y="4" width="16" height="16" />
    <path d="M12 8v4l3 2" />
  </Svg>
);

export const IconSearch = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4" y="4" width="11" height="11" />
    <path d="M15 15l5 5" />
  </Svg>
);

export const IconArrow = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 12h15M13 5l7 7-7 7" />
  </Svg>
);

export const IconRoute = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="6" cy="19" r="2" />
    <circle cx="18" cy="5" r="2" />
    <path d="M8 19h6a4 4 0 0 0 0-8h-4a4 4 0 0 1 0-8" strokeDasharray="3 2" />
  </Svg>
);

export const IconStar = (p: IconProps) => (
  <Svg {...p} fill="currentColor" stroke="none">
    <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17l-6.1 3.6 1.4-6.8L2.2 9.1l6.9-.8z" />
  </Svg>
);

export const IconPlay = (p: IconProps) => (
  <Svg {...p} fill="currentColor" stroke="none">
    <path d="M7 4l13 8-13 8z" />
  </Svg>
);

export const IconMenu = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </Svg>
);

export const IconClose = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 5l14 14M19 5L5 19" />
  </Svg>
);

export const IconCalendar = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4" y="6" width="16" height="14" />
    <path d="M4 10h16M8 3v5M16 3v5" />
  </Svg>
);

export const IconFilm = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="4" width="18" height="16" />
    <path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4" />
  </Svg>
);
