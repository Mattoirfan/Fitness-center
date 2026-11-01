import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  User,
  ArrowRight,
  Download,
  Share2
} from 'lucide-react';
import { FreeTrialLead } from '../types';

export const FreeTrialPage: React.FC = () => {
  const { branches, trainers, submitFreeTrial, showToast } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [branchId, setBranchId] = useState(branches[0].id);
  const [preferredDate, setPreferredDate] = useState('2026-11-04');
  const [preferredTime, setPreferredTime] = useState('06:00 PM');
  const [fitnessGoal, setFitnessGoal] = useState('Strength & Muscle Hypertrophy');
  const [trainerPref, setTrainerPref] = useState('No Preference (Match with Best Coach)');
  const [consent, setConsent] = useState(true);

  const [confirmedPass, setConfirmedPass] = useState<FreeTrialLead | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      showToast('Please accept the privacy terms to book your pass.', 'error');
      return;
    }

    const lead = submitFreeTrial({
      fullName,
      email,
      phone,
      branchId,
      preferredDate,
      preferredTime,
      fitnessGoal,
      trainerPreference: trainerPref
    });

    setConfirmedPass(lead);
    showToast(`Free Pass ${lead.passCode} generated! Confirmation sent to ${email}`, 'success');
  };

  const selectedBranchData = branches.find((b) => b.id === (confirmedPass?.branchId || branchId));

  return (
    <div className="w-full min-h-screen bg-white text-neutral-900">
      {/* Header (Dramatic Black Section) */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-neutral-900 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
            100% Complimentary · Zero Obligation
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mt-2 font-display uppercase tracking-tight">
            Book Your Free 1-Day Trial.
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 mt-3 sm:mt-4 max-w-2xl mx-auto text-balance">
            Experience VOLT firsthand. Access our competition platforms, join any open group class, and receive a 1-on-1 movement screen with a senior coach.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-5xl mx-auto">
          {confirmedPass ? (
            /* Digital Free Pass Ticket Card */
            <div className="max-w-xl mx-auto bg-black text-white border-2 border-black rounded-3xl p-6 sm:p-10 shadow-2xl text-center animate-in fade-in duration-300">
              <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-white text-black mx-auto flex items-center justify-center mb-4">
                <CheckCircle2 className="w-7 sm:w-8 h-7 sm:h-8" />
              </div>

              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white text-black">
                VIP Guest Pass Active
              </span>

              <h2 className="text-2xl sm:text-3xl font-black text-white mt-4 font-display">
                You’re Ready, {confirmedPass.fullName.split(' ')[0]}!
              </h2>

              <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                Show this digital pass at the reception desk upon arrival at {selectedBranchData?.name}.
              </p>

              {/* Pass Card with QR simulator */}
              <div className="my-6 sm:my-8 p-5 sm:p-6 rounded-2xl bg-neutral-900 border border-neutral-800 text-left space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">
                      Pass Authorization Code
                    </span>
                    <p className="text-lg sm:text-xl font-mono font-black text-white tracking-wider">
                      {confirmedPass.passCode}
                    </p>
                  </div>

                  <div className="w-14 sm:w-16 h-14 sm:h-16 bg-white p-1 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-full h-full text-black" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="2" y="2" width="6" height="6" />
                      <rect x="16" y="2" width="6" height="6" />
                      <rect x="2" y="16" width="6" height="6" />
                      <rect x="10" y="4" width="4" height="2" />
                      <rect x="10" y="10" width="4" height="4" />
                      <rect x="16" y="14" width="4" height="2" />
                      <rect x="14" y="18" width="6" height="4" />
                      <rect x="4" y="10" width="2" height="4" />
                    </svg>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-neutral-400">Date of Visit:</span>
                    <p className="font-bold text-white mt-0.5">{confirmedPass.preferredDate}</p>
                  </div>
                  <div>
                    <span className="text-neutral-400">Time Window:</span>
                    <p className="font-bold text-white mt-0.5">{confirmedPass.preferredTime}</p>
                  </div>
                  <div>
                    <span className="text-neutral-400">Branch:</span>
                    <p className="font-bold text-white mt-0.5">{selectedBranchData?.city}</p>
                  </div>
                  <div>
                    <span className="text-neutral-400">Training Goal:</span>
                    <p className="font-bold text-white mt-0.5 truncate">{confirmedPass.fitnessGoal}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => window.print()}
                  className="px-6 py-3 rounded-xl bg-white hover:bg-neutral-200 text-xs font-bold text-black flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-black" />
                  <span>Download / Print Pass</span>
                </button>
                <button
                  onClick={() => {
                    setConfirmedPass(null);
                    setFullName('');
                  }}
                  className="px-6 py-3 rounded-xl bg-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white"
                >
                  Book for a Friend
                </button>
              </div>

              <p className="text-[11px] text-neutral-400 mt-5">
                Need to reschedule? Call {selectedBranchData?.phone} at least 1 hour prior.
              </p>
            </div>
          ) : (
            /* Booking Form */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-start">
              {/* Form Col */}
              <div className="lg:col-span-2 bg-white border border-neutral-200 rounded-3xl p-6 sm:p-10 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Arjun Patel"
                        className="w-full bg-neutral-50 border border-neutral-300 focus:border-black rounded-xl px-4 py-3 text-sm text-black placeholder:text-neutral-400 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="arjun@example.com"
                        className="w-full bg-neutral-50 border border-neutral-300 focus:border-black rounded-xl px-4 py-3 text-sm text-black placeholder:text-neutral-400 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-neutral-50 border border-neutral-300 focus:border-black rounded-xl px-4 py-3 text-sm text-black placeholder:text-neutral-400 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                        Select Club Branch *
                      </label>
                      <select
                        value={branchId}
                        onChange={(e) => setBranchId(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-300 focus:border-black rounded-xl px-4 py-3 text-sm text-black outline-none cursor-pointer"
                      >
                        {branches.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name} ({b.city})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                        Preferred Trial Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-300 focus:border-black rounded-xl px-4 py-3 text-sm text-black outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                        Preferred Time Window *
                      </label>
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-300 focus:border-black rounded-xl px-4 py-3 text-sm text-black outline-none"
                      >
                        <option value="06:30 AM (Early Morning)">06:30 AM (Early Morning)</option>
                        <option value="08:30 AM (Morning Conditioning)">08:30 AM (Morning Conditioning)</option>
                        <option value="12:00 PM (Mid-Day Lift)">12:00 PM (Mid-Day Lift)</option>
                        <option value="05:30 PM (Evening Peak)">05:30 PM (Evening Peak)</option>
                        <option value="07:30 PM (Night Sessions)">07:30 PM (Night Sessions)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                        Primary Training Focus
                      </label>
                      <select
                        value={fitnessGoal}
                        onChange={(e) => setFitnessGoal(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-300 focus:border-black rounded-xl px-4 py-3 text-sm text-black outline-none"
                      >
                        <option value="Strength & Muscle Hypertrophy">Strength & Muscle Hypertrophy</option>
                        <option value="Fat Loss & Caloric Conditioning">Fat Loss & Caloric Conditioning</option>
                        <option value="VO2 Max & Aerobic Engine">VO2 Max & Aerobic Engine</option>
                        <option value="Mobility & Joint Rehab">Mobility & Joint Rehab</option>
                        <option value="General Health & Well-being">General Health & Well-being</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                        Coach Preference (Optional)
                      </label>
                      <select
                        value={trainerPref}
                        onChange={(e) => setTrainerPref(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-300 focus:border-black rounded-xl px-4 py-3 text-sm text-black outline-none"
                      >
                        <option value="No Preference (Best Match)">No Preference (Match with Best Coach)</option>
                        {trainers.map((t) => (
                          <option key={t.id} value={t.name}>
                            {t.name} ({t.specialties[0]})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 w-4 h-4 accent-black cursor-pointer shrink-0"
                    />
                    <label htmlFor="consent" className="text-xs text-neutral-600 leading-relaxed cursor-pointer">
                      I agree to receive booking confirmation and visit instructions via WhatsApp and email. VOLT safeguards your personal health data under the DPDP Act.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-black hover:bg-neutral-800 text-white font-black text-sm uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Instant 1-Day Free Pass</span>
                  </button>
                </form>
              </div>

              {/* Sidebar perks */}
              <div className="space-y-6">
                <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-7 shadow-sm">
                  <h3 className="text-lg font-bold text-black font-display mb-4">
                    What’s Included in Your Free Pass:
                  </h3>
                  <ul className="space-y-3 text-xs text-neutral-700">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                      <span>Full day access to barbell platforms, turf & machines</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                      <span>1 complimentary group class of your choice</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                      <span>15-minute movement pattern screen with coach</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                      <span>Infrared sauna & contrast cold plunge session</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                      <span>Fresh towel service & secure biometric locker</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-neutral-100 border border-neutral-200 rounded-3xl p-6 text-xs text-neutral-600">
                  <div className="flex items-center gap-2 text-black font-bold mb-2">
                    <ShieldCheck className="w-4 h-4 text-black" />
                    <span>Zero Sales Pressure</span>
                  </div>
                  <p className="leading-relaxed">
                    We let our equipment and culture speak for itself. You will never encounter aggressive sales reps or compulsory contracts.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
