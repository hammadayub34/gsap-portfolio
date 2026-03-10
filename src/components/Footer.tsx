'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (footerRef.current) {
      gsap.from(footerRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        immediateRender: false,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });
    }
  }, []);

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: FaTwitter, href: 'https://twitter.com/yourusername', label: 'Twitter' },
    { icon: FaEnvelope, href: 'mailto:your.email@example.com', label: 'Email' },
  ];

  return (
    <footer 
      ref={footerRef} 
      style={{
        position: 'relative',
        padding: '3rem 1.5rem',
        marginTop: '5rem',
        borderTop: '1px solid rgba(212, 175, 55, 0.2)',
      }}
    >
      <div className="container-custom">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
        }}>
          {/* Social Links */}
          <div style={{
            display: 'flex',
            gap: '1.5rem',
          }}>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                style={{
                  color: '#b8b4a8',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#d4af37';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#b8b4a8';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <social.icon size={24} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div style={{ textAlign: 'center' }}>
            <p style={{
              color: '#b8b4a8',
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '0.875rem',
            }}>
              Designed & Built by <span style={{ color: '#d4af37' }}>Your Name</span>
            </p>
            <p style={{
              color: '#b8b4a8',
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '0.75rem',
              marginTop: '0.5rem',
            }}>
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* Tech Stack */}
          <div style={{ textAlign: 'center' }}>
            <p style={{
              color: '#b8b4a8',
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '0.75rem',
            }}>
              Built with Next.js, TypeScript, Tailwind CSS & GSAP
            </p>
          </div>
        </div>
      </div>

      {/* Decorative element */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '8rem',
        height: '4px',
        background: 'linear-gradient(to right, transparent, #d4af37, transparent)',
      }}></div>
    </footer>
  );
};

export default Footer;