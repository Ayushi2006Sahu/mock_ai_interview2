"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
//import { index } from 'drizzle-orm/gel-core'
import { useParams } from "next/navigation"; 
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"


import React, { useEffect, useState } from 'react'
import { ChevronsUpDown, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

function Feedback({}) {
  const params = useParams();
  const [feedbackList, setfeedbackList]=useState([]);
  const router =useRouter();
  useEffect(()=>{
    GetFeedback();
  },[])
const GetFeedback=async()=>{

  if (!params?.interviewId) return;
  const result =await db.select()
  .from(UserAnswer)
  .where(eq(UserAnswer.mockIdRef,params.interviewId))
  .orderBy(UserAnswer.id);
  console.log(result);
  setfeedbackList(result);
}

  return (
    <div className='p-10 max-w-5xl mx-auto min-h-screen'>
      {feedbackList?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 border-2 border-dashed border-gray-100 rounded-3xl">
          <h2 className='font-bold text-2xl text-gray-400'>No Interview Feedback Found</h2>
          <p className="text-gray-400 mt-2">Complete an interview to see your detailed analysis here.</p>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="mb-10 text-center md:text-left">
            <h2 className='text-4xl font-black text-green-500 mb-2'>Congratulations!</h2>
            <h2 className='font-bold text-2xl text-gray-800'>Your Interview Performance Review</h2>
            <div className="h-1.5 w-32 bg-green-500 rounded-full mt-4 mx-auto md:mx-0" />
          </div>

          <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-8 mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className='text-blue-900 text-xl font-bold mb-1'>Overall Interview Rating</h2>
              <p className='text-sm text-blue-800/60'>Aggregated score based on all your responses</p>
            </div>
            <div className="h-20 w-20 rounded-2xl bg-white border-2 border-blue-100 flex items-center justify-center text-3xl font-black text-blue-700 shadow-xl">
              7/10
            </div>
          </div>

          <p className='text-gray-500 font-medium mb-6'>Review your answers and detailed feedback for each question:</p>

          <div className="space-y-6">
            {feedbackList.map((item, index) => (
              <Collapsible key={index} className="group">
                <CollapsibleTrigger className="p-6 bg-white border border-gray-100 rounded-2xl flex justify-between items-center gap-6 w-full text-left hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  <div className="flex gap-4 items-center">
                    <span className="h-8 w-8 rounded-lg bg-gray-50 flex items-center justify-center text-xs font-bold text-gray-400">Q{index + 1}</span>
                    <span className="font-bold text-gray-700 flex-1">{item.question}</span>
                  </div>
                  <ChevronsUpDown className="h-5 w-5 text-gray-400 group-data-[state=open]:rotate-180 transition-transform" />
                </CollapsibleTrigger>
                
                <CollapsibleContent className="mt-4 px-2 animate-in slide-in-from-top-4 duration-500">
                  <div className="grid grid-cols-1 gap-4 p-6 bg-gray-50/50 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-2 text-rose-600 mb-2">
                      <div className="h-8 w-8 rounded-full bg-rose-50 flex items-center justify-center font-bold text-sm">{item.rating}</div>
                      <span className="font-bold">Rating</span>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-red-50/50 border border-red-100 rounded-xl">
                        <p className="text-xs font-bold text-red-400 uppercase mb-2 tracking-wider">Your Answer</p>
                        <p className="text-sm text-red-900 leading-relaxed">{item.userAns}</p>
                      </div>

                      <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl">
                        <p className="text-xs font-bold text-emerald-400 uppercase mb-2 tracking-wider">Suggested Answer</p>
                        <p className="text-sm text-emerald-900 leading-relaxed">{item.correctAns}</p>
                      </div>

                      <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl shadow-inner">
                        <p className="text-xs font-bold text-blue-400 uppercase mb-2 tracking-wider">AI Feedback</p>
                        <p className="text-sm text-blue-900 leading-relaxed">{item.feedback}</p>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      )}

      <div className="mt-16 flex justify-center border-t border-gray-100 pt-10">
        <Button 
          onClick={() => router.replace('/dashboard')} 
          className="h-14 px-10 rounded-full font-bold shadow-xl hover:scale-105 transition-all flex gap-2"
        >
          Go Back to Dashboard <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

export default Feedback