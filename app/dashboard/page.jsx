//import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddnewInterview from "./_components/AddnewInterview";
import InterviewList from "./_components/InterviewList";

function page() {
  return (
    <div className="p-10 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col gap-1">
        <h2 className="font-bold text-3xl text-primary tracking-tight">Dashboard</h2>
        <p className="text-gray-500 text-lg">Create and manage your AI-powered mockup interviews</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
        <AddnewInterview />
      </div>

      <div className="mt-16">
        <div className="flex items-center gap-2 mb-6">
          <div className="h-2 w-2 bg-primary rounded-full" />
          <h2 className="font-bold text-xl text-gray-800">Previous Interviews</h2>
        </div>
        <InterviewList />
      </div>
    </div>
  );
}

export default page;
