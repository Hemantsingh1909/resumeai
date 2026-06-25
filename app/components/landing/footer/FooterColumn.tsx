"use client";

import Link from "next/link";

interface FooterColumnProps {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}

export default function FooterColumn({
  title,
  links,
}: FooterColumnProps) {
  return (
    <div>
      <h4 className="text-xs font-mono font-medium uppercase tracking-wider text-zinc-900 dark:text-white">
        {title}
      </h4>

      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="
                text-sm
                text-zinc-500
                dark:text-zinc-400
                hover:text-zinc-900
                dark:hover:text-white
                transition-colors
                duration-200
              "
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}