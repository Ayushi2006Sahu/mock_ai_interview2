"use client";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

function InterviewItemCard({interview}) {
    const router=useRouter();
    const onStart=()=>{
        router.push('/dashboard/interview/'+interview?.mockId)
    }
    const onFeedbackPress=()=>{
      router.push('/dashboard/interview/'+interview.mockId+"/feedback")
    }
  return (
    <div className='border border-gray-200 shadow-sm rounded-xl p-5 hover:shadow-lg transition-all duration-300 bg-white group'>
        <h2 className='font-bold text-lg text-primary group-hover:scale-[1.01] transition-transform'>{interview.jobPosition}</h2>
        <h2 className='text-sm text-gray-500 font-medium'>{interview.jobExperience} Years of Experience</h2>
        <h2 className='text-xs text-gray-400 mt-1'>Created: {interview.createdAt}</h2>
        <div className='flex items-center gap-4 mt-6'>
            <Button size="sm" variant="outline" 
              className="w-full border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors"
              onClick={onFeedbackPress}
            >Feedback</Button>
            <Button size="sm" 
              className="w-full shadow-sm"
              onClick={onStart}
            >Start</Button>
        </div>
    </div>
  );
}

export default InterviewItemCard