import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GymGraphic } from '../components/common/GymGraphic';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Car,
  AlertTriangle,
  Send,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { branches, showToast } = useApp();
  const [selectedBranchId, setSelectedBranchId] = useState(branches[0].id);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Membership Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const activeBranch = branches.find((b) => b.id === selectedBranchId) || branches[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been received! Our club concierge will respond within 4 business hours.', 'success');
  };

  const branchGraphicMap: Record<string, 'flagship' | 'executive' | 'cyber' | 'international'> = {
    'branch-blr': 'flagship',
    'branch-mum': 'executive',
    'branch-del': 'cyber',
    'branch-dxb': 'international'
  };

  return (
    <div className="w-full min-h-screen bg-white text-neutral-900">
      {/* Header (Dramatic Black Section) */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-neutral-900 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
            Concierge & Support
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mt-2 font-display uppercase tracking-tight">
            Locations & Contact.
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 mt-3 sm:mt-4 max-w-2xl mx-auto text-balance">
            Speak directly with our club concierge, arrange a facility tour, or connect with our membership desk.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
          {/* Branch Details Col */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-black font-display mb-4 uppercase tracking-wider">
                Select Club Location
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                {branches.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBranchId(b.id)}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                      selectedBranchId === b.id
                        ? 'bg-black text-white border-black shadow-md'
                        : 'bg-white border-neutral-200 text-neutral-700 hover:text-black'
                    }`}
                  >
                    <p className="text-xs font-bold truncate">{b.city}</p>
                    <p className="text-[10px] text-neutral-400 truncate">{b.name.split(' ')[1] || 'Hub'}</p>
                  </button>
                ))}
              </div>

              {/* Active Branch Card with Real Unsplash Photo */}
              <div className="bg-white border border-neutral-200 rounded-3xl overflow-hidden p-6 sm:p-8 space-y-6 shadow-sm">
                <GymGraphic
                  type={branchGraphicMap[activeBranch.id] || 'flagship'}
                  className="h-44 sm:h-52 w-full rounded-2xl"
                  overlayText={activeBranch.name}
                />

                <div>
                  <h3 className="text-2xl font-black text-black font-display">{activeBranch.name}</h3>
                  <p className="text-xs text-neutral-600 mt-1 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    <span>{activeBranch.address}</span>
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
                    <span className="text-neutral-500 font-bold block">Club Operating Hours:</span>
                    <p className="text-black font-medium">Mon - Fri: {activeBranch.hoursWeekday}</p>
                    <p className="text-black font-medium">Sat - Sun: {activeBranch.hoursWeekend}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
                    <span className="text-neutral-500 font-bold block">Front Desk Contacts:</span>
                    <p className="text-black font-medium flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" /> {activeBranch.phone}
                    </p>
                    <p className="text-black font-medium flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" /> {activeBranch.email}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-100 border border-neutral-200 text-xs text-neutral-700 flex items-center gap-3">
                  <Car className="w-5 h-5 text-black shrink-0" />
                  <span>Complimentary on-site valet parking available for members & trial guests.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-10 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-black text-black font-display mb-1 uppercase tracking-wider">
              Send a Message
            </h2>
            <p className="text-xs text-neutral-600 mb-6">
              Our front desk manager will respond within 4 business hours.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-neutral-50 border border-neutral-300 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-black mx-auto" />
                <h3 className="text-lg font-bold text-black font-display">Inquiry Transmitted</h3>
                <p className="text-xs text-neutral-600">
                  Thank you, <strong className="text-black">{formData.name || 'Member'}</strong>. We have logged your request and sent a confirmation receipt to <strong className="text-black">{formData.email || 'your email'}</strong>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: 'Membership Inquiry', message: '' });
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-black text-white text-xs font-bold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-black mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vikramaditya Roy"
                    className="w-full bg-neutral-50 border border-neutral-300 focus:border-black rounded-xl px-4 py-3 text-sm text-black placeholder:text-neutral-400 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-black mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full bg-neutral-50 border border-neutral-300 focus:border-black rounded-xl px-4 py-3 text-sm text-black placeholder:text-neutral-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-black mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-neutral-50 border border-neutral-300 focus:border-black rounded-xl px-4 py-3 text-sm text-black placeholder:text-neutral-400 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-black mb-1.5">
                    Subject / Department
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-300 focus:border-black rounded-xl px-4 py-3 text-sm text-black outline-none"
                  >
                    <option value="Membership Inquiry">Membership Inquiry</option>
                    <option value="Personal Training Consultation">Personal Training Consultation</option>
                    <option value="Corporate Wellness Partnership">Corporate Wellness Partnership</option>
                    <option value="Facility Tour Booking">Facility Tour Booking</option>
                    <option value="Billing & Account Support">Billing & Account Support</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-black mb-1.5">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your fitness objectives or questions..."
                    className="w-full bg-neutral-50 border border-neutral-300 focus:border-black rounded-xl p-4 text-sm text-black placeholder:text-neutral-400 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry to Concierge</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
