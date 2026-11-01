import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Home,
  Dumbbell,
  Calendar,
  CreditCard,
  Sparkles,
  User
} from 'lucide-react';

export const MobileBottomBar: React.FC = () => {
  const { currentPath, navigate, user } = useApp();

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Facilities', path: '/facilities', icon: Dumbbell },
    { label: 'Classes', path: '/classes', icon: Calendar },
    { label: 'Plans', path: '/membership', icon: CreditCard },
    { label: 'Free Pass', path: '/free-trial', icon: Sparkles, highlight: true },
    { label: user ? 'Account' : 'Sign In', path: user ? '/account' : '/login', icon: User }
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-black/95 backdrop-blur-xl border-t border-neutral-800 px-2 py-2 flex items-center justify-around shadow-2xl safe-area-pb"
      aria-label="Mobile Bottom Navigation"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPath === item.path;

        if (item.highlight) {
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center p-1 relative -top-3 focus:outline-none"
            >
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
                  isActive
                    ? 'bg-white text-black shadow-white/30'
                    : 'bg-white text-black shadow-white/20'
                }`}
              >
                <Icon className="w-5 h-5 text-black" />
              </div>
              <span className="text-[10px] font-black text-white uppercase tracking-wider mt-0.5">
                {item.label}
              </span>
            </button>
          );
        }

        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors focus:outline-none ${
              isActive ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span
              className={`text-[10px] tracking-tight mt-1 ${
                isActive ? 'font-bold text-white' : 'font-medium'
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
