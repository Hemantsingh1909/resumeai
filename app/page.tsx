"use client";

import Navbar from "./components/landing/Navbar";
import Hero from "./components/landing/hero/Hero";
import StatsBar from "./components/landing/StatsBar";
import Features from "./components/landing/features/Features";
import HowItWorks from "./components/landing/HowItWorks";
import CTA from "./components/landing/CTA";
import FAQ from "./components/landing/faq/FAQ";
import Footer from "./components/landing/footer/Footer";
import Integrations from "./components/landing/Integrations";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsBar />
      <Integrations />
      <HowItWorks />
      <Features />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
