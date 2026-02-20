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
import { ModernWebsitesPage } from './pages/services/ModernWebsitesPage';
import { GBPSEOPage } from './pages/services/GBPSEOPage';
import { StreamlinedSystemsPage } from './pages/services/StreamlinedSystemsPage';
import { PerformanceAdvertisingPage } from './pages/services/PerformanceAdvertisingPage';
import { ExclusiveLeadsPage } from './pages/services/ExclusiveLeadsPage';
import { DedicatedSupportPage } from './pages/services/DedicatedSupportPage';
import { BrandContentPage } from './pages/services/BrandContentPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsConditionsPage } from './pages/TermsConditionsPage';
import { RealEstateGrowthTipsPage } from './pages/resources/RealEstateGrowthTipsPage';
import { LeadGenerationStrategiesPage } from './pages/resources/LeadGenerationStrategiesPage';
import { CRMBestPracticesPage } from './pages/resources/CRMBestPracticesPage';
import { AgentBrandingGuidePage } from './pages/resources/AgentBrandingGuidePage';
import { SocialMediaTipsPage } from './pages/resources/SocialMediaTipsPage';
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
          <Route path="/services/modern-websites" element={<ModernWebsitesPage />} />
          <Route path="/services/gbp-seo" element={<GBPSEOPage />} />
          <Route path="/services/streamlined-systems" element={<StreamlinedSystemsPage />} />
          <Route path="/services/performance-advertising" element={<PerformanceAdvertisingPage />} />
          <Route path="/services/exclusive-leads" element={<ExclusiveLeadsPage />} />
          <Route path="/services/dedicated-support" element={<DedicatedSupportPage />} />
          <Route path="/services/brand-content" element={<BrandContentPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsConditionsPage />} />
          <Route path="/resources/real-estate-growth-tips" element={<RealEstateGrowthTipsPage />} />
          <Route path="/resources/lead-generation-strategies" element={<LeadGenerationStrategiesPage />} />
          <Route path="/resources/crm-best-practices" element={<CRMBestPracticesPage />} />
          <Route path="/resources/agent-branding-guide" element={<AgentBrandingGuidePage />} />
          <Route path="/resources/social-media-tips" element={<SocialMediaTipsPage />} />
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
