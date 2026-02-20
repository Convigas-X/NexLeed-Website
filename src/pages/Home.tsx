import { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, Rocket, Headphones, Settings, Shield, Home as HomeIcon, FileText, 
  Target, Zap, ArrowUpRight
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link } from 'react-router-dom';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center sm:items-end justify-center sm:justify-start overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/hero-home.jpg)' }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      
      {/* Content */}
      <div className="relative z-10 text-center sm:text-left px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20 pt-24 sm:pt-28 lg:pt-20 max-w-4xl">
        <h1 
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-4 sm:mb-6 animate-fade-in-up"
          style={{ animation: 'fadeInUp 1s ease-out forwards', animationDelay: '0.2s', opacity: 0 }}
        >
          Elevating <span className="text-gold">Real Estate</span>
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>Through Modern Solutions
        </h1>
        <p 
          className="text-white/70 text-base sm:text-lg lg:text-xl max-w-2xl mb-6 sm:mb-8 lg:mb-10"
          style={{ animation: 'fadeInUp 1s ease-out forwards', animationDelay: '0.4s', opacity: 0 }}
        >
          Websites, automation, and support designed for agents who value clarity and performance.
        </p>
      </div>
    </section>
  );
}

// Logo Strip Section
function LogoStrip() {
  const logos = [
    'CENTURY 21', 'CBRE', 'Anywhere', 'Compass', 'RE/MAX', 'Newmark', 'Marcus & Millichap'
  ];

  return (
    <section className="py-12 bg-black border-y border-dark-border overflow-hidden">
      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
        
        {/* Scrolling Logos */}
        <div className="flex animate-slide-left">
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-12 text-white/40 hover:text-white/70 transition-colors duration-300"
            >
              <span className="text-xl font-display font-semibold tracking-wider">{logo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Who We Are Section
function WhoWeAreSection() {
  const stats = [
    { number: '250+', label: 'Agents Served' },
    { number: '4+', label: 'Years Of Experience' },
    { number: '96%', label: 'Client Retention' },
    { number: '200+', label: 'Markets Covered' },
  ];
  
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const { containerRef: statsRef, isVisible: statsVisible } = useStaggerAnimation(4);

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-black" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Column */}
          <div 
            className="lg:sticky lg:top-32"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <p className="text-gold text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4">
              Who we Are
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white leading-tight mb-4 sm:mb-6">
              Helping Real Estate Agents Grow With Better Systems and Better Support
            </h2>
          </div>

          {/* Right Column */}
          <div>
            <h3 
              className="font-display text-xl sm:text-2xl lg:text-3xl text-white mb-3 sm:mb-4"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
              }}
            >
              Powering Your Real Estate All in <span className="text-gold">One Place</span>
            </h3>
            <p 
              className="text-white/60 text-base sm:text-lg mb-8 sm:mb-12"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
              }}
            >
              A complete digital ecosystem built for realtors, teams, and brokerages combining 
              lead generation, brand creation, automation, and technology under one seamless platform.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-6" ref={statsRef}>
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-dark-card border border-dark-border rounded-xl p-4 sm:p-6 hover:border-gold/50 transition-all duration-300 hover:-translate-y-2"
                  style={{
                    opacity: statsVisible ? 1 : 0,
                    transform: statsVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
                  }}
                >
                  <p className="font-display text-3xl sm:text-4xl lg:text-5xl text-gold mb-1 sm:mb-2">{stat.number}</p>
                  <p className="text-white/60 text-xs sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Why Choose Us Section
