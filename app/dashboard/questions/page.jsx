"use client";
import React from 'react';

function Questions() {
  return (
    <div className="p-10 flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-3xl font-bold text-primary mb-4">Interview Questions</h2>
      <p className="text-gray-500 text-lg text-center max-w-2xl">
        This section will contain a curated list of common interview questions and AI-generated suggestions to help you prepare better.
      </p>
      <div className="mt-10 p-10 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50 flex flex-col items-center gap-4">
        <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
          <span className="text-2xl text-primary font-bold">!</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-700">Coming Soon</h3>
        <p className="text-gray-400 text-sm">We are working on bringing the best prep material for you.</p>
      </div>
    </div>
  );
}

export default Questions;
