import React, { useEffect, useState, useRef } from 'react';

/**
 * UniqueCursor
 * A bespoke, luxury dual-element cursor for Pichhutaaney:
 * - Inner Golden Spice Ember dot (zero-latency tracking)
 * - Outer Fluid Trailing Halo with magnetic expansion over interactive targets
 * - Disabled on touch/mobile devices for native touch behavior
 */
export const UniqueCursor: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
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

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
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
          setHoverLabel('PLAY');
        } else if (interactive.closest('#dishes-gallery, [data-plate]')) {
          setHoverLabel('EXPLORE');
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

    // Smooth trailing ring lerp loop
    const render = () => {
      const lerpFactor = 0.22;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
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
      {/* Outer Trailing Halo Ring */}
      <div
        ref={ringRef}
        style={{ willChange: 'transform' }}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center transition-[width,height,background-color,border-color] duration-300 ease-out"
      >
        <div
          className={`rounded-full flex items-center justify-center transition-all duration-300 ease-out ${
            isHovered
              ? isClicked
                ? 'w-10 h-10 bg-[#B58D59]/30 border-2 border-[#B58D59] scale-90'
                : 'w-14 h-14 bg-[#B58D59]/15 border border-[#B58D59] backdrop-blur-[0.5px] scale-100 shadow-[0_0_15px_rgba(181,141,89,0.35)]'
              : isClicked
              ? 'w-6 h-6 border-2 border-[#B58D59] bg-[#B58D59]/30 scale-75'
              : 'w-9 h-9 border border-[#B58D59]/60 bg-[#B58D59]/5 scale-100'
          }`}
        >
          {hoverLabel && isHovered && (
            <span className="font-mono text-[8px] uppercase tracking-widest text-[#B58D59] font-bold select-none animate-fade-in-scale">
              {hoverLabel}
            </span>
          )}
        </div>
      </div>

      {/* Inner Golden Ember Dot */}
      <div
        ref={dotRef}
        style={{ willChange: 'transform' }}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <div
          className={`rounded-full transition-all duration-150 ${
            isHovered
              ? 'w-2 h-2 bg-[#B58D59] shadow-[0_0_8px_#B58D59]'
              : isClicked
              ? 'w-3 h-3 bg-[#E5B876] scale-125 shadow-[0_0_12px_#E5B876]'
              : 'w-1.5 h-1.5 bg-[#B58D59] shadow-[0_0_6px_rgba(181,141,89,0.8)]'
          }`}
        />
      </div>
    </div>
  );
};
