import { useEffect } from 'react';

/**
 * useScrollReveal
 * Automatically attaches smooth scroll-triggered reveal transitions
 * to all headings, paragraphs, quotes, and editorial text blocks across the site.
 */
export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -30px 0px',
        threshold: 0.05,
      }
    );

    const selector = [
      'main h1',
      'main h2',
      'main h3',
      'main h4',
      'main h5',
      'main p',
      'main blockquote',
      'main .font-marcellus',
      'main .font-pt-serif',
      'main .font-serif-cormorant',
      'main .font-bengali',
      'footer h2',
      'footer h3',
      'footer h4',
      'footer p',
      '.scroll-reveal-text',
    ].join(', ');

    const attachObserver = () => {
      const elements = document.querySelectorAll<HTMLElement>(selector);

      elements.forEach((el) => {
        if (
          el.closest('.animate-marquee') ||
          el.closest('nav') ||
          el.closest('button') ||
          el.closest('input') ||
          el.closest('textarea') ||
          el.closest('select') ||
          el.classList.contains('no-reveal')
        ) {
          return;
        }

        if (!el.classList.contains('scroll-reveal-text')) {
          el.classList.add('scroll-reveal-text');
          observer.observe(el);
        }
      });
    };

    // Attach immediately and on next frame to catch all mounted elements
    attachObserver();
    const timer = setTimeout(attachObserver, 150);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);
}
