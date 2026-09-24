import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus } from 'lucide-react';
import { cn } from '../utils/cn';
import PremiumSelect from './ui/PremiumSelect';
import {
  MATERIAL_OPTIONS,
  END_CONNECTION_OPTIONS,
  APPLICATION_MEDIA_OPTIONS,
} from '../data/rfqOptions';

interface TechnicalDetailsProps {
  materialConstruction: string;
  endConnection: string;
  applicationMedia: string;
  specialRequirements: string;
  onMaterialChange: (v: string) => void;
  onEndConnectionChange: (v: string) => void;
  onApplicationMediaChange: (v: string) => void;
  onSpecialRequirementsChange: (v: string) => void;
}

export default function TechnicalDetails({
  materialConstruction,
  endConnection,
  applicationMedia,
  specialRequirements,
  onMaterialChange,
  onEndConnectionChange,
  onApplicationMediaChange,
  onSpecialRequirementsChange,
}: TechnicalDetailsProps) {
  const [expanded, setExpanded] = useState(false);

  const hasAnyValue =
    materialConstruction || endConnection || applicationMedia || specialRequirements;

  return (
    <div>
      {/* Accordion trigger */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className={cn(
          'w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-200 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
          expanded
            ? 'border-[#2563eb]/30 bg-[#eff6ff]'
            : hasAnyValue
            ? 'border-green-200 bg-green-50'
            : 'border-dashed border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
        )}
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={cn(
              'w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200',
              expanded
                ? 'bg-[#2563eb] text-white'
                : hasAnyValue
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-500'
            )}
          >
            {expanded ? (
              <ChevronDown size={15} />
            ) : (
              <Plus size={15} />
            )}
          </div>
          <div>
            <span
              className={cn(
                'text-sm font-semibold transition-colors duration-200',
                expanded ? 'text-[#1d4ed8]' : hasAnyValue ? 'text-green-700' : 'text-gray-600'
              )}
            >
              {expanded ? 'Additional Technical Details' : hasAnyValue ? 'Additional Details Added' : '+ Add more technical details'}
            </span>
            {!expanded && (
              <p className="text-xs text-gray-400 mt-0.5">
                Material, end connection, media, special requirements — all optional
              </p>
            )}
          </div>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown
            size={16}
            className={cn(
              'transition-colors',
              expanded ? 'text-[#2563eb]' : 'text-gray-400'
            )}
          />
        </motion.div>
      </button>

      {/* Accordion content */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-4">
              {/* Row 1: Material, End Connection, Application */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <PremiumSelect
                  id="materialConstruction"
                  label="Material Construction"
                  options={MATERIAL_OPTIONS}
                  value={materialConstruction}
                  onChange={onMaterialChange}
                  placeholder="Select material..."
                />
                <PremiumSelect
                  id="endConnection"
                  label="End Connection"
                  options={END_CONNECTION_OPTIONS}
                  value={endConnection}
                  onChange={onEndConnectionChange}
                  placeholder="Select connection..."
                />
                <PremiumSelect
                  id="applicationMedia"
                  label="Application / Media"
                  options={APPLICATION_MEDIA_OPTIONS}
                  value={applicationMedia}
                  onChange={onApplicationMediaChange}
                  placeholder="Select media..."
                />
              </div>

              {/* Special Requirements */}
              <div>
                <label
                  htmlFor="specialRequirements"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Special Requirements{' '}
                  <span className="text-gray-400 font-normal text-xs">(Optional)</span>
                </label>
                <textarea
                  id="specialRequirements"
                  rows={3}
                  value={specialRequirements}
                  onChange={(e) => onSpecialRequirementsChange(e.target.value)}
                  placeholder="Add any additional technical requirements, specifications, standards, service conditions or special instructions..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 focus:border-[#2563eb] hover:border-gray-300 resize-none placeholder:text-gray-400"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
