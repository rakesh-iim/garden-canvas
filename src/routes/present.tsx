import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, X, Play } from "lucide-react";
import { useRef, useState } from "react";

export const Route = createFileRoute("/present")({
  component: PresentPage,
  head: () => ({ meta: [{ title: "Present — Verdana" }] }),
});

const slides = [
  { title: "Concept", caption: "A quiet retreat above the city.", before: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&q=80", after: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80" },
  { title: "Greenery", caption: "Layered planting for year-round texture.", before: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=80", after: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=1600&q=80" },
  { title: "Evening", caption: "Warm light, cinematic finish.", before: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1600&q=80", after: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80" },
];

function PresentPage() {
  const [i, setI] = useState(0);
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const s = slides[i];

  const onDrag = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    setPos(Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100)));
  };

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-white/50">Verdana · Presentation</div>
          <div className="font-serif text-lg mt-0.5">Skyline Balcony Retreat</div>
        </div>
        <Link to="/dashboard" className="size-9 grid place-items-center rounded-full bg-white/10 hover:bg-white/20"><X className="size-4" /></Link>
      </div>

      <div className="flex-1 grid place-items-center px-6">
        <div className="w-full max-w-6xl">
          <div
            ref={ref}
            onMouseMove={(e) => e.buttons === 1 && onDrag(e)}
            onTouchMove={onDrag}
            className="relative aspect-video rounded-2xl overflow-hidden cursor-ew-resize select-none"
          >
            <img src={s.after} alt="after" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
              <img src={s.before} alt="before" className="absolute inset-0 h-full w-[100vw] max-w-none object-cover" style={{ width: `${100 / (pos / 100)}%` }} />
            </div>
            <div className="absolute top-4 left-4 text-xs tracking-widest uppercase bg-black/40 backdrop-blur px-2.5 py-1 rounded-full">Before</div>
            <div className="absolute top-4 right-4 text-xs tracking-widest uppercase bg-black/40 backdrop-blur px-2.5 py-1 rounded-full">After</div>
            <div className="absolute inset-y-0 bg-white/80 w-px pointer-events-none" style={{ left: `${pos}%` }}>
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-10 rounded-full bg-white text-black grid place-items-center shadow-lg">
                <ChevronLeft className="size-3" /><ChevronRight className="size-3" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button onClick={() => setI((i - 1 + slides.length) % slides.length)} className="size-12 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center"><ChevronLeft className="size-5" /></button>
            <div className="text-center">
              <div className="font-serif text-3xl">{s.title}</div>
              <div className="text-white/60 text-sm mt-1">{s.caption}</div>
            </div>
            <button onClick={() => setI((i + 1) % slides.length)} className="size-12 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center"><ChevronRight className="size-5" /></button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 pb-6">
        {slides.map((_, k) => (
          <button key={k} onClick={() => setI(k)} className={`h-1 rounded-full transition-all ${k === i ? "w-10 bg-white" : "w-4 bg-white/30"}`} />
        ))}
        <button className="ml-4 inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-medium"><Play className="size-3.5" /> Play walkthrough</button>
      </div>
    </div>
  );
}
