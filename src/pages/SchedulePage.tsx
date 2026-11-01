import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Users,
  CheckCircle,
  Filter,
  AlertCircle,
  Sparkles
} from 'lucide-react';

export const SchedulePage: React.FC = () => {
  const {
    schedules,
    classes,
    trainers,
    branches,
    selectedBranch,
    setSelectedBranch,
    bookClass,
    userBookings,
    user,
    navigate,
    showToast
  } = useApp();

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ] as const;

  const [activeDay, setActiveDay] = useState<string>('Monday');
  const [trainerFilter, setTrainerFilter] = useState<string>('all');
  const [classFilter, setClassFilter] = useState<string>('all');

  const filteredSchedules = schedules.filter((s) => {
    const matchesDay = s.dayOfWeek === activeDay;
    const matchesTrainer = trainerFilter === 'all' || s.trainerId === trainerFilter;
    const matchesClass = classFilter === 'all' || s.classId === classFilter;
    return matchesDay && matchesTrainer && matchesClass;
  });

  const isUserBooked = (scheduleId: string) => {
    return userBookings.some(
      (b) => b.scheduleId === scheduleId && b.userId === user?.id && b.status === 'confirmed'
    );
  };

  const handleWaitlistJoin = (schId: string) => {
    showToast('You have been placed #1 on the waitlist. We will notify you if a slot opens!', 'info');
  };

  return (
    <div className="w-full min-h-screen bg-white text-neutral-900">
      {/* Header (Dramatic Black Section) */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-neutral-900 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
            Live Timetable & Capacity
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mt-2 font-display uppercase tracking-tight">
            Weekly Class Schedule.
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 mt-3 sm:mt-4 max-w-2xl mx-auto text-balance">
            Real-time seat availability for strength rigs, sprint turf HIIT, and mind-body studios at {selectedBranch.name}.
          </p>

          {/* Branch Picker */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-neutral-900 border border-neutral-700 text-xs shadow-md">
            <span className="text-neutral-400">Location:</span>
            <select
              value={selectedBranch.id}
              onChange={(e) => {
                const b = branches.find((br) => br.id === e.target.value);
                if (b) setSelectedBranch(b);
              }}
              className="bg-transparent text-white font-bold outline-none cursor-pointer"
            >
              {branches.map((b) => (
                <option key={b.id} value={b.id} className="bg-neutral-900">
                  {b.name} ({b.city})
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Main Schedule Container */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          {/* Day of Week Horizontal Touch Slider for mobile & desktop */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 sm:mb-8 border-b border-neutral-200 no-scrollbar">
            {daysOfWeek.map((day) => {
              const countForDay = schedules.filter((s) => s.dayOfWeek === day).length;
              return (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                    activeDay === day
                      ? 'bg-black text-white shadow-lg'
                      : 'bg-white text-neutral-600 hover:text-black border border-neutral-200'
                  }`}
                >
                  <span>{day}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                      activeDay === day ? 'bg-neutral-800 text-white font-bold' : 'bg-neutral-100 text-neutral-500'
                    }`}
                  >
                    {countForDay}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Secondary Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 sm:mb-8 text-xs text-neutral-600">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap w-full sm:w-auto">
              <div className="flex items-center gap-2 bg-white border border-neutral-200 rounded-xl px-3 py-2 flex-1 sm:flex-none">
                <Filter className="w-3.5 h-3.5 text-black" />
                <span>Format:</span>
                <select
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                  className="bg-transparent text-black font-bold outline-none cursor-pointer"
                >
                  <option value="all">All Formats</option>
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 bg-white border border-neutral-200 rounded-xl px-3 py-2 flex-1 sm:flex-none">
                <User className="w-3.5 h-3.5 text-black" />
                <span>Coach:</span>
                <select
                  value={trainerFilter}
                  onChange={(e) => setTrainerFilter(e.target.value)}
                  className="bg-transparent text-black font-bold outline-none cursor-pointer"
                >
                  <option value="all">All Coaches</option>
                  {trainers.map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <p className="text-neutral-500 text-[11px] sm:text-xs">
              Showing {filteredSchedules.length} scheduled sessions for {activeDay}
            </p>
          </div>

          {/* Sessions List (High-Contrast White Cards) */}
          <div className="space-y-4">
            {filteredSchedules.map((item) => {
              const gymClass = classes.find((c) => c.id === item.classId);
              const trainer = trainers.find((tr) => tr.id === item.trainerId);
              const remaining = item.capacity - item.bookedCount;
              const isFull = remaining <= 0;
              const alreadyBooked = isUserBooked(item.id);

              return (
                <div
                  key={item.id}
                  className="bg-white border border-neutral-200 hover:border-black rounded-3xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all shadow-sm"
                >
                  {/* Time & Class Info */}
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div className="w-20 sm:w-24 text-center shrink-0 border-r border-neutral-200 pr-3 sm:pr-4">
                      <span className="text-lg sm:text-xl font-black text-black font-display block">
                        {item.time.split(' ')[0]}
                      </span>
                      <span className="text-xs font-bold text-neutral-500 uppercase">
                        {item.time.split(' ')[1]}
                      </span>
                      <span className="text-[10px] text-neutral-400 block mt-0.5 font-mono">
                        {gymClass?.durationMinutes} min
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-lg bg-neutral-100 text-black border border-neutral-200">
                          {gymClass?.category}
                        </span>
                        <span className="text-xs text-neutral-500">
                          Studio: {gymClass?.room}
                        </span>
                      </div>

                      <h4 className="text-lg font-black text-black font-display">
                        {gymClass?.name}
                      </h4>

                      <div className="flex items-center gap-3 text-xs text-neutral-600 mt-1">
                        <span className="flex items-center gap-1 font-medium text-black">
                          <User className="w-3.5 h-3.5" />
                          {trainer?.name}
                        </span>
                        <span>·</span>
                        <span className="text-neutral-500">Level: {gymClass?.intensity}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Seat Status */}
                  <div className="flex items-center justify-between md:justify-end gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-neutral-100">
                    <div className="text-left md:text-right">
                      <span className={`text-xs font-bold font-mono block ${isFull ? 'text-red-500' : 'text-black'}`}>
                        {isFull ? 'CAPACITY FULL' : `${remaining} Seats Available`}
                      </span>
                      <div className="w-24 sm:w-28 bg-neutral-200 h-1.5 rounded-full overflow-hidden mt-1">
                        <div
                          className="bg-black h-full rounded-full transition-all"
                          style={{ width: `${(item.bookedCount / item.capacity) * 100}%` }}
                        />
                      </div>
                    </div>

                    {alreadyBooked ? (
                      <span className="px-4 py-2 rounded-xl bg-neutral-100 border border-neutral-300 text-xs font-bold text-black flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-black" />
                        <span>Reserved</span>
                      </span>
                    ) : isFull ? (
                      <button
                        onClick={() => handleWaitlistJoin(item.id)}
                        className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-xs font-bold text-neutral-700 transition-colors border border-neutral-200 cursor-pointer"
                      >
                        Join Waitlist
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          const res = bookClass(item.id);
                          if (res.success && !user) {
                            navigate('/login');
                          }
                        }}
                        className="px-5 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                      >
                        Book Spot
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {filteredSchedules.length === 0 && (
              <div className="text-center py-12 bg-white rounded-3xl border border-neutral-200 text-neutral-500 text-xs">
                No classes scheduled matching your filter criteria on {activeDay}. Try selecting another day or category.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
