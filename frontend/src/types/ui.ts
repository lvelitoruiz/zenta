import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface IconProps {
  icon: IconDefinition;
  className?: string;
  size?: 'xs' | 'sm' | 'lg' | '1x' | '2x';
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: IconDefinition;
  iconPosition?: 'left' | 'right';
}

export interface ExportButtonProps<T> {
  data: T[];
  filename?: string;
  className?: string;
} 