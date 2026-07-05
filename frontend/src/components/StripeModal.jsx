import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, ShieldCheck, X, CheckCircle, Loader2 } from 'lucide-react';

export const StripeModal = ({ isOpen, onClose, onPaymentSuccess, amount = '₹500' }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState('');

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || cardNumber.length < 19 || expiry.length < 5 || cvc.length < 3) {
      setError('Please fill in all credit card details correctly.');
      return;
    }

    setError('');
    setIsProcessing(true);

    // Simulate Stripe payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsDone(true);
      setTimeout(() => {
        onPaymentSuccess();
        setIsDone(false);
        onClose();
      }, 1500);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gaming-dark/80 backdrop-blur-md z-[999999] p-4">
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="glass-panel w-full max-w-md p-6 rounded-2xl border border-white/10 relative overflow-hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold font-display uppercase tracking-wider text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-gaming-cyan" /> Secure Checkout
            </h3>
            <button 
              onClick={onClose}
              disabled={isProcessing}
              className="text-gaming-muted hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors interactive-target"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Payment States */}
          {isProcessing ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <Loader2 className="w-12 h-12 text-gaming-purple animate-spin" />
              <p className="text-sm font-bold font-display uppercase tracking-widest text-gaming-cyan animate-pulse">
                Authorizing Charge...
              </p>
              <p className="text-xs text-gaming-muted">Connecting securely to Stripe checkout gateways</p>
            </div>
          ) : isDone ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="bg-gaming-green/20 border border-gaming-green/40 p-4 rounded-full text-gaming-green shadow-neon-green"
              >
                <CheckCircle className="w-12 h-12" />
              </motion.div>
              <p className="text-base font-bold font-display uppercase tracking-widest text-gaming-green">
                Payment Authorized
              </p>
              <p className="text-xs text-gaming-muted">
                Transaction processed successfully. Creating tournament matches...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex justify-between items-center mb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gaming-muted block">Platform Listing Fee</span>
                  <span className="text-lg font-bold font-display text-white">Broadcast stake</span>
                </div>
                <span className="text-2xl font-black font-display text-gaming-green">{amount}</span>
              </div>

              {error && (
                <div className="bg-red-950/30 border border-red-500/30 px-3.5 py-2 rounded-lg text-xs text-red-400">
                  {error}
                </div>
              )}

              {/* Cardholder Name */}
              <div>
                <label className="text-[10px] uppercase font-bold text-gaming-muted block mb-1">Cardholder Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mitchell Jacobs"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gaming-slate border border-white/10 rounded-lg py-2.5 px-3 text-sm focus:border-gaming-cyan outline-none text-white font-sans"
                />
              </div>

              {/* Card Number */}
              <div>
                <label className="text-[10px] uppercase font-bold text-gaming-muted block mb-1">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="xxxx xxxx xxxx xxxx"
                    maxLength={19}
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    className="w-full bg-gaming-slate border border-white/10 rounded-lg py-2.5 px-3 pl-10 text-sm focus:border-gaming-cyan outline-none text-white font-sans font-display"
                  />
                  <CreditCard className="w-4 h-4 text-gaming-muted absolute left-3 top-3.5" />
                </div>
              </div>

              {/* Card Expiry & CVC */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-gaming-muted block mb-1">Expiration Date</label>
                  <input
                    type="text"
                    required
                    placeholder="MM/YY"
                    maxLength={5}
                    value={expiry}
                    onChange={(e) => {
                      let val = e.target.value.replace(/[^0-9]/g, '');
                      if (val.length >= 2) {
                        val = val.substring(0, 2) + '/' + val.substring(2, 4);
                      }
                      setExpiry(val);
                    }}
                    className="w-full bg-gaming-slate border border-white/10 rounded-lg py-2.5 px-3 text-sm focus:border-gaming-cyan outline-none text-white font-sans font-display"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-gaming-muted block mb-1">Security Code (CVC)</label>
                  <input
                    type="password"
                    required
                    placeholder="***"
                    maxLength={3}
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full bg-gaming-slate border border-white/10 rounded-lg py-2.5 px-3 text-sm focus:border-gaming-cyan outline-none text-white font-sans font-display"
                  />
                </div>
              </div>

              {/* Checkout details */}
              <button
                type="submit"
                className="w-full mt-6 bg-gaming-green hover:bg-gaming-green/80 text-gaming-dark font-bold font-display uppercase tracking-wider text-xs py-3.5 rounded-xl transition-all duration-300 shadow-neon-green flex items-center justify-center gap-2 interactive-target"
              >
                Stake Listing Fee & Publish
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-gaming-muted mt-4">
                <ShieldCheck className="w-3.5 h-3.5 text-gaming-cyan" /> Secure 256-bit SSL encrypted stripe transactions
              </div>
            </form>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
export default StripeModal;
