"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Download } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { portfolioData } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const linkButtonStyles = cn(
  "inline-flex items-center justify-center rounded-full border border-input bg-background shadow-sm",
  "hover:bg-accent hover:text-accent-foreground transition-all active:scale-[0.98]"
);

export function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center space-y-6"
    >
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Avatar/Image Placeholder */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className="relative mx-auto"
      >
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto ring-4 ring-primary/20 animate-float">
          <span className="text-5xl md:text-6xl">
            {portfolioData.name.charAt(0)}
          </span>
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
          AI Powered
        </div>
      </motion.div>

      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <p className="text-muted-foreground text-lg">Hey, I&apos;m</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="text-primary">{portfolioData.name}</span>
        </h1>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl md:text-2xl text-muted-foreground font-medium">
          {portfolioData.title}
        </h2>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold"
      >
        AI Portfolio
      </motion.p>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-center gap-3"
      >
        <a
          href={portfolioData.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(linkButtonStyles, "h-12 w-12")}
        >
          <Github className="h-5 w-5" />
        </a>
        <a
          href={portfolioData.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(linkButtonStyles, "h-12 w-12")}
        >
          <Linkedin className="h-5 w-5" />
        </a>
        <a
          href="/CV.pdf"
          download="Mustapha Zoghlami CV.pdf"
          className={cn(linkButtonStyles, "h-12 px-6 gap-2 text-sm font-medium")}
        >
          <Download className="h-4 w-4" />
          Download CV
        </a>
      </motion.div>
    </motion.div>
  );
}
