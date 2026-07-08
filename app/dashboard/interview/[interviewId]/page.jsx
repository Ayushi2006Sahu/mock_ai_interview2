"use client";
import { db } from '@/utils/db';
import { MockAiInterview } from '@/utils/schema';
import React, { useEffect, useState } from 'react'
import { eq } from 'drizzle-orm';
import Webcam from 'react-webcam';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import Link from 'next/link';
function Interview() {
  const params = useParams();
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);
    useEffect(()=>{
       console.log(params.interviewId) 
       GetInterviewDetails();
    },[])
    const GetInterviewDetails=async()=>{
      const result = await db.select().from (MockAiInterview)
      .where(eq(MockAiInterview.mockId,params.interviewId))

     // console.log(result);
      setInterviewData(result[0]);
    }
  return (
    <div className="my-10 flex flex-col items-center">
      <h2 className="font-bold text-3xl text-primary mb-2">Ready to Ace your Interview?</h2>
      <p className="text-gray-500 mb-10 text-lg">Set up your camera and review the details before starting.</p>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl px-5">
        {/* Left Column: Details & Info */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-5 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Job Role / Position</label>
              <h2 className="text-xl font-semibold text-gray-800">{interviewData?.jobPosition || "Loading..."}</h2>
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tech Stack / Description</label>
              <h2 className="text-lg text-gray-700 leading-relaxed">{interviewData?.jobDesc || "Loading..."}</h2>
            </div>
  
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Years of Experience</label>
              <h2 className="text-lg text-gray-700">{interviewData?.jobExperience || "Loading..."}</h2>
            </div>
          </div>
  
          <div className="p-6 border border-amber-200 rounded-2xl bg-amber-50/50 flex flex-col gap-3">
            <h2 className="text-lg font-bold flex items-center gap-2 text-amber-700">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              Important Information
            </h2>
            <p className="text-amber-800/80 text-sm leading-relaxed whitespace-pre-line">
              {process.env.NEXT_PUBLIC_INFORMATION}
            </p>
          </div>
        </div>
  
        {/* Right Column: Webcam & Start */}
        <div className="flex flex-col items-center justify-between">
          <div className="w-full h-full min-h-[350px] relative flex items-center justify-center bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            {webCamEnabled ? (
              <Webcam
                onUserMedia={() => setWebCamEnabled(true)}
                onUserMediaError={() => setWebCamEnabled(false)}
                mirrored={true}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-4 text-center p-10">
                <div className="p-6 bg-gray-800 rounded-full">
                  <WebcamIcon className="h-12 w-12 text-gray-400" />
                </div>
                <p className="text-gray-400 text-sm max-w-[200px]">Enable your camera to proceed with the interview</p>
                <Button 
                  variant="secondary"
                  className="mt-2 bg-white hover:bg-gray-100 text-black border-none shadow-lg"
                  onClick={() => setWebCamEnabled(true)}
                >
                  Enable Webcam
                </Button>
              </div>
            )}
          </div>
          
          <div className="w-full mt-8">
            <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
              <Button className="w-full h-14 text-lg font-bold shadow-xl hover:scale-[1.01] transition-all">
                🚀 Start Interview
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Interview
