"use client";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ArrowRight, Code2, Sparkles, Terminal, X } from "lucide-react";
import Link from "next/link";
import { useProfileStore } from "@/store/profileStore";
import { signOut, useSession } from "next-auth/react";
import { useStore } from "zustand";
export default function Hero() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const tit =
    " A modern blogging platform built specifically for developers. Share code snippets, technical tutorials, and programming insights with syntax highlighting and interactive demos.".split(
      ""
    );
  // console.log(tit)

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  

  const session = useSession();
  return (
    <section className="w-full flex py-12 md:py-24 justify-center lg:py-32 xl:py-38">

      <div className="container px-4 md:px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center space-y-4 text-center"
        >
          <motion.div
            variants={item}
            className="inline-block rounded-lg bg-pink-300 px-3 py-1 text-sm text-white dark:text-gray-900"
          >
            <Sparkles className="mr-1 inline-block h-4 w-4" /> New Blog Platform
            for Developers
          </motion.div>
          <h1
            className="text-4xl font-bold tracking-tighter md:text-6xl"
          >
            Code. Write.{" "}
            <span className="bg-gradient-to-tr from-yellow-300 to-blue-400 bg-clip-text text-transparent">
              Share.
            </span>
          </h1>
          <motion.p
            variants={container}
            className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mb-5"
          >
            {tit.map((char, index) => {
              return (
                <motion.span variants={item} key={index}>
                  {char}
                </motion.span>
              );
            })}
          </motion.p>
          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link href="#features">
              <Button size="lg" className="gap-1 dark:bg-zinc-200/90">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#demo">
              <Button variant="outline" size="lg">
                View Demo
              </Button>
            </Link>
          </motion.div>
          <motion.div
            variants={item}
            className="mt-8 grid grid-cols-3 gap-8 rounded-lg border bg-gradient-to-br from-pink-300/10 via-blue-400/10 to-emerald-400/10 p-4 md:p-8"
          >
            <div className="flex flex-col items-center gap-2">
              <Code2 className="h-8 w-8 text-pink-300" />
              <h3 className="text-xl font-bold">Code Snippets</h3>
              <p className="text-center text-sm text-muted-foreground">
                Share code with syntax highlighting for 100+ languages
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Terminal className="h-8 w-8 text-blue-400" />
              <h3 className="text-xl font-bold">Interactive</h3>
              <p className="text-center text-sm text-muted-foreground">
                Create runnable code examples for your readers
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Sparkles className="h-8 w-8 text-emerald-400" />
              <h3 className="text-xl font-bold">Developer-first</h3>
              <p className="text-center text-sm text-muted-foreground">
                Built by developers, for developers
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
