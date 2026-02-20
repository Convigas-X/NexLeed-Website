import { useEffect, useRef, useState } from 'react';
import { Instagram, Facebook, Linkedin, Video, Camera, Heart, MessageCircle, Share2, ArrowRight, Check, BookOpen, Users, Calendar, Hash, Monitor } from 'lucide-react';
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
          Social Media Tips for <span className="text-gold">Agents</span>
        </h1>
        
        <p 
          className="text-white/70 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto"
          style={{ animation: 'fadeInUp 1s ease-out forwards', animationDelay: '0.4s', opacity: 0 }}
        >
          Master social media marketing to build your brand, engage with prospects, and generate consistent leads for your real estate business.
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
      icon: Calendar,
      title: 'Post Consistently',
      description: 'Consistency is key to building an engaged audience. Create a content calendar and stick to it.',
      points: [
        'Aim for 5-7 posts per week minimum on your primary platform',
        'Use scheduling tools like Buffer, Hootsuite, or Later',
        'Batch create content in advance to maintain consistency',
        'Post at optimal times when your audience is most active',
        'Mix up content types: photos, videos, carousels, stories',
      ],
    },
    {
      icon: Video,
      title: 'Leverage Video Content',
      description: 'Video gets the highest engagement on social media. Use it to showcase properties and your personality.',
      points: [
        'Create property walkthrough videos and virtual tours',
        'Film neighborhood highlights and local business spotlights',
        'Share market update videos weekly',
        'Use Instagram Reels and TikTok for short-form content',
        'Go live for Q&A sessions and open houses',
      ],
    },
    {
      icon: Heart,
      title: 'Engage Authentically',
      description: 'Social media is about being social. Engage with your audience to build relationships and trust.',
      points: [
        'Respond to all comments within 1-2 hours',
        'Reply to DMs promptly and professionally',
        'Like and comment on followers posts genuinely',
        'Ask questions in your captions to encourage engagement',
        'Create polls and interactive stories',
      ],
    },
    {
      icon: Camera,
      title: 'Use High-Quality Visuals',
      description: 'Professional-looking photos and videos make a significant difference in how your brand is perceived.',
      points: [
        'Invest in professional listing photography',
        'Use natural lighting for personal photos',
        'Edit photos consistently with your brand colors',
        'Create branded graphics using Canva or similar tools',
        'Avoid blurry, low-resolution, or poorly lit images',
      ],
    },
    {
      icon: Users,
      title: 'Showcase Client Success',
      description: 'Social proof is powerful. Share your wins (with permission) to build credibility.',
      points: [
        'Share closing day photos with happy clients',
        'Post testimonials and reviews',
        'Create before/after transformation stories',
        'Celebrate milestones and anniversaries',
        'Feature client video testimonials',
      ],
    },
    {
      icon: Hash,
      title: 'Use Hashtags Strategically',
      description: 'Hashtags help new people discover your content. Use them wisely to expand your reach.',
      points: [
        'Use 20-30 relevant hashtags on Instagram posts',
        'Mix popular hashtags (#realestate) with niche ones (#austinluxuryhomes)',
        'Create a branded hashtag for your business',
        'Research hashtags your ideal clients are following',
        'Avoid banned or spammy hashtags',
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
            Essential Social Media <span className="text-gold">Tips</span>
          </h2>
          <p 
            className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            Proven strategies to maximize your social media presence and engagement
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

// Platform Section
function PlatformSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const platforms = [
    {
      icon: Instagram,
      name: 'Instagram',
      color: 'bg-pink-600/20',
      tips: [
        'Focus on visual storytelling with high-quality photos',
        'Use Stories daily for behind-the-scenes content',
        'Post Reels 3-4 times per week for maximum reach',
        'Create saved highlights for neighborhoods and FAQs',
        'Use location tags on every post',
      ],
    },
    {
      icon: Facebook,
      name: 'Facebook',
      color: 'bg-blue-600/20',
      tips: [
        'Join and engage in local community groups',
        'Create a business page with complete information',
        'Share market updates and community news',
        'Use Facebook Live for virtual open houses',
        'Run targeted ads to reach potential buyers',
      ],
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      color: 'bg-blue-700/20',
      tips: [
        'Position yourself as a market expert',
        'Share industry insights and market analysis',
        'Connect with other professionals (lenders, attorneys)',
        'Publish long-form articles about real estate trends',
        'Engage with other agents content thoughtfully',
      ],
    },
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
            Platform-Specific <span className="text-gold">Strategies</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {platforms.map((platform, index) => (
            <div 
              key={index}
              className="bg-black border border-dark-border rounded-2xl p-6 sm:p-8 hover:border-gold/50 transition-all duration-500 group"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.1}s`,
              }}
            >
              <div className={`w-16 h-16 ${platform.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <platform.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="font-display text-xl text-white mb-4">{platform.name}</h3>
              
              <div className="space-y-3">
                {platform.tips.map((tip, tIndex) => (
                  <div key={tIndex} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-white/70 text-sm">{tip}</span>
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

// Content Ideas Section
function ContentIdeasSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const contentTypes = [
    { icon: Camera, title: 'Property Showcases', description: 'Virtual tours, listing photos, before/after transformations' },
    { icon: Monitor, title: 'Market Updates', description: 'Monthly statistics, price trends, neighborhood reports' },
    { icon: Users, title: 'Client Stories', description: 'Testimonials, closing celebrations, success stories' },
    { icon: Share2, title: 'Community Spotlights', description: 'Local businesses, events, neighborhood features' },
    { icon: Heart, title: 'Behind the Scenes', description: 'Day in the life, office culture, team highlights' },
    { icon: MessageCircle, title: 'Tips & Advice', description: 'Home buying guides, seller tips, market insights' },
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
            Content Ideas That <span className="text-gold">Work</span>
          </h2>
          <p 
            className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            Mix these content types to keep your feed fresh and engaging
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contentTypes.map((type, index) => (
            <div 
              key={index}
              className="bg-dark-card border border-dark-border rounded-2xl p-6 text-center hover:border-gold/50 transition-all duration-500 group"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.1}s`,
              }}
            >
              <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors duration-300">
                <type.icon className="w-7 h-7 text-gold" />
              </div>
              
              <h3 className="font-display text-lg text-white mb-2">{type.title}</h3>
              <p className="text-white/60 text-sm">{type.description}</p>
            </div>
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
    { number: '74%', label: 'of agents use social media for business' },
    { number: '3x', label: 'more engagement with video content' },
    { number: '63%', label: 'of buyers found their home online' },
    { number: '2.5x', label: 'higher conversion with social media leads' },
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
            Social Media <span className="text-gold">By The Numbers</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-black border border-dark-border rounded-2xl"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.1}s`,
              }}
            >
              <div className="text-4xl sm:text-5xl font-display text-gold mb-2"><AnimatedNumber value={stat.number} /></div>
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
          Ready to Dominate <span className="text-gold">Social Media</span>?
        </h2>
        
        <p 
          className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
        >
          Let us handle your social media so you can focus on closing deals.
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
            Get Social Media Management
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Main Resource Page
export function SocialMediaTipsPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <ResourceHero />
      <TipsSection />
      <PlatformSection />
      <ContentIdeasSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
