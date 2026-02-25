import { useState } from 'react';
import { 
  Phone, Mail, MapPin, Clock, Save, Globe, 
  Facebook, Instagram, Twitter, Linkedin, Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

interface ContactSettings {
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  businessHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
  };
  meta: {
    title: string;
    description: string;
  };
}

const initialSettings: ContactSettings = {
  phone: '+1 (209) 243 1235',
  email: 'support@nexleed.com',
  address: '5900 Balcones Dr, STE 100',
  city: 'Austin',
  state: 'TX',
  zip: '78731',
  businessHours: {
    weekdays: 'Mon - Fri: 9AM - 6PM',
    saturday: 'Saturday: 10AM - 4PM',
    sunday: 'Sunday: Closed',
  },
  socialLinks: {
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
  },
  meta: {
    title: 'Contact Us | NexLeed - Real Estate Solutions',
    description: 'Get in touch with NexLeed for premium real estate technology solutions. We\'re here to help you grow your business.',
  },
};

// Stats Preview Component
function ContactPreview({ settings }: { settings: ContactSettings }) {
  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-6 space-y-4">
      <h3 className="text-white font-medium mb-4">Live Preview</h3>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
            <Phone className="w-5 h-5 text-gold" />
          </div>
          <div>
            <p className="text-white/50 text-xs">Phone</p>
            <p className="text-white text-sm">{settings.phone}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
            <Mail className="w-5 h-5 text-gold" />
          </div>
          <div>
            <p className="text-white/50 text-xs">Email</p>
            <p className="text-white text-sm">{settings.email}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-gold" />
          </div>
          <div>
            <p className="text-white/50 text-xs">Address</p>
            <p className="text-white text-sm">{settings.address}, {settings.city}, {settings.state} {settings.zip}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-gold" />
          </div>
          <div>
            <p className="text-white/50 text-xs">Business Hours</p>
            <p className="text-white text-sm">{settings.businessHours.weekdays}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Contact Settings Component
export function ContactSettings() {
  const [settings, setSettings] = useState<ContactSettings>(initialSettings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // In a real app, this would save to an API
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateSetting = <K extends keyof ContactSettings>(
    key: K, 
    value: ContactSettings[K]
  ) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display text-white">Contact Settings</h1>
          <p className="text-white/50 mt-1">Manage your contact information displayed across the website.</p>
        </div>
        <Button 
          onClick={handleSave}
          className="bg-gold text-black hover:bg-gold-light"
        >
          {saved ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Settings Form */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="contact" className="w-full">
            <TabsList className="bg-dark-card border border-dark-border w-full justify-start">
              <TabsTrigger 
                value="contact"
                className="data-[state=active]:bg-gold data-[state=active]:text-black text-white/70"
              >
                Contact Info
              </TabsTrigger>
              <TabsTrigger 
                value="hours"
                className="data-[state=active]:bg-gold data-[state=active]:text-black text-white/70"
              >
                Business Hours
              </TabsTrigger>
              <TabsTrigger 
                value="social"
                className="data-[state=active]:bg-gold data-[state=active]:text-black text-white/70"
              >
                Social Media
              </TabsTrigger>
              <TabsTrigger 
                value="seo"
                className="data-[state=active]:bg-gold data-[state=active]:text-black text-white/70"
              >
                SEO
              </TabsTrigger>
            </TabsList>

            {/* Contact Info Tab */}
            <TabsContent value="contact" className="mt-6 space-y-6">
              <div className="bg-dark-card border border-dark-border rounded-xl p-6 space-y-4">
                <h3 className="text-white font-medium flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-gold" />
                  Contact Information
                </h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Phone Number</label>
                    <Input
                      value={settings.phone}
                      onChange={(e) => updateSetting('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Email Address</label>
                    <Input
                      value={settings.email}
                      onChange={(e) => updateSetting('email', e.target.value)}
                      placeholder="support@example.com"
                      className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">Street Address</label>
                  <Input
                    value={settings.address}
                    onChange={(e) => updateSetting('address', e.target.value)}
                    placeholder="123 Main St, Suite 100"
                    className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
                  />
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white/70 text-sm mb-2">City</label>
                    <Input
                      value={settings.city}
                      onChange={(e) => updateSetting('city', e.target.value)}
                      placeholder="Austin"
                      className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-2">State</label>
                    <Input
                      value={settings.state}
                      onChange={(e) => updateSetting('state', e.target.value)}
                      placeholder="TX"
                      className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-2">ZIP Code</label>
                    <Input
                      value={settings.zip}
                      onChange={(e) => updateSetting('zip', e.target.value)}
                      placeholder="78701"
                      className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Business Hours Tab */}
            <TabsContent value="hours" className="mt-6 space-y-6">
              <div className="bg-dark-card border border-dark-border rounded-xl p-6 space-y-4">
                <h3 className="text-white font-medium flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-gold" />
                  Business Hours
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Weekdays</label>
                    <Input
                      value={settings.businessHours.weekdays}
                      onChange={(e) => updateSetting('businessHours', {
                        ...settings.businessHours,
                        weekdays: e.target.value
                      })}
                      placeholder="Mon - Fri: 9AM - 6PM"
                      className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Saturday</label>
                    <Input
                      value={settings.businessHours.saturday}
                      onChange={(e) => updateSetting('businessHours', {
                        ...settings.businessHours,
                        saturday: e.target.value
                      })}
                      placeholder="Saturday: 10AM - 4PM"
                      className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Sunday</label>
                    <Input
                      value={settings.businessHours.sunday}
                      onChange={(e) => updateSetting('businessHours', {
                        ...settings.businessHours,
                        sunday: e.target.value
                      })}
                      placeholder="Sunday: Closed"
                      className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Social Media Tab */}
            <TabsContent value="social" className="mt-6 space-y-6">
              <div className="bg-dark-card border border-dark-border rounded-xl p-6 space-y-4">
                <h3 className="text-white font-medium flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-gold" />
                  Social Media Links
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center text-white/70 text-sm mb-2">
                      <Facebook className="w-4 h-4 mr-2" />
                      Facebook URL
                    </label>
                    <Input
                      value={settings.socialLinks.facebook}
                      onChange={(e) => updateSetting('socialLinks', {
                        ...settings.socialLinks,
                        facebook: e.target.value
                      })}
                      placeholder="https://facebook.com/nexleed"
                      className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
                    />
                  </div>
                  <div>
                    <label className="flex items-center text-white/70 text-sm mb-2">
                      <Instagram className="w-4 h-4 mr-2" />
                      Instagram URL
                    </label>
                    <Input
                      value={settings.socialLinks.instagram}
                      onChange={(e) => updateSetting('socialLinks', {
                        ...settings.socialLinks,
                        instagram: e.target.value
                      })}
                      placeholder="https://instagram.com/nexleed"
                      className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
                    />
                  </div>
                  <div>
                    <label className="flex items-center text-white/70 text-sm mb-2">
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter URL
                    </label>
                    <Input
                      value={settings.socialLinks.twitter}
                      onChange={(e) => updateSetting('socialLinks', {
                        ...settings.socialLinks,
                        twitter: e.target.value
                      })}
                      placeholder="https://twitter.com/nexleed"
                      className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
                    />
                  </div>
                  <div>
                    <label className="flex items-center text-white/70 text-sm mb-2">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn URL
                    </label>
                    <Input
                      value={settings.socialLinks.linkedin}
                      onChange={(e) => updateSetting('socialLinks', {
                        ...settings.socialLinks,
                        linkedin: e.target.value
                      })}
                      placeholder="https://linkedin.com/company/nexleed"
                      className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* SEO Tab */}
            <TabsContent value="seo" className="mt-6 space-y-6">
              <div className="bg-dark-card border border-dark-border rounded-xl p-6 space-y-4">
                <h3 className="text-white font-medium flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-gold" />
                  SEO Settings
                </h3>
                
                <div>
                  <label className="block text-white/70 text-sm mb-2">Page Title</label>
                  <Input
                    value={settings.meta.title}
                    onChange={(e) => updateSetting('meta', {
                      ...settings.meta,
                      title: e.target.value
                    })}
                    placeholder="Contact Us | NexLeed"
                    className="bg-dark-border border-dark-border text-white placeholder:text-white/30"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Meta Description</label>
                  <Textarea
                    value={settings.meta.description}
                    onChange={(e) => updateSetting('meta', {
                      ...settings.meta,
                      description: e.target.value
                    })}
                    placeholder="Enter meta description..."
                    rows={3}
                    className="bg-dark-border border-dark-border text-white placeholder:text-white/30 resize-none"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview Sidebar */}
        <div className="space-y-6">
          <ContactPreview settings={settings} />
          
          {/* Quick Tips */}
          <div className="bg-gold/5 border border-gold/20 rounded-xl p-5">
            <h4 className="text-gold font-medium mb-2">Quick Tips</h4>
            <ul className="text-white/60 text-sm space-y-2">
              <li>• Keep phone numbers in a standard format</li>
              <li>• Use a professional email address</li>
              <li>• Update business hours for holidays</li>
              <li>• Verify all social links work properly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
