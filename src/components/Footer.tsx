import { Phone, Mail, MapPin, Linkedin, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About-us', href: '/about-us' },
    { label: 'Buyer – Seller Guide', href: '/buyer-seller' },
    { label: 'Contact us', href: '/contact-us' },
    { label: 'Case studies', href: '/case-studies' },
  ];

  const services = [
    { label: 'Modern Websites', href: '/services/modern-websites' },
    { label: 'GBP SEO & Local Optimization', href: '/services/gbp-seo' },
    { label: 'Streamlined Systems', href: '/services/streamlined-systems' },
    { label: 'Performance Advertising', href: '/services/performance-advertising' },
    { label: 'Exclusive Leads', href: '/services/exclusive-leads' },
    { label: 'Dedicated Support', href: '/services/dedicated-support' },
    { label: 'Brand Content', href: '/services/brand-content' },
  ];

  const resources = [
    { label: 'Buyer–Seller Guide', href: '/buyer-seller' },
    { label: 'Real Estate Growth Tips', href: '/resources/real-estate-growth-tips' },
    { label: 'Lead Generation Strategies', href: '#' },
    { label: 'CRM Best Practices', href: '#' },
    { label: 'Agent Branding Guide', href: '#' },
    { label: 'Social Media Tips for Agents', href: '#' },
  ];

  return (
    <footer className="bg-dark-card border-t border-dark-border pt-12 sm:pt-16 pb-6 sm:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-10 sm:mb-12">
          {/* Logo Column */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <img 
                src="/assets/Main-Logo.svg" 
                alt="NexLeed" 
                className="h-9 w-auto"
              />
            </Link>
            <p className="text-white/60 text-sm mb-6">
              Premium Leads & Real Estate Solutions
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-dark-border rounded-lg flex items-center justify-center text-white/60 hover:bg-gold hover:text-black transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-dark-border rounded-lg flex items-center justify-center text-white/60 hover:bg-gold hover:text-black transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-dark-border rounded-lg flex items-center justify-center text-white/60 hover:bg-gold hover:text-black transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-white/60 hover:text-gold text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-medium mb-4">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <Link
                    to={service.href}
                    className="text-white/60 hover:text-gold text-sm transition-colors duration-300"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-medium mb-4">Resources</h4>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.label}>
                  {resource.href.startsWith('/') ? (
                    <Link
                      to={resource.href}
                      className="text-white/60 hover:text-gold text-sm transition-colors duration-300"
                    >
                      {resource.label}
                    </Link>
                  ) : (
                    <a
                      href={resource.href}
                      className="text-white/60 hover:text-gold text-sm transition-colors duration-300"
                    >
                      {resource.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-dark-border pt-6 sm:pt-8 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gold flex-shrink-0" />
              <span className="text-white/60 text-sm">+1 (512) 566-0340</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gold flex-shrink-0" />
              <span className="text-white/60 text-sm">support@nexleed.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gold flex-shrink-0" />
              <span className="text-white/60 text-sm text-xs sm:text-sm">5900 Balcones Dr STE 100 Austin TX 78731</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-dark-border pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-white/40 text-xs sm:text-sm text-center sm:text-left">
            © 2025 NexLeed. All rights reserved.
          </p>
          <div className="flex space-x-4 sm:space-x-6 mt-3 sm:mt-0">
            <Link to="/privacy-policy" className="text-white/40 hover:text-gold text-xs sm:text-sm transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="text-white/40 hover:text-gold text-xs sm:text-sm transition-colors duration-300">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
