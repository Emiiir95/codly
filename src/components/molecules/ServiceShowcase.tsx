import { motion } from "framer-motion";

type Image = { src: string; alt: string };

type Props = {
  title: string;
  subtitle?: string;
  images: Image[];
};

export default function ServiceShowcase({ title, subtitle, images }: Props) {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10 text-center"
      >
        <p className="text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]">
          En images
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-sm text-[var(--color-fg-muted)]">
            {subtitle}
          </p>
        )}
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-3">
        {images.map((img, i) => (
          <motion.div
            key={img.src + i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.65,
              delay: i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -8 }}
            className={`group relative overflow-hidden rounded-2xl border border-[var(--color-border)] shadow-lg transition-shadow hover:shadow-2xl ${
              i === 1 ? "sm:translate-y-6" : ""
            }`}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="h-64 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-30" />
            <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="text-xs font-medium text-white/90">{img.alt}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
