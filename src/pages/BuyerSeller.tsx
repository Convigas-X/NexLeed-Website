import { useEffect, useRef, useState } from 'react';
import { 
  Home, FileText, ArrowUpRight, Check, Phone, Mail, MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

// Hero Section
function BuyerSellerHero() {
  return (
    <>
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/hero-buyer-seller.jpg)' }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
        <h1 
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6"
          style={{ animation: 'fadeInUp 1s ease-out forwards', animationDelay: '0.2s', opacity: 0 }}
        >
          Buyer & <span className="text-gold">Seller</span> Guide
        </h1>
        <p 
          className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto"
          style={{ animation: 'fadeInUp 1s ease-out forwards', animationDelay: '0.4s', opacity: 0 }}
        >
          Your comprehensive resource for navigating the real estate market with confidence.
        </p>
      </div>
    </section>

      {/* Spacer */}
      <div className="h-16 sm:h-20 lg:h-24 bg-black" />
    </>
  );
}

// For Buyers Section
function ForBuyersSection() {
  const steps = [
    {
      title: 'Get Pre-Approved',
      description: 'Start by getting pre-approved for a mortgage. This helps you understand your budget and shows sellers you\'re serious.',
    },
    {
      title: 'Define Your Needs',
      description: 'Make a list of must-haves and nice-to-haves. Consider location, size, amenities, and future resale value.',
    },
    {
      title: 'Start Your Search',
      description: 'Work with a qualified agent who understands your needs. They\'ll help you find properties that match your criteria.',
    },
    {
      title: 'Make an Offer',
      description: 'When you find the right home, your agent will help you craft a competitive offer based on market analysis.',
    },
  ];

  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const checklistItems = [
    'Check credit score and financial health',
    'Save for down payment and closing costs',
    'Get pre-approved for a mortgage',
    'Research neighborhoods and schools',
    'Find a qualified real estate agent',
    'Attend open houses and viewings',
    'Make competitive offers',
    'Schedule home inspection',
    'Review closing documents',
    'Close on your new home!',
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-black" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <div 
              className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center mb-6"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <Home className="w-7 h-7 text-gold" />
            </div>
            <h2 
              className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white mb-4 sm:mb-6"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
              }}
            >
              For <span className="text-gold">Buyers</span>
            </h2>
            <p 
              className="text-white/60 text-base sm:text-lg mb-8 sm:mb-10"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
              }}
            >
              Buying a home is one of the most significant investments you'll make. Our guide 
              helps you navigate the process with confidence, from pre-approval to closing.
            </p>

            <div className="space-y-4 sm:space-y-6">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className="flex space-x-4"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + index * 0.1}s`,
                  }}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">{step.title}</h4>
                    <p className="text-white/60 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div 
              className="bg-dark-card border border-dark-border rounded-xl sm:rounded-2xl p-6 sm:p-8"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(40px) scale(0.95)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
              }}
            >
              <h3 className="font-display text-xl sm:text-2xl text-white mb-4 sm:mb-6">Buyer Checklist</h3>
              <ul className="space-y-3 sm:space-y-4">
                {checklistItems.map((item, index) => (
                  <li 
                    key={index} 
                    className="flex items-center space-x-3"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
                      transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${0.4 + index * 0.05}s`,
                    }}
                  >
                    <div className="w-5 h-5 bg-gold/20 rounded flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-gold" />
                    </div>
                    <span className="text-white/70 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// For Sellers Section
