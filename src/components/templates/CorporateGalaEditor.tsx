import { Upload, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function CorporateGalaEditor({
  initialData,
}: {
  initialData?: any;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [agenda, setAgenda] = useState<
    Array<{ time: string; title: string; subtitle: string }>
  >(
    initialData?.customFields?.agenda || [
      {
        time: "18:00",
        title: "Cocktail Reception",
        subtitle: "The Grand Foyer",
      },
      {
        time: "19:30",
        title: "Three-Course Gala Dinner",
        subtitle: "Main Ballroom",
      },
      {
        time: "21:00",
        title: "Keynote Address",
        subtitle: "Strategic Outlook for 2025",
      },
    ],
  );

  const [speakers, setSpeakers] = useState<
    Array<{ name: string; title: string; imageUrl: string }>
  >(
    initialData?.customFields?.speakers || [
      {
        name: "Sarah Jenkins",
        title: "Chief Executive Officer",
        imageUrl:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
      },
    ],
  );

  const addAgendaItem = () => {
    setAgenda([
      ...agenda,
      {
        time: "22:00",
        title: "Networking Reception",
        subtitle: "Garden Terrace",
      },
    ]);
  };

  const removeAgendaItem = (index: number) => {
    setAgenda(agenda.filter((_, idx) => idx !== index));
  };

  const handleAgendaChange = (
    index: number,
    key: "time" | "title" | "subtitle",
    value: string,
  ) => {
    const updated = [...agenda];
    updated[index][key] = value;
    setAgenda(updated);
  };

  const addSpeaker = () => {
    setSpeakers([
      ...speakers,
      {
        name: "Speaker Name",
        title: "Job Title / Company",
        imageUrl:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
      },
    ]);
  };

  const removeSpeaker = (index: number) => {
    setSpeakers(speakers.filter((_, idx) => idx !== index));
  };

  const handleSpeakerChange = (
    index: number,
    key: "name" | "title",
    value: string,
  ) => {
    const updated = [...speakers];
    updated[index][key] = value;
    setSpeakers(updated);
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
        templateId: "corporate-gala",
        title: getVal("title"),
        hostName: getVal("hostName"),
        eventDate: getVal("eventDate"),
        eventTime: getVal("eventTime"),
        locationName: getVal("locationName"),
        locationAddress: getVal("locationAddress"),
        dressCode: getVal("dressCode"),
        images: [
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
        ],
        customFields: {
          admittance: getVal("admittance"),
          bodyText: getVal("bodyText"),
          agenda,
          speakers,
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
    <div className="flex flex-col min-h-screen bg-background">
      <div className="grow max-w-360 mx-auto w-full px-5 md:px-margin-desktop py-24 md:py-32 flex justify-center">
        <div className="w-full max-w-4xl bg-surface-container-low shadow-sm border border-border-surgical flex flex-col hover:border-on-surface-variant transition-colors group/wrapper">
          {/* Internal Header */}
          <div className="flex justify-between items-center p-8 border-b border-border-surgical">
            <input
              type="text"
              name="hostName"
              defaultValue={initialData ? initialData.hostName : "ATLAS GLOBAL"}
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
                name="title"
                defaultValue={
                  initialData
                    ? initialData.title
                    : "2024 Innovation Summit & Gala"
                }
                className="w-full bg-transparent border-none p-0 font-headline text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-8 focus:ring-0 focus:outline-none text-on-surface"
              />
              <textarea
                name="bodyText"
                defaultValue={
                  initialData?.customFields?.bodyText ||
                  "Join industry leaders for an exclusive evening of architectural insights, networking, and a vision of the future. The annual gala represents the pinnacle of our strategic year."
                }
                className="w-full bg-transparent border-none p-0 font-body text-lg text-on-surface-variant leading-relaxed h-24 resize-none focus:ring-0 focus:outline-none"
              ></textarea>
            </div>

            {/* Quick Details Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-y border-border-surgical divide-y md:divide-y-0 md:divide-x divide-border-surgical mb-16">
              <div className="p-6 md:px-8 bg-surface-container-lowest focus-within:bg-surface-container transition-colors">
                <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest block mb-2">
                  Date
                </span>
                <input
                  type="text"
                  name="eventDate"
                  defaultValue={
                    initialData ? initialData.eventDate : "October 12, 2024"
                  }
                  className="w-full bg-transparent border-none p-0 font-body text-sm font-medium focus:ring-0 focus:outline-none"
                />
              </div>
              <div className="p-6 md:px-8 bg-surface-container-lowest focus-within:bg-surface-container transition-colors">
                <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest block mb-2">
                  Time
                </span>
                <input
                  type="text"
                  name="eventTime"
                  defaultValue={
                    initialData ? initialData.eventTime : "18:00 - 23:00"
                  }
                  className="w-full bg-transparent border-none p-0 font-body text-sm font-medium focus:ring-0 focus:outline-none"
                />
              </div>
              <div className="p-6 md:px-8 bg-surface-container-lowest focus-within:bg-surface-container transition-colors">
                <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest block mb-2">
                  Dress Code
                </span>
                <input
                  type="text"
                  name="dressCode"
                  defaultValue={
                    initialData ? initialData.dressCode : "Black Tie Formative"
                  }
                  className="w-full bg-transparent border-none p-0 font-body text-sm font-medium focus:ring-0 focus:outline-none"
                />
              </div>
              <div className="p-6 md:px-8 bg-surface-container-lowest focus-within:bg-surface-container transition-colors">
                <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest block mb-2">
                  Admittance
                </span>
                <input
                  type="text"
                  name="admittance"
                  defaultValue={
                    initialData?.customFields?.admittance ||
                    "By Invitation Only"
                  }
                  className="w-full bg-transparent border-none p-0 font-body text-sm font-medium focus:ring-0 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Left: Agenda */}
              <div className="lg:col-span-7">
                <h3 className="font-headline text-2xl font-bold mb-8 flex items-center gap-4">
                  Agenda <span className="h-px grow bg-border-surgical"></span>
                </h3>
                <div className="space-y-0">
                  {agenda.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-6 py-6 border-b border-border-surgical group/agenda hover:bg-surface-container -mx-4 px-4 rounded transition-colors relative"
                    >
                      <input
                        type="text"
                        value={item.time}
                        onChange={(e) =>
                          handleAgendaChange(index, "time", e.target.value)
                        }
                        className="w-16 md:w-24 bg-transparent border-none p-0 font-mono text-sm text-on-surface-variant focus:ring-0 focus:outline-none shrink-0"
                      />
                      <div className="grow">
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) =>
                            handleAgendaChange(index, "title", e.target.value)
                          }
                          className="w-full bg-transparent border-none p-0 font-headline text-lg font-bold focus:ring-0 focus:outline-none mb-1"
                        />
                        <input
                          type="text"
                          value={item.subtitle}
                          onChange={(e) =>
                            handleAgendaChange(
                              index,
                              "subtitle",
                              e.target.value,
                            )
                          }
                          className="w-full bg-transparent border-none p-0 font-body text-sm text-on-surface-variant focus:ring-0 focus:outline-none"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAgendaItem(index)}
                        className="text-red-400 hover:text-red-500 opacity-0 group-hover/agenda:opacity-100 transition-opacity p-1 cursor-pointer absolute right-4 top-6"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addAgendaItem}
                    className="w-full py-4 mt-6 border border-dashed border-border-surgical text-on-surface-variant font-mono text-[10px] uppercase tracking-widest hover:border-on-surface hover:text-on-surface transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <Plus className="w-3 h-3 mr-2" /> Add Schedule Block
                  </button>
                </div>
              </div>

              {/* Right: Keynotes & Venue */}
              <div className="lg:col-span-5 space-y-12">
                <div>
                  <h3 className="font-headline text-xl font-bold mb-6">
                    Key Speakers
                  </h3>
                  <div className="space-y-4">
                    {speakers.map((speaker, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 bg-surface-container p-4 border border-border-surgical hover:border-on-surface transition-colors group/speaker relative"
                      >
                        <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-border-surgical relative">
                          <img
                            src={speaker.imageUrl}
                            alt={speaker.name}
                            className="w-full h-full object-cover grayscale"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/speaker:opacity-100 flex items-center justify-center transition-opacity">
                            <Upload className="w-3 h-3 text-white" />
                          </div>
                        </div>
                        <div className="grow">
                          <input
                            type="text"
                            value={speaker.name}
                            onChange={(e) =>
                              handleSpeakerChange(index, "name", e.target.value)
                            }
                            className="w-full bg-transparent border-none p-0 font-headline text-base font-bold focus:ring-0 focus:outline-none"
                          />
                          <input
                            type="text"
                            value={speaker.title}
                            onChange={(e) =>
                              handleSpeakerChange(
                                index,
                                "title",
                                e.target.value,
                              )
                            }
                            className="w-full bg-transparent border-none p-0 font-body text-xs text-on-surface-variant mt-1 focus:ring-0 focus:outline-none"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeSpeaker(index)}
                          className="text-red-400 hover:text-red-500 opacity-0 group-hover/speaker:opacity-100 transition-opacity p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addSpeaker}
                      className="w-full py-4 border border-dashed border-border-surgical text-on-surface-variant font-mono text-[10px] uppercase tracking-widest hover:border-on-surface hover:text-on-surface transition-colors flex items-center justify-center cursor-pointer"
                    >
                      <Plus className="w-3 h-3 mr-2" /> Add Speaker
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-headline text-xl font-bold mb-6">
                    Venue
                  </h3>
                  <div className="border border-border-surgical p-6 bg-background focus-within:border-on-surface transition-colors">
                    <input
                      type="text"
                      name="locationName"
                      defaultValue={
                        initialData
                          ? initialData.locationName
                          : "The National Architectural Museum"
                      }
                      className="w-full bg-transparent border-none p-0 font-headline text-base font-bold mb-2 focus:ring-0 focus:outline-none"
                    />
                    <textarea
                      name="locationAddress"
                      defaultValue={
                        initialData
                          ? initialData.locationAddress
                          : "100 Gallery Row\nMetropolis, NY 10012"
                      }
                      className="w-full bg-transparent border-none p-0 font-body text-sm text-on-surface-variant h-12 resize-none focus:ring-0 focus:outline-none"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="text-xs text-red-500 font-mono mt-8 text-center px-16">
                {error}
              </div>
            )}

            <div className="mt-16 border-t border-border-surgical p-8 flex flex-col md:flex-row justify-between items-center gap-6">
              <button
                type="button"
                onClick={() => (window.location.href = "/dashboard")}
                className="bg-transparent text-on-surface-variant font-mono text-[10px] uppercase tracking-widest hover:text-on-surface transition-colors cursor-pointer"
              >
                Discard Draft
              </button>
              <div className="flex gap-4 w-full md:w-auto">
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleDeploy}
                  className="grow text-center bg-on-surface text-background font-mono text-xs uppercase tracking-widest font-bold px-12 py-4 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
                >
                  {loading
                    ? "Processing..."
                    : initialData
                      ? "Save Changes"
                      : "Deploy Link"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
