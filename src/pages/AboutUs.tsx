import { useEffect, useRef, useState } from 'react';
import { 
  Target, Eye, Users, Award, TrendingUp, Heart, ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Custom hook for scroll animations
function useScrollAnimation(options: { threshold?: number; rootMargin?: string; triggerOnce?: boolean } = {}) {
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

// Hero Section
function AboutHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/hero-about.jpg)' }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 py-20 max-w-5xl mx-auto">
        <h1 
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6"
          style={{ animation: 'fadeInUp 1s ease-out forwards', animationDelay: '0.2s', opacity: 0 }}
        >
          About <span className="text-gold">Us</span>
        </h1>
        <p 
          className="text-white/70 text-lg sm:text-xl max-w-2xl"
          style={{ animation: 'fadeInUp 1s ease-out forwards', animationDelay: '0.4s', opacity: 0 }}
        >
          We're a team of real estate technology experts dedicated to helping agents succeed.
        </p>
      </div>
    </section>
  );
}

// Our Story Section
function OurStorySection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const stats = [
    { number: '250+', label: 'Agents Served' },
    { number: '4+', label: 'Years Experience' },
    { number: '96%', label: 'Client Retention' },
    { number: '200+', label: 'Markets Covered' },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-black" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <p 
              className="text-gold text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              Our Story
            </p>
            <h2 
              className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white mb-4 sm:mb-6"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
              }}
            >
              Building the Future of <span className="text-gold">Real Estate</span>
            </h2>
            <div className="space-y-3 sm:space-y-4 text-white/60">
              {[
                'NexLeed was founded with a simple mission: to empower real estate professionals with the technology and support they need to thrive in a digital world.',
                'We understand the unique challenges that agents, teams, and brokerages face every day. That\'s why we\'ve built a comprehensive ecosystem of services designed specifically for the real estate industry.',
                'From modern websites and CRM automation to lead generation and dedicated support, we provide everything you need to grow your business under one roof.',
              ].map((text, index) => (
                <p 
                  key={index}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.1}s`,
                  }}
                >
                  {text}
                </p>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-dark-card border border-dark-border rounded-xl p-4 sm:p-6 text-center hover:border-gold/50 transition-all duration-300"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + index * 0.1}s`,
                }}
              >
                <p className="font-display text-3xl sm:text-4xl lg:text-5xl text-gold mb-1 sm:mb-2">{stat.number}</p>
                <p className="text-white/60 text-xs sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Mission & Vision Section
function MissionVisionSection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-dark-card" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Mission */}
          <div 
            className="bg-black border border-dark-border rounded-xl sm:rounded-2xl p-6 sm:p-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(-40px) scale(0.95)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div 
              className="w-12 h-12 sm:w-14 sm:h-14 bg-gold/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0)',
                transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s',
              }}
            >
              <Target className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
            </div>
            <h3 
              className="font-display text-xl sm:text-2xl text-white mb-3 sm:mb-4"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
              }}
            >
              Our Mission
            </h3>
            <p 
              className="text-white/60 text-sm sm:text-base"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
              }}
            >
              To empower real estate professionals with innovative technology solutions 
              that streamline operations, generate quality leads, and drive sustainable 
              business growth. We believe every agent deserves access to world-class 
              tools and support.
            </p>
          </div>

          {/* Vision */}
          <div 
            className="bg-black border border-dark-border rounded-xl sm:rounded-2xl p-6 sm:p-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(40px) scale(0.95)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
            }}
          >
            <div 
              className="w-12 h-12 sm:w-14 sm:h-14 bg-gold/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0)',
                transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.35s',
              }}
            >
              <Eye className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
            </div>
            <h3 
              className="font-display text-xl sm:text-2xl text-white mb-3 sm:mb-4"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.45s',
              }}
            >
              Our Vision
            </h3>
            <p 
              className="text-white/60 text-sm sm:text-base"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.55s',
              }}
            >
              To become the leading technology partner for real estate professionals 
              worldwide, known for our innovation, reliability, and unwavering commitment 
              to client success. We envision a future where every agent has the tools 
              they need to excel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Values Section
