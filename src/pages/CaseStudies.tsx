import { useEffect, useRef, useState } from 'react';
import { 
  ArrowUpRight, TrendingUp, Target, BarChart3, Check
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
    <>
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
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
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6"
          style={{ animation: 'fadeInUp 1s ease-out forwards', animationDelay: '0.2s', opacity: 0 }}
        >
          Case <span className="text-gold">Studies</span>
        </h1>
        <p 
          className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto"
          style={{ animation: 'fadeInUp 1s ease-out forwards', animationDelay: '0.4s', opacity: 0 }}
        >
          Real results from real clients. See how we've helped agents transform their businesses.
        </p>
      </div>
    </section>

      {/* Spacer */}
      <div className="h-16 sm:h-20 lg:h-24 bg-black" />
    </>
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
        <div 
          className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-dark-border hover:border-gold/30 transition-all duration-500 group"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0) scale(1)' : `translateX(${isEven ? '-40px' : '40px'}) scale(0.95)`,
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <img
            src={study.image}
            alt={study.title}
            className="w-full h-72 sm:h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
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
        </div>
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
          className="font-display text-xl sm:text-2xl lg:text-3xl text-white mb-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}
        >
          {study.title}
        </h3>
        
        <p 
          className="text-white/60 mb-6 sm:mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          }}
        >
          {study.description}
        </p>

        {/* Challenges */}
        <div 
          className="mb-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : `translateX(${isEven ? '-20px' : '20px'})`,
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
          }}
        >
          <h4 className="text-white font-medium mb-3 flex items-center">
            <TrendingUp className="w-4 h-4 text-gold mr-2" />
            Challenges
          </h4>
          <ul className="space-y-2">
            {study.challenges.map((item: string, cIndex: number) => (
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

        {/* Solutions */}
        <div 
          className="mb-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : `translateX(${isEven ? '-20px' : '20px'})`,
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
          }}
        >
          <h4 className="text-white font-medium mb-3 flex items-center">
            <Target className="w-4 h-4 text-gold mr-2" />
            Solutions
          </h4>
          <ul className="space-y-2">
            {study.solutions.map((item: string, sIndex: number) => (
              <li 
                key={sIndex} 
                className="flex items-center space-x-2 text-white/60 text-sm"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : `translateX(${isEven ? '-15px' : '15px'})`,
                  transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${0.6 + sIndex * 0.08}s`,
                }}
              >
                <Check className="w-4 h-4 text-gold flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Results */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : `translateX(${isEven ? '-20px' : '20px'})`,
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.6s',
          }}
        >
          <h4 className="text-white font-medium mb-3 flex items-center">
            <BarChart3 className="w-4 h-4 text-gold mr-2" />
            Results
          </h4>
          <ul className="space-y-2">
            {study.results.map((item: string, rIndex: number) => (
              <li 
                key={rIndex} 
                className="flex items-center space-x-2 text-white/60 text-sm"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : `translateX(${isEven ? '-15px' : '15px'})`,
                  transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${0.7 + rIndex * 0.08}s`,
                }}
              >
                <Check className="w-4 h-4 text-gold flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Case Studies List
function CaseStudiesList() {
  const caseStudies = [
    {
      title: 'How Sarah M. Tripled Her Lead Generation in 90 Days',
      client: 'Sarah Mitchell',
      location: 'California',
      category: 'Lead Generation',
      image: '/assets/service-leads.jpg',
      stats: [
        { label: 'Lead Increase', value: '300%' },
        { label: 'Conversion Rate', value: '24%' },
        { label: 'ROI', value: '450%' },
      ],
      description: 'Sarah was struggling to generate consistent leads for her real estate business. After implementing our comprehensive lead generation strategy, she saw a 300% increase in qualified leads within just 90 days.',
      challenges: [
        'Inconsistent lead flow',
        'Low conversion rates',
        'Limited marketing budget',
      ],
      solutions: [
        'Targeted Facebook & Instagram campaigns',
        'Optimized landing pages',
        'Automated follow-up sequences',
      ],
      results: [
        '300% increase in qualified leads',
        '24% conversion rate improvement',
        '450% return on investment',
      ],
    },
    {
      title: "Transforming a Brokerage's Digital Presence",
      client: 'Metro Realty Group',
      location: 'Texas',
      category: 'Website & Branding',
      image: '/assets/service-website.jpg',
      stats: [
        { label: 'Traffic Increase', value: '180%' },
        { label: 'Lead Capture', value: '65%' },
        { label: 'Page Speed', value: '98/100' },
      ],
      description: 'Metro Realty Group needed a complete digital overhaul. We redesigned their website, implemented CRM automation, and created a cohesive brand identity that resonated with their target market.',
      challenges: [
        'Outdated website design',
        'Poor user experience',
        'No lead capture system',
      ],
      solutions: [
        'Modern, responsive website design',
        'Integrated CRM system',
        'Brand-aligned visual identity',
      ],
      results: [
        '180% increase in website traffic',
        '65% improvement in lead capture',
        '98/100 page speed score',
      ],
    },
    {
      title: 'Scaling a Solo Agent to a Top Producer',
      client: 'James Wilson',
      location: 'Florida',
      category: 'Full Service',
      image: '/assets/service-crm.jpg',
      stats: [
        { label: 'Sales Volume', value: '+$2.5M' },
        { label: 'Time Saved', value: '15hrs/wk' },
        { label: 'Client Growth', value: '150%' },
      ],
      description: 'James was a solo agent looking to scale his business. Our comprehensive solution including website, CRM, advertising, and virtual assistant support helped him become a top producer in his market.',
      challenges: [
        'Limited time for marketing',
        'No systems in place',
        'Difficulty scaling operations',
      ],
      solutions: [
        'Complete digital ecosystem',
        'Dedicated virtual assistant',
        'Performance-driven advertising',
      ],
      results: [
        '$2.5M increase in sales volume',
        '15 hours saved per week',
        '150% client base growth',
      ],
    },
    {
      title: 'Maximizing ROI with Strategic Ad Campaigns',
      client: 'Elite Properties Team',
      location: 'New York',
      category: 'Paid Advertising',
      image: '/assets/service-ads.jpg',
      stats: [
        { label: 'Cost Per Lead', value: '-40%' },
        { label: 'Lead Quality', value: '+85%' },
        { label: 'Ad Spend', value: '$50K/mo' },
      ],
      description: 'Elite Properties was spending heavily on ads with poor results. We restructured their campaigns, optimized targeting, and implemented conversion tracking to maximize their advertising ROI.',
      challenges: [
        'High cost per lead',
        'Poor ad performance',
        'Lack of tracking',
      ],
      solutions: [
        'Campaign restructuring',
        'Advanced targeting',
        'Conversion optimization',
      ],
      results: [
        '40% reduction in cost per lead',
        '85% improvement in lead quality',
        'Scalable $50K monthly ad spend',
      ],
    },
  ];

  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -50px 0px' }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className="text-center mb-12 sm:mb-16"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white mb-3 sm:mb-4">
            Success <span className="text-gold">Stories</span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
            Real results that speak for themselves
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

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      quote: "NexLeed completely transformed how we approach digital marketing. The results speak for themselves.",
      name: 'Sarah Mitchell',
      role: 'Real Estate Agent — California',
      image: '/assets/testimonial-1.jpg',
    },
    {
      quote: "Working with NexLeed was the best decision we made for our brokerage. Highly recommended!",
      name: 'David Chen',
      role: 'Broker Owner — Texas',
      image: '/assets/testimonial-2.jpg',
    },
    {
      quote: "The team at NexLeed understands real estate like no one else. They delivered beyond our expectations.",
      name: 'Jennifer Adams',
      role: 'Team Leader — Florida',
      image: '/assets/testimonial-3.jpg',
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
            What Our <span className="text-gold">Clients</span> Say
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-black border border-dark-border rounded-xl p-5 sm:p-6 hover:border-gold/30 transition-all duration-300"
              style={{
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`,
              }}
            >
              <div 
                className="flex items-center space-x-3 mb-4"
                style={{
                  opacity: gridVisible ? 1 : 0,
                  transform: gridVisible ? 'translateX(0)' : 'translateX(-20px)',
                  transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.15}s`,
                }}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gold/30"
                />
                <div>
                  <h4 className="text-white font-medium text-sm">{testimonial.name}</h4>
                  <p className="text-gold text-xs">{testimonial.role}</p>
                </div>
              </div>
              <p 
                className="text-white/70 text-sm leading-relaxed"
                style={{
                  opacity: gridVisible ? 1 : 0,
                  transform: gridVisible ? 'translateY(0)' : 'translateY(15px)',
                  transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + index * 0.15}s`,
                }}
              >
                "{testimonial.quote}"
              </p>
            </div>
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
          className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white mb-4 sm:mb-6"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          Ready for Your <span className="text-gold">Success Story</span>?
        </h2>
        <p 
          className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-10"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
        >
          Let's create a case study about your success. Contact us today to get started.
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
          Start Your Journey
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
      <CaseStudiesList />
      <TestimonialsSection />
      <CaseStudiesCTA />
    </div>
  );
}
