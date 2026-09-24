import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

interface Option {
  value: string;
  label: string;
}

interface PremiumSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  error?: string;
  id?: string;
  disabled?: boolean;
}

export default function PremiumSelect({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  label,
  required,
  error,
  id,
  disabled,
}: PremiumSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [dropUp, setDropUp] = useState(false);

  const selectedOption = options.find((o) => o.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      // Determine if dropdown should open upward
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        setDropUp(spaceBelow < 250 && rect.top > 250);
      }
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(!open);
    } else if (e.key === 'Escape') {
      setOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === 'ArrowDown' && open) {
      e.preventDefault();
      const currentIdx = options.findIndex((o) => o.value === value);
      const nextIdx = Math.min(currentIdx + 1, options.length - 1);
      onChange(options[nextIdx].value);
    } else if (e.key === 'ArrowUp' && open) {
      e.preventDefault();
      const currentIdx = options.findIndex((o) => o.value === value);
      const prevIdx = Math.max(currentIdx - 1, 0);
      onChange(options[prevIdx].value);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <button
        ref={triggerRef}
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onKeyDown={handleKeyDown}
        onClick={() => !disabled && setOpen(!open)}
        className={cn(
          'w-full flex items-center justify-between gap-2 px-3.5 py-2.5 text-sm rounded-lg border transition-all duration-150 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1',
          error
            ? 'border-red-400 bg-red-50/50 text-gray-800'
            : open
            ? 'border-[#2563eb] bg-white shadow-md shadow-blue-100/50 ring-2 ring-blue-500/20'
            : 'border-gray-200 bg-white hover:border-gray-300 shadow-sm',
          !selectedOption && 'text-gray-400',
          selectedOption && 'text-gray-800',
          disabled && 'opacity-60 cursor-not-allowed bg-gray-50'
        )}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown size={16} className={cn('transition-colors', open ? 'text-[#2563eb]' : 'text-gray-400')} />
        </motion.div>
      </button>

      {error && (
        <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: dropUp ? 4 : -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: dropUp ? 4 : -4, scale: 0.97 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={cn(
              'absolute left-0 right-0 z-50 bg-white border border-gray-200 rounded-xl shadow-xl shadow-gray-200/80 overflow-hidden',
              dropUp ? 'bottom-full mb-1' : 'top-full mt-1'
            )}
            role="listbox"
          >
            <div className="max-h-56 overflow-y-auto py-1">
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    className={cn(
                      'w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors duration-100 text-left cursor-pointer',
                      isSelected
                        ? 'bg-[#eff6ff] text-[#1d4ed8] font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    <span>{option.label}</span>
                    {isSelected && <Check size={14} className="text-[#2563eb] flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
