import React, { useEffect, useState, useRef } from 'react';

/**
 * UniqueCursor
 * Bespoke Culinary Atelier Kitchen Cursor:
 * - Handcrafted Antique Brass Tasting Spoon (zero-latency pointer tracking)
 * - Simmering Spice / Mustard Oil Droplet with warm hearth glow
 * - Sizzling Tempering Ripple on click
 * - Fluid Trailing Halo with magnetic expansion over clickable items
 * - Fully disabled on touch / mobile devices
 */
export const UniqueCursor: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);

  const spoonRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const haloPos = useRef({ x: -100, y: -100 });
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

      if (spoonRef.current) {
        spoonRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
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

    // Smooth trailing halo lerp loop
    const render = () => {
      const lerpFactor = 0.18;
      haloPos.current.x += (mousePos.current.x - haloPos.current.x) * lerpFactor;
      haloPos.current.y += (mousePos.current.y - haloPos.current.y) * lerpFactor;

      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${haloPos.current.x}px, ${haloPos.current.y}px, 0)`;
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
      {/* Outer Sizzling Tempering Halo */}
      <div
        ref={haloRef}
        style={{ willChange: 'transform' }}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center"
      >
        <div
          className={`rounded-full flex items-center justify-center transition-all duration-300 ease-out ${
            isHovered
              ? isClicked
                ? 'w-10 h-10 bg-[#B58D59]/35 border-2 border-[#B58D59] scale-90'
                : 'w-14 h-14 bg-[#B58D59]/15 border border-[#B58D59] backdrop-blur-[0.5px] scale-100 shadow-[0_0_18px_rgba(181,141,89,0.4)]'
              : isClicked
              ? 'w-6 h-6 border-2 border-[#B58D59] bg-[#B58D59]/30 scale-75 animate-ping'
              : 'w-8 h-8 border border-[#B58D59]/40 bg-[#B58D59]/5 scale-100'
          }`}
        >
          {hoverLabel && isHovered && (
            <span className="font-mono text-[7.5px] uppercase tracking-widest text-[#B58D59] font-bold select-none animate-fade-in-scale">
              {hoverLabel}
            </span>
          )}
        </div>
      </div>

      {/* Main Kitchen Element: Antique Brass Tasting Spoon */}
      <div
        ref={spoonRef}
        style={{ willChange: 'transform' }}
        className="absolute top-0 left-0 pointer-events-none"
      >
        <div
          className={`relative origin-top-left transition-transform duration-200 ease-out ${
            isClicked
              ? '-rotate-12 scale-90 translate-y-0.5'
              : isHovered
              ? 'rotate-6 scale-110'
              : 'rotate-0 scale-100'
          }`}
        >
          {/* SVG Culinary Tasting Spoon */}
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
          >
            <defs>
              {/* Antique Brass Gradient */}
              <linearGradient id="brassGradient" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#F5E4B5" />
                <stop offset="35%" stopColor="#D4AF37" />
                <stop offset="70%" stopColor="#B58D59" />
                <stop offset="100%" stopColor="#6E502B" />
              </linearGradient>

              {/* Spoon Metallic Ridge */}
              <linearGradient id="ridgeGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#B58D59" stopOpacity="0.2" />
              </linearGradient>

              {/* Warm Mustard Oil / Ember Droplet */}
              <radialGradient id="oilDroplet" cx="45%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#FFF275" />
                <stop offset="40%" stopColor="#E5A93B" />
                <stop offset="85%" stopColor="#B58D59" />
                <stop offset="100%" stopColor="#7A4B1A" />
              </radialGradient>
            </defs>

            {/* Spoon Handle extending to bottom-right */}
            <path
              d="M12.5 12.5 L25 25 C26.5 26.5 28.5 28 29.5 27 C30.5 26 29 24 27.5 22.5 L15 10 Z"
              fill="url(#brassGradient)"
              stroke="#4A3419"
              strokeWidth="0.6"
            />

            {/* Handle Metallic Center Ridge */}
            <path
              d="M13.5 13 L27 26.5"
              stroke="url(#ridgeGradient)"
              strokeWidth="0.8"
              strokeLinecap="round"
            />

            {/* Spoon Bowl (Tip exact at (1, 1) for pinpoint click accuracy) */}
            <path
              d="M1.5 1.5 C4.5 0.5 10.5 4.5 12 8.5 C13.5 12.5 11.5 15.5 8 15 C4.5 14.5 0.5 8.5 1.5 1.5 Z"
              fill="url(#brassGradient)"
              stroke="#3D2912"
              strokeWidth="0.75"
            />

            {/* Inner Spoon Bowl Shadow & Depth */}
            <path
              d="M3 3 C5.5 2.5 9.5 5.5 10.5 8.5 C11.5 11.5 10 13.5 7.5 13 C4.8 12.5 2.2 8 3 3 Z"
              fill="#52391C"
              fillOpacity="0.35"
            />

            {/* Simmering Mustard Oil / Spice Droplet in Spoon Bowl */}
            <ellipse
              cx="6.2"
              cy="7.8"
              rx="2.6"
              ry="3.2"
              transform="rotate(-35 6.2 7.8)"
              fill="url(#oilDroplet)"
            />

            {/* Hot Sizzle Sparkle at the Tip */}
            <circle
              cx="1.8"
              cy="1.8"
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
