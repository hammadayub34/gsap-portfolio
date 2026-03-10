'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Skill } from '@/types';

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Refs for skill items and bars
  const skillItemRefs = useRef<HTMLDivElement[]>([]);
  const skillBarRefs = useRef<HTMLDivElement[]>([]);

  const skills: Skill[] = [
    { name: 'JavaScript / Python', level: 95, category: 'frontend' },
    { name: 'React / Next.js', level: 85, category: 'frontend' },
    { name: 'HTML / CSS', level: 90, category: 'frontend' },
    { name: 'Node.js / Fastify', level: 95, category: 'backend' },
    { name: 'Python / FastAPI / Flask', level: 90, category: 'backend' },
    { name: 'MongoDB / PostgreSQL', level: 88, category: 'backend' },
    { name: 'Docker / AWS', level: 85, category: 'tools' },
    { name: 'HubSpot / GoHighLevel / Zoho', level: 92, category: 'tools' },
    { name: 'Zapier / Make / n8n', level: 90, category: 'tools' },
  ];

  const categories = {
    frontend: skills.filter((s) => s.category === 'frontend'),
    backend: skills.filter((s) => s.category === 'backend'),
    tools: skills.filter((s) => s.category === 'tools'),
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Section title
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

      // Skill items with back easing for subtle bounce
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

      // Skill bars — single staggered animation, much smoother
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

  // Helper to assign refs during map
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
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '26rem',
          height: '26rem',
          background: 'rgba(212, 175, 55, 0.06)',
          borderRadius: '50%',
          filter: 'blur(80px)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '8%',
          width: '20rem',
          height: '20rem',
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
            02.
          </span>
          Skills & Expertise
          <span style={{
            marginLeft: '2rem',
            height: '1px',
            background: 'rgba(184, 180, 168, 0.3)',
            flex: 1,
            maxWidth: '20rem',
          }}></span>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
        }}
          className="skills-grid"
        >
          {/* Frontend Skills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontFamily: 'Crimson Pro, serif',
              color: '#f5f1e8',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
            }}>
              <span style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '0',
                background: 'rgba(212, 175, 55, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem',
                color: '#d4af37',
                fontSize: '1.5rem',
              }}>
                💻
              </span>
              Frontend Development
            </h3>
            {categories.frontend.map((skill, index) => (
              <div
                key={index}
                className="skill-item"
                ref={setSkillItemRef}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem',
                }}>
                  <span style={{
                    color: '#f5f1e8',
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '0.875rem',
                  }}>
                    {skill.name}
                  </span>
                  <span style={{
                    color: '#d4af37',
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '0.875rem',
                  }}>
                    {skill.level}%
                  </span>
                </div>
                <div style={{
                  height: '0.5rem',
                  background: '#2a2a2a',
                  borderRadius: '9999px',
                  overflow: 'hidden',
                }}>
                  <div
                    className="skill-bar"
                    style={{
                      height: '100%',
                      background: 'linear-gradient(to right, #d4af37, #e8c968)',
                      borderRadius: '9999px',
                      width: `${skill.level}%`,
                    }}
                    ref={setSkillBarRef}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Backend Skills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontFamily: 'Crimson Pro, serif',
              color: '#f5f1e8',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
            }}>
              <span style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '0',
                background: 'rgba(212, 175, 55, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem',
                color: '#d4af37',
                fontSize: '1.5rem',
              }}>
                ⚙️
              </span>
              Backend Development
            </h3>
            {categories.backend.map((skill, index) => (
              <div
                key={index}
                className="skill-item"
                ref={setSkillItemRef}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem',
                }}>
                  <span style={{
                    color: '#f5f1e8',
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '0.875rem',
                  }}>
                    {skill.name}
                  </span>
                  <span style={{
                    color: '#d4af37',
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '0.875rem',
                  }}>
                    {skill.level}%
                  </span>
                </div>
                <div style={{
                  height: '0.5rem',
                  background: '#2a2a2a',
                  borderRadius: '9999px',
                  overflow: 'hidden',
                }}>
                  <div
                    className="skill-bar"
                    style={{
                      height: '100%',
                      background: 'linear-gradient(to right, #d4af37, #e8c968)',
                      borderRadius: '9999px',
                      width: `${skill.level}%`,
                    }}
                    ref={setSkillBarRef}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Tools & Technologies */}
          <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontFamily: 'Crimson Pro, serif',
              color: '#f5f1e8',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
            }}>
              <span style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '0',
                background: 'rgba(212, 175, 55, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem',
                color: '#d4af37',
                fontSize: '1.5rem',
              }}>
                🛠️
              </span>
              Tools & Technologies
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '1.5rem',
            }}
              className="tools-grid"
            >
              {categories.tools.map((skill, index) => (
                <div
                  key={index}
                  className="skill-item"
                  ref={setSkillItemRef}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem',
                  }}>
                    <span style={{
                      color: '#f5f1e8',
                      fontFamily: 'IBM Plex Mono, monospace',
                      fontSize: '0.875rem',
                    }}>
                      {skill.name}
                    </span>
                    <span style={{
                      color: '#d4af37',
                      fontFamily: 'IBM Plex Mono, monospace',
                      fontSize: '0.875rem',
                    }}>
                      {skill.level}%
                    </span>
                  </div>
                  <div style={{
                    height: '0.5rem',
                    background: '#2a2a2a',
                    borderRadius: '9999px',
                    overflow: 'hidden',
                  }}>
                    <div
                      className="skill-bar"
                      style={{
                        height: '100%',
                        background: 'linear-gradient(to right, #d4af37, #e8c968)',
                        borderRadius: '9999px',
                        width: `${skill.level}%`,
                      }}
                      ref={setSkillBarRef}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div style={{
          marginTop: '4rem',
          padding: '2rem',
          background: 'rgba(42, 42, 42, 0.3)',
          borderRadius: '0.5rem',
          border: '1px solid rgba(212, 175, 55, 0.2)',
        }}>
          <p style={{
            color: '#b8b4a8',
            textAlign: 'center',
            lineHeight: 1.8,
          }}>
            I&apos;m constantly learning and expanding my skill set. Currently deepening expertise in{' '}
            <span style={{ color: '#d4af37', fontWeight: 600 }}>Machine Learning</span>,{' '}
            <span style={{ color: '#d4af37', fontWeight: 600 }}>Data Analytics</span>, and{' '}
            <span style={{ color: '#d4af37', fontWeight: 600 }}>Cloud Architecture</span>.
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 768px) {
          .skills-grid {
            grid-template-columns: 1fr 1fr;
          }
          .tools-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}} />
    </section>
  );
};

export default Skills;