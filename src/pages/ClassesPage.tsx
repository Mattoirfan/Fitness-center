import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GymGraphic } from '../components/common/GymGraphic';
import { Modal } from '../components/common/Modal';
import {
  Flame,
  Clock,
  User,
  Users,
  CheckCircle,
  Calendar,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { GymClass } from '../types';

export const ClassesPage: React.FC = () => {
  const { classes, schedules, bookClass, user, navigate } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedIntensity, setSelectedIntensity] = useState<string>('all');
  const [activeDetailClass, setActiveDetailClass] = useState<GymClass | null>(null);
  const [bookingClass, setBookingClass] = useState<GymClass | null>(null);

  const categories = ['all', 'Strength', 'HIIT', 'Yoga', 'Pilates', 'Cycling', 'Combat'];
  const intensities = ['all', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'];

  const filteredClasses = classes.filter((c) => {
    const matchesCat = selectedCategory === 'all' || c.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesInt = selectedIntensity === 'all' || c.intensity.toLowerCase() === selectedIntensity.toLowerCase();
    return matchesCat && matchesInt;
  });

  const handleBookClick = (gymClass: GymClass) => {
    setBookingClass(gymClass);
  };

  return (
    <div className="w-full min-h-screen bg-white text-neutral-900">
      {/* Header (Dramatic Black Section) */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-neutral-900 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
            Group Energy & Athletic Conditioning
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mt-2 font-display uppercase tracking-tight">
            Signature Fitness Classes.
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 mt-3 sm:mt-4 max-w-2xl mx-auto text-balance">
            Led by certified sports coaches with heart-rate tracking, progressive programming, and strict capacity caps for personalized instruction.
          </p>

          {/* Filter Bar */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? 'bg-white text-black'
                      : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
                  }`}
                >
                  {cat === 'all' ? 'All Formats' : cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-1.5 text-xs text-neutral-300">
              <span className="text-neutral-400">Intensity:</span>
              <select
                value={selectedIntensity}
                onChange={(e) => setSelectedIntensity(e.target.value)}
                className="bg-transparent text-white font-bold outline-none cursor-pointer"
              >
                {intensities.map((lvl) => (
                  <option key={lvl} value={lvl} className="bg-neutral-900 text-white">
                    {lvl === 'all' ? 'Any Level' : lvl}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Classes Grid (Clean White Canvas with Unsplash Photos) */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredClasses.map((c) => {
              const graphicTypeMap: Record<string, 'strength' | 'hiit' | 'yoga' | 'pilates' | 'cycling' | 'combat'> = {
                Strength: 'strength',
                HIIT: 'hiit',
                Yoga: 'yoga',
                Pilates: 'pilates',
                Cycling: 'cycling',
                Combat: 'combat',
                Conditioning: 'hiit'
              };
              const graphicType = graphicTypeMap[c.category] || 'strength';

              return (
                <div
                  key={c.id}
                  className="bg-white border border-neutral-200 hover:border-black rounded-3xl overflow-hidden flex flex-col justify-between transition-all group shadow-sm"
                >
                  <div>
                    <GymGraphic
                      type={graphicType}
                      className="h-44 sm:h-52 w-full"
                      badge={c.intensity}
                    />

                    <div className="p-6">
                      <div className="flex items-center justify-between text-xs text-neutral-500 mb-2 font-mono">
                        <span className="text-black font-bold uppercase">{c.category}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {c.durationMinutes} min
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-black font-display mb-2 group-hover:underline transition-colors">
                        {c.name}
                      </h3>

                      <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3 mb-4">
                        {c.description}
                      </p>

                      <div className="space-y-1.5 text-xs text-neutral-600 border-t border-neutral-100 pt-4">
                        <div className="flex items-center justify-between">
                          <span className="text-neutral-400">Studio Room:</span>
                          <span className="text-black font-medium">{c.room}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-neutral-400">Coach:</span>
                          <span className="text-black font-medium">{c.trainerName}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-neutral-400">Capacity Cap:</span>
                          <span className="text-black font-bold">{c.capacity} Members max</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex items-center gap-3">
                    <button
                      onClick={() => setActiveDetailClass(c)}
                      className="flex-1 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-xs font-bold text-black transition-colors border border-neutral-200 cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => handleBookClick(c)}
                      className="flex-1 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer"
                    >
                      Book Class
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 sm:mt-16 text-center">
            <button
              onClick={() => navigate('/schedule')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>Open Live Interactive Timetable</span>
            </button>
          </div>
        </div>
      </section>

      {/* Class Details Modal */}
      {activeDetailClass && (
        <Modal
          isOpen={!!activeDetailClass}
          onClose={() => setActiveDetailClass(null)}
          title={activeDetailClass.name}
          maxWidth="max-w-xl"
        >
          <div className="space-y-4 text-xs sm:text-sm text-neutral-300">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-lg bg-white text-black font-bold uppercase">
                {activeDetailClass.category}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-neutral-800 text-white border border-neutral-700 font-medium">
                {activeDetailClass.intensity}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-neutral-800 text-neutral-300 border border-neutral-700">
                {activeDetailClass.durationMinutes} Minutes
              </span>
            </div>

            <p className="text-neutral-300 leading-relaxed">
              {activeDetailClass.description}
            </p>

            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-400">Calorie Expenditure:</span>
                <span className="text-white font-bold">~{activeDetailClass.caloriesBurnedEstimate} kcal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Studio Room:</span>
                <span className="text-white font-bold">{activeDetailClass.room}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Required Equipment:</span>
                <span className="text-white font-medium">{activeDetailClass.equipmentNeeded.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Cancellation Policy:</span>
                <span className="text-white font-semibold">Cancel free up to 2h before class</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  const target = activeDetailClass;
                  setActiveDetailClass(null);
                  handleBookClick(target);
                }}
                className="w-full py-3.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-black text-xs uppercase tracking-wider cursor-pointer"
              >
                Proceed to Book Spot
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Book Slot Modal */}
      {bookingClass && (
        <Modal
          isOpen={!!bookingClass}
          onClose={() => setBookingClass(null)}
          title={`Reserve: ${bookingClass.name}`}
          maxWidth="max-w-lg"
        >
          <div className="space-y-4">
            <p className="text-xs text-neutral-400">
              Select an upcoming session for {bookingClass.name}:
            </p>

            <div className="space-y-2.5 max-h-60 overflow-y-auto">
              {schedules
                .filter((s) => s.classId === bookingClass.id)
                .map((sch) => {
                  const seatsLeft = sch.capacity - sch.bookedCount;
                  const isFull = seatsLeft <= 0;

                  return (
                    <div
                      key={sch.id}
                      className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <p className="font-bold text-white">{sch.dayOfWeek} at {sch.time}</p>
                        <p className="text-[11px] text-neutral-400">Room: {bookingClass.room}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`font-mono text-[11px] font-bold ${isFull ? 'text-red-400' : 'text-white'}`}>
                          {isFull ? 'FULL' : `${seatsLeft} spots left`}
                        </span>

                        <button
                          disabled={isFull}
                          onClick={() => {
                            const res = bookClass(sch.id);
                            if (res.success) {
                              setBookingClass(null);
                            }
                          }}
                          className={`px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer ${
                            isFull
                              ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                              : 'bg-white hover:bg-neutral-200 text-black'
                          }`}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  );
                })}

              {schedules.filter((s) => s.classId === bookingClass.id).length === 0 && (
                <div className="text-center py-6 text-xs text-neutral-400">
                  No upcoming open slots for this exact class this week.
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
