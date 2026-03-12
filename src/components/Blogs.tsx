'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaArrowRight, FaCogs, FaLayerGroup } from 'react-icons/fa';
import { HiChip } from 'react-icons/hi';

const posts = [
  {
    id: 1,
    entry: '001',
    title: 'Building Real-Time IoT Data Pipelines with Node.js and AWS Lambda',
    excerpt:
      'A deep dive into designing fault-tolerant, event-driven pipelines that ingest high-frequency sensor data, process it at the edge, and surface actionable insights — without breaking the bank on infrastructure.',
    category: 'Backend & IoT',
    date: 'Jan 14, 2025',
    readTime: '8 min read',
    href: '#',
    icon: HiChip,
    color: '#6cc24a',
    featured: true,
  },
  {
    id: 2,
    entry: '002',
    title: 'CRM Automation That Actually Works: Lessons from 20+ GoHighLevel Builds',
    excerpt:
      'Most automation workflows look great on paper and break in production. Here is what I have learned building repeatable, low-maintenance CRM pipelines for agencies and service businesses.',
    category: 'CRM & Automation',
    date: 'Dec 5, 2024',
    readTime: '6 min read',
    href: '#',
    icon: FaCogs,
    color: '#d4af37',
    featured: false,
  },
  {
    id: 3,
    entry: '003',
    title: 'FastAPI vs Fastify: Choosing the Right Framework for High-Throughput APIs',
    excerpt:
      'Both frameworks promise blazing-fast performance, but they shine in very different scenarios. A practical comparison based on real production workloads across Python and Node.js stacks.',
    category: 'Engineering',
    date: 'Nov 20, 2024',
    readTime: '10 min read',
    href: '#',
    icon: FaLayerGroup,
    color: '#54c5f8',
    featured: false,
  },
];

