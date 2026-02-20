import { useEffect, useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Initial fade-in animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const allNavLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Buyer Seller', href: '/buyer-seller' },
    { label: 'About us', href: '/about-us' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Contact us', href: '/contact-us' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-xl border-b border-dark-border shadow-lg shadow-black/20' 
          : 'bg-transparent'
      }`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.5s ease, border-color 0.5s ease',
      }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Far Left Corner */}
          <Link 
            to="/" 
            className="flex items-center flex-shrink-0 group"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            <img 
              src="/assets/Main-Logo.svg" 
              alt="NexLeed" 
              className="h-8 sm:h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Navigation Links - Far Right Corner */}
          <div className="hidden md:flex items-center justify-end space-x-6 lg:space-x-8 flex-shrink-0">
            {allNavLinks.map((link, index) => (
              <Link
                key={link.label}
                to={link.href}
                className={`relative text-sm font-medium whitespace-nowrap transition-colors duration-300 ${
                  isActive(link.href) ? 'text-gold' : 'text-white/80 hover:text-gold'
                }`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(-15px)',
                  transition: `opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.08}s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.08}s, color 0.3s ease`,
                }}
              >
                <span className="relative">
                  {link.label}
                  {/* Animated underline */}
                  <span 
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 ease-out ${
                      isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                    style={{
                      transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                </span>
                {/* Hover glow effect */}
                <span 
                  className={`absolute inset-0 -z-10 bg-gold/5 rounded-lg transition-opacity duration-300 ${
                    isActive(link.href) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                  style={{
                    transform: 'scale(1.2)',
                    margin: '-4px -8px',
                  }}
                />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div 
            className="md:hidden flex items-center"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
              transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
            }}
          >
            <button
              className="text-white p-2 relative overflow-hidden group"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="relative w-6 h-6">
                {/* Animated hamburger to X */}
                <Menu 
                  className={`w-6 h-6 absolute inset-0 transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                  }`} 
                />
                <X 
                  className={`w-6 h-6 absolute inset-0 transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                  }`} 
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with slide animation */}
      <div 
        className={`md:hidden bg-black/98 backdrop-blur-xl border-t border-dark-border overflow-hidden transition-all duration-500 ease-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{
          transition: 'max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
        }}
      >
        <div className="px-4 py-6 space-y-2">
          {allNavLinks.map((link, index) => (
            <Link
              key={link.label}
              to={link.href}
              className={`block transition-all duration-300 text-lg font-medium py-2 px-4 rounded-lg ${
                isActive(link.href) 
                  ? 'text-gold bg-gold/10' 
                  : 'text-white/80 hover:text-gold hover:bg-gold/5'
              }`}
              style={{
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-30px)',
                transition: `opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.06}s, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.06}s, color 0.3s ease, background-color 0.3s ease`,
              }}
            >
              <span className="flex items-center space-x-2">
                <span 
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isActive(link.href) ? 'bg-gold scale-100' : 'bg-white/30 scale-75'
                  }`}
                />
                <span>{link.label}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
