"use client";

import { motion } from "framer-motion";
import {
  User,
  Briefcase,
  Layers,
  Trophy,
  Mail,
} from "lucide-react";

interface QuickActionsProps {
  onSelect: (query: string) => void;
}

const actions = [
  {
    label: "Me",
    query: "Tell me about yourself and your background",
    icon: User,
    color: "bg-teal-500/10 text-teal-500 hover:bg-teal-500/20",
  },
  {
    label: "Projects",
    query: "What projects have you worked on?",
    icon: Briefcase,
    color: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
  },
  {
    label: "Skills",
    query: "What are your main technical skills?",
    icon: Layers,
    color: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20",
  },
  {
    label: "Awards",
    query: "What awards and achievements do you have?",
    icon: Trophy,
    color: "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20",
  },
  {
    label: "Contact",
    query: "How can I contact you?",
    icon: Mail,
    color: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

export function QuickActions({ onSelect }: QuickActionsProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 w-full max-w-2xl mx-auto"
    >
      {actions.map((action) => (
        <motion.button
          key={action.label}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(action.query)}
          className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-colors ${action.color}`}
        >
          <action.icon className="w-6 h-6" />
          <span className="text-sm font-medium">{action.label}</span>
        </motion.button>
      ))}
    </motion.div>
  );
}
