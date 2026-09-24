import { ClipboardList, Settings, Paperclip, Globe } from 'lucide-react';

const footerItems = [
  { icon: ClipboardList, title: 'Guided Valve RFQ', desc: 'Choose essential specifications quickly.' },
  { icon: Settings, title: 'Optional Specifications', desc: 'Provide details when you have them.' },
  { icon: Paperclip, title: 'Technical Documents', desc: 'Attach drawings and specification files.' },
  { icon: Globe, title: 'Integration-Ready Concept', desc: 'Designed for a future website connection.' },
];

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/5 bg-[#0a1628]">
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {footerItems.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#1e3a5f]">
                <Icon size={16} className="text-[#60a5fa]" aria-hidden="true" />
              </div>
              <div>
                <div className="mb-1 text-sm font-semibold leading-tight text-white">{title}</div>
                <div className="text-xs leading-relaxed text-slate-400">{desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 border-t border-white/10 pt-5 text-center text-xs text-slate-400">
          Ball Valve Guided RFQ concept • Interactive frontend demo • No data is transmitted to Evolve Industries.
        </div>
      </div>
    </footer>
  );
}
