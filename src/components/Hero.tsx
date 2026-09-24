import { Shield, Settings, Globe } from 'lucide-react';

export default function Hero() {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a1628 0%, #0f2040 40%, #0a1f3d 70%, #0d1b36 100%)',
        minHeight: '180px',
      }}
    >
      {/* Background image overlay */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: 'url(/images/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Industrial grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

      {/* Right side: Flow Control accent */}
      <div className="absolute right-0 top-0 bottom-0 w-48 md:w-64 bg-gradient-to-l from-[#1e3a5f]/90 to-transparent flex items-center justify-end pr-6 md:pr-10">
        <div className="text-right">
          <div className="text-[#3b82f6] text-2xl md:text-3xl font-extrabold leading-tight">Flow</div>
          <div className="text-white text-sm md:text-base font-light leading-tight">Control for</div>
          <div className="text-white text-sm md:text-base font-light leading-tight">a Better</div>
          <div className="text-white text-sm md:text-base font-bold leading-tight">Tomorrow</div>
          <div className="mt-2 w-8 h-0.5 bg-[#3b82f6] ml-auto" />
        </div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-blue-300/70 text-xs mb-4">
          <span>Home</span>
          <span>/</span>
          <span>Request a Quote</span>
          <span>/</span>
          <span className="text-blue-200">Ball Valve</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Left: Title */}
          <div>
            <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-2">
              Ball Valve –{' '}
              <span className="text-[#60a5fa]">Request for Quotation</span>
            </h1>
            <p className="text-blue-200/80 text-sm md:text-base leading-relaxed max-w-lg">
              Share your requirements and our team will get back to you with the best solution.
            </p>
          </div>

          {/* Center: Feature badges */}
          <div className="hidden md:flex flex-col gap-2 lg:ml-auto lg:mr-48">
            {[
              { icon: Shield, text: 'Reliable Performance' },
              { icon: Settings, text: 'Wide Range of Configurations' },
              { icon: Globe, text: 'Expert Technical Support' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full border border-blue-400/30 bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={14} className="text-blue-300" />
                </div>
                <span className="text-blue-100/90 text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
