import { useEffect, useRef, useState } from 'react';
import { 
  TrendingUp, Megaphone, Check, ArrowUpRight, 
  Facebook, Youtube, Monitor, Rocket, ChevronRight, Award,
  Sparkles, Crown, Gem
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 py-20 max-w-5xl mx-auto">
        <div 
          className="inline-flex items-center px-4 py-2 bg-gold/10 border border-gold/30 rounded-full mb-6"
          style={{ animation: 'fadeInUp 1s ease-out forwards', opacity: 0 }}
        >
          <Megaphone className="w-4 h-4 text-gold mr-2" />
          <span className="text-gold text-sm font-medium">Paid Advertising</span>
        </div>
        
        <h1 
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-4 sm:mb-6"
          style={{ animation: 'fadeInUp 1s ease-out forwards', animationDelay: '0.2s', opacity: 0 }}
        >
          Performance-Driven <span className="text-gold">Advertising</span>
        </h1>
        
        <p 
          className="text-white/70 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto"
          style={{ animation: 'fadeInUp 1s ease-out forwards', animationDelay: '0.4s', opacity: 0 }}
        >
          Well-structured campaigns across major platforms to help agents increase visibility and generate consistent opportunities.
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
              Stop Wasting Ad Spend. Start Getting <span className="text-gold">Results</span>.
            </h2>
            
            <p 
              className="text-white/60 text-base sm:text-lg mb-8"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
              }}
            >
              Most real estate agents burn through their ad budget with poorly structured campaigns. 
              We build data-driven advertising systems that target the right people at the right time, 
              delivering qualified leads at a cost that makes sense for your business.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { number: '4.2x', label: 'Average ROAS' },
                { number: '60%', label: 'Lower cost per lead' },
                { number: '3x', label: 'More qualified leads' },
                { number: '24/7', label: 'Campaign monitoring' },
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
                src="/assets/service-ads.jpg"
                alt="Performance Advertising"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 bg-gold text-black px-6 py-3 rounded-xl shadow-gold-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">420% Average ROAS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Platforms Section
function PlatformsSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const platforms = [
    {
      icon: Facebook,
      name: 'Facebook & Instagram',
      description: 'Visual storytelling and retargeting campaigns that capture attention and nurture prospects through the buyer journey.',
      features: ['Demographic Targeting', 'Lookalike Audiences', 'Retargeting', 'Lead Gen Forms'],
      color: 'bg-blue-600/20',
    },
    {
      icon: Monitor,
      name: 'Google Ads',
      description: 'Search and display campaigns that capture high-intent prospects actively searching for real estate services.',
      features: ['Search Campaigns', 'Display Network', 'Remarketing', 'Local Service Ads'],
      color: 'bg-red-600/20',
    },
    {
      icon: Youtube,
      name: 'YouTube Advertising',
      description: 'Video campaigns that build brand awareness and showcase your listings with engaging visual content.',
      features: ['In-Stream Ads', 'Discovery Ads', 'Video Sequences', 'Brand Awareness'],
      color: 'bg-red-500/20',
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
            Platforms We <span className="text-gold">Master</span>
          </h2>
          <p 
            className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            Multi-channel campaigns optimized for real estate lead generation
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {platforms.map((platform, index) => (
            <div 
              key={index}
              className="group bg-black border border-dark-border rounded-2xl p-6 sm:p-8 hover:border-gold/50 transition-all duration-500"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.1}s`,
              }}
            >
              <div className={`w-16 h-16 ${platform.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <platform.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="font-display text-xl text-white mb-3">{platform.name}</h3>
              <p className="text-white/60 text-sm sm:text-base mb-6">{platform.description}</p>

              <div className="space-y-2">
                {platform.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-center gap-2 text-sm text-white/70">
                    <Check className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
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
      title: 'Strategy Development',
      description: 'Deep dive into your market, competition, and goals to create a custom advertising strategy.',
    },
    {
      number: '02',
      title: 'Campaign Setup',
      description: 'Build conversion-optimized campaigns with proper tracking, targeting, and creative assets.',
    },
    {
      number: '03',
      title: 'Launch & Optimize',
      description: 'Go live and continuously A/B test ads, audiences, and landing pages for better performance.',
    },
    {
      number: '04',
      title: 'Scale & Report',
      description: 'Scale winning campaigns and provide transparent reporting on metrics that matter.',
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
            Data-driven approach to maximize your advertising ROI
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
      icon: Sparkles,
      name: 'Ad Starter',
      price: '$899',
      subtitle: 'Entry-level campaigns for new advertisers',
      features: [
        '1 Platform (Google or Meta)',
        'Campaign Setup & Management',
        'Ad Creative Design (2)',
        'Monthly Budget: $500-1K',
        'Basic Analytics',
        '30 Days Management',
      ],
      popular: false,
    },
    {
      icon: Crown,
      name: 'Performance Pro',
      price: '$1,799',
      subtitle: 'Multi-platform campaigns for serious growth',
      features: [
        '2 Platforms (Google + Meta)',
        'Everything in Starter',
        'Advanced Targeting',
        'A/B Testing',
        'Retargeting Campaigns',
        'Monthly Budget: $1K-3K',
        '90 Days Management',
      ],
      popular: true,
    },
    {
      icon: Gem,
      name: 'Enterprise Ads',
      price: '$3,499',
      subtitle: 'Full-funnel advertising for top producers',
      features: [
        'All Major Platforms',
        'Everything in Pro',
        'YouTube & Display Ads',
        'Custom Audiences',
        'Advanced Analytics',
        'Monthly Budget: $3K-10K',
        'Dedicated Ad Manager',
        '6 Months Management',
      ],
      popular: false,
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
            Transparent <span className="text-gold">Pricing</span>
          </h2>
          <p 
            className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            Choose the perfect plan for your advertising needs. No hidden fees, just results.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative rounded-2xl p-6 sm:p-8 transition-all duration-500 group ${
                plan.popular 
                  ? 'bg-gold/5 border-2 border-gold scale-105 z-10' 
                  : 'bg-black border border-dark-border hover:border-gold/50'
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
                <span className="text-white/50 text-sm ml-2">/month</span>
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
          All plans include free consultation. No surprises, no hidden fees.
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
              Real Results, Real <span className="text-gold">ROI</span>
            </h2>
            
            <p className="text-white/60 text-base sm:text-lg mb-8">
              Our clients consistently achieve outstanding returns on their advertising investment. 
              Here are some typical results you can expect.
            </p>

            <div className="space-y-6">
              {[
                { metric: '$28', label: 'Average Cost Per Lead', change: '-60%' },
                { metric: '4.2x', label: 'Return on Ad Spend', change: '+180%' },
                { metric: '150+', label: 'Leads Per Month', change: '+200%' },
                { metric: '12%', label: 'Lead to Client Rate', change: '+85%' },
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 bg-black border border-dark-border rounded-xl"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.1}s`,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center">
                      <span className="text-lg font-display text-gold"><AnimatedNumber value={item.metric} /></span>
                    </div>
                    <span className="text-white/70">{item.label}</span>
                  </div>
                  
                  <span className="text-gold font-medium">{item.change}</span>
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
                  <div className="text-white font-semibold text-lg">Campaign Performance</div>
                  <div className="text-white/60 text-sm">Last 30 Days</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-dark-card rounded-xl p-4">
                  <div className="text-white/60 text-sm mb-1">Ad Spend</div>
                  <div className="text-2xl font-display text-white">$5,240</div>
                  <div className="text-gold text-sm">+$1,200 vs last month</div>
                </div>
                
                <div className="bg-dark-card rounded-xl p-4">
                  <div className="text-white/60 text-sm mb-1">Leads Generated</div>
                  <div className="text-2xl font-display text-white">187</div>
                  <div className="text-gold text-sm">+42 vs last month</div>
                </div>
                
                <div className="bg-dark-card rounded-xl p-4">
                  <div className="text-white/60 text-sm mb-1">Cost Per Lead</div>
                  <div className="text-2xl font-display text-white">$28</div>
                  <div className="text-gold text-sm">-$12 vs last month</div>
                </div>
                
                <div className="bg-dark-card rounded-xl p-4">
                  <div className="text-white/60 text-sm mb-1">ROAS</div>
                  <div className="text-2xl font-display text-white">4.2x</div>
                  <div className="text-gold text-sm">+1.1x vs last month</div>
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
          Ready to Scale with <span className="text-gold">Paid Ads</span>?
        </h2>
        
        <p 
          className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
        >
          Let's build a performance-driven advertising system that delivers consistent, qualified leads for your real estate business.
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
            Get Free Strategy Call
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
            <span>Free Ad Account Audit</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-gold" />
            <span>30-Day Performance Guarantee</span>
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
export function PerformanceAdvertisingPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <ServiceHero />
      <OverviewSection />
      <PlatformsSection />
      <ProcessSection />
      <PricingPlansSection />
      <ResultsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
