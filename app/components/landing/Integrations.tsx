"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  FileText,
  Link2,
  Building2,
  Cpu,
  Globe,
  FileSpreadsheet,
} from "lucide-react";

const tools = [
  {
    name: "LinkedIn",
    icon: Link2,
  },
  {
    name: "Indeed",
    icon: Briefcase,
  },
  {
    name: "Greenhouse",
    icon: Building2,
  },
  {
    name: "Lever",
    icon: Cpu,
  },
  {
    name: "Workday",
    icon: Globe,
  },
  {
    name: "PDF",
    icon: FileText,
  },
  {
    name: "DOCX",
    icon: FileSpreadsheet,
  },
];

// Triplicate the tools array to create a seamless infinite loop
const marqueeItems = [...tools, ...tools, ...tools];

export default function TrustedBy() {
  return (
    <section className="py-20 overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Works seamlessly with
          </p>

          {/* Marquee Wrapper with fading edges */}
          <div className="relative mt-12 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
            <motion.div
              className="flex gap-6 w-max py-4"
              animate={{
                x: ["0%", "-33.333%"],
              }}
              transition={{
                ease: "linear",
                duration: 25,
                repeat: Infinity,
              }}
            >
              {marqueeItems.map((tool, index) => {
                const Icon = tool.icon;

                return (
                  <div
                    key={`${tool.name}-${index}`}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-full
                      border
                      border-hairline
                      bg-canvas
                      px-6
                      py-3.5
                      shadow-level-2
                      hover:shadow-level-3
                      hover:border-hairline-strong
                      transition-all
                      duration-200
                      cursor-pointer
                    "
                  >
                    <Icon
                      size={16}
                      strokeWidth={2}
                      className="text-zinc-500 dark:text-zinc-400 flex-shrink-0"
                    />
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 select-none">
                      {tool.name}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}