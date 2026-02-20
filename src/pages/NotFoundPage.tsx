import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

// Custom hook for scroll animations
function useScrollAnimation(options: { threshold?: number; rootMargin?: string; triggerOnce?: boolean } = {}) {
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

export function NotFoundPage() {
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div 
          ref={contentRef}
          className="max-w-3xl mx-auto text-center"
        >
          {/* 404 Number */}
          <div 
            className="relative mb-8"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <span className="font-display text-[120px] sm:text-[180px] lg:text-[220px] leading-none text-gold/20 select-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-6xl sm:text-8xl lg:text-9xl text-white">
                404
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 
            className="font-display text-2xl sm:text-3xl lg:text-4xl text-white mb-4"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            Page <span className="text-gold">Not Found</span>
          </h1>

          {/* Description */}
          <p 
            className="text-white/60 text-base sm:text-lg max-w-xl mx-auto mb-8"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
          >
            Sorry, the page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>

          {/* Action Buttons */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
            }}
          >
            <Link
              to="/"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gold text-black font-medium rounded-full hover:bg-gold-light transition-all duration-300 hover:scale-105 hover:shadow-gold-lg text-sm sm:text-base"
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Back to Home
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 hover:border-gold/50 transition-all duration-300 text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Go Back
            </button>
          </div>

          {/* Quick Links */}
          <div 
            className="mt-12 pt-12 border-t border-white/10"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
            }}
          >
            <p className="text-white/40 text-sm mb-6 flex items-center justify-center gap-2">
              <Search className="w-4 h-4" />
              Popular Pages
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: 'Services', path: '/services' },
                { label: 'About Us', path: '/about-us' },
                { label: 'Contact', path: '/contact-us' },
                { label: 'Case Studies', path: '/case-studies' },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-4 py-2 text-sm text-white/60 hover:text-gold border border-white/10 hover:border-gold/50 rounded-lg transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
