import { FormEvent } from 'react';
export interface RadioProps {
  label: string;
  name: string;
  onClick?: (e: FormEvent<HTMLInputElement> )=> void;
}