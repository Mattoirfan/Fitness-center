import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_ARTICLES } from '../data/initialData';
import {
  BookOpen,
  Clock,
  User,
  Search,
  ArrowRight,
  ShieldAlert,
  ArrowLeft
} from 'lucide-react';
import { ResourceArticle } from '../types';

export const FitnessResourcesPage: React.FC = () => {
  const { navigate } = useApp();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', 'Strength', 'Conditioning', 'Recovery'];

  const filtered = INITIAL_ARTICLES.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.summary.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === 'all' || a.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  return (
    <div className="w-full min-h-screen bg-white text-neutral-900">
      {/* Header (Dramatic Black Section) */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-neutral-900 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
            Sports Science & Physiology
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mt-2 font-display uppercase tracking-tight">
            Fitness Resources & Guides.
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 mt-4 max-w-2xl mx-auto text-balance">
            Peer-reviewed training principles, progressive overload methodology, and physiological recovery written by VOLT coaching directors.
          </p>

          {/* Search & Tabs */}
          <div className="mt-8 max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search protocols, overload, sauna..."
                className="w-full bg-neutral-900 border border-neutral-700 focus:border-white pl-10 pr-4 py-2.5 rounded-xl text-xs text-white placeholder:text-neutral-500 outline-none"
              />
            </div>

            <div className="flex items-center gap-1.5 justify-center flex-wrap">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                    activeCategory === c
                      ? 'bg-white text-black border-white'
                      : 'bg-neutral-900 text-neutral-300 hover:text-white border-neutral-800'
                  }`}
                >
                  {c === 'all' ? 'All' : c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid (Clean White Canvas) */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {filtered.map((art) => (
              <div
                key={art.id}
                onClick={() => navigate(`/fitness-resources/${art.slug}`)}
                className="bg-white border border-neutral-200 hover:border-black rounded-3xl p-6 sm:p-7 flex flex-col justify-between cursor-pointer transition-all group shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3 font-mono text-neutral-500">
                    <span className="text-black font-bold uppercase">{art.category}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {art.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-black font-display mb-3 group-hover:underline transition-colors">
                    {art.title}
                  </h3>

                  <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed mb-6">
                    {art.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-black">{art.authorName}</p>
                    <p className="text-[11px] text-neutral-400">{art.authorRole}</p>
                  </div>
                  <span className="text-xs font-bold text-black flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Article →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export const ArticleDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { navigate } = useApp();
  const article = INITIAL_ARTICLES.find((a) => a.slug === slug) || INITIAL_ARTICLES[0];

  return (
    <div className="w-full min-h-screen bg-white text-neutral-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/fitness-resources')}
          className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Resources</span>
        </button>

        <article className="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-12 shadow-sm space-y-8">
          <div>
            <div className="flex items-center gap-3 text-xs text-neutral-500 font-mono mb-3 flex-wrap">
              <span className="text-black font-bold uppercase">{article.category}</span>
              <span>·</span>
              <span>{article.readTime}</span>
              <span>·</span>
              <span>Published {article.publishDate}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-black font-display leading-tight uppercase tracking-tight">
              {article.title}
            </h1>

            <p className="text-sm sm:text-base text-neutral-700 mt-4 font-medium leading-relaxed">
              {article.summary}
            </p>

            <div className="mt-6 pt-6 border-t border-neutral-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">
                {article.authorName.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <p className="text-xs font-bold text-black">{article.authorName}</p>
                <p className="text-[11px] text-neutral-500">{article.authorRole}</p>
              </div>
            </div>
          </div>

          {/* Key Takeaways Box */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border-l-4 border-black space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-black">
              Key Scientific Takeaways:
            </h3>
            <ul className="space-y-1.5 text-xs text-neutral-700">
              {article.keyTakeaways.map((t, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black mt-1.5 shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Body Content */}
          <div className="space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed">
            {article.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Medical Disclaimer */}
          <div className="pt-6 border-t border-neutral-200 text-[11px] text-neutral-500 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
            <p>
              Educational Disclaimer: This publication provides sports science training information and does not constitute individualized medical or orthopedic advice. Always consult a healthcare professional before initiating high-load resistance protocols.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};
