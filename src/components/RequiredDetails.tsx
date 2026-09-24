import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import PremiumSelect from './ui/PremiumSelect';
import { SIZE_OPTIONS, PRESSURE_CLASS_OPTIONS } from '../data/rfqOptions';

interface RequiredDetailsProps {
  size: string;
  pressureClass: string;
  quantity: number | '';
  onSizeChange: (v: string) => void;
  onPressureClassChange: (v: string) => void;
  onQuantityChange: (v: number | '') => void;
  errors: {
    size?: string;
    pressureClass?: string;
    quantity?: string;
  };
}

export default function RequiredDetails({
  size,
  pressureClass,
  quantity,
  onSizeChange,
  onPressureClassChange,
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

        {/* Pressure Class */}
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
                  const parsed = parseInt(raw, 10);
                  if (!isNaN(parsed) && parsed >= 1) {
                    onQuantityChange(parsed);
                  } else if (parsed < 1) {
                    onQuantityChange(1);
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
