import { Upload, Plus } from "lucide-react";

export default function CorporateGalaEditor() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex-grow max-w-[1440px] mx-auto w-full px-5 md:px-margin-desktop py-24 md:py-32 flex justify-center">
        <div className="w-full max-w-4xl bg-surface-container-low shadow-sm border border-border-surgical flex flex-col hover:border-on-surface-variant transition-colors group/wrapper">
          
          {/* Internal Header */}
          <div className="flex justify-between items-center p-8 border-b border-border-surgical">
            <input
              type="text"
              defaultValue="ATLAS GLOBAL"
              className="bg-transparent border-none p-0 font-mono text-xs font-bold uppercase tracking-[0.3em] focus:ring-0 focus:outline-none text-on-surface w-1/2"
            />
            <div className="text-right">
              <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest opacity-50 group-hover/wrapper:opacity-100 transition-opacity">
                Template 03 / Corporate
              </p>
            </div>
          </div>

          <div className="p-8 md:p-16">
            {/* Title & Description */}
            <div className="max-w-3xl mb-16">
              <input
                  type="text"
                  defaultValue="2024 Innovation Summit & Gala"
                  className="w-full bg-transparent border-none p-0 font-headline text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-8 focus:ring-0 focus:outline-none text-on-surface"
              />
              <textarea
                  defaultValue="Join industry leaders for an exclusive evening of architectural insights, networking, and a vision of the future. The annual gala represents the pinnacle of our strategic year."
                  className="w-full bg-transparent border-none p-0 font-body text-lg text-on-surface-variant leading-relaxed h-24 resize-none focus:ring-0 focus:outline-none"
              ></textarea>
            </div>

            {/* Quick Details Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-y border-border-surgical divide-y md:divide-y-0 md:divide-x divide-border-surgical mb-16">
               <div className="p-6 md:px-8 bg-surface-container-lowest focus-within:bg-surface-container transition-colors">
                 <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest block mb-2">Date</span>
                 <input type="text" defaultValue="October 12, 2024" className="w-full bg-transparent border-none p-0 font-body text-sm font-medium focus:ring-0 focus:outline-none" />
               </div>
               <div className="p-6 md:px-8 bg-surface-container-lowest focus-within:bg-surface-container transition-colors">
                 <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest block mb-2">Time</span>
                 <input type="text" defaultValue="18:00 - 23:00" className="w-full bg-transparent border-none p-0 font-body text-sm font-medium focus:ring-0 focus:outline-none" />
               </div>
               <div className="p-6 md:px-8 bg-surface-container-lowest focus-within:bg-surface-container transition-colors">
                 <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest block mb-2">Dress Code</span>
                 <input type="text" defaultValue="Black Tie Formative" className="w-full bg-transparent border-none p-0 font-body text-sm font-medium focus:ring-0 focus:outline-none" />
               </div>
               <div className="p-6 md:px-8 bg-surface-container-lowest focus-within:bg-surface-container transition-colors">
                 <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest block mb-2">Admittance</span>
                 <input type="text" defaultValue="By Invitation Only" className="w-full bg-transparent border-none p-0 font-body text-sm font-medium focus:ring-0 focus:outline-none" />
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Left: Agenda */}
                <div className="lg:col-span-7">
                  <h3 className="font-headline text-2xl font-bold mb-8 flex items-center gap-4">
                     Agenda <span className="h-[1px] flex-grow bg-border-surgical"></span>
                  </h3>
                  <div className="space-y-0">
                     {/* Agenda Item */}
                     <div className="flex gap-6 py-6 border-b border-border-surgical group/agenda hover:bg-surface-container -mx-4 px-4 rounded transition-colors">
                        <input type="text" defaultValue="18:00" className="w-16 md:w-24 bg-transparent border-none p-0 font-mono text-sm text-on-surface-variant focus:ring-0 focus:outline-none shrink-0" />
                        <div>
                           <input type="text" defaultValue="Cocktail Reception" className="w-full bg-transparent border-none p-0 font-headline text-lg font-bold focus:ring-0 focus:outline-none mb-1" />
                           <input type="text" defaultValue="The Grand Foyer" className="w-full bg-transparent border-none p-0 font-body text-sm text-on-surface-variant focus:ring-0 focus:outline-none" />
                        </div>
                     </div>
                     <div className="flex gap-6 py-6 border-b border-border-surgical group/agenda hover:bg-surface-container -mx-4 px-4 rounded transition-colors">
                        <input type="text" defaultValue="19:30" className="w-16 md:w-24 bg-transparent border-none p-0 font-mono text-sm text-on-surface-variant focus:ring-0 focus:outline-none shrink-0" />
                        <div>
                           <input type="text" defaultValue="Three-Course Gala Dinner" className="w-full bg-transparent border-none p-0 font-headline text-lg font-bold focus:ring-0 focus:outline-none mb-1" />
                           <input type="text" defaultValue="Main Ballroom" className="w-full bg-transparent border-none p-0 font-body text-sm text-on-surface-variant focus:ring-0 focus:outline-none" />
                        </div>
                     </div>
                     <div className="flex gap-6 py-6 border-b border-border-surgical group/agenda hover:bg-surface-container -mx-4 px-4 rounded transition-colors">
                        <input type="text" defaultValue="21:00" className="w-16 md:w-24 bg-transparent border-none p-0 font-mono text-sm text-on-surface-variant focus:ring-0 focus:outline-none shrink-0" />
                        <div>
                           <input type="text" defaultValue="Keynote Address" className="w-full bg-transparent border-none p-0 font-headline text-lg font-bold focus:ring-0 focus:outline-none mb-1" />
                           <input type="text" defaultValue="Strategic Outlook for 2025" className="w-full bg-transparent border-none p-0 font-body text-sm text-accent-energy focus:ring-0 focus:outline-none" />
                        </div>
                     </div>
                     <button className="w-full py-4 mt-6 border border-dashed border-border-surgical text-on-surface-variant font-mono text-[10px] uppercase tracking-widest hover:border-on-surface hover:text-on-surface transition-colors flex items-center justify-center cursor-pointer">
                       <Plus className="w-3 h-3 mr-2" /> Add Schedule Block
                     </button>
                  </div>
                </div>

                {/* Right: Keynotes & Venue */}
                <div className="lg:col-span-5 space-y-12">
                   <div>
                      <h3 className="font-headline text-xl font-bold mb-6">Key Speakers</h3>
                      <div className="space-y-4">
                         <div className="flex items-center gap-4 bg-surface-container p-4 border border-border-surgical hover:border-on-surface transition-colors cursor-pointer group/speaker relative">
                            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-border-surgical relative">
                               <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" alt="CEO" className="w-full h-full object-cover grayscale" />
                               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/speaker:opacity-100 flex items-center justify-center transition-opacity">
                                  <Upload className="w-3 h-3 text-white" />
                                </div>
                            </div>
                            <div>
                               <input type="text" defaultValue="Sarah Jenkins" className="w-full bg-transparent border-none p-0 font-headline text-base font-bold focus:ring-0 focus:outline-none pointer-events-none" />
                               <input type="text" defaultValue="Chief Executive Officer" className="w-full bg-transparent border-none p-0 font-body text-xs text-on-surface-variant mt-1 focus:ring-0 focus:outline-none pointer-events-none" />
                            </div>
                         </div>
                         <button className="w-full py-4 border border-dashed border-border-surgical text-on-surface-variant font-mono text-[10px] uppercase tracking-widest hover:border-on-surface hover:text-on-surface transition-colors flex items-center justify-center cursor-pointer">
                           <Plus className="w-3 h-3 mr-2" /> Add Speaker
                         </button>
                      </div>
                   </div>

                   <div>
                      <h3 className="font-headline text-xl font-bold mb-6">Venue</h3>
                      <div className="border border-border-surgical p-6 bg-background focus-within:border-on-surface transition-colors">
                         <input type="text" defaultValue="The National Architectural Museum" className="w-full bg-transparent border-none p-0 font-headline text-base font-bold mb-2 focus:ring-0 focus:outline-none" />
                         <textarea defaultValue={"100 Gallery Row\nMetropolis, NY 10012"} className="w-full bg-transparent border-none p-0 font-body text-sm text-on-surface-variant h-12 resize-none focus:ring-0 focus:outline-none"></textarea>
                      </div>
                   </div>
                </div>
            </div>

            <div className="mt-24 pt-8 border-t border-border-surgical flex flex-col md:flex-row justify-between items-center gap-6">
               <button className="bg-transparent text-on-surface-variant font-mono text-[10px] uppercase tracking-widest hover:text-on-surface transition-colors cursor-pointer">
                  Discard Draft
               </button>
               <div className="flex gap-4 w-full md:w-auto">
                   <button className="flex-1 text-center bg-transparent border border-on-surface text-on-surface font-mono text-xs uppercase tracking-widest font-bold px-8 py-4 hover:bg-surface-container-highest transition-colors cursor-pointer">
                     Preview Mode
                   </button>
                   <button className="flex-1 text-center bg-on-surface text-background font-mono text-xs uppercase tracking-widest font-bold px-8 py-4 hover:opacity-90 transition-opacity cursor-pointer">
                     Deploy Link
                   </button>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
