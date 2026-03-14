"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSubmit: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSubmit,
  isLoading,
  placeholder = "Ask me anything...",
}: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSubmit(input.trim());
      setInput("");
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      onSubmit={handleSubmit}
      className="flex gap-2 w-full max-w-2xl mx-auto"
    >
      <div className="relative flex-1">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          className="pr-12 h-14 text-base rounded-2xl border-2 border-border/50 focus:border-primary"
        />
      </div>
      <Button
        type="submit"
        size="xl"
        variant="glow"
        disabled={!input.trim() || isLoading}
        className="rounded-2xl px-6"
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Send className="h-5 w-5" />
        )}
      </Button>
    </motion.form>
  );
}
