"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react'
import { toast } from 'sonner'
import { createChatSession } from '@/utils/GeminiAIModal'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'

function RecordAnswerSection({mockInterviewQuestion,activeQuestionIndex,interviewData}) {
  const [userAnswer,setUserAnswer] = useState('');
  const {user}=useUser();
  const [loading,setLoading]=useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    const transcript = results.map(result => result.transcript).join(' ');
    setUserAnswer(transcript);
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [isRecording]);

  const StartStopRecording=async()=>{
    if(isRecording){
     
      stopSpeechToText()
    

      
    }
    else{
      startSpeechToText();
    }
  }

  const UpdateUserAnswer=async()=>{

    console.log(userAnswer)
    setLoading(true);
    const feedbackPrompt="Question:"+mockInterviewQuestion[activeQuestionIndex]?.question+
    ", User Answer:"+userAnswer+",Depends on question and user answer for given interview question "+
    " please give us rating for answer and feedback as area of improvement if any" +"in just 3 to 5 lines to improve it in JSON format with rating  field and feedback field";

    try {
      const chatSession = createChatSession();
      const result = await chatSession.sendMessage(feedbackPrompt);
      const rawJson = result.response.text();
      
      // Improved JSON extraction using regex to find content between { }
      const jsonMatch = rawJson.match(/\{[\s\S]*\}/);
      const cleanJson = jsonMatch ? jsonMatch[0] : rawJson.replace(/```json|```/g, "").trim();
      
      let JsonFeedbackResp;
      try {
        JsonFeedbackResp = JSON.parse(cleanJson);
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError, "Raw JSON:", cleanJson);
        // Fallback in case parsing fails
        JsonFeedbackResp = {
          rating: "N/A",
          feedback: "Could not parse feedback. Raw response: " + cleanJson.substring(0, 100)
        };
      }

      const resp = await db.insert(UserAnswer)
        .values({
          mockIdRef: interviewData?.mockId,
          question: mockInterviewQuestion[activeQuestionIndex]?.question,
          correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
          userAns: userAnswer,
          feedback: JsonFeedbackResp?.feedback,
          rating: JsonFeedbackResp?.rating,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD-MM-yyyy')
        })

      if (resp) {
        toast.success('Answer saved successfully!');
        setUserAnswer('');
        setResults([]);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to save your answer. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='flex flex-col mt-20 justify-center items-center bg-gray-900 rounded-2xl p-4 shadow-2xl relative border-4 border-white'>
        <Image src={'/webcam.png'} width={150} height={150} alt='webcam placeholder' 
          className='absolute opacity-20 pointer-events-none'
        />
        <Webcam 
          mirrored={true}
          style={{
            height: 300,
            width: '100%',
            zIndex: 10,
            borderRadius: '12px'
          }}
        />
      </div>

      <div className="flex gap-4 mt-10">
        <Button 
          variant={isRecording ? "destructive" : "outline"}
          disabled={loading}
          className={`px-8 h-12 rounded-full font-bold transition-all duration-300 ${isRecording ? 'animate-pulse' : 'hover:border-primary hover:text-primary'}`}
          onClick={StartStopRecording}
        >
          {isRecording ? (
            <span className='flex gap-2 items-center uppercase tracking-wider text-xs'>
              <Mic className="h-4 w-4 animate-bounce" /> Stop Recording
            </span>
          ) : (
            <span className='flex gap-2 items-center uppercase tracking-wider text-xs'>
              <Mic className="h-4 w-4" /> Record Answer
            </span>
          )}
        </Button>
      </div>

      {userAnswer && (
        <div className="mt-5 p-4 bg-gray-50 border border-gray-100 rounded-xl max-w-md animate-in fade-in slide-in-from-bottom-2">
          <p className="text-xs font-bold text-gray-400 uppercase mb-2">Live Transcript</p>
          <p className="text-sm text-gray-600 line-clamp-3">{userAnswer}</p>
        </div>
      )}
    </div>
  );
}

export default RecordAnswerSection
