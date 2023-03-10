
import { IconType } from "react-icons";
import { ReactFragment, ReactNode, FormEvent } from 'react';


export type ButtonProps = {
  Label: string;
  isActive?: boolean;
  onClick?: (e:FormEvent<HTMLButtonElement>)=> void;
  halfWidth?: boolean; 
  fullWidth?: boolean;
  Width?: string;
  setIcon? : JSX.Element | string ;
  icon?: string;
  altText?: string
  isLoading?: boolean;
  className?: string;
}

export type ButtonTypeProp = ButtonProps & {
  type: "primary" | "secondary" | "primary-rounded" | "secondary-rounded";
}
