import { ArrowRight, ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function ContactForm() {
  const [step, setStep] = useState(1);

  return (
    <div className="w-full max-w-4xl mx-auto bg-background border border-border-surgical p-8 md:p-16 relative overflow-hidden">
      <form
        className="space-y-12 relative"
        onSubmit={(e) => {
          e.preventDefault();
          setStep(4);
        }}
      >
        {/* Step 1: Identity */}
        <div
          className={`transition-all duration-500 ${
            step === 1 ? "opacity-100 relative" : "opacity-0 absolute pointer-events-none translate-y-10"
          }`}
        >
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-xs text-on-background border border-on-background w-6 h-6 flex items-center justify-center">
              01
            </span>
            <h2 className="font-headline text-2xl font-bold">Identity</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="group relative">
              <label className="font-mono text-[10px] uppercase text-on-surface-variant absolute -top-3 left-0 transition-all group-focus-within:text-on-background">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Alexander Vance"
                className="w-full bg-transparent border-b border-border-surgical focus:border-on-background outline-none py-4 font-body text-lg text-on-background placeholder:text-surface-container-highest transition-colors"
              />
            </div>

            <div className="group relative">
              <label className="font-mono text-[10px] uppercase text-on-surface-variant absolute -top-3 left-0 transition-all group-focus-within:text-on-background">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="vance@studio.com"
                className="w-full bg-transparent border-b border-border-surgical focus:border-on-background outline-none py-4 font-body text-lg text-on-background placeholder:text-surface-container-highest transition-colors"
              />
            </div>
          </div>

          <div className="mt-16 flex justify-end">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="bg-on-background text-background px-10 py-4 font-mono text-xs font-bold uppercase tracking-widest hover:invert transition-all flex items-center gap-3 cursor-pointer"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step 2: Architecture */}
        <div
          className={`transition-all duration-500 ${
            step === 2 ? "opacity-100 relative" : "opacity-0 absolute pointer-events-none translate-y-10"
          }`}
        >
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-xs text-on-background border border-on-background w-6 h-6 flex items-center justify-center">
              02
            </span>
            <h2 className="font-headline text-2xl font-bold">Architecture</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="group relative">
              <label className="font-mono text-[10px] uppercase text-on-surface-variant absolute -top-3 left-0 transition-all group-focus-within:text-on-background">
                Event Type
              </label>
              <select className="w-full bg-transparent border-b border-border-surgical focus:border-on-background outline-none py-4 font-body text-lg text-on-background appearance-none cursor-pointer">
                <option value="Wedding" className="bg-surface">Wedding</option>
                <option value="Corporate" className="bg-surface">Corporate Gala</option>
                <option value="Private Party" className="bg-surface">Private Salon</option>
                <option value="Other" className="bg-surface">Custom Instance</option>
              </select>
            </div>

            <div className="group relative">
              <label className="font-mono text-[10px] uppercase text-on-surface-variant absolute -top-3 left-0 transition-all group-focus-within:text-on-background">
                Guest Count
              </label>
              <input
                type="number"
                placeholder="000"
                className="w-full bg-transparent border-b border-border-surgical focus:border-on-background outline-none py-4 font-body text-lg text-on-background placeholder:text-surface-container-highest transition-colors"
              />
            </div>
          </div>

          <div className="mt-16 flex justify-between items-center">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-on-surface-variant font-mono text-xs font-bold uppercase tracking-widest hover:text-on-background transition-colors flex items-center gap-3 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="bg-on-background text-background px-10 py-4 font-mono text-xs font-bold uppercase tracking-widest hover:invert transition-all flex items-center gap-3 cursor-pointer"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step 3: Requirements */}
        <div
          className={`transition-all duration-500 ${
            step === 3 ? "opacity-100 relative" : "opacity-0 absolute pointer-events-none translate-y-10"
          }`}
        >
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-xs text-on-background border border-on-background w-6 h-6 flex items-center justify-center">
              03
            </span>
            <h2 className="font-headline text-2xl font-bold">Requirements</h2>
          </div>

          <div className="space-y-12">
            <div className="group relative">
              <label className="font-mono text-[10px] uppercase text-on-surface-variant absolute -top-3 left-0 transition-all group-focus-within:text-on-background">
                Design Vision & Specifications
              </label>
              <textarea
                placeholder="Describe the desired aesthetic, tonal requirements, and architectural constraints..."
                rows={4}
                className="w-full bg-transparent border-b border-border-surgical focus:border-on-background outline-none py-4 font-body text-lg text-on-background placeholder:text-surface-container-highest transition-colors resize-none mt-2"
              ></textarea>
            </div>
          </div>

          <div className="mt-16 flex justify-between items-center">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-on-surface-variant font-mono text-xs font-bold uppercase tracking-widest hover:text-on-background transition-colors flex items-center gap-3 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              type="submit"
              className="bg-on-background text-background px-10 py-4 font-mono text-xs font-bold uppercase tracking-widest hover:invert transition-all flex items-center gap-3 cursor-pointer"
            >
              Submit Inquiry
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Success Screen */}
        <div
          className={`transition-all duration-500 flex flex-col items-center justify-center text-center py-12 ${
            step === 4 ? "opacity-100 relative" : "opacity-0 absolute pointer-events-none translate-y-10"
          }`}
        >
          <CheckCircle2 className="w-16 h-16 text-on-background mb-8" />
          <h2 className="font-headline text-4xl font-bold text-on-background mb-4">
            Transmission Received
          </h2>
          <p className="font-body text-lg text-on-surface-variant max-w-md mx-auto">
            Your design request has been logged. Our curators will review the architectural alignment and contact you within 24 standard hours.
          </p>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="mt-12 font-mono text-xs font-bold text-on-background border border-on-background px-8 py-3 uppercase tracking-widest hover:bg-on-background hover:text-background transition-all cursor-pointer"
          >
            Start New Inquiry
          </button>
        </div>
      </form>

      {/* Grid Decorative Elements */}
      {step < 4 && (
        <div className="absolute top-0 right-0 p-4 opacity-30 pointer-events-none">
          <span className="font-mono text-[8px] uppercase block tracking-tighter text-on-surface-variant">
            Lat: 40.7128° N
          </span>
          <span className="font-mono text-[8px] uppercase block tracking-tighter text-on-surface-variant">
            Lon: 74.0060° W
          </span>
        </div>
      )}
    </div>
  );
}
