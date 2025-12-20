import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CreditCard, Tag, Check, X, QrCode, Smartphone, Clock, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useCartStore, CartItem } from '@/stores/cartStore';
import { toast } from 'sonner';

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItems?: CartItem[];
}

const BookingForm = ({ isOpen, onClose, selectedItems }: BookingFormProps) => {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [step, setStep] = useState<'details' | 'payment'>('details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [applyingCoupon, setApplyingCoupon] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    remarks: '',
  });

  // Use selected items or all items
  const cartItems = selectedItems || items;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
  const total = subtotal - discount;

  // Generate UPI payment URL with amount
  const upiPayeeId = "9946668104@upi"; // Replace with actual UPI ID
  const upiUrl = `upi://pay?pa=${upiPayeeId}&pn=YEOUBI&am=${total.toFixed(2)}&tn=${encodeURIComponent(formData.name || 'Order Payment')}&cu=INR`;
  
  // Generate QR code URL using a free QR API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`;

  // Countdown timer for payment popup
  useEffect(() => {
    if (step === 'payment' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handlePaymentClose();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step, timeLeft]);

  const handlePaymentClose = () => {
    setStep('details');
    setTimeLeft(60);
    onClose();
  };

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    
    setApplyingCoupon(true);
    try {
      const { data, error } = await supabase
        .from('coupon_codes')
        .select('*')
        .eq('code', couponCode.toUpperCase())
        .eq('is_active', true)
        .maybeSingle();

      if (error || !data) {
        toast.error('Invalid or expired coupon code');
        return;
      }

      if (data.usage_limit && data.used_count && data.used_count >= data.usage_limit) {
        toast.error('This coupon has reached its usage limit');
        return;
      }

      if (data.expires_at && new Date(data.expires_at) < new Date()) {
        toast.error('This coupon has expired');
        return;
      }

      setAppliedCoupon({ code: data.code, discount: data.discount_percent });
      toast.success(`Coupon applied! ${data.discount_percent}% off`);
      setCouponCode('');
    } finally {
      setApplyingCoupon(false);
    }
  };

  const handleProceedToPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.email || !formData.address) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create booking for each item
      const bookings = cartItems.map((item: CartItem) => ({
        product_id: item.product.id,
        product_name: item.product.name,
        product_price: item.product.price,
        quantity: item.quantity,
        size: item.size,
        customer_name: formData.name,
        customer_phone: formData.phone,
        customer_email: formData.email,
        customer_address: formData.address,
        remarks: formData.remarks || null,
        coupon_code: appliedCoupon?.code || null,
        discount_percent: appliedCoupon?.discount || 0,
        total_amount: (item.product.price * item.quantity * (1 - (appliedCoupon?.discount || 0) / 100)),
        status: 'pending',
      }));

      const { error } = await supabase.from('bookings').insert(bookings);

      if (error) throw error;

      // Update coupon usage if applied
      if (appliedCoupon) {
        await supabase.from('coupon_codes').update({ used_count: 1 }).eq('code', appliedCoupon.code);
      }

      toast.success('Order placed! Please complete payment.');
      setStep('payment');
      setTimeLeft(60);

    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to create booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpiAppOpen = (app: string) => {
    let intentUrl = upiUrl;
    
    if (app === 'gpay') {
      intentUrl = `tez://upi/pay?pa=${upiPayeeId}&pn=YEOUBI&am=${total.toFixed(2)}&tn=${encodeURIComponent(formData.name || 'Order Payment')}&cu=INR`;
    } else if (app === 'paytm') {
      intentUrl = `paytmmp://pay?pa=${upiPayeeId}&pn=YEOUBI&am=${total.toFixed(2)}&tn=${encodeURIComponent(formData.name || 'Order Payment')}&cu=INR`;
    } else if (app === 'phonepe') {
      intentUrl = `phonepe://pay?pa=${upiPayeeId}&pn=YEOUBI&am=${total.toFixed(2)}&tn=${encodeURIComponent(formData.name || 'Order Payment')}&cu=INR`;
    }
    
    window.open(intentUrl, '_blank');
  };

  const handlePaymentComplete = () => {
    clearCart();
    toast.success('Thank you! We will verify your payment and confirm your order.');
    handlePaymentClose();
    setFormData({ name: '', phone: '', email: '', address: '', remarks: '' });
    setAppliedCoupon(null);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[70] flex items-center justify-center p-4"
        onClick={step === 'details' ? onClose : undefined}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-strong rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
        >
          {step === 'details' ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold">Complete Your Order</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Order Summary */}
              <div className="glass p-4 rounded-xl mb-6">
                <h3 className="font-medium mb-3">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{item.product.name} ({item.size}) x{item.quantity}</span>
                      <span>₹{(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-2 mt-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between text-green-500">
                        <span>Discount ({appliedCoupon.discount}%)</span>
                        <span>-₹{discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-lg pt-2">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coupon */}
              {!appliedCoupon ? (
                <div className="flex gap-2 mb-6">
                  <div className="flex-1 relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="w-full glass pl-10 pr-4 py-3 rounded-lg text-sm"
                    />
                  </div>
                  <button
                    onClick={applyCoupon}
                    disabled={applyingCoupon}
                    className="glass px-4 py-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium"
                  >
                    {applyingCoupon ? <Loader2 size={16} className="animate-spin" /> : 'Apply'}
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between glass p-3 rounded-lg bg-green-500/10 mb-6">
                  <div className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    <span className="text-sm font-medium">{appliedCoupon.code}</span>
                    <span className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full">
                      -{appliedCoupon.discount}%
                    </span>
                  </div>
                  <button onClick={() => setAppliedCoupon(null)}>
                    <X size={16} />
                  </button>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleProceedToPayment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 glass rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Your phone number"
                    className="w-full px-4 py-3 glass rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 glass rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Delivery Address *</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Full delivery address"
                    rows={3}
                    className="w-full px-4 py-3 glass rounded-xl resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Remarks (Optional)</label>
                  <textarea
                    value={formData.remarks}
                    onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                    placeholder="Any special instructions..."
                    rows={2}
                    className="w-full px-4 py-3 glass rounded-xl resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full glass-btn-primary py-4 flex items-center justify-center gap-2 text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard size={20} />
                      Proceed to Payment - ₹{total.toFixed(2)}
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            /* Payment Step */
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-display font-bold">Complete Payment</h2>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock size={16} />
                  <span className="font-mono text-lg">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                </div>
              </div>

              {/* Warning */}
              <div className="glass p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 mb-4 flex items-start gap-2">
                <AlertTriangle size={20} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-500">
                  <strong>Important:</strong> Please enter "<span className="font-bold">{formData.name}</span>" as the transaction description/note while paying.
                </p>
              </div>

              {/* Amount */}
              <div className="text-center mb-6">
                <p className="text-muted-foreground text-sm mb-1">Amount to Pay</p>
                <p className="text-4xl font-display font-bold text-primary">₹{total.toFixed(2)}</p>
              </div>

              {/* QR Code */}
              <div className="flex justify-center mb-6">
                <div className="glass p-4 rounded-2xl">
                  <img 
                    src={qrCodeUrl} 
                    alt="Payment QR Code" 
                    className="w-48 h-48 rounded-lg"
                  />
                  <p className="text-center text-xs text-muted-foreground mt-2">Scan to pay with any UPI app</p>
                </div>
              </div>

              {/* UPI Apps */}
              <div className="mb-6">
                <p className="text-center text-sm text-muted-foreground mb-3">Or pay using</p>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleUpiAppOpen('gpay')}
                    className="glass p-3 rounded-xl flex flex-col items-center gap-2 hover:bg-muted transition-colors"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-green-500 to-yellow-500 rounded-xl flex items-center justify-center">
                      <Smartphone size={24} className="text-white" />
                    </div>
                    <span className="text-xs font-medium">GPay</span>
                  </button>
                  <button
                    onClick={() => handleUpiAppOpen('paytm')}
                    className="glass p-3 rounded-xl flex flex-col items-center gap-2 hover:bg-muted transition-colors"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center">
                      <Smartphone size={24} className="text-white" />
                    </div>
                    <span className="text-xs font-medium">Paytm</span>
                  </button>
                  <button
                    onClick={() => handleUpiAppOpen('phonepe')}
                    className="glass p-3 rounded-xl flex flex-col items-center gap-2 hover:bg-muted transition-colors"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-400 rounded-xl flex items-center justify-center">
                      <Smartphone size={24} className="text-white" />
                    </div>
                    <span className="text-xs font-medium">PhonePe</span>
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handlePaymentComplete}
                  className="w-full glass-btn-primary py-4 flex items-center justify-center gap-2 text-lg"
                >
                  <Check size={20} />
                  I've Completed Payment
                </button>
                <button
                  onClick={handlePaymentClose}
                  className="w-full glass py-3 rounded-xl text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingForm;