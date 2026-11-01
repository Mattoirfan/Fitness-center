import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Modal } from '../components/common/Modal';
import {
  User,
  ShieldCheck,
  Calendar,
  CreditCard,
  Clock,
  Trash2,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Download,
  Dumbbell,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { Order } from '../types';

export const AccountDashboardPage: React.FC = () => {
  const {
    user,
    userBookings,
    cancelBooking,
    membershipPlans,
    orders,
    formatPrice,
    navigate,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'billing' | 'progress'>('overview');
  const [viewInvoice, setViewInvoice] = useState<Order | null>(null);

  if (!user) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-white text-black">
        <div className="w-16 h-16 rounded-2xl bg-neutral-100 border border-neutral-300 flex items-center justify-center text-black mb-4">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-black font-display uppercase tracking-tight">Authentication Required</h2>
        <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-md">
          Please log in to your VOLT membership profile to inspect active reservations, billing receipts, and personal records.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="mt-6 px-7 py-3.5 rounded-xl bg-black text-white font-black text-xs uppercase tracking-wider shadow-lg hover:bg-neutral-800 cursor-pointer"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  const activePlan = membershipPlans.find((p) => p.id === user.activePlanId) || membershipPlans[1];
  const activeBookings = userBookings.filter((b) => b.status === 'confirmed');

  return (
    <div className="w-full min-h-screen bg-white text-neutral-900">
      {/* Top Banner Profile Summary (Dramatic Black Section) */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 border-b border-neutral-900 bg-black text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl bg-white text-black flex items-center justify-center text-xl sm:text-2xl font-black shadow-lg">
              {user.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-white font-display uppercase tracking-tight">{user.name}</h1>
                <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-white text-black">
                  {user.membershipStatus === 'active' ? 'Active Member' : 'Pending Activation'}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">{user.email} · Member since {user.joinedDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/schedule')}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              Book Class
            </button>
            <button
              onClick={() => navigate('/membership')}
              className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-all border border-neutral-700 cursor-pointer"
            >
              Upgrade Plan
            </button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-6 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Overview & Plan' },
            { id: 'bookings', label: `Upcoming Classes (${activeBookings.length})` },
            { id: 'billing', label: 'Billing & Invoices' },
            { id: 'progress', label: 'Metrics & PRs' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-black text-black'
                  : 'border-transparent text-neutral-500 hover:text-black'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Tab Content */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          {/* 1. OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Current Subscription Card */}
                <div className="lg:col-span-2 bg-black text-white border-2 border-black rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div>
                      <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                        Current Subscription
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-tight mt-1">
                        {activePlan.name} Membership
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1">{activePlan.tagline}</p>
                    </div>

                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-neutral-900 text-white border border-neutral-700">
                      Renews {user.membershipExpiry || '2027-05-15'}
                    </span>
                  </div>

                  <div className="my-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-y border-neutral-800 py-4 text-xs">
                    <div>
                      <span className="text-neutral-400 block">Billing Rate:</span>
                      <strong className="text-white text-sm">{formatPrice(activePlan.priceINR)}/mo</strong>
                    </div>
                    <div>
                      <span className="text-neutral-400 block">Studio Classes:</span>
                      <strong className="text-white text-sm">
                        {typeof activePlan.includedClassesPerMonth === 'number'
                          ? `${activePlan.includedClassesPerMonth} / month`
                          : 'Unlimited'}
                      </strong>
                    </div>
                    <div>
                      <span className="text-neutral-400 block">Guest Passes:</span>
                      <strong className="text-white text-sm">{activePlan.guestPassesPerMonth} Remaining</strong>
                    </div>
                    <div>
                      <span className="text-neutral-400 block">Sauna Access:</span>
                      <strong className="text-white text-sm">{activePlan.saunaAccess ? 'Included' : 'Excluded'}</strong>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => navigate('/membership')}
                      className="px-5 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-xs font-bold text-black transition-colors"
                    >
                      Change or Upgrade Tier
                    </button>
                    <button
                      onClick={() => showToast('Membership freeze request submitted for up to 30 days.', 'info')}
                      className="px-5 py-2.5 rounded-xl bg-neutral-900 text-xs font-semibold text-neutral-300 transition-colors border border-neutral-700"
                    >
                      Request Travel Pause
                    </button>
                  </div>
                </div>

                {/* Quick Next Session Card */}
                <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-sm">
                  <div>
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                      Next Confirmed Class
                    </span>
                    {activeBookings.length > 0 ? (
                      <div className="mt-4">
                        <h4 className="text-lg font-bold text-black font-display">
                          {activeBookings[0].className}
                        </h4>
                        <p className="text-xs text-black font-mono font-bold mt-1">
                          {activeBookings[0].dayOfWeek} at {activeBookings[0].time}
                        </p>
                        <p className="text-xs text-neutral-500 mt-2">
                          Coach: {activeBookings[0].trainerName} · {activeBookings[0].branchName}
                        </p>
                      </div>
                    ) : (
                      <div className="mt-4">
                        <p className="text-sm text-neutral-600">No upcoming class reservations.</p>
                        <p className="text-xs text-neutral-400 mt-1">Explore the weekly timetable to book your next session.</p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => navigate('/schedule')}
                    className="mt-6 w-full py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-xs font-bold text-white transition-colors"
                  >
                    View Timetable
                  </button>
                </div>
              </div>

              {/* InBody & Biometrics Summary */}
              <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-black font-display uppercase tracking-wider">
                      Biometric InBody 770 Baseline
                    </h3>
                    <p className="text-xs text-neutral-500">Scanned on October 18, 2026 · Indiranagar Biometric Suite</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-black bg-neutral-100 px-3 py-1 rounded-lg">
                    InBody Score: 88/100
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                    <span className="text-xs text-neutral-500 block">Skeletal Muscle Mass</span>
                    <strong className="text-xl sm:text-2xl font-black text-black font-display mt-1 block">38.4 kg</strong>
                    <span className="text-[11px] text-black font-bold font-mono">+1.2 kg from baseline</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                    <span className="text-xs text-neutral-500 block">Body Fat Percentage</span>
                    <strong className="text-xl sm:text-2xl font-black text-black font-display mt-1 block">13.8%</strong>
                    <span className="text-[11px] text-neutral-500 font-mono">Athletic Range</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                    <span className="text-xs text-neutral-500 block">Visceral Fat Level</span>
                    <strong className="text-xl sm:text-2xl font-black text-black font-display mt-1 block">Level 4</strong>
                    <span className="text-[11px] text-black font-bold font-mono">Optimal</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                    <span className="text-xs text-neutral-500 block">Basal Metabolic Rate</span>
                    <strong className="text-xl sm:text-2xl font-black text-black font-display mt-1 block">1,840 kcal</strong>
                    <span className="text-[11px] text-neutral-500 font-mono">Active Target</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. BOOKINGS TAB */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-black font-display uppercase tracking-wider">
                    Class Reservations & Attendance
                  </h3>
                  <p className="text-xs text-neutral-500">
                    You can cancel with zero penalty up to 2 hours before session start time.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/schedule')}
                  className="px-4 py-2 rounded-xl bg-black text-white text-xs font-bold"
                >
                  Book New Class
                </button>
              </div>

              <div className="space-y-3">
                {userBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-5 rounded-2xl bg-white border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-black text-base">{b.className}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            b.status === 'confirmed'
                              ? 'bg-neutral-100 text-black border border-neutral-300'
                              : 'bg-neutral-200 text-neutral-600'
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500">
                        {b.dayOfWeek} at {b.time} · Coach: {b.trainerName} · {b.branchName}
                      </p>
                    </div>

                    {b.status === 'confirmed' && (
                      <button
                        onClick={() => cancelBooking(b.id)}
                        className="px-3.5 py-1.5 rounded-xl border border-red-300 text-red-600 hover:bg-red-50 text-xs font-semibold self-start sm:self-auto cursor-pointer"
                      >
                        Cancel Reservation
                      </button>
                    )}
                  </div>
                ))}

                {userBookings.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-3xl border border-neutral-200 text-neutral-500 text-xs">
                    You have no active class reservations yet.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 3. BILLING TAB */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-black font-display uppercase tracking-wider">
                Invoices & Payment History
              </h3>

              <div className="overflow-x-auto bg-white border border-neutral-200 rounded-3xl shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-200 bg-neutral-50 text-neutral-500 font-mono">
                      <th className="py-4 px-6">Invoice #</th>
                      <th className="py-4 px-6">Date</th>
                      <th className="py-4 px-6">Plan Description</th>
                      <th className="py-4 px-6">Payment Mode</th>
                      <th className="py-4 px-6">Amount</th>
                      <th className="py-4 px-6 text-right">Receipt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-neutral-50 transition-colors">
                        <td className="py-4 px-6 font-mono font-bold text-black">{o.invoiceNumber}</td>
                        <td className="py-4 px-6 text-neutral-600">{new Date(o.createdAt).toLocaleDateString()}</td>
                        <td className="py-4 px-6 font-medium text-black">{o.planName}</td>
                        <td className="py-4 px-6 text-neutral-600">{o.paymentMethod}</td>
                        <td className="py-4 px-6 font-bold text-black font-mono">{formatPrice(o.amount)}</td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => setViewInvoice(o)}
                            className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-xs font-bold text-black inline-flex items-center gap-1.5"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Invoice</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. PROGRESS TAB */}
          {activeTab === 'progress' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-black font-display uppercase tracking-wider">
                Personal Records (PRs) & Strength Metrics
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm text-center">
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Barbell Back Squat</span>
                  <div className="my-3">
                    <span className="text-4xl font-black text-black font-display">165</span>
                    <span className="text-sm text-neutral-500 ml-1">KG</span>
                  </div>
                  <span className="text-[11px] text-black font-bold font-mono">1RM Tested · Oct 2026</span>
                </div>

                <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm text-center">
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Conventional Deadlift</span>
                  <div className="my-3">
                    <span className="text-4xl font-black text-black font-display">210</span>
                    <span className="text-sm text-neutral-500 ml-1">KG</span>
                  </div>
                  <span className="text-[11px] text-black font-bold font-mono">1RM Tested · Sep 2026</span>
                </div>

                <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm text-center">
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Bench Press</span>
                  <div className="my-3">
                    <span className="text-4xl font-black text-black font-display">120</span>
                    <span className="text-sm text-neutral-500 ml-1">KG</span>
                  </div>
                  <span className="text-[11px] text-black font-bold font-mono">1RM Tested · Oct 2026</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Invoice Modal */}
      {viewInvoice && (
        <Modal
          isOpen={!!viewInvoice}
          onClose={() => setViewInvoice(null)}
          title={`Tax Invoice: ${viewInvoice.invoiceNumber}`}
        >
          <div className="space-y-4 text-xs font-mono text-neutral-300">
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-400">Transaction ID:</span>
                <span className="text-white font-bold">{viewInvoice.transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Date of Supply:</span>
                <span className="text-white">{new Date(viewInvoice.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">GST Registration:</span>
                <span className="text-white">29AABCU9603R1ZM</span>
              </div>
              <div className="border-t border-neutral-800 pt-2 flex justify-between font-bold text-sm text-white">
                <span>Grand Total:</span>
                <span className="text-white">{formatPrice(viewInvoice.amount)}</span>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="w-full py-3 rounded-xl bg-white text-black font-black text-xs uppercase tracking-wider"
            >
              Print / Save PDF
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};
