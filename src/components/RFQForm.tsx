import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2, Lock } from 'lucide-react';
import { RFQData, RFQErrors, SubmissionResult } from '../types/rfq';
import { submitRFQ } from '../services/rfqService';
import ValveTypeSelector from './ValveTypeSelector';
import RequiredDetails from './RequiredDetails';
import TechnicalDetails from './TechnicalDetails';
import DocumentUpload from './DocumentUpload';
import ContactDetails from './ContactDetails';
import RequestSummary from './RequestSummary';
import DemoNotice from './DemoNotice';
import { cn } from '../utils/cn';

interface RFQFormProps {
  onSubmitSuccess: (data: RFQData, result: SubmissionResult) => void;
}

const DEFAULT_DATA: RFQData = {
  valveType: '',
  size: '',
  otherSize: '',
  pressureClass: '',
  otherPressureClass: '',
  quantity: '',
  materialConstruction: '',
  otherMaterialConstruction: '',
  endConnection: '',
  otherEndConnection: '',
  applicationMedia: '',
  otherApplicationMedia: '',
  specialRequirements: '',
  files: [],
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  countryCode: '+91',
  country: '',
  city: '',
};

function SectionHeader({
  number,
  title,
  subtitle,
  optional,
}: {
  number: number;
  title: string;
  subtitle: string;
  optional?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <div className="w-7 h-7 rounded-full bg-[#1e3a5f] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
        {number}
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-base font-bold text-gray-900">{title}</h2>
          {optional && (
            <span className="text-xs font-semibold text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">
              Optional
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

function SectionCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('bg-white rounded-2xl border border-gray-200 shadow-sm p-5 md:p-6', className)}>
      {children}
    </div>
  );
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function RFQForm({ onSubmitSuccess }: RFQFormProps) {
  const [data, setData] = useState<RFQData>(DEFAULT_DATA);
  const [errors, setErrors] = useState<RFQErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const valveSectionRef = useRef<HTMLDivElement>(null);
  const requiredSectionRef = useRef<HTMLDivElement>(null);
  const technicalSectionRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);

  const updateData = (patch: Partial<RFQData>) => {
    setSubmitError('');
    setData((prev) => ({ ...prev, ...patch }));
  };

  const clearError = (field: keyof RFQErrors) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validate = (): boolean => {
    const newErrors: RFQErrors = {};

    if (!data.valveType) newErrors.valveType = 'Please select a ball valve type.';
    if (!data.size) newErrors.size = 'Please select a size.';
    if (data.size === 'other' && !data.otherSize?.trim()) {
      newErrors.otherSize = 'Please specify the size in inches or millimetres.';
    }
    if (!data.pressureClass) newErrors.pressureClass = 'Please select a pressure class.';
    if (data.pressureClass === 'other' && !data.otherPressureClass?.trim()) {
      newErrors.otherPressureClass = 'Please specify the pressure class.';
    }
    if (data.materialConstruction === 'other' && !data.otherMaterialConstruction?.trim()) {
      newErrors.otherMaterialConstruction = 'Please specify the material.';
    }
    if (data.endConnection === 'other' && !data.otherEndConnection?.trim()) {
      newErrors.otherEndConnection = 'Please specify the end connection.';
    }
    if (data.applicationMedia === 'other' && !data.otherApplicationMedia?.trim()) {
      newErrors.otherApplicationMedia = 'Please specify the application or media.';
    }
    if (data.quantity === '' || data.quantity === undefined) {
      newErrors.quantity = 'Please enter a quantity.';
    } else if (!Number.isSafeInteger(Number(data.quantity)) || Number(data.quantity) < 1) {
      newErrors.quantity = 'Enter a whole-number quantity of at least 1.';
    }
    if (!data.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!data.companyName.trim()) newErrors.companyName = 'Company name is required.';
    if (!data.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!validateEmail(data.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!data.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else {
      const digits = data.phone.replace(/\D/g, '');
      if (!/^[+\d\s().-]+$/.test(data.phone) || digits.length < 6 || digits.length > 15) {
        newErrors.phone = 'Enter a valid phone number (6–15 digits).';
      }
    }

    setErrors(newErrors);

    // Scroll to first error
    if (newErrors.valveType) {
      valveSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (newErrors.size || newErrors.otherSize || newErrors.pressureClass || newErrors.otherPressureClass || newErrors.quantity) {
      requiredSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (newErrors.otherMaterialConstruction || newErrors.otherEndConnection || newErrors.otherApplicationMedia) {
      technicalSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (newErrors.fullName || newErrors.companyName || newErrors.email || newErrors.phone) {
      contactSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitError('');
    setSubmitting(true);
    try {
      const result = await submitRFQ(data);
      onSubmitSuccess(data, result);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setSubmitError('The demo could not complete your submission. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="rfq-form" className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 scroll-mt-20">
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left: Form */}
          <div className="flex-1 min-w-0 space-y-5">

            {/* Section 1: Valve Type */}
            <motion.div
              ref={valveSectionRef}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              <SectionCard>
                <SectionHeader
                  number={1}
                  title="Select Ball Valve Type"
                  subtitle="Choose the type of ball valve you need. Not sure? Select the last option and our team will recommend the best solution."
                />
                <ValveTypeSelector
                  value={data.valveType}
                  onChange={(v) => {
                    updateData({ valveType: v });
                    if (errors.valveType) clearError('valveType');
                  }}
                  error={errors.valveType}
                />
              </SectionCard>
            </motion.div>

            {/* Section 2: Required Details */}
            <motion.div
              ref={requiredSectionRef}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <SectionCard>
                <SectionHeader
                  number={2}
                  title="Required Information"
                  subtitle="Please provide the key details required for your Ball Valve."
                />
                <RequiredDetails
                  size={data.size}
                  otherSize={data.otherSize || ''}
                  pressureClass={data.pressureClass}
                  otherPressureClass={data.otherPressureClass || ''}
                  quantity={data.quantity}
                  onSizeChange={(v) => {
                    updateData({ size: v });
                    if (errors.size) clearError('size');
                    if (errors.otherSize && v !== 'other') clearError('otherSize');
                  }}
                  onOtherSizeChange={(v) => {
                    updateData({ otherSize: v });
                    if (errors.otherSize) clearError('otherSize');
                  }}
                  onPressureClassChange={(v) => {
                    updateData({ pressureClass: v });
                    if (errors.pressureClass) clearError('pressureClass');
                    if (errors.otherPressureClass && v !== 'other') clearError('otherPressureClass');
                  }}
                  onOtherPressureClassChange={(v) => {
                    updateData({ otherPressureClass: v });
                    if (errors.otherPressureClass) clearError('otherPressureClass');
                  }}
                  onQuantityChange={(v) => {
                    updateData({ quantity: v });
                    if (errors.quantity) clearError('quantity');
                  }}
                  errors={{
                    size: errors.size,
                    otherSize: errors.otherSize,
                    pressureClass: errors.pressureClass,
                    otherPressureClass: errors.otherPressureClass,
                    quantity: errors.quantity,
                  }}
                />
              </SectionCard>
            </motion.div>

            {/* Section 3: Additional Technical Details */}
            <motion.div
              ref={technicalSectionRef}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <SectionCard>
                <SectionHeader
                  number={3}
                  title="Additional Technical Details"
                  subtitle="Provide more details if available. You can also skip this section."
                  optional
                />
                <TechnicalDetails
                  materialConstruction={data.materialConstruction || ''}
                  otherMaterialConstruction={data.otherMaterialConstruction || ''}
                  endConnection={data.endConnection || ''}
                  otherEndConnection={data.otherEndConnection || ''}
                  applicationMedia={data.applicationMedia || ''}
                  otherApplicationMedia={data.otherApplicationMedia || ''}
                  specialRequirements={data.specialRequirements || ''}
                  onMaterialChange={(v) => {
                    updateData({ materialConstruction: v });
                    if (errors.otherMaterialConstruction && v !== 'other') clearError('otherMaterialConstruction');
                  }}
                  onOtherMaterialChange={(v) => {
                    updateData({ otherMaterialConstruction: v });
                    if (errors.otherMaterialConstruction) clearError('otherMaterialConstruction');
                  }}
                  onEndConnectionChange={(v) => {
                    updateData({ endConnection: v });
                    if (errors.otherEndConnection && v !== 'other') clearError('otherEndConnection');
                  }}
                  onOtherEndConnectionChange={(v) => {
                    updateData({ otherEndConnection: v });
                    if (errors.otherEndConnection) clearError('otherEndConnection');
                  }}
                  onApplicationMediaChange={(v) => {
                    updateData({ applicationMedia: v });
                    if (errors.otherApplicationMedia && v !== 'other') clearError('otherApplicationMedia');
                  }}
                  onOtherApplicationMediaChange={(v) => {
                    updateData({ otherApplicationMedia: v });
                    if (errors.otherApplicationMedia) clearError('otherApplicationMedia');
                  }}
                  errors={{
                    otherMaterialConstruction: errors.otherMaterialConstruction,
                    otherEndConnection: errors.otherEndConnection,
                    otherApplicationMedia: errors.otherApplicationMedia,
                  }}
                  onSpecialRequirementsChange={(v) => updateData({ specialRequirements: v })}
                />
              </SectionCard>
            </motion.div>

            {/* Section 4: Document Upload */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <SectionCard>
                <SectionHeader
                  number={4}
                  title="Upload Technical Documents"
                  subtitle="Upload drawings, specifications, datasheets or other relevant documents."
                  optional
                />
                <DocumentUpload
                  files={data.files}
                  onFilesChange={(files) => updateData({ files })}
                />
              </SectionCard>
            </motion.div>

            {/* Section 5: Contact Details */}
            <motion.div
              ref={contactSectionRef}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
            >
              <SectionCard>
                <SectionHeader
                  number={5}
                  title="Your Contact Details"
                  subtitle="Please provide your details so our sales team can contact you."
                />
                <ContactDetails
                  fullName={data.fullName}
                  companyName={data.companyName}
                  email={data.email}
                  phone={data.phone}
                  countryCode={data.countryCode}
                  country={data.country || ''}
                  city={data.city || ''}
                  onFullNameChange={(v) => {
                    updateData({ fullName: v });
                    if (errors.fullName) clearError('fullName');
                  }}
                  onCompanyNameChange={(v) => {
                    updateData({ companyName: v });
                    if (errors.companyName) clearError('companyName');
                  }}
                  onEmailChange={(v) => {
                    updateData({ email: v });
                    if (errors.email) clearError('email');
                  }}
                  onPhoneChange={(v) => {
                    updateData({ phone: v });
                    if (errors.phone) clearError('phone');
                  }}
                  onCountryCodeChange={(v) => updateData({ countryCode: v })}
                  onCountryChange={(v) => updateData({ country: v })}
                  onCityChange={(v) => updateData({ city: v })}
                  errors={{
                    fullName: errors.fullName,
                    companyName: errors.companyName,
                    email: errors.email,
                    phone: errors.phone,
                  }}
                />
              </SectionCard>
            </motion.div>

            {/* Mobile: optional review before submission, without an extra step. */}
            <details className="lg:hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer text-sm font-semibold text-[#1e3a5f] focus-visible:outline-2 focus-visible:outline-blue-600">
                Review current request (optional)
              </summary>
              <div className="mt-4"><RequestSummary data={data} /></div>
            </details>

            {/* Submit area */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 md:p-6"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className={cn(
                    'w-full sm:w-auto flex items-center justify-center gap-2.5 text-sm font-bold px-8 py-3.5 rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                    submitting
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-[#1e3a5f] hover:bg-[#162d4a] text-white hover:shadow-xl hover:shadow-blue-900/25 active:scale-[0.98]'
                  )}
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Submitting RFQ...
                    </>
                  ) : (
                    <>
                      Submit RFQ
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Lock size={12} />
                  <DemoNotice />
                </div>
              </div>

              {submitError && <p role="alert" className="mt-4 text-sm font-medium text-red-600">{submitError}</p>}

              {/* Validation summary if errors exist */}
              <AnimatePresence>
                {Object.keys(errors).length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl"
                  >
                    <p className="text-xs text-red-600 font-semibold">
                      Please fill in all required fields before submitting.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right: Sticky Summary */}
          <div className="hidden lg:block w-80 xl:w-96 flex-shrink-0">
            <div className="sticky top-20">
              <RequestSummary data={data} />
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}


