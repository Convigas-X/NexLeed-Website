import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, MoreVertical, FileText, Check, TrendingUp, Target, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ImageUpload } from '@/components/ui/image-upload';
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

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  location: string;
  category: string;
  image: string;
  description: string;
  stats: { label: string; value: string }[];
  challenges: string[];
  solutions: string[];
  results: string[];
  featured: boolean;
  date: string;
}

const initialCaseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'How Sarah M. Tripled Her Lead Generation in 90 Days',
    client: 'Sarah Mitchell',
    location: 'California',
    category: 'Lead Generation',
    image: '/assets/service-leads.jpg',
    description: 'Sarah was struggling to generate consistent leads for her real estate business. After implementing our comprehensive lead generation strategy, she saw a 300% increase in qualified leads within just 90 days.',
    stats: [
      { label: 'Lead Increase', value: '300%' },
      { label: 'Conversion Rate', value: '24%' },
      { label: 'ROI', value: '450%' },
    ],
    challenges: ['Inconsistent lead flow', 'Low conversion rates', 'Limited marketing budget'],
    solutions: ['Targeted Facebook & Instagram campaigns', 'Optimized landing pages', 'Automated follow-up sequences'],
    results: ['300% increase in qualified leads', '24% conversion rate improvement', '450% return on investment'],
    featured: true,
    date: '2025-01-15',
  },
  {
    id: '2',
    title: "Transforming a Brokerage's Digital Presence",
    client: 'Metro Realty Group',
    location: 'Texas',
    category: 'Website & Branding',
    image: '/assets/service-website.jpg',
    description: 'Metro Realty Group needed a complete digital overhaul. We redesigned their website, implemented CRM automation, and created a cohesive brand identity.',
    stats: [
      { label: 'Traffic Increase', value: '180%' },
      { label: 'Lead Capture', value: '65%' },
      { label: 'Page Speed', value: '98/100' },
    ],
    challenges: ['Outdated website design', 'Poor user experience', 'No lead capture system'],
    solutions: ['Modern, responsive website design', 'Integrated CRM system', 'Brand-aligned visual identity'],
    results: ['180% increase in website traffic', '65% improvement in lead capture', '98/100 page speed score'],
    featured: true,
    date: '2025-01-10',
  },
  {
    id: '3',
    title: 'Scaling a Solo Agent to a Top Producer',
    client: 'James Wilson',
    location: 'Florida',
    category: 'Full Service',
    image: '/assets/service-crm.jpg',
    description: 'James was a solo agent looking to scale his business. Our comprehensive solution helped him become a top producer in his market.',
    stats: [
      { label: 'Sales Volume', value: '+$2.5M' },
      { label: 'Time Saved', value: '15hrs/wk' },
      { label: 'Client Growth', value: '150%' },
    ],
    challenges: ['Limited time for marketing', 'No systems in place', 'Difficulty scaling operations'],
    solutions: ['Complete digital ecosystem', 'Dedicated virtual assistant', 'Performance-driven advertising'],
    results: ['$2.5M increase in sales volume', '15 hours saved per week', '150% client base growth'],
    featured: false,
    date: '2025-01-05',
  },
  {
    id: '4',
    title: 'Maximizing ROI with Strategic Ad Campaigns',
    client: 'Elite Properties Team',
    location: 'New York',
    category: 'Paid Advertising',
    image: '/assets/service-ads.jpg',
    description: 'Elite Properties was spending heavily on ads with poor results. We restructured their campaigns and optimized targeting.',
    stats: [
      { label: 'Cost Per Lead', value: '-40%' },
      { label: 'Lead Quality', value: '+85%' },
      { label: 'Ad Spend', value: '$50K/mo' },
    ],
    challenges: ['High cost per lead', 'Poor ad performance', 'Lack of tracking'],
    solutions: ['Campaign restructuring', 'Advanced targeting', 'Conversion optimization'],
    results: ['40% reduction in cost per lead', '85% improvement in lead quality', 'Scalable $50K monthly ad spend'],
    featured: true,
    date: '2024-12-28',
  },
];

