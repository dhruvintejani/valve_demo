import { motion } from 'framer-motion';
import {
  CheckCircle,
  Copy,
  Calendar,
  FileText,
  FileSpreadsheet,
  Image as ImageIcon,
  File,
  ArrowLeft,
  RotateCcw,
  ClipboardList,
  Users,
  Send,
  Info,
} from 'lucide-react';
import { RFQData, SubmissionResult } from '../types/rfq';
import { displaySpecification } from '../utils/rfqDisplay';
import { cn } from '../utils/cn';
import { useState } from 'react';

interface ConfirmationScreenProps {
  data: RFQData;
  result: SubmissionResult;
  onSubmitAnother: () => void;
}

function getValveLabel(type: string): string {
  if (type === 'forged') return 'Forged Ball Valve';
  if (type === 'cast') return 'Cast Ball Valve';
  if (type === 'not-sure') return 'Not Sure — Help Me Choose';
  return '—';
}

function getValveImage(type: string): string | null {
  if (type === 'forged') return '/images/forged-ball-valve.png';
  if (type === 'cast') return '/images/cast-ball-valve.png';
  return null;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FileIcon({ file }: { file: File }) {
  const type = file.type;
  if (type === 'application/pdf') return <FileText size={16} className="text-red-500" />;
  if (type.includes('word')) return <FileText size={16} className="text-blue-500" />;
  if (type.includes('excel') || type.includes('spreadsheet')) return <FileSpreadsheet size={16} className="text-green-600" />;
  if (type.startsWith('image/')) return <ImageIcon size={16} className="text-purple-500" />;
  return <File size={16} className="text-gray-500" />;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }) + ', ' + date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

interface SummaryItemProps {
  label: string;
  value: string;
}

function SummaryItem({ label, value }: SummaryItemProps) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2 py-1.5 border-b border-gray-50 last:border-0">
      <div className="w-44 flex-shrink-0 text-sm text-gray-500">{label}</div>
      <div className="text-sm font-semibold text-gray-800">{value}</div>
    </div>
  );
}

