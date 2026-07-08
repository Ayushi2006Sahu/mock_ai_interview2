"use client";
import React from 'react';
import { Button } from '@/components/ui/button';

function Upgrade() {
  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-2">Upgrade your Plan</h2>
      <p className="text-gray-500 text-center mb-12">Choose the plan that fits your preparation needs.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <div className="p-8 border rounded-3xl bg-white shadow-sm flex flex-col gap-4">
          <h3 className="text-xl font-bold">Free</h3>
          <h4 className="text-4xl font-extrabold">$0<span className="text-lg text-gray-400 font-normal">/month</span></h4>
          <ul className="flex flex-col gap-2 mt-4 text-gray-600">
            <li>✅ 5 AI Mock Interviews / month</li>
            <li>✅ Basic Feedback</li>
            <li>✅ Email Support</li>
          </ul>
          <Button variant="outline" className="mt-auto h-12 rounded-xl" disabled>Current Plan</Button>
        </div>

        {/* Pro Plan */}
        <div className="p-8 border-2 border-primary rounded-3xl bg-white shadow-xl flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-xl text-xs font-bold uppercase tracking-widest">Popular</div>
          <h3 className="text-xl font-bold">Pro</h3>
          <h4 className="text-4xl font-extrabold">$9.99<span className="text-lg text-gray-400 font-normal">/month</span></h4>
          <ul className="flex flex-col gap-2 mt-4 text-gray-600">
            <li>✅ Unlimited AI Mock Interviews</li>
            <li>✅ Detailed AI Analysis & Suggestions</li>
            <li>✅ Priority Support</li>
            <li>✅ Access to Premium Question Bank</li>
          </ul>
          <Button 
            className="mt-auto h-12 rounded-xl shadow-lg hover:scale-[1.02] transition-all"
            onClick={() => window.open('https://dashboard.razorpay.com/', '_blank')}
          >
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Upgrade;