function WhyChooseSection() {
  const benefits = [
    {
      icon: Rocket,
      title: 'Fast Delivery',
      description: 'We set up your website, CRM, and automations quickly so you can start generating leads sooner.',
    },
    {
      icon: Headphones,
      title: 'Reliable Support',
      description: 'Our team is always available to help with updates, questions, and ongoing optimization.',
    },
    {
      icon: Settings,
      title: 'Flexible Solutions',
      description: "Whether you're a solo agent or a growing team, our services adapt to your workflow and goals.",
    },
    {
      icon: Shield,
      title: 'Secure Systems',
      description: 'Your lead data, client information, and CRM setup stay fully protected and private.',
    },
    {
      icon: HomeIcon,
      title: 'Real Estate Expertise',
      description: 'Everything we build is designed specifically for real estate agents — no generic templates.',
    },
    {
      icon: FileText,
      title: 'Transparent Pricing',
      description: 'Clear, simple pricing with no hidden fees or long-term contracts.',
    },
  ];

  const headerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const mobileStatsRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [badgeVisible, setBadgeVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [mobileStatsVisible, setMobileStatsVisible] = useState(false);

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

    const badgeObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBadgeVisible(true);
          badgeObserver.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    const cardsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsVisible(true);
          cardsObserver.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const mobileStatsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMobileStatsVisible(true);
          mobileStatsObserver.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    if (headerRef.current) headerObserver.observe(headerRef.current);
    if (badgeRef.current) badgeObserver.observe(badgeRef.current);
    if (cardsRef.current) cardsObserver.observe(cardsRef.current);
    if (mobileStatsRef.current) mobileStatsObserver.observe(mobileStatsRef.current);

    return () => {
      headerObserver.disconnect();
      badgeObserver.disconnect();
      cardsObserver.disconnect();
      mobileStatsObserver.disconnect();
    };
  }, []);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-black relative">
      {/* Background Gradient Effect */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          ref={headerRef}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <p className="text-gold text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4">Why Choose Us</p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white mb-4 sm:mb-6">
            What Sets <span className="text-gold">NexLeed</span> Apart
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
            Simple, powerful benefits designed to help you grow your real estate business.
          </p>
        </div>

        {/* Benefits Layout - Badge Left, Cards Right */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Side - Badge with Visual Element */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 flex flex-col items-center lg:items-start">
            {/* Badge - Hidden on mobile, visible on lg */}
            <div ref={badgeRef} className="hidden lg:block">
              <div 
                className="relative w-48 xl:w-56 h-48 xl:h-56"
                style={{
                  opacity: badgeVisible ? 1 : 0,
                  transform: badgeVisible ? 'scale(1)' : 'scale(0.8)',
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* Outer Glow Ring */}
                <div 
                  className="absolute inset-0 rounded-full border border-gold/20 animate-pulse"
                  style={{
                    opacity: badgeVisible ? 1 : 0,
                    transition: 'opacity 0.8s ease 0.3s',
                  }}
                />
                <div 
                  className="absolute inset-2 rounded-full border border-gold/30"
                  style={{
                    opacity: badgeVisible ? 1 : 0,
                    transition: 'opacity 0.8s ease 0.4s',
                  }}
                />
                
                {/* Main Badge */}
                <div 
                  className="absolute inset-4 bg-gradient-to-br from-dark-card to-black border-2 border-gold rounded-full flex items-center justify-center shadow-gold/20"
                  style={{
                    opacity: badgeVisible ? 1 : 0,
                    transform: badgeVisible ? 'rotate(0deg)' : 'rotate(-10deg)',
                    transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s',
                  }}
                >
                  <div className="text-center px-4">
                    <p 
                      className="text-gold font-display text-xl xl:text-2xl mb-1"
                      style={{
                        opacity: badgeVisible ? 1 : 0,
                        transform: badgeVisible ? 'translateY(0)' : 'translateY(10px)',
                        transition: 'all 0.5s ease 0.4s',
                      }}
                    >
                      Practical
                    </p>
                    <p 
                      className="text-white font-display text-2xl xl:text-3xl mb-2"
                      style={{
                        opacity: badgeVisible ? 1 : 0,
                        transform: badgeVisible ? 'translateY(0)' : 'translateY(10px)',
                        transition: 'all 0.5s ease 0.5s',
                      }}
                    >
                      benefits.
                    </p>
                    <div 
                      className="w-12 h-px bg-gold/50 mx-auto mb-2"
                      style={{
                        opacity: badgeVisible ? 1 : 0,
                        transform: badgeVisible ? 'scaleX(1)' : 'scaleX(0)',
                        transition: 'all 0.4s ease 0.6s',
                      }}
                    />
                    <p 
                      className="text-white/60 text-xs sm:text-sm"
                      style={{
                        opacity: badgeVisible ? 1 : 0,
                        transform: badgeVisible ? 'translateY(0)' : 'translateY(10px)',
                        transition: 'all 0.5s ease 0.7s',
                      }}
                    >
                      Thoughtfully<br/>executed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile/Tablet Stats - Visible on smaller screens */}
            <div ref={mobileStatsRef} className="lg:hidden grid grid-cols-3 gap-3 sm:gap-4 w-full">
              {[
                { value: '250+', label: 'Agents Served' },
                { value: '96%', label: 'Retention' },
                { value: '4+', label: 'Years' },
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="text-center bg-dark-card/30 rounded-lg p-3 sm:p-4"
                  style={{
                    opacity: mobileStatsVisible ? 1 : 0,
                    transform: mobileStatsVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
                    transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
                  }}
                >
                  <p className="text-gold font-display text-xl sm:text-2xl font-bold">{stat.value}</p>
                  <p className="text-white/50 text-xs">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Cards Grid */}
          <div className="lg:col-span-8">
            <div ref={cardsRef} className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`group relative bg-dark-card/50 backdrop-blur-sm border border-dark-border rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-gold/50 transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-gold/10 hover:bg-dark-card ${
                    index % 2 === 1 ? 'sm:mt-6 lg:mt-8' : ''
                  }`}
                  style={{
                    opacity: cardsVisible ? 1 : 0,
                    transform: cardsVisible ? 'translateY(0) scale(1)' : `translateY(40px) scale(0.95)`,
                    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
                  }}
                >
                  {/* Number Badge */}
                  <div 
                    className="absolute -top-3 -right-3 w-8 h-8 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      transform: cardsVisible ? 'scale(1)' : 'scale(0)',
                      transition: `transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${0.3 + index * 0.1}s`,
                    }}
                  >
                    <span className="text-gold text-xs font-bold">0{index + 1}</span>
                  </div>
                  
                  {/* Icon */}
                  <div 
                    className="w-14 h-14 bg-gradient-to-br from-gold/20 to-gold/5 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:from-gold/30 group-hover:to-gold/10 transition-all duration-300"
                    style={{
                      opacity: cardsVisible ? 1 : 0,
                      transform: cardsVisible ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-180deg)',
                      transition: `all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${0.2 + index * 0.1}s`,
                    }}
                  >
                    <benefit.icon className="w-7 h-7 text-gold" strokeWidth={1.5} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-display text-xl text-white mb-3 group-hover:text-gold transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                  
                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Services Preview Section
