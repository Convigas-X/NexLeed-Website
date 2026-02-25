import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, MessageSquare, Briefcase, FileText, 
  HelpCircle, Users, Settings, Menu, X, LogOut,
  ChevronRight, Eye, DollarSign
} from 'lucide-react';
import { Link, useLocation, Routes, Route } from 'react-router-dom';
import { DashboardOverview } from './DashboardOverview';
import { TestimonialsManager } from './TestimonialsManager';
import { ServicesManager } from './ServicesManager';
import { CaseStudiesManager } from './CaseStudiesManager';
import { FAQManager } from './FAQManager';
import { TeamManager } from './TeamManager';
import { ContactSettings } from './ContactSettings';
import { PricingManager } from './PricingManager';
import { LoginPage } from './LoginPage';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: MessageSquare, label: 'Testimonials', path: '/admin/testimonials' },
  { icon: Briefcase, label: 'Services', path: '/admin/services' },
  { icon: DollarSign, label: 'Pricing', path: '/admin/pricing' },
  { icon: FileText, label: 'Case Studies', path: '/admin/case-studies' },
  { icon: HelpCircle, label: 'FAQ', path: '/admin/faq' },
  { icon: Users, label: 'Team Members', path: '/admin/team' },
  { icon: Settings, label: 'Contact Settings', path: '/admin/contact' },
];

function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-dark-card border-r border-dark-border transform transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-border">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/assets/Main-Logo.svg" alt="NexLeed" className="h-8 w-auto" />
            <span className="text-white font-medium">Admin</span>
          </Link>
          <button 
            onClick={onClose}
            className="lg:hidden text-white/60 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive(item.path)
                  ? 'bg-gold/10 text-gold border border-gold/30'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-gold' : 'text-white/50 group-hover:text-white'}`} />
              <span className="font-medium">{item.label}</span>
              {isActive(item.path) && <ChevronRight className="w-4 h-4 ml-auto" />}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-border">
          <button 
            onClick={() => {
              localStorage.removeItem('adminAuth');
              localStorage.removeItem('adminUser');
              window.location.reload();
            }}
            className="flex items-center space-x-3 px-4 py-3 text-white/60 hover:text-gold transition-colors duration-300 w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const [username, setUsername] = useState('Admin');

  useEffect(() => {
    const storedUsername = localStorage.getItem('adminUser');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-dark-border">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="flex items-center space-x-4 ml-auto">
          <Link 
            to="/"
            className="hidden sm:flex items-center space-x-2 text-white/60 hover:text-gold transition-colors text-sm"
          >
            <Eye className="w-4 h-4" />
            <span>View Website</span>
          </Link>
          <div className="w-px h-6 bg-dark-border hidden sm:block" />
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
              <span className="text-gold text-sm font-medium">{username.charAt(0).toUpperCase()}</span>
            </div>
            <span className="text-white text-sm hidden sm:block capitalize">{username}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

// Main Admin Dashboard Component
export function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          <span className="text-white/50">Loading...</span>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Show dashboard if authenticated
  return (
    <div className="min-h-screen bg-black">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:ml-72">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/testimonials" element={<TestimonialsManager />} />
            <Route path="/services" element={<ServicesManager />} />
            <Route path="/case-studies" element={<CaseStudiesManager />} />
            <Route path="/faq" element={<FAQManager />} />
            <Route path="/team" element={<TeamManager />} />
            <Route path="/pricing" element={<PricingManager />} />
            <Route path="/contact" element={<ContactSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
