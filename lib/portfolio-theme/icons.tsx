import * as React from 'react';

/**
 * SVG icon set — replaces emoji icons per ui-ux-pro-max checklist
 * ("No emojis as icons — use SVG"). Stroke-based, inherits color via `currentColor`.
 */

type IconProps = React.SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={props.width ?? 16}
      height={props.height ?? 16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

export const MarketIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M3 21h18" />
    <path d="M5 21V7l8-4 8 4v14" />
    <path d="M9 21v-6h6v6" />
  </Icon>
);

export const TrendIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </Icon>
);

export const ChartIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M3 3v18h18" />
    <path d="M18 17V9" />
    <path d="M13 17V5" />
    <path d="M8 17v-3" />
  </Icon>
);

export const CheckCircleIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M9 12l2 2 4-4" />
    <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
  </Icon>
);

export const CropIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 2v6M5 9l7-4 7 4-7 4-7-4zM5 9v8l7 4 7-4V9" />
  </Icon>
);

export const PinIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 21s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12z" />
    <circle cx="12" cy="9" r="2.5" />
  </Icon>
);

export const ArrowUpRightIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M3 17l6-6 4 4 8-8M21 7v6M21 7h-6" />
  </Icon>
);
