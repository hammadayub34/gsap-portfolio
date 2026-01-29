'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsapConfig';
import { FaArrowDown, FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

// Using gold (#d4af37) color scheme from refined editorial aesthetic

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [particlePositions, setParticlePositions] = useState<Array<{ left: number; top: number }>>([]);
  const fullText = "I build things for the web.";

  // Generate particle positions on client side only to avoid hydration mismatch
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

      // Stagger fade-in for main content
      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
      })
        .from(
          subtitleRef.current,
          {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out',
          },
          '-=0.8'
        )
        .from(
          descRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.6'
        )
        .from(
          ctaRef.current?.children || [],
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.2)',
          },
          '-=0.4'
        )
        .from(
          socialRef.current?.children || [],
          {
            x: -30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
          },
          '-=0.5'
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

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient blobs */}
        <div className="gradient-blob-1 absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="gradient-blob-2 absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        
        {/* Additional ambient lights */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent"></div>
      </div>

      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {particlePositions.map((pos, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 bg-accent/30 rounded-full blur-sm"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
            }}
          />
        ))}
      </div>

      {/* Side social links */}
      <div
        ref={socialRef}
        className="fixed left-8 bottom-0 hidden lg:flex flex-col items-center space-y-6 z-10"
      >
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-textSecondary hover:text-accent hover:-translate-y-1 transition-all duration-300"
          aria-label="GitHub"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-textSecondary hover:text-accent hover:-translate-y-1 transition-all duration-300"
          aria-label="LinkedIn"
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-textSecondary hover:text-accent hover:-translate-y-1 transition-all duration-300"
          aria-label="Twitter"
        >
          <FaTwitter size={24} />
        </a>
        <a
          href="mailto:your.email@example.com"
          className="text-textSecondary hover:text-accent hover:-translate-y-1 transition-all duration-300"
          aria-label="Email"
        >
          <FaEnvelope size={24} />
        </a>
        <div className="w-px h-24 bg-textSecondary/50"></div>
      </div>

      {/* Side email */}
      <div className="fixed right-8 bottom-0 hidden lg:flex flex-col items-center space-y-6 z-10">
        <a
          href="mailto:your.email@example.com"
          className="text-textSecondary hover:text-accent transition-all duration-300 font-mono text-sm tracking-widest"
          style={{ writingMode: 'vertical-rl' }}
        >
          your.email@example.com
        </a>
        <div className="w-px h-24 bg-textSecondary/50"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center space-y-8">
          {/* Greeting with fade-in */}
          <div className="parallax-layer-1">
            <p className="font-mono text-accent text-lg md:text-xl animate-fade-in">
              Hi, my name is
            </p>
          </div>

          {/* Main Title with glowing effect */}
          <div className="parallax-layer-2">
            <h1
              ref={titleRef}
              className="font-display font-bold text-textPrimary text-5xl md:text-7xl lg:text-8xl relative"
            >
              <span className="relative inline-block">
                Your Name
                <span className="absolute -inset-1 bg-accent/20 blur-2xl -z-10"></span>
              </span>
            </h1>
          </div>

          {/* Subtitle with typewriter effect */}
          <div className="parallax-layer-1">
            <h2
              ref={subtitleRef}
              className="font-display font-semibold text-textSecondary text-3xl md:text-5xl lg:text-6xl min-h-[4rem] md:min-h-[5rem]"
            >
              {typedText}
              <span className={`inline-block w-1 h-8 md:h-12 bg-accent ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
            </h2>
          </div>

          {/* Description with enhanced styling */}
          <div className="parallax-layer-2">
            <p
              ref={descRef}
              className="max-w-2xl mx-auto text-textSecondary text-lg md:text-xl leading-relaxed"
            >
              I'm a <span className="text-accent font-semibold">full-stack developer</span> specializing in building exceptional
              digital experiences. Currently, I'm focused on building{' '}
              <span className="text-accent font-semibold">accessible, human-centered products</span> using modern technologies
              like React, Next.js, and Node.js.
            </p>
          </div>

          {/* CTA Buttons with enhanced hover effects */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <a
              href="/#projects"
              className="group relative px-8 py-4 bg-transparent border-2 border-accent text-accent overflow-hidden transition-all duration-300 font-body font-semibold hover:scale-105 uppercase tracking-wider text-sm"
            >
              <span className="absolute inset-0 bg-accent/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
              <span className="relative flex items-center gap-2">
                View My Work
                <span className="inline-block group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </span>
            </a>
            <a
              href="/#contact"
              className="group relative px-8 py-4 bg-accent text-primary overflow-hidden transition-all duration-300 font-body font-semibold shadow-gold hover:shadow-gold-lg hover:scale-105 uppercase tracking-wider text-sm"
            >
              <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              <span className="relative">Get In Touch</span>
            </a>
          </div>

          {/* Tech stack badges */}
          <div className="flex flex-wrap justify-center gap-3 pt-8">
            {['React', 'TypeScript', 'Next.js', 'Node.js', 'Tailwind'].map((tech, index) => (
              <span
                key={tech}
                className="px-4 py-2 bg-secondary/50 border border-accent/30 text-textSecondary rounded-none text-sm font-mono backdrop-blur-sm hover:bg-accent/10 hover:border-accent transition-all duration-300 cursor-default uppercase tracking-wider"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Scroll indicator with enhanced animation */}
          <button
            onClick={scrollToProjects}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 group cursor-pointer"
            aria-label="Scroll to projects"
          >
            <span className="text-textSecondary text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Scroll Down
            </span>
            <div className="animate-bounce">
              <FaArrowDown className="text-accent text-2xl group-hover:scale-110 transition-transform" />
            </div>
            <div className="w-px h-16 bg-gradient-to-b from-accent to-transparent"></div>
          </button>
        </div>
      </div>

      {/* Decorative grid with enhanced pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(100,255,218,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(100,255,218,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-accent/50"></div>
      <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-accent/50"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-accent/50"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-accent/50"></div>
    </section>
  );
};

export default Hero;