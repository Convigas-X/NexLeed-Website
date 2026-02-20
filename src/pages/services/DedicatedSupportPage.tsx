import { useEffect, useRef, useState } from 'react';
import { 
  Headphones, Calendar, CheckCircle, Clock, Mail, FileText, Check, ArrowUpRight, 
  Phone, Rocket, ChevronRight, Award, BarChart3
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
          <Headphones className="w-4 h-4 text-gold mr-2" />
          <span className="text-gold text-sm font-medium">Virtual Assistant</span>
        </div>
        
        <h1 
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-4 sm:mb-6"
          style={{ animation: 'fadeInUp 1s ease-out forwards', animationDelay: '0.2s', opacity: 0 }}
        >
          Dedicated Support for <span className="text-gold">Daily Operations</span>
        </h1>
        
        <p 
          className="text-white/70 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto"
          style={{ animation: 'fadeInUp 1s ease-out forwards', animationDelay: '0.4s', opacity: 0 }}
        >
          Trained assistants who help maintain your CRM, manage follow-ups, and support your day-to-day communication.
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
              Your Personal <span className="text-gold">Real Estate Assistant</span>
            </h2>
            
            <p 
              className="text-white/60 text-base sm:text-lg mb-8"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
              }}
            >
              Stop drowning in administrative tasks. Our trained virtual assistants handle your CRM management, 
              lead follow-ups, appointment scheduling, and daily communication – allowing you to focus on what 
              matters most: closing deals and building client relationships.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { number: '20+', label: 'Hours saved per week' },
                { number: '5min', label: 'Average response time' },
                { number: '99%', label: 'Task completion rate' },
                { number: '24/7', label: 'Availability' },
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
                src="/assets/service-support.jpg"
                alt="Dedicated Support"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 bg-gold text-black px-6 py-3 rounded-xl shadow-gold-lg">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">Always Available</span>
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
      icon: BarChart3,
      title: 'CRM Updates',
      description: 'Daily CRM maintenance, contact updates, deal tracking, and pipeline management to keep everything organized.',
    },
    {
      icon: CheckCircle,
      title: 'Lead Qualification',
      description: 'Initial lead screening and qualification to ensure you only spend time on serious prospects.',
    },
    {
      icon: Calendar,
      title: 'Appointment Scheduling',
      description: 'Manage your calendar, schedule showings, and coordinate meetings with clients and prospects.',
    },
    {
      icon: Mail,
      title: 'Email Management',
      description: 'Inbox organization, email responses, and follow-up communications handled professionally.',
    },
    {
      icon: Phone,
      title: 'Call Handling',
      description: 'Answer incoming calls, take messages, and provide information to potential clients.',
    },
    {
      icon: FileText,
      title: 'Admin Support',
      description: 'Document preparation, data entry, listing coordination, and general administrative tasks.',
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
            What We <span className="text-gold">Handle</span>
          </h2>
          <p 
            className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            Comprehensive support so you can focus on closing deals
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
      title: 'Onboarding',
      description: 'We learn your systems, preferences, and workflows to integrate seamlessly with your operations.',
    },
    {
      number: '02',
      title: 'Training',
      description: 'Your dedicated assistant undergoes comprehensive training on your brand voice and processes.',
    },
    {
      number: '03',
      title: 'Daily Support',
      description: 'Assistant takes over routine tasks while you focus on high-value client interactions.',
    },
    {
      number: '04',
      title: 'Optimization',
      description: 'Continuous improvement based on feedback and evolving business needs.',
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
            Seamless integration into your business in 4 steps
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

// Benefits Section
function BenefitsSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const benefits = [
    'Reclaim 20+ hours per week',
    'Never miss a lead follow-up',
    'Faster response times to clients',
    'Organized CRM and pipeline',
    'Professional communication handling',
    'Scale without hiring full-time staff',
    'Focus on revenue-generating activities',
    'Work-life balance improvement',
  ];

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
              Transform Your <span className="text-gold">Productivity</span>
            </h2>
            
            <p className="text-white/60 text-base sm:text-lg mb-8">
              Imagine what you could accomplish with 20+ extra hours per week. 
              Our dedicated support allows you to focus on what truly matters.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.05}s`,
                  }}
                >
                  <div className="w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-white/70">{benefit}</span>
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
                  <div className="text-white font-semibold text-lg">Client Success Story</div>
                  <div className="text-white/60 text-sm">Agent productivity increase</div>
                </div>
              </div>

              <blockquote className="text-white/80 text-lg italic mb-6">
                "Having a dedicated assistant has completely transformed my business. 
                I've doubled my transaction volume while actually working fewer hours."
              </blockquote>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-dark-card rounded-xl">
                  <span className="text-white/60">Time Saved Weekly</span>
                  <span className="text-gold font-semibold">22 hours</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-dark-card rounded-xl">
                  <span className="text-white/60">Deals Closed (6 months)</span>
                  <span className="text-gold font-semibold">+15</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-dark-card rounded-xl">
                  <span className="text-white/60">Revenue Increase</span>
                  <span className="text-gold font-semibold">+40%</span>
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
          Ready to Get Your Time <span className="text-gold">Back</span>?
        </h2>
        
        <p 
          className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
        >
          Let us handle the busy work while you focus on growing your business and serving your clients.
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
            <span>Dedicated Assistant</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-gold" />
            <span>Real Estate Trained</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-gold" />
            <span>Flexible Plans</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Service Page
export function DedicatedSupportPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <ServiceHero />
      <OverviewSection />
      <FeaturesSection />
      <ProcessSection />
      <BenefitsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
