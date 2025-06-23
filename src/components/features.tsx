"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Laptop, Palette, Zap } from "lucide-react";
import blogs from "../../public/blogs.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Features() {
  const router = useRouter();
  const session = useSession();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20, x: 10 },
    show: { opacity: 1, y: 0, x: 0 },
  };

  const features = [
    {
      component: <Code className="h-5 w-5" />,
      title: "Syntax Highlighting",
      description:
        "Support for over 100 programming languages with beautiful syntax highlighting.",
      classProps:
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-pink-300 to-blue-400 mt-1.5 text-white dark:text-gray-900",
    },
    {
      component: <Laptop className="h-5 w-5" />,
      title: "Responsive Design",
      description:
        "Your blog looks great on any device, from desktop to mobile.",
      classProps:
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg mt-1.5 bg-pink-300 text-white dark:text-gray-900",
    },
    {
      component: <Palette className="h-5 w-5" />,
      title: "Dark Mode Support",
      description: "Switch between light and dark themes with a single click.",
      classProps:
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-t from-emerald-400 to-blue-400 mt-1.5 text-white dark:text-gray-900",
    },
    {
      component: <Zap className="h-5 w-5" />,
      title: "Fast Performance",
      description: "Built with Next.js for optimal performance and SEO.",
      classProps:
        "flex h-10 w-10 mt-1.5 shrink-0 items-center justify-center rounded-lg bg-gradient-to-l from-yellow-400 to-gray-400 text-white dark:text-gray-900",
    },
  ];

  return (
    <section
      id="features"
      className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 flex flex-row justify-center"
    >
      <div className="w-screen px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gradient-to-r from-pink-300 to-blue-400 px-3 py-1 text-sm font-semibold text-black">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Everything you need to write technical content
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform is designed specifically for developers who want to
              share their knowledge and insights with the community.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <motion.div
            ref={ref}
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="grid gap-6"
          >
            {features.map((feature, index) => {
              return (
                <motion.div
                  key={index}
                  variants={item}
                  className="flex gap-4"
                  whileHover={{
                    scale: 1.02,
                    transition: {
                      duration: 1,
                      type: "spring",
                      mass: 1,
                    },
                  }}
                >
                  <div className={feature.classProps}>{feature.component}</div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
            }
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative overflow-hidden rounded-xl border bg-background p-2 shadow-xl"
          >
            <Image
              src={blogs}
              width={1920}
              height={1080}
              alt="blog picture"
              className="rounded-lg object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-background/0 p-6 flex items-end">
              <div className="space-y-2 light:text-zinc-800">
                <h3 className="text-xl font-bold">
                  Beautiful Editor Experience
                </h3>
                <p className="text-sm">
                  Write in Markdown with live preview and drag-and-drop image
                  uploads
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mx-auto max-w-3xl space-y-4 text-center"
        >
          <h3 className="text-2xl font-bold">
            Ready to start your developer blog?
          </h3>
          <p className="text-muted-foreground">
            Join thousands of developers who are already sharing their knowledge
            and building their personal brand.
          </p>
          <div className="flex justify-center gap-4">
            {!session.data?.user?.email && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-pink-300  hover:scale-105 via-blue-400 to-emerald-400 px-8 text-sm text-black font-semibold shadow transition-colors hover:opacity-90"
                onClick={() => router.push("/signup")}
              >
                Sign Up Free
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
