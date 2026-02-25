import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, MoreVertical, Quote, Star, Check } from 'lucide-react';
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

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
  rating: number;
  featured: boolean;
  date: string;
}

// Mock data - in real app this would come from API
const initialTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sophia Martinez',
    role: 'Team Leader — California',
    quote: 'The CRM workflows they set up were a game changer for my team. Appointments, reminders, and follow-ups all happen automatically, and my VA now has a structured system to work with.',
    image: '/assets/testimonial-1.jpg',
    rating: 5,
    featured: true,
    date: '2025-01-15',
  },
  {
    id: '2',
    name: 'Jonathan Reed',
    role: 'Real Estate Investor — New York',
    quote: 'Professional, reliable, and incredibly efficient. NexLeed handled my branding, website, and ads with complete clarity. I loved how transparent the entire process was. The results were immediate.',
    image: '/assets/testimonial-2.jpg',
    rating: 5,
    featured: true,
    date: '2025-01-10',
  },
  {
    id: '3',
    name: 'Emily Carter',
    role: 'Real Estate Agent — Florida',
    quote: 'Working with NexLeed completely transformed my business. The new website and CRM automations helped me capture more leads in the first month than I did all last quarter.',
    image: '/assets/testimonial-3.jpg',
    rating: 5,
    featured: true,
    date: '2025-01-05',
  },
  {
    id: '4',
    name: 'Daniel Rivera',
    role: 'Broker Associate — Texas',
    quote: 'They took my scattered ideas and turned them into a powerful agent brand. The website is clean, fast, and built for conversions. The lead generation campaigns they launched brought in motivated buyers.',
    image: '/assets/testimonial-4.jpg',
    rating: 5,
    featured: false,
    date: '2024-12-28',
  },
];

