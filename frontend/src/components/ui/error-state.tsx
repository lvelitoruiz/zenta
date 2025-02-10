import { Icon } from './icon';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

interface ErrorStateProps {
  message?: string;
}

export const ErrorState = ({ message = 'Error obteniendo información' }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-gray-400 bg-gray-800 rounded-lg">
      <Icon icon={faExclamationTriangle} className="text-red-400 mb-2" size="2x" />
      <p className="text-center">{message}</p>
    </div>
  );
}; 