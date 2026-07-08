"use client";
import React from 'react';

function HowItWorks() {
  const steps = [
    {
      title: "Create Interview",
      desc: "Provide your job role, description, and years of experience to get tailored questions.",
      icon: "📝"
    },
    {
      title: "Record Responses",
      desc: "Answer questions via video and audio. Our AI listens to your every word.",
      icon: "🎥"
    },
    {
      title: "Get Feedback",
      desc: "Receive a detailed analysis of your performance with ratings and improvement areas.",
      icon: "📊"
    }
  ];

  return (
    <div className="p-10 max-w-5xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4">How it Works?</h2>
      <p className="text-gray-500 mb-16 text-lg">Master your interview skills in three simple steps.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center gap-4 group">
            <div className="h-20 w-20 bg-primary/5 rounded-3xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
            <p className="text-gray-500 leading-relaxed">{step.desc}</p>
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute right-[-5%] top-[20%] text-gray-200 text-2xl">→</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HowItWorks;
