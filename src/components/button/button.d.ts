import * as React from 'react';
export interface ButtonProps {
  as?: 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'darkBackground';
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  subtext?: string;
  children?: React.ReactNode;
  styleOverride?: {
    root?: () => object | object;
    icon?: () => object | object;
   };
}
declare const Button: React.ComponentType<ButtonProps & React.HTMLProps<HTMLButtonElement>>;
export default Button;
