import React, { ReactNode } from 'react';
import { Info, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

type CalloutType = 'info' | 'warning' | 'danger' | 'success';

interface CalloutProps {
  type: CalloutType;
  title: string;
  children: ReactNode;
}

const calloutConfig: Record<
  CalloutType,
  { bg: string; border: string; iconColor: string; Icon: React.ElementType }
> = {
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-500',
    iconColor: 'text-blue-500',
    Icon: Info,
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-500',
    iconColor: 'text-yellow-500',
    Icon: AlertTriangle,
  },
  danger: {
    bg: 'bg-red-50',
    border: 'border-red-500',
    iconColor: 'text-red-500',
    Icon: AlertCircle,
  },
  success: {
    bg: 'bg-green-50',
    border: 'border-green-500',
    iconColor: 'text-green-500',
    Icon: CheckCircle,
  },
};

const Callout: React.FC<CalloutProps> = ({ type, title, children }) => {
  const { bg, border, iconColor, Icon } = calloutConfig[type];

  return (
    <div className={`${bg} border-l-4 ${border} rounded-r-lg p-4`}>
      <div className="flex items-start gap-3">
        <Icon className={`${iconColor} mt-0.5 h-5 w-5 flex-shrink-0`} />
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
          <div className="mt-1 text-sm text-gray-700">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Callout;
