
import { IconType } from "react-icons";
import { ReactFragment, ReactNode } from 'react';


export type ButtonProps = {
  Label?: string;
  isActive?: boolean;
  onClick?: ()=> void;
  halfWidth?: boolean; 
  fullWidth?: boolean;
  Width?: string;
  setIcon? : JSX.Element | string ;
  isLoading?: boolean;
}

export type ButtonTypeProp = ButtonProps & {
  type: "primary" | "secondary" | "primary-rounded" | "secondary-rounded";
}
