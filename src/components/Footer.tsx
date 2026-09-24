import { Shield, Settings, Users, Globe } from 'lucide-react';

const footerItems = [
  {
    icon: Shield,
    title: 'Trusted by Global Industries',
    desc: 'Delivering reliable valve solutions worldwide',
  },
  {
    icon: Settings,
    title: 'Engineered for Performance',
    desc: 'Quality, Safety, Sustainability.',
  },
  {
    icon: Users,
    title: 'Expert Technical Support',
    desc: 'From specification to supply',
  },
  {
    icon: Globe,
    title: 'A Stronger, Safer Tomorrow',
    desc: 'Through Better Flow Control',
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a1628] border-t border-white/5 mt-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {footerItems.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#1e3a5f] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon size={16} className="text-[#60a5fa]" />
              </div>
              <div>
                <div className="text-white text-sm font-semibold leading-tight mb-1">{title}</div>
                <div className="text-slate-400 text-xs leading-relaxed">{desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-white/5 mt-6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-slate-500 text-xs">
            © 2026 Evolve Industries. Interactive RFQ Demo.
          </div>
          <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-400/20 rounded-full px-3 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-amber-400/80 text-xs font-medium">
              This is an interactive frontend demo only. No real data is stored or transmitted.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
