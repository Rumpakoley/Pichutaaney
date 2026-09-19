import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenLedger: () => void;
  waitlistCount: number;
  inquiryCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLedger: _onOpenLedger, waitlistCount: _waitlistCount, inquiryCount: _inquiryCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const primaryLinks = [
    { name: 'ABOUT', href: '#about-me' },
    { name: 'THE STORY', href: '#story-of-pichhutaaney' },
    { name: 'SUPPER CLUB', href: '#supper-club' },
    { name: 'PRIVATE EVENTS', href: '#private-events' },
  ];

  return (
    <>
      {/* Top Header Logo Bar */}
      <div className="w-full py-5 px-4 sm:px-6 lg:px-8 bg-[#F4ECE1] border-b border-[#E4D7C8]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="inline-block group text-left">
            <span className="font-serif text-2xl sm:text-[27px] font-bold tracking-[0.14em] uppercase text-[#241E1A] group-hover:text-[#8B3A26] transition-colors">
              PICHHUTAANEY
            </span>
            <span className="block text-[10px] font-sans uppercase tracking-[0.2em] text-[#6E6258] mt-0.5">
              Regional Indian Table & Culinary Storytelling
            </span>
          </a>

          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#supper-club"
              className="text-[11px] font-sans uppercase tracking-[0.2em] font-semibold text-[#8B3A26] hover:text-[#241E1A] transition-colors"
            >
              JOIN WAITLIST →
            </a>
          </div>
        </div>
      </div>

      {/* Floating Centered Pill Navigation Bar */}
      <div className="fixed top-4 sm:top-5 inset-x-0 z-50 pointer-events-none flex justify-center px-4">
        {/* Desktop & Tablet Floating Pill Capsule */}
        <nav
          className={`pointer-events-auto hidden md:flex items-center bg-[#FAF6F0]/95 backdrop-blur-md border border-[#DECFC0] rounded-full p-1.5 pl-7 pr-1.5 transition-all duration-300 ${
            isScrolled
              ? 'shadow-xl border-[#C9B9A6] scale-100'
              : 'shadow-md border-[#DECFC0]'
          }`}
        >
          <div className="flex items-center space-x-6 lg:space-x-8 text-xs font-mono tracking-widest text-[#241E1A]">
            {primaryLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#8B3A26] font-medium transition-colors duration-150 py-1"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Encased Dark Pill Button for CONTACT */}
          <a
            href="#get-in-touch"
            className="ml-6 lg:ml-8 bg-[#1F1A16] text-[#FAF6F0] px-6 py-2.5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-[#8B3A26] hover:shadow-md transition-all duration-200"
          >
            CONTACT
          </a>
        </nav>

        {/* Mobile Floating Pill Button */}
        <div className="pointer-events-auto md:hidden w-full max-w-sm flex items-center justify-between bg-[#FAF6F0]/95 backdrop-blur-md border border-[#DECFC0] rounded-full p-1.5 pl-5 pr-1.5 shadow-lg">
          <a href="#" className="font-serif text-sm font-bold tracking-wider uppercase text-[#241E1A]">
            PICHHUTAANEY
          </a>

          <div className="flex items-center space-x-2">
            <a
              href="#get-in-touch"
              className="bg-[#1F1A16] text-[#FAF6F0] px-4 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-wider font-bold"
            >
              CONTACT
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 bg-[#FAF6F0] border border-[#DECFC0] rounded-full text-[#241E1A] hover:text-[#8B3A26]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Floating Dropdown Sheet */}
      {mobileMenuOpen && (
        <div className="fixed top-20 inset-x-4 z-50 md:hidden">
          <div className="bg-[#FAF6F0] border border-[#DECFC0] rounded-3xl p-5 shadow-2xl space-y-3 text-center">
            {primaryLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 text-xs font-mono uppercase tracking-widest text-[#241E1A] hover:text-[#8B3A26] font-medium border-b border-[#DECFC0]/60"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#get-in-touch"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-2.5 bg-[#1F1A16] text-[#FAF6F0] rounded-full text-xs font-mono uppercase tracking-widest font-bold hover:bg-[#8B3A26] transition-colors"
              >
                GET IN TOUCH
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


