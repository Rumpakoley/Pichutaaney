import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';

interface ScrollWordProps {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  isAccent?: boolean;
  theme?: 'light' | 'dark';
}

export const ScrollWord: React.FC<ScrollWordProps> = ({
  children,
  progress,
  range,
  isAccent,
  theme = 'light',
}) => {
  const isDark = theme === 'dark';
  const opacity = useTransform(progress, range, [isDark ? 0.2 : 0.18, 1]);
  const color = useTransform(
    progress,
    range,
    [
      isAccent
        ? isDark
          ? 'rgba(243, 148, 126, 0.25)'
          : 'rgba(133, 55, 36, 0.22)'
        : isDark
        ? 'rgba(255, 255, 255, 0.2)'
        : 'rgba(24, 24, 27, 0.18)',
      isAccent ? (isDark ? '#F3947E' : '#853724') : isDark ? '#FFFFFF' : '#18181B',
    ]
  );
  const y = useTransform(progress, range, [3, 0]);

  return (
    <motion.span
      style={{ opacity, color, y }}
      className={`inline-block mr-[0.26em] select-none md:select-auto ${
        isAccent ? 'font-medium' : ''
      }`}
    >
      {children}
    </motion.span>
  );
};

interface ScrollParagraphRevealProps {
  text: string;
  className?: string;
  theme?: 'light' | 'dark';
  accentWords?: string[];
}

export const ScrollParagraphReveal: React.FC<ScrollParagraphRevealProps> = ({
  text,
  className = '',
  theme = 'light',
  accentWords = [],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'end 0.4'],
  });

  const words = text.split(' ');

  return (
    <div ref={containerRef} className={className}>
      {words.map((word, idx) => {
        const start = idx / words.length;
        const end = Math.min(1, start + 1.5 / words.length);
        const cleanWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase();
        const isAccent = accentWords.some((aw) => aw.toLowerCase() === cleanWord);

        return (
          <ScrollWord
            key={idx}
            progress={scrollYProgress}
            range={[start, end]}
            isAccent={isAccent}
            theme={theme}
          >
            {word}
          </ScrollWord>
        );
      })}
    </div>
  );
};

interface RevealHeadingProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const RevealHeading: React.FC<RevealHeadingProps> = ({
  children,
  className = '',
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
}

export const RevealText: React.FC<RevealTextProps> = ({
  children,
  className = '',
  delay = 0.1,
  yOffset = 18,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = '',
  staggerDelay = 0.08,
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
