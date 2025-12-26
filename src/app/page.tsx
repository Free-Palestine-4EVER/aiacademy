"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Curriculum from "@/components/Curriculum";
import Device from "@/components/Device";
import Pricing from "@/components/Pricing";
import Coaching from "@/components/Coaching";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Problem />
      <Solution />
      <Curriculum />
      <Device />
      <section id="pricing">
        <Pricing />
      </section>
      <section id="coaching">
        <Coaching />
      </section>
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
