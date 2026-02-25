import { useEffect, useRef, useState } from 'react';
import { 
  Phone, Mail, MapPin, Clock, Send, Check, X
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/hero-contact.jpg)' }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 py-20 max-w-5xl mx-auto">
        <h1 
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6"
          style={{ animation: 'fadeInUp 1s ease-out forwards', animationDelay: '0.2s', opacity: 0 }}
        >
          Let's <span className="text-gold">Connect</span>
        </h1>
        <p 
          className="text-white/70 text-lg sm:text-xl max-w-2xl"
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
      value: '+1 (209) 243 1235',
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

// Success Modal Component
function SuccessModal({ isOpen, onClose, title, message }: { isOpen: boolean; onClose: () => void; title: string; message: string }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div 
        className="relative bg-dark-card border border-gold/30 rounded-2xl p-8 max-w-md w-full text-center transform animate-in fade-in zoom-in duration-300"
        style={{
          animation: 'modalPop 0.3s ease-out'
        }}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-gold" />
        </div>
        
        <h3 className="font-display text-2xl text-white mb-3">{title}</h3>
        <p className="text-white/70 mb-6">{message}</p>
        
        <Button 
          onClick={onClose}
          className="bg-gold text-black hover:bg-gold-light px-8 py-3 rounded-full font-medium"
        >
          Got it!
        </Button>
      </div>
    </div>
  );
}

// Contact Form Section
function ContactFormSection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.15 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    company: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xblgjkny', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _replyto: formData.email,
          _subject: `New Contact Form Submission from ${formData.name}`,
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          company: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-dark-card" ref={sectionRef}>
      <SuccessModal 
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Message Sent!"
        message="Thank you for reaching out. We've received your message and will get back to you within 24 hours."
      />
      
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

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
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
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter Your Name"
                  required
                  className="bg-dark-card border-dark-border text-white placeholder:text-white/40 focus:border-gold h-11 sm:h-12"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-2">Email *</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your Email"
                  required
                  className="bg-dark-card border-dark-border text-white placeholder:text-white/40 focus:border-gold h-11 sm:h-12"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-2">Phone *</label>
                <Input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter your phone number"
                  required
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
                <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                  <SelectTrigger className="bg-dark-card border-dark-border text-white focus:border-gold h-11 sm:h-12">
                    <SelectValue placeholder="Select needed Service" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-card border-dark-border">
                    <SelectItem value="modern-websites">Modern Websites</SelectItem>
                    <SelectItem value="gbp-seo">GBP SEO & Local Optimization</SelectItem>
                    <SelectItem value="streamlined-systems">Streamlined Systems & Workflows</SelectItem>
                    <SelectItem value="exclusive-leads">Exclusive Buyer & Seller Leads</SelectItem>
                    <SelectItem value="performance-advertising">Performance-Driven Advertising</SelectItem>
                    <SelectItem value="dedicated-support">Dedicated Support</SelectItem>
                    <SelectItem value="brand-content">Brand-Aligned Content</SelectItem>
                    <SelectItem value="full-package">Full Package</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-2">Company / Organization Name</label>
                <Input
                  name="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
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
                name="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
                disabled={isSubmitting}
                className="bg-gold text-black hover:bg-gold-light px-8 sm:px-12 py-5 sm:py-6 text-base sm:text-lg font-medium rounded-full transition-all duration-300 hover:scale-105 hover:shadow-gold disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Submit
                  </>
                )}
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
      answer: 'We typically respond to all inquiries within 24 business hours. For urgent matters, please call us directly at +1 (209) 243 1235.',
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
          href="tel:+12092431235"
          className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gold text-black font-medium rounded-full hover:bg-gold-light transition-all duration-300 hover:scale-105 hover:shadow-gold-lg text-sm sm:text-base"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          }}
        >
          <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Call +1 (209) 243 1235
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
