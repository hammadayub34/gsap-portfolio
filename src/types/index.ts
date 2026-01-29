export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'other';
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  description: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}
