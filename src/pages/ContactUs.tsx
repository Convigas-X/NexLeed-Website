import { useEffect, useRef, useState } from 'react';
import { 
  Phone, Mail, MapPin, Clock, Send, Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
function ContactHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/hero-contact.jpg)' }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
        <h1 
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6"
          style={{ animation: 'fadeInUp 1s ease-out forwards', animationDelay: '0.2s', opacity: 0 }}
        >
          Let's <span className="text-gold">Connect</span>
        </h1>
        <p 
          className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto"
          style={{ animation: 'fadeInUp 1s ease-out forwards', animationDelay: '0.4s', opacity: 0 }}
        >
          We're here to answer your questions and help you take the next step with confidence.
        </p>
      </div>
    </section>
  );
}

// Contact Info Cards
function ContactInfoCards() {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      value: '+1 (512) 566-0340',
      description: 'Speak with our team for inquiries, collaborations, or support.',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'support@nexleed.com',
      description: 'We usually reply within one business day.',
    },
    {
      icon: MapPin,
      title: 'Office',
      value: '5900 Balcones Dr, STE 100',
      description: 'Austin, TX 78731',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      value: 'Mon - Fri: 9AM - 6PM',
      description: 'Saturday: 10AM - 4PM | Sunday: Closed',
    },
  ];

  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-black" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-dark-card border border-dark-border rounded-xl p-5 sm:p-6 hover:border-gold/30 transition-all duration-300 group"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
              }}
            >
              <div 
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-gold/20 transition-colors duration-300"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-180deg)',
                  transition: `all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${0.2 + index * 0.1}s`,
                }}
              >
                <info.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
              </div>
              <h4 className="text-white font-medium mb-1 sm:mb-2">{info.title}</h4>
              <p className="text-gold text-base sm:text-lg mb-1 sm:mb-2">{info.value}</p>
              <p className="text-white/60 text-xs sm:text-sm">{info.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Form Section
function ContactFormSection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-dark-card" ref={sectionRef}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="bg-black border border-dark-border rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div 
            className="text-center mb-8 sm:mb-10"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            <h2 className="font-display text-2xl sm:text-3xl text-white mb-2">Send us a Message</h2>
            <p className="text-white/60 text-sm sm:text-base">
              Please fill in the following details, and we'll get back to you within 24 hours.
            </p>
          </div>

          <form className="space-y-4 sm:space-y-6">
            {/* Name, Email, Phone Row */}
            <div 
              className="grid md:grid-cols-3 gap-4 sm:gap-6"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
              }}
            >
              <div>
                <label className="block text-white/80 text-sm mb-2">Name *</label>
                <Input
                  placeholder="Enter Your Name"
                  className="bg-dark-card border-dark-border text-white placeholder:text-white/40 focus:border-gold h-11 sm:h-12"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-2">Email *</label>
                <Input
                  type="email"
                  placeholder="Enter your Email"
                  className="bg-dark-card border-dark-border text-white placeholder:text-white/40 focus:border-gold h-11 sm:h-12"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-2">Phone *</label>
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="bg-dark-card border-dark-border text-white placeholder:text-white/40 focus:border-gold h-11 sm:h-12"
                />
              </div>
            </div>

            {/* Service & Company Row */}
            <div 
              className="grid md:grid-cols-2 gap-4 sm:gap-6"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
              }}
            >
              <div>
                <label className="block text-white/80 text-sm mb-2">Service Interested In</label>
                <Select>
                  <SelectTrigger className="bg-dark-card border-dark-border text-white focus:border-gold h-11 sm:h-12">
                    <SelectValue placeholder="Select needed Service" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-card border-dark-border">
                    <SelectItem value="website">Modern Website</SelectItem>
                    <SelectItem value="crm">CRM & Workflows</SelectItem>
                    <SelectItem value="leads">Lead Generation</SelectItem>
                    <SelectItem value="ads">Paid Advertising</SelectItem>
                    <SelectItem value="support">Dedicated Support</SelectItem>
                    <SelectItem value="content">Brand Content</SelectItem>
                    <SelectItem value="all">Full Package</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-2">Company / Organization Name</label>
                <Input
                  placeholder="Your Company Name"
                  className="bg-dark-card border-dark-border text-white placeholder:text-white/40 focus:border-gold h-11 sm:h-12"
                />
              </div>
            </div>

            {/* Message */}
            <div
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
              }}
            >
              <label className="block text-white/80 text-sm mb-2">Message</label>
              <Textarea
                placeholder="Tell us about your project or how we can help..."
                rows={5}
                className="bg-dark-card border-dark-border text-white placeholder:text-white/40 focus:border-gold resize-none"
              />
            </div>

            {/* Submit Button */}
            <div 
              className="text-center"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
              }}
            >
              <Button
                type="submit"
                className="bg-gold text-black hover:bg-gold-light px-8 sm:px-12 py-5 sm:py-6 text-base sm:text-lg font-medium rounded-full transition-all duration-300 hover:scale-105 hover:shadow-gold"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection() {
  const faqs = [
    {
      question: 'How quickly will you respond to my inquiry?',
      answer: 'We typically respond to all inquiries within 24 business hours. For urgent matters, please call us directly at +1 (512) 566-0340.',
    },
    {
      question: 'Do you offer free consultations?',
      answer: 'Yes! We offer a free 30-minute consultation to discuss your needs and how we can help. Schedule yours today.',
    },
    {
      question: 'What information should I provide in my message?',
      answer: 'The more details you can share about your goals, current challenges, and timeline, the better we can assist you. Include your business type, target market, and any specific services you\'re interested in.',
    },
    {
      question: 'Can I visit your office?',
      answer: 'Absolutely! We welcome in-person meetings. Our office is located at 5900 Balcones Dr, STE 100, Austin, TX 78731. Please schedule an appointment first to ensure someone is available to meet with you.',
    },
  ];

  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);

  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          headerObserver.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -50px 0px' }
    );

    const gridObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGridVisible(true);
          gridObserver.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (headerRef.current) headerObserver.observe(headerRef.current);
    if (gridRef.current) gridObserver.observe(gridRef.current);

    return () => {
      headerObserver.disconnect();
      gridObserver.disconnect();
    };
  }, []);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          ref={headerRef}
          className="text-center mb-10 sm:mb-12"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white mb-3 sm:mb-4">
            Frequently Asked <span className="text-gold">Questions</span>
          </h2>
          <p className="text-white/60 text-sm sm:text-base">
            Quick answers to common questions about contacting us.
          </p>
        </div>

        {/* FAQ Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-dark-card border border-dark-border rounded-xl p-5 sm:p-6 hover:border-gold/30 transition-all duration-300"
              style={{
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
              }}
            >
              <h4 className="text-white font-medium mb-2 sm:mb-3 flex items-start">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-gold mr-2 flex-shrink-0 mt-0.5" />
                {faq.question}
              </h4>
              <p className="text-white/60 text-xs sm:text-sm ml-6 sm:ml-7">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function ContactCTA() {
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
          Prefer to <span className="text-gold">Call</span>?
        </h2>
        <p 
          className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-10"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
        >
          Sometimes a conversation is the best way to get started. Give us a call and let's talk about your goals.
        </p>
        <a
          href="tel:+15125660340"
          className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gold text-black font-medium rounded-full hover:bg-gold-light transition-all duration-300 hover:scale-105 hover:shadow-gold-lg text-sm sm:text-base"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          }}
        >
          <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Call +1 (512) 566-0340
        </a>
      </div>
    </section>
  );
}

// Main ContactUs Page
export function ContactUs() {
  return (
    <div className="min-h-screen bg-black">
      <ContactHero />
      <ContactInfoCards />
      <ContactFormSection />
      <FAQSection />
      <ContactCTA />
    </div>
  );
}
