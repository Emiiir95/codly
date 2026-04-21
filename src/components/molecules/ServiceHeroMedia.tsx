import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Zap } from "lucide-react";

type Props = {
  src: string;
  alt: string;
  eyebrow?: string;
};

export default function ServiceHeroMedia({ src, alt, eyebrow }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-5xl px-6"
    >
      <div className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] shadow-2xl">
        <motion.img
          src={src}
          alt={alt}
          loading="eager"
          className="h-[320px] w-full object-cover sm:h-[420px] md:h-[480px]"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/70 via-transparent to-transparent" />

        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md"
          >
            <Sparkles size={14} />
            {eyebrow}
          </motion.div>
        )}
      </div>

      {/* Floating badges */}
      <motion.div
        initial={{ opacity: 0, x: -30, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="absolute -left-2 bottom-6 hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elev)]/95 p-4 shadow-xl backdrop-blur-md sm:block"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
            <TrendingUp size={18} strokeWidth={2.4} />
          </div>
          <div>
            <div className="text-xs font-medium text-[var(--color-fg-muted)]">
              Performance
            </div>
            <div className="text-base font-bold text-[var(--color-fg)]">
              +247%
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="absolute -right-2 top-10 hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elev)]/95 p-4 shadow-xl backdrop-blur-md sm:block"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
            <Zap size={18} strokeWidth={2.4} />
          </div>
          <div>
            <div className="text-xs font-medium text-[var(--color-fg-muted)]">
              Lighthouse
            </div>
            <div className="text-base font-bold text-[var(--color-fg)]">
              98 / 100
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
