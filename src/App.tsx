import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { NotificationToast } from './components/common/NotificationToast';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { ClassesPage } from './pages/ClassesPage';
import { PersonalTrainingPage } from './pages/PersonalTrainingPage';
import { TrainersPage } from './pages/TrainersPage';
import { TrainerDetailPage } from './pages/TrainerDetailPage';
import { MembershipPage } from './pages/MembershipPage';
import { FreeTrialPage } from './pages/FreeTrialPage';
import { SchedulePage } from './pages/SchedulePage';
import { ContactPage } from './pages/ContactPage';
import { AuthPages } from './pages/AuthPages';
import { AccountDashboardPage } from './pages/AccountDashboardPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { PaymentSuccessPage, PaymentCancelledPage } from './pages/PaymentSuccessPage';
import { FitnessResourcesPage, ArticleDetailPage } from './pages/FitnessResourcesPage';
import { FAQPage } from './pages/FAQPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { LegalPoliciesPage } from './pages/LegalPoliciesPage';
import { MobileBottomBar } from './components/common/MobileBottomBar';
import { ArrowLeft, Dumbbell } from 'lucide-react';

const MainRouter: React.FC = () => {
  const { currentPath, navigate } = useApp();

  // Dynamic SEO Page Title update
  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'VOLT Fitness Club | Premium Gym, Elite Training & Wellness',
      '/about': 'About Our Ethos & Standards | VOLT Fitness Club',
      '/facilities': 'World-Class Training Facilities & Zones | VOLT Club',
      '/classes': 'Signature Group Classes & Timetable | VOLT Fitness',
      '/personal-training': '1-on-1 Personal Coaching & Biomechanics | VOLT',
      '/trainers': 'Accredited Coaching Staff Directory | VOLT Club',
      '/membership': 'Membership Plans & Comparison | VOLT Fitness Club',
      '/free-trial': 'Book Your Free 1-Day Trial Pass | VOLT Club',
      '/schedule': 'Live Class Timetable & Booking | VOLT Fitness Club',
      '/contact': 'Club Locations, Directions & Concierge | VOLT Club',
      '/login': 'Sign In to Member Portal | VOLT Fitness Club',
      '/register': 'Create Account | VOLT Fitness Club',
      '/forgot-password': 'Password Recovery | VOLT Fitness Club',
      '/account': 'Customer Dashboard & Bookings | VOLT Club',
      '/checkout': 'Membership Checkout & Activation | VOLT Club',
      '/payment/success': 'Payment Confirmed | VOLT Fitness Club',
      '/payment/cancelled': 'Payment Cancelled | VOLT Fitness Club',
      '/fitness-resources': 'Sports Science & Workout Guides | VOLT Club',
      '/faq': 'Frequently Asked Questions & Answers | VOLT Club',
      '/admin': 'Staff & Management Command Center | VOLT Club',
      '/privacy-policy': 'Privacy Policy (DPDP Act) | VOLT Fitness Club',
      '/terms-and-conditions': 'Terms of Service | VOLT Fitness Club',
      '/membership-terms': 'Membership Agreement | VOLT Fitness Club',
      '/cancellation-policy': 'Cancellation Policy | VOLT Fitness Club',
      '/refund-policy': 'Refund Policy & Guarantee | VOLT Fitness Club',
      '/cookie-policy': 'Cookie Policy | VOLT Fitness Club'
    };

    document.title = titles[currentPath] || 'VOLT Fitness Club';
  }, [currentPath]);

  // Route Dispatcher
  const renderRoute = () => {
    // Exact routes
    if (currentPath === '/') return <HomePage />;
    if (currentPath === '/about') return <AboutPage />;
    if (currentPath === '/facilities') return <FacilitiesPage />;
    if (currentPath === '/classes') return <ClassesPage />;
    if (currentPath === '/personal-training') return <PersonalTrainingPage />;
    if (currentPath === '/trainers') return <TrainersPage />;
    if (currentPath === '/membership') return <MembershipPage />;
    if (currentPath === '/free-trial') return <FreeTrialPage />;
    if (currentPath === '/schedule') return <SchedulePage />;
    if (currentPath === '/contact') return <ContactPage />;
    if (currentPath === '/login') return <AuthPages initialMode="login" />;
    if (currentPath === '/register') return <AuthPages initialMode="register" />;
    if (currentPath === '/forgot-password') return <AuthPages initialMode="forgot" />;
    if (currentPath === '/account') return <AccountDashboardPage />;
    if (currentPath === '/checkout') return <CheckoutPage />;
    if (currentPath.startsWith('/payment/success')) return <PaymentSuccessPage />;
    if (currentPath.startsWith('/payment/cancelled')) return <PaymentCancelledPage />;
    if (currentPath === '/fitness-resources') return <FitnessResourcesPage />;
    if (currentPath === '/faq') return <FAQPage />;
    if (currentPath === '/admin') return <AdminDashboardPage />;

    // Legal policies
    if (currentPath === '/privacy-policy') return <LegalPoliciesPage initialPolicy="privacy" />;
    if (currentPath === '/terms-and-conditions') return <LegalPoliciesPage initialPolicy="terms" />;
    if (currentPath === '/membership-terms') return <LegalPoliciesPage initialPolicy="membership" />;
    if (currentPath === '/cancellation-policy') return <LegalPoliciesPage initialPolicy="cancellation" />;
    if (currentPath === '/refund-policy') return <LegalPoliciesPage initialPolicy="refund" />;
    if (currentPath === '/cookie-policy') return <LegalPoliciesPage initialPolicy="cookies" />;

    // Dynamic routes
    if (currentPath.startsWith('/trainers/')) {
      const slug = currentPath.replace('/trainers/', '');
      return <TrainerDetailPage slug={slug} />;
    }

    if (currentPath.startsWith('/fitness-resources/')) {
      const slug = currentPath.replace('/fitness-resources/', '');
      return <ArticleDetailPage slug={slug} />;
    }

    // 404 Not Found Page
    return (
      <div className="w-full min-h-[75vh] flex items-center justify-center p-6 text-center bg-[#101114]">
        <div className="max-w-md bg-[#16181D] border border-[#2D333B] rounded-3xl p-8 sm:p-10 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-[#1C1F24] border border-[#C7FF3D] text-[#C7FF3D] flex items-center justify-center mx-auto mb-4">
            <Dumbbell className="w-8 h-8" />
          </div>
          <span className="text-5xl font-black text-[#C7FF3D] font-display">404</span>
          <h2 className="text-2xl font-black text-white font-display mt-2">
            Movement Out of Range
          </h2>
          <p className="text-xs text-[#A7ADB7] mt-2 mb-6">
            The page or training sector you requested does not exist or has been relocated to another zone.
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full py-3.5 rounded-xl bg-[#C7FF3D] hover:bg-[#b8f52e] text-[#101114] font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to VOLT Home</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-white selection:bg-[#00F0FF] selection:text-[#0B0F19] pb-16 md:pb-0">
      {/* Mandatory Single-Line Header */}
      <Header />

      {/* Main Page View */}
      <main className="flex-1 w-full">{renderRoute()}</main>

      {/* Global Toast Alerts */}
      <NotificationToast />

      {/* Reusable Footer */}
      <Footer />

      {/* Mobile-Friendly Bottom Navigation Bar */}
      <MobileBottomBar />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
