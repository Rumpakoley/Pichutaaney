import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Film, Utensils, Mail, Check, Sparkles } from 'lucide-react';

export const PortfolioBio: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('pichhutaaney@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="biography" className="max-w-7xl mx-auto px-6 md:px-12 py-10 bg-[#FAF6F0] text-left">
      <div className="border-t-2 border-b-2 border-black/20 py-12">
        <div className="max-w-5xl">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.25em] text-[#8C867D] font-extrabold block mb-4">
            BIOGRAPHY & ARTISTIC STATEMENT
          </span>
          <h3 className="font-marcellus text-2xl sm:text-3xl md:text-4xl leading-relaxed font-normal text-[#171716]">
            I cook from <span className="font-pt-serif italic font-bold">raw instinct and memory</span>—guided by the sizzle of golden mustard oil, the intuitive pinch of spice, and recipes shaped by all the places I have lived and traveled to, rooted always in the quiet emotional anchor of <span className="underline decoration-[#ffd177] decoration-2 underline-offset-4">West Bengal</span>.
          </h3>
        </div>

        {/* Action Button Pills */}
        <div className="flex flex-wrap gap-4 mt-8">
          <a
            href="#kitchen-reels"
            className="inline-flex items-center space-x-2 px-6 py-3 border-2 border-black hover:bg-[#ffd177] hover:text-black transition-all font-mono text-xs uppercase tracking-widest font-black rounded-full shadow-xs cursor-pointer"
          >
            <Film className="w-3.5 h-3.5" />
            <span>Watch living reels</span>
          </a>

          <a
            href="#booking-contact"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-[#0e0e0e] hover:bg-[#ffd177] hover:text-black text-[#f5f2eb] transition-all font-mono text-xs uppercase tracking-widest font-black rounded-full shadow-md cursor-pointer"
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Reserve supper club</span>
          </a>

          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center space-x-2 px-6 py-3 border-2 border-black/20 bg-black/5 hover:bg-black/10 transition-all font-mono text-xs uppercase tracking-widest font-bold text-black rounded-full cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-700 font-bold" />
                <span className="text-emerald-800">✓ Copied Address!</span>
              </>
            ) : (
              <>
                <Mail className="w-3.5 h-3.5 text-black/60" />
                <span>Copy Direct Email</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
