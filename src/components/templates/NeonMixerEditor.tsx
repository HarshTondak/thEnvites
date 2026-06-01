import { Zap, Upload, Plus } from "lucide-react";

export default function NeonMixerEditor() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <div className="flex-grow max-w-[1440px] mx-auto w-full px-5 md:px-margin-desktop py-24 md:py-32 flex justify-center">
        <div className="w-full max-w-2xl border border-[#222] bg-[#111] p-0 flex flex-col relative overflow-hidden group/wrapper shadow-2xl">
          <div className="absolute top-[10%] right-0 w-96 h-96 bg-[#D4AF37] blur-[150px] opacity-[0.15] pointer-events-none"></div>

          {/* Top Wide Poster Image */}
          <div className="w-full h-[400px] bg-[#222] overflow-hidden group/img relative cursor-pointer border-b border-[#222]">
            <img
              src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1200"
              alt="Club"
              className="w-full h-full object-cover opacity-60 group-hover/img:scale-105 transition-transform duration-700 mix-blend-screen"
            />
            <div className="absolute inset-0 bg-[#D4AF37]/20 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
              <Upload className="w-4 h-4 mr-2" /> Edit Poster Image
            </div>
            
            {/* Title Overlay */}
            <div className="absolute bottom-8 left-8 right-8">
               <input
                type="text"
                defaultValue="AFTERHOURS .04"
                className="w-full bg-transparent border-none p-0 font-headline text-5xl md:text-6xl font-bold tracking-tighter text-white focus:ring-0 focus:outline-none uppercase drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]"
               />
            </div>
          </div>
          
          <div className="p-8 md:p-12 relative z-10 text-white">
            <div className="mb-12 flex justify-between items-start opacity-50 group-hover/wrapper:opacity-100 transition-opacity">
              <p className="font-mono text-[10px] text-[#D4AF37] uppercase tracking-widest border border-[#D4AF37]/30 px-3 py-1 rounded-full">
                DARK MODE / NEON MIXER
              </p>
              <Zap className="w-5 h-5 text-[#D4AF37]" />
            </div>

            <div className="space-y-12">
               {/* Hosted By */}
               <div className="border-l-2 border-[#D4AF37] pl-6 py-2 group/field focus-within:bg-[#1a1a1a] transition-colors -ml-6 pr-6 rounded-r">
                 <label className="font-mono text-[10px] text-[#aaa] uppercase tracking-widest block mb-1">Hosted By</label>
                 <input
                  type="text"
                  defaultValue="VECTOR LABS COLLECTIVE"
                  className="w-full bg-transparent border-none p-0 font-mono text-sm tracking-widest focus:ring-0 focus:outline-none text-white uppercase"
                 />
               </div>

               {/* Grid: When & Where */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border border-[#333] bg-[#0a0a0a] p-8 relative overflow-hidden group/grid">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-0 group-hover/grid:opacity-100 transition-opacity"></div>
                  <div>
                    <label className="font-mono text-[10px] text-[#D4AF37] uppercase tracking-widest block mb-4">Time Syntax</label>
                    <input
                      type="text"
                      defaultValue="11.12.2024"
                      className="w-full bg-transparent border-none p-0 font-headline text-2xl focus:ring-0 focus:outline-none text-white mb-1"
                    />
                    <input
                      type="text"
                      defaultValue="23:00 — Sunrise"
                      className="w-full bg-transparent border-none p-0 font-mono text-xs text-[#aaa] focus:ring-0 focus:outline-none uppercase"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] text-[#D4AF37] uppercase tracking-widest block mb-4">Coordinates</label>
                    <input
                      type="text"
                      defaultValue="Sub-level 04"
                      className="w-full bg-transparent border-none p-0 font-headline text-2xl focus:ring-0 focus:outline-none text-white mb-1"
                    />
                    <textarea
                      defaultValue={"Industrial District\nEntry via Alley B"}
                      className="w-full bg-transparent border-none p-0 font-mono text-xs text-[#aaa] focus:ring-0 focus:outline-none uppercase h-12 resize-none"
                    ></textarea>
                  </div>
               </div>

               {/* Lineup / Guest List */}
               <div className="pt-8 border-t border-[#222]">
                  <label className="font-mono text-[10px] uppercase tracking-widest block mb-8 text-center text-[#D4AF37]">Sonic Architecture</label>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center group/item hover:bg-[#1a1a1a] p-3 -mx-3 transition-colors rounded">
                      <input type="text" defaultValue="DJ ALCHEMIST" className="bg-transparent border-none p-0 font-headline text-xl focus:ring-0 focus:outline-none text-white uppercase w-1/2" />
                      <input type="text" defaultValue="23:00" className="bg-transparent border-none p-0 font-mono text-sm focus:ring-0 focus:outline-none text-[#aaa] text-right w-1/2" />
                    </div>
                    <div className="flex justify-between items-center group/item hover:bg-[#1a1a1a] p-3 -mx-3 transition-colors rounded">
                      <input type="text" defaultValue="NEURAL NET" className="bg-transparent border-none p-0 font-headline text-xl focus:ring-0 focus:outline-none text-white uppercase w-1/2" />
                      <input type="text" defaultValue="01:30" className="bg-transparent border-none p-0 font-mono text-sm focus:ring-0 focus:outline-none text-[#aaa] text-right w-1/2" />
                    </div>
                    <div className="flex justify-between items-center group/item hover:bg-[#1a1a1a] p-3 -mx-3 transition-colors rounded">
                      <input type="text" defaultValue="B2B MYSTERY GUEST" className="bg-transparent border-none p-0 font-headline text-xl text-[#D4AF37] focus:ring-0 focus:outline-none uppercase w-1/2 shadow-none drop-shadow-[0_0_5px_rgba(212,175,55,0.3)]" />
                      <input type="text" defaultValue="03:00" className="bg-transparent border-none p-0 font-mono text-sm focus:ring-0 focus:outline-none text-[#aaa] text-right w-1/2" />
                    </div>
                    <button className="w-full py-4 mt-4 border border-dashed border-[#333] text-[#aaa] font-mono text-[10px] uppercase tracking-widest hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors flex items-center justify-center cursor-pointer">
                       <Plus className="w-3 h-3 mr-2" /> Add Artist
                    </button>
                  </div>
               </div>
               
               <div className="text-center pt-12 border-t border-[#222]">
                  <p className="font-mono text-xs text-[#aaa] uppercase tracking-widest mb-4">Strict Capacity. RSVP Required.</p>
                  <div className="inline-block border border-[#D4AF37] p-1 px-4">
                     <input
                      type="text"
                      defaultValue="ACCESS CODE: OMEGA"
                      className="w-full bg-transparent border-none p-0 font-headline tracking-widest text-[#D4AF37] text-xl focus:ring-0 focus:outline-none text-center uppercase min-w-[250px]"
                     />
                  </div>
               </div>
            </div>
            
            <div className="mt-16 pt-8 border-t border-[#222] flex flex-col md:flex-row justify-between items-center gap-6">
               <button className="text-[#aaa] font-mono text-[10px] uppercase tracking-widest hover:text-white transition-colors cursor-pointer">
                  Discard Draft
               </button>
               <div className="flex gap-4 w-full md:w-auto">
                 <button className="flex-1 text-center border border-[#D4AF37] text-[#D4AF37] font-mono text-xs uppercase tracking-widest px-8 py-4 hover:bg-[#D4AF37]/10 transition-colors bg-[#111] cursor-pointer">
                   Preview
                 </button>
                 <button className="flex-1 text-center bg-[#D4AF37] text-black font-mono text-xs uppercase tracking-widest font-bold px-8 py-4 hover:bg-white transition-colors cursor-pointer">
                   Deploy Base
                 </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
