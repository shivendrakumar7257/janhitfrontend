import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { WhyChoose } from "@/components/site/WhyChoose";
import { Foundational } from "@/components/site/Foundational";
import { Sports } from "@/components/site/Sports";
import { Admissions } from "@/components/site/Admissions";
import { FounderBatch } from "@/components/site/FounderBatch";
import { Campus } from "@/components/site/Campus";
import { Faq } from "@/components/site/Faq";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";

// Initialize standard React QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-background text-foreground">
        <Navbar />
        <main>
          <Hero />
          <About />
          <WhyChoose />
          <Foundational />
          <Sports />
          <Admissions />
          <FounderBatch />
          <Campus />
          <Faq />
          <Contact />
        </main>
        <Footer />
        <Toaster position="top-center" />
      </div>
    </QueryClientProvider>
  );
}
