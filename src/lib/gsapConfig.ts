import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Animation presets
export const fadeIn = (element: string | Element, delay: number = 0) => {
  return gsap.from(element, {
    opacity: 0,
    y: 50,
    duration: 1,
    delay,
    ease: 'power3.out',
  });
};

export const slideIn = (element: string | Element, direction: 'left' | 'right' = 'left', delay: number = 0) => {
  return gsap.from(element, {
    opacity: 0,
    x: direction === 'left' ? -100 : 100,
    duration: 1,
    delay,
    ease: 'power3.out',
  });
};

export const scaleIn = (element: string | Element, delay: number = 0) => {
  return gsap.from(element, {
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    delay,
    ease: 'back.out(1.7)',
  });
};

export const staggerFadeIn = (elements: string, delay: number = 0) => {
  return gsap.from(elements, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay,
    stagger: 0.2,
    ease: 'power3.out',
  });
};

// Scroll-triggered animations
export const scrollAnimation = (trigger: string, element: string, animation: gsap.TweenVars) => {
  return gsap.from(element, {
    ...animation,
    scrollTrigger: {
      trigger,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
    },
  });
};

// Text reveal animation
export const textReveal = (element: string) => {
  return gsap.from(element, {
    opacity: 0,
    y: 100,
    duration: 1,
    ease: 'power4.out',
  });
};

// Magnetic button effect
export const magneticEffect = (button: HTMLElement) => {
  const handleMouseMove = (e: MouseEvent) => {
    const { left, top, width, height } = button.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (e.clientX - centerX) * 0.3;
    const deltaY = (e.clientY - centerY) * 0.3;

    gsap.to(button, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  button.addEventListener('mousemove', handleMouseMove);
  button.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    button.removeEventListener('mousemove', handleMouseMove);
    button.removeEventListener('mouseleave', handleMouseLeave);
  };
};

export { gsap, ScrollTrigger };
