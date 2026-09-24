import { useState } from 'react';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Home', hasDropdown: false },
  { label: 'About Us', hasDropdown: false },
  { label: 'Products', hasDropdown: true },
  { label: 'Industries', hasDropdown: true },
  { label: 'Quality', hasDropdown: false },
  { label: 'Resources', hasDropdown: true },
  { label: 'Contact Us', hasDropdown: false },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Evolve Industries Logo Mark */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 relative flex-shrink-0">
                <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <circle cx="18" cy="18" r="17" stroke="#1e3a5f" strokeWidth="2" fill="none"/>
                  <circle cx="18" cy="18" r="8" fill="#1e3a5f"/>
                  <path d="M18 4 L18 12 M18 24 L18 32 M4 18 L12 18 M24 18 L32 18" stroke="#1e3a5f" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="18" cy="18" r="3" fill="#2563eb"/>
                </svg>
              </div>
              <div>
                <div className="text-[#1e3a5f] font-extrabold text-lg leading-none tracking-wider uppercase">
                  EVOLVE
                  <span className="text-[#2563eb]">®</span>
                </div>
                <div className="text-[#1e3a5f] font-semibold text-[8px] tracking-[0.2em] uppercase leading-none">
                  INDUSTRIES
                </div>
                <div className="text-gray-400 text-[7px] tracking-wide leading-none mt-0.5">
                  Engineered for a Better Tomorrow
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                className="flex items-center gap-0.5 px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#1e3a5f] transition-colors duration-150 rounded-md hover:bg-gray-50"
                onClick={() => {}}
              >
                {item.label}
                {item.hasDropdown && (
                  <ChevronDown size={13} className="text-gray-400 mt-0.5" />
                )}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Demo badge */}
            <div className="hidden sm:flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-amber-700 text-xs font-semibold tracking-wide">Interactive RFQ Demo</span>
            </div>

            {/* CTA Button */}
            <button className="hidden sm:flex items-center gap-2 bg-[#1e3a5f] hover:bg-[#162d4a] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-900/20 active:scale-95">
              Request a Quote
              <ArrowRight size={15} />
            </button>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-[#1e3a5f]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-gray-100 bg-white overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-[#1e3a5f] hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown size={14} className="text-gray-400" />}
                </button>
              ))}
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-3 py-1.5 w-fit mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-amber-700 text-xs font-semibold">Interactive RFQ Demo</span>
                </div>
                <button className="flex items-center justify-center gap-2 w-full bg-[#1e3a5f] text-white text-sm font-semibold px-5 py-3 rounded-lg">
                  Request a Quote <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
