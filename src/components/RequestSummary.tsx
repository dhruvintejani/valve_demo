import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  User,
  Paperclip,
  FileText,
  FileSpreadsheet,
  Image,
  File,
  HelpCircle,
} from 'lucide-react';
import { cn } from '../utils/cn';
import { RFQData } from '../types/rfq';

interface RequestSummaryProps {
  data: RFQData;
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
  if (type === 'application/pdf') return <FileText size={14} className="text-red-500" />;
  if (type.includes('word')) return <FileText size={14} className="text-blue-500" />;
  if (type.includes('excel') || type.includes('spreadsheet')) return <FileSpreadsheet size={14} className="text-green-600" />;
  if (type.startsWith('image/')) return <Image size={14} className="text-purple-500" />;
  return <File size={14} className="text-gray-500" />;
}

interface SummaryRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}

function SummaryRow({ icon, label, value, highlight }: SummaryRowProps) {
  return (
    <div className="flex items-start gap-2.5 py-1.5">
      <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5 text-gray-400">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-gray-500 font-medium">{label}</div>
        <div className={cn('text-sm font-semibold truncate', highlight ? 'text-[#1d4ed8]' : 'text-gray-800')}>
          {value || '—'}
        </div>
      </div>
    </div>
  );
}

export default function RequestSummary({ data }: RequestSummaryProps) {
  const valveImage = getValveImage(data.valveType);
  const hasContact = data.fullName || data.companyName || data.email || data.phone;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-[#0f2040] px-5 py-4 flex items-center justify-between">
        <h2 className="text-white font-bold text-base">Your Request Summary</h2>
        <div className="flex items-center gap-1.5 bg-amber-500/20 border border-amber-400/30 rounded-full px-2.5 py-1">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-amber-300 text-xs font-semibold">Interactive Demo</span>
        </div>
      </div>

      <div className="p-4">
        {/* Valve type + image */}
        <AnimatePresence mode="wait">
          {data.valveType ? (
            <motion.div
              key={data.valveType}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="mb-4"
            >
              {valveImage ? (
                <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 mb-3 flex items-center justify-center" style={{ minHeight: 140 }}>
                  <img
                    src={valveImage}
                    alt={getValveLabel(data.valveType)}
                    className="max-h-32 max-w-full object-contain drop-shadow-md"
                  />
                </div>
              ) : (
                <div className="bg-blue-50 rounded-xl border border-blue-100 p-4 mb-3 flex items-center justify-center" style={{ minHeight: 100 }}>
                  <HelpCircle size={40} className="text-blue-300" />
                </div>
              )}
              <div className="text-center">
                <div className="text-[#1d4ed8] font-bold text-sm">{getValveLabel(data.valveType)}</div>
                {data.valveType === 'forged' && (
                  <div className="text-gray-500 text-xs mt-0.5">High strength, compact design for high pressure and critical applications.</div>
                )}
                {data.valveType === 'cast' && (
                  <div className="text-gray-500 text-xs mt-0.5">Cost-effective and reliable for general industrial service.</div>
                )}
                {data.valveType === 'not-sure' && (
                  <div className="text-gray-500 text-xs mt-0.5">Our team will recommend the best option for your requirements.</div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-50 rounded-xl border border-dashed border-gray-200 p-6 mb-4 flex flex-col items-center justify-center text-center"
              style={{ minHeight: 120 }}
            >
              <Settings size={28} className="text-gray-300 mb-2" />
              <p className="text-xs text-gray-400">Select a valve type to preview your request</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Technical specs */}
        <div className="space-y-0 border-t border-gray-100 pt-3 mb-3">
          <div className="flex items-center gap-2 mb-2">
            <Settings size={13} className="text-gray-400" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Technical Specs</span>
          </div>
          <SummaryRow icon={<Settings size={13} />} label="Size" value={data.size} />
          <SummaryRow icon={<Settings size={13} />} label="Pressure Class" value={data.pressureClass} />
          <SummaryRow
            icon={<Settings size={13} />}
            label="Quantity"
            value={data.quantity !== '' && data.quantity !== undefined ? `${data.quantity} Nos.` : '—'}
          />
          {data.materialConstruction && (
            <SummaryRow icon={<Settings size={13} />} label="Material Construction" value={data.materialConstruction} />
          )}
          {data.endConnection && (
            <SummaryRow icon={<Settings size={13} />} label="End Connection" value={data.endConnection} />
          )}
          {data.applicationMedia && (
            <SummaryRow icon={<Settings size={13} />} label="Application / Media" value={data.applicationMedia} />
          )}
          {data.specialRequirements && (
            <div className="py-1.5 pl-6">
              <div className="text-xs text-gray-500 font-medium mb-0.5">Special Requirements</div>
              <div className="text-xs text-gray-700 leading-relaxed line-clamp-3">{data.specialRequirements}</div>
            </div>
          )}
        </div>

        {/* Documents */}
        <AnimatePresence>
          {data.files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-100 pt-3 mb-3"
            >
              <div className="flex items-center gap-2 mb-2">
                <Paperclip size={13} className="text-gray-400" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Documents Attached ({data.files.length})
                </span>
              </div>
              <div className="space-y-1.5">
                {data.files.map((file, idx) => (
                  <motion.div
                    key={`${file.name}-${idx}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-2 text-xs text-gray-600"
                  >
                    <FileIcon file={file} />
                    <span className="truncate flex-1 font-medium">{file.name}</span>
                    <span className="text-gray-400 flex-shrink-0">{formatFileSize(file.size)}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact info */}
        <AnimatePresence>
          {hasContact && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-100 pt-3"
            >
              <div className="flex items-center gap-2 mb-2">
                <User size={13} className="text-gray-400" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</span>
              </div>
              <div className="space-y-0.5 pl-5 text-xs text-gray-700">
                {data.fullName && <div className="font-semibold text-gray-800">{data.fullName}</div>}
                {data.companyName && <div>{data.companyName}</div>}
                {data.email && <div className="text-blue-600">{data.email}</div>}
                {data.phone && <div>{data.countryCode} {data.phone}</div>}
                {(data.city || data.country) && (
                  <div>{[data.city, data.country].filter(Boolean).join(', ')}</div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
