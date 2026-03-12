'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Project } from '@/types';
import { FaGithub, FaExternalLinkAlt, FaAws, FaBrain, FaCode } from 'react-icons/fa';
import {
  SiNodedotjs,
  SiMongodb,
  SiPython,
  SiFastapi,
  SiFlutter,
  SiDart,
  SiFirebase,
} from 'react-icons/si';
import { HiChip } from 'react-icons/hi';

interface ProjectCardProps {
  project: Project;
  index: number;
}

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

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (cardRef.current) {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.96,
        duration: 1,
        delay: index * 0.15,
        ease: 'power4.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 88%',
        },
      });
    }
  }, [index]);

  /* ── 3-D tilt ── */
  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const rotX = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    const rotY = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    gsap.to(el, {
      rotateX: rotX,
      rotateY: rotY,
      y: -8,
      transformPerspective: 900,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleTiltReset = () => {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.55,
      ease: 'power3.out',
      overwrite: 'auto',
    });
    el.style.borderColor = 'rgba(255,255,255,0.07)';
    el.style.boxShadow = '';
    /* reset image scale */
    const img = el.querySelector('.project-card-img') as HTMLElement;
    if (img) img.style.transform = 'scale(1)';
  };

  return (
    <div
      ref={cardRef}
      className="project-card-root"
      style={{
        position: 'relative',
        background: 'rgba(255,255,255,0.025)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '18px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
      }}
      onMouseMove={handleTilt}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(212,175,55,0.22)';
        e.currentTarget.style.boxShadow =
          '0 24px 64px rgba(0,0,0,0.65), 0 0 50px rgba(212,175,55,0.1), inset 0 1px 0 rgba(255,255,255,0.07)';
        const img = e.currentTarget.querySelector('.project-card-img') as HTMLElement;
        if (img) img.style.transform = 'scale(1.07)';
      }}
      onMouseLeave={() => handleTiltReset()}
    >
      {/* Top shimmer */}
      <div style={{
        position: 'absolute',
        top: 0, left: '10%', right: '10%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)',
        zIndex: 5,
        pointerEvents: 'none',
      }} />

      {/* Project Image */}
      <div style={{
        position: 'relative',
        height: '15rem',
        background: 'linear-gradient(135deg, rgba(30,25,10,0.85) 0%, rgba(10,8,3,0.95) 100%)',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        <Image
          src={project.image || '/placeholder.jpg'}
          alt={project.title}
          fill
          className="project-card-img"
          style={{ objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Dark overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.5) 100%)',
          transition: 'opacity 0.4s ease',
        }} />
        {/* Featured badge */}
        {project.featured && (
          <div style={{
            position: 'absolute',
            top: '0.875rem',
            left: '0.875rem',
            padding: '0.22rem 0.7rem',
            background: 'rgba(212,175,55,0.15)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(212,175,55,0.3)',
            borderRadius: '50px',
            color: '#d4af37',
            fontSize: '0.65rem',
            fontFamily: 'IBM Plex Mono, monospace',
            letterSpacing: '0.1em',
            zIndex: 2,
          }}>
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.875rem',
        flex: 1,
      }}>
        {/* Title */}
        <h3
          style={{
            fontSize: '1.25rem',
            fontFamily: 'Crimson Pro, serif',
            fontWeight: 700,
            color: '#f5f1e8',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#d4af37'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#f5f1e8'; }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          color: '#8a8780',
          lineHeight: 1.65,
          flex: 1,
          fontSize: '0.875rem',
          letterSpacing: '-0.01em',
        }}>
          {project.description}
        </p>

        {/* Tech Icons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          alignItems: 'center',
          paddingTop: '0.25rem',
        }}>
          {project.technologies.map((tech, i) => {
            const entry = techMap[tech];
            if (!entry) {
              return (
                <span key={i} style={{
                  fontSize: '0.65rem',
                  fontFamily: 'IBM Plex Mono, monospace',
                  color: '#5a5755',
                  border: '1px solid rgba(255,255,255,0.06)',
                  padding: '0.2rem 0.55rem',
                  borderRadius: '50px',
                }}>
                  {tech}
                </span>
              );
            }
            const IconComp = entry.icon;
            return (
              <div
                key={i}
                className="tech-icon-orb"
                title={entry.label}
                style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  background: `${entry.color}14`,
                  border: `1px solid ${entry.color}2e`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: entry.color,
                  transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                  cursor: 'default',
                  position: 'relative',
                  flexShrink: 0,
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
                <IconComp size={13} />
                {/* Tooltip */}
                <span className="tech-tooltip" style={{
                  position: 'absolute',
                  bottom: 'calc(100% + 6px)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(8,8,8,0.95)',
                  color: '#f5f1e8',
                  fontSize: '0.6rem',
                  fontFamily: 'IBM Plex Mono, monospace',
                  padding: '0.22rem 0.55rem',
                  borderRadius: '6px',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  border: '1px solid rgba(255,255,255,0.08)',
                  opacity: 0,
                  transition: 'opacity 0.2s ease',
                  zIndex: 20,
                }}>
                  {entry.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Links */}
        <div style={{
          display: 'flex',
          gap: '1.25rem',
          paddingTop: '0.875rem',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repository"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                color: '#6a6760',
                transition: 'color 0.3s ease, transform 0.3s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#d4af37';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#6a6760';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <FaGithub size={16} />
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.06em' }}>Code</span>
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Live demo"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                color: '#6a6760',
                transition: 'color 0.3s ease, transform 0.3s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#d4af37';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#6a6760';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <FaExternalLinkAlt size={14} />
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.06em' }}>Live</span>
            </a>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .tech-icon-orb:hover .tech-tooltip {
          opacity: 1 !important;
        }
      `}} />
    </div>
  );
};

export default ProjectCard;
