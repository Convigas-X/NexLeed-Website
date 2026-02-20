import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Target, Users, Lightbulb, ArrowRight, Check, ArrowLeft, BookOpen, Star } from 'lucide-react';
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
          Real Estate <span className="text-gold">Growth Tips</span>
        </h1>
        
        <p 
          className="text-white/70 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto"
          style={{ animation: 'fadeInUp 1s ease-out forwards', animationDelay: '0.4s', opacity: 0 }}
        >
          Proven strategies and expert insights to help you scale your real estate business and close more deals.
        </p>
      </div>
    </section>
  );
}

// Tip Card Component
function TipCard({ tip, index, isVisible }: { tip: any; index: number; isVisible: boolean }) {
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
          <tip.icon className="w-6 h-6 text-gold" />
        </div>
        
        <div className="flex-1">
          <span className="text-gold text-sm font-medium mb-2 block">Tip {index + 1}</span>
          <h3 className="font-display text-xl text-white mb-3 group-hover:text-gold transition-colors duration-300">
            {tip.title}
          </h3>
          <p className="text-white/60 text-sm sm:text-base mb-4">{tip.description}</p>
          
          <div className="space-y-2">
            {tip.points.map((point: string, pIndex: number) => (
              <div key={pIndex} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Tips Section
function TipsSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const tips = [
    {
      icon: Target,
      title: 'Build a Strong Personal Brand',
      description: 'Your brand is your promise to clients. A strong, consistent brand builds trust and makes you memorable in a competitive market.',
      points: [
        'Define your unique value proposition and niche market',
        'Maintain consistent branding across all platforms',
        'Share your story and expertise authentically',
        'Create professional marketing materials and website',
      ],
    },
    {
      icon: Users,
      title: 'Leverage Your Sphere of Influence',
      description: 'Your existing network is your most valuable asset. Past clients, friends, and family are your best source of referrals.',
      points: [
        'Stay in regular contact with past clients',
        'Send personalized updates and market reports',
        'Host client appreciation events',
        'Ask for referrals at the right moments',
      ],
    },
    {
      icon: TrendingUp,
      title: 'Master Digital Marketing',
      description: 'In today\'s market, your online presence is often the first impression. Invest in digital strategies that generate leads.',
      points: [
        'Optimize your website for search engines (SEO)',
        'Run targeted social media advertising campaigns',
        'Create valuable content that attracts buyers',
        'Use CRM tools to track and nurture leads',
      ],
    },
    {
      icon: Lightbulb,
      title: 'Focus on Specialization',
      description: 'Specialists earn more than generalists. Become the go-to expert in a specific market segment or geographic area.',
      points: [
        'Choose a niche: luxury, first-time buyers, investors',
        'Develop deep market knowledge in your farm area',
        'Create specialized content for your target audience',
        'Build relationships with complementary professionals',
      ],
    },
    {
      icon: Star,
      title: 'Deliver Exceptional Service',
      description: 'Happy clients are your best marketing tool. Go above and beyond to create raving fans who refer you to everyone they know.',
      points: [
        'Respond to inquiries within 5 minutes',
        'Provide regular updates throughout the transaction',
        'Solve problems before clients even know they exist',
        'Follow up after closing to maintain relationships',
      ],
    },
    {
      icon: ArrowRight,
      title: 'Invest in Continuous Learning',
      description: 'The real estate industry is constantly evolving. Stay ahead by continuously improving your skills and knowledge.',
      points: [
        'Attend industry conferences and workshops',
        'Earn specialized certifications and designations',
        'Study market trends and economic indicators',
        'Learn from top-performing agents in your market',
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
            Essential Growth <span className="text-gold">Strategies</span>
          </h2>
          <p 
            className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            Proven tips from top-performing agents to accelerate your business growth
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {tips.map((tip, index) => (
            <TipCard key={index} tip={tip} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Stats Section
function StatsSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const stats = [
    { number: '87%', label: 'Of buyers start their search online' },
    { number: '3x', label: 'More referrals from past clients' },
    { number: '68%', label: 'Find agent through referrals' },
    { number: '45%', label: 'Higher income with specialization' },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-dark-card" ref={ref}>
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
            Why These Strategies <span className="text-gold">Work</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6"
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
    <section className="py-16 sm:py-20 lg:py-24 bg-black" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 
          className="font-display text-2xl sm:text-3xl lg:text-4xl text-white mb-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          Ready to <span className="text-gold">Grow Your Business</span>?
        </h2>
        
        <p 
          className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
        >
          Let us help you implement these strategies with our comprehensive real estate solutions.
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
            Explore Our Services
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Main Resource Page
export function RealEstateGrowthTipsPage() {
  return (
    <div className="min-h-screen bg-black">
      <BackButton />
      <ResourceHero />
      <TipsSection />
      <StatsSection />
      <CTASection />
    </div>
  );
}
