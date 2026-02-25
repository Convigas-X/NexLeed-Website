import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, MoreVertical, HelpCircle, Check, GripVertical } from 'lucide-react';
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

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'home' | 'contact' | 'services' | 'general';
  order: number;
  active: boolean;
}

const initialFAQs: FAQ[] = [
  // Home Page FAQs
  {
    id: '1',
    question: 'What services does NexLeed provide?',
    answer: 'NexLeed provides comprehensive real estate solutions including modern website design, CRM automation, lead generation, social media management, paid advertising, and dedicated virtual assistant support.',
    category: 'home',
    order: 1,
    active: true,
  },
  {
    id: '2',
    question: 'How does NexLeed generate leads for realtors?',
    answer: 'We use targeted digital marketing campaigns across multiple platforms including Facebook, Instagram, Google, and YouTube. Our lead generation strategies are data-driven and specifically designed for real estate professionals.',
    category: 'home',
    order: 2,
    active: true,
  },
  {
    id: '3',
    question: 'Do you build websites specifically for real estate agents?',
    answer: 'Yes, all our websites are custom-built specifically for real estate professionals. We understand the unique needs of agents and create websites that showcase listings, capture leads, and build your brand.',
    category: 'home',
    order: 3,
    active: true,
  },
  {
    id: '4',
    question: 'What social media platforms do you manage?',
    answer: 'We manage all major social media platforms including Facebook, Instagram, LinkedIn, Twitter/X, and YouTube. Our team creates platform-specific content to maximize engagement and lead generation.',
    category: 'home',
    order: 4,
    active: true,
  },
  {
    id: '5',
    question: 'How long does it take to build a real estate website?',
    answer: 'Typically, our website projects take 2-4 weeks from start to finish. This includes design, development, content integration, and testing. Rush options are available for urgent needs.',
    category: 'home',
    order: 5,
    active: true,
  },
  {
    id: '6',
    question: 'Do I need to provide the content, or will NexLeed create it?',
    answer: 'We offer both options. Our team can create all content for you including copywriting, photography coordination, and graphic design. Alternatively, you can provide your own content and we\'ll integrate it.',
    category: 'home',
    order: 6,
    active: true,
  },
  {
    id: '7',
    question: 'Can NexLeed run paid ads for real estate lead generation?',
    answer: 'Absolutely! Our team specializes in real estate paid advertising on Facebook, Instagram, Google, and YouTube. We handle everything from campaign setup to ongoing optimization and reporting.',
    category: 'home',
    order: 7,
    active: true,
  },
  {
    id: '8',
    question: 'Does NexLeed provide ongoing support after website is launched?',
    answer: 'Yes, we offer various support packages including website maintenance, content updates, technical support, and ongoing marketing services. We\'re committed to your long-term success.',
    category: 'home',
    order: 8,
    active: true,
  },
  // Contact Page FAQs
  {
    id: '9',
    question: 'How quickly will you respond to my inquiry?',
    answer: 'We typically respond to all inquiries within 24 business hours. For urgent matters, please call us directly at +1 (209) 243 1235.',
    category: 'contact',
    order: 1,
    active: true,
  },
  {
    id: '10',
    question: 'Do you offer free consultations?',
    answer: 'Yes! We offer a free 30-minute consultation to discuss your needs and how we can help. Schedule yours today.',
    category: 'contact',
    order: 2,
    active: true,
  },
  {
    id: '11',
    question: 'What information should I provide in my message?',
    answer: 'The more details you can share about your goals, current challenges, and timeline, the better we can assist you. Include your business type, target market, and any specific services you\'re interested in.',
    category: 'contact',
    order: 3,
    active: true,
  },
  {
    id: '12',
    question: 'Can I visit your office?',
    answer: 'Absolutely! We welcome in-person meetings. Our office is located at 5900 Balcones Dr, STE 100, Austin, TX 78731. Please schedule an appointment first to ensure someone is available to meet with you.',
    category: 'contact',
    order: 4,
    active: true,
  },
];

const categoryLabels: Record<string, string> = {
  home: 'Home Page',
  contact: 'Contact Page',
  services: 'Services Page',
  general: 'General',
};

// FAQ Form Component
function FAQForm({ 
  faq, 
  onSave, 
  onCancel 
}: { 
  faq?: FAQ; 
  onSave: (data: Partial<FAQ>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Partial<FAQ>>({
    question: faq?.question || '',
    answer: faq?.answer || '',
    category: faq?.category || 'general',
    active: faq?.active ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-white/70 text-sm mb-2">Question *</label>
        <Input
          value={formData.question}
          onChange={(e) => setFormData({ ...formData, question: e.target.value })}
          placeholder="Enter the question..."
          className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
          required
        />
      </div>

      <div>
        <label className="block text-white/70 text-sm mb-2">Answer *</label>
        <Textarea
          value={formData.answer}
          onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
          placeholder="Enter the answer..."
          rows={4}
          className="bg-dark-border border-dark-border text-white placeholder:text-white/30 resize-none"
          required
        />
      </div>

      <div>
        <label className="block text-white/70 text-sm mb-2">Category *</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value as FAQ['category'] })}
          className="w-full h-10 px-3 bg-dark-border border border-dark-border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gold/50"
        >
          <option value="home">Home Page</option>
          <option value="contact">Contact Page</option>
          <option value="services">Services Page</option>
          <option value="general">General</option>
        </select>
      </div>

      <div className="flex items-center space-x-3">
        <label className="flex items-center space-x-3 cursor-pointer">
          <div 
            className={`w-5 h-5 rounded border ${formData.active ? 'bg-gold border-gold' : 'border-white/30'} flex items-center justify-center transition-colors`}
            onClick={() => setFormData({ ...formData, active: !formData.active })}
          >
            {formData.active && <Check className="w-3 h-3 text-black" />}
          </div>
          <span className="text-white/70 text-sm">FAQ is active</span>
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
          {faq ? 'Update FAQ' : 'Add FAQ'}
        </Button>
      </div>
    </form>
  );
}

