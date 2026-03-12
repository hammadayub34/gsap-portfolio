'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaEnvelope, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/hammadayub34', label: 'GitHub' },
    { icon: FaEnvelope, href: 'mailto:hammadayub34@gmail.com', label: 'Email' },
  ];

  return (
    <footer
      ref={footerRef}
      style={{
        position: 'relative',
        padding: '2.5rem 0',
        background: 'transparent',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      {/* Grid pattern — matches other sections */}
      <div className="bg-grid-pattern" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.15 }} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 2, maxWidth: '1200px' }}>
        <div ref={contentRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>

          {/* Social Links */}
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                style={{
                  width: '2.75rem',
                  height: '2.75rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#8a8780',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(212, 175, 55, 0.15)';
                  e.currentTarget.style.color = '#d4af37';
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(212,175,55,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.color = '#8a8780';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <p style={{
              color: '#b8b4a8',
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
            }}>
              Designed & Built with <FaHeart style={{ color: '#d4af37', fontSize: '0.75rem' }} /> by{' '}
              <span style={{ color: '#d4af37' }}>Hammad Ayub</span>
            </p>
            <p style={{
              color: '#6a6760',
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '0.75rem',
            }}>
              © {new Date().getFullYear()} All rights reserved &nbsp;·&nbsp; Built with Next.js, TypeScript & GSAP
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
