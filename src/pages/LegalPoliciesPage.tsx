import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, FileText, ArrowLeft, Lock } from 'lucide-react';

interface LegalPoliciesPageProps {
  initialPolicy?:
    | 'privacy'
    | 'terms'
    | 'membership'
    | 'cancellation'
    | 'refund'
    | 'cookies';
}

export const LegalPoliciesPage: React.FC<LegalPoliciesPageProps> = ({
  initialPolicy = 'privacy'
}) => {
  const { navigate } = useApp();
  const [selectedPolicy, setSelectedPolicy] = useState<
    'privacy' | 'terms' | 'membership' | 'cancellation' | 'refund' | 'cookies'
  >(initialPolicy);

  const policyMenu = [
    { id: 'privacy', label: 'Privacy Policy (DPDP Act)', route: '/privacy-policy' },
    { id: 'terms', label: 'Terms and Conditions', route: '/terms-and-conditions' },
    { id: 'membership', label: 'Membership Agreement', route: '/membership-terms' },
    { id: 'cancellation', label: 'Cancellation Policy', route: '/cancellation-policy' },
    { id: 'refund', label: 'Refund Policy & Guarantee', route: '/refund-policy' },
    { id: 'cookies', label: 'Cookie & Tracking Notice', route: '/cookie-policy' }
  ] as const;

  return (
    <div className="w-full min-h-screen bg-white text-neutral-900 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 sm:gap-10 items-start">
          {/* Policy navigation sidebar */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-4 space-y-1">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-3 py-2 block font-mono">
              Legal Documents
            </span>
            {policyMenu.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedPolicy(item.id);
                  window.history.pushState({}, '', item.route);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedPolicy === item.id
                    ? 'bg-black text-white'
                    : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Policy Content Viewer */}
          <div className="lg:col-span-3 bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-12 shadow-sm">
            {/* PRIVACY POLICY */}
            {selectedPolicy === 'privacy' && (
              <div className="space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                <div>
                  <span className="text-xs font-bold text-black uppercase tracking-wider font-mono">Legal & Compliance</span>
                  <h1 className="text-2xl sm:text-4xl font-black text-black font-display uppercase tracking-tight mt-1">
                    Privacy Policy & Data Protection
                  </h1>
                  <p className="text-xs text-neutral-500 mt-1">
                    Last updated: October 2026 · Compliant with India&apos;s Digital Personal Data Protection (DPDP) Act
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-neutral-200 text-xs space-y-1">
                  <p className="font-bold text-black">Summary for Members:</p>
                  <p>
                    We collect only the essential health and payment telemetry required to operate your membership safely. We never sell your personal information or biometric fitness measurements to third-party advertisers.
                  </p>
                </div>

                <h3 className="text-base font-bold text-black pt-2">1. Information We Collect</h3>
                <p>
                  When registering with VOLT Fitness Club, we collect your name, contact email, phone number, emergency contact, and billing details. For personal training and physical readiness screens, you may voluntarily provide exercise history and movement limitations.
                </p>

                <h3 className="text-base font-bold text-black pt-2">2. Processing & Storage Safeguards</h3>
                <p>
                  All fitness metrics and transaction records are encrypted using AES-256 standard protocols. Access is restricted to authorized club management personnel on a strict need-to-know basis.
                </p>

                <h3 className="text-base font-bold text-black pt-2">3. Your Data Principal Rights</h3>
                <p>
                  Under Indian data protection laws, you retain the right to request access to your complete records, correct inaccuracies, or demand account and data deletion by emailing <span className="text-black font-bold">privacy@voltclub.com</span>.
                </p>
              </div>
            )}

            {/* TERMS & CONDITIONS */}
            {selectedPolicy === 'terms' && (
              <div className="space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                <div>
                  <span className="text-xs font-bold text-black uppercase tracking-wider font-mono">Terms of Service</span>
                  <h1 className="text-2xl sm:text-4xl font-black text-black font-display uppercase tracking-tight mt-1">
                    Terms & Conditions of Club Usage
                  </h1>
                </div>

                <h3 className="text-base font-bold text-black pt-2">1. Facility Etiquette & Safety</h3>
                <p>
                  Members agree to re-rack all barbells, dumbbells, and weight plates after completing their working sets. Dropping barbells is permitted only on designated vibration-dampening Olympic lifting platforms.
                </p>

                <h3 className="text-base font-bold text-black pt-2">2. Respectful Community Standards</h3>
                <p>
                  Harassment, non-consensual photography or filming of other members, or disruptive conduct will result in immediate revocation of club access without refund.
                </p>
              </div>
            )}

            {/* MEMBERSHIP AGREEMENT */}
            {selectedPolicy === 'membership' && (
              <div className="space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                <div>
                  <span className="text-xs font-bold text-black uppercase tracking-wider font-mono">Member Agreement</span>
                  <h1 className="text-2xl sm:text-4xl font-black text-black font-display uppercase tracking-tight mt-1">
                    Membership Terms & Renewal
                  </h1>
                </div>

                <p>
                  Monthly subscriptions renew automatically on your monthly billing cycle date. You may freeze your membership for up to 30 days per calendar year (FIT) or 60 days (ELITE / ANNUAL) by submitting a request in the member dashboard.
                </p>
              </div>
            )}

            {/* CANCELLATION POLICY */}
            {selectedPolicy === 'cancellation' && (
              <div className="space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                <div>
                  <span className="text-xs font-bold text-black uppercase tracking-wider font-mono">Cancellation Rules</span>
                  <h1 className="text-2xl sm:text-4xl font-black text-black font-display uppercase tracking-tight mt-1">
                    Class & Membership Cancellation
                  </h1>
                </div>

                <h3 className="text-base font-bold text-black pt-2">1. Class Reservations</h3>
                <p>
                  Group studio classes may be cancelled with zero penalty up to 2 hours prior to start time through the web schedule or customer dashboard. Late cancellations or no-shows release the seat to the first member on the waitlist.
                </p>

                <h3 className="text-base font-bold text-black pt-2">2. Monthly Memberships</h3>
                <p>
                  Monthly memberships can be cancelled at any time with 15 days notice before your next scheduled renewal date directly from your account page.
                </p>
              </div>
            )}

            {/* REFUND POLICY */}
            {selectedPolicy === 'refund' && (
              <div className="space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                <div>
                  <span className="text-xs font-bold text-black uppercase tracking-wider font-mono">Consumer Protection</span>
                  <h1 className="text-2xl sm:text-4xl font-black text-black font-display uppercase tracking-tight mt-1">
                    Refund Policy & 7-Day Guarantee
                  </h1>
                </div>

                <div className="p-4 rounded-xl bg-white border border-neutral-300 space-y-2">
                  <h4 className="font-bold text-black">7-Day Unconditional Satisfaction Guarantee:</h4>
                  <p>
                    New members who join online or at the club have 7 full calendar days to trial the facilities. If you are unsatisfied for any reason, submit a cancellation within 7 days for a 100% refund of fees paid, minus any attended 1-on-1 personal coaching sessions.
                  </p>
                </div>
              </div>
            )}

            {/* COOKIE NOTICE */}
            {selectedPolicy === 'cookies' && (
              <div className="space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                <div>
                  <span className="text-xs font-bold text-black uppercase tracking-wider font-mono">Cookie Usage</span>
                  <h1 className="text-2xl sm:text-4xl font-black text-black font-display uppercase tracking-tight mt-1">
                    Cookie & Storage Notice
                  </h1>
                </div>

                <p>
                  We utilize essential local storage and session tokens to preserve your active member authentication, branch preferences, and class reservations. We do not use third-party tracking pixels to sell your behavioral data.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
