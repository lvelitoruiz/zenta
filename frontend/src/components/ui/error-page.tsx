import { Icon } from './icon';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

interface ErrorPageProps {
  message?: string;
  description?: string;
}

export const ErrorPage = ({ 
  message = 'Error de conexión', 
  description = 'No se pudo establecer conexión con el servidor. Por favor, intenta nuevamente más tarde.'
}: ErrorPageProps) => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <Icon icon={faExclamationTriangle} className="text-red-400 text-6xl" />
        <h1 className="text-2xl font-bold text-white">{message}</h1>
        <p className="text-gray-400 max-w-md">{description}</p>
      </div>
    </div>
  );
}; 