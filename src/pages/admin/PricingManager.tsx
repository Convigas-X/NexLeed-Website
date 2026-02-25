import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, MoreVertical, DollarSign, Check, Sparkles, Crown, Gem, Zap, MapPin, Settings, Target, BarChart3, Users, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  subtitle: string;
  features: string[];
  popular: boolean;
  icon: string;
}

interface ServicePricing {
  id: string;
  serviceName: string;
  serviceSlug: string;
  icon: string;
  plans: PricingPlan[];
}

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Crown,
  Gem,
  Zap,
  MapPin,
  Settings,
  Target,
  BarChart3,
  Users,
  MessageSquare,
};

const initialPricingData: ServicePricing[] = [
  {
    id: '1',
    serviceName: 'Modern Websites',
    serviceSlug: 'modern-websites',
    icon: 'Zap',
    plans: [
      {
        id: 'mw-1',
        name: 'Starter',
        price: '$1,299',
        period: 'one-time',
        subtitle: 'Perfect for new agents',
        features: ['5-Page Custom Website', 'Mobile Responsive Design', 'Basic SEO Optimization', 'Contact Form Integration', '1 Round of Revisions', '7-Day Delivery', '30 Days Support'],
        popular: false,
        icon: 'Sparkles',
      },
      {
        id: 'mw-2',
        name: 'Professional',
        price: '$2,499',
        period: 'one-time',
        subtitle: 'Best for growing agents',
        features: ['10-Page Premium Website', 'Advanced SEO & Analytics', 'Property Listing Integration', 'Lead Capture Forms', 'Blog Setup', 'Social Media Links', '3 Rounds of Revisions', '10-Day Delivery', '90 Days Support'],
        popular: true,
        icon: 'Crown',
      },
      {
        id: 'mw-3',
        name: 'Enterprise',
        price: '$4,999',
        period: 'one-time',
        subtitle: 'For top producers',
        features: ['Unlimited Pages', 'Custom Design & Animations', 'MLS Integration', 'CRM Integration', 'Advanced Lead Scoring', 'Virtual Tours Setup', 'Priority Support', 'Unlimited Revisions', '14-Day Delivery', '1 Year Support & Maintenance'],
        popular: false,
        icon: 'Gem',
      },
    ],
  },
  {
    id: '2',
    serviceName: 'GBP SEO & Local Optimization',
    serviceSlug: 'gbp-seo',
    icon: 'MapPin',
    plans: [
      {
        id: 'gbp-1',
        name: 'The Essential',
        price: '$129',
        period: '/month',
        subtitle: 'Perfect for service-based businesses starting their local dominance',
        features: ['GMB Setup & Optimization', '1 Weekly Post', 'Review Monitoring', '5 Custom Citations', 'Basic Analytics'],
        popular: false,
        icon: 'Zap',
      },
      {
        id: 'gbp-2',
        name: 'The Growth',
        price: '$229',
        period: '/month',
        subtitle: 'Our most popular plan for serious local market players',
        features: ['Everything in Essential', '3 Weekly Posts', 'Review Response Service', '15 Custom Citations', 'Spam Fighting', 'Monthly Strategy Call'],
        popular: true,
        icon: 'Crown',
      },
      {
        id: 'gbp-3',
        name: 'The Dominance',
        price: '$349',
        period: '/month',
        subtitle: 'Enterprise solution for market-wide supremacy',
        features: ['Everything in Growth', 'Daily Posts & Q&A Management', '30+ Custom Citations', 'Geo-Grid Rank Tracking', 'Dedicated Account Manager', 'Custom Reporting Dashboard', 'Quarterly Business Reviews'],
        popular: false,
        icon: 'Gem',
      },
    ],
  },
  {
    id: '3',
    serviceName: 'Streamlined Systems',
    serviceSlug: 'streamlined-systems',
    icon: 'Settings',
    plans: [
      {
        id: 'ss-1',
        name: 'Starter',
        price: '$899',
        period: 'one-time',
        subtitle: 'Perfect for solo agents ready to automate',
        features: ['CRM Setup & Configuration', '5 Automated Workflows', 'Basic Email Templates (10)', 'Lead Capture Forms', '30 Days Support', '1 User License'],
        popular: false,
        icon: 'Sparkles',
      },
      {
        id: 'ss-2',
        name: 'Professional',
        price: '$1,799',
        period: 'one-time',
        subtitle: 'Best for growing teams needing full automation',
        features: ['Everything in Starter', '15 Automated Workflows', 'Advanced Email & SMS Sequences', 'Pipeline Automation', 'Calendar Integration', 'Task Automation', '90 Days Support', 'Up to 5 Users'],
        popular: true,
        icon: 'Crown',
      },
      {
        id: 'ss-3',
        name: 'Enterprise',
        price: '$3,499',
        period: 'one-time',
        subtitle: 'Complete solution for teams & brokerages',
        features: ['Everything in Professional', 'Unlimited Workflows', 'Custom API Integrations', 'Advanced Reporting Dashboard', 'Team Lead Routing', 'Priority Support', 'Dedicated Account Manager', 'Unlimited Users', '1 Year Support & Maintenance'],
        popular: false,
        icon: 'Gem',
      },
    ],
  },
  {
    id: '4',
    serviceName: 'Performance Advertising',
    serviceSlug: 'performance-advertising',
    icon: 'BarChart3',
    plans: [
      {
        id: 'pa-1',
        name: 'Ad Starter',
        price: '$899',
        period: '/month',
        subtitle: 'Entry-level campaigns for new advertisers',
        features: ['1 Platform (Google or Meta)', 'Campaign Setup & Management', 'Ad Creative Design (2)', 'Monthly Budget: $500-1K', 'Basic Analytics', '30 Days Management'],
        popular: false,
        icon: 'Sparkles',
      },
      {
        id: 'pa-2',
        name: 'Performance Pro',
        price: '$1,799',
        period: '/month',
        subtitle: 'Multi-platform campaigns for serious growth',
        features: ['2 Platforms (Google + Meta)', 'Everything in Starter', 'Advanced Targeting', 'A/B Testing', 'Retargeting Campaigns', 'Monthly Budget: $1K-3K', '90 Days Management'],
        popular: true,
        icon: 'Crown',
      },
      {
        id: 'pa-3',
        name: 'Enterprise Ads',
        price: '$3,499',
        period: '/month',
        subtitle: 'Full-funnel advertising for top producers',
        features: ['All Major Platforms', 'Everything in Pro', 'YouTube & Display Ads', 'Custom Audiences', 'Advanced Analytics', 'Monthly Budget: $3K-10K', 'Dedicated Ad Manager', '6 Months Management'],
        popular: false,
        icon: 'Gem',
      },
    ],
  },
  {
    id: '5',
    serviceName: 'Exclusive Leads',
    serviceSlug: 'exclusive-leads',
    icon: 'Target',
    plans: [
      {
        id: 'el-1',
        name: 'Essential',
        price: '$300',
        period: '/yearly',
        subtitle: 'Ideal For New Agents',
        features: ['15-20 Verified Leads Yearly', 'ISA Verified Leads', 'Direct CRM Delivery', 'Lead Tracking Tools', '22% Average Conversion', '20% On Closed Transactions'],
        popular: false,
        icon: 'Sparkles',
      },
      {
        id: 'el-2',
        name: 'Professional',
        price: '$700',
        period: '/yearly',
        subtitle: 'Ideal For Active Agents',
        features: ['20-26 Booked Appointments Yearly', 'ISA Verified Booked Appointments', 'Full CRM Integration Included', 'Includes Dashboard Access', '30% Average Conversion', '15% Referral Fee'],
        popular: true,
        icon: 'Crown',
      },
      {
        id: 'el-3',
        name: 'Executive',
        price: '$1,200',
        period: '/yearly',
        subtitle: 'Ideal For Premier Agents',
        features: ['30-40 Prospects Transferred Yearly', 'ISA Verified Live Transfers', 'Advanced CRM Automation', 'Detailed Performance Dashboards', '40% Average Conversion', '10% Referral Fee'],
        popular: false,
        icon: 'Gem',
      },
    ],
  },
  {
    id: '6',
    serviceName: 'Dedicated Support',
    serviceSlug: 'dedicated-support',
    icon: 'Users',
    plans: [
      {
        id: 'ds-1',
        name: 'Part-Time VA',
        price: '$799',
        period: '/month',
        subtitle: '20 hours/week of dedicated support',
        features: ['20 Hours per Week', 'CRM Management', 'Email & Calendar Management', 'Lead Follow-ups', 'Basic Data Entry', '30 Days Support'],
        popular: false,
        icon: 'Sparkles',
      },
      {
        id: 'ds-2',
        name: 'Full-Time VA',
        price: '$1,499',
        period: '/month',
        subtitle: '40 hours/week complete support solution',
        features: ['40 Hours per Week', 'Everything in Part-Time', 'Transaction Coordination', 'Client Communication', 'Document Management', 'Social Media Posting', '90 Days Support'],
        popular: true,
        icon: 'Crown',
      },
      {
        id: 'ds-3',
        name: 'Team Support',
        price: '$2,999',
        period: '/month',
        subtitle: 'Dedicated team for brokerages',
        features: ['80 Hours per Week', '2 Dedicated Assistants', 'Advanced CRM Automation', 'Listing Management', 'Marketing Support', 'Reporting & Analytics', 'Priority Support', '6 Months Support'],
        popular: false,
        icon: 'Gem',
      },
    ],
  },
  {
    id: '7',
    serviceName: 'Brand Content',
    serviceSlug: 'brand-content',
    icon: 'MessageSquare',
    plans: [
      {
        id: 'bc-1',
        name: 'Content Starter',
        price: '$599',
        period: '/month',
        subtitle: 'Perfect for agents starting their social presence',
        features: ['12 Posts per Month', '3 Social Platforms', 'Custom Branded Templates', 'Content Calendar', 'Monthly Strategy Call', '30 Days Support'],
        popular: false,
        icon: 'Sparkles',
      },
      {
        id: 'bc-2',
        name: 'Brand Builder',
        price: '$1,299',
        period: '/month',
        subtitle: 'Complete content marketing for growing agents',
        features: ['Everything in Starter', '20 Posts per Month', 'All Major Platforms', 'Stories & Reels Content', 'Hashtag Strategy', 'Engagement Monitoring', '90 Days Support'],
        popular: true,
        icon: 'Crown',
      },
      {
        id: 'bc-3',
        name: 'Authority Package',
        price: '$2,499',
        period: '/month',
        subtitle: 'Full-service content for market leaders',
        features: ['Everything in Brand Builder', 'Daily Posts (30/month)', 'Video Content Creation', 'Blog Writing (4/month)', 'Community Management', 'Influencer Outreach', 'Priority Support', '6 Months Support'],
        popular: false,
        icon: 'Gem',
      },
    ],
  },
];

