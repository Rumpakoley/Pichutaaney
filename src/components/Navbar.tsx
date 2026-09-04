import React, { useState, useEffect } from 'react';
import { Menu, X, UtensilsCrossed, CalendarClock, BookOpen } from 'lucide-react';

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

  const navLinks = [
    { name: 'ABOUT', href: '#about-me' },
    { name: 'THE STORY', href: '#story-of-pichhutaaney' },
    { name: 'SUPPER CLUB', href: '#supper-club' },
    { name: 'PRIVATE EVENTS', href: '#private-events' },
    { name: 'CONTACT', href: '#get-in-touch' },
  ];

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-40 transition-all duration-200 bg-[#FAFAF9]/95 backdrop-blur-xs ${
        isScrolled ? 'border-b border-[#E4E4E7] shadow-2xs py-3.5 sm:py-4' : 'py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center text-left">
            <span className="font-serif text-2xl sm:text-[26px] font-bold tracking-[0.14em] uppercase text-[#18181B]">
              PICHHUTAANEY
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-9 font-sans text-xs tracking-[0.2em] uppercase font-medium text-[#71717A]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#18181B] transition-colors duration-150 py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#18181B] hover:text-[#853724] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAFAF9] border-b border-[#E4E4E7] px-6 pt-4 pb-6 space-y-3 text-left">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-sans uppercase tracking-[0.2em] text-[#52525B] hover:text-[#18181B]"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
