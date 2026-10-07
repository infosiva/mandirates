// Brand logo: mark + wordmark. Used in navbar/header; same mark as app/icon.svg.
export function Logo({ size = 28, showText = true }: { size?: number; showText?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2" aria-label="MandiRates">
      <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="16" fill="var(--accent, #3f8f2a)" />
        <path d="M14 50V38M27 50V30M40 50V20M12 26l12-10 9 7 17-15" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
      {showText && (
        <span style={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
          Mandi<span style={{ color: "var(--accent, #3f8f2a)" }}>Rates</span>
        </span>
      )}
    </span>
  );
}
export default Logo;
