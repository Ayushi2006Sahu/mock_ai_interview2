export function createChatSession() {
  return {
    sendMessage: async (message) => {
      try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            messages: [
              {
                role: "user",
                content: message,
              },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 4096,
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || "Failed to fetch from Groq API");
        }

        const data = await response.json();
        
        return {
          response: {
            text: () => data.choices[0].message.content
          }
        };
      } catch (error) {
        console.error("Groq API Error:", error);
        throw error;
      }
    }
  };
}