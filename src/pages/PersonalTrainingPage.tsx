import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GymGraphic } from '../components/common/GymGraphic';
import { Modal } from '../components/common/Modal';
import {
  Check,
  Shield,
  Target,
  Award,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  UserCheck
} from 'lucide-react';

export const PersonalTrainingPage: React.FC = () => {
  const { trainers, navigate, formatPrice, showToast } = useApp();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [selectedCoachId, setSelectedCoachId] = useState(trainers[0].id);
  const [consultGoal, setConsultGoal] = useState('Strength & Hypertrophy');
  const [consultDate, setConsultDate] = useState('2026-11-04');

  const packages = [
    {
      id: 'pt-starter',
      name: 'Foundation Coaching (4 Sessions)',
      sessions: 4,
      priceINR: 5999,
      priceUSD: 75,
      tagline: 'Ideal for beginners seeking proper biomechanical form & bar orientation.',
      features: [
        'Full musculoskeletal & postural screen',
        'Custom 4-week progressive training plan',
        'Direct 1-on-1 coaching during 60-min sessions',
        'Fundamental compound lift execution (Squat, Bench, Deadlift)'
      ]
    },
    {
      id: 'pt-accelerator',
      name: 'Performance Accelerator (12 Sessions)',
      sessions: 12,
      priceINR: 15999,
      priceUSD: 199,
      popular: true,
      tagline: 'Our premier package for body recomposition and rapid strength advancement.',
      features: [
        'Everything in Foundation Coaching',
        'Comprehensive InBody 770 biometric scans & macros plan',
        '12 dedicated 1-on-1 private sessions with Senior Coach',
        'Heart-rate variability & recovery load tracking',
        'Priority studio & platform reservation'
      ]
    },
    {
      id: 'pt-elite',
      name: 'Athlete Protocol (24 Sessions)',
      sessions: 24,
      priceINR: 28999,
      priceUSD: 360,
      tagline: 'Intensive protocol for competitive lifters, athletes, and executives.',
      features: [
        '24 private sessions with Head Coach',
        'Weekly personalized nutrition adjustments',
        'Bi-weekly thermal recovery suite integration',
        'Dedicated video bar-path biomechanical analysis',
        'Direct coach messaging via VOLT Athlete app'
      ]
    }
  ];

  const tracks = [
    {
      title: 'Powerlifting & Hypertrophy',
      coach: 'Vikram Sengupta',
      graphicType: 'strength' as const,
      desc: 'Progressive overload, barbell biomechanics, and targeted volume for maximum force production and dense muscle architecture.'
    },
    {
      title: 'Metabolic Conditioning & VO2 Max',
      coach: 'Ananya Sharma',
      graphicType: 'hiit' as const,
      desc: 'High-output energy system development combining SkiErgs, assault bikes, sprint turf, and lactate clearance training.'
    },
    {
      title: 'Mobility & Spine Rehabilitation',
      coach: 'Rohan Deshmukh',
      graphicType: 'yoga' as const,
      desc: 'Functional range conditioning (FRC), hip opening, thoracic decompression, and corrective joint stabilization.'
    },
    {
      title: 'Athletic Sports Performance',
      coach: 'Priya Nambiar',
      graphicType: 'combat' as const,
      desc: 'Multi-directional speed, rotational core torque, breath mechanics, and athletic agility for field athletes.'
    }
  ];

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultModalOpen(false);
    showToast('Coaching consultation booked! Your selected coach will contact you within 4 business hours.', 'success');
  };

  return (
    <div className="w-full min-h-screen bg-white text-neutral-900">
      {/* Header (Dramatic Black Section) */}
      <section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-neutral-900 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
            1-on-1 Dedicated Mentorship
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mt-2 font-display uppercase tracking-tight">
            Personal Coaching. Scientific Results.
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 mt-3 sm:mt-4 max-w-2xl mx-auto text-balance">
            Work with certified exercise physiologists and CSCS-accredited coaches. Individualized biomechanical programming without generic workout templates.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setConsultModalOpen(true)}
              className="w-full sm:w-auto px-9 py-4 rounded-xl bg-white hover:bg-neutral-200 text-black font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl cursor-pointer"
            >
              Book Complimentary Assessment
            </button>
          </div>
        </div>
      </section>

      {/* Goal Tracks with Unsplash Photography */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-neutral-200 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Goal-Specific Tracks
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-black mt-1 font-display uppercase tracking-tight">
              Targeted Coaching Specializations.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tracks.map((t, idx) => (
              <div key={idx} className="bg-white border border-neutral-200 rounded-3xl overflow-hidden flex flex-col justify-between shadow-sm hover:border-black transition-all">
                <GymGraphic type={t.graphicType} className="h-44 w-full" />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-black font-display mb-2">{t.title}</h3>
                  <p className="text-xs text-neutral-600 leading-relaxed mb-4">{t.desc}</p>
                  <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Lead Coach:</span>
                    <span className="text-black font-bold">{t.coach}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Packages (Two-Color Black & White Contrast) */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Transparent PT Bundles
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-black mt-2 font-display uppercase tracking-tight">
              1-on-1 Coaching Packages.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all ${
                  pkg.popular
                    ? 'bg-black text-white border-2 border-black shadow-2xl scale-[1.02]'
                    : 'bg-neutral-50 text-neutral-900 border border-neutral-200 shadow-sm'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                    Recommended
                  </span>
                )}

                <div>
                  <h3 className={`text-xl font-black font-display ${pkg.popular ? 'text-white' : 'text-black'}`}>
                    {pkg.name}
                  </h3>
                  <p className={`text-xs mt-1 ${pkg.popular ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    {pkg.tagline}
                  </p>

                  <div className="my-6">
                    <span className={`text-3xl sm:text-4xl font-black font-display ${pkg.popular ? 'text-white' : 'text-black'}`}>
                      {formatPrice(pkg.priceINR)}
                    </span>
                    <span className={`text-xs ml-2 ${pkg.popular ? 'text-neutral-400' : 'text-neutral-500'}`}>
                      / {pkg.sessions} Sessions
                    </span>
                  </div>

                  <div className={`space-y-3 border-t pt-5 mb-8 text-xs ${pkg.popular ? 'border-neutral-800' : 'border-neutral-200'}`}>
                    {pkg.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${pkg.popular ? 'text-white' : 'text-black'}`} />
                        <span className={pkg.popular ? 'text-neutral-200' : 'text-neutral-700'}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setConsultModalOpen(true)}
                  className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    pkg.popular
                      ? 'bg-white hover:bg-neutral-200 text-black shadow-lg'
                      : 'bg-black hover:bg-neutral-800 text-white'
                  }`}
                >
                  Book {pkg.name.split(' (')[0]}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      {consultModalOpen && (
        <Modal
          isOpen={consultModalOpen}
          onClose={() => setConsultModalOpen(false)}
          title="Schedule Your 1-on-1 PT Consultation"
        >
          <form onSubmit={handleConsultSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-neutral-300 mb-1">Select Coach:</label>
              <select
                value={selectedCoachId}
                onChange={(e) => setSelectedCoachId(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 focus:border-white rounded-xl p-3 text-white outline-none"
              >
                {trainers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} - {t.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-neutral-300 mb-1">Primary Fitness Goal:</label>
              <input
                type="text"
                required
                value={consultGoal}
                onChange={(e) => setConsultGoal(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 focus:border-white rounded-xl p-3 text-white outline-none"
                placeholder="e.g. 50kg Deadlift, Marathon endurance, Back rehab"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-300 mb-1">Preferred Consultation Date:</label>
              <input
                type="date"
                required
                value={consultDate}
                onChange={(e) => setConsultDate(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 focus:border-white rounded-xl p-3 text-white outline-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-white text-black font-black text-xs uppercase tracking-wider"
              >
                Confirm Coaching Request
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
