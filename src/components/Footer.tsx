'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsapConfig';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (footerRef.current) {
      gsap.from(footerRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
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
    <footer ref={footerRef} className="relative py-12 px-6 mt-20 border-t border-accent/20">
      <div className="container mx-auto">
        <div className="flex flex-col items-center space-y-6">
          {/* Social Links */}
          <div className="flex space-x-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-textSecondary hover:text-accent transition-all duration-300 hover:transform hover:scale-110"
              >
                <social.icon size={24} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-textSecondary font-mono text-sm">
              Designed & Built by <span className="text-accent">Your Name</span>
            </p>
            <p className="text-textSecondary font-mono text-xs mt-2">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* Tech Stack */}
          <div className="text-center">
            <p className="text-textSecondary font-mono text-xs">
              Built with Next.js, TypeScript, Tailwind CSS & GSAP
            </p>
          </div>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
    </footer>
  );
};

export default Footer;