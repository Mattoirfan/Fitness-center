import React from 'react';
import { useApp } from '../context/AppContext';
import { GymGraphic } from '../components/common/GymGraphic';
import {
  Shield,
  Target,
  Flame,
  Award,
  Users,
  Compass,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate, trainers } = useApp();

  const values = [
    {
      title: 'Evidence-Based Biomechanics',
      desc: 'We reject training fads and gimmicks. Every movement pattern, exercise selection, and load prescription is rooted in sports physiology and musculoskeletal science.'
    },
    {
      title: 'Culture of Respect & Focus',
      desc: 'No intimidating egos, no tripods blocking walkways, and zero equipment hoarding. We cultivate a serious, welcoming atmosphere for anyone dedicated to physical progress.'
    },
    {
      title: 'Competition-Grade Equipment',
      desc: 'We invest exclusively in tournament-certified Eleiko barbells, calibrated steel discs, Woodway curved treadmills, and heavy-gauge steel rigs engineered to endure decades of rigorous training.'
    },
    {
      title: 'Complete Lifecycle Care',
      desc: 'True strength requires equal dedication to restoration. From infrared thermal saunas and 5°C cold plunges to clinical mobility coaching, recovery is integral to every program.'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-white text-neutral-900">
      {/* Editorial Header (Dramatic Black Section) */}
      <section className="relative py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-neutral-900 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
            Our Heritage & Philosophy
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mt-3 font-display uppercase tracking-tight">
            Built for Pure Human Potential.
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 mt-4 leading-relaxed max-w-2xl mx-auto text-balance">
            VOLT was founded on a simple conviction: modern gym environments had sacrificed serious athletic standards for generic machines and marketing fluff. We set out to build India’s definitive strength and conditioning sanctuary.
          </p>
        </div>
      </section>

      {/* Brand Story & Vision (Clean White Section with Unsplash Photography) */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              The VOLT Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-black mt-2 font-display tracking-tight">
              Where Precision Engineering Meets Athletic Grit.
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-neutral-600 mt-6 leading-relaxed">
              <p>
                From our flagship Indiranagar location in Bengaluru to our executive facilities in Mumbai BKC and Gurugram, VOLT provides an uncompromising training ecosystem for athletes, founders, executives, and fitness devotees.
              </p>
              <p>
                We do not compromise on barbell knurling, acoustic rubber thickness, or air filtration. Our air exchange systems run medical-grade HEPA filtration every 8 minutes, maintaining pristine indoor oxygen levels even during high-density evening sessions.
              </p>
              <p>
                Whether your objective is adding 50 kilograms to your competition deadlift, increasing your VO2 max for marathon endurance, or rehabilitating a chronic desk-bound lumbar spine, VOLT provides the physical canvas and coaching expertise to achieve it.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('/facilities')}
                className="px-7 py-3.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                Inspect Facilities
              </button>
              <button
                onClick={() => navigate('/trainers')}
                className="px-7 py-3.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-black border border-neutral-200 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Meet Coaches
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <GymGraphic type="strength" className="h-44 sm:h-64 rounded-2xl" overlayText="Heavy Iron Floor" />
            <GymGraphic type="hiit" className="h-44 sm:h-64 rounded-2xl" overlayText="Sprint Turf" />
            <GymGraphic type="yoga" className="h-44 sm:h-64 rounded-2xl" overlayText="Mind-Body Studio" />
            <GymGraphic type="recovery" className="h-44 sm:h-64 rounded-2xl" overlayText="Thermal Sauna" />
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-neutral-200 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Guiding Directives
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-black mt-2 font-display tracking-tight">
              Our 4 Pillars of Athletic Longevity.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-sm">
                <span className="text-xs font-mono font-bold text-black bg-neutral-100 px-3 py-1 rounded-lg">
                  Pillar 0{i + 1}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-black mt-4 font-display">{v.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Coaches Preview */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Approved Coaching Staff
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-black mt-1 font-display tracking-tight">
                Certified. Experienced. Accountable.
              </h2>
            </div>
            <button
              onClick={() => navigate('/trainers')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-black hover:underline"
            >
              <span>View Full Directory & Book 1-on-1</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trainers.map((t) => (
              <div
                key={t.id}
                onClick={() => navigate(`/trainers/${t.slug}`)}
                className="bg-neutral-50 border border-neutral-200 hover:border-black rounded-2xl overflow-hidden p-5 flex flex-col justify-between cursor-pointer transition-all shadow-sm"
              >
                <div>
                  <GymGraphic type={t.id as any} className="h-44 w-full rounded-xl mb-4" />
                  <h4 className="text-base font-bold text-black">{t.name}</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">{t.title}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-between text-xs">
                  <span className="text-neutral-500">{t.experienceYears} Years Exp</span>
                  <span className="font-bold text-black">Profile →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
