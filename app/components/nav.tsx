"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Camera, ChefHat } from "lucide-react";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-t border-border pb-safe">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        <NavLink
          href="/"
          active={pathname === "/"}
          icon={Home}
          label="Home"
        />
        <NavLink
          href="/scan"
          active={pathname === "/scan"}
          icon={Camera}
          label="Scan"
        />
        <NavLink
          href="/fridge"
          active={pathname === "/fridge"}
          icon={ChefHat}
          label="Recipes"
        />
      </div>
    </nav>
  );
}

function NavLink({
  href,
  active,
  icon: Icon,
  label,
}: {
  href: string;
  active: boolean;
  icon: any;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center space-y-1 w-full h-full transition-colors duration-200",
        active ? "text-primary" : "text-muted-foreground hover:text-foreground"
      )}
    >
      <Icon className="h-6 w-6" strokeWidth={active ? 2.5 : 2} />
      <span className="text-[10px] uppercase tracking-wider font-medium">
        {label}
      </span>
    </Link>
  );
}
