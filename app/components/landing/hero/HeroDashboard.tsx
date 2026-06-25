"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ATSCard from "./ATSCard";
import KeywordCard from "./KeywordCard";
import ResumeCard from "./ResumeCard";
import { Sparkles, Zap, RotateCcw } from "lucide-react";

export default function HeroDashboard() {
  const [hoveredKeyword, setHoveredKeyword] = useState<string | null>(null);
  const [isScoreHovered, setIsScoreHovered] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [simStep, setSimStep] = useState<"idle" | "scanning" | "rewriting" | "done">("idle");
  const [simScore, setSimScore] = useState(72);

  const runSimulation = () => {
    if (simStep === "done") {
      setSimStep("idle");
      setSimScore(72);
      setHoveredKeyword(null);
      return;
    }
    if (simStep !== "idle") return;

    setSimStep("scanning");
    setSimScore(72);

    // Step 1: Scanning simulation
    setTimeout(() => {
      setSimStep("rewriting");

      // Step 2: Rewriting simulation - animate score increment from 72 to 94
      let currentScore = 72;
      const targetScore = 94;
      const interval = setInterval(() => {
        currentScore += 1;
        if (currentScore >= targetScore) {
          setSimScore(targetScore);
          clearInterval(interval);
          setSimStep("done");
        } else {
          setSimScore(currentScore);
        }
      }, 50); // 22 steps * 50ms = 1.1s
    }, 1500);
  };

  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      {/* Glow */}

      <div className="absolute inset-0 -z-10 bg-violet/5 blur-[120px]" />

      {/* Floating badge */}

      <motion.div
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        -top-10
        left-1/2
        z-30
        flex
        -translate-x-1/2
        items-center
        gap-2
        rounded-full
        border
        border-hairline
        bg-canvas/80
        px-4
        py-2
        shadow-level-3
        backdrop-blur-xl
      "
      >
        <Sparkles
          size={16}
          className="text-violet"
        />

        <span className="text-sm font-medium text-ink">
          AI Tailoring in Progress
        </span>
      </motion.div>

      {/* Simulation Control Button */}
      <div className="z-30 mt-6 mb-2">
        <motion.button
          onClick={runSimulation}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`
            inline-flex
            items-center
            gap-2.5
            rounded-full
            border
            px-6
            py-3
            text-sm
            font-semibold
            shadow-lg
            transition-all
            duration-300
            cursor-pointer
            ${
              simStep === "idle"
                ? "bg-white text-zinc-950 border-zinc-200 hover:bg-zinc-50"
                : simStep === "done"
                ? "bg-zinc-900 border-zinc-800 text-zinc-100 hover:bg-zinc-850"
                : "bg-violet text-white border-violet-600 animate-pulse"
            }
          `}
        >
          {simStep === "idle" && (
            <>
              <Sparkles size={16} className="text-violet-500" />
              <span>Simulate AI Optimization</span>
            </>
          )}
          {simStep === "scanning" && (
            <>
              <div className="h-4.5 w-4.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Scanning Keywords...</span>
            </>
          )}
          {simStep === "rewriting" && (
            <>
              <div className="h-4.5 w-4.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Rewriting Resume Bullets...</span>
            </>
          )}
          {simStep === "done" && (
            <>
              <RotateCcw size={16} />
              <span>Reset Simulation</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Dashboard */}

      <div
        className="
        relative
        mt-12
        grid
        w-full
        max-w-7xl
        gap-8
        lg:grid-cols-12
      "
      >
        {/* ATS */}

        <motion.div
          initial={{
            opacity: 0,
            x: -60,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
          lg:col-span-3
          lg:mt-12
        "
        >
          <ATSCard
            score={simStep === "idle" ? 72 : simScore}
            hoveredKeyword={hoveredKeyword}
            isScoreHovered={isScoreHovered}
            onHoverScore={setIsScoreHovered}
            hoveredSection={hoveredSection}
            simStep={simStep}
          />
        </motion.div>

        {/* Resume */}

        <motion.div
          initial={{
            opacity: 0,
            y: 60,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.25,
            duration: 0.8,
          }}
          className="
          lg:col-span-6
          z-20
        "
        >
          <ResumeCard
            hoveredKeyword={hoveredKeyword}
            isScoreHovered={isScoreHovered}
            hoveredSection={hoveredSection}
            onHoverSection={setHoveredSection}
            simStep={simStep}
          />
        </motion.div>

        {/* Keywords */}

        <motion.div
          initial={{
            opacity: 0,
            x: 60,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.45,
            duration: 0.8,
          }}
          className="
          lg:col-span-3
          lg:mt-20
        "
        >
          <KeywordCard
            hoveredKeyword={hoveredKeyword}
            onHoverKeyword={setHoveredKeyword}
            isScoreHovered={isScoreHovered}
            hoveredSection={hoveredSection}
            simStep={simStep}
          />
        </motion.div>
      </div>

      {/* Floating analytics */}

      <motion.div
        animate={{
          y: [0, -8, 0],
          rotate: [0, 2, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="
        absolute
        bottom-6
        left-6
        hidden
        rounded-xl
        border
        border-hairline
        bg-canvas/80
        p-4
        shadow-level-3
        backdrop-blur-xl
        xl:flex
        items-center
        gap-3
      "
      >
        <div className="rounded-lg bg-emerald-50 p-3 dark:bg-emerald-500/10">
          <Zap
            size={18}
            className="text-emerald-600 dark:text-emerald-400"
          />
        </div>

        <div>
          <p className="text-xs text-mute font-mono">
            ATS Improved
          </p>

          <p className="font-semibold text-ink">
            +22 Points
          </p>
        </div>
      </motion.div>

      {/* Floating badge */}

      <motion.div
        animate={{
          y: [0, 8, 0],
          rotate: [0, -2, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="
        absolute
        right-8
        top-32
        hidden
        rounded-xl
        border
        border-hairline
        bg-canvas/80
        p-4
        shadow-level-3
        backdrop-blur-xl
        xl:block
      "
      >
        <div className="flex items-center gap-3">
          <Sparkles
            className="text-violet"
            size={18}
          />

          <div>
            <p className="text-xs text-mute font-mono">
              AI Suggestions
            </p>

            <p className="font-semibold text-ink">
              12 Improvements
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}