function ServicesPreviewSection() {
  const services = [
    {
      icon: Zap,
      title: 'Modern Websites',
      subtitle: 'for Real Estate',
      description: 'Clean, fast, and purpose-driven websites built to highlight your brand.',
      image: '/assets/service-website.jpg',
    },
    {
      icon: Settings,
      title: 'Streamlined Systems',
      subtitle: 'and Workflows',
      description: 'Organized pipelines and automated follow-ups for better client management.',
      image: '/assets/service-crm.jpg',
    },
    {
      icon: Target,
      title: 'Exclusive Buyer',
      subtitle: '& Seller Leads',
      description: 'Targeted campaigns delivering high-intent inquiries directly to you.',
      image: '/assets/service-leads.jpg',
    },
  ];
  
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const { containerRef: gridRef, isVisible: gridVisible } = useStaggerAnimation(3);

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-dark-card">
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
            Our <span className="text-gold">Services</span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
            Thoughtfully crafted solutions designed to support modern real estate professionals.
          </p>
        </div>

        {/* Services Grid */}
        <div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-12" 
          ref={gridRef}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-black border border-dark-border rounded-xl overflow-hidden hover:border-gold/50 transition-all duration-300"
              style={{
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`,
              }}
            >
              <div className="relative h-40 sm:h-44 lg:h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              </div>
              <div className="p-4 sm:p-5 lg:p-6">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gold/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <service.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                </div>
                <h3 className="font-display text-lg sm:text-xl text-white mb-1 sm:mb-2">
                  {service.title} <span className="text-gold">{service.subtitle}</span>
                </h3>
                <p className="text-white/60 text-xs sm:text-sm">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            to="/services"
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gold text-black font-medium rounded-full hover:bg-gold-light transition-all duration-300 hover:scale-105 text-sm sm:text-base"
          >
            View All Services
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      quote: "The CRM workflows they set up were a game changer for my team. Appointments, reminders, and follow-ups all happen automatically, and my VA now has a structured system to work with.",
      name: 'Sophia Martinez',
      role: 'Team Leader — California',
      image: '/assets/testimonial-1.jpg',
    },
    {
      quote: "Professional, reliable, and incredibly efficient. NexLeed handled my branding, website, and ads with complete clarity. I loved how transparent the entire process was. The results were immediate.",
      name: 'Jonathan Reed',
      role: 'Real Estate Investor — New York',
      image: '/assets/testimonial-2.jpg',
    },
    {
      quote: "Working with NexLeed completely transformed my business. The new website and CRM automations helped me capture more leads in the first month than I did all last quarter.",
      name: 'Emily Carter',
      role: 'Real Estate Agent — Florida',
      image: '/assets/testimonial-3.jpg',
    },
    {
      quote: "They took my scattered ideas and turned them into a powerful agent brand. The website is clean, fast, and built for conversions. The lead generation campaigns they launched brought in motivated buyers.",
      name: 'Daniel Rivera',
      role: 'Broker Associate — Texas',
      image: '/assets/testimonial-4.jpg',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });

  // Entry animation trigger
  useEffect(() => {
    if (headerVisible && !hasEntered) {
      setHasEntered(true);
    }
  }, [headerVisible, hasEntered]);

  const navigate = (newIndex: number) => {
    if (isAnimating || newIndex === activeIndex) return;
    
    setIsAnimating(true);
    
    // First fade out
    setTimeout(() => {
      setActiveIndex(newIndex);
      setDisplayedIndex(newIndex);
      
      // Then fade in
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }, 400);
  };

  const handlePrev = () => {
    const newIndex = activeIndex === 0 ? testimonials.length - 2 : activeIndex - 1;
    navigate(newIndex);
  };

  const handleNext = () => {
    const newIndex = activeIndex >= testimonials.length - 2 ? 0 : activeIndex + 1;
    navigate(newIndex);
  };

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
            Our <span className="text-gold">Testimonials</span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
            Hear from the clients who trusted NexLeed. Their experiences speak for the quality 
            and care we bring to every project.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Cards Container with Crossfade */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {testimonials.slice(displayedIndex, displayedIndex + 2).map((testimonial, index) => (
              <div
                key={`${displayedIndex}-${index}`}
                className="bg-dark-card border border-dark-border rounded-xl p-5 sm:p-6 lg:p-8 hover:border-gold/30 transition-all duration-300"
                style={{
                  opacity: isAnimating ? 0 : (hasEntered ? 1 : 0),
                  transform: isAnimating 
                    ? 'translateY(10px) scale(0.98)' 
                    : (hasEntered ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)'),
                  transition: isAnimating 
                    ? 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' 
                    : 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: isAnimating ? '0s' : `${0.2 + index * 0.15}s`,
                }}
              >
                <div className="flex items-start space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-gold/30 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-white font-medium text-sm sm:text-base truncate">{testimonial.name}</h4>
                    <p className="text-gold text-xs sm:text-sm truncate">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed line-clamp-4 sm:line-clamp-none">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center mt-6 sm:mt-8 space-x-3 sm:space-x-4">
            <button
              onClick={handlePrev}
              disabled={isAnimating}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-dark-border flex items-center justify-center text-white hover:border-gold hover:text-gold transition-all duration-300 min-w-[44px] min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous testimonials"
            >
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 rotate-90" />
            </button>
            
            {/* Dots Indicator */}
            <div className="flex items-center space-x-2 mx-4">
              {Array.from({ length: testimonials.length - 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => navigate(index)}
                  disabled={isAnimating}
                  className={`transition-all duration-300 rounded-full ${
                    index === activeIndex 
                      ? 'w-6 h-2 bg-gold' 
                      : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={isAnimating}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-dark-border flex items-center justify-center text-white hover:border-gold hover:text-gold transition-all duration-300 min-w-[44px] min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next testimonials"
            >
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 -rotate-90" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection() {
  const faqs = [
    {
      question: 'What services does NexLeed provide?',
      answer: 'NexLeed provides comprehensive real estate solutions including modern website design, CRM automation, lead generation, social media management, paid advertising, and dedicated virtual assistant support.',
    },
    {
      question: 'How does NexLeed generate leads for realtors?',
      answer: 'We use targeted digital marketing campaigns across multiple platforms including Facebook, Instagram, Google, and YouTube. Our lead generation strategies are data-driven and specifically designed for real estate professionals.',
    },
    {
      question: 'Do you build websites specifically for real estate agents?',
      answer: 'Yes, all our websites are custom-built specifically for real estate professionals. We understand the unique needs of agents and create websites that showcase listings, capture leads, and build your brand.',
    },
    {
      question: 'What social media platforms do you manage?',
      answer: 'We manage all major social media platforms including Facebook, Instagram, LinkedIn, Twitter/X, and YouTube. Our team creates platform-specific content to maximize engagement and lead generation.',
    },
    {
      question: 'How long does it take to build a real estate website?',
      answer: 'Typically, our website projects take 2-4 weeks from start to finish. This includes design, development, content integration, and testing. Rush options are available for urgent needs.',
    },
    {
      question: 'Do I need to provide the content, or will NexLeed create it?',
      answer: 'We offer both options. Our team can create all content for you including copywriting, photography coordination, and graphic design. Alternatively, you can provide your own content and we\'ll integrate it.',
    },
    {
      question: 'Can NexLeed run paid ads for real estate lead generation?',
      answer: 'Absolutely! Our team specializes in real estate paid advertising on Facebook, Instagram, Google, and YouTube. We handle everything from campaign setup to ongoing optimization and reporting.',
    },
    {
      question: 'Does NexLeed provide ongoing support after website is launched?',
      answer: 'Yes, we offer various support packages including website maintenance, content updates, technical support, and ongoing marketing services. We\'re committed to your long-term success.',
    },
  ];

  const { ref: faqLeftRef, isVisible: faqLeftVisible } = useScrollAnimation({ threshold: 0.2 });
  const { containerRef: faqAccordionRef, isVisible: faqAccordionVisible } = useStaggerAnimation(8, { threshold: 0.1 });

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-dark-card" ref={faqLeftRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Left Column */}
          <div 
            className="lg:sticky lg:top-32 lg:self-start"
            style={{
              opacity: faqLeftVisible ? 1 : 0,
              transform: faqLeftVisible ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white mb-3 sm:mb-4">
              Frequently <span className="text-gold">Asked</span> Questions
            </h2>
            <p className="text-white/60 text-base sm:text-lg">
              Got questions? We've got answers. Check out our frequently asked questions section 
              to find valuable insights into our processes, pricing, and more. Transparency is at 
              the core of our client interactions.
            </p>
          </div>

          {/* Right Column - Accordion */}
          <div ref={faqAccordionRef}>
            <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-black border border-dark-border rounded-xl px-4 sm:px-6 data-[state=open]:border-gold/50"
                  style={{
                    opacity: faqAccordionVisible ? 1 : 0,
                    transform: faqAccordionVisible ? 'translateX(0)' : 'translateX(30px)',
                    transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s`,
                  }}
                >
                  <AccordionTrigger className="text-white hover:text-gold text-left py-4 sm:py-5 text-sm sm:text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/60 pb-4 sm:pb-5 text-sm sm:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation({ threshold: 0.4 });

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-black relative overflow-hidden" ref={ctaRef}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-card to-black opacity-50" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 
          className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white mb-4 sm:mb-6"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          Ready to <span className="text-gold">Begin</span>?
        </h2>
        <p 
          className="text-white/60 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-8 sm:mb-10"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
        >
          Let's build the systems, websites, and marketing you need to attract more clients 
          and close more deals without doing all the work alone.
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

// Main Home Page
export function Home() {
  return (
    <div className="min-h-screen bg-black">
      <HeroSection />
      <LogoStrip />
      <WhoWeAreSection />
      <WhyChooseSection />
      <ServicesPreviewSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}
