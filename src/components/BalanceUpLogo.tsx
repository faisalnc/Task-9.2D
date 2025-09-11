// components/BalanceUpLogo.tsx
export default function BalanceUpLogo({ className = "h-10 w-10 text-emerald-600" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="currentColor"
      className={className}
    >
      {/* Lowercase b base */}
      <path d="M20 10v44h10V36h4c8 0 14-6 14-13s-6-13-14-13H20zM30 26V16h4c4 0 6 2 6 7s-2 7-6 7h-4z" />

      {/* Upward arrow inside the b */}
      <path
        d="M32 46l10-10h-6V22h-8v14h-6l10 10z"
        fill="currentColor"
      />
    </svg>
  );
}