// Pricing Plan Form Component
function PricingPlanForm({ 
  plan, 
  onSave, 
  onCancel 
}: { 
  plan?: PricingPlan; 
  onSave: (data: Partial<PricingPlan>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Partial<PricingPlan>>({
    name: plan?.name || '',
    price: plan?.price || '',
    period: plan?.period || 'one-time',
    subtitle: plan?.subtitle || '',
    features: plan?.features || ['', '', '', '', '', ''],
    popular: plan?.popular || false,
    icon: plan?.icon || 'Sparkles',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const iconOptions = ['Sparkles', 'Crown', 'Gem', 'Zap', 'MapPin', 'Settings', 'Target', 'BarChart3', 'Users', 'MessageSquare'];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-white/70 text-sm mb-2">Plan Name *</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Starter"
            className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
            required
          />
        </div>
        <div>
          <label className="block text-white/70 text-sm mb-2">Icon</label>
          <select
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            className="w-full h-10 px-3 bg-dark-border border border-dark-border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gold/50"
          >
            {iconOptions.map(icon => (
              <option key={icon} value={icon}>{icon}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-white/70 text-sm mb-2">Price *</label>
          <Input
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="e.g. $1,299"
            className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
            required
          />
        </div>
        <div>
          <label className="block text-white/70 text-sm mb-2">Billing Period</label>
          <select
            value={formData.period}
            onChange={(e) => setFormData({ ...formData, period: e.target.value })}
            className="w-full h-10 px-3 bg-dark-border border border-dark-border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gold/50"
          >
            <option value="one-time">One-time</option>
            <option value="/month">Monthly</option>
            <option value="/yearly">Yearly</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-white/70 text-sm mb-2">Subtitle *</label>
        <Input
          value={formData.subtitle}
          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
          placeholder="e.g. Perfect for new agents"
          className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
          required
        />
      </div>

      <div>
        <label className="block text-white/70 text-sm mb-2">Features</label>
        <div className="space-y-2">
          {(formData.features || []).map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-gold flex-shrink-0" />
              <Input
                value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
                placeholder={`Feature ${index + 1}`}
                className="flex-1 bg-dark-border border-dark-border text-white placeholder:text-white/30 text-sm"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <label className="flex items-center space-x-3 cursor-pointer">
          <div 
            className={`w-5 h-5 rounded border ${formData.popular ? 'bg-gold border-gold' : 'border-white/30'} flex items-center justify-center transition-colors`}
            onClick={() => setFormData({ ...formData, popular: !formData.popular })}
          >
            {formData.popular && <Check className="w-3 h-3 text-black" />}
          </div>
          <span className="text-white/70 text-sm">Mark as Most Popular</span>
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-dark-border">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          className="border-dark-border text-white hover:bg-white/5"
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          className="bg-gold text-black hover:bg-gold-light"
        >
          {plan ? 'Update Plan' : 'Add Plan'}
        </Button>
      </div>
    </form>
  );
}

// Main Pricing Manager Component
export function PricingManager() {
  const [pricingData, setPricingData] = useState<ServicePricing[]>(initialPricingData);
  const [selectedService, setSelectedService] = useState<string>(initialPricingData[0].id);
  const [editingPlan, setEditingPlan] = useState<{ plan: PricingPlan; serviceId: string } | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const currentService = pricingData.find(s => s.id === selectedService);

  const handleAddPlan = (data: Partial<PricingPlan>) => {
    if (!currentService) return;
    
    const newPlan: PricingPlan = {
      id: `${currentService.serviceSlug}-${Date.now()}`,
      name: data.name || '',
      price: data.price || '',
      period: data.period || 'one-time',
      subtitle: data.subtitle || '',
      features: (data.features || []).filter(f => f.trim() !== ''),
      popular: data.popular || false,
      icon: data.icon || 'Sparkles',
    };

    setPricingData(pricingData.map(service => 
      service.id === selectedService 
        ? { ...service, plans: [...service.plans, newPlan] }
        : service
    ));
    setIsAddDialogOpen(false);
  };

  const handleEditPlan = (data: Partial<PricingPlan>) => {
    if (!editingPlan) return;
    
    setPricingData(pricingData.map(service => 
      service.id === editingPlan.serviceId 
        ? { 
            ...service, 
            plans: service.plans.map(p => 
              p.id === editingPlan.plan.id 
                ? { ...p, ...data, features: (data.features || []).filter(f => f.trim() !== '') }
                : p
            )
          }
        : service
    ));
    setIsEditDialogOpen(false);
    setEditingPlan(null);
  };

  const handleDeletePlan = (serviceId: string, planId: string) => {
    if (confirm('Are you sure you want to delete this pricing plan?')) {
      setPricingData(pricingData.map(service => 
        service.id === serviceId 
          ? { ...service, plans: service.plans.filter(p => p.id !== planId) }
          : service
      ));
    }
  };

  const getServiceStats = (service: ServicePricing) => {
    const prices = service.plans.map(p => parseInt(p.price.replace(/[^0-9]/g, '')));
    const avgPrice = prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0;
    return {
      planCount: service.plans.length,
      popularCount: service.plans.filter(p => p.popular).length,
      avgPrice,
    };
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display text-white">Pricing Manager</h1>
          <p className="text-white/50 mt-1">Manage pricing plans for all your services.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gold text-black hover:bg-gold-light">
              <Plus className="w-4 h-4 mr-2" />
              Add Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-dark-card border-dark-border text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-display text-white">
                Add New Plan to {currentService?.serviceName}
              </DialogTitle>
            </DialogHeader>
            <PricingPlanForm 
              onSave={handleAddPlan} 
              onCancel={() => setIsAddDialogOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Service Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {pricingData.map((service) => {
          const stats = getServiceStats(service);
          const IconComponent = iconMap[service.icon] || DollarSign;
          const isActive = selectedService === service.id;
          
          return (
            <button
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className={`text-left p-3 rounded-xl border transition-all duration-300 ${
                isActive 
                  ? 'bg-gold/10 border-gold/50' 
                  : 'bg-dark-card border-dark-border hover:border-gold/30'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${
                isActive ? 'bg-gold' : 'bg-gold/10'
              }`}>
                <IconComponent className={`w-4 h-4 ${isActive ? 'text-black' : 'text-gold'}`} />
              </div>
              <p className={`text-xs font-medium truncate ${isActive ? 'text-gold' : 'text-white'}`}>
                {service.serviceName}
              </p>
              <p className="text-white/40 text-xs">{stats.planCount} plans</p>
            </button>
          );
        })}
      </div>

      {/* Selected Service Details */}
      {currentService && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-display text-white">{currentService.serviceName}</h2>
              <p className="text-white/50 text-sm">
                {getServiceStats(currentService).planCount} pricing plans • {getServiceStats(currentService).popularCount} popular
              </p>
            </div>
          </div>

          {/* Pricing Plans Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentService.plans.map((plan) => {
              const IconComponent = iconMap[plan.icon] || Sparkles;
              
              return (
                <div 
                  key={plan.id}
                  className={`relative bg-dark-card border rounded-xl p-5 transition-all duration-300 ${
                    plan.popular 
                      ? 'border-gold/50 scale-[1.02]' 
                      : 'border-dark-border hover:border-gold/30'
                  }`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-black px-3 py-1 rounded-full text-xs font-semibold">
                      Most Popular
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      plan.popular ? 'bg-gold' : 'bg-gold/10'
                    }`}>
                      <IconComponent className={`w-6 h-6 ${plan.popular ? 'text-black' : 'text-gold'}`} />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                          <MoreVertical className="w-5 h-5 text-white/50" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-dark-card border-dark-border">
                        <DropdownMenuItem 
                          onClick={() => {
                            setEditingPlan({ plan, serviceId: currentService.id });
                            setIsEditDialogOpen(true);
                          }}
                          className="text-white hover:bg-white/5 focus:bg-white/5 cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeletePlan(currentService.id, plan.id)}
                          className="text-red-500 hover:bg-white/5 focus:bg-white/5 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <h3 className="text-white font-medium text-lg mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-2xl font-display text-gold">{plan.price}</span>
                    <span className="text-white/50 text-sm">{plan.period}</span>
                  </div>
                  <p className="text-white/50 text-sm mb-4">{plan.subtitle}</p>

                  <div className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <div className="w-5 h-5 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-gold" />
                        </div>
                        <span className="text-white/70 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {currentService.plans.length === 0 && (
            <div className="text-center py-12 bg-dark-card border border-dark-border rounded-xl">
              <DollarSign className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/50">No pricing plans for this service yet.</p>
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="mt-4 bg-gold text-black hover:bg-gold-light"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add First Plan
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-dark-card border-dark-border text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-display text-white">
              Edit {editingPlan?.plan.name} Plan
            </DialogTitle>
          </DialogHeader>
          {editingPlan && (
            <PricingPlanForm 
              plan={editingPlan.plan}
              onSave={handleEditPlan} 
              onCancel={() => {
                setIsEditDialogOpen(false);
                setEditingPlan(null);
              }} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
