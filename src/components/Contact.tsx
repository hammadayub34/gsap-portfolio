'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsapConfig';
import { ContactForm } from '@/types';
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
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      tl.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      })
      .from(formRef.current?.querySelectorAll('.form-group') || [], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
      }, '-=0.5')
      .from(infoRef.current?.querySelectorAll('.info-card') || [], {
        opacity: 0,
        x: 50,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      }, '-=0.6')
      .from(socialRef.current?.querySelectorAll('.social-link') || [], {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      }, '-=0.4')
      .from(statsRef.current?.querySelectorAll('.stat-item') || [], {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      }, '-=0.3');
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

    if (formRef.current) {
      const tl = gsap.timeline();
      tl.to(formRef.current, { x: -10, duration: 0.05 })
        .to(formRef.current, { x: 10, duration: 0.05 })
        .to(formRef.current, { x: -10, duration: 0.05 })
        .to(formRef.current, { x: 10, duration: 0.05 })
        .to(formRef.current, { x: 0, duration: 0.05 });
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
    } catch (error) {
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
      value: 'your.email@example.com',
      link: 'mailto:your.email@example.com',
      description: 'Best way to reach me',
      color: 'from-accent/20 to-accent/10',
    },
    {
      icon: FaPhone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
      description: 'Mon-Fri, 9AM-6PM PST',
      color: 'from-accent/15 to-accent/5',
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Location',
      value: 'San Francisco, CA',
      link: null,
      description: 'Available for remote work',
      color: 'from-accent/10 to-transparent',
    },
  ];

  const socialLinks = [
    { icon: FaGithub, url: 'https://github.com', label: 'GitHub', color: 'hover:text-white' },
    { icon: FaLinkedin, url: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:text-blue-400' },
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
      className="py-20 px-6 min-h-screen flex items-center relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-20"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Title */}
        <div ref={titleRef} className="mb-16">
          <h2 className="text-textPrimary flex items-center mb-4">
            <span className="font-mono text-accent text-2xl mr-4">04.</span>
            <span className="font-display text-5xl font-bold">Get In Touch</span>
            <span className="ml-8 h-px bg-textSecondary/30 flex-1 max-w-xs"></span>
          </h2>
          <p className="text-textSecondary text-lg max-w-2xl ml-16 font-body">
            Have a project in mind or just want to chat? I'm always open to discussing new opportunities, creative ideas, or partnerships.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Form - Takes 3 columns */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h3 className="text-3xl font-display text-textPrimary mb-4 flex items-center gap-3">
                <FaPaperPlane className="text-accent" />
                Send Me a Message
              </h3>
              <p className="text-textSecondary leading-relaxed">
                I'm always interested in hearing about new projects and opportunities. 
                Whether you have a question or just want to say hi, I'll try my best to get back to you within 24 hours!
              </p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="form-group">
                <label
                  htmlFor="name"
                  className="block text-textPrimary font-body font-semibold text-sm mb-2 uppercase tracking-wider"
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`w-full px-4 py-3 bg-secondary/50 border ${
                    errors.name && touched.name
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-accent/20 focus:border-accent'
                  } text-textPrimary focus:outline-none transition-all duration-300 backdrop-blur-sm`}
                  placeholder="John Doe"
                />
                {errors.name && touched.name && (
                  <p className="mt-2 text-red-400 text-sm flex items-center gap-2 font-mono">
                    <FaExclamationCircle size={14} />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div className="form-group">
                <label
                  htmlFor="email"
                  className="block text-textPrimary font-body font-semibold text-sm mb-2 uppercase tracking-wider"
                >
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`w-full px-4 py-3 bg-secondary/50 border ${
                    errors.email && touched.email
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-accent/20 focus:border-accent'
                  } text-textPrimary focus:outline-none transition-all duration-300 backdrop-blur-sm`}
                  placeholder="john@example.com"
                />
                {errors.email && touched.email && (
                  <p className="mt-2 text-red-400 text-sm flex items-center gap-2 font-mono">
                    <FaExclamationCircle size={14} />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message Textarea */}
              <div className="form-group">
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="message"
                    className="block text-textPrimary font-body font-semibold text-sm uppercase tracking-wider"
                  >
                    Your Message *
                  </label>
                  <span className={`text-xs font-mono ${
                    charCount > maxCharCount ? 'text-red-400' : 'text-textMuted'
                  }`}>
                    {charCount}/{maxCharCount}
                  </span>
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  rows={6}
                  className={`w-full px-4 py-3 bg-secondary/50 border ${
                    errors.message && touched.message
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-accent/20 focus:border-accent'
                  } text-textPrimary focus:outline-none transition-all duration-300 resize-none backdrop-blur-sm`}
                  placeholder="Hello! I'd like to discuss..."
                />
                {errors.message && touched.message && (
                  <p className="mt-2 text-red-400 text-sm flex items-center gap-2 font-mono">
                    <FaExclamationCircle size={14} />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full px-8 py-4 bg-accent text-primary hover:bg-accent-light transition-all duration-300 font-body font-bold shadow-gold hover:shadow-gold-lg disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden uppercase tracking-wider"
              >
                <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <span className="relative flex items-center justify-center gap-3">
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
                  className={`p-4 border backdrop-blur-sm font-body text-sm flex items-start gap-3 animate-fade-in ${
                    submitStatus === 'success'
                      ? 'bg-green-500/10 border-green-500/30 text-green-400'
                      : 'bg-red-500/10 border-red-500/30 text-red-400'
                  }`}
                >
                  {submitStatus === 'success' ? (
                    <FaCheckCircle className="mt-0.5 flex-shrink-0" size={18} />
                  ) : (
                    <FaExclamationCircle className="mt-0.5 flex-shrink-0" size={18} />
                  )}
                  <span>{submitMessage}</span>
                </div>
              )}
            </form>
          </div>

          {/* Contact Information Sidebar - Takes 2 columns */}
          <div ref={infoRef} className="lg:col-span-2 space-y-6">
            {/* Contact Cards */}
            <div className="space-y-4">
              <h3 className="text-xl font-display text-textPrimary mb-4">
                Contact Information
              </h3>
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className={`info-card p-5 bg-gradient-to-br ${info.color} border border-accent/10 hover:border-accent/30 transition-all duration-300 group cursor-pointer`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex-shrink-0 bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-300">
                      <info.icon size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-textPrimary font-body font-semibold text-sm mb-1 uppercase tracking-wider">
                        {info.title}
                      </h4>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-textSecondary hover:text-accent transition-colors duration-300 block truncate"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-textSecondary truncate">{info.value}</p>
                      )}
                      <p className="text-textMuted text-xs mt-1 font-mono">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media Links */}
            <div ref={socialRef} className="p-6 bg-secondary/30 border border-accent/10">
              <h4 className="text-textPrimary font-display text-lg mb-4">
                Connect on Social
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`social-link w-12 h-12 bg-accent/10 flex items-center justify-center text-textSecondary hover:bg-accent hover:text-primary transition-all duration-300 group ${social.color}`}
                  >
                    <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            {/* Response Stats */}
            <div ref={statsRef} className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
              <h4 className="text-textPrimary font-display text-lg mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                Currently Available
              </h4>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {responseStats.map((stat, index) => (
                  <div key={index} className="stat-item text-center">
                    <stat.icon className="mx-auto text-accent mb-2" size={20} />
                    <div className="text-textPrimary font-display font-bold text-lg">
                      {stat.value}
                    </div>
                    <div className="text-textMuted text-xs font-mono mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-textSecondary text-sm leading-relaxed border-t border-accent/20 pt-4">
                I'm currently available for freelance work and full-time opportunities. Let's build something amazing together!
              </p>
            </div>

            {/* Quick Note */}
            <div className="p-4 bg-accent/5 border-l-4 border-accent">
              <p className="text-textSecondary text-sm font-mono italic">
                "The best way to predict the future is to create it." - Let's create yours together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;