"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

const navItems = [
  {
    title: "Features",
    href: "#features",
  },
  {
    title: "How it Works",
    href: "#how-it-works",
  },
  {
    title: "Pricing",
    href: "#pricing",
  },
  {
    title: "FAQ",
    href: "#faq",
  },
];


export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-canvas/80 backdrop-blur-md border-b border-hairline">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex h-14 items-center justify-between">
            {/* Logo */}

            <Link
              href="/"
              className="flex items-center gap-2.5 group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-primary text-on-primary shadow-sm group-hover:shadow-md transition-shadow">
                <Sparkles size={20} strokeWidth={2} />
              </div>

              <span className="text-lg font-semibold tracking-tight">
                Resume<span className="text-primary">AI</span>
              </span>
            </Link>

            {/* Desktop Nav */}

            <nav
              className="hidden items-center gap-1 md:flex"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {navItems.map((item, index) => (
                <a
                  key={item.title}
                  href={item.href}
                  onMouseEnter={() => setHoveredIndex(index)}
                  className="relative px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors rounded-lg"
                >
                  {hoveredIndex === index && (
                    <motion.span
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 bg-zinc-100/70 dark:bg-zinc-800/50 rounded-lg -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  {item.title}
                </a>
              ))}
            </nav>

            {/* Desktop Actions */}

            <div className="hidden items-center gap-4 md:flex">

              <button className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors rounded-lg hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50">
                Sign In
              </button>

              <motion.button
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="px-5 py-2 text-sm font-medium bg-primary hover:bg-primary/90 text-on-primary rounded-sm transition-colors shadow-sm"
              >
                Start Free
              </motion.button>
            </div>

            {/* Mobile */}

            <button
              className="md:hidden p-2 rounded-lg hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            transition={{
              duration: 0.2,
            }}
            className="fixed inset-x-6 top-20 z-40 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 bg-white dark:bg-zinc-950 shadow-xl md:hidden"
          >
            <div className="p-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2 text-base font-medium text-zinc-900 dark:text-zinc-100 rounded-lg hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  {item.title}
                </a>
              ))}

              <div className="border-t border-hairline pt-4 space-y-3">
                <button className="w-full px-4 py-2.5 rounded-lg border border-hairline text-zinc-900 dark:text-zinc-100 font-medium hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 transition-colors">
                  Sign In
                </button>

                <button className="w-full px-4 py-2.5 rounded-sm bg-primary hover:bg-primary/90 text-on-primary font-medium transition-colors">
                  Start Free
                </button>


              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}