import { useEffect, useRef, useState } from 'react';
import { Palette, Camera, Share2, Award, Target, ArrowRight, Check, BookOpen, MessageSquare, PenTool, Eye } from 'lucide-react';
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
          Agent <span className="text-gold">Branding Guide</span>
        </h1>
        
        <p 
          className="text-white/70 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto"
          style={{ animation: 'fadeInUp 1s ease-out forwards', animationDelay: '0.4s', opacity: 0 }}
        >
          Build a powerful, memorable personal brand that attracts clients, builds trust, and positions you as the go-to expert in your market.
        </p>
      </div>
    </section>
  );
}

// Section Card Component
function SectionCard({ section, index, isVisible }: { section: any; index: number; isVisible: boolean }) {
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
          <section.icon className="w-6 h-6 text-gold" />
        </div>
        
        <div className="flex-1">
          <span className="text-gold text-sm font-medium mb-2 block">Step {index + 1}</span>
          <h3 className="font-display text-xl text-white mb-3 group-hover:text-gold transition-colors duration-300">
            {section.title}
          </h3>
          <p className="text-white/60 text-sm sm:text-base mb-4">{section.description}</p>
          
          <div className="space-y-2">
            {section.points.map((point: string, pIndex: number) => (
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

// Branding Steps Section
function BrandingStepsSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const steps = [
    {
      icon: Target,
      title: 'Define Your Unique Value Proposition',
      description: 'Your brand starts with clarity about who you serve and what makes you different from every other agent.',
      points: [
        'Identify your target audience (first-time buyers, luxury, investors)',
        'Determine your geographic farm area and become the local expert',
        'Define your core values and what you stand for',
        'Craft a compelling brand story that resonates with clients',
        'Create a clear, concise elevator pitch (30 seconds or less)',
      ],
    },
    {
      icon: Palette,
      title: 'Develop Your Visual Identity',
      description: 'Consistent visual elements create recognition and professionalism across all touchpoints.',
      points: [
        'Choose a professional color palette (2-3 primary colors max)',
        'Design or commission a professional logo',
        'Select brand fonts that are readable and modern',
        'Create templates for business cards, presentations, and marketing',
        'Develop brand guidelines document for consistency',
      ],
    },
    {
      icon: Camera,
      title: 'Invest in Professional Photography',
      description: 'High-quality photos of you, your team, and your work environment build trust and credibility.',
      points: [
        'Hire a professional photographer for headshots',
        'Get environmental shots in your farm area',
        'Document client success stories with permission',
        'Update photos annually or when your appearance changes',
        'Use consistent editing style across all images',
      ],
    },
    {
      icon: Share2,
      title: 'Optimize Your Online Presence',
      description: 'Your digital footprint is often the first impression potential clients have of your brand.',
      points: [
        'Build a professional website that reflects your brand',
        'Claim and optimize your Google Business Profile',
        'Maintain consistent branding across all social platforms',
        'Ensure NAP (Name, Address, Phone) consistency everywhere',
        'Create a Linktree or similar for social bio optimization',
      ],
    },
    {
      icon: PenTool,
      title: 'Create Valuable Content',
      description: 'Position yourself as a thought leader by sharing expertise that helps your target audience.',
      points: [
        'Write blog posts about local market trends and insights',
        'Share neighborhood guides and community spotlights',
        'Create video content: market updates, Q&As, tours',
        'Post client testimonials and success stories',
        'Develop downloadable resources (guides, checklists)',
      ],
    },
    {
      icon: Award,
      title: 'Build Social Proof',
      description: 'Third-party validation through reviews, awards, and testimonials accelerates trust-building.',
      points: [
        'Actively request reviews from satisfied clients',
        'Showcase awards, certifications, and designations',
        'Share media mentions and press coverage',
        'Display transaction statistics and sales volume',
        'Feature client video testimonials prominently',
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
            Building Your <span className="text-gold">Personal Brand</span>
          </h2>
          <p 
            className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            Follow these essential steps to create a brand that stands out and attracts your ideal clients
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <SectionCard key={index} section={step} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Brand Voice Section
function BrandVoiceSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const voiceAttributes = [
    { title: 'Authentic', description: 'Be genuine and true to yourself. Clients can spot inauthenticity immediately.' },
    { title: 'Professional', description: 'Maintain appropriate boundaries while being approachable and friendly.' },
    { title: 'Knowledgeable', description: 'Share expertise confidently without being condescending.' },
    { title: 'Consistent', description: 'Use the same tone and messaging across all platforms and interactions.' },
    { title: 'Client-Focused', description: 'Make every communication about them, not about you.' },
    { title: 'Trustworthy', description: 'Be honest, transparent, and follow through on promises.' },
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
              Define Your <span className="text-gold">Brand Voice</span>
            </h2>
            
            <p className="text-white/60 text-base sm:text-lg mb-8">
              Your brand voice is how you communicate with your audience. It should reflect your personality while resonating with your target clients.
            </p>

            <div className="space-y-4">
              {voiceAttributes.map((attr, index) => (
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
                    <MessageSquare className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">{attr.title}</h3>
                    <p className="text-white/60 text-sm">{attr.description}</p>
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
                <Eye className="w-8 h-8 text-black" />
              </div>
              <div>
                <div className="text-white font-semibold text-lg">Brand Consistency Checklist</div>
                <div className="text-white/60 text-sm">Use this before publishing content</div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                'Does this align with my brand values?',
                'Is the tone appropriate for my audience?',
                'Are visuals consistent with my brand guidelines?',
                'Does this provide value to my target client?',
                'Would I be proud to have this represent me?',
                'Is the message clear and professional?',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-dark-card rounded-lg">
                  <Check className="w-5 h-5 text-gold flex-shrink-0" />
                  <span className="text-white/70 text-sm">{item}</span>
                </div>
              ))}
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
    { number: '89%', label: 'of buyers work with the agent they know' },
    { number: '5-7', label: 'brand impressions needed for recognition' },
    { number: '3x', label: 'more referrals with strong personal brand' },
    { number: '23%', label: 'higher commission rates for branded agents' },
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
            Why <span className="text-gold">Branding</span> Matters
          </h2>
          <p 
            className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            The impact of a strong personal brand on your real estate success
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
          Ready to Build Your <span className="text-gold">Brand</span>?
        </h2>
        
        <p 
          className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
        >
          Let us help you create a consistent, professional brand presence that attracts your ideal clients.
        </p>

        <div 
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          }}
        >
          <Link
            to="/services/brand-content"
            className="inline-flex items-center px-8 py-4 bg-gold text-black font-medium rounded-full hover:bg-gold-light transition-all duration-300 hover:scale-105 hover:shadow-gold-lg"
          >
            Explore Brand Content Services
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Main Resource Page
export function AgentBrandingGuidePage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <ResourceHero />
      <BrandingStepsSection />
      <BrandVoiceSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
