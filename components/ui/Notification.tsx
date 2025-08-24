import { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  show: boolean;
  onConfirm?: (response: boolean) => void;
}

export const Notification = ({ message, type, onClose, show, onConfirm}: NotificationProps) => {
  if (!show) return null;

    return (
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-xl border p-4 max-w-sm z-50">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{message}</p>
            {onConfirm && (
              <div className="mt-3 flex space-x-2">
                <button
                  onClick={() => onConfirm(true)}
                  className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                >
                  Yes
                </button>
                <button
                  onClick={() => onConfirm(false)}
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                >
                  No
                </button>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="ml-4 text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>
      </div>
    );
};