import { useEffect, useRef, useState } from 'react';
import { 
  Share2, Camera, Calendar, Heart, TrendingUp, Check, ArrowUpRight, 
  Instagram, Facebook, Linkedin, Rocket, ChevronRight, ArrowLeft, Award, Palette
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
    <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/service-content.jpg)' }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
        <div 
          className="inline-flex items-center px-4 py-2 bg-gold/10 border border-gold/30 rounded-full mb-6"
          style={{ animation: 'fadeInUp 1s ease-out forwards', opacity: 0 }}
        >
          <Share2 className="w-4 h-4 text-gold mr-2" />
          <span className="text-gold text-sm font-medium">Content Marketing</span>
        </div>
        
        <h1 
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-4 sm:mb-6"
          style={{ animation: 'fadeInUp 1s ease-out forwards', animationDelay: '0.2s', opacity: 0 }}
        >
          Consistent, Brand-Aligned <span className="text-gold">Content</span>
        </h1>
        
        <p 
          className="text-white/70 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto"
          style={{ animation: 'fadeInUp 1s ease-out forwards', animationDelay: '0.4s', opacity: 0 }}
        >
          Simple, effective content that strengthens your presence and keeps your brand active across social platforms.
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
              Stay Top of Mind, <span className="text-gold">Effortlessly</span>
            </h2>
            
            <p 
              className="text-white/60 text-base sm:text-lg mb-8"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
              }}
            >
              Consistent social media presence builds trust and keeps you top-of-mind with potential clients. 
              But creating content takes time you don't have. We handle everything from strategy to scheduling, 
              so your brand stays active and professional without you lifting a finger.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { number: '5x', label: 'More engagement' },
                { number: '60%', label: 'Time saved weekly' },
                { number: '12+', label: 'Posts per week' },
                { number: '3x', label: 'Follower growth' },
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
                src="/assets/service-content.jpg"
                alt="Content Marketing"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 bg-gold text-black px-6 py-3 rounded-xl shadow-gold-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">Always On Brand</span>
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
      icon: Camera,
      title: 'Posts & Stories',
      description: 'Eye-catching graphics and videos designed specifically for real estate audiences.',
    },
    {
      icon: Palette,
      title: 'Brand Consistency',
      description: 'Every piece of content aligns with your brand colors, fonts, and messaging.',
    },
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'Content published at optimal times for maximum reach and engagement.',
    },
    {
      icon: Heart,
      title: 'Engagement Support',
      description: 'We monitor comments and messages, providing timely responses to build relationships.',
    },
    {
      icon: Share2,
      title: 'Multi-Platform',
      description: 'Content optimized for Instagram, Facebook, LinkedIn, and other relevant platforms.',
    },
    {
      icon: TrendingUp,
      title: 'Performance Tracking',
      description: 'Monthly reports showing growth, engagement, and content performance metrics.',
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
            Complete Content <span className="text-gold">Solution</span>
          </h2>
          <p 
            className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            Everything you need for a strong social media presence
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

// Platforms Section
function PlatformsSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const platforms = [
    {
      icon: Instagram,
      name: 'Instagram',
      description: 'Visual storytelling with Reels, Stories, and feed posts showcasing listings and lifestyle.',
    },
    {
      icon: Facebook,
      name: 'Facebook',
      description: 'Community building with market updates, client testimonials, and neighborhood highlights.',
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      description: 'Professional content positioning you as a market expert and industry thought leader.',
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
            Platforms We <span className="text-gold">Manage</span>
          </h2>
          <p 
            className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            Tailored content for each social platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {platforms.map((platform, index) => (
            <div 
              key={index}
              className="group bg-dark-card border border-dark-border rounded-2xl p-6 sm:p-8 hover:border-gold/50 transition-all duration-500"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.1}s`,
              }}
            >
              <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <platform.icon className="w-8 h-8 text-gold" />
              </div>
              
              <h3 className="font-display text-xl text-white mb-3">{platform.name}</h3>
              <p className="text-white/60 text-sm sm:text-base">{platform.description}</p>
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
      title: 'Brand Discovery',
      description: 'We learn your brand voice, target audience, and content goals.',
    },
    {
      number: '02',
      title: 'Strategy & Planning',
      description: 'Develop a content calendar aligned with your marketing objectives.',
    },
    {
      number: '03',
      title: 'Content Creation',
      description: 'Design and write engaging posts, stories, and graphics.',
    },
    {
      number: '04',
      title: 'Publish & Engage',
      description: 'Schedule posts and manage community engagement.',
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
            From strategy to engagement in 4 steps
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
              Real Results from Real <span className="text-gold">Content</span>
            </h2>
            
            <p className="text-white/60 text-base sm:text-lg mb-8">
              Our clients see significant improvements in their social media presence 
              and engagement within the first month.
            </p>

            <div className="space-y-4">
              {[
                { metric: '+340%', label: 'Engagement rate increase' },
                { metric: '+2.5k', label: 'New followers per month' },
                { metric: '45%', label: 'More profile visits' },
                { metric: '12%', label: 'Lead conversion from social' },
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
                  <Award className="w-8 h-8 text-black" />
                </div>
                <div>
                  <div className="text-white font-semibold text-lg">Content Performance</div>
                  <div className="text-white/60 text-sm">Last 30 Days</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black rounded-xl p-4">
                  <div className="text-white/60 text-sm mb-1">Total Reach</div>
                  <div className="text-2xl font-display text-white">48.2K</div>
                  <div className="text-gold text-sm">+156%</div>
                </div>
                
                <div className="bg-black rounded-xl p-4">
                  <div className="text-white/60 text-sm mb-1">Engagement</div>
                  <div className="text-2xl font-display text-white">3.8K</div>
                  <div className="text-gold text-sm">+240%</div>
                </div>
                
                <div className="bg-black rounded-xl p-4">
                  <div className="text-white/60 text-sm mb-1">Profile Visits</div>
                  <div className="text-2xl font-display text-white">2.1K</div>
                  <div className="text-gold text-sm">+89%</div>
                </div>
                
                <div className="bg-black rounded-xl p-4">
                  <div className="text-white/60 text-sm mb-1">New Followers</div>
                  <div className="text-2xl font-display text-white">+847</div>
                  <div className="text-gold text-sm">+312%</div>
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
          Ready to Amplify Your <span className="text-gold">Brand</span>?
        </h2>
        
        <p 
          className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
        >
          Let's create consistent, engaging content that builds your brand and attracts more clients.
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
            <span>Brand-Focused Content</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-gold" />
            <span>Multi-Platform Posting</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-gold" />
            <span>Engagement Management</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Service Page
export function BrandContentPage() {
  return (
    <div className="min-h-screen bg-black">
      <BackButton />
      <ServiceHero />
      <OverviewSection />
      <FeaturesSection />
      <PlatformsSection />
      <ProcessSection />
      <ResultsSection />
      <CTASection />
    </div>
  );
}
