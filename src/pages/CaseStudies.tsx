import { useEffect, useRef, useState } from 'react';
import { 
  ArrowUpRight, Check
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
function CaseStudiesHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/hero-services.jpg)' }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 py-20 max-w-5xl mx-auto">
        <h1 
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6"
          style={{ animation: 'fadeInUp 1s ease-out forwards', animationDelay: '0.2s', opacity: 0 }}
        >
          Case <span className="text-gold">Studies</span>
        </h1>
        <p 
          className="text-white/70 text-lg sm:text-xl max-w-2xl"
          style={{ animation: 'fadeInUp 1s ease-out forwards', animationDelay: '0.4s', opacity: 0 }}
        >
          A closer look at the work we do and the results we help create.
        </p>
      </div>
    </section>
  );
}

// Intro Section
function IntroSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h2 
            className="font-display text-2xl sm:text-3xl lg:text-4xl text-white mb-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            Each <span className="text-gold">project</span> reflects a simple goal:
          </h2>
          
          <h3 
            className="font-display text-xl sm:text-2xl lg:text-3xl text-white mb-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            To give real estate professionals the clarity, structure, and tools they need to work <span className="text-gold">efficiently.</span>
          </h3>
          
          <div 
            className="w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
          />
          
          <p 
            className="text-white/60 text-base sm:text-lg"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
            }}
          >
            Here are a few examples of how our solutions have supported agents in different markets.
          </p>
        </div>
      </div>
    </section>
  );
}

