import { useEffect, useRef, useState } from 'react';
import { Target, Users, Zap, Globe, Mail, Phone, ArrowRight, Check, BookOpen, BarChart3, MessageSquare } from 'lucide-react';
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
function ResourceHero() {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
        <div 
          className="inline-flex items-center px-4 py-2 bg-gold/10 border border-gold/30 rounded-full mb-6"
          style={{ animation: 'fadeInUp 1s ease-out forwards', opacity: 0 }}
        >
          <BookOpen className="w-4 h-4 text-gold mr-2" />
          <span className="text-gold text-sm font-medium">Resource</span>
        </div>
        
        <h1 
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-4 sm:mb-6"
          style={{ animation: 'fadeInUp 1s ease-out forwards', animationDelay: '0.2s', opacity: 0 }}
        >
          Lead Generation <span className="text-gold">Strategies</span>
        </h1>
        
        <p 
          className="text-white/70 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto"
          style={{ animation: 'fadeInUp 1s ease-out forwards', animationDelay: '0.4s', opacity: 0 }}
        >
          Comprehensive guide to attracting, capturing, and converting high-quality leads in today's competitive real estate market.
        </p>
      </div>
    </section>
  );
}

// Strategy Card Component
function StrategyCard({ strategy, index, isVisible }: { strategy: any; index: number; isVisible: boolean }) {
  return (
    <div 
      className="bg-dark-card border border-dark-border rounded-2xl p-6 sm:p-8 hover:border-gold/50 transition-all duration-500 group"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.08}s`,
      }}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
          <strategy.icon className="w-6 h-6 text-gold" />
        </div>
        
        <div className="flex-1">
          <span className="text-gold text-sm font-medium mb-2 block">Strategy {index + 1}</span>
          <h3 className="font-display text-xl text-white mb-3 group-hover:text-gold transition-colors duration-300">
            {strategy.title}
          </h3>
          <p className="text-white/60 text-sm sm:text-base mb-4">{strategy.description}</p>
          
          <div className="space-y-2">
            {strategy.tactics.map((tactic: string, tIndex: number) => (
              <div key={tIndex} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">{tactic}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Strategies Section
function StrategiesSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const strategies = [
    {
      icon: Globe,
      title: 'Optimize Your Digital Presence',
      description: 'Your website and online profiles are often the first impression potential clients have of you. Make them count.',
      tactics: [
        'Create a mobile-responsive website with fast loading speeds',
        'Implement SEO best practices to rank for local keywords',
        'Set up and optimize your Google Business Profile',
        'Maintain active, professional social media profiles',
        'Use high-quality photos and virtual tours for listings',
      ],
    },
    {
      icon: Target,
      title: 'Run Targeted Paid Advertising',
      description: 'Paid advertising allows you to reach specific audiences actively looking for real estate services in your area.',
      tactics: [
        'Use Facebook and Instagram ads with detailed demographic targeting',
        'Run Google Ads for high-intent keywords like "homes for sale in [city]"',
        'Create retargeting campaigns for website visitors',
        'Test different ad creatives and copy for optimal performance',
        'Track ROI and adjust budgets based on lead quality',
      ],
    },
    {
      icon: Users,
      title: 'Build Strategic Partnerships',
      description: 'Referral partnerships with complementary businesses can provide a steady stream of qualified leads.',
      tactics: [
        'Partner with mortgage brokers and lenders',
        'Build relationships with divorce attorneys and financial advisors',
        'Connect with relocation specialists and moving companies',
        'Collaborate with interior designers and home stagers',
        'Join local business networking groups',
      ],
    },
    {
      icon: Mail,
      title: 'Implement Email Marketing',
      description: 'Email marketing remains one of the highest ROI channels for nurturing leads and staying top-of-mind.',
      tactics: [
        'Build segmented email lists (buyers, sellers, past clients)',
        'Send weekly market updates and neighborhood news',
        'Create automated drip campaigns for new leads',
        'Provide valuable content like home buying guides',
        'Personalize emails based on lead behavior and interests',
      ],
    },
    {
      icon: MessageSquare,
      title: 'Leverage Content Marketing',
      description: 'Position yourself as a market expert by creating valuable content that attracts and educates potential clients.',
      tactics: [
        'Write blog posts about local market trends and insights',
        'Create video walkthroughs of neighborhoods and listings',
        'Host webinars on first-time home buying or investing',
        'Share client success stories and testimonials',
        'Produce market reports and neighborhood guides',
      ],
    },
    {
      icon: Phone,
      title: 'Master Follow-Up Systems',
      description: 'The fortune is in the follow-up. Most deals are won through persistent, professional follow-up.',
      tactics: [
        'Respond to all inquiries within 5 minutes',
        'Use a CRM to track and automate follow-up sequences',
        'Mix phone calls, texts, and emails in your outreach',
        'Create follow-up templates for different scenarios',
        'Schedule regular check-ins with past clients',
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
            Proven Lead Generation <span className="text-gold">Strategies</span>
          </h2>
          <p 
            className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            Multi-channel approaches to attract and convert qualified leads
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {strategies.map((strategy, index) => (
            <StrategyCard key={index} strategy={strategy} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Lead Magnets Section
function LeadMagnetsSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const magnets = [
    { title: 'Home Valuation Reports', description: 'Offer free property valuations in exchange for contact information' },
    { title: 'Buyer\'s Guides', description: 'Create comprehensive guides for first-time homebuyers' },
    { title: 'Market Reports', description: 'Provide monthly market updates and trends analysis' },
    { title: 'Seller Checklists', description: 'Offer preparation checklists for home sellers' },
    { title: 'Neighborhood Guides', description: 'Create detailed guides about local communities' },
    { title: 'Investment Calculators', description: 'Build tools to analyze rental property ROI' },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-dark-card" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white mb-6">
              High-Converting <span className="text-gold">Lead Magnets</span>
            </h2>
            
            <p className="text-white/60 text-base sm:text-lg mb-8">
              Lead magnets are valuable resources you offer in exchange for contact information. 
              The right lead magnet can generate hundreds of qualified leads per month.
            </p>

            <div className="space-y-4">
              {magnets.map((magnet, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.1}s`,
                  }}
                >
                  <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">{magnet.title}</h3>
                    <p className="text-white/60 text-sm">{magnet.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div 
            className="bg-black border border-dark-border rounded-2xl p-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
            }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gold rounded-xl flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-black" />
              </div>
              <div>
                <div className="text-white font-semibold text-lg">Lead Generation ROI</div>
                <div className="text-white/60 text-sm">Average results from our strategies</div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">Cost Per Lead</span>
                  <span className="text-gold">$25-75</span>
                </div>
                <div className="w-full bg-dark-card rounded-full h-2">
                  <div className="bg-gold h-2 rounded-full" style={{ width: '40%' }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">Conversion Rate</span>
                  <span className="text-gold">8-15%</span>
                </div>
                <div className="w-full bg-dark-card rounded-full h-2">
                  <div className="bg-gold h-2 rounded-full" style={{ width: '60%' }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">Lead to Close Time</span>
                  <span className="text-gold">30-90 days</span>
                </div>
                <div className="w-full bg-dark-card rounded-full h-2">
                  <div className="bg-gold h-2 rounded-full" style={{ width: '75%' }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">Average Commission</span>
                  <span className="text-gold">$10-20k</span>
                </div>
                <div className="w-full bg-dark-card rounded-full h-2">
                  <div className="bg-gold h-2 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-dark-border">
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Average ROI</span>
                <span className="text-gold font-semibold text-xl">400-800%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Stats Section
function StatsSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const stats = [
    { number: '61%', label: 'of marketers say lead gen is their biggest challenge' },
    { number: '80%', label: 'of leads never translate into sales without follow-up' },
    { number: '5x', label: 'more likely to buy if contacted within 5 minutes' },
    { number: '67%', label: "of the buyer's journey is now done digitally" },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 
            className="font-display text-2xl sm:text-3xl lg:text-4xl text-white mb-4"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            The <span className="text-gold">Numbers</span> Don't Lie
          </h2>
          <p 
            className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            Key statistics that highlight the importance of effective lead generation
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-dark-card border border-dark-border rounded-2xl"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.1}s`,
              }}
            >
              <div className="text-4xl sm:text-5xl font-display text-gold mb-2">{stat.number}</div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </div>
          ))}
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
          className="font-display text-2xl sm:text-3xl lg:text-4xl text-white mb-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          Ready to <span className="text-gold">Generate More Leads</span>?
        </h2>
        
        <p 
          className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
        >
          Let us implement these strategies for you with our proven lead generation systems.
        </p>

        <div 
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          }}
        >
          <Link
            to="/services"
            className="inline-flex items-center px-8 py-4 bg-gold text-black font-medium rounded-full hover:bg-gold-light transition-all duration-300 hover:scale-105 hover:shadow-gold-lg"
          >
            Get Exclusive Leads
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Main Resource Page
export function LeadGenerationStrategiesPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <ResourceHero />
      <StrategiesSection />
      <LeadMagnetsSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
