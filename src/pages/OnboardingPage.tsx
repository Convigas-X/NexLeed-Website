import { useState } from 'react';
import { Send, Check, X, User, Building, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  licenseNumber: string;
  brokerageName: string;
  role: string;
  yearsInBusiness: string;
  websiteUrl: string;
  hasWebsite: string;
  primaryGoal: string;
  servicesInterest: string[];
  monthlyBudget: string;
  currentLeads: string;
  biggestChallenge: string;
  howHeard: string;
}

const usStates = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 
  'Wisconsin', 'Wyoming'
];

const servicesOptions = [
  'Modern Real Estate Website',
  'Google Business Profile Optimization',
  'CRM & Workflow Automation',
  'Lead Generation',
  'Paid Advertising (Facebook/Google)',
  'Dedicated Support/VA',
  'Content Marketing',
  'SEO & Local Ranking'
];

// Success Modal Component
function SuccessModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative bg-dark-card border border-gold/30 rounded-2xl p-8 max-w-md w-full text-center"
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

        <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-gold" />
        </div>

        <h3 className="font-display text-2xl text-white mb-3">Application Submitted!</h3>
        <p className="text-white/70 mb-6">
          Thank you for applying to the NexLeed Partner Program. Our team will review your information and reach out within 24 hours.
        </p>

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

const goalsOptions = [
  'Generate more leads',
  'Build professional online presence',
  'Automate follow-ups & workflows',
  'Increase website traffic',
  'Get more reviews',
  'Scale my business',
  'Better organize my clients'
];

const challengeOptions = [
  'Not enough leads',
  'No time for follow-ups',
  'Website needs updating',
  'Not found online',
  'Disorganized client management',
  'Low conversion rates',
  'Limited marketing budget',
  'Other'
];

