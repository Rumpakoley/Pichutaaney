import React from 'react';
import { HelpCircle, MessageSquare, Sparkles } from 'lucide-react';

export const UniqueCuratorDialogues: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 bg-[#F5EFEB] border-b border-[#D8CEBF] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-3">
            <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#963D28] font-bold block">
              CURATOR DIALOGUES
            </span>
            <h2 className="font-marcellus text-3xl sm:text-4xl font-normal text-[#191512] tracking-tight">
              Curator & Guest Conversations
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#695F55] leading-relaxed font-light">
              Understanding the intuitive cooking philosophy, memory archiving, and communal table ethos behind Pichhutaaney.
            </p>
          </div>

          {/* Right Column: 3 Dialogue Cards */}
          <div className="lg:col-span-8 space-y-4">
            <div className="p-7 bg-white rounded-3xl border border-[#D8CEBF] shadow-xs space-y-2 text-left">
              <h4 className="font-marcellus text-lg sm:text-xl font-normal text-[#191512]">
                Q: What makes intuitive cooking different from following a recipe?
              </h4>
              <p className="font-sans text-xs sm:text-sm text-[#4D453D] leading-relaxed font-light">
                Food to me has never been about rigid formulas or standardized scales. It lives in instinct—the sizzle of golden mustard oil when it reaches smoke point, the fragrance of whole panch phoron bloomed in the pan, and the generational touch passed down through memory.
              </p>
            </div>

            <div className="p-7 bg-white rounded-3xl border border-[#D8CEBF] shadow-xs space-y-2 text-left">
              <h4 className="font-marcellus text-lg sm:text-xl font-normal text-[#191512]">
                Q: How do you curate a seasonal Pichhutaaney supper club?
              </h4>
              <p className="font-sans text-xs sm:text-sm text-[#4D453D] leading-relaxed font-light">
                We seat 10 to 14 guests around one communal table. Menus change with the micro-seasons—celebrating root-to-stem vegetable stories, probiotic pantaa bhaat ferments, and forgotten heirloom staples presented with personal travel stories over three unhurried hours.
              </p>
            </div>

            <div className="p-7 bg-white rounded-3xl border border-[#D8CEBF] shadow-xs space-y-2 text-left">
              <h4 className="font-marcellus text-lg sm:text-xl font-normal text-[#191512]">
                Q: What is the meaning behind the name 'Pichhutaaney'?
              </h4>
              <p className="font-sans text-xs sm:text-sm text-[#4D453D] leading-relaxed font-light">
                In Bengali, Pichhutaaney (পিছুটানেই) describes that tender, nostalgic backward glance—the quiet pull toward home and where you came from, alive in every spice, bite, and conversation no matter how far you wander across the globe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
