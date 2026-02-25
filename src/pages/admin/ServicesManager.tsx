import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, MoreVertical, Briefcase, Check, ArrowUpRight, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImageUpload } from '@/components/ui/image-upload';
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

interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  icon: string;
  link: string;
  order: number;
  active: boolean;
}

const initialServices: Service[] = [
  {
    id: '1',
    title: 'Modern Websites',
    subtitle: 'for Real Estate',
    description: 'Clean, fast, and purpose-driven websites built to highlight your brand and create a seamless experience for your clients.',
    features: ['Custom Layouts', 'Property Focused', 'Mobile Ready Pages', 'Fast & Secure Performance'],
    image: '/assets/service-website.jpg',
    icon: 'Zap',
    link: '/services/modern-websites',
    order: 1,
    active: true,
  },
  {
    id: '2',
    title: 'GBP SEO',
    subtitle: '& Local Optimization',
    description: 'Comprehensive Google Business Profile optimization and local SEO strategies to dominate local search results.',
    features: ['Profile Optimization', 'Local Rank Tracking', 'Review Management', 'Google Maps Visibility'],
    image: '/assets/service-crm.jpg',
    icon: 'MapPin',
    link: '/services/gbp-seo',
    order: 2,
    active: true,
  },
  {
    id: '3',
    title: 'Streamlined Systems',
    subtitle: 'and Workflows',
    description: 'Organized pipelines and automated follow-ups that help agents manage clients with more structure and less effort.',
    features: ['Lead Routing', 'Smart Follow ups', 'Appointment Flows', 'Centralized Communication'],
    image: '/assets/service-gbp-seo.jpg',
    icon: 'Settings',
    link: '/services/streamlined-systems',
    order: 3,
    active: true,
  },
  {
    id: '4',
    title: 'Exclusive Buyer',
    subtitle: '& Seller Leads',
    description: 'Targeted campaigns and data-driven processes designed to deliver high-intent inquiries directly to you.',
    features: ['Verified Leads', 'Market Specific Targeting', 'No Shared Leads', 'Simple Intake Process'],
    image: '/assets/service-leads.jpg',
    icon: 'Target',
    link: '/services/exclusive-leads',
    order: 4,
    active: true,
  },
  {
    id: '5',
    title: 'Performance-Driven',
    subtitle: 'Advertising',
    description: 'Well-structured campaigns across major platforms to help agents increase visibility and generate consistent opportunities.',
    features: ['Facebook & Instagram', 'Google & Youtube', 'Conversion Based Setup', 'Ongoing Optimization'],
    image: '/assets/service-ads.jpg',
    icon: 'BarChart3',
    link: '/services/performance-advertising',
    order: 5,
    active: true,
  },
  {
    id: '6',
    title: 'Dedicated Support',
    subtitle: 'for Daily Operations',
    description: 'Trained assistants who help maintain your CRM, manage follow-ups, and support your day-to-day communication.',
    features: ['CRM Updates', 'Lead Qualification', 'Appointment', 'Admin Support'],
    image: '/assets/service-support.jpg',
    icon: 'Users',
    link: '/services/dedicated-support',
    order: 6,
    active: true,
  },
  {
    id: '7',
    title: 'Consistent, Brand-Aligned',
    subtitle: 'Content',
    description: 'Simple, effective content that strengthens your presence and keeps your brand active across social platforms.',
    features: ['Posts & Stories', 'Brand Consistency', 'Scheduling', 'Light Engagement Support'],
    image: '/assets/service-content.jpg',
    icon: 'MessageSquare',
    link: '/services/brand-content',
    order: 7,
    active: true,
  },
];

