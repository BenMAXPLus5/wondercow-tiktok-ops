import React, { ReactNode } from 'react';

type KPIStatus = 'good' | 'warning' | 'danger' | 'neutral';

interface KPICardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  status?: KPIStatus;
  icon?: ReactNode;
}

const statusStyles: Record<KPIStatus, { dot: string; ring: string }> = {
  good: {
    dot: 'bg-green-500',
    ring: 'ring-green-500/20',
  },
  warning: {
    dot: 'bg-yellow-500',
    ring: 'ring-yellow-500/20',
  },
  danger: {
    dot: 'bg-red-500',
    ring: 'ring-red-500/20',
  },
  neutral: {
    dot: 'bg-gray-400',
    ring: 'ring-gray-400/20',
  },
};

const KPICard: React.FC<KPICardProps> = ({
  label,
  value,
  subtitle,
  status,
  icon,
}) => {
  const statusStyle = status ? statusStyles[status] : null;

  return (
    <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-gray-200">
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {statusStyle && (
              <span
                className={`inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full ${statusStyle.dot} ring-4 ${statusStyle.ring}`}
              />
            )}
            <p className="truncate text-sm font-medium text-gray-500">
              {label}
            </p>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && (
            <p className="mt-1 text-xs text-gray-500">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="ml-3 flex-shrink-0 text-gray-400">{icon}</div>
        )}
      </div>
    </div>
  );
};

export default KPICard;
