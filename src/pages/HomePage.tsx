import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GymGraphic } from '../components/common/GymGraphic';
import {
  ArrowRight,
  Sparkles,
  Check,
  MapPin,
  Clock,
  Phone,
  ShieldCheck,
  Star,
  Users,
  Dumbbell,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    navigate,
    branches,
    selectedBranch,
    setSelectedBranch,
    membershipPlans,
    classes,
    trainers,
    formatPrice,
    setSelectedCheckoutPlanId
  } = useApp();

  const stats = [
    { label: 'Facility Space', value: '14,000+', unit: 'Sq Ft Luxury Floor' },
    { label: 'Weekly Classes', value: '85+', unit: 'Strength, HIIT & Yoga' },
    { label: 'Master Coaches', value: '24+', unit: 'CSCS & Master Trainers' },
    { label: 'Member Retention', value: '94.8%', unit: 'Consistent Progress' }
  ];

  const beginnerSteps = [
    {
      step: '01',
      title: 'Claim Your 1-Day Pass',
      desc: 'Experience our calibrated Olympic platforms, turf, and thermal recovery suite with zero obligation.'
    },
    {
      step: '02',
      title: 'Biomechanical Movement Screen',
      desc: 'Meet 1-on-1 with a senior coach to assess movement patterns, posture, and baseline capacity.'
    },
    {
      step: '03',
      title: 'Targeted Performance Protocol',
      desc: 'Get matched with the ideal training frequency, group classes, or progressive coaching tier.'
    }
  ];

  const testimonials = [
    {
      quote:
        'VOLT transformed my perspective on strength training. The Eleiko platforms and coaching precision in Indiranagar are unmatched anywhere else in India.',
      name: 'Rohan Mehra',
      role: 'Tech Executive & Lifter',
      metric: '+40kg on Squat in 6 months',
      branch: 'Bengaluru Indiranagar'
    },
    {
      quote:
        'The infrared sauna and contrast plunge after high-intensity turf intervals keep me recovering faster than ever. It’s an elite athletic sanctuary.',
      name: 'Dr. Sneha Nair',
      role: 'Sports Cardiologist',
      metric: 'VO2 Max increased by 18%',
      branch: 'Mumbai BKC'
    },
    {
      quote:
        'Clean, respectful lifting culture with coaches who actually correct your form rather than just looking at a stopwatch. Highly recommend the FIT tier.',
      name: 'Tanmay Kapoor',
      role: 'Product Architect',
      metric: 'Consistent 4 days/week for 14 months',
      branch: 'Gurugram Cyber Hub'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-white text-neutral-900">
      {/* 1. HERO SECTION (Dramatic High-Contrast Black with Unsplash Image) */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-black text-white border-b border-neutral-900">
        {/* Dynamic Unsplash Backdrop */}
        <GymGraphic type="hero" className="absolute inset-0 w-full h-full" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 text-center flex flex-col items-center">
          {/* Location Selector Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-700 text-xs font-semibold text-neutral-300 mb-6 backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-white shadow-sm animate-pulse" />
            <span className="hidden xs:inline">Select Location:</span>
            <select
              value={selectedBranch.id}
              onChange={(e) => {
                const b = branches.find((br) => br.id === e.target.value);
                if (b) setSelectedBranch(b);
              }}
              className="bg-transparent text-white font-bold outline-none cursor-pointer pr-1 text-xs sm:text-sm"
            >
              {branches.map((b) => (
                <option key={b.id} value={b.id} className="bg-neutral-900 text-white">
                  {b.name} ({b.city})
                </option>
              ))}
            </select>
          </div>

          {/* Impactful Headline in Two-Color Contrast */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-black tracking-tight leading-[1.05] max-w-5xl text-white font-display uppercase">
            STRONGER <span className="text-neutral-400">EVERY</span> DAY.
          </h1>

          {/* Supporting Copy */}
          <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-xl text-neutral-300 max-w-3xl leading-relaxed text-balance px-2">
            VOLT is India&apos;s premier high-performance fitness club. Combining calibrated Olympic lifting, metabolic conditioning, infrared recovery suites, and sports science coaching under one roof.
          </p>

          {/* Primary & Secondary Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0 max-w-sm sm:max-w-none">
            <button
              onClick={() => navigate('/membership')}
              className="w-full sm:w-auto px-8 sm:px-10 py-4 rounded-xl bg-white hover:bg-neutral-200 text-black font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-2xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Memberships</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/free-trial')}
              className="w-full sm:w-auto px-8 sm:px-10 py-4 rounded-xl bg-transparent hover:bg-white/10 text-white border-2 border-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Book a Free 1-Day Trial</span>
            </button>
          </div>

          <p className="text-[11px] text-neutral-400 mt-5 font-mono">
            *Demo membership plans start at ₹999/month. Complimentary pass valid at all branches.
          </p>
        </div>
      </section>

      {/* 2. STATS STRIP (Clean White Section with High-Contrast Numbers) */}
      <section className="border-b border-neutral-200 bg-white py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((s, idx) => (
            <div key={idx} className="flex flex-col border-l-2 border-black pl-4 sm:pl-6">
              <span className="text-3xl sm:text-5xl lg:text-6xl font-black text-black font-display tabular-nums">
                {s.value}
              </span>
              <span className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider mt-1">{s.label}</span>
              <span className="text-[11px] sm:text-xs text-neutral-500">{s.unit}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED FACILITIES (Crisp Light Grey Section with Real Unsplash Photos) */}
      <section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-neutral-200 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Elite Training Environments
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-black mt-1 font-display tracking-tight">
                Built For Real Athletes.
              </h2>
            </div>
            <button
              onClick={() => navigate('/facilities')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-black hover:underline self-start md:self-auto"
            >
              <span>Explore All 5 Dedicated Zones</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-white border border-neutral-200 rounded-3xl overflow-hidden p-6 flex flex-col justify-between group hover:border-black transition-all shadow-sm">
              <GymGraphic type="strength" className="h-48 sm:h-56 w-full rounded-2xl mb-6" badge="Strength" />
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-black font-display">Competition Strength Floor</h3>
                <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                  Eleiko IPF calibrated plates, 8 heavy power racks, dumbbells up to 60kg, and dedicated deadlift platforms with acoustic vibration tiles.
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-100 mt-6 flex items-center justify-between text-xs text-black font-bold">
                <span>Heavy Iron Zone</span>
                <span className="text-neutral-500">Eleiko & Hammer</span>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-3xl overflow-hidden p-6 flex flex-col justify-between group hover:border-black transition-all shadow-sm">
              <GymGraphic type="hiit" className="h-48 sm:h-56 w-full rounded-2xl mb-6" badge="Metabolic" />
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-black font-display">35m Sprint Turf & Rig Box</h3>
                <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                  Dual-lane sled turf, SkiErgs, assault bikes, kettlebells, and gymnastics rings for athletic metabolic output and functional conditioning.
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-100 mt-6 flex items-center justify-between text-xs text-black font-bold">
                <span>Conditioning Zone</span>
                <span className="text-neutral-500">Torque & Concept2</span>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-3xl overflow-hidden p-6 flex flex-col justify-between group hover:border-black transition-all shadow-sm">
              <GymGraphic type="recovery" className="h-48 sm:h-56 w-full rounded-2xl mb-6" badge="Recovery" />
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-black font-display">Infrared Sauna & Plunge Suite</h3>
                <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                  Accelerate muscle recovery and lower inflammation with our 5°C cold plunge tubs, Cedar infrared saunas, and Normatec compression lounge.
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-100 mt-6 flex items-center justify-between text-xs text-black font-bold">
                <span>Thermal Recovery</span>
                <span className="text-neutral-500">Cold Plunge & Cedar</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. POPULAR CLASSES (Dramatic Black Accent Band with Unsplash Photos) */}
      <section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-neutral-900 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Group Training Experience
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white mt-1 font-display tracking-tight">
                High-Energy Signature Classes.
              </h2>
            </div>
            <button
              onClick={() => navigate('/classes')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white hover:underline self-start md:self-auto"
            >
              <span>View Full Weekly Timetable</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {classes.slice(0, 3).map((item) => {
              const graphicType = item.category === 'Strength' ? 'strength' : item.category === 'HIIT' ? 'hiit' : 'yoga';
              return (
                <div
                  key={item.id}
                  className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-neutral-500 transition-all shadow-xl"
                >
                  <GymGraphic type={graphicType} className="h-44 w-full" badge={item.category} />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3 text-xs text-neutral-400 font-mono">
                      <span>{item.intensity}</span>
                      <span>{item.durationMinutes} Mins</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white font-display mb-2">{item.name}</h3>
                    <p className="text-xs text-neutral-400 line-clamp-3 mb-6 leading-relaxed">{item.description}</p>

                    <div className="border-t border-neutral-800 pt-4 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] uppercase font-mono text-neutral-500">Coach</p>
                        <p className="text-xs font-bold text-white">{item.trainerName}</p>
                      </div>
                      <button
                        onClick={() => navigate('/schedule')}
                        className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-200 text-xs font-black text-black transition-colors"
                      >
                        Reserve Spot
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. MEMBERSHIP PREVIEW (Clean High-Contrast White Section) */}
      <section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Clear, Honest Pricing
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-black mt-2 font-display tracking-tight">
            Membership Plans Tailored to Your Goals.
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto mt-3 text-xs sm:text-sm">
            Zero lock-in contracts on monthly plans. Transparent tax and cancellation policies.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {membershipPlans.slice(0, 3).map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all ${
                plan.popular
                  ? 'bg-black text-white border-2 border-black shadow-2xl scale-[1.02]'
                  : 'bg-neutral-50 text-neutral-900 border border-neutral-200'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                  Most Popular Plan
                </span>
              )}

              <div>
                <h3 className={`text-2xl font-black font-display ${plan.popular ? 'text-white' : 'text-black'}`}>
                  {plan.name}
                </h3>
                <p className={`text-xs mt-1 ${plan.popular ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  {plan.tagline}
                </p>

                <div className="my-6">
                  <span className={`text-3xl sm:text-5xl font-black font-display ${plan.popular ? 'text-white' : 'text-black'}`}>
                    {formatPrice(plan.priceINR)}
                  </span>
                  <span className={`text-xs ml-2 ${plan.popular ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    / month
                  </span>
                </div>

                <div className={`space-y-3 border-t pt-6 mb-8 text-left text-xs ${plan.popular ? 'border-neutral-800' : 'border-neutral-200'}`}>
                  {plan.features.slice(0, 4).map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5">
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
                className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  plan.popular
                    ? 'bg-white hover:bg-neutral-200 text-black shadow-lg'
                    : 'bg-black hover:bg-neutral-800 text-white'
                }`}
              >
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 text-center">
          <button
            onClick={() => navigate('/membership')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-600 hover:text-black transition-colors"
          >
            <span>Compare all features, student passes, and annual discounts</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 6. BEGINNER STEP-BY-STEP */}
      <section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-neutral-200 bg-neutral-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Accessible Onboarding
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-black mt-2 font-display tracking-tight">
              New to Gym Training? We’ve Got You Covered.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-3 leading-relaxed">
              We eliminate gym intimidation. Every new member is greeted by an orientation coach who walks you through equipment, safety etiquette, and lifting form fundamentals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {beginnerSteps.map((b, idx) => (
              <div key={idx} className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 relative shadow-sm">
                <span className="text-4xl sm:text-5xl font-black text-neutral-200 font-display mb-3 block">
                  {b.step}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-black mb-2 font-display">{b.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 sm:mt-12 text-center">
            <button
              onClick={() => navigate('/free-trial')}
              className="w-full sm:w-auto px-9 py-4 rounded-xl bg-black text-white font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-xl"
            >
              Start Free 1-Day Trial Pass
            </button>
          </div>
        </div>
      </section>

      {/* 7. AUTHENTIC TESTIMONIALS */}
      <section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Member Experiences (Demo Reviews)
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-black mt-2 font-display tracking-tight">
              Real Impact. Disciplined Results.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-1 text-black mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-700 italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-5 border-t border-neutral-200 mt-6">
                  <p className="text-xs font-bold text-black">{t.name}</p>
                  <p className="text-[11px] text-neutral-500">{t.role}</p>
                  <span className="inline-block mt-2 text-[10px] font-bold text-black bg-neutral-200 px-2.5 py-0.5 rounded-full">
                    {t.metric}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. BRANCH LOCATION & HOURS */}
      <section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-neutral-200 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div>
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Visit The Club
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-black mt-1 font-display tracking-tight">
                Flagship Locations & Hours.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-3 mb-6 sm:mb-8 leading-relaxed">
                Operating early mornings through late evenings 7 days a week to accommodate busy professionals and athletes.
              </p>

              <div className="space-y-3 sm:space-y-4">
                {branches.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => setSelectedBranch(b)}
                    className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all ${
                      selectedBranch.id === b.id
                        ? 'bg-black text-white border-black shadow-lg'
                        : 'bg-white border-neutral-200 text-black hover:border-black'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className={`text-sm sm:text-base font-bold ${selectedBranch.id === b.id ? 'text-white' : 'text-black'}`}>
                          {b.name}
                        </h4>
                        <p className={`text-xs mt-1 ${selectedBranch.id === b.id ? 'text-neutral-400' : 'text-neutral-500'}`}>
                          {b.address}
                        </p>
                      </div>
                      <span className={`text-xs font-bold shrink-0 ml-2 ${selectedBranch.id === b.id ? 'text-white' : 'text-black'}`}>
                        {b.city}
                      </span>
                    </div>

                    <div className={`mt-3 pt-3 border-t flex flex-wrap gap-4 text-xs ${
                      selectedBranch.id === b.id ? 'border-neutral-800 text-neutral-400' : 'border-neutral-100 text-neutral-600'
                    }`}>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {b.hoursWeekday}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" />
                        {b.phone}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Simulator */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-5 sm:p-6 flex flex-col justify-between h-[420px] sm:h-[480px] shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div>
                  <h4 className="font-bold text-black text-sm">{selectedBranch.name}</h4>
                  <p className="text-xs text-neutral-500">{selectedBranch.city}</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-black text-white font-bold">
                  Open Today
                </span>
              </div>

              {/* Map Canvas */}
              <div className="relative flex-1 bg-neutral-900 rounded-2xl overflow-hidden my-3 border border-neutral-200 flex items-center justify-center">
                <svg className="w-full h-full opacity-60" viewBox="0 0 500 300" fill="none">
                  <line x1="0" y1="150" x2="500" y2="150" stroke="#333" strokeWidth="6" />
                  <line x1="250" y1="0" x2="250" y2="300" stroke="#333" strokeWidth="6" />
                  <line x1="120" y1="0" x2="120" y2="300" stroke="#222" strokeWidth="3" />
                  <line x1="380" y1="0" x2="380" y2="300" stroke="#222" strokeWidth="3" />
                  <circle cx="250" cy="150" r="14" fill="#ffffff" opacity="0.3" />
                  <circle cx="250" cy="150" r="7" fill="#ffffff" />
                </svg>

                <div className="absolute bottom-3 left-3 right-3 bg-black/90 backdrop-blur-md p-3 rounded-xl border border-neutral-700 text-xs text-white">
                  <p className="font-bold flex items-center gap-1.5 truncate">
                    <MapPin className="w-4 h-4 text-white shrink-0" />
                    <span className="truncate">{selectedBranch.address}</span>
                  </p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Coordinates: {selectedBranch.coordinates.lat.toFixed(4)}, {selectedBranch.coordinates.lng.toFixed(4)}
                  </p>
                </div>
              </div>

              <div className="flex gap-2.5">
                <button
                  onClick={() => navigate('/contact')}
                  className="flex-1 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-xs font-bold text-black transition-colors"
                >
                  Directions & Parking
                </button>
                <button
                  onClick={() => navigate('/free-trial')}
                  className="px-5 py-2.5 rounded-xl bg-black text-white text-xs font-black transition-colors"
                >
                  Book Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FINAL PROMINENT MEMBERSHIP CTA (Dramatic Black Accent) */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-neutral-100">
        <div className="max-w-5xl mx-auto rounded-3xl bg-black text-white border border-neutral-800 p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Begin Your High-Performance Transformation
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-3 font-display uppercase tracking-tight">
              Ready to Redefine Your Physical Limits?
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-neutral-300 max-w-2xl mx-auto mt-4 leading-relaxed">
              Join hundreds of athletes, executives, and dedicated lifters training at VOLT Fitness Club across India and internationally.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={() => navigate('/membership')}
                className="w-full sm:w-auto px-9 py-4 rounded-xl bg-white hover:bg-neutral-200 text-black font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl"
              >
                Join VOLT Club Today
              </button>
              <button
                onClick={() => navigate('/free-trial')}
                className="w-full sm:w-auto px-9 py-4 rounded-xl bg-transparent hover:bg-white/10 text-white border border-white font-bold text-xs sm:text-sm uppercase tracking-wider"
              >
                Claim Free 1-Day Pass
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
