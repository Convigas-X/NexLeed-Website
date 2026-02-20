import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { BuyerSeller } from './pages/BuyerSeller';
import { AboutUs } from './pages/AboutUs';
import { CaseStudies } from './pages/CaseStudies';
import { ContactUs } from './pages/ContactUs';
import { NotFoundPage } from './pages/NotFoundPage';
import { initGA, useAnalytics } from './lib/analytics';

// Initialize analytics on app load
initGA();

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// Analytics tracker component
function AnalyticsTracker() {
  useAnalytics();
  return null;
}

// Check if current route is a valid route
function useIsValidRoute() {
  const location = useLocation();
  const validRoutes = ['/', '/services', '/buyer-seller', '/about-us', '/case-studies', '/contact-us'];
  return validRoutes.includes(location.pathname);
}

// Main App Layout
function AppLayout() {
  const isValidRoute = useIsValidRoute();
  
  return (
    <div className="min-h-screen bg-black">
      {isValidRoute && <Navigation />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/buyer-seller" element={<BuyerSeller />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {isValidRoute && <Footer />}
    </div>
  );
}

// Main App
function App() {
  return (
    <BrowserRouter>
      <AnalyticsTracker />
      <ScrollToTop />
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
