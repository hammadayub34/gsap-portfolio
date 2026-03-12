'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaAws, FaBrain, FaCode } from 'react-icons/fa';
import { SiNodedotjs, SiMongodb, SiPython, SiFastapi, SiFlutter, SiDart, SiFirebase } from 'react-icons/si';
import { HiChip } from 'react-icons/hi';
import ProjectCard from './ProjectCard';
import { Project } from '@/types';

type TechEntry = { icon: React.ElementType; color: string; label: string };
const techMap: Record<string, TechEntry> = {
  'Node.js':   { icon: SiNodedotjs, color: '#6cc24a', label: 'Node.js' },
  'Fastify':   { icon: FaCode,      color: '#d4af37', label: 'Fastify' },
  'MongoDB':   { icon: SiMongodb,   color: '#47a248', label: 'MongoDB' },
  'REST APIs': { icon: FaCode,      color: '#d4af37', label: 'REST APIs' },
  'IoT':       { icon: HiChip,      color: '#e0bc45', label: 'IoT' },
  'AWS':       { icon: FaAws,       color: '#ff9900', label: 'AWS' },
  'Python':    { icon: SiPython,    color: '#3776ab', label: 'Python' },
  'FastAPI':   { icon: SiFastapi,   color: '#05998b', label: 'FastAPI' },
  'AI/ML':     { icon: FaBrain,     color: '#a855f7', label: 'AI/ML' },
  'Flutter':   { icon: SiFlutter,   color: '#54c5f8', label: 'Flutter' },
  'Dart':      { icon: SiDart,      color: '#0175c2', label: 'Dart' },
  'Firebase':  { icon: SiFirebase,  color: '#f5820d', label: 'Firebase' },
};

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      gsap.from(featuredRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.1,
        ease: 'power4.out',
        immediateRender: false,
        scrollTrigger: { trigger: featuredRef.current, start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featured: Project = {
    id: 1,
    title: 'FacadeAI',
    description:
      'IoT-based system for monitoring building lifespan with real-time data analytics. Designed and implemented the data schema for IoT tracking, built a RESTful backend with Node.js and Fastify, and integrated MongoDB for real-time monitoring and actionable insights.',
    image: '/facadeai.jpg',
    technologies: ['Node.js', 'Fastify', 'MongoDB', 'REST APIs', 'IoT', 'AWS'],
    github: 'https://github.com/hammadayub34',
    featured: true,
  };

  const rest: Project[] = [
    {
      id: 2,
      title: 'Dental X-Ray Analysis',
      description:
        'AI-powered diagnostic support system for dental imaging. Developed a Python/FastAPI backend with MongoDB integration, connected AI models for accurate dental diagnostics, and built scalable API endpoints for AI inference and automated reporting.',
      image: '/dentalai.jpg',
      technologies: ['Python', 'FastAPI', 'MongoDB', 'AI/ML', 'REST APIs'],
      github: 'https://github.com/hammadayub34',
      featured: true,
    },
    {
      id: 3,
      title: 'Restaurant Management System',
      description:
        'Flutter-based mobile app for comprehensive restaurant operations management. Enables online ordering, table reservations, and menu browsing. Tracks supplies and inventory, manages staff and customer data, and generates analytical reports for sales and preferences.',
      image: '/restaurant.jpg',
      technologies: ['Flutter', 'Dart', 'Firebase', 'REST APIs'],
      github: 'https://github.com/hammadayub34',
      featured: false,
    },
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{ padding: '5rem 0', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background blobs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '10%', right: '15%',
          width: '30rem', height: '30rem',
          background: 'rgba(212, 175, 55, 0.09)', borderRadius: '50%', filter: 'blur(80px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', left: '10%',
          width: '24rem', height: '24rem',
          background: 'rgba(212, 175, 55, 0.07)', borderRadius: '50%', filter: 'blur(80px)',
        }} />
      </div>

      <div className="bg-grid-pattern" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.15 }} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 2, maxWidth: '1200px' }}>
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="section-title-mb"
          style={{
            color: '#f5f1e8',
            marginBottom: '4rem',
            display: 'flex',
            alignItems: 'center',
            fontSize: 'clamp(1.4rem, 5vw, 2.5rem)',
            fontFamily: 'Crimson Pro, serif',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
            flexWrap: 'nowrap',
            overflow: 'hidden',
          }}
        >
          <span style={{ fontFamily: 'IBM Plex Mono, monospace', color: '#d4af37', fontSize: '1.5rem', marginRight: '1rem', flexShrink: 0 }}>
            03.
          </span>
          Featured Projects
          <span style={{ marginLeft: '2rem', height: '1px', background: 'rgba(184, 180, 168, 0.3)', flex: 1, maxWidth: '20rem' }} />
        </h2>

        {/* Featured Hero Project */}
        <div
          ref={featuredRef}
          className="featured-project"
          style={{
            display: 'grid',
            background: 'rgba(255,255,255,0.025)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px',
            overflow: 'hidden',
            marginBottom: '2rem',
            transition: 'border-color 0.3s ease, box-shadow 0.4s ease',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.2)';
            e.currentTarget.style.boxShadow = '0 16px 60px rgba(0,0,0,0.6), 0 0 60px rgba(212,175,55,0.08), inset 0 1px 0 rgba(255,255,255,0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)';
          }}
        >
          {/* Image */}
          <div className="featured-image" style={{
            position: 'relative',
            minHeight: '20rem',
            background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.04))',
            overflow: 'hidden',
          }}>
            <Image
              src={featured.image || '/placeholder.jpg'}
              alt={featured.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 900px) 100vw, 45vw"
            />
            {/* Overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to right, rgba(13,13,13,0.1), rgba(13,13,13,0.55))',
            }} />
            {/* Featured badge */}
            <div style={{
              position: 'absolute', top: '1.25rem', left: '1.25rem',
              padding: '0.3rem 0.9rem',
              background: '#d4af37',
              color: '#0d0d0d',
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
            }}>
              FEATURED PROJECT
            </div>
          </div>

          {/* Content */}
          <div className="featured-content" style={{
            padding: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '1.25rem',
          }}>
            <h3 style={{
              fontFamily: 'Crimson Pro, serif',
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              fontWeight: 700,
              color: '#f5f1e8',
              lineHeight: 1.2,
            }}>
              {featured.title}
            </h3>

            <div className="project-desc-panel" style={{
              padding: '1.25rem',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '10px',
            }}>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                color: '#b8b4a8',
                lineHeight: 1.65,
                fontSize: '0.9rem',
                letterSpacing: '-0.01em',
              }}>
                {featured.description}
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center' }}>
              {featured.technologies.map((tech, i) => {
                const entry = techMap[tech];
                if (!entry) return (
                  <span key={i} style={{ fontSize: '0.65rem', fontFamily: 'IBM Plex Mono, monospace', color: '#5a5755', border: '1px solid rgba(255,255,255,0.06)', padding: '0.2rem 0.55rem', borderRadius: '50px' }}>{tech}</span>
                );
                const IconComp = entry.icon;
                return (
                  <div
                    key={i}
                    className="feat-tech-orb"
                    title={entry.label}
                    style={{
                      width: '2.25rem', height: '2.25rem', borderRadius: '50%',
                      background: `${entry.color}14`, border: `1px solid ${entry.color}2e`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: entry.color, position: 'relative', flexShrink: 0,
                      transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)', cursor: 'default',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${entry.color}28`;
                      e.currentTarget.style.borderColor = `${entry.color}66`;
                      e.currentTarget.style.transform = 'translateY(-3px) scale(1.18)';
                      e.currentTarget.style.boxShadow = `0 6px 18px ${entry.color}28`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `${entry.color}14`;
                      e.currentTarget.style.borderColor = `${entry.color}2e`;
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '';
                    }}
                  >
                    <IconComp size={14} />
                    <span style={{
                      position: 'absolute', bottom: 'calc(100% + 6px)', left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'rgba(8,8,8,0.95)', color: '#f5f1e8',
                      fontSize: '0.6rem', fontFamily: 'IBM Plex Mono, monospace',
                      padding: '0.22rem 0.55rem', borderRadius: '6px', whiteSpace: 'nowrap',
                      border: '1px solid rgba(255,255,255,0.08)', opacity: 0,
                      transition: 'opacity 0.2s ease', pointerEvents: 'none', zIndex: 20,
                    }} className="feat-tech-tooltip">
                      {entry.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <a
              href={featured.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.625rem',
                color: '#b8b4a8',
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '0.875rem',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                width: 'fit-content',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#d4af37'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#b8b4a8'; }}
            >
              <FaGithub size={18} />
              View on GitHub
            </a>
          </div>
        </div>

        {/* Remaining Projects Grid */}
        <div className="projects-grid" style={{ display: 'grid', gap: '2rem', alignItems: 'stretch' }}>
          {rest.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index + 1} />
          ))}
        </div>

        {/* View More */}
        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <a
            href="https://github.com/hammadayub34"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ display: 'inline-block', padding: '1rem 2rem' }}
          >
            View More on GitHub
          </a>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .featured-project {
          grid-template-columns: 1fr;
        }
        .projects-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 900px) {
          .featured-project {
            grid-template-columns: 45fr 55fr;
          }
          .featured-image {
            min-height: 26rem;
          }
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .featured-content {
            padding: 1.25rem !important;
          }
          .featured-content h3 {
            font-size: 1.5rem !important;
          }
          .projects-grid {
            gap: 1.25rem;
          }
        }
        .feat-tech-orb:hover .feat-tech-tooltip {
          opacity: 1 !important;
        }
      `}} />
    </section>
  );
};

export default Projects;
