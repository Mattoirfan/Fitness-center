import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CreditCard,
  ShieldCheck,
  Check,
  Tag,
  ArrowRight,
  AlertCircle,
  Lock,
  Zap,
  Building
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    membershipPlans,
    selectedCheckoutPlanId,
    setSelectedCheckoutPlanId,
    createOrder,
    formatPrice,
    user,
    navigate,
    showToast
  } = useApp();

  const [paymentProvider, setPaymentProvider] = useState<'razorpay' | 'stripe'>('razorpay');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState<number>(0);

  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('999');
  const [upiId, setUpiId] = useState('aryan@okaxis');
  const [processing, setProcessing] = useState(false);

  // Active plan
  const activePlan =
    membershipPlans.find((p) => p.id === selectedCheckoutPlanId) ||
    membershipPlans[1];

  const basePrice = activePlan.priceINR;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'VOLTSTART' || code === 'FITINDIA20') {
      const discount = Math.round(basePrice * 0.2);
      setAppliedPromo(code);
      setPromoDiscount(discount);
      showToast(`Promo ${code} applied! 20% discount granted.`, 'success');
    } else if (code === 'EARLYBIRD') {
      const discount = 500;
      setAppliedPromo(code);
      setPromoDiscount(discount);
      showToast('Early-Bird discount of ₹500 applied!', 'success');
    } else {
      showToast('Invalid promo code. Try "VOLTSTART" or "FITINDIA20".', 'error');
    }
  };

  const subtotal = Math.max(0, basePrice - promoDiscount);
  const taxGST = Math.round(subtotal * 0.18); // 18% GST
  const grandTotal = subtotal + taxGST;

  const handleProcessPayment = () => {
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      const methodLabel =
        paymentProvider === 'razorpay'
          ? `Razorpay UPI (${upiId})`
          : 'Stripe Secured Card (ending in 4242)';

      const order = createOrder(activePlan.id, methodLabel, appliedPromo || undefined);
      navigate(`/payment/success?orderId=${order.id}`);
    }, 1200);
  };

  return (
    <div className="w-full min-h-screen bg-white text-neutral-900 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-10 text-center sm:text-left">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Secure Payment Gateway
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-black font-display uppercase tracking-tight mt-1">
            Complete Membership Activation.
          </h1>
          <p className="text-xs text-neutral-600 mt-1">
            Protected by 256-bit SSL encryption. 7-Day Money Back Guarantee applies.
          </p>
        </div>

        {/* Test Mode Simulator Notice */}
        <div className="mb-8 p-4 rounded-2xl bg-neutral-100 border border-neutral-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-black">Payment Sandbox Test Mode Active</strong>
              <p className="text-neutral-600 text-[11px]">
                Simulated provider transactions for Razorpay & Stripe. Test with any dummy credentials.
              </p>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded bg-black text-white shrink-0 font-mono">
            Sandbox Live
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Payment Method & Fields Col */}
          <div className="lg:col-span-2 space-y-6">
            {/* 1. Plan Selector if member wants to switch */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-base sm:text-lg font-bold text-black font-display mb-4 uppercase tracking-wider">
                Selected Plan
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {membershipPlans.slice(0, 3).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedCheckoutPlanId(p.id);
                      setAppliedPromo(null);
                      setPromoDiscount(0);
                    }}
                    className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                      activePlan.id === p.id
                        ? 'bg-black text-white border-black shadow-lg'
                        : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:border-black'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-bold text-sm ${activePlan.id === p.id ? 'text-white' : 'text-black'}`}>{p.name}</span>
                      {activePlan.id === p.id && (
                        <span className="w-2.5 h-2.5 rounded-full bg-white" />
                      )}
                    </div>
                    <p className={`text-base font-black font-display mt-2 ${activePlan.id === p.id ? 'text-white' : 'text-black'}`}>
                      {formatPrice(p.priceINR)}
                    </p>
                    <p className={`text-[11px] ${activePlan.id === p.id ? 'text-neutral-400' : 'text-neutral-500'}`}>/ {p.period}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Provider Selection (Razorpay vs Stripe) */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <h3 className="text-base sm:text-lg font-bold text-black font-display uppercase tracking-wider">
                Select Payment Method
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentProvider('razorpay')}
                  className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    paymentProvider === 'razorpay'
                      ? 'bg-black text-white border-black shadow-md'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-600'
                  }`}
                >
                  <Building className={`w-5 h-5 shrink-0 mt-0.5 ${paymentProvider === 'razorpay' ? 'text-white' : 'text-black'}`} />
                  <div>
                    <strong className={`block text-sm ${paymentProvider === 'razorpay' ? 'text-white' : 'text-black'}`}>Razorpay (India)</strong>
                    <span className={`text-[11px] ${paymentProvider === 'razorpay' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      Instant UPI (GPay, PhonePe, Paytm), NetBanking & RuPay
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentProvider('stripe')}
                  className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    paymentProvider === 'stripe'
                      ? 'bg-black text-white border-black shadow-md'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-600'
                  }`}
                >
                  <CreditCard className={`w-5 h-5 shrink-0 mt-0.5 ${paymentProvider === 'stripe' ? 'text-white' : 'text-black'}`} />
                  <div>
                    <strong className={`block text-sm ${paymentProvider === 'stripe' ? 'text-white' : 'text-black'}`}>Stripe International</strong>
                    <span className={`text-[11px] ${paymentProvider === 'stripe' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      Visa, Mastercard, American Express & Apple Pay
                    </span>
                  </div>
                </button>
              </div>

              {/* Dynamic form inputs based on provider */}
              {paymentProvider === 'razorpay' ? (
                <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3 text-xs">
                  <label className="block font-bold text-black">Enter UPI Virtual ID (VPA):</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="mobile@upi or user@okaxis"
                    className="w-full bg-white border border-neutral-300 focus:border-black rounded-xl px-4 py-3 text-sm text-black outline-none font-mono"
                  />
                  <p className="text-[11px] text-neutral-500">
                    A payment collect request will be dispatched to your UPI app for 1-click authorization.
                  </p>
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-black mb-1">Card Number:</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-white border border-neutral-300 focus:border-black rounded-xl px-4 py-3 text-sm text-black outline-none font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-black mb-1">Expiry:</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-white border border-neutral-300 focus:border-black rounded-xl px-4 py-3 text-sm text-black outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-black mb-1">CVV Security Code:</label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full bg-white border border-neutral-300 focus:border-black rounded-xl px-4 py-3 text-sm text-black outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary & Pay Button */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="text-lg sm:text-xl font-bold text-black font-display pb-3 border-b border-neutral-200 uppercase tracking-wider">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-black font-medium">
                <span>{activePlan.name} Monthly Membership</span>
                <span>{formatPrice(basePrice)}</span>
              </div>

              {appliedPromo && (
                <div className="flex justify-between text-black font-bold">
                  <span>Promo Code ({appliedPromo}):</span>
                  <span>-{formatPrice(promoDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between text-neutral-500">
                <span>Standard 18% GST (CGST + SGST):</span>
                <span>{formatPrice(taxGST)}</span>
              </div>

              <div className="border-t border-neutral-200 pt-4 flex justify-between items-baseline text-black">
                <div>
                  <strong className="text-base font-bold">Total Payable:</strong>
                  <p className="text-[10px] text-neutral-400">Recurring monthly; cancel anytime</p>
                </div>
                <span className="text-2xl font-black text-black font-display">
                  {formatPrice(grandTotal)}
                </span>
              </div>
            </div>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-2 pt-2 border-t border-neutral-200">
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 block">
                Have a Promotion Code?
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="e.g. VOLTSTART"
                  className="bg-neutral-50 border border-neutral-300 focus:border-black rounded-xl px-3 py-2 text-xs text-black uppercase outline-none flex-1 font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-black hover:bg-neutral-800 text-xs font-bold text-white transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
              <p className="text-[10px] text-neutral-500">
                Active demo codes: <strong className="text-black">VOLTSTART</strong> (20% off) or <strong className="text-black">EARLYBIRD</strong> (₹500 off)
              </p>
            </form>

            <button
              onClick={handleProcessPayment}
              disabled={processing}
              className="w-full py-4 rounded-xl bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Lock className="w-4 h-4" />
              <span>{processing ? 'Verifying with Gateway...' : `Authorize & Pay ${formatPrice(grandTotal)}`}</span>
            </button>

            <div className="space-y-2 text-[11px] text-neutral-500 text-center">
              <p className="flex items-center justify-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-black" /> 7-Day Unconditional Money Back Guarantee
              </p>
              <p>Instant membership activation upon successful authorization.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
