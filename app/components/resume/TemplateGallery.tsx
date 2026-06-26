import { templatesList } from "./templates/registry";
import { Sparkles, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface TemplateGalleryProps {
  onSelectTemplate: (templateId: string) => void;
  selectedTemplateId: string;
  isPro: boolean;
  onPreviewTemplate: (templateId: string) => void;
}

export default function TemplateGallery({
  onSelectTemplate,
  selectedTemplateId,
  isPro,
  onPreviewTemplate,
}: TemplateGalleryProps) {
  return (
    <div className="space-y-6">
      <div className="text-left">
        <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <Sparkles className="text-violet" size={20} />
          Choose a Professional Template
        </h2>
        <p className="text-xs text-zinc-400 mt-1">
          Select from our list of ATS-optimized styles. Switch anytime without losing your editing data.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templatesList.map((tpl) => {
          const isSelected = selectedTemplateId === tpl.id;
          const showPremiumBadge = tpl.isPremium;
          const displayLocked = showPremiumBadge && !isPro;

          return (
            <motion.div
              key={tpl.id}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`
                rounded-xl border bg-canvas overflow-hidden flex flex-col h-full transition-all duration-300 shadow-level-2 group
                ${
                  isSelected
                    ? "border-violet ring-1 ring-violet"
                    : "border-hairline hover:border-zinc-800"
                }
              `}
            >
              {/* Thumbnail Container */}
              <div className="h-40 bg-zinc-950/40 flex items-center justify-center border-b border-hairline relative overflow-hidden">
                {/* Visual template mock design */}
                <div className="w-[110px] h-[150px] bg-white rounded border border-zinc-200 p-2 shadow-sm transform scale-90 group-hover:scale-95 transition-transform duration-300 flex flex-col justify-between">
                  <div className="space-y-1 text-[4px] leading-tight text-zinc-400">
                    <div className={`h-1.5 rounded-full ${tpl.id === "creative" ? "bg-violet" : tpl.id === "executive" ? "bg-zinc-800" : "bg-zinc-900"} w-8 mb-1`} />
                    <div className="h-[2px] bg-zinc-250 w-full" />
                    <div className="h-[2px] bg-zinc-200 w-[90%]" />
                    <div className="h-[2px] bg-zinc-200 w-[70%]" />
                    <div className="h-[2px] bg-zinc-250 w-full mt-2" />
                    <div className="h-[2px] bg-zinc-200 w-[80%]" />
                  </div>
                  <div className="h-1 bg-zinc-200 w-4 rounded-full self-end" />
                </div>

                {/* Badges overlay */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  {tpl.isPopular && (
                    <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[9px] font-bold px-2 py-0.5 rounded-full">
                      POPULAR
                    </span>
                  )}
                </div>

                {/* ATS Score badge */}
                <div className="absolute top-3 right-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded-full">
                  ATS: {tpl.atsScore}%
                </div>

                {/* Locked overlay */}
                {displayLocked && (
                  <div className="absolute inset-0 bg-zinc-950/65 backdrop-blur-[2px] flex flex-col items-center justify-center p-3 text-center">
                    <div className="h-9 w-9 rounded-full bg-violet/20 border border-violet/30 flex items-center justify-center text-violet mb-2">
                      <Lock size={15} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider">Premium Template</span>
                    <span className="text-[9px] text-zinc-400 mt-0.5">Upgrade required to download</span>
                  </div>
                )}
              </div>

              {/* Template Info Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between text-left">
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    {tpl.name}
                    {isSelected && <CheckCircle2 className="text-violet" size={13} />}
                  </h4>
                  <p className="text-[10px] text-zinc-500 leading-normal font-medium mt-1">
                    {tpl.desc}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  <button
                    onClick={() => onPreviewTemplate(tpl.id)}
                    className="w-full py-1.5 rounded-sm border border-hairline hover:bg-zinc-900 transition-colors text-[10px] font-bold text-zinc-350 cursor-pointer"
                  >
                    Live Preview
                  </button>
                  <button
                    onClick={() => onSelectTemplate(tpl.id)}
                    className={`
                      w-full py-1.5 rounded-sm text-[10px] font-bold cursor-pointer transition-all flex items-center justify-center gap-1
                      ${
                        isSelected
                          ? "bg-violet hover:bg-violet-deep text-white"
                          : "bg-primary hover:bg-zinc-200 text-on-primary"
                      }
                    `}
                  >
                    Use Template
                    <ArrowRight size={11} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
