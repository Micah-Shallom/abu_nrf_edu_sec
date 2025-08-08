import { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  show: boolean;
}

export const Notification = ({ message, type, onClose, show }: NotificationProps) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const iconMap = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />
  };

  const bgColorMap = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200'
  };

  return (
    <div className={`fixed top-4 right-4 z-50 border rounded-md p-4 ${bgColorMap[type]} shadow-lg`}>
      <div className="flex items-start space-x-3">
        {iconMap[type]}
        <div>
          <p className="font-medium text-gray-900">{message}</p>
        </div>
      </div>
    </div>
  );
};