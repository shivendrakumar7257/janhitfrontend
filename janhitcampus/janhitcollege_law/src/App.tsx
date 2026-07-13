import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Courses } from "@/components/site/Courses";
import { Infrastructure } from "@/components/site/Infrastructure";
import { Admissions } from "@/components/site/Admissions";
import { Downloads } from "@/components/site/Downloads";
import { Faculty } from "@/components/site/Faculty";
import { Committees } from "@/components/site/Committees";
import { Disclosures } from "@/components/site/Disclosures";
import { NewsEvents } from "@/components/site/NewsEvents";
import { ContactForm } from "@/components/site/ContactForm";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";

// Initialize QueryClient
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
      <div className="bg-background text-foreground min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <About />
          <Courses />
          <Infrastructure />
          <Admissions />
          <Downloads />
          <Faculty />
          <Committees />
          <Disclosures />
          <NewsEvents />
          <ContactForm />
        </main>
        <Footer />
        <Toaster position="top-center" />
      </div>
    </QueryClientProvider>
  );
}
