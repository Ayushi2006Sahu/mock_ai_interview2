"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { gsap } from "gsap";
import { Sparkles, Video, BrainCircuit, LineChart, ArrowRight, ChevronRight } from "lucide-react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const tl = gsap.timeline();
    tl.from(".hero-content", { opacity: 0, y: 50, duration: 1, ease: "power3.out" })
      .from(".feature-card", { opacity: 0, y: 30, duration: 0.8, stagger: 0.2, ease: "power2.out" }, "-=0.5")
      .from(".hero-image", { opacity: 0, scale: 0.9, duration: 1.2, ease: "power3.out" }, "-=1");
  }, []);

  return (
    <div className="min-h-screen bg-[#05070A] text-white selection:bg-primary selection:text-white overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#05070A]/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
            <img src="/logo.svg" alt="logo" width={35} height={35} className="hover:rotate-6 transition-transform" />
            <span className="text-xl font-bold tracking-tight text-white uppercase">
              MOCK_AI_INTERVIEW
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            {['How it Works', 'Features', 'Pricing', 'About'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-white transition-colors uppercase tracking-widest text-[10px]">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => router.push("/dashboard")}
              className="text-gray-400 hover:text-white"
            >
              Log In
            </Button>
            <Button 
              onClick={() => router.push("/dashboard")} 
              className="bg-white text-black hover:bg-gray-200 rounded-full px-6 font-bold"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6 overflow-hidden">
        {/* Moving Video Background behind Hero Text */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-20 pointer-events-none"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-futuristic-human-face-34503-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#05070A] via-transparent to-[#05070A] opacity-80" />
        </div>

        <div className="max-w-7xl mx-auto text-center hero-content relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold mb-8 tracking-widest uppercase">
            <Sparkles className="h-4 w-4" />
            <span>Future of Interview Preparation</span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black mb-8 leading-tight tracking-tighter">
            Master Your Next <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-indigo-500 animate-gradient-x">
              Big Interview
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Practice with our advanced AI interviewer, get real-time feedback, 
            and land your dream job with confidence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              onClick={() => router.push("/dashboard")} 
              className="h-16 px-10 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-[0_0_40px_rgba(37,99,235,0.3)] group"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              className="h-16 px-10 rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold text-lg"
            >
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Floating Visuals */}
        <div className="max-w-6xl mx-auto mt-24 relative hero-image">
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-transparent to-transparent z-10" />
          <div className="rounded-3xl border border-white/10 overflow-hidden shadow-2xl bg-gray-900/50 backdrop-blur-sm relative group">
             {/* Animated Video Background */}
             <video 
               autoPlay 
               loop 
               muted 
               className="w-full h-full object-cover opacity-50 absolute inset-0 group-hover:opacity-70 transition-opacity duration-700"
             >
               <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-futuristic-human-face-34503-large.mp4" type="video/mp4" />
             </video>
             
             <div className="aspect-video flex items-center justify-center relative z-20">
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-transparent to-transparent opacity-60" />
                <img 
                  src="/interview.png" 
                  alt="App Preview" 
                  className="w-[60%] h-[60%] object-contain drop-shadow-[0_0_50px_rgba(37,99,235,0.5)] transform group-hover:scale-110 transition-transform duration-700 relative z-30"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 bg-primary/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl border border-white/20 cursor-pointer hover:scale-110 transition-transform z-40 group">
                   <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center">
                    <Video className="text-primary h-8 w-8 fill-primary translate-x-0.5" />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4">Core Features</h2>
            <h3 className="text-4xl md:text-5xl font-bold">Everything you need to succeed</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Question Generator",
                desc: "Tailored questions based on your specific job role, description, and experience level.",
                icon: <BrainCircuit className="h-8 w-8" />,
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Video & Voice Analysis",
                desc: "Real-time recording and transcription to analyze your communication style and content.",
                icon: <Video className="h-8 w-8" />,
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Deep Feedback",
                desc: "Receive comprehensive ratings and areas of improvement powered by Gemini AI.",
                icon: <LineChart className="h-8 w-8" />,
                color: "from-orange-500 to-yellow-500"
              }
            ].map((feature, i) => (
              <div key={i} className="feature-card group p-10 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h4 className="text-2xl font-bold mb-4">{feature.title}</h4>
                <p className="text-gray-400 leading-relaxed mb-6">{feature.desc}</p>
                <div className="flex items-center text-primary font-bold text-sm cursor-pointer group/link">
                  Learn more <ChevronRight className="h-4 w-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto rounded-[3rem] p-12 md:p-20 bg-gradient-to-br from-primary to-indigo-700 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10">Ready to crush your next interview?</h2>
          <p className="text-white/80 text-lg mb-12 max-w-xl mx-auto relative z-10">
            Join thousands of successful candidates who used MockerAI to land their dream jobs at top tech companies.
          </p>
          <Button 
            onClick={() => router.push("/dashboard")}
            className="h-16 px-12 rounded-full bg-white text-black hover:bg-gray-100 font-black text-xl shadow-2xl relative z-10"
          >
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} MockerAI. All rights reserved.</p>
      </footer>
    </div>
  );
}
