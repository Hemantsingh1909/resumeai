"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface ATSCardProps {
  score?: number;
  hoveredKeyword?: string | null;
  isScoreHovered?: boolean;
  onHoverScore?: (hovered: boolean) => void;
  hoveredSection?: string | null;
  simStep?: "idle" | "scanning" | "rewriting" | "done";
}

export default function ATSCard({
  score = 94,
  hoveredKeyword,
  isScoreHovered = false,
  onHoverScore,
  hoveredSection,
  simStep = "idle",
}: ATSCardProps) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;

  const progress =
    circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      whileHover={{
        y: -4,
      }}
      className={`
        rounded-lg
        border
        bg-canvas/70
        backdrop-blur-xl
        p-6
        transition-all
        duration-500
        ${
          isScoreHovered || simStep === "done"
            ? "border-violet/40 shadow-[0_0_35px_rgba(121,40,202,0.15)] scale-[1.01]"
            : simStep === "scanning" || simStep === "rewriting"
            ? "border-violet/30 bg-violet/5 shadow-[0_0_20px_rgba(121,40,202,0.1)] scale-[1.01] animate-pulse"
            : "border-hairline shadow-level-3"
        }
      `}
    >
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-500">
            ATS Compatibility
          </p>

          <h3 className="mt-1 text-xl font-semibold">
            Resume Score
          </h3>
        </div>

        <div className="rounded-lg bg-violet-soft/30 dark:bg-violet/10 p-2">
          <Sparkles
            className="text-violet"
            size={18}
          />
        </div>
      </div>

      {/* Circle */}

      <div className="mt-8 flex justify-center">
        <div
          onMouseEnter={() => onHoverScore?.(true)}
          onMouseLeave={() => onHoverScore?.(false)}
          className="relative h-36 w-36 cursor-pointer group"
        >
          <svg
            className="-rotate-90"
            width="144"
            height="144"
          >
            <circle
              cx="72"
              cy="72"
              r={radius}
              strokeWidth="10"
              stroke="currentColor"
              className="text-zinc-200 dark:text-zinc-800"
              fill="transparent"
            />

            <motion.circle
              cx="72"
              cy="72"
              r={radius}
              strokeWidth="10"
              strokeLinecap="round"
              stroke="url(#gradient)"
              fill="transparent"
              strokeDasharray={circumference}
              initial={{
                strokeDashoffset: circumference,
              }}
              animate={{
                strokeDashoffset: progress,
              }}
              transition={{
                duration: 1.6,
                ease: "easeOut",
              }}
            />

            <defs>
              <linearGradient id="gradient">
                <stop
                  offset="0%"
                  stopColor="#7928ca"
                />

                <stop
                  offset="100%"
                  stopColor="#ff0080"
                />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{
                scale: 0.8,
                opacity: 0,
              }}
              animate={{
                scale: isScoreHovered || simStep === "done" || simStep === "rewriting" ? 1.08 : 1,
                opacity: 1,
              }}
              transition={{
                scale: { duration: 0.2 },
                default: { delay: 0.5 }
              }}
              className="text-center"
            >
              <p className={`text-4xl font-bold transition-colors duration-200 ${
                isScoreHovered || simStep === "done" || simStep === "rewriting" ? "text-violet font-extrabold" : "text-ink"
              }`}>
                {score}
              </p>

              <span className="text-sm text-zinc-500">
                /100
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Status */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.8,
        }}
        className="mt-6 flex items-center justify-center gap-2 rounded-full bg-emerald-50 py-2 text-sm font-medium text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
      >
        <CheckCircle2 size={16} />

        Excellent ATS Match
      </motion.div>

      {/* Metrics */}

      <div className="mt-8 grid grid-cols-2 gap-4">
        <MetricCard
          title="Keywords"
          value="28/31"
        />

        <MetricCard
          title="Formatting"
          value="Perfect"
        />

        <MetricCard
          title="Readability"
          value="96%"
        />

        <MetricCard
          title="+ Score"
          value="+22"
          success
        />
      </div>

      {/* Footer */}

      <div className={`mt-8 flex items-center justify-between rounded-lg border p-4 transition-all duration-300 ${
        hoveredKeyword === "Docker" || hoveredKeyword === "AWS" || hoveredKeyword === "CI/CD" || hoveredKeyword === "Redis" || hoveredSection === "Experience"
          ? "border-violet bg-violet-soft/20 dark:bg-violet/20 shadow-[0_0_18px_rgba(121,40,202,0.15)] scale-[1.03]"
          : "border-hairline bg-violet-soft/10"
      }`}>
        <div>
          <p className="text-sm font-medium text-ink">
            AI Recommendation
          </p>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Add Docker & AWS experience to
            increase recruiter matching.
          </p>
        </div>

        <ArrowUpRight
          className={`transition-all duration-300 ${
            hoveredKeyword === "Docker" || hoveredKeyword === "AWS" || hoveredKeyword === "CI/CD" || hoveredKeyword === "Redis" || hoveredSection === "Experience"
              ? "text-violet translate-x-0.5 -translate-y-0.5 scale-110"
              : "text-zinc-400 dark:text-zinc-500"
          }`}
          size={20}
        />
      </div>
    </motion.div>
  );
}

function MetricCard({
  title,
  value,
  success = false,
}: {
  title: string;
  value: string;
  success?: boolean;
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
      }}
      className="
      rounded-md
      border
      border-hairline
      bg-canvas-soft
      p-4
    "
    >
      <p className="text-xs text-mute font-mono">
        {title}
      </p>

      <p
        className={`mt-2 text-lg font-semibold text-ink ${
          success
            ? "text-emerald-600 dark:text-emerald-400"
            : ""
        }`}
      >
        {value}
      </p>
    </motion.div>
  );
}