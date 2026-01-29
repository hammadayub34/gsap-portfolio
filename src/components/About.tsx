'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsapConfig';
import Image from 'next/image';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      gsap.from(contentRef.current, {
        opacity: 0,
        x: -50,
        duration: 1,
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
        },
      });

      gsap.from(imageRef.current, {
        opacity: 0,
        x: 50,
        duration: 1,
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const technologies = [
    'JavaScript (ES6+)',
    'TypeScript',
    'React / Next.js',
    'Node.js',
    'Python',
    'PostgreSQL',
    'MongoDB',
    'AWS',
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 px-6 min-h-screen flex items-center"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Section Title */}
        <h2 ref={titleRef} className="text-textPrimary mb-16 flex items-center">
          <span className="font-mono text-accent text-2xl mr-4">01.</span>
          About Me
          <span className="ml-8 h-px bg-textSecondary/30 flex-1 max-w-xs"></span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div ref={contentRef} className="space-y-6">
            <p className="text-textSecondary leading-relaxed">
              Hello! I'm <span className="text-accent font-semibold">Your Name</span>, 
              a passionate developer who loves creating things that live on the internet. 
              My interest in web development started back in 2018 when I decided to try 
              building my first website — turns out hacking together custom layouts taught 
              me a lot about HTML & CSS!
            </p>

            <p className="text-textSecondary leading-relaxed">
              Fast-forward to today, and I've had the privilege of working at a startup, 
              a corporation, and a digital agency. My main focus these days is building 
              accessible, inclusive products and digital experiences for a variety of clients.
            </p>

            <p className="text-textSecondary leading-relaxed">
              I also recently launched a course that covers everything you need to know 
              to build a web app with the Spotify API.
            </p>

            <div>
              <p className="text-textSecondary mb-4">
                Here are a few technologies I've been working with recently:
              </p>
              <ul className="grid grid-cols-2 gap-2 font-mono text-sm">
                {technologies.map((tech, index) => (
                  <li
                    key={index}
                    className="flex items-center text-textSecondary before:content-['▹'] before:text-accent before:mr-2"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Profile Image */}
          <div ref={imageRef} className="relative group">
            <div className="relative w-full max-w-sm mx-auto">
              {/* Image container */}
              <div className="relative z-10 rounded overflow-hidden">
                <div className="absolute inset-0 bg-accent/20 mix-blend-multiply group-hover:bg-transparent transition-all duration-300 z-10"></div>
                <div className="relative aspect-square bg-secondary/50 flex items-center justify-center">
                  {/* Placeholder - Replace with actual image */}
                  <div className="text-accent text-6xl">👤</div>
                </div>
              </div>

              {/* Border decoration */}
              <div className="absolute top-6 left-6 w-full h-full border-2 border-accent rounded -z-10 group-hover:top-4 group-hover:left-4 transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
