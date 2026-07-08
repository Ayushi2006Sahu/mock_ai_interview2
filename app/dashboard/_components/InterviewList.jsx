"use client";
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/db';
import { MockAiInterview } from '@/utils/schema';
import { desc, eq } from 'drizzle-orm';
import dynamic from 'next/dynamic';


function InterviewList() {
    const {user} =useUser();
    const [interviewList, setinterviewList]=useState([]);
    const [loading, setLoading] = useState(false);
    const InterviewItemCard = dynamic(() => import('./InterviewItemCard'), { ssr: false }); 
    useEffect(()=>{
        user&&GetInterviewList();
    },[user])
    const GetInterviewList =async()=>{
        setLoading(true);
        try {
          const result =await db.select()
              .from(MockAiInterview)
              .where(eq(MockAiInterview.createdBy,user?.primaryEmailAddress?.emailAddress))
              .orderBy(desc(MockAiInterview.id));
  
          console.log(result);
          setinterviewList(result);
        } finally {
          setLoading(false);
        }
    }

  return (
    <div className=''>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {loading ? (
          [1, 2, 3].map((item) => (
            <div key={item} className='h-[200px] w-full bg-gray-100 animate-pulse rounded-xl'></div>
          ))
        ) : interviewList.length > 0 ? (
          interviewList.map((interview, index) => (
            <InterviewItemCard 
              interview={interview}
              key={index} 
            />
          ))
        ) : (
          <div className="col-span-full py-10 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-3xl bg-gray-50/50">
            <p className="text-gray-400 font-medium">No previous interviews found.</p>
            <p className="text-gray-400 text-xs mt-1">Start your first interview above!</p>
          </div>
        )}
      </div> 
    </div>
  );
}

export default InterviewList
