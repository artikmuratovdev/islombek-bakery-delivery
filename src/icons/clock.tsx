import { SVGProps } from "react";

export const Clock = (props: SVGProps<SVGSVGElement>) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
    <path
      d="M13.8334 8.83333C13.8334 12.0533 11.22 14.6667 8.00002 14.6667C4.78002 14.6667 2.16669 12.0533 2.16669 8.83333C2.16669 5.61333 4.78002 3 8.00002 3C11.22 3 13.8334 5.61333 13.8334 8.83333Z"
      stroke="#1C2C57"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 5.33398V8.66732"
      stroke="#1C2C57"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 1.33398H10"
      stroke="#1C2C57"
      strokeWidth="1.5"
      stroke-miterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