function ValuesSection() {
  const values = [
    {
      icon: Users,
      title: 'Client First',
      description: 'Your success is our priority. We listen, adapt, and deliver solutions that meet your unique needs.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We hold ourselves to the highest standards in everything we do, from design to support.',
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'We stay ahead of industry trends to bring you cutting-edge solutions that drive results.',
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'Transparency and honesty guide every interaction. No hidden fees, no surprises.',
    },
  ];

  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);

  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          headerObserver.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -50px 0px' }
    );

    const gridObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGridVisible(true);
          gridObserver.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (headerRef.current) headerObserver.observe(headerRef.current);
    if (gridRef.current) gridObserver.observe(gridRef.current);

    return () => {
      headerObserver.disconnect();
      gridObserver.disconnect();
    };
  }, []);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white mb-3 sm:mb-4">
            Our <span className="text-gold">Values</span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
            The principles that guide everything we do.
          </p>
        </div>

        {/* Values Grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="group bg-dark-card border border-dark-border rounded-xl p-5 sm:p-6 hover:border-gold/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-gold/10"
              style={{
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
              }}
            >
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-gold/20 transition-colors duration-300"
                style={{
                  opacity: gridVisible ? 1 : 0,
                  transform: gridVisible ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-180deg)',
                  transition: `all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${0.2 + index * 0.1}s`,
                }}
              >
                <value.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
              </div>
              <h3 className="font-display text-lg sm:text-xl text-white mb-2 sm:mb-3">{value.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Team Section
function TeamSection() {
  const team = [
    {
      name: 'Leo Rodriguez',
      role: 'Founder & CEO',
      image: '/assets/Leo Rodriguez.jpg',
    },
    {
      name: 'Bruce Myers',
      role: 'Head of Operations',
      image: '/assets/Marcus Aurelius.jpg',
    },
    {
      name: 'Sean Murphy',
      role: 'Research & Development Engineer',
      image: '/assets/Sean Murphy.png',
    },
    {
      name: 'Amy West',
      role: 'Marketing Director',
      image: '/assets/Lakshmiraj Pande.jpg',
    },
  ];

  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);

  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          headerObserver.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -50px 0px' }
    );

    const gridObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGridVisible(true);
          gridObserver.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (headerRef.current) headerObserver.observe(headerRef.current);
    if (gridRef.current) gridObserver.observe(gridRef.current);

    return () => {
      headerObserver.disconnect();
      gridObserver.disconnect();
    };
  }, []);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-dark-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white mb-3 sm:mb-4">
            Meet Our <span className="text-gold">Team</span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
            The talented people behind NexLeed's success.
          </p>
        </div>

        {/* Team Grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="group text-center"
              style={{
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? 'translateY(0)' : 'translateY(50px)',
                transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.12}s`,
              }}
            >
              <div 
                className="relative mb-3 sm:mb-4 overflow-hidden rounded-xl sm:rounded-2xl"
                style={{
                  opacity: gridVisible ? 1 : 0,
                  transform: gridVisible ? 'scale(1)' : 'scale(0.9)',
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.12}s`,
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className={`w-full h-56 sm:h-64 object-cover transition-transform duration-500 ${
                    index <= 1 ? 'object-[top] group-hover:scale-105' :
                    index === 2 ? 'object-top group-hover:scale-105' :
                    'object-top group-hover:scale-105'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h4 
                className="text-white font-medium text-base sm:text-lg"
                style={{
                  opacity: gridVisible ? 1 : 0,
                  transform: gridVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + index * 0.12}s`,
                }}
              >{member.name}</h4>
              <p 
                className="text-gold text-sm"
                style={{
                  opacity: gridVisible ? 1 : 0,
                  transform: gridVisible ? 'translateY(0)' : 'translateY(15px)',
                  transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.4 + index * 0.12}s`,
                }}
              >{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function AboutCTA() {
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation({ threshold: 0.4 });

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-black" ref={ctaRef}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 
          className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white mb-4 sm:mb-6"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          Ready to Work <span className="text-gold">Together</span>?
        </h2>
        <p 
          className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-10"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
        >
          Let's discuss how NexLeed can help you achieve your real estate goals.
        </p>
        <Link
          to="/contact-us"
          className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gold text-black font-medium rounded-full hover:bg-gold-light transition-all duration-300 hover:scale-105 hover:shadow-gold-lg text-sm sm:text-base"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          }}
        >
          Get in Touch
          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
        </Link>
      </div>
    </section>
  );
}

// Main AboutUs Page
export function AboutUs() {
  return (
    <div className="min-h-screen bg-black">
      <AboutHero />
      <OurStorySection />
      <MissionVisionSection />
      <ValuesSection />
      <TeamSection />
      <AboutCTA />
    </div>
  );
}
