import React from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  Download,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Sparkles
} from 'lucide-react';

export const PaymentSuccessPage: React.FC = () => {
  const { orders, user, formatPrice, navigate } = useApp();

  const queryParams = new URLSearchParams(window.location.search);
  const orderId = queryParams.get('orderId');
  const latestOrder = orders.find((o) => o.id === orderId) || orders[0];

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center py-12 sm:py-16 px-4 bg-neutral-50 text-neutral-900">
      <div className="w-full max-w-lg bg-white border-2 border-black rounded-3xl p-6 sm:p-10 shadow-2xl text-center">
        <div className="w-16 h-16 rounded-full bg-black text-white mx-auto flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>

        <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-black text-white">
          Payment Confirmed
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-black font-display uppercase tracking-tight mt-4">
          Welcome to the Club!
        </h1>
        <p className="text-xs text-neutral-600 mt-2">
          Your membership transaction was authorized successfully. Your profile status is now <strong className="text-black">ACTIVE</strong>.
        </p>

        {/* Invoice Summary Box */}
        {latestOrder && (
          <div className="my-6 p-5 sm:p-6 rounded-2xl bg-neutral-50 border border-neutral-200 text-left space-y-2 text-xs font-mono">
            <div className="flex justify-between text-neutral-500">
              <span>Tax Invoice Ref:</span>
              <span className="text-black font-bold">{latestOrder.invoiceNumber}</span>
            </div>
            <div className="flex justify-between text-neutral-500">
              <span>Plan Purchased:</span>
              <span className="text-black font-bold">{latestOrder.planName}</span>
            </div>
            <div className="flex justify-between text-neutral-500">
              <span>Payment Mode:</span>
              <span className="text-black">{latestOrder.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-neutral-500">
              <span>Transaction ID:</span>
              <span className="text-black">{latestOrder.transactionId}</span>
            </div>
            <div className="border-t border-neutral-200 pt-2 flex justify-between text-sm sm:text-base font-bold text-black">
              <span>Total Paid:</span>
              <span className="text-black">{formatPrice(latestOrder.amount)}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate('/account')}
            className="px-6 py-3.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            <span>Go to Member Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => window.print()}
            className="px-5 py-3.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-xs font-bold text-black flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-black" />
            <span>Download Invoice</span>
          </button>
        </div>

        <p className="text-[11px] text-neutral-500 mt-6">
          A receipt and welcome orientation checklist have been dispatched to {user?.email || 'your email'}.
        </p>
      </div>
    </div>
  );
};

export const PaymentCancelledPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center py-16 px-4 bg-white text-neutral-900">
      <div className="w-full max-w-md bg-neutral-50 border border-neutral-300 rounded-3xl p-8 sm:p-10 shadow-xl text-center">
        <h2 className="text-2xl font-black text-black font-display uppercase tracking-tight">Payment Cancelled</h2>
        <p className="text-xs text-neutral-600 mt-2">
          The transaction was interrupted or cancelled. No charges were made to your account.
        </p>
        <div className="mt-6 flex flex-col gap-2">
          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-bold"
          >
            Return to Checkout
          </button>
          <button
            onClick={() => navigate('/memberships')}
            className="w-full py-3 rounded-xl text-xs text-neutral-600 hover:text-black"
          >
            Browse Membership Plans
          </button>
        </div>
      </div>
    </div>
  );
};
