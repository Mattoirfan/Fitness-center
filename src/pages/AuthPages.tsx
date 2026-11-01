import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/common/Logo';
import {
  Lock,
  Mail,
  User,
  Phone,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface AuthPagesProps {
  initialMode?: 'login' | 'register' | 'forgot';
}

export const AuthPages: React.FC<AuthPagesProps> = ({ initialMode = 'login' }) => {
  const { login, register, navigate, showToast } = useApp();
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('aryan.verma@example.com');
  const [loginPassword, setLoginPassword] = useState('password123');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail) {
      showToast('Please provide a valid email.', 'error');
      return;
    }
    const role = loginEmail.includes('admin') ? 'admin' : 'member';
    login(loginEmail, role);
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/account');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }
    register(regName, regEmail, regPhone);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSent(true);
    showToast(`Password reset link dispatched to ${forgotEmail}.`, 'info');
  };

  const fillDemoAccount = (role: 'member' | 'admin') => {
    if (role === 'admin') {
      setLoginEmail('admin@voltclub.com');
      setLoginPassword('voltAdmin2026!');
      showToast('Filled Staff Admin demo credentials.', 'info');
    } else {
      setLoginEmail('aryan.verma@example.com');
      setLoginPassword('password123');
      showToast('Filled Aryan Verma (Member) demo credentials.', 'info');
    }
  };

  return (
    <div className="w-full min-h-[85vh] flex items-center justify-center py-12 sm:py-16 px-4 bg-neutral-100">
      <div className="w-full max-w-md bg-white border border-neutral-300 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="flex justify-center mb-6 sm:mb-8">
          <Logo size="md" theme="light" />
        </div>

        {/* 1. LOGIN VIEW */}
        {mode === 'login' && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-black font-display uppercase tracking-tight">
                Member Portal
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Access your bookings, active membership, and personal records.
              </p>
            </div>

            {/* Quick Demo Pre-Fill Buttons */}
            <div className="mb-6 p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs">
              <span className="text-neutral-500 text-[11px] font-bold block mb-2 font-mono">
                Quick Demo Access:
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fillDemoAccount('member')}
                  className="flex-1 py-1.5 rounded-lg bg-white hover:bg-neutral-100 text-[11px] font-bold text-black border border-neutral-300 transition-colors"
                >
                  Member (Aryan)
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoAccount('admin')}
                  className="flex-1 py-1.5 rounded-lg bg-black hover:bg-neutral-800 text-[11px] font-bold text-white transition-colors"
                >
                  Admin (Kavita)
                </button>
              </div>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-black mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 focus:border-black rounded-xl pl-10 pr-4 py-3 text-sm text-black placeholder:text-neutral-400 outline-none"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold uppercase tracking-wider text-black">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-neutral-500 hover:text-black text-[11px]"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 focus:border-black rounded-xl pl-10 pr-4 py-3 text-sm text-black placeholder:text-neutral-400 outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                <span>Sign In to VOLT Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-neutral-200 text-center text-xs text-neutral-600">
              <span>Don’t have an active account yet? </span>
              <button
                onClick={() => setMode('register')}
                className="text-black font-bold hover:underline"
              >
                Create Account
              </button>
            </div>
          </div>
        )}

        {/* 2. REGISTER VIEW */}
        {mode === 'register' && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-black font-display uppercase tracking-tight">
                Create Account
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Join the high-performance VOLT athletic community.
              </p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-black mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 focus:border-black rounded-xl pl-10 pr-4 py-3 text-sm text-black placeholder:text-neutral-400 outline-none"
                    placeholder="Vikramaditya Roy"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-black mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 focus:border-black rounded-xl pl-10 pr-4 py-3 text-sm text-black placeholder:text-neutral-400 outline-none"
                    placeholder="vikram@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-black mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 focus:border-black rounded-xl pl-10 pr-4 py-3 text-sm text-black placeholder:text-neutral-400 outline-none"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-black mb-1.5">
                  Create Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 focus:border-black rounded-xl pl-10 pr-4 py-3 text-sm text-black placeholder:text-neutral-400 outline-none"
                    placeholder="Minimum 8 characters"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                <span>Register & Choose Membership</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-neutral-200 text-center text-xs text-neutral-600">
              <span>Already registered? </span>
              <button
                onClick={() => setMode('login')}
                className="text-black font-bold hover:underline"
              >
                Sign In
              </button>
            </div>
          </div>
        )}

        {/* 3. FORGOT PASSWORD VIEW */}
        {mode === 'forgot' && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-black font-display uppercase tracking-tight">
                Password Recovery
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Enter your registered email to receive verification reset link.
              </p>
            </div>

            {resetSent ? (
              <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-300 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-black mx-auto" />
                <h3 className="font-bold text-black text-base">Check Your Inbox</h3>
                <p className="text-xs text-neutral-600">
                  We sent a recovery dispatch to <strong className="text-black">{forgotEmail}</strong>. Follow the instructions to reset your password.
                </p>
                <button
                  onClick={() => {
                    setResetSent(false);
                    setMode('login');
                  }}
                  className="mt-3 px-5 py-2.5 rounded-xl bg-black text-xs font-bold text-white hover:bg-neutral-800"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-black mb-1.5">
                    Account Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-300 focus:border-black rounded-xl pl-10 pr-4 py-3 text-sm text-black placeholder:text-neutral-400 outline-none"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-wider transition-all"
                >
                  Send Recovery Link
                </button>

                <div className="text-center pt-3">
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-xs text-neutral-500 hover:text-black"
                  >
                    ← Back to Login
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
