import { useEffect, useRef, useState } from 'react';
import { 
  Check, Zap, Settings, Target, BarChart3, Users, MessageSquare, ArrowUpRight, MapPin, ChevronRight
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
function ServicesHero() {
  return (
    <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/hero-services.jpg)' }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
        <h1 
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-4 sm:mb-6"
          style={{ animation: 'fadeInUp 1s ease-out forwards', animationDelay: '0.2s', opacity: 0 }}
        >
          Our <span className="text-gold">Services</span>
        </h1>
        <p 
          className="text-white/70 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto"
          style={{ animation: 'fadeInUp 1s ease-out forwards', animationDelay: '0.4s', opacity: 0 }}
        >
          Thoughtfully crafted solutions designed to support modern real estate professionals.
        </p>
      </div>
    </section>
  );
}

// Services List Section
function ServicesList() {
  const services = [
    {
      icon: Zap,
      title: 'Modern Websites',
      subtitle: 'for Real Estate',
      description: 'Clean, fast, and purpose-driven websites built to highlight your brand and create a seamless experience for your clients.',
      features: ['Custom Layouts', 'Property Focused', 'Mobile Ready Pages', 'Fast & Secure Performance'],
      image: '/assets/service-website.jpg',
      link: '/services/modern-websites',
    },
    {
      icon: MapPin,
      title: 'GBP SEO',
      subtitle: '& Local Optimization',
      description: 'Comprehensive Google Business Profile optimization and local SEO strategies to dominate local search results and attract nearby clients actively searching for your services.',
      features: ['Profile Optimization', 'Local Rank Tracking', 'Review Management', 'Google Maps Visibility'],
      image: '/assets/service-crm.jpg',
      link: '/services/gbp-seo',
    },
    {
      icon: Settings,
      title: 'Streamlined Systems',
      subtitle: 'and Workflows',
      description: 'Organized pipelines and automated follow-ups that help agents manage clients with more structure and less effort.',
      features: ['Lead Routing', 'Smart Follow ups', 'Appointment Flows', 'Centralized Communication'],
      image: '/assets/service-gbp-seo.jpg',
      link: '/services/streamlined-systems',
    },
    {
      icon: Target,
      title: 'Exclusive Buyer',
      subtitle: '& Seller Leads',
      description: 'Targeted campaigns and data-driven processes designed to deliver high-intent inquiries directly to you.',
      features: ['Verified Leads', 'Market Specific Targeting', 'No Shared Leads', 'Simple Intake Process'],
      image: '/assets/service-leads.jpg',
      link: '/services/exclusive-leads',
    },
    {
      icon: BarChart3,
      title: 'Performance-Driven',
      subtitle: 'Advertising',
      description: 'Well-structured campaigns across major platforms to help agents increase visibility and generate consistent opportunities.',
      features: ['Facebook & Instagram', 'Google & Youtube', 'Conversion Based Setup', 'Ongoing Optimization'],
      image: '/assets/service-ads.jpg',
      link: '/services/performance-advertising',
    },
    {
      icon: Users,
      title: 'Dedicated Support',
      subtitle: 'for Daily Operations',
      description: 'Trained assistants who help maintain your CRM, manage follow-ups, and support your day-to-day communication.',
      features: ['CRM Updates', 'Lead Qualification', 'Appointment', 'Admin Support'],
      image: '/assets/service-support.jpg',
      link: '/services/dedicated-support',
    },
    {
      icon: MessageSquare,
      title: 'Consistent, Brand-Aligned',
      subtitle: 'Content',
      description: 'Simple, effective content that strengthens your presence and keeps your brand active across social platforms.',
      features: ['Posts & Stories', 'Brand Consistency', 'Scheduling', 'Light Engagement Support'],
      image: '/assets/service-content.jpg',
      link: '/services/brand-content',
    },
  ];

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={headerRef}
          className="text-center mb-12 sm:mb-16"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <p className="text-white text-base sm:text-lg lg:text-xl mb-2">
            We help <span className="text-gold">Agents, Teams, and Brokerages</span> strengthen their
          </p>
          <p className="text-white/60 text-sm sm:text-base mb-2">
            digital presence with structured, reliable, and well-designed systems.
          </p>
          <p className="text-white/60 text-xs sm:text-sm">
            Every service is built with clarity, efficiency, and long-term growth in mind.
          </p>
        </div>

        {/* Services Grid */}
        <div className="space-y-16 sm:space-y-20 lg:space-y-24">
          {services.map((service, index) => (
            <ServiceItem key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Individual Service Item with Animation
function ServiceItem({ service, index }: { service: any; index: number }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const isEven = index % 2 === 0;

  const content = (
    <>
      {/* Content */}
      <div className={isEven ? '' : 'lg:order-2'}>
        <div 
          className="flex items-center space-x-3 mb-4 sm:mb-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : `translateX(${isEven ? '-30px' : '30px'})`,
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gold/10 rounded-xl flex items-center justify-center">
            <service.icon className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
          </div>
          {service.link && (
            <span className="text-gold text-sm font-medium flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Learn More <ChevronRight className="w-4 h-4 ml-1" />
            </span>
          )}
        </div>
        <h3 
          className="font-display text-2xl sm:text-3xl lg:text-4xl text-white mb-3 sm:mb-4 group-hover:text-gold transition-colors duration-300"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : `translateX(${isEven ? '-30px' : '30px'})`,
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
          }}
        >
          {service.title} <span className="text-gold">{service.subtitle}</span>
        </h3>
        <p 
          className="text-white/60 text-base sm:text-lg mb-6 sm:mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : `translateX(${isEven ? '-30px' : '30px'})`,
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}
        >
          {service.description}
        </p>
        <ul className="space-y-2 sm:space-y-3">
          {service.features.map((feature: string, fIndex: number) => (
            <li 
              key={fIndex} 
              className="flex items-center space-x-3 text-white/70 text-sm sm:text-base"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : `translateX(${isEven ? '-20px' : '20px'})`,
                transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + fIndex * 0.1}s`,
              }}
            >
              <div className="w-5 h-5 bg-gold/20 rounded flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-gold" />
              </div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Image */}
      <div className={isEven ? '' : 'lg:order-1'}>
        <div 
          className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-dark-border hover:border-gold/30 transition-all duration-500 group/image"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0) scale(1)' : `translateX(${isEven ? '40px' : '-40px'}) scale(0.95)`,
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}
        >
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-64 sm:h-80 lg:h-96 object-cover group-hover/image:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {service.link && (
            <div className="absolute bottom-4 right-4 bg-gold text-black px-4 py-2 rounded-full text-sm font-medium opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center gap-2">
              View Details <ArrowUpRight className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div
      ref={ref}
      className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center"
    >
      {service.link ? (
        <Link to={service.link} className="contents">
          <div className="group cursor-pointer contents">
            {content}
          </div>
        </Link>
      ) : (
        content
      )}
    </div>
  );
}

// CTA Section
function ServicesCTA() {
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation({ threshold: 0.4 });

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-dark-card" ref={ctaRef}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 
          className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white mb-4 sm:mb-6"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          Ready to <span className="text-gold">Get Started</span>?
        </h2>
        <p 
          className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-10"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
        >
          Let's discuss how our services can help you grow your real estate business.
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
          Contact Us
          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
        </Link>
      </div>
    </section>
  );
}

// Main Services Page
export function Services() {
  return (
    <div className="min-h-screen bg-black">
      <ServicesHero />
      <ServicesList />
      <ServicesCTA />
    </div>
  );
}
