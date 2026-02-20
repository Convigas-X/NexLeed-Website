import { useEffect, useRef, useState } from 'react';
import { 
  TrendingUp, Megaphone, Check, ArrowUpRight, 
  Facebook, Youtube, Monitor, Rocket, ChevronRight, Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

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
                  <div className="text-3xl sm:text-4xl font-display text-gold mb-2">{stat.number}</div>
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
                      <span className="text-lg font-display text-gold">{item.metric}</span>
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
      <ResultsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
