'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsapConfig';
import { Skill } from '@/types';

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills: Skill[] = [
    { name: 'JavaScript/TypeScript', level: 95, category: 'frontend' },
    { name: 'React/Next.js', level: 90, category: 'frontend' },
    { name: 'HTML/CSS/Tailwind', level: 95, category: 'frontend' },
    { name: 'Node.js/Express', level: 85, category: 'backend' },
    { name: 'Python/Django', level: 80, category: 'backend' },
    { name: 'PostgreSQL/MongoDB', level: 85, category: 'backend' },
    { name: 'Git/GitHub', level: 90, category: 'tools' },
    { name: 'Docker/AWS', level: 75, category: 'tools' },
  ];

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

      // Animate each skill bar
      const skillBars = skillsRef.current?.querySelectorAll('.skill-bar');
      skillBars?.forEach((bar, index) => {
        gsap.from(bar, {
          width: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 85%',
          },
          delay: index * 0.1,
        });
      });

      // Animate skill items
      const skillItems = skillsRef.current?.querySelectorAll('.skill-item');
      gsap.from(skillItems, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const categories = {
    frontend: skills.filter((s) => s.category === 'frontend'),
    backend: skills.filter((s) => s.category === 'backend'),
    tools: skills.filter((s) => s.category === 'tools'),
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 px-6 min-h-screen flex items-center"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Section Title */}
        <h2 ref={titleRef} className="text-textPrimary mb-16 flex items-center">
          <span className="font-mono text-accent text-2xl mr-4">02.</span>
          Skills & Expertise
          <span className="ml-8 h-px bg-textSecondary/30 flex-1 max-w-xs"></span>
        </h2>

        <div ref={skillsRef} className="grid md:grid-cols-2 gap-12">
          {/* Frontend Skills */}
          <div className="space-y-6">
            <h3 className="text-2xl font-display text-textPrimary mb-6 flex items-center">
              <span className="w-12 h-12 rounded bg-accent/10 flex items-center justify-center mr-4 text-accent">
                💻
              </span>
              Frontend Development
            </h3>
            {categories.frontend.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="flex justify-between mb-2">
                  <span className="text-textPrimary font-mono text-sm">
                    {skill.name}
                  </span>
                  <span className="text-accent font-mono text-sm">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="skill-bar h-full bg-gradient-to-r from-accent to-accent/70 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Backend Skills */}
          <div className="space-y-6">
            <h3 className="text-2xl font-display text-textPrimary mb-6 flex items-center">
              <span className="w-12 h-12 rounded bg-accent/10 flex items-center justify-center mr-4 text-accent">
                ⚙️
              </span>
              Backend Development
            </h3>
            {categories.backend.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="flex justify-between mb-2">
                  <span className="text-textPrimary font-mono text-sm">
                    {skill.name}
                  </span>
                  <span className="text-accent font-mono text-sm">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="skill-bar h-full bg-gradient-to-r from-accent to-accent/70 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Tools & Others - Full Width */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-2xl font-display text-textPrimary mb-6 flex items-center">
              <span className="w-12 h-12 rounded bg-accent/10 flex items-center justify-center mr-4 text-accent">
                🛠️
              </span>
              Tools & Technologies
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {categories.tools.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="flex justify-between mb-2">
                    <span className="text-textPrimary font-mono text-sm">
                      {skill.name}
                    </span>
                    <span className="text-accent font-mono text-sm">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="skill-bar h-full bg-gradient-to-r from-accent to-accent/70 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 p-8 bg-secondary/30 rounded-lg border border-accent/20">
          <p className="text-textSecondary text-center leading-relaxed">
            I'm constantly learning and expanding my skill set. Currently exploring{' '}
            <span className="text-accent font-semibold">Web3</span>,{' '}
            <span className="text-accent font-semibold">Machine Learning</span>, and{' '}
            <span className="text-accent font-semibold">Cloud Architecture</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
