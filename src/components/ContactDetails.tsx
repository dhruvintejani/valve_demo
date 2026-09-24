import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';
import { COUNTRY_CODES, COUNTRIES } from '../data/rfqOptions';
import PremiumSelect from './ui/PremiumSelect';

interface ContactDetailsProps {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  countryCode: string;
  country: string;
  city: string;
  onFullNameChange: (v: string) => void;
  onCompanyNameChange: (v: string) => void;
  onEmailChange: (v: string) => void;
  onPhoneChange: (v: string) => void;
  onCountryCodeChange: (v: string) => void;
  onCountryChange: (v: string) => void;
  onCityChange: (v: string) => void;
  errors: {
    fullName?: string;
    companyName?: string;
    email?: string;
    phone?: string;
  };
}

function InputField({
  id,
  label,
  required,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
  autoComplete,
}: {
  id: string;
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={cn(
          'w-full px-3.5 py-2.5 text-sm rounded-lg border transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 shadow-sm placeholder:text-gray-400',
          error
            ? 'border-red-400 bg-red-50/50 focus:border-red-400'
            : 'border-gray-200 bg-white hover:border-gray-300 focus:border-[#2563eb] focus:shadow-md focus:shadow-blue-100/50'
        )}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-xs text-red-500 font-medium"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

function PhoneInput({
  phone,
  countryCode,
  onPhoneChange,
  onCountryCodeChange,
  error,
}: {
  phone: string;
  countryCode: string;
  onPhoneChange: (v: string) => void;
  onCountryCodeChange: (v: string) => void;
  error?: string;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const selectedCountry = COUNTRY_CODES.find((c) => c.code === countryCode) || COUNTRY_CODES[2];

  return (
    <div>
      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
        Phone Number <span className="text-red-500">*</span>
      </label>
      <div className="relative flex">
        {/* Country code selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2.5 text-sm rounded-l-lg border border-r-0 transition-all duration-150 bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 whitespace-nowrap',
              error ? 'border-red-400' : 'border-gray-200',
              dropdownOpen && 'border-[#2563eb] bg-blue-50'
            )}
            aria-label="Select country code"
          >
            <span className="text-base leading-none">{selectedCountry.flag}</span>
            <span className="font-medium text-gray-700">{selectedCountry.code}</span>
            <ChevronDown size={12} className="text-gray-400" />
          </button>

          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute top-full left-0 z-50 mt-1 w-52 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                <div className="max-h-52 overflow-y-auto py-1">
                  {COUNTRY_CODES.map((cc) => (
                    <button
                      key={cc.code}
                      type="button"
                      onClick={() => {
                        onCountryCodeChange(cc.code);
                        setDropdownOpen(false);
                      }}
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors text-left',
                        countryCode === cc.code && 'bg-blue-50 text-blue-700 font-semibold'
                      )}
                    >
                      <span className="text-base">{cc.flag}</span>
                      <span className="flex-1">{cc.country}</span>
                      <span className="text-gray-500 font-mono text-xs">{cc.code}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Phone number input */}
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          placeholder="Phone number"
          autoComplete="tel"
          className={cn(
            'flex-1 px-3.5 py-2.5 text-sm rounded-r-lg border transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 shadow-sm placeholder:text-gray-400 min-w-0',
            error
              ? 'border-red-400 bg-red-50/50'
              : 'border-gray-200 bg-white hover:border-gray-300 focus:border-[#2563eb] focus:shadow-md focus:shadow-blue-100/50'
          )}
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-xs text-red-500 font-medium"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

const COUNTRY_SELECT_OPTIONS = COUNTRIES.map((c) => ({ value: c, label: c }));

export default function ContactDetails({
  fullName,
  companyName,
  email,
  phone,
  countryCode,
  country,
  city,
  onFullNameChange,
  onCompanyNameChange,
  onEmailChange,
  onPhoneChange,
  onCountryCodeChange,
  onCountryChange,
  onCityChange,
  errors,
}: ContactDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-4"
    >
      {/* Row 1: Name, Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          id="fullName"
          label="Full Name"
          required
          value={fullName}
          onChange={onFullNameChange}
          placeholder="John Doe"
          autoComplete="name"
          error={errors.fullName}
        />
        <InputField
          id="companyName"
          label="Company Name"
          required
          value={companyName}
          onChange={onCompanyNameChange}
          placeholder="ABC Engineering Ltd."
          autoComplete="organization"
          error={errors.companyName}
        />
      </div>

      {/* Row 2: Email, Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          id="email"
          label="Email Address"
          required
          type="email"
          value={email}
          onChange={onEmailChange}
          placeholder="john@company.com"
          autoComplete="email"
          error={errors.email}
        />
        <PhoneInput
          phone={phone}
          countryCode={countryCode}
          onPhoneChange={onPhoneChange}
          onCountryCodeChange={onCountryCodeChange}
          error={errors.phone}
        />
      </div>

      {/* Row 3: Country, City (Optional) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <PremiumSelect
          id="country"
          label="Country / Location"
          options={COUNTRY_SELECT_OPTIONS}
          value={country}
          onChange={onCountryChange}
          placeholder="Select country..."
        />
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1.5">
            City <span className="text-gray-400 font-normal text-xs">(Optional)</span>
          </label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
            placeholder="City"
            autoComplete="address-level2"
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-white shadow-sm hover:border-gray-300 focus:border-[#2563eb] focus:shadow-md focus:shadow-blue-100/50 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 placeholder:text-gray-400"
          />
        </div>
      </div>
    </motion.div>
  );
}