export default function ConfirmationScreen({ data, result, onSubmitAnother }: ConfirmationScreenProps) {
  const [copied, setCopied] = useState(false);
  const valveImage = getValveImage(data.valveType);

  const handleCopy = () => {
    if (!navigator.clipboard?.writeText) return;
    navigator.clipboard.writeText(result.rfqReference)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => setCopied(false));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Success Banner */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden mb-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left: Success message */}
          <div className="p-6 flex items-start gap-5">
            {/* Animated check */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
              className="flex-shrink-0 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-200"
            >
              <CheckCircle size={32} className="text-white" strokeWidth={2.5} />
            </motion.div>
            <div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-green-600 text-xs font-bold uppercase tracking-widest mb-1"
              >
                Demo RFQ Completed
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
                className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2"
              >
                Thank You!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 text-sm leading-relaxed max-w-md"
              >
                Your demo RFQ has been created locally. In production, Evolve’s sales team would review your requirements and respond with a suitable quotation. No information has been sent.
              </motion.p>
            </div>
          </div>

          {/* Right: RFQ reference */}
          <div className="bg-gray-50 border-t lg:border-t-0 lg:border-l border-gray-200 p-6 flex flex-col justify-center">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
              Your Demo RFQ Reference
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 bg-[#eff6ff] border border-[#bfdbfe] rounded-xl px-4 py-3">
                <span className="text-[#1d4ed8] font-mono font-bold text-lg tracking-wide">
                  {result.rfqReference}
                </span>
              </div>
              <button
                onClick={handleCopy}
                className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-200',
                  copied
                    ? 'bg-green-50 border-green-300 text-green-600'
                    : 'bg-white border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600'
                )}
                title="Copy reference number"
              >
                {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Calendar size={14} className="text-gray-400 flex-shrink-0" />
              <span className="font-medium">Submitted:</span>
              <span>{formatDate(result.submittedAt)}</span>
            </div>
            <div className="mt-2">
              <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-3 py-1 text-xs font-semibold text-amber-700">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Demo RFQ Reference
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Request Summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="lg:col-span-2 space-y-5"
        >
          {/* Request summary card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#eff6ff] rounded-lg flex items-center justify-center">
                  <ClipboardList size={16} className="text-[#2563eb]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Request Summary</h3>
                  <p className="text-xs text-gray-400">Here is a preview of the details you entered.</p>
                </div>
              </div>
              <button
                onClick={onSubmitAnother}
                className="hidden sm:flex items-center gap-1.5 text-xs text-[#2563eb] hover:text-blue-700 font-semibold border border-blue-200 hover:border-blue-300 rounded-lg px-3 py-1.5 transition-colors"
              >
                <RotateCcw size={12} />
                Start New Request
              </button>
            </div>

            <div className="p-5">
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Valve image */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  {valveImage ? (
                    <div className="w-36 h-36 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center p-3">
                      <img
                        src={valveImage}
                        alt={getValveLabel(data.valveType)}
                        className="max-h-full max-w-full object-contain drop-shadow-md"
                      />
                    </div>
                  ) : (
                    <div className="w-36 h-36 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-center">
                      <span className="text-blue-300 text-4xl">?</span>
                    </div>
                  )}
                  <div className="mt-2 text-center">
                    <div className="text-sm font-bold text-gray-800">{getValveLabel(data.valveType)}</div>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <SummaryItem label="Valve Type" value={getValveLabel(data.valveType)} />
                  <SummaryItem label="Size" value={displaySpecification(data.size, data.otherSize)} />
                  <SummaryItem label="Pressure Class" value={displaySpecification(data.pressureClass, data.otherPressureClass)} />
                  <SummaryItem
                    label="Quantity"
                    value={data.quantity !== '' && data.quantity ? `${data.quantity} Nos.` : ''}
                  />
                  {data.materialConstruction && (
                    <SummaryItem label="Material Construction" value={displaySpecification(data.materialConstruction, data.otherMaterialConstruction)} />
                  )}
                  {data.endConnection && (
                    <SummaryItem label="End Connection" value={displaySpecification(data.endConnection, data.otherEndConnection)} />
                  )}
                  {data.applicationMedia && (
                    <SummaryItem label="Application / Media" value={displaySpecification(data.applicationMedia, data.otherApplicationMedia)} />
                  )}
                  {data.specialRequirements && (
                    <SummaryItem label="Special Requirements" value={data.specialRequirements} />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Uploaded Documents */}
          {data.files.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                <div className="w-8 h-8 bg-[#eff6ff] rounded-lg flex items-center justify-center">
                  <FileText size={16} className="text-[#2563eb]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Uploaded Documents</h3>
                  <p className="text-xs text-gray-400">{data.files.length} file{data.files.length !== 1 ? 's' : ''} selected in this demo</p>
                </div>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.files.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50"
                    >
                      <div className="w-9 h-9 rounded-lg bg-white border border-gray-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <FileIcon file={file} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-800 truncate">{file.name}</div>
                        <div className="text-xs text-gray-400">{formatFileSize(file.size)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
              <div className="w-8 h-8 bg-[#eff6ff] rounded-lg flex items-center justify-center">
                <Users size={16} className="text-[#2563eb]" />
              </div>
              <h3 className="font-bold text-gray-800">Contact Information</h3>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
                <SummaryItem label="Full Name" value={data.fullName} />
                {data.phone && <SummaryItem label="Phone Number" value={`${data.countryCode} ${data.phone}`} />}
                <SummaryItem label="Company Name" value={data.companyName} />
                {data.country && <SummaryItem label="Country" value={data.country} />}
                <SummaryItem label="Email Address" value={data.email} />
                {data.city && <SummaryItem label="City" value={data.city} />}
              </div>
            </div>
          </div>

          {/* Mobile Edit button */}
          <button
            onClick={onSubmitAnother}
            className="sm:hidden w-full flex items-center justify-center gap-2 text-sm text-[#2563eb] font-semibold border border-blue-200 rounded-xl px-4 py-3"
          >
            <RotateCcw size={14} />
            Edit & Submit Again
          </button>
        </motion.div>

        {/* Right: What happens next + actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="space-y-5"
        >
          {/* What Happens Next */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Send size={16} className="text-[#2563eb]" />
                <h3 className="font-bold text-gray-800">What Happens Next?</h3>
              </div>
            </div>
            <div className="p-5 space-y-4">
              {[
                {
                  step: 1,
                  title: 'Our team reviews your requirement',
                  desc: 'The technical and sales team reviews the specifications and submitted documents.',
                },
                {
                  step: 2,
                  title: 'We may contact you for clarification',
                  desc: 'If additional information is needed, the sales team can contact the buyer.',
                },
                {
                  step: 3,
                  title: 'You receive a quotation',
                  desc: 'The production RFQ system can allow our team to respond with the appropriate technical and commercial quotation.',
                },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#1e3a5f] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {step}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800 mb-0.5">{title}</div>
                    <div className="text-xs text-gray-500 leading-relaxed">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Demo notice */}
          <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            <Info size={15} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-amber-800 text-xs leading-relaxed">
              <span className="font-bold">Interactive Demo</span> — No actual request has been sent to Evolve Industries.
            </p>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <button
              onClick={onSubmitAnother}
              className="w-full flex items-center justify-center gap-2 bg-[#1e3a5f] hover:bg-[#162d4a] text-white font-semibold text-sm px-5 py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-900/20 active:scale-[0.98]"
            >
              <ClipboardList size={16} />
              Submit Another Request
            </button>
            <a
              href="https://evolveindustries.co.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-sm px-5 py-3.5 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 active:scale-[0.98]"
            >
              <ArrowLeft size={16} />
              Back to Website
            </a>
          </div>
        </motion.div>
      </div>

      {/* Production integration info */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-8 bg-[#0a1628] rounded-2xl overflow-hidden"
      >
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-[#3b82f6]" />
            <span className="text-[#60a5fa] text-xs font-bold uppercase tracking-widest">
              Production Integration Flow
            </span>
          </div>
          <h3 className="text-white font-bold text-base mb-4">
            How Evolve's sales team receives RFQs in production
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {[
              { label: 'Buyer Submits RFQ', color: 'bg-blue-600' },
              { label: '→', color: '' },
              { label: 'Secure API Endpoint', color: 'bg-slate-700' },
              { label: '→', color: '' },
              { label: 'Data Validated & Stored', color: 'bg-slate-700' },
              { label: '→', color: '' },
              { label: 'Documents Uploaded Securely', color: 'bg-slate-700' },
              { label: '→', color: '' },
              { label: 'Sales Team Notified', color: 'bg-green-700' },
              { label: '→', color: '' },
              { label: 'Optional CRM / Admin Integration', color: 'bg-slate-700' },
            ].map((item, idx) => (
              item.color ? (
                <span
                  key={idx}
                  className={`${item.color} text-white rounded-full px-3 py-1.5 font-medium`}
                >
                  {item.label}
                </span>
              ) : (
                <span key={idx} className="text-slate-500 font-bold">{item.label}</span>
              )
            ))}
          </div>
          <p className="text-slate-400 text-xs mt-4 leading-relaxed">
            For the production implementation, RFQs can be routed to Evolve's sales email or connected system. This frontend demo uses a mocked submission — the{' '}
            <code className="text-blue-400 font-mono bg-slate-800 px-1 rounded">submitRFQ()</code> function in{' '}
            <code className="text-blue-400 font-mono bg-slate-800 px-1 rounded">services/rfqService.ts</code>{' '}
            can be replaced with a real API call without redesigning the frontend.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
