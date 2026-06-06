import { Zap, Upload, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function NeonMixerEditor({
  initialData,
}: {
  initialData?: any;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lineup, setLineup] = useState<Array<{ name: string; time: string }>>(
    initialData?.customFields?.lineup || [
      { name: "DJ ALCHEMIST", time: "23:00" },
      { name: "NEURAL NET", time: "01:30" },
      { name: "B2B MYSTERY GUEST", time: "03:00" },
    ],
  );

  const addArtist = () => {
    setLineup([...lineup, { name: "NEW ARTIST", time: "04:30" }]);
  };

  const removeArtist = (index: number) => {
    setLineup(lineup.filter((_, idx) => idx !== index));
  };

  const handleArtistChange = (
    index: number,
    key: "name" | "time",
    value: string,
  ) => {
    const updated = [...lineup];
    updated[index][key] = value;
    setLineup(updated);
  };

  const handleDeploy = async () => {
    setLoading(true);
    setError("");

    try {
      const getVal = (name: string) => {
        const el = document.getElementsByName(name)[0] as
          | HTMLInputElement
          | HTMLTextAreaElement;
        return el ? el.value : "";
      };

      const payload = {
        templateId: "neon-mixer",
        title: getVal("title"),
        hostName: getVal("hostName"),
        eventDate: getVal("eventDate"),
        eventTime: getVal("eventTime"),
        locationName: getVal("locationName"),
        locationAddress: getVal("locationAddress"),
        dressCode: getVal("dressCode"), // Stores access code
        images: [
          "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1563841930606-67e2bce48b78?auto=format&fit=crop&q=80&w=400",
        ],
        customFields: {
          lineup,
        },
      };

      const isEdit = !!initialData;
      const url = isEdit ? `/api/invites/${initialData._id}` : "/api/invites";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to deploy invitation.");
      }

      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || "Failed to process invitation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <div className="grow max-w-360 mx-auto w-full px-5 md:px-margin-desktop py-24 md:py-32 flex justify-center">
        <div className="w-full max-w-2xl border border-[#222] bg-[#111] p-0 flex flex-col relative overflow-hidden group/wrapper shadow-2xl">
          <div className="absolute top-[10%] right-0 w-96 h-96 bg-accent-energy blur-[150px] opacity-[0.15] pointer-events-none"></div>

          {/* Top Wide Poster Image */}
          <div className="w-full h-100 bg-[#222] overflow-hidden group/img relative cursor-pointer border-b border-[#222]">
            <img
              src={
                initialData?.images?.[0] ||
                "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1200"
              }
              alt="Club"
              className="w-full h-full object-cover opacity-60 group-hover/img:scale-105 transition-transform duration-700 mix-blend-screen"
            />
            <div className="absolute inset-0 bg-accent-energy/20 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity text-xs font-mono uppercase tracking-widest text-accent-energy">
              <Upload className="w-4 h-4 mr-2" /> Edit Poster Image
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-8 left-8 right-8">
              <input
                type="text"
                name="title"
                defaultValue={
                  initialData ? initialData.title : "AFTERHOURS .04"
                }
                className="w-full bg-transparent border-none p-0 font-headline text-5xl md:text-6xl font-bold tracking-tighter text-white focus:ring-0 focus:outline-none uppercase drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]"
              />
            </div>
          </div>

          <div className="p-8 md:p-12 relative z-10 text-white">
            <div className="mb-12 flex justify-between items-start opacity-50 group-hover/wrapper:opacity-100 transition-opacity">
              <p className="font-mono text-[10px] text-accent-energy uppercase tracking-widest border border-accent-energy/30 px-3 py-1 rounded-full">
                DARK MODE / NEON MIXER
              </p>
              <Zap className="w-5 h-5 text-accent-energy" />
            </div>

            <div className="space-y-12">
              {/* Hosted By */}
              <div className="border-l-2 border-accent-energy pl-6 py-2 group/field focus-within:bg-[#1a1a1a] transition-colors -ml-6 pr-6 rounded-r">
                <label className="font-mono text-[10px] text-[#aaa] uppercase tracking-widest block mb-1">
                  Hosted By
                </label>
                <input
                  type="text"
                  name="hostName"
                  defaultValue={
                    initialData
                      ? initialData.hostName
                      : "VECTOR LABS COLLECTIVE"
                  }
                  className="w-full bg-transparent border-none p-0 font-mono text-sm tracking-widest focus:ring-0 focus:outline-none text-white uppercase"
                />
              </div>

              {/* Grid: When & Where */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border border-[#333] bg-[#0a0a0a] p-8 relative overflow-hidden group/grid">
                <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-accent-energy/50 to-transparent opacity-0 group-hover/grid:opacity-100 transition-opacity"></div>
                <div>
                  <label className="font-mono text-[10px] text-accent-energy uppercase tracking-widest block mb-4">
                    Time Syntax
                  </label>
                  <input
                    type="text"
                    name="eventDate"
                    defaultValue={
                      initialData ? initialData.eventDate : "11.12.2024"
                    }
                    className="w-full bg-transparent border-none p-0 font-headline text-2xl focus:ring-0 focus:outline-none text-white mb-1"
                  />
                  <input
                    type="text"
                    name="eventTime"
                    defaultValue={
                      initialData ? initialData.eventTime : "23:00 — Sunrise"
                    }
                    className="w-full bg-transparent border-none p-0 font-mono text-xs text-[#aaa] focus:ring-0 focus:outline-none uppercase"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] text-accent-energy uppercase tracking-widest block mb-4">
                    Coordinates
                  </label>
                  <input
                    type="text"
                    name="locationName"
                    defaultValue={
                      initialData ? initialData.locationName : "Sub-level 04"
                    }
                    className="w-full bg-transparent border-none p-0 font-headline text-2xl focus:ring-0 focus:outline-none text-white mb-1"
                  />
                  <textarea
                    name="locationAddress"
                    defaultValue={
                      initialData
                        ? initialData.locationAddress
                        : "Industrial District\nEntry via Alley B"
                    }
                    className="w-full bg-transparent border-none p-0 font-mono text-xs text-[#aaa] focus:ring-0 focus:outline-none uppercase h-12 resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Lineup / Guest List */}
              <div className="pt-8 border-t border-[#222]">
                <label className="font-mono text-[10px] uppercase tracking-widest block mb-8 text-center text-accent-energy">
                  Sonic Architecture
                </label>

                <div className="space-y-2">
                  {lineup.map((artist, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center group/item hover:bg-[#1a1a1a] p-3 -mx-3 transition-colors rounded"
                    >
                      <input
                        type="text"
                        value={artist.name}
                        onChange={(e) =>
                          handleArtistChange(index, "name", e.target.value)
                        }
                        className="bg-transparent border-none p-0 font-headline text-xl focus:ring-0 focus:outline-none text-white uppercase w-[40%]"
                      />
                      <div className="flex items-center gap-3 w-[50%] justify-end">
                        <input
                          type="text"
                          value={artist.time}
                          onChange={(e) =>
                            handleArtistChange(index, "time", e.target.value)
                          }
                          className="bg-transparent border-none p-0 font-mono text-sm focus:ring-0 focus:outline-none text-[#aaa] text-right w-20"
                        />
                        <button
                          type="button"
                          onClick={() => removeArtist(index)}
                          className="opacity-0 group-hover/item:opacity-100 text-red-400 hover:text-red-500 transition-opacity p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addArtist}
                    className="w-full py-4 mt-4 border border-dashed border-[#333] text-[#aaa] font-mono text-[10px] uppercase tracking-widest hover:border-accent-energy hover:text-accent-energy transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <Plus className="w-3 h-3 mr-2" /> Add Artist
                  </button>
                </div>
              </div>

              <div className="text-center pt-12 border-t border-[#222]">
                <p className="font-mono text-xs text-[#aaa] uppercase tracking-widest mb-4">
                  Strict Capacity. RSVP Required.
                </p>
                <div className="inline-block border border-accent-energy p-1 px-4">
                  <input
                    type="text"
                    name="dressCode"
                    defaultValue={
                      initialData ? initialData.dressCode : "ACCESS CODE: OMEGA"
                    }
                    className="w-full bg-transparent border-none p-0 font-headline tracking-widest text-accent-energy text-xl focus:ring-0 focus:outline-none text-center uppercase min-w-62.5"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="text-xs text-red-500 font-mono mb-4 text-center px-8">
                {error}
              </div>
            )}

            <div className="mt-8 p-8 border-t border-[#222] flex flex-col md:flex-row justify-between items-center gap-6 relative z-20">
              <button
                type="button"
                onClick={() => (window.location.href = "/dashboard")}
                className="text-[#aaa] font-mono text-[10px] uppercase tracking-widest hover:text-white transition-colors cursor-pointer"
              >
                Discard Draft
              </button>
              <div className="flex gap-4 w-full md:w-auto">
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleDeploy}
                  className="flex-1 text-center bg-accent-energy text-black font-mono text-xs uppercase tracking-widest font-bold px-8 py-4 hover:bg-white transition-colors cursor-pointer disabled:opacity-50"
                >
                  {loading
                    ? "Processing..."
                    : initialData
                      ? "Save Changes"
                      : "Deploy Base"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
