'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillItemRefs = useRef<HTMLDivElement[]>([]);
  const skillBarRefs = useRef<HTMLDivElement[]>([]);

  const skillGroups = [
    {
      label: '01',
      title: 'Languages & Frameworks',
      description: 'Core languages and full-stack frameworks',
      accent: 'rgba(212, 175, 55, 0.12)',
      skills: [
        { name: 'JavaScript / TypeScript', level: 92 },
        { name: 'Python', level: 90 },
        { name: 'React / Next.js', level: 85 },
        { name: 'HTML / CSS', level: 88 },
      ],
    },
    {
      label: '02',
      title: 'Backend & Cloud',
      description: 'Server-side, databases and cloud infrastructure',
      accent: 'rgba(212, 175, 55, 0.09)',
      skills: [
        { name: 'Node.js / Fastify', level: 95 },
        { name: 'Python / FastAPI / Flask', level: 90 },
        { name: 'MongoDB / PostgreSQL', level: 88 },
        { name: 'Docker / AWS EC2 & Lambda', level: 85 },
      ],
    },
    {
      label: '03',
      title: 'CRM & Automation',
      description: 'Business automation, CRM platforms and workflow tools',
      accent: 'rgba(212, 175, 55, 0.07)',
      skills: [
        { name: 'HubSpot / GoHighLevel / Zoho', level: 92 },
        { name: 'Zapier / Make / n8n', level: 90 },
        { name: 'REST APIs / Microservices', level: 93 },
        { name: 'IoT Integration', level: 82 },
      ],
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (titleRef.current && sectionRef.current) {
        gsap.from(titleRef.current, {
          opacity: 0,
          y: 60,
          duration: 1.2,
          ease: 'power4.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        });
      }

      if (skillItemRefs.current.length > 0) {
        gsap.from(skillItemRefs.current, {
          opacity: 0,
          y: 40,
          duration: 0.7,
          stagger: 0.08,
          ease: 'back.out(1.4)',
          immediateRender: false,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        });
      }

      if (skillBarRefs.current.length > 0) {
        gsap.from(skillBarRefs.current, {
          width: 0,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.08,
          immediateRender: false,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setSkillItemRef = (el: HTMLDivElement | null) => {
    if (el && !skillItemRefs.current.includes(el)) skillItemRefs.current.push(el);
  };

  const setSkillBarRef = (el: HTMLDivElement | null) => {
    if (el && !skillBarRefs.current.includes(el)) skillBarRefs.current.push(el);
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        padding: '5rem 1.5rem',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorative elements */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '20%', left: '10%',
          width: '26rem', height: '26rem',
          background: 'rgba(212, 175, 55, 0.1)', borderRadius: '50%', filter: 'blur(80px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '20%', right: '8%',
          width: '20rem', height: '20rem',
          background: 'rgba(212, 175, 55, 0.07)', borderRadius: '50%', filter: 'blur(80px)',
        }} />
      </div>

      <div className="bg-grid-pattern" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.15 }} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 2, maxWidth: '1200px' }}>
        {/* Section Title */}
        <h2
          ref={titleRef}
          style={{
            color: '#f5f1e8',
            marginBottom: '4rem',
            display: 'flex',
            alignItems: 'center',
            fontSize: 'clamp(1.4rem, 5vw, 3rem)',
            fontFamily: 'Crimson Pro, serif',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            flexWrap: 'nowrap',
          }}
        >
          <span style={{ fontFamily: 'IBM Plex Mono, monospace', color: '#d4af37', fontSize: '1.5rem', marginRight: '1rem', flexShrink: 0 }}>
            03.
          </span>
          Skills & Expertise
          <span style={{ marginLeft: '2rem', height: '1px', background: 'rgba(184, 180, 168, 0.3)', flex: 1, maxWidth: '20rem' }} />
        </h2>

        {/* Skill group cards */}
        <div className="skills-grid" style={{ display: 'grid', gap: '2rem' }}>
          {skillGroups.map((group, groupIndex) => (
            <div
              key={groupIndex}
              style={{
                padding: '2rem',
                background: 'rgba(26, 26, 26, 0.6)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(212, 175, 55, 0.12)',
                borderTop: '2px solid #d4af37',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Card ambient glow */}
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: `radial-gradient(ellipse at top left, ${group.accent} 0%, transparent 60%)`,
              }} />

              {/* Group header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem', position: 'relative' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                    <span style={{
                      fontFamily: 'IBM Plex Mono, monospace',
                      color: '#d4af37',
                      fontSize: '0.8rem',
                      letterSpacing: '0.1em',
                    }}>
                      {group.label}
                    </span>
                    <div style={{ width: '2rem', height: '1px', background: 'rgba(212, 175, 55, 0.4)' }} />
                  </div>
                  <h3 style={{
                    fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                    fontFamily: 'Crimson Pro, serif',
                    color: '#f5f1e8',
                    fontWeight: 700,
                  }}>
                    {group.title}
                  </h3>
                  <p style={{
                    color: '#8a8780',
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '0.75rem',
                    marginTop: '0.25rem',
                  }}>
                    {group.description}
                  </p>
                </div>
                <span style={{
                  fontFamily: 'Crimson Pro, serif',
                  fontSize: '4rem',
                  fontWeight: 900,
                  color: 'rgba(212, 175, 55, 0.06)',
                  lineHeight: 1,
                  userSelect: 'none',
                }}>
                  {group.label}
                </span>
              </div>

              {/* Skills */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative' }}>
                {group.skills.map((skill, index) => (
                  <div key={index} className="skill-item" ref={setSkillItemRef}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{
                        color: '#e0dcd2',
                        fontFamily: 'IBM Plex Mono, monospace',
                        fontSize: '0.825rem',
                        letterSpacing: '0.02em',
                      }}>
                        {skill.name}
                      </span>
                      <span style={{
                        color: '#d4af37',
                        fontFamily: 'IBM Plex Mono, monospace',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                      }}>
                        {skill.level}%
                      </span>
                    </div>
                    <div style={{
                      height: '6px',
                      background: '#1e1e1e',
                      borderRadius: '9999px',
                      overflow: 'hidden',
                      border: '1px solid rgba(255,255,255,0.04)',
                    }}>
                      <div
                        className="skill-bar"
                        ref={setSkillBarRef}
                        style={{
                          height: '100%',
                          width: `${skill.level}%`,
                          background: 'linear-gradient(to right, #b8941f, #d4af37, #e8c968)',
                          borderRadius: '9999px',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Currently Learning banner */}
        <div style={{
          marginTop: '3rem',
          padding: '1.5rem 2rem',
          background: 'linear-gradient(to right, rgba(212, 175, 55, 0.08), rgba(212, 175, 55, 0.03))',
          border: '1px solid rgba(212, 175, 55, 0.2)',
          borderLeft: '3px solid #d4af37',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}>
          <span style={{
            fontFamily: 'IBM Plex Mono, monospace',
            color: '#d4af37',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            whiteSpace: 'nowrap',
          }}>
            CURRENTLY LEARNING
          </span>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {['Machine Learning', 'Data Analytics', 'Cloud Architecture', 'LLM Integration'].map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '0.25rem 0.875rem',
                  background: 'rgba(212, 175, 55, 0.08)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  color: '#b8b4a8',
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '0.75rem',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .skills-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 900px) {
          .skills-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}} />
    </section>
  );
};

export default Skills;