const Blogs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0, y: 50, duration: 1, ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      gsap.from('.blog-featured', {
        opacity: 0, y: 70, duration: 1.1, ease: 'power4.out',
        immediateRender: false,
        scrollTrigger: { trigger: '.blog-featured', start: 'top 88%' },
      });

      gsap.from('.blog-side-0', {
        opacity: 0, x: -55, duration: 0.95, ease: 'power4.out',
        immediateRender: false,
        scrollTrigger: { trigger: '.blog-side-row', start: 'top 88%' },
      });
      gsap.from('.blog-side-1', {
        opacity: 0, x: 55, duration: 0.95, ease: 'power4.out',
        immediateRender: false,
        scrollTrigger: { trigger: '.blog-side-row', start: 'top 88%' },
      });

      gsap.utils.toArray<HTMLElement>('.blog-icon-float').forEach((el) => {
        gsap.to(el, {
          y: -8,
          duration: 2.8 + Math.random() * 1.2,
          repeat: -1, yoyo: true, ease: 'sine.inOut',
          delay: Math.random() * 1.5,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featured  = posts.find((p) => p.featured)!;
  const sidePosts = posts.filter((p) => !p.featured);

  return (
    <section
      id="blogs"
      ref={sectionRef}
      style={{ padding: '5rem 0', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background blobs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '15%', left: '3%', width: '28rem', height: '28rem', background: 'rgba(108,194,74,0.06)', borderRadius: '50%', filter: 'blur(90px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '22rem', height: '22rem', background: 'rgba(212,175,55,0.07)', borderRadius: '50%', filter: 'blur(80px)' }} />
      </div>
      <div className="bg-grid-pattern" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.12 }} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 2, maxWidth: '1200px' }}>

        {/* Section title */}
        <h2 ref={titleRef} style={{
          color: '#f5f1e8', marginBottom: '3.5rem',
          display: 'flex', alignItems: 'center',
          fontSize: 'clamp(1.4rem, 5vw, 2.5rem)',
          fontFamily: 'Crimson Pro, serif', fontWeight: 700, letterSpacing: '-0.02em',
          whiteSpace: 'nowrap', flexWrap: 'nowrap', overflow: 'hidden',
        }}>
          <span style={{ fontFamily: 'IBM Plex Mono, monospace', color: '#d4af37', fontSize: '1.5rem', marginRight: '1rem', flexShrink: 0 }}>04.</span>
          Blog &amp; Writing
          <span style={{ marginLeft: '2rem', height: '1px', background: 'rgba(184,180,168,0.3)', flex: 1, maxWidth: '20rem' }} />
        </h2>

        {/* ── Featured post ── */}
        <a
          href={featured.href}
          className="blog-featured"
          style={{
            display: 'grid', position: 'relative',
            background: 'rgba(255,255,255,0.025)',
            backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '20px', marginBottom: '1.75rem',
            textDecoration: 'none', overflow: 'hidden',
            transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = `${featured.color}44`;
            e.currentTarget.style.boxShadow = `0 24px 64px rgba(0,0,0,0.6), 0 0 60px ${featured.color}18`;
            const arrow = e.currentTarget.querySelector('.feat-arrow') as HTMLElement;
            if (arrow) arrow.style.transform = 'translateX(6px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
            e.currentTarget.style.boxShadow = '';
            const arrow = e.currentTarget.querySelector('.feat-arrow') as HTMLElement;
            if (arrow) arrow.style.transform = 'translateX(0)';
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: '8%', right: '8%', height: '1px', background: `linear-gradient(90deg, transparent, ${featured.color}66, transparent)`, pointerEvents: 'none' }} />

          {/* Left visual panel */}
          <div className="blog-feat-left" style={{
            position: 'relative',
            background: `linear-gradient(135deg, ${featured.color}18 0%, ${featured.color}06 100%)`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '3rem 2rem', gap: '1.25rem', overflow: 'hidden',
          }}>
            <span style={{ position: 'absolute', bottom: '-0.5rem', right: '-0.5rem', fontFamily: 'IBM Plex Mono, monospace', fontSize: '7rem', fontWeight: 700, color: `${featured.color}0d`, lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>
              {featured.entry}
            </span>
            <div className="blog-icon-float" style={{ width: '80px', height: '80px', borderRadius: '50%', background: `radial-gradient(circle at 35% 35%, ${featured.color}28, ${featured.color}0a)`, border: `1.5px solid ${featured.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 12px 40px ${featured.color}22, inset 0 1px 0 rgba(255,255,255,0.08)`, position: 'relative', zIndex: 1 }}>
              <featured.icon size={32} color={featured.color} />
            </div>
            <span style={{ padding: '0.25rem 0.8rem', borderRadius: '50px', background: `${featured.color}18`, border: `1px solid ${featured.color}33`, color: featured.color, fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.1em', position: 'relative', zIndex: 1 }}>
              {featured.category}
            </span>
            <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.25rem', right: '1.25rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[1,2,3].map((i) => <div key={i} style={{ height: '1px', background: `rgba(255,255,255,${0.018 + i * 0.008})` }} />)}
            </div>
          </div>

          {/* Right content */}
          <div className="blog-feat-right" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', color: featured.color, letterSpacing: '0.12em', opacity: 0.7 }}>ENTRY {featured.entry}</span>
              <span style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.1)' }} />
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', color: '#4a4845', letterSpacing: '0.08em' }}>{featured.date} · {featured.readTime}</span>
            </div>
            <h3 style={{ fontFamily: 'Crimson Pro, serif', fontSize: 'clamp(1.3rem, 2.5vw, 1.85rem)', fontWeight: 700, color: '#f5f1e8', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              {featured.title}
            </h3>
            <div style={{ padding: '0.75rem 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.9rem', color: '#7a7875', lineHeight: 1.7, letterSpacing: '-0.01em' }}>
                {featured.excerpt}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: featured.color, fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '-0.01em' }}>
              Read article
              <span className="feat-arrow" style={{ display: 'flex', transition: 'transform 0.3s ease' }}><FaArrowRight size={12} /></span>
            </div>
          </div>
        </a>

        {/* ── Side posts ── */}
        <div className="blog-side-row" style={{ display: 'grid', gap: '1.75rem' }}>
          {sidePosts.map((post, idx) => {
            const IconComp = post.icon;
            return (
              <a
                key={post.id}
                href={post.href}
                className={`blog-side-${idx}`}
                style={{
                  display: 'flex', flexDirection: 'column',
                  position: 'relative',
                  background: 'rgba(255,255,255,0.022)',
                  backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '18px', textDecoration: 'none', overflow: 'hidden',
                  transition: 'border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${post.color}44`;
                  e.currentTarget.style.boxShadow = `0 20px 55px rgba(0,0,0,0.55), 0 0 50px ${post.color}14`;
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  const arrow = e.currentTarget.querySelector('.side-arrow') as HTMLElement;
                  if (arrow) arrow.style.transform = 'translateX(6px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.boxShadow = '';
                  e.currentTarget.style.transform = 'translateY(0)';
                  const arrow = e.currentTarget.querySelector('.side-arrow') as HTMLElement;
                  if (arrow) arrow.style.transform = 'translateX(0)';
                }}
              >
                {/* Top shimmer */}
                <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: `linear-gradient(90deg, transparent, ${post.color}55, transparent)`, pointerEvents: 'none' }} />

                {/* Header band */}
                <div style={{
                  position: 'relative',
                  background: `linear-gradient(135deg, ${post.color}14, ${post.color}04)`,
                  padding: '1.75rem 1.75rem 1.25rem',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  overflow: 'hidden',
                  display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem',
                }}>
                  <span style={{ position: 'absolute', bottom: '-0.75rem', right: '0.5rem', fontFamily: 'IBM Plex Mono, monospace', fontSize: '5.5rem', fontWeight: 700, color: `${post.color}0e`, lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>
                    {post.entry}
                  </span>
                  <div style={{ zIndex: 1 }}>
                    <span style={{ display: 'block', fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.58rem', color: post.color, letterSpacing: '0.12em', opacity: 0.75, marginBottom: '0.35rem' }}>
                      ENTRY {post.entry}
                    </span>
                    <span style={{ padding: '0.2rem 0.65rem', borderRadius: '50px', background: `${post.color}18`, border: `1px solid ${post.color}33`, color: post.color, fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.08em' }}>
                      {post.category}
                    </span>
                  </div>
                  <div className="blog-icon-float" style={{ width: '52px', height: '52px', borderRadius: '50%', background: `radial-gradient(circle at 35% 35%, ${post.color}22, ${post.color}08)`, border: `1px solid ${post.color}3a`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 24px ${post.color}1a`, flexShrink: 0, zIndex: 1 }}>
                    <IconComp size={20} color={post.color} />
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '1.5rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', color: '#4a4845', letterSpacing: '0.06em' }}>
                    {post.date} · {post.readTime}
                  </span>
                  <h3 style={{ fontFamily: 'Crimson Pro, serif', fontSize: 'clamp(1.05rem, 2vw, 1.3rem)', fontWeight: 700, color: '#f5f1e8', lineHeight: 1.22, letterSpacing: '-0.02em', flex: 1 }}>
                    {post.title}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {[1,2,3].map((i) => <div key={i} style={{ height: '1px', background: `rgba(255,255,255,${0.015 + i * 0.01})` }} />)}
                  </div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.85rem', color: '#6a6760', lineHeight: 1.65, letterSpacing: '-0.01em' }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: post.color, fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '-0.01em', paddingTop: '0.25rem' }}>
                    Read article
                    <span className="side-arrow" style={{ display: 'flex', transition: 'transform 0.3s ease' }}><FaArrowRight size={10} /></span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .blog-featured {
          grid-template-columns: 1fr;
        }
        .blog-feat-left {
          min-height: 260px;
        }
        .blog-side-row {
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .blog-featured {
            grid-template-columns: 280px 1fr;
          }
          .blog-feat-left {
            min-height: 300px;
            border-right: 1px solid rgba(255,255,255,0.05) !important;
          }
          .blog-side-row {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .blog-feat-right { padding: 1.5rem !important; }
        }
      `}} />
    </section>
  );
};

export default Blogs;
