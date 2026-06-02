import React, { useMemo, useState } from 'react';

const Purchase: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [courseId, setCourseId] = useState('accounts-foundation');
  const [coupon, setCoupon] = useState('');
  const [applying, setApplying] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState<{ id: string; amount: string } | null>(null);

  const courses = useMemo(
    () => [
      { id: 'accounts-foundation', title: 'Accounts - Foundation', price: 1499 },
      { id: 'business-advanced', title: 'Business Studies - Advanced', price: 2499 },
      { id: 'econ-crash', title: 'Economics - Crash Course', price: 1299 },
    ],
    []
  );

  const selected = courses.find((c) => c.id === courseId) || courses[0];

  const total = Math.max(0, Math.round(selected.price - discount));

  const applyCoupon = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!coupon) return;
    setApplying(true);
    setTimeout(() => {
      // Mock coupon logic
      if (coupon.toLowerCase() === 'WELCOME50') setDiscount(Math.round(selected.price * 0.5));
      else if (coupon.toLowerCase() === 'SAVE100') setDiscount(100);
      else setDiscount(0);
      setApplying(false);
    }, 700);
  };

  const payNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess({ id: `TXN${Date.now()}`, amount: `₹${total}` });
    }, 1200);
  };

  if (success) {
    return (
      <div className="container mx-auto py-12 max-w-2xl">
        <div className="p-8 bg-white/95 dark:bg-gray-900/60 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-2">Payment Successful</h2>
          <p className="text-gray-700 mb-4">Transaction id: <strong>{success.id}</strong></p>
          <p className="text-gray-700 mb-6">Amount paid: <strong>{success.amount}</strong></p>
          <p className="mb-6">Your enrollment is confirmed. Check your dashboard for course access.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Course Checkout</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={payNow} className="space-y-4 bg-white/95 p-6 rounded-lg shadow-md">
          <label className="block">
            <span className="text-sm">Full Name</span>
            <input className="form-input mt-1 w-full" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </label>

          <label className="block">
            <span className="text-sm">Email</span>
            <input type="email" className="form-input mt-1 w-full" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>

          <label className="block">
            <span className="text-sm">Mobile</span>
            <input className="form-input mt-1 w-full" value={mobile} onChange={(e) => setMobile(e.target.value)} />
          </label>

          <label className="block">
            <span className="text-sm">Select Course</span>
            <select className="form-input mt-1 w-full" value={courseId} onChange={(e) => setCourseId(e.target.value)}>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>{c.title} — ₹{c.price}</option>
              ))}
            </select>
          </label>

          <div className="flex gap-2">
            <input className="form-input flex-1" placeholder="Coupon code" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
            <button className="btn btn-primary" onClick={applyCoupon} disabled={applying}>{applying ? 'Applying...' : 'Apply'}</button>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold">Payment</h4>
            <p className="text-sm text-gray-600">Mock payment flow — integration with Razorpay/Stripe will go here.</p>
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={processing}>{processing ? 'Processing...' : `Pay ₹${total}`}</button>
        </form>

        <aside className="p-6 bg-white/95 rounded-lg shadow-md">
          <h3 className="font-semibold mb-4">Order Summary</h3>
          <div className="mb-4">
            <p className="text-sm text-gray-600">Course</p>
            <p className="font-medium">{selected.title}</p>
          </div>
          <div className="mb-2 flex justify-between">
            <span className="text-sm text-gray-600">Price</span>
            <span>₹{selected.price}</span>
          </div>
          <div className="mb-2 flex justify-between">
            <span className="text-sm text-gray-600">Discount</span>
            <span>- ₹{discount}</span>
          </div>
          <hr className="my-3" />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-600">Payment methods:</p>
            <ul className="list-disc ml-5 text-sm text-gray-700 mt-2">
              <li>Card / Netbanking (via provider)</li>
              <li>UPI (Razorpay)</li>
              <li>Wallets</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Purchase;
