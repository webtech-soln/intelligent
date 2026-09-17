"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { FAQS } from "@/lib/content";

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <div className="flex flex-1 flex-col">
      {FAQS.map((faq, index) => {
        const expanded = open === index;
        return (
          <div
            key={faq.question}
            className={`flex flex-col gap-3 py-[26px] ${
              index > 0 ? "border-t border-line" : ""
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(expanded ? -1 : index)}
              aria-expanded={expanded}
              className="flex w-full items-start justify-between gap-4 text-left"
            >
              <span className="text-xl font-bold leading-[1.35] tracking-[-0.015em] text-fg">
                {faq.question}
              </span>
              {expanded ? (
                <Minus className="mt-1 size-5 shrink-0 text-fg-2" />
              ) : (
                <Plus className="mt-1 size-5 shrink-0 text-fg-2" />
              )}
            </button>
            {expanded ? (
              <p className="max-w-[640px] text-[15px] leading-[1.75] text-fg-2">
                {faq.answer}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
