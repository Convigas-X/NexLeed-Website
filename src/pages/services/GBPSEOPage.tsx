import { useEffect, useRef, useState } from 'react';
import { 
  MapPin, Search, TrendingUp, Star, Shield, MessageSquare, Check, ArrowUpRight, 
  Globe, BarChart3, Award, Rocket, ChevronRight, Zap, Crown, Gem
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { AnimatedNumber } from '@/hooks/useCountUp';

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
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

// Hero Section
function ServiceHero() {
  return (
    <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
        <div 
          className="inline-flex items-center px-4 py-2 bg-gold/10 border border-gold/30 rounded-full mb-6"
          style={{ animation: 'fadeInUp 1s ease-out forwards', opacity: 0 }}
        >
          <MapPin className="w-4 h-4 text-gold mr-2" />
          <span className="text-gold text-sm font-medium">Local Domination</span>
        </div>
        
        <h1 
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-4 sm:mb-6"
          style={{ animation: 'fadeInUp 1s ease-out forwards', animationDelay: '0.2s', opacity: 0 }}
        >
          GBP SEO & <span className="text-gold">Local Optimization</span>
        </h1>
        
        <p 
          className="text-white/70 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto"
          style={{ animation: 'fadeInUp 1s ease-out forwards', animationDelay: '0.4s', opacity: 0 }}
        >
          Comprehensive Google Business Profile optimization and local SEO strategies to dominate local search results and attract nearby clients.
        </p>
      </div>
    </section>
  );
}

// Overview Section
function OverviewSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <h2 
              className="font-display text-2xl sm:text-3xl lg:text-4xl text-white mb-6"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              Dominate Your <span className="text-gold">Local Market</span>
            </h2>
            
            <p 
              className="text-white/60 text-base sm:text-lg mb-8"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
              }}
            >
              Your competitors are stealing your neighbors. Right now, potential customers are searching for your services locally. 
              If your Google Business Profile isn't optimized, they're clicking on your competitors instead. We help you claim your 
              territory and become the go-to choice in your area.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { number: '78%', label: 'of local searches lead to purchase' },
                { number: '97%', label: 'learn about businesses online first' },
                { number: '88%', label: 'trust online reviews like personal recs' },
                { number: '3x', label: 'more visibility with optimized GBP' },
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="bg-dark-card border border-dark-border rounded-xl p-6"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.1}s`,
                  }}
                >
                  <div className="text-3xl sm:text-4xl font-display text-gold mb-2"><AnimatedNumber value={stat.number} /></div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div 
            className="relative"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
            }}
          >
            <div className="relative rounded-2xl overflow-hidden border border-dark-border">
              <img
                src="/assets/service-crm.jpg"
                alt="Local SEO and Google Business Profile"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 bg-gold text-black px-6 py-3 rounded-xl shadow-gold-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">#1 in Local Rankings</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const features = [
    {
      icon: Search,
      title: 'Profile Optimization',
      description: 'Complete GBP setup and optimization with compelling descriptions, categories, and attributes that boost visibility.',
    },
    {
      icon: MapPin,
      title: 'Google Maps Visibility',
      description: 'Strategic positioning to appear in the coveted Google Maps 3-Pack for your target keywords and service areas.',
    },
    {
      icon: BarChart3,
      title: 'Local Rank Tracking',
      description: 'Monitor your rankings for key local search terms and track improvements over time with detailed reports.',
    },
    {
      icon: MessageSquare,
      title: 'Review Management',
      description: 'Systematic approach to generating positive reviews and professionally responding to all customer feedback.',
    },
    {
      icon: Globe,
      title: 'Local Citations',
      description: 'Build consistent NAP (Name, Address, Phone) citations across 50+ directories to strengthen local authority.',
    },
    {
      icon: Shield,
      title: 'Competitor Analysis',
      description: 'In-depth analysis of top-ranking competitors to identify opportunities and outperform them in local search.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-dark-card" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 
            className="font-display text-2xl sm:text-3xl lg:text-4xl text-white mb-4"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            What's <span className="text-gold">Included</span>
          </h2>
          <p 
            className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            Everything you need to dominate local search and attract more clients from your area
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-black border border-dark-border rounded-2xl p-6 sm:p-8 hover:border-gold/50 transition-all duration-500"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.1}s`,
              }}
            >
              <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-gold" />
              </div>
              
              <h3 className="font-display text-xl text-white mb-3">{feature.title}</h3>
              <p className="text-white/60 text-sm sm:text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Process Section
function ProcessSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const steps = [
    {
      number: '01',
      title: 'Audit & Analysis',
      description: 'Comprehensive review of your current GBP status, local rankings, and competitor landscape.',
    },
    {
      number: '02',
      title: 'Optimization',
      description: 'Complete profile optimization with keyword-rich descriptions, categories, photos, and Q&A setup.',
    },
    {
      number: '03',
      title: 'Citation Building',
      description: 'Build and clean up local citations across major directories for consistent NAP information.',
    },
    {
      number: '04',
      title: 'Review Strategy',
      description: 'Implement systematic review generation and management to build social proof and trust.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 
            className="font-display text-2xl sm:text-3xl lg:text-4xl text-white mb-4"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            Our <span className="text-gold">Process</span>
          </h2>
          <p 
            className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            A proven methodology to improve your local search presence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.1}s`,
              }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-gold/50 to-transparent" />
              )}
              
              <div className="bg-dark-card border border-dark-border rounded-2xl p-6 sm:p-8 h-full">
                <div className="text-4xl sm:text-5xl font-display text-gold/20 mb-4">{step.number}</div>
                <h3 className="font-display text-lg sm:text-xl text-white mb-3">{step.title}</h3>
                <p className="text-white/60 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Pricing Plans Section
function PricingPlansSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const plans = [
    {
      icon: Zap,
      name: 'The Essential',
      price: '$129',
      period: '/month',
      subtitle: 'Perfect for service-based businesses starting their local dominance',
      features: [
        'GMB Setup & Optimization',
        '1 Weekly Post',
        'Review Monitoring',
        '5 Custom Citations',
        'Basic Analytics',
      ],
      popular: false,
    },
    {
      icon: Crown,
      name: 'The Growth',
      price: '$229',
      period: '/month',
      subtitle: 'Our most popular plan for serious local market players',
      features: [
        'Everything in Essential',
        '3 Weekly Posts',
        'Review Response Service',
        '15 Custom Citations',
        'Spam Fighting',
        'Monthly Strategy Call',
      ],
      popular: true,
    },
    {
      icon: Gem,
      name: 'The Dominance',
      price: '$349',
      period: '/month',
      subtitle: 'Enterprise solution for market-wide supremacy',
      features: [
        'Everything in Growth',
        'Daily Posts & Q&A Management',
        '30+ Custom Citations',
        'Geo-Grid Rank Tracking',
        'Dedicated Account Manager',
        'Custom Reporting Dashboard',
        'Quarterly Business Reviews',
      ],
      popular: false,
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 
            className="font-display text-2xl sm:text-3xl lg:text-4xl text-white mb-4"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            Investment <span className="text-gold">Plans</span>
          </h2>
          <p 
            className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            Transparent pricing. No hidden fees. Choose the level of dominance you're ready for.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative rounded-2xl p-6 sm:p-8 transition-all duration-500 group ${
                plan.popular 
                  ? 'bg-gold/5 border-2 border-gold scale-105 z-10' 
                  : 'bg-dark-card border border-dark-border hover:border-gold/50'
              }`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible 
                  ? plan.popular ? 'translateY(-8px) scale(1.02)' : 'translateY(0)' 
                  : 'translateY(30px)',
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.1}s`,
              }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-black px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                plan.popular ? 'bg-gold' : 'bg-gold/10'
              }`}>
                <plan.icon className={`w-7 h-7 ${plan.popular ? 'text-black' : 'text-gold'}`} />
              </div>

              {/* Plan Name */}
              <h3 className="font-display text-xl text-white mb-1">{plan.name}</h3>
              <p className="text-white/50 text-sm mb-4">{plan.subtitle}</p>

              {/* Price */}
              <div className="mb-6">
                <span className="font-display text-4xl sm:text-5xl text-gold">{plan.price}</span>
                <span className="text-white/50 text-sm ml-1">{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-gold" />
                    </div>
                    <span className="text-white/70 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                to="/contact-us"
                className={`block w-full py-4 rounded-full font-medium text-center transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gold text-black hover:bg-gold-light hover:shadow-gold-lg'
                    : 'bg-white/10 text-white hover:bg-gold hover:text-black'
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>

        {/* Trust Note */}
        <p 
          className="text-center text-white/40 text-sm mt-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
          }}
        >
          90-day results guarantee. 100% satisfaction promise. No long-term contracts.
        </p>
      </div>
    </section>
  );
}

// Investment Returns Section
function InvestmentReturnsSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const milestones = [
    {
      period: '3 Months',
      title: 'Initial Growth Phase',
      metric: '+150%',
      description: 'Average visibility increase',
    },
    {
      period: '6 Months',
      title: 'Market Leadership',
      metric: 'Top 3',
      description: 'Rankings achieved',
    },
    {
      period: '12 Months',
      title: 'Complete Dominance',
      metric: '100%',
      description: 'Sustained market control',
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-dark-card" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 
            className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white mb-4"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            Investment <span className="text-gold">Returns</span>
          </h2>
          <p 
            className="text-white/60 text-base sm:text-lg max-w-3xl mx-auto"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            See how your premium investment translates into measurable business growth and market dominance over time.
          </p>
        </div>

        {/* KPI Graph */}
        <div 
          className="mb-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}
        >
          <div className="bg-black border border-gold/30 rounded-2xl p-6 sm:p-8" style={{ boxShadow: '0 0 30px rgba(195, 136, 27, 0.15), 0 0 60px rgba(195, 136, 27, 0.08), inset 0 0 20px rgba(195, 136, 27, 0.05)' }}>
            {/* Chart Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-white font-semibold text-lg">Growth Trajectory</h3>
                <p className="text-white/60 text-sm">Projected visibility increase over time</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gold rounded-full"></div>
                <span className="text-white/60 text-sm">Visibility Score</span>
              </div>
            </div>

            {/* SVG Chart */}
            <div className="relative h-48 sm:h-64">
              <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                {/* Grid lines */}
                <line x1="0" y1="50" x2="600" y2="50" stroke="rgba(195, 136, 27, 0.1)" strokeWidth="1" />
                <line x1="0" y1="100" x2="600" y2="100" stroke="rgba(195, 136, 27, 0.1)" strokeWidth="1" />
                <line x1="0" y1="150" x2="600" y2="150" stroke="rgba(195, 136, 27, 0.1)" strokeWidth="1" />
                
                {/* Growth curve */}
                <defs>
                  <linearGradient id="growthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(195, 136, 27, 0.3)" />
                    <stop offset="100%" stopColor="rgba(195, 136, 27, 0)" />
                  </linearGradient>
                </defs>
                
                {/* Area under curve */}
                <path 
                  d="M 0 180 Q 100 170 150 140 Q 200 110 300 80 Q 400 40 500 20 L 600 10 L 600 180 L 0 180 Z" 
                  fill="url(#growthGradient)"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transition: 'opacity 1s ease-out 0.5s'
                  }}
                />
                
                {/* Main curve line */}
                <path 
                  d="M 0 180 Q 100 170 150 140 Q 200 110 300 80 Q 400 40 500 20 L 600 10" 
                  fill="none" 
                  stroke="#C3881B" 
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 1000,
                    strokeDashoffset: isVisible ? 0 : 1000,
                    transition: 'stroke-dashoffset 2s ease-out 0.3s'
                  }}
                />

                {/* Data points */}
                <circle cx="150" cy="140" r="6" fill="#C3881B" stroke="black" strokeWidth="2" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease-out 0.8s' }} />
                <circle cx="300" cy="80" r="6" fill="#C3881B" stroke="black" strokeWidth="2" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease-out 1.2s' }} />
                <circle cx="600" cy="10" r="6" fill="#C3881B" stroke="black" strokeWidth="2" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease-out 1.6s' }} />

                {/* Value labels */}
                <text x="150" y="125" fill="#C3881B" fontSize="12" textAnchor="middle" fontWeight="bold" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease-out 1s' }}>+150%</text>
                <text x="300" y="65" fill="#C3881B" fontSize="12" textAnchor="middle" fontWeight="bold" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease-out 1.4s' }}>Top 3</text>
                <text x="600" y="25" fill="#C3881B" fontSize="12" textAnchor="end" fontWeight="bold" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease-out 1.8s' }}>100%</text>
              </svg>

              {/* X-axis labels */}
              <div className="flex justify-between mt-4 px-4">
                <div className="text-center">
                  <div className="text-gold text-sm font-semibold">Month 3</div>
                  <div className="text-white/50 text-xs">Initial Growth</div>
                </div>
                <div className="text-center">
                  <div className="text-gold text-sm font-semibold">Month 6</div>
                  <div className="text-white/50 text-xs">Leadership</div>
                </div>
                <div className="text-center">
                  <div className="text-gold text-sm font-semibold">Month 12</div>
                  <div className="text-white/50 text-xs">Dominance</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Cards Container */}
        <div 
          className="bg-black border border-gold/30 rounded-2xl p-8 sm:p-12"
          style={{
            boxShadow: '0 0 30px rgba(195, 136, 27, 0.15), 0 0 60px rgba(195, 136, 27, 0.08), inset 0 0 20px rgba(195, 136, 27, 0.05)',
          }}
        >          
          {/* KPI Cards */}
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className={`relative ${index < milestones.length - 1 ? 'md:border-r md:border-gold/20' : ''}`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + index * 0.1}s`,
                }}
              >
                {/* Period */}
                <div className="text-sm font-medium text-gold mb-2 uppercase tracking-wider">
                  {milestone.period}
                </div>
                
                {/* Big Metric */}
                <div className="font-display text-4xl sm:text-5xl lg:text-6xl text-gold mb-3">
                  {milestone.metric}
                </div>
                
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  {milestone.title}
                </h3>
                
                {/* Description */}
                <p className="text-white/60 text-sm">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Note */}
        <p 
          className="text-center text-white/40 text-sm mt-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s',
          }}
        >
          Results may vary based on market competition and starting position.
        </p>
      </div>
    </section>
  );
}

