'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsapConfig';

type AnimationType = 
  | 'fadeUp' 
  | 'fadeDown' 
  | 'flip' 
  | 'wave' 
  | 'bounce' 
  | 'slide' 
  | 'rotate' 
  | 'glitch'
  | 'typing'
  | 'reveal';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  animationType?: AnimationType;
  staggerDelay?: number;
  repeat?: boolean;
  gradient?: boolean;
  glow?: boolean;
  onComplete?: () => void;
}

const AnimatedText = ({ 
  text, 
  className = '', 
  delay = 0,
  animationType = 'flip', // Default to 'flip' to match original behavior
  staggerDelay = 0.02,
  repeat = false,
  gradient = false,
  glow = false,
  onComplete
}: AnimatedTextProps) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Main animation effect
  useEffect(() => {
    if (!textRef.current) return;

    const chars = textRef.current.querySelectorAll('.char');
    const ctx = gsap.context(() => {
      switch (animationType) {
        case 'fadeUp':
          gsap.from(chars, {
            opacity: 0,
            y: 50,
            stagger: staggerDelay,
            duration: 0.8,
            ease: 'back.out(1.7)',
            delay,
            onComplete,
          });
          break;

        case 'fadeDown':
          gsap.from(chars, {
            opacity: 0,
            y: -50,
            stagger: staggerDelay,
            duration: 0.8,
            ease: 'power3.out',
            delay,
            onComplete,
          });
          break;

        case 'flip':
          // Original animation - maintains backward compatibility
          gsap.from(chars, {
            opacity: 0,
            y: 50,
            rotateX: -90,
            transformOrigin: 'top center',
            stagger: staggerDelay,
            duration: 0.8,
            ease: 'back.out(1.7)',
            delay,
            onComplete,
          });
          break;

        case 'wave':
          gsap.from(chars, {
            y: 20,
            opacity: 0,
            stagger: staggerDelay,
            duration: 0.6,
            ease: 'sine.inOut',
            delay,
            repeat: repeat ? -1 : 0,
            yoyo: repeat,
            onComplete: !repeat ? onComplete : undefined,
          });
          break;

        case 'bounce':
          gsap.from(chars, {
            y: -100,
            opacity: 0,
            stagger: staggerDelay,
            duration: 1,
            ease: 'bounce.out',
            delay,
            onComplete,
          });
          break;

        case 'slide':
          gsap.from(chars, {
            x: -50,
            opacity: 0,
            stagger: staggerDelay,
            duration: 0.8,
            ease: 'power3.out',
            delay,
            onComplete,
          });
          break;

        case 'rotate':
          gsap.from(chars, {
            rotation: 180,
            opacity: 0,
            stagger: staggerDelay,
            duration: 0.8,
            ease: 'back.out(2)',
            delay,
            onComplete,
          });
          break;

        case 'glitch':
          // Glitch effect with random movements
          chars.forEach((char, index) => {
            gsap.from(char, {
              x: Math.random() * 40 - 20,
              y: Math.random() * 40 - 20,
              opacity: 0,
              duration: 0.3,
              ease: 'power1.inOut',
              delay: delay + index * staggerDelay,
              onComplete: index === chars.length - 1 ? onComplete : undefined,
            });

            // Add glitch jitter
            gsap.to(char, {
              x: `random(-2, 2)`,
              duration: 0.1,
              repeat: 3,
              yoyo: true,
              delay: delay + index * staggerDelay + 0.3,
            });
          });
          break;

        case 'typing':
          gsap.from(chars, {
            opacity: 0,
            width: 0,
            stagger: staggerDelay * 2,
            duration: 0.1,
            ease: 'none',
            delay,
            onComplete,
          });
          break;

        case 'reveal':
          gsap.from(chars, {
            opacity: 0,
            scaleX: 0,
            transformOrigin: 'left center',
            stagger: staggerDelay,
            duration: 0.5,
            ease: 'power2.out',
            delay,
            onComplete,
          });
          break;

        default:
          // Default to flip animation
          gsap.from(chars, {
            opacity: 0,
            y: 50,
            rotateX: -90,
            stagger: staggerDelay,
            duration: 0.8,
            ease: 'back.out(1.7)',
            delay,
            onComplete,
          });
      }
    }, textRef);

    return () => ctx.revert();
  }, [animationType, delay, staggerDelay, repeat, onComplete]);

  // Hover animation
  useEffect(() => {
    if (!textRef.current || !isHovered) return;

    const chars = textRef.current.querySelectorAll('.char');
    
    chars.forEach((char, index) => {
      gsap.to(char, {
        y: -10,
        color: gradient ? undefined : '#d4af37',
        duration: 0.3,
        ease: 'power2.out',
        delay: index * 0.02,
        yoyo: true,
        repeat: 1,
      });
    });
  }, [isHovered, gradient]);

  // Split text into characters
  const renderChars = () => {
    return text.split('').map((char, index) => {
      const isSpace = char === ' ';
      
      return (
        <span
          key={index}
          className={`char inline-block ${
            gradient 
              ? 'bg-gold-gradient bg-clip-text text-transparent' 
              : ''
          } ${glow ? 'drop-shadow-gold' : ''}`}
          style={{ 
            display: 'inline-block',
            whiteSpace: isSpace ? 'pre' : 'normal',
          }}
        >
          {isSpace ? '\u00A0' : char}
        </span>
      );
    });
  };

  return (
    <span
      ref={textRef}
      className={`${className} ${glow ? 'text-shadow-gold' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {renderChars()}
    </span>
  );
};

export default AnimatedText;

// Additional utility component for word-by-word animation
export const AnimatedWords = ({ 
  text, 
  className = '', 
  delay = 0,
  staggerDelay = 0.1,
  animationType = 'fadeUp' 
}: Omit<AnimatedTextProps, 'text'> & { text: string }) => {
  const wordsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!wordsRef.current) return;

    const words = wordsRef.current.querySelectorAll('.word');
    const ctx = gsap.context(() => {
      switch (animationType) {
        case 'fadeUp':
          gsap.from(words, {
            y: 30,
            opacity: 0,
            stagger: staggerDelay,
            duration: 0.8,
            ease: 'power3.out',
            delay,
          });
          break;

        case 'slide':
          gsap.from(words, {
            x: -30,
            opacity: 0,
            stagger: staggerDelay,
            duration: 0.8,
            ease: 'power3.out',
            delay,
          });
          break;

        case 'flip':
          gsap.from(words, {
            rotateX: -90,
            opacity: 0,
            transformOrigin: 'top center',
            stagger: staggerDelay,
            duration: 0.8,
            ease: 'back.out(1.7)',
            delay,
          });
          break;

        default:
          gsap.from(words, {
            y: 30,
            opacity: 0,
            stagger: staggerDelay,
            duration: 0.8,
            ease: 'power3.out',
            delay,
          });
      }
    }, wordsRef);

    return () => ctx.revert();
  }, [animationType, delay, staggerDelay]);

  return (
    <span ref={wordsRef} className={className}>
      {text.split(' ').map((word, index) => (
        <span key={index} className="word inline-block mr-[0.25em]">
          {word}
        </span>
      ))}
    </span>
  );
};

// Utility component for scramble/decode effect
export const ScrambleText = ({ 
  text, 
  className = '', 
  delay = 0,
  scrambleSpeed = 50,
  onComplete 
}: Omit<AnimatedTextProps, 'text' | 'animationType'> & { 
  text: string;
  scrambleSpeed?: number;
}) => {
  const [displayText, setDisplayText] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }

      iteration += 1 / 3;
    }, scrambleSpeed);

    const timeout = setTimeout(() => {
      setInterval(() => {}, 0);
    }, delay);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [text, delay, scrambleSpeed, onComplete]);

  return (
    <span className={`${className} font-mono`}>
      {displayText}
    </span>
  );
};

// Utility component for typewriter effect with cursor
export const TypewriterText = ({
  text,
  className = '',
  delay = 0,
  speed = 100,
  onComplete,
  showCursor = true,
}: Omit<AnimatedTextProps, 'animationType'> & {
  speed?: number;
  showCursor?: boolean;
}) => {
  const [displayText, setDisplayText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let index = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          if (onComplete) onComplete();
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay, speed, onComplete]);

  useEffect(() => {
    if (!showCursor) return;
    
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, [showCursor]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <span className={`inline-block w-0.5 h-[1em] bg-gold ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
      )}
    </span>
  );
};