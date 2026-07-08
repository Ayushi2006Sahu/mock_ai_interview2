"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createChatSession } from "@/utils/GeminiAIModal.js";
import { LoaderCircle } from "lucide-react";
import { MockAiInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import {db}  from "@/utils/db";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
function AddnewInterview() {
  const [openDailog, setOpenDailog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience,setJobExperience] = useState();
  const [loading,setLoading] =useState(false);
  const [jsonResponse,setJsonResponse] = useState([]);
  const {user} = useUser();
  const router =useRouter();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition, jobDesc, jobExperience);
  console.log(db);
    const InputPrompt = `
    You are an AI interviewer conducting an interview for the given job position. 
    Generate **5 highly relevant interview questions and answers** based on the **job position, required experience, and job description**.
    
    **Job Details:**
    - Job Position: ${jobPosition}
    - Job Description: ${jobDesc}
    - Years of Experience: ${jobExperience}
    
    **Requirements for Questions:**
    - The questions should be **deeply related to the job** (e.g., for a Full Stack Developer, ask about frontend, backend, databases, APIs, deployment, etc.).
    - Focus on **real-world experience**, not just theory.
    - If the job mentions a **specific tech stack**, include **questions on those technologies**.
    - Return a **valid JSON array** with "question" and "answer" fields.
    
    **Example Output Format:**
    [
      {
        "question": "What frontend technologies have you worked with, and how did you handle state management?",
        "answer": "I have used React.js with Redux and Context API for state management. In my previous project, I optimized state handling to improve performance by 30%."
      },
      {
        "question": "How do you structure your backend APIs for scalability?",
        "answer": "I design RESTful APIs using Express.js with proper route modularization and database indexing to handle high traffic efficiently."
      },
      {
        "question": "Can you explain a challenging bug you faced while working on authentication?",
        "answer": "Yes, I once had an issue with JWT expiration timing, which caused token invalidation inconsistencies. I resolved it by implementing a refresh token mechanism."
      }
    ] 
    
    **Strictly return only JSON without any extra text.**
    `;
    
  
    try {
      const chatSession = createChatSession();
      console.log("Chat Session:", chatSession);
      // ✅ Create a new session before sending a message
      const result = await chatSession.sendMessage(InputPrompt);
      const rawJson = result.response.text();
      const cleanJson = rawJson.replace(/```json|```/g, "").trim();
      const parsedJson = JSON.parse(cleanJson);
      console.log(parsedJson);
      setJsonResponse(cleanJson);

      if (cleanJson) {
        const resp = await db.insert(MockAiInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResp: cleanJson,
            jobPosition: jobPosition,
            jobDesc: jobDesc,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD-MM-yyyy')
          }).returning({ mockId: MockAiInterview.mockId })
        console.log("Inserted Id:",resp);

        if (resp) {
          setOpenDailog(false);
          toast.success("Interview created successfully!");
          router.push('/dashboard/interview/' + resp[0]?.mockId);
        }
      }
      else {
        console.log("Error in response");
        toast.error("Failed to generate questions. Please try again.");
      }

    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("An error occurred. Please check your connection and try again.");
    }
    finally {
      setLoading(false);  // ✅ Stop loading after request completes
    }
  };
  
  return (
    <div className="">
      <div
        className="p-10 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50
        flex flex-col items-center justify-center gap-2
        hover:scale-[1.02] hover:bg-white hover:border-primary hover:shadow-xl 
        transition-all duration-300 cursor-pointer group"
        onClick={() => setOpenDailog(true)}
      >
        <div className="p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
          <h2 className="text-3xl text-primary font-light">+</h2>
        </div>
        <h2 className="font-bold text-lg text-gray-700 group-hover:text-primary transition-colors">
          Add New Interview
        </h2>
        <p className="text-sm text-gray-500 text-center">Create a new AI-powered mockup interview</p>
      </div>
  
      {/* Dialog box */}
      <Dialog open={openDailog} onOpenChange={setOpenDailog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-bold">Tell us more about your job interviewing</DialogTitle>
            <DialogDescription>
              Add details about your job position/role.
            </DialogDescription>
          </DialogHeader>
  
          {/* ✅ Form ko properly handle karna */}
          <form
            onSubmit={onSubmit}
          >
            <div className="mt-7 my-2">
              <label>Job Role/Job Position</label>
              <Input
                placeholder="Ex. Full Stack Developer"
                required
                onChange={(event) => setJobPosition(event.target.value)}
              />
            </div>
            <div className="my-3">
              <label>Job Description/Tech Stack (In Short)</label>
              <Textarea
                placeholder="Ex. React, Angular, Node.js, MySQL etc."
                required
                onChange={(event) => setJobDesc(event.target.value)}
              />
            </div>
            <div className="my-3">
              <label>Years Of Experience</label>
              <Input
                placeholder="Ex. 5"
                type="number"
                max="50"
                min="0"
                required
                onChange={(event) => setJobExperience(event.target.value)}
              />
            </div>
  
            {/* ✅ Buttons form ke andar rakho taki submit properly ho */}
            <div className="flex gap-5 justify-end mt-5">
              <Button type="button" variant="ghost" onClick={() => setOpenDailog(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ?(
                <>
                <LoaderCircle className="animate-spin inline-block mr-2"/>Generating from AI...
                </>
                ):('Start Interview')
              }
                </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
  
}

export default AddnewInterview;
