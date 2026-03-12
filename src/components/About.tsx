'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: 'power4.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      gsap.from(contentRef.current, {
        opacity: 0,
        x: -60,
        duration: 1.1,
        ease: 'power4.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
        },
      });

      gsap.from(imageRef.current, {
        opacity: 0,
        x: 60,
        duration: 1.1,
        ease: 'power4.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
        },
      });

      // Image float
      gsap.to(imageRef.current, {
        y: -12,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: '5rem 0',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorative elements */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute',
          top: '15%',
          right: '10%',
          width: '28rem',
          height: '28rem',
          background: 'rgba(212, 175, 55, 0.1)',
          borderRadius: '50%',
          filter: 'blur(80px)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '5%',
          width: '22rem',
          height: '22rem',
          background: 'rgba(212, 175, 55, 0.07)',
          borderRadius: '50%',
          filter: 'blur(80px)',
        }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="bg-grid-pattern" style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity: 0.15,
      }} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 2, maxWidth: '1200px' }}>
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="section-title-mb"
          style={{
            color: '#f5f1e8',
            marginBottom: '4rem',
            display: 'flex',
            alignItems: 'center',
            fontSize: 'clamp(1.4rem, 5vw, 2.5rem)',
            fontFamily: 'Crimson Pro, serif',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
            flexWrap: 'nowrap',
            overflow: 'hidden',
          }}
        >
          <span style={{
            fontFamily: 'IBM Plex Mono, monospace',
            color: '#d4af37',
            fontSize: '1.5rem',
            marginRight: '1rem',
            flexShrink: 0,
          }}>
            01.
          </span>
          About Me
          <span style={{
            marginLeft: '2rem',
            height: '1px',
            background: 'rgba(184, 180, 168, 0.3)',
            flex: '1',
            maxWidth: '20rem',
          }}></span>
        </h2>

        <div className="about-grid" style={{
          display: 'grid',
          gap: '3rem',
          alignItems: 'center',
        }}>
          {/* Content */}
          <div ref={contentRef} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              color: '#b8b4a8',
              lineHeight: 1.65,
              fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
              letterSpacing: '-0.01em',
            }}>
              Hello! I&apos;m <span style={{ color: '#d4af37', fontWeight: 500 }}>Hammad Ayub</span>,
              a results-driven backend engineer and CRM automation specialist based in
              Islamabad, Pakistan. With 2+ years of experience, I design and implement
              scalable web, IoT, and business process automation solutions.
            </p>

            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              color: '#b8b4a8',
              lineHeight: 1.65,
              fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
              letterSpacing: '-0.01em',
            }}>
              Currently working as a <span style={{ color: '#d4af37', fontWeight: 500 }}>Senior Design Engineer at CARE</span>{' '}
              (Center For Advanced Research In Engineering), building backend systems with
              Node.js, Fastify, Python, FastAPI, and MongoDB — deployed on AWS EC2 and Lambda
              for real-time IoT data pipelines.
            </p>

            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              color: '#b8b4a8',
              lineHeight: 1.65,
              fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
              letterSpacing: '-0.01em',
            }}>
              Alongside, I work as a freelance <span style={{ color: '#d4af37', fontWeight: 500 }}>CRM & Automation Consultant</span>,
              building workflows on HubSpot, GoHighLevel, and Zoho One — integrating
              platforms using Zapier, Make, and n8n to streamline operations and drive growth.
            </p>

          </div>

          {/* Profile Image */}
          <div ref={imageRef} className="about-image-outer" style={{ position: 'relative' }}>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '28rem',
              margin: '0 auto',
            }}>
              {/* Corner accent — top-left */}
              <div style={{ position: 'absolute', top: '-8px', left: '-8px', width: '26px', height: '26px', borderTop: '2px solid rgba(212,175,55,0.65)', borderLeft: '2px solid rgba(212,175,55,0.65)', borderRadius: '3px 0 0 0', zIndex: 12, pointerEvents: 'none' }} />
              {/* Corner accent — top-right */}
              <div style={{ position: 'absolute', top: '-8px', right: '-8px', width: '26px', height: '26px', borderTop: '2px solid rgba(212,175,55,0.65)', borderRight: '2px solid rgba(212,175,55,0.65)', borderRadius: '0 3px 0 0', zIndex: 12, pointerEvents: 'none' }} />
              {/* Corner accent — bottom-left */}
              <div style={{ position: 'absolute', bottom: '-8px', left: '-8px', width: '26px', height: '26px', borderBottom: '2px solid rgba(212,175,55,0.65)', borderLeft: '2px solid rgba(212,175,55,0.65)', borderRadius: '0 0 0 3px', zIndex: 12, pointerEvents: 'none' }} />
              {/* Corner accent — bottom-right */}
              <div style={{ position: 'absolute', bottom: '-8px', right: '-8px', width: '26px', height: '26px', borderBottom: '2px solid rgba(212,175,55,0.65)', borderRight: '2px solid rgba(212,175,55,0.65)', borderRadius: '0 0 3px 0', zIndex: 12, pointerEvents: 'none' }} />

              {/* Image container */}
              <div
                className="about-image-frame"
                style={{
                  position: 'relative',
                  zIndex: 10,
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1.5px solid rgba(212,175,55,0.2)',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.45), 0 0 40px rgba(212,175,55,0.07), inset 0 1px 0 rgba(255,255,255,0.05)',
                  transition: 'border-color 0.5s ease, box-shadow 0.5s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)';
                  e.currentTarget.style.boxShadow = '0 32px 70px rgba(0,0,0,0.5), 0 0 60px rgba(212,175,55,0.13), inset 0 1px 0 rgba(255,255,255,0.07)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)';
                  e.currentTarget.style.boxShadow = '0 24px 60px rgba(0,0,0,0.45), 0 0 40px rgba(212,175,55,0.07), inset 0 1px 0 rgba(255,255,255,0.05)';
                }}
              >
                {/* Gold gradient overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.07) 0%, transparent 55%)',
                  zIndex: 2,
                  pointerEvents: 'none',
                }} />
                {/* Top shimmer line */}
                <div style={{
                  position: 'absolute',
                  top: 0, left: '10%', right: '10%',
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)',
                  zIndex: 3,
                  pointerEvents: 'none',
                }} />
                <Image
                  src="/profile.jpg"
                  alt="Hammad Ayub"
                  width={448}
                  height={448}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .about-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 900px) {
          .about-grid {
            grid-template-columns: 3fr 2fr;
          }
        }
        @media (max-width: 767px) {
          .about-grid {
            gap: 2rem;
          }
          #about .about-image-outer {
            max-width: 20rem;
            margin: 0 auto;
          }
        }
      `}} />
    </section>
  );
};

export default About;