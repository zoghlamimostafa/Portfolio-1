"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  onBack: () => void;
}

export function ChatContainer({
  messages,
  isLoading,
  onSendMessage,
  onBack,
}: ChatContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full w-full max-w-3xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-border/50">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="font-semibold">Chat with AI</h2>
          <p className="text-sm text-muted-foreground">
            Ask me anything about Mustapha
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              role={message.role}
              content={message.content}
            />
          ))}
          {isLoading && (
            <ChatMessage role="assistant" content="" isLoading />
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border/50">
        <ChatInput onSubmit={onSendMessage} isLoading={isLoading} />
      </div>
    </motion.div>
  );
}
