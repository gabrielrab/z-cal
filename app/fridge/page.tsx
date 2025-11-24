"use client";

import type React from "react";

import { useState } from "react";
import { Nav } from "@/app/components/nav";
import { Send, User, Bot, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRecipeChat } from "@/lib/hooks/useRecipeChat";
import type { ChatMessage } from "@/lib/api/types";
import { toast } from "sonner";

export default function FridgePage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! Tell me what you have in the fridge (e.g., eggs, spinach, cheese) and I will suggest a healthy recipe.",
    },
  ]);
  const [input, setInput] = useState("");
  const { mutate: generateRecipe, isPending: isLoading } = useRecipeChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

    generateRecipe(
      { messages: updatedMessages },
      {
        onSuccess: (data) => {
          const assistantMessage: ChatMessage = {
            role: "assistant",
            content: data.response,
          };
          setMessages((prev) => [...prev, assistantMessage]);
        },
        onError: (error) => {
          toast.error(`Failed to generate recipe: ${error.message}`);
        },
      }
    );
  };

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-10">
        <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-xl font-serif text-foreground">Fridge Chef</h1>
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
      </header>

      <div className="flex-1 max-w-md mx-auto w-full pt-20 pb-32 px-4 space-y-6">
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn(
              "flex w-full gap-3 animate-in slide-in-from-bottom-2 duration-300",
              m.role === "user" ? "flex-row-reverse" : "flex-row"
            )}
          >
            <div
              className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                m.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-primary"
              )}
            >
              {m.role === "user" ? (
                <User className="h-4 w-4" />
              ) : (
                <Bot className="h-4 w-4" />
              )}
            </div>

            <div
              className={cn(
                "px-5 py-3 rounded-2xl max-w-[80%] text-sm leading-relaxed whitespace-pre-line shadow-sm",
                m.role === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-none"
                  : "bg-white border border-border text-foreground rounded-tl-none"
              )}
            >
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex w-full gap-3">
            <div className="h-8 w-8 rounded-full bg-secondary text-primary flex items-center justify-center shrink-0">
              <Bot className="h-4 w-4" />
            </div>
            <div className="bg-white border border-border px-4 py-3 rounded-2xl rounded-tl-none">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-16 left-0 right-0 bg-background/90 backdrop-blur-md p-4">
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto relative flex items-center"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="I have eggs, tomatoes..."
            className="w-full h-12 pl-5 pr-12 rounded-full border border-border bg-secondary/30 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 h-8 w-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
          >
            <Send className="h-4 w-4 ml-0.5" />
          </button>
        </form>
      </div>

      <Nav />
    </main>
  );
}
