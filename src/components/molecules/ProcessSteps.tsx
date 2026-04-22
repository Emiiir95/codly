import { motion } from "framer-motion";
import GradientHeading from "@/components/atoms/GradientHeading";
import Reveal from "../atoms/Reveal";

type Step = {
  step: string;
  title: string;
  desc: string;
};

type Props = {
  eyebrow: string;
  title: string;
  steps: Step[];
};

export default function ProcessSteps({ eyebrow, title, steps }: Props) {
  return (
    <>
      <Reveal>
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]">
            Simple & efficace
          </p>
          <GradientHeading as={2} size="md" className="mt-3">
            {title}
          </GradientHeading>
        </div>
      </Reveal>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.6,
              delay: i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -4 }}
            className="relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elev)] p-6 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
                delay: i * 0.12 + 0.15,
              }}
              className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-accent)] text-lg font-bold text-white shadow-lg shadow-[var(--color-accent)]/30"
            >
              {i + 1}
            </motion.div>
            <h3 className="text-base font-semibold text-[var(--color-fg)]">
              {step.title}
            </h3>
            <p className="mt-2 text-sm text-[var(--color-fg-muted)]">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
}
