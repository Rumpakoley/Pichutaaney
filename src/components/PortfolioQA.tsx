import React from 'react';
import { HelpCircle, MessageSquare } from 'lucide-react';

export const PortfolioQA: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t-2 border-black/15 text-left bg-[#FAF6F0]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Sticky Column */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-3">
          <span className="font-mono text-xs text-[#8C867D] uppercase tracking-widest font-black block">
            Interview Dialogues
          </span>
          <h2 className="font-marcellus text-3xl sm:text-4xl font-normal text-black tracking-tight">
            Curator Q&A session
          </h2>
          <p className="font-sans text-xs sm:text-sm text-black/70 leading-relaxed font-light">
            Diving deep into the intuitive approach, memory archiving, and the living philosophy behind Pichhutaaney dinners.
          </p>
        </div>

        {/* Right Column: 3 Dialogue Cards */}
        <div className="lg:col-span-8 space-y-5">
          <div className="border-2 border-black bg-[#FAF6F0] p-7 space-y-2.5 rounded-3xl shadow-sm">
            <h4 className="font-marcellus text-lg sm:text-xl font-normal text-black">
              Q: What makes intuitive cooking different from following recipes?
            </h4>
            <p className="font-sans text-xs sm:text-sm leading-relaxed text-black/80 font-light">
              Food to me has never been about rigid regional rules or laboratory grams. It lives in instinct—the sizzle of golden mustard oil when it reaches smoke point, the fragrance rising from bloomed panch phoron, and the generational touch passed down through memory.
            </p>
          </div>

          <div className="border-2 border-black bg-[#FAF6F0] p-7 space-y-2.5 rounded-3xl shadow-sm">
            <h4 className="font-marcellus text-lg sm:text-xl font-normal text-black">
              Q: How do you curate a seasonal Pichhutaaney supper club?
            </h4>
            <p className="font-sans text-xs sm:text-sm leading-relaxed text-black/80 font-light">
              We seat 10 to 14 guests around one communal table. Menus change with the seasons—celebrating root-to-stem vegetable stories, probiotic pantaa bhaat ferments, and forgotten heirloom staples presented with personal travel stories over three unhurried hours.
            </p>
          </div>

          <div className="border-2 border-black bg-[#FAF6F0] p-7 space-y-2.5 rounded-3xl shadow-sm">
            <h4 className="font-marcellus text-lg sm:text-xl font-normal text-black">
              Q: What is the meaning behind the name 'Pichhutaaney'?
            </h4>
            <p className="font-sans text-xs sm:text-sm leading-relaxed text-black/80 font-light">
              In Bengali, Pichhutan (পিছুটান) describes that tender, nostalgic backward glance—the quiet pull toward home and where you came from, alive in every spice, bite, and conversation no matter how far you travel across the world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
