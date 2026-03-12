'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { HiSun, HiMoon } from 'react-icons/hi';

const Header = () => {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
    }
  }, [isDarkMode]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setIsScrolled(scrollTop > 50);
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);

      const sections = ['home', 'about', 'skills', 'projects', 'blogs', 'testimonials', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pre-set initial states to prevent post-paint opacity flash
      gsap.set(headerRef.current, { y: -80, opacity: 0 });
      gsap.set(logoRef.current, { scale: 0.6, opacity: 0 });

      gsap.to(headerRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.to(logoRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 0.25,
      });

      const navItems = headerRef.current?.querySelectorAll('.nav-item');
      if (navItems && navItems.length > 0) {
        gsap.set(navItems, { y: -16, opacity: 0 });
        gsap.to(navItems, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          delay: 0.4,
        });
      }
    }, headerRef);

    return () => ctx.revert();
  }, []);

  const openMenu = () => {
    setIsMenuOpen(true);
    setTimeout(() => {
      gsap.fromTo(
        '.mobile-nav-item',
        { x: 24, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.32, stagger: 0.07, ease: 'power2.out' }
      );
    }, 60);
  };

  const closeMenu = () => {
    gsap.to('.mobile-menu-panel', {
      x: '100%',
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => setIsMenuOpen(false),
    });
  };

  const toggleMenu = () => {
    if (isMenuOpen) closeMenu();
    else openMenu();
  };

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blogs', href: '#blogs' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        ref={headerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'background 0.45s ease, border-color 0.45s ease, box-shadow 0.45s ease',
          background: isScrolled ? 'rgba(8, 8, 8, 0.88)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(24px)' : 'none',
          borderBottom: isScrolled
            ? '1px solid rgba(255,255,255,0.06)'
            : '1px solid transparent',
          boxShadow: isScrolled ? '0 8px 32px rgba(0,0,0,0.3)' : 'none',
        }}
      >
        {/* Scroll progress bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '2px',
            background: 'linear-gradient(90deg, #b8941f, #d4af37, #e0bc45)',
            width: `${scrollProgress}%`,
            transition: 'width 0.15s linear',
            zIndex: 2,
          }}
        />

        <nav className="container-custom" style={{ padding: '0.9rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

            {/* Logo */}
            <Link
              ref={logoRef}
              href="#home"
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
              onMouseEnter={(e) => {
                const box = e.currentTarget.querySelector('.logo-box') as HTMLElement;
                if (box) {
                  box.style.borderColor = 'rgba(212,175,55,0.7)';
                  box.style.background = 'rgba(212,175,55,0.14)';
                  box.style.transform = 'rotate(-6deg) scale(1.08)';
                  box.style.boxShadow = '0 0 20px rgba(212,175,55,0.22), inset 0 1px 0 rgba(255,255,255,0.1)';
                }
                const text = e.currentTarget.querySelector('.logo-text') as HTMLElement;
                if (text) text.style.backgroundPosition = '100% center';
              }}
              onMouseLeave={(e) => {
                const box = e.currentTarget.querySelector('.logo-box') as HTMLElement;
                if (box) {
                  box.style.borderColor = 'rgba(212,175,55,0.28)';
                  box.style.background = 'rgba(212,175,55,0.06)';
                  box.style.transform = 'rotate(0deg) scale(1)';
                  box.style.boxShadow = 'none';
                }
                const text = e.currentTarget.querySelector('.logo-text') as HTMLElement;
                if (text) text.style.backgroundPosition = '0% center';
              }}
            >
              <div
                className="logo-box"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'rgba(212,175,55,0.06)',
                  border: '1px solid rgba(212,175,55,0.28)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Inner shimmer sweep */}
                <div className="logo-shimmer" style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.07) 50%, transparent 65%)',
                  backgroundSize: '200% 100%',
                  animation: 'logo-shine 3s ease-in-out infinite',
                  pointerEvents: 'none',
                }} />
                <span
                  className="logo-text"
                  style={{
                    fontFamily: 'Crimson Pro, serif',
                    fontWeight: 700,
                    fontSize: '1.15rem',
                    lineHeight: 1,
                    letterSpacing: '-0.01em',
                    background: 'linear-gradient(135deg, #b8941f 0%, #d4af37 40%, #f5e17a 60%, #d4af37 80%, #b8941f 100%)',
                    backgroundSize: '200% auto',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundPosition: '0% center',
                    transition: 'background-position 0.6s ease',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  HA
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <ul
              className="desktop-nav"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '0.2rem',
                listStyle: 'none',
                margin: 0,
                padding: 0,
              }}
            >
              {navItems.map((item, index) => {
                const isActive = activeSection === item.name.toLowerCase();
                return (
                  <li key={item.name} className="nav-item">
                    <Link
                      href={item.href}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.28rem',
                        padding: '0.42rem 0.9rem',
                        borderRadius: '50px',
                        background: isActive ? 'rgba(212,175,55,0.09)' : 'transparent',
                        border: `1px solid ${isActive ? 'rgba(212,175,55,0.22)' : 'transparent'}`,
                        color: isActive ? '#d4af37' : '#7a7875',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        letterSpacing: '-0.01em',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = '#d4af37';
                          e.currentTarget.style.background = 'rgba(212,175,55,0.06)';
                          e.currentTarget.style.borderColor = 'rgba(212,175,55,0.15)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = '#7a7875';
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.borderColor = 'transparent';
                        }
                      }}
                    >
                      <span style={{
                        fontFamily: 'IBM Plex Mono, monospace',
                        fontSize: '0.6rem',
                        color: '#d4af37',
                        opacity: isActive ? 1 : 0.5,
                        minWidth: '1.2rem',
                      }}>
                        0{index + 1}.
                      </span>
                      {item.name}
                    </Link>
                  </li>
                );
              })}

              {/* Theme toggle */}
              <li className="nav-item">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  suppressHydrationWarning
                  aria-label="Toggle theme"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#d4af37',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(212,175,55,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)';
                    e.currentTarget.style.transform = 'scale(1.1) rotate(15deg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                  }}
                >
                  {isDarkMode ? <HiSun size={16} /> : <HiMoon size={16} />}
                </button>
              </li>

              {/* Hire Me CTA */}
              <li className="nav-item" style={{ marginLeft: '0.5rem' }}>
                <Link
                  href="#contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.45rem 1.3rem',
                    borderRadius: '50px',
                    background: 'rgba(212,175,55,0.07)',
                    border: '1.5px solid rgba(212,175,55,0.32)',
                    color: '#d4af37',
                    textDecoration: 'none',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    letterSpacing: '-0.01em',
                    transition: 'all 0.35s ease',
                    backdropFilter: 'blur(8px)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(212,175,55,0.15)';
                    e.currentTarget.style.borderColor = 'rgba(212,175,55,0.65)';
                    e.currentTarget.style.boxShadow = '0 0 22px rgba(212,175,55,0.22)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(212,175,55,0.07)';
                    e.currentTarget.style.borderColor = 'rgba(212,175,55,0.32)';
                    e.currentTarget.style.boxShadow = '';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Hire Me
                </Link>
              </li>
            </ul>

            {/* Mobile hamburger */}
            <button
              className="mobile-toggle"
              onClick={toggleMenu}
              suppressHydrationWarning
              aria-label="Toggle menu"
              style={{
                display: 'none',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '5px',
                padding: '0.5rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                zIndex: 55,
              }}
            >
              <span style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                background: '#d4af37',
                transition: 'all 0.3s ease',
                transform: isMenuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
              }} />
              <span style={{
                display: 'block',
                width: '16px',
                height: '1.5px',
                background: '#d4af37',
                transition: 'all 0.3s ease',
                opacity: isMenuOpen ? 0 : 1,
                marginLeft: 'auto',
              }} />
              <span style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                background: '#d4af37',
                transition: 'all 0.3s ease',
                transform: isMenuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
              }} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile backdrop */}
      {isMenuOpen && (
        <div
          onClick={closeMenu}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
            zIndex: 48,
          }}
        />
      )}

      {/* Mobile slide panel */}
      {isMenuOpen && (
        <div
          className="mobile-menu-panel"
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: 'min(78vw, 300px)',
            height: '100vh',
            background: 'rgba(10,10,10,0.97)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            borderLeft: '1px solid rgba(255,255,255,0.07)',
            zIndex: 49,
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '5.5rem',
            overflow: 'hidden',
          }}
        >
          {/* Top shimmer */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '10%',
            right: '10%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)',
          }} />
          {/* Side shimmer */}
          <div style={{
            position: 'absolute',
            top: '15%',
            bottom: '15%',
            left: 0,
            width: '1px',
            background: 'linear-gradient(180deg, transparent, rgba(212,175,55,0.15), transparent)',
          }} />

          <ul style={{
            listStyle: 'none',
            margin: 0,
            padding: '1.5rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
          }}>
            {navItems.map((item, index) => {
              const isActive = activeSection === item.name.toLowerCase();
              return (
                <li key={item.name} className="mobile-nav-item">
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      padding: '0.875rem 1rem',
                      borderRadius: '12px',
                      background: isActive ? 'rgba(212,175,55,0.07)' : 'transparent',
                      border: `1px solid ${isActive ? 'rgba(212,175,55,0.2)' : 'transparent'}`,
                      color: isActive ? '#d4af37' : '#b8b4a8',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      letterSpacing: '-0.01em',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'rgba(212,175,55,0.05)';
                        e.currentTarget.style.color = '#d4af37';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#b8b4a8';
                      }
                    }}
                  >
                    <span style={{
                      fontFamily: 'IBM Plex Mono, monospace',
                      fontSize: '0.65rem',
                      color: '#d4af37',
                      opacity: 0.55,
                      minWidth: '1.5rem',
                    }}>
                      0{index + 1}.
                    </span>
                    {item.name}
                  </Link>
                </li>
              );
            })}

            <li className="mobile-nav-item" style={{ marginTop: '1rem' }}>
              <Link
                href="#contact"
                onClick={closeMenu}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.875rem',
                  borderRadius: '12px',
                  background: 'rgba(212,175,55,0.07)',
                  border: '1.5px solid rgba(212,175,55,0.28)',
                  color: '#d4af37',
                  textDecoration: 'none',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                }}
              >
                Hire Me
              </Link>
            </li>

            {/* Mobile theme toggle */}
            <li className="mobile-nav-item" style={{ marginTop: '0.35rem' }}>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                suppressHydrationWarning
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: '#6a6760',
                  cursor: 'pointer',
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  transition: 'all 0.3s ease',
                }}
              >
                {isDarkMode ? <HiSun size={15} color="#d4af37" /> : <HiMoon size={15} color="#d4af37" />}
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </li>
          </ul>

          <div className="mobile-nav-item" style={{ marginTop: 'auto', padding: '1.5rem 1.5rem 2.5rem' }}>
            <p style={{
              color: '#2e2d2b',
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '0.68rem',
              letterSpacing: '0.1em',
            }}>
              hammadayub34@gmail.com
            </p>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
        }
        @media (max-width: 767px) {
          .mobile-toggle { display: flex !important; }
        }
        @keyframes logo-shine {
          0%   { background-position: -100% center; }
          60%  { background-position: 200% center; }
          100% { background-position: 200% center; }
        }
      `}} />
    </>
  );
};

export default Header;
