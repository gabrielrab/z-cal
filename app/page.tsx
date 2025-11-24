import Link from "next/link";
import { Nav } from "@/app/components/nav";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import type React from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pb-24 relative overflow-hidden">
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-primary/3 blur-[100px] pointer-events-none" />

      <header className="w-full max-w-md lg:max-w-5xl px-6 pt-12 pb-6 flex justify-between items-center">
        <h1 className="text-xl font-serif tracking-tight font-medium text-primary">
          z-cal.ai
        </h1>
        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
          <span className="text-xs font-medium text-primary">LM</span>
        </div>
      </header>

      <div className="w-full max-w-md lg:max-w-5xl px-6 flex-1 flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <section className="mt-8 mb-12 lg:mb-0 lg:flex-1">
          <span className="inline-block py-1 px-3 rounded-full bg-secondary text-primary text-xs font-medium tracking-wide mb-6">
            WELCOME BACK
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal leading-[1.1] text-foreground mb-4">
            Eat well,
            <br />
            live better.
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-[80%] lg:max-w-md lg:text-lg">
            Your personal AI nutrition coach for mindful, creative meals.
          </p>
        </section>

        <div className="w-full lg:flex-1 lg:max-w-2xl grid gap-6 lg:grid-cols-2">
          <Link
            href="/scan"
            className="group relative overflow-hidden rounded-3xl bg-[#F0F4F1] aspect-4/5 lg:aspect-3/4 flex flex-col justify-between p-6 lg:p-8 transition-all hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="absolute inset-0 z-0">
              <Image
                src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/quick-chicken-and-hummus-bowl-3863168.jpg"
                alt="Healthy food"
                className="w-full h-full object-cover opacity-0 group-hover:opacity-10 transition-opacity duration-700"
                width={500}
                height={500}
              />
            </div>

            <div className="relative z-10 flex justify-between items-start">
              <div className="bg-background/80 backdrop-blur-sm p-3 rounded-full">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="h-8 w-8 rounded-full border border-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="h-4 w-4 text-primary" />
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl font-serif mb-2">Nutri Scan</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Snap your meal for instant, detailed nutrition insights.
              </p>
            </div>
          </Link>

          <Link
            href="/fridge"
            className="group relative overflow-hidden rounded-3xl bg-secondary aspect-4/5 lg:aspect-3/4 flex flex-col justify-between p-6 lg:p-8 transition-all hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="relative z-10 flex justify-between items-start">
              <div className="bg-background/80 backdrop-blur-sm p-3 rounded-full">
                <ChefHat className="h-5 w-5 text-primary" />
              </div>
              <div className="h-8 w-8 rounded-full border border-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="h-4 w-4 text-primary" />
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl font-serif mb-2">Fridge Chef</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Tell us what is in your kitchen and get personalized healthy
                recipes.
              </p>
            </div>
          </Link>
        </div>
      </div>

      <Nav />
    </main>
  );
}

function ChefHat(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
      <line x1="6" x2="18" y1="17" y2="17" />
    </svg>
  );
}
