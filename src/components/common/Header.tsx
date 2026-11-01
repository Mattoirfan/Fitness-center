import React, { useState } from 'react';
import { Logo } from './Logo';
import { useApp } from '../../context/AppContext';
import {
  Menu,
  X,
  User as UserIcon,
  ShieldAlert,
  ChevronDown,
  Sparkles,
  Calendar,
  Phone,
  Flame,
  ArrowRight
} from 'lucide-react';

interface HeaderProps {
  activeRoute?: string;
}

export const Header: React.FC<HeaderProps> = () => {
  const {
    currentPath,
    navigate,
    user,
    currency,
    setCurrency,
    switchRole,
    logout
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Commercial gym navigation sequence:
  // Core functional pages first, with About Us and Contact placed at the end as requested
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Facilities', path: '/facilities' },
    { label: 'Classes', path: '/classes' },
    { label: 'Memberships', path: '/membership' },
    { label: 'Trainers', path: '/trainers' },
    { label: 'Personal Training', path: '/personal-training' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A0A0A] border-b border-neutral-800 transition-all text-white">
      {/* Top info strip */}
      <div className="w-full bg-[#141414] border-b border-neutral-800 px-4 sm:px-6 lg:px-8 py-1.5 text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-nowrap whitespace-nowrap overflow-hidden">
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <span className="flex items-center gap-1.5 text-white">
              <span className="w-2 h-2 rounded-full bg-white shadow-sm" />
              <strong className="text-white">Bengaluru</strong> · Mumbai · Gurugram · Dubai
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-neutral-400">
              <Phone className="w-3 h-3 text-white" /> +91 80 4567 8900
            </span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Currency toggle */}
            <div className="flex items-center bg-black rounded-md px-1.5 py-0.5 border border-neutral-700">
              <button
                onClick={() => setCurrency('INR')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                  currency === 'INR' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
                title="Indian Rupee"
              >
                ₹ INR
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                  currency === 'USD' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
                title="US Dollar"
              >
                $ USD
              </button>
            </div>

            {/* Quick Demo Role Switcher */}
            <div className="hidden sm:flex items-center gap-1.5 bg-black border border-neutral-700 rounded-md px-2.5 py-0.5 text-[11px]">
              <span className="text-neutral-500">Mode:</span>
              <button
                onClick={() => switchRole('member')}
                className={`font-semibold px-1 rounded transition-colors ${
                  user?.role === 'member' ? 'text-white underline underline-offset-2' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Member
              </button>
              <span className="text-neutral-700">|</span>
              <button
                onClick={() => switchRole('admin')}
                className={`font-semibold px-1 rounded transition-colors ${
                  user?.role === 'admin' ? 'text-white underline underline-offset-2' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-3 lg:gap-6 flex-nowrap">
          {/* 1. BRAND LOGO ZONE: shrink-0 */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center shrink-0 cursor-pointer text-left focus:outline-none rounded-lg p-1 -ml-1"
            aria-label="VOLT Athletic Club Home"
          >
            <Logo size="md" theme="dark" />
          </button>

          {/* 2. DESKTOP SINGLE-LINE HORIZONTAL NAVIGATION
              - display: flex
              - align-items: center
              - flex-wrap: nowrap
              - every link has white-space: nowrap and shrink-0
              - About Us and Contact placed cleanly at the end
          */}
          <nav
            className="hidden xl:flex items-center flex-nowrap gap-5 2xl:gap-6 shrink-0"
            aria-label="Main Navigation"
          >
            {navLinks.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`relative text-sm font-semibold tracking-normal whitespace-nowrap shrink-0 transition-colors py-2 group focus:outline-none ${
                    isActive ? 'text-white font-bold' : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  <span className="whitespace-nowrap">{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full shadow-sm" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* 3. PRIMARY CONTROLS & CTA ZONE: shrink-0 */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Free Pass Button */}
            <button
              onClick={() => handleNavClick('/free-trial')}
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white hover:bg-neutral-800 transition-colors whitespace-nowrap shrink-0 border border-neutral-700 rounded-xl bg-neutral-900"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span className="whitespace-nowrap">Free 1-Day Pass</span>
            </button>

            {/* User Account / Role Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 text-xs font-semibold rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 transition-colors text-white whitespace-nowrap shrink-0 focus:outline-none"
                >
                  {user.role === 'admin' ? (
                    <ShieldAlert className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <UserIcon className="w-3.5 h-3.5 text-white" />
                  )}
                  <span className="max-w-[70px] sm:max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3 h-3 text-neutral-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl p-2 z-50 text-xs">
                    <div className="px-3 py-2.5 border-b border-neutral-800 mb-1">
                      <p className="font-bold text-white truncate">{user.name}</p>
                      <p className="text-neutral-400 text-[11px] truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-black">
                        {user.role === 'admin' ? 'Staff Admin' : `${user.activePlanId ? 'FIT Member' : 'Member'}`}
                      </span>
                    </div>

                    <button
                      onClick={() => handleNavClick('/account')}
                      className="w-full text-left px-3 py-2 rounded-xl text-white hover:bg-neutral-800 transition-colors font-medium flex items-center justify-between"
                    >
                      <span>Member Dashboard</span>
                      <span className="text-[10px] text-neutral-400">My Club</span>
                    </button>

                    {user.role === 'admin' && (
                      <button
                        onClick={() => handleNavClick('/admin')}
                        className="w-full text-left px-3 py-2 rounded-xl text-white hover:bg-neutral-800 transition-colors font-medium flex items-center justify-between"
                      >
                        <span>Staff Administration</span>
                        <ShieldAlert className="w-3.5 h-3.5 text-white" />
                      </button>
                    )}

                    <div className="my-1 border-t border-neutral-800" />

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-red-400 hover:bg-neutral-800 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('/login')}
                className="hidden sm:inline-flex items-center text-xs font-semibold text-neutral-300 hover:text-white px-3 py-2 rounded-xl transition-colors whitespace-nowrap shrink-0"
              >
                Sign In
              </button>
            )}

            {/* MANDATORY CTA: JOIN NOW (High-Contrast Solid White Button on Black) */}
            <button
              onClick={() => handleNavClick('/membership')}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-md whitespace-nowrap shrink-0 cursor-pointer"
            >
              Join Now
            </button>

            {/* MOBILE HAMBURGER BUTTON */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-xl text-white hover:bg-neutral-800 border border-neutral-700 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE SLIDE-OUT MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-[105px] sm:top-[112px] bottom-0 bg-black/95 backdrop-blur-2xl border-t border-neutral-800 p-5 sm:p-6 overflow-y-auto z-40 transition-all pb-24 text-white">
          <div className="max-w-md mx-auto space-y-6">
            {/* Quick Demo Switcher on mobile */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs">
              <span className="text-neutral-400">App Demo View:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    switchRole('member');
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-1 rounded-lg font-bold text-xs ${
                    user?.role === 'member' ? 'bg-white text-black' : 'bg-neutral-800 text-white'
                  }`}
                >
                  Member
                </button>
                <button
                  onClick={() => {
                    switchRole('admin');
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-1 rounded-lg font-bold text-xs ${
                    user?.role === 'admin' ? 'bg-white text-black' : 'bg-neutral-800 text-white'
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2.5">
                Main Pages
              </p>
              <div className="grid grid-cols-1 gap-1">
                {navLinks.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className={`w-full text-left py-3 px-3.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                      currentPath === item.path
                        ? 'bg-neutral-800 text-white border-l-4 border-white'
                        : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-4 h-4 text-neutral-500" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-800">
              <button
                onClick={() => handleNavClick('/membership')}
                className="w-full py-4 rounded-xl bg-white text-black font-black text-sm uppercase tracking-wider text-center"
              >
                Join VOLT Club Today
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
