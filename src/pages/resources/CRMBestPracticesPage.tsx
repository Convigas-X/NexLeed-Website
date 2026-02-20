import { useEffect, useRef, useState } from 'react';
import { Users, Zap, Calendar, Mail, CheckCircle, BarChart3, ArrowRight, Check, ArrowLeft, BookOpen, Settings, Smartphone, Filter, Bell } from 'lucide-react';
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
          CRM <span className="text-gold">Best Practices</span>
        </h1>
        
        <p 
          className="text-white/70 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto"
          style={{ animation: 'fadeInUp 1s ease-out forwards', animationDelay: '0.4s', opacity: 0 }}
        >
          Master your Customer Relationship Management system to organize contacts, automate follow-ups, and close more deals efficiently.
        </p>
      </div>
    </section>
  );
}

// Practice Card Component
function PracticeCard({ practice, index, isVisible }: { practice: any; index: number; isVisible: boolean }) {
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
          <practice.icon className="w-6 h-6 text-gold" />
        </div>
        
        <div className="flex-1">
          <span className="text-gold text-sm font-medium mb-2 block">Practice {index + 1}</span>
          <h3 className="font-display text-xl text-white mb-3 group-hover:text-gold transition-colors duration-300">
            {practice.title}
          </h3>
          <p className="text-white/60 text-sm sm:text-base mb-4">{practice.description}</p>
          
          <div className="space-y-2">
            {practice.steps.map((step: string, sIndex: number) => (
              <div key={sIndex} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Practices Section
function PracticesSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const practices = [
    {
      icon: Settings,
      title: 'Set Up Your CRM Properly',
      description: 'A well-configured CRM is the foundation of effective contact management and lead tracking.',
      steps: [
        'Import all existing contacts with complete information',
        'Create custom fields for property preferences and timeline',
        'Set up lead sources to track marketing ROI',
        'Configure pipeline stages that match your sales process',
        'Establish user permissions and team access levels',
      ],
    },
    {
      icon: Filter,
      title: 'Segment Your Contacts',
      description: 'Not all contacts are the same. Proper segmentation allows for targeted communication and better conversion rates.',
      steps: [
        'Create segments: Buyers, Sellers, Past Clients, Referrals',
        'Tag contacts by price range and property type preferences',
        'Segment by timeline: Hot leads, Nurture, Long-term',
        'Group by lead source for attribution tracking',
        'Use custom tags for specific criteria (investors, first-time buyers)',
      ],
    },
    {
      icon: Zap,
      title: 'Automate Your Workflows',
      description: 'Automation ensures no lead falls through the cracks and saves hours of manual work every week.',
      steps: [
        'Create automated welcome sequences for new leads',
        'Set up task reminders for follow-up activities',
        'Automate birthday and anniversary greetings',
        'Trigger emails based on behavior (website visits, email opens)',
        'Use smart lists that update automatically based on criteria',
      ],
    },
    {
      icon: Bell,
      title: 'Implement Smart Notifications',
      description: 'Stay on top of important activities without being overwhelmed by irrelevant alerts.',
      steps: [
        'Set up instant alerts for hot lead activities',
        'Configure daily digest emails with priority tasks',
        'Get notified when prospects visit your website',
        'Receive alerts for overdue follow-ups',
        'Use mobile push notifications for urgent items only',
      ],
    },
    {
      icon: Calendar,
      title: 'Schedule Everything',
      description: 'Your CRM calendar should be your single source of truth for all appointments and follow-ups.',
      steps: [
        'Sync your CRM calendar with Google or Outlook',
        'Schedule follow-up tasks immediately after each interaction',
        'Block time for prospecting and lead generation activities',
        'Set recurring tasks for client check-ins',
        'Use calendar integration for automated appointment booking',
      ],
    },
    {
      icon: CheckCircle,
      title: 'Maintain Data Hygiene',
      description: 'Clean, accurate data is essential for effective CRM usage and reliable reporting.',
      steps: [
        'Deduplicate contacts regularly',
        'Verify and update contact information quarterly',
        'Archive inactive leads instead of deleting them',
        'Standardize data entry formats (phone numbers, addresses)',
        'Review and clean up custom fields periodically',
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
            Essential CRM <span className="text-gold">Practices</span>
          </h2>
          <p 
            className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            Master these practices to maximize your CRM investment and close more deals
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {practices.map((practice, index) => (
            <PracticeCard key={index} practice={practice} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const features = [
    {
      icon: Mail,
      title: 'Email Integration',
      description: 'Sync all email communications automatically. Track opens, clicks, and engagement directly in your CRM.',
    },
    {
      icon: Smartphone,
      title: 'Mobile Access',
      description: 'Access your CRM on the go. Update contacts, log calls, and check tasks from your smartphone.',
    },
    {
      icon: BarChart3,
      title: 'Reporting & Analytics',
      description: 'Track conversion rates, pipeline value, and agent performance with customizable dashboards.',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share contacts, assign tasks, and collaborate with team members seamlessly within the CRM.',
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
            Must-Have CRM <span className="text-gold">Features</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-black border border-dark-border rounded-2xl p-6 text-center hover:border-gold/50 transition-all duration-500 group"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.1}s`,
              }}
            >
              <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-gold" />
              </div>
              
              <h3 className="font-display text-lg text-white mb-2">{feature.title}</h3>
              <p className="text-white/60 text-sm">{feature.description}</p>
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
    { number: '47%', label: 'Higher conversion with CRM' },
    { number: '30%', label: 'Increase in productivity' },
    { number: '41%', label: 'More revenue per salesperson' },
    { number: '74%', label: 'Better customer relationships' },
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
            The Impact of a Well-Used <span className="text-gold">CRM</span>
          </h2>
          <p 
            className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            Statistics that prove the value of effective CRM implementation
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
          Ready to <span className="text-gold">Optimize Your CRM</span>?
        </h2>
        
        <p 
          className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
        >
          Let us help you set up and optimize your CRM system for maximum efficiency and results.
        </p>

        <div 
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          }}
        >
          <Link
            to="/services/streamlined-systems"
            className="inline-flex items-center px-8 py-4 bg-gold text-black font-medium rounded-full hover:bg-gold-light transition-all duration-300 hover:scale-105 hover:shadow-gold-lg"
          >
            Explore CRM Services
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Main Resource Page
export function CRMBestPracticesPage() {
  return (
    <div className="min-h-screen bg-black">
      <BackButton />
      <ResourceHero />
      <PracticesSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
    </div>
  );
}
