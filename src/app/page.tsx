"use client";

import { Zap } from "lucide-react";
import Form from "./form";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      <main className="container mx-auto px-4 py-16 md:py-30">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              fast & reliable
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              shorten your urls
              <span className="text-primary"> instantly</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto">
              transform long, complex urls into short, shareable links.
              customize your links with preferred suffixes.
            </p>
          </div>
          <Form />
        </div>
      </main>
    </div>
  );
}
