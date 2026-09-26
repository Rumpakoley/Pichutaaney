import React from 'react';
import { ArrowUp } from 'lucide-react';

interface UniqueFooterProps {
  onOpenLedger?: () => void;
}

export const UniqueFooter: React.FC<UniqueFooterProps> = ({ onOpenLedger }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C1713] text-[#ECE5DA] border-t border-[#3D342C] py-8 text-left font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-sans uppercase tracking-widest text-[#D5CBBD]/60">
          <div>
            © {new Date().getFullYear()} ENAKSHI • PICHHUTAANEY (পিছুটানে)
          </div>

          <div className="flex items-center space-x-4">
            {onOpenLedger && (
              <button
                onClick={onOpenLedger}
                className="text-[#D5CBBD]/40 hover:text-[#B58D59] transition-colors cursor-pointer text-[10px] tracking-widest font-mono uppercase"
              >
                Host Portal
              </button>
            )}
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1.5 text-[#D5CBBD] hover:text-[#B58D59] transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
