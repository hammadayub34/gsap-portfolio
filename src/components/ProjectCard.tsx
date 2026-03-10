'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Project } from '@/types';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (cardRef.current) {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 60,
        duration: 1,
        delay: index * 0.15,
        ease: 'power4.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
        },
      });
    }
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="card-hover"
      style={{
        position: 'relative',
        background: 'rgba(26, 26, 26, 0.5)',
        backdropFilter: 'blur(10px)',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        border: '1px solid rgba(212, 175, 55, 0.1)',
        transition: 'border-color 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.35)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.1)';
      }}
    >
      {/* Project Image */}
      <div style={{
        position: 'relative',
        height: '16rem',
        background: 'linear-gradient(to bottom right, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.05))',
        overflow: 'hidden',
      }}>
        <Image
          src={project.image || '/placeholder.jpg'}
          alt={project.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Overlay */}
        <div 
          className="project-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(13, 13, 13, 0.6)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(13, 13, 13, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(13, 13, 13, 0.6)';
          }}
        ></div>
      </div>

      {/* Content */}
      <div style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}>
        {/* Featured Badge */}
        {project.featured && (
          <span style={{
            display: 'inline-block',
            padding: '0.25rem 0.75rem',
            background: 'rgba(212, 175, 55, 0.1)',
            color: '#d4af37',
            fontSize: '0.75rem',
            fontFamily: 'IBM Plex Mono, monospace',
            borderRadius: '9999px',
            width: 'fit-content',
          }}>
            Featured Project
          </span>
        )}

        {/* Title */}
        <h3 
          className="project-title"
          style={{
            fontSize: '1.5rem',
            fontFamily: 'Crimson Pro, serif',
            color: '#f5f1e8',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#d4af37';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#f5f1e8';
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p style={{
          color: '#b8b4a8',
          lineHeight: 1.8,
        }}>
          {project.description}
        </p>

        {/* Technologies */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}>
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              style={{
                padding: '0.25rem 0.75rem',
                background: 'rgba(212, 175, 55, 0.05)',
                color: '#d4af37',
                fontSize: '0.75rem',
                fontFamily: 'IBM Plex Mono, monospace',
                borderRadius: '0',
                border: '1px solid rgba(212, 175, 55, 0.2)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          paddingTop: '1rem',
        }}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#b8b4a8',
                transition: 'color 0.3s ease',
                textDecoration: 'none',
              }}
              aria-label="GitHub repository"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#d4af37';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#b8b4a8';
              }}
            >
              <FaGithub size={20} />
              <span style={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '0.875rem',
              }}>
                Code
              </span>
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#b8b4a8',
                transition: 'color 0.3s ease',
                textDecoration: 'none',
              }}
              aria-label="Live demo"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#d4af37';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#b8b4a8';
              }}
            >
              <FaExternalLinkAlt size={18} />
              <span style={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '0.875rem',
              }}>
                Live Demo
              </span>
            </a>
          )}
        </div>
      </div>

      {/* Hover effect border */}
      <div 
        className="hover-border"
        style={{
          position: 'absolute',
          inset: 0,
          border: '2px solid transparent',
          borderRadius: '0.5rem',
          transition: 'all 0.3s ease',
          pointerEvents: 'none',
        }}
      ></div>
    </div>
  );
};

export default ProjectCard;