// Case Study Form Component
function CaseStudyForm({ 
  caseStudy, 
  onSave, 
  onCancel 
}: { 
  caseStudy?: CaseStudy; 
  onSave: (data: Partial<CaseStudy>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Partial<CaseStudy>>({
    title: caseStudy?.title || '',
    client: caseStudy?.client || '',
    location: caseStudy?.location || '',
    category: caseStudy?.category || '',
    image: caseStudy?.image || '/assets/service-website.jpg',
    description: caseStudy?.description || '',
    stats: caseStudy?.stats || [
      { label: '', value: '' },
      { label: '', value: '' },
      { label: '', value: '' },
    ],
    challenges: caseStudy?.challenges || ['', '', ''],
    solutions: caseStudy?.solutions || ['', '', ''],
    results: caseStudy?.results || ['', '', ''],
    featured: caseStudy?.featured || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const updateStat = (index: number, field: 'label' | 'value', value: string) => {
    const newStats = [...(formData.stats || [])];
    newStats[index] = { ...newStats[index], [field]: value };
    setFormData({ ...formData, stats: newStats });
  };

  const updateList = (field: 'challenges' | 'solutions' | 'results', index: number, value: string) => {
    const newList = [...(formData[field] || [])];
    newList[index] = value;
    setFormData({ ...formData, [field]: newList });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-white/70 text-sm mb-2">Case Study Title *</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. How We Increased Leads by 300%"
            className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
            required
          />
        </div>
        <div>
          <label className="block text-white/70 text-sm mb-2">Client Name *</label>
          <Input
            value={formData.client}
            onChange={(e) => setFormData({ ...formData, client: e.target.value })}
            placeholder="e.g. Sarah Mitchell"
            className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
            required
          />
        </div>
        <div>
          <label className="block text-white/70 text-sm mb-2">Location *</label>
          <Input
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="e.g. California"
            className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
            required
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-white/70 text-sm mb-2">Category *</label>
          <Input
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            placeholder="e.g. Lead Generation"
            className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
            required
          />
        </div>
        <div>
          <label className="block text-white/70 text-sm mb-2">Featured Image</label>
          <Input
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="/assets/service-website.jpg"
            className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
          />
        </div>
      </div>

      <div>
        <label className="block text-white/70 text-sm mb-2">Or Upload Image</label>
        <ImageUpload
          value={formData.image || ''}
          onChange={(value) => setFormData({ ...formData, image: value })}
          placeholder="/assets/service-website.jpg"
        />
      </div>

      <div>
        <label className="block text-white/70 text-sm mb-2">Description *</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe the case study..."
          rows={3}
          className="bg-dark-border border-dark-border text-white placeholder:text-white/30 resize-none"
          required
        />
      </div>

      {/* Stats */}
      <div>
        <label className="block text-white/70 text-sm mb-3">Key Statistics</label>
        <div className="grid sm:grid-cols-3 gap-4">
          {(formData.stats || []).map((stat, index) => (
            <div key={index} className="space-y-2">
              <Input
                value={stat.label}
                onChange={(e) => updateStat(index, 'label', e.target.value)}
                placeholder={`Stat ${index + 1} Label`}
                className="bg-dark-border border-dark-border text-white placeholder:text-white/30 text-sm"
              />
              <Input
                value={stat.value}
                onChange={(e) => updateStat(index, 'value', e.target.value)}
                placeholder="Value"
                className="bg-dark-border border-dark-border text-white placeholder:text-white/30 text-sm"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Three Column Layout */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="flex items-center text-white/70 text-sm mb-3">
            <TrendingUp className="w-4 h-4 mr-2 text-gold" />
            Challenges
          </label>
          <div className="space-y-2">
            {(formData.challenges || []).map((item, index) => (
              <Input
                key={index}
                value={item}
                onChange={(e) => updateList('challenges', index, e.target.value)}
                placeholder={`Challenge ${index + 1}`}
                className="bg-dark-border border-dark-border text-white placeholder:text-white/30 text-sm"
              />
            ))}
          </div>
        </div>
        <div>
          <label className="flex items-center text-white/70 text-sm mb-3">
            <Target className="w-4 h-4 mr-2 text-gold" />
            Solutions
          </label>
          <div className="space-y-2">
            {(formData.solutions || []).map((item, index) => (
              <Input
                key={index}
                value={item}
                onChange={(e) => updateList('solutions', index, e.target.value)}
                placeholder={`Solution ${index + 1}`}
                className="bg-dark-border border-dark-border text-white placeholder:text-white/30 text-sm"
              />
            ))}
          </div>
        </div>
        <div>
          <label className="flex items-center text-white/70 text-sm mb-3">
            <BarChart3 className="w-4 h-4 mr-2 text-gold" />
            Results
          </label>
          <div className="space-y-2">
            {(formData.results || []).map((item, index) => (
              <Input
                key={index}
                value={item}
                onChange={(e) => updateList('results', index, e.target.value)}
                placeholder={`Result ${index + 1}`}
                className="bg-dark-border border-dark-border text-white placeholder:text-white/30 text-sm"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <label className="flex items-center space-x-3 cursor-pointer">
          <div 
            className={`w-5 h-5 rounded border ${formData.featured ? 'bg-gold border-gold' : 'border-white/30'} flex items-center justify-center transition-colors`}
            onClick={() => setFormData({ ...formData, featured: !formData.featured })}
          >
            {formData.featured && <Check className="w-3 h-3 text-black" />}
          </div>
          <span className="text-white/70 text-sm">Featured case study</span>
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
          {caseStudy ? 'Update Case Study' : 'Add Case Study'}
        </Button>
      </div>
    </form>
  );
}

// Main Case Studies Manager Component
export function CaseStudiesManager() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(initialCaseStudies);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const filteredCaseStudies = caseStudies.filter(cs => 
    cs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cs.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cs.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = (data: Partial<CaseStudy>) => {
    const newCaseStudy: CaseStudy = {
      id: Date.now().toString(),
      title: data.title || '',
      client: data.client || '',
      location: data.location || '',
      category: data.category || '',
      image: data.image || '/assets/service-website.jpg',
      description: data.description || '',
      stats: data.stats || [],
      challenges: data.challenges || [],
      solutions: data.solutions || [],
      results: data.results || [],
      featured: data.featured || false,
      date: new Date().toISOString().split('T')[0],
    };
    setCaseStudies([newCaseStudy, ...caseStudies]);
    setIsAddDialogOpen(false);
  };

  const handleEdit = (data: Partial<CaseStudy>) => {
    if (!editingCaseStudy) return;
    setCaseStudies(caseStudies.map(cs => 
      cs.id === editingCaseStudy.id ? { ...cs, ...data } : cs
    ));
    setIsEditDialogOpen(false);
    setEditingCaseStudy(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this case study?')) {
      setCaseStudies(caseStudies.filter(cs => cs.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display text-white">Case Studies</h1>
          <p className="text-white/50 mt-1">Manage success stories and client case studies.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gold text-black hover:bg-gold-light">
              <Plus className="w-4 h-4 mr-2" />
              Add Case Study
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-dark-card border-dark-border text-white max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-display text-white">Add New Case Study</DialogTitle>
            </DialogHeader>
            <CaseStudyForm 
              onSave={handleAdd} 
              onCancel={() => setIsAddDialogOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-dark-card border border-dark-border rounded-xl p-4 text-center">
          <p className="text-2xl sm:text-3xl font-display text-gold">{caseStudies.length}</p>
          <p className="text-white/50 text-sm">Total</p>
        </div>
        <div className="bg-dark-card border border-dark-border rounded-xl p-4 text-center">
          <p className="text-2xl sm:text-3xl font-display text-gold">{caseStudies.filter(cs => cs.featured).length}</p>
          <p className="text-white/50 text-sm">Featured</p>
        </div>
        <div className="bg-dark-card border border-dark-border rounded-xl p-4 text-center">
          <p className="text-2xl sm:text-3xl font-display text-gold">
            {[...new Set(caseStudies.map(cs => cs.category))].length}
          </p>
          <p className="text-white/50 text-sm">Categories</p>
        </div>
        <div className="bg-dark-card border border-dark-border rounded-xl p-4 text-center">
          <p className="text-2xl sm:text-3xl font-display text-gold">
            {[...new Set(caseStudies.map(cs => cs.location))].length}
          </p>
          <p className="text-white/50 text-sm">Locations</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search case studies by title, client, or category..."
          className="pl-10 bg-dark-card border-dark-border text-white placeholder:text-white/30"
        />
      </div>

      {/* Case Studies Grid */}
      <div className="grid gap-4">
        {filteredCaseStudies.map((caseStudy) => (
          <div 
            key={caseStudy.id}
            className="bg-dark-card border border-dark-border rounded-xl p-5 hover:border-gold/30 transition-all duration-300 group"
          >
            <div className="flex items-start gap-5">
              <img 
                src={caseStudy.image} 
                alt={caseStudy.title}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover border border-dark-border flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="px-2 py-1 bg-gold/20 text-gold text-xs rounded-full">{caseStudy.category}</span>
                      <span className="text-white/40 text-sm">{caseStudy.location}</span>
                      {caseStudy.featured && (
                        <span className="px-2 py-1 bg-green-500/20 text-green-500 text-xs rounded-full">Featured</span>
                      )}
                    </div>
                    <h3 className="text-white font-medium text-lg mb-1">{caseStudy.title}</h3>
                    <p className="text-gold text-sm mb-2">Client: {caseStudy.client}</p>
                    <p className="text-white/50 text-sm line-clamp-2">{caseStudy.description}</p>
                    
                    {/* Stats Preview */}
                    <div className="flex items-center space-x-4 mt-3">
                      {caseStudy.stats.map((stat, idx) => (
                        <div key={idx} className="text-center">
                          <p className="text-gold font-display text-lg">{stat.value}</p>
                          <p className="text-white/40 text-xs">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 hover:bg-white/5 rounded-lg transition-colors ml-4">
                        <MoreVertical className="w-5 h-5 text-white/50" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-dark-card border-dark-border">
                      <DropdownMenuItem 
                        onClick={() => {
                          setEditingCaseStudy(caseStudy);
                          setIsEditDialogOpen(true);
                        }}
                        className="text-white hover:bg-white/5 focus:bg-white/5 cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDelete(caseStudy.id)}
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
          </div>
        ))}
      </div>

      {filteredCaseStudies.length === 0 && (
        <div className="text-center py-12 bg-dark-card border border-dark-border rounded-xl">
          <FileText className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/50">No case studies found matching your search.</p>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-dark-card border-dark-border text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-display text-white">Edit Case Study</DialogTitle>
          </DialogHeader>
          {editingCaseStudy && (
            <CaseStudyForm 
              caseStudy={editingCaseStudy}
              onSave={handleEdit} 
              onCancel={() => {
                setIsEditDialogOpen(false);
                setEditingCaseStudy(null);
              }} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