// Main FAQ Manager Component
export function FAQManager() {
  const [faqs, setFaqs] = useState<FAQ[]>(initialFAQs);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFAQsByCategory = (category: string) => 
    filteredFAQs.filter(faq => faq.category === category).sort((a, b) => a.order - b.order);

  const handleAdd = (data: Partial<FAQ>) => {
    const categoryFaqs = faqs.filter(f => f.category === data.category);
    const newFAQ: FAQ = {
      id: Date.now().toString(),
      question: data.question || '',
      answer: data.answer || '',
      category: data.category || 'general',
      order: categoryFaqs.length + 1,
      active: data.active ?? true,
    };
    setFaqs([...faqs, newFAQ]);
    setIsAddDialogOpen(false);
  };

  const handleEdit = (data: Partial<FAQ>) => {
    if (!editingFAQ) return;
    setFaqs(faqs.map(f => 
      f.id === editingFAQ.id ? { ...f, ...data } : f
    ));
    setIsEditDialogOpen(false);
    setEditingFAQ(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      setFaqs(faqs.filter(f => f.id !== id));
    }
  };

  const categories = ['home', 'contact', 'services', 'general'];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display text-white">FAQ Manager</h1>
          <p className="text-white/50 mt-1">Manage frequently asked questions across your website.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gold text-black hover:bg-gold-light">
              <Plus className="w-4 h-4 mr-2" />
              Add FAQ
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-dark-card border-dark-border text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-display text-white">Add New FAQ</DialogTitle>
            </DialogHeader>
            <FAQForm 
              onSave={handleAdd} 
              onCancel={() => setIsAddDialogOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-dark-card border border-dark-border rounded-xl p-4 text-center">
          <p className="text-2xl sm:text-3xl font-display text-gold">{faqs.length}</p>
          <p className="text-white/50 text-sm">Total FAQs</p>
        </div>
        {categories.map(cat => (
          <div key={cat} className="bg-dark-card border border-dark-border rounded-xl p-4 text-center">
            <p className="text-2xl sm:text-3xl font-display text-gold">{faqs.filter(f => f.category === cat).length}</p>
            <p className="text-white/50 text-sm">{categoryLabels[cat]}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search FAQs by question or answer..."
          className="pl-10 bg-dark-card border-dark-border text-white placeholder:text-white/30"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="home" className="w-full">
        <TabsList className="bg-dark-card border border-dark-border w-full justify-start overflow-x-auto">
          {categories.map(cat => (
            <TabsTrigger 
              key={cat} 
              value={cat}
              className="data-[state=active]:bg-gold data-[state=active]:text-black text-white/70"
            >
              {categoryLabels[cat]}
              <span className="ml-2 px-2 py-0.5 bg-dark-border rounded-full text-xs">
                {getFAQsByCategory(cat).length}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(cat => (
          <TabsContent key={cat} value={cat} className="mt-6">
            <div className="space-y-3">
              {getFAQsByCategory(cat).map((faq, index) => (
                <div 
                  key={faq.id}
                  className={`bg-dark-card border rounded-xl p-5 transition-all duration-300 group ${
                    faq.active ? 'border-dark-border hover:border-gold/30' : 'border-red-500/30 opacity-70'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="flex items-center space-x-2">
                        <GripVertical className="w-5 h-5 text-white/20 cursor-grab" />
                        <span className="text-white/30 text-sm w-6">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-white font-medium">{faq.question}</h3>
                          {!faq.active && (
                            <span className="px-2 py-0.5 bg-red-500/20 text-red-500 text-xs rounded-full">Inactive</span>
                          )}
                        </div>
                        <p className="text-white/50 text-sm line-clamp-2">{faq.answer}</p>
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
                            setEditingFAQ(faq);
                            setIsEditDialogOpen(true);
                          }}
                          className="text-white hover:bg-white/5 focus:bg-white/5 cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(faq.id)}
                          className="text-red-500 hover:bg-white/5 focus:bg-white/5 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
              
              {getFAQsByCategory(cat).length === 0 && (
                <div className="text-center py-12 bg-dark-card border border-dark-border rounded-xl">
                  <HelpCircle className="w-12 h-12 text-white/20 mx-auto mb-4" />
                  <p className="text-white/50">No FAQs found in this category.</p>
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-dark-card border-dark-border text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-display text-white">Edit FAQ</DialogTitle>
          </DialogHeader>
          {editingFAQ && (
            <FAQForm 
              faq={editingFAQ}
              onSave={handleEdit} 
              onCancel={() => {
                setIsEditDialogOpen(false);
                setEditingFAQ(null);
              }} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
