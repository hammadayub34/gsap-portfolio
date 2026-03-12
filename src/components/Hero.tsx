'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { FaArrowDown } from 'react-icons/fa';
import AnimatedText from './AnimatedText';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const btn1Ref = useRef<HTMLSpanElement>(null);
  const btn2Ref = useRef<HTMLSpanElement>(null);
  
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [particlePositions, setParticlePositions] = useState<Array<{ left: number; top: number }>>([]);
  const fullText = "Backend Engineer & CRM Specialist.";

  // Generate particle positions on client side only
  useEffect(() => {
    const positions = Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
    }));
    setParticlePositions(positions);
  }, []);

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const typingSpeed = 100;
    
    const typeInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, typingSpeed);

    // Cursor blink
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => {
      clearInterval(typeInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  // Main animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Stagger fade-in for main content — title handled by AnimatedText
      tl.from(
          subtitleRef.current,
          {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out',
            delay: 0.9,
          }
        )
        .from(
          descRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: 'power4.out',
          },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'back.out(1.7)' },
          '-=0.4'
        );

      // Floating particles animation
      if (particlesRef.current && particlePositions.length > 0) {
        const particles = particlesRef.current.querySelectorAll('.particle');
        particles.forEach((particle) => {
          gsap.to(particle, {
            y: `random(-100, 100)`,
            x: `random(-100, 100)`,
            duration: `random(3, 6)`,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
      }


      // Background gradient animation
      gsap.to('.gradient-blob-1', {
        x: 100,
        y: -50,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.gradient-blob-2', {
        x: -100,
        y: 50,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

    }, heroRef);

    return () => ctx.revert();
  }, [particlePositions]);


  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) * 0.01;
      const moveY = (clientY - window.innerHeight / 2) * 0.01;

      gsap.to('.parallax-layer-1', {
        x: moveX,
        y: moveY,
        duration: 0.5,
      });

      gsap.to('.parallax-layer-2', {
        x: moveX * 1.5,
        y: moveY * 1.5,
        duration: 0.8,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const makeMagnetic = (ref: React.RefObject<HTMLSpanElement | null>) => ({
    onMouseMove: (e: React.MouseEvent<HTMLSpanElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      gsap.to(el, { x: dx * 0.28, y: dy * 0.28, duration: 0.35, ease: 'power2.out' });
    },
    onMouseLeave: () => {
      gsap.to(ref.current, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.4)' });
    },
  });

  return (
    <section
      id="home"
      ref={heroRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 0 10rem',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%)',
      }}
    >
      {/* Animated background elements */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {/* Gradient blobs */}
        <div 
          className="gradient-blob-1" 
          style={{
            position: 'absolute',
            top: '25%',
            left: '25%',
            width: '24rem',
            height: '24rem',
            background: 'rgba(212, 175, 55, 0.1)',
            borderRadius: '50%',
            filter: 'blur(80px)',
          }}
        ></div>
        <div 
          className="gradient-blob-2" 
          style={{
            position: 'absolute',
            bottom: '25%',
            right: '25%',
            width: '24rem',
            height: '24rem',
            background: 'rgba(212, 175, 55, 0.1)',
            borderRadius: '50%',
            filter: 'blur(80px)',
          }}
        ></div>
        
        {/* Additional ambient lights */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(ellipse at top left, rgba(212, 175, 55, 0.05), transparent)',
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(ellipse at bottom right, rgba(212, 175, 55, 0.05), transparent)',
        }}></div>
      </div>

      {/* Floating particles */}
      <div ref={particlesRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {particlePositions.map((pos, i) => (
          <div
            key={i}
            className="particle"
            style={{
              position: 'absolute',
              width: '0.5rem',
              height: '0.5rem',
              background: 'rgba(212, 175, 55, 0.3)',
              borderRadius: '50%',
              filter: 'blur(2px)',
              left: `${pos.left}%`,
              top: `${pos.top}%`,
            }}
          />
        ))}
      </div>

      <div className="container-custom" style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', width: '100%' }}>
        <div style={{ textAlign: 'center' }}>
          {/* Greeting */}
          <div className="parallax-layer-1 animate-fade-in">
            <p style={{
              fontFamily: 'IBM Plex Mono, monospace',
              color: '#d4af37',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              marginBottom: '2rem',
            }}>
              Hi, my name is
            </p>
          </div>

          {/* Main Title */}
          <div className="parallax-layer-2" style={{ marginBottom: '1.5rem' }}>
            <h1
              style={{
                fontFamily: 'Crimson Pro, serif',
                fontWeight: 900,
                color: '#f5f1e8',
                fontSize: 'clamp(1.8rem, 7vw, 6rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                position: 'relative',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <AnimatedText
                  text="Hammad Ayub"
                  animationType="flip"
                  delay={0.3}
                  staggerDelay={0.05}
                />
                <span style={{
                  position: 'absolute',
                  inset: '-0.25rem',
                  background: 'rgba(212, 175, 55, 0.2)',
                  filter: 'blur(30px)',
                  zIndex: -1,
                }}></span>
              </span>
            </h1>
          </div>

          {/* Subtitle with typewriter */}
          <div className="parallax-layer-1" style={{ marginBottom: '2rem' }}>
            <h2
              ref={subtitleRef}
              className="hero-subtitle"
              style={{
                fontFamily: 'Crimson Pro, serif',
                fontWeight: 600,
                color: '#b8b4a8',
                fontSize: 'clamp(1.75rem, 5vw, 3.5rem)',
                lineHeight: 1.2,
                minHeight: '4rem',
              }}
            >
              {typedText}
              <span style={{
                display: 'inline-block',
                width: '3px',
                height: 'clamp(2rem, 4vw, 3rem)',
                background: '#d4af37',
                marginLeft: '0.25rem',
                opacity: showCursor ? 1 : 0,
                transition: 'opacity 0.1s',
              }}></span>
            </h2>
          </div>

          {/* Description */}
          <div className="parallax-layer-2 hero-desc" style={{ marginBottom: '3rem' }}>
            <p
              ref={descRef}
              style={{
                maxWidth: '42rem',
                margin: '0 auto',
                color: '#b8b4a8',
                fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                lineHeight: 1.8,
              }}
            >
              Results-driven <span style={{ color: '#d4af37', fontWeight: 600 }}>backend engineer</span> with 2+ years of experience
              building scalable web, IoT, and automation solutions. Specialized in{' '}
              <span style={{ color: '#d4af37', fontWeight: 600 }}>Node.js, Python, and CRM automation</span> using
              HubSpot, GoHighLevel, and Zoho.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="hero-cta"
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '2rem',
              flexWrap: 'wrap',
              opacity: 0,
            }}
          >
            <span ref={btn1Ref} style={{ display: 'inline-block' }} {...makeMagnetic(btn1Ref)}>
              <Link
                href="#projects"
                className="btn btn-outline hero-cta-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  minWidth: '11rem',
                }}
              >
                <span>View My Work</span>
                <span style={{ display: 'inline-block', transition: 'transform 0.3s ease' }}>→</span>
              </Link>
            </span>
            <span ref={btn2Ref} style={{ display: 'inline-block' }} {...makeMagnetic(btn2Ref)}>
              <Link
                href="#contact"
                className="btn btn-primary hero-cta-btn"
                style={{ minWidth: '11rem', justifyContent: 'center' }}
              >
                Get In Touch
              </Link>
            </span>
          </div>

        </div>
      </div>

      {/* Scroll indicator — hidden on mobile, anchors to section bottom on desktop */}
      <button
        onClick={scrollToProjects}
        suppressHydrationWarning
        className="hero-scroll-btn"
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#b8b4a8',
          transition: 'all 0.3s ease',
          zIndex: 3,
        }}
        aria-label="Scroll to projects"
      >
        <div className="animate-bounce">
          <FaArrowDown style={{ color: '#d4af37', fontSize: '1.5rem' }} />
        </div>
        <div style={{
          width: '1px',
          height: '4rem',
          background: 'linear-gradient(to bottom, #d4af37, transparent)',
        }}></div>
      </button>

      {/* Decorative grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}>
        <div className="bg-grid-pattern" style={{
          position: 'absolute',
          inset: 0,
        }}></div>
      </div>

      {/* Corner accents */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '5rem',
        height: '5rem',
        borderLeft: '2px solid rgba(212, 175, 55, 0.5)',
        borderTop: '2px solid rgba(212, 175, 55, 0.5)',
      }}></div>
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '5rem',
        height: '5rem',
        borderRight: '2px solid rgba(212, 175, 55, 0.5)',
        borderTop: '2px solid rgba(212, 175, 55, 0.5)',
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '5rem',
        height: '5rem',
        borderLeft: '2px solid rgba(212, 175, 55, 0.5)',
        borderBottom: '2px solid rgba(212, 175, 55, 0.5)',
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '5rem',
        height: '5rem',
        borderRight: '2px solid rgba(212, 175, 55, 0.5)',
        borderBottom: '2px solid rgba(212, 175, 55, 0.5)',
      }}></div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 1024px) {
          .side-social-links {
            left: 2rem !important;
          }
          .side-email-link {
            display: flex !important;
          }
        }

        .btn:hover span:last-child {
          transform: translateX(4px);
        }

        /* Hero mobile responsiveness */

        /* Hide scroll arrow on mobile — prevents overlap with CTA buttons */
        @media (max-width: 767px) {
          .hero-scroll-btn {
            display: none !important;
          }
          #home {
            padding-top: 5rem !important;
            padding-bottom: 3rem !important;
          }
        }

        @media (max-width: 600px) {
          .hero-desc {
            margin-bottom: 1.5rem !important;
          }
          .hero-subtitle {
            font-size: clamp(0.9rem, 5.5vw, 1.4rem) !important;
            min-height: 2rem !important;
            margin-bottom: 1rem !important;
          }
          .hero-cta {
            flex-direction: column !important;
            align-items: stretch !important;
            padding-top: 1rem !important;
            padding-left: 0.5rem !important;
            padding-right: 0.5rem !important;
          }
          .hero-cta-btn {
            width: 100% !important;
            min-width: unset !important;
            justify-content: center !important;
            padding: 0.875rem 1.5rem !important;
          }
          #home {
            padding-bottom: 2.5rem !important;
          }
        }

        @media (max-width: 400px) {
          #home h1 {
            font-size: clamp(1.5rem, 10vw, 2.5rem) !important;
          }
          .hero-subtitle {
            font-size: clamp(0.8rem, 4.5vw, 1.1rem) !important;
          }
        }

`}} />
    </section>
  );
};

export default Hero;