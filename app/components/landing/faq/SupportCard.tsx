"use client";

import { motion } from "framer-motion";
import { ArrowRight, LifeBuoy, Clock3 } from "lucide-react";

export default function SupportCard() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
      }}
      className="
        relative
        mt-20
        overflow-hidden
        rounded-lg
        border
        border-hairline
        bg-canvas/70
        p-10
        shadow-level-4
        backdrop-blur-sm
      "
    >
      {/* Background Glow */}

      <div className="absolute inset-0 bg-gradient-to-r from-violet/5 via-transparent to-highlight-pink/5" />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Icon */}

        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-sm bg-violet-soft/30 dark:bg-violet/10 text-violet dark:text-violet-soft">
          <LifeBuoy size={28} strokeWidth={1.5} />
        </div>

        {/* Heading */}

        <h3 className="text-3xl font-bold tracking-tight md:text-4xl text-zinc-900 dark:text-white">
          Still have questions?
        </h3>

        {/* Description */}

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Can&apos;t find the answer you&apos;re looking for? Our team is happy to help and we&apos;ll get back to you as quickly as possible.
        </p>

        {/* Button */}

        <motion.button
          whileHover={{
            y: -2,
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          className="
            group
            mt-8
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-primary
            hover:opacity-90
            px-7
            py-3.5
            font-medium
            text-on-primary
            shadow-sm
            transition-all
            duration-200
          "
        >
          Contact Support

          <ArrowRight
            size={18}
            strokeWidth={2}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </motion.button>

        {/* Response Time */}

        <div className="mt-8 inline-flex items-center gap-2 rounded-sm border border-hairline bg-canvas-soft px-3.5 py-2 text-xs font-mono text-zinc-600 dark:text-zinc-400 backdrop-blur-sm">
          <Clock3 size={14} strokeWidth={1.5} />
          Average response time: under 24 hours
        </div>
      </div>
    </motion.div>
  );
}