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
function TermsHero() {
  return (
    <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
        <h1 
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4 sm:mb-6"
          style={{ animation: 'fadeInUp 1s ease-out forwards', opacity: 0 }}
        >
          Terms & <span className="text-gold">Conditions</span>
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

// Terms Content Section
function TermsContent() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const sections = [
    {
      title: 'Welcome to Nexleed',
      content: `("Nexleed," "we," "us," or "our"). These Terms & Conditions ("Terms") govern your use of our website (https://www.nexleed.com), services, and related products (collectively, the "Services").

By accessing or using our Services, you agree to these Terms. If you do not agree, please discontinue use immediately.`,
    },
    {
      title: '1. Acceptance of Terms',
      content: `By using Nexleed, you confirm that:

• You are at least 18 years old and legally capable of entering into binding agreements.

• You agree to comply with these Terms and all applicable laws and regulations.

• We may update these Terms at any time, and continued use constitutes acceptance of such updates.`,
    },
    {
      title: '2. Our Services',
      content: `Nexleed provides marketing and lead generation services to licensed real estate professionals and related industries.

**We are not a real estate brokerage and do not represent buyers or sellers in property transactions.**

Services may include:

• Exclusive or shared real estate lead generation.

• Referral introductions between agents and potential clients.

• Marketing services and campaign support.

While we strive to provide accurate and intent-verified leads, **we do not guarantee conversions, closings, or revenue.**`,
    },
    {
      title: '3. Eligibility & Licensing',
      content: `• You must hold a valid real estate license in your jurisdiction to receive leads or referrals.

• You are solely responsible for maintaining licensing requirements and providing accurate business details.

• Nexleed reserves the right to suspend or terminate services if your license is invalid, expired, or under review.`,
    },
    {
      title: '4. Account Registration & Security',
      content: `Certain features may require account registration. By registering, you agree to:

• Provide accurate, current, and complete information.

• Maintain confidentiality of your login credentials.

• Notify us immediately at support@nexleed.com if you suspect unauthorized access.

Nexleed is not responsible for any losses due to compromised accounts.`,
    },
    {
      title: '5. Payments & Fees',
      content: `• All fees and pricing will be disclosed before purchase.

• Payments are due in advance unless otherwise agreed in writing.

• Subscriptions renew automatically unless canceled before the renewal date.

• Non-payment may result in suspension or termination of services.`,
    },
    {
      title: '6. Refund Policy & Minimum Commitment',
      content: `All refund requests are governed by our Refund Policy (available separately on our website).

By using our Services, you acknowledge:

• A **minimum service period of 90 days** applies to all agreements unless otherwise stated.

• "Change of mind" or lack of conversion results is not grounds for refund or chargeback.

• All refund requests must be submitted in writing to support@nexleed.com within the timelines stated in the Refund Policy.

• **Clients agree not to file chargebacks or disputes with payment processors.** Doing so violates these Terms and may result in service termination and collection action.`,
    },
    {
      title: '7. Prohibited Uses',
      content: `You agree not to:

• Use the Services for unlawful or fraudulent purposes.

• Resell, redistribute, or misuse lead data.

• Upload or transmit viruses, malware, or malicious code.

• Attempt to disrupt or compromise the security of our systems.`,
    },
    {
      title: '8. Intellectual Property',
      content: `All content, branding, software, and materials provided by Nexleed are owned by Nexleed or licensed to us. You may not copy, distribute, or reproduce our content without prior written permission.`,
    },
    {
      title: '9. User-Generated Content',
      content: `If you submit reviews, feedback, or testimonials, you grant Nexleed a non-exclusive, royalty-free, worldwide license to use such content for marketing and promotional purposes. You represent that your submissions do not infringe the rights of third parties.`,
    },
    {
      title: '10. Privacy & Data Use',
      content: `Your use of our Services is subject to our **Privacy Policy**, which explains how we collect, process, and protect your data.`,
    },
    {
      title: '11. Third-Party Services',
      content: `Our website may link to or integrate with third-party tools, CRMs, or advertising platforms. Nexleed is not responsible for third-party practices, terms, or policies.`,
    },
    {
      title: '12. Limitation of Liability',
      content: `To the maximum extent permitted by law:

• Nexleed shall not be liable for indirect, incidental, or consequential damages.

• We do not guarantee any specific financial or transactional outcome from the use of our Services.

• You are solely responsible for verifying lead accuracy before acting on it.`,
    },
    {
      title: '13. Indemnification',
      content: `You agree to indemnify, defend, and hold harmless Nexleed, its owners, employees, and affiliates against any claims, damages, or losses arising out of:

• Your use of the Services.

• Your violation of these Terms.

• Your violation of any applicable law or third-party rights.`,
    },
    {
      title: '14. Termination',
      content: `We may suspend or terminate your access immediately if you violate these Terms. Upon termination, all outstanding fees remain payable.`,
    },
    {
      title: '15. Governing Law & Dispute Resolution',
      content: `These Terms are governed by the laws of USA.

• All disputes shall be resolved exclusively in the courts of **USA**.

• Before initiating legal action or payment disputes, you must notify us at support@nexleed.com and allow 30 days for resolution.`,
    },
    {
      title: '16. Severability',
      content: `If any provision of these Terms is found invalid or unenforceable, the remaining provisions will remain valid and enforceable.`,
    },
    {
      title: '17. Contact Information',
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

// Main Terms Page
export function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <TermsHero />
      <TermsContent />
      <Footer />
    </div>
  );
}
