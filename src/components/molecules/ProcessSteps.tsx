import Reveal from "@/components/atoms/Reveal";
import GradientHeading from "@/components/atoms/GradientHeading";

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
            {eyebrow}
          </p>
          <GradientHeading as={2} size="md" className="mt-3">
            {title}
          </GradientHeading>
        </div>
      </Reveal>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <Reveal key={step.step} delay={i * 0.1}>
            <div className="relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elev)] p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-accent)] text-lg font-bold text-white">
                {i + 1}
              </div>
              <h3 className="text-base font-semibold text-[var(--color-fg)]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-fg-muted)]">
                {step.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
}
