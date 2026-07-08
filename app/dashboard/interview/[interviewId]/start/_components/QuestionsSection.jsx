import { Lightbulb, Volume2 } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

function QuestionsSection({ mockInterviewQuestion,activeQuestionIndex }) {
  // const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
 const texToSpeach = (text) => {
if('speechSynthesis' in window){
const speech = new SpeechSynthesisUtterance(text);
window.speechSynthesis.speak(speech);
}
else{
  alert('Your browser does not support text to speech')
}
 
}
  return (
    <div className="p-8 border border-gray-200 rounded-2xl bg-white shadow-sm my-10 min-h-[450px] flex flex-col">
      {/* Questions Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {mockInterviewQuestion.map((question, index) => (
          <button
            key={index}
            className={`py-2 px-4 border rounded-xl text-xs md:text-sm font-semibold transition-all duration-300
              ${activeQuestionIndex === index 
                ? 'bg-primary text-white border-primary shadow-md scale-105' 
                : 'bg-gray-50 text-gray-500 border-gray-100 hover:bg-gray-100 hover:text-gray-700'}
            `}
            onClick={() => setActiveQuestionIndex(index)}
          >
            Q{index + 1}
          </button>
        ))}
      </div>

      {/* Active Question Content */}
      <div className="mt-10 flex-grow">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 leading-relaxed">
            {mockInterviewQuestion[activeQuestionIndex]?.question}
          </h2>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
            onClick={() => texToSpeach(mockInterviewQuestion[activeQuestionIndex]?.question)}
          >
            <Volume2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Note Section */}
      <div className="border border-blue-100 rounded-2xl p-6 bg-blue-50/50 mt-10">
        <div className="flex gap-2 items-center text-blue-800 mb-2">
          <Lightbulb className="h-5 w-5 text-blue-600" />
          <strong className="font-bold">Pro Tip:</strong>
        </div>
        <p className="text-sm text-blue-900/70 leading-relaxed">
          {process.env.NEXT_PUBLIC_QUESTION_NOTE}
        </p>
      </div>
    </div>
  );
}

export default QuestionsSection;
