import { LayoutTemplate, Upload } from "lucide-react";
import { useState } from "react";

export default function MinimalistWeddingEditor({
  initialData,
}: {
  initialData?: any;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        templateId: "minimalist-wedding",
        title: getVal("title"),
        hostName: getVal("hostName"),
        eventDate: getVal("eventDate"),
        eventTime: getVal("eventTime"),
        locationName: getVal("locationName"),
        locationAddress: getVal("locationAddress"),
        dressCode: getVal("dressCode"),
        rsvpDeadline: getVal("rsvpDeadline"),
        images: [
          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=1200",
        ],
        customFields: {
          subHostText: getVal("subHostText"),
          bodyText: getVal("bodyText"),
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
        <div className="w-full max-w-3xl border border-border-surgical bg-surface-container-low p-8 md:p-24 flex flex-col hover:border-on-surface-variant transition-colors group/wrapper">
          {/* Editor Header */}
          <div className="mb-16 flex justify-between items-start opacity-50 group-hover/wrapper:opacity-100 transition-opacity">
            <div>
              <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
                Template 01 / Serif Accents / Off-White
              </p>
            </div>
            <LayoutTemplate className="w-5 h-5 text-on-surface-variant" />
          </div>

          {/* 1. Name */}
          <div className="text-center mb-16 space-y-4">
            <input
              type="text"
              name="title"
              defaultValue={initialData ? initialData.title : "Evelyn & Julian"}
              className="w-full bg-transparent border-none p-0 font-headline text-5xl md:text-7xl text-center focus:ring-0 focus:outline-none placeholder:text-on-surface-variant/50"
            />
            <p className="font-mono text-xs uppercase tracking-widest text-on-surface-variant">
              Are getting married
            </p>
          </div>

          {/* 2. Hero Photo (Bride and Groom) */}
          <div className="w-full aspect-4/5 md:aspect-3/2 bg-neutral-200 overflow-hidden group/img relative cursor-pointer mb-24 border border-border-surgical">
            <img
              src={
                initialData?.images?.[0] ||
                "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200"
              }
              alt="Couple"
              className="w-full h-full object-cover grayscale opacity-80 group-hover/img:opacity-100 transition-opacity"
            />
            <div className="absolute inset-0 bg-background/50 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity text-xs font-mono uppercase tracking-widest">
              <Upload className="w-4 h-4 mr-2" /> Replace Cover Photo
            </div>
          </div>

          {/* 3. Host Message & Side Photo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <div className="order-2 md:order-1 space-y-6">
              <input
                type="text"
                name="subHostText"
                defaultValue={
                  initialData?.customFields?.subHostText ||
                  "Together with their families"
                }
                className="w-full bg-transparent border-none p-0 font-mono text-[10px] uppercase tracking-widest focus:ring-0 focus:outline-none text-on-surface-variant"
              />
              <input
                type="text"
                name="hostName"
                defaultValue={
                  initialData ? initialData.hostName : "The Sterling Family"
                }
                className="w-full bg-transparent border-none p-0 font-headline text-3xl focus:ring-0 focus:outline-none text-on-surface"
              />
              <textarea
                name="bodyText"
                defaultValue={
                  initialData?.customFields?.bodyText ||
                  "Joyfully invite you to celebrate the marriage of their children.\n\nJoin us for an evening of dinner, dancing, and endless love under the stars."
                }
                className="w-full bg-transparent border-none p-0 font-body text-base leading-relaxed h-40 resize-none focus:ring-0 focus:outline-none text-on-surface-variant"
              ></textarea>
            </div>
            <div className="order-1 md:order-2 aspect-square bg-neutral-200 overflow-hidden group/img relative cursor-pointer border border-border-surgical">
              <img
                src={
                  initialData?.images?.[1] ||
                  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800"
                }
                alt="Details"
                className="w-full h-full object-cover grayscale opacity-80 group-hover/img:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 bg-background/50 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity text-xs font-mono uppercase tracking-widest">
                <Upload className="w-4 h-4 mr-2" /> Edit Image
              </div>
            </div>
          </div>

          {/* 4. Dates & Locations */}
          <div className="border-y border-border-surgical py-16 mb-24 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left">
              <div className="group/field focus-within:bg-surface-container px-4 py-2 -mx-4 rounded transition-colors">
                <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant block mb-4">
                  When
                </span>
                <input
                  type="text"
                  name="eventDate"
                  defaultValue={
                    initialData
                      ? initialData.eventDate
                      : "Saturday, Sept 24, 2024"
                  }
                  className="w-full bg-transparent border-none p-0 font-headline text-2xl focus:ring-0 focus:outline-none md:text-left text-center"
                />
                <input
                  type="text"
                  name="eventTime"
                  defaultValue={
                    initialData ? initialData.eventTime : "Ceremony at 4:00 PM"
                  }
                  className="w-full bg-transparent border-none p-0 font-body text-base mt-2 focus:ring-0 focus:outline-none text-on-surface-variant md:text-left text-center"
                />
              </div>
              <div className="group/field focus-within:bg-surface-container px-4 py-2 -mx-4 rounded transition-colors">
                <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant block mb-4">
                  Where
                </span>
                <input
                  type="text"
                  name="locationName"
                  defaultValue={
                    initialData
                      ? initialData.locationName
                      : "The Atrium Observatory"
                  }
                  className="w-full bg-transparent border-none p-0 font-headline text-2xl focus:ring-0 focus:outline-none md:text-left text-center"
                />
                <textarea
                  name="locationAddress"
                  defaultValue={
                    initialData
                      ? inviteAddress(initialData)
                      : "1420 Design District\nLondon, UK"
                  }
                  className="w-full bg-transparent border-none p-0 font-body text-base mt-2 h-16 resize-none focus:ring-0 focus:outline-none text-on-surface-variant md:text-left text-center"
                ></textarea>
              </div>
            </div>
            {/* Divider Line Mobile */}
            <div className="md:hidden absolute top-1/2 left-0 w-full h-px bg-border-surgical"></div>
            {/* Divider Line Desktop */}
            <div className="hidden md:block absolute top-[10%] left-1/2 w-px h-[80%] bg-border-surgical"></div>
          </div>

          {/* Additional details */}
          <div className="text-center mb-24 max-w-sm mx-auto space-y-8">
            <div className="group/field focus-within:bg-surface-container px-4 py-2 rounded transition-colors">
              <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">
                Dress Code
              </span>
              <input
                type="text"
                name="dressCode"
                defaultValue={
                  initialData ? initialData.dressCode : "Black Tie Optional"
                }
                className="w-full bg-transparent border-none p-0 font-headline text-xl focus:ring-0 focus:outline-none text-center"
              />
            </div>
            <div className="h-px w-12 bg-border-surgical mx-auto"></div>
            <div className="group/field focus-within:bg-surface-container px-4 py-2 rounded transition-colors">
              <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">
                RSVP By
              </span>
              <input
                type="text"
                name="rsvpDeadline"
                defaultValue={
                  initialData ? initialData.rsvpDeadline : "August 10, 2024"
                }
                className="w-full bg-transparent border-none p-0 font-headline text-xl focus:ring-0 focus:outline-none text-center"
              />
            </div>
          </div>

          {/* 5. Last Photo Section */}
          <div className="w-full aspect-21/9 bg-neutral-200 overflow-hidden group/img relative cursor-pointer border border-border-surgical mb-12">
            <img
              src={
                initialData?.images?.[2] ||
                "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=1200"
              }
              alt="Venue"
              className="w-full h-full object-cover grayscale opacity-80 group-hover/img:opacity-100 transition-opacity"
            />
            <div className="absolute inset-0 bg-background/50 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity text-xs font-mono uppercase tracking-widest">
              <Upload className="w-4 h-4 mr-2" /> Replace Location Photo
            </div>
          </div>

          {error && (
            <div className="text-xs text-red-500 font-mono mb-4 text-center">
              {error}
            </div>
          )}

          <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-border-surgical pt-8">
            <button
              type="button"
              onClick={() => (window.location.href = "/dashboard")}
              className="bg-transparent text-on-surface-variant font-mono text-[10px] uppercase tracking-widest hover:text-on-surface transition-colors cursor-pointer"
            >
              Discard Changes
            </button>
            <div className="flex gap-4 w-full md:w-auto">
              <button
                type="button"
                disabled={loading}
                onClick={handleDeploy}
                className="flex-1 bg-on-surface text-surface font-mono text-xs uppercase tracking-widest font-bold px-8 py-4 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
              >
                {loading
                  ? "Processing..."
                  : initialData
                    ? "Save Changes"
                    : "Deploy Envite"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function inviteAddress(initialData: any) {
  if (initialData.locationAddress) {
    return initialData.locationAddress;
  }
  return "";
}
