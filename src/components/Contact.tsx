'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
  FaClock,
  FaCalendarAlt
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

      // Social links — own trigger
      const socialLinks = socialRef.current?.querySelectorAll('.social-link');
      if (socialLinks && socialLinks.length > 0) {
        gsap.from(socialLinks, {
          opacity: 0,
          scale: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          immediateRender: false,
          scrollTrigger: {
            trigger: socialRef.current,
            start: 'top 90%',
          },
        });
      }

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
    { icon: FaGithub, url: 'https://github.com/hammadayub34', label: 'GitHub', color: 'hover:text-white' },
    { icon: FaLinkedin, url: 'https://linkedin.com/in/hammadayub34', label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: FaTwitter, url: 'https://twitter.com', label: 'Twitter', color: 'hover:text-sky-400' },
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
        <div ref={titleRef} style={{ marginBottom: '4rem' }}>
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
              05.
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
            fontFamily: 'Archivo, sans-serif',
          }}>
            Have a project in mind or just want to chat? I&apos;m always open to discussing new opportunities, creative ideas, or partnerships.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gap: '3rem',
        }}
          className="contact-grid"
        >
          {/* Contact Information Sidebar - shown first on mobile */}
          <div ref={infoRef} className="info-column" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
                return (
                <div
                  key={index}
                  className="info-card"
                  style={{
                    padding: '1.25rem',
                    background: '#161616',
                    border: '1px solid rgba(212, 175, 55, 0.12)',
                    borderLeft: '3px solid rgba(212, 175, 55, 0.6)',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.1)';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                  }}>
                    <div style={{
                      width: '3rem',
                      height: '3rem',
                      flexShrink: 0,
                      background: 'rgba(212, 175, 55, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#d4af37',
                      transition: 'all 0.3s ease',
                    }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#d4af37';
                        e.currentTarget.style.color = '#0d0d0d';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)';
                        e.currentTarget.style.color = '#d4af37';
                      }}
                    >
                      <IconComponent size={20} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{
                        color: '#f5f1e8',
                        fontFamily: 'Archivo, sans-serif',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        marginBottom: '0.25rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                      }}>
                        {info.title}
                      </h4>
                      {info.link ? (
                        <a
                          href={info.link}
                          style={{
                            color: '#b8b4a8',
                            transition: 'color 0.3s ease',
                            display: 'block',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            textDecoration: 'none',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#d4af37';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = '#b8b4a8';
                          }}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p style={{
                          color: '#b8b4a8',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}>{info.value}</p>
                      )}
                      <p style={{
                        color: '#8a8780',
                        fontSize: '0.75rem',
                        marginTop: '0.25rem',
                        fontFamily: 'IBM Plex Mono, monospace',
                      }}>
                        {info.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
              })}
            </div>

            {/* Social Media Links */}
            <div ref={socialRef} className="contact-dark-card" style={{
              padding: '1.5rem',
              background: '#161616',
              border: '1px solid rgba(212, 175, 55, 0.1)',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}>
              <h4 style={{
                color: '#f5f1e8',
                fontFamily: 'Crimson Pro, serif',
                fontSize: '1.125rem',
                marginBottom: '1rem',
              }}>
                Connect on Social
              </h4>
              <div style={{ display: 'flex', gap: '1rem' }}>
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
                      width: '3rem',
                      height: '3rem',
                      background: 'rgba(212, 175, 55, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#b8b4a8',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#d4af37';
                      e.currentTarget.style.color = '#0d0d0d';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)';
                      e.currentTarget.style.color = '#b8b4a8';
                    }}
                  >
                    <SocialIcon size={20} />
                  </a>
                );
                })}
              </div>
            </div>

            {/* Response Stats */}
            <div ref={statsRef} className="contact-dark-card" style={{
              padding: '1.5rem',
              background: '#161616',
              border: '1px solid rgba(212, 175, 55, 0.15)',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}>
              <h4 style={{
                color: '#f5f1e8',
                fontFamily: 'Crimson Pro, serif',
                fontSize: '1.125rem',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <div className="animate-pulse-glow" style={{
                  width: '0.5rem',
                  height: '0.5rem',
                  borderRadius: '50%',
                  background: '#d4af37',
                }}></div>
                Currently Available
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                marginBottom: '1rem',
              }}>
                {responseStats.map((stat, index) => {
                  const StatIcon = stat.icon;
                  return (
                  <div key={index} className="stat-item" style={{ textAlign: 'center' }}>
                    <StatIcon style={{
                      margin: '0 auto',
                      color: '#d4af37',
                      marginBottom: '0.5rem',
                    }} size={20} />
                    <div style={{
                      color: '#f5f1e8',
                      fontFamily: 'Crimson Pro, serif',
                      fontWeight: 700,
                      fontSize: '1.125rem',
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      color: '#8a8780',
                      fontSize: '0.75rem',
                      fontFamily: 'IBM Plex Mono, monospace',
                      marginTop: '0.25rem',
                    }}>
                      {stat.label}
                    </div>
                  </div>
                );
                })}
              </div>
              <p style={{
                color: '#b8b4a8',
                fontSize: '0.875rem',
                lineHeight: 1.8,
                borderTop: '1px solid rgba(212, 175, 55, 0.2)',
                paddingTop: '1rem',
              }}>
                I&apos;m currently available for freelance projects and full-time opportunities. Let&apos;s build something amazing together!
              </p>
            </div>

            {/* Quick Note */}
            <div className="contact-dark-card" style={{
              padding: '1rem',
              background: '#161616',
              borderLeft: '4px solid #d4af37',
              borderRadius: '4px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}>
              <p style={{
                color: '#b8b4a8',
                fontSize: '0.875rem',
                fontFamily: 'IBM Plex Mono, monospace',
                fontStyle: 'italic',
              }}>
                &quot;The best way to predict the future is to create it.&quot; - Let&apos;s create yours together.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="form-column">
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{
                fontSize: '1.875rem',
                fontFamily: 'Crimson Pro, serif',
                color: '#f5f1e8',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}>
                <FaPaperPlane style={{ color: '#d4af37' }} />
                Send Me a Message
              </h3>
              <p style={{
                color: '#b8b4a8',
                lineHeight: 1.8,
              }}>
                I&apos;m always interested in hearing about new projects and opportunities.
                Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you within 24 hours!
              </p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Name Input */}
              <div className="form-group">
                <label
                  htmlFor="name"
                  style={{
                    display: 'block',
                    color: '#f5f1e8',
                    fontFamily: 'Archivo, sans-serif',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  Your Name *
                </label>
                <input
                  suppressHydrationWarning
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: '#161616',
                    border: errors.name && touched.name ? '1px solid #ef4444' : '1px solid rgba(212, 175, 55, 0.2)',
                    borderRadius: '4px',
                    color: '#f5f1e8',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    fontFamily: 'Archivo, sans-serif',
                  }}
                  placeholder="John Doe"
                  onFocus={(e) => {
                    if (!errors.name || !touched.name) {
                      e.currentTarget.style.borderColor = '#d4af37';
                    }
                  }}
                  onBlur={(e) => {
                    handleBlur(e);
                    if (!errors.name || !touched.name) {
                      e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.2)';
                    }
                  }}
                />
                {errors.name && touched.name && (
                  <p style={{
                    marginTop: '0.5rem',
                    color: '#f87171',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontFamily: 'IBM Plex Mono, monospace',
                  }}>
                    <FaExclamationCircle size={14} />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div className="form-group">
                <label
                  htmlFor="email"
                  style={{
                    display: 'block',
                    color: '#f5f1e8',
                    fontFamily: 'Archivo, sans-serif',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  Your Email *
                </label>
                <input
                  suppressHydrationWarning
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: '#161616',
                    border: errors.email && touched.email ? '1px solid #ef4444' : '1px solid rgba(212, 175, 55, 0.2)',
                    borderRadius: '4px',
                    color: '#f5f1e8',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    fontFamily: 'Archivo, sans-serif',
                  }}
                  placeholder="john@example.com"
                  onFocus={(e) => {
                    if (!errors.email || !touched.email) {
                      e.currentTarget.style.borderColor = '#d4af37';
                    }
                  }}
                  onBlur={(e) => {
                    handleBlur(e);
                    if (!errors.email || !touched.email) {
                      e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.2)';
                    }
                  }}
                />
                {errors.email && touched.email && (
                  <p style={{
                    marginTop: '0.5rem',
                    color: '#f87171',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontFamily: 'IBM Plex Mono, monospace',
                  }}>
                    <FaExclamationCircle size={14} />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message Textarea */}
              <div className="form-group">
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem',
                }}>
                  <label
                    htmlFor="message"
                    style={{
                      display: 'block',
                      color: '#f5f1e8',
                      fontFamily: 'Archivo, sans-serif',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    Your Message *
                  </label>
                  <span style={{
                    fontSize: '0.75rem',
                    fontFamily: 'IBM Plex Mono, monospace',
                    color: charCount > maxCharCount ? '#f87171' : '#8a8780',
                  }}>
                    {charCount}/{maxCharCount}
                  </span>
                </div>
                <textarea
                  suppressHydrationWarning
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: '#161616',
                    border: errors.message && touched.message ? '1px solid #ef4444' : '1px solid rgba(212, 175, 55, 0.2)',
                    borderRadius: '4px',
                    color: '#f5f1e8',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    resize: 'none',
                    fontFamily: 'Archivo, sans-serif',
                  }}
                  placeholder="Hello! I'd like to discuss..."
                  onFocus={(e) => {
                    if (!errors.message || !touched.message) {
                      e.currentTarget.style.borderColor = '#d4af37';
                    }
                  }}
                  onBlur={(e) => {
                    handleBlur(e);
                    if (!errors.message || !touched.message) {
                      e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.2)';
                    }
                  }}
                />
                {errors.message && touched.message && (
                  <p style={{
                    marginTop: '0.5rem',
                    color: '#f87171',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontFamily: 'IBM Plex Mono, monospace',
                  }}>
                    <FaExclamationCircle size={14} />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                suppressHydrationWarning
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '1rem 2rem',
                  opacity: isSubmitting ? 0.5 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  overflow: 'hidden',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                }}>
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </span>
              </button>

              {/* Status Messages */}
              {submitMessage && (
                <div
                  className="animate-fade-in"
                  style={{
                    padding: '1rem',
                    border: `1px solid ${submitStatus === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                    borderRadius: '4px',
                    fontFamily: 'Archivo, sans-serif',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    background: submitStatus === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    color: submitStatus === 'success' ? '#4ade80' : '#f87171',
                  }}
                >
                  {submitStatus === 'success' ? (
                    <FaCheckCircle style={{ marginTop: '0.125rem', flexShrink: 0 }} size={18} />
                  ) : (
                    <FaExclamationCircle style={{ marginTop: '0.125rem', flexShrink: 0 }} size={18} />
                  )}
                  <span>{submitMessage}</span>
                </div>
              )}
            </form>
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
      `}} />
    </section>
  );
};

export default Contact;