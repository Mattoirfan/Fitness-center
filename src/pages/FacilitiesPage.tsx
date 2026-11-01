import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GymGraphic } from '../components/common/GymGraphic';
import {
  Check,
  ShieldCheck,
  Droplets,
  Wind,
  Car,
  Accessibility,
  ArrowRight,
  Dumbbell
} from 'lucide-react';

export const FacilitiesPage: React.FC = () => {
  const { navigate, selectedBranch } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const facilityList = [
    {
      id: 'strength-platforms',
      name: 'Olympic Lifting Platforms & Free Weights',
      category: 'Weights',
      graphicType: 'strength' as const,
      specs: '6,500 sq ft · 8 Competition Racks · Eleiko IWF Certified',
      description: 'Engineered for competitive powerlifters and strength enthusiasts. Features certified calibrated steel discs, deadlift jacks, safety squat bars, and urethane dumbbells graduating from 2.5kg up to 60kg.',
      highlights: [
        'Eleiko IPF Competition Barbells & Bumper Sets',
        '8 Fully Integrated Rogue Monster Series Racks',
        'Laser-cut acoustic vibration-absorbing platforms',
        'Extensive dumbbell racks with 2.5kg micro-increments'
      ]
    },
    {
      id: 'functional-turf',
      name: '35m Sprint Turf & Functional Sled Track',
      category: 'Functional',
      graphicType: 'hiit' as const,
      specs: 'High-density dual-lane sprint turf with yard markings',
      description: 'Dedicated athletic performance corridor for sled drives, farmer carries, agility drills, plyometrics, and battle rope complexes. Seamlessly connected to the outdoor conditioning balcony.',
      highlights: [
        'Torque Tank M4 magnetic resistance sleds',
        'Dynamax medicine ball target wall',
        'Gymnastic wood rings and pull-up suspension grid',
        'Bulgarian bags and competition kettlebells up to 48kg'
      ]
    },
    {
      id: 'cardio-theatre',
      name: 'Biometric Cardio Lab & Ergometers',
      category: 'Cardio',
      graphicType: 'cycling' as const,
      specs: '3,200 sq ft · 40+ Connected Consoles · Woodway & Concept2',
      description: 'Cardiovascular training powered by non-motorized Woodway curve treadmills that recruit 30% more posterior chain musculature, plus Concept2 RowErgs and SkiErgs equipped with PM5 telemetry monitors.',
      highlights: [
        'Woodway Curve 4Front slat belt treadmills',
        'Concept2 RowErgs, SkiErgs and BikeErgs',
        'Matrix Climbmills with individual cooling fans',
        'Medical InBody 770 Body Composition Analyzer'
      ]
    },
    {
      id: 'recovery-suite',
      name: 'Contrast Recovery & Infrared Sauna',
      category: 'Recovery',
      graphicType: 'recovery' as const,
      specs: 'Thermal suite with 5°C filtered cold plunges & cedar sauna',
      description: 'Scientific recovery suite configured for rapid muscle restoration and parasympathetic nervous system reboot. Alternating thermal heat shock with cold shock reduces delayed onset muscle soreness (DOMS).',
      highlights: [
        'Commercial filtered cold plunge tubs regulated to 5°C',
        'Clearlight Sanctuary full-spectrum infrared cedar sauna',
        'Normatec 3 pneumatic compression boots lounge',
        'Hyperice Hypervolt percussion massage bar'
      ]
    },
    {
      id: 'executive-amenities',
      name: 'Executive Locker Rooms & Hydro Bar',
      category: 'Amenities',
      graphicType: 'amenities' as const,
      specs: 'Biometric RFID lockers · Rain showers · Fresh shake bar',
      description: 'Spacious, impeccably sanitized changing quarters equipped with keyless RFID lockers, private high-pressure hot rain showers, Dyson Supersonic hair care, and a fresh organic protein shake bar.',
      highlights: [
        'Keyless RFID contactless locker units',
        'Private rainfall showers with premium toiletries',
        'Dyson Supersonic styling stations',
        'Hydro Bar serving fresh whey/vegan protein and electrolytes'
      ]
    }
  ];

  const filtered = activeCategory === 'all'
    ? facilityList
    : facilityList.filter(f => f.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="w-full min-h-screen bg-white text-neutral-900">
      {/* Header (Dramatic Black Section) */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-neutral-900 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
            Tournament-Grade Infrastructure
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mt-2 font-display uppercase tracking-tight">
            Facilities Engineered for Athletes.
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 mt-4 max-w-2xl mx-auto text-balance">
            Every square foot is designed for uncompromised athletic progress. Tour our 5 dedicated zones across {selectedBranch.city}.
          </p>

          {/* Category Filter Tabs */}
          <div className="mt-8 flex items-center justify-center gap-1.5 flex-wrap">
            {['all', 'Weights', 'Functional', 'Cardio', 'Recovery', 'Amenities'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-white text-black'
                    : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
                }`}
              >
                {cat === 'all' ? 'All Zones' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Cards List (Clean Light Grey & White Section with Unsplash Photos) */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          {filtered.map((item, index) => (
            <div
              key={item.id}
              className="bg-white border border-neutral-200 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-sm hover:border-black transition-all"
            >
              {/* Graphic Column with Unsplash Photo */}
              <div className={`lg:col-span-5 relative min-h-[260px] sm:min-h-[340px] ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <GymGraphic type={item.graphicType} className="w-full h-full" badge={item.category} />
              </div>

              {/* Text Specs Column */}
              <div className={`lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                      Zone 0{index + 1}
                    </span>
                    <span className="text-neutral-300">·</span>
                    <span className="text-xs font-bold text-neutral-600">{item.specs}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-black font-display tracking-tight">
                    {item.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 mt-3 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-6 pt-6 border-t border-neutral-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-3">
                      Equipment & Facility Highlights:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-neutral-700">
                      {item.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-black shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <button
                    onClick={() => navigate('/free-trial')}
                    className="px-6 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Experience on Free Pass
                  </button>
                  <button
                    onClick={() => navigate('/schedule')}
                    className="text-xs font-bold text-neutral-700 hover:text-black hover:underline"
                  >
                    View Timetable →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sanitation & Amenities Strip */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-black text-black font-display uppercase tracking-tight">
              Hospitality & Hygiene Standards
            </h3>
            <p className="text-xs text-neutral-600 mt-1">
              Every VOLT facility adheres to rigorous acoustic, atmospheric, and sanitary protocols.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200">
              <Wind className="w-6 h-6 text-black mx-auto mb-2" />
              <strong className="text-xs sm:text-sm text-black block">HEPA-14 Air Filtration</strong>
              <p className="text-[11px] text-neutral-500 mt-1">Full oxygen exchange every 8 mins</p>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200">
              <Droplets className="w-6 h-6 text-black mx-auto mb-2" />
              <strong className="text-xs sm:text-sm text-black block">UV-C Sanitation</strong>
              <p className="text-[11px] text-neutral-500 mt-1">Locker rooms sanitized after every peak hour</p>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200">
              <Car className="w-6 h-6 text-black mx-auto mb-2" />
              <strong className="text-xs sm:text-sm text-black block">Complimentary Valet</strong>
              <p className="text-[11px] text-neutral-500 mt-1">Underground parking at all branches</p>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200">
              <Accessibility className="w-6 h-6 text-black mx-auto mb-2" />
              <strong className="text-xs sm:text-sm text-black block">Accessible Ramps & Lifts</strong>
              <p className="text-[11px] text-neutral-500 mt-1">Full wheelchair compliance across floors</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
