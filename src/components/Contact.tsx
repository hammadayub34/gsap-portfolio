'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
  FaClock,
  FaCalendarAlt,
  FaUser,
  FaCommentAlt,
} from 'react-icons/fa';
import { ContactForm } from '@/types';
const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [charCount, setCharCount] = useState(0);
  const maxCharCount = 500;
  
  // Form animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Title
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
        },
      });

      // Form groups
      const formGroups = formRef.current?.querySelectorAll('.form-group');
      if (formGroups && formGroups.length > 0) {
        gsap.from(formGroups, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
          },
        });
      }

      // Info cards — own trigger so they always animate when visible
      const infoCards = infoRef.current?.querySelectorAll('.info-card');
      if (infoCards && infoCards.length > 0) {
        gsap.from(infoCards, {
          opacity: 0,
          x: 50,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 85%',
          },
        });
      }

      // Social links — entrance + continuous float
      const socialIconEls = socialRef.current?.querySelectorAll('.social-link');
      if (socialIconEls && socialIconEls.length > 0) {
        gsap.from(socialIconEls, {
          opacity: 0,
          scale: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'back.out(1.7)',
          immediateRender: false,
          scrollTrigger: {
            trigger: socialRef.current,
            start: 'top 92%',
          },
        });
        socialIconEls.forEach((icon, i) => {
          gsap.to(icon, {
            y: -8,
            duration: 1.6 + i * 0.3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 1.0 + i * 0.4,
          });
        });
      }

      // Available dot rings
      const availableRings = statsRef.current?.querySelectorAll('.available-ring');
      availableRings?.forEach((ring, i) => {
        gsap.fromTo(ring,
          { scale: 1, opacity: 0.6 },
          { scale: 2.8, opacity: 0, duration: 2.2, delay: i * 0.9, repeat: -1, ease: 'power2.out' }
        );
      });

      // Stat icon gentle pulse
      const statIcons = statsRef.current?.querySelectorAll('.stat-icon');
      statIcons?.forEach((icon, i) => {
        gsap.to(icon, { scale: 1.18, duration: 1.3 + i * 0.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.5 });
      });

      // Stats — own trigger
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems && statItems.length > 0) {
        gsap.from(statItems, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 90%',
          },
        });
      }

      // Location pin pulsing rings
      const rings = sectionRef.current?.querySelectorAll('.location-pulse-ring');
      rings?.forEach((ring, i) => {
        gsap.fromTo(ring,
          { scale: 0.8, opacity: 0.7 },
          { scale: 2.4, opacity: 0, duration: 2, delay: i * 0.75, repeat: -1, ease: 'power2.out' }
        );
      });

      // Email icon subtle pulse
      gsap.to('.contact-email-orb', {
        boxShadow: '0 0 20px rgba(212, 175, 55, 0.35)',
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Phone icon ring tilt
      gsap.to('.contact-phone-icon', {
        rotation: 18,
        duration: 0.15,
        repeat: -1,
        repeatDelay: 3,
        yoyo: true,
        yoyoEase: 'power2.inOut',
        ease: 'power2.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Form validation
  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'Name can only contain letters';
        return '';
      
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
        return '';
      
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        if (value.length > maxCharCount) return `Message cannot exceed ${maxCharCount} characters`;
        return '';
      
      default:
        return '';
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'message') {
      setCharCount(value.length);
    }

    // Validate on change if field has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({
        ...errors,
        [name]: error,
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setTouched({
      ...touched,
      [name]: true,
    });

    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Partial<ContactForm> = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof ContactForm]);
      if (error) newErrors[key as keyof ContactForm] = error;
    });

    setErrors(newErrors);
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(newErrors).length > 0) {
      if (formRef.current) {
        const tl = gsap.timeline();
        tl.to(formRef.current, { x: -10, duration: 0.05 })
          .to(formRef.current, { x: 10, duration: 0.05 })
          .to(formRef.current, { x: -10, duration: 0.05 })
          .to(formRef.current, { x: 10, duration: 0.05 })
          .to(formRef.current, { x: 0, duration: 0.05 });
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate form submission (replace with actual API call)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Success
      setSubmitStatus('success');
      setSubmitMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon!');
      setFormData({ name: '', email: '', message: '' });
      setCharCount(0);
      setTouched({});
      setErrors({});

      // Success animation
      gsap.to(formRef.current, {
        scale: 1.02,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
      });

      // Clear success message after 7 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setSubmitMessage('');
      }, 7000);
    } catch {
      // Error
      setSubmitStatus('error');
      setSubmitMessage('Oops! Something went wrong. Please try again or contact me directly via email.');
      
      // Clear error message after 7 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setSubmitMessage('');
      }, 7000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: 'Email',
      value: 'hammadayub34@gmail.com',
      link: 'mailto:hammadayub34@gmail.com',
      description: 'Best way to reach me',
      color: 'from-accent/20 to-accent/10',
    },
    {
      icon: FaPhone,
      title: 'Phone',
      value: '+92 304 9734062',
      link: 'tel:+923049734062',
      description: 'Available Mon-Fri',
      color: 'from-accent/15 to-accent/5',
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Location',
      value: 'Islamabad, Pakistan',
      link: null,
      description: 'Available for remote work',
      color: 'from-accent/10 to-transparent',
    },
  ];

  const socialLinks = [
    { icon: FaFacebook, url: 'https://facebook.com/hammadayub1999', label: 'Facebook', brand: '#1877f2' },
    { icon: FaLinkedin, url: 'https://linkedin.com/in/hammadayub34', label: 'LinkedIn', brand: '#0a66c2' },
    { icon: FaTwitter, url: 'https://twitter.com/hammadayub34', label: 'Twitter', brand: '#1d9bf0' },
  ];

  const responseStats = [
    { icon: FaClock, value: '< 24h', label: 'Avg Response Time' },
    { icon: FaCheckCircle, value: '100%', label: 'Reply Rate' },
    { icon: FaCalendarAlt, value: '7 Days', label: 'Availability' },
  ];

  return (
    <section
      id="contact"
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
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        opacity: 0.3,
      }}>
        <div style={{
          position: 'absolute',
          top: '25%',
          right: '25%',
          width: '24rem',
          height: '24rem',
          background: 'rgba(212, 175, 55, 0.05)',
          borderRadius: '50%',
          filter: 'blur(80px)',
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '25%',
          left: '25%',
          width: '24rem',
          height: '24rem',
          background: 'rgba(212, 175, 55, 0.05)',
          borderRadius: '50%',
          filter: 'blur(80px)',
        }}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="bg-grid-pattern" style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity: 0.2,
      }}></div>

      <div className="container-custom" style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', width: '100%' }}>
        {/* Section Title */}
        <div ref={titleRef} className="section-title-mb" style={{ marginBottom: '4rem' }}>
          <h2 style={{
            color: '#f5f1e8',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1rem',
            whiteSpace: 'nowrap',
            flexWrap: 'nowrap',
            fontSize: 'clamp(1.4rem, 5vw, 3rem)',
          }}>
            <span style={{
              fontFamily: 'IBM Plex Mono, monospace',
              color: '#d4af37',
              fontSize: '1.5rem',
              marginRight: '1rem',
              flexShrink: 0,
            }}>
              06.
            </span>
            <span style={{
              fontFamily: 'Crimson Pro, serif',
              fontSize: 'clamp(1.4rem, 5vw, 3rem)',
              fontWeight: 700,
            }}>
              Get In Touch
            </span>
            <span style={{
              marginLeft: '2rem',
              height: '1px',
              background: 'rgba(184, 180, 168, 0.3)',
              flex: 1,
              maxWidth: '20rem',
            }}></span>
          </h2>
          <p className="contact-subtitle" style={{
            color: '#b8b4a8',
            fontSize: '1.125rem',
            maxWidth: '42rem',
            fontFamily: 'Inter, sans-serif',
          }}>
            Have a project in mind or just want to chat? I&apos;m always open to discussing new opportunities, creative ideas, or partnerships.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gap: '2rem',
          alignItems: 'start',
        }}
          className="contact-grid"
        >
          {/* Contact Information Sidebar - shown first on mobile */}
          <div ref={infoRef} className="info-column" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            background: 'rgba(255,255,255,0.025)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '20px',
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Contact Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontFamily: 'Crimson Pro, serif',
                color: '#f5f1e8',
                marginBottom: '1rem',
              }}>
                Contact Information
              </h3>
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                const isLocation = info.title === 'Location';
                const isEmail = info.title === 'Email';
                const isPhone = info.title === 'Phone';
                return (
                <div
                  key={index}
                  className="info-card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem',
                    padding: '1.25rem 0',
                    borderBottom: index < contactInfo.length - 1
                      ? '1px solid rgba(255,255,255,0.05)'
                      : 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                  }}
                >
                  {/* Animated icon orb */}
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    {/* Pulsing rings for location */}
                    {isLocation && <>
                      <div className="location-pulse-ring" style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        border: '1px solid rgba(212, 175, 55, 0.5)',
                        pointerEvents: 'none',
                      }} />
                      <div className="location-pulse-ring" style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        pointerEvents: 'none',
                      }} />
                    </>}
                    <div
                      className={isEmail ? 'contact-email-orb' : isPhone ? 'contact-phone-orb' : ''}
                      style={{
                        width: '3.25rem',
                        height: '3.25rem',
                        borderRadius: '50%',
                        background: 'rgba(212, 175, 55, 0.08)',
                        border: '1px solid rgba(212, 175, 55, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#d4af37',
                        position: 'relative',
                      }}
                    >
                      {isLocation ? (
                        /* Animated globe SVG */
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round">
                          <circle cx="12" cy="12" r="10"/>
                          <ellipse cx="12" cy="12" rx="4" ry="10" className="globe-meridian"/>
                          <line x1="2" y1="12" x2="22" y2="12"/>
                          <ellipse cx="12" cy="12" rx="10" ry="4"/>
                          <circle cx="16" cy="7" r="2" fill="#d4af37" stroke="none"/>
                        </svg>
                      ) : isPhone ? (
                        <span className="contact-phone-icon" style={{ display: 'flex' }}>
                          <IconComponent size={20} />
                        </span>
                      ) : (
                        <IconComponent size={20} />
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      color: '#8a8780',
                      fontFamily: 'IBM Plex Mono, monospace',
                      fontSize: '0.7rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: '0.2rem',
                    }}>
                      {info.title}
                    </div>
                    {info.link ? (
                      <a
                        href={info.link}
                        style={{
                          color: '#f5f1e8',
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 500,
                          fontSize: '0.95rem',
                          transition: 'color 0.3s ease',
                          display: 'block',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          textDecoration: 'none',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#d4af37'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#f5f1e8'; }}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <div style={{
                        color: '#f5f1e8',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {info.value}
                      </div>
                    )}
                    <div style={{ color: '#5a5755', fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.72rem', marginTop: '0.2rem' }}>
                      {info.description}
                    </div>
                  </div>
                </div>
              );
              })}
            </div>

            {/* Response Stats */}
            <div ref={statsRef} className="contact-dark-card" style={{
              padding: '1.5rem',
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '20px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Top shimmer line */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '10%',
                right: '10%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.55), transparent)',
                pointerEvents: 'none',
              }} />
              {/* Subtle ambient glow */}
              <div style={{
                position: 'absolute',
                top: '-2rem',
                right: '-2rem',
                width: '8rem',
                height: '8rem',
                background: 'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              <h4 style={{
                color: '#f5f1e8',
                fontFamily: 'Crimson Pro, serif',
                fontSize: '1.125rem',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                position: 'relative',
              }}>
                {/* Pulsing dot with rings */}
                <div style={{ position: 'relative', width: '0.6rem', height: '0.6rem', flexShrink: 0 }}>
                  <div className="available-ring" style={{
                    position: 'absolute',
                    inset: '-2px',
                    borderRadius: '50%',
                    border: '1px solid rgba(74,222,128,0.5)',
                    pointerEvents: 'none',
                  }} />
                  <div className="available-ring" style={{
                    position: 'absolute',
                    inset: '-2px',
                    borderRadius: '50%',
                    border: '1px solid rgba(74,222,128,0.3)',
                    pointerEvents: 'none',
                  }} />
                  <div style={{
                    width: '0.6rem',
                    height: '0.6rem',
                    borderRadius: '50%',
                    background: '#4ade80',
                    boxShadow: '0 0 8px rgba(74,222,128,0.6)',
                  }} />
                </div>
                Currently Available
                <span style={{
                  marginLeft: 'auto',
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '0.65rem',
                  color: '#4ade80',
                  opacity: 0.7,
                  letterSpacing: '0.08em',
                }}>OPEN TO WORK</span>
              </h4>

              <div className="contact-stats-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.75rem',
                marginBottom: '1.25rem',
              }}>
                {responseStats.map((stat, index) => {
                  const StatIcon = stat.icon;
                  return (
                  <div
                    key={index}
                    className="stat-item"
                    style={{
                      textAlign: 'center',
                      padding: '0.875rem 0.5rem',
                      borderRadius: '12px',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      transition: 'all 0.3s ease',
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.background = 'rgba(212,175,55,0.06)';
                      el.style.borderColor = 'rgba(212,175,55,0.2)';
                      el.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.background = 'rgba(255,255,255,0.02)';
                      el.style.borderColor = 'rgba(255,255,255,0.05)';
                      el.style.transform = 'translateY(0)';
                    }}
                  >
                    <div className="stat-icon" style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
                      <StatIcon color="#d4af37" size={18} />
                    </div>
                    <div style={{
                      color: '#f5f1e8',
                      fontFamily: 'Crimson Pro, serif',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      lineHeight: 1.2,
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      color: '#6a6760',
                      fontSize: '0.68rem',
                      fontFamily: 'IBM Plex Mono, monospace',
                      marginTop: '0.3rem',
                      letterSpacing: '0.05em',
                    }}>
                      {stat.label}
                    </div>
                  </div>
                );
                })}
              </div>
              <p style={{
                color: '#8a8780',
                fontSize: '0.825rem',
                lineHeight: 1.8,
                fontFamily: 'Inter, sans-serif',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                paddingTop: '1rem',
                position: 'relative',
              }}>
                Open to freelance projects &amp; full-time roles.{' '}
                <span style={{ color: '#d4af37' }}>Let&apos;s build something great.</span>
              </p>
            </div>

            {/* Quick Note */}
            <div style={{ paddingTop: '0.5rem' }}>
              <p style={{
                color: '#5a5755',
                fontSize: '0.8rem',
                fontFamily: 'IBM Plex Mono, monospace',
                fontStyle: 'italic',
                lineHeight: 1.8,
              }}>
                &ldquo;The best way to predict the future is to create it.&rdquo;<br />
                <span style={{ color: '#d4af37', opacity: 0.7 }}>— Let&apos;s create yours together.</span>
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="form-column" style={{
            background: 'rgba(255,255,255,0.025)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '20px',
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Form header */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '0.7rem',
                letterSpacing: '0.18em',
                color: '#d4af37',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
                opacity: 0.8,
              }}>
                {'// Let\'s talk'}
              </div>
              <h3 style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontFamily: 'Crimson Pro, serif',
                fontWeight: 700,
                color: '#f5f1e8',
                lineHeight: 1.2,
                marginBottom: '1rem',
              }}>
                Send Me a Message
              </h3>
              <p style={{
                color: '#8a8780',
                lineHeight: 1.8,
                fontSize: '0.9rem',
                fontFamily: 'Inter, sans-serif',
                maxWidth: '38rem',
              }}>
                Have a project in mind or just want to say hi? Drop a message and I&apos;ll get back to you within 24 hours.
              </p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              {/* Name + Email row */}
              <div className="form-row">
                {/* Name */}
                <div className="form-group" style={{ flex: 1 }}>
                  <label htmlFor="name" style={{
                    display: 'block',
                    color: '#8a8780',
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '0.7rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                  }}>
                    Name *
                  </label>
                  <div className="input-wrapper">
                    <span className="input-icon"><FaUser size={13} /></span>
                    <input
                      suppressHydrationWarning
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-with-icon"
                      style={{
                        width: '100%',
                        border: errors.name && touched.name ? '1px solid rgba(239,68,68,0.6)' : undefined,
                      }}
                      placeholder="Your full name"
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.name && touched.name && (
                    <p style={{ marginTop: '0.4rem', color: '#f87171', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'IBM Plex Mono, monospace' }}>
                      <FaExclamationCircle size={12} />{errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="form-group" style={{ flex: 1 }}>
                  <label htmlFor="email" style={{
                    display: 'block',
                    color: '#8a8780',
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '0.7rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                  }}>
                    Email *
                  </label>
                  <div className="input-wrapper">
                    <span className="input-icon"><FaEnvelope size={13} /></span>
                    <input
                      suppressHydrationWarning
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-with-icon"
                      style={{
                        width: '100%',
                        border: errors.email && touched.email ? '1px solid rgba(239,68,68,0.6)' : undefined,
                      }}
                      placeholder="your@email.com"
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.email && touched.email && (
                    <p style={{ marginTop: '0.4rem', color: '#f87171', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'IBM Plex Mono, monospace' }}>
                      <FaExclamationCircle size={12} />{errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label htmlFor="message" style={{
                    color: '#8a8780',
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '0.7rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}>
                    Message *
                  </label>
                  <span style={{
                    fontSize: '0.7rem',
                    fontFamily: 'IBM Plex Mono, monospace',
                    color: charCount > maxCharCount ? '#f87171' : '#5a5755',
                  }}>
                    {charCount}/{maxCharCount}
                  </span>
                </div>
                <div className="input-wrapper textarea-wrapper">
                  <span className="input-icon textarea-icon"><FaCommentAlt size={13} /></span>
                  <textarea
                    suppressHydrationWarning
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="input-with-icon"
                    style={{
                      width: '100%',
                      resize: 'none',
                      border: errors.message && touched.message ? '1px solid rgba(239,68,68,0.6)' : undefined,
                    }}
                    placeholder="Hello! I'd like to discuss a project..."
                    onBlur={handleBlur}
                  />
                </div>
                {errors.message && touched.message && (
                  <p style={{ marginTop: '0.4rem', color: '#f87171', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'IBM Plex Mono, monospace' }}>
                    <FaExclamationCircle size={12} />{errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                suppressHydrationWarning
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  letterSpacing: '0.1em',
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                }}
              >
                {isSubmitting ? (
                  <>
                    <span className="form-spinner" />
                    Sending…
                  </>
                ) : (
                  <>
                    <FaPaperPlane size={14} />
                    Send Message
                  </>
                )}
              </button>

              {/* Status */}
              {submitMessage && (
                <div
                  className="animate-fade-in"
                  style={{
                    padding: '1rem 1.25rem',
                    borderRadius: '12px',
                    border: `1px solid ${submitStatus === 'success' ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)'}`,
                    background: submitStatus === 'success' ? 'rgba(34,197,94,0.06)' : 'rgba(239,68,68,0.06)',
                    backdropFilter: 'blur(8px)',
                    fontSize: '0.875rem',
                    fontFamily: 'Inter, sans-serif',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    color: submitStatus === 'success' ? '#4ade80' : '#f87171',
                  }}
                >
                  {submitStatus === 'success'
                    ? <FaCheckCircle style={{ flexShrink: 0, marginTop: '0.1rem' }} size={16} />
                    : <FaExclamationCircle style={{ flexShrink: 0, marginTop: '0.1rem' }} size={16} />}
                  <span>{submitMessage}</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)',
          margin: '3rem 0 2.5rem',
        }} />

        {/* Connect on Social — full-width centered below both columns */}
        <div ref={socialRef} style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: 'IBM Plex Mono, monospace',
            color: '#5a5755',
            fontSize: '0.68rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}>
            Connect on Social
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem' }}>
            {socialLinks.map((social, index) => {
              const SocialIcon = social.icon;
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="social-link"
                  style={{
                    width: '3.25rem',
                    height: '3.25rem',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6a6760',
                    textDecoration: 'none',
                    transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    flexShrink: 0,
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.background = `${social.brand}1a`;
                    el.style.borderColor = `${social.brand}55`;
                    el.style.color = social.brand;
                    el.style.transform = 'translateY(-6px) scale(1.18)';
                    el.style.boxShadow = `0 12px 30px ${social.brand}30`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.background = 'rgba(255,255,255,0.03)';
                    el.style.borderColor = 'rgba(255,255,255,0.08)';
                    el.style.color = '#6a6760';
                    el.style.transform = 'translateY(0) scale(1)';
                    el.style.boxShadow = '';
                  }}
                >
                  <SocialIcon size={18} />
                </a>
              );
            })}
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .contact-grid {
          grid-template-columns: 1fr;
        }
        .contact-subtitle {
          margin-left: 0;
        }
        @media (min-width: 1024px) {
          .contact-grid {
            grid-template-columns: 2fr 3fr;
          }
          .contact-subtitle {
            margin-left: 4rem;
          }
        }
        @media (max-width: 640px) {
          .contact-grid {
            gap: 2rem;
          }
          .contact-dark-card {
            padding: 1.25rem !important;
          }
          .stat-item {
            padding: 0 0.25rem;
          }
        }
        @media (max-width: 380px) {
          .contact-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        /* Globe meridian rotation */
        @keyframes globe-spin {
          0%   { transform: scaleX(1); }
          50%  { transform: scaleX(0.1); }
          100% { transform: scaleX(1); }
        }
        .globe-meridian {
          transform-origin: center center;
          animation: globe-spin 3s ease-in-out infinite;
        }

        /* Social icon circles */
        .social-link {
          will-change: transform;
        }

        /* Available dot rings (GSAP animates these) */
        .available-ring {
          will-change: transform, opacity;
        }

        /* Stat icon (GSAP pulses) */
        .stat-icon {
          will-change: transform;
        }

        /* Input icon */
        .input-wrapper {
          position: relative;
        }
        .input-icon {
          position: absolute;
          left: 0.9rem;
          top: 50%;
          transform: translateY(-50%);
          color: #5a5755;
          transition: color 0.3s ease, transform 0.3s ease;
          pointer-events: none;
          display: flex;
          align-items: center;
          z-index: 1;
        }
        .textarea-icon {
          top: 1rem;
          transform: none;
        }
        .input-wrapper:focus-within .input-icon {
          color: #d4af37;
          transform: translateY(-50%) scale(1.15);
        }
        .textarea-wrapper:focus-within .input-icon {
          color: #d4af37;
          transform: scale(1.15);
        }
        .input-with-icon {
          padding-left: 2.6rem !important;
        }

        /* Form column */
        .form-column {
          display: flex;
          flex-direction: column;
        }
        /* Shimmer line at top of both glass cards */
        .info-column::before,
        .form-column::before {
          content: '';
          position: absolute;
          top: 0;
          left: 10%;
          right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,175,55,0.45), transparent);
          pointer-events: none;
        }

        /* Form row — side-by-side Name + Email */
        .form-row {
          display: flex;
          gap: 1rem;
        }
        @media (max-width: 600px) {
          .form-row {
            flex-direction: column;
          }
        }

        /* Submit spinner */
        @keyframes form-spin {
          to { transform: rotate(360deg); }
        }
        .form-spinner {
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: form-spin 0.7s linear infinite;
          flex-shrink: 0;
        }
      `}} />
    </section>
  );
};

export default Contact;