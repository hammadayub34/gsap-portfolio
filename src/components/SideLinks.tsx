'use client';

import { useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const SideLinks = () => {
  const socialRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroEl = document.getElementById('home');
    if (!heroEl) return;

    const socialEl = socialRef.current;
    const emailEl = emailRef.current;

    if (socialEl) socialEl.style.transition = 'opacity 0.3s ease';
    if (emailEl) emailEl.style.transition = 'opacity 0.3s ease';

    const handleScroll = () => {
      const heroBottom = heroEl.getBoundingClientRect().bottom;
      const opacity = heroBottom <= 0 ? '0' : '1';
      if (socialEl) socialEl.style.opacity = opacity;
      if (emailEl) emailEl.style.opacity = opacity;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { icon: FaGithub, href: 'https://github.com/hammadayub34', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/hammadayub34', label: 'LinkedIn' },
    { icon: FaTwitter, href: 'https://twitter.com/hammadayub34', label: 'Twitter' },
    { icon: FaEnvelope, href: 'mailto:hammadayub34@gmail.com', label: 'Email' },
  ];

  const linkStyle = {
    color: '#b8b4a8' as const,
    transition: 'all 0.3s ease',
  };

  return (
    <>
      {/* Left side — vertical social icons (all screen sizes) */}
      <div
        ref={socialRef}
        className="side-social-links"
        style={{
          position: 'fixed',
          left: '1rem',
          bottom: 0,
          display: 'flex',
          flexDirection: 'column' as const,
          alignItems: 'center',
          gap: '1.25rem',
          zIndex: 50,
        }}
      >
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            style={linkStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#d4af37';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#b8b4a8';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <link.icon size={18} />
          </a>
        ))}
        <div style={{ width: '1px', height: '5rem', background: 'rgba(184, 180, 168, 0.4)' }} />
      </div>

      {/* Right side — email (desktop only via CSS) */}
      <div
        ref={emailRef}
        className="side-email-link"
        style={{
          position: 'fixed',
          right: '2rem',
          bottom: 0,
          display: 'none',
          flexDirection: 'column' as const,
          alignItems: 'center',
          gap: '1.5rem',
          zIndex: 50,
        }}
      >
        <a
          href="mailto:hammadayub34@gmail.com"
          style={{
            color: '#b8b4a8',
            transition: 'color 0.3s ease',
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '0.8rem',
            letterSpacing: '0.1em',
            writingMode: 'vertical-rl' as const,
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#d4af37'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#b8b4a8'; }}
        >
          hammadayub34@gmail.com
        </a>
        <div style={{ width: '1px', height: '6rem', background: 'rgba(184, 180, 168, 0.4)' }} />
      </div>
    </>
  );
};

export default SideLinks;