function ForSellersSection() {
  const steps = [
    {
      title: 'Prepare Your Home',
      description: 'Declutter, clean, and make necessary repairs. First impressions matter to potential buyers.',
    },
    {
      title: 'Price It Right',
      description: 'Work with your agent to set a competitive price based on market analysis and comparable sales.',
    },
    {
      title: 'Market Effectively',
      description: 'Professional photos, virtual tours, and targeted marketing help attract qualified buyers.',
    },
    {
      title: 'Negotiate Offers',
      description: 'Your agent will help you evaluate offers and negotiate terms that work best for you.',
    },
  ];

  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const checklistItems = [
    'Research current market conditions',
    'Find an experienced listing agent',
    'Declutter and depersonalize home',
    'Make necessary repairs and updates',
    'Stage rooms for maximum appeal',
    'Get professional photography',
    'List at competitive market price',
    'Review and negotiate offers',
    'Complete required disclosures',
    'Close the sale successfully!',
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-dark-card" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image/Visual */}
          <div className="relative lg:order-1">
            <div 
              className="bg-black border border-dark-border rounded-xl sm:rounded-2xl p-6 sm:p-8"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(-40px) scale(0.95)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
              }}
            >
              <h3 className="font-display text-xl sm:text-2xl text-white mb-4 sm:mb-6">Seller Checklist</h3>
              <ul className="space-y-3 sm:space-y-4">
                {checklistItems.map((item, index) => (
                  <li 
                    key={index} 
                    className="flex items-center space-x-3"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                      transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${0.4 + index * 0.05}s`,
                    }}
                  >
                    <div className="w-5 h-5 bg-gold/20 rounded flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-gold" />
                    </div>
                    <span className="text-white/70 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Content */}
          <div className="lg:order-2">
            <div 
              className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center mb-6"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
                transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <FileText className="w-7 h-7 text-gold" />
            </div>
            <h2 
              className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white mb-4 sm:mb-6"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
                transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
              }}
            >
              For <span className="text-gold">Sellers</span>
            </h2>
            <p 
              className="text-white/60 text-base sm:text-lg mb-8 sm:mb-10"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
                transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
              }}
            >
              Selling your home requires strategy and preparation. Our guide walks you through 
              each step to maximize your sale price and minimize time on market.
            </p>

            <div className="space-y-4 sm:space-y-6">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className="flex space-x-4"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
                    transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + index * 0.1}s`,
                  }}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">{step.title}</h4>
                    <p className="text-white/60 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Form Section
function ContactFormSection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-black" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left Column */}
          <div>
            <h2 
              className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white mb-4 sm:mb-6"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              Need <span className="text-gold">Help</span>?
            </h2>
            <p 
              className="text-white/60 text-base sm:text-lg mb-8 sm:mb-10"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
              }}
            >
              Whether you're buying or selling, our team is here to guide you through 
              every step of the process. Reach out today to get started.
            </p>

            <div className="space-y-4 sm:space-y-6">
              {[
                { icon: Phone, label: 'Call Us', value: '+1 (512) 566-0340', color: 'text-gold' },
                { icon: Mail, label: 'Email', value: 'support@nexleed.com', color: 'text-gold' },
                { icon: MapPin, label: 'Office', value: '5900 Balcones Dr, STE 100', subValue: 'Austin, TX 78731', color: 'text-white' },
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-4"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.1}s`,
                  }}
                >
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">{item.label}</p>
                    <p className={`${item.color} text-base sm:text-lg`}>{item.value}</p>
                    {item.subValue && <p className="text-white/60 text-sm">{item.subValue}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            <div 
              className="bg-dark-card border border-dark-border rounded-xl sm:rounded-2xl p-6 sm:p-8"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(40px) scale(0.95)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
              }}
            >
              <h3 className="font-display text-xl sm:text-2xl text-white mb-2">Send us a Message</h3>
              <p className="text-white/60 text-sm mb-4 sm:mb-6">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Name *</label>
                    <Input
                      placeholder="Your Name"
                      className="bg-black border-dark-border text-white placeholder:text-white/40 focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Email *</label>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      className="bg-black border-dark-border text-white placeholder:text-white/40 focus:border-gold"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Phone *</label>
                    <Input
                      type="tel"
                      placeholder="Your Phone"
                      className="bg-black border-dark-border text-white placeholder:text-white/40 focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm mb-2">I am a...</label>
                    <select className="w-full h-10 px-3 bg-black border border-dark-border rounded-md text-white focus:border-gold focus:outline-none">
                      <option value="">Select...</option>
                      <option value="buyer">Buyer</option>
                      <option value="seller">Seller</option>
                      <option value="both">Both</option>
                      <option value="agent">Agent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">Message</label>
                  <Textarea
                    placeholder="How can we help you?"
                    rows={4}
                    className="bg-black border-dark-border text-white placeholder:text-white/40 focus:border-gold resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gold text-black hover:bg-gold-light py-3 sm:py-4 text-base sm:text-lg font-medium rounded-full transition-all duration-300 hover:scale-105"
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// CTA Section
function BuyerSellerCTA() {
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation({ threshold: 0.4 });

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-dark-card" ref={ctaRef}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 
          className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white mb-4 sm:mb-6"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          Ready to Make Your <span className="text-gold">Move</span>?
        </h2>
        <p 
          className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-10"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
        >
          Whether you're buying your dream home or selling your current property, 
          we're here to help you every step of the way.
        </p>
        <Link
          to="/contact-us"
          className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gold text-black font-medium rounded-full hover:bg-gold-light transition-all duration-300 hover:scale-105 hover:shadow-gold-lg text-sm sm:text-base"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          }}
        >
          Get Started Today
          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
        </Link>
      </div>
    </section>
  );
}

// Main BuyerSeller Page
export function BuyerSeller() {
  return (
    <div className="min-h-screen bg-black">
      <BuyerSellerHero />
      <ForBuyersSection />
      <ForSellersSection />
      <ContactFormSection />
      <BuyerSellerCTA />
    </div>
  );
}
