import React from 'react';
import { CuratorDialogueItem } from '../types';

export const DEFAULT_DIALOGUES: CuratorDialogueItem[] = [
  {
    id: 'd-1',
    question: 'Q: What makes intuitive cooking different from following a recipe?',
    answer:
      'Food for me has never been about rigid formulas or weighing scales. It lives in instinct, like knowing the exact moment golden mustard oil reaches smoke point, the aroma of whole panch phoron blooming in the hot pan, and the sensory touch passed down through family memory.',
  },
  {
    id: 'd-2',
    question: 'Q: How do you curate a seasonal Pichhutaaney supper club?',
    answer:
      'We bring together 10 to 14 guests around one communal table. The menu shifts with the seasons, celebrating root to stem vegetable cooking, traditional ferments like pantaa bhaat, and lesser known heirloom recipes shared with personal travel stories over three unhurried hours.',
  },
  {
    id: 'd-3',
    question: "Q: What is the meaning behind the name 'Pichhutaaney'?",
    answer:
      'In Bengali, Pichhutaaney (পিছুটানে) describes that tender nostalgic backward glance, the quiet pull toward home and where you came from, alive in every spice, bite, and conversation no matter how far you wander across the globe.',
  },
];

interface UniqueCuratorDialoguesProps {
  dialogues?: CuratorDialogueItem[];
}

export const UniqueCuratorDialogues: React.FC<UniqueCuratorDialoguesProps> = ({
  dialogues = DEFAULT_DIALOGUES,
}) => {
  const displayDialogues = dialogues && dialogues.length > 0 ? dialogues : DEFAULT_DIALOGUES;

  return (
    <section id="dialogues" className="py-20 sm:py-24 bg-[#ECE5DA] border-b border-[#D5CBBD] text-left overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-3 animate-fade-in-up">
            <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#B58D59] font-bold block">
              CURATOR DIALOGUES
            </span>
            <h2 className="font-marcellus text-3xl sm:text-4xl font-normal text-[#28221D] tracking-tight hover:text-[#B58D59] transition-colors duration-300">
              Curator & Guest Conversations
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#655B51] leading-relaxed font-light">
              Understanding the intuitive cooking philosophy, memory archiving, and communal table ethos behind Pichhutaaney.
            </p>
          </div>

          {/* Right Column: Dialogue Cards */}
          <div className="lg:col-span-8 space-y-4">
            {displayDialogues.map((item) => (
              <div
                key={item.id}
                className="p-7 sm:p-8 bg-[#F7F3EC] rounded-3xl border border-[#D5CBBD] shadow-xs space-y-2 text-left hover:border-[#B58D59] hover:shadow-md transition-all duration-300 group cursor-default"
              >
                <h4 className="font-marcellus text-lg sm:text-xl font-normal text-[#28221D] group-hover:text-[#B58D59] transition-colors duration-300">
                  {item.question}
                </h4>
                <p className="font-sans text-xs sm:text-sm text-[#4A4138] leading-relaxed font-light group-hover:text-[#28221D] transition-colors duration-300">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

