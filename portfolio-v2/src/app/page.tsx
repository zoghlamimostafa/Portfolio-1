"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Hero } from "@/components/hero";
import { QuickActions } from "@/components/quick-actions";
import { ChatContainer } from "@/components/chat/chat-container";
import { ChatInput } from "@/components/chat/chat-input";
import { portfolioData } from "@/data/portfolio";

type View = "home" | "chat";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

// Mock response generator - works without API key
function generateResponse(query: string): string {
  const lowerQuery = query.toLowerCase();

  if (
    lowerQuery.includes("yourself") ||
    lowerQuery.includes("about") ||
    lowerQuery.includes("who") ||
    lowerQuery.includes("introduce")
  ) {
    return `Hi! I'm **${portfolioData.name}**, a ${portfolioData.title}.\n\n${portfolioData.bio}\n\nFeel free to ask me about my projects, skills, or achievements!`;
  }

  if (lowerQuery.includes("project")) {
    const projectsList = portfolioData.projects
      .slice(0, 4)
      .map((p) => `- **${p.title}** (${p.tech}): ${p.description}`)
      .join("\n");
    return `Here are some of my notable projects:\n\n${projectsList}\n\nYou can find more on my [GitHub](${portfolioData.social.github})!`;
  }

  if (lowerQuery.includes("skill") || lowerQuery.includes("tech")) {
    return `My main technical skills include:\n\n${portfolioData.skills.map((s) => `- ${s}`).join("\n")}\n\nI specialize in cybersecurity, cloud security, and DevSecOps practices.`;
  }

  if (
    lowerQuery.includes("award") ||
    lowerQuery.includes("achievement") ||
    lowerQuery.includes("honor") ||
    lowerQuery.includes("prize")
  ) {
    const honorsList = portfolioData.honors
      .slice(0, 5)
      .map((h) => `- **${h.title}** (${h.year}): ${h.description}`)
      .join("\n");
    return `Here are some of my achievements:\n\n${honorsList}`;
  }

  if (
    lowerQuery.includes("contact") ||
    lowerQuery.includes("reach") ||
    lowerQuery.includes("connect") ||
    lowerQuery.includes("email") ||
    lowerQuery.includes("hire")
  ) {
    return `You can reach me through:\n\n- **GitHub**: [zoghlamimostafa](${portfolioData.social.github})\n- **LinkedIn**: [zogmus99](${portfolioData.social.linkedin})\n\nFeel free to connect for collaboration opportunities or job inquiries!`;
  }

  if (lowerQuery.includes("service") || lowerQuery.includes("offer") || lowerQuery.includes("do")) {
    const servicesList = portfolioData.services
      .map((s) => `- **${s.title}**: ${s.description}`)
      .join("\n");
    return `Here are the services I offer:\n\n${servicesList}`;
  }

  if (lowerQuery.includes("experience") || lowerQuery.includes("work") || lowerQuery.includes("background")) {
    return `I'm a **${portfolioData.title}** with extensive experience in:\n\n- Designing and securing cloud-native platforms\n- Implementing CI/CD security pipelines\n- Conducting vulnerability assessments and penetration testing\n- Building IoT security solutions\n- Python automation for security operations\n\nI've won multiple hackathons including **1st Prize at Global Game Jam Tunisia 2025** and **1st Prize at Space Hack Tunisia 2023**.`;
  }

  return `Thanks for your question! I'm ${portfolioData.name}, and I'd be happy to help. You can ask me about:\n\n- **Me** - My background and experience\n- **Projects** - Technical projects I've worked on\n- **Skills** - My expertise in cybersecurity and cloud security\n- **Awards** - Hackathon wins and achievements\n- **Contact** - How to reach me\n\nWhat would you like to know?`;
}

export default function Home() {
  const [view, setView] = useState<View>("home");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = useCallback(
    async (content: string) => {
      if (view === "home") {
        setView("chat");
      }

      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content,
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      // Try API first, fall back to local response
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messages, { role: "user", content }],
          }),
        });

        if (response.ok && response.body) {
          // Stream the response
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let assistantContent = "";

          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: "",
          };
          setMessages((prev) => [...prev, assistantMessage]);

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            assistantContent += decoder.decode(value, { stream: true });
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMessage.id
                  ? { ...m, content: assistantContent }
                  : m
              )
            );
          }
        } else {
          throw new Error("API not available");
        }
      } catch {
        // Fall back to local response
        await new Promise((resolve) => setTimeout(resolve, 800));
        const response = generateResponse(content);
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }

      setIsLoading(false);
    },
    [view, messages]
  );

  const handleBack = useCallback(() => {
    setView("home");
    setMessages([]);
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <AnimatePresence mode="wait">
        {view === "home" ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center px-4 py-12 gap-8"
          >
            <Hero />

            {/* Search Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="w-full max-w-2xl"
            >
              <ChatInput
                onSubmit={handleSendMessage}
                placeholder="Ask me anything about Mustapha..."
              />
            </motion.div>

            {/* Quick Actions */}
            <QuickActions onSelect={handleSendMessage} />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            <ChatContainer
              messages={messages}
              isLoading={isLoading}
              onSendMessage={handleSendMessage}
              onBack={handleBack}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
