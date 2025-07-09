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
import { Link2, Copy, Zap, AlertTriangle } from "lucide-react";
import { checkIfCodeExists, insertUrl } from "@/app/actions";
import React from "react";

function generateRandomSuffix(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function Form() {
  const [longurl, setLongurl] = useState("");
  const [suffix, setSuffix] = useState("");
  const [randomPlaceholder, setRandomPlaceholder] = useState("");
  type ButtonVariant =
    | "default"
    | "secondary"
    | "destructive"
    | "link"
    | "outline"
    | "ghost"
    | undefined;
  const [buttonState, setButtonState] = useState<{
    text: string;
    icon: React.ReactNode;
    variant: ButtonVariant;
  }>({
    text: "shorten url",
    icon: <Link2 className="w-4 h-4 mr-2" />,
    variant: "default",
  });
  const [buttonTimeout, setButtonTimeout] = useState<number | null>(null);

  useEffect(() => {
    setRandomPlaceholder(generateRandomSuffix());
  }, []);

  async function handleAction(formData: FormData) {
    let code = formData.get("suffix")?.toString();
    if (!code) code = randomPlaceholder;
    formData.set("suffix", code);
    setButtonState({
      text: "checking...",
      icon: <Zap className="w-4 h-4 mr-2 animate-spin" />,
      variant: "secondary",
    });
    try {
      const exists = await checkIfCodeExists(formData);
      if (exists) {
        setButtonState({
          text: "code taken!",
          icon: <AlertTriangle className="w-4 h-4 mr-2 text-yellow-600" />,
          variant: "destructive",
        });
        if (buttonTimeout) clearTimeout(buttonTimeout);
        setButtonTimeout(
          window.setTimeout(() => {
            setButtonState({
              text: "shorten url",
              icon: <Link2 className="w-4 h-4 mr-2" />,
              variant: "default",
            });
          }, 2000)
        );
        return;
      }
      await insertUrl(formData);
      setButtonState({
        text: "link copied!",
        icon: <Copy className="w-4 h-4 mr-2 text-green-600" />,
        variant: "secondary",
      });
      const url = `${window.location.origin}/${code}`;
      navigator.clipboard.writeText(url);
      if (buttonTimeout) clearTimeout(buttonTimeout);
      setButtonTimeout(
        window.setTimeout(() => {
          setButtonState({
            text: "shorten url",
            icon: <Link2 className="w-4 h-4 mr-2" />,
            variant: "default",
          });
        }, 2000)
      );
    } catch {
      setButtonState({
        text: "error!",
        icon: <AlertTriangle className="w-4 h-4 mr-2 text-red-600" />,
        variant: "destructive",
      });
      if (buttonTimeout) clearTimeout(buttonTimeout);
      setButtonTimeout(
        window.setTimeout(() => {
          setButtonState({
            text: "shorten url",
            icon: <Link2 className="w-4 h-4 mr-2" />,
            variant: "default",
          });
        }, 2000)
      );
    }
  }

  return (
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl">create short link</CardTitle>
        <CardDescription>
          enter your long url and optionally customize the short link suffix
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleAction} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="longurl"
              className="text-sm font-medium text-slate-700"
            >
              long url
            </Label>
            <Input
              id="longurl"
              name="longurl"
              type="url"
              placeholder="https://example.com/very/long/url/that/needs/shortening"
              value={longurl}
              onChange={(e) => setLongurl(e.target.value)}
              className="h-12 text-base"
              required
            />
          </div>
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
                name="suffix"
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
          <Button
            type="submit"
            className="w-full h-12 text-base font-medium"
            disabled={!longurl.trim()}
            variant={buttonState.variant}
          >
            {buttonState.icon}
            {buttonState.text}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