// Service Form Component
function ServiceForm({ 
  service, 
  onSave, 
  onCancel 
}: { 
  service?: Service; 
  onSave: (data: Partial<Service>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Partial<Service>>({
    title: service?.title || '',
    subtitle: service?.subtitle || '',
    description: service?.description || '',
    features: service?.features || ['', '', '', ''],
    image: service?.image || '/assets/service-website.jpg',
    icon: service?.icon || 'Zap',
    link: service?.link || '',
    active: service?.active ?? true,
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-white/70 text-sm mb-2">Service Title *</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Modern Websites"
            className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
            required
          />
        </div>
        <div>
          <label className="block text-white/70 text-sm mb-2">Subtitle *</label>
          <Input
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            placeholder="e.g. for Real Estate"
            className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-white/70 text-sm mb-2">Description *</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe the service..."
          rows={3}
          className="bg-dark-border border-dark-border text-white placeholder:text-white/30 resize-none"
          required
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-white/70 text-sm mb-2">Page Link</label>
          <Input
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            placeholder="/services/modern-websites"
            className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
          />
        </div>
        <div>
          <label className="block text-white/70 text-sm mb-2">Or Enter Image URL</label>
          <Input
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="/assets/service-website.jpg"
            className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
          />
        </div>
      </div>

      <div>
        <label className="block text-white/70 text-sm mb-2">Service Image</label>
        <ImageUpload
          value={formData.image || ''}
          onChange={(value) => setFormData({ ...formData, image: value })}
          placeholder="/assets/service-website.jpg"
        />
      </div>

      <div>
        <label className="block text-white/70 text-sm mb-2">Key Features</label>
        <div className="space-y-2">
          {(formData.features || []).map((feature, index) => (
            <Input
              key={index}
              value={feature}
              onChange={(e) => updateFeature(index, e.target.value)}
              placeholder={`Feature ${index + 1}`}
              className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
            />
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <label className="flex items-center space-x-3 cursor-pointer">
          <div 
            className={`w-5 h-5 rounded border ${formData.active ? 'bg-gold border-gold' : 'border-white/30'} flex items-center justify-center transition-colors`}
            onClick={() => setFormData({ ...formData, active: !formData.active })}
          >
            {formData.active && <Check className="w-3 h-3 text-black" />}
          </div>
          <span className="text-white/70 text-sm">Service is active</span>
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
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
          {service ? 'Update Service' : 'Add Service'}
        </Button>
      </div>
    </form>
  );
}

// Main Services Manager Component
export function ServicesManager() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const filteredServices = services.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = (data: Partial<Service>) => {
    const newService: Service = {
      id: Date.now().toString(),
      title: data.title || '',
      subtitle: data.subtitle || '',
      description: data.description || '',
      features: data.features || [],
      image: data.image || '/assets/service-website.jpg',
      icon: data.icon || 'Zap',
      link: data.link || '',
      order: services.length + 1,
      active: data.active ?? true,
    };
    setServices([...services, newService]);
    setIsAddDialogOpen(false);
  };

  const handleEdit = (data: Partial<Service>) => {
    if (!editingService) return;
    setServices(services.map(s => 
      s.id === editingService.id ? { ...s, ...data } : s
    ));
    setIsEditDialogOpen(false);
    setEditingService(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const activeServices = services.filter(s => s.active).length;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display text-white">Services</h1>
          <p className="text-white/50 mt-1">Manage your service offerings displayed on the website.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gold text-black hover:bg-gold-light">
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-dark-card border-dark-border text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-display text-white">Add New Service</DialogTitle>
            </DialogHeader>
            <ServiceForm 
              onSave={handleAdd} 
              onCancel={() => setIsAddDialogOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-dark-card border border-dark-border rounded-xl p-4 text-center">
          <p className="text-2xl sm:text-3xl font-display text-gold">{services.length}</p>
          <p className="text-white/50 text-sm">Total Services</p>
        </div>
        <div className="bg-dark-card border border-dark-border rounded-xl p-4 text-center">
          <p className="text-2xl sm:text-3xl font-display text-green-500">{activeServices}</p>
          <p className="text-white/50 text-sm">Active</p>
        </div>
        <div className="bg-dark-card border border-dark-border rounded-xl p-4 text-center">
          <p className="text-2xl sm:text-3xl font-display text-gold">{services.length - activeServices}</p>
          <p className="text-white/50 text-sm">Inactive</p>
        </div>
        <div className="bg-dark-card border border-dark-border rounded-xl p-4 text-center">
          <p className="text-2xl sm:text-3xl font-display text-gold">{services.filter(s => s.link).length}</p>
          <p className="text-white/50 text-sm">With Detail Pages</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search services..."
          className="pl-10 bg-dark-card border-dark-border text-white placeholder:text-white/30"
        />
      </div>

      {/* Services Grid */}
      <div className="grid gap-4">
        {filteredServices.sort((a, b) => a.order - b.order).map((service) => (
          <div 
            key={service.id}
            className={`bg-dark-card border rounded-xl p-5 transition-all duration-300 group ${
              service.active ? 'border-dark-border hover:border-gold/30' : 'border-red-500/30 opacity-70'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-7 h-7 text-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-white font-medium">{service.title}</h3>
                    <span className="text-gold">{service.subtitle}</span>
                    {!service.active && (
                      <span className="px-2 py-0.5 bg-red-500/20 text-red-500 text-xs rounded-full">Inactive</span>
                    )}
                  </div>
                  <p className="text-white/50 text-sm mb-2 line-clamp-2">{service.description}</p>
                  <div className="flex items-center space-x-2 flex-wrap gap-2">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className="px-2 py-1 bg-dark-border rounded text-white/60 text-xs">
                        {feature}
                      </span>
                    ))}
                    {service.features.length > 3 && (
                      <span className="text-white/40 text-xs">+{service.features.length - 3} more</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {service.link && (
                  <a 
                    href={service.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                    title="View page"
                  >
                    <ArrowUpRight className="w-5 h-5 text-white/50" />
                  </a>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5 text-white/50" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-dark-card border-dark-border">
                    <DropdownMenuItem 
                      onClick={() => {
                        setEditingService(service);
                        setIsEditDialogOpen(true);
                      }}
                      className="text-white hover:bg-white/5 focus:bg-white/5 cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDelete(service.id)}
                      className="text-red-500 hover:bg-white/5 focus:bg-white/5 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12 bg-dark-card border border-dark-border rounded-xl">
          <Briefcase className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/50">No services found matching your search.</p>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-dark-card border-dark-border text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-display text-white">Edit Service</DialogTitle>
          </DialogHeader>
          {editingService && (
            <ServiceForm 
              service={editingService}
              onSave={handleEdit} 
              onCancel={() => {
                setIsEditDialogOpen(false);
                setEditingService(null);
              }} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
