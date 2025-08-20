import { ReactNode } from "react";

export interface IconProps {
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
  viewBox?: string;
  fill?: string;
}
