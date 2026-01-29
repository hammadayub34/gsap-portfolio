'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsapConfig';
import { Project } from '@/types';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: index * 0.2,
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
      className="group relative bg-secondary/50 backdrop-blur-sm rounded-lg overflow-hidden border border-accent/10 hover:border-accent/30 transition-all duration-300 card-hover"
    >
      {/* Project Image */}
      <div className="relative h-64 bg-gradient-to-br from-accent/20 to-accent/5 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-accent text-6xl opacity-50">
          🖼️
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-primary/60 group-hover:bg-primary/40 transition-all duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Featured Badge */}
        {project.featured && (
          <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-mono rounded-full">
            Featured Project
          </span>
        )}

        {/* Title */}
        <h3 className="text-2xl font-display text-textPrimary group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-textSecondary leading-relaxed">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-accent/5 text-accent text-xs font-mono rounded border border-accent/20"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-textSecondary hover:text-accent transition-colors duration-300"
              aria-label="GitHub repository"
            >
              <FaGithub size={20} />
              <span className="font-mono text-sm">Code</span>
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-textSecondary hover:text-accent transition-colors duration-300"
              aria-label="Live demo"
            >
              <FaExternalLinkAlt size={18} />
              <span className="font-mono text-sm">Live Demo</span>
            </a>
          )}
        </div>
      </div>

      {/* Hover effect border */}
      <div className="absolute inset-0 border-2 border-accent/0 group-hover:border-accent/20 rounded-lg transition-all duration-300 pointer-events-none"></div>
    </div>
  );
};

export default ProjectCard;
