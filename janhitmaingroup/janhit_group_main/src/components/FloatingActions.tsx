import { ArrowUp, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

export function FloatingActions() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? (h.scrollTop / total) * 100 : 0);
      setShow(h.scrollTop > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 size-14 grid place-items-center rounded-full bg-[#25D366] text-white shadow-elegant hover:scale-110 transition animate-float"
      >
        <MessageCircle className="size-6" />
      </a>
      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-24 right-6 z-40 size-11 grid place-items-center rounded-full bg-primary text-primary-foreground shadow-elegant hover:scale-110 transition"
        >
          <ArrowUp className="size-5" />
        </button>
      )}
    </>
  );
}
