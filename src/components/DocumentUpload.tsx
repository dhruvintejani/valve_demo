import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  X,
  FileText,
  FileSpreadsheet,
  Image,
  File,
  AlertCircle,
} from 'lucide-react';
import { cn } from '../utils/cn';
import {
  ACCEPTED_FILE_TYPES,
  ACCEPTED_FILE_EXTENSIONS,
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
} from '../data/rfqOptions';

interface DocumentUploadProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}

interface FileError {
  name: string;
  message: string;
}

function getFileIcon(file: File) {
  const type = file.type;
  if (type === 'application/pdf') {
    return <FileText size={18} className="text-red-500" />;
  }
  if (
    type === 'application/msword' ||
    type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    return <FileText size={18} className="text-blue-500" />;
  }
  if (
    type === 'application/vnd.ms-excel' ||
    type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ) {
    return <FileSpreadsheet size={18} className="text-green-600" />;
  }
  if (type.startsWith('image/')) {
    return <Image size={18} className="text-purple-500" />;
  }
  return <File size={18} className="text-gray-500" />;
}

function getFileBg(file: File) {
  const type = file.type;
  if (type === 'application/pdf') return 'bg-red-50';
  if (type.includes('word')) return 'bg-blue-50';
  if (type.includes('excel') || type.includes('spreadsheet')) return 'bg-green-50';
  if (type.startsWith('image/')) return 'bg-purple-50';
  return 'bg-gray-50';
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function DocumentUpload({ files, onFilesChange }: DocumentUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [errors, setErrors] = useState<FileError[]>([]);

  const validateAndAddFiles = useCallback(
    (newFiles: FileList | File[]) => {
      const fileArray = Array.from(newFiles);
      const validFiles: File[] = [];
      const newErrors: FileError[] = [];

      fileArray.forEach((file) => {
        const extension = '.' + file.name.split('.').pop()?.toLowerCase();
        const fallbackAllowed = !file.type && ACCEPTED_FILE_EXTENSIONS.split(',').includes(extension);
        if (!ACCEPTED_FILE_TYPES.includes(file.type) && !fallbackAllowed) {
          newErrors.push({
            name: file.name,
            message: `"${file.name}" — unsupported file type.`,
          });
          return;
        }
        if (file.size > MAX_FILE_SIZE_BYTES) {
          newErrors.push({
            name: file.name,
            message: `"${file.name}" — exceeds ${MAX_FILE_SIZE_MB}MB limit.`,
          });
          return;
        }
        // Check for duplicates
        const isDuplicate = [...files, ...validFiles].some((f) => f.name === file.name && f.size === file.size);
        if (isDuplicate) return;
        validFiles.push(file);
      });

      setErrors(newErrors);
      if (validFiles.length > 0) {
        onFilesChange([...files, ...validFiles]);
      }


    },
    [files, onFilesChange]
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    validateAndAddFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      validateAndAddFiles(e.target.files);
      e.target.value = '';
    }
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    onFilesChange(updated);
  };

  return (
    <div>
      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          'relative border-2 border-dashed rounded-xl p-6 transition-all duration-200 text-center cursor-pointer',
          dragging
            ? 'border-[#2563eb] bg-[#eff6ff] scale-[1.01]'
            : 'border-gray-300 bg-gray-50/50 hover:border-gray-400 hover:bg-gray-50'
        )}
        onClick={(e) => {
          // A programmatic input click bubbles here; avoid reopening the picker.
          if (e.target !== inputRef.current) inputRef.current?.click();
        }}
        role="button"
        tabIndex={0}
        aria-label="Upload files"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPTED_FILE_EXTENSIONS}
          onChange={handleInputChange}
          className="hidden"
          aria-label="File input"
        />

        <motion.div
          animate={{ scale: dragging ? 1.1 : 1, color: dragging ? '#2563eb' : '#94a3b8' }}
          transition={{ duration: 0.15 }}
          className="flex justify-center mb-2"
        >
          <Upload size={32} />
        </motion.div>

        <p className="text-sm text-gray-600 mb-1">
          Drag & drop files here or{' '}
          <span className="text-[#2563eb] font-semibold underline underline-offset-2">
            click to browse
          </span>
        </p>
        <p className="text-xs text-gray-400">
          Supports PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Max {MAX_FILE_SIZE_MB}MB per file)
        </p>
      </div>

      {/* Validation errors */}
      <AnimatePresence>
        {errors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 space-y-1"
          >
            {errors.map((err) => (
              <div
                key={err.name}
                className="flex items-center gap-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
              >
                <AlertCircle size={13} className="flex-shrink-0" />
                {err.message}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* File list */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 space-y-2"
          >
            {files.map((file, idx) => (
              <motion.div
                key={`${file.name}-${file.size}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10, height: 0 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg border border-gray-200',
                  getFileBg(file)
                )}
              >
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-100">
                  {getFileIcon(file)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(idx);
                  }}
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors duration-150"
                  aria-label={`Remove ${file.name}`}
                >
                  <X size={13} />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
