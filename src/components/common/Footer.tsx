import React, { useState } from 'react';
import { Logo } from './Logo';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Youtube,
  Twitter,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, branches } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="w-full bg-black border-t border-neutral-800 text-neutral-400 text-sm pb-12 md:pb-0">
      {/* Upper VIP Callout Strip */}
      <div className="border-b border-neutral-800 py-10 sm:py-12 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              VOLT Performance Dispatch
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1 font-display">
              Elevate your physical threshold.
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm mt-2 leading-relaxed">
              Receive weekly science-backed training protocols, progressive overload frameworks, and early guest invitations.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 bg-neutral-900 border border-white text-white px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5 text-white" />
                <span>You are subscribed to the VOLT Performance Dispatch!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md w-full mx-auto lg:mx-0">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your personal email..."
                  required
                  className="bg-neutral-900 border border-neutral-700 focus:border-white text-white px-4 py-3 rounded-xl text-sm outline-none placeholder:text-neutral-500 flex-1"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-black text-xs uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
                >
                  Join Dispatch
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Directory Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" theme="dark" />
            <p className="text-xs sm:text-sm text-neutral-400 max-w-sm leading-relaxed">
              India’s definitive high-performance athletic club. Engineered with tournament-spec Eleiko equipment, Woodway treadmills, and clinical sports physiology recovery suites.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 flex items-center justify-center text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 flex items-center justify-center text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 flex items-center justify-center text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
            <div className="pt-3">
              <span className="inline-flex items-center gap-1.5 text-xs text-neutral-400">
                <ShieldCheck className="w-4 h-4 text-white" /> ISO 9001 Certified Athletic Facility
              </span>
            </div>
          </div>

          {/* Training & Club */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 font-mono">
              Training & Programs
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigate('/facilities')} className="hover:text-white transition-colors">
                  Facility Zones & Floor
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/classes')} className="hover:text-white transition-colors">
                  Signature Studio Classes
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/schedule')} className="hover:text-white transition-colors">
                  Live Timetable & Booking
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/personal-training')} className="hover:text-white transition-colors">
                  1-on-1 Performance PT
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/trainers')} className="hover:text-white transition-colors">
                  Certified Coaching Staff
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/membership')} className="hover:text-white transition-colors">
                  Memberships & Pricing
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 font-mono">
              Club & Company
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-white transition-colors">
                  About Us (Our Story)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-white transition-colors">
                  Contact & Locations
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/free-trial')} className="hover:text-white transition-colors font-bold text-white">
                  Get Free 1-Day Pass
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/fitness-resources')} className="hover:text-white transition-colors">
                  Sports Science Guides
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/faq')} className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/admin')} className="hover:text-white transition-colors">
                  Staff Management
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 font-mono">
              Legal & Policies
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigate('/privacy-policy')} className="hover:text-white transition-colors">
                  Privacy Policy (DPDP Act)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/terms-and-conditions')} className="hover:text-white transition-colors">
                  Terms and Conditions
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/membership-terms')} className="hover:text-white transition-colors">
                  Membership Agreement
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/cancellation-policy')} className="hover:text-white transition-colors">
                  Cancellation Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/refund-policy')} className="hover:text-white transition-colors">
                  Refund & 7-Day Guarantee
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/cookie-policy')} className="hover:text-white transition-colors">
                  Cookie Preferences
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Multi-Branch Address Strip */}
        <div className="mt-12 pt-8 border-t border-neutral-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {branches.map((b) => (
            <div key={b.id} className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
              <span className="font-bold text-white block mb-0.5">{b.name}</span>
              <p className="text-[11px] text-neutral-400 line-clamp-2">{b.address}</p>
              <span className="text-[10px] text-neutral-500 font-mono mt-1.5 block">
                {b.hoursWeekday}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Copyright & GSTIN */}
        <div className="mt-10 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-3">
          <p>© {new Date().getFullYear()} VOLT Athletic Club Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>GSTIN: 29AABCU9603R1ZM</span>
            <span>CIN: U93040KA2024PTC184210</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
