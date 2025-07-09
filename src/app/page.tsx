"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link2, Copy, Zap } from "lucide-react";

// Generate random 6-character string
function generateRandomSuffix(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function HomePage() {
  const [longurl, setLongurl] = useState("");
  const [suffix, setSuffix] = useState("");
  const [randomPlaceholder, setRandomPlaceholder] = useState("");

  // Generate random placeholder only on client side to avoid hydration mismatch
  useEffect(() => {
    setRandomPlaceholder(generateRandomSuffix());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Functionality would be implemented here
    console.log("Long url:", longurl);
    console.log("Suffix:", suffix || randomPlaceholder);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-30">
        <div className="max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
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

          {/* url Shortener Form */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl">create short link</CardTitle>
              <CardDescription>
                enter your long url and optionally customize the short link
                suffix
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Long url Input */}
                <div className="space-y-2">
                  <Label
                    htmlFor="longurl"
                    className="text-sm font-medium text-slate-700"
                  >
                    long url
                  </Label>
                  <Input
                    id="longurl"
                    type="url"
                    placeholder="https://example.com/very/long/url/that/needs/shortening"
                    value={longurl}
                    onChange={(e) => setLongurl(e.target.value)}
                    className="h-12 text-base"
                    required
                  />
                </div>

                {/* Short url Suffix Input */}
                <div className="space-y-2">
                  <Label
                    htmlFor="suffix"
                    className="text-sm font-medium text-slate-700"
                  >
                    custom suffix (optional)
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-base pointer-events-none">
                      short.en/
                    </div>
                    <Input
                      id="suffix"
                      type="text"
                      placeholder={randomPlaceholder || ""}
                      value={suffix}
                      onChange={(e) => setSuffix(e.target.value)}
                      className="h-12 text-base pl-[90px] placeholder:text-slate-400 placeholder:font-mono"
                      maxLength={20}
                    />
                  </div>
                  <p className="text-xs text-slate-500">
                    leave empty to use random suffix:{" "}
                    <span className="font-mono text-slate-400">
                      {randomPlaceholder || ""}
                    </span>
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-medium"
                  disabled={!longurl.trim()}
                >
                  <Link2 className="w-4 h-4 mr-2" />
                  shorten url
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
