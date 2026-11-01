import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Modal } from '../components/common/Modal';
import {
  ShieldAlert,
  Users,
  CreditCard,
  Calendar,
  Sparkles,
  TrendingUp,
  Settings,
  Edit,
  CheckCircle,
  FileText,
  Clock,
  ArrowRight,
  Plus
} from 'lucide-react';
import { MembershipPlan, ClassScheduleItem } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const {
    user,
    switchRole,
    membershipPlans,
    updateMembershipPlan,
    schedules,
    classes,
    trainers,
    trialLeads,
    auditLogs,
    formatPrice,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'plans' | 'schedules' | 'trials' | 'audit'>('overview');
  const [editingPlan, setEditingPlan] = useState<MembershipPlan | null>(null);
  const [editPriceINR, setEditPriceINR] = useState<number>(0);

  // If user is not admin, provide swift 1-click demo override
  if (user?.role !== 'admin') {
    return (
      <div className="w-full min-h-[75vh] flex items-center justify-center p-6 bg-neutral-100 text-black">
        <div className="max-w-md w-full bg-white border border-neutral-300 rounded-3xl p-8 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-black text-white mx-auto flex items-center justify-center">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black font-display text-black uppercase tracking-tight">
            Staff Portal Restricted
          </h2>
          <p className="text-xs text-neutral-600 leading-relaxed">
            You are currently browsing as a Member ({user?.name || 'Guest'}). Switch to Staff Administrator mode to inspect internal club management controls.
          </p>
          <div className="pt-2">
            <button
              onClick={() => switchRole('admin')}
              className="w-full py-3.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md"
            >
              Switch to Staff Admin View (Kavita Roy)
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSavePlanPrice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;
    updateMembershipPlan({
      ...editingPlan,
      priceINR: editPriceINR
    });
    setEditingPlan(null);
  };

  return (
    <div className="w-full min-h-screen bg-white text-neutral-900">
      {/* Top Banner (Dramatic Black Section) */}
      <section className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 border-b border-neutral-900 bg-black text-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-white font-display uppercase tracking-tight">VOLT Club Administration</h1>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-white text-black">
                  Owner & GM Mode
                </span>
              </div>
              <p className="text-xs text-neutral-400">Logged in: {user.name} ({user.email})</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => switchRole('member')}
              className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-xs font-bold text-white border border-neutral-700 transition-colors"
            >
              Switch to Member View
            </button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-6 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Executive KPIs' },
            { id: 'plans', label: 'Pricing & Plans' },
            { id: 'schedules', label: 'Classes & Capacity' },
            { id: 'trials', label: `Trial Pass Leads (${trialLeads.length})` },
            { id: 'audit', label: 'Audit Log' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-black text-black font-black'
                  : 'border-transparent text-neutral-500 hover:text-black'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Contents */}
      <section className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          {/* 1. OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* KPI Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
                  <div className="flex items-center justify-between text-neutral-500 text-xs">
                    <span>Active Paying Members</span>
                    <Users className="w-4 h-4 text-black" />
                  </div>
                  <div className="my-2 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-black font-display">1,248</span>
                    <span className="text-xs text-neutral-600 font-bold">+64 this month</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">Across Indiranagar, BKC, Gurugram</p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
                  <div className="flex items-center justify-between text-neutral-500 text-xs">
                    <span>Monthly Recurring Revenue</span>
                    <CreditCard className="w-4 h-4 text-black" />
                  </div>
                  <div className="my-2 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-black font-display">₹28.4L</span>
                    <span className="text-xs text-neutral-600 font-bold">+12.4% MoM</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">Average Member LTV: ₹24,800</p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
                  <div className="flex items-center justify-between text-neutral-500 text-xs">
                    <span>Class Capacity Occupancy</span>
                    <Calendar className="w-4 h-4 text-black" />
                  </div>
                  <div className="my-2 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-black font-display">88.4%</span>
                    <span className="text-xs text-black font-bold">High Density</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">VOLT Ignite & Forge near peak</p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
                  <div className="flex items-center justify-between text-neutral-500 text-xs">
                    <span>Trial Pass Conversions</span>
                    <Sparkles className="w-4 h-4 text-black" />
                  </div>
                  <div className="my-2 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-black font-display">44.2%</span>
                    <span className="text-xs text-black font-bold">Industry High</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">Leads converting to FIT & ELITE</p>
                </div>
              </div>

              {/* Quick Action Matrix */}
              <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm">
                <h3 className="text-lg font-bold text-black font-display mb-4 uppercase tracking-wider">
                  Front Desk Operational Status
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                    <span className="text-neutral-500 block">HVAC Air Quality Index (AQI):</span>
                    <strong className="text-black text-sm">AQI 14 (Pristine HEPA)</strong>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                    <span className="text-neutral-500 block">Thermal Recovery Suite Temp:</span>
                    <strong className="text-black text-sm">Sauna 82°C / Plunge 5.1°C</strong>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                    <span className="text-neutral-500 block">Active On-Floor Coaches:</span>
                    <strong className="text-black text-sm">8 Coaches on Floor</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. PLANS MANAGEMENT */}
          {activeTab === 'plans' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-black font-display uppercase tracking-wider">
                    Membership Pricing & Tiers
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Adjust monthly or annual price points in real-time across the live public website.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {membershipPlans.map((p) => (
                  <div
                    key={p.id}
                    className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-black text-lg font-display uppercase">{p.name}</span>
                        {p.popular && (
                          <span className="text-[10px] bg-black text-white font-black px-2 py-0.5 rounded">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-500 mb-4">{p.tagline}</p>
                      <div className="text-2xl font-black text-black font-display">
                        {formatPrice(p.priceINR)}
                        <span className="text-xs text-neutral-400 ml-1">/ {p.period}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setEditingPlan(p);
                        setEditPriceINR(p.priceINR);
                      }}
                      className="mt-6 w-full py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-xs font-bold text-black flex items-center justify-center gap-2 transition-colors border border-neutral-200"
                    >
                      <Edit className="w-3.5 h-3.5 text-black" />
                      <span>Edit Plan Price</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. SCHEDULES & CAPACITY */}
          {activeTab === 'schedules' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-black font-display uppercase tracking-wider">
                Studio Sessions & Seating Management
              </h3>

              <div className="overflow-x-auto bg-white border border-neutral-200 rounded-3xl shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-200 bg-neutral-50 text-neutral-500 font-mono">
                      <th className="py-4 px-6">Class Name</th>
                      <th className="py-4 px-6">Day & Time</th>
                      <th className="py-4 px-6">Lead Coach</th>
                      <th className="py-4 px-6">Booked / Total</th>
                      <th className="py-4 px-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {schedules.map((sch) => {
                      const c = classes.find((cl) => cl.id === sch.classId);
                      const t = trainers.find((tr) => tr.id === sch.trainerId);
                      const isFull = sch.bookedCount >= sch.capacity;

                      return (
                        <tr key={sch.id} className="hover:bg-neutral-50 transition-colors">
                          <td className="py-4 px-6 font-bold text-black">{c?.name}</td>
                          <td className="py-4 px-6 text-neutral-500">{sch.dayOfWeek} at {sch.time}</td>
                          <td className="py-4 px-6 text-black font-medium">{t?.name}</td>
                          <td className="py-4 px-6 font-mono text-black font-bold">
                            {sch.bookedCount} / {sch.capacity}
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                                isFull ? 'bg-red-100 text-red-600' : 'bg-neutral-100 text-black border border-neutral-300'
                              }`}
                            >
                              {isFull ? 'Session Full' : 'Seats Open'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. TRIAL LEADS */}
          {activeTab === 'trials' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-black font-display uppercase tracking-wider">
                Inbound Free Trial Pass Registrations
              </h3>

              <div className="overflow-x-auto bg-white border border-neutral-200 rounded-3xl shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-200 bg-neutral-50 text-neutral-500 font-mono">
                      <th className="py-4 px-6">Guest Name</th>
                      <th className="py-4 px-6">Pass Code</th>
                      <th className="py-4 px-6">Scheduled Date & Time</th>
                      <th className="py-4 px-6">Phone / Email</th>
                      <th className="py-4 px-6">Fitness Goal</th>
                      <th className="py-4 px-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {trialLeads.map((trl) => (
                      <tr key={trl.id} className="hover:bg-neutral-50 transition-colors">
                        <td className="py-4 px-6 font-bold text-black">{trl.fullName}</td>
                        <td className="py-4 px-6 font-mono font-bold text-black">{trl.passCode}</td>
                        <td className="py-4 px-6 text-neutral-500">{trl.preferredDate} ({trl.preferredTime})</td>
                        <td className="py-4 px-6 text-black">{trl.phone}</td>
                        <td className="py-4 px-6 text-neutral-500">{trl.fitnessGoal}</td>
                        <td className="py-4 px-6">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-100 text-black border border-neutral-300 uppercase">
                            {trl.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 5. AUDIT LOG */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-black font-display uppercase tracking-wider">
                Staff & System Audit Log
              </h3>

              <div className="space-y-3">
                {auditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-4 rounded-xl bg-white border border-neutral-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-black">{log.action}</span>
                        <span className="text-neutral-400">·</span>
                        <span className="text-black font-mono">{log.target}</span>
                      </div>
                      <p className="text-neutral-600">{log.details}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[11px] text-neutral-400 block font-mono">{log.timestamp}</span>
                      <span className="text-[10px] text-neutral-500">By: {log.performedBy}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Edit Plan Modal */}
      {editingPlan && (
        <Modal
          isOpen={!!editingPlan}
          onClose={() => setEditingPlan(null)}
          title={`Edit ${editingPlan.name} Price`}
          maxWidth="max-w-sm"
        >
          <form onSubmit={handleSavePlanPrice} className="space-y-4 text-xs text-neutral-300">
            <div>
              <label className="block font-bold text-neutral-300 mb-1">Price in INR (₹):</label>
              <input
                type="number"
                value={editPriceINR}
                onChange={(e) => setEditPriceINR(Number(e.target.value))}
                className="w-full bg-neutral-900 border border-neutral-700 focus:border-white rounded-xl p-3 text-sm text-white outline-none font-mono"
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-black text-xs uppercase tracking-wider transition-all"
              >
                Save & Update Live Website
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
