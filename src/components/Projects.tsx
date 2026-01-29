'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsapConfig';
import { Project } from '@/types';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
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
      title: 'E-Commerce Platform',
      description:
        'A full-stack e-commerce platform with payment integration, user authentication, and real-time inventory management. Built with modern best practices and optimized for performance.',
      image: '/images/project1.jpg',
      technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
      github: 'https://github.com/yourusername/ecommerce',
      demo: 'https://ecommerce-demo.vercel.app',
      featured: true,
    },
    {
      id: 2,
      title: 'AI Chat Application',
      description:
        'Real-time chat application powered by AI with features like smart replies, sentiment analysis, and multi-language support. WebSocket integration for instant messaging.',
      image: '/images/project2.jpg',
      technologies: ['React', 'Node.js', 'Socket.io', 'OpenAI API', 'MongoDB'],
      github: 'https://github.com/yourusername/ai-chat',
      demo: 'https://ai-chat-demo.com',
      featured: true,
    },
    {
      id: 3,
      title: 'Portfolio Dashboard',
      description:
        'Analytics dashboard for tracking portfolio performance with interactive charts, real-time data updates, and customizable widgets. Clean and intuitive interface.',
      image: '/images/project3.jpg',
      technologies: ['Vue.js', 'D3.js', 'Firebase', 'Chart.js', 'SCSS'],
      github: 'https://github.com/yourusername/dashboard',
      demo: 'https://portfolio-dashboard.com',
    },
    {
      id: 4,
      title: 'Task Management System',
      description:
        'Collaborative task management tool with kanban boards, time tracking, and team collaboration features. Drag-and-drop interface with real-time updates.',
      image: '/images/project4.jpg',
      technologies: ['React', 'Express', 'PostgreSQL', 'Redis', 'Docker'],
      github: 'https://github.com/yourusername/task-manager',
    },
    {
      id: 5,
      title: 'Weather Forecast App',
      description:
        'Beautiful weather application with 7-day forecasts, interactive maps, and location-based alerts. Responsive design with smooth animations.',
      image: '/images/project5.jpg',
      technologies: ['React Native', 'TypeScript', 'Weather API', 'Maps SDK'],
      github: 'https://github.com/yourusername/weather-app',
      demo: 'https://weather-forecast-demo.com',
    },
    {
      id: 6,
      title: 'Social Media Analytics',
      description:
        'Comprehensive analytics platform for social media accounts with insights, trends, and engagement metrics. Export reports in multiple formats.',
      image: '/images/project6.jpg',
      technologies: ['Python', 'Django', 'React', 'PostgreSQL', 'Celery'],
      github: 'https://github.com/yourusername/social-analytics',
    },
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 px-6 min-h-screen"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Section Title */}
        <h2 ref={titleRef} className="text-textPrimary mb-16 flex items-center">
          <span className="font-mono text-accent text-2xl mr-4">03.</span>
          Featured Projects
          <span className="ml-8 h-px bg-textSecondary/30 flex-1 max-w-xs"></span>
        </h2>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View More */}
        <div className="mt-16 text-center">
          <a
            href="/projects"
            className="inline-block px-8 py-4 bg-transparent border-2 border-accent text-accent rounded hover:bg-accent/10 transition-all duration-300 font-mono btn-primary"
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
