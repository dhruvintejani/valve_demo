import { Info } from 'lucide-react';

interface DemoNoticeProps {
  variant?: 'form' | 'confirmation';
  className?: string;
}

export default function DemoNotice({ variant = 'form', className = '' }: DemoNoticeProps) {
  if (variant === 'confirmation') {
    return (
      <div className={`flex items-center gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 ${className}`}>
        <Info size={16} className="text-amber-600 flex-shrink-0" />
        <p className="text-amber-800 text-sm font-medium">
          <span className="font-bold">Interactive Demo</span> — No actual request has been sent to Evolve Industries.
        </p>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
      <p className="text-xs text-gray-400">
        <span className="font-semibold text-gray-500">Interactive Demo</span> — No actual RFQ will be sent to Evolve Industries.
      </p>
    </div>
  );
}
