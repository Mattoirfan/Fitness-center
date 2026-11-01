import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GymGraphic } from '../components/common/GymGraphic';
import { Modal } from '../components/common/Modal';
import {
  Star,
  Award,
  Calendar,
  Clock,
  ArrowLeft,
  CheckCircle,
  Shield,
  MessageSquare
} from 'lucide-react';

interface TrainerDetailPageProps {
  slug: string;
}

export const TrainerDetailPage: React.FC<TrainerDetailPageProps> = ({ slug }) => {
  const { trainers, schedules, classes, navigate, showToast } = useApp();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2026-11-05');

  const trainer = trainers.find((t) => t.slug === slug) || trainers[0];
  const trainerSchedules = schedules.filter((s) => s.trainerId === trainer.id);

  const handleSessionBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingModalOpen(false);
    showToast(`1-on-1 assessment booked with ${trainer.name}! Check your email for details.`, 'success');
  };

  return (
    <div className="w-full min-h-screen bg-white text-neutral-900">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => navigate('/trainers')}
          className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Coaches</span>
        </button>
      </div>

      {/* Main Profile Header */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 items-center">
              {/* Avatar & Badges with Real Unsplash Coach Photo */}
              <div className="flex flex-col items-center text-center">
                <div className="w-32 sm:w-44 h-32 sm:h-44 rounded-3xl overflow-hidden border-2 border-black shadow-xl mb-4 sm:mb-5">
                  <GymGraphic type={trainer.id as any} className="w-full h-full" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-black font-display tracking-tight">{trainer.name}</h1>
                <p className="text-xs sm:text-sm font-bold text-neutral-500 uppercase tracking-wider mt-1">{trainer.title}</p>
                <div className="flex items-center gap-1 text-black text-xs sm:text-sm font-bold mt-2 font-mono">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{trainer.rating} / 5.0</span>
                  <span className="text-neutral-500 text-xs">({trainer.sessionsCompleted}+ sessions)</span>
                </div>

                <div className="mt-6 w-full">
                  <button
                    onClick={() => setBookingModalOpen(true)}
                    className="w-full py-3.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer"
                  >
                    Book 1-on-1 Session
                  </button>
                </div>
              </div>

              {/* Bio & Philosophy */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-black uppercase tracking-wider mb-2 font-mono">
                    Professional Biography
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{trainer.bio}</p>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-black uppercase tracking-wider mb-2 font-mono">
                    Coaching Philosophy
                  </h3>
                  <blockquote className="p-4 rounded-2xl bg-white border-l-4 border-black text-xs sm:text-sm text-neutral-800 italic">
                    &ldquo;{trainer.philosophy}&rdquo;
                  </blockquote>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-200 text-xs">
                  <div>
                    <span className="text-neutral-500 block">Experience:</span>
                    <strong className="text-black text-sm">{trainer.experienceYears} Years</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Languages:</span>
                    <strong className="text-black text-sm">{trainer.languages.join(', ')}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Club Availability:</span>
                    <strong className="text-black text-sm">{trainer.availability}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Studio Sessions */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {/* Credentials */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-black font-display mb-4 uppercase tracking-wider">
              Accreditations & Certifications
            </h3>
            <div className="space-y-3">
              {trainer.certifications.map((cert, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-neutral-200">
                  <Award className="w-5 h-5 text-black shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-black">{cert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Group Classes Led */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-black font-display mb-4 uppercase tracking-wider">
              Classes Led by {trainer.name.split(' ')[0]}
            </h3>
            <div className="space-y-3">
              {trainerSchedules.map((sch) => {
                const c = classes.find((cl) => cl.id === sch.classId);
                return (
                  <div key={sch.id} className="p-3.5 rounded-xl bg-white border border-neutral-200 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-black">{c?.name}</p>
                      <p className="text-neutral-500 text-[11px]">{sch.dayOfWeek} at {sch.time}</p>
                    </div>
                    <button
                      onClick={() => navigate('/schedule')}
                      className="px-3 py-1.5 rounded-lg bg-black text-white font-bold text-xs"
                    >
                      View Schedule
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {bookingModalOpen && (
        <Modal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          title={`Book 1-on-1 Consultation: ${trainer.name}`}
        >
          <form onSubmit={handleSessionBooking} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-neutral-300 mb-1">Preferred Date:</label>
              <input
                type="date"
                required
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 focus:border-white rounded-xl p-3 text-white outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-neutral-300 mb-1">Primary Training Objective:</label>
              <select className="w-full bg-neutral-900 border border-neutral-700 focus:border-white rounded-xl p-3 text-white outline-none">
                <option>Barbell Strength & Hypertrophy</option>
                <option>Injury Rehabilitation & Mobility</option>
                <option>VO2 Max & Athletic Conditioning</option>
                <option>Postural Correction & Desk Worker Relief</option>
              </select>
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-white text-black font-black text-xs uppercase tracking-wider"
              >
                Confirm Coaching Reservation
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
