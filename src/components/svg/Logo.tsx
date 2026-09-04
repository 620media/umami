import type { SVGProps } from 'react';

// 620 Media brand mark (matches /favicon.svg)
const SvgLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 32 32" {...props}>
    <text
      x="16"
      y="24"
      fontFamily="Georgia, serif"
      fontSize="20"
      fontWeight="700"
      fill="#E05C2A"
      textAnchor="middle"
      letterSpacing="-1"
    >
      6_
    </text>
  </svg>
);
export default SvgLogo;