// Testimonial Form Component
function TestimonialForm({ 
  testimonial, 
  onSave, 
  onCancel 
}: { 
  testimonial?: Testimonial; 
  onSave: (data: Partial<Testimonial>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: testimonial?.name || '',
    role: testimonial?.role || '',
    quote: testimonial?.quote || '',
    image: testimonial?.image || '/assets/testimonial-1.jpg',
    rating: testimonial?.rating || 5,
    featured: testimonial?.featured || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-white/70 text-sm mb-2">Name *</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. John Smith"
            className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
            required
          />
        </div>
        <div>
          <label className="block text-white/70 text-sm mb-2">Role *</label>
          <Input
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            placeholder="e.g. Real Estate Agent — Florida"
            className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-white/70 text-sm mb-2">Quote/Testimonial *</label>
        <Textarea
          value={formData.quote}
          onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
          placeholder="Enter the testimonial text..."
          rows={4}
          className="bg-dark-border border-dark-border text-white placeholder:text-white/30 resize-none"
          required
        />
      </div>

      <div>
        <label className="block text-white/70 text-sm mb-2">Profile Image</label>
        <ImageUpload
          value={formData.image || ''}
          onChange={(value) => setFormData({ ...formData, image: value })}
          placeholder="/assets/testimonial-1.jpg"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-white/70 text-sm mb-2">Rating</label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({ ...formData, rating: star })}
                className="p-1 hover:scale-110 transition-transform"
              >
                <Star 
                  className={`w-6 h-6 ${star <= (formData.rating || 0) ? 'text-gold fill-gold' : 'text-white/30'}`} 
                />
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <label className="flex items-center space-x-3 cursor-pointer">
            <div 
              className={`w-5 h-5 rounded border ${formData.featured ? 'bg-gold border-gold' : 'border-white/30'} flex items-center justify-center transition-colors`}
              onClick={() => setFormData({ ...formData, featured: !formData.featured })}
            >
              {formData.featured && <Check className="w-3 h-3 text-black" />}
            </div>
            <span className="text-white/70 text-sm">Featured on homepage</span>
          </label>
        </div>
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
          {testimonial ? 'Update Testimonial' : 'Add Testimonial'}
        </Button>
      </div>
    </form>
  );
}

// Main Testimonials Manager Component
export function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const filteredTestimonials = testimonials.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.quote.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = (data: Partial<Testimonial>) => {
    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      name: data.name || '',
      role: data.role || '',
      quote: data.quote || '',
      image: data.image || '/assets/testimonial-1.jpg',
      rating: data.rating || 5,
      featured: data.featured || false,
      date: new Date().toISOString().split('T')[0],
    };
    setTestimonials([newTestimonial, ...testimonials]);
    setIsAddDialogOpen(false);
  };

  const handleEdit = (data: Partial<Testimonial>) => {
    if (!editingTestimonial) return;
    setTestimonials(testimonials.map(t => 
      t.id === editingTestimonial.id ? { ...t, ...data } : t
    ));
    setIsEditDialogOpen(false);
    setEditingTestimonial(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      setTestimonials(testimonials.filter(t => t.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display text-white">Testimonials</h1>
          <p className="text-white/50 mt-1">Manage client testimonials and reviews displayed on your website.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gold text-black hover:bg-gold-light">
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-dark-card border-dark-border text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-display text-white">Add New Testimonial</DialogTitle>
            </DialogHeader>
            <TestimonialForm 
              onSave={handleAdd} 
              onCancel={() => setIsAddDialogOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-dark-card border border-dark-border rounded-xl p-4 text-center">
          <p className="text-2xl sm:text-3xl font-display text-gold">{testimonials.length}</p>
          <p className="text-white/50 text-sm">Total</p>
        </div>
        <div className="bg-dark-card border border-dark-border rounded-xl p-4 text-center">
          <p className="text-2xl sm:text-3xl font-display text-gold">{testimonials.filter(t => t.featured).length}</p>
          <p className="text-white/50 text-sm">Featured</p>
        </div>
        <div className="bg-dark-card border border-dark-border rounded-xl p-4 text-center">
          <p className="text-2xl sm:text-3xl font-display text-gold">
            {(testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1)}
          </p>
          <p className="text-white/50 text-sm">Avg Rating</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search testimonials by name, role, or content..."
          className="pl-10 bg-dark-card border-dark-border text-white placeholder:text-white/30"
        />
      </div>

      {/* Testimonials Grid */}
      <div className="grid gap-4">
        {filteredTestimonials.map((testimonial) => (
          <div 
            key={testimonial.id}
            className="bg-dark-card border border-dark-border rounded-xl p-5 hover:border-gold/30 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-gold/30 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-white font-medium">{testimonial.name}</h3>
                    {testimonial.featured && (
                      <span className="px-2 py-0.5 bg-gold/20 text-gold text-xs rounded-full">Featured</span>
                    )}
                  </div>
                  <p className="text-gold text-sm mb-2">{testimonial.role}</p>
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < testimonial.rating ? 'text-gold fill-gold' : 'text-white/20'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-white/60 text-sm line-clamp-2">
                    <Quote className="w-4 h-4 inline mr-1 text-gold/50" />
                    {testimonial.quote}
                  </p>
                </div>
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
                      setEditingTestimonial(testimonial);
                      setIsEditDialogOpen(true);
                    }}
                    className="text-white hover:bg-white/5 focus:bg-white/5 cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleDelete(testimonial.id)}
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
      </div>

      {filteredTestimonials.length === 0 && (
        <div className="text-center py-12 bg-dark-card border border-dark-border rounded-xl">
          <Quote className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/50">No testimonials found matching your search.</p>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-dark-card border-dark-border text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-display text-white">Edit Testimonial</DialogTitle>
          </DialogHeader>
          {editingTestimonial && (
            <TestimonialForm 
              testimonial={editingTestimonial}
              onSave={handleEdit} 
              onCancel={() => {
                setIsEditDialogOpen(false);
                setEditingTestimonial(null);
              }} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
