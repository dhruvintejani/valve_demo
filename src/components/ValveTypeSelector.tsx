import { motion } from 'framer-motion';
import { Check, HelpCircle } from 'lucide-react';
import { cn } from '../utils/cn';
import { ValveType } from '../types/rfq';

interface ValveTypeSelectorProps {
  value: ValveType;
  onChange: (type: ValveType) => void;
  error?: string;
}

const valveTypes = [
  {
    id: 'forged' as ValveType,
    label: 'Forged Ball Valve',
    description: 'High strength, compact design for high pressure and critical applications.',
    image: '/images/forged-ball-valve.png',
    hasImage: true,
  },
  {
    id: 'cast' as ValveType,
    label: 'Cast Ball Valve',
    description: 'Cost-effective and reliable for general industrial service applications.',
    image: '/images/cast-ball-valve.png',
    hasImage: true,
  },
  {
    id: 'not-sure' as ValveType,
    label: 'Not Sure — Help Me Choose',
    description: 'Share your basic requirements and our team can recommend a suitable valve type.',
    hasImage: false,
  },
];

export default function ValveTypeSelector({ value, onChange, error }: ValveTypeSelectorProps) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {valveTypes.map((valve, idx) => {
          const isSelected = value === valve.id;
          return (
            <motion.button
              key={valve.id}
              type="button"
              onClick={() => onChange(valve.id)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06, duration: 0.25 }}
              whileTap={{ scale: 0.98 }}
              aria-pressed={isSelected}
              className={cn(
                'relative w-full text-left rounded-xl border-2 p-4 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                isSelected
                  ? 'border-[#2563eb] bg-[#eff6ff] shadow-md shadow-blue-100'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm shadow-sm'
              )}
            >
              {/* Selection indicator */}
              <div
                className={cn(
                  'absolute top-3 left-3 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200',
                  isSelected
                    ? 'border-[#2563eb] bg-[#2563eb]'
                    : 'border-gray-300 bg-white'
                )}
              >
                {isSelected && <Check size={11} className="text-white" strokeWidth={3} />}
              </div>

              {/* Image or icon */}
              <div className="flex items-center justify-center mb-3 mt-2">
                {valve.hasImage ? (
                  <div className="w-full h-28 flex items-center justify-center">
                    <img
                      src={valve.image}
                      alt={valve.label}
                      className="max-h-full max-w-full object-contain drop-shadow-md"
                    />
                  </div>
                ) : (
                  <div className="w-full h-28 flex items-center justify-center">
                    <div className={cn(
                      'w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-200',
                      isSelected ? 'bg-[#dbeafe]' : 'bg-gray-100'
                    )}>
                      <HelpCircle
                        size={32}
                        className={isSelected ? 'text-[#2563eb]' : 'text-gray-400'}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Label */}
              <h3
                className={cn(
                  'text-sm font-bold text-center leading-tight mb-1.5 transition-colors duration-200',
                  isSelected ? 'text-[#1d4ed8]' : 'text-gray-800'
                )}
              >
                {valve.label}
              </h3>

              {/* Description */}
              <p
                className={cn(
                  'text-xs text-center leading-relaxed transition-colors duration-200',
                  isSelected ? 'text-[#3b82f6]' : 'text-gray-500'
                )}
              >
                {valve.description}
              </p>
            </motion.button>
          );
        })}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-xs text-red-500 font-medium"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
