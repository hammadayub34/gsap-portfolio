'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  SiNodedotjs, SiPython, SiReact, SiNextdotjs, SiTypescript,
  SiMongodb, SiPostgresql, SiDocker, SiFastapi, SiZapier,
  SiHubspot, SiJavascript, SiAmazonwebservices, SiFlutter,
} from 'react-icons/si';

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillItemRefs = useRef<HTMLDivElement[]>([]);
  const skillBarRefs = useRef<HTMLDivElement[]>([]);
  const percentRefs = useRef<{ el: HTMLSpanElement; target: number }[]>([]);

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

      // Count-up animation for percentage numbers
      percentRefs.current.forEach(({ el, target }, i) => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.4,
          delay: i * 0.06,
          ease: 'expo.out',
          snap: { val: 1 },
          immediateRender: false,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
          onUpdate() {
            el.textContent = `${Math.round(obj.val)}%`;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setSkillItemRef = (el: HTMLDivElement | null) => {
    if (el && !skillItemRefs.current.includes(el)) skillItemRefs.current.push(el);
  };

  const setSkillBarRef = (el: HTMLDivElement | null) => {
    if (el && !skillBarRefs.current.includes(el)) skillBarRefs.current.push(el);
  };

  const setPercentRef = (el: HTMLSpanElement | null, target: number) => {
    if (el && !percentRefs.current.find((r) => r.el === el)) {
      percentRefs.current.push({ el, target });
    }
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        padding: '5rem 0',
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

      <div className="container-custom" style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', width: '100%' }}>
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="section-title-mb"
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
            overflow: 'hidden',
          }}
        >
          <span style={{ fontFamily: 'IBM Plex Mono, monospace', color: '#d4af37', fontSize: '1.5rem', marginRight: '1rem', flexShrink: 0 }}>
            02.
          </span>
          Skills & Expertise
          <span style={{ marginLeft: '2rem', height: '1px', background: 'rgba(184, 180, 168, 0.3)', flex: 1, maxWidth: '20rem' }} />
        </h2>

        {/* Skill group cards */}
        <div className="skills-grid" style={{ display: 'grid', gap: '2rem' }}>
          {skillGroups.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="skill-group-card"
              style={{
                padding: '2rem',
                background: 'rgba(255,255,255,0.025)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Card ambient glow */}
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: `radial-gradient(ellipse at top left, ${group.accent} 0%, transparent 60%)`,
              }} />
              {/* Thin gold shimmer line at top */}
              <div style={{
                position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.6), transparent)',
                pointerEvents: 'none',
              }} />

              {/* Group header */}
              <div className="skill-card-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem', position: 'relative' }}>
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
                      <span
                        ref={(el) => setPercentRef(el, skill.level)}
                        style={{
                          color: '#d4af37',
                          fontFamily: 'IBM Plex Mono, monospace',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                        }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div style={{
                      height: '4px',
                      background: 'rgba(255,255,255,0.06)',
                      borderRadius: '9999px',
                      overflow: 'hidden',
                    }}>
                      <div
                        className="skill-bar"
                        ref={setSkillBarRef}
                        style={{
                          height: '100%',
                          width: `${skill.level}%`,
                          background: 'linear-gradient(90deg, #b8941f 0%, #d4af37 60%, #f0d060 100%)',
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

        {/* Tech Stack Marquee */}
        {(() => {
          const techStack = [
            { Icon: SiNodedotjs,         label: 'Node.js',     color: '#68a063' },
            { Icon: SiPython,            label: 'Python',      color: '#4584b6' },
            { Icon: SiReact,             label: 'React',       color: '#61dafb' },
            { Icon: SiNextdotjs,         label: 'Next.js',     color: '#f5f1e8' },
            { Icon: SiTypescript,        label: 'TypeScript',  color: '#3178c6' },
            { Icon: SiJavascript,        label: 'JavaScript',  color: '#f7df1e' },
            { Icon: SiMongodb,           label: 'MongoDB',     color: '#4db33d' },
            { Icon: SiPostgresql,        label: 'PostgreSQL',  color: '#336791' },
            { Icon: SiDocker,            label: 'Docker',      color: '#2496ed' },
            { Icon: SiAmazonwebservices, label: 'AWS',         color: '#ff9900' },
            { Icon: SiFastapi,           label: 'FastAPI',     color: '#009688' },
            { Icon: SiFlutter,           label: 'Flutter',     color: '#54c5f8' },
            { Icon: SiZapier,            label: 'Zapier',      color: '#ff4a00' },
            { Icon: SiHubspot,           label: 'HubSpot',     color: '#ff7a59' },
          ];
          const items = [...techStack, ...techStack];
          return (
            <div style={{ margin: '3rem 0', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '5rem', background: 'linear-gradient(to right, #0d0d0d, transparent)', zIndex: 2, pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '5rem', background: 'linear-gradient(to left, #0d0d0d, transparent)', zIndex: 2, pointerEvents: 'none' }} />
              <div className="tech-marquee-track">
                {items.map(({ Icon, label, color }, i) => (
                  <div key={i} className="tech-marquee-item">
                    <Icon size={26} style={{ color, flexShrink: 0 }} />
                    <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', color: '#8a8780', whiteSpace: 'nowrap' }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Currently Learning banner */}
        <div style={{
          marginTop: '3rem',
          padding: '1.5rem 2rem',
          background: 'rgba(255,255,255,0.025)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
          position: 'relative',
          overflow: 'hidden',
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
        @media (min-width: 600px) and (max-width: 899px) {
          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 900px) {
          .skills-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 640px) {
          .skill-group-card {
            padding: 1.25rem !important;
          }
          .skills-grid {
            gap: 1.25rem;
          }
        }

        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .tech-marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 28s linear infinite;
        }
        .tech-marquee-track:hover {
          animation-play-state: paused;
        }
        .tech-marquee-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.6rem 1.25rem;
          margin: 0 0.25rem;
          background: rgba(212, 175, 55, 0.04);
          border: 1px solid rgba(212, 175, 55, 0.1);
          border-radius: 6px;
          transition: background 0.3s ease, border-color 0.3s ease;
          white-space: nowrap;
          cursor: default;
        }
        .tech-marquee-item:hover {
          background: rgba(212, 175, 55, 0.1);
          border-color: rgba(212, 175, 55, 0.3);
        }
      `}} />
    </section>
  );
};

export default Skills;
