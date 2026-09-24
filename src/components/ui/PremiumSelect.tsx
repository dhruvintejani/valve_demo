import * as Select from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
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

/**
 * Portal the menu outside the animated "Additional Technical Details" accordion.
 * Otherwise the accordion's overflow:hidden clips upward-opening menus and
 * makes their last options impossible to see or select.
 *
 * Radix handles collision-aware positioning, wheel scrolling and keyboard
 * navigation (including Home, End, arrows, typeahead and Escape).
 */
export default function PremiumSelect({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  label,
  required = false,
  error,
  id,
  disabled = false,
}: PremiumSelectProps) {
  const labelId = id ? `${id}-label` : undefined;
  const errorId = id ? `${id}-error` : undefined;

  return (
    <div className="relative min-w-0">
      {label && (
        <label id={labelId} htmlFor={id} className="mb-1.5 block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-0.5 text-red-500" aria-hidden="true">*</span>}
        </label>
      )}
      <Select.Root value={value} onValueChange={onChange} disabled={disabled} required={required}>
        <Select.Trigger
          id={id}
          aria-labelledby={labelId}
          aria-label={!label ? placeholder : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error && errorId ? errorId : undefined}
          className={cn(
            'flex w-full min-w-0 items-center justify-between gap-2 rounded-lg border bg-white px-3.5 py-2.5 text-left text-sm shadow-sm transition-all duration-150',
            'outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1',
            'data-[placeholder]:text-gray-400 disabled:cursor-not-allowed disabled:opacity-60',
            error
              ? 'border-red-400 bg-red-50/50 text-gray-800'
              : 'border-gray-200 text-gray-800 hover:border-gray-300 data-[state=open]:border-blue-600 data-[state=open]:ring-2 data-[state=open]:ring-blue-100'
          )}
        >
          <span className="block min-w-0 flex-1 truncate">
            <Select.Value placeholder={placeholder} />
          </span>
          <Select.Icon className="flex-shrink-0 text-gray-400">
            <ChevronDown size={16} aria-hidden="true" />
          </Select.Icon>
        </Select.Trigger>

        {/* Portal is essential: the parent accordion animates with overflow hidden. */}
        <Select.Portal>
          <Select.Content
            position="popper"
            side="bottom"
            align="start"
            sideOffset={6}
            collisionPadding={12}
            avoidCollisions
            className="rfq-select-content z-[100] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl shadow-slate-900/15"
            style={{
              width: 'var(--radix-select-trigger-width)',
              maxHeight: 'min(20rem, var(--radix-select-content-available-height))',
            }}
          >
            <Select.ScrollUpButton className="flex h-7 cursor-default items-center justify-center bg-white text-blue-600">
              <ChevronUp size={15} aria-hidden="true" />
            </Select.ScrollUpButton>
            <Select.Viewport className="p-1">
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  textValue={option.label}
                  className={cn(
                    'relative flex min-h-11 w-full cursor-pointer select-none items-center rounded-lg py-2.5 pl-9 pr-3 text-left text-sm leading-5 text-gray-700 outline-none',
                    'data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-800',
                    'data-[state=checked]:bg-blue-50 data-[state=checked]:font-semibold data-[state=checked]:text-blue-700'
                  )}
                >
                  <Select.ItemIndicator className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600">
                    <Check size={15} aria-hidden="true" />
                  </Select.ItemIndicator>
                  <Select.ItemText>
                    <span className="block whitespace-normal break-words">{option.label}</span>
                  </Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.ScrollDownButton className="flex h-7 cursor-default items-center justify-center bg-white text-blue-600">
              <ChevronDown size={15} aria-hidden="true" />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
