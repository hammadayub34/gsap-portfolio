'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsapConfig';
import { HiMenu, HiX, HiMoon, HiSun } from 'react-icons/hi';
import { FaFilePdf } from 'react-icons/fa';

const Header = () => {
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);

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
    { name: 'Home', href: '/#home' },
    { name: 'About', href: '/#about' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-primary/95 backdrop-blur-md shadow-lg shadow-accent/5'
            : 'bg-transparent'
        }`}
      >
        {/* Scroll progress bar */}
        <div
          ref={progressRef}
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-accent via-accent/80 to-accent transition-all duration-200"
          style={{ width: `${scrollProgress}%` }}
        />

        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo with enhanced design */}
            <Link
              ref={logoRef}
              href="/"
              className="relative group"
              onMouseEnter={handleLogoHover}
            >
              <div className="relative">
                {/* Hexagon background - removed rounded */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="50" height="50" viewBox="0 0 50 50" className="text-accent">
                    <polygon
                      points="25,5 45,15 45,35 25,45 5,35 5,15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="group-hover:fill-accent/10 transition-all duration-300"
                    />
                  </svg>
                </div>
                <span className="relative z-10 text-2xl font-display font-bold text-accent block w-[50px] h-[50px] flex items-center justify-center">
                  P
                </span>
              </div>
              
              {/* Tooltip */}
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-secondary px-3 py-1 text-xs font-body text-textSecondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap uppercase tracking-wider">
                Portfolio
              </span>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <li key={item.name} className="nav-item">
                  <Link
                    href={item.href}
                    className={`relative text-textSecondary hover:text-accent transition-colors duration-300 font-mono text-sm group ${
                      activeSection === item.name.toLowerCase() ? 'text-accent' : ''
                    }`}
                  >
                    <span className="text-accent mr-1 font-mono">0{index + 1}.</span>
                    <span className="relative font-body uppercase tracking-wider">
                      {item.name}
                      <span className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
                        activeSection === item.name.toLowerCase() 
                          ? 'w-full' 
                          : 'w-0 group-hover:w-full'
                      }`}></span>
                    </span>
                  </Link>
                </li>
              ))}
              
              {/* Resume button with icon */}
              <li className="nav-item">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-6 py-2 border-2 border-accent text-accent hover:bg-accent/10 transition-all duration-300 font-body text-sm overflow-hidden flex items-center gap-2 uppercase tracking-wider font-semibold"
                >
                  <span className="absolute inset-0 bg-accent/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                  <FaFilePdf className="relative z-10" />
                  <span className="relative z-10">Resume</span>
                </a>
              </li>

              {/* Theme toggle */}
              <li className="nav-item">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-full bg-secondary/50 hover:bg-accent/10 text-accent transition-all duration-300 hover:scale-110"
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? <HiSun size={20} /> : <HiMoon size={20} />}
                </button>
              </li>
            </ul>

            {/* Mobile Menu Button with animation */}
            <div className="md:hidden flex items-center gap-4">
              {/* Mobile theme toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full bg-secondary/50 hover:bg-accent/10 text-accent transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <HiSun size={20} /> : <HiMoon size={20} />}
              </button>

              <button
                className="relative z-50 text-accent text-3xl p-2 rounded-lg hover:bg-accent/10 transition-all duration-300"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <span
                    className={`absolute block w-6 h-0.5 bg-accent transition-all duration-300 ${
                      isMenuOpen ? 'rotate-45' : '-translate-y-2'
                    }`}
                  ></span>
                  <span
                    className={`absolute block w-6 h-0.5 bg-accent transition-all duration-300 ${
                      isMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  ></span>
                  <span
                    className={`absolute block w-6 h-0.5 bg-accent transition-all duration-300 ${
                      isMenuOpen ? '-rotate-45' : 'translate-y-2'
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu with enhanced design */}
      <div
        className={`mobile-menu fixed inset-0 bg-secondary/98 backdrop-blur-lg md:hidden z-40 transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative h-full flex flex-col">
          {/* Navigation items */}
          <ul className="flex-1 flex flex-col items-center justify-center space-y-8 px-8">
            {navItems.map((item, index) => (
              <li key={item.name} className="mobile-nav-item w-full">
                <Link
                  href={item.href}
                  onClick={toggleMenu}
                  className={`block text-center text-2xl text-textSecondary hover:text-accent transition-all duration-300 font-body py-4 px-6 hover:bg-accent/5 ${
                    activeSection === item.name.toLowerCase() ? 'text-accent bg-accent/5' : ''
                  }`}
                >
                  <span className="text-accent mr-2">0{index + 1}.</span>
                  {item.name}
                </Link>
              </li>
            ))}
            
            {/* Mobile resume button */}
            <li className="mobile-nav-item pt-4">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3 border-2 border-accent text-accent hover:bg-accent/10 text-xl transition-all duration-300 font-body uppercase tracking-wider font-semibold"
              >
                <FaFilePdf />
                Resume
              </a>
            </li>
          </ul>

          {/* Footer info */}
          <div className="mobile-nav-item pb-8 px-8 text-center">
            <p className="text-textSecondary text-sm font-body tracking-wider">
              Built with Next.js & Tailwind CSS
            </p>
          </div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(100,255,218,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(100,255,218,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
      </div>
    </>
  );
};

export default Header;