import { useEffect, useRef, useState } from 'react';
import { 
  Target, Users, CheckCircle, Shield, Zap, Check, ArrowUpRight, 
  MapPin, Phone, UserCheck, Rocket, ChevronRight, ArrowLeft, Award
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

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

// Back Button Component
function BackButton() {
  const navigate = useNavigate();
  
  return (
    <button
      onClick={() => navigate(-1)}
      className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md border border-white/10 text-white rounded-full hover:bg-gold hover:text-black hover:border-gold transition-all duration-300 group"
    >
      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
      <span className="text-sm font-medium">Back</span>
    </button>
  );
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
          <Target className="w-4 h-4 text-gold mr-2" />
          <span className="text-gold text-sm font-medium">Premium Leads</span>
        </div>
        
        <h1 
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-4 sm:mb-6"
          style={{ animation: 'fadeInUp 1s ease-out forwards', animationDelay: '0.2s', opacity: 0 }}
        >
          Exclusive Buyer <span className="text-gold">& Seller Leads</span>
        </h1>
        
        <p 
          className="text-white/70 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto"
          style={{ animation: 'fadeInUp 1s ease-out forwards', animationDelay: '0.4s', opacity: 0 }}
        >
          Targeted campaigns and data-driven processes designed to deliver high-intent inquiries directly to you.
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
              Quality Over <span className="text-gold">Quantity</span>
            </h2>
            
            <p 
              className="text-white/60 text-base sm:text-lg mb-8"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
              }}
            >
              Stop wasting time on tire-kickers and unqualified prospects. Our exclusive lead generation 
              system identifies and delivers only high-intent buyers and sellers who are ready to take action. 
              Each lead is exclusive to you – never shared with other agents.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { number: '85%', label: 'Lead qualification rate' },
                { number: '3x', label: 'Faster conversion' },
                { number: '100%', label: 'Exclusive leads' },
                { number: '24h', label: 'Lead delivery time' },
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
                src="/assets/service-leads.jpg"
                alt="Exclusive Leads"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 bg-gold text-black px-6 py-3 rounded-xl shadow-gold-lg">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span className="font-semibold">100% Exclusive</span>
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
      icon: UserCheck,
      title: 'Verified Leads',
      description: 'Every lead goes through a verification process to ensure they are serious and ready to engage.',
    },
    {
      icon: MapPin,
      title: 'Market Specific Targeting',
      description: 'Hyper-local targeting ensures you only receive leads from your desired geographic areas.',
    },
    {
      icon: Shield,
      title: 'No Shared Leads',
      description: 'Each lead is exclusive to you. We never sell the same lead to multiple agents.',
    },
    {
      icon: Zap,
      title: 'Instant Delivery',
      description: 'Leads delivered to your CRM within minutes of qualification, so you can respond fast.',
    },
    {
      icon: Phone,
      title: 'Contact Information',
      description: 'Complete contact details including verified phone numbers, emails, and property preferences.',
    },
    {
      icon: CheckCircle,
      title: 'Simple Intake Process',
      description: 'Pre-qualified leads with clear buying/selling timelines and budget information.',
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
            What Makes Our Leads <span className="text-gold">Different</span>
          </h2>
          <p 
            className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            Premium quality leads that convert at higher rates
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

// Lead Types Section
function LeadTypesSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const leadTypes = [
    {
      title: 'Buyer Leads',
      icon: Users,
      description: 'Active buyers looking for properties in your market',
      details: [
        'Pre-approved financing or cash buyers',
        'Specific neighborhood preferences',
        'Timeline: 0-6 months',
        'Budget-qualified',
      ],
    },
    {
      title: 'Seller Leads',
      icon: Award,
      description: 'Homeowners ready to list their property',
      details: [
        'Property value estimate requested',
        'Timeline: 0-3 months',
        'Motivation verified',
        'Comparable market analysis ready',
      ],
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
            Lead <span className="text-gold">Types</span>
          </h2>
          <p 
            className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            Choose the lead type that fits your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {leadTypes.map((type, index) => (
            <div 
              key={index}
              className="bg-dark-card border border-dark-border rounded-2xl p-6 sm:p-8"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.1}s`,
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center">
                  <type.icon className="w-7 h-7 text-gold" />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-white">{type.title}</h3>
                  <p className="text-white/60 text-sm">{type.description}</p>
                </div>
              </div>

              <ul className="space-y-3">
                {type.details.map((detail, dIndex) => (
                  <li key={dIndex} className="flex items-center gap-3 text-white/70">
                    <Check className="w-5 h-5 text-gold flex-shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
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
      title: 'Targeting Setup',
      description: 'Define your ideal client profile, geographic areas, and property criteria.',
    },
    {
      number: '02',
      title: 'Campaign Launch',
      description: 'Deploy multi-channel campaigns to attract qualified prospects.',
    },
    {
      number: '03',
      title: 'Lead Qualification',
      description: 'Our team verifies each lead for intent, timeline, and budget.',
    },
    {
      number: '04',
      title: 'Delivery',
      description: 'Qualified leads delivered instantly to your CRM with full details.',
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
            How It <span className="text-gold">Works</span>
          </h2>
          <p 
            className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            From campaign to closed deal in 4 simple steps
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
              
              <div className="bg-black border border-dark-border rounded-2xl p-6 sm:p-8 h-full">
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
    <section className="py-16 sm:py-20 lg:py-24 bg-black" ref={ref}>
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
              Results You Can <span className="text-gold">Expect</span>
            </h2>
            
            <p className="text-white/60 text-base sm:text-lg mb-8">
              Our clients consistently outperform their competition with higher conversion 
              rates and faster deal cycles.
            </p>

            <div className="space-y-4">
              {[
                { metric: '85%', label: 'Lead response rate' },
                { metric: '3.2x', label: 'Higher conversion vs shared leads' },
                { metric: '45 days', label: 'Average time to close' },
                { metric: '4.8/5', label: 'Client satisfaction rating' },
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
                    <span className="text-xl font-display text-gold">{item.metric}</span>
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
            <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gold rounded-xl flex items-center justify-center">
                  <Target className="w-8 h-8 text-black" />
                </div>
                <div>
                  <div className="text-white font-semibold text-lg">Lead Performance</div>
                  <div className="text-white/60 text-sm">Last 30 Days</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/60">Leads Delivered</span>
                    <span className="text-white">47</span>
                  </div>
                  <div className="w-full bg-black rounded-full h-2">
                    <div className="bg-gold h-2 rounded-full" style={{ width: '94%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/60">Contacted</span>
                    <span className="text-white">40 (85%)</span>
                  </div>
                  <div className="w-full bg-black rounded-full h-2">
                    <div className="bg-gold h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/60">Appointments Set</span>
                    <span className="text-white">28 (60%)</span>
                  </div>
                  <div className="w-full bg-black rounded-full h-2">
                    <div className="bg-gold h-2 rounded-full" style={{ width: '70%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/60">Closed Deals</span>
                    <span className="text-white">8 (17%)</span>
                  </div>
                  <div className="w-full bg-black rounded-full h-2">
                    <div className="bg-gold h-2 rounded-full" style={{ width: '40%' }} />
                  </div>
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
    <section className="py-16 sm:py-20 lg:py-24 bg-dark-card" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 
          className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white mb-4 sm:mb-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          Ready for <span className="text-gold">Exclusive Leads</span>?
        </h2>
        
        <p 
          className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
        >
          Start receiving high-quality, exclusive buyer and seller leads delivered directly to your inbox.
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
            Get Started
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
            <span>Exclusive Leads Only</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-gold" />
            <span>Pre-Qualified Prospects</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-gold" />
            <span>Instant CRM Integration</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Service Page
export function ExclusiveLeadsPage() {
  return (
    <div className="min-h-screen bg-black">
      <BackButton />
      <ServiceHero />
      <OverviewSection />
      <FeaturesSection />
      <LeadTypesSection />
      <ProcessSection />
      <ResultsSection />
      <CTASection />
    </div>
  );
}
