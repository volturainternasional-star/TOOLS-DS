export function FaIcon({ name, className }: { name: string; className?: string }) {
  const cls = name.includes("fa-brands") ? name : `fa-solid ${name}`;
  return <i className={`${cls} ${className ?? ""}`} aria-hidden="true" />;
}
