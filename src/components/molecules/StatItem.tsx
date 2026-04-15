import { useRef, useEffect, useState } from "react";

type Props = {
  value: string;
  label: string;
};

export default function StatItem({ value, label }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayed, setDisplayed] = useState(() => {
    const match = value.match(/^(\d+)(.*)/);
    return match ? "0" : value;
  });

  useEffect(() => {
    const match = value.match(/^(\d+)(.*)/);
    if (!match) return;

    const target = parseInt(match[1], 10);
    const suffix = match[2];

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();

        const start = performance.now();
        const duration = 1400;

        function tick(now: number) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setDisplayed(Math.floor(ease * target) + suffix);
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="flex flex-col bg-fg/4 p-8 text-center">
      <dt className="text-sm font-semibold text-fg-muted">{label}</dt>
      <dd className="order-first text-3xl font-semibold tracking-tight text-fg">
        {displayed}
      </dd>
    </div>
  );
}
