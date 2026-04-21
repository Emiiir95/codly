import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

type SolutionItem = {
  title: string;
  body: string;
};

type Props = {
  eyebrow: string;
  title: string;
  items: SolutionItem[];
};

export default function SolutionGrid({ eyebrow, title, items }: Props) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-3xl">
          {title}
        </h2>
      </motion.div>
      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.6,
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -6 }}
          >
            <div className="group h-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elev)] p-6 transition-all duration-300 hover:border-[var(--color-accent)] hover:shadow-lg">
              <motion.div
                whileHover={{ rotate: 8, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
              >
                <CheckCircle2 size={20} />
              </motion.div>
              <h3 className="text-lg font-semibold text-[var(--color-fg)]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                {item.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
