"use client";
import { db } from '@/utils/db';
import { MockAiInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { useParams } from "next/navigation";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview() {
    const params = useParams(); 
    const [interviewData, setInterviewData] = useState(null);
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    // Fetch interview details only once
    useEffect(() => {
        const GetInterviewDetails = async () => {
            if (!params?.interviewId) return;
            const result = await db.select().from(MockAiInterview)
                .where(eq(MockAiInterview.mockId, params.interviewId));

            if (result.length > 0) {
                const jsonMockResp = JSON.parse(result[0].jsonMockResp);
                setMockInterviewQuestion(jsonMockResp);
                setInterviewData(result[0]);
            }
        };

        GetInterviewDetails();
    }, [params?.interviewId]); // Only fetch when interviewId changes

    // Log active question index whenever it changes
    useEffect(() => {
        console.log("Active Question Index Updated:", activeQuestionIndex);
    }, [activeQuestionIndex]);

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {/* Questions */}
                <QuestionsSection
                    mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}
                />
                {/* video/audio recording */}
                <RecordAnswerSection
                    mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}
                    interviewData={interviewData}
                />
            </div>
            <div className='flex justify-end gap-6'>
                {activeQuestionIndex > 0 && (
                    <Button onClick={() => setActiveQuestionIndex(prev => prev - 1)}>
                        Previous Question
                    </Button>
                )}
                {activeQuestionIndex < mockInterviewQuestion.length - 1 && (
                    <Button onClick={() => setActiveQuestionIndex(prev => prev + 1)}>
                        Next Question
                    </Button>
                )}
                {activeQuestionIndex === mockInterviewQuestion.length - 1 && (
                    <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
                    <Button>End Interview</Button></Link>
                )}
            </div>
        </div>
    );
}

export default StartInterview;
