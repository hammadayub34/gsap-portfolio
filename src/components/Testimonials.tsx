'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaQuoteLeft, FaStar, FaFlask, FaRocket, FaBrain } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    quote:
      'Hammad built our entire IoT data ingestion pipeline from scratch. The system handles thousands of sensor readings per minute with zero downtime. His understanding of both hardware and backend architecture is rare to find.',
    name: 'Dr. Umar Siddiqui',
    role: 'Principal Researcher',
    company: 'CARE Engineering',
    initials: 'US',
    avatarGradient: 'linear-gradient(135deg, #1a2e1a, #0f2010)',
    avatarBorder: '#6cc24a',
    companyIcon: FaFlask,
    companyColor: '#6cc24a',
    stars: 5,
  },
  {
    id: 2,
    quote:
      'We hired Hammad to overhaul our GoHighLevel setup and within two weeks our lead follow-up time dropped by 70%. He knows CRM automation inside out — not just the tools but the actual business logic.',
    name: 'Sarah Mitchell',
    role: 'Operations Director',
    company: 'Apex Growth Agency',
    initials: 'SM',
    avatarGradient: 'linear-gradient(135deg, #2a1f08, #1a1305)',
    avatarBorder: '#d4af37',
    companyIcon: FaRocket,
    companyColor: '#d4af37',
    stars: 5,
  },
  {
    id: 3,
    quote:
      'The dental AI backend Hammad developed is rock-solid. Clean API design, proper error handling, and he was proactive about edge cases we hadn\'t even considered. On time, every time.',
    name: 'Dr. Kamran Rashid',
    role: 'Co-Founder',
    company: 'DentalVision AI',
    initials: 'KR',
    avatarGradient: 'linear-gradient(135deg, #1a0f2e, #100820)',
    avatarBorder: '#a855f7',
    companyIcon: FaBrain,
    companyColor: '#a855f7',
    stars: 5,
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      // Cards scale + fade in
      gsap.from('.t-card', {
        opacity: 0,
        scale: 0.92,
        y: 50,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power4.out',
        immediateRender: false,
        scrollTrigger: { trigger: '.t-grid', start: 'top 85%' },
      });

      // Stars bounce in per card (delayed after card entrance)
      gsap.utils.toArray<HTMLElement>('.t-star').forEach((star, i) => {
        gsap.from(star, {
          scale: 0,
          opacity: 0,
          duration: 0.35,
          delay: 0.6 + (i % 5) * 0.06,
          ease: 'back.out(2)',
          immediateRender: false,
          scrollTrigger: { trigger: '.t-grid', start: 'top 85%' },
        });
      });

      // Avatar rings pulse
      gsap.utils.toArray<HTMLElement>('.avatar-ring').forEach((ring, i) => {
        gsap.to(ring, {
          scale: 1.18,
          opacity: 0,
          duration: 1.8 + i * 0.3,
          repeat: -1,
          ease: 'power2.out',
          delay: i * 0.6,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      style={{ padding: '5rem 0', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background blobs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '8%', right: '8%',
          width: '30rem', height: '30rem',
          background: 'rgba(212,175,55,0.07)', borderRadius: '50%', filter: 'blur(90px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', left: '4%',
          width: '24rem', height: '24rem',
          background: 'rgba(168,85,247,0.05)', borderRadius: '50%', filter: 'blur(80px)',
        }} />
      </div>
      <div className="bg-grid-pattern" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.12 }} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 2, maxWidth: '1200px' }}>

        {/* Section title */}
        <h2 ref={titleRef} style={{
          color: '#f5f1e8',
          marginBottom: '3.5rem',
          display: 'flex',
          alignItems: 'center',
          fontSize: 'clamp(1.4rem, 5vw, 2.5rem)',
          fontFamily: 'Crimson Pro, serif',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          whiteSpace: 'nowrap',
          flexWrap: 'nowrap',
          overflow: 'hidden',
        }}>
          <span style={{ fontFamily: 'IBM Plex Mono, monospace', color: '#d4af37', fontSize: '1.5rem', marginRight: '1rem', flexShrink: 0 }}>
            05.
          </span>
          Testimonials
          <span style={{ marginLeft: '2rem', height: '1px', background: 'rgba(184,180,168,0.3)', flex: 1, maxWidth: '20rem' }} />
        </h2>

        {/* Grid */}
        <div className="t-grid" style={{ display: 'grid', gap: '1.75rem' }}>
          {testimonials.map((t) => {
            const CompanyIcon = t.companyIcon;
            return (
              <div
                key={t.id}
                className="t-card"
                style={{
                  position: 'relative',
                  background: 'rgba(255,255,255,0.022)',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${t.avatarBorder}33`;
                  e.currentTarget.style.boxShadow = `0 24px 60px rgba(0,0,0,0.55), 0 0 50px ${t.avatarBorder}14`;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.boxShadow = '';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Top shimmer */}
                <div style={{
                  position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
                  background: `linear-gradient(90deg, transparent, ${t.avatarBorder}55, transparent)`,
                  pointerEvents: 'none',
                }} />

                {/* Header band with avatar */}
                <div style={{
                  padding: '2rem 2rem 0',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}>
                  {/* Avatar with pulse ring */}
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    {/* Pulse ring */}
                    <div className="avatar-ring" style={{
                      position: 'absolute',
                      inset: '-4px',
                      borderRadius: '50%',
                      border: `1.5px solid ${t.avatarBorder}`,
                      opacity: 0.6,
                      pointerEvents: 'none',
                    }} />
                    {/* Avatar */}
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: t.avatarGradient,
                      border: `2px solid ${t.avatarBorder}44`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 8px 24px ${t.avatarBorder}22, inset 0 1px 0 rgba(255,255,255,0.06)`,
                      position: 'relative',
                      zIndex: 1,
                    }}>
                      <span style={{
                        fontFamily: 'IBM Plex Mono, monospace',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: t.avatarBorder,
                        letterSpacing: '0.04em',
                      }}>
                        {t.initials}
                      </span>
                    </div>
                  </div>

                  {/* Stars */}
                  <div style={{ display: 'flex', gap: '3px', paddingTop: '0.25rem' }}>
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <span key={i} className="t-star" style={{ display: 'flex' }}>
                        <FaStar size={13} color="#d4af37" style={{ filter: 'drop-shadow(0 0 4px rgba(212,175,55,0.5))' }} />
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quote body */}
                <div style={{ padding: '1.5rem 2rem', flex: 1 }}>
                  <FaQuoteLeft size={18} color={`${t.avatarBorder}40`} style={{ marginBottom: '0.75rem' }} />
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '0.875rem',
                    color: '#b8b4a8',
                    lineHeight: 1.75,
                    letterSpacing: '-0.01em',
                    fontStyle: 'italic',
                  }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* Footer — author + company */}
                <div style={{
                  padding: '1.25rem 2rem 1.75rem',
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}>
                  {/* Author info */}
                  <div>
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      color: '#f5f1e8',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.3,
                      marginBottom: '0.2rem',
                    }}>
                      {t.name}
                    </p>
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      fontSize: '0.75rem',
                      color: '#5a5755',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.3,
                    }}>
                      {t.role}
                    </p>
                  </div>

                  {/* Company badge */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '50px',
                    background: `${t.companyColor}10`,
                    border: `1px solid ${t.companyColor}28`,
                    flexShrink: 0,
                  }}>
                    <CompanyIcon size={12} color={t.companyColor} />
                    <span style={{
                      fontFamily: 'IBM Plex Mono, monospace',
                      fontSize: '0.58rem',
                      color: t.companyColor,
                      letterSpacing: '0.06em',
                      whiteSpace: 'nowrap',
                    }}>
                      {t.company}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .t-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .t-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 640px) {
          .t-card > div {
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
          }
        }
      `}} />
    </section>
  );
};

export default Testimonials;
