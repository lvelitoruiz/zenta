import { cn } from "@/lib/utils";
import { Icon } from "./icon";
import { ButtonProps } from '@/types/ui';

export const Button = ({
  className,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  children,
  ...props
}: ButtonProps) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    outline: 'border border-gray-300 hover:bg-gray-100 text-gray-700',
    ghost: 'hover:bg-gray-100 text-gray-700'
  };

  const sizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <Icon icon={icon} className="mr-2" size="sm" />
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <Icon icon={icon} className="ml-2" size="sm" />
      )}
    </button>
  );
}; 