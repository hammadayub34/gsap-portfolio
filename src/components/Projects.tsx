'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Project } from '@/types';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    }
  }, []);

  const projects: Project[] = [
    {
      id: 1,
      title: 'FacadeAI',
      description:
        'IoT-based system for monitoring building lifespan with real-time data analytics. Designed and implemented the data schema for IoT tracking, built a RESTful backend with Node.js and Fastify, and integrated MongoDB for real-time monitoring and actionable insights.',
      image: '/facadeai.jpg',
      technologies: ['Node.js', 'Fastify', 'MongoDB', 'REST APIs', 'IoT', 'AWS'],
      github: 'https://github.com/hammadayub34',
      featured: true,
    },
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
      featured: true,
    },
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        padding: '5rem 1.5rem',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorative elements */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '15%',
          width: '30rem',
          height: '30rem',
          background: 'rgba(212, 175, 55, 0.05)',
          borderRadius: '50%',
          filter: 'blur(80px)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '10%',
          width: '24rem',
          height: '24rem',
          background: 'rgba(212, 175, 55, 0.04)',
          borderRadius: '50%',
          filter: 'blur(80px)',
        }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="bg-grid-pattern" style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity: 0.15,
      }} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 2, maxWidth: '1200px' }}>
        {/* Section Title */}
        <h2 
          ref={titleRef} 
          style={{
            color: '#f5f1e8',
            marginBottom: '4rem',
            display: 'flex',
            alignItems: 'center',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontFamily: 'Crimson Pro, serif',
            fontWeight: 700,
          }}
        >
          <span style={{
            fontFamily: 'IBM Plex Mono, monospace',
            color: '#d4af37',
            fontSize: '1.5rem',
            marginRight: '1rem',
          }}>
            03.
          </span>
          Featured Projects
          <span style={{
            marginLeft: '2rem',
            height: '1px',
            background: 'rgba(184, 180, 168, 0.3)',
            flex: 1,
            maxWidth: '20rem',
          }}></span>
        </h2>

        {/* Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem',
        }}
          className="projects-grid"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View More */}
        <div style={{
          marginTop: '4rem',
          textAlign: 'center',
        }}>
          <Link
            href="/projects"
            className="btn btn-outline"
            style={{
              display: 'inline-block',
              padding: '1rem 2rem',
            }}
          >
            View All Projects
          </Link>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 768px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (min-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}} />
    </section>
  );
};

export default Projects;