// Individual Case Study Component with Animation
function CaseStudyItem({ study, index }: { study: any; index: number }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start"
    >
      {/* Image */}
      <div className={isEven ? '' : 'lg:order-2'}>
        <a
          href={study.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative rounded-xl sm:rounded-2xl overflow-hidden border border-dark-border hover:border-gold/30 transition-all duration-500 group"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0) scale(1)' : `translateX(${isEven ? '-40px' : '40px'}) scale(0.95)`,
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <img
            src={study.image}
            alt={study.title}
            className={`w-full h-72 sm:h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-700 ${study.title.includes('CRM') ? 'object-left' : ''}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Stats Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {study.stats.map((stat: any, sIndex: number) => (
                <div 
                  key={sIndex} 
                  className="text-center"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + sIndex * 0.1}s`,
                  }}
                >
                  <p className="font-display text-xl sm:text-2xl lg:text-3xl text-gold">{stat.value}</p>
                  <p className="text-white/60 text-xs">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </a>
      </div>

      {/* Content */}
      <div className={isEven ? '' : 'lg:order-1'}>
        <div 
          className="flex items-center space-x-2 mb-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
          }}
        >
          <span className="px-3 py-1 bg-gold/10 text-gold text-xs font-medium rounded-full">
            {study.category}
          </span>
          <span className="text-white/40 text-sm">{study.location}</span>
        </div>
        
        <h3 
          className="font-display text-xl sm:text-2xl lg:text-3xl text-white mb-2"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}
        >
          {study.title}
        </h3>
        
        <p 
          className="text-gold text-lg mb-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.25s',
          }}
        >
          {study.subtitle}
        </p>
        
        <p 
          className="text-white/60 mb-6 sm:mb-8 whitespace-pre-line"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          }}
        >
          {study.description}
        </p>

        {/* Features */}
        <div 
          className="mb-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : `translateX(${isEven ? '-20px' : '20px'})`,
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
          }}
        >
          <h4 className="text-white font-medium mb-3 flex items-center">
            <Check className="w-4 h-4 text-gold mr-2" />
            Key Features
          </h4>
          <ul className="space-y-2">
            {study.features.map((item: string, cIndex: number) => (
              <li 
                key={cIndex} 
                className="flex items-center space-x-2 text-white/60 text-sm"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : `translateX(${isEven ? '-15px' : '15px'})`,
                  transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + cIndex * 0.08}s`,
                }}
              >
                <span className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Case Studies List Section
function CaseStudiesList() {
  const caseStudies = [
    {
      image: '/assets/case-dewayne.png',
      title: 'Dewayne Upchurch',
      subtitle: 'Realtor Website Design',
      category: 'Website Design',
      location: 'Premium Portfolio',
      description: `A modern portfolio experience crafted for a high-end real estate professional.

The site elevates DeWayne's premium listings, local expertise, and personalized services through a clean, refined layout.

Designed for speed, mobile responsiveness, and visual impact, the platform creates a smooth, luxurious browsing experience that builds trust and supports effortless lead generation.`,
      link: 'https://dewayneupchurch.com',
      stats: [
        { value: '3x', label: 'Lead Increase' },
        { value: '40%', label: 'Faster Load' },
        { value: '100%', label: 'Mobile Ready' },
      ],
      features: [
        'Premium listing showcase',
        'Local expertise highlights',
        'Mobile-first responsive design',
        'Fast loading optimized',
      ],
    },
    {
      image: '/assets/Luxury Experience.png',
      title: 'Real Estate 360',
      subtitle: 'Realtor Website Design',
      category: 'Branding',
      location: 'Investment Consultant',
      description: `A personal branding website built for a consultant specializing in real estate investments and joint ventures.

The design highlights credibility and expertise through strong hero visuals, structured service insights, and elegant branded sections.

The layout balances storytelling with a high-end consulting aesthetic, positioning the agent as a trusted authority in the real estate advisory space.`,
      link: 'https://realestatesite-bay.vercel.app/',
      stats: [
        { value: '5x', label: 'Engagement' },
        { value: '60%', label: 'More Leads' },
        { value: 'Premium', label: 'Brand Look' },
      ],
      features: [
        'Strong hero visuals',
        'Service insights section',
        'Elegant branded design',
        'Authority positioning',
      ],
    },
    {
      image: '/assets/case-jessica.png',
      title: 'Jessica Arias',
      subtitle: 'Realtor Website Design',
      category: 'Landing Platform',
      location: 'Property Showcase',
      description: `A dedicated landing platform engineered for showcasing property listings with clarity and confidence.

This design features a bold hero section, focused property modules, trust indicators, and intuitive CTAs.

Optimized for both desktop and mobile, it empowers agents to present listings beautifully, build trust quickly, and convert qualified leads with ease.`,
      link: 'https://jessicaarias.net',
      stats: [
        { value: '2.5x', label: 'Conversion' },
        { value: '50%', label: 'Bounce Rate' },
        { value: 'Mobile', label: 'Optimized' },
      ],
      features: [
        'Bold hero section',
        'Property modules',
        'Trust indicators',
        'Intuitive CTAs',
      ],
    },
    {
      image: '/assets/CRM.png',
      title: 'AI-Powered CRM Dashboard',
      subtitle: 'Real Estate CRM',
      category: 'CRM System',
      location: 'Workflow Automation',
      description: `A conceptual CRM dashboard designed to simplify the daily workflow of real estate professionals.

Built around smart lead tracking, automated reminders, analytics, and client management, the platform blends clean UI with powerful functionality.

The interface focuses on clarity, speed, and ease of use—helping agents stay organized and operate efficiently with minimal friction.`,
      link: '/services/streamlined-systems',
      stats: [
        { value: '10x', label: 'Efficiency' },
        { value: 'AI', label: 'Powered' },
        { value: '24/7', label: 'Automation' },
      ],
      features: [
        'Smart lead tracking',
        'Automated reminders',
        'Analytics dashboard',
        'Client management',
      ],
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-dark-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Success <span className="text-gold">Stories</span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
            Real results from real clients. See how we've helped agents transform their businesses.
          </p>
        </div>

        {/* Case Studies */}
        <div className="space-y-20 sm:space-y-24 lg:space-y-32">
          {caseStudies.map((study, index) => (
            <CaseStudyItem key={index} study={study} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CaseStudiesCTA() {
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation({ threshold: 0.4 });

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-black" ref={ctaRef}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 
          className="font-display text-2xl sm:text-3xl lg:text-4xl text-white mb-6"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          Great systems don't just look good—they make your work <span className="text-gold">easier,</span> your brand <span className="text-gold">stronger,</span> and your communication <span className="text-gold">clearer.</span>
        </h2>
        
        <p 
          className="text-white/60 text-base sm:text-lg mb-8"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
        >
          Every project begins with understanding how an agent works, then building solutions that feel natural, clear, and reliable.
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
          Get Started
          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
        </Link>
      </div>
    </section>
  );
}

// Main CaseStudies Page
export function CaseStudies() {
  return (
    <div className="min-h-screen bg-black">
      <CaseStudiesHero />
      <IntroSection />
      <CaseStudiesList />
      <CaseStudiesCTA />
    </div>
  );
}
