import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import PremiumSelect from './ui/PremiumSelect';
import { SIZE_OPTIONS, PRESSURE_CLASS_OPTIONS } from '../data/rfqOptions';

interface RequiredDetailsProps {
  size: string;
  otherSize: string;
  pressureClass: string;
  otherPressureClass: string;
  quantity: number | '';
  onSizeChange: (v: string) => void;
  onOtherSizeChange: (v: string) => void;
  onPressureClassChange: (v: string) => void;
  onOtherPressureClassChange: (v: string) => void;
  onQuantityChange: (v: number | '') => void;
  errors: {
    size?: string;
    otherSize?: string;
    pressureClass?: string;
    otherPressureClass?: string;
    quantity?: string;
  };
}

export default function RequiredDetails({
  size,
  otherSize,
  pressureClass,
  otherPressureClass,
  quantity,
  onSizeChange,
  onOtherSizeChange,
  onPressureClassChange,
  onOtherPressureClassChange,
  onQuantityChange,
  errors,
}: RequiredDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Size */}
<div className="min-w-0 space-y-2">
          <PremiumSelect
            id="size"
            label="Size"
            required
            options={SIZE_OPTIONS}
            value={size}
            onChange={onSizeChange}
            placeholder="Select size..."
            error={errors.size}
          />
          {size === 'other' && (
            <div>
              <label htmlFor="otherSize" className="sr-only">Specify size in inches or millimetres</label>
              <input id="otherSize" value={otherSize} onChange={(e) => onOtherSizeChange(e.target.value)}
                placeholder="Specify size (inch/mm)" aria-invalid={!!errors.otherSize}
                aria-describedby={errors.otherSize ? 'otherSize-error' : undefined}
                className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm focus:border-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300" />
              {errors.otherSize && <p id="otherSize-error" role="alert" className="mt-1 text-xs text-red-600">{errors.otherSize}</p>}
            </div>
          )}
        </div>

        {/* Pressure Class */}
<div className="min-w-0 space-y-2">
          <PremiumSelect
            id="pressureClass"
            label="Pressure Class"
            required
            options={PRESSURE_CLASS_OPTIONS}
            value={pressureClass}
            onChange={onPressureClassChange}
            placeholder="Select class..."
            error={errors.pressureClass}
          />
          {pressureClass === 'other' && (
            <div>
              <label htmlFor="otherPressureClass" className="sr-only">Specify pressure class</label>
              <input id="otherPressureClass" value={otherPressureClass} onChange={(e) => onOtherPressureClassChange(e.target.value)}
                placeholder="Specify pressure class" aria-invalid={!!errors.otherPressureClass}
                aria-describedby={errors.otherPressureClass ? 'otherPressureClass-error' : undefined}
                className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm focus:border-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300" />
              {errors.otherPressureClass && <p id="otherPressureClass-error" role="alert" className="mt-1 text-xs text-red-600">{errors.otherPressureClass}</p>}
            </div>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1.5">
            Quantity <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="quantity"
              type="number"
              min={1}
              step={1}
              value={quantity}
              onChange={(e) => {
                const raw = e.target.value;
                if (raw === '' || raw === null) {
                  onQuantityChange('');
                } else {
                  if (/^\d+$/.test(raw) && Number.isSafeInteger(Number(raw))) {
                    onQuantityChange(Number(raw));
                  }
                }
              }}
              placeholder="e.g. 10"
              className={cn(
                'w-full pr-12 pl-3.5 py-2.5 text-sm rounded-lg border transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 shadow-sm',
                errors.quantity
                  ? 'border-red-400 bg-red-50/50 focus:border-red-400'
                  : 'border-gray-200 bg-white hover:border-gray-300 focus:border-[#2563eb] focus:shadow-md focus:shadow-blue-100/50'
              )}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 pointer-events-none">
              Nos.
            </div>
          </div>
          {errors.quantity && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-xs text-red-500 font-medium"
            >
              {errors.quantity}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