export function OnboardingPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    state: '',
    licenseNumber: '',
    brokerageName: '',
    role: '',
    yearsInBusiness: '',
    websiteUrl: '',
    hasWebsite: '',
    primaryGoal: '',
    servicesInterest: [],
    monthlyBudget: '',
    currentLeads: '',
    biggestChallenge: '',
    howHeard: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (service: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      servicesInterest: checked 
        ? [...prev.servicesInterest, service]
        : prev.servicesInterest.filter(s => s !== service)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://formspree.io/f/xnqevwvr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _replyto: formData.email,
          _subject: `New Onboarding Application from ${formData.firstName} ${formData.lastName}`,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          state: '',
          licenseNumber: '',
          brokerageName: '',
          role: '',
          yearsInBusiness: '',
          websiteUrl: '',
          hasWebsite: '',
          primaryGoal: '',
          servicesInterest: [],
          monthlyBudget: '',
          currentLeads: '',
          biggestChallenge: '',
          howHeard: ''
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeSuccessModal = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-black">
      <SuccessModal isOpen={isSubmitted} onClose={closeSuccessModal} />

      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
        {/* Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-gold text-sm font-medium tracking-wider uppercase mb-3">
              NexLeed Partner Program
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
              Start Your <span className="text-gold">Growth Journey</span>
            </h1>
            <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
              Join hundreds of successful real estate agents who have transformed their business with NexLeed. Tell us about yourself so we can create a custom strategy for you.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Personal Information */}
            <div className="bg-dark-card border border-dark-border rounded-xl sm:rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-gold" />
                </div>
                <h2 className="font-display text-xl text-white">Personal Information</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-white/80 text-sm mb-2">First Name *</label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter your first name"
                    required
                    className="bg-dark-border border-dark-border text-white placeholder:text-white/40 focus:border-gold h-11 sm:h-12"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">Last Name *</label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter your last name"
                    required
                    className="bg-dark-border border-dark-border text-white placeholder:text-white/40 focus:border-gold h-11 sm:h-12"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">Email Address *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="bg-dark-border border-dark-border text-white placeholder:text-white/40 focus:border-gold h-11 sm:h-12"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">Phone Number *</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                    required
                    className="bg-dark-border border-dark-border text-white placeholder:text-white/40 focus:border-gold h-11 sm:h-12"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Business Information */}
            <div className="bg-dark-card border border-dark-border rounded-xl sm:rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 text-gold" />
                </div>
                <h2 className="font-display text-xl text-white">Business Information</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-white/80 text-sm mb-2">State You're Licensed In *</label>
                  <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                    <SelectTrigger className="bg-dark-border border-dark-border text-white focus:border-gold h-11 sm:h-12">
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-card border-dark-border max-h-60">
                      {usStates.map(state => (
                        <SelectItem key={state} value={state} className="text-white focus:bg-gold/20 focus:text-white">
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">Real Estate License Number</label>
                  <Input
                    value={formData.licenseNumber}
                    onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                    placeholder="Enter license number (if available)"
                    className="bg-dark-border border-dark-border text-white placeholder:text-white/40 focus:border-gold h-11 sm:h-12"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">Brokerage Name *</label>
                  <Input
                    value={formData.brokerageName}
                    onChange={(e) => handleInputChange('brokerageName', e.target.value)}
                    placeholder="Your brokerage name"
                    required
                    className="bg-dark-border border-dark-border text-white placeholder:text-white/40 focus:border-gold h-11 sm:h-12"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">Your Role</label>
                  <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                    <SelectTrigger className="bg-dark-border border-dark-border text-white focus:border-gold h-11 sm:h-12">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-card border-dark-border">
                      <SelectItem value="agent" className="text-white focus:bg-gold/20 focus:text-white">Real Estate Agent</SelectItem>
                      <SelectItem value="team-leader" className="text-white focus:bg-gold/20 focus:text-white">Team Leader</SelectItem>
                      <SelectItem value="broker-owner" className="text-white focus:bg-gold/20 focus:text-white">Broker/Owner</SelectItem>
                      <SelectItem value="investor" className="text-white focus:bg-gold/20 focus:text-white">Investor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">Years in Business</label>
                  <Select value={formData.yearsInBusiness} onValueChange={(value) => handleInputChange('yearsInBusiness', value)}>
                    <SelectTrigger className="bg-dark-border border-dark-border text-white focus:border-gold h-11 sm:h-12">
                      <SelectValue placeholder="Select years" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-card border-dark-border">
                      <SelectItem value="0-1" className="text-white focus:bg-gold/20 focus:text-white">Less than 1 year</SelectItem>
                      <SelectItem value="1-3" className="text-white focus:bg-gold/20 focus:text-white">1-3 years</SelectItem>
                      <SelectItem value="3-5" className="text-white focus:bg-gold/20 focus:text-white">3-5 years</SelectItem>
                      <SelectItem value="5-10" className="text-white focus:bg-gold/20 focus:text-white">5-10 years</SelectItem>
                      <SelectItem value="10+" className="text-white focus:bg-gold/20 focus:text-white">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">Do You Have a Website?</label>
                  <Select value={formData.hasWebsite} onValueChange={(value) => handleInputChange('hasWebsite', value)}>
                    <SelectTrigger className="bg-dark-border border-dark-border text-white focus:border-gold h-11 sm:h-12">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-card border-dark-border">
                      <SelectItem value="yes" className="text-white focus:bg-gold/20 focus:text-white">Yes, I have a website</SelectItem>
                      <SelectItem value="no" className="text-white focus:bg-gold/20 focus:text-white">No, I don't have one</SelectItem>
                      <SelectItem value="planning" className="text-white focus:bg-gold/20 focus:text-white">Planning to get one</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {formData.hasWebsite === 'yes' && (
                  <div className="sm:col-span-2">
                    <label className="block text-white/80 text-sm mb-2">Current Website URL</label>
                    <Input
                      value={formData.websiteUrl}
                      onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                      placeholder="https://yourwebsite.com"
                      className="bg-dark-border border-dark-border text-white placeholder:text-white/40 focus:border-gold h-11 sm:h-12"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Section 3: Goals & Services */}
            <div className="bg-dark-card border border-dark-border rounded-xl sm:rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-gold" />
                </div>
                <h2 className="font-display text-xl text-white">Goals & Services</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-white/80 text-sm mb-3">What is your primary goal? *</label>
                  <Select value={formData.primaryGoal} onValueChange={(value) => handleInputChange('primaryGoal', value)}>
                    <SelectTrigger className="bg-dark-border border-dark-border text-white focus:border-gold h-11 sm:h-12">
                      <SelectValue placeholder="Select your primary goal" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-card border-dark-border">
                      {goalsOptions.map(goal => (
                        <SelectItem key={goal} value={goal} className="text-white focus:bg-gold/20 focus:text-white">
                          {goal}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-3">Which services are you interested in? *</label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {servicesOptions.map(service => (
                      <label 
                        key={service}
                        className="flex items-center gap-3 p-3 bg-dark-border border border-dark-border rounded-lg cursor-pointer hover:border-gold/50 transition-colors"
                      >
                        <Checkbox 
                          checked={formData.servicesInterest.includes(service)}
                          onCheckedChange={(checked) => handleCheckboxChange(service, checked as boolean)}
                          className="border-white/30 data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                        />
                        <span className="text-white/80 text-sm">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">What is your monthly marketing budget?</label>
                  <Select value={formData.monthlyBudget} onValueChange={(value) => handleInputChange('monthlyBudget', value)}>
                    <SelectTrigger className="bg-dark-border border-dark-border text-white focus:border-gold h-11 sm:h-12">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-card border-dark-border">
                      <SelectItem value="under-500" className="text-white focus:bg-gold/20 focus:text-white">Under $500/month</SelectItem>
                      <SelectItem value="500-1000" className="text-white focus:bg-gold/20 focus:text-white">$500 - $1,000/month</SelectItem>
                      <SelectItem value="1000-2500" className="text-white focus:bg-gold/20 focus:text-white">$1,000 - $2,500/month</SelectItem>
                      <SelectItem value="2500-5000" className="text-white focus:bg-gold/20 focus:text-white">$2,500 - $5,000/month</SelectItem>
                      <SelectItem value="5000+" className="text-white focus:bg-gold/20 focus:text-white">$5,000+/month</SelectItem>
                      <SelectItem value="not-sure" className="text-white focus:bg-gold/20 focus:text-white">Not sure yet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Section 4: Current Situation */}
            <div className="bg-dark-card border border-dark-border rounded-xl sm:rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-gold" />
                </div>
                <h2 className="font-display text-xl text-white">Your Current Situation</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-white/80 text-sm mb-2">How many leads do you get per month?</label>
                  <Select value={formData.currentLeads} onValueChange={(value) => handleInputChange('currentLeads', value)}>
                    <SelectTrigger className="bg-dark-border border-dark-border text-white focus:border-gold h-11 sm:h-12">
                      <SelectValue placeholder="Select lead count" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-card border-dark-border">
                      <SelectItem value="0" className="text-white focus:bg-gold/20 focus:text-white">0 leads</SelectItem>
                      <SelectItem value="1-10" className="text-white focus:bg-gold/20 focus:text-white">1-10 leads</SelectItem>
                      <SelectItem value="10-25" className="text-white focus:bg-gold/20 focus:text-white">10-25 leads</SelectItem>
                      <SelectItem value="25-50" className="text-white focus:bg-gold/20 focus:text-white">25-50 leads</SelectItem>
                      <SelectItem value="50+" className="text-white focus:bg-gold/20 focus:text-white">50+ leads</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">What is your biggest challenge right now?</label>
                  <Select value={formData.biggestChallenge} onValueChange={(value) => handleInputChange('biggestChallenge', value)}>
                    <SelectTrigger className="bg-dark-border border-dark-border text-white focus:border-gold h-11 sm:h-12">
                      <SelectValue placeholder="Select your biggest challenge" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-card border-dark-border">
                      {challengeOptions.map(challenge => (
                        <SelectItem key={challenge} value={challenge} className="text-white focus:bg-gold/20 focus:text-white">
                          {challenge}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">How did you hear about us?</label>
                  <Select value={formData.howHeard} onValueChange={(value) => handleInputChange('howHeard', value)}>
                    <SelectTrigger className="bg-dark-border border-dark-border text-white focus:border-gold h-11 sm:h-12">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-card border-dark-border">
                      <SelectItem value="google" className="text-white focus:bg-gold/20 focus:text-white">Google Search</SelectItem>
                      <SelectItem value="facebook" className="text-white focus:bg-gold/20 focus:text-white">Facebook</SelectItem>
                      <SelectItem value="instagram" className="text-white focus:bg-gold/20 focus:text-white">Instagram</SelectItem>
                      <SelectItem value="linkedin" className="text-white focus:bg-gold/20 focus:text-white">LinkedIn</SelectItem>
                      <SelectItem value="referral" className="text-white focus:bg-gold/20 focus:text-white">Referral</SelectItem>
                      <SelectItem value="podcast" className="text-white focus:bg-gold/20 focus:text-white">Podcast</SelectItem>
                      <SelectItem value="other" className="text-white focus:bg-gold/20 focus:text:white">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-gold text-black hover:bg-gold-light h-12 px-8 sm:px-12 font-medium text-base rounded-full"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Submit Application
                    <Send className="w-4 h-4 ml-2" />
                  </span>
                )}
              </Button>
              <p className="text-white/40 text-xs mt-4">
                By submitting this form, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
