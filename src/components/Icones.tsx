type Props = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function IconeAlvo({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
      <path d="M12 12 20 4" />
      <path d="M16 4h4v4" />
    </svg>
  );
}

export function IconeOlho({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function IconeDiamante({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M6 3h12l4 6-10 12L2 9Z" />
      <path d="M2 9h20" />
      <path d="m9 3-2 6 5 12 5-12-2-6" />
    </svg>
  );
}
