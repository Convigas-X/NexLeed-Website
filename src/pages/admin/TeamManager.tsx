import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, MoreVertical, Users, Check, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
  twitter?: string;
  order: number;
  active: boolean;
}

const initialTeam: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Thompson',
    role: 'Founder & CEO',
    image: '/assets/testimonial-2.jpg',
    bio: 'With over 10 years of experience in real estate technology, Alex founded NexLeed to help agents succeed in the digital age.',
    linkedin: '#',
    twitter: '#',
    order: 1,
    active: true,
  },
  {
    id: '2',
    name: 'Sarah Chen',
    role: 'Head of Operations',
    image: '/assets/testimonial-1.jpg',
    bio: 'Sarah ensures smooth operations and exceptional service delivery for all our clients.',
    linkedin: '#',
    order: 2,
    active: true,
  },
  {
    id: '3',
    name: 'Michael Rodriguez',
    role: 'Lead Developer',
    image: '/assets/testimonial-4.jpg',
    bio: 'Michael leads our development team, creating cutting-edge solutions for real estate professionals.',
    linkedin: '#',
    twitter: '#',
    order: 3,
    active: true,
  },
  {
    id: '4',
    name: 'Emily Watson',
    role: 'Marketing Director',
    image: '/assets/testimonial-3.jpg',
    bio: 'Emily crafts marketing strategies that help our clients stand out in competitive markets.',
    linkedin: '#',
    order: 4,
    active: true,
  },
];

// Team Member Form Component
function TeamMemberForm({ 
  member, 
  onSave, 
  onCancel 
}: { 
  member?: TeamMember; 
  onSave: (data: Partial<TeamMember>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Partial<TeamMember>>({
    name: member?.name || '',
    role: member?.role || '',
    image: member?.image || '/assets/testimonial-1.jpg',
    bio: member?.bio || '',
    linkedin: member?.linkedin || '',
    twitter: member?.twitter || '',
    active: member?.active ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-white/70 text-sm mb-2">Full Name *</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. John Smith"
            className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
            required
          />
        </div>
        <div>
          <label className="block text-white/70 text-sm mb-2">Role/Position *</label>
          <Input
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            placeholder="e.g. Marketing Director"
            className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-white/70 text-sm mb-2">Profile Photo</label>
        <ImageUpload
          value={formData.image || ''}
          onChange={(value) => setFormData({ ...formData, image: value })}
          placeholder="/assets/testimonial-1.jpg"
        />
      </div>

      <div>
        <label className="block text-white/70 text-sm mb-2">Bio</label>
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          placeholder="Brief bio or description..."
          rows={3}
          className="w-full px-3 py-2 bg-dark-border border border-dark-border rounded-md text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center text-white/70 text-sm mb-2">
            <Linkedin className="w-4 h-4 mr-2" />
            LinkedIn URL
          </label>
          <Input
            value={formData.linkedin}
            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
            placeholder="https://linkedin.com/in/..."
            className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
          />
        </div>
        <div>
          <label className="flex items-center text-white/70 text-sm mb-2">
            <Twitter className="w-4 h-4 mr-2" />
            Twitter URL
          </label>
          <Input
            value={formData.twitter}
            onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
            placeholder="https://twitter.com/..."
            className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
          />
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
          <span className="text-white/70 text-sm">Team member is active</span>
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
          {member ? 'Update Member' : 'Add Member'}
        </Button>
      </div>
    </form>
  );
}

// Main Team Manager Component
export function TeamManager() {
  const [team, setTeam] = useState<TeamMember[]>(initialTeam);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const filteredTeam = team.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = (data: Partial<TeamMember>) => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: data.name || '',
      role: data.role || '',
      image: data.image || '/assets/testimonial-1.jpg',
      bio: data.bio || '',
      linkedin: data.linkedin,
      twitter: data.twitter,
      order: team.length + 1,
      active: data.active ?? true,
    };
    setTeam([...team, newMember]);
    setIsAddDialogOpen(false);
  };

  const handleEdit = (data: Partial<TeamMember>) => {
    if (!editingMember) return;
    setTeam(team.map(m => 
      m.id === editingMember.id ? { ...m, ...data } : m
    ));
    setIsEditDialogOpen(false);
    setEditingMember(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this team member?')) {
      setTeam(team.filter(m => m.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display text-white">Team Members</h1>
          <p className="text-white/50 mt-1">Manage your team displayed on the About Us page.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gold text-black hover:bg-gold-light">
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-dark-card border-dark-border text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-display text-white">Add Team Member</DialogTitle>
            </DialogHeader>
            <TeamMemberForm 
              onSave={handleAdd} 
              onCancel={() => setIsAddDialogOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-dark-card border border-dark-border rounded-xl p-4 text-center">
          <p className="text-2xl sm:text-3xl font-display text-gold">{team.length}</p>
          <p className="text-white/50 text-sm">Total Members</p>
        </div>
        <div className="bg-dark-card border border-dark-border rounded-xl p-4 text-center">
          <p className="text-2xl sm:text-3xl font-display text-green-500">{team.filter(m => m.active).length}</p>
          <p className="text-white/50 text-sm">Active</p>
        </div>
        <div className="bg-dark-card border border-dark-border rounded-xl p-4 text-center">
          <p className="text-2xl sm:text-3xl font-display text-gold">
            {team.filter(m => m.linkedin || m.twitter).length}
          </p>
          <p className="text-white/50 text-sm">With Social Links</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search team members..."
          className="pl-10 bg-dark-card border-dark-border text-white placeholder:text-white/30"
        />
      </div>

      {/* Team Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeam.sort((a, b) => a.order - b.order).map((member) => (
          <div 
            key={member.id}
            className={`bg-dark-card border rounded-xl p-5 transition-all duration-300 group ${
              member.active ? 'border-dark-border hover:border-gold/30' : 'border-red-500/30 opacity-70'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-gold/30"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-white/50" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-dark-card border-dark-border">
                  <DropdownMenuItem 
                    onClick={() => {
                      setEditingMember(member);
                      setIsEditDialogOpen(true);
                    }}
                    className="text-white hover:bg-white/5 focus:bg-white/5 cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleDelete(member.id)}
                    className="text-red-500 hover:bg-white/5 focus:bg-white/5 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="mb-3">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-white font-medium">{member.name}</h3>
                {!member.active && (
                  <span className="px-2 py-0.5 bg-red-500/20 text-red-500 text-xs rounded-full">Inactive</span>
                )}
              </div>
              <p className="text-gold text-sm">{member.role}</p>
            </div>

            {member.bio && (
              <p className="text-white/50 text-sm line-clamp-2 mb-4">{member.bio}</p>
            )}

            <div className="flex items-center space-x-2">
              {member.linkedin && (
                <a 
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-dark-border rounded-lg flex items-center justify-center text-white/50 hover:bg-gold hover:text-black transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {member.twitter && (
                <a 
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-dark-border rounded-lg flex items-center justify-center text-white/50 hover:bg-gold hover:text-black transition-all"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredTeam.length === 0 && (
        <div className="text-center py-12 bg-dark-card border border-dark-border rounded-xl">
          <Users className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/50">No team members found matching your search.</p>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-dark-card border-dark-border text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-display text-white">Edit Team Member</DialogTitle>
          </DialogHeader>
          {editingMember && (
            <TeamMemberForm 
              member={editingMember}
              onSave={handleEdit} 
              onCancel={() => {
                setIsEditDialogOpen(false);
                setEditingMember(null);
              }} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
