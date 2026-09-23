import React, { useEffect, useState, useRef } from 'react';

/**
 * UniqueCursor
 * Aesthetic Handcrafted Bengali Hand Fan ("হাতপাখা" / Haat Pakha):
 * - Authentic asymmetrical palm-leaf design with side bamboo cane handle
 * - Alternating rich vermilion-red & ivory cream pleats with fine white alpona motifs
 * - Delicate pleated fabric frill border
 * - Zero intrusive floating circles or beacon dots
 * - Precise click hotspot at the top tip
 * - Graceful subtle tilt on hover
 * - Automatically disabled on touch / mobile devices
 */
export const UniqueCursor: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const fanRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    setMounted(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      if (fanRef.current) {
        fanRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check hover target
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], .cursor-pointer, video'
      );

      setIsHovered(!!interactive);
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [visible]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[999999] transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Aesthetic Handcrafted Bengali Hand Fan (No floating circles/dots) */}
      <div
        ref={fanRef}
        style={{ willChange: 'transform' }}
        className="absolute top-0 left-0 pointer-events-none -translate-x-[2px] -translate-y-[2px]"
      >
        <div
          className={`relative origin-[2px_2px] transition-transform duration-200 ease-out ${
            isClicked
              ? '-rotate-15 scale-90 translate-y-0.5'
              : isHovered
              ? 'rotate-8 scale-110'
              : 'rotate-0 scale-100'
          }`}
        >
          {/* Authentic Bengali Haat Pakha SVG */}
          <svg
            width="32"
            height="38"
            viewBox="0 0 32 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
          >
            <defs>
              {/* Vermilion Red Pleat Gradient */}
              <linearGradient id="pakhaRed" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#D92832" />
                <stop offset="60%" stopColor="#B31B23" />
                <stop offset="100%" stopColor="#8C1016" />
              </linearGradient>

              {/* Natural Ivory Palm-Leaf Pleat Gradient */}
              <linearGradient id="pakhaIvory" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFDF7" />
                <stop offset="60%" stopColor="#F5EBD7" />
                <stop offset="100%" stopColor="#E2D4BC" />
              </linearGradient>

              {/* Slender Bamboo Cane Handle Gradient */}
              <linearGradient id="pakhaBamboo" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#EADBBA" />
                <stop offset="50%" stopColor="#D5C198" />
                <stop offset="100%" stopColor="#B8A375" />
              </linearGradient>

              {/* Soft Frill Edge Gradient */}
              <linearGradient id="pakhaFrill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#E22E37" />
                <stop offset="100%" stopColor="#9E141B" />
              </linearGradient>
            </defs>

            {/* --- 1. Bamboo Cane Spine & Long Handle (running down right side) --- */}
            <path
              d="M19 13.5 L22.5 35 C22.7 36 23.5 36.5 24.2 36.2 C24.8 35.8 24.8 35 24.5 34 L21 12 Z"
              fill="url(#pakhaBamboo)"
              stroke="#87714C"
              strokeWidth="0.4"
            />
            {/* Natural bamboo notches */}
            <line x1="20.5" y1="21" x2="22.2" y2="21.5" stroke="#7A643E" strokeWidth="0.5" strokeLinecap="round" />
            <line x1="21.8" y1="28" x2="23.5" y2="28.5" stroke="#7A643E" strokeWidth="0.5" strokeLinecap="round" />

            {/* --- 2. Fan Fan-Blade Disc: Alternating Red & Ivory Wedges radiating from Pivot (19.5, 14) --- */}
            
            {/* Sector 1: Red (Far-Left Edge / Pointer Apex) */}
            <path
              d="M19.5 14 L4.5 9.5 A14 14 0 0 1 7 4 Z"
              fill="url(#pakhaRed)"
              stroke="#730C11"
              strokeWidth="0.25"
            />
            {/* Delicate White Alpona Motifs */}
            <path d="M6 6.5 Q8 6 10 7.5" stroke="#FFF" strokeWidth="0.45" strokeLinecap="round" opacity="0.9" />
            <circle cx="6.5" cy="5.5" r="0.4" fill="#FFF" />
            <circle cx="8.5" cy="6.5" r="0.4" fill="#FFF" />

            {/* Sector 2: Ivory */}
            <path
              d="M19.5 14 L7 4 A14 14 0 0 1 11.5 2 Z"
              fill="url(#pakhaIvory)"
              stroke="#C4B394"
              strokeWidth="0.25"
            />

            {/* Sector 3: Red with Alpona */}
            <path
              d="M19.5 14 L11.5 2 A14 14 0 0 1 16.5 1.5 Z"
              fill="url(#pakhaRed)"
              stroke="#730C11"
              strokeWidth="0.25"
            />
            <path d="M13.5 3 Q14.5 5 15 8" stroke="#FFF" strokeWidth="0.45" strokeLinecap="round" opacity="0.9" />
            <circle cx="13" cy="2.5" r="0.4" fill="#FFF" />
            <circle cx="14" cy="4.5" r="0.4" fill="#FFF" />

            {/* Sector 4: Ivory */}
            <path
              d="M19.5 14 L16.5 1.5 A14 14 0 0 1 21.5 2.5 Z"
              fill="url(#pakhaIvory)"
              stroke="#C4B394"
              strokeWidth="0.25"
            />

            {/* Sector 5: Red with Alpona */}
            <path
              d="M19.5 14 L21.5 2.5 A14 14 0 0 1 26 5 Z"
              fill="url(#pakhaRed)"
              stroke="#730C11"
              strokeWidth="0.25"
            />
            <path d="M22.5 4.5 Q21.5 7 19.5 9" stroke="#FFF" strokeWidth="0.45" strokeLinecap="round" opacity="0.9" />
            <circle cx="23.5" cy="4" r="0.4" fill="#FFF" />
            <circle cx="22" cy="6" r="0.4" fill="#FFF" />

            {/* Sector 6: Ivory */}
            <path
              d="M19.5 14 L26 5 A14 14 0 0 1 29 9 Z"
              fill="url(#pakhaIvory)"
              stroke="#C4B394"
              strokeWidth="0.25"
            />

            {/* Sector 7: Red with Alpona */}
            <path
              d="M19.5 14 L29 9 A14 14 0 0 1 29.5 14 Z"
              fill="url(#pakhaRed)"
              stroke="#730C11"
              strokeWidth="0.25"
            />
            <circle cx="27.5" cy="10" r="0.4" fill="#FFF" />
            <circle cx="26" cy="12" r="0.4" fill="#FFF" />

            {/* Sector 8: Ivory Lower-Right */}
            <path
              d="M19.5 14 L29.5 14 A14 14 0 0 1 26 19.5 Z"
              fill="url(#pakhaIvory)"
              stroke="#C4B394"
              strokeWidth="0.25"
            />

            {/* Sector 9: Red Lower-Left */}
            <path
              d="M19.5 14 L3.8 14 A14 14 0 0 1 4.5 9.5 Z"
              fill="url(#pakhaRed)"
              stroke="#730C11"
              strokeWidth="0.25"
            />
            <circle cx="5" cy="11.5" r="0.4" fill="#FFF" />

            {/* Sector 10: Ivory Base-Left */}
            <path
              d="M19.5 14 L6 18 A14 14 0 0 1 3.8 14 Z"
              fill="url(#pakhaIvory)"
              stroke="#C4B394"
              strokeWidth="0.25"
            />

            {/* Sector 11: Red Base */}
            <path
              d="M19.5 14 L10 21 A14 14 0 0 1 6 18 Z"
              fill="url(#pakhaRed)"
              stroke="#730C11"
              strokeWidth="0.25"
            />
            <circle cx="8" cy="18.5" r="0.4" fill="#FFF" />

            {/* Sector 12: Ivory Spine Border */}
            <path
              d="M19.5 14 L14 22 A14 14 0 0 1 10 21 Z"
              fill="url(#pakhaIvory)"
              stroke="#C4B394"
              strokeWidth="0.25"
            />

            {/* --- 3. Delicate Pleated Fabric Ruffled Frill along Perimeter --- */}
            {/* Finely scalloped crimson fabric ruffled trim */}
            <path
              d="M14.5 22.8
                 C13 22.2 11.5 21.2 9.5 20
                 C7.5 18.8 5.8 17 5 15
                 C4.2 13 4 10.8 5 8.8
                 C6 6.8 7.5 5 9.2 3.8
                 C10.9 2.6 13 1.8 15 1.5
                 C17 1.2 19.2 1.5 21.2 2.2
                 C23.2 2.9 25.2 4.2 27 6
                 C28.8 7.8 30 10 30.5 12.2
                 C31 14.4 30.2 16.8 28.8 18.8
                 C27.4 20.8 25.2 21.8 23 21.8
                 L22.2 20.5
                 C24 20.5 25.8 19.5 27 18
                 C28.2 16.5 28.8 14.5 28.5 12.8
                 C28.2 11 27 9.2 25.5 7.8
                 C24 6.4 22.2 5.2 20.5 4.8
                 C18.8 4.4 17 4.2 15.2 4.5
                 C13.4 4.8 11.8 5.4 10.4 6.5
                 C9 7.6 7.8 9.2 7.2 11
                 C6.6 12.8 6.8 14.5 7.5 16
                 C8.2 17.5 9.5 18.8 11.2 19.8
                 C12.9 20.8 14.2 21.5 15.2 21.8
                 Z"
              fill="url(#pakhaFrill)"
              stroke="#7E0E14"
              strokeWidth="0.4"
            />

            {/* Delicate fabric pleat stitches / highlights */}
            <path d="M5.5 8.5 L6.8 9.8 M9.5 3.5 L10.5 5 M15 1.5 L15.5 3.5 M21.2 2.2 L20.8 4 M27 6 L25.5 7.5 M30.5 12.2 L28.8 12.8" stroke="#FFA3A8" strokeWidth="0.35" strokeLinecap="round" />

            {/* --- 4. Central Hub Binding Node (Bamboo Cane Ring & Thread) --- */}
            <circle cx="19.5" cy="14" r="2" fill="#D5C198" stroke="#6E5A35" strokeWidth="0.5" />
            <circle cx="19.5" cy="14" r="1.1" fill="#8C1016" />
            <circle cx="19.5" cy="14" r="0.4" fill="#FFFDF7" />
          </svg>
        </div>
      </div>
    </div>
  );
};
