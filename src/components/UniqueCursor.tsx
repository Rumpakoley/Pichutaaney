import React, { useEffect, useState, useRef } from 'react';

/**
 * UniqueCursor
 * Handcrafted Traditional Bengali Hand Fan ("হাতপাখা" / Haat Pakha):
 * - Alternating crimson-red & ivory bamboo pleats with white alpona motifs
 * - Vermilion pleated fabric frill border
 * - Light natural cane / bamboo handle
 * - Gentle breeze fanning flutter on hover
 * - Breeze ripple puff on click
 * - Pinpoint accurate click hotspot at top tip
 * - Automatically disabled on touch / mobile devices
 */
export const UniqueCursor: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);

  const fanRef = useRef<HTMLDivElement>(null);
  const breezeRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const breezePos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

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

      if (interactive) {
        setIsHovered(true);

        if (interactive.closest('#hearth-reels, video')) {
          setHoverLabel('SAVOR');
        } else if (interactive.closest('#dishes-gallery, [data-plate]')) {
          setHoverLabel('TASTE');
        } else {
          setHoverLabel(null);
        }
      } else {
        setIsHovered(false);
        setHoverLabel(null);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    // Smooth breeze trailing ring lerp loop
    const render = () => {
      const lerpFactor = 0.2;
      breezePos.current.x += (mousePos.current.x - breezePos.current.x) * lerpFactor;
      breezePos.current.y += (mousePos.current.y - breezePos.current.y) * lerpFactor;

      if (breezeRef.current) {
        breezeRef.current.style.transform = `translate3d(${breezePos.current.x}px, ${breezePos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);

      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
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
      {/* Trailing Cooling Breeze Halo */}
      <div
        ref={breezeRef}
        style={{ willChange: 'transform' }}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center"
      >
        <div
          className={`rounded-full flex items-center justify-center transition-all duration-300 ease-out ${
            isHovered
              ? isClicked
                ? 'w-10 h-10 bg-[#B82228]/25 border-2 border-[#B82228] scale-90'
                : 'w-14 h-14 bg-[#B82228]/12 border border-[#B82228]/60 backdrop-blur-[0.5px] scale-100 shadow-[0_0_16px_rgba(184,34,40,0.35)]'
              : isClicked
              ? 'w-6 h-6 border-2 border-[#B82228] bg-[#B82228]/30 scale-75 animate-ping'
              : 'w-8 h-8 border border-[#B82228]/35 bg-[#B82228]/5 scale-100'
          }`}
        >
          {hoverLabel && isHovered && (
            <span className="font-mono text-[7.5px] uppercase tracking-widest text-[#B82228] font-bold select-none animate-fade-in-scale">
              {hoverLabel}
            </span>
          )}
        </div>
      </div>

      {/* Main Handcrafted Bengali Haat Pakha (Hand Fan) */}
      <div
        ref={fanRef}
        style={{ willChange: 'transform' }}
        className="absolute top-0 left-0 pointer-events-none -translate-x-1 -translate-y-1"
      >
        <div
          className={`relative origin-[4px_4px] transition-transform duration-200 ease-out ${
            isClicked
              ? '-rotate-24 scale-90 translate-y-0.5'
              : isHovered
              ? 'rotate-8 scale-110 animate-pulse'
              : 'rotate-0 scale-100'
          }`}
        >
          {/* SVG Handcrafted Traditional Bengali Hand Fan */}
          <svg
            width="38"
            height="42"
            viewBox="0 0 38 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.45)]"
          >
            <defs>
              {/* Crimson Red Fan Pleat Gradient */}
              <linearGradient id="redPleat" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#C92A31" />
                <stop offset="60%" stopColor="#A81C22" />
                <stop offset="100%" stopColor="#7E1217" />
              </linearGradient>

              {/* Ivory Bamboo/Palm Leaf Pleat Gradient */}
              <linearGradient id="ivoryPleat" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFDF7" />
                <stop offset="60%" stopColor="#F2E8D3" />
                <stop offset="100%" stopColor="#DFCDB0" />
              </linearGradient>

              {/* Natural Bamboo Cane Handle Gradient */}
              <linearGradient id="bambooHandle" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#EAD8B2" />
                <stop offset="50%" stopColor="#D2BF96" />
                <stop offset="100%" stopColor="#B39F74" />
              </linearGradient>

              {/* Red Ruffled Frill Shadow */}
              <filter id="frillShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="0.5" stdDeviation="0.5" floodColor="#400" floodOpacity="0.4" />
              </filter>
            </defs>

            {/* --- 1. Long Bamboo Cane Handle --- */}
            {/* Extended downward handle */}
            <path
              d="M17.5 17.5 L24.5 39.5 C24.7 40.5 25.8 41 26.5 40.5 C27.2 40 27 39 26.5 38 L19.5 16 Z"
              fill="url(#bambooHandle)"
              stroke="#8C7752"
              strokeWidth="0.5"
            />
            {/* Bamboo natural node rings */}
            <line x1="20.5" y1="26" x2="22.5" y2="26.8" stroke="#8C7752" strokeWidth="0.6" strokeLinecap="round" />
            <line x1="22.5" y1="33" x2="24.5" y2="33.8" stroke="#8C7752" strokeWidth="0.6" strokeLinecap="round" />

            {/* --- 2. Circular Pleated Fan Body (Wedges radiating from center hub (18, 17)) --- */}
            {/* Center Pivot Hub: (18, 17), Outer Arc Radius: ~14px */}

            {/* Wedge 1: Red with Alpona (Top-Left) */}
            <path
              d="M18 17 L5.5 11.5 A14 14 0 0 1 9 6 Z"
              fill="url(#redPleat)"
              stroke="#6B0F13"
              strokeWidth="0.3"
            />
            {/* Alpona motifs on Wedge 1 */}
            <path d="M7.5 9.5 Q9 9 11 11" stroke="#FFF" strokeWidth="0.5" strokeLinecap="round" />
            <circle cx="8" cy="8" r="0.45" fill="#FFF" />
            <circle cx="10" cy="9.5" r="0.45" fill="#FFF" />

            {/* Wedge 2: Ivory (Top) */}
            <path
              d="M18 17 L9 6 A14 14 0 0 1 14 3.5 Z"
              fill="url(#ivoryPleat)"
              stroke="#B39F74"
              strokeWidth="0.3"
            />

            {/* Wedge 3: Red with Alpona (Top-Center) */}
            <path
              d="M18 17 L14 3.5 A14 14 0 0 1 20 3 Z"
              fill="url(#redPleat)"
              stroke="#6B0F13"
              strokeWidth="0.3"
            />
            {/* Alpona on Wedge 3 */}
            <path d="M16 5.5 Q17 8 17.5 11" stroke="#FFF" strokeWidth="0.5" strokeLinecap="round" />
            <circle cx="16" cy="4.5" r="0.45" fill="#FFF" />
            <circle cx="16.8" cy="7" r="0.45" fill="#FFF" />

            {/* Wedge 4: Ivory (Top-Right) */}
            <path
              d="M18 17 L20 3 A14 14 0 0 1 26 5 Z"
              fill="url(#ivoryPleat)"
              stroke="#B39F74"
              strokeWidth="0.3"
            />

            {/* Wedge 5: Red with Alpona (Right) */}
            <path
              d="M18 17 L26 5 A14 14 0 0 1 30.5 9 Z"
              fill="url(#redPleat)"
              stroke="#6B0F13"
              strokeWidth="0.3"
            />
            {/* Alpona on Wedge 5 */}
            <path d="M25 7.5 Q23.5 10 21 12" stroke="#FFF" strokeWidth="0.5" strokeLinecap="round" />
            <circle cx="27" cy="7" r="0.45" fill="#FFF" />
            <circle cx="25" cy="9" r="0.45" fill="#FFF" />

            {/* Wedge 6: Ivory (Mid-Right) */}
            <path
              d="M18 17 L30.5 9 A14 14 0 0 1 32 14.5 Z"
              fill="url(#ivoryPleat)"
              stroke="#B39F74"
              strokeWidth="0.3"
            />

            {/* Wedge 7: Red with Alpona (Lower-Right) */}
            <path
              d="M18 17 L32 14.5 A14 14 0 0 1 30 20.5 Z"
              fill="url(#redPleat)"
              stroke="#6B0F13"
              strokeWidth="0.3"
            />
            {/* Alpona on Wedge 7 */}
            <circle cx="29" cy="16" r="0.45" fill="#FFF" />
            <circle cx="27" cy="18" r="0.45" fill="#FFF" />

            {/* Wedge 8: Ivory (Lower) */}
            <path
              d="M18 17 L30 20.5 A14 14 0 0 1 24.5 25 Z"
              fill="url(#ivoryPleat)"
              stroke="#B39F74"
              strokeWidth="0.3"
            />

            {/* Wedge 9: Red with Alpona (Left/Bottom-Left) */}
            <path
              d="M18 17 L4.5 16 A14 14 0 0 1 5.5 11.5 Z"
              fill="url(#redPleat)"
              stroke="#6B0F13"
              strokeWidth="0.3"
            />
            <circle cx="6" cy="13" r="0.45" fill="#FFF" />

            {/* Wedge 10: Ivory Bottom-Left */}
            <path
              d="M18 17 L6.5 21.5 A14 14 0 0 1 4.5 16 Z"
              fill="url(#ivoryPleat)"
              stroke="#B39F74"
              strokeWidth="0.3"
            />

            {/* Wedge 11: Red with Alpona (Bottom) */}
            <path
              d="M18 17 L11 25.5 A14 14 0 0 1 6.5 21.5 Z"
              fill="url(#redPleat)"
              stroke="#6B0F13"
              strokeWidth="0.3"
            />
            <circle cx="9" cy="22" r="0.45" fill="#FFF" />

            {/* Wedge 12: Ivory Base */}
            <path
              d="M18 17 L16 27 A14 14 0 0 1 11 25.5 Z"
              fill="url(#ivoryPleat)"
              stroke="#B39F74"
              strokeWidth="0.3"
            />

            {/* --- 3. Ruffled Vermilion Fabric Frill Border along Outer Rim --- */}
            {/* Scalloped pleated ruffled border path surrounding the perimeter */}
            <path
              d="M16 28.5
                 C14.5 28 13.5 27 12 27
                 C10.5 27 9.5 25.5 8 24.5
                 C6.5 23.5 5.5 21.5 4.5 19.5
                 C3.5 17.5 3 15 3.5 13
                 C4 11 4.5 9 6 7
                 C7.5 5 9.5 3.5 11.5 2.5
                 C13.5 1.5 16 1.2 18.5 1.5
                 C21 1.8 23.5 2.8 25.5 4.5
                 C27.5 6.2 29.5 8.5 31 11
                 C32.5 13.5 33.5 16 33.2 18.5
                 C33 21 31.5 23.5 29.5 25
                 C27.5 26.5 25.5 27.5 23.5 27.8
                 L22.5 26
                 C24 25.5 26 24.5 27.5 23
                 C29 21.5 30.5 19.5 30.5 17.5
                 C30.5 15.5 29.8 13.2 28.5 11.5
                 C27.2 9.8 25.5 8 23.8 6.8
                 C22.1 5.6 20 4.8 18 4.6
                 C16 4.4 14 4.8 12.2 5.6
                 C10.4 6.4 8.8 7.8 7.8 9.5
                 C6.8 11.2 6.4 13 6.6 14.8
                 C6.8 16.6 7.8 18.5 9 20
                 C10.2 21.5 11.8 22.8 13.2 23.8
                 Z"
              fill="#D42028"
              stroke="#8B1015"
              strokeWidth="0.5"
              filter="url(#frillShadow)"
            />

            {/* Little fabric crease highlights on the frill */}
            <path d="M6 7 L7.5 9 M11.5 2.5 L12.5 5 M18.5 1.5 L18.8 4.2 M25.5 4.5 L24.5 6.8 M31 11 L29 12.5 M33.2 18.5 L30.5 18" stroke="#FFA3A6" strokeWidth="0.4" strokeLinecap="round" />

            {/* --- 4. Center Brass / Bamboo Tie Hub (Binding Pivot) --- */}
            <circle cx="18" cy="17" r="2.2" fill="#D2BF96" stroke="#5E4928" strokeWidth="0.6" />
            <circle cx="18" cy="17" r="1.1" fill="#7E1217" />
            <circle cx="18" cy="17" r="0.4" fill="#FFF" />

            {/* Gentle Pointer Beacon at Top Tip (Hotspot indicator) */}
            <circle
              cx="4"
              cy="4"
              r="1.2"
              fill="#FFF8DC"
              className={isHovered ? 'animate-ping' : ''}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
