import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cn } from '@/lib/utils';
import { IconProps } from '@/types/ui';

export const Icon = ({ icon, className, size = 'sm', ...props }: IconProps) => {
  return (
    <FontAwesomeIcon 
      icon={icon}
      className={cn("", className)}
      size={size}
      {...props}
    />
  );
}; 