import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { TrackingSection } from './components/TrackingSection';
import { QuoteCalculator } from './components/QuoteCalculator';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { ForcePasswordChangeModal } from './components/ForcePasswordChangeModal';
import { EmployeeDashboard } from './components/EmployeeDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { PhpPackModal } from './components/PhpPackModal';
import { getCurrentSession, setSession, SessionState, initStorage, getEmployees } from './services/storageService';

export default function App() {
  const [session, setSessionState] = useState<SessionState | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'admin' | 'employee'>('home');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginDefaultTab, setLoginDefaultTab] = useState<'employee' | 'admin'>('employee');
  const [mustChangePasswordSession, setMustChangePasswordSession] = useState<SessionState | null>(null);
  const [isPhpPackOpen, setIsPhpPackOpen] = useState(false);
  const [searchedTrackingCode, setSearchedTrackingCode] = useState<string | undefined>(undefined);
  const [preselectedQuoteService, setPreselectedQuoteService] = useState<string>('maritime_fcl');

  // Initialize storage & check session on mount
  useEffect(() => {
    initStorage();
    const existing = getCurrentSession();
    if (existing) {
      setSessionState(existing);
      if (existing.user.mustChangePassword) {
        setMustChangePasswordSession(existing);
      }
    }
  }, []);

  const handleLoginSuccess = (newSession: SessionState, mustChange: boolean) => {
    setSessionState(newSession);
    setIsLoginModalOpen(false);

    if (mustChange) {
      setMustChangePasswordSession(newSession);
    } else {
      if (newSession.user.role === 'admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('employee');
      }
    }
  };

  const handlePasswordChanged = (updatedSession: SessionState) => {
    setMustChangePasswordSession(null);
    setSessionState(updatedSession);
    if (updatedSession.user.role === 'admin') {
      setCurrentView('admin');
    } else {
      setCurrentView('employee');
    }
  };

  const handleLogout = () => {
    setSession(null);
    setSessionState(null);
    setCurrentView('home');
  };

  const handleOpenLogin = (tab: 'employee' | 'admin' = 'employee') => {
    setLoginDefaultTab(tab);
    setIsLoginModalOpen(true);
  };

  const handleSearchTrackingFromHero = (code: string) => {
    setSearchedTrackingCode(code);
    setCurrentView('home');
    setTimeout(() => {
      document.getElementById('tracking')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSelectServiceForQuote = (serviceId: string) => {
    let mode = 'maritime_fcl';
    if (serviceId === 'warehousing') mode = 'entrepot';
    if (serviceId === 'customs') mode = 'douane';
    setPreselectedQuoteService(mode);
    setTimeout(() => {
      document.getElementById('devis')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      
      {/* Top Header */}
      <Header
        session={session}
        currentView={currentView}
        onNavigateHome={() => setCurrentView('home')}
        onOpenLogin={() => handleOpenLogin('employee')}
        onOpenAdmin={() => {
          if (session?.user.role === 'admin') {
            setCurrentView('admin');
          } else {
            handleOpenLogin('admin');
          }
        }}
        onOpenEmployee={() => {
          if (session?.user.role === 'employee' && session.employee) {
            setCurrentView('employee');
          } else {
            handleOpenLogin('employee');
          }
        }}
        onOpenPhpPack={() => setIsPhpPackOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            {/* Hero Section with Live Tracking Widget */}
            <Hero
              onSearchTracking={handleSearchTrackingFromHero}
              onOpenDevis={() => {
                document.getElementById('devis')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 3 Core Services Section */}
            <ServicesSection
              onSelectServiceForQuote={handleSelectServiceForQuote}
            />

            {/* Interactive Live Shipment Tracking Section */}
            <TrackingSection
              searchedCode={searchedTrackingCode}
            />

            {/* Quote Calculator & Simulator */}
            <QuoteCalculator
              preselectedService={preselectedQuoteService}
            />

            {/* About Surrey BC & Atlantic Transport Section */}
            <AboutSection />

            {/* Contact & Interactive Surrey Map Section */}
            <ContactSection />
          </>
        )}

        {currentView === 'employee' && session && session.employee && (
          <EmployeeDashboard
            employee={getEmployees().find(e => e.id === session.employee?.id) || session.employee}
            user={session.user}
            onLogout={handleLogout}
            onOpenPasswordChange={() => setMustChangePasswordSession(session)}
          />
        )}

        {currentView === 'admin' && session && session.user.role === 'admin' && (
          <AdminDashboard
            onLogout={handleLogout}
            onOpenPhpPack={() => setIsPhpPackOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenLogin={() => handleOpenLogin('employee')}
        onOpenAdmin={() => {
          if (session?.user.role === 'admin') {
            setCurrentView('admin');
          } else {
            handleOpenLogin('admin');
          }
        }}
        onOpenPhpPack={() => setIsPhpPackOpen(true)}
        onNavigateHome={() => setCurrentView('home')}
      />

      {/* Modal 1: Login Dialog */}
      <AuthModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        defaultRoleTab={loginDefaultTab}
        onSuccess={handleLoginSuccess}
      />

      {/* Modal 2: Forced Password Change Dialog */}
      {mustChangePasswordSession && (
        <ForcePasswordChangeModal
          session={mustChangePasswordSession}
          onSuccess={handlePasswordChanged}
        />
      )}

      {/* Modal 3: PHP & MySQL Deliverable Pack Viewer */}
      <PhpPackModal
        isOpen={isPhpPackOpen}
        onClose={() => setIsPhpPackOpen(false)}
      />

    </div>
  );
}
