'use client';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cn } from '@/lib/utils';
import { IconProps } from '@/types/ui';

export const Icon = ({ icon, className, size = '1x' }: IconProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <span className="w-4 h-4" />;
  }

  return (
    <FontAwesomeIcon 
      icon={icon} 
      className={cn('transition-all', className)}
      size={size}
    />
  );
}; 