// Results Section
function ResultsSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-dark-card" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white mb-6">
              Real Results for <span className="text-gold">Real Businesses</span>
            </h2>
            
            <p className="text-white/60 text-base sm:text-lg mb-8">
              Our clients consistently see dramatic improvements in their local visibility, 
              leading to more calls, more visits, and more revenue.
            </p>

            <div className="space-y-4">
              {[
                { metric: '300%', label: 'Average increase in GBP views' },
                { metric: '150%', label: 'More direction requests' },
                { metric: '200%', label: 'Increase in phone calls' },
                { metric: '4.9', label: 'Average star rating achieved' },
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.1}s`,
                  }}
                >
                  <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-display text-gold"><AnimatedNumber value={item.metric} /></span>
                  </div>
                  <span className="text-white/70">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div 
            className="relative"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
            }}
          >
            <div className="bg-black border border-dark-border rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gold rounded-xl flex items-center justify-center">
                  <Award className="w-8 h-8 text-black" />
                </div>
                <div>
                  <div className="text-white font-semibold text-lg">Your Business Profile</div>
                  <div className="flex items-center gap-1 text-gold">
                    <Star className="w-4 h-4 fill-gold" />
                    <Star className="w-4 h-4 fill-gold" />
                    <Star className="w-4 h-4 fill-gold" />
                    <Star className="w-4 h-4 fill-gold" />
                    <Star className="w-4 h-4 fill-gold" />
                    <span className="ml-2 text-sm">5.0 (127 reviews)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-dark-card rounded-xl">
                  <span className="text-white/60">Profile Views</span>
                  <span className="text-gold font-semibold"><AnimatedNumber value="+284%" /></span>
                </div>
                <div className="flex items-center justify-between p-4 bg-dark-card rounded-xl">
                  <span className="text-white/60">Search Appearances</span>
                  <span className="text-gold font-semibold"><AnimatedNumber value="+412%" /></span>
                </div>
                <div className="flex items-center justify-between p-4 bg-dark-card rounded-xl">
                  <span className="text-white/60">Direction Requests</span>
                  <span className="text-gold font-semibold"><AnimatedNumber value="+156%" /></span>
                </div>
                <div className="flex items-center justify-between p-4 bg-dark-card rounded-xl">
                  <span className="text-white/60">Phone Calls</span>
                  <span className="text-gold font-semibold"><AnimatedNumber value="+198%" /></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-black" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 
          className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white mb-4 sm:mb-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          Ready to Dominate <span className="text-gold">Local Search</span>?
        </h2>
        
        <p 
          className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
        >
          Let's optimize your Google Business Profile and start capturing more local leads today.
        </p>

        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          }}
        >
          <Link
            to="/contact-us"
            className="inline-flex items-center px-8 sm:px-10 py-4 bg-gold text-black font-medium rounded-full hover:bg-gold-light transition-all duration-300 hover:scale-105 hover:shadow-gold-lg text-base sm:text-lg"
          >
            <Rocket className="w-5 h-5 mr-2" />
            Get Free Audit
            <ArrowUpRight className="w-5 h-5 ml-2" />
          </Link>
          
          <Link
            to="/services"
            className="inline-flex items-center px-6 sm:px-8 py-4 text-white font-medium hover:text-gold transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5 mr-2" />
            View All Services
          </Link>
        </div>

        {/* Trust Indicators */}
        <div 
          className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/40 text-sm"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.45s',
          }}
        >
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-gold" />
            <span>Free GBP Audit</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-gold" />
            <span>30-Day Results Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-gold" />
            <span>No Long-Term Contracts</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Service Page
export function GBPSEOPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <ServiceHero />
      <OverviewSection />
      <FeaturesSection />
      <ProcessSection />
      <PricingPlansSection />
      <InvestmentReturnsSection />
      <ResultsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
