import { getChat } from "./chat-factory";
import type { Message, Model } from "./types";
import { getPersonalInfo, getProjects, getWebsites, getSkills, getWorkExperience, getEducation, getProperties } from 'lib/ai/knowledge-base';
import { groqAdapter, geminiAdapter } from 'lib/ai/providers';

export async function POST(request: Request) {
  const payload = await request.json();
  const messages = payload.messages as Message[];
  const model = payload.model as Model;
  const useTanStack = payload.useTanStack || false;
  
  if (!messages) {
    return Response.json({ error: "No messages provided" }, { status: 400 });
  }
  
  // Use custom AI for personal chatbot functionality
  if (useTanStack) {
    try {
      const personalInfo = getPersonalInfo();
      const projects = getProjects();
      const websites = getWebsites();
      const skills = getSkills();
      const workExperience = getWorkExperience();
      const education = getEducation();
      const properties = getProperties();
      
      // Create context from knowledge base including resume and match calculations
      const context = `You are Itamar Sharify's AI assistant. Answer questions about Itamar based on this comprehensive information:

PERSONAL INFO:
- Name: ${personalInfo.name}
- Profession: ${personalInfo.profession}
- Languages: ${personalInfo.languages.join(', ')}
- Properties: ${properties.join(', ')}

EDUCATION:
${education.map(ed => `- ${ed}`).join('\n')}

WORK EXPERIENCE:
${workExperience.map(work => `- ${work.title} at ${work.company.name} (${work.duration.from}-${work.duration.to === 'Present' ? 'Present' : work.duration.to})
  Description: ${work.description}
  Technologies: ${work.tags.join(', ')}
  Website: ${work.company.website}`).join('\n\n')}

PROJECTS:
${projects.map(p => `- ${p.title}: ${p.summary} (${p.category})`).join('\n')}

WEBSITES:
${websites.map(w => `- ${w.title}: ${w.summary} (${w.link})`).join('\n')}

SKILLS:
${skills.join(', ')}

CHART CREATION:
I have experience building interactive charts and data visualizations using Chart.js and other technologies. I can help you create various types of charts for your projects.

**Chart Projects:**
- Chart Communications: A chart communications app example
- Generator Traffic: Traffic cross app using generators with charts
- Various data visualization projects

**Chart Technologies I Use:**
- Chart.js (primary library)
- React and Next.js for chart components
- Custom chart configurations and animations
- Real-time data visualization

**Chart Types I Can Help With:**
- Line charts, bar charts, pie charts
- Real-time streaming charts
- Interactive dashboards
- Custom data visualizations

**How to Ask About Charts:**
- "Help me create a chart"
- "Show me chart examples"
- "What chart types can you build?"
- "Can you help with data visualization?"

**Chart Creation Process:**
1. Discuss your data and requirements
2. Choose the right chart type
3. Set up Chart.js with React/Next.js
4. Implement real-time updates if needed
5. Add interactivity and animations

MATCH CALCULATIONS:
I have a compatibility matching system that calculates how well someone fits with me based on shared skills and interests. The system works as follows:

**How it works:**
- Users select skills/technologies they have or are interested in
- Each skill has a ranking value based on how important it is to me
- The system calculates a total match score (0-100%)
- Higher scores mean better compatibility

**Qualification Levels:**
- 90%+ = "Perfect Match!" - Excellent alignment
- 70-89% = "Great Match!" - Strong compatibility
- 50-69% = "Good Match" - Decent fit
- 30-49% = "Fair Match" - Some alignment
- Below 30% = No qualification

**My Key Skills (High Priority):**
- React, Next.js, TypeScript (core web development)
- Python, Go (backend/systems)
- JavaScript, Node.js (full-stack)
- WebRTC, Socket.io (real-time communication)

**How to ask about compatibility:**
- "Am I a good match for you?"
- "How compatible are we based on skills?"
- "What's our match percentage?"
- "Do we share similar technical interests?"

CONTACT:
- Email form available on website
- Open to job opportunities and collaborations

Be helpful, conversational, and answer questions based on this information. If asked about something not covered, say you don't have that specific information but can share what you do know.`;

      // Convert messages to proper format
      const formattedMessages = [
        {
          role: 'system' as const,
          content: context
        },
        ...messages.map(msg => ({
          role: msg.type === 'message' ? 'user' as const : 'assistant' as const,
          content: msg.content
        }))
      ];

      // Try Groq first, then Gemini as fallback
      let response;
      try {
        response = await groqAdapter.fetch({
          messages: formattedMessages,
          temperature: 0.7,
          maxTokens: 1000
        });
      } catch (groqError) {
        console.warn('Groq failed, trying Gemini:', groqError);
        response = await geminiAdapter.fetch({
          messages: formattedMessages,
          temperature: 0.7,
          maxTokens: 1000
        });
      }

      if (!response.text) {
        throw new Error('No response from AI model');
      }
      
      return new Response(
        new ReadableStream({
          start(controller) {
            // Stream the response character by character
            const text = response.text;
            let index = 0;
            
            const interval = setInterval(() => {
              if (index < text.length) {
                const chunk = text.slice(index, index + 1);
                controller.enqueue(`data: ${JSON.stringify({ content: chunk })}\n\n`);
                index++;
              } else {
                clearInterval(interval);
                controller.close();
              }
            }, 30); // Adjust speed as needed
          }
        }),
        {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
          },
        }
      );
    } catch (error) {
      console.error('AI error:', error);
      return Response.json({ error: "AI service unavailable" }, { status: 500 });
    }
  }
  
  // Use existing implementation for non-TanStack requests
  if (!model) {
    return Response.json({ error: "No model provided" }, { status: 400 });
  }
  const chatProvider = getChat(model);
  if (!chatProvider) {
    return Response.json({ error: "Model not supported" }, { status: 400 });
  }
  const stream = await chatProvider(model, messages);
  return new Response(stream);
}
