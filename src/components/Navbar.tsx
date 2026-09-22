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
    { name: 'About', href: '#about-me' },
    { name: 'The Story', href: '#story-of-pichhutaaney' },
    { name: 'Supper Club', href: '#supper-club' },
    { name: 'Private Events', href: '#private-events' },
    { name: 'Menu', href: '#sample-menu' },
  ];

  return (
    <>
      {/* Top Header Logo Bar */}
      <header className="w-full py-5 px-6 sm:px-8 lg:px-12 bg-[#171716] text-[#E9E4DD] border-b border-[#2D2D2A]/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="inline-block group text-left">
            <span className="font-marcellus text-2xl sm:text-[28px] font-normal tracking-[0.08em] text-[#E9E4DD] group-hover:text-[#EED485] transition-colors">
              Pichhutaaney
            </span>
            <span className="block text-[10px] font-sans uppercase tracking-[0.25em] text-[#A6A29A] mt-0.5 font-light">
              Intuitive Indian Cooking & Communal Supper Club
            </span>
          </a>

          <div className="hidden md:flex items-center space-x-6">
            <a
              href="#supper-club"
              className="text-xs font-sans uppercase tracking-[0.2em] font-medium text-[#EED485] hover:text-[#FFFFFF] transition-colors"
            >
              Join Waitlist →
            </a>
            <a
              href="#get-in-touch"
              className="px-5 py-2 rounded-full border border-[#E9E4DD]/40 text-xs font-sans tracking-widest uppercase text-[#E9E4DD] hover:bg-[#E9E4DD] hover:text-[#171716] transition-all"
            >
              Contact
            </a>
          </div>
        </div>
      </header>

      {/* Floating Centered Pill Navigation Bar */}
      <div className="fixed top-4 sm:top-5 inset-x-0 z-50 pointer-events-none flex justify-center px-4">
        {/* Desktop Floating Pill Capsule */}
        <nav
          className={`pointer-events-auto hidden md:flex items-center bg-[#171716]/90 backdrop-blur-md border border-[#2D2D2A] rounded-full p-1.5 pl-7 pr-1.5 transition-all duration-300 ${
            isScrolled
              ? 'shadow-2xl border-[#EED485]/40 scale-100'
              : 'shadow-lg border-[#2D2D2A]'
          }`}
        >
          <div className="flex items-center space-x-6 lg:space-x-8 text-xs font-sans uppercase tracking-widest text-[#E9E4DD]/90">
            {primaryLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#EED485] font-normal transition-colors duration-150 py-1"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Encased Pill Button for Book / Contact */}
          <a
            href="#supper-club"
            className="ml-6 lg:ml-8 bg-[#E9E4DD] text-[#171716] px-6 py-2.5 rounded-full font-semibold uppercase tracking-widest text-[11px] hover:bg-[#EED485] hover:text-[#171716] hover:shadow-md transition-all duration-200"
          >
            Book Now
          </a>
        </nav>

        {/* Mobile Floating Pill Button */}
        <div className="pointer-events-auto md:hidden w-full max-w-sm flex items-center justify-between bg-[#171716]/95 backdrop-blur-md border border-[#2D2D2A] rounded-full p-1.5 pl-5 pr-1.5 shadow-xl">
          <a href="#" className="font-marcellus text-base tracking-wider text-[#E9E4DD]">
            Pichhutaaney
          </a>

          <div className="flex items-center space-x-2">
            <a
              href="#supper-club"
              className="bg-[#E9E4DD] text-[#171716] px-4 py-1.5 rounded-full font-sans text-[10px] uppercase tracking-wider font-semibold"
            >
              Book
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 bg-[#2D2D2A] rounded-full text-[#E9E4DD] hover:text-[#EED485]"
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
          <div className="bg-[#171716] border border-[#2D2D2A] rounded-3xl p-6 shadow-2xl space-y-4 text-center">
            {primaryLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 text-xs font-sans uppercase tracking-widest text-[#E9E4DD] hover:text-[#EED485] font-light border-b border-[#2D2D2A]"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#get-in-touch"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-3 bg-[#E9E4DD] text-[#171716] rounded-full text-xs font-sans uppercase tracking-widest font-semibold hover:bg-[#EED485] transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


