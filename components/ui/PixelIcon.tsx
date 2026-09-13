/** 2×2 pixel block — the system's smallest decorative unit. */
export function PixelSquare({
  scale = 2,
  className = "",
}: {
  scale?: number;
  className?: string;
}) {
  const size = scale * 8;
  return (
    <span
      aria-hidden="true"
      className={`inline-grid shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      <span className="bg-ink" />
      <span className="bg-accent" />
      <span className="bg-accent" />
      <span className="bg-ink" />
    </span>
  );
}
