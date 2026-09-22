import React from 'react';
import { ExternalLink, Calendar, Link2, Mail, Instagram, Utensils, CheckCircle2 } from 'lucide-react';

interface ReservationLinktreeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScrollToConcierge: () => void;
}

export const ReservationLinktreeModal: React.FC<ReservationLinktreeModalProps> = ({
  isOpen,
  onClose,
  onScrollToConcierge,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 font-sans animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-[#ECE5DA] border border-[#D5CBBD] rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden text-left transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-7 border-b border-[#D5CBBD] flex items-center justify-between bg-[#F7F3EC]">
          <div>
            <div className="flex items-center space-x-2.5">
              <span className="font-marcellus text-2xl sm:text-3xl font-normal text-[#28221D]">
                Reservation & Link Hub
              </span>
              <span className="font-bengali text-xs text-[#B58D59] px-2.5 py-0.5 rounded-full border border-[#B58D59]/30 bg-[#ECE5DA] font-medium">
                পিছুটানে
              </span>
            </div>
            <p className="text-xs text-[#655B51] mt-1 font-light">
              Choose your preferred way to request seats, explore the Linktree hub, or connect directly.
            </p>
          </div>
        </div>

        {/* Modal Link Cards List */}
        <div className="p-6 space-y-3.5">
          {/* Primary Option: Official Google Form Reservation */}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScDwv-8Iz8bmI62V4s_Ybbfma1ZBNYfiZo2TyPH4TkaDofueQ/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 sm:p-5 rounded-2xl bg-[#28221D] text-[#ECE5DA] border border-[#28221D] hover:bg-[#1C1713] transition-all flex items-center justify-between group shadow-sm cursor-pointer"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#B58D59] text-[#1C1713] flex items-center justify-center shrink-0 font-bold">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="flex items-center space-x-2">
                  <span className="font-marcellus text-base sm:text-lg font-normal text-white">
                    Official Reservation Form
                  </span>
                  <span className="text-[9px] uppercase tracking-widest font-mono bg-[#B58D59] text-[#1C1713] px-2 py-0.5 rounded-full font-bold">
                    GOOGLE FORM
                  </span>
                </div>
                <p className="text-xs text-[#ECE5DA]/80 font-light mt-0.5">
                  Direct tasting seats & private event intake questionnaire
                </p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-[#B58D59] group-hover:translate-x-0.5 transition-transform shrink-0" />
          </a>

          {/* Secondary Option: Official Linktree Profile */}
          <a
            href="https://linktr.ee/EnakshiP"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 sm:p-5 rounded-2xl bg-[#F7F3EC] text-[#28221D] border border-[#D5CBBD] hover:border-[#28221D] hover:bg-white transition-all flex items-center justify-between group shadow-xs cursor-pointer"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#ECE5DA] text-[#28221D] flex items-center justify-center shrink-0 border border-[#D5CBBD]">
                <Link2 className="w-5 h-5 text-[#B58D59]" />
              </div>
              <div className="text-left">
                <div className="flex items-center space-x-2">
                  <span className="font-marcellus text-base sm:text-lg font-normal text-[#28221D]">
                    Enakshi’s Linktree Bio
                  </span>
                  <span className="text-[9px] uppercase tracking-widest font-mono bg-[#ECE5DA] text-[#655B51] px-2 py-0.5 rounded-full font-semibold border border-[#D5CBBD]">
                    LINKTR.EE/ENAKSHIP
                  </span>
                </div>
                <p className="text-xs text-[#655B51] font-light mt-0.5">
                  Access all link-in-bio updates, upcoming drops & stories
                </p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-[#655B51] group-hover:text-[#28221D] group-hover:translate-x-0.5 transition-transform shrink-0" />
          </a>

          {/* Option 3: Instant Interactive Web Concierge */}
          <button
            onClick={() => {
              onClose();
              onScrollToConcierge();
            }}
            className="w-full p-4 sm:p-5 rounded-2xl bg-[#F7F3EC] text-[#28221D] border border-[#D5CBBD] hover:border-[#28221D] hover:bg-white transition-all flex items-center justify-between group shadow-xs cursor-pointer text-left"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#ECE5DA] text-[#28221D] flex items-center justify-center shrink-0 border border-[#D5CBBD]">
                <Utensils className="w-5 h-5 text-[#B58D59]" />
              </div>
              <div className="text-left">
                <div className="flex items-center space-x-2">
                  <span className="font-marcellus text-base sm:text-lg font-normal text-[#28221D]">
                    Instant Table Concierge
                  </span>
                  <span className="text-[9px] uppercase tracking-widest font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                    ON-SITE
                  </span>
                </div>
                <p className="text-xs text-[#655B51] font-light mt-0.5">
                  Quick in-page waitlist & private event inquiry deck
                </p>
              </div>
            </div>
            <span className="font-mono text-xs text-[#B58D59] font-bold group-hover:translate-x-0.5 transition-transform shrink-0">
              Jump →
            </span>
          </button>

          {/* Option 4: Direct Email & Instagram Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <a
              href="mailto:pichhutaaney@gmail.com"
              className="p-3.5 rounded-xl bg-[#F7F3EC] border border-[#D5CBBD] hover:border-[#28221D] text-[#28221D] flex items-center space-x-3 text-xs shadow-2xs"
            >
              <Mail className="w-4 h-4 text-[#B58D59] shrink-0" />
              <div className="truncate">
                <span className="font-semibold block text-[11px]">Email Concierge</span>
                <span className="text-[10px] text-[#655B51] truncate block">pichhutaaney@gmail.com</span>
              </div>
            </a>

            <a
              href="https://www.instagram.com/pichhutaaney?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-[#F7F3EC] border border-[#D5CBBD] hover:border-[#28221D] text-[#28221D] flex items-center space-x-3 text-xs shadow-2xs"
            >
              <Instagram className="w-4 h-4 text-[#B58D59] shrink-0" />
              <div className="truncate">
                <span className="font-semibold block text-[11px]">Instagram Journal</span>
                <span className="text-[10px] text-[#655B51] block">@pichhutaaney</span>
              </div>
            </a>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#D5CBBD] bg-[#F7F3EC] flex items-center justify-between text-xs text-[#655B51]">
          <span>Enakshi • Pichhutaaney Culinary Atelier</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#28221D] text-[#ECE5DA] hover:bg-[#1C1713] text-[10.5px] font-medium uppercase tracking-widest transition-colors cursor-pointer shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
