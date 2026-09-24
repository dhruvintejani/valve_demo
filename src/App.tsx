import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import RFQForm from './components/RFQForm';
import ConfirmationScreen from './components/ConfirmationScreen';
import Footer from './components/Footer';
import { RFQData, SubmissionResult } from './types/rfq';

type Screen = 'form' | 'confirmation';

export default function App() {
  const [screen, setScreen] = useState<Screen>('form');
  const [submittedData, setSubmittedData] = useState<RFQData | null>(null);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);

  const handleSubmitSuccess = (data: RFQData, result: SubmissionResult) => {
    setSubmittedData(data);
    setSubmissionResult(result);
    setScreen('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitAnother = () => {
    setSubmittedData(null);
    setSubmissionResult(null);
    setScreen('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRequestQuote = () => {
    if (screen === 'confirmation') {
      handleSubmitAnother();
    } else {
      document.getElementById('rfq-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] font-sans">
      <Header onRequestQuote={handleRequestQuote} />

      <AnimatePresence mode="wait">
        {screen === 'form' ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Hero />
            <RFQForm onSubmitSuccess={handleSubmitSuccess} />
          </motion.div>
        ) : (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Reuse hero with different subtitle on confirmation */}
            <div
              className="relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #0a1628 0%, #0f2040 40%, #0a1f3d 70%, #0d1b36 100%)',
                minHeight: '140px',
              }}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'url(/images/hero-bg.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
              <div className="absolute right-0 top-0 bottom-0 w-48 md:w-64 bg-gradient-to-l from-[#1e3a5f]/90 to-transparent flex items-center justify-end pr-6 md:pr-10">
                <div className="text-right">
                  <div className="text-[#3b82f6] text-2xl md:text-3xl font-extrabold leading-tight">Flow</div>
                  <div className="text-white text-sm md:text-base font-light leading-tight">Control for</div>
                  <div className="text-white text-sm md:text-base font-light leading-tight">a Better</div>
                  <div className="text-white text-sm md:text-base font-bold leading-tight">Tomorrow</div>
                  <div className="mt-2 w-8 h-0.5 bg-[#3b82f6] ml-auto" />
                </div>
              </div>
              <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center gap-2 text-blue-300/70 text-xs mb-3">
                  <span>Home</span>
                  <span>/</span>
                  <span>Request a Quote</span>
                  <span>/</span>
                  <span className="text-blue-200">Ball Valve</span>
                </div>
                <h1 className="text-white text-2xl md:text-3xl font-bold">
                  Ball Valve – <span className="text-[#60a5fa]">Request for Quotation</span>
                </h1>
                <p className="text-blue-200/70 text-sm mt-1">
                  Thank you for your interest. We have received your requirement.
                </p>
              </div>
            </div>

            {submittedData && submissionResult && (
              <ConfirmationScreen
                data={submittedData}
                result={submissionResult}
                onSubmitAnother={handleSubmitAnother}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
