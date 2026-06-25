"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const improvements = [
  {
    title: "Professional Summary",
    status: "Improved",
  },
  {
    title: "Experience",
    status: "Added Metrics",
  },
  {
    title: "Skills",
    status: "Added Keywords",
  },
  {
    title: "Projects",
    status: "Optimized",
  },
];

interface ResumeCardProps {
  hoveredKeyword?: string | null;
  isScoreHovered?: boolean;
  hoveredSection?: string | null;
  onHoverSection?: (section: string | null) => void;
  simStep?: "idle" | "scanning" | "rewriting" | "done";
}

const sectionToKeywordsMap: Record<string, string[]> = {
  "Professional Summary": ["Agile", "Microservices"],
  "Experience": ["AWS", "Docker", "Redis", "CI/CD"],
  "Skills": ["React", "JavaScript", "TypeScript", "REST APIs"],
  "Projects": ["Jest", "Git"],
};

export default function ResumeCard({
  hoveredKeyword,
  isScoreHovered = false,
  hoveredSection,
  onHoverSection,
  simStep = "idle",
}: ResumeCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 30,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.7,
      }}
      whileHover={{
        y: -4,
      }}
      className={`
        rounded-lg
        border
        bg-canvas/70
        backdrop-blur-xl
        overflow-hidden
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

      <div className="border-b border-zinc-200/60 p-6 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-violet-soft/30 dark:bg-violet/10 p-3">
            <FileText
              className="text-violet"
              size={20}
            />
          </div>

          <div>
            <h3 className="font-semibold">
              Resume.pdf
            </h3>

            <p className="text-sm text-zinc-500">
              Software Engineer
            </p>
          </div>

          <div className="ml-auto flex items-center gap-2 rounded-full border border-hairline bg-canvas-soft px-3 py-1 text-xs font-medium text-violet dark:text-violet-soft">
            <Sparkles size={14} />

            AI Optimizing
          </div>
        </div>
      </div>

      {/* Progress */}

      <div className="px-6 pt-6">
        <div className="h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width: "94%",
            }}
            transition={{
              duration: 2,
            }}
            className="h-full rounded-full bg-gradient-to-r from-violet to-highlight-pink"
          />
        </div>
      </div>

      {/* Sections */}

      <div className="space-y-3 p-6">
        {improvements.map((item, index) => {
          const isSectionHighlighted = hoveredKeyword
            ? (sectionToKeywordsMap[item.title]?.includes(hoveredKeyword))
            : false;

          return (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.15,
              }}
              onMouseEnter={() => onHoverSection?.(item.title)}
              onMouseLeave={() => onHoverSection?.(null)}
              className={`
                flex
                items-center
                justify-between
                rounded-md
                border
                px-4
                py-3
                transition-all
                duration-300
                cursor-pointer
                ${
                  isSectionHighlighted || hoveredSection === item.title
                    ? "border-violet bg-violet-soft/20 dark:bg-violet/20 scale-[1.02] shadow-[0_0_12px_rgba(121,40,202,0.12)]"
                    : "border-hairline bg-canvas-soft hover:border-zinc-300 dark:hover:border-zinc-700"
                }
              `}
            >
              <span className="font-medium">
                {item.title}
              </span>

              <div className="flex items-center gap-2 text-emerald-600">
                <CheckCircle2 size={16} />

                <span className="text-sm">
                  {item.status}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Before After */}

      <div className="border-t border-zinc-200/60 p-6 dark:border-zinc-800">
        <p className="text-sm text-zinc-500">
          Before
        </p>

        <p className="mt-2 text-sm">
          Built{" "}
          <span className={`transition-all duration-200 rounded px-1 select-none ${
            hoveredKeyword === "React" || simStep === "scanning" || simStep === "rewriting" || simStep === "done"
              ? "bg-violet-soft/30 dark:bg-violet/20 text-violet font-semibold border border-violet/30"
              : "text-zinc-900 dark:text-zinc-100"
          }`}>
            React
          </span>{" "}
          applications.
        </p>

        <div className="my-5 flex justify-center">
          <motion.div
            animate={{
              x: [0, 8, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
            }}
          >
            <ArrowRight
              className="text-violet"
              size={22}
            />
          </motion.div>
        </div>

        <p className="text-sm text-zinc-500">
          After
        </p>

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          animate={{
            opacity: simStep === "rewriting" || simStep === "done" || hoveredKeyword === "React" ? 1 : 0,
            scale: simStep === "rewriting" || simStep === "done" || hoveredKeyword === "React" ? 1 : 0.95,
          }}
          transition={{
            duration: 0.5,
          }}
          className={`
            mt-2
            rounded-md
            border
            p-4
            text-sm
            leading-relaxed
            transition-all
            duration-500
            ${
              simStep === "rewriting"
                ? "border-violet bg-violet-soft/10 dark:bg-violet/10 shadow-[0_0_15px_rgba(121,40,202,0.1)] animate-pulse text-zinc-300"
                : "border-emerald-200 bg-emerald-50/50 dark:border-emerald-500/20 dark:bg-emerald-500/5 text-zinc-900 dark:text-zinc-100"
            }
          `}
        >
          Developed scalable{" "}
          <span className={`transition-all duration-200 rounded px-1 select-none ${
            hoveredKeyword === "React"
              ? "bg-violet-soft/30 dark:bg-violet/20 text-violet font-semibold border border-violet/30"
              : "text-zinc-900 dark:text-zinc-100"
          }`}>
            React
          </span>{" "}
          applications serving over
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            {" "}10,000 users{" "}
          </span>
          while improving performance by
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            {" "}35%
          </span>
          .
        </motion.div>
      </div>

      {/* Footer */}

      <div className="border-t border-zinc-200/60 p-6 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-500">
              Resume Score
            </p>

            <div className="mt-2 flex items-center gap-3">
              <span className="text-xl font-semibold text-zinc-400 line-through">
                72
              </span>

              <ArrowRight
                size={18}
                className="text-violet"
              />

              <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                94
              </span>
            </div>
          </div>

          <div className="rounded-full border border-hairline bg-canvas-soft px-4 py-1.5 text-xs font-medium text-violet dark:text-violet-soft">
            ✨ AI Improved
          </div>
        </div>
      </div>
    </motion.div>
  );
}