import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_FAQS } from '../data/initialData';
import { Search, ChevronDown, ChevronUp, HelpCircle, ArrowRight } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const { navigate } = useApp();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');

  const categories = ['all', 'Memberships', 'Free Trials', 'Classes & Bookings', 'Facilities', 'Personal Training', 'Policies'];

  const filteredFaqs = INITIAL_FAQS.filter((f) => {
    const matchesSearch =
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === 'all' || f.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  return (
    <div className="w-full min-h-screen bg-white text-neutral-900">
      {/* Header (Dramatic Black Section) */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-neutral-900 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
            Clear Transparency
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mt-2 font-display uppercase tracking-tight">
            Frequently Asked Questions.
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 mt-4 max-w-2xl mx-auto text-balance">
            Honest answers regarding billing, trial access, class reservations, and equipment standards.
          </p>

          {/* Search */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search queries (e.g. refund, lockers, cancellation)..."
                className="w-full bg-neutral-900 border border-neutral-700 focus:border-white pl-10 pr-4 py-3 rounded-xl text-xs text-white placeholder:text-neutral-500 outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main FAQ Accordion */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          {/* Categories */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center mb-8 sm:mb-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                  activeCategory === c
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-neutral-600 hover:text-black border-neutral-200'
                }`}
              >
                {c === 'all' ? 'All Questions' : c}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white border border-neutral-200 hover:border-black rounded-2xl overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setExpandedId(isOpen ? null : faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-neutral-100 text-black border border-neutral-200 w-fit">
                        {faq.category}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-black font-display">
                        {faq.question}
                      </span>
                    </div>

                    <span className="text-black shrink-0 p-1.5 rounded-lg bg-neutral-100">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-0 border-t border-neutral-100 mt-2">
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pt-4">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-neutral-200 text-xs text-neutral-500">
                No questions found matching your query. Contact our concierge directly.
              </div>
            )}
          </div>

          {/* Need more help banner */}
          <div className="mt-14 sm:mt-16 p-6 sm:p-8 rounded-3xl bg-black text-white border border-neutral-800 text-center">
            <h3 className="text-xl font-bold text-white font-display uppercase tracking-tight">
              Have an Unanswered Question?
            </h3>
            <p className="text-xs text-neutral-300 mt-1 max-w-md mx-auto">
              Our front desk manager and strength coaches are available 7 days a week to assist.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => navigate('/contact')}
                className="px-6 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-black text-xs uppercase tracking-wider"
              >
                Contact Concierge
              </button>
              <button
                onClick={() => navigate('/free-trial')}
                className="px-6 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white text-xs font-bold transition-colors"
              >
                Book 1-Day Trial
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
