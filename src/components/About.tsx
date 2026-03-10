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

      // Stagger the tech list items
      const techItems = contentRef.current?.querySelectorAll('li');
      if (techItems && techItems.length > 0) {
        gsap.from(techItems, {
          opacity: 0,
          x: -20,
          duration: 0.5,
          stagger: 0.07,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 65%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const technologies = [
    'Node.js / Fastify',
    'Python / FastAPI',
    'MongoDB / PostgreSQL',
    'Docker / AWS',
    'HubSpot / GoHighLevel',
    'Zapier / Make / n8n',
    'React / Next.js',
    'REST APIs / Microservices',
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: '5rem 1.5rem',
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
          background: 'rgba(212, 175, 55, 0.06)',
          borderRadius: '50%',
          filter: 'blur(80px)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '5%',
          width: '22rem',
          height: '22rem',
          background: 'rgba(212, 175, 55, 0.04)',
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
          style={{
            color: '#f5f1e8',
            marginBottom: '4rem',
            display: 'flex',
            alignItems: 'center',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontFamily: 'Crimson Pro, serif',
            fontWeight: 700,
          }}
        >
          <span style={{
            fontFamily: 'IBM Plex Mono, monospace',
            color: '#d4af37',
            fontSize: '1.5rem',
            marginRight: '1rem',
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

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'center',
        }}>
          {/* Content */}
          <div ref={contentRef} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p style={{
              color: '#b8b4a8',
              lineHeight: 1.8,
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
            }}>
              Hello! I&apos;m <span style={{ color: '#d4af37', fontWeight: 600 }}>Hammad Ayub</span>,
              a results-driven backend engineer and CRM automation specialist based in
              Islamabad, Pakistan. With 2+ years of experience, I design and implement
              scalable web, IoT, and business process automation solutions.
            </p>

            <p style={{
              color: '#b8b4a8',
              lineHeight: 1.8,
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
            }}>
              Currently working as a <span style={{ color: '#d4af37', fontWeight: 600 }}>Design Engineer at CARE</span>{' '}
              (Center For Advanced Research In Engineering), building backend systems with
              Node.js, Fastify, Python, FastAPI, and MongoDB — deployed on AWS EC2 and Lambda
              for real-time IoT data pipelines.
            </p>

            <p style={{
              color: '#b8b4a8',
              lineHeight: 1.8,
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
            }}>
              Alongside, I work as a freelance <span style={{ color: '#d4af37', fontWeight: 600 }}>CRM & Automation Consultant</span>,
              building workflows on HubSpot, GoHighLevel, and Zoho One — integrating
              platforms using Zapier, Make, and n8n to streamline operations and drive growth.
            </p>

            <div>
              <p style={{
                color: '#b8b4a8',
                marginBottom: '1rem',
                fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
              }}>
                Here are a few technologies I&apos;ve been working with recently:
              </p>
              <ul style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.5rem',
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '0.875rem',
                listStyle: 'none',
                padding: 0,
              }}>
                {technologies.map((tech, index) => (
                  <li
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#b8b4a8',
                    }}
                  >
                    <span style={{ color: '#d4af37', marginRight: '0.5rem' }}>▹</span>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Profile Image */}
          <div ref={imageRef} style={{ position: 'relative' }}>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '28rem',
              margin: '0 auto',
            }}>
              {/* Image container */}
              <div style={{
                position: 'relative',
                zIndex: 10,
                borderRadius: '0',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(212, 175, 55, 0.2)',
                  mixBlendMode: 'multiply',
                  zIndex: 10,
                  transition: 'all 0.3s ease',
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(212, 175, 55, 0.2)';
                  }}
                ></div>
                <Image
                  src="/profile.jpg"
                  alt="Hammad Ayub"
                  width={448}
                  height={448}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>

              {/* Border decoration */}
              <div style={{
                position: 'absolute',
                top: '1.5rem',
                left: '1.5rem',
                width: '100%',
                height: '100%',
                border: '2px solid #d4af37',
                borderRadius: '0',
                zIndex: -1,
                transition: 'all 0.3s ease',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.top = '1rem';
                  e.currentTarget.style.left = '1rem';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.top = '1.5rem';
                  e.currentTarget.style.left = '1.5rem';
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 768px) {
          #about > div > div:last-child {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}} />
    </section>
  );
};

export default About;