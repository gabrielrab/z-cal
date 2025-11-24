"use client";

import type React from "react";

import { useState, useRef } from "react";
import Image from "next/image";
import { Nav } from "@/app/components/nav";
import { Camera, Loader2, Info } from "lucide-react";
import { toast } from "sonner";
import { useFoodIdentification } from "@/lib/hooks/useFoodIdentification";
import { getBase64FromDataUrl } from "@/lib/api/food";
import type { FoodIdentificationResponse } from "@/lib/api/types";

export default function ScanPage() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<FoodIdentificationResponse | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: identifyFood, isPending: analyzing } =
    useFoodIdentification();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;

    const base64Image = getBase64FromDataUrl(image);

    identifyFood(
      { image: base64Image },
      {
        onSuccess: (data) => {
          setResult(data);
          toast.success("Analysis complete!");
        },
        onError: (error) => {
          toast.error(`Failed to analyze: ${error.message}`);
        },
      }
    );
  };

  const reset = () => {
    setImage(null);
    setResult(null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center pb-24 bg-background">
      <header className="w-full max-w-md px-6 pt-8 pb-4 flex justify-between items-center z-10">
        <h1 className="text-2xl font-serif text-foreground">Nutri Scan</h1>
        {image && (
          <button
            onClick={reset}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Clear
          </button>
        )}
      </header>

      <div className="w-full max-w-md px-6 flex-1 flex flex-col justify-center">
        {!image ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-border rounded-3xl aspect-4/5 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-secondary/30 transition-colors group"
          >
            <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
              <Camera className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center">
              <p className="font-medium text-foreground">Take a photo</p>
              <p className="text-sm text-muted-foreground">
                or pick from your gallery
              </p>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        ) : (
          <div className="relative rounded-3xl overflow-hidden aspect-4/5 shadow-lg">
            <Image
              src={image || "/placeholder.svg"}
              alt="Uploaded meal"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
              unoptimized
            />

            {result && (
              <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md p-6 animate-in slide-in-from-bottom duration-500 rounded-t-3xl border-t border-white/20">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-serif font-medium">
                      {result.name}
                    </h3>
                    <p className="text-3xl font-sans font-bold text-primary mt-1">
                      {result.calories}{" "}
                      <span className="text-sm font-normal text-muted-foreground">
                        kcal
                      </span>
                    </p>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
                    {result.healthScore}/10
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <MacroItem label="Protein" value={result.macros.protein} />
                  <MacroItem label="Carbs" value={result.macros.carbs} />
                  <MacroItem label="Fat" value={result.macros.fat} />
                </div>

                <div className="flex gap-2 items-start bg-secondary/50 p-3 rounded-xl">
                  <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {result.insights}
                  </p>
                </div>
              </div>
            )}

            {analyzing && (
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center">
                <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                <p className="font-serif text-lg">Analyzing ingredients...</p>
              </div>
            )}
          </div>
        )}

        {image && !result && !analyzing && (
          <button
            onClick={handleAnalyze}
            className="mt-6 w-full bg-primary text-primary-foreground py-4 rounded-full font-medium shadow-lg hover:bg-primary/90 transition-all active:scale-95"
          >
            Analyze Calories
          </button>
        )}
      </div>
      <Nav />
    </main>
  );
}

function MacroItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-background rounded-xl p-2 text-center border border-border">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="font-medium text-foreground">{value}</p>
    </div>
  );
}
