import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Check,
  X as CrossIcon,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Clock,
  Zap,
  Users
} from 'lucide-react';

export const MembershipPage: React.FC = () => {
  const {
    membershipPlans,
    formatPrice,
    setSelectedCheckoutPlanId,
    navigate
  } = useApp();

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const comparisonFeatures = [
    { feature: 'Primary Gym Floor & Calibrated Barbells', starter: true, fit: true, elite: true, annual: true },
    { feature: 'High-Speed Hydration & Standard Locker', starter: true, fit: true, elite: true, annual: true },
    { feature: 'VOLT Mobile App & Logbook', starter: true, fit: true, elite: true, annual: true },
    { feature: 'Group Studio Classes (HIIT, Yoga, Spin)', starter: '2 / mo', fit: '12 / mo', elite: 'Unlimited', annual: 'Unlimited' },
    { feature: 'Infrared Thermal Sauna & Cold Plunge Suite', starter: false, fit: true, elite: true, annual: true },
    { feature: '1-on-1 Personal Coaching Sessions', starter: false, fit: '1 / mo', elite: '4 / mo', annual: '12 / yr' },
    { feature: 'InBody 770 Biometric Scans', starter: '1 at Start', fit: 'Quarterly', elite: 'Bi-Weekly', annual: 'Monthly' },
    { feature: 'Complimentary VIP Guest Day Passes', starter: false, fit: '2 / mo', elite: '4 / mo', annual: '6 / mo' },
    { feature: 'Membership Travel Freeze Allowance', starter: false, fit: '30 Days / yr', elite: '60 Days / yr', annual: '60 Days / yr' },
    { feature: 'Multi-City Branch Passport (India & Dubai)', starter: false, fit: true, elite: true, annual: true },
    { feature: 'Permanent Executive Reserved Locker', starter: false, fit: false, elite: true, annual: true }
  ];

  return (
    <div className="w-full min-h-screen bg-white text-neutral-900">
      {/* Header (Dramatic Black Section) */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-neutral-900 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
            Unrestricted Athletic Access
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mt-2 font-display uppercase tracking-tight">
            Membership Plans. Zero Fluff.
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 mt-3 sm:mt-4 max-w-2xl mx-auto text-balance">
            Transparent pricing in INR. All plans include full orientation, sanitary standards, and zero hidden locker fees.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-6 sm:mt-8 inline-flex items-center p-1.5 rounded-2xl bg-neutral-900 border border-neutral-700 max-w-full">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-white text-black font-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                billingCycle === 'annual'
                  ? 'bg-white text-black font-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>Annual</span>
              <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-black text-white border border-neutral-700">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-neutral-200 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {membershipPlans.map((plan) => {
              const displayPrice =
                billingCycle === 'annual' && plan.period === 'month'
                  ? Math.round(plan.priceINR * 0.8)
                  : plan.priceINR;

              return (
                <div
                  key={plan.id}
                  className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all ${
                    plan.popular
                      ? 'bg-black text-white border-2 border-black shadow-xl scale-[1.02]'
                      : 'bg-white text-black border border-neutral-200 shadow-sm'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                      Most Popular
                    </span>
                  )}

                  <div>
                    <h3 className={`text-xl font-black font-display uppercase ${plan.popular ? 'text-white' : 'text-black'}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-xs mt-1 ${plan.popular ? 'text-neutral-400' : 'text-neutral-500'}`}>
                      {plan.tagline}
                    </p>

                    <div className="my-6">
                      <span className={`text-3xl sm:text-4xl font-black font-display ${plan.popular ? 'text-white' : 'text-black'}`}>
                        {formatPrice(displayPrice)}
                      </span>
                      <span className={`text-xs ml-1.5 ${plan.popular ? 'text-neutral-400' : 'text-neutral-500'}`}>
                        / {plan.period === 'year' ? 'year' : 'month'}
                      </span>
                    </div>

                    <div className={`space-y-2.5 border-t pt-5 mb-8 text-xs ${plan.popular ? 'border-neutral-800' : 'border-neutral-100'}`}>
                      {plan.features.slice(0, 5).map((f, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.popular ? 'text-white' : 'text-black'}`} />
                          <span className={plan.popular ? 'text-neutral-200' : 'text-neutral-700'}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCheckoutPlanId(plan.id);
                      navigate('/checkout');
                    }}
                    className={`w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                      plan.popular
                        ? 'bg-white hover:bg-neutral-200 text-black shadow-lg'
                        : 'bg-black hover:bg-neutral-800 text-white'
                    }`}
                  >
                    Select {plan.name}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Complete Plan Breakdown
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-black mt-2 font-display uppercase tracking-tight">
              Feature Matrix & Perks.
            </h2>
          </div>

          {/* Horizontally scrollable comparison table on mobile */}
          <div className="overflow-x-auto rounded-3xl border border-neutral-200 shadow-sm bg-white">
            <table className="w-full text-left text-xs border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50 text-neutral-600 font-mono">
                  <th className="py-4 px-6 text-sm font-bold text-black font-display">Plan Inclusions</th>
                  <th className="py-4 px-4 text-center font-bold text-black">STARTER</th>
                  <th className="py-4 px-4 text-center font-bold text-black bg-neutral-100">FIT</th>
                  <th className="py-4 px-4 text-center font-bold text-black">ELITE</th>
                  <th className="py-4 px-4 text-center font-bold text-black">ANNUAL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {comparisonFeatures.map((row, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-black">{row.feature}</td>

                    {/* Starter */}
                    <td className="py-4 px-4 text-center">
                      {typeof row.starter === 'boolean' ? (
                        row.starter ? (
                          <Check className="w-4 h-4 text-black mx-auto" />
                        ) : (
                          <CrossIcon className="w-4 h-4 text-neutral-300 mx-auto" />
                        )
                      ) : (
                        <span className="font-mono text-neutral-700">{row.starter}</span>
                      )}
                    </td>

                    {/* Fit */}
                    <td className="py-4 px-4 text-center bg-neutral-50 font-medium">
                      {typeof row.fit === 'boolean' ? (
                        row.fit ? (
                          <Check className="w-4 h-4 text-black mx-auto" />
                        ) : (
                          <CrossIcon className="w-4 h-4 text-neutral-300 mx-auto" />
                        )
                      ) : (
                        <span className="font-mono text-black font-bold">{row.fit}</span>
                      )}
                    </td>

                    {/* Elite */}
                    <td className="py-4 px-4 text-center">
                      {typeof row.elite === 'boolean' ? (
                        row.elite ? (
                          <Check className="w-4 h-4 text-black mx-auto" />
                        ) : (
                          <CrossIcon className="w-4 h-4 text-neutral-300 mx-auto" />
                        )
                      ) : (
                        <span className="font-mono text-black font-bold">{row.elite}</span>
                      )}
                    </td>

                    {/* Annual */}
                    <td className="py-4 px-4 text-center">
                      {typeof row.annual === 'boolean' ? (
                        row.annual ? (
                          <Check className="w-4 h-4 text-black mx-auto" />
                        ) : (
                          <CrossIcon className="w-4 h-4 text-neutral-300 mx-auto" />
                        )
                      ) : (
                        <span className="font-mono text-black font-bold">{row.annual}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center text-xs text-neutral-500">
            Swipe sideways on mobile to inspect full feature comparison
          </div>
        </div>
      </section>

      {/* 7-Day Guarantee Banner */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-neutral-100">
        <div className="max-w-4xl mx-auto rounded-3xl bg-black text-white border border-neutral-800 p-8 sm:p-10 text-center shadow-2xl">
          <ShieldCheck className="w-10 h-10 text-white mx-auto mb-3" />
          <h3 className="text-xl sm:text-2xl font-black text-white font-display uppercase tracking-tight">
            7-Day Unconditional Money Back Guarantee
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-xl mx-auto leading-relaxed">
            Try the club floor, classes, and facilities. If you are not completely satisfied within your first 7 days, cancel for a 100% full refund with zero awkward questions.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => navigate('/free-trial')}
              className="px-8 py-3.5 rounded-xl bg-white text-black font-black text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors"
            >
              Or Start with a 1-Day Trial Pass
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
