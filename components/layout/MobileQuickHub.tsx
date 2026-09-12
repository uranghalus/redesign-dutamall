const items = [
  { label: "Cinema", href: "#cinema" },
  { label: "Tenant", href: "#tenant" },
  { label: "FUGO", href: "#fugo" },
  { label: "Food", href: "#tenant" },
  { label: "Fasilitas", href: "#fasilitas" },
];
export default function MobileQuickHub() {
  return (
    <nav aria-label="Akses cepat duplikat" className="hidden">
      <ul>
        {items.map((i) => (
          <li key={i.label}>
            <a href={i.href}>{i.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
