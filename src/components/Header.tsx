'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { HiMoon, HiSun } from 'react-icons/hi';

const Header = () => {
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Apply theme class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
    }
  }, [isDarkMode]);

  // Scroll detection and progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollTop / docHeight) * 100;
      
      setIsScrolled(scrollTop > 50);
      setScrollProgress(scrollPercentage);

      // Detect active section
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initial animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header slide down
      gsap.from(headerRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Logo animation
      gsap.from(logoRef.current, {
        scale: 0,
        rotation: -180,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)',
        delay: 0.3,
      });

      // Nav items stagger
      const navItems = headerRef.current?.querySelectorAll('.nav-item');
      if (navItems) {
        gsap.from(navItems, {
          y: -20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.5,
        });
      }
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // Logo hover animation
  const handleLogoHover = () => {
    gsap.to(logoRef.current, {
      rotation: 360,
      duration: 0.6,
      ease: 'power2.inOut',
    });
  };

  // Menu toggle with animation
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    if (!isMenuOpen) {
      // Opening animation
      gsap.fromTo(
        '.mobile-menu',
        { x: '100%' },
        { x: 0, duration: 0.4, ease: 'power3.out' }
      );
      
      gsap.fromTo(
        '.mobile-nav-item',
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, stagger: 0.1, delay: 0.2 }
      );
    }
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
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
          transition: 'all 0.5s ease',
          background: isScrolled ? 'rgba(13, 13, 13, 0.95)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          boxShadow: isScrolled ? '0 10px 30px rgba(212, 175, 55, 0.05)' : 'none',
        }}
      >
        {/* Scroll progress bar */}
        <div
          ref={progressRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '4px',
            background: 'linear-gradient(to right, #d4af37, rgba(212, 175, 55, 0.8), #d4af37)',
            transition: 'width 0.2s ease',
            width: `${scrollProgress}%`,
          }}
        />

        <nav className="container-custom" style={{ padding: '1rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Logo with enhanced design */}
            <Link
              ref={logoRef}
              href="/"
              style={{
                position: 'relative',
                display: 'block',
              }}
              onMouseEnter={handleLogoHover}
            >
              <div style={{ position: 'relative' }}>
                {/* Hexagon background */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="50" height="50" viewBox="0 0 50 50" style={{ color: '#d4af37' }}>
                    <polygon
                      points="25,5 45,15 45,35 25,45 5,35 5,15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{ transition: 'all 0.3s ease' }}
                    />
                  </svg>
                </div>
                <span style={{
                  position: 'relative',
                  zIndex: 10,
                  fontSize: '1.5rem',
                  fontFamily: 'Crimson Pro, serif',
                  fontWeight: 700,
                  color: '#d4af37',
                  display: 'flex',
                  width: '50px',
                  height: '50px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  H
                </span>
              </div>
              
              {/* Tooltip */}
              <span className="logo-tooltip" style={{
                position: 'absolute',
                bottom: '-2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#1a1a1a',
                padding: '0.25rem 0.75rem',
                fontSize: '0.75rem',
                fontFamily: 'Archivo, sans-serif',
                color: '#b8b4a8',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                whiteSpace: 'nowrap',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                pointerEvents: 'none',
              }}>
                Portfolio
              </span>
            </Link>

            {/* Desktop Navigation */}
            <ul className="desktop-nav" style={{
              display: 'none',
              alignItems: 'center',
              gap: '2rem',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}>
              {navItems.map((item, index) => (
                <li key={item.name} className="nav-item">
                  <Link
                    href={item.href}
                    style={{
                      position: 'relative',
                      color: activeSection === item.name.toLowerCase() ? '#d4af37' : '#b8b4a8',
                      transition: 'color 0.3s ease',
                      textDecoration: 'none',
                      fontFamily: 'IBM Plex Mono, monospace',
                      fontSize: '0.875rem',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#d4af37';
                    }}
                    onMouseLeave={(e) => {
                      if (activeSection !== item.name.toLowerCase()) {
                        e.currentTarget.style.color = '#b8b4a8';
                      }
                    }}
                  >
                    <span style={{ color: '#d4af37', marginRight: '0.25rem', fontFamily: 'IBM Plex Mono, monospace' }}>
                      0{index + 1}.
                    </span>
                    <span style={{
                      position: 'relative',
                      fontFamily: 'Archivo, sans-serif',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}>
                      {item.name}
                      <span style={{
                        position: 'absolute',
                        bottom: '-0.25rem',
                        left: 0,
                        height: '1px',
                        background: '#d4af37',
                        transition: 'width 0.3s ease',
                        width: activeSection === item.name.toLowerCase() ? '100%' : '0',
                      }}></span>
                    </span>
                  </Link>
                </li>
              ))}
              
              {/* Theme toggle */}
              <li className="nav-item">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  suppressHydrationWarning
                  style={{
                    padding: '0.5rem',
                    borderRadius: '50%',
                    background: 'rgba(26, 26, 26, 0.5)',
                    color: '#d4af37',
                    transition: 'all 0.3s ease',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-label="Toggle theme"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(26, 26, 26, 0.5)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  {isDarkMode ? <HiSun size={20} /> : <HiMoon size={20} />}
                </button>
              </li>
            </ul>

            {/* Mobile Menu Button with animation */}
            <div className="mobile-controls" style={{
              display: 'none',
              alignItems: 'center',
              gap: '1rem',
            }}>
              {/* Mobile theme toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                suppressHydrationWarning
                style={{
                  padding: '0.5rem',
                  borderRadius: '50%',
                  background: 'rgba(26, 26, 26, 0.5)',
                  color: '#d4af37',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <HiSun size={20} /> : <HiMoon size={20} />}
              </button>

              <button
                style={{
                  position: 'relative',
                  zIndex: 50,
                  color: '#d4af37',
                  fontSize: '1.875rem',
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  transition: 'all 0.3s ease',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onClick={toggleMenu}
                suppressHydrationWarning
                aria-label="Toggle menu"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '1.5rem',
                  height: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <span style={{
                    position: 'absolute',
                    display: 'block',
                    width: '1.5rem',
                    height: '2px',
                    background: '#d4af37',
                    transition: 'all 0.3s ease',
                    transform: isMenuOpen ? 'rotate(45deg)' : 'translateY(-0.5rem)',
                  }}></span>
                  <span style={{
                    position: 'absolute',
                    display: 'block',
                    width: '1.5rem',
                    height: '2px',
                    background: '#d4af37',
                    transition: 'all 0.3s ease',
                    opacity: isMenuOpen ? 0 : 1,
                  }}></span>
                  <span style={{
                    position: 'absolute',
                    display: 'block',
                    width: '1.5rem',
                    height: '2px',
                    background: '#d4af37',
                    transition: 'all 0.3s ease',
                    transform: isMenuOpen ? 'rotate(-45deg)' : 'translateY(0.5rem)',
                  }}></span>
                </div>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu with enhanced design */}
      <div
        className="mobile-menu"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(26, 26, 26, 0.98)',
          backdropFilter: 'blur(16px)',
          zIndex: 40,
          transition: 'transform 0.3s ease',
          transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          display: 'none',
        }}
      >
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          pointerEvents: 'none',
        }}>
          <div style={{
            position: 'absolute',
            top: '25%',
            right: '25%',
            width: '24rem',
            height: '24rem',
            background: 'rgba(212, 175, 55, 0.05)',
            borderRadius: '50%',
            filter: 'blur(80px)',
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '25%',
            left: '25%',
            width: '24rem',
            height: '24rem',
            background: 'rgba(212, 175, 55, 0.05)',
            borderRadius: '50%',
            filter: 'blur(80px)',
          }}></div>
        </div>

        <div style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Navigation items */}
          <ul style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            padding: '0 2rem',
            listStyle: 'none',
            margin: 0,
          }}>
            {navItems.map((item, index) => (
              <li key={item.name} className="mobile-nav-item" style={{ width: '100%' }}>
                <Link
                  href={item.href}
                  onClick={toggleMenu}
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    fontSize: '1.5rem',
                    color: activeSection === item.name.toLowerCase() ? '#d4af37' : '#b8b4a8',
                    transition: 'all 0.3s ease',
                    fontFamily: 'Archivo, sans-serif',
                    padding: '1rem 1.5rem',
                    textDecoration: 'none',
                    background: activeSection === item.name.toLowerCase() ? 'rgba(212, 175, 55, 0.05)' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#d4af37';
                    e.currentTarget.style.background = 'rgba(212, 175, 55, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== item.name.toLowerCase()) {
                      e.currentTarget.style.color = '#b8b4a8';
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <span style={{ color: '#d4af37', marginRight: '0.5rem' }}>0{index + 1}.</span>
                  {item.name}
                </Link>
              </li>
            ))}
            
          </ul>

          {/* Footer info */}
          <div className="mobile-nav-item" style={{
            paddingBottom: '2rem',
            padding: '0 2rem 2rem',
            textAlign: 'center',
          }}>
            <p style={{
              color: '#b8b4a8',
              fontSize: '0.875rem',
              fontFamily: 'Archivo, sans-serif',
              letterSpacing: '0.1em',
            }}>
              Built with Next.js & Tailwind CSS
            </p>
          </div>
        </div>

        {/* Grid pattern overlay */}
        <div className="bg-grid-pattern" style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}></div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
        }

        @media (max-width: 767px) {
          .mobile-controls {
            display: flex !important;
          }
          .mobile-menu {
            display: block !important;
          }
        }

        a:hover .logo-tooltip {
          opacity: 1 !important;
        }

        .nav-item a span:last-child::after {
          content: '';
          position: absolute;
          bottom: -0.25rem;
          left: 0;
          width: 0;
          height: 1px;
          background: #d4af37;
          transition: width 0.3s ease;
        }

        .nav-item a:hover span:last-child::after {
          width: 100%;
        }

        svg:hover polygon {
          fill: rgba(212, 175, 55, 0.1);
        }
      `}} />
    </>
  );
};

export default Header;