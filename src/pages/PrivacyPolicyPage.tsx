import { useEffect, useRef, useState } from 'react';
import { Mail, Phone } from 'lucide-react';
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
function PrivacyHero() {
  return (
    <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
        <h1 
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4 sm:mb-6"
          style={{ animation: 'fadeInUp 1s ease-out forwards', opacity: 0 }}
        >
          Privacy <span className="text-gold">Policy</span>
        </h1>
        
        <p 
          className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto"
          style={{ animation: 'fadeInUp 1s ease-out forwards', animationDelay: '0.2s', opacity: 0 }}
        >
          Effective Date: January 1, 2026
        </p>
      </div>
    </section>
  );
}

// Privacy Content Section
function PrivacyContent() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const sections = [
    {
      title: '1. Introduction',
      content: `This Privacy Policy ("Policy") describes how Nexleed ("Nexleed," "we," "our," or "us"), collects, uses, and protects personal information when you interact with our website, lead generation systems, marketing platforms, promotions, and related services (collectively, the "Services").

By using our Services, you acknowledge and agree to the terms of this Policy. If you do not agree, please discontinue use immediately.

We may update this Policy from time to time. Updates will be posted on this page with a revised Effective Date. For significant changes, we will notify users as required by law.`,
    },
    {
      title: '2. Information We Collect',
      content: `We collect the following categories of data:

• **Personal Information:** Name, phone number, email, mailing address, and related business details.

• **Account Information:** Subscription details, account preferences, and billing history.

• **Lead Submission Data:** Information submitted via forms or inquiries (e.g., specific interests, service requests).

• **Payment Information:** Collected and processed by third-party payment processors (Stripe, PayPal, Shopify Payments, etc.). We do not store complete credit card numbers.

• **Technical Data:** IP address, device identifiers, browser type, operating system, and referral URLs.

• **Cookies & Tracking Data:** Used for analytics, personalization, and advertising.`,
    },
    {
      title: '3. How We Use Information',
      content: `We use your information to:

• Provide, manage, and improve our Services.

• Process transactions and deliver lead generation services.

• Communicate with you regarding inquiries, updates, and offers.

• Send marketing materials (if consent is provided).

• Detect and prevent fraud, unauthorized use, or violations of our Terms.

• Comply with legal and regulatory obligations.

We do not sell personal data to third parties.`,
    },
    {
      title: '4. Consent for Communications',
      content: `By providing your phone number or email, you consent to receive:

• SMS messages (including automated or pre-recorded messages).

• Phone calls regarding your account or service inquiries.

• Marketing emails, newsletters, and promotional updates.

Consent is not required to make a purchase. You may opt out anytime:

• **SMS:** Reply "STOP"

• **Email:** Use the unsubscribe link or email us at support@nexleed.com`,
    },
    {
      title: '5. Data Security',
      content: `We implement administrative, technical, and physical safeguards to protect your data, including:

• Secure data encryption in transit and at rest.

• Restricted access to authorized personnel only.

• Regular monitoring of systems for potential vulnerabilities.

No system is 100% secure, but we take commercially reasonable steps to minimize risks.`,
    },
    {
      title: '6. Data Retention',
      content: `We retain personal information only as long as necessary to:

1. Fulfill business and service purposes,

2. Comply with applicable laws, or

3. Resolve disputes.

Once data is no longer required, it will be securely deleted or anonymized.`,
    },
    {
      title: '7. Your Rights',
      content: `Depending on your jurisdiction (e.g., GDPR, CCPA), you may have rights to:

• Request a copy of your personal data.

• Correct inaccuracies in your information.

• Request deletion of your personal data.

• Restrict or object to processing activities.

• Request data portability.

• Withdraw consent for marketing communications.

To exercise these rights, email us at support@nexleed.com`,
    },
    {
      title: '8. Cookies & Advertising',
      content: `We use cookies, pixels, and third-party tools to:

• Improve website functionality.

• Deliver personalized advertising.

• Measure marketing effectiveness.

You can adjust cookie settings in your browser or opt out of targeted advertising through the NAI Opt-Out Tool.`,
    },
    {
      title: '9. "Do Not Track" Signals',
      content: `Our Services currently do not respond to browser "Do Not Track" signals. For details on third-party practices, review their respective policies.`,
    },
    {
      title: '10. Legal Disclaimer',
      content: `Nexleed is a marketing and lead generation company. We are not a licensed brokerage, and we do not represent buyers or sellers, conduct regulated transactions, or act as agents in the industries we serve unless explicitly stated.`,
    },
    {
      title: '11. Dispute Resolution',
      content: `For any privacy-related concerns, please contact us first at support@nexleed.com

By using our Services, you agree not to initiate third-party disputes (such as chargebacks or complaints through payment processors) without first giving us a reasonable opportunity to resolve the matter directly.`,
    },
    {
      title: '12. Contact Information',
      content: '',
      isContact: true,
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-black" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {sections.map((section, index) => (
          <div 
            key={index}
            className="mb-12 last:mb-0"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.05}s`,
            }}
          >
            {section.isContact ? (
              <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
                <h2 className="font-display text-2xl text-white mb-6">{section.title}</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <div className="text-white/60 text-sm">Email</div>
                      <a href="mailto:support@nexleed.com" className="text-white hover:text-gold transition-colors">
                        support@nexleed.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <div className="text-white/60 text-sm">Phone</div>
                      <a href="tel:+12092430867" className="text-white hover:text-gold transition-colors">
                        (209) 243-0867
                      </a>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-dark-border">
                    <div className="text-white/60 text-sm mb-1">Website</div>
                    <Link to="/" className="text-white hover:text-gold transition-colors">
                      www.nexleed.com
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h2 className="font-display text-2xl text-white mb-4">{section.title}</h2>
                <div className="text-white/70 text-base leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// Main Privacy Page
export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <PrivacyHero />
      <PrivacyContent />
      <Footer />
    </div>
  );
}
