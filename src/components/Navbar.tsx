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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const primaryLinks = [
    { name: 'ABOUT', href: '#about-me' },
    { name: 'THE STORY', href: '#story-of-pichhutaaney' },
    { name: 'SUPPER CLUB', href: '#supper-club' },
    { name: 'PRIVATE EVENTS', href: '#private-events' },
  ];

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-40 transition-all duration-300 bg-[#FAFAF9]/95 backdrop-blur-md ${
        isScrolled ? 'border-b border-[#E4E4E7] shadow-xs py-3 sm:py-3.5' : 'py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center text-left group">
            <span className="font-serif text-2xl sm:text-[26px] font-bold tracking-[0.14em] uppercase text-[#18181B] group-hover:text-[#853724] transition-colors">
              PICHHUTAANEY
            </span>
          </a>

          {/* Desktop Floating Pill / Capsule Navbar (Matches Reference Image 2) */}
          <nav className="hidden lg:flex items-center bg-[#EFE8DC] border border-[#DCD3C5] rounded-full p-1.5 pl-7 pr-1.5 shadow-sm text-xs font-mono tracking-widest text-[#18181B]">
            <div className="flex items-center space-x-7">
              {primaryLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-[#853724] font-medium transition-colors duration-150 py-1"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Encased Dark Pill Button for CONTACT */}
            <a
              href="#get-in-touch"
              className="ml-6 bg-[#18181B] text-white px-6 py-2.5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-[#853724] hover:shadow-md transition-all duration-200"
            >
              CONTACT
            </a>
          </nav>

          {/* Tablet (md to lg) compact version */}
          <nav className="hidden md:flex lg:hidden items-center bg-[#EFE8DC] border border-[#DCD3C5] rounded-full p-1 pl-5 pr-1 shadow-sm text-[11px] font-mono tracking-wider text-[#18181B]">
            <div className="flex items-center space-x-4">
              {primaryLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-[#853724] font-medium transition-colors py-1"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <a
              href="#get-in-touch"
              className="ml-4 bg-[#18181B] text-white px-4 py-2 rounded-full font-bold uppercase tracking-wider text-[10px] hover:bg-[#853724] transition-colors"
            >
              CONTACT
            </a>
          </nav>

          {/* Mobile menu toggle */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-[#EFE8DC] border border-[#DCD3C5] rounded-full text-[#18181B] hover:text-[#853724] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown with matching Pill aesthetic */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-5">
          <div className="bg-[#EFE8DC] border border-[#DCD3C5] rounded-3xl p-5 shadow-lg space-y-3 text-center">
            {primaryLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-xs font-mono uppercase tracking-widest text-[#18181B] hover:text-[#853724] font-medium border-b border-[#DCD3C5]/60"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#get-in-touch"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-2.5 bg-[#18181B] text-white rounded-full text-xs font-mono uppercase tracking-widest font-bold hover:bg-[#853724] transition-colors"
              >
                CONTACT
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

