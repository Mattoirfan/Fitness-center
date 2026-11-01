import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GymGraphic } from '../components/common/GymGraphic';
import {
  Search,
  Star,
  Award,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export const TrainersPage: React.FC = () => {
  const { trainers, navigate } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const specialties = ['all', 'Powerlifting', 'HIIT', 'Mobility', 'Yoga', 'Strength'];

  const filteredTrainers = trainers.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSpecialty =
      selectedSpecialty === 'all' ||
      t.specialties.some((s) => s.toLowerCase().includes(selectedSpecialty.toLowerCase()));

    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="w-full min-h-screen bg-white text-neutral-900">
      {/* Header (Dramatic Black Section) */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-neutral-900 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
            Sports Science & Performance
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mt-2 font-display uppercase tracking-tight">
            Elite Coaching Staff.
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 mt-3 sm:mt-4 max-w-2xl mx-auto text-balance">
            Every VOLT coach is rigorously vetted, holding internationally accredited CSCS, ACE, or Master of Physiotherapy degrees with proven athlete track records.
          </p>

          {/* Search & Filter */}
          <div className="mt-6 sm:mt-8 max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search coach by name or specialty..."
                className="w-full bg-neutral-900 border border-neutral-700 focus:border-white pl-10 pr-4 py-2.5 rounded-xl text-xs text-white placeholder:text-neutral-500 outline-none"
              />
            </div>

            <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-neutral-300">
              <span className="text-neutral-400">Specialty:</span>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="bg-transparent text-white font-bold outline-none cursor-pointer"
              >
                {specialties.map((s) => (
                  <option key={s} value={s} className="bg-neutral-900 text-white">
                    {s === 'all' ? 'All Specialties' : s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Directory Grid with Real Unsplash Coach Photos */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredTrainers.map((t) => (
              <div
                key={t.id}
                className="bg-white border border-neutral-200 hover:border-black rounded-3xl overflow-hidden flex flex-col justify-between transition-all group shadow-sm"
              >
                <div>
                  {/* Unsplash Headshot */}
                  <GymGraphic
                    type={t.id as any}
                    className="h-56 w-full"
                    badge={`${t.experienceYears} Yrs Exp`}
                  />

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-xl font-bold text-black font-display group-hover:underline transition-colors">
                        {t.name}
                      </h3>
                      <span className="flex items-center gap-1 text-xs font-bold text-black font-mono">
                        <Star className="w-3.5 h-3.5 fill-current" /> {t.rating}
                      </span>
                    </div>

                    <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">{t.title}</p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {t.specialties.map((s, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold text-neutral-700 bg-neutral-100 px-2.5 py-0.5 rounded-md"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-neutral-600 line-clamp-3 mb-4 leading-relaxed">
                      {t.bio}
                    </p>

                    <div className="space-y-1.5 border-t border-neutral-100 pt-4 text-xs text-neutral-600">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Sessions Led:</span>
                        <span className="text-black font-bold font-mono">{t.sessionsCompleted}+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Languages:</span>
                        <span className="text-black font-medium truncate max-w-[120px]">{t.languages.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex gap-2">
                  <button
                    onClick={() => navigate(`/trainers/${t.slug}`)}
                    className="flex-1 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-xs font-bold text-black transition-colors border border-neutral-200 cursor-pointer"
                  >
                    View Bio
                  </button>
                  <button
                    onClick={() => navigate('/personal-training')}
                    className="flex-1 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    Book 1-on-1
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
